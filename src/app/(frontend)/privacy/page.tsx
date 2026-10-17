import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Octree - Learn how we collect, use, and protect your data.',
  openGraph: {
    title: 'Privacy Policy | Octree',
    description: 'Privacy Policy for Octree - Learn how we collect, use, and protect your data.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Octree',
    description: 'Privacy Policy for Octree - Learn how we collect, use, and protect your data.',
  },
}

export default function PrivacyPolicy() {
  return (
    <article className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-heading">
        <h1>Privacy Policy</h1>
        <p className="text-lg text-neutral-600">Last updated: January 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Octree (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy 
          and ensuring the security of your personal information. This Privacy Policy explains 
          how we collect, use, disclose, and safeguard your information when you use our 
          LaTeX editing platform and related services.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and password when you create an account.</li>
          <li><strong>Payment Information:</strong> Billing details processed securely through Stripe. We do not store your full credit card numbers.</li>
          <li><strong>Content:</strong> Documents, LaTeX files, and other content you create or upload to our platform.</li>
          <li><strong>Communications:</strong> Information you provide when contacting our support team.</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> How you interact with our services, features used, and time spent.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
          <li><strong>Log Data:</strong> IP address, access times, and pages viewed.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide, maintain, and improve our LaTeX editing services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Analyze usage patterns to enhance user experience</li>
          <li>Detect, prevent, and address technical issues</li>
        </ul>

        <h2>4. AI Features and Data Processing</h2>
        <p>
          Our AI-powered features process your document content to provide suggestions and 
          assistance. This processing is done to deliver the service you&apos;ve requested. 
          We do not use your documents to train our AI models without your explicit consent.
        </p>

        <h2>5. Data Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (e.g., hosting, payment processing, analytics).</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>6. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including 
          encryption in transit and at rest. However, no method of transmission over the 
          Internet is 100% secure.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain your information for as long as your account is active or as needed to 
          provide services. You may request deletion of your data at any time by contacting us.
        </p>

        <h2>8. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify inaccurate personal data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to or restrict processing of your data</li>
          <li>Data portability</li>
        </ul>

        <h2>9. Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience, analyze usage, 
          and assist in our marketing efforts. You can control cookie preferences through 
          your browser settings.
        </p>

        <h2>10. Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect 
          information from children under 13.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <ul>
          <li>Email: basil@useoctree.online</li>
        </ul>
      </div>
    </article>
  )
}
