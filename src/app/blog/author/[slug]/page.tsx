import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AUTHORS, getAuthorBySlug, getPostsByAuthor } from '@/lib/blog-data'
import { SITE_CONFIG } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'
import { BlogCard } from '@/components/ui/BlogCard'
import { BreadcrumbSchema } from '@/components/ui/SchemaMarkup'

interface AuthorPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug)
  if (!author) return {}

  return buildMetadata({
    title: `${author.name} — Author`,
    description: author.shortBio,
    ogTitle: `${author.name} | ${author.role} at ThinkBiz.Solutions`,
    ogDescription: author.bio.slice(0, 160),
    canonical: `/blog/author/${author.slug}`,
  })
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug)
  if (!author) notFound()

  const posts = getPostsByAuthor(author.slug)
  const authorUrl = `${SITE_CONFIG.url}/blog/author/${author.slug}`

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: author.name, url: authorUrl },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ─── AUTHOR HERO ──────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-secondary to-primary/70 text-white py-20 relative overflow-hidden"
        aria-labelledby="author-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-blue-200" role="list">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li aria-hidden="true"><span>/</span></li>
              <li className="text-white font-medium" aria-current="page">{author.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white/10 ring-4 ring-accent/40 shrink-0">
              <Image
                src={author.avatar}
                alt={`${author.name}, ${author.role} at ThinkBiz.Solutions`}
                width={112}
                height={112}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Author Profile</p>
              <h1
                id="author-heading"
                className="text-white text-3xl lg:text-4xl font-black leading-tight mb-2"
              >
                {author.name}
              </h1>
              <p className="text-primary-200 font-semibold text-lg mb-4">{author.role}</p>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-accent text-sm py-2 px-4"
                aria-label={`${author.name} on LinkedIn (opens in new tab)`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BIO & ARTICLES ───────────────────────────────────────────────────── */}
      <div className="bg-white py-12 lg:py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-start">
            {/* Bio */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-secondary text-xl font-bold mb-4">About {author.name}</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                {author.bio.split('\n').filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Articles */}
            <div>
              <h2 className="text-secondary text-xl font-bold mb-6">
                Articles by {author.name}
                <span className="ml-2 text-sm font-normal text-gray-400">({posts.length})</span>
              </h2>
              {posts.length === 0 ? (
                <p className="text-gray-500 text-sm">No articles published yet.</p>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
