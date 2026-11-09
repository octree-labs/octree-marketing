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

const breadcrumbs = getLearnBreadcrumbs('Indentation in LaTeX', 'paragraphs-indentation')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'paragraphs-indentation',
  title: 'Indentation in LaTeX: \\indent, \\noindent, parindent and Tabs',
  seoTitle: 'Indentation in LaTeX: \\noindent, parindent, Tabs',
  description: 'Indent in LaTeX: the default first-line indent, \\noindent, \\parindent and parskip, \\indent, hanging indents, indented blocks and tabs with \\hspace.',
  keywords: 'latex indent, indentation latex, indentation in latex, how to indent in latex, tab in latex, latex tab, latex noindent, latex parindent, latex no indent, latex remove indentation, latex indent paragraph, latex indent first paragraph, indentfirst, latex hanging indent, latex hangindent, latex indent block, latex adjustwidth, latex quote indent, latex tabbing, latex hspace indent, latex parskip, latex paragraph',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I indent in LaTeX?',
    answer:
      'LaTeX indents the first line of every paragraph automatically; a blank line in the source starts a new paragraph. To indent a line by hand, use \\indent at the start of a paragraph or \\hspace*{2em} anywhere. To indent a whole block, use the quote environment or \\begin{adjustwidth}{2em}{0pt} from the changepage package.',
  },
  {
    question: 'How do I remove paragraph indentation in LaTeX?',
    answer:
      'For one paragraph, start it with \\noindent. For the whole document, put \\setlength{\\parindent}{0pt} in the preamble, or better \\usepackage{parskip}, which also adds space between paragraphs so they stay distinguishable. Remember the unit: \\setlength{\\parindent}{0} gives the error “Illegal unit of measure”.',
  },
  {
    question: 'Why is the first paragraph after a section not indented?',
    answer:
      'That is the English typographic convention, and the standard classes follow it: the first paragraph after \\section, \\chapter or similar headings has no indent. \\indent does not override it. Load \\usepackage{indentfirst} to indent every first paragraph, as French and some other styles require.',
  },
  {
    question: 'How do I make a tab in LaTeX?',
    answer:
      'The Tab key does nothing: LaTeX treats a tab character like a space, and runs of spaces collapse into one. Use \\hspace*{2em} for a fixed gap (the star keeps it at the start of a line), \\quad or \\qquad for 1em or 2em, and the tabbing environment with \\= and \\> for real tab stops. For aligned columns, a tabular is usually better.',
  },
  {
    question: 'How do I create a hanging indent in LaTeX?',
    answer:
      'Start the paragraph with \\hangindent=2em \\hangafter=1 and then the text: every line after the first is indented by 2em. The settings apply to that paragraph only, so repeat them for each paragraph or define a macro. For a reference list, the bibliography styles and biblatex already produce hanging indents.',
  },
  {
    question: 'How do I change the size of the paragraph indent?',
    answer:
      'Set \\setlength{\\parindent}{2em} in the preamble (any length works, such as 1cm or 20pt). The default depends on the font size option: 15pt for 10pt documents, 17pt for 11pt and 1.5em for 12pt in the standard classes. Using em keeps the indent proportional to the font.',
  },
]

export default async function LearnParagraphsIndentationPage() {
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
          <h1>Indentation in LaTeX: \indent, \noindent, parindent and Tabs</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Default:</strong> a blank line starts a new paragraph, and its first line
                is indented by <code>\parindent</code> (except right after a heading).
              </li>
              <li>
                <strong>No indent for one paragraph:</strong> start it with <code>\noindent</code>.
              </li>
              <li>
                <strong>No indent anywhere:</strong> <code>{`\\setlength{\\parindent}{0pt}`}</code>, or{' '}
                <code>{`\\usepackage{parskip}`}</code> for space between paragraphs instead.
              </li>
              <li>
                <strong>Force an indent:</strong> <code>\indent</code> at the start of a paragraph;{' '}
                <code>{`\\usepackage{indentfirst}`}</code> to indent first paragraphs too.
              </li>
              <li>
                <strong>Hanging indent:</strong> <code>\hangindent=2em \hangafter=1</code> before the
                text.
              </li>
              <li>
                <strong>Indent a block:</strong> <code>quote</code>, or{' '}
                <code>{`\\begin{adjustwidth}{2em}{0pt}`}</code> from <code>changepage</code>.
              </li>
              <li>
                <strong>A &ldquo;tab&rdquo;:</strong> the Tab key does nothing; use{' '}
                <code>{`\\hspace*{2em}`}</code>, <code>\quad</code>, or the <code>tabbing</code>{' '}
                environment.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\setlength{\\parindent}{2em}   % size of the first-line indent

\\begin{document}
This first paragraph is indented by 2em.

\\noindent This paragraph starts at the margin.

\\hspace*{4em}A manual gap, like pressing Tab twice.

\\hangindent=2em \\hangafter=1
A hanging indent: the first line is flush left and every following line
is indented by 2em, as in a reference list or a glossary entry.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX handles paragraph indentation on its own: every new paragraph gets a
            first-line indent, sized to the font, and the paragraph right after a heading gets
            none. Indentation in LaTeX therefore comes down to a few switches: turn the indent
            off for one paragraph or the whole document, change its size, force it where LaTeX
            leaves it out, and indent things that are not first lines, such as hanging indents,
            quoted blocks and tab-like gaps. This guide covers each one and the errors they
            cause.
          </p>

          {/* ── Default ── */}
          <h2>How Paragraph Indentation Works in LaTeX</h2>
          <p>
            A blank line (or <code>\par</code>) ends a paragraph. The next paragraph starts with
            a horizontal gap of width <code>\parindent</code>. Pressing Enter once does not start
            a paragraph, and neither does <code>{`\\\\`}</code>: it breaks the line inside the
            same paragraph, so the next line is not indented.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\section{Introduction}
This first paragraph after the heading is not indented.
Pressing Enter once keeps the text in the same paragraph.

A blank line starts a new paragraph, which is indented.\\\\
A line after \\textbackslash\\textbackslash{} is a new line,
not a new paragraph, so it is not indented.
\\end{document}`}</code></pre>
          <p>
            The default indent depends on the class and the size option. In the standard classes
            (<code>article</code>, <code>report</code>, <code>book</code>):
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Class option</th>
                  <th>Default <code>\parindent</code></th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>10pt</code> (default)</td><td>15pt</td></tr>
                <tr><td><code>11pt</code></td><td>17pt</td></tr>
                <tr><td><code>12pt</code></td><td>1.5em (18pt)</td></tr>
                <tr><td><code>twocolumn</code></td><td>1em</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Change it in the preamble with <code>{`\\setlength{\\parindent}{2em}`}</code>. Using{' '}
            <code>em</code> keeps the indent in proportion to the font size; see{' '}
            <Link href="/learn/font-size">font size</Link> for the size options.
          </p>

          {/* ── noindent ── */}
          <h2>Removing Indentation: \noindent and parindent</h2>
          <p>
            <code>\noindent</code> at the very start of a paragraph suppresses its indent. To
            remove indentation from the whole document, set <code>\parindent</code> to zero.
            Without an indent, paragraphs only differ by the short last line, so add space
            between them; the <code>parskip</code> package does both and keeps lists and the
            table of contents tidy:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{parskip}   % parindent = 0, about half a line between paragraphs
% or by hand:
% \\setlength{\\parindent}{0pt}
% \\setlength{\\parskip}{0.5\\baselineskip}

\\begin{document}
First paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Second paragraph, set off by space instead of an indent.
\\end{document}`}</code></pre>
          <p>
            The <Link href="/learn/spacing">spacing guide</Link> covers <code>\parskip</code>{' '}
            and line spacing in more detail.
          </p>

          {/* ── indent ── */}
          <h2>Forcing an Indent: \indent and indentfirst</h2>
          <p>
            <code>\indent</code> at the start of a paragraph adds the normal indent; in the middle
            of a line it adds a gap of the same width. It does <em>not</em> work for the first
            paragraph after a heading, because the heading code removes the indent box. To indent
            those paragraphs too, load <code>indentfirst</code>, or use{' '}
            <code>{`\\hspace*{\\parindent}`}</code> for a single one:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{indentfirst}   % indent the first paragraph after headings

\\begin{document}
\\section{Method}
With indentfirst, this first paragraph is indented like the others.

\\noindent\\textbf{Note.} \\indent The \\textbackslash indent here,
inside the line, adds a gap of width \\textbackslash parindent.
\\end{document}`}</code></pre>

          {/* ── Hanging ── */}
          <h2>Hanging Indent in LaTeX</h2>
          <p>
            A hanging indent keeps the first line at the margin and indents the rest, as in
            reference lists and glossaries. <code>\hangindent</code> sets the amount and{' '}
            <code>\hangafter</code> the number of lines left unindented. Both apply to the
            current paragraph only and are reset afterwards, so a small macro saves repetition:
          </p>
          <pre><code>{`\\documentclass{article}
\\setlength{\\parindent}{0pt}
\\newcommand{\\hangpara}{\\hangindent=2em \\hangafter=1 }

\\begin{document}
\\hangpara
Knuth, D. E. (1984). \\textit{The TeXbook}. Addison-Wesley. A hanging indent
keeps the author at the margin and indents the following lines.

\\hangpara
Lamport, L. (1994). \\textit{LaTeX: A Document Preparation System},
second edition. Addison-Wesley, Reading, Massachusetts.

\\hangindent=3em \\hangafter=2
With \\textbackslash hangafter=2 the first two lines stay at the margin and the
indent starts on the third line, which shows how the two settings combine in
a longer paragraph like this one.
\\end{document}`}</code></pre>
          <p>
            For a real bibliography, let the reference style do it: biblatex and BibTeX styles
            such as APA already format entries with hanging indents (see{' '}
            <Link href="/learn/bibliography-examples">bibliography examples</Link>).
          </p>

          {/* ── Block ── */}
          <h2>Indenting a Whole Paragraph or Block</h2>
          <p>
            To indent every line of a passage, use an environment that changes the margins
            instead of a first-line command:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>quote</code></td><td>Indents both margins; paragraphs inside are not indented</td></tr>
                <tr><td><code>quotation</code></td><td>Indents both margins and keeps first-line indents</td></tr>
                <tr><td><code>{`\\begin{adjustwidth}{2em}{0pt}`}</code></td><td>Exact left and right indents (<code>changepage</code> package)</td></tr>
                <tr><td><code>{`{\\leftskip=2em ... \\par}`}</code></td><td>Plain TeX: left margin for the paragraphs in the group</td></tr>
                <tr><td><code>itemize</code> / <code>enumerate</code></td><td>Indented items; see <Link href="/learn/lists">lists</Link></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{changepage}

\\begin{document}
Normal paragraph at the full text width.

\\begin{quote}
A quote environment indents both margins, the usual way to set off
a long quotation.
\\end{quote}

\\begin{adjustwidth}{3em}{0pt}
\\noindent adjustwidth indents only the left margin by 3em here, and the
right margin stays where it is. Every line of the block is indented.
\\end{adjustwidth}

{\\leftskip=2em
A group with \\textbackslash leftskip also indents every line by 2em.
The \\textbackslash par before the closing brace is required.\\par}
\\end{document}`}</code></pre>
          <p>
            For the formatting of quotations themselves, see{' '}
            <Link href="/learn/quotes">quotes in LaTeX</Link>.
          </p>

          {/* ── Tabs ── */}
          <h2>Tab in LaTeX: \hspace and the tabbing Environment</h2>
          <p>
            Pressing Tab in the editor does nothing in the output: LaTeX treats a tab character as
            a space, collapses runs of spaces into one, and ignores spaces at the start of a line.
            For a tab-like gap, insert explicit space:
          </p>
          <ul>
            <li><code>{`\\hspace*{2em}`}</code> &ndash; a fixed gap; the star keeps it at the start of a line, where plain <code>\hspace</code> is dropped.</li>
            <li><code>\quad</code> and <code>\qquad</code> &ndash; 1em and 2em gaps inside a line.</li>
            <li><code>\hfill</code> &ndash; pushes what follows to the right margin.</li>
          </ul>
          <p>
            For text aligned at tab stops, like a typewriter, use <code>tabbing</code>:{' '}
            <code>\=</code> sets a stop, <code>\&gt;</code> jumps to the next one, and{' '}
            <code>{`\\\\`}</code> ends the line.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\hspace*{2em}Indented by 2em, like a tab at the start of a line.

Name:\\quad Ada \\qquad Year:\\quad 1843 \\hfill right margin

\\begin{tabbing}
Mon \\hspace{2cm} \\= 9:00 \\hspace{1cm} \\= Lecture \\\\
Tue \\> 11:00 \\> Seminar \\\\
Wed \\> 14:00 \\> Lab \\\\
\\> \\> indented to the second tab stop
\\end{tabbing}
\\end{document}`}</code></pre>
          <p>
            <code>tabbing</code> cannot break across columns nicely and does not draw rules; for
            real columns, a <Link href="/learn/tables">table</Link> is usually the better choice.
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
                  <td><em>Illegal unit of measure (pt inserted)</em></td>
                  <td><code>{`\\setlength{\\parindent}{0}`}</code>: a length without a unit</td>
                  <td><code>{`\\setlength{\\parindent}{0pt}`}</code></td>
                </tr>
                <tr>
                  <td><code>\indent</code> after <code>\section</code> has no effect</td>
                  <td>The heading code removes the indent of the first paragraph</td>
                  <td><code>{`\\usepackage{indentfirst}`}</code>, or <code>{`\\hspace*{\\parindent}`}</code></td>
                </tr>
                <tr>
                  <td><code>\noindent</code> has no effect</td>
                  <td>It is not at the start of a paragraph (there is no blank line before it), or it is placed after the text has begun</td>
                  <td>Put it first in the paragraph, right after a blank line</td>
                </tr>
                <tr>
                  <td>Text after an equation, figure or list is indented</td>
                  <td>A blank line after <code>{`\\end{equation}`}</code> starts a new paragraph</td>
                  <td>Remove the blank line if the sentence continues, or use <code>\noindent</code></td>
                </tr>
                <tr>
                  <td>New lines are not indented</td>
                  <td><code>{`\\\\`}</code> breaks the line but does not start a paragraph</td>
                  <td>Separate paragraphs with a blank line</td>
                </tr>
                <tr>
                  <td>Spaces or tabs at the start of a line disappear</td>
                  <td>LaTeX ignores leading whitespace; <code>\hspace</code> is dropped at a line start</td>
                  <td><code>{`\\hspace*{2em}`}</code></td>
                </tr>
                <tr>
                  <td>Paragraphs run together after <code>parindent</code> = 0</td>
                  <td>No indent and no space between paragraphs</td>
                  <td><code>{`\\usepackage{parskip}`}</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>adjustwidth</code></td>
                  <td>The <code>changepage</code> package is not loaded</td>
                  <td><code>{`\\usepackage{changepage}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>The blank-line case after display math is the most common surprise:</p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
The energy is
\\begin{equation}
  E = mc^2
\\end{equation}
where $m$ is the mass.     % no blank line above: same paragraph, no indent

\\begin{equation}
  F = ma
\\end{equation}

This starts a new, indented paragraph because of the blank line above.
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I indent in LaTeX?</h3>
          <p>
            LaTeX indents the first line of every paragraph automatically; a blank line in the
            source starts a new paragraph. To indent a line by hand, use <code>\indent</code> at
            the start of a paragraph or <code>{`\\hspace*{2em}`}</code> anywhere. To indent a whole
            block, use the quote environment or <code>{`\\begin{adjustwidth}{2em}{0pt}`}</code>{' '}
            from the changepage package.
          </p>
          <h3>How do I remove paragraph indentation in LaTeX?</h3>
          <p>
            For one paragraph, start it with <code>\noindent</code>. For the whole document, put{' '}
            <code>{`\\setlength{\\parindent}{0pt}`}</code> in the preamble, or better{' '}
            <code>{`\\usepackage{parskip}`}</code>, which also adds space between paragraphs so they
            stay distinguishable. Remember the unit: <code>{`\\setlength{\\parindent}{0}`}</code>{' '}
            gives the error &ldquo;Illegal unit of measure&rdquo;.
          </p>
          <h3>Why is the first paragraph after a section not indented?</h3>
          <p>
            That is the English typographic convention, and the standard classes follow it: the
            first paragraph after <code>\section</code>, <code>\chapter</code> or similar
            headings has no indent. <code>\indent</code> does not override it. Load{' '}
            <code>{`\\usepackage{indentfirst}`}</code> to indent every first paragraph, as French and
            some other styles require.
          </p>
          <h3>How do I make a tab in LaTeX?</h3>
          <p>
            The Tab key does nothing: LaTeX treats a tab character like a space, and runs of
            spaces collapse into one. Use <code>{`\\hspace*{2em}`}</code> for a fixed gap (the star
            keeps it at the start of a line), <code>\quad</code> or <code>\qquad</code> for 1em
            or 2em, and the tabbing environment with <code>\=</code> and <code>\&gt;</code> for
            real tab stops. For aligned columns, a tabular is usually better.
          </p>
          <h3>How do I create a hanging indent in LaTeX?</h3>
          <p>
            Start the paragraph with <code>\hangindent=2em \hangafter=1</code> and then the text:
            every line after the first is indented by 2em. The settings apply to that paragraph
            only, so repeat them for each paragraph or define a macro. For a reference list, the
            bibliography styles and biblatex already produce hanging indents.
          </p>
          <h3>How do I change the size of the paragraph indent?</h3>
          <p>
            Set <code>{`\\setlength{\\parindent}{2em}`}</code> in the preamble (any length works,
            such as 1cm or 20pt). The default depends on the font size option: 15pt for 10pt
            documents, 17pt for 11pt and 1.5em for 12pt in the standard classes. Using em keeps
            the indent proportional to the font.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/spacing">Spacing in LaTeX</Link> &ndash; \hspace, \vspace, paragraph and line spacing</li>
            <li><Link href="/learn/lists">Lists</Link> &ndash; Indentation of itemize and enumerate with enumitem</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Margins for the whole page</li>
            <li><Link href="/learn/quotes">Quotes</Link> &ndash; Quotation marks and block quotations</li>
            <li><Link href="/learn/document-classes">Document Classes</Link> &ndash; Class options that change the default layout</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try indentation settings with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix paragraph formatting faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor removes or restores indentation across a document, sets up
              parskip and hanging indents for you, and compiles your document in seconds.
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
