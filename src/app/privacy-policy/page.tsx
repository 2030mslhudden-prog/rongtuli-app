import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Rongtuli',
  description: 'Privacy Policy for Rongtuli marketplace and design downloads.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 md:px-8 lg:py-24">
      <div className="mb-8">
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Rongtuli</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: August 14, 2026</p>
        </header>

        <div className="space-y-6 text-sm leading-7 text-slate-700 md:text-base">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">1. Information We Collect</h2>
            <p>
              We collect information needed to provide our digital marketplace services, process transactions,
              and improve customer experience. This may include your name, email address, phone number,
              billing and shipping details, payment transaction data, account login details, order history,
              product preferences, and communications with us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Process purchases, payouts, refunds, and order fulfillment.</li>
              <li>Provide access to digital downloads, design files, and account services.</li>
              <li>Verify identity and prevent fraud, abuse, and unauthorized transactions.</li>
              <li>Improve website functionality, customer support, and product recommendations.</li>
              <li>Send account-related updates, transactional notices, and support messages.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">3. Payment Information</h2>
            <p>
              Payments are processed through secure payment gateways. We do not store full credit card details
              on our servers. Payment processing providers may collect and process billing information in
              accordance with their own privacy policies and security standards.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">4. Cookies and Tracking</h2>
            <p>
              We may use cookies, analytics tools, and similar technologies to remember your preferences,
              understand how visitors use our website, and improve user experience. You may disable cookies in
              your browser settings; however, some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">5. Sharing of Information</h2>
            <p>
              We may share information with trusted service providers that help us operate our platform,
              including payment processors, hosting providers, analytics providers, and customer support tools.
              We may also disclose information when required by law or to protect our rights, users, or assets.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">6. Data Security</h2>
            <p>
              We take reasonable administrative, technical, and organizational safeguards to protect personal
              data against unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the internet or electronic storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">7. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, update, or delete your
              personal information. You may also object to or restrict certain processing activities. To exercise
              these rights, please contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">8. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary to fulfill the purposes described in this policy,
              comply with legal obligations, resolve disputes, and enforce agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your information is handled, please
              contact us at <a href="mailto:mslhfr1999@gmail.com" className="font-medium text-primary underline">mslhfr1999@gmail.com</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
