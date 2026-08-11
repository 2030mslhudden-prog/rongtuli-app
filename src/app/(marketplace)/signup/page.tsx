'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AccountType = 'personal' | 'commercial';
interface FormErrors { [key: string]: string }

export default function SignupPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [accountType, setAccountType] = useState<AccountType>('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    bkash_number: '',
    nagad_number: '',
    rocket_number: '',
    card_number: '',
    card_expiry: '',
    card_cvv: '',
  });

  const setField = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'নাম আবশ্যক';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'সঠিক ইমেইল দিন';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 11)
      e.phone = 'সঠিক ফোন নম্বর দিন';
    if (!form.password || form.password.length < 6) e.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'পাসওয়ার্ড মিলছে না';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password,
          accountType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(prev => ({ ...prev, api: data.error || 'অ্যাকাউন্ট তৈরি করতে ব্যর্থ হয়েছে' }));
        setIsSubmitting(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setErrors(prev => ({ ...prev, api: 'সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে' }));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4fcf7] text-[#191c1d] min-h-screen flex flex-col items-center py-12 px-4 md:px-8 font-hind-siliguri">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative h-24 w-auto mx-auto mb-6 flex justify-center">
            <Image
              alt="Rongtuli Logo"
              className="object-contain drop-shadow-sm"
              src="/images/logo-green.png"
              width={100}
              height={96}
            />
          </div>
          <h1 className="text-4xl font-bold text-[#1a6b4a] mb-3 tracking-tight">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-lg text-on-surface-variant/80 font-medium">রংতুলি মার্কেটপ্লেসে আপনাকে স্বাগতম! শুরু করতে নিচের তথ্যগুলো পূরণ করুন।</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          {errors.api && (
            <div className="bg-error-container text-error p-4 rounded-2xl text-sm font-medium flex items-center gap-2 border border-error/20">
              <span className="material-symbols-outlined text-lg shrink-0">error</span>
              <span>{errors.api}</span>
            </div>
          )}
          {/* Account Type Section */}
          <section className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(26,107,74,0.08)] hover:shadow-[0_15px_50px_-10px_rgba(26,107,74,0.12)] hover:-translate-y-0.5 transition-all duration-300 p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1a6b4a]">badge</span>
              অ্যাকাউন্টের ধরন
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(['personal', 'commercial'] as AccountType[]).map((type) => (
                <label
                  key={type}
                  className="cursor-pointer relative group"
                  onClick={() => setAccountType(type)}
                >
                  <div
                    className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 ${
                      accountType === type
                        ? 'bg-[#1a6b4a]/10 border-[#1a6b4a]/30'
                        : 'border-transparent bg-surface-container-low group-hover:bg-[#1a6b4a]/5'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1a6b4a]">
                      <span className="material-symbols-outlined text-2xl">
                        {type === 'personal' ? 'person' : 'storefront'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface mb-0.5">
                        {type === 'personal' ? 'পার্সোনাল' : 'কমার্শিয়াল'}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {type === 'personal'
                          ? 'ব্যক্তিগত ব্যবহারের জন্য'
                          : 'ব্যবসায়িক ব্যবহারের জন্য'}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Personal Information Section */}
          <section className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(26,107,74,0.08)] hover:shadow-[0_15px_50px_-10px_rgba(26,107,74,0.12)] hover:-translate-y-0.5 transition-all duration-300 p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1a6b4a]">account_circle</span>
              ব্যক্তিগত তথ্য
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="fullName">পূর্ণ নাম</label>
                <input value={form.fullName} onChange={e => setField('fullName', e.target.value)} className={`w-full px-5 py-4 rounded-xl bg-surface-container-low border focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none ${errors.fullName ? 'border-error' : 'border-transparent'}`} id="fullName" placeholder="আপনার নাম লিখুন" type="text" />
                {errors.fullName && <p className="text-error text-sm mt-1 ml-1">{errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="email">ইমেইল এড্রেস</label>
                  <input value={form.email} onChange={e => setField('email', e.target.value)} className={`w-full px-5 py-4 rounded-xl bg-surface-container-low border focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none ${errors.email ? 'border-error' : 'border-transparent'}`} id="email" placeholder="example@email.com" type="email" />
                  {errors.email && <p className="text-error text-sm mt-1 ml-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="phone">ফোন নাম্বার</label>
                  <input value={form.phone} onChange={e => setField('phone', e.target.value)} className={`w-full px-5 py-4 rounded-xl bg-surface-container-low border focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none ${errors.phone ? 'border-error' : 'border-transparent'}`} id="phone" placeholder="+880 1XXX-XXXXXX" type="tel" />
                  {errors.phone && <p className="text-error text-sm mt-1 ml-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1">পাসওয়ার্ড</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input value={form.password} onChange={e => setField('password', e.target.value)} type="password" placeholder="কমপক্ষে ৬ অক্ষর" className={`w-full px-5 py-4 rounded-xl bg-surface-container-low border focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none ${errors.password ? 'border-error' : 'border-transparent'}`} />
                    {errors.password && <p className="text-error text-sm mt-1 ml-1">{errors.password}</p>}
                  </div>
                  <div>
                    <input value={form.confirmPassword} onChange={e => setField('confirmPassword', e.target.value)} type="password" placeholder="পাসওয়ার্ড নিশ্চিত করুন" className={`w-full px-5 py-4 rounded-xl bg-surface-container-low border focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all outline-none ${errors.confirmPassword ? 'border-error' : 'border-transparent'}`} />
                    {errors.confirmPassword && <p className="text-error text-sm mt-1 ml-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="address">ঠিকানা <span className="font-normal text-on-surface-variant/60">(ঐচ্ছিক)</span></label>
                <textarea value={form.address} onChange={e => setField('address', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-surface-container-low border border-transparent focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium text-on-surface placeholder-on-surface-variant/50 transition-all resize-none outline-none" id="address" placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন" rows={3}></textarea>
              </div>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(26,107,74,0.08)] hover:shadow-[0_15px_50px_-10px_rgba(26,107,74,0.12)] hover:-translate-y-0.5 transition-all duration-300 p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1a6b4a]">payments</span>
              ডিফল্ট পেমেন্ট মেথড
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {['bkash', 'nagad', 'rocket', 'card'].map((method) => {
                const isSelected = paymentMethod === method;
                return (
                  <label key={method} className="cursor-pointer relative text-center group">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value={method} 
                      checked={isSelected}
                      onChange={() => setPaymentMethod(method)}
                      className="peer sr-only payment-radio" 
                    />
                    <div className="py-5 px-3 rounded-2xl bg-surface-container-low border border-transparent peer-checked:bg-[#1a6b4a]/10 peer-checked:border-[#1a6b4a]/30 peer-checked:shadow-inner group-hover:bg-[#1a6b4a]/5 transition-all duration-300 h-full flex flex-col items-center justify-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm ${method === 'bkash' ? 'text-[#e2136e]' : method === 'nagad' ? 'text-[#f7931e]' : method === 'rocket' ? 'text-[#8c1515]' : 'text-[#1a6b4a]'}`}>
                        <span className="material-symbols-outlined text-2xl">
                          {method === 'bkash' ? 'account_balance_wallet' : method === 'nagad' ? 'account_balance' : method === 'rocket' ? 'rocket_launch' : 'credit_card'}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-on-surface capitalize">{method}</span>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Dynamic Payment Details */}
            <div className="bg-surface-container-low rounded-2xl px-6 overflow-hidden transition-all duration-300">
              <div className={`transition-all duration-300 ${paymentMethod === 'bkash' ? 'h-auto py-6 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}`}>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="bkash_number">বিকাশ মোবাইল নাম্বার</label>
                <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#e2136e]/50 text-base font-medium shadow-sm outline-none" id="bkash_number" name="bkash_number" placeholder="e.g. 017XXXXXXX" type="tel" />
              </div>

              <div className={`transition-all duration-300 ${paymentMethod === 'nagad' ? 'h-auto py-6 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}`}>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="nagad_number">নগদ মোবাইল নাম্বার</label>
                <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#f7931e]/50 text-base font-medium shadow-sm outline-none" id="nagad_number" name="nagad_number" placeholder="e.g. 019XXXXXXX" type="tel" />
              </div>

              <div className={`transition-all duration-300 ${paymentMethod === 'rocket' ? 'h-auto py-6 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}`}>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="rocket_number">রকেট মোবাইল নাম্বার</label>
                <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#8c1515]/50 text-base font-medium shadow-sm outline-none" id="rocket_number" name="rocket_number" placeholder="e.g. 018XXXXXXX" type="tel" />
              </div>

              <div className={`transition-all duration-300 ${paymentMethod === 'card' ? 'h-auto py-6 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}`}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="card_number">কার্ড নাম্বার</label>
                    <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium shadow-sm outline-none" id="card_number" name="card_number" placeholder="XXXX XXXX XXXX XXXX" type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="card_expiry">মেয়াদোত্তীর্ণের তারিখ</label>
                      <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium shadow-sm outline-none" id="card_expiry" name="card_expiry" placeholder="MM/YY" type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-on-surface-variant mb-2 ml-1" htmlFor="card_cvv">CVV</label>
                      <input className="w-full px-5 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#1a6b4a]/50 text-base font-medium shadow-sm outline-none" id="card_cvv" name="card_cvv" placeholder="123" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6 pb-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#1a6b4a] text-white py-5 rounded-2xl text-xl font-bold shadow-[0_8px_20px_rgba(26,107,74,0.3)] transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_12px_25px_rgba(26,107,74,0.4)] hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
            <p className="text-center text-sm font-medium text-on-surface-variant mt-6">
              ইতোমধ্যে অ্যাকাউন্ট আছে? <Link className="text-[#1a6b4a] font-bold hover:underline" href="/dashboard">লগইন করুন</Link>
            </p>
            <p className="text-center text-xs text-on-surface-variant/60 mt-3">
              অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের <Link className="text-[#1a6b4a] font-bold hover:underline" href="#">শর্তাবলী</Link> এবং <Link className="text-[#1a6b4a] font-bold hover:underline" href="#">গোপনীয়তা নীতি</Link> মেনে নিচ্ছেন।
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
