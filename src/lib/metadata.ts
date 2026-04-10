import type { Metadata } from 'next'
import { SITE_CONFIG } from './constants'

interface PageMetadataOptions {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const resolvedOgImage = ogImage ?? `${SITE_CONFIG.url}/og-default.png`
  const resolvedCanonical = canonical ? `${SITE_CONFIG.url}${canonical}` : undefined

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: resolvedCanonical ? { canonical: resolvedCanonical } : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: resolvedCanonical ?? SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: ogTitle ?? title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [resolvedOgImage],
    },
  }
}

export function buildArticleMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  publishedTime,
  modifiedTime,
  authorName,
  tags,
}: PageMetadataOptions & {
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  tags?: string[]
}): Metadata {
  const base = buildMetadata({ title, description, ogTitle, ogDescription, ogImage, canonical })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authorName ? [authorName] : undefined,
      tags,
    },
  }
}
