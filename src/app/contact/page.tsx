import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Rongtuli',
  description: 'Contact Rongtuli for design purchases, print orders, and customer support in Bangladesh.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 lg:py-24">
      <div className="mb-8">
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-gradient-to-br from-primary to-red-600 p-8 text-white md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Rongtuli</p>
            <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/85 md:text-base">
              আপনার ডিজাইন, প্রিন্টিং, এবং কাস্টম অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Phone / WhatsApp</p>
                <a href="tel:+8801313895658" className="mt-2 block text-lg font-semibold hover:text-white/90">
                  01313895658
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Email</p>
                <a href="mailto:mslhfr1999@gmail.com" className="mt-2 block text-lg font-semibold hover:text-white/90">
                  mslhfr1999@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Address</p>
                <p className="mt-2 text-lg font-medium leading-7 text-white/90">
                  চিটাগাংরোড, ওয়াজুদ্দিন সুপার মার্কেট, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ।
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900">We’re here to help</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700 md:text-base">
              <p>
                আমরা রেন্ডম ও কাস্টম গ্রাফিক্স ডিজাইন, অনলাইন ও অফলাইন প্রিন্টিং সেবা, এবং হোম ডেলিভারি
                পরিচালনা করি।
              </p>
              <p>
                আমাদের ওয়েবসাইট থেকে সরাসরি ডিজাইন ফাইল কেনাকাটা এবং প্রিন্টিং অর্ডার দেওয়া যায়।
              </p>
              <p>
                আপনি চাইলে WhatsApp, ফোন বা ইমেইলের মাধ্যমে দ্রুত যোগাযোগ করতে পারেন।
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801313895658"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
              >
                WhatsApp Now
              </a>
              <a
                href="mailto:mslhfr1999@gmail.com"
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary hover:text-primary"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
