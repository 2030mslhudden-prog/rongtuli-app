'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'My Assets', href: '/dashboard/assets', icon: 'palette' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'insights' },
  { label: 'Earnings', href: '/dashboard/earnings', icon: 'payments' },
  { label: 'Upload New', href: '/dashboard/upload', icon: 'cloud_upload' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];

interface DashboardSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

interface UserProfile {
  name: string;
  email: string;
  accountType?: string;
}

export default function DashboardSidebar({ mobileOpen, setMobileOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      });
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        className={`bg-surface-container-low border-r border-outline-variant h-full w-64 fixed left-0 top-0 flex-col py-6 px-4 gap-2 z-50 flex transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo + Author */}
        <div className="mb-8 px-4 flex flex-col items-start gap-4">
          <Link href="/" className="text-headline-md font-headline-md font-bold text-primary tracking-tight">
            Rongtuli
          </Link>
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 text-headline-md font-bold uppercase">
              {user ? user.name.charAt(0) : 'C'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-label-md font-label-md text-on-surface font-bold truncate">
                {user ? user.name : 'Creative Author'}
              </h3>
              <p className="text-label-sm font-label-sm text-secondary">
                {user?.accountType ? `${user.accountType} Member` : 'Pro Member'}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: '"FILL" 1' } : undefined}
                >
                  {item.icon}
                </span>
                <span className="text-label-md font-label-md">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-auto flex flex-col gap-4">
          <button className="w-full py-3 px-4 bg-primary text-on-primary text-label-md font-label-md rounded-lg hover:opacity-90 transition-opacity shadow-sm">
            Go Premium
          </button>
          <div className="flex flex-col gap-1 border-t border-outline-variant pt-4">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
              <span className="text-label-sm font-label-sm">Support</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-left w-full"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="text-label-sm font-label-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
