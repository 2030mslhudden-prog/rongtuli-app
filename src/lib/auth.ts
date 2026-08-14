import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rongtuli_super_secret_jwt_token_key_2026_safe_and_secure'
);

const TOKEN_COOKIE_NAME = 'rongtuli_auth_token';
export const SUPER_ADMIN_EMAIL = 'mslhfr1999@gmail.com';

export interface UserSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function getEffectiveUserRole(email?: string, role?: string): string {
  const normalizedEmail = email?.toLowerCase().trim() ?? '';
  if (normalizedEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return 'ADMIN';
  }

  const normalizedRole = (role ?? 'AUTHOR').toUpperCase();
  return ['ADMIN', 'AUTHOR', 'CUSTOMER'].includes(normalizedRole) ? normalizedRole : 'AUTHOR';
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function signToken(payload: UserSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserSessionPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as UserSessionPayload;
  } catch (error) {
    return null;
  }
}

export async function setSessionCookie(payload: UserSessionPayload) {
  const effectivePayload = {
    ...payload,
    role: getEffectiveUserRole(payload.email, payload.role),
  };

  const token = await signToken(effectivePayload);
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export async function getCurrentSession(): Promise<UserSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifyToken(token);
  if (!session) return null;

  return {
    ...session,
    role: getEffectiveUserRole(session.email, session.role),
  };
}
