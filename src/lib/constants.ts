export const SITE_CONFIG = {
  name: 'ThinkBiz.Solutions',
  tagline: 'Business Networking That Works for You',
  description:
    'ThinkBiz.Solutions is an affordable business networking and referral club organization in Oklahoma City. Get the quality of top-tier networking without the premium price.',
  url: 'https://thinkbiz.solutions',
  email: 'team@thinkbiz.solutions',
  phone: '405-367-9874',
  phoneHref: 'tel:+14053679874',
  address: {
    street: '3810 N Tulsa Ave',
    city: 'Oklahoma City',
    state: 'OK',
    zip: '73112',
    full: '3810 N Tulsa Ave, Oklahoma City, OK 73112',
  },
  social: {
    facebook: 'https://www.facebook.com/thinkbiz.s',
    linkedin: 'https://www.linkedin.com/company/thinkbizsolutions/',
    instagram: 'https://www.instagram.com/thinkbiz.solutions/',
  },
  logo: {
    horizontal: '/assets/logos/thinkbiz-horizontal-logo.svg',
    stacked: '/assets/logos/thinkbiz-stacked-logo.svg',
    stackedWhite: '/assets/logos/thinkbiz-stacked-logo-white.svg',
    emblem: '/assets/logos/thinkbiz-emblem-logo.svg',
    favicon: '/assets/logos/thinkbiz-favicon.svg',
  },
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const

export const BLOG_CATEGORIES = [
  'All',
  'Business Growth',
  'Networking Tips',
  'Member Stories',
  'Leadership',
  'Local Business',
  'Referrals',
] as const

export const DEFAULT_OG_IMAGE = '/assets/logos/thinkbiz-stacked-logo.svg'
