import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from '@/lib/blog-data'
import { SITE_CONFIG } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { buildArticleMetadata } from '@/lib/metadata'
import { ArticleSchema, BreadcrumbSchema } from '@/components/ui/SchemaMarkup'
import { BlogCard } from '@/components/ui/BlogCard'
import { ScrollProgressBar } from '@/components/blog/ScrollProgressBar'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { CommentSection } from '@/components/blog/CommentSection'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const canonical = `/blog/${post.slug}`
  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    ogTitle: `${post.title} | ThinkBiz.Solutions Blog`,
    ogDescription: post.excerpt,
    ogImage: `${SITE_CONFIG.url}${post.featureImage}`,
    canonical,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authorName: post.author.name,
    tags: post.tags,
  })
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post)
  const articleUrl = `${SITE_CONFIG.url}/blog/${post.slug}`
  const displayDate = post.updatedAt ?? post.publishedAt
  const dateLabel = post.updatedAt ? 'Updated' : 'Published'

  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: articleUrl },
  ]

  // Parse markdown-style content to basic HTML
  const parseContent = (text: string): string => {
    return text
      .trim()
      .split('\n\n')
      .map((block) => {
        const trimmed = block.trim()
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.slice(3)
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
          return `<h2 id="${id}">${headingText}</h2>`
        }
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.slice(4)
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
          return `<h3 id="${id}">${headingText}</h3>`
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed
            .split('\n')
            .filter((l) => l.startsWith('- '))
            .map((l) => `<li>${l.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
            .join('')
          return `<ul>${items}</ul>`
        }
        if (/^\d+\./.test(trimmed)) {
          const items = trimmed
            .split('\n')
            .filter((l) => /^\d+\./.test(l))
            .map((l) => `<li>${l.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
            .join('')
          return `<ol>${items}</ol>`
        }
        const processed = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
        return `<p>${processed}</p>`
      })
      .join('\n')
  }

  const htmlContent = parseContent(post.content)

  return (
    <>
      <ScrollProgressBar />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={articleUrl}
        image={`${SITE_CONFIG.url}${post.featureImage}`}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        authorName={post.author.name}
        authorUrl={`${SITE_CONFIG.url}/blog/author/${post.author.slug}`}
        tags={post.tags}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* ─── BREADCRUMB ───────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100">
        <div className="container-site py-3">
          <ol className="flex items-center gap-2 text-xs text-gray-400 flex-wrap" role="list">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-gray-600 truncate max-w-48 sm:max-w-none" aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* ─── ARTICLE HERO ─────────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="container-site py-10 max-w-5xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="badge-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
                aria-label={`Browse articles in ${cat}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-secondary text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
            {/* Author compact */}
            <AuthorCard author={post.author} compact />
            <span aria-hidden="true" className="hidden sm:block text-gray-200">|</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>
                <span className="sr-only">{dateLabel}: </span>
                <time dateTime={displayDate}>{dateLabel} {formatDate(displayDate)}</time>
              </span>
              <span aria-label={`Estimated read time: ${post.readTime} minutes`}>
                {post.readTime} min read
              </span>
              <span
                className="flex items-center gap-1 bg-primary/8 text-primary font-semibold px-2.5 py-0.5 rounded-full text-xs"
                aria-label={`${post.viewCount.toLocaleString()} article views`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {post.viewCount.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE IMAGE ────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-gray-100">
        <div className="container-site max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src={post.featureImage}
              alt={post.featureImageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
          </div>
        </div>
      </div>

      {/* ─── ARTICLE BODY ─────────────────────────────────────────────────────── */}
      <div className="bg-white py-12 lg:py-16">
        <div className="container-site max-w-5xl">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
            {/* Main content */}
            <article aria-label={post.title}>
              {/* Excerpt lead */}
              <p className="text-lg text-gray-600 leading-relaxed font-light border-l-4 border-accent pl-5 mb-8 italic">
                {post.excerpt}
              </p>

              {/* Article body */}
              <div
                id="article-content"
                className="prose-brand"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-100" aria-label="Article tags">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author card (bottom) */}
              <div className="mt-10">
                <AuthorCard author={post.author} />
              </div>

              {/* Comments */}
              <CommentSection postSlug={post.slug} />
            </article>

            {/* Sidebar */}
            <aside
              className="hidden lg:block"
              aria-label="Article sidebar"
            >
              <div className="sticky top-28 space-y-6">
                <TableOfContents contentId="article-content" />
                <ShareButtons title={post.title} url={articleUrl} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ─── RELATED ARTICLES ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section
          className="bg-slate-50 py-12 lg:py-16 border-t border-gray-100"
          aria-labelledby="related-heading"
        >
          <div className="container-site">
            <h2 id="related-heading" className="text-secondary text-2xl font-bold mb-8">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary text-white py-16" aria-labelledby="blog-cta-heading">
        <div className="container-site max-w-2xl mx-auto text-center">
          <h2 id="blog-cta-heading" className="text-white text-2xl font-black mb-4">
            Ready to Start Building Referral Relationships?
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            Join a ThinkBiz.Solutions chapter in Oklahoma City and turn great networking into real business growth.
          </p>
          <Link href="/contact" className="btn-accent" aria-label="Apply to join ThinkBiz.Solutions">
            Apply to Join
          </Link>
        </div>
      </section>
    </>
  )
}
