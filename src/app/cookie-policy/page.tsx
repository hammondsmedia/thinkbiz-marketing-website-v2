import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cookie Usage Policy',
  description:
    'Learn how ThinkBiz.Solutions uses cookies and similar technologies on our website, and how you can control your cookie preferences.',
  alternates: { canonical: `${SITE_CONFIG.url}/cookie-policy` },
}

const LAST_UPDATED = 'April 10, 2026'

const COOKIE_TYPES = [
  {
    name: 'Strictly Necessary Cookies',
    required: true,
    description:
      'These cookies are essential for the website to function properly. They enable core features such as security, form submission, and page navigation. The website cannot operate correctly without these cookies.',
    examples: ['Session management', 'CSRF protection tokens', 'Cookie consent preference storage'],
  },
  {
    name: 'Analytics Cookies',
    required: false,
    description:
      'These cookies help us understand how visitors interact with our website by collecting anonymous usage data. This information is used to improve site content and user experience.',
    examples: ['Page view tracking', 'Session duration', 'Traffic source attribution'],
  },
  {
    name: 'Preference Cookies',
    required: false,
    description:
      'These cookies remember your preferences and settings to provide a more personalized experience on return visits.',
    examples: ['Language or region settings', 'Display preferences'],
  },
]

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-secondary text-white py-16 lg:py-20" aria-labelledby="cookie-heading">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Cookie Policy</li>
            </ol>
          </nav>
          <h1 id="cookie-heading" className="text-white text-3xl lg:text-4xl font-black mb-3">
            Cookie Usage Policy
          </h1>
          <p className="text-blue-200 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16" aria-label="Cookie policy content">
        <div className="container-site max-w-3xl">
          <div className="prose-brand space-y-10">

            <section aria-labelledby="what-cookies-heading">
              <h2 id="what-cookies-heading">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website.
                They are widely used to make websites work more efficiently and to provide useful
                information to website owners. Cookies do not identify you personally; they
                recognize your device.
              </p>
              <p>
                Similar technologies include web beacons, pixels, and local storage, which work in
                comparable ways. This policy covers all such technologies used on our website.
              </p>
            </section>

            <section aria-labelledby="why-cookies-heading">
              <h2 id="why-cookies-heading">Why Do We Use Cookies?</h2>
              <p>
                {SITE_CONFIG.name} uses cookies and similar technologies to:
              </p>
              <ul>
                <li>Ensure the website functions correctly and securely</li>
                <li>Remember your preferences between visits</li>
                <li>Understand how visitors use our website so we can improve it</li>
                <li>Measure the effectiveness of our content</li>
              </ul>
              <p>
                We do not use cookies to track you across other websites or to serve you
                targeted advertising.
              </p>
            </section>

            <section aria-labelledby="cookie-types-heading">
              <h2 id="cookie-types-heading">What Types of Cookies Do We Use?</h2>
              <div className="space-y-5 not-prose mt-6">
                {COOKIE_TYPES.map(({ name, required, description, examples }) => (
                  <div
                    key={name}
                    className="rounded-xl border border-gray-200 p-5"
                    role="region"
                    aria-label={name}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-bold text-secondary text-base">{name}</h3>
                      <span
                        className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          required
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                        aria-label={required ? 'Always active' : 'Optional, requires consent'}
                      >
                        {required ? 'Always Active' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Examples</p>
                      <ul className="flex flex-wrap gap-2">
                        {examples.map((ex) => (
                          <li key={ex} className="badge bg-slate-100 text-gray-600 text-xs">{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="third-party-heading">
              <h2 id="third-party-heading">Do Third Parties Place Cookies on Our Site?</h2>
              <p>
                We may use third-party services that place their own cookies on your device,
                such as analytics platforms. These services operate under their own privacy
                and cookie policies, which we encourage you to review independently.
              </p>
              <p>
                We evaluate all third-party services we use and only work with those that
                maintain appropriate data protection standards.
              </p>
            </section>

            <section aria-labelledby="control-heading">
              <h2 id="control-heading">How Can You Control Cookies?</h2>
              <h3>Through Your Browser</h3>
              <p>
                Most web browsers allow you to manage cookies through their settings. You can
                typically find these controls in the "Privacy," "Security," or "Settings" section
                of your browser. Note that blocking all cookies may affect how our website works.
              </p>

              <h3>Through Our Consent Banner</h3>
              <p>
                When you first visit our website, you will see a cookie consent notice that
                allows you to accept or decline optional cookies. You can update your preference
                at any time by clearing your browser's local storage or cookies for our domain.
              </p>

              <h3>Do Not Track</h3>
              <p>
                Some browsers send a "Do Not Track" signal. Our website respects this signal
                where technically feasible by limiting optional tracking on your visit.
              </p>
            </section>

            <section aria-labelledby="retention-heading">
              <h2 id="retention-heading">How Long Do Cookies Last?</h2>
              <p>
                Cookies can be either "session" cookies, which expire when you close your browser,
                or "persistent" cookies, which remain on your device for a defined period or until
                you delete them. Our strictly necessary cookies are session-based. Analytics and
                preference cookies may persist for up to 12 months.
              </p>
            </section>

            <section aria-labelledby="updates-heading">
              <h2 id="updates-heading">Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy when we add new features or change how we
                use cookies. The "Last updated" date at the top of this page will reflect
                any revisions. We encourage you to check back periodically.
              </p>
            </section>

            <section aria-labelledby="contact-cookie-heading">
              <h2 id="contact-cookie-heading">Questions About Our Cookie Practices?</h2>
              <p>
                If you have questions about how we use cookies, please contact us at{' '}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> or visit our{' '}
                <Link href="/contact">Contact page</Link>. You can also review our full{' '}
                <Link href="/privacy-policy">Privacy Policy</Link> for additional context on
                how we handle your data.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  )
}
