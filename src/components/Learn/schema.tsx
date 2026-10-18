import React from 'react'

import {
  generateFaqSchema,
  generateLearnArticleSchema,
  type FaqItem,
} from '@/utilities/learnMetadata'

interface LearnSchemaProps {
  slug: string
  title: string
  description: string
  /** ISO date of the last content update, e.g. '2026-10-17'. */
  dateModified: string
  datePublished?: string
  /** Questions and answers that are visibly rendered on the page. */
  faq?: FaqItem[]
}

/**
 * TechArticle (and, when the page has a visible FAQ section, FAQPage) JSON-LD
 * for a /learn guide. Render next to the breadcrumb JSON-LD.
 */
export const LearnSchema: React.FC<LearnSchemaProps> = ({
  slug,
  title,
  description,
  dateModified,
  datePublished,
  faq,
}) => {
  const articleSchema = generateLearnArticleSchema({
    slug,
    title,
    description,
    dateModified,
    datePublished,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faq && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faq)) }}
        />
      )}
    </>
  )
}
