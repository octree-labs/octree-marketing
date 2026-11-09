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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Document Classes', 'document-classes')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'document-classes',
  title: 'LaTeX Document Classes: article, report, book and Options',
  seoTitle: 'LaTeX Document Classes: article, book, twoside',
  description: 'LaTeX document classes compared: article, report, book, KOMA-Script and memoir, and the options 12pt, a4paper, twoside, twocolumn, draft and landscape.',
  keywords: 'latex document classes, latex document class, documentclass, latex twoside, twoside, latex oneside, twoside latex margins, latex article class, latex report class, latex book class, article vs report vs book, latex class options, latex 12pt a4paper, latex twocolumn, latex draft option, latex landscape, latex titlepage, openany, openright, scrartcl, scrbook, koma-script, memoir class, unused global option, chapter undefined article',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is the difference between article, report and book in LaTeX?',
    answer:
      'article has no chapters and puts the title above the text; it suits papers and short documents. report adds \\chapter and a separate title page, for theses and longer reports. book adds front, main and back matter, is two-sided by default and starts chapters on right-hand pages. All three share the same options and section commands below chapter.',
  },
  {
    question: 'What does twoside do in LaTeX?',
    answer:
      'twoside lays the document out for double-sided printing: odd (right-hand) and even (left-hand) pages get mirrored margins, a wider outer margin and a narrower inner one, and running headers can differ between left and right pages. It is the default for book; article and report are oneside by default. In a PDF read on screen, twoside makes the text block appear to shift left and right.',
  },
  {
    question: 'How do I set the font size and paper size of a LaTeX document?',
    answer:
      'Pass them as class options: \\documentclass[12pt, a4paper]{article}. The standard classes accept 10pt (default), 11pt and 12pt, and paper sizes letterpaper (default), a4paper, a5paper, b5paper, legalpaper and executivepaper. For other font sizes use extarticle or KOMA-Script; for exact margins use the geometry package.',
  },
  {
    question: 'Why do I get “Unused global option(s)”?',
    answer:
      'One of the options in \\documentclass[...] was not recognized by the class or any package, usually a typo (a4 instead of a4paper) or a value the class does not support (14pt in article). LaTeX ignores it and warns. Fix the spelling or switch to a class that supports the option, such as extarticle for 14pt.',
  },
  {
    question: 'Why is \\chapter undefined in my document?',
    answer:
      'The article class has no chapters. Use \\section as the top level, or switch the class to report or book (or scrreprt, scrbook or memoir), which define \\chapter. Changing the class is a one-word edit in \\documentclass and keeps all other commands working.',
  },
  {
    question: 'Should I use KOMA-Script or memoir instead of the standard classes?',
    answer:
      'Both are drop-in alternatives with more built-in settings. KOMA-Script (scrartcl, scrreprt, scrbook) is designed with European typography in mind, sets type-area margins automatically and has options such as parskip=half. memoir is a single class for books and reports that bundles the features of dozens of packages. For a journal or university template, use the class it provides.',
  },
]

export default async function LearnDocumentClassesPage() {
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
          <h1>LaTeX Document Classes: article, report, book and Options</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Syntax:</strong> <code>{`\\documentclass[options]{class}`}</code>, the first
                line of every document.
              </li>
              <li>
                <strong>Which class:</strong> <code>article</code> for papers (no chapters),{' '}
                <code>report</code> for theses (chapters), <code>book</code> for books (chapters,
                two-sided), <code>beamer</code> for slides.
              </li>
              <li>
                <strong>Common options:</strong> <code>12pt</code>, <code>a4paper</code>,{' '}
                <code>twoside</code>, <code>twocolumn</code>, <code>draft</code>,{' '}
                <code>landscape</code>, <code>titlepage</code>.
              </li>
              <li>
                <strong>oneside vs twoside:</strong> <code>twoside</code> mirrors the margins and
                headers of left and right pages for double-sided printing.
              </li>
              <li>
                <strong>Alternatives:</strong> KOMA-Script (<code>scrartcl</code>,{' '}
                <code>scrreprt</code>, <code>scrbook</code>) and <code>memoir</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass[12pt, a4paper, twoside]{report}

\\begin{document}
\\chapter{Introduction}      % report and book have chapters
\\section{Background}
Text of the first section.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            The document class is the first decision in every LaTeX file. It sets which
            structure is available (chapters or not), how the title is laid out, the default font
            size, paper size and margins, and whether the document is set for one-sided or
            two-sided printing. This guide compares the standard classes article, report and
            book, explains each class option including <code>twoside</code>, introduces
            KOMA-Script and memoir, and fixes the errors that come from choosing the wrong class
            or option.
          </p>

          {/* ── Comparison ── */}
          <h2>LaTeX Document Classes Compared</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Use for</th>
                  <th><code>\chapter</code></th>
                  <th>Title</th>
                  <th>Sides by default</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>article</code></td><td>Papers, assignments, short reports</td><td>No</td><td>Above the text</td><td>oneside</td></tr>
                <tr><td><code>report</code></td><td>Theses, long reports</td><td>Yes</td><td>Own page</td><td>oneside</td></tr>
                <tr><td><code>book</code></td><td>Books</td><td>Yes, open on right pages</td><td>Own page</td><td>twoside</td></tr>
                <tr><td><code>letter</code></td><td>Letters</td><td>No</td><td>&mdash;</td><td>oneside</td></tr>
                <tr><td><code>beamer</code></td><td>Slides</td><td>No</td><td>Title frame</td><td>&mdash;</td></tr>
                <tr><td><code>scrartcl</code> / <code>scrreprt</code> / <code>scrbook</code></td><td>KOMA-Script versions of the three</td><td>As above</td><td>Configurable</td><td>As above</td></tr>
                <tr><td><code>memoir</code></td><td>Books and reports with many built-in features</td><td>Yes</td><td>Configurable</td><td>twoside</td></tr>
                <tr><td><code>standalone</code></td><td>A single figure or formula cropped to its content</td><td>No</td><td>&mdash;</td><td>&mdash;</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The sectioning commands below chapter are the same in every class:{' '}
            <code>\section</code>, <code>\subsection</code>, <code>\subsubsection</code>,{' '}
            <code>\paragraph</code> and <code>\subparagraph</code> (see{' '}
            <Link href="/learn/sections">sections</Link>). <code>book</code> also has{' '}
            <code>\frontmatter</code>, <code>\mainmatter</code> and <code>\backmatter</code>,
            which switch page numbering from roman to arabic and turn chapter numbers off and on.
            Slides with beamer have their own <Link href="/learn/beamer">Beamer guide</Link>.
          </p>
          <pre><code>{`\\documentclass{book}

\\begin{document}
\\frontmatter            % roman page numbers, unnumbered chapters
\\tableofcontents
\\chapter{Preface}
Why this book exists.

\\mainmatter             % arabic page numbers, numbered chapters
\\chapter{Getting Started}
\\section{Installation}
First steps.

\\backmatter
\\chapter{Glossary}
Terms used in the book.
\\end{document}`}</code></pre>

          {/* ── Options ── */}
          <h2>Document Class Options</h2>
          <p>
            Options go in square brackets, separated by commas, in any order. They apply to the
            class and to every package that understands them, so <code>a4paper</code> in the
            class also reaches <code>geometry</code>. The standard classes accept:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Effect</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>10pt</code>, <code>11pt</code>, <code>12pt</code></td><td>Base font size</td><td>10pt</td></tr>
                <tr><td><code>letterpaper</code>, <code>a4paper</code>, <code>a5paper</code>, <code>b5paper</code>, <code>legalpaper</code>, <code>executivepaper</code></td><td>Paper size</td><td>letterpaper</td></tr>
                <tr><td><code>oneside</code>, <code>twoside</code></td><td>One- or two-sided layout</td><td>oneside (book: twoside)</td></tr>
                <tr><td><code>onecolumn</code>, <code>twocolumn</code></td><td>Text in one or two columns</td><td>onecolumn</td></tr>
                <tr><td><code>titlepage</code>, <code>notitlepage</code></td><td>Title and abstract on a page of their own or not</td><td>notitlepage (report, book: titlepage)</td></tr>
                <tr><td><code>openright</code>, <code>openany</code></td><td>Chapters start on a right-hand page or on the next page</td><td>book: openright; report: openany</td></tr>
                <tr><td><code>draft</code>, <code>final</code></td><td><code>draft</code> marks overfull lines with a black bar; graphicx shows images as boxes</td><td>final</td></tr>
                <tr><td><code>landscape</code></td><td>Swaps paper width and height</td><td>portrait</td></tr>
                <tr><td><code>leqno</code>, <code>fleqn</code></td><td>Equation numbers on the left; equations aligned left</td><td>right, centered</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass[11pt, a4paper, twocolumn, draft]{article}
\\usepackage{graphicx}
\\usepackage{lipsum}

\\title{A Two-Column Paper}
\\author{Ada Lovelace}

\\begin{document}
\\maketitle
\\section{Introduction}
\\lipsum[1]
\\includegraphics[width=\\linewidth]{example-image}  % a box in draft mode
\\lipsum[2]
\\end{document}`}</code></pre>
          <p>
            The class sets only three font sizes and a handful of paper sizes. For 14pt and
            larger, use <code>extarticle</code> or KOMA-Script (see{' '}
            <Link href="/learn/font-size">font size</Link>); for exact margins, load{' '}
            <code>geometry</code> (see <Link href="/learn/page-size-margins">page size and margins</Link>).
            The <code>landscape</code> option only swaps the dimensions LaTeX uses; load{' '}
            <code>geometry</code> as well so the PDF pages themselves are turned.
          </p>

          {/* ── twoside ── */}
          <h2>oneside vs twoside in LaTeX</h2>
          <p>
            With <code>twoside</code>, LaTeX treats the document as printed on both sides of the
            paper and bound. Right-hand pages are odd and left-hand pages even, and the two are
            laid out as mirror images:
          </p>
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
                <tr><td>Margins</td><td>Same on every page</td><td>Inner margin narrower, outer wider, mirrored on odd and even pages</td></tr>
                <tr><td>Running headers (<code>\pagestyle&#123;headings&#125;</code>)</td><td>Same on every page</td><td>Left pages: chapter; right pages: section</td></tr>
                <tr><td>Page numbers</td><td>Same position</td><td>Can go on the outer edge</td></tr>
                <tr><td><code>\cleardoublepage</code></td><td>Same as <code>\clearpage</code></td><td>Continues on the next odd page, inserting a blank page if needed</td></tr>
                <tr><td>Use for</td><td>Reading on screen, single-sided printing</td><td>Printed and bound theses and books</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Headers and footers for twoside layouts are easiest with <code>fancyhdr</code>, where{' '}
            <code>E</code> and <code>O</code> select even and odd pages:
          </p>
          <pre><code>{`\\documentclass[12pt, a4paper, twoside]{report}
\\usepackage[inner=3cm, outer=2cm]{geometry}   % binding margin on the inside
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[LE]{\\leftmark}                    % even pages: chapter, left
\\fancyhead[RO]{\\rightmark}                   % odd pages: section, right
\\fancyfoot[LE,RO]{\\thepage}                  % page number on the outer edge

\\begin{document}
\\chapter{Introduction}
\\section{Motivation}
Text on page 1, a right-hand page.
\\newpage
Text on page 2, a left-hand page.
\\end{document}`}</code></pre>
          <p>
            Two side effects surprise people. A twoside PDF viewed on screen seems to shift the
            text left and right from page to page; that is the mirrored margins, and correct for
            print. And with <code>openright</code> (the book default), a chapter that would start
            on a left page is pushed to the next right page, leaving a blank page before it. Add{' '}
            <code>openany</code> to avoid that, or use <code>oneside</code> for the PDF you
            submit online. Page number styles are covered in{' '}
            <Link href="/learn/page-numbering">page numbering</Link>.
          </p>

          {/* ── KOMA / memoir ── */}
          <h2>KOMA-Script and memoir</h2>
          <p>
            KOMA-Script replaces the standard classes one-for-one: <code>scrartcl</code> for
            article, <code>scrreprt</code> for report and <code>scrbook</code> for book. Its
            options take values, it calculates balanced margins from the paper and font size,
            and it uses a sans-serif font for headings by default.
          </p>
          <pre><code>{`\\documentclass[fontsize=11pt, paper=a4, parskip=half, DIV=12]{scrartcl}
% parskip=half: space between paragraphs instead of indents
% DIV=12: a larger text area (smaller margins)

\\begin{document}
\\section{Introduction}
A KOMA-Script article with half-line paragraph spacing.

A second paragraph, separated by space.
\\end{document}`}</code></pre>
          <p>
            <code>memoir</code> is a single class for books and reports that includes the
            functions of many packages (headers, chapter styles, captions, page layout). It
            accepts the standard options plus sizes from 9pt to 60pt.
          </p>
          <pre><code>{`\\documentclass[11pt, a4paper, twoside, openany]{memoir}
\\chapterstyle{bianchi}
\\setlrmarginsandblock{3cm}{2.5cm}{*}
\\checkandfixthelayout

\\begin{document}
\\chapter{Getting Started}
memoir has built-in chapter styles and layout commands.
\\end{document}`}</code></pre>
          <p>
            If a journal, conference or university gives you a class file (<code>IEEEtran</code>,{' '}
            <code>acmart</code>, <code>elsarticle</code>, a thesis class), use it instead: the
            layout is fixed by the publisher.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Message or symptom</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>LaTeX Warning: Unused global option(s): [a4]</em></td>
                  <td>An option no class or package recognizes: a typo (<code>a4</code>, <code>12ptt</code>) or an unsupported value (<code>14pt</code> in article)</td>
                  <td>Use the exact name (<code>a4paper</code>, <code>12pt</code>), or a class that supports it (<code>extarticle</code>)</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\chapter</code></td>
                  <td><code>article</code> has no chapters</td>
                  <td>Switch to <code>report</code>, <code>book</code> or <code>scrreprt</code>, or use <code>\section</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: File `artcle.cls&apos; not found</em></td>
                  <td>Misspelled class or a custom class file missing from the project</td>
                  <td>Fix the name, or upload the <code>.cls</code> file next to the main file</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Environment abstract undefined</em></td>
                  <td>The <code>book</code> class has no abstract environment</td>
                  <td>Use <code>report</code>, or a starred <code>\chapter*&#123;Abstract&#125;</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Two \documentclass or \documentstyle commands</em></td>
                  <td>A second <code>\documentclass</code>, often from an <code>\input</code>&apos;ed file</td>
                  <td>Remove the preamble from included files</td>
                </tr>
                <tr>
                  <td>Blank pages before chapters</td>
                  <td><code>openright</code> with <code>twoside</code> (book default)</td>
                  <td>Add <code>openany</code>, or use <code>oneside</code></td>
                </tr>
                <tr>
                  <td>Margins alternate from page to page</td>
                  <td><code>twoside</code> mirrors odd and even pages</td>
                  <td>Expected for print; use <code>oneside</code> for on-screen reading</td>
                </tr>
                <tr>
                  <td>Class-option font size larger than 12pt has no effect</td>
                  <td>Standard classes only define 10pt, 11pt, 12pt</td>
                  <td><code>extarticle</code>, KOMA <code>fontsize=14pt</code>, or memoir</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Moving a document from article to report is a one-word change:</p>
          <pre><code>{`% Before: \\documentclass[12pt]{article} with \\chapter gives
% "Undefined control sequence"
\\documentclass[12pt, a4paper]{report}

\\begin{document}
\\chapter{Results}      % now defined
\\section{Accuracy}
All section commands work as before.
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is the difference between article, report and book in LaTeX?</h3>
          <p>
            article has no chapters and puts the title above the text; it suits papers and short
            documents. report adds <code>\chapter</code> and a separate title page, for theses and
            longer reports. book adds front, main and back matter, is two-sided by default and
            starts chapters on right-hand pages. All three share the same options and section
            commands below chapter.
          </p>
          <h3>What does twoside do in LaTeX?</h3>
          <p>
            twoside lays the document out for double-sided printing: odd (right-hand) and even
            (left-hand) pages get mirrored margins, a wider outer margin and a narrower inner one,
            and running headers can differ between left and right pages. It is the default for
            book; article and report are oneside by default. In a PDF read on screen, twoside
            makes the text block appear to shift left and right.
          </p>
          <h3>How do I set the font size and paper size of a LaTeX document?</h3>
          <p>
            Pass them as class options: <code>{`\\documentclass[12pt, a4paper]{article}`}</code>.
            The standard classes accept 10pt (default), 11pt and 12pt, and paper sizes
            letterpaper (default), a4paper, a5paper, b5paper, legalpaper and executivepaper. For
            other font sizes use extarticle or KOMA-Script; for exact margins use the geometry
            package.
          </p>
          <h3>Why do I get &ldquo;Unused global option(s)&rdquo;?</h3>
          <p>
            One of the options in <code>{`\\documentclass[...]`}</code> was not recognized by the
            class or any package, usually a typo (<code>a4</code> instead of{' '}
            <code>a4paper</code>) or a value the class does not support (<code>14pt</code> in
            article). LaTeX ignores it and warns. Fix the spelling or switch to a class that
            supports the option, such as extarticle for 14pt.
          </p>
          <h3>Why is \chapter undefined in my document?</h3>
          <p>
            The article class has no chapters. Use <code>\section</code> as the top level, or
            switch the class to report or book (or scrreprt, scrbook or memoir), which define{' '}
            <code>\chapter</code>. Changing the class is a one-word edit in{' '}
            <code>\documentclass</code> and keeps all other commands working.
          </p>
          <h3>Should I use KOMA-Script or memoir instead of the standard classes?</h3>
          <p>
            Both are drop-in alternatives with more built-in settings. KOMA-Script (scrartcl,
            scrreprt, scrbook) is designed with European typography in mind, sets type-area
            margins automatically and has options such as <code>parskip=half</code>. memoir is a
            single class for books and reports that bundles the features of dozens of packages.
            For a journal or university template, use the class it provides.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; The geometry package for exact layouts</li>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; Class size options and size commands</li>
            <li><Link href="/learn/sections">Sections</Link> &ndash; Chapters, sections and numbering</li>
            <li><Link href="/learn/page-numbering">Page Numbering</Link> &ndash; Roman and arabic numbers, headers and footers</li>
            <li><Link href="/learn/table-of-contents">Table of Contents</Link> &ndash; Contents for reports and books</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compare classes and options with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Set up your document class with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor picks the right class for a paper, thesis or book, converts
              a document between classes, and compiles your document in seconds.
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
