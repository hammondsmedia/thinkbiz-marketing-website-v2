import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { EVENTS } from '@/lib/event-data'
import { buildMetadata } from '@/lib/metadata'
import { OrganizationSchema } from '@/components/ui/SchemaMarkup'
import { EventsView } from '@/components/ui/EventsView'

export const metadata: Metadata = buildMetadata({
  title: 'Events',
  description:
    'Browse upcoming ThinkBiz.Solutions events including workshops, networking socials, seminars, and chapter meetings across Oklahoma City.',
  ogTitle: 'ThinkBiz Events — Workshops, Socials & Chapter Meetings',
  ogDescription:
    'View our full event calendar and register for upcoming networking events, business workshops, and ThinkBiz chapter meetings in Oklahoma City.',
  canonical: '/events',
})

export default function EventsPage() {
  const upcomingCount = EVENTS.filter((e) => e.status === 'upcoming').length
  const categories = [...new Set(EVENTS.map((e) => e.category))]

  return (
    <>
      <OrganizationSchema />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-20 lg:py-24 relative overflow-hidden"
        aria-labelledby="events-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-56 h-56 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Events</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              Calendar & Events
            </p>
            <h1
              id="events-hero-heading"
              className="text-white text-4xl lg:text-5xl font-black leading-tight mb-5"
            >
              ThinkBiz Events & Workshops
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              From weekly chapter meetings to annual summits, ThinkBiz runs events designed to grow
              your network and sharpen your business skills. Browse the calendar and register for
              what fits your schedule.
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { number: upcomingCount.toString(), label: 'Upcoming Events' },
                { number: categories.length.toString(), label: 'Event Types' },
                { number: '3', label: 'Active Chapters' },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-accent">{number}</p>
                  <p className="text-sm text-blue-200 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALENDAR + LIST ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-slate-50" aria-label="Events calendar and list">
        <div className="container-site max-w-3xl">
          <EventsView events={EVENTS} />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-16" aria-labelledby="events-cta-heading">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h2 id="events-cta-heading" className="text-white text-2xl font-black mb-3 leading-tight">
            Not Sure Which Event Is Right for You?
          </h2>
          <p className="text-blue-50 leading-relaxed mb-8">
            Reach out and we will point you toward the events that make the most sense given where
            you are in your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-accent" aria-label="Contact ThinkBiz.Solutions">
              Talk to Our Team
            </Link>
            <Link href="/networking-groups" className="btn-ghost text-white hover:bg-white/10" aria-label="Browse networking chapters">
              Browse Chapters
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
