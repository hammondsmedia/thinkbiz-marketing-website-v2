import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CLUBS, getClubBySlug, getClubMembers, getMemberById } from '@/lib/club-data'
import { SITE_CONFIG } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'
import { BreadcrumbSchema, LocalBusinessSchema } from '@/components/ui/SchemaMarkup'
import { SeatDirectory } from '@/components/ui/SeatDirectory'
import { MemberCard } from '@/components/ui/MemberCard'
import { PreRegisterForm } from '@/components/ui/PreRegisterForm'

interface ClubPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CLUBS.map((club) => ({ slug: club.slug }))
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const club = getClubBySlug(params.slug)
  if (!club) return {}

  return buildMetadata({
    title: `${club.name} | Networking Groups`,
    description: `${club.shortDescription} Meets every ${club.meetingDay} at ${club.meetingTime} at ${club.venueName} in ${club.area}.`,
    ogTitle: `${club.name} — ThinkBiz.Solutions`,
    ogDescription: `${club.openSeats} industry seats open. Meets ${club.meetingDay}s at ${club.meetingTime} in ${club.area}. View the member directory and pre-register to visit.`,
    canonical: `/networking-groups/${club.slug}`,
  })
}

export default function ClubPage({ params }: ClubPageProps) {
  const club = getClubBySlug(params.slug)
  if (!club) notFound()

  const members = getClubMembers(club)
  const president = club.presidentId ? getMemberById(club.presidentId) : undefined
  const openSeats = club.seats.filter((s) => s.status === 'open')

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Networking Groups', url: `${SITE_CONFIG.url}/networking-groups` },
    { name: club.name, url: `${SITE_CONFIG.url}/networking-groups/${club.slug}` },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-20 lg:py-24 relative overflow-hidden"
        aria-labelledby="club-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li><Link href="/networking-groups" className="hover:text-white transition-colors">Networking Groups</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">{club.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="badge bg-white/15 text-white text-xs font-bold">{club.chapter}</span>
                <span className="badge bg-accent text-gray-900 text-xs font-bold">
                  {openSeats.length} {openSeats.length === 1 ? 'Seat' : 'Seats'} Open
                </span>
              </div>
              <h1
                id="club-hero-heading"
                className="text-white text-4xl lg:text-5xl font-black leading-tight mb-4"
              >
                {club.name}
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                {club.description}
              </p>

              {/* Quick details */}
              <dl className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Meets', value: `Every ${club.meetingDay}` },
                  { label: 'Time', value: club.meetingTime },
                  { label: 'Venue', value: club.venueName },
                  { label: 'Area', value: club.area },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-lg px-4 py-3">
                    <dt className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-0.5">{label}</dt>
                    <dd className="text-white font-semibold text-sm">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#pre-register"
                  className="btn-accent"
                  aria-label={`Pre-register to visit ${club.name}`}
                >
                  Pre-Register to Visit
                </a>
                <a
                  href="#directory"
                  className="btn-ghost text-white hover:bg-white/10"
                  aria-label={`View ${club.name} member directory`}
                >
                  View Members
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-center">
              <Image
                src={club.featureImage}
                alt={`Illustration for ${club.name}`}
                width={380}
                height={380}
                priority
                className="w-full max-w-xs h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER DETAILS STRIP ────────────────────────────────────────────── */}
      <div className="bg-accent">
        <div className="container-site py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-gray-900">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" aria-hidden="true" />
              {club.memberCount} Active Members
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" aria-hidden="true" />
              {openSeats.length} Open Seats
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" aria-hidden="true" />
              Est. {club.established}
            </span>
            <a
              href={club.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-secondary transition-colors"
              aria-label={`Get directions to ${club.venueName} (opens in new tab)`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {club.address}
            </a>
          </div>
        </div>
      </div>

      {/* ─── SEAT DIRECTORY ───────────────────────────────────────────────────── */}
      <section id="directory" className="py-12 lg:py-16 bg-white" aria-labelledby="directory-heading">
        <div className="container-site">
          <SeatDirectory club={club} />
        </div>
      </section>

      {/* ─── CHAPTER PRESIDENT SPOTLIGHT ──────────────────────────────────────── */}
      {president && (
        <section className="bg-slate-50 py-12 border-t border-gray-100" aria-labelledby="president-heading">
          <div className="container-site max-w-3xl">
            <h2 id="president-heading" className="text-secondary text-xl font-bold mb-6">
              Chapter President
            </h2>
            <div className="card-base p-6 flex flex-col sm:flex-row gap-5 items-start">
              <Link
                href={`/club-members/${president.slug}`}
                className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-full"
                aria-label={`View ${president.name}'s member profile`}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 ring-4 ring-primary/20">
                  <Image
                    src={president.avatar}
                    alt={`${president.name}, Chapter President`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1">
                <span className="badge bg-secondary text-white text-xs font-bold mb-2 inline-block">Chapter President</span>
                <h3 className="text-secondary font-bold text-lg">
                  <Link href={`/club-members/${president.slug}`} className="hover:text-primary transition-colors">
                    {president.name}
                  </Link>
                </h3>
                <p className="text-primary text-sm font-semibold mb-2">{president.businessName} &middot; {president.industry}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{president.shortBio}</p>
                <Link href={`/club-members/${president.slug}`} className="btn-outline text-xs py-1.5 px-4" aria-label={`View ${president.name}'s full profile`}>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL MEMBERS GRID ─────────────────────────────────────────────────── */}
      {members.length > 0 && (
        <section className="bg-white py-12 lg:py-16 border-t border-gray-100" aria-labelledby="members-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <h2 id="members-heading" className="text-secondary text-2xl font-bold">
                Meet the Members
              </h2>
              <span className="text-sm text-gray-400">{members.length} {members.length === 1 ? 'member' : 'members'}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PRE-REGISTER FORM ────────────────────────────────────────────────── */}
      <section
        id="pre-register"
        className="bg-gradient-to-br from-secondary to-primary/80 py-16 lg:py-24"
        aria-labelledby="preregister-heading"
      >
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: context */}
            <div className="text-white">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
                Visit for Free
              </p>
              <h2
                id="preregister-heading"
                className="text-white text-3xl lg:text-4xl font-black leading-tight mb-5"
              >
                Pre-Register to Visit the {club.name}
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                Visiting a meeting is completely free and requires no commitment. Fill out the form
                and we will confirm your visit within one business day.
              </p>

              {/* Meeting detail card */}
              <div className="bg-white/10 rounded-xl p-5 space-y-3 mb-6">
                <h3 className="text-white font-bold text-sm">Meeting Details</h3>
                <dl className="space-y-2">
                  {[
                    { label: 'Day & Time', value: `Every ${club.meetingDay} at ${club.meetingTime}` },
                    { label: 'Venue', value: club.venueName },
                    { label: 'Address', value: club.address },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2 text-sm">
                      <dt className="text-blue-200 shrink-0 w-24">{label}</dt>
                      <dd className="text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={club.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:text-yellow-300 transition-colors mt-1"
                  aria-label="Get directions on Google Maps (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Get Directions
                </a>
              </div>

              {openSeats.length > 0 && (
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-2">Open seats in this chapter:</p>
                  <div className="flex flex-wrap gap-2">
                    {openSeats.map((seat) => (
                      <span key={seat.industrySlug} className="badge bg-white/15 text-white text-xs">
                        {seat.industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl p-7 shadow-2xl">
              <PreRegisterForm club={club} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKS ───────────────────────────────────────────────────── */}
      <nav className="bg-white border-t border-gray-100 py-8" aria-label="Related pages">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/networking-groups" className="btn-outline text-sm py-2" aria-label="See all networking groups">
              ← All Chapters
            </Link>
            <Link href="/about" className="btn-ghost text-sm" aria-label="Learn about ThinkBiz.Solutions">
              About Us
            </Link>
            <Link href="/blog" className="btn-ghost text-sm" aria-label="Read networking tips on the blog">
              Networking Blog
            </Link>
            <Link href="/contact" className="btn-ghost text-sm" aria-label="Contact ThinkBiz.Solutions">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
