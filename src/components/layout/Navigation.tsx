'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setIsMounted(true);
    // Fetch auth status
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="text-[#1F2937] sticky top-0 z-50 font-label-md border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="flex justify-end items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-[60px]">
        {/* Utility Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="bg-primary text-white px-3 py-1 rounded-full text-[12px] font-bold tracking-wider hover:bg-primary-container transition-all animate-pulse-subtle uppercase shadow-sm hover:shadow"
          >
            Free
          </Link>

          {isMounted && user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors flex items-center gap-1.5 font-bold"
              >
                <div className="w-7 h-7 rounded-full bg-[#1a6b4a] text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-error transition-colors text-xs text-on-surface-variant flex items-center gap-0.5 ml-1"
                title="লগআউট"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hover:text-primary transition-colors text-sm font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                লগইন
              </Link>
              <Link
                href="/signup"
                className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1 rounded-lg text-sm font-bold transition-colors hidden md:block"
              >
                সাইনআপ
              </Link>
            </div>
          )}

          <Link
            href="/checkout"
            className="hover:text-primary transition-colors hidden md:block text-sm"
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
