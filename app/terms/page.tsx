import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <Reveal as="header" className="legal-header">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: March 30, 2026</p>
      </Reveal>

      <div className="legal-body">
        <Reveal as="section">
          <h2>1. Overview</h2>
          <p>
            These terms govern your use of the Mokha Coffee House website and our
            online ordering service. By placing an order, you agree to these terms.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>2. Orders &amp; Pickup</h2>
          <ul>
            <li>All orders are for in-store pickup at the location you select.</li>
            <li>
              ASAP orders are prepared promptly; estimated pickup times are
              approximate and may vary depending on demand.
            </li>
            <li>
              Scheduled orders should be picked up within 15 minutes of the
              selected time. Unclaimed orders may be discarded at our discretion.
            </li>
          </ul>
        </Reveal>

        <Reveal as="section">
          <h2>3. Pricing &amp; Payment</h2>
          <p>
            All prices are listed in Canadian dollars (CAD) and include applicable
            taxes unless otherwise noted. Payment is processed securely by Square,
            Inc. at checkout.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>4. Refunds &amp; Cancellations</h2>
          <p>
            If there is an issue with your order (incorrect items, quality concerns),
            please notify staff at the pickup location and we will make it right.
            Refund requests for completed orders are handled through Square&rsquo;s
            dispute process or at the store manager&rsquo;s discretion.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>5. Menu Availability</h2>
          <p>
            Menu items and prices are subject to change without notice. Items may
            become unavailable due to supply or seasonal availability. We will do
            our best to reflect real-time availability on the order page.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>6. Limitation of Liability</h2>
          <p>
            Mokha Coffee House Ltd. provides this website and ordering service
            &ldquo;as is.&rdquo; We are not liable for any indirect, incidental, or
            consequential damages arising from your use of the site or service,
            including but not limited to order delays, system outages, or
            third-party payment processing issues.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Province of Alberta, Canada.
            Any disputes will be resolved in the courts of Alberta.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>8. Changes to These Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Changes take
            effect when posted on this page.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>9. Contact</h2>
          <p>
            Questions about these terms? Reach us at{' '}
            <a href="mailto:hello@mymokhacafe.com">hello@mymokhacafe.com</a>.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
