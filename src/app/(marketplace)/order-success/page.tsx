'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('order') || 'confirmed';
  const isPending = searchParams.get('status') === 'PENDING';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fire confetti
    const duration = 2500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a9000d', '#1b6b4b', '#d3151a'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a9000d', '#1b6b4b', '#d3151a'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up">
          <span
            className="material-symbols-outlined text-[56px] text-secondary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            check_circle
          </span>
        </div>

        <div className="animate-fade-in-up-delay-1">
          <h1 className="text-headline-xl font-headline-xl text-on-surface mb-3">{isPending ? 'Order Received' : 'Payment Successful! 🎉'}</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mb-2">
            {isPending ? 'Your order is waiting for payment confirmation.' : 'Thank you for your purchase!'}
          </p>
          <p className="text-body-md font-body-md text-on-surface-variant mb-8">
            Your order <span className="font-bold text-on-surface">#{orderNum}</span> {isPending ? 'has been created. Complete payment using the configured payment gateway.' : 'has been confirmed. You will receive a download link at your email shortly.'}
          </p>
        </div>

        <div className="animate-fade-in-up-delay-2 flex flex-col gap-4">
          {/* Download Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm text-left">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>download</span>
              </div>
              <div>
                <h3 className="text-label-md font-label-md text-on-surface font-bold mb-0.5">Your Files Are Ready</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Download your purchased assets below.</p>
              </div>
            </div>
            <button className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-label-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download All Files
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-left">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mb-2 block">email</span>
              <p className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">Receipt sent to</p>
              <p className="text-label-md font-label-md text-on-surface font-bold truncate">your@email.com</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-left">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mb-2 block">schedule</span>
              <p className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">License valid for</p>
              <p className="text-label-md font-label-md text-on-surface font-bold">Lifetime</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Link
              href="/"
              className="flex-1 py-3 border-2 border-secondary text-secondary rounded-xl font-label-md font-bold text-center hover:bg-secondary-fixed transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-label-md font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              My Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return <Suspense fallback={<main className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">Loading confirmation…</main>}><OrderSuccessContent /></Suspense>;
}
