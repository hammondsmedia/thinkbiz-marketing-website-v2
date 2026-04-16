import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { BLOG_POSTS, AUTHORS } from '@/lib/blog-data'
import { CLUBS, CLUB_MEMBERS } from '@/lib/club-data'
import { EVENTS } from '@/lib/event-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const authorPages: MetadataRoute.Sitemap = AUTHORS.map((author) => ({
    url: `${baseUrl}/blog/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const networkingGroupsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/networking-groups`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...CLUBS.map((club) => ({
      url: `${baseUrl}/networking-groups/${club.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]

  const memberPages: MetadataRoute.Sitemap = CLUB_MEMBERS.map((member) => ({
    url: `${baseUrl}/club-members/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const eventPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...EVENTS.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: new Date(event.startDate),
      changeFrequency: 'weekly' as const,
      priority: event.status === 'upcoming' ? 0.8 : 0.5,
    })),
  ]

  return [...staticPages, ...blogPages, ...authorPages, ...networkingGroupsPages, ...memberPages, ...eventPages]
}
