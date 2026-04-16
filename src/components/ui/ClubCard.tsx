import Link from 'next/link'
import Image from 'next/image'
import type { Club } from '@/types/club'

interface ClubCardProps {
  club: Club
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

export function ClubCard({ club }: ClubCardProps) {
  const openCount = club.seats.filter((s) => s.status === 'open').length
  const filledCount = club.seats.filter((s) => s.status === 'filled').length
  const fillPercent = Math.round((filledCount / club.seats.length) * 100)

  return (
    <article
      className="card-base group overflow-hidden flex flex-col"
      aria-label={`${club.name} — ${club.area}`}
    >
      {/* Illustration header */}
      <div className="relative h-44 bg-gradient-to-br from-secondary/10 to-primary/10 overflow-hidden flex items-center justify-center">
        <Image
          src={club.featureImage}
          alt={`Illustration representing the ${club.name} networking group`}
          width={200}
          height={160}
          loading="lazy"
          className="h-36 w-auto object-contain opacity-80 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="badge bg-secondary text-white text-xs font-bold">{club.chapter}</span>
        </div>
        {openCount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-accent text-gray-900 text-xs font-bold">
              {openCount} {openCount === 1 ? 'Seat' : 'Seats'} Open
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-secondary font-bold text-xl mb-1 group-hover:text-primary transition-colors">
          <Link href={`/networking-groups/${club.slug}`} className="focus-visible:outline-none">
            {club.name}
          </Link>
        </h2>
        <p className="text-primary text-sm font-semibold mb-3">{club.area}</p>

        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
          {club.shortDescription}
        </p>

        {/* Meta */}
        <dl className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon />
            <dt className="sr-only">Meeting schedule</dt>
            <dd>{club.meetingDay}s at {club.meetingTime} &middot; {club.meetingFrequency}</dd>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LocationIcon />
            <dt className="sr-only">Location</dt>
            <dd>{club.venueName}</dd>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <UsersIcon />
            <dt className="sr-only">Members</dt>
            <dd>{club.memberCount} active {club.memberCount === 1 ? 'member' : 'members'}</dd>
          </div>
        </dl>

        {/* Seat fill bar */}
        <div className="mb-5" aria-label={`${filledCount} of ${club.seats.length} seats filled`}>
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>{filledCount} seats filled</span>
            <span>{openCount} open</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={fillPercent} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/networking-groups/${club.slug}`}
            className="btn-primary flex-1 text-center text-sm py-2.5"
            aria-label={`View ${club.name} details and member directory`}
          >
            View Chapter
          </Link>
          <Link
            href={`/networking-groups/${club.slug}#pre-register`}
            className="btn-outline text-sm py-2.5 px-4"
            aria-label={`Pre-register to visit ${club.name}`}
          >
            Visit
          </Link>
        </div>
      </div>
    </article>
  )
}
