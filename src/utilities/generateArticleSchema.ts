import type { Blog } from '../payload-types'

import { getImageURL } from './generateMeta'
import { getServerSideURL } from './getURL'

/**
 * BlogPosting structured data for a blog post, so Google can show article
 * rich results (headline, date, author, image) for the posts that drive most
 * of the site's organic traffic.
 */
export const generateArticleSchema = (post: Blog) => {
  const siteUrl = getServerSideURL()
  const url = `${siteUrl}/blog/${post.slug}`

  const authors = (post.populatedAuthors || [])
    .map((author) => author?.name)
    .filter((name): name is string => Boolean(name))
    .map((name) => ({ '@type': 'Person', name }))

  const image = post.meta?.image || post.heroImage

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta?.description || undefined,
    image: getImageURL(image),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: authors.length > 0 ? authors : { '@type': 'Organization', name: 'Octree', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Octree',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
  }
}
