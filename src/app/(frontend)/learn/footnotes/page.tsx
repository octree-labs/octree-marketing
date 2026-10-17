import type { Metadata } from 'next/types'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('LaTeX Footnotes', 'footnotes')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXFootnotesPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <h1>LaTeX Footnotes</h1>
          <p className="lead">
            A footnote in LaTeX takes one command: <code>{`\\footnote{text}`}</code>. LaTeX
            numbers it, places the mark in the text, and typesets the note at the bottom of the
            page. This guide covers the basics and then the cases that actually cause trouble
            &ndash; footnotes inside tables, section headings and captions, symbols instead of
            numbers, footnotes without a number, and how to change their size and spacing.
          </p>

          {/* ── Basic footnote ── */}
          <h2>Adding a Footnote</h2>
          <p>
            Put <code>\footnote</code> directly after the word or sentence it refers to, with no
            space before it. The argument is the footnote text:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

LaTeX was first released in 1984.\\footnote{Leslie Lamport wrote the
original version on top of Donald Knuth's \\TeX.} It is still the standard
for mathematical typesetting.

\\end{document}`}</code></pre>
          <p>
            Footnotes are numbered automatically with Arabic numerals. In the{' '}
            <code>article</code> class the counter runs through the whole document; in{' '}
            <code>book</code> and <code>report</code> it resets at every chapter. Footnote text
            can contain anything a normal paragraph can, including math, emphasis, and{' '}
            <code>\cite</code> commands.
          </p>

          <h3>Where the footnote mark goes</h3>
          <p>
            Place the command after punctuation if the note applies to the whole sentence
            (<code>{`sentence.\\footnote{...}`}</code>) and before punctuation if it applies to a
            single word (<code>{`word\\footnote{...},`}</code>). Avoid a space before{' '}
            <code>\footnote</code>; it would separate the mark from the text.
          </p>

          {/* ── footnotemark / footnotetext ── */}
          <h2>Splitting Mark and Text: footnotemark and footnotetext</h2>
          <p>
            <code>\footnote</code> does not work inside every environment. In those places LaTeX
            gives you two halves of the command: <code>\footnotemark</code> prints the number in
            the text, and <code>{`\\footnotetext{...}`}</code> prints the note at the bottom of the
            page. Use <code>\footnotemark</code> where <code>\footnote</code> fails, then call{' '}
            <code>\footnotetext</code> as soon as you are back in normal paragraph text:
          </p>
          <pre><code>{`\\section{Results\\footnotemark}
\\footnotetext{Preliminary data; see Section 4 for the full analysis.}`}</code></pre>
          <p>
            Both commands share the same counter, so they stay in sync as long as you keep them
            in order. If you need several marks before their texts, pass the number explicitly:{' '}
            <code>\footnotemark[2]</code> and <code>{`\\footnotetext[2]{...}`}</code>.
          </p>

          {/* ── Footnotes in tables ── */}
          <h2>Footnotes in Tables</h2>
          <p>
            The most common question about LaTeX footnotes: you write <code>\footnote</code>{' '}
            inside a <code>tabular</code>, the number appears, but the note itself never shows up.
            A <code>tabular</code> is typeset as a box, and footnotes created inside a box are
            lost. There are three good fixes.
          </p>

          <h3>1. footnotemark in the table, footnotetext after it</h3>
          <p>
            Keep the mark in the cell and emit the text right after the table. This works with a
            plain <code>table</code> float and needs no extra packages:
          </p>
          <pre><code>{`\\begin{table}[htbp]
  \\centering
  \\begin{tabular}{lrr}
    \\hline
    Method & Accuracy & Time (s) \\\\
    \\hline
    Baseline & 91.2 & 14 \\\\
    Ours\\footnotemark & 94.7 & 9 \\\\
    \\hline
  \\end{tabular}
  \\caption{Comparison of methods}
\\end{table}
\\footnotetext{Averaged over five runs.}`}</code></pre>
          <p>
            The drawback: if the float moves to another page, the note ends up on the page where
            the <code>\footnotetext</code> command sits, not under the table.
          </p>

          <h3>2. threeparttable: notes directly under the table (recommended)</h3>
          <p>
            For table-specific notes, the <code>threeparttable</code> package puts the notes
            under the table itself, which is what most journals expect. Use{' '}
            <code>\tnote</code> for the mark and a <code>tablenotes</code> environment for the
            text:
          </p>
          <pre><code>{`\\usepackage{booktabs, threeparttable}

\\begin{table}[htbp]
  \\centering
  \\begin{threeparttable}
    \\caption{Comparison of methods}
    \\begin{tabular}{lrr}
      \\toprule
      Method & Accuracy & Time (s) \\\\
      \\midrule
      Baseline & 91.2 & 14 \\\\
      Ours\\tnote{a} & 94.7\\tnote{b} & 9 \\\\
      \\bottomrule
    \\end{tabular}
    \\begin{tablenotes}
      \\footnotesize
      \\item[a] Averaged over five runs.
      \\item[b] Measured on the held-out test set.
    \\end{tablenotes}
  \\end{threeparttable}
\\end{table}`}</code></pre>
          <p>
            The notes stay attached to the table wherever it floats, and the markers (a, b, *,
            &dagger;) are independent of the document&apos;s footnote numbering.
          </p>

          <h3>3. longtable and minipage</h3>
          <p>
            The <code>longtable</code> environment supports <code>\footnote</code> natively, so
            multi-page tables need nothing special. For a short table you can also wrap the{' '}
            <code>tabular</code> in a <code>minipage</code>; footnotes then appear at the bottom
            of the minipage, lettered <em>a</em>, <em>b</em>, <em>c</em> by the{' '}
            <code>mpfootnote</code> counter:
          </p>
          <pre><code>{`\\begin{minipage}{\\linewidth}
  \\centering
  \\begin{tabular}{lr}
    Item & Value\\footnote{In thousands.} \\\\
    A & 12 \\\\
  \\end{tabular}
\\end{minipage}`}</code></pre>
          <p>
            To use numbers instead of letters inside a minipage, add{' '}
            <code>{`\\renewcommand{\\thempfootnote}{\\arabic{mpfootnote}}`}</code> to the preamble.
          </p>

          {/* ── Headings and captions ── */}
          <h2>Footnotes in Section Headings and Captions</h2>
          <p>
            Section titles and captions are <em>moving arguments</em>: LaTeX also writes them to
            the table of contents or list of figures, and an unprotected <code>\footnote</code>{' '}
            breaks there. Either protect it or use the mark/text split:
          </p>
          <pre><code>{`% Option 1: protect, and give the ToC a footnote-free short title
\\section[Methods]{Methods\\protect\\footnote{Expanded from the 2025 preprint.}}

% Option 2: footnotemark in the caption, footnotetext after the float
\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.6\\linewidth]{plot.pdf}
  \\caption[Loss curves]{Loss curves\\footnotemark{} for all runs}
\\end{figure}
\\footnotetext{Smoothed with a window of 50 steps.}`}</code></pre>
          <p>
            The optional short title in square brackets keeps the footnote out of the table of
            contents, where it would otherwise print a stray number.
          </p>

          {/* ── Symbols ── */}
          <h2>Footnote Symbols Instead of Numbers</h2>
          <p>
            Redefine <code>\thefootnote</code> to change how marks are printed. The{' '}
            <code>\fnsymbol</code> style gives the classic sequence *, &dagger;, &Dagger;,
            &sect;, &para;, &Vert;, **, &dagger;&dagger;, &Dagger;&Dagger;:
          </p>
          <pre><code>{`\\renewcommand{\\thefootnote}{\\fnsymbol{footnote}}  % * † ‡ § ¶ ‖
\\renewcommand{\\thefootnote}{\\alph{footnote}}      % a b c
\\renewcommand{\\thefootnote}{\\Roman{footnote}}     % I II III
\\renewcommand{\\thefootnote}{\\arabic{footnote}}    % 1 2 3 (default)`}</code></pre>
          <p>
            Only nine symbols exist, so symbol footnotes suit title pages and short documents.
            To switch styles for one part of the document, make the change inside a group or
            reset the counter with <code>{`\\setcounter{footnote}{0}`}</code> afterwards. The{' '}
            <code>footmisc</code> package offers the same thing as an option:{' '}
            <code>{`\\usepackage[symbol]{footmisc}`}</code>, and{' '}
            <code>symbol*</code> warns when you run out of symbols.
          </p>

          {/* ── Unnumbered ── */}
          <h2>Footnote Without a Number</h2>
          <p>
            Author affiliations, funding acknowledgements and copyright notes usually need a
            footnote with no mark at all. Define a small helper once in the preamble:
          </p>
          <pre><code>{`\\newcommand{\\blfootnote}[1]{%
  \\begingroup
  \\renewcommand{\\thefootnote}{}\\footnotetext{#1}%
  \\endgroup
}

% in the document
\\blfootnote{This work was supported by grant no. 12345.}`}</code></pre>
          <p>
            Because <code>\footnotetext</code> is used, no mark is printed in the text and the
            footnote counter is not advanced. The group keeps the redefinition of{' '}
            <code>\thefootnote</code> from affecting later footnotes. In <code>book</code> and{' '}
            <code>report</code> the counter still increments; add{' '}
            <code>{`\\addtocounter{footnote}{-1}`}</code> inside the group if you notice a skipped
            number.
          </p>

          {/* ── Title / thanks ── */}
          <h2>Footnotes in the Title and Author Block</h2>
          <p>
            Inside <code>\title</code> and <code>\author</code>, use <code>\thanks</code> instead
            of <code>\footnote</code>. It produces an unnumbered or symbol-marked footnote on the
            title page and does not interfere with the body numbering:
          </p>
          <pre><code>{`\\title{Fast Footnotes\\thanks{Supported by the Example Foundation.}}
\\author{Ada Lovelace\\thanks{Corresponding author: ada@example.edu}
  \\and Charles Babbage\\thanks{Analytical Engine Lab}}
\\maketitle`}</code></pre>

          {/* ── Size and spacing ── */}
          <h2>Changing Footnote Size, Spacing and the Rule</h2>
          <p>
            Footnote text is set in <code>\footnotesize</code> (8pt at the default 10pt body
            size). The layout is controlled by a few lengths you can set in the preamble:
          </p>
          <pre><code>{`% Space between the text and the footnote area
\\setlength{\\skip\\footins}{1.5em}

% Space between consecutive footnotes
\\setlength{\\footnotesep}{0.8em}

% Longer rule above the footnotes (default is 0.4\\columnwidth)
\\renewcommand{\\footnoterule}{%
  \\kern -3pt
  \\hrule width \\textwidth height 0.4pt
  \\kern 2.6pt
}

% No rule at all
\\renewcommand{\\footnoterule}{}`}</code></pre>
          <p>
            For the typographic details, load <code>footmisc</code>. Its options cover most
            publisher requirements:
          </p>
          <pre><code>{`\\usepackage[hang, flushmargin, bottom, multiple]{footmisc}
\\setlength{\\footnotemargin}{0.8em}`}</code></pre>
          <ul>
            <li><code>hang</code> &ndash; hanging indent so wrapped lines align under the text, not the number</li>
            <li><code>flushmargin</code> &ndash; the mark sits flush with the left margin</li>
            <li><code>bottom</code> &ndash; push footnotes to the page bottom even on short pages</li>
            <li><code>multiple</code> &ndash; separate adjacent marks with commas: text<sup>1,2</sup> instead of text<sup>12</sup></li>
            <li><code>para</code> &ndash; run short footnotes together in one paragraph</li>
            <li><code>perpage</code> &ndash; restart numbering on every page</li>
            <li><code>symbol</code> / <code>symbol*</code> &ndash; symbol marks, as above</li>
          </ul>
          <p>
            To make every footnote slightly larger or smaller, redefine the size command:{' '}
            <code>{`\\renewcommand{\\footnotesize}{\\small}`}</code>. In Beamer, footnotes work in
            frames as normal and can be placed per frame with{' '}
            <code>{`\\footnote[frame]{...}`}</code>.
          </p>

          {/* ── hyperref ── */}
          <h2>Footnotes and hyperref</h2>
          <p>
            With <code>hyperref</code> loaded, every footnote mark becomes a clickable link to its
            text. This occasionally clashes with <code>footmisc</code> options and with footnotes
            in tables. If you see <em>&ldquo;Hyper reference ... undefined&rdquo;</em> warnings or
            broken links, disable footnote links only:
          </p>
          <pre><code>{`\\usepackage[hyperfootnotes=false]{hyperref}`}</code></pre>

          {/* ── Troubleshooting ── */}
          <h2>Common Problems and Fixes</h2>
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
                <td>Footnote number appears but the text is missing</td>
                <td><code>\footnote</code> inside <code>tabular</code>, a box, or <code>\parbox</code></td>
                <td>Use <code>\footnotemark</code> + <code>\footnotetext</code>, <code>threeparttable</code>, or a <code>minipage</code></td>
              </tr>
              <tr>
                <td><em>Argument of \@sect has an extra {'}'}</em></td>
                <td>Unprotected footnote in a <code>\section</code> title</td>
                <td>Write <code>\protect\footnote</code> and add a short title in <code>[ ]</code></td>
              </tr>
              <tr>
                <td>Footnotes lettered a, b, c instead of numbered</td>
                <td>They are inside a <code>minipage</code> (counter <code>mpfootnote</code>)</td>
                <td><code>{`\\renewcommand{\\thempfootnote}{\\arabic{mpfootnote}}`}</code></td>
              </tr>
              <tr>
                <td>Two marks run together as <sup>12</sup></td>
                <td>Adjacent footnotes without a separator</td>
                <td><code>{`\\usepackage[multiple]{footmisc}`}</code></td>
              </tr>
              <tr>
                <td>Numbering restarts unexpectedly</td>
                <td><code>book</code>/<code>report</code> reset the counter per chapter</td>
                <td>Load <code>chngcntr</code> and add <code>{`\\counterwithout{footnote}{chapter}`}</code></td>
              </tr>
              <tr>
                <td>Footnote text lands on the wrong page</td>
                <td><code>\footnotetext</code> placed far from where the float ends up</td>
                <td>Move the <code>\footnotetext</code> or switch to <code>threeparttable</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{booktabs, threeparttable}
\\usepackage[hang, flushmargin, multiple]{footmisc}
\\usepackage[hyperfootnotes=false]{hyperref}

\\newcommand{\\blfootnote}[1]{%
  \\begingroup
  \\renewcommand{\\thefootnote}{}\\footnotetext{#1}%
  \\endgroup
}

\\title{Footnotes in Practice\\thanks{Draft of 17 October 2026.}}
\\author{A. Author\\thanks{Department of Examples, Sample University}}

\\begin{document}
\\maketitle
\\blfootnote{Code and data are available from the authors on request.}

\\section{Introduction}
Footnotes carry asides,\\footnote{Like this one.} sources,\\footnote{See the
documentation of the \\texttt{footmisc} package.} and clarifications without
interrupting the argument.

\\begin{table}[htbp]
  \\centering
  \\begin{threeparttable}
    \\caption{Runtime per configuration}
    \\begin{tabular}{lr}
      \\toprule
      Configuration & Seconds \\\\
      \\midrule
      Default & 14.2 \\\\
      Tuned\\tnote{*} & 9.1 \\\\
      \\bottomrule
    \\end{tabular}
    \\begin{tablenotes}
      \\footnotesize
      \\item[*] Mean of five runs on the same machine.
    \\end{tablenotes}
  \\end{threeparttable}
\\end{table}

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Basic footnote</td><td><code>{`\\footnote{text}`}</code></td></tr>
              <tr><td>Mark only / text only</td><td><code>\footnotemark</code> / <code>{`\\footnotetext{text}`}</code></td></tr>
              <tr><td>Footnote in a table</td><td><code>threeparttable</code> with <code>{`\\tnote{a}`}</code> and <code>tablenotes</code></td></tr>
              <tr><td>Footnote in a heading</td><td><code>{`\\section[short]{Title\\protect\\footnote{text}}`}</code></td></tr>
              <tr><td>Symbols instead of numbers</td><td><code>{`\\renewcommand{\\thefootnote}{\\fnsymbol{footnote}}`}</code></td></tr>
              <tr><td>No number</td><td><code>{`\\blfootnote{text}`}</code> (helper above)</td></tr>
              <tr><td>Title-page footnote</td><td><code>{`\\thanks{text}`}</code> inside <code>\title</code> or <code>\author</code></td></tr>
              <tr><td>Reset the counter</td><td><code>{`\\setcounter{footnote}{0}`}</code></td></tr>
              <tr><td>Hanging indent, comma-separated marks</td><td><code>{`\\usepackage[hang, multiple]{footmisc}`}</code></td></tr>
              <tr><td>Space above the footnote area</td><td><code>{`\\setlength{\\skip\\footins}{1.5em}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Related Guides ── */}
          <h2>Related Guides</h2>
          <ul>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; booktabs, multicolumn, longtable and colored tables</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Control page layout with the geometry package</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; Text formatting commands and packages</li>
            <li><Link href="/learn/lists">LaTeX Lists</Link> &ndash; Itemize, enumerate and description lists</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test footnote code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX entries for your sources</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix footnote problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor spots footnotes that vanish inside tables and headings,
              suggests the right package, and compiles your document in seconds.
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
  return {
    title: 'LaTeX Footnotes – Complete Guide 2026',
    description: 'How to add footnotes in LaTeX with \\footnote, put footnotes in tables, headings and captions, use symbols or no number, and change footnote size and spacing with footmisc.',
    keywords: 'latex footnote, footnote in latex, latex footnote table, footnote in table latex, latex footnote symbol, latex footnote without number, footnote size latex, latex footnotemark, latex footnotetext, threeparttable, footmisc, latex thanks footnote',
    openGraph: mergeOpenGraph({
      title: 'LaTeX Footnotes – Complete Guide 2026',
      description: 'Footnotes in LaTeX: \\footnote basics, footnotes in tables and headings, symbols, unnumbered notes, and styling with footmisc.',
      type: 'article',
      url: '/learn/footnotes',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'LaTeX Footnotes – Complete Guide',
      description: 'Add footnotes in LaTeX, including inside tables, headings and captions.',
    },
    alternates: {
      canonical: '/learn/footnotes',
    },
  }
}
