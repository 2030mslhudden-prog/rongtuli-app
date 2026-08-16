'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navigation() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant shadow-sm">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-[64px] gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            alt="Rongtuli Logo"
            src="/images/logo.png"
            width={130}
            height={50}
            className="h-[48px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2 shrink-0">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ডিজাইন খুঁজুন..."
            className="bg-transparent flex-1 text-body-md text-on-surface placeholder:text-on-surface-variant/60 outline-none border-none"
          />
          {searchQuery && (
            <button
              type="submit"
              className="ml-2 px-4 py-1 bg-primary text-white rounded-full text-label-sm font-bold hover:opacity-90 transition-opacity shrink-0"
            >
              খুঁজুন
            </button>
          )}
        </form>

        {/* Right Utility */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="#"
            className="bg-primary text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wider hover:opacity-90 transition-all uppercase shadow-sm hidden sm:block"
          >
            Free
          </Link>

          {isMounted && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors flex items-center gap-1.5 font-bold text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#1a6b4a] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline max-w-[100px] truncate">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-error transition-colors text-on-surface-variant flex items-center gap-0.5"
                title="লগআউট"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hover:text-primary transition-colors text-sm font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span className="hidden sm:inline">লগইন</span>
              </Link>
            </div>
          )}

          <Link
            href="/checkout"
            className="hover:text-primary transition-colors text-sm hidden md:block font-medium"
          >
            Checkout
          </Link>

          <Link
            href="/cart"
            className="hover:text-primary transition-colors flex items-center relative"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
