import { NextResponse } from 'next/server';
import { createSignedDownloadUrl } from '@/lib/r2';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key || !key.trim()) {
      return NextResponse.json({ error: 'Missing file key.' }, { status: 400 });
    }

    const signedUrl = await createSignedDownloadUrl(key.trim(), 60 * 60);
    return NextResponse.redirect(signedUrl, 307);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to generate the download URL.';
    console.error('Download file error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
