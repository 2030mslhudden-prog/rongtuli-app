import { NextResponse } from 'next/server';
import { getCurrentSession, getEffectiveUserRole, getProductSubmissionStatus } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const mine = searchParams.get('mine') === 'true';
    const where: { status?: string; authorId?: string; category?: string; OR?: Array<Record<string, unknown>> } = { status: 'ACTIVE' };

    if (mine) {
      const session = await getCurrentSession();
      if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      where.authorId = session.userId;
      delete where.status;
    } else if (category && category !== 'All') {
      where.category = category;
    }
    if (search?.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { description: { contains: search.trim() } },
        { tags: { contains: search.trim() } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { author: { select: { name: true, email: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { title, description, category, price, imageUrl, tags, fileUrl } = await request.json();
    const numericPrice = Number(price);
    if (!title?.trim() || !category?.trim() || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return NextResponse.json({ error: 'Title, category, and a valid price are required' }, { status: 400 });
    }

    const effectiveRole = getEffectiveUserRole(session.email, session.role);
    const productStatus = getProductSubmissionStatus(effectiveRole);

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        description: description?.trim() || '',
        category: category.trim(),
        price: numericPrice,
        imageUrl: typeof imageUrl === 'string' && imageUrl.trim() ? imageUrl : '/images/product-saas-checkout.jpg',
        fileUrl: typeof fileUrl === 'string' && fileUrl.trim() ? fileUrl : null,
        tags: typeof tags === 'string' ? tags.trim() || null : null,
        status: productStatus,
        authorId: session.userId,
      },
    });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Unable to create design asset' }, { status: 500 });
  }
}
