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

const breadcrumbs = getLearnBreadcrumbs('Text Alignment in LaTeX', 'text-alignment')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'text-alignment',
  title: 'Text Alignment in LaTeX: Center, Flush Left, Flush Right and Justify',
  seoTitle: 'Text Alignment in LaTeX: Center, Left and Right',
  description: 'Align text in LaTeX: \\centering vs center, flushleft and flushright, \\raggedright, ragged2e, alignment in table cells, left-aligned equations and fixes.',
  keywords: 'latex align text, latex center text, center text latex, latex centering, centering latex, latex center, latex flushleft, latex flushright, latex align left, latex align right, latex right align text, latex raggedright, latex raggedleft, ragged2e, latex justify text, latex justify, latex justifying, latex center table, latex center figure, latex center image, latex align table cell, latex center column, latex center vertically, latex align equation left, fleqn, latex center environment, centering vs center',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I center text in LaTeX?',
    answer:
      'Wrap it in \\begin{center} ... \\end{center}, or put \\centering at the start of a group or float. Every line is centred, and \\\\ ends a line. Inside figure and table, use \\centering, because the center environment adds extra vertical space around the content.',
  },
  {
    question: 'What is the difference between \\centering and \\begin{center}?',
    answer:
      '\\centering is a declaration: it centres every paragraph until the end of the current group or environment and adds no space. The center environment is a list-like block that centres its contents and adds a gap above and below, like a paragraph break. Use center in running text and \\centering inside figures, tables and boxes.',
  },
  {
    question: 'How do I left-align or right-align text in LaTeX?',
    answer:
      'Use the flushleft or flushright environment for a block, or the \\raggedright and \\raggedleft declarations inside a group. For long left-aligned passages, load ragged2e and use \\RaggedRight, which keeps hyphenation so the right edge is less jagged.',
  },
  {
    question: 'How do I justify text in LaTeX?',
    answer:
      'Body text is justified by default, so you only need to undo a change. End the group that set \\raggedright or \\centering, or, with ragged2e loaded, write \\justifying or use the justify environment to switch back to full justification.',
  },
  {
    question: 'How do I center a column in a LaTeX table?',
    answer:
      'Use c in the column specification, as in \\begin{tabular}{lcr}. For a fixed-width column that wraps, load the array package and write >{\\centering\\arraybackslash}p{3cm}. To centre one cell in a left-aligned column, use \\multicolumn{1}{c}{text}.',
  },
  {
    question: 'How do I align equations to the left in LaTeX?',
    answer:
      'Add the fleqn class option, as in \\documentclass[fleqn]{article}, to set every display flush left at the indent \\mathindent. For a single equation, use the flalign environment from amsmath with an & at each end of the line.',
  },
]

export default async function LearnTextAlignmentPage() {
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
          <h1>Text Alignment in LaTeX: Center, Flush Left, Flush Right and Justify</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Center a block:</strong> <code>{`\\begin{center} ... \\end{center}`}</code>.
              </li>
              <li>
                <strong>Center inside a figure or table:</strong> <code>\centering</code> (no extra
                space).
              </li>
              <li>
                <strong>Left or right:</strong> <code>flushleft</code> / <code>flushright</code>,
                or <code>\raggedright</code> / <code>\raggedleft</code> in a group.
              </li>
              <li>
                <strong>Justified:</strong> the default; <code>\justifying</code> from{' '}
                <code>ragged2e</code> switches it back on.
              </li>
              <li>
                <strong>Table cells:</strong> <code>l c r</code> columns, or{' '}
                <code>{`>{\\centering\\arraybackslash}p{3cm}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\begin{document}

\\begin{center}
  Centred line one\\\\
  Centred line two
\\end{center}

\\begin{flushright}
  Right-aligned text
\\end{flushright}

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX justifies body text by default: every line runs from the left margin to the
            right, and the last line of a paragraph is set flush left. This guide is the reference
            for changing that: the three alignment environments, their declaration forms, the{' '}
            <code>ragged2e</code> package, and alignment in the places it causes trouble (figures,
            table cells, equations and the vertical centre of a page). For a step-by-step
            walkthrough, read the{' '}
            <Link href="/blog/text-alignment-latex-centering-flushing">text alignment
            walkthrough on the blog</Link>. Every example compiles with pdfLaTeX.
          </p>

          {/* ── Environments vs declarations ── */}
          <h2>Environments and Declarations</h2>
          <p>
            Each alignment has two forms. The <strong>environment</strong> starts a new paragraph,
            adds a little vertical space above and below, and ends at <code>\end</code>. The{' '}
            <strong>declaration</strong> changes alignment from where you write it to the end of
            the current group, with no added space:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Alignment</th>
                  <th>Environment</th>
                  <th>Declaration</th>
                  <th>ragged2e version</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Centred</td><td><code>center</code></td><td><code>\centering</code></td><td><code>\Centering</code>, <code>Center</code></td></tr>
                <tr><td>Flush left (ragged right)</td><td><code>flushleft</code></td><td><code>\raggedright</code></td><td><code>\RaggedRight</code>, <code>FlushLeft</code></td></tr>
                <tr><td>Flush right (ragged left)</td><td><code>flushright</code></td><td><code>\raggedleft</code></td><td><code>\RaggedLeft</code>, <code>FlushRight</code></td></tr>
                <tr><td>Justified</td><td>(default)</td><td>(default)</td><td><code>\justifying</code>, <code>justify</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Justified text, the default. This paragraph is long enough to wrap, so you can
see both edges line up with the margins of the page.

\\begin{flushleft}
Flush-left text keeps a straight left edge and a ragged right edge. This
paragraph is long enough to show the effect.
\\end{flushleft}

{\\raggedleft
Flush-right text with the declaration inside a group. The paragraph must end
before the closing brace, so it is followed by a par.\\par}

{\\centering Centred with the declaration.\\par}

\\end{document}`}</code></pre>
          <p>
            The declarations act on whole paragraphs, and LaTeX applies the alignment that is in
            force when the paragraph <em>ends</em>. That is why the examples end with{' '}
            <code>\par</code> before the closing brace: without it, the group closes first and the
            paragraph comes out justified.
          </p>

          {/* ── centering vs center ── */}
          <h2>\centering vs the center Environment</h2>
          <p>
            Both centre text. The difference is the space: <code>center</code> is built on a list,
            so it adds a gap above and below like a short quotation. That is right in running text
            and wrong inside a float, where it pushes the image away from its caption. Inside{' '}
            <code>figure</code> and <code>table</code>, always use <code>\centering</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\begin{document}

\\begin{figure}[ht]
  \\centering
  \\includegraphics[width=0.5\\linewidth]{example-image}
  \\caption{A centred figure.}
\\end{figure}

\\begin{table}[ht]
  \\centering
  \\caption{A centred table.}
  \\begin{tabular}{lr}
    Item & Value \\\\
    A    & 1.5
  \\end{tabular}
\\end{table}

\\end{document}`}</code></pre>
          <p>
            <code>\centering</code> lasts until the float ends, so one line covers the image and
            the caption. More on figure placement in the{' '}
            <Link href="/learn/images">figures guide</Link>.
          </p>

          {/* ── ragged2e ── */}
          <h2>Better Ragged Text with ragged2e</h2>
          <p>
            <code>\raggedright</code> turns off hyphenation in practice and removes the paragraph
            indent, so long ragged passages get a very uneven right edge. The{' '}
            <code>ragged2e</code> package adds versions that keep hyphenation, plus{' '}
            <code>\justifying</code> to return to justified text:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{ragged2e}
\\begin{document}

\\RaggedRight
This paragraph is ragged right, but unlike plain raggedright it still
hyphenates long words such as internationalization.

\\justifying
This paragraph is justified again, with both edges straight.

\\begin{FlushRight}
Right-aligned with ragged2e.
\\end{FlushRight}

\\end{document}`}</code></pre>
          <p>
            Put <code>\RaggedRight</code> in the preamble to make a whole document ragged right, a
            common choice for narrow columns, slides and posters.
          </p>

          {/* ── Tables ── */}
          <h2>Aligning Text in Table Cells</h2>
          <p>
            Column letters set the alignment of each column: <code>l</code>, <code>c</code> and{' '}
            <code>r</code>. A <code>p</code> column has a fixed width and wraps its text justified;
            prefix it with an alignment declaration from the <code>array</code> package to centre
            or right-align it. <code>\arraybackslash</code> restores <code>\\</code> as the
            row end:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{array}
\\newcolumntype{C}[1]{>{\\centering\\arraybackslash}p{#1}}
\\newcolumntype{R}[1]{>{\\raggedleft\\arraybackslash}p{#1}}
\\begin{document}

\\begin{tabular}{|l|c|r|C{2.5cm}|R{2cm}|}
  \\hline
  Left & Centre & Right & Wrapped and centred text & Wrapped, right \\\\
  \\hline
  \\multicolumn{1}{|c|}{One centred cell} & x & 10 & a & b \\\\
  \\hline
\\end{tabular}

\\end{document}`}</code></pre>
          <p>
            For vertical alignment inside a cell, use <code>m</code> (middle) or <code>b</code>{' '}
            (bottom) instead of <code>p</code>; both need <code>array</code>. The{' '}
            <Link href="/learn/tables">tables guide</Link> covers widths,{' '}
            <code>tabularx</code> and multi-row cells.
          </p>

          {/* ── Equations ── */}
          <h2>Aligning Equations Left</h2>
          <p>
            Displayed equations are centred. The <code>fleqn</code> class option sets them flush
            left, indented by <code>\mathindent</code>; <code>leqno</code> moves the numbers to the
            left. For one left-aligned equation in a centred document, use <code>flalign</code>:
          </p>
          <pre><code>{`\\documentclass[fleqn]{article}
\\usepackage{amsmath}
\\setlength{\\mathindent}{0pt}   % flush with the margin
\\begin{document}

\\begin{equation}
  E = mc^2
\\end{equation}

\\end{document}`}</code></pre>
          <p>
            Without <code>fleqn</code>, <code>flalign</code> pushes its first column pair to the
            left margin; the trailing <code>&amp;&amp;</code> adds an empty pair on the right:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\begin{equation}
  \\text{centred} = 1
\\end{equation}
\\begin{flalign}
  a + b &= c &&
\\end{flalign}

\\end{document}`}</code></pre>
          <p>
            To line up several equations on their <code>=</code> signs, see{' '}
            <Link href="/learn/multiline-equations">multiline equations</Link>.
          </p>

          {/* ── Vertical centring ── */}
          <h2>Centering Text Vertically on a Page</h2>
          <p>
            Fill the space above and below with <code>\vspace*{'{\\fill}'}</code>; the starred
            form keeps the space at the top of the page:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\thispagestyle{empty}
\\vspace*{\\fill}
\\begin{center}
  {\\Huge Centred on the page}\\\\[1em]
  Horizontally and vertically
\\end{center}
\\vspace*{\\fill}
\\clearpage

\\end{document}`}</code></pre>

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
                  <td><code>{`{\\centering text}`}</code> is not centred</td>
                  <td>The group closed before the paragraph ended</td>
                  <td><code>{`{\\centering text\\par}`}</code></td>
                </tr>
                <tr>
                  <td>Too much space above a figure</td>
                  <td><code>center</code> environment inside <code>figure</code></td>
                  <td><code>\centering</code></td>
                </tr>
                <tr>
                  <td>Everything after <code>\centering</code> is centred</td>
                  <td>A declaration lasts until its group ends</td>
                  <td>Wrap it in braces or use the <code>center</code> environment</td>
                </tr>
                <tr>
                  <td><em>Misplaced \noalign</em> or a broken row in a <code>p</code> column</td>
                  <td><code>\centering</code> redefined <code>\\</code> in the last cell</td>
                  <td>Add <code>\arraybackslash</code> after it</td>
                </tr>
                <tr>
                  <td>Ugly right edge in ragged text</td>
                  <td><code>\raggedright</code> barely hyphenates</td>
                  <td><code>\RaggedRight</code> from <code>ragged2e</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\justifying</code></td>
                  <td>Plain LaTeX has no justify command; it comes from <code>ragged2e</code></td>
                  <td><code>{`\\usepackage{ragged2e}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I center text in LaTeX?</h3>
          <p>
            Wrap it in <code>{`\\begin{center} ... \\end{center}`}</code>, or put{' '}
            <code>\centering</code> at the start of a group or float. Every line is centred, and{' '}
            <code>\\</code> ends a line. Inside <code>figure</code> and <code>table</code>, use{' '}
            <code>\centering</code>, because the <code>center</code> environment adds extra
            vertical space around the content.
          </p>
          <h3>What is the difference between \centering and \begin{'{center}'}?</h3>
          <p>
            <code>\centering</code> is a declaration: it centres every paragraph until the end of
            the current group or environment and adds no space. The <code>center</code>{' '}
            environment is a list-like block that centres its contents and adds a gap above and
            below, like a paragraph break. Use <code>center</code> in running text and{' '}
            <code>\centering</code> inside figures, tables and boxes.
          </p>
          <h3>How do I left-align or right-align text in LaTeX?</h3>
          <p>
            Use the <code>flushleft</code> or <code>flushright</code> environment for a block, or
            the <code>\raggedright</code> and <code>\raggedleft</code> declarations inside a group.
            For long left-aligned passages, load <code>ragged2e</code> and use{' '}
            <code>\RaggedRight</code>, which keeps hyphenation so the right edge is less jagged.
          </p>
          <h3>How do I justify text in LaTeX?</h3>
          <p>
            Body text is justified by default, so you only need to undo a change. End the group
            that set <code>\raggedright</code> or <code>\centering</code>, or, with{' '}
            <code>ragged2e</code> loaded, write <code>\justifying</code> or use the{' '}
            <code>justify</code> environment to switch back to full justification.
          </p>
          <h3>How do I center a column in a LaTeX table?</h3>
          <p>
            Use <code>c</code> in the column specification, as in{' '}
            <code>{`\\begin{tabular}{lcr}`}</code>. For a fixed-width column that wraps, load the{' '}
            <code>array</code> package and write{' '}
            <code>{`>{\\centering\\arraybackslash}p{3cm}`}</code>. To centre one cell in a
            left-aligned column, use <code>{`\\multicolumn{1}{c}{text}`}</code>.
          </p>
          <h3>How do I align equations to the left in LaTeX?</h3>
          <p>
            Add the <code>fleqn</code> class option, as in{' '}
            <code>{`\\documentclass[fleqn]{article}`}</code>, to set every display flush left at
            the indent <code>\mathindent</code>. For a single equation, use the{' '}
            <code>flalign</code> environment from amsmath with an <code>&amp;</code> at each end of
            the line.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> &ndash; Column types, widths and booktabs</li>
            <li><Link href="/learn/images">Figures in LaTeX</Link> &ndash; Centred images, captions and placement</li>
            <li><Link href="/learn/paragraphs-indentation">Paragraphs and Indentation</Link> &ndash; \noindent, \parindent and parskip</li>
            <li><Link href="/learn/line-breaks-blank-spaces">Line Breaks and Blank Spaces</Link> &ndash; \\, \newline, \vspace and \hfill</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a layout and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="alignment" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Align anything with AI</h3>
            <p className="text-muted-foreground mb-4">
              Tell Octree&apos;s AI to centre a table, right-align a signature block or set your
              equations flush left, and see the compiled PDF update next to your code.
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
