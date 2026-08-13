import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { createSignedDownloadUrl, uploadFileToR2 } from '@/lib/r2';

export const runtime = 'nodejs';

function sanitizeFileName(fileName: string): string {
  const base = fileName
    .split('.')
    .slice(0, -1)
    .join('.')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  const extension = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.')) : '';
  const fallback = 'file';
  const safeBase = base || fallback;

  return `${safeBase}${extension}`;
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A file is required.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const key = `${session.userId}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const upload = await uploadFileToR2(key, fileBuffer, file.type || 'application/octet-stream');
    const signedDownloadUrl = await createSignedDownloadUrl(key, 60 * 60 * 24);

    return NextResponse.json(
      {
        success: true,
        key,
        url: upload.url,
        downloadUrl: signedDownloadUrl,
        contentType: file.type || 'application/octet-stream',
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to upload the file.';
    console.error('Upload file error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
