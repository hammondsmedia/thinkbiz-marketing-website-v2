'use client'

import { useEffect, useState, useRef } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentId: string
}

export function TableOfContents({ contentId }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const content = document.getElementById(contentId)
    if (!content) return

    const headings = content.querySelectorAll<HTMLHeadingElement>('h2, h3')
    const tocItems: TocItem[] = []

    headings.forEach((heading, i) => {
      if (!heading.id) {
        heading.id = `toc-heading-${i}`
      }
      tocItems.push({
        id: heading.id,
        text: heading.textContent ?? '',
        level: parseInt(heading.tagName[1]),
      })
    })

    setItems(tocItems)

    // Intersection Observer to track active section
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    )

    headings.forEach((h) => observerRef.current?.observe(h))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [contentId])

  if (items.length === 0) return null

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.focus({ preventScroll: true })
    }
  }

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
        In This Article
      </h2>
      <ol className="space-y-0.5" role="list">
        {items.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '0.75rem' : '0' }}>
            <button
              type="button"
              onClick={() => handleClick(id)}
              className={`toc-link w-full text-left ${activeId === id ? 'active' : ''}`}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
