'use client';
import React, { useState } from 'react';

const earningsHistory = [
  { id: 1, asset: 'Modern SaaS UI Kit', buyer: 'john_d**', date: 'Aug 9, 2026', license: 'Extended', amount: '$120.00', status: 'Paid' },
  { id: 2, asset: 'Aurora Serif Font Family', buyer: 'sarah_k**', date: 'Aug 9, 2026', license: 'Commercial', amount: '$45.00', status: 'Paid' },
  { id: 3, asset: 'Organic Vector Patterns', buyer: 'mk_studi**', date: 'Aug 8, 2026', license: 'Personal', amount: '$15.00', status: 'Paid' },
  { id: 4, asset: 'Nexus Dashboard UI', buyer: 'techflows**', date: 'Aug 7, 2026', license: 'Extended', amount: '$120.00', status: 'Paid' },
  { id: 5, asset: 'Grotesk Display Font', buyer: 'agencyx**', date: 'Aug 5, 2026', license: 'Commercial', amount: '$29.00', status: 'Paid' },
  { id: 6, asset: 'Modern SaaS UI Kit', buyer: 'devport**', date: 'Aug 3, 2026', license: 'Personal', amount: '$49.00', status: 'Pending' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const barData = [820, 1240, 980, 1560, 1120, 2100, 1870, 2340];
const maxBar = Math.max(...barData);

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'pending'>('all');
  const filtered = activeTab === 'all' ? earningsHistory : earningsHistory.filter(e => e.status.toLowerCase() === activeTab);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-1">Earnings</h1>
        <p className="text-body-md font-body-md text-on-surface-variant">Track your revenue and payout history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Earned', value: '$4,250.00', sub: 'All time', icon: 'account_balance_wallet', color: 'bg-secondary-container text-secondary' },
          { label: 'This Month', value: '$1,240.00', sub: '+12.5% vs last month', icon: 'trending_up', color: 'bg-tertiary-fixed text-tertiary' },
          { label: 'Pending Payout', value: '$49.00', sub: 'Processed on Aug 15', icon: 'schedule', color: 'bg-primary-fixed text-primary' },
        ].map((card, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>{card.icon}</span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant mb-1">{card.label}</p>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">{card.value}</h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-md font-headline-md text-on-surface">Revenue Overview</h2>
          <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">2026</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {barData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-label-sm font-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                ${val}
              </span>
              <div
                className="w-full bg-primary rounded-t-md hover:bg-primary-container transition-colors cursor-pointer"
                style={{ height: `${(val / maxBar) * 130}px` }}
              />
              <span className="text-label-sm font-label-sm text-on-surface-variant">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-outline-variant flex justify-between items-center">
          <h2 className="text-headline-md font-headline-md text-on-surface">Transaction History</h2>
          <div className="flex gap-2">
            {(['all', 'paid', 'pending'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-label-sm font-label-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">Asset</th>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">Buyer</th>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">Date</th>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">License</th>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">Amount</th>
                <th className="text-left px-6 py-3 text-label-sm font-label-sm text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-label-md font-label-md text-on-surface">{row.asset}</td>
                  <td className="px-6 py-4 text-body-sm font-body-sm text-on-surface-variant">{row.buyer}</td>
                  <td className="px-6 py-4 text-body-sm font-body-sm text-on-surface-variant">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm px-2 py-0.5 rounded">{row.license}</span>
                  </td>
                  <td className="px-6 py-4 text-label-md font-label-md text-tertiary font-bold">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-label-sm font-label-sm px-2 py-1 rounded-full ${
                      row.status === 'Paid' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-fixed text-primary'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
