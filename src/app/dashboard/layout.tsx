'use client';
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center px-5 py-4 border-b border-outline-variant bg-surface sticky top-0 z-30">
          <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">Rongtuli</span>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-on-surface rounded-full hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        <main className="flex-1 p-margin-mobile md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
