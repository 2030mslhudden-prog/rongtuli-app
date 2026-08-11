'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 min-h-screen">
        <div className="mb-10">
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Shopping Cart</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Loading cart...</p>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 min-h-screen">
      <div className="mb-10">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Shopping Cart</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Cart Items List (Left Column) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">remove_shopping_cart</span>
              <h2 className="font-headline-md text-on-surface mb-2">Your cart is empty</h2>
              <p className="font-body-sm text-on-surface-variant mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg font-label-md inline-flex items-center gap-2 hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">store</span>
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.licenseType}`} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 shadow-sm transition-shadow hover:shadow-md items-start md:items-center">
                {/* Thumbnail */}
                <div className="w-full md:w-40 h-32 md:h-28 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Details */}
                <div className="flex-grow flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{item.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">By {item.author}</p>
                      <span className="inline-block bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        {item.licenseType} License
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-md text-headline-md text-on-surface block">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6 w-full border-t border-outline-variant pt-4">
                    <button 
                      onClick={() => removeItem(item.id, item.licenseType)}
                      className="text-error flex items-center gap-1 font-label-md text-label-md hover:opacity-80 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Remove
                    </button>
                    <div className="flex items-center border border-outline-variant rounded-md overflow-hidden bg-surface-container-lowest">
                      <button 
                        onClick={() => updateQuantity(item.id, item.licenseType, item.quantity - 1)}
                        aria-label="Decrease quantity" 
                        className="px-3 py-1 text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50" 
                        disabled={item.quantity <= 1}
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="px-4 py-1 font-body-md text-body-md border-x border-outline-variant text-center w-12">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.licenseType, item.quantity + 1)}
                        aria-label="Increase quantity" 
                        className="px-3 py-1 text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="mt-4">
              <Link href="/" className="text-secondary font-label-md text-label-md flex items-center gap-1 hover:underline w-fit">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary (Right Sidebar) */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-24">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 pb-4 border-b border-outline-variant">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant">Subtotal ({totalItems} items)</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant">Discount</span>
                <span className="font-body-md text-body-md text-error">-$0.00</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6 pb-6 border-b border-outline-variant">
              <label className="block font-label-sm text-label-sm text-on-surface mb-2" htmlFor="promo">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter code"
                  className="flex-grow bg-surface-bright border border-outline-variant rounded-md px-3 py-2 text-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                />
                <button className="bg-surface-variant text-on-surface px-4 py-2 rounded-md font-label-md text-label-md hover:bg-surface-dim transition-colors">Apply</button>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
              <span className="font-headline-md text-headline-md text-on-surface">Total</span>
              <span className="font-headline-lg text-headline-lg text-on-surface">${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link 
              href="/checkout" 
              className={`w-full bg-primary-container text-on-primary-container font-headline-sm font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-sm ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:shadow-md'}`}
              onClick={(e) => items.length === 0 && e.preventDefault()}
            >
              Proceed to Checkout
              <span className="material-symbols-outlined">lock</span>
            </Link>
            
            <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-4 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Secure SSL Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
