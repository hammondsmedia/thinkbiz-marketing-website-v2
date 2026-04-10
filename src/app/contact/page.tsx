import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ui/ContactForm'
import { LocalBusinessSchema } from '@/components/ui/SchemaMarkup'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with ThinkBiz.Solutions to ask about membership, learn about upcoming chapters in Oklahoma City, or just say hello. We typically respond within one business day.',
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
  openGraph: {
    title: 'Contact ThinkBiz.Solutions | Ask About Membership',
    description:
      'Reach out to the ThinkBiz.Solutions team to learn about membership availability, meeting schedules, and how our referral networking club can help your business grow.',
    url: `${SITE_CONFIG.url}/contact`,
  },
}

const CONTACT_OPTIONS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    description: 'Best for detailed questions',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    value: SITE_CONFIG.phone,
    href: SITE_CONFIG.phoneHref,
    description: 'Mon–Fri, 8am–5pm CT',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Address',
    value: SITE_CONFIG.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`,
    description: 'Oklahoma City, OK',
  },
]

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* ─── PAGE HERO ────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="contact-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Contact</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 id="contact-heading" className="text-white text-4xl lg:text-5xl font-black leading-tight mb-5">
              Let's Talk About Your Business Growth
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Whether you are ready to apply for membership or just exploring whether
              ThinkBiz.Solutions is a good fit, we want to hear from you. We respond to every inquiry
              within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="contact-form-heading">
        <div className="container-site">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact info */}
            <aside className="lg:col-span-2 space-y-6" aria-label="Contact information">
              <div>
                <h2 id="contact-info-heading" className="text-secondary text-2xl font-bold mb-6">
                  Contact Information
                </h2>
                <address className="not-italic space-y-5">
                  {CONTACT_OPTIONS.map(({ icon, label, value, href, description }) => (
                    <div key={label} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mt-0.5" aria-hidden="true">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-secondary font-semibold hover:text-primary transition-colors text-sm leading-relaxed"
                          aria-label={`${label}: ${value}${href.startsWith('http') ? ' (opens in new tab)' : ''}`}
                        >
                          {value}
                        </a>
                        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                      </div>
                    </div>
                  ))}
                </address>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-secondary text-lg font-bold mb-4">Follow Along</h3>
                <div className="flex gap-3" aria-label="Social media profiles">
                  {[
                    { name: 'Facebook', href: SITE_CONFIG.social.facebook },
                    { name: 'LinkedIn', href: SITE_CONFIG.social.linkedin },
                    { name: 'Instagram', href: SITE_CONFIG.social.instagram },
                  ].map(({ name, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary hover:text-primary transition-colors duration-200"
                      aria-label={`ThinkBiz.Solutions on ${name} (opens in new tab)`}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="rounded-xl overflow-hidden border border-gray-200 h-48 bg-slate-50 flex items-center justify-center">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-gray-500 hover:text-primary transition-colors px-4"
                  aria-label={`View ${SITE_CONFIG.address.full} on Google Maps (opens in new tab)`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="block font-semibold text-secondary">{SITE_CONFIG.address.street}</span>
                  <span className="block">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</span>
                  <span className="block mt-1 text-primary font-medium">View on Google Maps →</span>
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 id="contact-form-heading" className="text-secondary text-2xl font-bold mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form and we will get back to you within one business day.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
