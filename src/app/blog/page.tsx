import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogCard } from '@/components/ui/BlogCard'
import { BreadcrumbSchema } from '@/components/ui/SchemaMarkup'
import { SITE_CONFIG, BLOG_CATEGORIES } from '@/lib/constants'
import { BLOG_POSTS, getPostsByCategory } from '@/lib/blog-data'

interface BlogPageProps {
  searchParams: { category?: string }
}

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical insights on business networking, referral marketing, and professional growth from the ThinkBiz.Solutions team. Written for Oklahoma City entrepreneurs.',
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  openGraph: {
    title: 'ThinkBiz.Solutions Blog | Networking & Business Growth Insights',
    description:
      'Expert articles on referral networking, business relationship building, and local entrepreneurship — written by the team that runs ThinkBiz.Solutions every week.',
    url: `${SITE_CONFIG.url}/blog`,
  },
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const activeCategory = searchParams.category ?? 'All'
  const posts = getPostsByCategory(activeCategory)
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/80 text-white py-20 lg:py-24 relative overflow-hidden"
        aria-labelledby="blog-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">Blog</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              Insights & Resources
            </p>
            <h1
              id="blog-hero-heading"
              className="text-white text-4xl lg:text-5xl font-black leading-tight mb-5"
            >
              Networking Knowledge for Local Business Owners
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Practical articles on referral strategy, relationship building, and business
              growth — from the people who run ThinkBiz.Solutions chapters week after week.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY FILTERS ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30" role="navigation" aria-label="Blog category filters">
        <div className="container-site">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none -mx-2 px-2">
            {BLOG_CATEGORIES.map((category) => {
              const isActive = category === activeCategory
              return (
                <Link
                  key={category}
                  href={category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Filter blog posts by ${category}`}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── BLOG CONTENT ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-slate-50" aria-labelledby="blog-list-heading">
        <div className="container-site">
          <h2 id="blog-list-heading" className="sr-only">
            {activeCategory === 'All' ? 'All Articles' : `Articles in ${activeCategory}`}
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No articles found in this category yet.</p>
              <Link href="/blog" className="btn-primary text-sm">
                View All Articles
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured post */}
              {featuredPost && (
                <div aria-label="Featured article">
                  <BlogCard post={featuredPost} featured />
                </div>
              )}

              {/* Post grid */}
              {remainingPosts.length > 0 && (
                <div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  aria-label="More articles"
                >
                  {remainingPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER CTA ───────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-gray-100" aria-labelledby="newsletter-heading">
        <div className="container-site max-w-2xl mx-auto text-center">
          <h2 id="newsletter-heading" className="text-secondary text-2xl font-black mb-3">
            Want Networking Tips Delivered to Your Inbox?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We write about referral strategy, business relationship building, and local
            entrepreneurship. No fluff, no spam.
          </p>
          <Link href="/contact" className="btn-primary" aria-label="Contact us to subscribe to the ThinkBiz newsletter">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
