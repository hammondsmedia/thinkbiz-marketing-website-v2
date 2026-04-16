'use client'

import { useState, useRef } from 'react'
import type { Event } from '@/types/event'
import { EventCard } from '@/components/ui/EventCard'
import { EventCalendar } from '@/components/ui/EventCalendar'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function groupByDate(events: Event[]): Map<string, Event[]> {
  const map = new Map<string, Event[]>()
  for (const event of events) {
    const key = event.startDate.split('T')[0]
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(event)
  }
  return map
}

function formatGroupHeading(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface EventsViewProps {
  events: Event[]
}

export function EventsView({ events }: EventsViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showPast, setShowPast] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const handleSelectDate = (date: string | null) => {
    setSelectedDate(date)
    if (date) {
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  // Determine which events to show
  let filteredEvents: Event[]
  if (selectedDate) {
    filteredEvents = events.filter((e) => e.startDate.startsWith(selectedDate))
  } else if (showPast) {
    filteredEvents = [...events].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  } else {
    filteredEvents = events.filter((e) => e.status === 'upcoming')
  }

  const upcomingCount = events.filter((e) => e.status === 'upcoming').length
  const pastCount = events.filter((e) => e.status === 'past').length

  const grouped = groupByDate(filteredEvents)
  const sortedDateKeys = Array.from(grouped.keys()).sort((a, b) => {
    const dir = showPast && !selectedDate ? -1 : 1
    return dir * (new Date(a).getTime() - new Date(b).getTime())
  })

  const listLabel = selectedDate
    ? `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} on ${formatGroupHeading(selectedDate)}`
    : showPast
    ? `All ${events.length} events`
    : `${upcomingCount} upcoming event${upcomingCount !== 1 ? 's' : ''}`

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <EventCalendar
        events={events}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      {/* Events list */}
      <div ref={listRef} id="events-list" className="scroll-mt-24">
        {/* List header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-secondary font-bold text-xl">{listLabel}</h2>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm text-primary hover:text-secondary transition-colors mt-0.5"
              >
                ← Show all upcoming events
              </button>
            )}
          </div>

          {!selectedDate && pastCount > 0 && (
            <button
              onClick={() => setShowPast((p) => !p)}
              className="btn-outline text-sm py-2"
              aria-pressed={showPast}
            >
              {showPast ? 'Hide past events' : `Show past events (${pastCount})`}
            </button>
          )}
        </div>

        {/* Event groups */}
        {sortedDateKeys.length === 0 ? (
          <div className="rounded-xl bg-slate-50 border border-gray-100 p-10 text-center">
            <p className="text-gray-400 font-semibold">No events found.</p>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="btn-primary text-sm py-2 mt-4"
              >
                View all upcoming events
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDateKeys.map((dateStr) => (
              <div key={dateStr}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                  <time
                    dateTime={dateStr}
                    className="text-xs font-bold uppercase tracking-widest text-gray-400 shrink-0"
                  >
                    {formatGroupHeading(dateStr)}
                  </time>
                  <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  {grouped.get(dateStr)!.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
