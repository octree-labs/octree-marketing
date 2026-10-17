import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for using Octree LaTeX editing platform.',
  openGraph: mergeOpenGraph({
    title: 'Terms & Conditions | Octree',
    description: 'Terms and Conditions for using Octree LaTeX editing platform.',
  }),
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions | Octree',
    description: 'Terms and Conditions for using Octree LaTeX editing platform.',
  },
}

export default function TermsAndConditions() {
  return (
    <article className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-heading">
        <h1>Terms &amp; Conditions</h1>
        <p className="text-lg text-neutral-600">Last updated: January 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Octree (&ldquo;Service&rdquo;), you agree to be bound by these Terms
          &amp; Conditions (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not
          use our Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Octree provides an online LaTeX editing platform with AI-powered features, document
          compilation, and collaboration tools. We reserve the right to modify, suspend, or
          discontinue any aspect of the Service at any time.
        </p>

        <h2>3. Account Registration</h2>
        <p>To use certain features, you must create an account. You agree to:</p>
        <ul>
          <li>Provide accurate and complete registration information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Be responsible for all activities under your account</li>
        </ul>

        <h2>4. Subscription and Payment</h2>
        <h3>4.1 Free Tier</h3>
        <p>
          The Starter plan includes limited free AI edits per day and basic features as described on
          our pricing page.
        </p>

        <h3>4.2 Paid Plans</h3>
        <ul>
          <li>Subscription fees are billed in advance on a weekly or monthly basis</li>
          <li>All fees are non-refundable except as required by law</li>
          <li>We may change pricing with 30 days notice</li>
          <li>
            You may cancel your subscription at any time; access continues until the end of the
            billing period
          </li>
        </ul>

        <h3>4.3 Payment Processing</h3>
        <p>
          Payments are processed securely through Stripe. By providing payment information, you
          authorize us to charge the applicable fees.
        </p>

        <h2>5. User Content</h2>
        <h3>5.1 Ownership</h3>
        <p>
          You retain all rights to the documents and content you create using our Service. We do not
          claim ownership of your content.
        </p>

        <h3>5.2 License to Us</h3>
        <p>
          By using our Service, you grant us a limited license to process, store, and display your
          content solely to provide the Service to you.
        </p>

        <h3>5.3 Prohibited Content</h3>
        <p>You agree not to upload or create content that:</p>
        <ul>
          <li>Infringes on intellectual property rights</li>
          <li>Contains malware or harmful code</li>
          <li>Is illegal, threatening, or harassing</li>
          <li>Violates any applicable laws or regulations</li>
        </ul>

        <h2>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Reverse engineer or attempt to extract source code</li>
          <li>Use automated systems to access the Service without permission</li>
          <li>Resell or redistribute the Service without authorization</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          The Service, including its design, features, and content (excluding user content), is
          owned by Octree and protected by intellectual property laws. You may not copy, modify, or
          distribute our proprietary materials.
        </p>

        <h2>8. AI Features</h2>
        <p>
          Our AI-powered features are provided &ldquo;as is.&rdquo; While we strive for accuracy, AI
          suggestions may contain errors. You are responsible for reviewing and verifying all
          AI-generated content before use.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
          WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE
          UNINTERRUPTED, ERROR-FREE, OR SECURE.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OCTREE SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, PROFITS,
          OR BUSINESS OPPORTUNITIES.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Octree and its affiliates from any claims,
          damages, or expenses arising from your use of the Service or violation of these Terms.
        </p>

        <h2>12. Termination</h2>
        <p>
          We may suspend or terminate your account if you violate these Terms. Upon termination,
          your right to use the Service ceases immediately. Provisions that should survive
          termination will remain in effect.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify you of material changes by
          posting the updated Terms and changing the &ldquo;Last updated&rdquo; date. Continued use
          of the Service after changes constitutes acceptance.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Canada, without regard to conflict of law
          principles. Any disputes shall be resolved in the courts of Ontario, Canada.
        </p>

        <h2>15. Contact</h2>
        <p>For questions about these Terms, please contact us at:</p>
        <ul>
          <li>Email: basil@useoctree.online</li>
        </ul>
      </div>
    </article>
  )
}
