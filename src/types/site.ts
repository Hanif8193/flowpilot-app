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
