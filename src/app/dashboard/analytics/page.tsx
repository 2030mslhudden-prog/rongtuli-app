'use client';
import React from 'react';

const analyticsData = [
  { label: 'Total Views', value: '10,026', change: '+18.3%', icon: 'visibility', trend: 'up' },
  { label: 'Download Rate', value: '4.2%', change: '+0.8%', icon: 'download', trend: 'up' },
  { label: 'Wishlist Adds', value: '324', change: '-2.1%', icon: 'favorite', trend: 'down' },
  { label: 'Avg. Rating', value: '4.8', change: '+0.2', icon: 'star', trend: 'up' },
];

const topAssets = [
  { title: 'Modern SaaS UI Kit', views: 3840, sales: 124, rate: '3.2%', imageUrl: '/images/product-saas-pro.jpg' },
  { title: 'Nexus Dashboard UI', views: 1980, sales: 67, rate: '3.4%', imageUrl: '/images/product-nexus-dashboard.jpg' },
  { title: 'Aurora Serif Font', views: 2210, sales: 98, rate: '4.4%', imageUrl: '/images/product-aurora-font.jpg' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const viewData = [1200, 1850, 1440, 2100, 1680, 3100, 2700, 3540];
const maxV = Math.max(...viewData);

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-1">Analytics</h1>
        <p className="text-body-md font-body-md text-on-surface-variant">Track views, conversions, and performance of your assets.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {analyticsData.map((item, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: '"FILL" 1' }}>{item.icon}</span>
              <span className={`text-label-sm font-label-sm px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                item.trend === 'up' ? 'bg-secondary-container text-tertiary' : 'bg-error-container text-error'
              }`}>
                <span className="material-symbols-outlined text-[12px]">{item.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                {item.change}
              </span>
            </div>
            <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">{item.label}</p>
            <h2 className="text-headline-md font-headline-md text-on-surface">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Views Chart */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md font-headline-md text-on-surface">Views Over Time</h2>
          <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">2026</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {viewData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-label-sm font-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                {val.toLocaleString()}
              </span>
              <div
                className="w-full bg-secondary rounded-t-md hover:bg-on-secondary-container transition-colors cursor-pointer"
                style={{ height: `${(val / maxV) * 130}px` }}
              />
              <span className="text-label-sm font-label-sm text-on-surface-variant">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Assets */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-outline-variant">
          <h2 className="text-headline-md font-headline-md text-on-surface">Top Performing Assets</h2>
        </div>
        <div className="divide-y divide-outline-variant">
          {topAssets.map((asset, i) => (
            <div key={i} className="flex items-center gap-5 px-6 py-4 hover:bg-surface-container-low transition-colors">
              <span className="text-label-sm font-label-sm text-on-surface-variant w-4">{i + 1}</span>
              <div className="w-12 h-10 rounded-lg overflow-hidden border border-outline-variant relative shrink-0">
                <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-label-md font-label-md text-on-surface">{asset.title}</p>
              </div>
              <div className="text-right">
                <p className="text-label-md font-label-md text-on-surface">{asset.views.toLocaleString()} views</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">{asset.sales} sales · {asset.rate} CTR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
