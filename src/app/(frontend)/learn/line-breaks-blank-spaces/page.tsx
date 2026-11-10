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

const breadcrumbs = getLearnBreadcrumbs('Line Breaks and Blank Spaces', 'line-breaks-blank-spaces')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'line-breaks-blank-spaces',
  title: 'Line Breaks and Blank Spaces in LaTeX: \\\\, \\newline, \\vspace and \\hspace',
  seoTitle: 'LaTeX Line Break and New Line: \\\\, \\newline',
  description: 'New lines in LaTeX: \\\\ vs \\newline vs \\linebreak, paragraph breaks, blank lines with \\vspace, \\hspace and \\hfill, a line across the text, and the errors.',
  keywords: 'latex line break, latex new line, new line latex, line break latex, latex newline, latex \\\\, latex linebreak, newline vs linebreak, latex blank line, latex empty line, latex vspace, latex hspace, latex hfill, latex vfill, latex paragraph break, latex new paragraph, latex par, latex bigskip, latex medskip, latex horizontal line in text, latex hrulefill, there\'s no line here to end, latex underfull hbox, latex non-breaking space, latex space between words, latex new page, latex pagebreak, latex clearpage',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I make a new line in LaTeX?',
    answer:
      'Type \\\\ (two backslashes) or \\newline where the line should end. The text continues on the next line inside the same paragraph, with no indent. To start a new paragraph instead, leave a blank line in the source or write \\par; the new paragraph gets the normal first-line indent.',
  },
  {
    question: 'What is the difference between \\\\, \\newline and \\linebreak?',
    answer:
      '\\\\ and \\newline end the line and leave the rest of it empty (ragged), and \\\\ also takes an optional space such as \\\\[6pt]. \\linebreak ends the line but stretches the words to fill the full width, as in a justified paragraph, which often looks gappy and triggers an Underfull \\hbox warning.',
  },
  {
    question: 'How do I add a blank line in LaTeX?',
    answer:
      'A blank line in the source only starts a new paragraph; it never prints an empty line. To leave vertical space, use \\vspace{\\baselineskip} for exactly one empty line, \\bigskip, \\medskip or \\smallskip for standard gaps, or \\\\[\\baselineskip] at the end of a line.',
  },
  {
    question: 'Why do I get “There\'s no line here to end”?',
    answer:
      'LaTeX raises it when \\\\ or \\newline appears where no line of text has started: at the very beginning of a paragraph, right after a blank line, or twice in a row to fake a blank line. Delete the extra \\\\ and use \\vspace or \\bigskip for the space you wanted.',
  },
  {
    question: 'How do I add horizontal space in LaTeX?',
    answer:
      'Use \\hspace{1cm} for a fixed gap, \\quad and \\qquad for 1em and 2em, ~ for a space that never breaks, and \\hfill to push the following text to the right margin. At the start of a line, \\hspace* keeps space that \\hspace would drop.',
  },
]

export default async function LearnLineBreaksBlankSpacesPage() {
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
          <h1>Line Breaks and Blank Spaces in LaTeX: \\, \newline, \vspace and \hspace</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>New line, same paragraph:</strong> <code>\\</code> or{' '}
                <code>\newline</code>. Add space with <code>{`\\\\[6pt]`}</code>.
              </li>
              <li>
                <strong>New paragraph:</strong> a blank line in the source, or <code>\par</code>.
              </li>
              <li>
                <strong>Blank line in the output:</strong>{' '}
                <code>{`\\vspace{\\baselineskip}`}</code> or <code>\bigskip</code>, never{' '}
                <code>\\ \\</code>.
              </li>
              <li>
                <strong>Horizontal space:</strong> <code>{`\\hspace{1cm}`}</code>,{' '}
                <code>\quad</code>, <code>~</code>, and <code>\hfill</code> to push text right.
              </li>
              <li>
                <strong>New page:</strong> <code>\newpage</code>, or <code>\clearpage</code> to
                also place pending figures.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\begin{document}

First line\\\\
Second line, same paragraph\\\\[6pt]
Third line, 6pt lower.

A new paragraph starts after a blank line.

\\vspace{\\baselineskip}   % one empty line
Left text \\hfill right text

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX decides where lines end on its own, and most of the time you should let it. When
            you do need a break (an address, a poem, a signature block, a gap before a heading),
            the right command depends on what you want: a new line inside a paragraph, a new
            paragraph, or empty space. This guide covers <code>\\</code>,{' '}
            <code>\newline</code> and <code>\linebreak</code>, paragraph breaks, vertical space
            with <code>\vspace</code>, horizontal space with <code>\hspace</code> and{' '}
            <code>\hfill</code>, a line drawn across the text, and the errors that come from
            fighting the line breaker. Every example compiles with pdfLaTeX.
          </p>

          {/* ── New line ── */}
          <h2>New Line in LaTeX: \\ vs \newline vs \linebreak</h2>
          <p>
            Three commands end a line, and they are not the same. <code>\\</code> and{' '}
            <code>\newline</code> end the line where you put them and leave the rest of it blank.{' '}
            <code>\linebreak</code> ends the line too, but justifies it first, stretching the
            words across the full width:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

This line ends with two backslashes\\\\
and continues here, in the same paragraph.

This line ends with newline\\newline
and continues here as well.

This line ends with linebreak, so its words are stretched\\linebreak
to the full width, like every other line of a justified paragraph.

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Line before the break</th>
                  <th>Optional argument</th>
                  <th>Use it for</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\\</code></td><td>Left ragged</td><td><code>[length]</code> extra space below, e.g. <code>{`\\\\[2mm]`}</code></td><td>Addresses, poems, title blocks, table rows</td></tr>
                <tr><td><code>\\*</code></td><td>Left ragged, no page break after it</td><td><code>[length]</code></td><td>Keeping two lines on the same page</td></tr>
                <tr><td><code>\newline</code></td><td>Left ragged</td><td>None</td><td>The same as <code>\\</code> in running text; also breaks a line inside a <code>p</code> table cell</td></tr>
                <tr><td><code>\linebreak[n]</code></td><td>Stretched to full width</td><td><code>0</code>&ndash;<code>4</code>, from a hint to a demand</td><td>Nudging the line breaker, rarely</td></tr>
                <tr><td><code>\nolinebreak[n]</code></td><td>No break here</td><td><code>0</code>&ndash;<code>4</code></td><td>Discouraging a break at one spot</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Inside <code>tabular</code>, <code>align</code> and other environments with rows,{' '}
            <code>\\</code> ends the row, which is why it is the command you will see most. Inside
            a section title it moves into the table of contents too; give the short form as an
            optional argument, as in{' '}
            <code>{`\\section[Short title]{Long\\\\title}`}</code>.
          </p>

          {/* ── Paragraph break ── */}
          <h2>Paragraph Break: Blank Line or \par</h2>
          <p>
            A blank line in the source ends the paragraph; so does <code>\par</code>. Several
            blank lines count as one, so they never add space. The new paragraph starts with the
            normal indent (none after a heading in English documents):
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

The first paragraph ends here.

The second paragraph is indented. \\par
So is the third, which starts after \\verb|\\par|.

\\noindent The fourth has no indent.

\\end{document}`}</code></pre>
          <p>
            If you want space between paragraphs instead of indents, load{' '}
            <code>{`\\usepackage{parskip}`}</code> rather than ending every paragraph with{' '}
            <code>\\</code>. The{' '}
            <Link href="/learn/paragraphs-indentation">paragraphs and indentation guide</Link>{' '}
            covers <code>\parindent</code>, <code>\parskip</code> and hanging indents.
          </p>

          {/* ── Vertical space ── */}
          <h2>Blank Lines and Vertical Space: \vspace, \bigskip and \vfill</h2>
          <p>
            To leave empty space between lines, ask for it by size. <code>\vspace</code> takes any
            length, and the skip commands give standard gaps that scale with the font:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\vspace*{2cm}          % starred: kept even at the top of a page
\\begin{center}
  {\\LARGE Report Title}\\\\[1em]
  A.~Author
\\end{center}

Text before a gap.

\\vspace{\\baselineskip} % exactly one empty line
Text after one empty line.

\\smallskip Small skip. \\medskip Medium skip. \\bigskip Big skip.

Text in the middle of the page.

\\vfill                 % push what follows to the bottom
Signed: \\rule{4cm}{0.4pt}

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Space</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\vspace{1cm}`}</code></td><td>Any length; negative values pull text up</td><td>Dropped at the top or bottom of a page</td></tr>
                <tr><td><code>{`\\vspace*{1cm}`}</code></td><td>Same</td><td>Kept at the top of a page (title pages)</td></tr>
                <tr><td><code>\smallskip</code>, <code>\medskip</code>, <code>\bigskip</code></td><td>About 3pt, 6pt, 12pt</td><td>Stretchable, so pages still balance</td></tr>
                <tr><td><code>{`\\vspace{\\baselineskip}`}</code></td><td>One line of the current font</td><td>The honest &ldquo;blank line&rdquo;</td></tr>
                <tr><td><code>\vfill</code></td><td>All remaining space</td><td>Several <code>\vfill</code> share it equally</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>\vspace</code> in the middle of a paragraph waits for the current line to end
            before it adds space. Line spacing (double spacing, <code>\linespread</code>,{' '}
            <code>setspace</code>) is a separate setting covered in the{' '}
            <Link href="/learn/spacing">spacing guide</Link>.
          </p>

          {/* ── Horizontal space ── */}
          <h2>Horizontal Space: \hspace, \quad, ~ and \hfill</h2>
          <p>
            Several spaces in the source print as one, and spaces at the start of a line are
            ignored. Ask for horizontal space with a command instead:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\noindent
A\\hspace{1cm}B \\\\
A\\quad B\\qquad C \\\\
\\hspace*{2em}Indented by 2em with \\verb|\\hspace*| \\\\
Name: John Smith \\hfill Date: 9 November 2026 \\\\
Left \\hfill Centre \\hfill Right \\\\
Fig.~1 and Dr.~Smith never break at the tilde.

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Width</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\,</code> / <code>\thinspace</code></td><td>1/6 em (thin space)</td></tr>
                <tr><td><code>\␣</code> (backslash space)</td><td>A normal interword space, e.g. after <code>e.g.\␣</code></td></tr>
                <tr><td><code>~</code></td><td>A normal space that never breaks</td></tr>
                <tr><td><code>\quad</code> / <code>\qquad</code></td><td>1 em / 2 em</td></tr>
                <tr><td><code>{`\\hspace{len}`}</code> / <code>{`\\hspace*{len}`}</code></td><td>Any length; the starred form survives a line start</td></tr>
                <tr><td><code>\hfill</code></td><td>All remaining space on the line</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── Horizontal line ── */}
          <h2>A Horizontal Line in the Text</h2>
          <p>
            For a rule across the text, start a new paragraph and draw it at the text width.{' '}
            <code>\hrulefill</code> fills the rest of a line with a rule, which is handy for
            forms:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Text above the line.

\\noindent\\rule{\\linewidth}{0.4pt}

Text below the line.

\\noindent Name: \\hrulefill \\\\[1em]
Signature: \\hrulefill \\quad Date: \\rule{3cm}{0.4pt}

\\end{document}`}</code></pre>
          <p>
            Thickness, colour, dashed rules and lines in tables are covered in the{' '}
            <Link href="/learn/horizontal-lines">horizontal lines guide</Link>.
          </p>

          {/* ── Page breaks ── */}
          <h2>Page Breaks: \newpage, \clearpage and \pagebreak</h2>
          <p>
            <code>\newpage</code> starts a new page (or column, in a two-column document).{' '}
            <code>\clearpage</code> does the same after placing every figure and table still
            waiting, and <code>\cleardoublepage</code> also skips to an odd page in two-sided
            documents. <code>\pagebreak</code> is the page-level <code>\linebreak</code>: it
            breaks the page but stretches the text to fill it.
          </p>

          {/* ── Mistakes ── */}
          <h2>Common Mistakes</h2>
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
                  <td><em>LaTeX Error: There&apos;s no line here to end.</em></td>
                  <td><code>\\</code> right after a blank line, at the start of a paragraph or environment, or <code>\\ \\</code> to fake a blank line</td>
                  <td>Delete it; use <code>{`\\vspace{\\baselineskip}`}</code> or <code>\bigskip</code></td>
                </tr>
                <tr>
                  <td><em>Underfull \hbox (badness 10000) in paragraph</em></td>
                  <td><code>\\</code> at the end of a paragraph, or <code>\linebreak</code> on a short line</td>
                  <td>End the paragraph with a blank line only; prefer <code>\\</code> to <code>\linebreak</code></td>
                </tr>
                <tr>
                  <td>Every paragraph ends with <code>\\</code> to get space between paragraphs</td>
                  <td>Working around the indent</td>
                  <td><code>{`\\usepackage{parskip}`}</code></td>
                </tr>
                <tr>
                  <td><code>\vspace</code> at the top of a page does nothing</td>
                  <td>Space is discarded at page breaks</td>
                  <td><code>{`\\vspace*{...}`}</code></td>
                </tr>
                <tr>
                  <td>Extra spaces in the source do not show</td>
                  <td>LaTeX collapses runs of spaces into one</td>
                  <td><code>\quad</code>, <code>{`\\hspace{...}`}</code> or <code>~</code></td>
                </tr>
                <tr>
                  <td>The line after <code>\\</code> starts with <code>[</code> and vanishes or throws <em>Illegal unit of measure</em></td>
                  <td><code>\\</code> reads the <code>[...]</code> as its optional space argument</td>
                  <td>Write <code>{`\\\\{}[text]`}</code> or <code>{`\\\\ \\relax [text]`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make a new line in LaTeX?</h3>
          <p>
            Type <code>\\</code> (two backslashes) or <code>\newline</code> where the line should
            end. The text continues on the next line inside the same paragraph, with no indent. To
            start a new paragraph instead, leave a blank line in the source or write{' '}
            <code>\par</code>; the new paragraph gets the normal first-line indent.
          </p>
          <h3>What is the difference between \\, \newline and \linebreak?</h3>
          <p>
            <code>\\</code> and <code>\newline</code> end the line and leave the rest of it empty
            (ragged), and <code>\\</code> also takes an optional space such as{' '}
            <code>{`\\\\[6pt]`}</code>. <code>\linebreak</code> ends the line but stretches the
            words to fill the full width, as in a justified paragraph, which often looks gappy and
            triggers an Underfull <code>\hbox</code> warning.
          </p>
          <h3>How do I add a blank line in LaTeX?</h3>
          <p>
            A blank line in the source only starts a new paragraph; it never prints an empty line.
            To leave vertical space, use <code>{`\\vspace{\\baselineskip}`}</code> for exactly one
            empty line, <code>\bigskip</code>, <code>\medskip</code> or <code>\smallskip</code> for
            standard gaps, or <code>{`\\\\[\\baselineskip]`}</code> at the end of a line.
          </p>
          <h3>Why do I get &ldquo;There&apos;s no line here to end&rdquo;?</h3>
          <p>
            LaTeX raises it when <code>\\</code> or <code>\newline</code> appears where no line of
            text has started: at the very beginning of a paragraph, right after a blank line, or
            twice in a row to fake a blank line. Delete the extra <code>\\</code> and use{' '}
            <code>\vspace</code> or <code>\bigskip</code> for the space you wanted.
          </p>
          <h3>How do I add horizontal space in LaTeX?</h3>
          <p>
            Use <code>{`\\hspace{1cm}`}</code> for a fixed gap, <code>\quad</code> and{' '}
            <code>\qquad</code> for 1em and 2em, <code>~</code> for a space that never breaks, and{' '}
            <code>\hfill</code> to push the following text to the right margin. At the start of a
            line, <code>\hspace*</code> keeps space that <code>\hspace</code> would drop.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/spacing">Spacing in LaTeX</Link> &ndash; Line spacing, math spaces and every length unit</li>
            <li><Link href="/learn/paragraphs-indentation">Paragraphs and Indentation</Link> &ndash; \noindent, \parindent and parskip</li>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines</Link> &ndash; \rule, \hrule and lines in tables</li>
            <li><Link href="/learn/text-alignment">Text Alignment</Link> &ndash; Centring and flush-left or flush-right text</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a layout and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="line break" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix spacing problems with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree compiles your document as you type and explains every warning. Ask its AI why
              a line will not break, or to replace a stack of <code>\\</code> with proper spacing,
              with the PDF next to your code.
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
