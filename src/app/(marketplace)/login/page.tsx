'use client';
import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('ইমেইল এবং পাসওয়ার্ড দুটিই পূরণ করুন');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'লগইন করতে ব্যর্থ হয়েছে');
        setIsSubmitting(false);
        return;
      }

      // Redirect on success
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError('সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4fcf7] text-[#191c1d] min-h-[85vh] flex items-center justify-center py-12 px-4 md:px-8 font-hind-siliguri">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(26,107,74,0.1)] p-8 md:p-10 border border-[#1a6b4a]/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative h-20 w-auto mx-auto mb-4 flex justify-center">
            <Image
              alt="Rongtuli Logo"
              className="object-contain drop-shadow-sm"
              src="/images/logo-green.png"
              width={80}
              height={76}
            />
          </div>
          <h1 className="text-3xl font-bold text-[#1a6b4a] mb-2 tracking-tight">অ্যাকাউন্টে লগইন করুন</h1>
          <p className="text-sm text-on-surface-variant/80 font-medium">রংতুলি ড্যাশবোর্ড ও মার্কেটপ্লেসে প্রবেশ করতে আপনার তথ্য দিন।</p>
        </div>

        {error && (
          <div className="mb-6 bg-error-container text-error p-4 rounded-xl text-sm font-medium flex items-center gap-2 border border-error/20">
            <span className="material-symbols-outlined text-lg shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="loginEmail">
              ইমেইল এড্রেস
            </label>
            <div className="relative">
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-5 py-4 pl-12 rounded-xl bg-surface-container-low border border-transparent focus:border-[#1a6b4a]/40 focus:ring-2 focus:ring-[#1a6b4a]/30 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none"
                required
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">mail</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="loginPassword">
                পাসওয়ার্ড
              </label>
              <a href="#" className="text-xs text-[#1a6b4a] font-bold hover:underline">পাসওয়ার্ড ভুলে গেছেন?</a>
            </div>
            <div className="relative">
              <input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 pl-12 rounded-xl bg-surface-container-low border border-transparent focus:border-[#1a6b4a]/40 focus:ring-2 focus:ring-[#1a6b4a]/30 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none"
                required
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">lock</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#1a6b4a] text-white py-4 rounded-xl text-lg font-bold shadow-[0_8px_20px_rgba(26,107,74,0.25)] transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_12px_25px_rgba(26,107,74,0.35)] hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                লগইন হচ্ছে...
              </>
            ) : (
              'লগইন করুন'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-outline-variant/50 pt-6">
          <p className="text-sm font-medium text-on-surface-variant">
            নতুন অ্যাকাউন্ট খুলতে চান?{' '}
            <Link href="/signup" className="text-[#1a6b4a] font-bold hover:underline">
              সাইনআপ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="text-center font-hind-siliguri text-[#1a6b4a]">
          <span className="material-symbols-outlined animate-spin text-4xl mb-2">progress_activity</span>
          <p>লোড হচ্ছে...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
