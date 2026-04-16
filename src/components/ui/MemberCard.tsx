import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { ClubMember } from '@/types/club'

interface MemberCardProps {
  member: ClubMember
  showClub?: boolean
  compact?: boolean
}

const RoleBadgeColors: Record<string, string> = {
  'President': 'bg-secondary text-white',
  'Vice President': 'bg-primary text-white',
  'Secretary': 'bg-primary/10 text-primary',
  'Member': 'bg-gray-100 text-gray-600',
}

export function MemberCard({ member, compact = false }: MemberCardProps) {
  if (compact) {
    return (
      <Link
        href={`/club-members/${member.slug}`}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`View profile: ${member.name}, ${member.industry}`}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 shrink-0 ring-2 ring-primary/20">
          <Image
            src={member.avatar}
            alt={`${member.name} — ${member.businessName}`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-secondary text-sm truncate group-hover:text-primary transition-colors">
            {member.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{member.businessName}</p>
        </div>
      </Link>
    )
  }

  return (
    <article
      className="card-base group overflow-hidden flex flex-col"
      aria-label={`${member.name}, ${member.industry} at ${member.businessName}`}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Avatar + role */}
        <div className="flex items-start gap-4 mb-4">
          <Link
            href={`/club-members/${member.slug}`}
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-full"
            aria-label={`View ${member.name}'s profile`}
            tabIndex={-1}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 ring-3 ring-primary/20 group-hover:ring-primary/40 transition-all">
              <Image
                src={member.avatar}
                alt={`${member.name} — ${member.businessName}`}
                width={64}
                height={64}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className={`badge text-xs font-bold ${RoleBadgeColors[member.role] ?? 'bg-gray-100 text-gray-600'}`}>
                {member.role}
              </span>
            </div>
            <h3 className="font-bold text-secondary text-base group-hover:text-primary transition-colors leading-tight">
              <Link href={`/club-members/${member.slug}`} className="focus-visible:outline-none">
                {member.name}
              </Link>
            </h3>
            <p className="text-xs text-gray-500 truncate">{member.businessName}</p>
          </div>
        </div>

        {/* Industry badge */}
        <span className="badge-primary text-xs font-semibold mb-3 self-start">
          {member.industry}
        </span>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {member.shortBio}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-xs text-gray-400">
            Member since {new Date(member.memberSince).getFullYear()}
          </span>
          <div className="flex gap-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={`${member.name} on LinkedIn (opens in new tab)`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            <Link
              href={`/club-members/${member.slug}`}
              className="btn-ghost text-xs py-1 px-3"
              aria-label={`View full profile for ${member.name}`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
