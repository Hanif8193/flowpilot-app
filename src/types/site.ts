export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  ogImage: string
  twitterHandle: string
  locale: string
  themeColor: string
}

export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}

export interface SocialLink {
  label: string
  href: string
}
