import Link from 'next/link';

export const metadata = {
  title: 'About Us | Rongtuli',
  description: 'About Rongtuli marketplace and design-printing services in Bangladesh.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 lg:py-24">
      <div className="mb-8">
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Rongtuli</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">About Us</h1>
        </header>

        <div className="space-y-6 text-base leading-8 text-slate-700">
          <p>
            আমরা রেন্ডম ও কাস্টম গ্রাফিক্স ডিজাইন, অনলাইন ও অফলাইন প্রিন্টিং সার্ভিস এবং হোম ডেলিভারি দিয়ে থাকি।
            আমাদের সাইট থেকে সরাসরি ডিজাইন ফাইল কেনাকাটা এবং প্রিন্টিং অর্ডার করা যায়।
          </p>

          <p>
            Rongtuli ডিজাইন, প্রিন্টিং, এবং কাস্টম সেবা নিয়ে কাজ করে এমন একটি ডিজিটাল মার্কেটপ্লেস, যেখানে
            গ্রাহকরা তাদের প্রয়োজন অনুযায়ী ডিজাইন চয়ন, অর্ডার কনফার্ম, এবং ডেলিভারি সুবিধা নিতে পারে।
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-2 text-lg font-bold text-slate-900">Graphic Design</h2>
              <p>রেন্ডম ও কাস্টম ডিজাইন সলিউশন প্রদান করি।</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-2 text-lg font-bold text-slate-900">Printing</h2>
              <p>অনলাইন ও অফলাইন প্রিন্টিং সার্ভিসের মাধ্যমে মানসম্পন্ন কাজ নিশ্চিত করি।</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-2 text-lg font-bold text-slate-900">Home Delivery</h2>
              <p>সহজ এবং নির্ভরযোগ্য হোম ডেলিভারি সেবা প্রদান করছি।</p>
            </div>
          </div>

          <p>
            আমাদের লক্ষ্য হলো ডিজিটাল মার্কেটপ্লেসকে সহজ, দ্রুত, সাশ্রয়ী, এবং গ্রাহক-কেন্দ্রিক করে তোলা, যাতে
            মানুষ সহজে প্রিন্টিং ও ডিজাইন চাহিদা পূরণ করতে পারে।
          </p>
        </div>
      </article>
    </main>
  );
}
