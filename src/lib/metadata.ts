import type { Metadata } from 'next'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'

export interface PageMetaInput {
  title: string
  description: string
  path: string
}

export function generatePageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = `${SITE_CONFIG.url}${path}`
  const ogImage = `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

interface WebSiteSchema {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  sameAs: string[]
  description?: string
}

type JsonLdSchema = WebSiteSchema | OrganizationSchema

export function buildJsonLd(type: 'WebSite'): string
export function buildJsonLd(type: 'Organization'): string
export function buildJsonLd(type: 'WebSite' | 'Organization'): string {
  let schema: JsonLdSchema

  if (type === 'WebSite') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      sameAs: SOCIAL_LINKS.map((link) => link.href),
      description: SITE_CONFIG.description,
    }
  }

  return JSON.stringify(schema)
}
