import { describe, expect, it } from 'vitest'

import { INDEXNOW_KEY, parseSitemap, selectRecentUrls } from '@/utilities/indexNow'

const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.useoctree.com/learn/tables</loc><lastmod>2026-11-24T10:00:00.000Z</lastmod></url>
  <url><loc>https://www.useoctree.com/blog/old-post</loc><lastmod>2025-10-17T23:48:31.057Z</lastmod></url>
  <url><loc>https://www.useoctree.com/about?a=1&amp;b=2</loc></url>
  <url><loc>https://other.example.com/page</loc><lastmod>2026-11-24T10:00:00.000Z</lastmod></url>
</urlset>`

describe('IndexNow helpers', () => {
  it('uses a 32-character hex key', () => {
    expect(INDEXNOW_KEY).toMatch(/^[0-9a-f]{32}$/)
  })

  it('parses a sitemap index', () => {
    const index = parseSitemap(
      '<sitemapindex><sitemap><loc>https://www.useoctree.com/pages-sitemap.xml</loc></sitemap></sitemapindex>',
    )
    expect(index).toEqual({
      isIndex: true,
      entries: [{ loc: 'https://www.useoctree.com/pages-sitemap.xml', lastmod: undefined }],
    })
  })

  it('selects only recent URLs on the host', () => {
    const { entries } = parseSitemap(urlset)
    const now = new Date('2026-11-25T12:00:00Z')
    expect(selectRecentUrls(entries, { host: 'www.useoctree.com', days: 3, now })).toEqual([
      'https://www.useoctree.com/learn/tables',
    ])
    expect(
      selectRecentUrls(entries, { host: 'www.useoctree.com', days: 3, now, includeUndated: true }),
    ).toEqual(['https://www.useoctree.com/learn/tables', 'https://www.useoctree.com/about?a=1&b=2'])
  })
})
