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
  slug: 'octree-vs-overleaf',
  title: 'Octree vs Overleaf: An Honest Comparison (2026)',
  seoTitle: 'Octree vs Overleaf: Honest Comparison (2026)',
  description:
    'Octree vs Overleaf compared on AI editing, compiling, collaboration, pricing, offline use and templates, including where Overleaf is the better choice.',
  keywords:
    'octree vs overleaf, overleaf alternative, overleaf ai, ai latex editor, overleaf vs octree, overleaf comparison',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'

/** Facts about Overleaf come from overleaf.com/plans and Overleaf's blog, checked on LAST_UPDATED. */
const rows: { topic: string; octree: string; overleaf: string }[] = [
  {
    topic: 'AI editing',
    octree:
      'Built around an AI assistant that proposes line-level edits you accept or reject, generates whole documents from a prompt, and fixes failed compiles.',
    overleaf:
      'Overleaf AI (included in all plans since July 2026): Error Assist, an AI Assistant chat on paid plans, Citation Reviewer and language tools.',
  },
  {
    topic: 'AI on the free plan',
    octree: '5 AI edits per day.',
    overleaf: '5 AI uses per day across its AI tools; no AI Assistant chat.',
  },
  {
    topic: 'Compiling',
    octree:
      'TeX Live with latexmk in the cloud; pdfLaTeX, XeLaTeX or LuaLaTeX chosen automatically. PDF preview with SyncTeX.',
    overleaf:
      'TeX Live in the cloud with a selectable compiler and TeX Live version. Free compiles time out after 10 seconds; paid plans get 4 minutes.',
  },
  {
    topic: 'Collaboration',
    octree: 'Single author for now; real-time collaboration is not available yet.',
    overleaf:
      'Real-time co-editing and comments. Free: 1 collaborator per project; paid plans: 10 or unlimited, plus track changes.',
  },
  {
    topic: 'History and integrations',
    octree:
      'Import a .tex file or a ZIP (an Overleaf export works as-is); PDF and ZIP download on Pro. Compile REST API and MCP server for AI agents.',
    overleaf:
      'Free: last 24 hours of history. Paid: full history, Git, GitHub, Dropbox, Zotero and Mendeley sync.',
  },
  {
    topic: 'Pricing',
    octree:
      'Free; Pro $9.99/month, $79/year or $29 per 4-month semester. Lower regional prices in many countries.',
    overleaf:
      'Free; Student, Standard and Pro plans billed monthly or annually, priced in your local currency on overleaf.com/plans. Institutional licences (Overleaf Commons).',
  },
  {
    topic: 'Offline',
    octree: 'No offline mode; needs a connection.',
    overleaf:
      'Keeps working through short connection drops (2 minutes on Free, 10 on paid plans); not a full offline editor.',
  },
  {
    topic: 'Templates',
    octree: 'A curated set of free templates (resumes, theses, papers, reports, slides) on tools.useoctree.com.',
    overleaf: 'A very large gallery of templates, including many official journal and university templates.',
  },
  {
    topic: 'Open source',
    octree: 'LGPL-3.0, github.com/octree-labs/octree.',
    overleaf: 'Overleaf Community Edition can be self-hosted (AGPL-3.0).',
  },
]

const faq: FaqItem[] = [
  {
    question: 'Is Octree better than Overleaf?',
    answer:
      'It depends on the work. Octree is the better fit if you write alone and want an AI that edits the LaTeX for you, with a lower Pro price. Overleaf is the better fit for real-time co-authoring, track changes, Git and reference-manager sync, journal templates and university licences.',
  },
  {
    question: 'Does Overleaf have AI?',
    answer:
      'Yes. Since July 2026 Overleaf AI is included in all Overleaf plans: Error Assist explains compile errors, the AI Assistant chat is on paid plans, and there are a Citation Reviewer and language tools. The free plan has 5 AI uses per day.',
  },
  {
    question: 'Can I move a project from Overleaf to Octree?',
    answer:
      'Yes. In Overleaf choose Menu, Download, Source to get a ZIP, then upload the ZIP when you create a project in Octree. It works as-is, up to 50 MB. To move back, download the project ZIP from Octree (a Pro feature, or a one-off $4.99 export) and upload it to Overleaf.',
  },
  {
    question: 'Can I collaborate in real time in Octree?',
    answer:
      'Not yet. Real-time collaboration is listed as coming soon. Until then, use Overleaf (or Git) when several people need to edit at the same time.',
  },
  {
    question: 'Which one is cheaper?',
    answer:
      'Both have a free plan. Octree Pro is $9.99 a month, $79 a year or $29 for a 4-month semester, with lower prices in many countries. Overleaf prices depend on the plan and your currency; compare the current figures on overleaf.com/plans.',
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
            Choose Octree if you write LaTeX mostly on your own and want an AI assistant that makes
            the edits for you, at $9.99 a month for Pro. Choose Overleaf if you co-author in real
            time, need track changes, Git or Zotero sync, or rely on journal templates and a
            university licence. Both run in the browser on TeX Live and have a free plan.
          </p>

          <h2>Side-by-side comparison</h2>
          <p>
            Overleaf details are from{' '}
            <a href="https://www.overleaf.com/user/subscription/plans" rel="nofollow">
              overleaf.com/plans
            </a>{' '}
            and Overleaf&apos;s announcements, checked in November 2026. Both products change often.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Octree</th>
                  <th scope="col">Overleaf</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ topic, octree, overleaf }) => (
                  <tr key={topic}>
                    <th scope="row">{topic}</th>
                    <td>{octree}</td>
                    <td>{overleaf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Where Overleaf is better</h2>
          <ul>
            <li>
              <strong>Co-authoring.</strong> Several people can edit the same document at once, with
              comments and, on paid plans, track changes. Octree does not offer real-time
              collaboration yet.
            </li>
            <li>
              <strong>Templates and submissions.</strong> Overleaf&apos;s gallery includes many
              official journal, conference and university templates.
            </li>
            <li>
              <strong>Integrations and history.</strong> Paid plans sync with Git, GitHub, Dropbox,
              Zotero and Mendeley and keep the full version history.
            </li>
            <li>
              <strong>Institutions.</strong> Many universities provide Overleaf through an Overleaf
              Commons licence, so it may already be free for you.
            </li>
          </ul>

          <h2>Where Octree is better</h2>
          <ul>
            <li>
              <strong>AI that edits the source.</strong> Describe the change and Octree proposes the
              exact LaTeX edits across the document; you accept or reject each one. A failed compile
              can be sent to the assistant in one click.
            </li>
            <li>
              <strong>Starting from nothing.</strong> AI document generation drafts a complete,
              compilable document from a prompt and attached files.
            </li>
            <li>
              <strong>Price.</strong> Pro is $9.99 a month, $79 a year or $29 for a semester, and
              cheaper still in many countries.
            </li>
            <li>
              <strong>AI agents.</strong> A compile API and an MCP server let Claude Code, Cursor and
              other agents compile LaTeX through Octree (see the{' '}
              <Link href="/developers">developer docs</Link>).
            </li>
          </ul>

          <h2>Moving a project between them</h2>
          <p>
            Both editors work on plain LaTeX files. To try Octree on an
            existing Overleaf project, choose Menu, Download, Source in Overleaf and upload the ZIP
            when you create a project in Octree. Downloading the ZIP back out of Octree needs Pro or a
            one-off $4.99 export. To check a single snippet first, paste it into the
            free <a href={`${SITE_LINKS.tools}/tools/latex-preview`}>LaTeX preview</a>.
          </p>

          <h2>Free tools that work with either editor</h2>
          <ul>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/math-to-latex`}>Math to LaTeX</a>: convert a photo
              of an equation into LaTeX.
            </li>
            <li>
              <a href={`${SITE_LINKS.tools}/tools/image-to-tikz`}>Image to TikZ</a>: recreate a
              diagram as TikZ code.
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
              <Link href="/learn/best-ai-latex-editors">Best AI LaTeX editors (2026)</Link>
            </li>
            <li>
              <Link href="/learn/latex">Learn LaTeX: tutorial for beginners</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Try Octree with an Overleaf project</h2>
            <p className="text-muted-foreground mb-4">
              Create a free account, upload your Overleaf ZIP and ask the assistant for one change.
              The free plan includes 5 AI edits a day.
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
