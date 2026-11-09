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

const breadcrumbs = getLearnBreadcrumbs('Two Columns in LaTeX', 'multiple-columns')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'multiple-columns',
  title: 'Two Columns in LaTeX: twocolumn, multicol and \\multicolumn in Tables',
  seoTitle: 'Two Columns in LaTeX: twocolumn, multicol, Tables',
  description: 'Two columns in LaTeX: the twocolumn option, the multicol package with \\columnbreak and \\columnsep, figure* across columns, and \\multicolumn in tables.',
  keywords: 'two column latex, latex two column, two columns latex, latex multicol, multicol latex, multicolumn latex, latex multicolumn, latex multicols, twocolumn latex, latex columnbreak, latex columnsep, latex columnseprule, latex figure across two columns, latex figure star, latex table across two columns, latex three columns, latex multicolumn table, latex multicolumn multirow, latex merge cells, latex onecolumn abstract twocolumn, misplaced omit, floats not allowed inside multicols',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I make a two-column document in LaTeX?',
    answer:
      'Add the twocolumn option to the document class: \\documentclass[twocolumn]{article}. Every page is then set in two columns. To put only part of the document in columns, load the multicol package and wrap that part in \\begin{multicols}{2} … \\end{multicols} instead.',
  },
  {
    question: 'What is the difference between twocolumn and multicol?',
    answer:
      'The twocolumn class option makes the whole document two columns; columns are not balanced on the last page and figure and table floats work normally. The multicol package makes columns for a part of a page, supports 2 or more columns, balances them at the end and lets you switch between one and several columns on the same page, but ordinary floats are not allowed inside.',
  },
  {
    question: 'How do I make a figure span two columns in LaTeX?',
    answer:
      'Use the starred environment: \\begin{figure*} … \\end{figure*}, with \\includegraphics[width=\\textwidth]. The same works for tables with table*. A spanning float can only go at the top of a page or on a float page, so it appears at the top of the next page at the earliest; [h] is not supported.',
  },
  {
    question: 'How do I force a column break in LaTeX?',
    answer:
      'Inside a multicols environment, write \\columnbreak where the new column should start; it needs the multicol package. In a document with the twocolumn option, \\newpage ends the current column and \\clearpage ends the page.',
  },
  {
    question: 'How do I merge cells across columns in a LaTeX table?',
    answer:
      'Use \\multicolumn{number}{alignment}{content} in place of the cells to merge, for example \\multicolumn{2}{c}{Results} spans two columns with centred text. It must be the first thing in its cell, and the merged cells count toward the total, so a row still adds up to the number of columns in the table. Merging rows needs \\multirow from the multirow package.',
  },
  {
    question: 'How do I change the space between columns?',
    answer:
      'Set \\columnsep in the preamble: \\setlength{\\columnsep}{1cm}. A vertical rule between the columns comes from \\setlength{\\columnseprule}{0.4pt}. Both work for twocolumn and multicol. In tables the gap between cells is a different length, \\tabcolsep.',
  },
]

export default async function LearnMultipleColumnsPage() {
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
          <h1>Two Columns in LaTeX: twocolumn, multicol and \multicolumn in Tables</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Whole document:</strong> <code>{`\\documentclass[twocolumn]{article}`}</code>.
              </li>
              <li>
                <strong>Part of a page, any number of columns:</strong>{' '}
                <code>{`\\usepackage{multicol}`}</code> and{' '}
                <code>{`\\begin{multicols}{2} ... \\end{multicols}`}</code>; <code>\columnbreak</code>{' '}
                starts the next column.
              </li>
              <li>
                <strong>Gap and rule:</strong> <code>{`\\setlength{\\columnsep}{1cm}`}</code>,{' '}
                <code>{`\\setlength{\\columnseprule}{0.4pt}`}</code>.
              </li>
              <li>
                <strong>Figure across both columns:</strong>{' '}
                <code>{`\\begin{figure*}[t] ... \\end{figure*}`}</code> (also <code>table*</code>).
              </li>
              <li>
                <strong>Not the same thing:</strong> <code>{`\\multicolumn{2}{c}{text}`}</code> merges
                two cells of a <em>table</em> row.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{multicol}
\\setlength{\\columnsep}{1cm}
\\setlength{\\columnseprule}{0.4pt}

\\begin{document}
One-column introduction.
\\begin{multicols}{2}
Left column text. \\columnbreak
Right column text.
\\end{multicols}

\\begin{tabular}{lcc}
          & \\multicolumn{2}{c}{Score} \\\\
  Name    & Test 1 & Test 2 \\\\
  Ada     & 91     & 95
\\end{tabular}
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            &ldquo;Two columns&rdquo; means two different things in LaTeX. Page columns, where the
            text flows down one column and continues in the next, come from the{' '}
            <code>twocolumn</code> class option or the <code>multicol</code> package. Merged table
            cells, where one cell spans several columns of a table, come from{' '}
            <code>\multicolumn</code>. This guide covers both: when to use{' '}
            <code>twocolumn</code> or <code>multicols</code>, how to set the column gap and force
            a column break, how to make figures span both columns, and how{' '}
            <code>\multicolumn</code> works in tables, with the errors each one produces.
          </p>

          {/* ── twocolumn ── */}
          <h2>Two-Column Documents: the twocolumn Option</h2>
          <p>
            The <code>twocolumn</code> option of the standard classes (article, report, book) sets
            every page in two columns. It is what most conference and journal templates use. To
            keep the title and abstract across the full width, pass them to{' '}
            <code>\twocolumn</code> as an optional argument:
          </p>
          <pre><code>{`\\documentclass[twocolumn]{article}
\\usepackage{lipsum}
\\setlength{\\columnsep}{0.8cm}

\\title{A Two-Column Paper}
\\author{Ada Lovelace}

\\begin{document}
\\twocolumn[
  \\begin{@twocolumnfalse}
    \\maketitle
    \\begin{abstract}
      This abstract runs across the full page width, above both columns.
    \\end{abstract}
    \\bigskip
  \\end{@twocolumnfalse}
]

\\section{Introduction}
\\lipsum[1-3]

\\section{Method}
\\lipsum[4-6]
\\end{document}`}</code></pre>
          <p>
            The <code>{`@twocolumnfalse`}</code> wrapper lets <code>\maketitle</code> and the
            abstract environment act as in one-column mode. Without the optional argument,{' '}
            <code>\maketitle</code> alone already spans both columns in the standard classes; the
            abstract does not. <code>\onecolumn</code> and <code>\twocolumn</code> in the body
            switch modes but always start a new page.
          </p>
          <p>
            Inside a column, <code>\columnwidth</code> is the width of one column and{' '}
            <code>\textwidth</code> the width of both plus the gap. Size images in an ordinary{' '}
            <code>figure</code> with <code>{`width=\\columnwidth`}</code>.
          </p>

          {/* ── figure* ── */}
          <h2>Figures and Tables Spanning Both Columns: figure*</h2>
          <p>
            In a two-column document, <code>figure</code> and <code>table</code> are one column
            wide. Their starred forms, <code>figure*</code> and <code>table*</code>, span both
            columns:
          </p>
          <pre><code>{`\\documentclass[twocolumn]{article}
\\usepackage{graphicx,lipsum}

\\begin{document}
\\section{Results}
\\lipsum[1]

\\begin{figure*}[t]
  \\centering
  \\rule{0.9\\textwidth}{4cm}   % stands in for \\includegraphics[width=0.9\\textwidth]{plot}
  \\caption{A figure across both columns.}
  \\label{fig:wide}
\\end{figure*}

\\begin{figure}[t]
  \\centering
  \\rule{\\columnwidth}{3cm}    % one column wide
  \\caption{A figure in one column.}
\\end{figure}

Figure~\\ref{fig:wide} is placed at the top of the next page. \\lipsum[2-5]
\\end{document}`}</code></pre>
          <p>
            A spanning float can only go at the top of a page (<code>[t]</code>) or on a page of
            floats (<code>[p]</code>), and LaTeX places it on the page after the one where it
            appears in the source at the earliest. <code>[h]</code> and <code>[b]</code> are not
            supported; the <code>stfloats</code> package adds bottom placement. Move the{' '}
            <code>figure*</code> earlier in the source if it lands too late. Float placement in
            general is covered in <Link href="/learn/tables">tables</Link>.
          </p>

          {/* ── multicol ── */}
          <h2>The multicol Package: \begin{`{multicols}`}</h2>
          <p>
            The <code>multicol</code> package puts any part of a page into columns and switches
            back to one column on the same page. It supports two, three or more columns and
            balances them so they end at the same height:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{multicol,lipsum}
\\setlength{\\columnsep}{1cm}
\\setlength{\\columnseprule}{0.4pt}   % vertical line between columns

\\begin{document}
\\section{One column}
\\lipsum[1]

\\begin{multicols}{3}[\\section{Three columns}]
\\lipsum[2]
\\columnbreak            % start the next column here
\\lipsum[3]
\\end{multicols}

\\begin{multicols*}{2}   % starred: fill columns, no balancing
\\lipsum[4]
\\end{multicols*}
\\end{document}`}</code></pre>
          <p>
            The optional argument after the column count (here <code>{`[\\section{...}]`}</code>)
            is set in one column above the columns and kept on the same page as them. Useful
            settings:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Setting</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\begin{multicols}{3}`}</code></td><td>Three balanced columns</td></tr>
                <tr><td><code>{`\\begin{multicols*}{2}`}</code></td><td>Columns filled one after the other, not balanced</td></tr>
                <tr><td><code>\columnbreak</code></td><td>Starts the next column at this point</td></tr>
                <tr><td><code>{`\\setlength{\\columnsep}{1cm}`}</code></td><td>Gap between columns (default 10pt)</td></tr>
                <tr><td><code>{`\\setlength{\\columnseprule}{0.4pt}`}</code></td><td>Rule between columns (default 0pt, no rule)</td></tr>
                <tr><td><code>\raggedcolumns</code></td><td>Columns may end at different heights instead of stretching space</td></tr>
                <tr><td><code>{`\\setlength{\\multicolsep}{6pt}`}</code></td><td>Space above and below the environment</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Figures inside multicols</h3>
          <p>
            Ordinary floats are not allowed inside <code>multicols</code>: multicol warns
            &ldquo;Floats and marginpars not allowed inside multicols environment!&rdquo; and the
            figure is lost. Use <code>figure*</code> to span all columns, or place the image
            directly with <code>\captionof</code> from the <code>caption</code> package:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{multicol,caption,lipsum}

\\begin{document}
\\begin{multicols}{2}
\\lipsum[1]

\\begin{center}
  \\rule{0.9\\linewidth}{2.5cm}    % \\includegraphics[width=0.9\\linewidth]{plot}
  \\captionof{figure}{A figure in one column of a multicols block.}
\\end{center}

\\lipsum[2]
\\end{multicols}
\\end{document}`}</code></pre>

          {/* ── comparison ── */}
          <h2>twocolumn vs multicol</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>[twocolumn]</code> option</th>
                  <th><code>multicol</code> package</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Scope</td><td>Whole document</td><td>Any part of a page</td></tr>
                <tr><td>Columns</td><td>Two</td><td>Two or more</td></tr>
                <tr><td>Last page balanced</td><td>No (use <code>flushend</code> or <code>balance</code>)</td><td>Yes (unless <code>multicols*</code>)</td></tr>
                <tr><td>Floats</td><td><code>figure</code> one column, <code>figure*</code> both</td><td>Only <code>figure*</code> / <code>table*</code></td></tr>
                <tr><td>Column break</td><td><code>\newpage</code> ends the column</td><td><code>\columnbreak</code></td></tr>
                <tr><td>Footnotes</td><td>At the foot of the column</td><td>Across the full page width</td></tr>
                <tr><td>Typical use</td><td>Journal and conference papers</td><td>Newsletters, CVs, lists, a two-column section</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            If a journal template already uses <code>twocolumn</code>, do not add{' '}
            <code>multicols</code> on top of it. For a three-column list inside a one-column
            report, <code>multicols</code> is the right tool; see also{' '}
            <Link href="/learn/lists">lists</Link>.
          </p>

          {/* ── multicolumn ── */}
          <h2>\multicolumn in LaTeX Tables</h2>
          <p>
            <code>{`\\multicolumn{n}{alignment}{content}`}</code> is a table command, unrelated to
            page columns. It replaces <code>n</code> cells of a row with one cell that spans
            them, with its own alignment (<code>l</code>, <code>c</code>, <code>r</code> or{' '}
            <code>{`p{width}`}</code>, plus <code>|</code> for vertical rules):
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{booktabs,multirow}

\\begin{document}
\\begin{tabular}{lccc}
  \\toprule
  \\multirow{2}{*}{Model} & \\multicolumn{3}{c}{Accuracy (\\%)} \\\\
  \\cmidrule(lr){2-4}
                         & Train & Validation & Test \\\\
  \\midrule
  Baseline               & 91.2  & 88.4       & 87.9 \\\\
  Ours                   & 95.7  & 93.1       & 92.8 \\\\
  \\midrule
  \\multicolumn{4}{l}{\\footnotesize Mean of five runs.} \\\\
  \\bottomrule
\\end{tabular}

\\bigskip
\\begin{tabular}{|l|r|r|}
  \\hline
  \\multicolumn{3}{|c|}{Totals} \\\\
  \\hline
  Item & Q1 & Q2 \\\\
  \\hline
  \\multicolumn{1}{|c|}{centred} & 10 & 20 \\\\
  \\hline
\\end{tabular}
\\end{document}`}</code></pre>
          <p>
            Three rules make <code>\multicolumn</code> work. It must be the first thing in its
            cell. The spanned cells still count, so <code>{`\\multicolumn{3}{c}{...}`}</code> in
            a four-column table leaves one more cell in that row. And the alignment argument
            replaces the column&apos;s own, including its vertical rules, which is why the second
            table writes <code>|c|</code>. <code>{`\\multicolumn{1}{c}{...}`}</code> is the
            standard way to change the alignment of a single cell. To span rows instead, use{' '}
            <code>\multirow</code> from the <code>multirow</code> package. More on table layout
            in <Link href="/learn/tables">LaTeX tables</Link>.
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
                  <td><em>Undefined control sequence</em> at <code>\columnbreak</code></td>
                  <td><code>multicol</code> not loaded, or <code>\columnbreak</code> used with the twocolumn option</td>
                  <td><code>{`\\usepackage{multicol}`}</code>; in twocolumn use <code>\newpage</code></td>
                </tr>
                <tr>
                  <td><em>Package multicol Warning: Floats and marginpars not allowed inside multicols environment!</em></td>
                  <td>A <code>figure</code>, <code>table</code> or <code>\marginpar</code> inside <code>multicols</code>; it disappears</td>
                  <td><code>figure*</code>, or a non-floating image with <code>\captionof</code></td>
                </tr>
                <tr>
                  <td><code>figure*</code> appears a page late or at the end</td>
                  <td>Spanning floats only go at the top of a later page</td>
                  <td>Use <code>[t]</code> or <code>[tp]</code> and move it earlier in the source</td>
                </tr>
                <tr>
                  <td>Last page columns uneven in a twocolumn paper</td>
                  <td>twocolumn does not balance columns</td>
                  <td><code>{`\\usepackage{flushend}`}</code> or the <code>balance</code> package</td>
                </tr>
                <tr>
                  <td><em>Extra alignment tab has been changed to \cr</em></td>
                  <td>A row has more cells than the table has columns, often because the cells spanned by <code>\multicolumn</code> were not counted</td>
                  <td>Make each row add up: <code>{`\\multicolumn{2}{c}{...}`}</code> counts as two cells</td>
                </tr>
                <tr>
                  <td><em>Misplaced \omit</em></td>
                  <td><code>\multicolumn</code> is not the first thing in its cell, e.g. <code>{`x \\multicolumn{...}`}</code></td>
                  <td>Start the cell with <code>\multicolumn</code>; put other content inside it</td>
                </tr>
                <tr>
                  <td>Vertical rule missing next to a merged cell</td>
                  <td>The alignment in <code>\multicolumn</code> replaces the column&apos;s rules</td>
                  <td>Repeat them: <code>{`\\multicolumn{2}{|c|}{...}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make a two-column document in LaTeX?</h3>
          <p>
            Add the <code>twocolumn</code> option to the document class:{' '}
            <code>{`\\documentclass[twocolumn]{article}`}</code>. Every page is then set in two
            columns. To put only part of the document in columns, load the multicol package and
            wrap that part in <code>{`\\begin{multicols}{2}`}</code> &hellip;{' '}
            <code>{`\\end{multicols}`}</code> instead.
          </p>
          <h3>What is the difference between twocolumn and multicol?</h3>
          <p>
            The <code>twocolumn</code> class option makes the whole document two columns; columns
            are not balanced on the last page and figure and table floats work normally. The
            multicol package makes columns for a part of a page, supports 2 or more columns,
            balances them at the end and lets you switch between one and several columns on the
            same page, but ordinary floats are not allowed inside.
          </p>
          <h3>How do I make a figure span two columns in LaTeX?</h3>
          <p>
            Use the starred environment: <code>{`\\begin{figure*}`}</code> &hellip;{' '}
            <code>{`\\end{figure*}`}</code>, with <code>{`\\includegraphics[width=\\textwidth]`}</code>.
            The same works for tables with <code>table*</code>. A spanning float can only go at
            the top of a page or on a float page, so it appears at the top of the next page at
            the earliest; <code>[h]</code> is not supported.
          </p>
          <h3>How do I force a column break in LaTeX?</h3>
          <p>
            Inside a <code>multicols</code> environment, write <code>\columnbreak</code> where the
            new column should start; it needs the multicol package. In a document with the{' '}
            <code>twocolumn</code> option, <code>\newpage</code> ends the current column and{' '}
            <code>\clearpage</code> ends the page.
          </p>
          <h3>How do I merge cells across columns in a LaTeX table?</h3>
          <p>
            Use <code>{`\\multicolumn{number}{alignment}{content}`}</code> in place of the cells to
            merge, for example <code>{`\\multicolumn{2}{c}{Results}`}</code> spans two columns with
            centred text. It must be the first thing in its cell, and the merged cells count
            toward the total, so a row still adds up to the number of columns in the table.
            Merging rows needs <code>\multirow</code> from the multirow package.
          </p>
          <h3>How do I change the space between columns?</h3>
          <p>
            Set <code>\columnsep</code> in the preamble:{' '}
            <code>{`\\setlength{\\columnsep}{1cm}`}</code>. A vertical rule between the columns
            comes from <code>{`\\setlength{\\columnseprule}{0.4pt}`}</code>. Both work for
            twocolumn and multicol. In tables the gap between cells is a different length,{' '}
            <code>\tabcolsep</code>.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; tabular, booktabs, multirow and table floats</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Text width and margins for column layouts</li>
            <li><Link href="/learn/spacing">Spacing in LaTeX</Link> &ndash; Horizontal and vertical space</li>
            <li><Link href="/learn/lists">Lists</Link> &ndash; Itemize and enumerate, also in columns</li>
            <li><Link href="/learn/appendix">Appendix in LaTeX</Link> &ndash; Lettered appendices after the main text</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; See a column layout compile instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Lay out two-column papers with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up two-column templates, moves figures across columns,
              fixes &ldquo;Misplaced \omit&rdquo; in tables and compiles your paper in seconds.
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
