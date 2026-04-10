import type { Author, BlogPost } from '@/types/blog'

export const AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: 'Sarah Mitchell',
    slug: 'sarah-mitchell',
    role: 'Co-Founder & Networking Strategist',
    shortBio:
      'Sarah has spent over a decade helping small businesses forge meaningful connections that drive real growth.',
    bio: 'Sarah Mitchell is the co-founder of ThinkBiz.Solutions and a nationally recognized business networking strategist. With more than 12 years of experience helping small and mid-sized businesses in Oklahoma and beyond, she brings a practical, human-centered approach to relationship building. Sarah believes that great referrals start with genuine relationships, not sales tactics. When she is not running networking events, she teaches workshops on referral marketing and business communication.',
    avatar: '/assets/illustrations/excitement-illustration.svg',
    linkedin: 'https://www.linkedin.com/company/thinkbizsolutions/',
  },
  {
    id: 'author-2',
    name: 'David Reyes',
    slug: 'david-reyes',
    role: 'Business Development Lead',
    shortBio:
      'David specializes in referral systems and helps members turn introductions into long-term business relationships.',
    bio: 'David Reyes leads business development at ThinkBiz.Solutions and has helped hundreds of local entrepreneurs build referral pipelines that create sustainable revenue. Before joining ThinkBiz, David spent eight years in B2B sales across multiple industries, giving him a unique understanding of what it takes to move a conversation from cold introduction to trusted partnership. He writes about referral strategy, sales psychology, and the art of the warm introduction.',
    avatar: '/assets/illustrations/leadership-growth.svg',
    linkedin: 'https://www.linkedin.com/company/thinkbizsolutions/',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-referral-networking-beats-cold-outreach',
    title: 'Why Referral Networking Beats Cold Outreach Every Time',
    excerpt:
      'Cold outreach has its place, but referral-based networking closes deals faster, costs less, and builds the kind of trust that turns clients into advocates. Here is why the numbers tell a clear story.',
    featureImage: '/assets/illustrations/business-flying.svg',
    featureImageAlt:
      'Illustration of a business professional flying upward, representing the growth that referral networking enables',
    publishedAt: '2026-03-15T10:00:00Z',
    categories: ['Networking Tips', 'Business Growth'],
    tags: ['referrals', 'networking', 'business growth', 'cold outreach'],
    readTime: 6,
    viewCount: 1243,
    author: AUTHORS[0],
    relatedSlugs: ['how-to-make-a-great-referral', 'building-your-referral-network-from-scratch'],
    content: `
## Why Do Referrals Work So Much Better Than Cold Outreach?

When someone you trust says "you have to work with this person," you listen differently than when a stranger slides into your inbox with a canned pitch. That difference is not just anecdotal. Research consistently shows that referred customers convert at 3 to 5 times the rate of cold leads, spend more over their lifetime, and are far more likely to refer others in return.

The reason comes down to a simple principle in behavioral psychology: **social proof operates as a shortcut for trust**. Your brain does not have the bandwidth to evaluate every new person or product from scratch, so it borrows confidence from people it already trusts. When a trusted contact vouches for someone, they are transferring a piece of their own credibility.

## What Does the Data Actually Say?

Numbers published across multiple sales and marketing studies point in the same direction:

- Referred leads have a conversion rate of roughly **13%**, compared to **2-3%** for most cold outreach channels.
- The average lifetime value of a referred customer is **16-25% higher** than non-referred customers.
- Referral programs cost significantly less per acquisition than paid advertising, especially in local markets.

For local businesses operating in places like Oklahoma City, these numbers matter even more. Local markets are relationship-dense environments where reputation spreads fast in both directions.

## How Do You Get More Referrals Without Feeling Pushy?

The most common mistake business owners make is treating referrals as something they ask for after doing good work, rather than something they architect from the beginning. The goal is to build systems, not just hope for goodwill.

**Give first.** The law of reciprocity is one of the most durable findings in social psychology. When you genuinely refer business to others, they naturally want to return the favor. This is why structured referral networks, where every member is actively looking for opportunities to send business to one another, outperform informal referral habits.

**Make it easy.** Most people are happy to refer you, but they forget or do not know exactly what to say. A simple script, a clear description of your ideal client, and a direct ask removes the friction.

**Follow up every time.** When someone refers you, close the loop. Let them know what happened, thank them, and if it turned into business, find a meaningful way to show your appreciation.

## Is Referral Networking Right for Every Business?

Almost any business that relies on trust to close deals, which is most of them, benefits from a structured referral approach. The businesses that benefit most are those where the buying decision is high-stakes, where the client relationship extends over time, and where word-of-mouth already plays an informal role.

Contractors, financial advisors, attorneys, consultants, healthcare providers, and service-based businesses of all kinds tend to see the strongest returns from referral networking, because the cost of a bad hire in those categories is high enough that people rely heavily on trusted recommendations.

## What Makes ThinkBiz Different from Other Networking Groups?

ThinkBiz.Solutions was built around one core belief: that quality networking should not come with an expensive price tag. Many established networking organizations charge membership fees that are simply out of reach for small business owners who are just starting to build their referral systems.

Our approach focuses on creating genuine relationships in a structured environment where accountability is built in. Every member is there to give referrals as much as to receive them, and that mutual orientation changes the entire dynamic of the room.

## The Bottom Line

Cold outreach will always have a role in business development. But if you want to build a sustainable pipeline of clients who already trust you before you ever speak to them, referral networking is not just a nice-to-have. It is one of the highest-return investments a local business can make.

The question is not whether referral networking works. The question is whether you have a system in place to make it happen consistently.
    `,
  },
  {
    id: 'post-2',
    slug: 'how-to-make-a-great-referral',
    title: 'How to Make a Great Referral (And Why Most People Get It Wrong)',
    excerpt:
      'Handing over a phone number is not a referral. Learn the anatomy of a referral that actually converts and strengthens your relationships at the same time.',
    featureImage: '/assets/illustrations/team-work-illustration.svg',
    featureImageAlt:
      'Illustration of a team working together, representing the collaborative nature of referral networking',
    publishedAt: '2026-03-28T09:00:00Z',
    updatedAt: '2026-04-02T14:00:00Z',
    categories: ['Networking Tips', 'Referrals'],
    tags: ['referrals', 'networking', 'relationships', 'business tips'],
    readTime: 5,
    viewCount: 876,
    author: AUTHORS[1],
    relatedSlugs: ['why-referral-networking-beats-cold-outreach', 'building-your-referral-network-from-scratch'],
    content: `
## What Separates a Good Referral from a Mediocre One?

Most people think a referral is as simple as handing over a contact's information. "You should call my friend Dave. He does IT." That is not a referral. That is a suggestion. And the difference between the two is enormous.

A true referral carries three things that a suggestion does not: context, credibility, and a warm introduction. When all three are present, the person receiving the referral arrives at the conversation already partway through the trust-building process.

## Why Do Most Referrals Fall Apart Before They Start?

The most common failure mode is a cold pass. Someone gets a name and number, reaches out, and the person on the other end has no idea why they are being contacted. Immediately, the interaction feels like cold outreach wearing a referral costume.

This happens because the person making the referral skipped a step: they never primed both sides of the conversation.

**The solution is the double opt-in referral.** Before you share anyone's contact information, confirm that both parties want to connect. A simple message to each person, "I know someone who does X and I think you two should meet. Is it okay if I make an introduction?" takes two minutes and changes the entire dynamic of what follows.

## What Does a Well-Made Referral Look Like?

Here is a concrete example of the anatomy of a referral that actually works.

**Step 1: Identify the fit.** You are not making referrals out of obligation. You are making them because you genuinely believe two people can benefit from knowing each other. Be selective.

**Step 2: Get consent from both sides.** A quick message to the potential receiver: "A client of mine is looking for exactly what you do. Would it be okay if I connected you?" And to your client: "I know someone I think you would really want to talk to. Mind if I make an intro?"

**Step 3: Make the introduction with context.** Do not just send a message with two email addresses. Write a proper introduction that explains who each person is, why you think they should connect, and what you hope they will talk about. This transfers your credibility to both parties simultaneously.

**Step 4: Step back.** Once the introduction is made, your job is done. Let them take it from there without pressure.

**Step 5: Close the loop.** Follow up with both parties afterward. Find out whether the conversation happened and whether it was useful. This shows you care about outcomes, not just the act of connecting.

## How Does Making Great Referrals Help Your Own Business?

Counterintuitively, the fastest way to receive more referrals is to become someone known for making exceptional ones. When people know that your referrals always come with context and always represent a genuine fit, they trust your introductions more and they want to return the favor.

This is one of the most powerful aspects of structured networking groups like ThinkBiz.Solutions. When you sit in a room with people who share your commitment to quality referrals, you raise the standard for everyone and the system starts to compound over time.

## The Referral Mindset Shift

Stop thinking about referrals as a transaction you initiate when you need more business. Start thinking about them as a continuous practice of paying attention to the people around you, noticing opportunities to connect them, and acting on those opportunities with care and specificity.

That shift in orientation is what separates the members who get a trickle of occasional referrals from the ones who build entire businesses on the back of word-of-mouth.
    `,
  },
  {
    id: 'post-3',
    slug: 'building-your-referral-network-from-scratch',
    title: 'Building Your Referral Network from Scratch: A Practical Guide',
    excerpt:
      'Starting with zero connections feels overwhelming, but building a referral network has a repeatable process. Here is how to go from isolated to well-connected in six months.',
    featureImage: '/assets/illustrations/follow-the-leader-illustration.svg',
    featureImageAlt:
      'Illustration of leaders building connections, representing the process of growing a referral network',
    publishedAt: '2026-04-05T08:00:00Z',
    categories: ['Business Growth', 'Networking Tips', 'Leadership'],
    tags: ['networking', 'referrals', 'small business', 'business development'],
    readTime: 8,
    viewCount: 542,
    author: AUTHORS[0],
    relatedSlugs: ['why-referral-networking-beats-cold-outreach', 'how-to-make-a-great-referral'],
    content: `
## Is It Actually Possible to Build a Strong Network from Zero?

Yes, and it is more achievable than most people think. The belief that networking requires an existing social capital or an outgoing personality is one of the biggest myths that holds business owners back.

What building a referral network actually requires is consistency, genuine curiosity about other people, and a system. Personality type matters far less than most people assume. Some of the most effective networkers are naturally introverted people who have learned to structure their relationship-building so it feels sustainable and authentic.

## Where Do You Start When You Know Almost Nobody?

**Start with who you already know.** Most people massively underestimate the size of their existing network. Before you attend a single event or join a single group, make a list of everyone you know: former colleagues, neighbors, family friends, past clients, vendors you have worked with, people from school. This is your foundation.

The goal is not to immediately ask any of them for business. The goal is to reconnect, express genuine interest in what they are working on, and start being present in their awareness again.

**Then expand strategically.** Once you have reconnected with your existing network, start expanding it deliberately. This means choosing networking environments where you will consistently encounter the types of professionals who are most likely to either need your services directly or refer others to you.

## What Kind of Networking Events Are Worth Your Time?

Not all networking events are created equal, and your time is genuinely limited. Here is how to evaluate whether a particular event or group is worth your consistent investment.

**Look for accountability structures.** Events where you simply mingle and exchange cards rarely produce referrals. Groups that meet regularly, track referrals, and hold members accountable to participation create the conditions for real relationship depth.

**Look for the right professional mix.** A room full of people in your exact industry is not a referral network. You want diversity of profession combined with similarity of target client. An attorney, a CPA, a financial planner, and a mortgage broker might all serve the same client base and have almost no overlap in what they do for that client.

**Look for a culture of giving.** The best networking environments are ones where giving referrals is as celebrated as receiving them. When the culture is oriented around contribution rather than extraction, the entire group benefits.

## What Should Your First Six Months Look Like?

**Months one and two: Show up and listen.** Attend three to four different networking environments. Do not pitch. Ask questions. Try to understand what everyone does, who their ideal clients are, and what kinds of referrals are most valuable to them. Be curious without agenda.

**Months three and four: Start giving.** Once you understand what the people around you need, start looking for opportunities to connect them with others. Make one or two intentional referrals per month. Do not worry about whether you are getting anything back yet.

**Months five and six: Specialize and deepen.** By now, you should have a sense of which environment and which specific relationships feel most productive. Double down on those. Become known as someone who shows up consistently and refers thoughtfully.

## How Do You Stay Top of Mind Between Events?

The relationships you build at networking events only grow if you maintain them between events. This does not mean bombarding people with content. It means staying present in a lightweight but consistent way.

A few approaches that work well: share something useful with a specific person when you see something relevant to their business. Send a brief message when you notice a win they have had. Look for opportunities to feature or promote their work without being asked. These small acts of attention compound over time into genuine goodwill.

## When Should You Join a Structured Networking Group?

If you have been networking informally for a while and feel like you are investing time without seeing consistent referrals, a structured group like ThinkBiz.Solutions can be a meaningful accelerant. The accountability, the regular contact with the same group of professionals, and the explicit culture of referral-giving creates conditions that informal networking rarely replicates.

Many of our members say that they spent years attending various events with inconsistent results before they found that the structured approach was what had been missing.

## The Long View on Network Building

A strong referral network is not something you build in a quarter. It is something you cultivate over years. The business owners who benefit most from referral networking are the ones who treat it as a long-term investment in relationships rather than a short-term tactic for leads.

The good news is that every single genuine relationship you build compounds. Each person in your network is connected to hundreds of others, and as your reputation for trustworthiness and quality grows, it starts to spread in ways you cannot directly observe or control. That is when referral networking truly starts to work for you.
    `,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((author) => author.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return BLOG_POSTS
  return BLOG_POSTS.filter((post) => post.categories.includes(category))
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs?.length) return []
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== undefined)
}

export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.author.slug === authorSlug)
}
