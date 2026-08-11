import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true, avatarUrl: true, bio: true } } },
    });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    if (product.status !== 'ACTIVE') {
      const session = await getCurrentSession();
      if (!session || session.userId !== product.authorId) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    await prisma.product.update({ where: { id }, data: { viewsCount: { increment: 1 } } });
    return NextResponse.json({ product: { ...product, viewsCount: product.viewsCount + 1 } });
  } catch (error) {
    console.error('Fetch single product error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
