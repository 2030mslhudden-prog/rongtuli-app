import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rongtuli_super_secret_jwt_token_key_2026_safe_and_secure'
);
const TOKEN_COOKIE_NAME = 'rongtuli_auth_token';
const ADMIN_EMAILS = new Set([
  'mslhfr1999@gmail.com',
  '2030mslhudden@gmail.com'
]);
const ALLOWED_ROLES = new Set(['ADMIN', 'AUTHOR', 'CUSTOMER', 'COMMERCIAL_MEMBER', 'COMMERCIAL', 'MEMBER']);

function getEffectiveRole(email?: string, role?: string): string {
  const normalizedEmail = email?.toLowerCase().trim() ?? '';
  if (ADMIN_EMAILS.has(normalizedEmail)) {
    return 'ADMIN';
  }

  const normalizedRole = (role ?? 'AUTHOR').toUpperCase().replace(/\s+/g, '_');
  if (normalizedRole === 'PERSONAL') {
    return 'AUTHOR';
  }

  return ALLOWED_ROLES.has(normalizedRole) ? normalizedRole : 'AUTHOR';
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const email = typeof payload.email === 'string' ? payload.email : '';
    const role = typeof payload.role === 'string' ? payload.role : '';
    const effectiveRole = getEffectiveRole(email, role);

    if (effectiveRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
