'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Asset = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  salesCount: number;
  viewsCount: number;
  status: string;
  earnings: number;
  updatedAt: string;
};

type Sale = {
  title: string;
  category: string;
  imageUrl: string;
  amount: number;
  quantity: number;
  createdAt: string;
};

type DashboardData = {
  user: { name: string };
  assets: Asset[];
  recentSales: Sale[];
  stats: { totalEarnings: number; totalSales: number; activeAssets: number };
};

const fallbackImage = '/images/product-saas-checkout.jpg';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    void fetch('/api/dashboard')
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(setData)
      .catch(() => setError('Please log in to view your author dashboard.'));
  }, []);

  const stats = data?.stats ?? { totalEarnings: 0, totalSales: 0, activeAssets: 0 };
  const assets = data?.assets ?? [];
  const recentSales = data?.recentSales ?? [];
  const totalProducts = assets.length;
  const totalViews = assets.reduce((sum, asset) => sum + asset.viewsCount, 0);

  const overviewCards = [
    {
      label: 'Total Sales',
      value: `$${stats.totalEarnings.toFixed(2)}`,
      note: 'Lifetime revenue',
      accent: 'text-primary',
      badge: '+12.5%',
      badgeClass: 'bg-secondary-container/30 text-secondary',
    },
    {
      label: 'Total Products',
      value: totalProducts.toString(),
      note: `${Math.max(0, stats.activeAssets)} active`,
      accent: 'text-on-surface',
      badge: '',
      badgeClass: '',
    },
    {
      label: 'Active Customers',
      value: stats.totalSales.toString(),
      note: 'Orders fulfilled',
      accent: 'text-on-surface',
      badge: '+4.2%',
      badgeClass: 'bg-secondary-container/30 text-secondary',
    },
    {
      label: 'Marketplace Views',
      value: totalViews.toLocaleString(),
      note: 'Combined asset visits',
      accent: 'text-on-surface',
      badge: '4.8 ★',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
  ];

  const activity = [
    {
      title: 'New Product Published',
      description: assets[0]?.title || 'Your latest asset is now live',
      time: '2 hrs ago',
      type: 'publish',
      image: assets[0]?.imageUrl || fallbackImage,
      status: 'Published',
      price: assets[0] ? `$${assets[0].earnings.toFixed(2)}` : '$24.00',
    },
    {
      title: 'Order Received',
      description: recentSales[0]?.title || 'New purchase on your marketplace',
      time: '3 hrs ago',
      type: 'shipping',
      image: recentSales[0]?.imageUrl || fallbackImage,
      status: 'Processing',
      price: recentSales[0] ? `$${recentSales[0].amount.toFixed(2)}` : '$120.00',
    },
    {
      title: 'Draft Saved',
      description: 'Minimalist SaaS UI Kit is ready for review',
      time: '5 hrs ago',
      type: 'edit',
      image: fallbackImage,
      status: 'Draft',
      price: '$49.00',
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto">
      {error && <p className="text-error mb-6">{error}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <aside className="xl:col-span-3 space-y-6 hidden xl:block">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Overview</h3>
            <div className="space-y-6">
              {overviewCards.map((card) => (
                <div key={card.label}>
                  <p className="font-label-sm text-on-surface-variant mb-1">{card.label}</p>
                  <div className="flex items-end gap-3">
                    <span className={`font-headline-lg font-bold ${card.accent}`}>{card.value}</span>
                    {card.badge && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg mb-1 text-label-sm font-label-sm ${card.badgeClass}`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-on-surface-variant font-label-sm mt-1">{card.note}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="xl:col-span-6 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md font-bold uppercase overflow-hidden">
                {data?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 bg-surface-container-low rounded-full px-6 py-4 cursor-pointer hover:bg-surface-variant/30 transition-colors">
                <span className="text-on-surface-variant font-body-lg">What would you like to create today?</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2 border-t border-surface-variant/20 mt-4">
              <Link
                href="/dashboard/upload"
                className="flex-1 flex items-center justify-center gap-2 bg-primary-container/20 text-primary hover:bg-primary-container/40 py-3 rounded-2xl transition-colors font-label-md font-bold"
              >
                <span className="material-symbols-outlined">add_photo_alternate</span>
                Upload New Design
              </Link>
              <button className="flex-1 flex items-center justify-center gap-2 bg-secondary-container/30 text-secondary hover:bg-secondary-container/50 py-3 rounded-2xl transition-colors font-label-md font-bold">
                <span className="material-symbols-outlined">design_services</span>
                Create Custom Offer
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2 px-2">
              <h2 className="font-headline-md text-on-surface font-bold">Recent Activity</h2>
              <span className="text-on-surface-variant font-label-sm">Today</span>
            </div>

            {activity.map((item) => (
              <div key={item.title} className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.type === 'publish'
                        ? 'bg-secondary-container/30 text-secondary'
                        : item.type === 'shipping'
                          ? 'bg-primary-container/20 text-primary'
                          : 'bg-surface-variant/50 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {item.type === 'publish' ? 'publish' : item.type === 'shipping' ? 'local_shipping' : 'edit_document'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-label-md text-on-surface font-bold">{item.title}</h4>
                        <p className="font-body-sm text-on-surface-variant mt-1">{item.description}</p>
                      </div>
                      <span className="text-on-surface-variant text-[12px]">{item.time}</span>
                    </div>

                    <div className="mt-4 flex gap-4 p-4 bg-surface-container-low rounded-2xl border border-surface-variant/20">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/50">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface">{item.description}</p>
                        <p className="font-body-sm text-on-surface-variant mb-2">Price: {item.price}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${item.status === 'Published' ? 'bg-secondary-container/50 text-secondary' : item.status === 'Processing' ? 'bg-primary-container/20 text-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="xl:col-span-3 space-y-6 hidden xl:block">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">checklist</span>
              Action Needed
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="flex-1">
                  <p className="font-label-md text-on-surface">Hand-drawn Icons Vol. 2</p>
                  <p className="font-body-sm text-on-surface-variant">Pending Review</p>
                </div>
              </li>
              <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="font-label-md text-on-surface">Order #RO-9845</p>
                  <p className="font-body-sm text-on-surface-variant">Processing expected tomorrow</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-headline-md text-on-surface">Sales (7d)</h3>
              <span className="material-symbols-outlined text-on-surface-variant">trending_up</span>
            </div>
            <div className="h-24 flex items-end gap-2 justify-between mt-4">
              {[40, 60, 30, 80, 50, 90, 70].map((height, index) => (
                <div
                  key={index}
                  className={`w-full rounded-t-lg ${index === 5 ? 'bg-secondary' : 'bg-secondary-container/40 hover:bg-secondary transition-colors'}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white/50">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Top Seller</h3>
            <div className="bg-surface-container-low rounded-2xl p-4 text-center">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden mx-auto mb-3 border-2 border-white shadow-sm">
                <Image src={fallbackImage} alt="Top seller" fill className="object-cover" />
              </div>
              <p className="font-label-md text-on-surface font-bold">Cyberpunk City 3D Model</p>
              <p className="font-body-sm text-secondary mt-1">84 Sales this week</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
