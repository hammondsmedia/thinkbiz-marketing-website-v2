'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Slight delay so it does not flash during hydration
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="cookie-banner fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 leading-relaxed">
            We use cookies to improve your experience and understand how our site is used.
            Read our{' '}
            <Link href="/cookie-policy" className="text-primary font-medium underline underline-offset-2">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-primary font-medium underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            to learn more.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={decline}
            className="btn-ghost text-sm py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Decline optional cookies"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-primary text-sm py-2 px-5"
            aria-label="Accept all cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
