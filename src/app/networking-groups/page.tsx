import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { ClubCard } from '@/components/ui/ClubCard'
import { OrganizationSchema, FAQSchema } from '@/components/ui/SchemaMarkup'
import { SITE_CONFIG } from '@/lib/constants'
import { getAllClubs } from '@/lib/clubs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Networking Groups',
  description:
    'Find a ThinkBiz.Solutions networking chapter near you in Oklahoma City, Edmond, and surrounding areas. View meeting schedules, open industry seats, and member directories.',
  alternates: { canonical: `${SITE_CONFIG.url}/networking-groups` },
  openGraph: {
    title: 'Find a ThinkBiz.Solutions Networking Group Near You',
    description:
      'Browse ThinkBiz chapters across the Oklahoma City metro. See meeting times, open seats, and current members before you visit.',
    url: `${SITE_CONFIG.url}/networking-groups`,
  },
}

const PAGE_FAQS = [
  {
    question: 'Can I visit a chapter before committing to membership?',
    answer:
      'Yes. We encourage prospective members to visit before applying. You can pre-register for a visit through each chapter\'s page, and we will confirm your details within one business day. There is no cost or commitment to attend as a guest.',
  },
  {
    question: 'What happens if my industry seat is already filled at the chapter I want to join?',
    answer:
      'If your professional category is already represented at a chapter, we can put you on a waitlist for that seat or help you find an open seat at another chapter in our network. Contact us to discuss your options.',
  },
  {
    question: 'How do I know which chapter is the right fit for my business?',
    answer:
      'The right chapter depends on where you do most of your business and which meeting time works with your schedule. Review the member directory on each chapter page to see whether the current mix of professionals aligns well with your ideal referral partners.',
  },
]

export default async function NetworkingGroupsPage() {
  const clubs = await getAllClubs().catch(() => [])
  const totalOpenSeats = clubs.reduce((sum, c) => sum + c.openSeats, 0)
  const totalMembers = clubs.reduce((sum, c) => sum + c.memberCount, 0)

  return (
    <>
      <OrganizationSchema />
      <FAQSchema faqs={PAGE_FAQS} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary via-secondary to-primary/80 text-white py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="groups-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Networking Groups</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              Find Your Chapter
            </p>
            <h1
              id="groups-hero-heading"
              className="text-white text-4xl lg:text-5xl font-black leading-tight mb-5"
            >
              Business Networking Groups Across the Oklahoma City Metro
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Browse our active chapters, review open industry seats, and see the professionals
              already in each group. When you find a chapter that looks like a good fit,
              pre-register for a free visit.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-8">
              {[
                { number: clubs.length.toString(), label: 'Active Chapters' },
                { number: totalMembers.toString() + '+', label: 'Members' },
                { number: totalOpenSeats.toString(), label: 'Open Seats' },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-accent">{number}</p>
                  <p className="text-sm text-blue-200 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER GRID ─────────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="chapters-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 id="chapters-heading" className="text-secondary text-2xl font-bold">
              Active Chapters
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {clubs.length} chapters &middot; {totalOpenSeats} open seats available
            </p>
          </div>
          <Link href="/contact" className="btn-primary text-sm py-2.5 self-start sm:self-auto" aria-label="Contact us about starting a new chapter">
            Start a New Chapter
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </Section>

      {/* ─── HOW VISITING WORKS ───────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="visit-how-heading">
        <SectionHeader
          eyebrow="Before You Join"
          title="How Does Visiting a Chapter Work?"
          titleId="visit-how-heading"
          description="We want you to see exactly what you are getting into before you commit. Visiting is free, easy, and encouraged."
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              step: '01',
              title: 'Browse & Pick a Chapter',
              body: 'Review the member directories above to find a chapter with the right professional mix for your business. Check whether your industry seat is open.',
            },
            {
              step: '02',
              title: 'Pre-Register Online',
              body: 'Fill out the pre-registration form on the chapter page you want to visit. We will confirm your visit details within one business day.',
            },
            {
              step: '03',
              title: 'Show Up & See It Yourself',
              body: 'Attend the meeting as a guest. Experience the format, meet the members, and decide whether it is the right fit for you and your business.',
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="relative p-7 rounded-xl bg-slate-50 border border-gray-100">
              <span className="absolute -top-4 left-6 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-sm font-black shadow" aria-hidden="true">
                {step}
              </span>
              <h3 className="text-secondary font-bold text-base mt-3 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="groups-faq-heading">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            title="Questions About Joining a Chapter"
            titleId="groups-faq-heading"
          />
          <div className="space-y-4">
            {PAGE_FAQS.map(({ question, answer }) => (
              <details key={question} className="card-base group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4 select-none">
                  <h3 className="font-semibold text-secondary text-base group-open:text-primary transition-colors">
                    {question}
                  </h3>
                  <span className="shrink-0 w-6 h-6 text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-20" aria-labelledby="groups-cta-heading">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h2 id="groups-cta-heading" className="text-white text-3xl font-black mb-4 leading-tight">
            Not Sure Which Chapter Is Right for You?
          </h2>
          <p className="text-blue-50 leading-relaxed mb-8">
            We are happy to walk you through the options and help you find the best fit.
            Reach out and we will get back to you within one business day.
          </p>
          <Link href="/contact" className="btn-accent" aria-label="Contact ThinkBiz.Solutions for chapter guidance">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </>
  )
}
