import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { EVENTS, getEventBySlug, getRelatedEvents } from '@/lib/event-data'
import { SITE_CONFIG } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'
import { BreadcrumbSchema, EventSchema } from '@/components/ui/SchemaMarkup'
import { AddToCalendarButtons } from '@/components/ui/AddToCalendarButtons'
import { EventCard } from '@/components/ui/EventCard'

interface EventPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug)
  if (!event) return {}

  const locationLabel = event.location.isOnline
    ? 'Online'
    : `${event.location.name} in ${event.location.city}, ${event.location.state}`

  return buildMetadata({
    title: `${event.title} | Events`,
    description: `${event.excerpt} ${event.cost.label}. ${locationLabel}.`,
    ogTitle: `${event.title} — ThinkBiz.Solutions`,
    ogDescription: event.excerpt,
    canonical: `/events/${event.slug}`,
  })
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const CATEGORY_COLORS: Record<string, string> = {
  Workshop: 'bg-primary/10 text-primary',
  Networking: 'bg-secondary/10 text-secondary',
  Seminar: 'bg-purple-100 text-purple-700',
  Social: 'bg-accent/20 text-yellow-800',
  'Special Event': 'bg-green-100 text-green-700',
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  const relatedEvents = getRelatedEvents(event, 3)
  const isPast = event.status === 'past'
  const categoryColor = CATEGORY_COLORS[event.category] ?? 'bg-gray-100 text-gray-600'

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Events', url: `${SITE_CONFIG.url}/events` },
    { name: event.title, url: `${SITE_CONFIG.url}/events/${event.slug}` },
  ]

  const paragraphs = event.description.split('\n\n').filter(Boolean)

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <EventSchema event={event} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className={`py-16 lg:py-20 relative overflow-hidden ${isPast ? 'bg-gray-700' : 'bg-gradient-to-br from-secondary to-primary/80'} text-white`}
        aria-labelledby="event-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium truncate max-w-xs" aria-current="page">{event.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`badge font-bold text-xs ${categoryColor}`}>{event.category}</span>
              {isPast && (
                <span className="badge bg-white/15 text-white text-xs font-semibold">Past Event</span>
              )}
              {event.spotsLeft !== undefined && event.spotsLeft <= 15 && !isPast && (
                <span className="badge bg-red-400/30 text-white text-xs font-bold">
                  Only {event.spotsLeft} spots left
                </span>
              )}
            </div>

            <h1
              id="event-hero-heading"
              className="text-white text-3xl lg:text-4xl font-black leading-tight mb-5"
            >
              {event.title}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">{event.excerpt}</p>

            {/* Quick-glance details */}
            <dl className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  label: 'Date',
                  value: formatDate(event.startDate),
                },
                {
                  label: 'Time',
                  value: `${formatTime(event.startDate)} – ${formatTime(event.endDate)}`,
                },
                {
                  label: 'Location',
                  value: event.location.isOnline ? 'Online' : `${event.location.name}, ${event.location.city}`,
                },
                {
                  label: 'Cost',
                  value: event.cost.label,
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 rounded-lg px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-0.5">{label}</dt>
                  <dd className="text-white font-semibold text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="container-site py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* ── LEFT: description, agenda ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Feature image */}
            {event.featureImage && (
              <div className="rounded-2xl overflow-hidden bg-primary/5 border border-gray-100 flex items-center justify-center p-8">
                <Image
                  src={event.featureImage}
                  alt={`Illustration for ${event.title}`}
                  width={480}
                  height={300}
                  className="w-full max-w-sm h-auto"
                  priority
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-secondary text-xl font-bold mb-5">About This Event</h2>
              <div className="prose-brand space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div>
                <h2 className="text-secondary text-xl font-bold mb-5">Event Agenda</h2>
                <ol className="space-y-3" aria-label="Event agenda">
                  {event.agenda.map(({ time, item }, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="shrink-0 w-24 text-sm font-bold text-primary pt-0.5">{time}</span>
                      <div className="flex-1">
                        <div className="h-px bg-gray-100 mt-3 mb-0" aria-hidden="true" />
                        <p className="text-gray-700 text-sm pt-2">{item}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {event.tags.map((tag) => (
                  <span key={tag} className="badge bg-gray-100 text-gray-500 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: sidebar ── */}
          <aside className="space-y-5 lg:sticky lg:top-24" aria-label="Event details sidebar">

            {/* Add to Calendar */}
            {!isPast && (
              <div className="card-base p-6">
                <h3 className="text-secondary font-bold text-base mb-4">Add to Your Calendar</h3>
                <AddToCalendarButtons event={event} layout="grid" />
              </div>
            )}

            {/* Registration CTA */}
            {!isPast && event.cost.registrationUrl && (
              <div className="bg-gradient-to-br from-secondary to-primary/80 rounded-xl p-6 text-white">
                <p className="font-bold text-lg mb-1">{event.cost.label}</p>
                {event.capacity && event.spotsLeft !== undefined && (
                  <p className="text-blue-100 text-sm mb-4">
                    {event.spotsLeft} of {event.capacity} spots remaining
                  </p>
                )}
                <Link
                  href={event.cost.registrationUrl}
                  className="btn-accent w-full text-center block"
                  aria-label={`Register for ${event.title}`}
                >
                  Register Now
                </Link>
              </div>
            )}

            {/* Free event CTA */}
            {!isPast && event.cost.isFree && (
              <div className="card-base p-6 bg-green-50 border-green-200">
                <p className="font-bold text-green-800 text-base mb-1">This event is free</p>
                <p className="text-green-700 text-sm mb-4">
                  No cost to attend. Pre-registration is appreciated so we can plan accordingly.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center block text-sm"
                  aria-label={`RSVP for ${event.title}`}
                >
                  RSVP / Let Us Know
                </Link>
              </div>
            )}

            {/* Location */}
            <div className="card-base p-6">
              <h3 className="text-secondary font-bold text-base mb-4">
                {event.location.isOnline ? 'Online Event' : 'Location'}
              </h3>
              {event.location.isOnline ? (
                <p className="text-gray-600 text-sm">
                  Joining details will be sent after you register.
                </p>
              ) : (
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p className="font-semibold text-secondary">{event.location.name}</p>
                  <p>{event.location.address}</p>
                  <p>{event.location.city}, {event.location.state}{event.location.zip ? ` ${event.location.zip}` : ''}</p>
                </div>
              )}
              {event.location.mapUrl && !event.location.isOnline && (
                <a
                  href={event.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-secondary transition-colors"
                  aria-label="Get directions (opens Google Maps in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Get Directions
                </a>
              )}
            </div>

            {/* Event details */}
            <div className="card-base p-6">
              <h3 className="text-secondary font-bold text-base mb-4">Event Details</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Hosted by</dt>
                  <dd className="text-gray-700 font-medium">{event.host}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Category</dt>
                  <dd><span className={`badge text-xs font-bold ${categoryColor}`}>{event.category}</span></dd>
                </div>
                {event.capacity && (
                  <div>
                    <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Capacity</dt>
                    <dd className="text-gray-700">
                      {event.spotsLeft !== undefined
                        ? `${event.spotsLeft} of ${event.capacity} spots available`
                        : `${event.capacity} total spots`}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── RELATED EVENTS ───────────────────────────────────────────────────── */}
      {relatedEvents.length > 0 && (
        <section className="bg-slate-50 border-t border-gray-100 py-12" aria-labelledby="related-events-heading">
          <div className="container-site">
            <h2 id="related-events-heading" className="text-secondary text-xl font-bold mb-6">
              More Events
            </h2>
            <div className="space-y-4 max-w-2xl">
              {relatedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NAV FOOTER ───────────────────────────────────────────────────────── */}
      <nav className="bg-white border-t border-gray-100 py-8" aria-label="Related pages">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/events" className="btn-outline text-sm py-2" aria-label="See all events">
              ← All Events
            </Link>
            <Link href="/networking-groups" className="btn-ghost text-sm" aria-label="Browse networking chapters">
              Networking Groups
            </Link>
            <Link href="/contact" className="btn-ghost text-sm" aria-label="Contact ThinkBiz.Solutions">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
