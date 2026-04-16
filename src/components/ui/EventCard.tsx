import Link from 'next/link'
import type { Event } from '@/types/event'

const CATEGORY_COLORS: Record<string, string> = {
  Workshop: 'bg-primary/10 text-primary',
  Networking: 'bg-secondary/10 text-secondary',
  Seminar: 'bg-purple-100 text-purple-700',
  Social: 'bg-accent/20 text-yellow-800',
  'Special Event': 'bg-green-100 text-green-700',
}

function formatEventTime(startDate: string, endDate: string): string {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${fmt(startDate)} – ${fmt(endDate)}`
}

function formatEventDate(isoString: string): { day: string; month: string; weekday: string } {
  const d = new Date(isoString)
  return {
    day: d.toLocaleDateString('en-US', { day: '2-digit' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const { day, month, weekday } = formatEventDate(event.startDate)
  const categoryColor = CATEGORY_COLORS[event.category] ?? 'bg-gray-100 text-gray-600'
  const isPast = event.status === 'past'

  return (
    <article
      className={`card-base flex gap-0 overflow-hidden transition-all duration-200 hover:shadow-card-hover ${isPast ? 'opacity-70' : ''}`}
      aria-label={`${event.title} — ${weekday}, ${month} ${day}`}
    >
      {/* Date block */}
      <div
        className={`shrink-0 flex flex-col items-center justify-center w-20 text-center border-r ${isPast ? 'bg-gray-50 border-gray-200' : 'bg-primary/5 border-primary/10'}`}
        aria-hidden="true"
      >
        <span className={`text-xs font-bold tracking-widest uppercase ${isPast ? 'text-gray-400' : 'text-primary'}`}>
          {month}
        </span>
        <span className={`text-3xl font-black leading-none ${isPast ? 'text-gray-400' : 'text-secondary'}`}>
          {day}
        </span>
        <span className={`text-xs mt-0.5 ${isPast ? 'text-gray-400' : 'text-gray-500'}`}>{weekday}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`badge text-xs font-bold ${categoryColor}`}>{event.category}</span>
          {isPast && (
            <span className="badge bg-gray-100 text-gray-500 text-xs font-semibold">Past</span>
          )}
          {event.spotsLeft !== undefined && event.spotsLeft <= 15 && !isPast && (
            <span className="badge bg-red-50 text-red-600 text-xs font-semibold">
              {event.spotsLeft} spots left
            </span>
          )}
          {event.cost.isFree && (
            <span className="badge bg-green-50 text-green-700 text-xs font-semibold">Free</span>
          )}
        </div>

        <h3 className="font-bold text-secondary text-base leading-snug mb-1">
          <Link href={`/events/${event.slug}`} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">
            {event.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
          {/* Time */}
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {formatEventTime(event.startDate, event.endDate)}
          </span>
          {/* Location */}
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {event.location.isOnline ? 'Online' : `${event.location.name}, ${event.location.city}`}
          </span>
          {/* Cost */}
          {!event.cost.isFree && (
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              {event.cost.label}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{event.excerpt}</p>

        <Link
          href={`/events/${event.slug}`}
          className="text-primary text-xs font-semibold hover:text-secondary transition-colors"
          aria-label={`View details for ${event.title}`}
        >
          {isPast ? 'View recap →' : 'View details →'}
        </Link>
      </div>
    </article>
  )
}
