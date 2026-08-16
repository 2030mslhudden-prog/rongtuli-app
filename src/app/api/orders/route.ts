import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    const { items, paymentMethod } = await request.json();
    if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });

    const requestedItems = items.map((item: { id?: unknown; quantity?: unknown; licenseType?: unknown }) => ({
      id: typeof item.id === 'string' ? item.id : '',
      quantity: Number.isInteger(item.quantity) && Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      licenseType: typeof item.licenseType === 'string' ? item.licenseType.slice(0, 50) : 'Personal',
    }));
    const ids = [...new Set(requestedItems.map((item) => item.id))];
    if (ids.length !== requestedItems.length || ids.some((id) => !id)) return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });

    const products = await prisma.product.findMany({ where: { id: { in: ids }, status: 'ACTIVE' }, select: { id: true, price: true } });
    if (products.length !== ids.length) return NextResponse.json({ error: 'One or more products are unavailable' }, { status: 400 });
    const productById = new Map(products.map((product) => [product.id, product]));
    const orderItems = requestedItems.map((item) => ({ ...item, product: productById.get(item.id)! }));
    const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const totalAmount = subtotal + tax;

    // Only a verified provider webhook may mark a production order as paid.
    // This flag exists exclusively for local end-to-end testing.
    const paymentConfirmed = process.env.PAYMENT_SIMULATION_ENABLED === 'true';
    const order = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber: `RT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          subtotal, tax, totalAmount, paymentMethod: typeof paymentMethod === 'string' ? paymentMethod : 'bkash',
          status: paymentConfirmed ? 'PAID' : 'PENDING', userId: session?.userId || null,
          items: { create: orderItems.map((item) => ({ productId: item.id, licenseType: item.licenseType, price: item.product.price, quantity: item.quantity })) },
        },
        include: { items: true },
      });
      if (paymentConfirmed) {
        await Promise.all(orderItems.map((item) => tx.product.update({ where: { id: item.id }, data: { salesCount: { increment: item.quantity } } })));
      }
      return order;
    });
    return NextResponse.json({ success: true, order, paymentRequired: !paymentConfirmed }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Unable to process order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (orderNumber) {
      const order = await prisma.order.findFirst({
        where: {
          orderNumber,
          userId: session.userId,
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  imageUrl: true,
                  fileUrl: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      return NextResponse.json({ order });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
