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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Footnotes', 'footnotes')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'footnotes',
  title: 'LaTeX Footnotes – Complete Guide 2026',
  description: 'How to add footnotes in LaTeX with \\footnote, put footnotes in tables, headings and captions, use symbols or no number, and change footnote size and spacing with footmisc.',
  keywords: 'latex footnote, footnote in latex, latex footnote table, footnote in table latex, latex footnote symbol, latex footnote without number, footnote size latex, latex footnotemark, latex footnotetext, threeparttable, footmisc, latex thanks footnote',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-10'

const faq: FaqItem[] = [
  {
    question: 'How do I add a footnote in LaTeX?',
    answer:
      'Put \\footnote{text} immediately after the relevant word or punctuation, without a preceding space. LaTeX inserts the mark and places the note at the bottom of the page.',
  },
  {
    question: 'How do I add notes to a LaTeX table?',
    answer:
      'Use threeparttable for notes attached beneath a floating table. These are table notes, not page footnotes. For a nonfloating tabular, put \\footnotemark in the cell and \\footnotetext immediately after the tabular.',
  },
  {
    question: 'Where do minipage footnotes appear?',
    answer:
      'A footnote inside a minipage appears at the bottom of that minipage, not at the page bottom. It uses the separate mpfootnote counter, normally printed as letters.',
  },
  {
    question: 'Why does a footnote link go to the wrong place?',
    answer:
      'With hyperref, manually numbered or repeated marks and separated mark/text commands need care: matching printed numbers do not guarantee matching PDF destinations. Check the compiled links; hyperfootnotes=false disables footnote links without disabling other hyperlinks.',
  },
]

export default async function LaTeXFootnotesPage() {
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
          <h1>LaTeX Footnotes</h1>
          <p className="lead">
            A footnote in LaTeX takes one command: <code>{`\\footnote{text}`}</code>. LaTeX
            numbers it, places the mark in the text, and typesets the note at the bottom of the
            page. For notes attached to a floating table, use <code>threeparttable</code> instead:
            those notes belong beneath the table, not at the bottom of the page. This guide covers the basics and then the cases that actually cause trouble
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
            Follow your publisher&apos;s punctuation rules. Many English styles put the mark
            after a comma or period even when the note concerns one word; other styles differ.
            For a sentence-level note, <code>{`sentence.\\footnote{...}`}</code> is common.
            Avoid a space before <code>\footnote</code>; it separates the mark from the text.
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
          <pre><code>{`\\section[Results]{Results\\footnotemark}
\\footnotetext{Preliminary data; see Section 4 for the full analysis.}`}</code></pre>
          <p>
            The short title in square brackets matters: without it the heading, including the
            mark can be copied to the table of contents and running headers.
            An unnumbered <code>\footnotemark</code> advances the footnote counter;
            <code>\footnotetext</code> uses its current value without advancing it. Keep the
            pair together, before another footnote changes the counter. Explicit forms such as{' '}
            <code>\footnotemark[2]</code> and <code>{`\\footnotetext[2]{...}`}</code> print
            that number without advancing the counter, so hard-coded numbers can collide with
            later automatic notes.
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
            For an actual page footnote, keep the mark in the cell and emit the text immediately
            after a nonfloating <code>tabular</code>. This complete example needs no packages:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\noindent
\\begin{tabular}{lr}
  Method & Accuracy \\\\
  Baseline & 91.2 \\\\
  Ours\\footnotemark & 94.7 \\\\
\\end{tabular}
\\footnotetext{Averaged over five runs.}
\\end{document}`}</code></pre>
          <p>
            Do not assume the same technique keeps a floating <code>table</code> and its
            footnote together. The note belongs to the page where <code>\footnotetext</code>
            is processed; the float may move elsewhere. Use attached table notes when that is
            the intended meaning, rather than moving the text command until one draft looks right.
          </p>

          <h3>2. threeparttable: notes directly under the table (recommended)</h3>
          <p>
            For table-specific notes, the <code>threeparttable</code> package puts the notes
            under the table itself, without creating page footnotes. Follow the journal&apos;s template if it prescribes another format. Use{' '}
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
            The <code>longtable</code> environment supports <code>\footnote</code> natively in the
            table body (not in the <code>\endhead</code>/<code>\endfoot</code> rows), so
            multi-page tables need nothing special. For a short table you can also wrap the{' '}
            <code>tabular</code> in a <code>minipage</code>; footnotes then appear at the bottom
            of the minipage, lettered <em>a</em>, <em>b</em>, <em>c</em> by the{' '}
            <code>mpfootnote</code> counter:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\noindent
\\begin{minipage}{\\linewidth}
  \\centering
  \\begin{tabular}{lr}
    Item & Value\\footnote{In thousands.} \\\\
    A & 12 \\\\
  \\end{tabular}
\\end{minipage}
\\end{document}`}</code></pre>
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
  \\caption[Loss curves]{Loss curves\\footnotemark[1] for all runs}
\\end{figure}
\\footnotetext[1]{Smoothed with a window of 50 steps.}`}</code></pre>
          <p>
            Captions may be measured and typeset more than once, so avoid a counter-advancing
            mark inside them. The explicit number above is illustrative, not an automatic
            numbering scheme. Prefer a short explanatory sentence in the caption itself for a
            floating figure; separating mark and text does not guarantee they land on the same page.
          </p>
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
            <code>symbol*</code> falls back to numbers and warns when you run out of symbols.
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
            <code>\thefootnote</code> from affecting later footnotes.
          </p>

          {/* ── Title / thanks ── */}
          <h2>Footnotes in the Title and Author Block</h2>
          <p>
            Inside <code>\title</code> and <code>\author</code>, use <code>\thanks</code> instead
            of <code>\footnote</code>. It produces a symbol-marked footnote (*, †, ‡) on the
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
            frames as normal; inside <code>columns</code> or a <code>minipage</code>, use{' '}
            <code>{`\\footnote[frame]{...}`}</code> to put the note at the bottom of the frame.{' '}
            The <Link href="/learn/beamer-footnote">Beamer footnotes guide</Link> covers
            footnotes without a number, overlays and citations on slides.
          </p>

          {/* ── hyperref ── */}
          <h2>Footnotes and hyperref</h2>
          <p>
            With <code>hyperref</code>, ordinary footnote marks normally link to their text.
            Manually numbered marks, repeated marks, and separated mark/text pairs need testing:
            the printed counter and the internal hyperlink destination are not the same thing.
            Matching numbers alone do not prove the link is correct. Compile twice and click
            the marks in the PDF, especially after rearranging notes.
          </p>
          <p>
            A short section title keeps marks out of the table of contents, but PDF bookmarks
            are a separate concern. Use <code>\texorpdfstring</code> to provide plain bookmark
            text if necessary. Follow your installed <code>footmisc</code> and document class
            documentation for compatibility. If footnote links remain unreliable, disable
            only those links, leaving ordinary references and URLs clickable:
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
                <td>Avoid a floating mark/text split or use table notes with <code>threeparttable</code></td>
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

\\title{Footnotes in Practice\\thanks{Draft of 10 November 2026.}}
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
              <tr><td>Notes attached to a table</td><td><code>threeparttable</code> with <code>{`\\tnote{a}`}</code> and <code>tablenotes</code></td></tr>
              <tr><td>Footnote in a heading</td><td><code>{`\\section[short]{Title\\protect\\footnote{text}}`}</code></td></tr>
              <tr><td>Symbols instead of numbers</td><td><code>{`\\renewcommand{\\thefootnote}{\\fnsymbol{footnote}}`}</code></td></tr>
              <tr><td>No number</td><td><code>{`\\blfootnote{text}`}</code> (helper above)</td></tr>
              <tr><td>Title-page footnote</td><td><code>{`\\thanks{text}`}</code> inside <code>\title</code> or <code>\author</code></td></tr>
              <tr><td>Reset the counter</td><td><code>{`\\setcounter{footnote}{0}`}</code></td></tr>
              <tr><td>Hanging indent, comma-separated marks</td><td><code>{`\\usepackage[hang, multiple]{footmisc}`}</code></td></tr>
              <tr><td>Space above the footnote area</td><td><code>{`\\setlength{\\skip\\footins}{1.5em}`}</code></td></tr>
            </tbody>
          </table>

          <h2>Frequently Asked Questions</h2>
          {faq.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </React.Fragment>
          ))}

          {/* ── Related Guides ── */}
          <h2>Related Guides</h2>
          <ul>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; booktabs, multicolumn, longtable and colored tables</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; hyperref, \url, \href and the hyperfootnotes option</li>
            <li><Link href="/learn/quotes">Quotes in LaTeX</Link> &ndash; Quotation marks, csquotes and block quotes with attribution</li>
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
              Open an example in Octree, compile it, and ask AI chat about a missing footnote.
              Check the PDF placement and links after applying a suggested change.
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
