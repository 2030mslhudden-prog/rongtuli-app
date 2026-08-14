import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, getEffectiveUserRole, setSessionCookie, SUPER_ADMIN_EMAIL } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ইমেইল এবং পাসওয়ার্ড প্রদান করুন' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ভুল ইমেইল অথবা পাসওয়ার্ড' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'ভুল ইমেইল অথবা পাসওয়ার্ড' },
        { status: 401 }
      );
    }

    const effectiveRole = getEffectiveUserRole(user.email, user.role);

    if (user.email.toLowerCase().trim() === SUPER_ADMIN_EMAIL.toLowerCase()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' },
      });
    }

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: effectiveRole,
    });

    return NextResponse.json({
      success: true,
      message: 'সফলভাবে লগইন হয়েছে',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: effectiveRole,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
