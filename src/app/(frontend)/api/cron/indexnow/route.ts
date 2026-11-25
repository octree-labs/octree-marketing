import { NextRequest, NextResponse } from 'next/server'

import { fetchSitemapEntries, selectRecentUrls, submitToIndexNow } from '@/utilities/indexNow'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const HOST = 'www.useoctree.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const WINDOW_DAYS = 3

/**
 * Daily Vercel cron (vercel.json): submits sitemap URLs whose lastmod is within
 * the last 3 days to IndexNow. Vercel sends `Authorization: Bearer $CRON_SECRET`.
 *
 * Query flags for a manual run with the same header:
 * - `?all=1` also submits URLs without a lastmod (first run / backfill)
 * - `?dry=1` lists what would be sent without sending it
 * Only production submits; other environments behave like `dry=1`.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 })
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = request.nextUrl.searchParams
  const includeUndated = params.get('all') === '1'
  const dryRun = params.get('dry') === '1' || process.env.VERCEL_ENV !== 'production'

  try {
    const entries = await fetchSitemapEntries(SITEMAP_URL)
    const urls = selectRecentUrls(entries, { host: HOST, days: WINDOW_DAYS, includeUndated })
    if (urls.length === 0 || dryRun) {
      console.log(`[indexnow] ${entries.length} sitemap URLs, ${urls.length} selected, dryRun=${dryRun}`)
      return NextResponse.json({ sitemapUrls: entries.length, selected: urls.length, submitted: false, urls })
    }
    const result = await submitToIndexNow({ host: HOST, urls })
    console.log(`[indexnow] ${entries.length} sitemap URLs, submitted ${urls.length}, IndexNow HTTP ${result.status}`)
    return NextResponse.json({
      sitemapUrls: entries.length,
      selected: urls.length,
      submitted: result.status >= 200 && result.status < 300,
      indexNowStatus: result.status,
      indexNowBody: result.body || undefined,
    })
  } catch (error) {
    console.error(`[indexnow] failed: ${(error as Error).message}`)
    return NextResponse.json({ error: (error as Error).message }, { status: 502 })
  }
}
