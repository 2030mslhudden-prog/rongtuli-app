import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id?: number | string;
  title: string;
  author: string;
  price: string | number;
  rating: number;
  imageUrl: string;
  category: string;
}

export default function ProductCard({
  id,
  title,
  author,
  price,
  rating,
  imageUrl,
  category,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id || 1}`} className="group bg-surface-container-lowest rounded-xl border-outline-variant overflow-hidden hover:shadow-[0px_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-2 shadow-sm block">
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
        <button className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors opacity-0 group-hover:opacity-100">
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-headline-sm font-headline-md text-[#0F172A] mb-1 truncate">
          {title}
        </h3>
        <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
          by {author}
        </p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/30">
          <span className="text-headline-sm font-headline-md text-primary font-bold">
            {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
          </span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm text-on-surface-variant font-bold">
            <span
              className="material-symbols-outlined text-[14px] text-tertiary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>{" "}
            {rating}
          </div>
        </div>
      </div>
    </Link>
  );
}
