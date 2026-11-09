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

const breadcrumbs = getLearnBreadcrumbs('Title Page in LaTeX', 'title-page')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'title-page',
  title: 'Title Page in LaTeX: \\maketitle, titlepage and Custom Designs',
  seoTitle: 'Title Page in LaTeX: \\maketitle and titlepage',
  description: 'Make a title page in LaTeX: \\title, \\author, \\date and \\maketitle, the titlepage environment for custom designs with a logo, a thesis example and fixes.',
  keywords: 'titlepage, latex title page, title page latex, latex titlepage, maketitle, latex maketitle, begin titlepage, titlepage environment, latex custom title page, latex thesis title page, latex title page logo, latex title page template, latex title author date, latex thanks, latex and author, titlepage class option, notitlepage, titling package, no title given, latex blank page after title page, latex title page page number',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I make a title page in LaTeX?',
    answer:
      'Put \\title{...}, \\author{...} and \\date{...} in the preamble and write \\maketitle right after \\begin{document}. In the article class the title appears at the top of the first page; add the titlepage class option, or use the report or book class, to give it a page of its own.',
  },
  {
    question: 'What is the difference between \\maketitle and the titlepage environment?',
    answer:
      '\\maketitle typesets the title, author and date in the class’s standard layout. The titlepage environment is an empty page with no header, footer or page number, where you place everything yourself: logo, rules, title, author, supervisor and date. Use \\maketitle for papers and titlepage for theses, reports and anything with a custom design.',
  },
  {
    question: 'How do I put the title on a separate page in an article?',
    answer:
      'Use the class option: \\documentclass[titlepage]{article}. \\maketitle then produces a page of its own and the text starts on the next page. The opposite option, notitlepage, keeps the title on the first page in report and book.',
  },
  {
    question: 'How do I add a logo to a LaTeX title page?',
    answer:
      'Load graphicx with \\usepackage{graphicx} and put \\includegraphics[width=0.3\\textwidth]{logo} inside the titlepage environment, or inside \\title{...} if you use \\maketitle. The file (logo.png, logo.jpg or logo.pdf) must be in the same folder as the .tex file or in a path set with \\graphicspath.',
  },
  {
    question: 'How do I remove the page number from the title page?',
    answer:
      'The titlepage environment and a titlepage produced by \\maketitle already have no page number. With \\maketitle on the first page of an article, add \\thispagestyle{empty} right after \\maketitle. \\maketitle sets the plain style itself, so the command has to come after it, not before.',
  },
  {
    question: 'Why do I get a blank page after my title page?',
    answer:
      'The titlepage environment already ends the page, so an extra \\newpage or \\clearpage after \\end{titlepage} adds an empty page. In the book class, which is two-sided with openright by default, chapters start on a right-hand page, so a blank left page after the title is intended; use the openany or oneside class option if you do not want it.',
  },
]

export default async function LearnTitlePagePage() {
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
          <h1>Title Page in LaTeX: \maketitle, titlepage and Custom Designs</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Standard title:</strong> <code>{`\\title{...}`}</code>,{' '}
                <code>{`\\author{...}`}</code>, <code>{`\\date{...}`}</code> in the preamble, then{' '}
                <code>\maketitle</code> after <code>{`\\begin{document}`}</code>.
              </li>
              <li>
                <strong>Custom title page:</strong> <code>{`\\begin{titlepage} ... \\end{titlepage}`}</code>,
                a blank page with no number where you place everything yourself.
              </li>
              <li>
                <strong>Footnote on the title or author:</strong> <code>{`\\thanks{...}`}</code>;
                several authors are separated with <code>\and</code>.
              </li>
              <li>
                <strong>Separate page in an article:</strong> <code>{`\\documentclass[titlepage]{article}`}</code>.{' '}
                <code>report</code> and <code>book</code> do this by default.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}

\\title{A Study of Analytical Engines}
\\author{Ada Lovelace\\thanks{Supported by the Royal Society.}
  \\and Charles Babbage}
\\date{\\today}

\\begin{document}
\\maketitle

The text starts here.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Every LaTeX class knows how to make a title: you declare the title, author and date
            and <code>\maketitle</code> sets them. When the standard layout is not enough, for a
            thesis, a report or a cover with a logo, the <code>titlepage</code> environment gives
            you an empty page to design. This guide covers both, shows a complete custom title
            page and a thesis title page you can copy, and fixes the errors that come up most.
            Every snippet compiles as shown.
          </p>

          {/* ── maketitle ── */}
          <h2>How to Make a Title Page with \maketitle</h2>
          <p>
            <code>\maketitle</code> reads three declarations, which usually go in the preamble
            (they only have to come before <code>\maketitle</code>):
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>What it sets</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\title{...}`}</code></td><td>The title</td><td>Required; <code>\\</code> breaks a long title into lines</td></tr>
                <tr><td><code>{`\\author{...}`}</code></td><td>Author names</td><td>Separate authors with <code>\and</code>; <code>\\</code> adds an affiliation line under a name</td></tr>
                <tr><td><code>{`\\date{...}`}</code></td><td>The date line</td><td>Defaults to <code>\today</code>; <code>{`\\date{}`}</code> removes it</td></tr>
                <tr><td><code>{`\\thanks{...}`}</code></td><td>A footnote on the title or an author</td><td>Funding, emails, &ldquo;corresponding author&rdquo;; marked with symbols, not numbers</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            A title with two authors, affiliations and a fixed date:
          </p>
          <pre><code>{`\\documentclass{article}

\\title{On the Mechanical Computation of Bernoulli Numbers\\\\
  \\large A Second Look}
\\author{Ada Lovelace\\thanks{Corresponding author: ada@example.org}\\\\
  Analytical Engine Lab
  \\and
  Charles Babbage\\\\
  University of Cambridge}
\\date{10 December 1843}

\\begin{document}
\\maketitle

\\begin{abstract}
  The abstract follows the title in the article class.
\\end{abstract}

\\section{Introduction}
Text.
\\end{document}`}</code></pre>
          <p>
            Each author block is centered under the title, and the blocks separated by{' '}
            <code>\and</code> sit side by side when they fit. Use <code>\And</code> only in
            classes that define it, such as some conference templates; the standard classes
            only know <code>\and</code>.
          </p>

          {/* ── titlepage option ── */}
          <h2>The titlepage Class Option: Article, Report and Book</h2>
          <p>
            Whether <code>\maketitle</code> produces a page of its own depends on the class. The{' '}
            <code>titlepage</code> and <code>notitlepage</code> class options switch it:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Default</th>
                  <th>Change it with</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>article</code></td><td>Title on top of page 1, text follows on the same page</td><td><code>{`\\documentclass[titlepage]{article}`}</code></td></tr>
                <tr><td><code>report</code></td><td>Title on its own page, no page number</td><td><code>{`\\documentclass[notitlepage]{report}`}</code></td></tr>
                <tr><td><code>book</code></td><td>Title on its own page, no page number</td><td><code>{`\\documentclass[notitlepage]{book}`}</code></td></tr>
                <tr><td><code>scrartcl</code>, <code>scrreprt</code>, <code>scrbook</code></td><td>Like article / report / book</td><td><code>titlepage=true</code> or <code>titlepage=false</code></td></tr>
                <tr><td><code>beamer</code></td><td><code>\titlepage</code> inside a frame</td><td>See <Link href="/learn/beamer">Beamer</Link></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass[titlepage]{article}  % title gets its own page

\\title{Quarterly Report}
\\author{Finance Team}

\\begin{document}
\\maketitle
\\section{Summary}
The report starts on the second sheet.
\\end{document}`}</code></pre>

          {/* ── titlepage environment ── */}
          <h2>Custom Title Page with \begin&#123;titlepage&#125;</h2>
          <p>
            The <code>titlepage</code> environment starts a new page with no header, footer or
            page number and leaves the layout entirely to you. A few tools do most of the work:{' '}
            <code>\centering</code>, the size commands from <code>\Large</code> to{' '}
            <code>\Huge</code> (see <Link href="/learn/font-size">font size</Link>),{' '}
            <code>\vspace</code> for fixed gaps, <code>\vfill</code> to push the rest to the
            bottom, and <code>\rule</code> for horizontal lines. This example adds a logo with{' '}
            <code>graphicx</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}

\\begin{document}

\\begin{titlepage}
  \\centering
  \\includegraphics[width=0.3\\textwidth]{example-image}\\par   % your logo
  \\vspace{1.5cm}
  {\\scshape\\Large Analytical Engine Lab\\par}
  \\vspace{1.5cm}
  \\rule{\\linewidth}{0.5pt}\\par
  \\vspace{0.4cm}
  {\\Huge\\bfseries Notes on the Analytical Engine\\par}
  \\vspace{0.4cm}
  \\rule{\\linewidth}{0.5pt}\\par
  \\vspace{1cm}
  {\\Large\\itshape Ada Lovelace\\par}
  \\vfill
  supervised by\\par
  Dr.~Charles \\textsc{Babbage}
  \\vfill
  {\\large \\today\\par}
\\end{titlepage}

\\section{Introduction}
The document continues on the next page.
\\end{document}`}</code></pre>
          <p>
            <code>example-image</code> is a placeholder from the <code>mwe</code> package that
            ships with TeX Live; replace it with your own file name, such as <code>logo</code>{' '}
            for <code>logo.png</code> or <code>logo.pdf</code>. Two details make the layout
            behave:
          </p>
          <ul>
            <li>
              End every group with <code>\par</code> before the closing brace, as in{' '}
              <code>{`{\\Huge\\bfseries Title\\par}`}</code>. Without it, a title that wraps onto
              a second line gets the line spacing of the normal text and the lines collide.
            </li>
            <li>
              <code>\vfill</code> splits the leftover space equally between every place it
              appears, so two <code>\vfill</code> commands give a balanced page. The commands
              are covered in more depth in <Link href="/learn/spacing">spacing in LaTeX</Link>.
            </li>
          </ul>
          <p>
            In the standard classes the page after a <code>titlepage</code> is numbered 1 again
            in one-sided documents, so the title page is not counted. The{' '}
            <Link href="/learn/page-numbering">page numbering guide</Link> shows how to use
            roman numerals for the front matter.
          </p>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Start from a finished template</h3>
            <p className="text-muted-foreground mb-4">
              The free thesis, dissertation and report templates come with the title page
              already laid out. Open one in Octree, change the names and the logo, and the PDF
              updates next to the code.
            </p>
            <Link
              href="https://tools.useoctree.com/templates/thesis"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open the thesis template &rarr;
            </Link>
          </div>

          {/* ── Thesis ── */}
          <h2>Thesis Title Page Example</h2>
          <p>
            Universities usually prescribe the content of a thesis title page: the institution,
            the title, the author, the degree statement, the department, the supervisor and the
            date. The same <code>titlepage</code> approach in the <code>report</code> class:
          </p>
          <pre><code>{`\\documentclass[12pt]{report}
\\usepackage[a4paper, margin=2.5cm]{geometry}
\\usepackage{graphicx}

\\begin{document}

\\begin{titlepage}
  \\centering
  {\\Large\\bfseries UNIVERSITY OF LONDON\\par}
  \\vspace{1cm}
  \\includegraphics[width=4cm]{example-image-a}\\par
  \\vspace{1.5cm}
  {\\huge\\bfseries Machine Learning Methods for\\\\ Protein Structure Prediction\\par}
  \\vspace{2cm}
  {\\Large Jane Doe\\par}
  \\vspace{1.5cm}
  A thesis submitted in partial fulfilment\\\\
  of the requirements for the degree of\\par
  \\vspace{0.5cm}
  {\\Large\\itshape Doctor of Philosophy\\par}
  \\vspace{0.5cm}
  in the\\\\
  Department of Computer Science\\par
  \\vfill
  \\begin{tabular}{rl}
    Supervisor:        & Prof.~John Smith \\\\
    Second supervisor: & Dr.~Mary Jones
  \\end{tabular}\\par
  \\vspace{1cm}
  {\\large September 2026\\par}
\\end{titlepage}

\\tableofcontents
\\chapter{Introduction}
Text.
\\end{document}`}</code></pre>
          <p>
            For APA-style student papers the rules are different again (title, author,
            affiliation, course, instructor and due date, all centered and double-spaced); the{' '}
            <Link href="/learn/apa-title-page">APA title page guide</Link> has the exact
            layout.
          </p>

          {/* ── titling ── */}
          <h2>Changing the \maketitle Layout with titling</h2>
          <p>
            If you like <code>\maketitle</code> but want a different font or spacing, the{' '}
            <code>titling</code> package lets you change each part without rewriting the
            command. Each of <code>\pretitle</code>, <code>\posttitle</code>,{' '}
            <code>\preauthor</code>, <code>\postauthor</code>, <code>\predate</code> and{' '}
            <code>\postdate</code> takes the code placed before or after that part:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{titling}

\\pretitle{\\begin{flushleft}\\Huge\\sffamily\\bfseries}
\\posttitle{\\par\\end{flushleft}\\vskip 0.5em}
\\preauthor{\\begin{flushleft}\\large}
\\postauthor{\\par\\end{flushleft}}
\\predate{\\begin{flushleft}\\small}
\\postdate{\\par\\end{flushleft}}
\\setlength{\\droptitle}{-4em}   % move the title up

\\title{Left-Aligned Title}
\\author{Ada Lovelace}
\\date{\\today}

\\begin{document}
\\maketitle
Text after the title.
\\end{document}`}</code></pre>
          <p>
            <code>titling</code> also stores the values as <code>\thetitle</code>,{' '}
            <code>\theauthor</code> and <code>\thedate</code>, which is handy for repeating the
            title in a header.
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
                  <td><em>LaTeX Error: No \title given</em></td>
                  <td><code>\maketitle</code> comes before <code>\title</code>, or <code>\title</code> is missing</td>
                  <td>Declare <code>{`\\title{...}`}</code> (and the author) before <code>\maketitle</code>, normally in the preamble</td>
                </tr>
                <tr>
                  <td>Blank page after the title page</td>
                  <td><code>\newpage</code> or <code>\clearpage</code> after <code>{`\\end{titlepage}`}</code>, which already ends the page; or <code>openright</code> in a two-sided book</td>
                  <td>Delete the extra page break; use <code>openany</code> or <code>oneside</code> if you do not want chapters on right-hand pages</td>
                </tr>
                <tr>
                  <td>Page number shown on page 1 under the title</td>
                  <td><code>\maketitle</code> sets the <code>plain</code> page style on its page</td>
                  <td><code>{`\\thispagestyle{empty}`}</code> on the line after <code>\maketitle</code></td>
                </tr>
                <tr>
                  <td><em>There&apos;s no line here to end</em></td>
                  <td><code>\\</code> after <code>\vfill</code>, <code>\par</code> or a blank line, where no line has started</td>
                  <td>Use <code>{`\\vspace{...}`}</code> for vertical space instead of <code>\\</code></td>
                </tr>
                <tr>
                  <td><em>File `logo.png&apos; not found</em></td>
                  <td>Logo not in the project folder, or the name does not match (case-sensitive)</td>
                  <td>Upload the file next to the <code>.tex</code> file or set <code>{`\\graphicspath{{images/}}`}</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\includegraphics</code></td>
                  <td><code>graphicx</code> is not loaded</td>
                  <td><code>{`\\usepackage{graphicx}`}</code> in the preamble</td>
                </tr>
                <tr>
                  <td>Title lines overlap when the title wraps</td>
                  <td>The size group closes before the paragraph ends</td>
                  <td>Add <code>\par</code> before the closing brace: <code>{`{\\Huge Title\\par}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The page-number fix in full; <code>\thispagestyle</code> must follow{' '}
            <code>\maketitle</code>, because <code>\maketitle</code> sets the style itself:
          </p>
          <pre><code>{`\\documentclass{article}
\\title{No Number on Page 1}
\\author{Ada Lovelace}
\\begin{document}
\\maketitle
\\thispagestyle{empty}
Text on the first page.
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make a title page in LaTeX?</h3>
          <p>
            Put <code>{`\\title{...}`}</code>, <code>{`\\author{...}`}</code> and{' '}
            <code>{`\\date{...}`}</code> in the preamble and write <code>\maketitle</code> right
            after <code>{`\\begin{document}`}</code>. In the article class the title appears at
            the top of the first page; add the <code>titlepage</code> class option, or use the
            report or book class, to give it a page of its own.
          </p>
          <h3>What is the difference between \maketitle and the titlepage environment?</h3>
          <p>
            <code>\maketitle</code> typesets the title, author and date in the class&rsquo;s
            standard layout. The <code>titlepage</code> environment is an empty page with no
            header, footer or page number, where you place everything yourself: logo, rules,
            title, author, supervisor and date. Use <code>\maketitle</code> for papers and{' '}
            <code>titlepage</code> for theses, reports and anything with a custom design.
          </p>
          <h3>How do I put the title on a separate page in an article?</h3>
          <p>
            Use the class option: <code>{`\\documentclass[titlepage]{article}`}</code>.{' '}
            <code>\maketitle</code> then produces a page of its own and the text starts on the
            next page. The opposite option, <code>notitlepage</code>, keeps the title on the
            first page in report and book.
          </p>
          <h3>How do I add a logo to a LaTeX title page?</h3>
          <p>
            Load graphicx with <code>{`\\usepackage{graphicx}`}</code> and put{' '}
            <code>{`\\includegraphics[width=0.3\\textwidth]{logo}`}</code> inside the{' '}
            <code>titlepage</code> environment, or inside <code>{`\\title{...}`}</code> if you
            use <code>\maketitle</code>. The file (logo.png, logo.jpg or logo.pdf) must be in
            the same folder as the .tex file or in a path set with <code>\graphicspath</code>.
          </p>
          <h3>How do I remove the page number from the title page?</h3>
          <p>
            The <code>titlepage</code> environment and a titlepage produced by{' '}
            <code>\maketitle</code> already have no page number. With <code>\maketitle</code> on
            the first page of an article, add <code>{`\\thispagestyle{empty}`}</code> right after{' '}
            <code>\maketitle</code>. <code>\maketitle</code> sets the plain style itself, so the
            command has to come after it, not before.
          </p>
          <h3>Why do I get a blank page after my title page?</h3>
          <p>
            The <code>titlepage</code> environment already ends the page, so an extra{' '}
            <code>\newpage</code> or <code>\clearpage</code> after{' '}
            <code>{`\\end{titlepage}`}</code> adds an empty page. In the <code>book</code> class,
            which is two-sided with <code>openright</code> by default, chapters start on a
            right-hand page, so a blank left page after the title is intended; use the{' '}
            <code>openany</code> or <code>oneside</code> class option if you do not want it.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/apa-title-page">APA Title Page in LaTeX</Link> &ndash; The student and professional APA 7 layouts</li>
            <li><Link href="/learn/page-numbering">Page Numbering in LaTeX</Link> &ndash; Roman numerals for the front matter, arabic for the body</li>
            <li><Link href="/learn/table-of-contents">Table of Contents</Link> &ndash; The page that usually follows the title</li>
            <li><Link href="/learn/fonts">Fonts in LaTeX</Link> &ndash; Font families and packages for a distinctive title</li>
            <li><Link href="/learn/spacing">Spacing in LaTeX</Link> &ndash; <code>\vspace</code>, <code>\vfill</code> and line spacing</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free Title Page Templates</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/thesis" target="_blank" rel="noopener noreferrer">Thesis Template</Link> &ndash; A thesis with title page, front matter and chapters</li>
            <li><Link href="https://tools.useoctree.com/templates/technical-report" target="_blank" rel="noopener noreferrer">Technical Report Template</Link> &ndash; A report with a custom cover page</li>
            <li><Link href="https://tools.useoctree.com/templates/apa-title-page" target="_blank" rel="noopener noreferrer">APA Title Page Template</Link> &ndash; APA 7 title page ready to fill in</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Paste a title page and see the PDF instantly</li>
          </ul>

          <RelatedPosts searchTerm="Thesis" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Design your title page with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe the title page your university or client wants, and Octree&apos;s AI
              writes the layout, places the logo and fixes the spacing, with the PDF compiled
              next to your code.
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
