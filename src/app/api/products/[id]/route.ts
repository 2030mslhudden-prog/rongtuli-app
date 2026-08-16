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
      if (!session || (session.userId !== product.authorId && session.role !== 'ADMIN')) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    }
    await prisma.product.update({ where: { id }, data: { viewsCount: { increment: 1 } } });
    return NextResponse.json({ product: { ...product, viewsCount: product.viewsCount + 1 } });
  } catch (error) {
    console.error('Fetch single product error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    // Only the author or an ADMIN can edit the product
    if (existing.authorId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized operation' }, { status: 403 });
    }

    const { title, description, category, price, imageUrl, fileUrl, tags, status } = await request.json();
    const numericPrice = Number(price);

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (category !== undefined) updateData.category = category;
    if (price !== undefined && Number.isFinite(numericPrice) && numericPrice >= 0) updateData.price = numericPrice;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (fileUrl !== undefined) updateData.fileUrl = fileUrl;
    if (tags !== undefined) updateData.tags = tags;
    if (status !== undefined) updateData.status = status;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Unable to update design asset' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    // Only the author or an ADMIN can delete the product
    if (existing.authorId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized operation' }, { status: 403 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Unable to delete design asset' }, { status: 500 });
  }
}
