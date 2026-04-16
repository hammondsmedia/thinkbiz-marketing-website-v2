import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'
import { BreadcrumbSchema, FAQSchema } from '@/components/ui/SchemaMarkup'
import { Section, SectionHeader } from '@/components/ui/Section'

export const metadata: Metadata = buildMetadata({
  title: 'Learn About Membership',
  description:
    'Everything you need to know about joining a ThinkBiz.Solutions chapter — meeting format, membership benefits, weekly commitments, and how to go from visitor to full member.',
  ogTitle: 'ThinkBiz Membership — What to Expect & How to Join',
  ogDescription:
    '$40/month. One seat per industry. Weekly structured meetings. Learn exactly what ThinkBiz membership includes and what is expected of every member.',
  canonical: '/membership',
})

const BENEFITS = [
  {
    title: 'Chapter Slide',
    description:
      'Your business is introduced every single week through a dedicated slide shown to every member and visitor in attendance. You never have to wonder if people know what you do.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Member Roster',
    description:
      'You are listed in your chapter\'s directory and on the ThinkBiz website with a full profile page — your business, specialties, and referral contact info visible to every visitor who looks us up.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    title: 'Speaker Rotation',
    description:
      'Every member gets a featured presentation slot on a rotating basis. You have the floor to educate the entire chapter about your business, your ideal client, and exactly how to refer you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Website Profile',
    description:
      'A dedicated profile page on ThinkBiz.Solutions showing your photo, bio, business details, specialties, and chapter membership. Visitors can find you before they even walk in the door.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Podcast Feature',
    description:
      'Members are invited to be featured on the ThinkBiz podcast — a chance to tell your business story to a broader local audience and establish yourself as a trusted expert in your field.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
      </svg>
    ),
  },
  {
    title: 'Member Chat',
    description:
      'Access to your chapter\'s group chat for sharing hot referrals, asking quick questions, and staying connected between weekly meetings. Good referrals don\'t wait for Tuesday morning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: 'CrossClub Access',
    description:
      'As a member you can attend any ThinkBiz chapter across the full network as a guest. Great for days you are near a different chapter location, or when you want to expand your connections city-wide.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
]

const AGENDA_ITEMS = [
  { order: '01', title: 'Leader Introductions', body: 'Chapter leadership opens the meeting and covers any chapter-level announcements or housekeeping.' },
  { order: '02', title: 'Member Introductions', body: 'Every member gives their 60-second commercial — name, business, and their ask for the week. Crisp, specific, memorable.' },
  { order: '03', title: 'Visitor Introductions', body: 'Guests are welcomed and introduce themselves. This is the room deciding if you belong here — make it count.' },
  { order: '04', title: 'New Members', body: 'Any members who joined since the last meeting are officially welcomed and given a moment to say a few words.' },
  { order: '05', title: 'Featured Presenter', body: 'One member gets 10–15 minutes to do a deep dive on their business — ideal clients, referral examples, and exactly how to spot an opportunity for them.' },
  { order: '06', title: 'Successes', body: 'Members share referrals given, referrals received, and closed business that came through the chapter. This is where you see the ROI in real-time.' },
  { order: '07', title: 'Outreach Planning', body: 'The chapter identifies open industry seats and strategically discusses who to invite as a visitor. Everyone takes one outreach task.' },
  { order: '08', title: 'Announcements', body: 'Quick updates from members — new services, upcoming promotions, or anything relevant to the group.' },
  { order: '09', title: 'Set Up One-to-Ones', body: 'Members pair up and schedule their one-to-one meetings for the week. These private conversations are where the real referral relationships are built.' },
]

const PAGE_FAQS = [
  {
    question: 'How much does membership cost?',
    answer:
      'Monthly dues are $40 per month. There are no initiation fees or long-term contracts. Membership runs month-to-month, though we ask that members commit to at least 90 days to give the referral relationships time to develop.',
  },
  {
    question: 'What if I cannot make it to a meeting?',
    answer:
      'Life happens. If you cannot attend, you are welcome to send a substitute — a colleague, employee, or trusted business contact who can represent your seat for the week. Members are expected to attend or send a sub regularly. Consistent absence makes it hard for the chapter to refer you confidently.',
  },
  {
    question: 'What is a one-to-one (121)?',
    answer:
      'A one-to-one is a private, 30–45 minute meeting between two members outside of the weekly chapter meeting. The goal is to understand each other\'s businesses well enough to recognize referral opportunities. Members are expected to schedule at least one per week. These meetings are where trust — and referrals — actually get built.',
  },
  {
    question: 'Can I be a member of more than one chapter?',
    answer:
      'Your primary membership and industry seat belongs to one chapter. However, CrossClub access lets you attend other chapters as a visiting member, which is a great way to expand your network without holding multiple seats.',
  },
  {
    question: 'What if my industry seat is already taken?',
    answer:
      'Each chapter holds exactly one seat per professional category. If your category is filled at the chapter you want to join, we can put you on a waitlist for that seat or help you find an open seat at a different chapter. Contact us and we will walk you through the options.',
  },
  {
    question: 'What does the path to membership look like?',
    answer:
      'First, you visit the chapter up to two times to make sure it feels like the right fit. During that time, we encourage you to schedule one-to-one meetings with current members. After your visits, two existing members sponsor and mentor you through joining. From there, you officially claim your industry seat and become a full member.',
  },
]

export default function MembershipPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Membership', url: `${SITE_CONFIG.url}/membership` },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={PAGE_FAQS} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="membership-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200 flex-wrap" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Membership</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
                Learn About Membership
              </p>
              <h1
                id="membership-hero-heading"
                className="text-white text-4xl lg:text-5xl font-black leading-tight mb-5"
              >
                This Is Not Your Average Networking Group
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                ThinkBiz is a structured referral organization. Every member holds an exclusive
                industry seat, shows up weekly, builds real relationships through one-to-ones, and
                commits to helping their chapter grow. The result is a steady stream of warm referrals
                from people who actually know and trust your work.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '$40', label: 'Monthly dues' },
                  { value: '1', label: 'Seat per industry' },
                  { value: '90 min', label: 'Weekly meeting' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-accent leading-none mb-1">{value}</p>
                    <p className="text-xs text-blue-200 font-medium">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/networking-groups" className="btn-accent" aria-label="Find a chapter to visit">
                  Find a Chapter to Visit
                </Link>
                <a href="#expectations" className="btn-ghost text-white hover:bg-white/10">
                  See Expectations
                </a>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <Image
                src="/assets/illustrations/follow-the-leader-illustration.svg"
                alt="ThinkBiz membership illustration"
                width={380}
                height={380}
                priority
                className="w-full max-w-xs h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─────────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="benefits-heading">
        <SectionHeader
          eyebrow="Membership Benefits"
          title="What Your Membership Includes"
          titleId="benefits-heading"
          description="Every ThinkBiz member gets the same full set of benefits. There are no tiers, no upsells, and no add-ons."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {BENEFITS.map(({ title, description, icon }) => (
            <div key={title} className="card-base p-6 group hover:border-primary/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
              </div>
              <h3 className="font-bold text-secondary text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── MEETING AGENDA ───────────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="agenda-heading">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: intro */}
          <div className="lg:sticky lg:top-24">
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">
              Every Week, Without Fail
            </p>
            <h2 id="agenda-heading" className="text-secondary text-3xl font-black leading-tight mb-5">
              What Happens at a ThinkBiz Meeting
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Every chapter follows the same agenda at every weekly meeting. There are no surprises,
              no awkward mingling sessions, and no wasted time. The structure is intentional — it
              keeps meetings tight, keeps every member visible, and ensures referrals actually move.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Meetings run 90 minutes. Most chapters meet early morning (7:30 AM) or midday, so
              your business day is not disrupted.
            </p>
            <Link
              href="/networking-groups"
              className="btn-primary text-sm py-2.5 inline-block"
              aria-label="See chapter meeting times"
            >
              See Chapter Times & Locations
            </Link>
          </div>

          {/* Right: agenda list */}
          <ol className="space-y-3" aria-label="Weekly meeting agenda">
            {AGENDA_ITEMS.map(({ order, title, body }) => (
              <li key={order} className="card-base p-5 flex gap-4 group hover:border-primary/30 transition-colors">
                <span
                  className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  {order}
                </span>
                <div>
                  <h3 className="font-bold text-secondary text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── EXPECTATIONS ─────────────────────────────────────────────────────── */}
      <Section background="white" id="expectations" aria-labelledby="expectations-heading">
        <SectionHeader
          eyebrow="What Is Expected of You"
          title="Membership Commitments"
          titleId="expectations-heading"
          description="ThinkBiz works because every member holds their chapter to a standard. These are not suggestions — they are the minimum expectations that keep the referral engine running."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Weekly */}
          <div className="card-base p-7 border-t-4 border-primary">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-primary" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary text-lg mb-4">Weekly</h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                <span>Attend your chapter meeting — or send a qualified substitute</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                <span>Schedule at least <strong>one one-to-one</strong> with a fellow member</span>
              </li>
            </ul>
          </div>

          {/* Monthly */}
          <div className="card-base p-7 border-t-4 border-secondary">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-secondary" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary text-lg mb-4">Monthly</h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                <span>Pay your <strong>$40 monthly dues</strong> on time</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                <span>Bring at least <strong>one visitor</strong> to your chapter</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
                <span>Give at least <strong>one referral</strong> to a fellow member</span>
              </li>
            </ul>
          </div>

          {/* Always */}
          <div className="card-base p-7 border-t-4 border-accent">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-yellow-700" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-secondary text-lg mb-4">Always</h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" aria-hidden="true" />
                <span>Hold your industry seat exclusively — no competing categories</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" aria-hidden="true" />
                <span>Represent your chapter professionally in every one-to-one and referral</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" aria-hidden="true" />
                <span>Give referrals honestly — only refer people you would stake your reputation on</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 max-w-xl mx-auto">
          The commitments above exist because ThinkBiz chapters are only as strong as every member
          in them. When everyone pulls their weight, the referrals flow. When they do not, the whole
          chapter suffers.
        </p>
      </Section>

      {/* ─── VISITOR → MEMBER PATH ────────────────────────────────────────────── */}
      <Section background="alt" aria-labelledby="path-heading">
        <SectionHeader
          eyebrow="How It Works"
          title="The Path from Visitor to Member"
          titleId="path-heading"
          description="We do not want you to commit before you are sure. The process is designed to let both sides make a thoughtful decision."
        />

        <div className="max-w-3xl mx-auto">
          {/* Visitor box */}
          <div className="card-base p-7 mb-6 border-l-4 border-primary bg-primary/3">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-black" aria-hidden="true">V</span>
              <h3 className="text-secondary font-bold text-lg">While You Are Visiting</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Visitors are welcome at every chapter meeting. You are not committing to anything by
              showing up. While you are visiting, here is what we encourage you to do — and what
              to keep in mind.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">You Can</p>
                <ul className="space-y-2" role="list">
                  {[
                    'Attend up to 2 meetings to decide',
                    'Bring a guest to your visit',
                    'Give and receive referrals as a visitor',
                    'Schedule unlimited one-to-ones with members',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Please Note</p>
                <ul className="space-y-2" role="list">
                  {[
                    'Visits are capped at 2 per chapter',
                    'Your industry seat must be open to join',
                    'Membership requires a sponsor from within the chapter',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-5 top-8 bottom-8 w-px bg-gray-200" aria-hidden="true" />
            <ol className="space-y-4 relative" aria-label="Steps to membership">
              {[
                {
                  step: '1',
                  title: 'Pre-register and attend as a visitor',
                  body: 'Choose a chapter whose meeting time works for your schedule and whose member mix looks like a good fit for your business. Pre-register on the chapter page so we know to expect you.',
                },
                {
                  step: '2',
                  title: 'Schedule one-to-ones with members',
                  body: 'During your visits, start scheduling one-to-one meetings with members. These 30–45 minute coffees are how you and the chapter get to know each other. You need at least two of these before joining.',
                },
                {
                  step: '3',
                  title: 'Find a sponsor and mentor',
                  body: 'Two existing members sponsor your membership — one serves as your sponsor (vouching for you to the chapter) and one serves as your mentor (helping you get the most out of your first 90 days).',
                },
                {
                  step: '4',
                  title: 'Claim your industry seat and join',
                  body: 'Once your sponsor confirms your seat is open, you pay your first month\'s dues and officially become a member. Your chapter slide, roster listing, and website profile go live immediately.',
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-5 pl-2">
                  <span
                    className="relative z-10 shrink-0 w-9 h-9 rounded-full bg-secondary text-white text-sm font-black flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    {step}
                  </span>
                  <div className="card-base p-5 flex-1 mb-0">
                    <h3 className="font-bold text-secondary text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <Section background="white" aria-labelledby="membership-faq-heading">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Common Questions"
            title="Membership FAQ"
            titleId="membership-faq-heading"
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
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 py-20 lg:py-24 text-white"
        aria-labelledby="membership-cta-heading"
      >
        <div className="container-site text-center max-w-2xl mx-auto">
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
            Ready to See It for Yourself?
          </p>
          <h2 id="membership-cta-heading" className="text-white text-3xl lg:text-4xl font-black leading-tight mb-5">
            Visiting Is Free. Joining Is Up to You.
          </h2>
          <p className="text-blue-100 leading-relaxed mb-8">
            The best way to know whether ThinkBiz is right for your business is to sit in on a
            meeting. Find a chapter near you, check that your industry seat is open, and
            pre-register. No commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/networking-groups" className="btn-accent" aria-label="Browse chapters and find an open seat">
              Find an Open Seat
            </Link>
            <Link href="/contact" className="btn-ghost text-white hover:bg-white/10" aria-label="Talk to the ThinkBiz team">
              Ask Us a Question
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INTERNAL NAV ─────────────────────────────────────────────────────── */}
      <nav className="bg-white border-t border-gray-100 py-8" aria-label="Related pages">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/networking-groups" className="btn-outline text-sm py-2">Browse Chapters</Link>
            <Link href="/events" className="btn-ghost text-sm">Upcoming Events</Link>
            <Link href="/about" className="btn-ghost text-sm">About ThinkBiz</Link>
            <Link href="/contact" className="btn-ghost text-sm">Contact Us</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
