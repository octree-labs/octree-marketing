const normalizeSiteUrl = (rawUrl) => {
  if (!rawUrl) return 'https://www.useoctree.com'

  const withScheme = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `https://${rawUrl}`

  // Strip trailing slash for consistent concatenation
  return withScheme.replace(/\/$/, '')
}

const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'https://www.useoctree.com',
)

// Crawlers for AI assistants (ChatGPT search, Claude, Perplexity, Gemini,
// Apple Intelligence, Copilot via Bing) that we want to read and cite the site.
const AI_AND_SEARCH_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
]

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/blogs-sitemap.xml', '/pages-sitemap.xml', '/llms.txt', '/llms-full.txt'],
  robotsTxtOptions: {
    // A crawler follows only the most specific group that names it, so each
    // named AI/search crawler repeats the disallows of the * group.
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      ...AI_AND_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/admin/*',
      })),
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/blogs-sitemap.xml`],
  },
}
