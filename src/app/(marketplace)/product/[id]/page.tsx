'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/marketplace/ProductCard';
import { useCartStore } from '@/store/cartStore';

type Product = { id: string; title: string; description: string; category: string; price: number; imageUrl: string; tags: string | null; viewsCount: number; createdAt: string; author: { name: string; avatarUrl: string | null; bio: string | null } };

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const { product } = await response.json();
        setProduct(product);
        const relatedResponse = await fetch(`/api/products?category=${encodeURIComponent(product.category)}`);
        if (relatedResponse.ok) setRelated((await relatedResponse.json()).products.filter((item: Product) => item.id !== product.id).slice(0, 4));
      }
      setLoading(false);
    };
    void load();
  }, [id]);

  if (loading) return <main className="max-w-container-max mx-auto px-margin-mobile py-16 text-on-surface-variant">Loading asset…</main>;
  if (!product) return <main className="max-w-container-max mx-auto px-margin-mobile py-16"><h1 className="text-headline-lg text-on-surface">Asset not found</h1><Link href="/" className="text-secondary mt-4 inline-block">Back to marketplace</Link></main>;

  return <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
    <nav className="mb-6 text-label-sm text-on-surface-variant"><Link href="/" className="hover:text-primary">Home</Link> <span className="mx-2">/</span> {product.category} <span className="mx-2">/</span> {product.title}</nav>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <section className="lg:col-span-8">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-surface-variant bg-surface-container-low"><Image src={product.imageUrl} alt={product.title} fill priority className="object-cover" /></div>
        <div className="mt-8">
          <h2 className="text-headline-md text-on-surface mb-3">About this asset</h2>
          <p className="text-body-md text-on-surface-variant whitespace-pre-line">{product.description || 'No description has been provided yet.'}</p>
          {product.tags && <p className="mt-5 text-label-md text-secondary">{product.tags.split(',').map((tag) => `#${tag.trim()}`).join('  ')}</p>}
        </div>
      </section>
      <aside className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 shadow-sm">
          <span className="text-label-sm text-secondary uppercase">{product.category}</span>
          <h1 className="text-headline-lg text-on-surface mt-2 mb-4">{product.title}</h1>
          <p className="text-headline-xl text-primary mb-6">${product.price.toFixed(2)}</p>
          <button onClick={() => addItem({ id: product.id, title: product.title, author: product.author.name, price: product.price, imageUrl: product.imageUrl, licenseType: 'Personal' })} className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md hover:opacity-90">Add to cart</button>
          <p className="text-body-sm text-on-surface-variant mt-4">Personal license · Lifetime access</p>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex items-center gap-3">
          {product.author.avatarUrl ? <Image src={product.author.avatarUrl} alt={product.author.name} width={48} height={48} className="rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold">{product.author.name.charAt(0)}</div>}
          <div><p className="text-label-sm text-on-surface-variant">Created by</p><p className="text-label-md text-on-surface">{product.author.name}</p></div>
        </div>
        <div className="text-body-sm text-on-surface-variant">{product.viewsCount.toLocaleString()} views · Updated {new Date(product.createdAt).toLocaleDateString()}</div>
      </aside>
    </div>
    {related.length > 0 && <section className="mt-16 pt-10 border-t border-surface-variant"><h2 className="text-headline-md text-on-surface mb-7">More in {product.category}</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{related.map((item) => <ProductCard key={item.id} id={item.id} title={item.title} author={item.author.name} price={item.price} rating={5} category={item.category} imageUrl={item.imageUrl} />)}</div></section>}
  </main>;
}
