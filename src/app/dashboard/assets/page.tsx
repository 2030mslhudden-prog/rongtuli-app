'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Asset = {
  id: string;
  title: string;
  category: string;
  salesCount: number;
  viewsCount: number;
  status: string;
  imageUrl: string;
  updatedAt: string;
  earnings: number;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAssets = () => {
    setLoading(true);
    fetch('/api/dashboard')
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        setAssets(data.assets);
        setLoading(false);
      })
      .catch(() => {
        setError('ডিজাইন তালিকা লোড করতে সমস্যা হয়েছে। দয়া করে লগইন করুন।');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে "${title}" ডিজাইনটি মুছে ফেলতে চান?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('ডিজাইনটি সফলভাবে মুছে ফেলা হয়েছে।');
        fetchAssets(); // Refresh list
      } else {
        const err = await response.json();
        alert('ডিজাইন মুছতে সমস্যা হয়েছে: ' + (err.error || response.statusText));
      }
    } catch (error) {
      alert('সার্ভারে সমস্যা হয়েছে।');
    }
  };

  const active = assets.filter((asset) => asset.status === 'ACTIVE').length;
  const sales = assets.reduce((sum, asset) => sum + asset.salesCount, 0);
  const views = assets.reduce((sum, asset) => sum + asset.viewsCount, 0);

  return (
    <div className="max-w-container-max mx-auto p-4 md:p-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">আমার ডিজাইনসমূহ</h1>
          <p className="text-body-md text-on-surface-variant">পাবলিশড এবং পেন্ডিং ডিজাইনের তালিকা পরিচালনা করুন।</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-all font-label-md shadow-sm"
        >
          নতুন ডিজাইন আপলোড
        </Link>
      </div>

      {error && <p className="text-error mb-6 font-bold">{error}</p>}

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          ['মোট ডিজাইন', assets.length],
          ['সক্রিয় ডিজাইন', active],
          ['মোট বিক্রয়', sales],
          ['মোট ভিউজ', views.toLocaleString()],
        ].map(([label, value]) => (
          <div key={String(label)} className="bg-surface-container-lowest border border-outline-variant/35 rounded-xl p-4 shadow-sm">
            <p className="text-label-sm text-on-surface-variant font-medium">{label}</p>
            <p className="text-headline-md text-on-surface mt-1 font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Assets Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                {['ডিজাইন', 'ক্যাটেগরি', 'বিক্রয়', 'আয়', 'ভিউ', 'স্ট্যাটাস', 'আপডেট', 'অ্যাকশন'].map((label) => (
                  <th key={label} className="px-5 py-4 text-label-sm text-on-surface-variant font-bold">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-t border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex gap-3 items-center min-w-[200px]">
                      <div className="relative w-12 h-10 overflow-hidden rounded bg-surface-container border border-outline-variant/20 shrink-0">
                        <Image
                          src={asset.imageUrl}
                          alt={asset.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="font-label-md text-on-surface font-bold truncate max-w-[250px]" title={asset.title}>
                        {asset.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-body-sm text-on-surface-variant">{asset.category}</td>
                  <td className="px-5 py-4 text-body-sm font-semibold">{asset.salesCount}</td>
                  <td className="px-5 py-4 text-body-sm text-secondary font-bold">৳{asset.earnings.toFixed(2)}</td>
                  <td className="px-5 py-4 text-body-sm">{asset.viewsCount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                        asset.status === 'ACTIVE'
                          ? 'bg-secondary/10 text-secondary'
                          : asset.status === 'DRAFT'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {asset.status === 'ACTIVE' ? 'Active' : asset.status === 'DRAFT' ? 'Draft' : asset.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-body-sm text-on-surface-variant">
                    {new Date(asset.updatedAt).toLocaleDateString('bn-BD')}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/assets/${asset.id}/edit`}
                        className="p-1.5 hover:text-primary transition-colors hover:bg-primary/5 rounded"
                        title="সম্পাদনা করুন"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(asset.id, asset.title)}
                        className="p-1.5 hover:text-error transition-colors hover:bg-error/5 rounded cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {assets.length === 0 && !loading && !error && (
          <div className="p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-2 text-outline">inventory_2</span>
            <p className="text-body-md">এখনো কোনো ডিজাইন আপলোড করা হয়নি।</p>
          </div>
        )}
        {loading && (
          <div className="p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2 animate-spin text-primary">autorenew</span>
            <p className="text-body-sm">লোড হচ্ছে…</p>
          </div>
        )}
      </div>
    </div>
  );
}
