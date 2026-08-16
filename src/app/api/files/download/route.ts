import { NextResponse } from 'next/server';
import { createSignedDownloadUrl } from '@/lib/r2';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // 1. Check Authentication
    const session = await getCurrentSession();
    if (!session) {
      const { pathname, search } = new URL(request.url);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', `${pathname}${search}`);
      return NextResponse.redirect(loginUrl, 307);
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key || !key.trim()) {
      return NextResponse.json({ error: 'Missing file key.' }, { status: 400 });
    }

    const cleanKey = key.trim();

    // 2. Find Product associated with this key
    const product = await prisma.product.findFirst({
      where: { fileUrl: cleanKey },
    });

    if (!product) {
      return NextResponse.json({ error: 'ডিজাইন সোর্স ফাইলটি খুঁজে পাওয়া যায়নি।' }, { status: 404 });
    }

    // 3. Authorization Check
    // Admin, Author of the product, Free assets, or Verified buyers (status: PAID) can download.
    const isAdmin = session.role === 'ADMIN';
    const isAuthor = product.authorId === session.userId;
    const isFree = product.price <= 0;

    let canDownload = isAdmin || isAuthor || isFree;

    if (!canDownload) {
      // Check if user has a PAID order containing this product
      const purchase = await prisma.order.findFirst({
        where: {
          userId: session.userId,
          status: 'PAID',
          items: {
            some: {
              productId: product.id,
            },
          },
        },
      });
      if (purchase) {
        canDownload = true;
      }
    }

    if (!canDownload) {
      return NextResponse.json(
        { error: 'এই ফাইলটি ডাউনলোড করার অনুমতি আপনার নেই। ফাইলটি কিনতে অনুগ্রহ করে অর্ডার সম্পূর্ণ করুন।' },
        { status: 403 }
      );
    }

    // 4. Generate R2 Signed URL
    const signedUrl = await createSignedDownloadUrl(cleanKey, 60 * 60);
    return NextResponse.redirect(signedUrl, 307);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to generate the download URL.';
    console.error('Download file error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
