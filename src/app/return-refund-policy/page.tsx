import Link from 'next/link';

export const metadata = {
  title: 'Return & Refund Policy | Rongtuli',
  description: 'Return and refund policy for digital products and download orders on Rongtuli.',
};

export default function ReturnRefundPolicyPage() {
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
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Return & Refund Policy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: August 14, 2026</p>
        </header>

        <div className="space-y-6 text-sm leading-7 text-slate-700 md:text-base">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">1. Scope</h2>
            <p>
              This Return & Refund Policy applies to digital design assets, downloadable files, and related
              electronic goods sold through Rongtuli. This policy is intended to comply with standard consumer
              protection expectations for online digital commerce in Bangladesh and to provide clear procedures for
              refund requests, dispute resolution, and customer support.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">2. Digital Goods Policy</h2>
            <p>
              Digital products are delivered electronically after successful payment confirmation. Because digital
              content is instantly downloadable and accessible, refunds are generally not available once a product
              has been fully delivered, accessed, or downloaded, except in cases where the product is defective,
              incorrect, inaccessible, or materially different from the description.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">3. Refund Eligibility</h2>
            <p>Refunds may be considered if:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>The purchased file is not delivered, is inaccessible, or cannot be downloaded.</li>
              <li>The file is corrupted, incomplete, unusable, or materially differs from the listed description.</li>
              <li>A duplicate or incorrect order was placed due to an operational error.</li>
              <li>The buyer did not receive the promised digital access because of a platform or service failure.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">4. Non-Refundable Cases</h2>
            <p>
              We generally do not issue refunds for buyer&apos;s remorse, change of mind, accidental purchase,
              partial personal dissatisfaction, or cases where the buyer has already downloaded and used the file,
              unless there is a valid defect, delivery failure, platform issue, or misrepresentation of the product.
              Custom or bespoke design work may be subject to separate terms and conditions agreed at the time of
              booking or purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">5. Request Procedure</h2>
            <p>
              To request a refund, the customer must contact Rongtuli within 7 calendar days of purchase and
              provide: order number, email address used during purchase, product name, reason for request, and any
              supporting evidence such as screenshots, download failure messages, or order details. We may request
              additional information to verify the issue before approving a refund.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">6. Review Timeline</h2>
            <p>
              We will review valid refund requests within 5 to 10 business days. If the request is approved, the
              refund will be processed to the original payment method or as store credit where the payment provider
              or transaction structure requires it. Processing times may vary depending on the bank, card issuer,
              or payment gateway.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">7. Chargebacks and Disputes</h2>
            <p>
              Before filing a chargeback or dispute with a bank, fintech platform, or card issuer, the customer
              must contact Rongtuli directly and allow us a reasonable opportunity to investigate and resolve the
              matter. Failure to do so may delay resolution and may affect our support response or future account
              access. We aim to resolve issues fairly and quickly, and we reserve the right to reject unsupported
              chargeback claims when valid service was provided.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">8. Contact</h2>
            <p>
              For refund requests, order issues, delivery concerns, or complaint resolution, please contact us at
              <a href="mailto:hello@rongtuli.com" className="font-medium text-primary underline"> hello@rongtuli.com</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
