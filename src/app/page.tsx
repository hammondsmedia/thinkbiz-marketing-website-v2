import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { BlogCard } from '@/components/ui/BlogCard'
import { OrganizationSchema, LocalBusinessSchema, FAQSchema } from '@/components/ui/SchemaMarkup'
import { SITE_CONFIG } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'ThinkBiz.Solutions | Affordable Business Networking in Oklahoma City',
  description:
    'ThinkBiz.Solutions is an affordable business networking and referral club in Oklahoma City. Get the quality connections and referrals of top-tier networking organizations without the premium price.',
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: 'ThinkBiz.Solutions | Business Networking That Actually Works',
    description:
      'Join a business networking club in Oklahoma City that delivers real referrals, genuine relationships, and measurable growth — at a price that makes sense for small business owners.',
    url: SITE_CONFIG.url,
    type: 'website',
  },
}

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Genuine Referral Culture',
    description:
      'Every member actively looks for opportunities to send business your way. This is not passive networking. It is a structured system built around accountability and mutual growth.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'Affordable Membership',
    description:
      'We believe quality business networking should be accessible to every local business owner, not just those with the budget for premium organizations. Our dues reflect that commitment.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Vetted, Professional Members',
    description:
      'We maintain one member per professional category so there is no competition within the group. Every member represents a category where they can genuinely add value for others.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Structured for Results',
    description:
      'Weekly meetings with a proven agenda keep referrals moving. Members track what they give and what they receive, creating transparency and motivating consistent participation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'Rooted in Oklahoma City',
    description:
      'We are a local organization built for local businesses. Our members serve the same community, which means every referral we make strengthens the local economy we all depend on.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Educational Programming',
    description:
      'Beyond weekly meetings, members gain access to workshops, guest speakers, and training on business growth, referral strategy, and professional development.',
  },
]

const HOME_FAQS = [
  {
    question: 'How is ThinkBiz.Solutions different from other business networking groups?',
    answer:
      'ThinkBiz.Solutions combines the structured, accountability-driven format of premium networking organizations with a membership fee designed for small business owners. You get the referral-tracking systems, the professional member mix, and the culture of giving — without the price tag that puts those benefits out of reach for many local businesses.',
  },
  {
    question: 'How many members can be in the same professional category?',
    answer:
      'We maintain one member per professional category. If you are an accountant, you are the only accountant in the group. This eliminates internal competition and ensures that every referral in your category flows to you.',
  },
  {
    question: 'How often does ThinkBiz.Solutions meet?',
    answer:
      'Our chapters meet weekly. Consistent attendance is part of what makes the referral relationships work — the more members know you and your business, the more naturally they think of you when an opportunity arises.',
  },
  {
    question: 'What types of businesses benefit most from referral networking?',
    answer:
      'Service-based businesses, professionals, and any business where client relationships involve a meaningful level of trust see the strongest results. Attorneys, financial advisors, contractors, healthcare providers, marketing consultants, and real estate professionals are among the most common fits.',
  },
]

export default function HomePage() {
  const recentPosts = BLOG_POSTS.slice(0, 3)

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={HOME_FAQS} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-gradient-to-br from-secondary via-secondary to-primary/80 text-white overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-accent/10 blur-2xl" />
        </div>

        <div className="container-site relative py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl animate-fade-in-up">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
                Oklahoma City Business Networking
              </p>
              <h1
                id="hero-heading"
                className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
              >
                Business Networking{' '}
                <span className="text-accent">That Actually Works</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-xl">
                ThinkBiz.Solutions is an affordable referral networking club for local business
                owners in Oklahoma City. Get the structured referral system, the accountability,
                and the community that drives real growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/contact"
                  variant="accent"
                  size="lg"
                  aria-label="Apply to join ThinkBiz.Solutions networking club"
                >
                  Apply to Join
                </Button>
                <Button
                  href="/about"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-secondary"
                  aria-label="Learn more about ThinkBiz.Solutions"
                >
                  Learn More
                </Button>
              </div>

              {/* Social proof stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
                {[
                  { number: '50+', label: 'Active Members' },
                  { number: '$2M+', label: 'In Referrals Passed' },
                  { number: '5+', label: 'Active Chapters' },
                ].map(({ number, label }) => (
                  <div key={label}>
                    <p className="text-3xl font-black text-accent">{number}</p>
                    <p className="text-sm text-blue-200 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero illustration */}
            <div className="hidden lg:flex justify-center items-center animate-fade-in-up animation-delay-200">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" aria-hidden="true" />
                <Image
                  src="/assets/illustrations/excitement-illustration.svg"
                  alt="Business professionals excited about growing their network through ThinkBiz.Solutions"
                  width={480}
                  height={480}
                  priority
                  className="relative w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION STRIP ──────────────────────────────────────────── */}
      <div className="bg-accent text-gray-900" role="complementary" aria-label="Key differentiators">
        <div className="container-site py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-semibold">
            {[
              'One member per category',
              'Weekly referral meetings',
              'Affordable monthly dues',
              'Oklahoma City focused',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="how-it-works-heading">
        <SectionHeader
          eyebrow="How It Works"
          title="A Referral System Built Around Accountability"
          titleId="how-it-works-heading"
          description="ThinkBiz.Solutions is not another casual mixer. It is a structured environment where showing up consistently and giving referrals generously creates a compounding return for every member."
        />
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {[
            {
              step: '01',
              title: 'Apply & Get Vetted',
              description:
                'Tell us about your business and your professional category. We review applications to ensure members can genuinely contribute to the group.',
            },
            {
              step: '02',
              title: 'Meet Weekly',
              description:
                'Join your chapter for structured weekly meetings designed to surface referral opportunities, deepen relationships, and keep every member top of mind.',
            },
            {
              step: '03',
              title: 'Give and Receive',
              description:
                'The more intentionally you give referrals to others, the more referrals flow back to you. The system is built to make that cycle visible and rewarding.',
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="relative p-8 rounded-xl bg-slate-50 border border-gray-100 group hover:border-primary/30 hover:bg-primary/3 transition-colors duration-300"
            >
              <span
                className="absolute -top-4 left-8 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-black shadow-md"
                aria-hidden="true"
              >
                {step}
              </span>
              <h3 className="text-xl font-bold text-secondary mt-4 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/contact" variant="primary" size="lg" aria-label="Apply to join the ThinkBiz networking club">
            Apply to Join
          </Button>
        </div>
      </Section>

      {/* ─── BENEFITS ─────────────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="benefits-heading">
        <SectionHeader
          eyebrow="Member Benefits"
          title="What Do You Get as a ThinkBiz Member?"
          titleId="benefits-heading"
          description="Beyond referrals, membership gives you a community of professionals invested in your growth and a platform for becoming known as the go-to expert in your field."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon, title, description }) => (
            <div
              key={title}
              className="card-base p-6 group"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── ILLUSTRATION BREAK ───────────────────────────────────────────────── */}
      <Section background="secondary" aria-labelledby="community-heading">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              Our Community
            </p>
            <h2 id="community-heading" className="text-white text-3xl lg:text-4xl font-black leading-tight mb-6">
              Why Do Oklahoma City Business Owners Choose ThinkBiz?
            </h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Other networking organizations charge membership fees that put quality referral
              systems out of reach for many small business owners. We built ThinkBiz.Solutions
              because we believe that a structured, accountability-driven referral network should
              not be a luxury.
            </p>
            <p className="text-blue-100 leading-relaxed mb-8">
              Our members get the same level of organization, professionalism, and referral
              accountability as the well-known premium networks — at a price designed for
              businesses that are still building momentum.
            </p>
            <Button
              href="/about"
              variant="accent"
              aria-label="Learn more about ThinkBiz.Solutions and our mission"
            >
              Our Story
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/illustrations/follow-the-leader-illustration.svg"
              alt="Business leaders working together, illustrating the collaborative nature of ThinkBiz.Solutions membership"
              width={440}
              height={440}
              loading="lazy"
              className="w-full max-w-sm h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </Section>

      {/* ─── RECENT BLOG POSTS ────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="blog-section-heading">
        <SectionHeader
          eyebrow="From the Blog"
          title="Networking Insights for Local Business Owners"
          titleId="blog-section-heading"
          description="Practical advice on referral marketing, business relationships, and professional growth — written by people who do this every day."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/blog" variant="outline" aria-label="Browse all blog articles from ThinkBiz.Solutions">
            Browse All Articles
          </Button>
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            title="What Do People Usually Ask About ThinkBiz?"
            titleId="faq-heading"
          />
          <div className="space-y-4">
            {HOME_FAQS.map(({ question, answer }) => (
              <details
                key={question}
                className="card-base group open:shadow-card-hover"
              >
                <summary
                  className="flex items-center justify-between p-6 cursor-pointer list-none gap-4 select-none"
                  aria-label={question}
                >
                  <h3 className="font-semibold text-secondary text-base group-open:text-primary transition-colors">
                    {question}
                  </h3>
                  <span
                    className="shrink-0 w-6 h-6 text-primary transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
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

      {/* ─── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-r from-primary to-secondary text-white py-20 lg:py-28"
        aria-labelledby="final-cta-heading"
      >
        <div className="container-site text-center">
          <h2
            id="final-cta-heading"
            className="text-white text-3xl lg:text-5xl font-black mb-5 leading-tight"
          >
            Ready to Grow Through Referrals?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Apply for membership today and see how a structured referral network can
            become one of the highest-return investments in your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="accent"
              size="lg"
              aria-label="Apply to join ThinkBiz.Solutions"
            >
              Apply to Join Today
            </Button>
            <Button
              href={`mailto:${SITE_CONFIG.email}`}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
              aria-label={`Email ThinkBiz.Solutions at ${SITE_CONFIG.email}`}
            >
              Ask a Question
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
