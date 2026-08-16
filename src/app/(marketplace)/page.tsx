"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const uiKitCards = [
  { id: "ui-kit-1", title: "SaaS Dashboard Pro", price: "$24", image: "/images/product-neo-geometric.jpg" },
  { id: "ui-kit-2", title: "E-commerce App UI", price: "$29", image: "/images/product-nexus-dashboard.jpg" },
  { id: "ui-kit-3", title: "Fintech Wireframes", price: "$19", image: "/images/product-neo-geometric.jpg" },
  { id: "ui-kit-4", title: "Analytics Admin Panel", price: "$35", image: "/images/product-nexus-dashboard.jpg" },
  { id: "ui-kit-5", title: "Medical Web App UI", price: "$22", image: "/images/product-neo-geometric.jpg" },
];

const vectorCards = [
  { id: "vec-1", title: "Abstract Shapes Pack", price: "$15", image: "/images/product- Neo-geometric.jpg" },
  { id: "vec-2", title: "3D Concept Elements", price: "$28", image: "/images/product-3d-icons.jpg" },
  { id: "vec-3", title: "Nature Line Art", price: "$12", image: "/images/product-aurora-font.jpg" },
  { id: "vec-4", title: "Memphis Style Patterns", price: "$18", image: "/images/product-retro-grade.jpg" },
  { id: "vec-5", title: "Tech Isometric Vectors", price: "$25", image: "/images/product-Neo-geometric.jpg" },
];

const featuredCards = [
  { id: "feat-1", title: "Modern Dashboard Kit", price: "$24", image: "/images/product-nexus-dashboard.jpg" },
  { id: "feat-2", title: "Vector Illustration Pack", price: "$18", image: "/images/product-retro-grade.jpg" },
  { id: "feat-3", title: "Elegant Serif Font", price: "$35", image: "/images/product-whisper-script.jpg" },
  { id: "feat-4", title: "App Wireframe Kit", price: "$29", image: "/images/product-3d-icons.jpg" },
  { id: "feat-5", title: "Brand Strategy Deck", price: "$21", image: "/images/product-saas-pro.jpg" },
  { id: "feat-6", title: "Poster System Kit", price: "$16", image: "/images/product-aurora-cart.jpg" },
];

export default function HomePage() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          // Filter to only show ACTIVE designs on the homepage
          const activeOnly = data.products.filter((p: any) => p.status === 'ACTIVE');
          setDbProducts(activeOnly);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const uiKits = dbProducts.filter(p => p.category === 'UI Kits' || p.category === 'Templates' || p.category === 'Print Templates' || p.category === 'MAHFIL');
  const uiKitList = uiKits.length > 0 ? uiKits.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price <= 0 ? 'Free' : `৳${p.price}`,
    image: p.imageUrl,
  })) : uiKitCards;

  const vectors = dbProducts.filter(p => p.category === 'Vectors');
  const vectorList = vectors.length > 0 ? vectors.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price <= 0 ? 'Free' : `৳${p.price}`,
    image: p.imageUrl,
  })) : vectorCards;

  const featuredList = dbProducts.length > 0 ? dbProducts.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price <= 0 ? 'Free' : `৳${p.price}`,
    image: p.imageUrl,
  })) : featuredCards;
  return (
    <div className="bg-background text-on-background font-body-md antialiased transition-colors duration-300">
      <section className="relative pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at top right, #d3151a 0%, transparent 40%), radial-gradient(circle at bottom left, #005C3D 0%, transparent 40%)" }} />
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <div className="mb-6 flex justify-center animate-fade-in-up">
              <img
                alt="Rongtuli Logo"
                className="h-40 md:h-56 w-auto object-contain hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDY2LCYFQlcaktjEme46O6syLn0rrr3niLJdB1zFKnGYSe4rMWz7AO5WC3NMtXAmtbzZT_rxnmpLSmdP0lPNm6wz-KC88tHqLW7ypjgRAmSKfAp1Coch-BtPg2unsG-xTka6JCrv3yPhXAzLelQO9IW0PtcfblL2b736zF3Tgg8BAONEpj9vMDOZX1PzGuu1o5XA-vydmf82szAY3eld6i_eph2zr1ExF6ur4bf20axZsa_t6qkBnhr6WSZ6jnTml7A"
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto animate-fade-in-up-delay-1">
              <div className="flex items-center bg-surface-container-lowest w-full md:w-[600px] rounded-full px-6 py-4 border border-outline-variant focus-within:border-primary shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-body-lg w-full text-on-surface placeholder:text-on-surface-variant outline-none" placeholder="Discover UI kits, fonts, templates..." type="text" />
                <button className="bg-primary text-on-primary px-8 py-2.5 rounded-full text-label-md font-label-md hover:bg-primary-container transition-all hover:shadow-md ml-2" type="button">
                  Search
                </button>
              </div>
            </div>

            <ul className="flex flex-wrap justify-center items-center space-x-8 pt-6 font-label-md w-full animate-fade-in-up-delay-1">
              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105">
                  Print Templates
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left transition-all group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Calendars</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Banners &amp; Flyers</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Posters</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Business Cards</Link>
                </div>
              </li>

              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105 font-bengali tracking-wide">
                  MAHFIL
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Main Stage Banners</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Street &amp; Wall Posters</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Social Media &amp; YouTube</Link>
                </div>
              </li>

              <li className="group relative flex items-center">
                <Link href="#" className="hover:text-primary transition-all duration-300 py-2 flex items-center cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full hover:scale-105">
                  Madrasah &amp; School
                  <span className="material-symbols-outlined ml-1 text-[18px]">arrow_drop_down</span>
                </Link>
                <div className="dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface-container-lowest text-[#1F2937] min-w-[220px] shadow-lg rounded-xl border border-outline-variant z-50 py-2 text-left group-hover:block">
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">Admission &amp; Registration</Link>
                  <Link href="#" className="block px-5 py-2.5 hover:bg-surface-container hover:text-primary transition-colors text-body-sm font-medium">ID Cards &amp; Lanyards</Link>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-surface border-y border-outline-variant overflow-hidden animate-fade-in-up-delay-2">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8">
            <h2 className="text-headline-lg font-headline-lg text-[#0F172A]">Most Sold Products</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">Trending assets across top categories.</p>
          </div>

          <div className="mb-12">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">web</span>
              <h3 className="text-headline-md font-headline-md text-[#0F172A]">UI Kits &amp; Templates</h3>
            </div>
            <div className="scroll-track-container">
              <div className="scroll-track">
                {[...uiKitList, ...uiKitList].map((card, index) => (
                  <Link key={`${card.id}-${index}`} href={`/product/${card.id}`} className="group block w-[300px] flex-shrink-0 relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-sm">
                    <img alt={card.title} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105" src={card.image} />
                    <div className="p-4">
                      <h4 className="font-headline-md text-[18px] text-[#0F172A] truncate">{card.title}</h4>
                      <p className="text-body-sm text-primary font-bold mt-1">{card.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">brush</span>
              <h3 className="text-headline-md font-headline-md text-[#0F172A]">Vectors &amp; Illustrations</h3>
            </div>
            <div className="scroll-track-container">
              <div className="scroll-track reverse">
                {[...vectorList, ...vectorList].map((card, index) => (
                  <Link key={`${card.id}-${index}`} href={`/product/${card.id}`} className="group block w-[300px] flex-shrink-0 relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-sm">
                    <img alt={card.title} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105" src={card.image} />
                    <div className="p-4">
                      <h4 className="font-headline-md text-[18px] text-[#0F172A] truncate">{card.title}</h4>
                      <p className="text-body-sm text-primary font-bold mt-1">{card.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest rounded-[2rem] shadow-sm my-12 animate-fade-in-up-delay-2">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-[#0F172A] mb-3">Featured Design Assets</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">Fresh drops from top creators, curated daily.</p>
            </div>
            <Link href="#" className="text-secondary font-label-md text-label-md hover:text-tertiary-container flex items-center gap-1 transition-colors font-bold tracking-wide">
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-0">
            {featuredList.map((card) => (
              <Link key={card.id} href={`/product/${card.id}`} className="group relative flex flex-col gap-4 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(27,107,75,0.12)] cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl transition-all duration-500 border border-surface-variant">
                  <img className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.03]" src={card.image} alt={card.title} />
                  <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full text-label-sm font-label-md text-on-surface flex items-center gap-1.5 shadow-sm border border-white/20">
                    <span className="material-symbols-outlined text-[14px]">print</span>
                    Print Available
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-headline-md font-headline-md text-[#0F172A] text-[20px]">{card.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-body-sm font-body-sm text-on-surface-variant">Starts from</span>
                    <span className="text-body-lg font-headline-md text-primary font-bold">{card.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
  );
}
