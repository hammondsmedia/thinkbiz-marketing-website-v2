import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const displayDate = post.updatedAt ? post.updatedAt : post.publishedAt
  const dateLabel = post.updatedAt ? 'Updated' : 'Published'

  if (featured) {
    return (
      <article className="card-base group overflow-hidden lg:grid lg:grid-cols-2 lg:gap-0">
        <div className="relative overflow-hidden bg-slate-100 aspect-video lg:aspect-auto lg:min-h-72">
          <Image
            src={post.featureImage}
            alt={post.featureImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="p-7 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.categories.slice(0, 2).map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="badge-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
            <span>
              <span className="sr-only">{dateLabel}: </span>
              <time dateTime={displayDate}>{formatDate(displayDate)}</time>
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
            <span aria-hidden="true">·</span>
            <span aria-label={`${post.viewCount.toLocaleString()} views`}>
              {post.viewCount.toLocaleString()} views
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="btn-outline mt-6 self-start text-sm py-2"
            aria-label={`Read article: ${post.title}`}
          >
            Read Article
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="card-base group overflow-hidden flex flex-col">
      <div className="relative overflow-hidden bg-slate-100 aspect-video">
        <Image
          src={post.featureImage}
          alt={post.featureImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {post.categories.slice(0, 2).map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="badge-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
        <h2 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
          <span>
            <time dateTime={displayDate}>{formatDate(displayDate)}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} min read</span>
          <span aria-hidden="true" className="ml-auto">·</span>
          <span aria-label={`${post.viewCount.toLocaleString()} views`}>
            {post.viewCount.toLocaleString()} views
          </span>
        </div>
      </div>
    </article>
  )
}
