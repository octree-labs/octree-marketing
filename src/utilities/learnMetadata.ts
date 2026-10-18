import type { Metadata } from 'next'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

/** Google truncates descriptions at roughly this many characters. */
export const MAX_DESCRIPTION_LENGTH = 155

export interface LearnPageMeta {
  /** URL segment under /learn, e.g. 'footnotes'. */
  slug: string
  /** Full page title (matches the H1 / og:title). */
  title: string
  /** Shorter <title> for SERPs when `title` + ' | Octree' would exceed 60 characters. */
  seoTitle?: string
  description: string
  keywords: string
  /** Title to render on the OG card when it should differ from `title`. */
  ogTitle?: string
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Cut a description to `max` characters on a word boundary. Trailing
 * punctuation is dropped and an ellipsis added unless the cut lands on a
 * sentence end.
 */
export const truncateDescription = (text: string, max = MAX_DESCRIPTION_LENGTH): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean

  // Leave room for the ellipsis.
  let cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  if (lastSpace > 0) cut = cut.slice(0, lastSpace)
  cut = cut.replace(/[\s,;:(\-–—]+$/, '')

  return /[.!?]$/.test(cut) ? cut : `${cut}…`
}

/** Path (no origin) of the dynamic OG card for a learn guide. */
export const learnOgImagePath = (title: string, eyebrow?: string): string => {
  const params = new URLSearchParams({ title })
  if (eyebrow) params.set('eyebrow', eyebrow)
  return `/api/og?${params.toString()}`
}

/** Absolute URL of the OG card, for structured data. */
export const learnOgImageUrl = (title: string, eyebrow?: string): string =>
  `${getServerSideURL()}${learnOgImagePath(title, eyebrow)}`

/**
 * Full Metadata object for a /learn guide. The root layout's title template
 * appends " | Octree", so the title returned here must not carry the brand.
 */
export const learnMetadata = ({
  slug,
  title,
  seoTitle,
  description,
  keywords,
  ogTitle,
}: LearnPageMeta): Metadata => {
  const url = `/learn/${slug}`
  const shortDescription = truncateDescription(description)
  const image = {
    url: learnOgImagePath(ogTitle ?? title),
    width: 1200,
    height: 630,
    alt: title,
  }

  return {
    title: seoTitle ?? title,
    description: shortDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: mergeOpenGraph({
      title,
      description: shortDescription,
      type: 'article',
      url,
      images: [image],
    }),
    twitter: {
      card: 'summary_large_image',
      title: seoTitle ?? title,
      description: shortDescription,
      images: [image],
    },
  }
}

/**
 * TechArticle JSON-LD for a /learn guide.
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
export const generateLearnArticleSchema = ({
  slug,
  title,
  description,
  dateModified,
  datePublished,
}: {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. '2026-10-17'. */
  dateModified: string
  datePublished?: string
}) => {
  const siteUrl = getServerSideURL()
  const url = `${siteUrl}/learn/${slug}`
  const organization = {
    '@type': 'Organization',
    name: 'Octree',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/favicon.svg`,
    },
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: learnOgImageUrl(title),
    datePublished: datePublished ?? dateModified,
    dateModified,
    inLanguage: 'en',
    author: organization,
    publisher: organization,
  }
}

/**
 * FAQPage JSON-LD. Only emit it for pages that visibly show the same
 * questions and answers.
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export const generateFaqSchema = (faq: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})
