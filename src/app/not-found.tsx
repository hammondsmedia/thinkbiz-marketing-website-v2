import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for could not be found. Browse our site to find what you need.',
  robots: { index: false, follow: true },
}

export default function NotFoundPage() {
  return (
    <section
      className="min-h-[80vh] bg-gradient-to-br from-secondary to-primary/70 flex items-center justify-center text-white py-20"
      aria-labelledby="notfound-heading"
    >
      <div className="container-site text-center max-w-2xl">
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/logos/thinkbiz-stacked-logo-white.svg"
            alt={`${SITE_CONFIG.name} logo`}
            width={120}
            height={70}
            className="h-16 w-auto opacity-80"
          />
        </div>

        <p className="text-accent font-black text-7xl lg:text-9xl mb-4" aria-hidden="true">
          404
        </p>

        <h1
          id="notfound-heading"
          className="text-white text-3xl lg:text-4xl font-black mb-4 leading-tight"
        >
          This Page Has Left the Building
        </h1>
        <p className="text-blue-100 text-lg leading-relaxed mb-10">
          The page you are looking for has moved, been removed, or may never have existed.
          Let us help you find what you need.
        </p>

        <nav aria-label="Recovery navigation — suggested pages" className="mb-8">
          <ul className="flex flex-wrap justify-center gap-3" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-5 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/"
          className="btn-accent"
          aria-label="Return to the ThinkBiz.Solutions homepage"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
