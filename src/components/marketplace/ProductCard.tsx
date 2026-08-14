import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { buildWhatsAppPurchaseUrl, formatAssetPrice, isFreeAsset } from '@/lib/asset-actions';

interface ProductCardProps {
  id?: number | string;
  title: string;
  author: string;
  price: string | number;
  rating: number;
  imageUrl: string;
  category: string;
  fileUrl?: string | null;
}

export default function ProductCard({
  id,
  title,
  author,
  price,
  rating,
  imageUrl,
  category,
  fileUrl,
}: ProductCardProps) {
  const isFree = isFreeAsset(price);
  const ctaHref = isFree
    ? fileUrl
      ? `/api/files/download?key=${encodeURIComponent(fileUrl)}`
      : `/product/${id || 1}`
    : buildWhatsAppPurchaseUrl(title);

  return (
    <div className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-[0px_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-2 shadow-sm">
      <Link href={`/product/${id || 1}`} className="block">
        <div className="aspect-video relative overflow-hidden bg-surface-container">
          <Image
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded text-label-sm font-label-sm text-on-surface font-bold">
            {category}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-surface-container-lowest/90 text-label-sm font-label-sm text-on-surface font-bold">
            {isFree ? 'Free' : 'Paid'}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <h3 className="text-headline-sm font-headline-md text-[#0F172A] mb-1 truncate">
          {title}
        </h3>
        <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
          by {author}
        </p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/30 gap-3">
          <span className="text-headline-sm font-headline-md text-primary font-bold">
            {formatAssetPrice(price)}
          </span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant font-bold">
            <span
              className="material-symbols-outlined text-[14px] text-tertiary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>{' '}
            {rating}
          </div>
        </div>

        <a
          href={ctaHref}
          target={isFree ? undefined : '_blank'}
          rel={isFree ? undefined : 'noreferrer'}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-label-md font-label-md text-on-primary bg-primary hover:opacity-90 transition-opacity"
        >
          {isFree ? 'Download' : 'Buy via WhatsApp'}
        </a>
      </div>
    </div>
  );
}
