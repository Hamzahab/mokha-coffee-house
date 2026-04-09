import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <Reveal as="header" className="legal-header">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: March 30, 2026</p>
      </Reveal>

      <div className="legal-body">
        <Reveal as="section">
          <h2>1. Who We Are</h2>
          <p>
            Mokha Coffee House Ltd. (&ldquo;Mokha,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;)
            operates two caf&eacute; locations in Edmonton, Alberta, and this website
            at mokha-coffee-house.vercel.app. This policy explains how we collect,
            use, and protect your personal information.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>2. Information We Collect</h2>
          <p>When you place an order for pickup through our website, we collect:</p>
          <ul>
            <li><strong>Name</strong> &mdash; to identify your order at pickup</li>
            <li><strong>Email address</strong> &mdash; for order confirmation</li>
            <li><strong>Phone number</strong> &mdash; so we can reach you about your order</li>
          </ul>
          <p>
            We do not collect payment information directly. All payments are processed
            securely by Square, Inc. Please refer to{' '}
            <a href="https://squareup.com/legal/privacy" target="_blank" rel="noopener noreferrer">
              Square&rsquo;s Privacy Policy
            </a>{' '}
            for details on how they handle payment data.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect solely to:</p>
          <ul>
            <li>Process and fulfill your pickup order</li>
            <li>Contact you if there is an issue with your order</li>
            <li>Respond to inquiries submitted through our contact form</li>
          </ul>
          <p>We do not use your information for marketing unless you explicitly opt in.</p>
        </Reveal>

        <Reveal as="section">
          <h2>4. Third-Party Services</h2>
          <p>
            We share your information with Square, Inc. as our payment processor to
            complete your transaction. We do not sell, trade, or otherwise share your
            personal information with any other third parties.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>5. Data Retention</h2>
          <p>
            Order data is retained by Square per their merchant terms. We do not
            independently store your personal information on our servers beyond what
            is needed to process your order.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>6. Cookies &amp; Local Storage</h2>
          <p>
            This website uses browser local storage to remember your cart contents
            and selected pickup location during your session. We do not use tracking
            cookies or third-party analytics.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>7. Your Rights</h2>
          <p>
            Under Alberta&rsquo;s Personal Information Protection Act (PIPA) and
            Canada&rsquo;s PIPEDA, you have the right to access, correct, or request
            deletion of your personal information. To make a request, contact us at{' '}
            <a href="mailto:hello@mymokhacafe.com">hello@mymokhacafe.com</a>.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on
            this page with a revised &ldquo;Last updated&rdquo; date.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, email us at{' '}
            <a href="mailto:hello@mymokhacafe.com">hello@mymokhacafe.com</a>.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
