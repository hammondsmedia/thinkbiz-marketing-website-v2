import Link from 'next/link'
import Image from 'next/image'
import type { Club, IndustrySeat } from '@/types/club'
import { getMemberById } from '@/lib/club-data'

interface SeatDirectoryProps {
  club: Club
}

function FilledSeat({ seat }: { seat: IndustrySeat }) {
  const member = seat.memberId ? getMemberById(seat.memberId) : undefined
  if (!member) return null

  return (
    <div className="relative bg-white rounded-xl border border-gray-100 p-4 shadow-card hover:shadow-card-hover transition-all duration-200 group">
      {/* Status indicator */}
      <div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-white"
        aria-hidden="true"
        title="Seat filled"
      />

      <div className="flex items-start gap-3">
        <Link
          href={`/club-members/${member.slug}`}
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-full"
          aria-label={`View ${member.name}'s profile`}
          tabIndex={-1}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
            <Image
              src={member.avatar}
              alt={`${member.name} — ${member.businessName}`}
              width={48}
              height={48}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-wide mb-0.5 truncate">
            {seat.industry}
          </p>
          <Link
            href={`/club-members/${member.slug}`}
            className="font-semibold text-secondary text-sm hover:text-primary transition-colors leading-tight block"
          >
            {member.name}
          </Link>
          <p className="text-xs text-gray-400 truncate">{member.businessName}</p>
        </div>
      </div>
    </div>
  )
}

function OpenSeat({ seat, clubSlug }: { seat: IndustrySeat; clubSlug: string }) {
  return (
    <div
      className="relative bg-slate-50 rounded-xl border-2 border-dashed border-gray-200 p-4 hover:border-primary/40 hover:bg-primary/3 transition-all duration-200 group"
      aria-label={`Open seat: ${seat.industry}`}
    >
      {/* Status indicator */}
      <div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white"
        aria-hidden="true"
        title="Seat available"
      />

      <div className="flex items-start gap-3">
        {/* Placeholder avatar */}
        <div
          className="shrink-0 w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5 truncate">
            {seat.industry}
          </p>
          <p className="font-semibold text-gray-400 text-sm">Seat Available</p>
          <Link
            href={`/networking-groups/${clubSlug}#pre-register`}
            className="text-xs text-primary font-semibold hover:text-secondary transition-colors"
            aria-label={`Apply for the ${seat.industry} seat`}
          >
            Apply for this seat →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function SeatDirectory({ club }: SeatDirectoryProps) {
  const filledSeats = club.seats.filter((s) => s.status === 'filled')
  const openSeats = club.seats.filter((s) => s.status === 'open')

  return (
    <section aria-labelledby="directory-heading">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 id="directory-heading" className="text-secondary text-2xl font-bold">
          Member Directory
        </h2>
        <div className="flex items-center gap-3 ml-auto">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" aria-hidden="true" />
            {filledSeats.length} filled
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" aria-hidden="true" />
            {openSeats.length} open
          </span>
        </div>
      </div>

      {/* Legend */}
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        ThinkBiz chapters hold <strong>one seat per professional category</strong>. When a seat is filled,
        that member is the exclusive representative of their industry in this chapter. Open seats are
        available for qualified professionals to claim.
      </p>

      {/* Grid */}
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        role="list"
        aria-label={`${club.name} industry seats`}
      >
        {/* Filled seats first */}
        {club.seats.map((seat) =>
          seat.status === 'filled' ? (
            <div key={seat.industrySlug} role="listitem">
              <FilledSeat seat={seat} />
            </div>
          ) : (
            <div key={seat.industrySlug} role="listitem">
              <OpenSeat seat={seat} clubSlug={club.slug} />
            </div>
          )
        )}
      </div>

      {openSeats.length > 0 && (
        <p className="mt-5 text-sm text-gray-500 text-center">
          Interested in an open seat?{' '}
          <Link href={`/networking-groups/${club.slug}#pre-register`} className="text-primary font-semibold hover:text-secondary transition-colors">
            Pre-register to visit this chapter
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="text-primary font-semibold hover:text-secondary transition-colors">
            contact us directly
          </Link>.
        </p>
      )}
    </section>
  )
}
