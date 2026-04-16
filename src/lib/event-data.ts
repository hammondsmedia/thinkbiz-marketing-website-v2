import type { Event } from '@/types/event'

// ─── EVENTS ───────────────────────────────────────────────────────────────────
// Sorted oldest → newest. Swap this array for a CMS/API fetch in production.

export const EVENTS: Event[] = [
  // ─── PAST ────────────────────────────────────────────────────────────────
  {
    id: 'event-001',
    slug: 'leadership-workshop-building-referral-culture-mar-2026',
    title: 'Leadership Workshop: Building a Referral Culture',
    excerpt:
      'Learn the systems and habits that turn ordinary chapters into referral powerhouses.',
    description: `Every successful referral chapter has one thing in common: a culture that makes giving referrals feel natural, not forced. This hands-on workshop broke down the specific habits, language, and meeting rituals that separate high-performing chapters from stagnant ones.\n\nFacilitated by Chapter President Garrett Hammonds, attendees walked through the "Referral Trust Ladder" — a framework for deepening relationships over time so that referrals flow both directions without anyone feeling like they owe a favor.\n\nParticipants left with a personalized chapter health checklist and a 30-day action plan to implement before their next chapter audit.`,
    startDate: '2026-03-19T12:00:00',
    endDate: '2026-03-19T14:00:00',
    location: {
      name: 'ThinkBiz HQ',
      address: '3810 N Tulsa Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73112',
      mapUrl: 'https://maps.google.com/?q=3810+N+Tulsa+Ave+Oklahoma+City+OK+73112',
      isOnline: false,
    },
    category: 'Workshop',
    featureImage: '/assets/illustrations/leadership-growth.svg',
    host: 'Garrett Hammonds',
    cost: { isFree: true, label: 'Free for members' },
    tags: ['leadership', 'referrals', 'chapter management'],
    status: 'past',
  },
  {
    id: 'event-002',
    slug: 'q1-business-awards-night-mar-2026',
    title: 'Q1 Business Awards Night',
    excerpt:
      'Celebrating our top referral producers, welcoming new members, and kicking off Q2 with momentum.',
    description: `ThinkBiz chapters closed out Q1 with an evening of recognition, great food, and cross-chapter connections. The awards night honored members who gave the most referrals, generated the most closed business through the network, and welcomed the most new visitors.\n\nOver 80 members and guests gathered at The Beacon Club for dinner, a keynote highlight reel, and live awards across five categories. The event also served as an informal kick-off for the Q2 membership push, with three new chapter seats announced on the spot.\n\nIf you missed this one, save the date — Q3 is already in planning.`,
    startDate: '2026-03-28T17:30:00',
    endDate: '2026-03-28T20:30:00',
    location: {
      name: 'The Beacon Club',
      address: '5800 N Western Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73118',
      mapUrl: 'https://maps.google.com/?q=5800+N+Western+Ave+Oklahoma+City+OK+73118',
      isOnline: false,
    },
    category: 'Social',
    featureImage: '/assets/illustrations/excitement-illustration.svg',
    host: 'ThinkBiz.Solutions',
    cost: { isFree: false, amount: 35, label: '$35/person' },
    tags: ['awards', 'social', 'networking', 'recognition'],
    status: 'past',
    agenda: [
      { time: '5:30 PM', item: 'Doors open & cocktail hour' },
      { time: '6:15 PM', item: 'Welcome & dinner service begins' },
      { time: '7:00 PM', item: 'Q1 referral awards presentation' },
      { time: '7:30 PM', item: 'New member introductions' },
      { time: '8:00 PM', item: 'Open networking until close' },
    ],
  },
  {
    id: 'event-003',
    slug: 'okc-north-chapter-meeting-apr-7-2026',
    title: 'OKC North Weekly Chapter Meeting',
    excerpt:
      'Weekly structured referral meeting of the OKC North chapter. Visitors always welcome — no commitment to attend.',
    description: `The OKC North chapter meets every Tuesday at 7:30 AM for a 90-minute structured referral meeting. The format includes member 60-second commercials, a featured speaker segment, referral passing, and one-to-one scheduling.\n\nVisiting is free and requires no commitment. If you have been curious about how ThinkBiz chapters actually work, attending a live meeting is the best way to see it firsthand. You will leave knowing whether it is a fit for your business — and you will probably leave with at least one new connection either way.\n\nAll visitors are asked to pre-register so we can prepare a seat and ensure your industry category is available.`,
    startDate: '2026-04-07T07:30:00',
    endDate: '2026-04-07T09:00:00',
    location: {
      name: 'Panera Bread – NW OKC',
      address: '5817 NW Expressway',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73132',
      mapUrl: 'https://maps.google.com/?q=5817+NW+Expressway+Oklahoma+City+OK+73132',
      isOnline: false,
    },
    category: 'Networking',
    host: 'OKC North Chapter',
    cost: { isFree: true, label: 'Free to visit' },
    tags: ['chapter meeting', 'networking', 'referrals', 'okc north'],
    status: 'past',
  },
  // ─── UPCOMING ────────────────────────────────────────────────────────────
  {
    id: 'event-004',
    slug: 'okc-north-chapter-meeting-apr-22-2026',
    title: 'OKC North Weekly Chapter Meeting',
    excerpt:
      'Weekly structured referral meeting of the OKC North chapter. Visitors always welcome — no commitment to attend.',
    description: `The OKC North chapter meets every Tuesday at 7:30 AM for a 90-minute structured referral meeting. The format includes member 60-second commercials, a featured speaker segment, referral passing, and one-to-one scheduling.\n\nVisiting is free and requires no commitment. If you have been curious about how ThinkBiz chapters actually work, attending a live meeting is the best way to see it firsthand. You will leave knowing whether it is a fit for your business — and you will probably leave with at least one new connection either way.\n\nAll visitors are asked to pre-register so we can prepare a seat and ensure your industry category is available.`,
    startDate: '2026-04-22T07:30:00',
    endDate: '2026-04-22T09:00:00',
    location: {
      name: 'Panera Bread – NW OKC',
      address: '5817 NW Expressway',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73132',
      mapUrl: 'https://maps.google.com/?q=5817+NW+Expressway+Oklahoma+City+OK+73132',
      isOnline: false,
    },
    category: 'Networking',
    host: 'OKC North Chapter',
    cost: { isFree: true, label: 'Free to visit' },
    tags: ['chapter meeting', 'networking', 'referrals', 'okc north'],
    status: 'upcoming',
  },
  {
    id: 'event-005',
    slug: 'new-member-orientation-apr-28-2026',
    title: 'New Member Orientation',
    excerpt:
      'Everything you need to hit the ground running in your first 30 days as a ThinkBiz member.',
    description: `Starting a new membership is exciting — and a little overwhelming. This 90-minute orientation is designed to fast-track new members past the learning curve so they can start giving and receiving referrals from week one.\n\nWe will cover how the weekly meeting format works, how to write a compelling 60-second commercial, how to identify good referral opportunities for other members, and how to use the ThinkBiz referral tracking tools.\n\nThis event is mandatory for all new members joining in Q2 2026 and strongly recommended for anyone who joined in the last six months and felt like they never fully figured it out. Attendance is free. Light refreshments provided.`,
    startDate: '2026-04-28T18:00:00',
    endDate: '2026-04-28T19:30:00',
    location: {
      name: 'ThinkBiz HQ',
      address: '3810 N Tulsa Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73112',
      mapUrl: 'https://maps.google.com/?q=3810+N+Tulsa+Ave+Oklahoma+City+OK+73112',
      isOnline: false,
    },
    category: 'Workshop',
    featureImage: '/assets/illustrations/follow-the-leader-illustration.svg',
    host: 'ThinkBiz.Solutions',
    cost: { isFree: true, label: 'Free for new members' },
    tags: ['orientation', 'new members', 'onboarding', 'training'],
    status: 'upcoming',
    agenda: [
      { time: '6:00 PM', item: 'Welcome & introductions' },
      { time: '6:15 PM', item: 'How ThinkBiz chapters work' },
      { time: '6:40 PM', item: 'Writing your 60-second commercial' },
      { time: '7:05 PM', item: 'Referral tracking tools demo' },
      { time: '7:20 PM', item: 'Q&A & chapter assignments' },
    ],
  },
  {
    id: 'event-006',
    slug: 'linkedin-lead-generation-seminar-may-2026',
    title: 'Seminar: LinkedIn Lead Generation for Local Businesses',
    excerpt:
      'Practical tactics for turning your LinkedIn profile into a consistent source of warm, local leads.',
    description: `LinkedIn is the most underused tool in most local business owners' marketing stacks. Unlike paid ads or cold outreach, a well-optimized LinkedIn presence generates inbound interest from people who already trust you enough to reach out — if you know what you are doing.\n\nThis two-hour seminar covers profile optimization, content strategy for local professionals, and proven outreach sequences that feel natural rather than spammy. Attendees leave with a done-with-you content calendar template and a list of 10 specific profile changes to make immediately.\n\nSeating is limited to 40 to keep the session interactive. Members of any ThinkBiz chapter receive a 50% discount at checkout. Bring your laptop or tablet — there is a live demo portion.`,
    startDate: '2026-05-07T09:00:00',
    endDate: '2026-05-07T11:00:00',
    location: {
      name: 'Edmond Conference Center',
      address: '1 S Santa Fe Ave',
      city: 'Edmond',
      state: 'OK',
      zip: '73034',
      mapUrl: 'https://maps.google.com/?q=1+S+Santa+Fe+Ave+Edmond+OK+73034',
      isOnline: false,
    },
    category: 'Seminar',
    featureImage: '/assets/illustrations/business-flying.svg',
    host: 'Sarah Martinez',
    cost: {
      isFree: false,
      amount: 25,
      label: '$25/person',
      registrationUrl: '/contact',
    },
    tags: ['linkedin', 'lead generation', 'marketing', 'social media'],
    status: 'upcoming',
    capacity: 40,
    spotsLeft: 18,
    agenda: [
      { time: '9:00 AM', item: 'Arrival & morning networking' },
      { time: '9:15 AM', item: 'Profile optimization deep dive' },
      { time: '9:45 AM', item: 'Content strategy for local professionals' },
      { time: '10:15 AM', item: 'Outreach templates & live demo' },
      { time: '10:45 AM', item: 'Q&A & action planning' },
    ],
  },
  {
    id: 'event-007',
    slug: 'spring-networking-social-may-2026',
    title: 'Spring Networking Social',
    excerpt:
      'An evening of relaxed, relationship-first networking for ThinkBiz members and guests across all chapters.',
    description: `Twice a year, all ThinkBiz chapters come together for a cross-chapter social. This is not a sales event. There are no 60-second commercials, no formal agenda, and no pressure. It is simply a great room full of people who already understand the value of a warm introduction.\n\nThe Spring Social is one of the most anticipated events in the ThinkBiz calendar. Past events have produced multi-year business relationships, unexpected collaborations, and more than a few friendships. A cash bar and light bites will be available throughout the evening.\n\nGuests are welcome. If you have been on the fence about visiting a chapter, this is the lowest-stakes way to experience the ThinkBiz community. Bring a business card and your curiosity.`,
    startDate: '2026-05-15T17:30:00',
    endDate: '2026-05-15T20:00:00',
    location: {
      name: 'Vast – Oklahoma City',
      address: '333 W Sheridan Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73102',
      mapUrl: 'https://maps.google.com/?q=333+W+Sheridan+Ave+Oklahoma+City+OK+73102',
      isOnline: false,
    },
    category: 'Social',
    featureImage: '/assets/illustrations/team-work-illustration.svg',
    host: 'ThinkBiz.Solutions',
    cost: { isFree: false, amount: 20, label: '$20/person', registrationUrl: '/contact' },
    tags: ['social', 'networking', 'all chapters', 'cross-chapter'],
    status: 'upcoming',
    capacity: 120,
    spotsLeft: 64,
  },
  {
    id: 'event-008',
    slug: 'referral-marketing-workshop-may-2026',
    title: 'Referral Marketing Workshop: Build Your 7-Figure Referral System',
    excerpt:
      'A hands-on workshop where you leave with a documented referral strategy built specifically for your business.',
    description: `Most business owners know referrals are their best source of new clients — but they leave it completely to chance. This workshop changes that. In two and a half hours, you will map your existing referral network, identify the gaps, and build a repeatable system for generating referrals every single week.\n\nThe workshop is structured around three core deliverables: your referral network map, your written referral "ask" scripts for three different scenarios, and a 90-day action calendar with specific weekly tasks. Every attendee leaves with all three completed — not as homework, but done in the room.\n\nLunch is provided. This workshop is limited to 25 people to ensure every participant gets individual attention. It sells out every time we offer it, so register early.`,
    startDate: '2026-05-21T12:00:00',
    endDate: '2026-05-21T14:30:00',
    location: {
      name: 'ThinkBiz HQ',
      address: '3810 N Tulsa Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73112',
      mapUrl: 'https://maps.google.com/?q=3810+N+Tulsa+Ave+Oklahoma+City+OK+73112',
      isOnline: false,
    },
    category: 'Workshop',
    featureImage: '/assets/illustrations/follow-the-leader-illustration.svg',
    host: 'Garrett Hammonds',
    cost: { isFree: false, amount: 35, label: '$35/person', registrationUrl: '/contact' },
    tags: ['referrals', 'workshop', 'strategy', 'business growth'],
    status: 'upcoming',
    capacity: 25,
    spotsLeft: 11,
    agenda: [
      { time: '12:00 PM', item: 'Lunch provided & introductions' },
      { time: '12:20 PM', item: 'The anatomy of a great referral' },
      { time: '12:50 PM', item: 'Mapping your referral network' },
      { time: '1:20 PM', item: 'Writing your referral ask scripts' },
      { time: '1:50 PM', item: 'Building your 90-day action plan' },
      { time: '2:20 PM', item: 'Share-out & accountability partners' },
    ],
  },
  {
    id: 'event-009',
    slug: 'thinkbiz-summit-2026',
    title: 'ThinkBiz Summit 2026',
    excerpt:
      "Our biggest event of the year — a full-day summit for Oklahoma City's most connected business professionals.",
    description: `The ThinkBiz Summit is where the entire network comes together for a day of big ideas, cross-chapter introductions, and tangible business results. Now in its fourth year, the Summit draws 200+ professionals from across the Oklahoma City metro for keynotes, workshops, panel discussions, and structured networking.\n\nThis year's theme is "The Referral Economy" — exploring how the most durable businesses in any market are built on trusted relationships rather than advertising spend. Keynote speakers and panelists will be announced in the weeks leading up to the event.\n\nGeneral admission covers the full day including breakfast, lunch, all breakout sessions, and the evening awards reception. VIP tickets include a private morning session with keynote speakers, premium seating, and dedicated networking time. Register early — the Summit has sold out the last two years.`,
    startDate: '2026-06-06T08:00:00',
    endDate: '2026-06-06T17:00:00',
    location: {
      name: 'Oklahoma City Convention Center',
      address: '100 Mick Cornett Dr',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73109',
      mapUrl: 'https://maps.google.com/?q=100+Mick+Cornett+Dr+Oklahoma+City+OK+73109',
      isOnline: false,
    },
    category: 'Special Event',
    featureImage: '/assets/illustrations/leadership-growth.svg',
    host: 'ThinkBiz.Solutions',
    cost: {
      isFree: false,
      amount: 75,
      label: '$75/person',
      registrationUrl: '/contact',
    },
    tags: ['summit', 'annual event', 'keynote', 'all chapters', 'awards'],
    status: 'upcoming',
    capacity: 300,
    spotsLeft: 127,
    agenda: [
      { time: '8:00 AM', item: 'Registration & morning networking' },
      { time: '9:00 AM', item: 'Opening keynote: The Referral Economy' },
      { time: '10:00 AM', item: 'Breakout sessions — 3 tracks' },
      { time: '12:00 PM', item: 'Lunch & cross-chapter networking' },
      { time: '1:00 PM', item: 'Panel: Oklahoma City success stories' },
      { time: '2:30 PM', item: 'Workshop rotations' },
      { time: '4:00 PM', item: 'Annual awards ceremony' },
      { time: '5:00 PM', item: 'Closing remarks' },
    ],
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}

export function getUpcomingEvents() {
  return EVENTS.filter((e) => e.status === 'upcoming')
}

export function getPastEvents() {
  return EVENTS.filter((e) => e.status === 'past')
}

export function getEventsByCategory(category: string) {
  return EVENTS.filter((e) => e.category === category)
}

/** Returns events whose startDate falls in the given YYYY-MM month string */
export function getEventsByMonth(yearMonth: string) {
  return EVENTS.filter((e) => e.startDate.startsWith(yearMonth))
}

/** Returns the date portion of an ISO string: "2026-04-22T07:30:00" → "2026-04-22" */
export function eventDateStr(isoString: string) {
  return isoString.split('T')[0]
}

export function getRelatedEvents(event: { slug: string; category: string }, limit = 3) {
  return EVENTS.filter(
    (e) => e.slug !== event.slug && (e.category === event.category || e.status === 'upcoming')
  ).slice(0, limit)
}
