export interface Author {
  id: string
  name: string
  slug: string
  bio: string
  shortBio: string
  avatar: string
  linkedin: string
  role: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featureImage: string
  featureImageAlt: string
  author: Author
  publishedAt: string
  updatedAt?: string
  categories: string[]
  tags: string[]
  readTime: number
  viewCount: number
  relatedSlugs?: string[]
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}
