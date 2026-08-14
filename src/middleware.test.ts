import test from 'node:test';
import assert from 'node:assert/strict';
import { SignJWT } from 'jose';
import { middleware } from './middleware.ts';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'rongtuli_super_secret_jwt_token_key_2026_safe_and_secure'
);

async function createToken(email: string, role: string) {
  return new SignJWT({ userId: 'test-1', email, name: 'Test User', role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

test('redirects unauthenticated dashboard access to login', async () => {
  const request = {
    nextUrl: new URL('http://localhost/dashboard'),
    cookies: { get: () => undefined },
    url: 'http://localhost/dashboard',
  } as any;

  const response = await middleware(request);

  assert.equal(response.status, 307);
  assert.match(response.headers.get('location') ?? '', /\/login/);
});

test('redirects non-admin authors from dashboard routes', async () => {
  const authorToken = await createToken('author@example.com', 'AUTHOR');
  const request = {
    nextUrl: new URL('http://localhost/dashboard/assets'),
    cookies: { get: (name) => (name === 'rongtuli_auth_token' ? { value: authorToken } : undefined) },
    url: 'http://localhost/dashboard/assets',
  } as any;

  const response = await middleware(request);

  assert.equal(response.status, 307);
  assert.match(response.headers.get('location') ?? '', /^\//);
});

test('allows admin sessions to access dashboard routes', async () => {
  const adminToken = await createToken('mslhfr1999@gmail.com', 'ADMIN');
  const request = {
    nextUrl: new URL('http://localhost/dashboard/assets'),
    cookies: { get: (name) => (name === 'rongtuli_auth_token' ? { value: adminToken } : undefined) },
    url: 'http://localhost/dashboard/assets',
  } as any;

  const response = await middleware(request);

  assert.equal(response.status, 200);
});
