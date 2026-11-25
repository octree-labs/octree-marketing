/**
 * Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the same
 * registries that render the site: the /learn hub, the LaTeX error reference,
 * the answer guides and the published blog posts. A new guide or post shows up
 * on the next build or revalidation without editing these files.
 */
import { latexErrors } from '@/data/latex-errors'
import { learnTopics } from '@/data/learn-topics'
import { apiReferenceMarkdown } from '@/data/llms-api-reference'
import {
  AGENT_CONNECT_LINES,
  answerPages,
  KEY_FEATURES,
  KNOWN_LIMITS,
  OCTREE_SUMMARY,
  OCTREE_SHORT_SUMMARY,
  PRICING_LINES,
  SITE_LINKS,
} from '@/data/octree-facts'

const WWW = SITE_LINKS.www

export interface BlogEntry {
  slug: string
  title: string
  description?: string
}

/** Strip the «code» markup used in data files and collapse whitespace. */
const clean = (text: string) => text.replace(/[«»]/g, '').replace(/\s+/g, ' ').trim()

const link = (title: string, url: string, description?: string) =>
  `- [${clean(title)}](${url})${description ? `: ${clean(description)}` : ''}`

const titleFromSlug = (slug: string) => {
  const words = slug.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`timed out after ${ms} ms`)), ms)),
  ])

async function blogsFromPayload(): Promise<BlogEntry[]> {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('@payload-config'),
  ])
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blogs',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
    select: { slug: true, title: true, meta: true },
  })
  return result.docs
    .filter((doc) => Boolean(doc.slug && doc.title))
    .map((doc) => ({
      slug: doc.slug as string,
      title: doc.title,
      description: doc.meta?.description ?? undefined,
    }))
}

/** Fallback when the CMS is unreachable (e.g. a local build without a database). */
async function blogsFromLiveSitemap(): Promise<BlogEntry[]> {
  const response = await fetch(`${WWW}/blogs-sitemap.xml`, { next: { revalidate: 86400 } })
  if (!response.ok) throw new Error(`blogs-sitemap.xml returned ${response.status}`)
  const xml = await response.text()
  return Array.from(xml.matchAll(/<loc>[^<]*\/blog\/([^<\s/]+)<\/loc>/g)).map(([, slug]) => ({
    slug: slug as string,
    title: titleFromSlug(slug as string),
  }))
}

/** Published blog posts, or an empty list: discovery files must never fail the build. */
export async function getBlogEntries(): Promise<BlogEntry[]> {
  try {
    return await withTimeout(blogsFromPayload(), 15000)
  } catch (error) {
    console.warn(`[llms] blog posts from Payload unavailable (${(error as Error).message}); trying the live sitemap`)
  }
  try {
    return await withTimeout(blogsFromLiveSitemap(), 10000)
  } catch (error) {
    console.warn(`[llms] blog posts skipped (${(error as Error).message})`)
    return []
  }
}

const guideLinks = () =>
  learnTopics.map(({ slug, title, description }) => link(title, `${WWW}/learn/${slug}`, description))

const errorLinks = () =>
  latexErrors.map(({ slug, title, description }) =>
    link(title, `${WWW}/learn/errors/${slug}`, description),
  )

const answerLinks = () =>
  answerPages.map(({ slug, title, description }) => link(title, `${WWW}/learn/${slug}`, description))

const blogLinks = (blogs: BlogEntry[]) =>
  blogs.map(({ slug, title, description }) => link(title, `${WWW}/blog/${slug}`, description))

const toolLinks = [
  link('Octree tools', SITE_LINKS.tools, 'Free LaTeX converters, PDF preview, templates and symbol reference (16 languages).'),
  link('Tools llms.txt', SITE_LINKS.toolsLlms, 'Every tool, template and symbol page on tools.useoctree.com.'),
  link('Tools llms-full.txt', SITE_LINKS.toolsLlmsFull, 'Longer descriptions of every tool and template.'),
  link('Math to LaTeX', `${SITE_LINKS.tools}/tools/math-to-latex`, 'Turn a photo or screenshot of handwritten or printed math into LaTeX.'),
  link('Image to TikZ', `${SITE_LINKS.tools}/tools/image-to-tikz`, 'Recreate a diagram image as editable TikZ code.'),
  link('LaTeX preview', `${SITE_LINKS.tools}/tools/latex-preview`, 'Paste LaTeX and compile it to a PDF preview without signing in.'),
  link('LaTeX templates', SITE_LINKS.templates, 'Free resume, thesis, paper, report and presentation templates.'),
]

const productLinks = [
  link('Octree editor', SITE_LINKS.app, 'Sign in to write, edit with AI and compile LaTeX to PDF.'),
  link('Sign up free', SITE_LINKS.signUp, 'Create a free account (5 AI edits a day).'),
  link('Website and pricing', WWW, 'Product overview and current plans.'),
  link('About', `${WWW}/about`, 'Why Octree exists.'),
  link('Developer documentation', `${WWW}/developers`, 'LaTeX compile REST API and MCP server for AI agents.'),
  link('Full reference', `${WWW}/llms-full.txt`, 'Pricing, features, the API reference and every guide with a description.'),
  link('Source code', SITE_LINKS.github, 'Octree is open source (LGPL-3.0).'),
  link('Contact', `${WWW}/contact`, 'Contact the Octree team.'),
]

export async function buildLlmsTxt(): Promise<string> {
  const blogs = await getBlogEntries()
  return [
    '# Octree',
    '',
    `> ${OCTREE_SHORT_SUMMARY} Free plan available; Pro is $9.99/month.`,
    '',
    'www.useoctree.com hosts the product site, LaTeX guides and blog. The editor is at app.useoctree.com and free LaTeX tools and templates are at tools.useoctree.com (available in 16 languages; this file lists the English pages).',
    '',
    '## Product',
    '',
    ...productLinks,
    '',
    '## For AI agents: compile LaTeX through Octree',
    '',
    ...AGENT_CONNECT_LINES.map((line) => `- ${line}`),
    '',
    '## About Octree and comparisons',
    '',
    ...answerLinks(),
    '',
    '## LaTeX guides',
    '',
    ...guideLinks(),
    '',
    '## LaTeX errors and warnings',
    '',
    ...errorLinks(),
    '',
    '## Tools and templates',
    '',
    ...toolLinks,
    ...(blogs.length > 0 ? ['', '## Optional', '', ...blogLinks(blogs)] : []),
    '',
  ].join('\n')
}

export async function buildLlmsFullTxt(): Promise<string> {
  const blogs = await getBlogEntries()
  return [
    '# Octree',
    '',
    `> ${OCTREE_SHORT_SUMMARY}`,
    '',
    '## What Octree is',
    '',
    OCTREE_SUMMARY,
    '',
    'It is built for students, researchers and engineers who write papers, theses, reports, resumes and slides in LaTeX and want help with syntax, errors and formatting without leaving the editor. The editor runs at https://app.useoctree.com; this site (https://www.useoctree.com) has the guides and blog; free tools and templates are at https://tools.useoctree.com (16 languages, see https://tools.useoctree.com/llms.txt).',
    '',
    '## Pricing',
    '',
    ...PRICING_LINES.map((line) => `- ${line}`),
    '',
    'Prices are in US dollars and can change; the website and the in-app billing screen are authoritative.',
    '',
    '## Key features',
    '',
    ...KEY_FEATURES.map((line) => `- ${line}`),
    '',
    '## Current limits',
    '',
    ...KNOWN_LIMITS.map((line) => `- ${line}`),
    '',
    '## About Octree and comparisons',
    '',
    ...answerLinks(),
    '',
    apiReferenceMarkdown.replace(/^# /, '## ').replace(/\n## /g, '\n### '),
    '',
    '## LaTeX guides',
    '',
    ...guideLinks(),
    '',
    '## LaTeX errors and warnings',
    '',
    ...errorLinks(),
    '',
    '## Tools and templates',
    '',
    ...toolLinks,
    ...(blogs.length > 0 ? ['', '## Blog posts', '', ...blogLinks(blogs)] : []),
    '',
  ].join('\n')
}

export const textResponse = (body: string) =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
