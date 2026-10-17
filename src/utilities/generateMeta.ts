import type { Metadata } from 'next'

import type { Media, Page, Blog, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

export const DEFAULT_DESCRIPTION =
  'The open-source LaTeX editor that makes academic writing feel natural and effortless. Write faster with AI assistance, real-time collaboration, and beautiful templates.'

export const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

/**
 * The SEO plugin's generateTitle already appends " | Octree" to CMS titles, and
 * the root layout applies a "%s | Octree" template. Strip any brand suffix the
 * CMS stored so the final title carries the brand exactly once.
 */
const stripBrandSuffix = (title: string) =>
  title.replace(/\s*[|–-]\s*Octree(\s*[|–-]\s*AI LaTeX Editor)?\s*$/i, '').trim()

export const getDocPath = (doc: Partial<Page> | Partial<Blog> | null, basePath = '') => {
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  if (!slug || slug === 'home') return basePath || '/'
  return `${basePath}/${slug}`
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Blog> | null
  /** URL prefix for the collection, e.g. '/blog' for posts. */
  basePath?: string
}): Promise<Metadata> => {
  const { doc, basePath = '' } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const path = getDocPath(doc, basePath)
  const isHome = path === '/'

  const rawTitle = doc?.meta?.title || doc?.title
  const title = rawTitle && !isHome ? stripBrandSuffix(rawTitle) : 'Octree – AI LaTeX Editor'
  const description = doc?.meta?.description || DEFAULT_DESCRIPTION

  return {
    // The root layout template adds " | Octree"; the home page keeps its own title.
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: isHome ? title : `${title} | Octree`,
      url: path,
    }),
  }
}
