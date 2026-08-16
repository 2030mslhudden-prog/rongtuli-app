import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** GET /api/orders/[id] — Get a single order by DB id (owner or admin only) */
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, title: true, imageUrl: true, fileUrl: true, price: true },
            },
          },
        },
      },
    });

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    // Only the owner or an admin may read this order
    if (order.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

/** PATCH /api/orders/[id] — Admin: update order status (PAID | REJECTED | PENDING) */
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const session = await getCurrentSession();
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    if (session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden — admins only' }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status: string };

    const allowedStatuses = ['PENDING', 'PAID', 'REJECTED', 'CANCELLED'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Allowed: ${allowedStatuses.join(', ')}` }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const updated = await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id },
        data: { status },
        include: { items: { include: { product: true } } },
      });

      // If newly PAID, increment product sales counts
      if (status === 'PAID' && order.status !== 'PAID') {
        await Promise.all(
          updatedOrder.items.map((item) =>
            tx.product.update({
              where: { id: item.productId },
              data: { salesCount: { increment: item.quantity } },
            })
          )
        );
      }

      return updatedOrder;
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
