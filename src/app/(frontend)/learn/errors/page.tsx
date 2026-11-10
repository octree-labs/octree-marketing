import type { Metadata } from 'next/types'

import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { InlineCode } from '@/components/Learn/inline-code'
import { LearnSchema } from '@/components/Learn/schema'
import { latexErrorAppUrl, latexErrorGroups, latexErrors } from '@/data/latex-errors'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('LaTeX Errors', 'errors')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'errors',
  title: 'LaTeX Errors and Warnings: Meanings and Fixes',
  description:
    'The 40 most common LaTeX errors and warnings explained: what each log message means, why it happens and how to fix it, with broken and fixed examples.',
  keywords:
    'latex errors, latex error messages, latex warnings, latex compile error, latex log, undefined control sequence, missing $ inserted, missing right inserted, missing } inserted, runaway argument, file not found latex, environment undefined, overfull hbox, underfull hbox, citation undefined, reference undefined, too many unprocessed floats, emergency stop latex, tex capacity exceeded, misplaced alignment tab character, extra alignment tab, no line here to end, missing item, latex error fix',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I find the error in a LaTeX log?',
    answer:
      'Search the .log file for the first line that starts with an exclamation mark. That line is the error message, and the line below it that starts with l. gives the line number in your source where TeX noticed the problem. Fix that one first: later errors are often knock-on effects of the first.',
  },
  {
    question: 'What is the difference between a LaTeX error and a warning?',
    answer:
      'An error (a line starting with !) means TeX could not continue normally; the run stops or recovers with a guess, and the PDF may be missing or wrong. A warning (LaTeX Warning, Package ... Warning, Overfull or Underfull \\hbox) still produces a PDF, but something such as a reference, a citation or a line break is not as intended.',
  },
  {
    question: 'Why does LaTeX report an error on the wrong line?',
    answer:
      'TeX reports the line where it noticed the problem, which can be well after the mistake. An unclosed brace or $ is only detected at the end of the paragraph or the document, and an error inside a macro is reported where the macro is used. Look at the l. line and the lines just before it.',
  },
  {
    question: 'Can I ignore LaTeX warnings?',
    answer:
      'Some, yes. Underfull and small Overfull \\hbox warnings are cosmetic. Citation and reference warnings are not: they mean the PDF shows ?? or [?] in place of a number. Rerun LaTeX (and BibTeX or Biber) first; if a warning survives a full rerun, fix it.',
  },
  {
    question: 'How do I fix LaTeX errors automatically?',
    answer:
      'In Octree, every failed compile shows a Fix with AI button next to the error. It reads the log and your source, proposes the change, and you review it before it is applied. Each page in this list also explains the manual fix with a broken and a corrected example.',
  },
]

export default function LatexErrorsIndexPage() {
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
          <h1>LaTeX Errors and Warnings: Meanings and Fixes</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Quick answer
            </p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                Open the <code>.log</code> and find the <strong>first</strong> line starting with{' '}
                <code>!</code>. Fix that one first; later errors are often caused by it.
              </li>
              <li>
                The <code>l.42</code> line underneath gives the source line where TeX noticed the
                problem. The mistake is on that line or shortly before it.
              </li>
              <li>
                Most errors come down to a misspelled command, a missing package, an unclosed{' '}
                <code>{'{'}</code> or <code>$</code>, or a <code>\begin</code> without its{' '}
                <code>\end</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            Every LaTeX error message below has its own page with the exact log line, the common
            causes, and a minimal broken document next to the corrected one. Every example was
            compiled to check that the broken version really produces the message and the fixed
            version compiles cleanly. Find your message in the list, or search this page for a
            word from it.
          </p>

          {latexErrorGroups.map((group) => {
            const entries = latexErrors.filter((e) => e.group === group.id)
            if (entries.length === 0) return null
            return (
              <React.Fragment key={group.id}>
                <h2 id={group.id}>{group.title}</h2>
                <p>{group.intro}</p>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Message</th>
                        <th>What it means</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((e) => (
                        <tr key={e.slug}>
                          <td>
                            <Link href={`/learn/errors/${e.slug}`}>{e.shortName}</Link>
                            {e.severity === 'warning' ? ' (warning)' : ''}
                          </td>
                          <td>
                            <InlineCode text={e.summary} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            )
          })}

          <h2>How to read a LaTeX error</h2>
          <p>A typical error in the log has three parts:</p>
          <pre><code>{`! Undefined control sequence.
l.12 The value is \\alpah
                         = 0.5.`}</code></pre>
          <ul>
            <li>
              <strong>The message</strong> after <code>!</code> says what TeX could not do.
            </li>
            <li>
              <strong>The line number</strong> after <code>l.</code> says where in the source file
              it happened.
            </li>
            <li>
              <strong>The line break</strong> in the context shows exactly how far TeX had read:
              the last token on the first line (<code>\alpah</code> here) is the one that failed.
            </li>
          </ul>
          <p>
            Fix the first error and compile again before looking at the rest. The{' '}
            <Link href="/learn/latex">LaTeX tutorial for beginners</Link> covers the log in more
            detail, and <Link href="/learn/comments">commenting out blocks</Link> is the fastest
            way to find an error that the log does not pin down.
          </p>

          <h2>Frequently Asked Questions</h2>
          {faq.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </React.Fragment>
          ))}

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">
              Paste your document into Octree — compile errors get a Fix with AI button
            </h3>
            <p className="text-muted-foreground mb-4">
              Octree compiles in the browser and shows each error next to the line that caused it,
              with a one-click fix you can review before applying.
            </p>
            <Link
              href={latexErrorAppUrl('index')}
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
