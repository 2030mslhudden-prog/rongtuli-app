"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/marketplace/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Array<{ id: string; title: string; author: string; price: number; rating: number; category: string; imageUrl: string }>>([]);
  const [search, setSearch] = useState('');

  const loadProducts = async (query = '') => {
    const response = await fetch(`/api/products${query ? `?search=${encodeURIComponent(query)}` : ''}`);
    if (!response.ok) return;
    const { products } = await response.json();
    setFeaturedProducts(products.map((product: { id: string; title: string; price: number; category: string; imageUrl: string; author: { name: string } }) => ({
      id: product.id, title: product.title, author: product.author.name, price: product.price, category: product.category, imageUrl: product.imageUrl, rating: 5,
    })));
  };

  useEffect(() => { void loadProducts(); }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, #d3151a 0%, transparent 40%), radial-gradient(circle at bottom left, #005C3D 0%, transparent 40%)",
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="mb-10 flex justify-center animate-fade-in-up">
            <Image
              alt="Rongtuli Logo"
              className="h-40 md:h-56 w-auto object-contain"
              src="/images/logo.png"
              width={400}
              height={224}
              priority
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto animate-fade-in-up-delay-1">
            <div className="flex items-center bg-surface-container-lowest w-full md:w-[500px] rounded-full px-6 py-4 border border-outline-variant focus-within:border-primary shadow-sm transition-all hover:shadow-md">
              <span className="material-symbols-outlined text-on-surface-variant mr-3">
                search
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 text-body-lg w-full text-on-surface placeholder:text-on-surface-variant outline-none"
                placeholder="Search for assets..."
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button onClick={() => void loadProducts(search)} className="bg-primary text-on-primary px-6 py-2 rounded-full text-label-md font-label-md hover:bg-primary-container transition-all ml-2">
                Search
              </button>
            </div>
          </div>

          {/* Main Categories */}
          <ul className="flex flex-wrap justify-center items-center space-x-6 pt-6 font-label-md w-full animate-fade-in-up-delay-1">
            <li className="group relative flex items-center">
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105"
              >
                Print Templates{" "}
                <span className="material-symbols-outlined ml-1 text-[18px]">
                  arrow_drop_down
                </span>
              </Link>
              <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-md border border-outline-variant z-50 pt-2 pb-2 text-left group-hover:block">
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Calendars
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Banners & Flyers
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Posters
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Business Cards & Stationery
                </Link>
              </div>
            </li>
            <li className="group relative flex items-center">
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105"
              >
                MAHFIL{" "}
                <span className="material-symbols-outlined ml-1 text-[18px]">
                  arrow_drop_down
                </span>
              </Link>
              <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-md border border-outline-variant z-50 pt-2 pb-2 text-left group-hover:block">
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Main Stage Banners
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Street & Wall Posters
                </Link>
              </div>
            </li>
            <li className="group relative flex items-center">
              <Link
                href="#"
                className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105"
              >
                Madrasah & School{" "}
                <span className="material-symbols-outlined ml-1 text-[18px]">
                  arrow_drop_down
                </span>
              </Link>
              <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-md border border-outline-variant z-50 pt-2 pb-2 text-left group-hover:block">
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  Admission & Registration
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-surface-container hover:text-primary transition-colors text-body-sm"
                >
                  ID Cards & Lanyards
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Featured Assets Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest animate-fade-in-up-delay-2">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-[#0F172A] mb-3">
              Featured Design Assets
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Handpicked premium resources for your next project.
            </p>
          </div>
          <Link
            href="#"
            className="text-secondary font-label-md text-label-md hover:text-tertiary-container flex items-center gap-1 transition-colors font-bold tracking-wide"
          >
            View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {featuredProducts.length === 0 && <p className="text-on-surface-variant py-10">No matching design assets found.</p>}
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant animate-reveal-stats">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-headline-xl font-headline-xl text-primary mb-3 text-[56px] leading-none">
                15k+
              </div>
              <div className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                Premium Assets
              </div>
            </div>
            <div>
              <div className="text-headline-xl font-headline-xl text-primary mb-3 text-[56px] leading-none">
                50k+
              </div>
              <div className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-headline-xl font-headline-xl text-secondary mb-3 text-[56px] leading-none">
                4.9/5
              </div>
              <div className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
