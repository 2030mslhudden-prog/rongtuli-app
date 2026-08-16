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
                className="hover:text-[#1F2937] text-on-surface-variant transition-colors text-sm font-medium"
              >
                My account
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-error transition-colors text-on-surface-variant flex items-center gap-0.5 ml-2"
                title="লগআউট"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hover:text-[#1F2937] text-on-surface-variant transition-colors text-sm font-medium"
            >
              My account
            </Link>
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
