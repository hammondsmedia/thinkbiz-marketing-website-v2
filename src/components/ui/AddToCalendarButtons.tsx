'use client'

import type { Event } from '@/types/event'
import { SITE_CONFIG } from '@/lib/constants'

// Format: "2026-04-22T07:30:00" → "20260422T073000"
function toCalDate(iso: string) {
  return iso.replace(/[-:]/g, '').replace('T', 'T')
}

function locationStr(event: Event) {
  if (event.location.isOnline) return 'Online'
  return `${event.location.name}, ${event.location.address}, ${event.location.city}, ${event.location.state}`
}

function buildGoogleUrl(event: Event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toCalDate(event.startDate)}/${toCalDate(event.endDate)}`,
    details: event.excerpt,
    location: locationStr(event),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function buildOutlookUrl(event: Event) {
  const params = new URLSearchParams({
    subject: event.title,
    startdt: event.startDate,
    enddt: event.endDate,
    body: event.excerpt,
    location: locationStr(event),
    path: '/calendar/action/compose',
    rru: 'addevent',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function buildICSContent(event: Event) {
  const loc = locationStr(event).replace(/,/g, '\\,')
  const now = toCalDate(new Date().toISOString().split('.')[0])
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${SITE_CONFIG.name}//Events//EN`,
    'BEGIN:VEVENT',
    `UID:${event.slug}@thinkbiz.solutions`,
    `DTSTAMP:${now}`,
    `DTSTART:${toCalDate(event.startDate)}`,
    `DTEND:${toCalDate(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.excerpt}`,
    `LOCATION:${loc}`,
    `URL:${SITE_CONFIG.url}/events/${event.slug}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

function downloadICS(event: Event) {
  const content = buildICSContent(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.slug}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface AddToCalendarButtonsProps {
  event: Event
  /** 'row' renders buttons side-by-side; 'grid' uses a 2×2 grid */
  layout?: 'row' | 'grid'
}

export function AddToCalendarButtons({ event, layout = 'grid' }: AddToCalendarButtonsProps) {
  const containerCls =
    layout === 'grid'
      ? 'grid grid-cols-2 gap-2'
      : 'flex flex-wrap gap-2'

  const btnCls =
    'flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary'

  return (
    <div className={containerCls} role="group" aria-label="Add to calendar options">
      {/* Google Calendar */}
      <a
        href={buildGoogleUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={btnCls}
        aria-label="Add to Google Calendar (opens in new tab)"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 7.5h-2.25v-.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75v.75h-3.75v-.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75v.75H7.438A.937.937 0 006.5 8.438v8.124c0 .517.42.938.938.938h9.124c.517 0 .938-.42.938-.938V8.438A.937.937 0 0017.562 7.5zM12 15a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
        Google Calendar
      </a>

      {/* Apple / iCal download */}
      <button
        type="button"
        onClick={() => downloadICS(event)}
        className={btnCls}
        aria-label="Download .ics file for Apple Calendar"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        Apple Calendar
      </button>

      {/* Outlook */}
      <a
        href={buildOutlookUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={btnCls}
        aria-label="Add to Outlook Calendar (opens in new tab)"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M7.462 0L0 1.5v21l7.462 1.5V0zM8.538 2.615V12H24V2.615H8.538zM8.538 13.385V24H24V13.385H8.538z" />
        </svg>
        Outlook
      </a>

      {/* Download .ics */}
      <button
        type="button"
        onClick={() => downloadICS(event)}
        className={btnCls}
        aria-label="Download .ics calendar file"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download .ics
      </button>
    </div>
  )
}
