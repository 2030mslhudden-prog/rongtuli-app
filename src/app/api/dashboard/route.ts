import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  try {
    const products = await prisma.product.findMany({
      where: { authorId: session.userId },
      include: { orderItems: { select: { price: true, quantity: true, order: { select: { status: true, createdAt: true } } } } },
      orderBy: { updatedAt: 'desc' },
    });
    const assets = products.map((product) => {
      const paidItems = product.orderItems.filter((item) => item.order.status === 'PAID');
      return { ...product, earnings: paidItems.reduce((sum, item) => sum + item.price * item.quantity, 0) };
    });
    const recentSales = assets.flatMap((product) => product.orderItems.filter((item) => item.order.status === 'PAID').map((item) => ({ title: product.title, category: product.category, imageUrl: product.imageUrl, amount: item.price * item.quantity, quantity: item.quantity, createdAt: item.order.createdAt }))).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
    return NextResponse.json({ user: { name: session.name }, assets, recentSales, stats: { totalEarnings: assets.reduce((sum, asset) => sum + asset.earnings, 0), totalSales: assets.reduce((sum, asset) => sum + asset.orderItems.filter((item) => item.order.status === 'PAID').reduce((count, item) => count + item.quantity, 0), 0), activeAssets: assets.filter((asset) => asset.status === 'ACTIVE').length } });
  } catch (error) {
    console.error('Dashboard query error:', error);
    return NextResponse.json({ error: 'Unable to load dashboard' }, { status: 500 });
  }
}
