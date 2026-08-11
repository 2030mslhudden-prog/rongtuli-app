'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Asset = { id: string; title: string; category: string; salesCount: number; viewsCount: number; status: string; imageUrl: string; updatedAt: string; earnings: number };

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { void fetch('/api/dashboard').then(async (response) => { if (!response.ok) throw new Error(); return response.json(); }).then((data) => setAssets(data.assets)).catch(() => setError('Please log in to view your assets.')); }, []);
  const active = assets.filter((asset) => asset.status === 'ACTIVE').length;
  const sales = assets.reduce((sum, asset) => sum + asset.salesCount, 0);
  const views = assets.reduce((sum, asset) => sum + asset.viewsCount, 0);
  return <div>
    <div className="flex justify-between items-center mb-8"><div><h1 className="text-headline-lg text-on-surface">My Assets</h1><p className="text-body-md text-on-surface-variant">Manage all your published and pending designs.</p></div><Link href="/dashboard/upload" className="bg-primary text-on-primary px-5 py-2.5 rounded-lg">Upload New</Link></div>
    {error && <p className="text-error mb-6">{error}</p>}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">{[['Total Assets', assets.length], ['Active', active], ['Total Sales', sales], ['Total Views', views.toLocaleString()]].map(([label, value]) => <div key={String(label)} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4"><p className="text-label-sm text-on-surface-variant">{label}</p><p className="text-headline-md text-on-surface">{value}</p></div>)}</div>
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-x-auto"><table className="w-full"><thead className="bg-surface-container-low text-left"><tr>{['Asset', 'Category', 'Sales', 'Earnings', 'Views', 'Status', 'Updated'].map((label) => <th key={label} className="px-5 py-4 text-label-sm text-on-surface-variant">{label}</th>)}</tr></thead><tbody>{assets.map((asset) => <tr key={asset.id} className="border-t border-outline-variant"><td className="px-5 py-4"><div className="flex gap-3 items-center"><div className="relative w-12 h-10 overflow-hidden rounded"><Image src={asset.imageUrl} alt={asset.title} fill className="object-cover" /></div>{asset.title}</div></td><td className="px-5 py-4">{asset.category}</td><td className="px-5 py-4">{asset.salesCount}</td><td className="px-5 py-4 text-tertiary">${asset.earnings.toFixed(2)}</td><td className="px-5 py-4">{asset.viewsCount.toLocaleString()}</td><td className="px-5 py-4"><span className={asset.status === 'ACTIVE' ? 'text-secondary' : 'text-on-surface-variant'}>{asset.status}</span></td><td className="px-5 py-4">{new Date(asset.updatedAt).toLocaleDateString()}</td></tr>)}</tbody></table>{assets.length === 0 && !error && <p className="p-8 text-on-surface-variant">No assets yet.</p>}</div>
  </div>;
}
