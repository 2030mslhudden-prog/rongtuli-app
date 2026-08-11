'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Asset = { id: string; title: string; imageUrl: string; salesCount: number; status: string; earnings: number };
type Sale = { title: string; category: string; imageUrl: string; amount: number; quantity: number; createdAt: string };
type DashboardData = { user: { name: string }; assets: Asset[]; recentSales: Sale[]; stats: { totalEarnings: number; totalSales: number; activeAssets: number } };

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { void fetch('/api/dashboard').then(async (response) => { if (!response.ok) throw new Error(); return response.json(); }).then(setData).catch(() => setError('Please log in to view your author dashboard.')); }, []);
  const stats = data?.stats ?? { totalEarnings: 0, totalSales: 0, activeAssets: 0 };
  return <div>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4"><div><h1 className="text-headline-lg text-on-surface mb-2">Welcome back{data ? `, ${data.user.name}` : ''} 👋</h1><p className="text-body-md text-on-surface-variant">Here&apos;s what&apos;s happening with your assets today.</p></div><Link href="/dashboard/upload" className="bg-primary text-on-primary px-6 py-3 rounded-lg">Upload New Design</Link></div>
    {error && <p className="text-error mb-6">{error}</p>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">{[['Total Earnings', `$${stats.totalEarnings.toFixed(2)}`, 'account_balance_wallet'], ['Total Sales', stats.totalSales.toString(), 'shopping_cart'], ['Active Assets', stats.activeAssets.toString(), 'category']].map(([label, value, icon]) => <div key={label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6"><span className="material-symbols-outlined text-primary">{icon}</span><p className="text-label-md text-on-surface-variant mt-4">{label}</p><p className="text-headline-lg text-on-surface">{value}</p></div>)}</div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"><Link href="/dashboard/upload" className="lg:col-span-2 bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl p-12 text-center"><span className="material-symbols-outlined text-[40px] text-primary">cloud_upload</span><h2 className="text-headline-md text-on-surface mt-3">Upload a new design</h2><p className="text-on-surface-variant">Add an asset to your marketplace portfolio.</p></Link><div><h2 className="text-headline-md text-on-surface mb-4">Recent Sales</h2><div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">{data?.recentSales.map((sale, index) => <div key={index} className="flex items-center gap-3"><div className="relative w-10 h-10 rounded overflow-hidden"><Image src={sale.imageUrl} alt={sale.title} fill className="object-cover" /></div><div className="flex-1 min-w-0"><p className="truncate text-label-md text-on-surface">{sale.title}</p><p className="text-label-sm text-on-surface-variant">{sale.category}</p></div><span className="text-tertiary">${sale.amount.toFixed(2)}</span></div>)}{data && data.recentSales.length === 0 && <p className="text-on-surface-variant">No sales yet.</p>}</div></div></div>
    <div><div className="flex justify-between mb-5"><h2 className="text-headline-md text-on-surface">My Assets</h2><Link href="/dashboard/assets" className="text-secondary">View all</Link></div><div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-x-auto"><table className="w-full"><thead className="bg-surface-container-low"><tr>{['Asset', 'Sales', 'Earnings', 'Status'].map((label) => <th key={label} className="text-left px-6 py-4 text-label-sm text-on-surface-variant">{label}</th>)}</tr></thead><tbody>{data?.assets.slice(0, 5).map((asset) => <tr key={asset.id} className="border-t border-outline-variant"><td className="px-6 py-4 flex items-center gap-3"><div className="relative w-10 h-10 overflow-hidden rounded"><Image src={asset.imageUrl} alt={asset.title} fill className="object-cover" /></div>{asset.title}</td><td className="px-6 py-4">{asset.salesCount}</td><td className="px-6 py-4 text-tertiary">${asset.earnings.toFixed(2)}</td><td className="px-6 py-4"><span className={asset.status === 'ACTIVE' ? 'text-secondary' : 'text-on-surface-variant'}>{asset.status}</span></td></tr>)}</tbody></table></div></div>
  </div>;
}
