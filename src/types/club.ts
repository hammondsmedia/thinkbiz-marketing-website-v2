export interface ClubMember {
  id: string
  name: string
  slug: string
  businessName: string
  industry: string            // e.g. "Accounting / CPA"
  industrySlug: string        // e.g. "accounting-cpa"
  role: 'President' | 'Vice President' | 'Secretary' | 'Member'
  bio: string
  shortBio: string
  avatar: string              // path to image
  linkedin?: string
  website?: string
  phone?: string
  memberSince: string         // ISO date string
  clubSlugs: string[]         // which clubs they belong to
  testimonial?: string        // quote from this member
  specialties: string[]
}

export interface IndustrySeat {
  industry: string            // human-readable category name
  industrySlug: string
  status: 'open' | 'filled'
  memberId?: string           // populated when status === 'filled'
}

export interface Club {
  id: string
  name: string
  slug: string
  chapter: string             // e.g. "Chapter 1 — OKC North"
  city: string
  area: string                // e.g. "North Oklahoma City"
  address: string
  venueName: string
  meetingDay: string          // e.g. "Tuesday"
  meetingTime: string         // e.g. "7:30 AM"
  meetingFrequency: string    // e.g. "Weekly"
  description: string
  shortDescription: string
  featureImage: string
  mapUrl: string              // Google Maps link
  established: string         // ISO year
  memberCount: number
  openSeats: number
  seats: IndustrySeat[]
  memberIds: string[]
  presidentId?: string
}
