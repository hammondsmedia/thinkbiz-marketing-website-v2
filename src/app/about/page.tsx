import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { OrganizationSchema, FAQSchema } from '@/components/ui/SchemaMarkup'
import { SITE_CONFIG } from '@/lib/constants'
import { AUTHORS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ThinkBiz.Solutions — an affordable business networking and referral club organization built for local entrepreneurs in Oklahoma City, Oklahoma.',
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  openGraph: {
    title: 'About ThinkBiz.Solutions | Our Story & Mission',
    description:
      'ThinkBiz.Solutions was founded on a simple belief: that quality referral networking should be affordable for every local business owner. Learn why we built it and how we run it differently.',
    url: `${SITE_CONFIG.url}/about`,
  },
}

const ABOUT_FAQS = [
  {
    question: 'When and why was ThinkBiz.Solutions founded?',
    answer:
      'ThinkBiz.Solutions was founded because the founders saw a clear gap in the market: premium networking organizations were delivering real results for members, but their membership fees put those results out of reach for the majority of small business owners. We set out to build an organization that maintained the quality and accountability of the best referral networks while making membership genuinely affordable.',
  },
  {
    question: 'Is ThinkBiz.Solutions only in Oklahoma City?',
    answer:
      'We are currently focused on building strong, active chapters in Oklahoma City and the surrounding area. Our goal is to grow chapter by chapter, keeping the community tight-knit and the referral relationships meaningful. If you are interested in bringing ThinkBiz to a different market, we would love to talk.',
  },
  {
    question: 'What does a typical weekly meeting look like?',
    answer:
      'Each meeting follows a structured agenda: members introduce themselves and their weekly business update, share referrals and testimonials, give a brief spotlight on their business, and participate in a featured educational segment. Meetings typically run 60 to 90 minutes and are designed to maximize the referral value of every minute.',
  },
]

const VALUES = [
  {
    title: 'Genuine Community',
    description:
      'We prioritize real relationships over surface-level networking. Our members know each other, trust each other, and genuinely want to see each other succeed.',
  },
  {
    title: 'Accountability',
    description:
      'Attendance, participation, and referral activity are tracked because consistency is what separates a productive referral group from a social hour.',
  },
  {
    title: 'Accessibility',
    description:
      'Premium quality networking should not require a premium budget. We built our pricing to reflect that belief from day one.',
  },
  {
    title: 'Local First',
    description:
      'Every referral passed between our members strengthens a local economy built by the same people who live and work in it.',
  },
]

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <FAQSchema faqs={ABOUT_FAQS} />

      {/* ─── PAGE HERO ────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">About Us</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Our Story</p>
            <h1
              id="about-hero-heading"
              className="text-white text-4xl lg:text-5xl font-black leading-tight mb-6"
            >
              Quality Networking Should Not Have a Luxury Price Tag
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              ThinkBiz.Solutions was built for the business owner who knows that referrals are the
              best source of new clients — and who has been priced out of the organizations that
              deliver them consistently.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ORIGIN STORY ─────────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="origin-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Where We Started</p>
            <h2 id="origin-heading" className="text-secondary text-3xl font-black mb-5">
              Why We Built a Networking Club from Scratch
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The founders of ThinkBiz.Solutions had experienced firsthand how structured
                referral networking changed the trajectory of a small business. Weekly meetings,
                vetted members, tracked referrals — it worked. But they also watched colleagues
                and potential members opt out because the dues were too steep for where they were
                in their business journey.
              </p>
              <p>
                The premise of ThinkBiz.Solutions is straightforward: take the elements of
                referral networking that actually produce results — accountability, consistency,
                professional vetting, and a culture of giving — and deliver them at a price that
                local business owners can afford before they have hit their stride.
              </p>
              <p>
                We are not trying to be the biggest networking organization in Oklahoma. We want
                to be the one where every member genuinely grows, where referrals are regular
                and real, and where showing up every week is worth the hour it costs.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/illustrations/leadership-growth.svg"
              alt="Illustration of business leadership and growth, representing the journey ThinkBiz.Solutions helps members undertake"
              width={440}
              height={440}
              loading="lazy"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </Section>

      {/* ─── MISSION & VALUES ─────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="values-heading">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 id="values-heading" className="text-secondary text-3xl font-black mb-5 leading-tight">
              The Values That Shape How We Run Every Chapter
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Every decision we make — about membership criteria, meeting structure, and pricing —
              comes back to these four principles.
            </p>
            <Button href="/contact" variant="primary" aria-label="Apply to join ThinkBiz.Solutions">
              Apply to Join
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(({ title, description }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-100 shadow-card">
                <div className="w-8 h-1 bg-accent rounded mb-4" aria-hidden="true" />
                <h3 className="text-secondary font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TEAM / AUTHORS ───────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="team-heading">
        <SectionHeader
          eyebrow="Our Team"
          title="The People Behind ThinkBiz.Solutions"
          titleId="team-heading"
          description="Our team brings decades of combined experience in business networking, sales, and local entrepreneurship."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {AUTHORS.map((author) => (
            <div key={author.id} className="card-base p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 mb-5 ring-4 ring-primary/20">
                <Image
                  src={author.avatar}
                  alt={`${author.name}, ${author.role} at ThinkBiz.Solutions`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-secondary font-bold text-xl mb-1">{author.name}</h3>
              <p className="text-primary text-sm font-semibold mb-4">{author.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{author.shortBio}</p>
              <div className="flex gap-3">
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                  aria-label={`${author.name} on LinkedIn (opens in new tab)`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <Link
                  href={`/blog/author/${author.slug}`}
                  className="btn-ghost text-sm py-2 px-4"
                  aria-label={`Read articles by ${author.name}`}
                >
                  Articles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="about-faq-heading">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Questions"
            title="Common Questions About ThinkBiz.Solutions"
            titleId="about-faq-heading"
          />
          <div className="space-y-4">
            {ABOUT_FAQS.map(({ question, answer }) => (
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
      <section className="bg-primary text-white py-20 lg:py-28" aria-labelledby="about-cta-heading">
        <div className="container-site text-center max-w-3xl mx-auto">
          <h2 id="about-cta-heading" className="text-white text-3xl lg:text-4xl font-black mb-5 leading-tight">
            Ready to Experience Networking That Delivers Results?
          </h2>
          <p className="text-blue-50 text-lg leading-relaxed mb-8">
            Contact us to learn about the next available seat in a ThinkBiz.Solutions chapter
            near you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" variant="accent" size="lg" aria-label="Contact ThinkBiz.Solutions to join">
              Get in Touch
            </Button>
            <Button
              href={SITE_CONFIG.phoneHref}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
              aria-label={`Call ThinkBiz.Solutions at ${SITE_CONFIG.phone}`}
            >
              {SITE_CONFIG.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
