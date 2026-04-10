import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog-data'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export function GET() {
  const baseUrl = SITE_CONFIG.url
  const buildDate = new Date().toUTCString()

  const items = BLOG_POSTS.map((post) => {
    const pubDate = new Date(post.updatedAt ?? post.publishedAt).toUTCString()
    const categories = post.categories
      .map((cat) => `<category><![CDATA[${cat}]]></category>`)
      .join('')

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author.name}]]></author>
      ${categories}
      <enclosure url="${baseUrl}${post.featureImage}" type="image/svg+xml" />
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_CONFIG.name} Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Practical insights on business networking, referral marketing, and professional growth from ThinkBiz.Solutions.</description>
    <language>en-US</language>
    <copyright>Copyright ${new Date().getFullYear()} ${SITE_CONFIG.name}</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/assets/logos/thinkbiz-horizontal-logo.svg</url>
      <title>${SITE_CONFIG.name} Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
