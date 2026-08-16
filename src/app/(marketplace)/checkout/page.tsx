'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

interface BillingForm {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

interface CardForm {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

interface MobileForm {
  number: string;
  trxId?: string;
}

type FormErrors = Partial<BillingForm & CardForm & MobileForm & { [key: string]: string }>;

const TAX_RATE = 0.05;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("nagad");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [billing, setBilling] = useState<BillingForm>({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Bangladesh',
  });

  const [card, setCard] = useState<CardForm>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const [mobile, setMobile] = useState<MobileForm>({ number: '', trxId: '' });

  useEffect(() => { setIsMounted(true); }, []);

  const subtotal = isMounted ? getSubtotal() : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Format card number with spaces
  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  // Format expiry MM/YY
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!billing.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!billing.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!billing.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email))
      newErrors.email = 'Valid email is required';

    if (paymentMethod === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) newErrors.number = 'Valid card number required';
      if (card.expiry.length < 5) newErrors.expiry = 'Valid expiry required';
      if (card.cvc.length < 3) newErrors.cvc = 'Valid CVC required';
      if (!card.name.trim()) newErrors.name = 'Cardholder name required';
    } else if (['bkash', 'nagad', 'rocket'].includes(paymentMethod)) {
      if (mobile.number.replace(/\D/g, '').length < 11)
        newErrors.number = 'Valid mobile number required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setIsProcessing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          paymentMethod,
          billing,
        }),
      });

      if (!res.ok) {
        setIsProcessing(false);
        alert('অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        return;
      }

      const data = await res.json();
      clearCart();
      router.push(`/order-success?order=${encodeURIComponent(data.order.orderNumber)}&status=${encodeURIComponent(data.order.status)}&method=${encodeURIComponent(paymentMethod)}&sender=${encodeURIComponent(mobile.number)}&trx=${encodeURIComponent(mobile.trxId || '')}&amount=${encodeURIComponent(total.toFixed(2))}`);
    } catch (err) {
      setIsProcessing(false);
      alert('অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে।');
    }
  };

  if (!isMounted) return null;

  const paymentMethods = [
    { id: 'card', label: 'Card', icon: <span className="material-symbols-outlined text-[28px]">credit_card</span>, color: 'text-secondary' },
    { id: 'bkash', label: 'bKash', icon: <div className="w-10 h-10 bg-[#E2136E] rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">bK</div>, color: '' },
    { id: 'nagad', label: 'Nagad', icon: <div className="w-10 h-10 bg-[#ED1C24] rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">Ng</div>, color: '' },
    { id: 'rocket', label: 'Rocket', icon: <div className="w-10 h-10 bg-[#8C3C8F] rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">Rk</div>, color: '' },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-secondary-fixed/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <main className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile md:px-0 py-8 relative z-10 flex flex-col gap-10">

        {/* Empty cart state */}
        {items.length === 0 && (
          <div className="bg-surface-container-lowest rounded-3xl border border-surface-variant p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4">remove_shopping_cart</span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3">Your cart is empty</h1>
            <p className="text-body-md font-body-md text-on-surface-variant mb-8">Add some items to your cart before checking out.</p>
            <Link href="/" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
              <span className="material-symbols-outlined text-[20px]">store</span>
              Browse Assets
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <form onSubmit={handleSubmit} noValidate>
            {/* Order Summary */}
            <section className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-surface-variant p-8 md:p-12 text-center relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40" />
              <h1 className="font-headline-xl text-[36px] md:text-[48px] font-extrabold text-on-surface mb-8 tracking-tight">Your Order</h1>

              <div className="flex flex-col gap-3 mb-8 text-left max-w-lg mx-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.licenseType}`} className="flex gap-5 items-center p-4 rounded-2xl hover:bg-surface-container-low transition-colors">
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative shadow-sm shrink-0 border border-outline-variant">
                      <Image fill className="object-cover" alt={item.title} src={item.imageUrl} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline-md text-[16px] text-on-surface">{item.title}</h4>
                      <p className="font-body-sm text-on-surface-variant text-sm">{item.licenseType} License × {item.quantity}</p>
                    </div>
                    <div className="font-headline-md text-[18px] font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="max-w-lg mx-auto pt-6 border-t border-surface-variant/50 flex items-end justify-between">
                <div className="text-left">
                  <p className="font-body-sm text-on-surface-variant mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
                  <p className="font-body-sm text-on-surface-variant">Tax (5%): ${tax.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm uppercase tracking-widest text-on-surface-variant/70 mb-1">Total Due</p>
                  <p className="font-headline-xl text-[40px] font-extrabold text-secondary leading-none">${total.toFixed(2)}</p>
                </div>
              </div>
            </section>

            {/* Billing + Payment */}
            <section className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-surface-variant p-8 md:p-12 mb-8">
              {/* Billing Details */}
              <div className="mb-12">
                <h2 className="font-headline-lg text-[28px] font-bold text-on-surface mb-8">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      value={billing.firstName}
                      onChange={e => setBilling(b => ({ ...b, firstName: e.target.value }))}
                      placeholder="John"
                      className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.firstName ? 'border-error' : 'border-surface-variant'}`}
                    />
                    {errors.firstName && <p className="text-error text-label-sm mt-1 ml-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      value={billing.lastName}
                      onChange={e => setBilling(b => ({ ...b, lastName: e.target.value }))}
                      placeholder="Doe"
                      className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.lastName ? 'border-error' : 'border-surface-variant'}`}
                    />
                    {errors.lastName && <p className="text-error text-label-sm mt-1 ml-1">{errors.lastName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={billing.email}
                      onChange={e => setBilling(b => ({ ...b, email: e.target.value }))}
                      placeholder="john.doe@example.com"
                      className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.email ? 'border-error' : 'border-surface-variant'}`}
                    />
                    {errors.email && <p className="text-error text-label-sm mt-1 ml-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="country">Country / Region</label>
                    <select
                      id="country"
                      value={billing.country}
                      onChange={e => setBilling(b => ({ ...b, country: e.target.value }))}
                      className="w-full bg-surface hover:bg-surface-container-low border border-surface-variant rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none"
                    >
                      <option>Bangladesh</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-surface-variant/50 mb-12" />

              {/* Payment Method */}
              <div>
                <h2 className="font-headline-lg text-[28px] font-bold text-on-surface mb-8">Payment Method</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {paymentMethods.map(({ id, label, icon }) => {
                    const isSelected = paymentMethod === id;
                    return (
                      <label
                        key={id}
                        className={`flex flex-col items-center justify-center gap-3 p-4 bg-surface rounded-2xl border cursor-pointer hover:border-secondary/50 hover:bg-surface-container-low transition-all duration-300 relative overflow-hidden h-32 ${
                          isSelected ? 'border-2 border-secondary bg-secondary-fixed/10 shadow-sm scale-105 z-10' : 'border-surface-variant'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={id}
                          checked={isSelected}
                          onChange={() => setPaymentMethod(id)}
                          className="opacity-0 absolute"
                        />
                        {icon}
                        <span className={`font-headline-md text-[15px] font-bold capitalize ${isSelected ? 'text-secondary' : 'text-on-surface'}`}>{label}</span>
                        <div className={`absolute top-3 right-3 w-5 h-5 rounded-full bg-secondary flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                          <span className="material-symbols-outlined text-[14px] text-white">check</span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Dynamic payment fields */}
                <div className="bg-surface p-6 md:p-8 rounded-2xl border border-surface-variant/60 shadow-sm text-left">
                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="cardName">Cardholder Name</label>
                        <input
                          id="cardName"
                          value={card.name}
                          onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                          placeholder="John Doe"
                          className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.name ? 'border-error' : 'border-surface-variant'}`}
                        />
                        {errors.name && <p className="text-error text-label-sm mt-1 ml-1">{errors.name}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="cardNumber">Card Number</label>
                        <div className="relative">
                          <input
                            id="cardNumber"
                            value={card.number}
                            onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 pl-12 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.number ? 'border-error' : 'border-surface-variant'}`}
                          />
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">credit_card</span>
                        </div>
                        {errors.number && <p className="text-error text-label-sm mt-1 ml-1">{errors.number}</p>}
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="expiry">Expiry Date</label>
                        <input
                          id="expiry"
                          value={card.expiry}
                          onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.expiry ? 'border-error' : 'border-surface-variant'}`}
                        />
                        {errors.expiry && <p className="text-error text-label-sm mt-1 ml-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="cvc">CVC</label>
                        <input
                          id="cvc"
                          value={card.cvc}
                          onChange={e => setCard(c => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.cvc ? 'border-error' : 'border-surface-variant'}`}
                        />
                        {errors.cvc && <p className="text-error text-label-sm mt-1 ml-1">{errors.cvc}</p>}
                      </div>
                    </div>
                  )}

                  {['bkash', 'nagad', 'rocket'].includes(paymentMethod) && (
                    <div className="space-y-5">
                      <div className="bg-[#1b6b4b]/10 border border-[#1b6b4b]/20 p-4 rounded-xl">
                        <p className="text-secondary font-bold text-label-md flex items-center gap-1.5 mb-2">
                          <span className="material-symbols-outlined text-[20px]">payments</span>
                          ম্যানুয়াল পেমেন্ট নির্দেশিকা (Personal Send Money)
                        </p>
                        <p className="text-body-sm text-on-surface">
                          আমাদের <span className="font-bold text-primary capitalize">{paymentMethod}</span> পার্সোনাল নম্বরে মোট <span className="font-bold text-secondary">৳{total.toFixed(2)}</span> সেন্ডমানি (Send Money) করুন।
                        </p>
                        <p className="text-headline-md text-on-surface font-bold mt-2 tracking-wide select-all text-center p-2 bg-surface rounded border">
                          01313895658
                        </p>
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="mobileNum">
                          যে নম্বর থেকে সেন্ডমানি করেছেন (Sender Number) *
                        </label>
                        <div className="relative">
                          <input
                            id="mobileNum"
                            type="tel"
                            value={mobile.number}
                            onChange={e => setMobile(m => ({ ...m, number: e.target.value }))}
                            placeholder="যেমন: 017XXXXXXXX"
                            className={`w-full bg-surface hover:bg-surface-container-low border rounded-xl px-4 py-3 pl-12 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all ${errors.number ? 'border-error' : 'border-surface-variant'}`}
                          />
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">smartphone</span>
                        </div>
                        {errors.number && <p className="text-error text-label-sm mt-1 ml-1">{errors.number}</p>}
                      </div>

                      <div>
                        <label className="block font-label-sm text-label-sm text-on-surface-variant/80 mb-1.5 ml-1" htmlFor="trxId">
                          পেমেন্ট ট্রান্সেকশন আইডি (Transaction ID / TrxID) *
                        </label>
                        <div className="relative">
                          <input
                            id="trxId"
                            type="text"
                            value={mobile.trxId || ''}
                            onChange={e => setMobile(m => ({ ...m, trxId: e.target.value }))}
                            placeholder="যেমন: BKA98765432"
                            className={`w-full bg-surface hover:bg-surface-container-low border border-surface-variant rounded-xl px-4 py-3 pl-12 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all`}
                          />
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">receipt</span>
                        </div>
                      </div>

                      <p className="text-body-sm font-body-sm text-on-surface-variant">
                        টাকা পাঠানোর পর সচল ট্রান্সেকশন আইডি দিয়ে পেমেন্ট সম্পন্ন করুন। সফল অর্ডারের পর ডাউনলোড ভেরিফিকেশনের জন্য ওয়াটস্যাপে মেসেজ দেওয়ার বাটন পাবেন।
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="text-on-surface-variant">
                      <p className="font-label-md text-label-md font-bold text-on-surface mb-3">Bank Transfer Instructions</p>
                      <div className="grid grid-cols-2 gap-3 text-body-sm">
                        <div><p className="text-on-surface-variant">Bank Name</p><p className="font-semibold text-on-surface">Dutch-Bangla Bank</p></div>
                        <div><p className="text-on-surface-variant">Account Name</p><p className="font-semibold text-on-surface">Rongtuli Ltd.</p></div>
                        <div><p className="text-on-surface-variant">Account No.</p><p className="font-semibold text-on-surface">1234 5678 9012</p></div>
                        <div><p className="text-on-surface-variant">Routing No.</p><p className="font-semibold text-on-surface">070 274 182</p></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mb-10">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-secondary text-on-secondary rounded-full py-5 font-headline-xl text-[22px] font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-3 ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-on-secondary-container hover:scale-[1.01]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-2xl">lock</span>
                    Pay ${total.toFixed(2)} Now
                  </>
                )}
              </button>
              <p className="text-center font-label-sm text-[11px] tracking-widest uppercase text-on-surface-variant/60 mt-6 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-secondary/70 text-lg">verified_user</span>
                Secure 256-bit SSL Checkout
              </p>
            </section>
          </form>
        )}
      </main>
    </div>
  );
}
