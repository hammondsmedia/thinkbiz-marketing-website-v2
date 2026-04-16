import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CLUB_MEMBERS, getMemberBySlug, getMemberClubs } from '@/lib/club-data'
import { SITE_CONFIG } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'
import { BreadcrumbSchema } from '@/components/ui/SchemaMarkup'
import { formatDate } from '@/lib/utils'

interface MemberPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CLUB_MEMBERS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const member = getMemberBySlug(params.slug)
  if (!member) return {}

  return buildMetadata({
    title: `${member.name} — ${member.industry}`,
    description: member.shortBio,
    ogTitle: `${member.name} | ${member.businessName} — ThinkBiz.Solutions Member`,
    ogDescription: `${member.name} is the ${member.industry} representative in their ThinkBiz.Solutions chapter. ${member.shortBio}`,
    canonical: `/club-members/${member.slug}`,
  })
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const RoleBadgeColors: Record<string, string> = {
  'President': 'bg-secondary text-white',
  'Vice President': 'bg-primary text-white',
  'Secretary': 'bg-primary/15 text-primary',
  'Member': 'bg-gray-100 text-gray-600',
}

export default function MemberProfilePage({ params }: MemberPageProps) {
  const member = getMemberBySlug(params.slug)
  if (!member) notFound()

  const clubs = getMemberClubs(member)
  const memberUrl = `${SITE_CONFIG.url}/club-members/${member.slug}`

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Networking Groups', url: `${SITE_CONFIG.url}/networking-groups` },
    { name: member.name, url: memberUrl },
  ]

  // Person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.industry,
    worksFor: {
      '@type': 'Organization',
      name: member.businessName,
      url: member.website,
    },
    description: member.shortBio,
    url: memberUrl,
    sameAs: [member.linkedin].filter(Boolean),
    memberOf: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-16 lg:py-20 relative overflow-hidden"
        aria-labelledby="member-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-16 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li><Link href="/networking-groups" className="hover:text-white transition-colors">Networking Groups</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">{member.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row gap-7 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden bg-white/10 ring-4 ring-accent/40 shadow-2xl">
                <Image
                  src={member.avatar}
                  alt={`${member.name}, ${member.industry} at ${member.businessName}`}
                  width={144}
                  height={144}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge text-xs font-bold ${RoleBadgeColors[member.role] ?? 'bg-gray-100 text-gray-600'}`}>
                  {member.role}
                </span>
                <span className="badge bg-accent/20 text-yellow-900 text-xs font-bold">
                  {member.industry}
                </span>
              </div>
              <h1
                id="member-hero-heading"
                className="text-white text-3xl lg:text-4xl font-black leading-tight mb-1"
              >
                {member.name}
              </h1>
              <p className="text-blue-100 font-semibold text-lg mb-1">{member.businessName}</p>
              <p className="text-blue-200 text-sm mb-5">
                Member since {new Date(member.memberSince).getFullYear()}
                {clubs.length > 0 && (
                  <> &middot; {clubs.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/networking-groups/${c.slug}`}
                      className="hover:text-white transition-colors"
                      aria-label={`View ${c.name}`}
                    >
                      {c.name}
                    </Link>
                  ))}</>
                )}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent flex items-center gap-2 text-sm"
                    aria-label={`Connect with ${member.name} on LinkedIn (opens in new tab)`}
                  >
                    <LinkedInIcon />
                    Connect on LinkedIn
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-white hover:bg-white/10 text-sm"
                    aria-label={`Visit ${member.businessName} website (opens in new tab)`}
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BODY ─────────────────────────────────────────────────────────────── */}
      <div className="bg-white py-12 lg:py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">

            {/* Main column */}
            <div className="space-y-10">

              {/* About */}
              <section aria-labelledby="bio-heading">
                <h2 id="bio-heading" className="text-secondary text-xl font-bold mb-4">
                  About {member.name}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {member.bio.split('\n').filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              {/* Specialties */}
              <section aria-labelledby="specialties-heading">
                <h2 id="specialties-heading" className="text-secondary text-xl font-bold mb-4">
                  Specialties
                </h2>
                <ul className="flex flex-wrap gap-2" role="list" aria-label={`${member.name}'s professional specialties`}>
                  {member.specialties.map((s) => (
                    <li key={s}>
                      <span className="badge-primary text-sm font-semibold">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Testimonial */}
              {member.testimonial && (
                <section aria-labelledby="testimonial-heading">
                  <h2 id="testimonial-heading" className="sr-only">Member Testimonial</h2>
                  <blockquote className="relative border-l-4 border-accent pl-6 py-2">
                    <p className="text-lg text-gray-700 italic leading-relaxed mb-3">
                      "{member.testimonial}"
                    </p>
                    <footer className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <cite className="not-italic text-sm font-semibold text-secondary">
                        {member.name}, {member.businessName}
                      </cite>
                    </footer>
                  </blockquote>
                </section>
              )}

              {/* Chapter memberships */}
              {clubs.length > 0 && (
                <section aria-labelledby="chapters-heading">
                  <h2 id="chapters-heading" className="text-secondary text-xl font-bold mb-4">
                    Chapter{clubs.length > 1 ? 's' : ''}
                  </h2>
                  <div className="space-y-3">
                    {clubs.map((club) => {
                      const openCount = club.seats.filter((s) => s.status === 'open').length
                      return (
                        <Link
                          key={club.slug}
                          href={`/networking-groups/${club.slug}`}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/3 transition-all group"
                          aria-label={`View ${club.name} — ${club.area}`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-primary">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{club.name}</p>
                            <p className="text-xs text-gray-400">{club.area} &middot; {club.meetingDay}s at {club.meetingTime}</p>
                          </div>
                          {openCount > 0 && (
                            <span className="badge bg-accent text-gray-900 text-xs font-bold shrink-0">
                              {openCount} open
                            </span>
                          )}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Member contact and details" className="space-y-5">

              {/* Contact card */}
              <div className="card-base p-5">
                <h2 className="text-secondary font-bold text-sm uppercase tracking-wider mb-4">
                  Contact & Links
                </h2>
                <div className="space-y-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                      aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-700" aria-hidden="true">
                        <LinkedInIcon />
                      </span>
                      LinkedIn Profile
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                      aria-label={`${member.businessName} website (opens in new tab)`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-gray-500" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      </span>
                      {member.businessName}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                      aria-label={`Call ${member.name} at ${member.phone}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-gray-500" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </span>
                      {member.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Membership details */}
              <div className="card-base p-5">
                <h2 className="text-secondary font-bold text-sm uppercase tracking-wider mb-4">
                  Membership Details
                </h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Industry Seat</dt>
                    <dd className="font-semibold text-secondary">{member.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Chapter Role</dt>
                    <dd>
                      <span className={`badge text-xs font-bold ${RoleBadgeColors[member.role] ?? 'bg-gray-100 text-gray-600'}`}>
                        {member.role}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Member Since</dt>
                    <dd className="font-semibold text-secondary">{formatDate(member.memberSince)}</dd>
                  </div>
                </dl>
              </div>

              {/* Interested in working with this member? */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
                <h2 className="text-secondary font-bold text-sm mb-2">Want a Referral to {member.name.split(' ')[0]}?</h2>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  The best way to connect with a ThinkBiz member is through a referral from
                  someone who already knows them. Visit a chapter meeting to get introduced.
                </p>
                {clubs[0] && (
                  <Link
                    href={`/networking-groups/${clubs[0].slug}#pre-register`}
                    className="btn-primary w-full text-center text-sm py-2.5"
                    aria-label={`Pre-register to visit ${clubs[0].name}`}
                  >
                    Visit {clubs[0].name}
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ─── NAV FOOTER ───────────────────────────────────────────────────────── */}
      <nav className="bg-slate-50 border-t border-gray-100 py-8" aria-label="Related pages">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/networking-groups" className="btn-outline text-sm py-2">← All Chapters</Link>
            <Link href="/about" className="btn-ghost text-sm">About ThinkBiz</Link>
            <Link href="/blog" className="btn-ghost text-sm">Networking Blog</Link>
            <Link href="/contact" className="btn-ghost text-sm">Contact Us</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
