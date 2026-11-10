import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Single- and Double-Sided Documents', 'single-double-sided')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'single-double-sided',
  title: 'Single-Sided and Double-Sided Documents in LaTeX: oneside, twoside and openright',
  seoTitle: 'LaTeX twoside vs oneside: Double-Sided Documents',
  description: 'Double-sided LaTeX documents: oneside vs twoside, inner and outer margins, binding offset, openright and \\cleardoublepage, alternating headers and theses.',
  keywords: 'latex twoside, twoside latex, latex oneside, oneside vs twoside, latex double sided, latex double-sided printing, latex single sided, latex openright, latex openany, cleardoublepage, latex blank page before chapter, latex remove blank pages, emptypage, latex binding offset, bindingoffset geometry, latex inner outer margin, latex mirror margins, latex alternating headers, fancyhdr LE RO, latex even odd pages, latex recto verso, latex thesis printing, latex book class twoside, latex report twoside, flushbottom raggedbottom, latex marginpar outer margin',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is the difference between oneside and twoside in LaTeX?',
    answer:
      'oneside lays out every page the same way, for reading on screen or printing on one side of the paper. twoside treats odd and even pages as the right and left halves of a spread: the margins swap sides, headers and page numbers can alternate, and margin notes go to the outer edge. article and report default to oneside, book to twoside.',
  },
  {
    question: 'How do I remove the blank pages before chapters in LaTeX?',
    answer:
      'They come from the openright option, which starts every chapter on an odd page; book uses it by default. Add openany to the class options, as in \\documentclass[openany]{book}, to start chapters on the next page. To keep openright but hide the header on the empty pages, load the emptypage package.',
  },
  {
    question: 'How do I add a binding offset in LaTeX?',
    answer:
      'Load geometry with the bindingoffset option, for example \\usepackage[twoside, bindingoffset=1cm, inner=2.5cm, outer=2.5cm]{geometry}. The offset is added to the inner margin, the edge that goes into the binding, and it moves to the correct side on odd and even pages.',
  },
  {
    question: 'Should my thesis be oneside or twoside?',
    answer:
      'Follow your university\'s rules first. If the thesis will be printed on both sides of the paper and bound, use twoside, usually with openright so chapters start on a right-hand page. If it is submitted as a PDF or printed single-sided, use oneside with equal margins, so the text is not shifted left and right on alternate pages.',
  },
  {
    question: 'Why do the margins alternate between pages in my LaTeX document?',
    answer:
      'The document is set twoside, either by the option or because it uses the book class. In twoside mode the inner margin is narrower than the outer one and they swap on even pages. Add oneside to the class options, or set equal inner and outer margins with geometry, to stop the shift.',
  },
]

export default async function LearnSingleDoubleSidedPage() {
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
          <h1>Single-Sided and Double-Sided Documents in LaTeX: oneside, twoside and openright</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Double-sided:</strong> <code>{`\\documentclass[twoside]{report}`}</code>.
                Margins and headers alternate between odd and even pages.
              </li>
              <li>
                <strong>Single-sided:</strong> <code>oneside</code>, the default for{' '}
                <code>article</code> and <code>report</code>.
              </li>
              <li>
                <strong>Chapters on right-hand pages:</strong> <code>openright</code> (default in{' '}
                <code>book</code>); <code>openany</code> removes the blank pages.
              </li>
              <li>
                <strong>Binding:</strong>{' '}
                <code>{`\\usepackage[bindingoffset=1cm]{geometry}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass[twoside, openright]{report}
\\usepackage[inner=3cm, outer=2cm]{geometry}

\\begin{document}
\\chapter{Introduction}
Odd pages have the wide margin on the left.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            A printed book is read as spreads: the left page (verso, even numbered) faces the right
            page (recto, odd numbered), and the margins, headers and page numbers are mirrored
            across the spine. LaTeX can lay out a document that way, or treat every page the same
            for reading on screen. This guide covers the <code>oneside</code> and{' '}
            <code>twoside</code> options, the defaults of each class, mirrored margins and a
            binding offset, <code>openright</code> and the blank pages it creates, alternating
            headers with <code>fancyhdr</code>, and how to set up a thesis for printing. Every
            example compiles with pdfLaTeX.
          </p>

          {/* ── options ── */}
          <h2>oneside vs twoside</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>oneside</code></th>
                  <th><code>twoside</code></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Margins</td><td>Same on every page</td><td>Inner and outer margins swap on even pages</td></tr>
                <tr><td>Running heads (<code>headings</code> style)</td><td>One mark on every page</td><td>Chapter on even pages, section on odd pages (<code>article</code>: section and subsection)</td></tr>
                <tr><td>Page numbers in headers</td><td>Same corner</td><td>Outer corner</td></tr>
                <tr><td><code>\marginpar</code> notes</td><td>Right margin</td><td>Outer margin</td></tr>
                <tr><td>Page bottoms</td><td><code>\raggedbottom</code></td><td><code>\flushbottom</code>: every page filled to the same height</td></tr>
                <tr><td>Default in</td><td><code>article</code>, <code>report</code>, <code>letter</code></td><td><code>book</code>, <code>memoir</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Pass the option to the class. Everything below works the same in{' '}
            <code>article</code>, <code>report</code> and <code>book</code>; class defaults are
            compared in the <Link href="/learn/document-classes">document classes guide</Link>.
          </p>
          <pre><code>{`\\documentclass[twoside]{article}
\\usepackage{lipsum}   % dummy text
\\pagestyle{headings}

\\begin{document}
\\section{First Section}
\\lipsum[1-6]
\\section{Second Section}
\\lipsum[7-12]
\\marginpar{A note in the outer margin}
\\end{document}`}</code></pre>

          {/* ── margins ── */}
          <h2>Margins and a Binding Offset</h2>
          <p>
            In <code>twoside</code> mode the standard classes make the inner margin narrower than
            the outer one, so that the two text blocks of a spread sit together like one page. With
            the <code>geometry</code> package, set <code>inner</code> and <code>outer</code> instead
            of <code>left</code> and <code>right</code>, and add <code>bindingoffset</code> for
            the paper lost in the binding:
          </p>
          <pre><code>{`\\documentclass[twoside]{report}
\\usepackage[a4paper, inner=2.5cm, outer=2.5cm, top=3cm, bottom=3cm,
            bindingoffset=1cm]{geometry}
\\usepackage{lipsum}

\\begin{document}
\\chapter{Method}
\\lipsum[1-10]
\\end{document}`}</code></pre>
          <p>
            The offset always goes on the binding side: left on odd pages, right on even pages. To
            keep <code>twoside</code> headers but stop the margins from swapping (useful when notes
            must stay in the right margin), add <code>asymmetric</code> to the{' '}
            <code>geometry</code> options. More on page dimensions in{' '}
            <Link href="/learn/page-size-margins">page size and margins</Link>.
          </p>

          {/* ── openright ── */}
          <h2>openright, openany and \cleardoublepage</h2>
          <p>
            Books start chapters on a right-hand (odd) page. The <code>openright</code> option
            does this by inserting a blank page when a chapter would otherwise start on an even
            page; <code>openany</code> starts each chapter on the next page. <code>book</code>{' '}
            defaults to <code>openright</code>, <code>report</code> to <code>openany</code>, and{' '}
            <code>article</code> has no chapters, so the options do not apply to it.
          </p>
          <pre><code>{`\\documentclass[twoside, openright]{report}
\\usepackage{emptypage}   % no header or number on the inserted blank pages
\\usepackage{lipsum}

\\begin{document}
\\chapter{One}
\\lipsum[1]
\\chapter{Two}            % starts on page 3; page 2 is left blank
\\lipsum[4-6]

\\cleardoublepage         % jump to the next odd page by hand
\\section*{Appendix Notes}
\\lipsum[7]
\\end{document}`}</code></pre>
          <p>
            <code>\cleardoublepage</code> moves to the next odd page in <code>twoside</code> mode
            and acts like <code>\clearpage</code> in <code>oneside</code>. Use it before the table
            of contents, the first chapter and the bibliography if those must start on the right.
            Without <code>emptypage</code>, the inserted blank pages still carry the running header
            or page number of the current page style.
          </p>

          {/* ── headers ── */}
          <h2>Alternating Headers and Page Numbers with fancyhdr</h2>
          <p>
            In <code>twoside</code> mode, <code>fancyhdr</code> positions take an E (even) or O
            (odd) prefix besides L, C and R. The usual book layout puts the page number in the
            outer corner, the chapter on the left page and the section on the right:
          </p>
          <pre><code>{`\\documentclass[twoside]{book}
\\usepackage{fancyhdr}
\\usepackage{lipsum}

\\pagestyle{fancy}
\\fancyhf{}                        % clear all fields
\\fancyhead[LE,RO]{\\thepage}       % outer corner
\\fancyhead[RE]{\\leftmark}         % chapter on even pages
\\fancyhead[LO]{\\rightmark}        % section on odd pages
\\renewcommand{\\headrulewidth}{0.4pt}

\\begin{document}
\\chapter{Background}
\\section{History}
\\lipsum[1-8]
\\section{Today}
\\lipsum[9-16]
\\end{document}`}</code></pre>
          <p>
            In <code>oneside</code> mode, the E and O fields are ignored and every page uses the
            odd-page settings. Number styles and &ldquo;Page X of Y&rdquo; are covered in{' '}
            <Link href="/learn/page-numbering">page numbering</Link>.
          </p>

          {/* ── thesis ── */}
          <h2>Printing a Thesis or Book</h2>
          <ul>
            <li><strong>Printed on both sides and bound:</strong> <code>twoside</code>, <code>openright</code>, a <code>bindingoffset</code> of 0.5 to 1.5 cm, and <code>emptypage</code>.</li>
            <li><strong>Submitted as a PDF or printed one-sided:</strong> <code>oneside</code>, <code>openany</code> and equal margins; set a wider left margin only if it will be bound.</li>
            <li><strong>Both versions:</strong> keep the options in one line of the preamble so you can switch, as the page count and blank pages change between them.</li>
            <li><strong>Front matter:</strong> start the title page, abstract and contents on odd pages with <code>\cleardoublepage</code>; see the <Link href="/learn/title-page">title page guide</Link>.</li>
          </ul>

          {/* ── Mistakes ── */}
          <h2>Common Mistakes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Symptom</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blank pages before chapters</td>
                  <td><code>openright</code>, the <code>book</code> default</td>
                  <td><code>openany</code>, or keep them and load <code>emptypage</code></td>
                </tr>
                <tr>
                  <td>Text jumps left and right in a PDF</td>
                  <td><code>twoside</code> margins on a document read on screen</td>
                  <td><code>oneside</code>, or equal <code>inner</code> and <code>outer</code></td>
                </tr>
                <tr>
                  <td>fancyhdr <code>E</code>/<code>O</code> settings have no effect</td>
                  <td>The document is <code>oneside</code></td>
                  <td>Add <code>twoside</code> to the class options</td>
                </tr>
                <tr>
                  <td>Stretched gaps between paragraphs, <em>Underfull \vbox</em> warnings</td>
                  <td><code>twoside</code> switches on <code>\flushbottom</code></td>
                  <td><code>\raggedbottom</code> in the preamble</td>
                </tr>
                <tr>
                  <td><code>\cleardoublepage</code> does not skip a page</td>
                  <td>It only does so in <code>twoside</code> mode</td>
                  <td>Use <code>twoside</code>, or add <code>{`\\clearpage\\null\\newpage`}</code> by hand</td>
                </tr>
                <tr>
                  <td>Binding margin on the wrong side</td>
                  <td><code>left</code>/<code>right</code> used with <code>twoside</code></td>
                  <td><code>inner</code>/<code>outer</code> and <code>bindingoffset</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is the difference between oneside and twoside in LaTeX?</h3>
          <p>
            <code>oneside</code> lays out every page the same way, for reading on screen or
            printing on one side of the paper. <code>twoside</code> treats odd and even pages as
            the right and left halves of a spread: the margins swap sides, headers and page
            numbers can alternate, and margin notes go to the outer edge. <code>article</code> and{' '}
            <code>report</code> default to <code>oneside</code>, <code>book</code> to{' '}
            <code>twoside</code>.
          </p>
          <h3>How do I remove the blank pages before chapters in LaTeX?</h3>
          <p>
            They come from the <code>openright</code> option, which starts every chapter on an odd
            page; <code>book</code> uses it by default. Add <code>openany</code> to the class
            options, as in <code>{`\\documentclass[openany]{book}`}</code>, to start chapters on
            the next page. To keep <code>openright</code> but hide the header on the empty pages,
            load the <code>emptypage</code> package.
          </p>
          <h3>How do I add a binding offset in LaTeX?</h3>
          <p>
            Load <code>geometry</code> with the <code>bindingoffset</code> option, for example{' '}
            <code>{`\\usepackage[twoside, bindingoffset=1cm, inner=2.5cm, outer=2.5cm]{geometry}`}</code>.
            The offset is added to the inner margin, the edge that goes into the binding, and it
            moves to the correct side on odd and even pages.
          </p>
          <h3>Should my thesis be oneside or twoside?</h3>
          <p>
            Follow your university&apos;s rules first. If the thesis will be printed on both sides
            of the paper and bound, use <code>twoside</code>, usually with <code>openright</code>{' '}
            so chapters start on a right-hand page. If it is submitted as a PDF or printed
            single-sided, use <code>oneside</code> with equal margins, so the text is not shifted
            left and right on alternate pages.
          </p>
          <h3>Why do the margins alternate between pages in my LaTeX document?</h3>
          <p>
            The document is set <code>twoside</code>, either by the option or because it uses the{' '}
            <code>book</code> class. In <code>twoside</code> mode the inner margin is narrower than
            the outer one and they swap on even pages. Add <code>oneside</code> to the class
            options, or set equal inner and outer margins with <code>geometry</code>, to stop the
            shift.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/document-classes">Document Classes</Link> &ndash; article, report, book and their default options</li>
            <li><Link href="/learn/page-size-margins">Page Size and Margins</Link> &ndash; The geometry package in depth</li>
            <li><Link href="/learn/page-numbering">Page Numbering</Link> &ndash; fancyhdr, roman numerals and page styles</li>
            <li><Link href="/learn/title-page">Title Page</Link> &ndash; Title pages and front matter for a thesis</li>
            <li><Link href="/learn/table-of-contents">Table of Contents</Link> &ndash; Contents, lists of figures and where they start</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a thesis layout and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="thesis" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Get your thesis print-ready with AI</h3>
            <p className="text-muted-foreground mb-4">
              Ask Octree&apos;s AI to switch your thesis between screen and print layouts, add a
              binding offset or remove stray blank pages, and check every page in the compiled
              PDF next to your code.
            </p>
            <Link
              href="https://app.useoctree.com"
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
