import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { SITE_CONFIG } from '@/lib/constants'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-lato',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Affordable Business Networking in Oklahoma City`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'business networking Oklahoma City',
    'referral club OKC',
    'affordable networking group',
    'small business networking',
    'ThinkBiz Solutions',
    'business referrals Oklahoma',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Affordable Business Networking That Actually Works`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    types: {
      'application/rss+xml': `${SITE_CONFIG.url}/rss.xml`,
    },
  },
  icons: {
    icon: [
      { url: SITE_CONFIG.logo.favicon, type: 'image/svg+xml' },
    ],
  },
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${lato.className} antialiased`}>
        {/* Skip navigation for keyboard/screen reader users */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
