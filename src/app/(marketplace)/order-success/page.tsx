'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import Image from 'next/image';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('order') || 'confirmed';
  const method = searchParams.get('method') || '';
  const sender = searchParams.get('sender') || '';
  const trx = searchParams.get('trx') || '';
  const amount = searchParams.get('amount') || '';
  
  const [mounted, setMounted] = useState(false);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<string>(searchParams.get('status') || 'PENDING');

  useEffect(() => {
    setMounted(true);

    // Fetch order details from DB
    fetch(`/api/orders?orderNumber=${orderNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.order) {
          setOrderItems(data.order.items || []);
          setDbStatus(data.order.status);
        }
      })
      .catch((err) => console.error('Error fetching order details:', err));
  }, [orderNum]);

  const isPending = dbStatus === 'PENDING';

  useEffect(() => {
    // Fire confetti only if the order is confirmed/paid
    if (mounted && !isPending) {
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
    }
  }, [mounted, isPending]);

  const whatsappMessage = `হ্যালো, আমি রংতুলি মার্কেটপ্লেস থেকে ডিজাইন অর্ডার করেছি।\n\nঅর্ডার নম্বর: #${orderNum}\nপেমেন্ট মেথড: ${method.toUpperCase()}\nসেন্ডার নম্বর: ${sender}\nট্রান্সেকশন আইডি: ${trx}\nটাকার পরিমাণ: ৳${amount}\n\nঅনুগ্রহ করে আমার পেমেন্টটি নিশ্চিত করে ডাউনলোড ফাইল রিলিজ করুন। ধন্যবাদ!`;
  const whatsappUrl = `https://wa.me/8801313895658?text=${encodeURIComponent(whatsappMessage)}`;

  const handleDownloadAll = () => {
    // Open all download links in new tabs
    const validItems = orderItems.filter(item => item.product?.fileUrl);
    if (validItems.length === 0) {
      alert('ডাউনলোড করার মত কোনো সোর্স ফাইল পাওয়া যায়নি।');
      return;
    }
    validItems.forEach((item) => {
      window.open(`/api/files/download?key=${encodeURIComponent(item.product.fileUrl)}`, '_blank');
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success / Pending Icon */}
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up ${isPending ? 'bg-amber-100' : 'bg-secondary-container'}`}>
          <span
            className={`material-symbols-outlined text-[56px] ${isPending ? 'text-amber-600' : 'text-secondary'}`}
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            {isPending ? 'pending' : 'check_circle'}
          </span>
        </div>

        <div className="animate-fade-in-up-delay-1">
          <h1 className="text-headline-xl font-headline-xl text-on-surface mb-3">
            {isPending ? 'অর্ডার গৃহীত হয়েছে' : 'পেমেন্ট সফল হয়েছে! 🎉'}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mb-2">
            {isPending ? 'আপনার অর্ডারটি পেমেন্ট ভেরিফিকেশনের জন্য অপেক্ষমান রয়েছে।' : 'ডিজাইন ক্রয়ের জন্য আপনাকে ধন্যবাদ!'}
          </p>
          <p className="text-body-md font-body-md text-on-surface-variant mb-8">
            অর্ডার নম্বর <span className="font-bold text-on-surface">#{orderNum}</span> {isPending ? 'সফলভাবে তৈরি হয়েছে। আপনার পেমেন্টটি ম্যানুয়ালি যাচাই করার পর ফাইল ডাউনলোডের অনুমোদন দেওয়া হবে।' : 'নিশ্চিত হয়েছে। আপনি এখন নিচের বাটন থেকে ডিজাইন সোর্স ফাইল ডাউনলোড করতে পারবেন।'}
          </p>
        </div>

        <div className="animate-fade-in-up-delay-2 flex flex-col gap-4">
          {isPending ? (
            /* WhatsApp Verification Card */
            <div className="bg-surface-container-lowest border border-amber-200 rounded-2xl p-6 shadow-sm text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-amber-600">contact_support</span>
                </div>
                <div>
                  <h3 className="text-label-md font-label-md text-on-surface font-bold mb-0.5">পেমেন্ট নিশ্চিত করুন</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">পেমেন্ট ভেরিফিকেশন সম্পন্ন করতে অনুগ্রহ করে আপনার অর্ডারের তথ্যগুলো হোয়াটস্যাপে পাঠান।</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] text-white rounded-xl font-label-md font-bold hover:bg-[#20ba56] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.008 14.12 1.01 11.5 1.01c-5.45 0-9.88 4.434-9.884 9.86-.002 1.83.476 3.62 1.39 5.2l-.423 1.545 1.58-.415 1.484.864z"/>
                </svg>
                হোয়াটস্যাপে পেমেন্ট কনফার্ম করুন
              </a>
            </div>
          ) : (
            /* Download Card */
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>download</span>
                </div>
                <div>
                  <h3 className="text-label-md font-label-md text-on-surface font-bold mb-0.5">ডিজাইন ডাউনলোড করুন</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">আপনার কেনা সোর্স ফাইলসমূহ ডাউনলোড করতে নিচের বাটন ব্যবহার করুন।</p>
                </div>
              </div>
              
              {/* List order items with individual download links */}
              <div className="space-y-3 mb-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-surface-container rounded-xl border border-outline-variant/30">
                    <div className="flex items-center gap-3 truncate">
                      <div className="relative w-8 h-8 rounded overflow-hidden shrink-0">
                        {item.product?.imageUrl ? (
                          <Image src={item.product.imageUrl} alt={item.product.title} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <p className="text-body-sm font-bold text-on-surface truncate max-w-[200px]" title={item.product?.title || 'ডিজাইন ফাইল'}>
                        {item.product?.title || 'ডিজাইন ফাইল'}
                      </p>
                    </div>
                    {item.product?.fileUrl ? (
                      <a
                        href={`/api/files/download?key=${encodeURIComponent(item.product.fileUrl)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-secondary text-on-secondary text-xs rounded hover:opacity-90 transition-opacity flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        ডাউনলোড
                      </a>
                    ) : (
                      <span className="text-xs text-on-surface-variant/60">সোর্স ফাইল আপলোড করা নেই</span>
                    )}
                  </div>
                ))}
              </div>

              {orderItems.filter(item => item.product?.fileUrl).length > 1 && (
                <button
                  onClick={handleDownloadAll}
                  className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-label-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  সব ফাইল একসাথে ডাউনলোড করুন
                </button>
              )}
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-left">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mb-2 block">receipt_long</span>
              <p className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">অর্ডার স্ট্যাটাস</p>
              <p className={`text-label-md font-label-md font-bold ${isPending ? 'text-amber-600' : 'text-secondary'}`}>
                {isPending ? 'যাচাই করা হচ্ছে (Pending)' : 'পরিশোধিত (Paid)'}
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-left">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mb-2 block">schedule</span>
              <p className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">লাইসেন্সের মেয়াদ</p>
              <p className="text-label-md font-label-md text-on-surface font-bold">আজীবন (Lifetime)</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Link
              href="/"
              className="flex-1 py-3 border-2 border-secondary text-secondary rounded-xl font-label-md font-bold text-center hover:bg-secondary-fixed transition-colors"
            >
              আরও дизайн কিনুন
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-label-md font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              আমার ড্যাশবোর্ড
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">Loading confirmation…</main>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
