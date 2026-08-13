import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface R2Config {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl?: string;
  region: string;
}

export function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID || process.env.CLOUDFLARE_R2_ACCOUNT_ID || '';
  const bucket = process.env.R2_BUCKET_NAME || process.env.CLOUDFLARE_R2_BUCKET_NAME || 'rongtulidesign-files';
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '';
  const endpoint =
    process.env.R2_ENDPOINT_URL ||
    process.env.R2_ENDPOINT ||
    process.env.CLOUDFLARE_R2_ENDPOINT ||
    (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '');
  const publicUrl =
    process.env.R2_PUBLIC_URL ||
    process.env.CLOUDFLARE_R2_PUBLIC_URL ||
    (accountId ? `https://${bucket}.${accountId}.r2.dev` : '');

  if (!bucket || !accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error('R2 storage is not configured. Add R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_ENDPOINT_URL (or R2_ACCOUNT_ID) to the environment.');
  }

  return {
    bucket,
    endpoint,
    accessKeyId,
    secretAccessKey,
    publicUrl: publicUrl || undefined,
    region: 'auto',
  };
}

export function getR2Client(): S3Client {
  const { endpoint, accessKeyId, secretAccessKey, region } = getR2Config();

  return new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function buildPublicObjectUrl(key: string): string {
  const { publicUrl, endpoint, bucket } = getR2Config();
  const normalizedKey = encodeURIComponent(key);

  if (publicUrl) {
    return `${publicUrl.replace(/\/$/, '')}/${normalizedKey}`;
  }

  return `${endpoint.replace(/\/$/, '')}/${bucket}/${normalizedKey}`;
}

export async function createSignedDownloadUrl(key: string, expiresIn = 60 * 60) {
  const client = getR2Client();
  const { bucket } = getR2Config();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

export async function uploadFileToR2(key: string, body: Buffer | Uint8Array, contentType: string) {
  const client = getR2Client();
  const { bucket } = getR2Config();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType || 'application/octet-stream',
    }),
  );

  return {
    key,
    url: buildPublicObjectUrl(key),
  };
}
