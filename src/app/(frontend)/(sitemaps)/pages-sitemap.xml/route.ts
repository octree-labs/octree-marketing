import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL().replace(/\/$/, '')

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/blog`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/docs/compile-api`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/latex`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/tikz`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/pgfplots`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/bold-italics-underline`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/page-size-margins`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/subscripts-superscripts`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/lists`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/greek-letters-math-symbols`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/colors`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/mathematical-expressions`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/integrals-sums-limits`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/matrices`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/learn/tables`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/privacy`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/terms`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
