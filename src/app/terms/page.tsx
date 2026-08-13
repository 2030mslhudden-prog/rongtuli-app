import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Rongtuli',
  description: 'Terms and conditions for using Rongtuli marketplace and services in Bangladesh.',
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Terms & Conditions</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: August 14, 2026</p>
        </header>

        <div className="space-y-6 text-sm leading-7 text-slate-700 md:text-base">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">1. Agreement</h2>
            <p>
              By accessing and using Rongtuli, you agree to be bound by these Terms and Conditions and all
              applicable laws and regulations of the People&apos;s Republic of Bangladesh. If you do not agree with
              any part of these terms, you must not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">2. Services Offered</h2>
            <p>
              Rongtuli operates a digital marketplace for the sale and distribution of design templates, digital
              assets, and related content. We provide access to downloadable digital files, purchase processing,
              account services, and customer support. We may update, suspend, or discontinue any service at any
              time without prior notice when required for operational, legal, or security reasons.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">3. Registration and Account Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activity conducted through your account. You agree to provide accurate and complete information when
              registering or making purchases, and to update such information promptly if it changes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">4. Orders, Pricing, and Payment</h2>
            <p>
              All prices are stated in Bangladeshi Taka (BDT) unless otherwise stated. The checkout process may
              use approved payment gateways and secure payment methods. By placing an order, you confirm that the
              information you provide is accurate and that you are authorized to use the selected payment method.
              We reserve the right to refuse or cancel any order suspected of fraud, unauthorized use, or violation
              of these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">5. Digital Product Delivery</h2>
            <p>
              Digital products are delivered electronically after successful payment confirmation. Delivery may be
              made through a download link, file access portal, or secure file storage system. You are responsible
              for ensuring that the downloaded files are stored securely and used in compliance with the applicable
              license terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">6. Intellectual Property</h2>
            <p>
              All content listed on Rongtuli is protected by copyright and other intellectual property laws. Unless
              otherwise stated, the content is licensed for the specific permitted use described in the product
              listing. You may not resell, redistribute, share, scrape, or exploit the files beyond the granted
              license without written permission from the rights owner or Rongtuli.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">7. User Conduct</h2>
            <p>
              You agree not to use the platform for any unlawful, abusive, fraudulent, harmful, or deceptive
              purpose. This includes, but is not limited to, unauthorized access, content piracy, misuse of files,
              chargeback abuse, harassment, impersonation, or any act that interferes with the operation or
              security of the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">8. Refunds, Disputes, and Chargebacks</h2>
            <p>
              Our Return & Refund Policy governs refunds and chargeback-related issues. If you believe an order is
              defective, incomplete, or not delivered as described, you must contact us first and provide the
              required information before initiating a chargeback or dispute with your bank or payment provider.
              Failure to contact us may delay resolution or result in account restrictions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">9. Privacy and Data Protection</h2>
            <p>
              We process personal information only for lawful and necessary business purposes, including order
              processing, customer support, fraud prevention, and compliance with legal obligations. Please review
              our Privacy Policy for details on data collection, use, retention, and your rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">10. Limitation of Liability</h2>
            <p>
              Rongtuli shall not be liable for indirect, incidental, or consequential damages arising from the use
              of the platform, delay in service, product defects, payment processing interruptions, or third-party
              services. Our total liability shall not exceed the amount paid for the specific transaction giving rise
              to the claim, where applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">11. Governing Law</h2>
            <p>
              These terms are governed by the laws of the People&apos;s Republic of Bangladesh, without regard to its
              conflict of law principles. Any dispute arising from these terms shall be subject to the jurisdiction
              of the competent courts in Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">12. Contact</h2>
            <p>
              For account, payment, refund, privacy, or legal inquiries, please contact us at
              <a href="mailto:hello@rongtuli.com" className="font-medium text-primary underline"> hello@rongtuli.com</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
