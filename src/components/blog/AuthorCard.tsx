import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/types/blog'

interface AuthorCardProps {
  author: Author
  compact?: boolean
}

export function AuthorCard({ author, compact = false }: AuthorCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3" aria-label={`Article by ${author.name}`}>
        <Link
          href={`/blog/author/${author.slug}`}
          className="shrink-0"
          aria-label={`View ${author.name}'s author profile`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-primary/20">
            <Image
              src={author.avatar}
              alt={`${author.name}, ${author.role}`}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div>
          <Link
            href={`/blog/author/${author.slug}`}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors block"
          >
            {author.name}
          </Link>
          <p className="text-xs text-gray-400">{author.role}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-slate-50 rounded-xl p-6 border border-gray-100"
      aria-label={`About the author: ${author.name}`}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <Link
          href={`/blog/author/${author.slug}`}
          className="shrink-0 mx-auto sm:mx-0"
          aria-label={`View ${author.name}'s full author profile`}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 ring-4 ring-primary/20">
            <Image
              src={author.avatar}
              alt={`${author.name}, ${author.role} at ThinkBiz.Solutions`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Written By</p>
          <Link
            href={`/blog/author/${author.slug}`}
            className="text-secondary font-bold text-lg hover:text-primary transition-colors"
          >
            {author.name}
          </Link>
          <p className="text-primary text-sm font-medium mb-3">{author.role}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{author.shortBio}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
              aria-label={`${author.name} on LinkedIn (opens in new tab)`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <Link
              href={`/blog/author/${author.slug}`}
              className="btn-ghost text-xs py-1.5 px-3"
              aria-label={`Read all articles by ${author.name}`}
            >
              Full Bio & Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
