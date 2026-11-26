import type { Metadata } from 'next/types'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { LearnSchema } from '@/components/Learn/schema'
import { KEY_FEATURES, KNOWN_LIMITS, OCTREE_SUMMARY, PRICING_LINES, SITE_LINKS } from '@/data/octree-facts'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'

export const dynamic = 'force-static'
export const revalidate = 3600

const page = {
  slug: 'what-is-octree',
  title: 'What is Octree? The AI LaTeX Editor, Explained',
  seoTitle: 'What is Octree? AI LaTeX Editor Explained',
  description:
    'Octree is a browser-based AI LaTeX editor: the AI proposes edits you accept or reject, and documents compile to PDF with TeX Live. Free plan; Pro $9.99/month.',
  keywords:
    'what is octree, octree latex, octree ai latex editor, ai latex editor, octree pricing, octree review',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'

const faq: FaqItem[] = [
  {
    question: 'Is Octree free?',
    answer:
      'Yes. The free plan includes 5 AI edits per day, unlimited projects and files, and PDF compiling and preview. Pro costs $9.99 a month (or $79 a year, or $29 for a 4-month semester pass) and adds 500 AI edits a month, AI document generation and PDF/ZIP export. Lower regional prices apply automatically in many countries.',
  },
  {
    question: 'Do I need to install LaTeX to use Octree?',
    answer:
      'No. Octree runs in the browser and compiles on a server with TeX Live and latexmk. It picks pdfLaTeX, XeLaTeX or LuaLaTeX automatically and runs BibTeX or Biber for bibliographies.',
  },
  {
    question: 'Can I move an Overleaf project to Octree?',
    answer:
      'Yes. Download the project from Overleaf as a ZIP (Menu, Download, Source) and upload it when you create a project in Octree. The ZIP works as-is, up to 50 MB.',
  },
  {
    question: 'Does Octree support real-time collaboration?',
    answer:
      'Not yet. Octree is currently a single-author editor; real-time collaboration is listed as coming soon. If several people need to edit the same document at once today, Overleaf is the better fit.',
  },
  {
    question: 'Is Octree open source?',
    answer:
      'Yes. The editor is open source under the LGPL-3.0 licence at github.com/octree-labs/octree.',
  },
  {
    question: 'Can AI agents use Octree?',
    answer:
      'Yes. Octree has a LaTeX compile REST API and a remote MCP server, so tools such as Claude Code or Cursor can compile LaTeX to PDF and check it for errors. MCP clients connect by signing in to Octree (OAuth), with no API key needed; scripts can use an API key. The free plan allows 30 API compiles a day.',
  },
]

export default async function LearnPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LearnSchema
        slug={page.slug}
        title={page.title}
        description={page.description}
        datePublished={LAST_UPDATED}
        dateModified={LAST_UPDATED}
        faq={faq}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>{page.title}</h1>
          <p className="lead">
            {OCTREE_SUMMARY} It has a free plan with 5 AI edits a day; Pro costs $9.99 a month.
          </p>

          <h2>Who Octree is for</h2>
          <p>
            Octree is for students, researchers and engineers who write in LaTeX: papers, theses,
            lab reports, resumes and Beamer slides. It helps most when you know what the document
            should look like but not the exact command, when a compile error blocks you, or when a
            change touches many lines at once, such as converting a list into a table or
            renumbering equations.
          </p>

          <h2>What the AI does</h2>
          <ul>
            {KEY_FEATURES.slice(0, 2).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
            <li>
              Fix with AI: when a compile fails, one click sends the error from the log to the
              assistant, which proposes a fix. See the{' '}
              <Link href="/learn/errors">LaTeX errors reference</Link> for what the common messages
              mean.
            </li>
          </ul>
          <p>
            Edits are shown as suggestions in the source, so nothing changes until you accept it.
            The assistant uses Anthropic&apos;s Claude models.
          </p>

          <h2>Compiling, preview and import</h2>
          <ul>
            {KEY_FEATURES.slice(2, 5).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <h2>Pricing</h2>
          <ul>
            {PRICING_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>
            Prices are in US dollars and can change; the{' '}
            <Link href="/">pricing on the homepage</Link> and the billing screen in
            the app are authoritative.
          </p>

          <h2>What Octree does not do yet</h2>
          <ul>
            {KNOWN_LIMITS.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
          <p>
            For a side-by-side view, read <Link href="/learn/octree-vs-overleaf">Octree vs
            Overleaf</Link> and the roundup of the{' '}
            <Link href="/learn/best-ai-latex-editors">best AI LaTeX editors in 2026</Link>.
          </p>

          <h2>Free tools and templates</h2>
          <p>
            The free tools at <a href={SITE_LINKS.tools}>tools.useoctree.com</a> work without an
            account and are available in 16 languages:
          </p>
          <ul>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/math-to-latex`}>Math to LaTeX</a>: turn a photo or
              screenshot of an equation into LaTeX.
            </li>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/image-to-tikz`}>Image to TikZ</a>: recreate a
              diagram as editable TikZ code.
            </li>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/latex-preview`}>LaTeX preview</a>: paste LaTeX and
              compile it to a PDF.
            </li>
            <li>
              <a href={SITE_LINKS.templates}>LaTeX templates</a>: resumes, theses, papers, reports
              and presentations that open in the editor.
            </li>
          </ul>

          <h2>For developers and AI agents</h2>
          <p>
            {KEY_FEATURES[5]} The{' '}
            <Link href="/developers">developer documentation</Link> covers the REST API, the MCP
            tools and the daily limits. The source code is at{' '}
            <a href={SITE_LINKS.github}>github.com/octree-labs/octree</a>.
          </p>

          <h2>Frequently asked questions</h2>
          {faq.map(({ question, answer }) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Try Octree on your own document</h2>
            <p className="text-muted-foreground mb-4">
              Create a free account, upload a .tex file or an Overleaf ZIP, and ask the assistant for
              the change you would otherwise look up.
            </p>
            <Link
              href={SITE_LINKS.signUp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Try Octree Free →
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return learnMetadata(page)
}
