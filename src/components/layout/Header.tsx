'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Trap focus within menu when open
  useEffect(() => {
    if (!menuOpen) return
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : 'bg-white'
      )}
      role="banner"
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
            aria-label={`${SITE_CONFIG.name} — Return to homepage`}
          >
            <Image
              src={SITE_CONFIG.logo.horizontal}
              alt={`${SITE_CONFIG.name} logo`}
              width={180}
              height={50}
              priority
              className="h-10 w-auto lg:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1"
          >
            <ul className="flex items-center gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200',
                      isActive(link.href)
                        ? 'text-primary bg-primary/8'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    )}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="btn-primary ml-4 text-sm py-2.5"
              aria-label="Join ThinkBiz.Solutions networking club"
            >
              Join the Club
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span aria-hidden="true" className="block w-6">
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          'lg:hidden border-t border-gray-100 bg-white transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <nav aria-label="Mobile navigation" className="container-site py-4">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-primary bg-primary/8'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/contact"
              className="btn-primary w-full text-center"
              tabIndex={menuOpen ? 0 : -1}
              aria-label="Join ThinkBiz.Solutions networking club"
            >
              Join the Club
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
