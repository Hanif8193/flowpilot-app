import type { SiteConfig, NavLink } from '@/types/site'

export const SITE_CONFIG: SiteConfig = {
  name: 'FlowPilot',
  tagline: 'AI-Powered Workflow Automation',
  description:
    'FlowPilot streamlines your development workflow with AI-powered automation. Build faster, deploy smarter.',
  url: 'https://flowpilot.app',
  ogImage: '/images/og-image.png',
  twitterHandle: '@flowpilot',
  locale: 'en_US',
  themeColor: '#6d28d9',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]
