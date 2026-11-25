import type { Metadata } from 'next/types'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { LearnSchema } from '@/components/Learn/schema'
import { SITE_LINKS } from '@/data/octree-facts'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'

export const dynamic = 'force-static'
export const revalidate = 3600

const page = {
  slug: 'best-ai-latex-editors',
  title: 'Best AI LaTeX Editors (2026): Octree, Overleaf AI, Bibby, Prism',
  seoTitle: 'Best AI LaTeX Editors (2026), Compared',
  description:
    'The AI LaTeX editors worth using in 2026: Octree, Overleaf AI, Bibby, OpenAI Prism (closing January 2027) and a local editor with a coding agent, with prices and trade-offs.',
  keywords:
    'best ai latex editor, ai latex editor, ai latex, overleaf ai, openai prism, prism latex, bibby ai, latex ai assistant, ai for latex',
  ogTitle: 'Best AI LaTeX Editors (2026)',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'

interface Editor {
  name: string
  url: string
  bestFor: string
  ai: string
  price: string
  watchOut: string
}

/** Each entry is from the product's own site or announcement, checked on LAST_UPDATED. */
const editors: Editor[] = [
  {
    name: 'Octree',
    url: SITE_LINKS.www,
    bestFor: 'Writing alone with an AI that edits the LaTeX source for you.',
    ai: 'An assistant (Anthropic Claude models) that proposes line-level edits you accept or reject, generates complete documents from a prompt, and fixes failed compiles in one click. Compile API and MCP server for AI agents.',
    price: 'Free (5 AI edits/day). Pro $9.99/month, $79/year or $29 per 4-month semester; lower regional prices in many countries.',
    watchOut: 'No real-time collaboration yet; PDF/ZIP download needs Pro or a one-off export.',
  },
  {
    name: 'Overleaf (Overleaf AI)',
    url: 'https://www.overleaf.com',
    bestFor: 'Co-authoring, journal templates and university licences.',
    ai: 'Overleaf AI, included in all plans since July 2026: Error Assist for compile errors, an AI Assistant chat (paid plans), a Citation Reviewer and language tools.',
    price: 'Free (5 AI uses/day, 10-second compile timeout). Student, Standard and Pro plans in local currency.',
    watchOut: 'The AI is an assistant beside the editor; the free plan allows 1 collaborator per project.',
  },
  {
    name: 'Bibby AI',
    url: 'https://trybibby.com',
    bestFor: 'Researchers who want AI chat, inline completions and citation checks in a collaborative editor.',
    ai: 'Per its website: inline completions and chat, citation search, BibTeX error detection and an AI paper reviewer.',
    price: 'Per its website: free plan with 2 projects and 30 compiles; Research Pro $16/month or $14/month billed annually.',
    watchOut: 'The free plan is small and does not include collaboration.',
  },
  {
    name: 'OpenAI Prism',
    url: 'https://openai.com/index/introducing-prism/',
    bestFor: 'Existing projects only: it is being retired.',
    ai: 'A LaTeX workspace built on Crixet with GPT-5.2 Thinking, image-to-LaTeX and paper search; launched January 2026.',
    price: 'Free with a personal ChatGPT account.',
    watchOut: 'OpenAI is shutting Prism down on January 1, 2027 and deleting data afterwards; export projects before then.',
  },
  {
    name: 'Local editor + coding agent',
    url: 'https://code.visualstudio.com',
    bestFor: 'Offline work and full control over the toolchain.',
    ai: 'VS Code with LaTeX Workshop and an assistant such as GitHub Copilot, Claude Code or Cursor editing the .tex files.',
    price: 'Editor and TeX distribution are free; the AI assistant has its own subscription.',
    watchOut: 'You install and maintain TeX Live or MiKTeX yourself, and the assistant does not see the compiled PDF unless you wire that up.',
  },
]

const faq: FaqItem[] = [
  {
    question: 'What is the best AI LaTeX editor in 2026?',
    answer:
      'For writing alone with an AI that edits the LaTeX directly, Octree. For co-authoring with track changes and journal templates, Overleaf with Overleaf AI. For offline work, a local editor such as VS Code with a coding assistant. Avoid starting new work in OpenAI Prism, which closes on January 1, 2027.',
  },
  {
    question: 'Is there a free AI LaTeX editor?',
    answer:
      'Yes. Octree gives 5 AI edits a day on its free plan and Overleaf gives 5 AI uses a day. OpenAI Prism is free with a ChatGPT account but shuts down on January 1, 2027.',
  },
  {
    question: 'Is OpenAI Prism shutting down?',
    answer:
      'Yes. OpenAI says Prism will be retired on January 1, 2027 and that project data is deleted afterwards. Export your projects before then, all at once under Settings, Data Controls, or one at a time from the menu of each project, and upload the ZIP of a project to another editor such as Octree or Overleaf.',
  },
  {
    question: 'Can ChatGPT or Claude write LaTeX?',
    answer:
      'Yes, both write LaTeX well, but in a chat window you copy code back and forth and compile it elsewhere. An AI LaTeX editor applies the change to your project and compiles it, so you see errors and the PDF straight away.',
  },
  {
    question: 'Can I convert handwritten math or a diagram to LaTeX?',
    answer:
      'Yes. The free Octree tools Math to LaTeX and Image to TikZ convert a photo or screenshot of an equation or a diagram into LaTeX or TikZ code that you can paste into any editor.',
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
            The main AI LaTeX editors in 2026 are Octree, Overleaf with Overleaf AI, and Bibby;
            OpenAI Prism still works but closes on January 1, 2027. Pick Octree to have the AI edit
            your LaTeX directly, Overleaf to co-author with templates and track changes, and a local
            editor with a coding assistant if you need to work offline.
          </p>
          <p>
            We make Octree, so read this with that in mind. Every other entry is described from the
            product&apos;s own website or announcement as of November 2026, without benchmarks we
            cannot reproduce. Prices and features change; check each site before you pay.
          </p>

          <h2>At a glance</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Editor</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {editors.map(({ name, bestFor, price }) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>{bestFor}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editors.map(({ name, url, ai, price, watchOut, bestFor }) => (
            <section key={name}>
              <h2>{name}</h2>
              <p>
                <strong>Best for:</strong> {bestFor}
              </p>
              <p>
                <strong>AI features:</strong> {ai}
              </p>
              <p>
                <strong>Price:</strong> {price}
              </p>
              <p>
                <strong>Watch out for:</strong> {watchOut}
              </p>
              <p>
                <a href={url} rel={url.startsWith(SITE_LINKS.www) ? undefined : 'nofollow'}>
                  {url.replace(/^https:\/\//, '').replace(/\/$/, '')}
                </a>
              </p>
            </section>
          ))}

          <h2>How to choose</h2>
          <ul>
            <li>
              <strong>Do several people edit at the same time?</strong> Use Overleaf (or Bibby on a
              paid plan). Octree is single-author for now.
            </li>
            <li>
              <strong>Do you want the AI to make the edits, not just suggest them in a chat?</strong>{' '}
              Use Octree, or a local editor with a coding agent.
            </li>
            <li>
              <strong>Do you work offline?</strong> Use a local TeX distribution with VS Code or
              another desktop editor.
            </li>
            <li>
              <strong>Are you on Prism?</strong> Export your projects before January 1, 2027 and
              upload the ZIP to another editor. Read <Link href="/learn/octree-vs-overleaf">Octree
              vs Overleaf</Link> to choose between the two.
            </li>
          </ul>

          <h2>Free AI tools for LaTeX, whichever editor you use</h2>
          <ul>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/math-to-latex`}>Math to LaTeX</a>: photo or
              screenshot of an equation to LaTeX.
            </li>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/image-to-tikz`}>Image to TikZ</a>: diagram image to
              editable TikZ code.
            </li>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/latex-preview`}>LaTeX preview</a>: compile a
              snippet to PDF without an account.
            </li>
            <li>
              <a href={SITE_LINKS.templates}>LaTeX templates</a>: resumes, theses, papers and slides.
            </li>
          </ul>

          <h2>Frequently asked questions</h2>
          {faq.map(({ question, answer }) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}

          <h2>Related guides</h2>
          <ul>
            <li>
              <Link href="/learn/what-is-octree">What is Octree?</Link>
            </li>
            <li>
              <Link href="/learn/octree-vs-overleaf">Octree vs Overleaf</Link>
            </li>
            <li>
              <Link href="/learn/errors">LaTeX errors and how to fix them</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Try an AI LaTeX editor on your document</h2>
            <p className="text-muted-foreground mb-4">
              Create a free Octree account, upload a .tex file or a ZIP from Overleaf or Prism, and
              ask for the change you need. The free plan includes 5 AI edits a day.
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
