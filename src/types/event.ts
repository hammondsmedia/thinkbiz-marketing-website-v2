export type EventStatus = 'upcoming' | 'past' | 'cancelled'
export type EventCategory = 'Workshop' | 'Networking' | 'Seminar' | 'Social' | 'Special Event'

export interface EventLocation {
  name: string
  address: string
  city: string
  state: string
  zip?: string
  mapUrl?: string
  isOnline: boolean
}

export interface EventCost {
  isFree: boolean
  amount?: number
  label: string
  registrationUrl?: string
}

export interface AgendaItem {
  time: string
  item: string
}

export interface Event {
  id: string
  slug: string
  title: string
  excerpt: string
  /** Plain text. Paragraphs separated by \n\n. */
  description: string
  startDate: string  // ISO 8601 local, e.g. "2026-04-22T07:30:00"
  endDate: string    // ISO 8601 local
  location: EventLocation
  category: EventCategory
  featureImage?: string
  host: string
  cost: EventCost
  tags: string[]
  status: EventStatus
  capacity?: number
  spotsLeft?: number
  agenda?: AgendaItem[]
}
