import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password, accountType, address } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'পূর্ণ নাম, ইমেইল এবং পাসওয়ার্ড প্রদান করতে হবে' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const passwordHash = await hashPassword(password);
    const isSuperAdmin = normalizedEmail === 'mslhfr1999@gmail.com';

    const newUser = await prisma.user.create({
      data: {
        name: fullName.trim(),
        email: normalizedEmail,
        passwordHash,
        phone: phone || null,
        address: address || null,
        accountType: accountType || 'PERSONAL',
        role: isSuperAdmin ? 'ADMIN' : 'AUTHOR',
      },
    });

    // Automatically sign in user
    await setSessionCookie({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
