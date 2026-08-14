'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/dashboard', icon: 'dashboard' },
  { label: 'Products', href: '/dashboard/assets', icon: 'inventory_2' },
  { label: 'Sales', href: '/dashboard/earnings', icon: 'payments' },
  { label: 'Custom Orders', href: '/dashboard/analytics', icon: 'shopping_cart_checkout' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];

interface DashboardSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

interface UserProfile {
  name: string;
  email: string;
  role?: string;
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
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav
        className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest/80 backdrop-blur-md border-r border-surface-variant/30 z-50 flex flex-col py-8 px-6 transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-3xl">palette</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">Rongtuli</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Design Marketplace</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mb-8 p-3 rounded-2xl bg-surface-container-low border border-white/50 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 text-headline-md font-bold uppercase">
            {user ? user.name.charAt(0) : 'A'}
          </div>
          <div className="flex flex-col truncate">
            <span className="font-label-md text-label-md text-on-surface truncate">{user ? user.name : 'Admin Profile'}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{user?.role ? user.role : 'Design Admin'}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-3xl transition-colors ${
                  isActive
                    ? 'text-secondary font-bold bg-secondary-container/40'
                    : 'text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20'
                }`}
              >
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: '"FILL" 1' } : undefined}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href="/dashboard/upload"
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3 px-4 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors shadow-sm hover:shadow-md"
          >
            <span className="material-symbols-outlined">upload</span>
            <span>Upload Asset</span>
          </Link>

          <div className="flex flex-col gap-1 border-t border-outline-variant pt-4 mt-4">
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
