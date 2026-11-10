import type { Metadata } from 'next/types'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { InlineCode } from '@/components/Learn/inline-code'
import { LearnSchema } from '@/components/Learn/schema'
import { OpenInOctree } from '@/components/OpenInOctree'
import {
  getLatexError,
  latexErrorAppUrl,
  latexErrorGroups,
  latexErrors,
  stripCodeMarkup,
} from '@/data/latex-errors'
import { generateBreadcrumbSchema } from '@/utilities/generateBreadcrumbs'
import { learnMetadata } from '@/utilities/learnMetadata'

export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 3600

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

type Args = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return latexErrors.map(({ slug }) => ({ slug }))
}

export default async function LatexErrorPage({ params }: Args) {
  const { slug } = await params
  const entry = getLatexError(slug)
  if (!entry) notFound()

  const group = latexErrorGroups.find((g) => g.id === entry.group)
  const related = entry.related
    .map((s) => getLatexError(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
  const faq = entry.faq.map(({ question, answer }) => ({
    question: stripCodeMarkup(question),
    answer: stripCodeMarkup(answer),
  }))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Learn', url: '/learn' },
    { name: 'LaTeX Errors', url: '/learn/errors' },
    { name: entry.shortName, url: `/learn/errors/${entry.slug}` },
  ])
  const kind = entry.severity === 'warning' ? 'warning' : 'error'

  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LearnSchema
        slug={`errors/${entry.slug}`}
        title={entry.title}
        description={stripCodeMarkup(entry.description)}
        dateModified={LAST_UPDATED}
        faq={faq}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/learn/errors"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← All LaTeX errors and warnings
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground !mb-2">
            LaTeX {kind}
            {group ? ` · ${group.title}` : ''}
          </p>
          <h1 className="break-words">{entry.message}</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Quick answer
            </p>
            <p className="text-base leading-relaxed [&_code]:text-sm [&_code]:font-mono">
              <InlineCode text={entry.quickAnswer} />
            </p>
          </div>

          <h2>The {kind} in the log</h2>
          <p>
            This is how the message appears in the <code>.log</code> file (and in the compile
            output). The line starting with <code>l.</code> is the line number where TeX noticed
            the problem; the real mistake is there or just before it.
          </p>
          <pre><code>{entry.log}</code></pre>

          <h2>Why it happens</h2>
          <ul>
            {entry.causes.map((cause, i) => (
              <li key={i}>
                <InlineCode text={cause} />
              </li>
            ))}
          </ul>

          <h2>How to fix it</h2>
          {entry.fix.map((paragraph, i) => (
            <p key={i}>
              <InlineCode text={paragraph} />
            </p>
          ))}
          <h3>Broken: reproduces the {kind}</h3>
          <pre><code>{entry.broken}</code></pre>
          <OpenInOctree
            latex={entry.broken}
            title={entry.shortName}
            source={`www:learn:errors:${entry.slug}`}
            label="Open the broken example"
            raw
          />
          <h3>Fixed: compiles cleanly</h3>
          <pre><code>{entry.fixed}</code></pre>

          {entry.variants?.map((variant) => (
            <React.Fragment key={variant.message}>
              <h2 className="break-words">{variant.message}</h2>
              {variant.log && <pre><code>{variant.log}</code></pre>}
              {variant.text.map((paragraph, i) => (
                <p key={i}>
                  <InlineCode text={paragraph} />
                </p>
              ))}
            </React.Fragment>
          ))}

          {entry.blogPost && (
            <p>
              For a longer walkthrough with more examples, read{' '}
              <Link href={entry.blogPost.href}>{entry.blogPost.title}</Link> on the blog.
            </p>
          )}

          <h2>Related errors</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/learn/errors/${r.slug}`}>{r.shortName}</Link> &ndash;{' '}
                <InlineCode text={r.summary} />
              </li>
            ))}
            <li>
              <Link href="/learn/errors">All LaTeX errors and warnings</Link> &ndash; The full
              list, grouped by cause
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          {entry.faq.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3>
                <InlineCode text={question} />
              </h3>
              <p>
                <InlineCode text={answer} />
              </p>
            </React.Fragment>
          ))}

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">
              Paste your document into Octree — compile errors get a Fix with AI button
            </h3>
            <p className="text-muted-foreground mb-4">
              When a compile fails, Octree shows the error next to the line that caused it and
              offers a one-click fix that you can review before applying. Free, nothing to
              install.
            </p>
            <Link
              href={latexErrorAppUrl(entry.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Fix it in Octree →
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const entry = getLatexError(slug)
  if (!entry) return {}

  const metadata = learnMetadata({
    slug: `errors/${entry.slug}`,
    title: entry.title,
    description: stripCodeMarkup(entry.description),
    keywords: entry.keywords,
  })
  // The root template appends " | Octree"; drop it when the title would pass 60 characters.
  return `${entry.title} | Octree`.length > 60
    ? { ...metadata, title: { absolute: entry.title } }
    : metadata
}
