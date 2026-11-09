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

const breadcrumbs = getLearnBreadcrumbs('Spacing in LaTeX', 'spacing')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'spacing',
  title: 'Spacing in LaTeX: Horizontal, Vertical and Math Mode Spacing',
  seoTitle: 'Spacing in LaTeX: Horizontal, Vertical and Math',
  description: 'Spacing in LaTeX: \\hspace, \\vspace, \\quad, math spaces \\, \\: \\; \\! with widths in mu, line spacing with setspace, paragraph spacing and common errors.',
  keywords: 'spacing latex, spacing in latex, spaces latex, latex space, latex hspace, latex vspace, latex quad, latex qquad, latex math spacing, latex thin space, latex negative space, latex line spacing, latex double spacing, latex setspace, latex linespread, latex parskip, latex paragraph spacing, latex smallskip medskip bigskip, latex vertical space, latex horizontal space, latex hfill, latex vfill, latex space between lines, latex missing number treated as zero, latex vspace star',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I add a space in LaTeX?',
    answer:
      'Ordinary spaces in the source become one interword space, however many you type. For more, use \\quad (1em) or \\qquad (2em), \\hspace{1cm} for an exact width, \\, for a thin space, or ~ for a space the line cannot break at. In math mode spaces in the source are ignored entirely, so use \\, \\: \\; \\quad or \\text{ } there.',
  },
  {
    question: 'How do I add vertical space in LaTeX?',
    answer:
      'Use \\vspace{1cm} between paragraphs, \\smallskip, \\medskip or \\bigskip for standard amounts (3pt, 6pt and 12pt), or \\\\[1em] to add space after a line break. \\vspace is dropped at the top of a page; use \\vspace* there. \\vfill pushes the content apart to fill the page.',
  },
  {
    question: 'What do \\, \\: \\; and \\! do in LaTeX?',
    answer:
      'They are the math spaces. \\, is a thin space (3mu), \\: a medium space (4mu), \\; a thick space (5mu) and \\! a negative thin space (-3mu) that pulls symbols together. One mu is 1/18 of an em, so \\quad is 18mu and \\qquad 36mu. \\, also works in text, for example between a number and its unit.',
  },
  {
    question: 'How do I set double spacing or 1.5 line spacing in LaTeX?',
    answer:
      'Load the setspace package and write \\doublespacing or \\onehalfspacing in the preamble, or \\setstretch{1.5} for a custom factor. setspace keeps footnotes, captions and tables single-spaced. \\linespread{1.5} also works but scales everything, and it means a little more than one-and-a-half spacing.',
  },
  {
    question: 'How do I add space between paragraphs instead of indenting them?',
    answer:
      'Load the parskip package: \\usepackage{parskip}. It sets the paragraph indent to zero and adds a blank line of space between paragraphs, while keeping lists and the table of contents tidy. Setting \\setlength{\\parskip}{1em} and \\setlength{\\parindent}{0pt} by hand also works but adds the space in places you may not want.',
  },
  {
    question: 'Why does LaTeX say “Missing number, treated as zero”?',
    answer:
      'A command that expects a length got something else: an empty \\vspace{}, a word instead of a length, or a line that starts with [ right after \\\\, which LaTeX reads as the optional spacing argument of \\\\. Give a real length such as \\vspace{1em}, and write \\\\ \\relax or {[} when the next line starts with a bracket. A number without a unit gives “Illegal unit of measure (pt inserted)” instead.',
  },
]

export default async function LearnSpacingPage() {
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
          <h1>Spacing in LaTeX: Horizontal, Vertical and Math Mode Spacing</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Small fixed spaces:</strong> <code>\,</code> thin, <code>\:</code> medium,{' '}
                <code>\;</code> thick, <code>\!</code> negative thin, <code>\quad</code> 1em,{' '}
                <code>\qquad</code> 2em.
              </li>
              <li>
                <strong>Exact horizontal space:</strong> <code>{`\\hspace{1cm}`}</code>;{' '}
                <code>\hfill</code> fills the line.
              </li>
              <li>
                <strong>Vertical space:</strong> <code>{`\\vspace{1em}`}</code>,{' '}
                <code>{`\\\\[1em]`}</code> after a line break, <code>\smallskip</code>{' '}
                <code>\medskip</code> <code>\bigskip</code>; <code>{`\\vspace*{}`}</code> at the
                top of a page.
              </li>
              <li>
                <strong>Paragraphs and lines:</strong> <code>{`\\setlength{\\parskip}{0.5em}`}</code>,{' '}
                <code>{`\\linespread{1.3}`}</code> or <code>setspace</code> with{' '}
                <code>\onehalfspacing</code> / <code>\doublespacing</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{setspace}
\\onehalfspacing                      % line spacing
\\setlength{\\parskip}{0.5em}          % space between paragraphs

\\begin{document}
Left\\hspace{2cm}right \\quad a\\qquad b \\hfill end of line

\\bigskip
After a big skip.\\\\[1em]
A new line 1em further down.

\\vspace{1cm}
Math: $a\\,b \\quad a\\:b \\quad a\\;b \\quad a\\!b$
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX sets almost all spacing for you: spaces between words, between sentences,
            around operators in math, between paragraphs and above headings. Most of the time the
            right move is to leave it alone. When you do need to change it, there is a specific
            command for each direction and mode. This guide covers horizontal space in text,
            vertical space between paragraphs and blocks, the spacing commands for math mode
            (with their exact widths in mu), line spacing and paragraph spacing, and the errors
            that spacing commands produce.
          </p>

          {/* ── Horizontal ── */}
          <h2>Horizontal Spacing</h2>
          <p>
            Spaces in the source are collapsed: one space, ten spaces and a single line break all
            produce one interword space, and spaces at the start of a line are ignored. To get
            more room, use one of the spacing commands:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Width</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\,</code> or <code>\thinspace</code></td><td>1/6 em</td><td>Between a number and a unit, initials: <code>5\,kg</code></td></tr>
                <tr><td><code>\enspace</code></td><td>1/2 em</td><td>A clear gap, e.g. before an item label</td></tr>
                <tr><td><code>\quad</code></td><td>1 em</td><td>Separating items on one line</td></tr>
                <tr><td><code>\qquad</code></td><td>2 em</td><td>A wider separation</td></tr>
                <tr><td><code>{`\\hspace{1cm}`}</code></td><td>Exactly 1cm</td><td>Any fixed width; negative values pull back</td></tr>
                <tr><td><code>{`\\hspace*{1cm}`}</code></td><td>Exactly 1cm</td><td>Same, but kept at the start of a line</td></tr>
                <tr><td><code>\hfill</code></td><td>All available space</td><td>Push text to the right margin, spread items</td></tr>
                <tr><td><code>~</code></td><td>One interword space</td><td>A space the line cannot break at: <code>Figure~1</code></td></tr>
                <tr><td><code>{`\\ `}</code> (backslash space)</td><td>One interword space</td><td>A normal space after a command or abbreviation</td></tr>
                <tr><td><code>{`\\phantom{text}`}</code></td><td>Width of <em>text</em></td><td>Invisible placeholder for alignment</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Name:\\hspace{3cm}Date:\\hspace{2cm}   % gaps for a form

Left \\hfill Right                     % right-aligned text on the same line

Left \\hfill Middle \\hfill Right       % three evenly spread items

Chapter 1 \\dotfill 7                  % dotted leader, as in a contents line

\\hspace*{2em}Indented by hand at the start of the line.

5\\,kg, 20\\,\\%, D.\\,E. Knuth, Figure~3, Mr.~Smith

\\end{document}`}</code></pre>
          <p>
            Two details catch people out. First, <code>\hspace</code> at the very start of a line
            is discarded like any other space there; use <code>\hspace*</code> to keep it.
            Second, a command name eats the space after it, so <code>\LaTeX is</code> prints
            &ldquo;LaTeXis&rdquo;. Write <code>{`\\LaTeX{} is`}</code> or{' '}
            <code>{`\\LaTeX\\ is`}</code>.
          </p>
          <h3>Space after a period</h3>
          <p>
            LaTeX puts a slightly wider space after a sentence-ending period than between words.
            It guesses that a period after a lowercase letter ends a sentence and one after a
            capital does not. Correct the guess where it is wrong: <code>{`e.g.\\ this`}</code>{' '}
            or <code>e.g.~this</code> after an abbreviation, and <code>{`PhD\\@. Then`}</code>{' '}
            when a sentence ends with a capital. <code>\frenchspacing</code> in the preamble
            turns the wider space off altogether, which many style guides now prefer.
          </p>

          {/* ── Vertical ── */}
          <h2>Vertical Spacing</h2>
          <p>
            Vertical space goes between paragraphs. <code>\vspace</code> adds an exact amount;
            the three skip commands add standard amounts that stretch slightly so pages still
            fill well:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\smallskip</code></td><td>3pt plus 1pt minus 1pt</td></tr>
                <tr><td><code>\medskip</code></td><td>6pt plus 2pt minus 2pt</td></tr>
                <tr><td><code>\bigskip</code></td><td>12pt plus 4pt minus 4pt</td></tr>
                <tr><td><code>{`\\vspace{1cm}`}</code></td><td>Exactly 1cm (any length, also negative)</td></tr>
                <tr><td><code>{`\\vspace*{1cm}`}</code></td><td>Same, but kept at the top of a page</td></tr>
                <tr><td><code>{`\\\\[1em]`}</code></td><td>Line break plus 1em of extra space</td></tr>
                <tr><td><code>\vfill</code></td><td>All remaining space on the page</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\vspace*{3cm}                      % kept even at the top of the page
\\begin{center}
  {\\Large A Title Page}\\\\[2em]
  Ada Lovelace\\\\[0.5em]
  \\today
\\end{center}

\\vfill                             % push the rest to the bottom
Submitted in partial fulfilment of the requirements.

\\newpage
First paragraph.

\\medskip
Second paragraph, after a medium skip.

\\vspace{1.5\\baselineskip}
Third paragraph, one and a half blank lines further down.

\\end{document}`}</code></pre>
          <p>
            Use units that scale with the font for spacing in running text: <code>em</code>{' '}
            (the width of an M), <code>ex</code> (the height of an x) or{' '}
            <code>\baselineskip</code> (one line). Fixed units such as <code>cm</code> and{' '}
            <code>pt</code> suit title pages and forms. Do not use repeated <code>{`\\\\`}</code>{' '}
            or empty lines to make vertical space: they produce <em>Underfull \hbox</em> warnings
            or the error <em>There&apos;s no line here to end</em>.
          </p>

          {/* ── Math ── */}
          <h2>Spacing in Math Mode</h2>
          <p>
            In math mode, spaces in the source are ignored completely; TeX decides the spacing
            from what each symbol is (operator, relation, punctuation). To adjust it, use the
            math spacing commands. Their widths are given in <em>mu</em> (math units): 1mu is
            1/18 of an em in the current math font, so the spaces scale correctly in subscripts.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Long form (amsmath)</th>
                  <th>Width</th>
                  <th>Example use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\!</code></td><td><code>\negthinspace</code></td><td>&minus;3mu</td><td>Pull symbols together: <code>\int\!\!\int</code></td></tr>
                <tr><td><code>\,</code></td><td><code>\thinspace</code></td><td>3mu</td><td>Before <code>dx</code> in an integral: <code>f(x)\,dx</code></td></tr>
                <tr><td><code>\:</code> (also <code>\&gt;</code>)</td><td><code>\medspace</code></td><td>4mu plus 2mu minus 4mu</td><td>The space around <code>+</code> and <code>&minus;</code></td></tr>
                <tr><td><code>\;</code></td><td><code>\thickspace</code></td><td>5mu plus 5mu</td><td>The space around <code>=</code>; before a condition</td></tr>
                <tr><td><code>{`\\ `}</code> (backslash space)</td><td>&mdash;</td><td>one interword space (about 6mu)</td><td>A word-sized gap</td></tr>
                <tr><td><code>\quad</code></td><td>&mdash;</td><td>1em = 18mu</td><td>Between an equation and a condition</td></tr>
                <tr><td><code>\qquad</code></td><td>&mdash;</td><td>2em = 36mu</td><td>Between two equations on one line</td></tr>
                <tr><td><code>{`\\mspace{5mu}`}</code></td><td>&mdash;</td><td>Any amount in mu</td><td>Fine-tuning (amsmath)</td></tr>
                <tr><td><code>{`\\hspace{1em}`}</code></td><td>&mdash;</td><td>Any text length</td><td>Works in math too</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

% The four small spaces, from negative to thick
\\[ ab \\quad a\\!b \\quad a\\,b \\quad a\\:b \\quad a\\;b \\]

% Typical uses
\\[ \\int_0^1 f(x)\\,dx \\qquad \\iint\\!\\!\\int_V g \\, dV \\]
\\[ f(x) = x^2, \\quad x > 0 \\qquad \\text{for all } y \\]
\\[ \\{\\, x \\mid x > 0 \\,\\} \\qquad \\sqrt{2}\\,x \\qquad \\sin x\\,\\cos x \\]
\\[ a = b \\qquad\\text{and}\\qquad c = d \\]

\\end{document}`}</code></pre>
          <p>
            For words inside math, use <code>{`\\text{ and }`}</code> from amsmath, with the
            spaces inside the braces; they are kept because <code>\text</code> switches back to
            text mode. Spacing around relations and operators that looks wrong is usually a sign
            of the wrong symbol: <code>&lt;</code> instead of <code>\langle</code> (see{' '}
            <Link href="/learn/brackets">brackets</Link>), or <code>|</code> instead of{' '}
            <code>\mid</code> in set notation. For operator names, <code>\sin</code> and{' '}
            <code>\DeclareMathOperator</code> add the correct space automatically (see{' '}
            <Link href="/learn/math-functions">math functions</Link>).
          </p>

          {/* ── Line spacing ── */}
          <h2>Line Spacing</h2>
          <p>
            Line spacing (the distance between baselines, <code>\baselineskip</code>) is set by
            the font size. To change it for the whole document, the <code>setspace</code>{' '}
            package is the reliable way: it scales the body text but keeps footnotes, captions,
            tables and the title block single-spaced, as most thesis rules require.
          </p>
          <pre><code>{`\\documentclass[12pt]{article}
\\usepackage{setspace}
\\onehalfspacing          % or \\doublespacing, or \\setstretch{1.3}

\\begin{document}
This paragraph is one-and-a-half spaced.\\footnote{The footnote stays single-spaced.}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.

\\begin{singlespace}
A single-spaced block quotation or code listing, inside a
one-and-a-half spaced document.
\\end{singlespace}

\\begin{spacing}{2}
A double-spaced passage.
\\end{spacing}
\\end{document}`}</code></pre>
          <p>
            Without a package, <code>{`\\linespread{1.3}`}</code> in the preamble multiplies the
            baseline skip everywhere, including footnotes and tables. The factor is not the
            &ldquo;line spacing&rdquo; a word processor means: because the default baseline skip
            is already 1.2 times the font size, one-and-a-half spacing is about{' '}
            <code>{`\\linespread{1.25}`}</code> and double spacing about{' '}
            <code>{`\\linespread{1.65}`}</code>. In the document body, <code>\linespread</code>{' '}
            only takes effect after <code>\selectfont</code>. For the font sizes behind{' '}
            <code>\baselineskip</code>, see <Link href="/learn/font-size">LaTeX font size</Link>.
          </p>
          <p>
            Inside tables, the row height is controlled by{' '}
            <code>{`\\renewcommand{\\arraystretch}{1.3}`}</code> and the column gap by{' '}
            <code>{`\\setlength{\\tabcolsep}{8pt}`}</code>; the{' '}
            <Link href="/learn/tables">tables guide</Link> has more on both.
          </p>

          {/* ── Paragraph spacing ── */}
          <h2>Paragraph Spacing</h2>
          <p>
            A blank line in the source starts a new paragraph. By default LaTeX marks new
            paragraphs with an indent (<code>\parindent</code>) and no extra space (
            <code>\parskip</code> is 0pt plus 1pt). To switch to the block style, with space
            between paragraphs and no indent, the <code>parskip</code> package is the clean
            option:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{parskip}     % no indent, a blank line between paragraphs

\\begin{document}
First paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Second paragraph, separated by space instead of an indent.

\\noindent This paragraph would not be indented in the default style either.
\\end{document}`}</code></pre>
          <p>
            Setting the lengths by hand does the same with exact values, but the space then also
            appears inside lists, the table of contents and some environments, which{' '}
            <code>parskip</code> corrects:
          </p>
          <pre><code>{`\\documentclass{article}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{6pt plus 2pt minus 1pt}

\\begin{document}
First paragraph.

Second paragraph, 6pt lower.
\\end{document}`}</code></pre>
          <p>
            Spacing inside lists is a separate setting; the <code>enumitem</code> package&apos;s{' '}
            <code>nosep</code> and <code>itemsep</code> options are covered in{' '}
            <Link href="/learn/lists">lists</Link>, and space around headings in{' '}
            <Link href="/learn/sections">sections</Link>.
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
                  <td><em>Missing number, treated as zero</em></td>
                  <td>A length was expected but not given: <code>{`\\vspace{}`}</code>, <code>{`\\hspace{big}`}</code>, or a line starting with <code>[</code> right after <code>{`\\\\`}</code></td>
                  <td>Give a length (<code>{`\\vspace{1em}`}</code>); after <code>{`\\\\`}</code> write <code>{`\\\\ \\relax`}</code> or <code>{`{[}`}</code></td>
                </tr>
                <tr>
                  <td><em>Illegal unit of measure (pt inserted)</em></td>
                  <td>A number without a unit: <code>{`\\vspace{2}`}</code></td>
                  <td>Add the unit: <code>{`\\vspace{2em}`}</code>, <code>2cm</code>, <code>12pt</code></td>
                </tr>
                <tr>
                  <td><code>\vspace</code> at the top of a page has no effect</td>
                  <td>Vertical space is discarded at page breaks</td>
                  <td>Use <code>{`\\vspace*{...}`}</code></td>
                </tr>
                <tr>
                  <td><code>\hspace</code> at the start of a line has no effect</td>
                  <td>Horizontal space is discarded at line breaks</td>
                  <td>Use <code>{`\\hspace*{...}`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: There&apos;s no line here to end</em></td>
                  <td><code>{`\\\\`}</code> after a blank line or at the start of a paragraph, used for vertical space</td>
                  <td>Use <code>\vspace</code> or <code>\bigskip</code> between paragraphs</td>
                </tr>
                <tr>
                  <td><em>Underfull \hbox (badness 10000) in paragraph</em></td>
                  <td><code>{`\\\\`}</code> at the end of a paragraph, or <code>{`\\\\\\\\`}</code> to make a blank line</td>
                  <td>End paragraphs with a blank line; add space with <code>{`\\\\[1em]`}</code> or <code>\vspace</code></td>
                </tr>
                <tr>
                  <td>Words run together after a command (&ldquo;LaTeXis&rdquo;)</td>
                  <td>A command name swallows the following space</td>
                  <td><code>{`\\LaTeX{} is`}</code> or <code>{`\\LaTeX\\ is`}</code></td>
                </tr>
                <tr>
                  <td>Spaces typed in math disappear</td>
                  <td>Math mode ignores source spaces</td>
                  <td><code>\,</code>, <code>\quad</code> or <code>{`\\text{ word }`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The bracket case is the least obvious. LaTeX reads the line below as the optional
            argument of <code>{`\\\\`}</code>, the extra space after the break, and{' '}
            <code>[a, b]</code> is not a length:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
% Wrong: "\\\\" followed by "[a, b]" on the next line gives
% "Missing number, treated as zero"
% The interval is\\\\
% [a, b].

The interval is\\\\ \\relax
[a, b].
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I add a space in LaTeX?</h3>
          <p>
            Ordinary spaces in the source become one interword space, however many you type. For
            more, use <code>\quad</code> (1em) or <code>\qquad</code> (2em),{' '}
            <code>{`\\hspace{1cm}`}</code> for an exact width, <code>\,</code> for a thin space, or{' '}
            <code>~</code> for a space the line cannot break at. In math mode spaces in the source
            are ignored entirely, so use <code>\,</code> <code>\:</code> <code>\;</code>{' '}
            <code>\quad</code> or <code>{`\\text{ }`}</code> there.
          </p>
          <h3>How do I add vertical space in LaTeX?</h3>
          <p>
            Use <code>{`\\vspace{1cm}`}</code> between paragraphs, <code>\smallskip</code>,{' '}
            <code>\medskip</code> or <code>\bigskip</code> for standard amounts (3pt, 6pt and
            12pt), or <code>{`\\\\[1em]`}</code> to add space after a line break.{' '}
            <code>\vspace</code> is dropped at the top of a page; use <code>\vspace*</code>{' '}
            there. <code>\vfill</code> pushes the content apart to fill the page.
          </p>
          <h3>What do \, \: \; and \! do in LaTeX?</h3>
          <p>
            They are the math spaces. <code>\,</code> is a thin space (3mu), <code>\:</code> a
            medium space (4mu), <code>\;</code> a thick space (5mu) and <code>\!</code> a
            negative thin space (-3mu) that pulls symbols together. One mu is 1/18 of an em, so{' '}
            <code>\quad</code> is 18mu and <code>\qquad</code> 36mu. <code>\,</code> also works
            in text, for example between a number and its unit.
          </p>
          <h3>How do I set double spacing or 1.5 line spacing in LaTeX?</h3>
          <p>
            Load the <code>setspace</code> package and write <code>\doublespacing</code> or{' '}
            <code>\onehalfspacing</code> in the preamble, or <code>{`\\setstretch{1.5}`}</code>{' '}
            for a custom factor. setspace keeps footnotes, captions and tables single-spaced.{' '}
            <code>{`\\linespread{1.5}`}</code> also works but scales everything, and it means a
            little more than one-and-a-half spacing.
          </p>
          <h3>How do I add space between paragraphs instead of indenting them?</h3>
          <p>
            Load the parskip package: <code>{`\\usepackage{parskip}`}</code>. It sets the
            paragraph indent to zero and adds a blank line of space between paragraphs, while
            keeping lists and the table of contents tidy. Setting{' '}
            <code>{`\\setlength{\\parskip}{1em}`}</code> and{' '}
            <code>{`\\setlength{\\parindent}{0pt}`}</code> by hand also works but adds the space in
            places you may not want.
          </p>
          <h3>Why does LaTeX say &ldquo;Missing number, treated as zero&rdquo;?</h3>
          <p>
            A command that expects a length got something else: an empty{' '}
            <code>{`\\vspace{}`}</code>, a word instead of a length, or a line that starts with{' '}
            <code>[</code> right after <code>{`\\\\`}</code>, which LaTeX reads as the optional
            spacing argument of <code>{`\\\\`}</code>. Give a real length such as{' '}
            <code>{`\\vspace{1em}`}</code>, and write <code>{`\\\\ \\relax`}</code> or{' '}
            <code>{`{[}`}</code> when the next line starts with a bracket. A number without a unit
            gives &ldquo;Illegal unit of measure (pt inserted)&rdquo; instead.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; Size commands, baseline skip and \linespread</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; The geometry package for page-level spacing</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Display math and amsmath environments</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; Alignment and spacing in align and split</li>
            <li><Link href="/learn/lists">Lists</Link> &ndash; Item spacing with enumitem</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try spacing commands with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix spacing problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor explains &ldquo;Missing number&rdquo; and underfull box
              warnings, sets up thesis line spacing for you, and compiles your document in
              seconds.
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
