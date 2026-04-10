import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the ThinkBiz.Solutions Privacy Policy to understand how we collect, use, and protect your personal information.',
  alternates: { canonical: `${SITE_CONFIG.url}/privacy-policy` },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'April 10, 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-secondary text-white py-16 lg:py-20" aria-labelledby="privacy-heading">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Privacy Policy</li>
            </ol>
          </nav>
          <h1 id="privacy-heading" className="text-white text-3xl lg:text-4xl font-black mb-3">
            Privacy Policy
          </h1>
          <p className="text-blue-200 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16" aria-label="Privacy policy content">
        <div className="container-site max-w-3xl">
          <div className="prose-brand space-y-10">

            <section aria-labelledby="intro-heading">
              <h2 id="intro-heading">What Does This Privacy Policy Cover?</h2>
              <p>
                This Privacy Policy describes how {SITE_CONFIG.name} ("ThinkBiz," "we," "us," or "our")
                collects, uses, and protects information about you when you visit our website at{' '}
                <Link href="/">{SITE_CONFIG.url}</Link>, contact us, or interact with us in any way.
              </p>
              <p>
                We take your privacy seriously. We do not sell your personal information to third parties,
                and we do not use deceptive practices to collect data you would not expect us to have.
              </p>
            </section>

            <section aria-labelledby="info-collect-heading">
              <h2 id="info-collect-heading">What Information Do We Collect?</h2>
              <h3>Information You Provide Directly</h3>
              <p>When you contact us or fill out a form on our website, we may collect:</p>
              <ul>
                <li>Your name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Business name and professional category (optional)</li>
                <li>The content of your message or inquiry</li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <p>When you visit our website, we may collect certain information automatically, including:</p>
              <ul>
                <li>Your IP address and general geographic location</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring URL (how you found our site)</li>
                <li>Device type and operating system</li>
              </ul>
              <p>
                This information is collected through standard web server logs and, if you consent,
                through cookies and analytics tools. We use this data to understand how our website
                is being used and to improve your experience.
              </p>
            </section>

            <section aria-labelledby="use-heading">
              <h2 id="use-heading">How Do We Use Your Information?</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and membership applications</li>
                <li>Provide information about ThinkBiz.Solutions events, chapters, and news</li>
                <li>Improve the functionality and content of our website</li>
                <li>Comply with applicable laws and protect our legal rights</li>
              </ul>
              <p>
                We will only contact you in ways that are directly relevant to the reason you reached
                out to us. We do not add you to marketing lists without your explicit consent.
              </p>
            </section>

            <section aria-labelledby="cookies-heading">
              <h2 id="cookies-heading">Cookies and Tracking</h2>
              <p>
                Our website may use cookies — small text files stored on your device — to improve
                functionality and user experience. You can review our detailed cookie practices in our{' '}
                <Link href="/cookie-policy">Cookie Usage Policy</Link>.
              </p>
              <p>
                You can control cookie settings in your browser or through the consent banner on our
                website. Please note that disabling certain cookies may affect site functionality.
              </p>
            </section>

            <section aria-labelledby="sharing-heading">
              <h2 id="sharing-heading">Do We Share Your Information?</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information only in the following circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service providers:</strong> We may share information with trusted vendors
                  who assist with website hosting, email delivery, or analytics, under strict
                  confidentiality agreements.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose information if required by
                  law, court order, or government authority.
                </li>
                <li>
                  <strong>Business transfers:</strong> In the unlikely event of a merger, acquisition,
                  or sale of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </section>

            <section aria-labelledby="retention-heading">
              <h2 id="retention-heading">How Long Do We Keep Your Information?</h2>
              <p>
                We retain personal information only as long as necessary to fulfill the purpose for
                which it was collected, or as required by applicable law. Contact form submissions
                are typically retained for up to 24 months. You may request deletion of your
                information at any time by contacting us.
              </p>
            </section>

            <section aria-labelledby="rights-heading">
              <h2 id="rights-heading">What Are Your Privacy Rights?</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of any marketing communications</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>. We will respond
                within 30 days.
              </p>
            </section>

            <section aria-labelledby="security-heading">
              <h2 id="security-heading">How Do We Protect Your Information?</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your
                personal information against unauthorized access, loss, or misuse. These include
                secure hosting, encrypted data transmission (HTTPS), and limited access to
                personal data within our organization.
              </p>
              <p>
                No method of transmission over the internet is completely secure, and we cannot
                guarantee absolute security. However, we take your data protection seriously and
                continuously work to improve our safeguards.
              </p>
            </section>

            <section aria-labelledby="children-heading">
              <h2 id="children-heading">Children's Privacy</h2>
              <p>
                Our website is not directed at children under the age of 13, and we do not
                knowingly collect personal information from children. If you believe a child has
                provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise
                the "Last updated" date at the top of this page. We encourage you to review this
                policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section aria-labelledby="contact-privacy-heading">
              <h2 id="contact-privacy-heading">How Can You Contact Us About Privacy?</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your information,
                please contact us:
              </p>
              <address className="not-italic bg-slate-50 rounded-xl p-5 border border-gray-100 mt-4">
                <strong>{SITE_CONFIG.name}</strong><br />
                {SITE_CONFIG.address.full}<br />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary">{SITE_CONFIG.email}</a><br />
                <a href={SITE_CONFIG.phoneHref} className="text-primary">{SITE_CONFIG.phone}</a>
              </address>
            </section>

          </div>
        </div>
      </section>
    </div>
  )
}
