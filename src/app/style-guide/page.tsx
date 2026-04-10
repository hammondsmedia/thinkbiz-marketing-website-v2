import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Style Guide',
  description: 'ThinkBiz.Solutions brand style guide — design tokens, typography, color palette, and UI components.',
  alternates: { canonical: `${SITE_CONFIG.url}/style-guide` },
  robots: { index: false, follow: false },
}

const COLORS = [
  { name: 'Primary', variable: '--color-primary', value: '#21bdc8', class: 'bg-primary', textClass: 'text-white' },
  { name: 'Secondary', variable: '--color-primary-dark', value: '#086788', class: 'bg-secondary', textClass: 'text-white' },
  { name: 'Accent', variable: '--color-accent', value: '#f0c808', class: 'bg-accent', textClass: 'text-gray-900' },
  { name: 'White', variable: '--color-white', value: '#ffffff', class: 'bg-white border border-gray-200', textClass: 'text-gray-900' },
  { name: 'Black', variable: '--color-black', value: '#000000', class: 'bg-black', textClass: 'text-white' },
  { name: 'Text Base', variable: '--color-text-base', value: '#1a1a1a', class: 'bg-gray-900', textClass: 'text-white' },
  { name: 'Text Muted', variable: '--color-text-muted', value: '#5a6475', class: 'bg-gray-500', textClass: 'text-white' },
  { name: 'Surface Alt', variable: '--color-surface-alt', value: '#f7fafb', class: 'bg-slate-50 border border-gray-200', textClass: 'text-gray-900' },
]

const TYPOGRAPHY = [
  { tag: 'Display XL', size: 'clamp(2.5rem → 4rem)', weight: 900, example: 'Business Networking Done Right' },
  { tag: 'H1', size: '2.25rem / 36px', weight: 900, example: 'Page Headline Example' },
  { tag: 'H2', size: '1.875rem / 30px', weight: 700, example: 'Section Heading Example' },
  { tag: 'H3', size: '1.5rem / 24px', weight: 700, example: 'Subsection Title Example' },
  { tag: 'H4', size: '1.25rem / 20px', weight: 600, example: 'Card Heading Example' },
  { tag: 'Body Large', size: '1.125rem / 18px', weight: 400, example: 'Lead paragraph text for introductions and key callouts.' },
  { tag: 'Body', size: '1rem / 16px', weight: 400, example: 'Standard body copy used for most paragraph content across the site.' },
  { tag: 'Small', size: '0.875rem / 14px', weight: 400, example: 'Supporting text, captions, meta information, and labels.' },
  { tag: 'Caption', size: '0.75rem / 12px', weight: 400, example: 'Micro copy, badges, tags, and legal disclaimers.' },
]

const BUTTONS = [
  { label: 'Primary Button', className: 'btn-primary', desc: 'Main call-to-action' },
  { label: 'Secondary Button', className: 'btn-secondary', desc: 'Secondary actions' },
  { label: 'Outline Button', className: 'btn-outline', desc: 'Tertiary / ghost actions' },
  { label: 'Accent Button', className: 'btn-accent', desc: 'High-emphasis on dark backgrounds' },
  { label: 'Ghost Button', className: 'btn-ghost', desc: 'Minimal inline actions' },
]

const DESIGN_TOKENS = [
  { token: '--color-primary', value: '#21bdc8', desc: 'Primary brand teal' },
  { token: '--color-primary-dark', value: '#086788', desc: 'Secondary navy blue' },
  { token: '--color-accent', value: '#f0c808', desc: 'Accent yellow' },
  { token: '--font-family-base', value: "'Lato', system-ui, sans-serif", desc: 'Body font stack' },
  { token: '--section-padding-y', value: '5rem', desc: 'Default vertical section padding' },
  { token: '--container-max-width', value: '1280px', desc: 'Max site container width' },
  { token: '--radius-md', value: '0.5rem', desc: 'Standard border radius' },
  { token: '--radius-lg', value: '1rem', desc: 'Card border radius' },
  { token: '--shadow-card', value: '0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(33,189,200,.08)', desc: 'Card shadow' },
  { token: '--transition-base', value: '200ms ease', desc: 'Standard transition' },
]

export default function StyleGuidePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary to-primary text-white py-16" aria-labelledby="styleguide-heading">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Style Guide</li>
            </ol>
          </nav>
          <h1 id="styleguide-heading" className="text-white text-4xl font-black mb-3">
            ThinkBiz.Solutions Style Guide
          </h1>
          <p className="text-blue-100 max-w-2xl">
            The living design system for ThinkBiz.Solutions. All colors, typography,
            spacing, and component styles are driven by CSS custom properties defined
            in <code className="bg-white/20 px-1.5 py-0.5 rounded text-sm">globals.css</code>.
            Update a variable there to restyle the entire site.
          </p>
        </div>
      </section>

      <div className="container-site py-12 space-y-16">

        {/* ─── DESIGN TOKENS ────────────────────────────────────────────────────── */}
        <section aria-labelledby="tokens-heading">
          <h2 id="tokens-heading" className="text-secondary text-2xl font-bold mb-2">Design Tokens</h2>
          <p className="text-gray-500 text-sm mb-6">
            CSS custom properties defined in <code>:root</code> within <code>src/app/globals.css</code>.
            Changing any of these values cascades across the entire site automatically.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm" role="table" aria-label="Design token reference">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-secondary" scope="col">Token</th>
                  <th className="px-4 py-3 font-semibold text-secondary" scope="col">Value</th>
                  <th className="px-4 py-3 font-semibold text-secondary" scope="col">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DESIGN_TOKENS.map(({ token, value, desc }) => (
                  <tr key={token} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-primary text-xs">{token}</td>
                    <td className="px-4 py-3 font-mono text-gray-600 text-xs">{value}</td>
                    <td className="px-4 py-3 text-gray-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── LOGOS ────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="logos-heading">
          <h2 id="logos-heading" className="text-secondary text-2xl font-bold mb-6">Logo System</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: SITE_CONFIG.logo.horizontal, label: 'Horizontal Logo', bg: 'bg-white border border-gray-200' },
              { src: SITE_CONFIG.logo.stacked, label: 'Stacked Logo', bg: 'bg-white border border-gray-200' },
              { src: SITE_CONFIG.logo.stackedWhite, label: 'Stacked White', bg: 'bg-secondary' },
              { src: SITE_CONFIG.logo.emblem, label: 'Emblem', bg: 'bg-white border border-gray-200' },
            ].map(({ src, label, bg }) => (
              <div key={label} className={`rounded-xl p-6 flex flex-col items-center gap-4 ${bg}`}>
                <Image
                  src={src}
                  alt={`${label} — ThinkBiz.Solutions`}
                  width={160}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
                <p className={`text-xs font-semibold ${bg.includes('bg-secondary') ? 'text-blue-200' : 'text-gray-400'}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── COLORS ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="colors-heading">
          <h2 id="colors-heading" className="text-secondary text-2xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="Brand color swatches">
            {COLORS.map(({ name, variable, value, class: cls, textClass }) => (
              <div key={name} role="listitem" aria-label={`${name} color: ${value}`}>
                <div className={`rounded-xl h-24 mb-3 ${cls}`} aria-hidden="true" />
                <p className="font-semibold text-secondary text-sm">{name}</p>
                <p className="text-xs text-gray-400 font-mono">{value}</p>
                <p className="text-xs text-gray-400 font-mono">{variable}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TYPOGRAPHY ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="typography-heading">
          <h2 id="typography-heading" className="text-secondary text-2xl font-bold mb-2">Typography</h2>
          <p className="text-gray-500 text-sm mb-6">
            Font family: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Lato</code> — loaded from Google Fonts.
            Update <code>--font-family-base</code> in <code>globals.css</code> to swap the entire site typeface.
          </p>
          <div className="space-y-5" aria-label="Typography scale examples">
            {TYPOGRAPHY.map(({ tag, size, weight, example }) => (
              <div key={tag} className="border-b border-gray-100 pb-5 last:border-0">
                <div className="flex items-baseline gap-6 mb-1">
                  <span className="badge bg-slate-100 text-gray-500 text-xs shrink-0">{tag}</span>
                  <span className="text-xs text-gray-400">{size} · weight {weight}</span>
                </div>
                <p style={{ fontSize: undefined, fontWeight: weight }} className="text-gray-900 leading-tight">
                  {example}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BUTTONS ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="buttons-heading">
          <h2 id="buttons-heading" className="text-secondary text-2xl font-bold mb-6">Button Styles</h2>
          <div className="flex flex-wrap gap-4 items-start bg-slate-50 p-8 rounded-xl mb-6">
            {BUTTONS.map(({ label, className }) => (
              <button key={label} type="button" className={className} aria-label={label}>
                {label}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm" aria-label="Button class reference">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-secondary" scope="col">Class</th>
                  <th className="px-4 py-3 font-semibold text-secondary" scope="col">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BUTTONS.map(({ label, className, desc }) => (
                  <tr key={label}>
                    <td className="px-4 py-3 font-mono text-primary text-xs">.{className}</td>
                    <td className="px-4 py-3 text-gray-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── BADGES ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="badges-heading">
          <h2 id="badges-heading" className="text-secondary text-2xl font-bold mb-6">Badges & Labels</h2>
          <div className="flex flex-wrap gap-3 p-6 bg-slate-50 rounded-xl">
            <span className="badge-primary">Primary Badge</span>
            <span className="badge-secondary">Secondary Badge</span>
            <span className="badge-accent">Accent Badge</span>
            <span className="badge bg-gray-100 text-gray-600">Neutral Badge</span>
            <span className="badge bg-green-100 text-green-700">Success</span>
            <span className="badge bg-red-100 text-red-700">Error</span>
          </div>
        </section>

        {/* ─── CARDS ────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="cards-heading">
          <h2 id="cards-heading" className="text-secondary text-2xl font-bold mb-6">Card Styles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-base p-6">
              <h3 className="font-bold text-secondary mb-2">Standard Card</h3>
              <p className="text-gray-500 text-sm">Uses <code>.card-base</code>. Hover to see elevation change.</p>
            </div>
            <div className="card-base p-6 border-t-4 border-primary">
              <h3 className="font-bold text-secondary mb-2">Accented Card</h3>
              <p className="text-gray-500 text-sm">Card with primary top border for emphasis.</p>
            </div>
            <div className="bg-secondary text-white rounded-xl p-6">
              <h3 className="font-bold text-white mb-2">Dark Card</h3>
              <p className="text-blue-200 text-sm">Dark background variant for contrast sections.</p>
            </div>
          </div>
        </section>

        {/* ─── SPACING ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="spacing-heading">
          <h2 id="spacing-heading" className="text-secondary text-2xl font-bold mb-6">Spacing System</h2>
          <p className="text-gray-500 text-sm mb-6">
            Sections use consistent vertical padding controlled by utility classes.
            Update <code>--section-padding-y</code> in globals.css to adjust globally.
          </p>
          <div className="space-y-3">
            {[
              { label: '.section-padding', desc: 'py-20 lg:py-28 — Standard section padding' },
              { label: '.section-padding-sm', desc: 'py-12 lg:py-16 — Compact section padding' },
              { label: '.container-site', desc: 'Max-width 1280px, horizontal padding 1.5rem' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-gray-100">
                <code className="text-primary text-xs font-mono shrink-0">{label}</code>
                <span className="text-gray-500 text-sm">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ILLUSTRATIONS ────────────────────────────────────────────────────── */}
        <section aria-labelledby="illustrations-heading">
          <h2 id="illustrations-heading" className="text-secondary text-2xl font-bold mb-6">Illustration Library</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { src: '/assets/illustrations/excitement-illustration.svg', label: 'Excitement' },
              { src: '/assets/illustrations/business-flying.svg', label: 'Business Flying' },
              { src: '/assets/illustrations/leadership-growth.svg', label: 'Leadership Growth' },
              { src: '/assets/illustrations/follow-the-leader-illustration.svg', label: 'Follow the Leader' },
              { src: '/assets/illustrations/team-work-illustration.svg', label: 'Team Work' },
            ].map(({ src, label }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4 flex flex-col items-center gap-3 border border-gray-100">
                <Image
                  src={src}
                  alt={`${label} illustration`}
                  width={100}
                  height={100}
                  className="w-full h-24 object-contain"
                />
                <p className="text-xs text-gray-400 text-center font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
