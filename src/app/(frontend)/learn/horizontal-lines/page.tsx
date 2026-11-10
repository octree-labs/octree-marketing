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

const breadcrumbs = getLearnBreadcrumbs('Horizontal Line in LaTeX', 'horizontal-lines')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'horizontal-lines',
  title: 'Horizontal Line in LaTeX: \\hrule, \\rule, \\hrulefill and \\noindent',
  seoTitle: 'Horizontal Line in LaTeX: \\hrule, \\rule, \\hrulefill',
  description: 'Draw a horizontal line in LaTeX with \\noindent\\rule{\\linewidth}{0.4pt}, \\hrule or \\hrulefill, a line inside text, and \\hline or \\midrule in tables.',
  keywords: 'horizontal line latex, latex horizontal line, horizontal line in latex, horizontal line in text latex, latex horizontal line in text, latex line in text, latex noindent rule, latex rule linewidth, latex horizontal rule, latex hrule, latex rule, latex hrulefill, latex line across page, latex draw line, latex dashed line, latex colored line, latex hline, booktabs toprule midrule bottomrule, latex signature line, latex headrulewidth, misplaced noalign, latex vertical line',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-10'

const faq: FaqItem[] = [
  {
    question: 'How do you draw a horizontal line in LaTeX?',
    answer:
      'Put \\noindent\\rule{\\linewidth}{0.4pt} on its own line between two paragraphs. It draws a 0.4pt line across the full text width and needs no package. \\hrule does the same in one word, and \\hrulefill fills only the rest of the current line.',
  },
  {
    question: 'How do I put a horizontal line in text, in the middle of a sentence?',
    answer:
      'Use \\rule{3cm}{0.4pt} for a line of fixed length or \\hrulefill for a line that stretches to the end of the line, as in Name: \\hrulefill. Both stay inside the paragraph. Do not use \\hrule there: it ends the paragraph and puts the line on a line of its own.',
  },
  {
    question: 'Why do I need \\noindent before \\rule?',
    answer:
      'A new paragraph starts with an indent, usually 15pt. \\rule{\\linewidth}{0.4pt} is already as wide as the line, so the indent pushes it past the right margin and LaTeX reports an Overfull \\hbox. \\noindent removes the indent so the line starts at the left margin.',
  },
  {
    question: 'What is the difference between \\hrule, \\rule and \\hrulefill?',
    answer:
      '\\hrule is a TeX primitive that only works between paragraphs and always spans the full width unless you give it a width. \\rule{width}{thickness} is a box that behaves like a word, so it can be centred, colored or placed inline. \\hrulefill is stretchable space drawn as a line that fills whatever room is left on the current line.',
  },
  {
    question: 'How do I make a thicker horizontal line in LaTeX?',
    answer:
      'Change the second argument of \\rule: \\noindent\\rule{\\linewidth}{1pt} draws a 1pt line. With \\hrule write \\hrule height 1pt. In tables, \\setlength{\\arrayrulewidth}{1pt} thickens every \\hline, and booktabs takes a thickness in brackets, as in \\midrule[1pt].',
  },
  {
    question: 'How do I add a horizontal line in a LaTeX table?',
    answer:
      'Write \\hline at the start of a row for a line across the whole table and \\cline{2-3} for a line under columns 2 to 3. For publication tables load booktabs and use \\toprule, \\midrule and \\bottomrule, which add padding around the line. A rule placed in the middle of a row causes the Misplaced \\noalign error.',
  },
]

export default async function LaTeXHorizontalLinesPage() {
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
          <h1>Horizontal Line in LaTeX: \hrule, \rule, \hrulefill and \noindent</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Full-width line:</strong> <code>{`\\noindent\\rule{\\linewidth}{0.4pt}`}</code>{' '}
                on its own line between paragraphs. No package needed.
              </li>
              <li>
                <strong>Quickest divider:</strong> <code>\hrule</code>, a TeX primitive that only works
                between paragraphs.
              </li>
              <li>
                <strong>Line in text:</strong> <code>{`\\rule{3cm}{0.4pt}`}</code> for a fixed length, or{' '}
                <code>\hrulefill</code> (<code>\dotfill</code> for dots) to fill the rest of the line.
              </li>
              <li>
                <strong>Tables:</strong> <code>\hline</code> and <code>{`\\cline{2-3}`}</code>, or{' '}
                <code>\toprule</code>, <code>\midrule</code>, <code>\bottomrule</code> with{' '}
                <code>{`\\usepackage{booktabs}`}</code>.
              </li>
              <li>
                <strong>Why <code>\noindent</code>:</strong> without it the paragraph indent pushes a
                full-width rule into the right margin (<em>Overfull \hbox</em>).
              </li>
            </ul>
          </div>


          {/* ── Three commands ── */}
          <h2>LaTeX Horizontal Line: \hrule, \rule and \hrulefill</h2>
          <p>
            These three commands differ in their allowed contexts and how they set the line length:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Where it works</th>
                <th>Length</th>
                <th>Thickness</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\hrule</code></td><td>Between paragraphs only</td><td>Full width, or <code>width 5cm</code></td><td><code>height 1pt</code> (default 0.4pt)</td></tr>
              <tr><td><code>{`\\rule{w}{t}`}</code></td><td>Anywhere, like a word</td><td>First argument</td><td>Second argument</td></tr>
              <tr><td><code>\hrulefill</code></td><td>Inside a line of text</td><td>Whatever space is left</td><td>Fixed at 0.4pt</td></tr>
            </tbody>
          </table>
          </div>

          <h3>\hrule: a line between paragraphs</h3>
          <p>
            <code>\hrule</code> is a TeX primitive. It takes no braces; its dimensions are given
            as optional keywords, and it only works in <em>vertical mode</em>, i.e. between
            paragraphs. If you type it in the middle of a sentence TeX ends the paragraph first,
            which is why it sometimes appears to add a blank line:
          </p>
          <pre><code>{`Some text before the line.

\\hrule                         % 0.4pt thick, full column width
\\hrule height 1pt              % thicker
\\hrule height 0.4pt width 5cm  % shorter (left aligned)

Some text after the line.`}</code></pre>
          <p>
            Because <code>\hrule</code> lives outside paragraphs, it cannot be centred and does
            not respond to <code>\centering</code>. For anything but a quick full-width divider,
            use <code>\rule</code>.
          </p>

          <h3>\rule: a line inside text</h3>
          <p>
            <code>{`\\rule[raise]{width}{thickness}`}</code> is the LaTeX command. It produces
            a box, so it behaves like a word: it sits on the baseline, it can be centred, colored
            and placed inside a table cell. A full-width line needs <code>\noindent</code>,
            otherwise the paragraph indent pushes it past the margin and you get an{' '}
            <em>Overfull \hbox</em> warning:
          </p>
          <pre><code>{`\\noindent\\rule{\\linewidth}{0.4pt}   % full width, standard thickness
\\noindent\\rule{\\textwidth}{1pt}      % thicker
\\rule{3cm}{0.4pt}                    % short, inline
\\rule[0.5ex]{2cm}{0.4pt}             % raised half an x-height`}</code></pre>
          <p>
            <code>\linewidth</code> is the width of the current line, which shrinks inside lists,
            quotes and minipages; <code>\textwidth</code> stays at the document text width inside
            a list, but is reset to the local width inside a minipage. In a
            two-column document, <code>\columnwidth</code> is the width of one column. The
            optional first argument raises the rule above the baseline (negative values lower
            it).
          </p>

          <h3>\hrulefill and \dotfill: fill the rest of the line</h3>
          <p>
            <code>\hrulefill</code> is stretchable glue drawn as a line. It fills whatever space is
            left on the line, which makes it the right tool for forms, tables of contents and
            &ldquo;Name: ____&rdquo; fields. <code>\dotfill</code> does the same with dots:
          </p>
          <pre><code>{`Name: \\hrulefill

Date: \\hrulefill\\quad Signature: \\hrulefill

Chapter One \\dotfill 1

\\noindent\\hrulefill            % equivalent to a full-width rule`}</code></pre>
          <p>
            <code>\hrulefill</code> is always 0.4pt thick. For a thicker fill define a variant
            with <code>\leaders</code>:
          </p>
          <pre><code>{`\\newcommand{\\thickhrulefill}{%
  \\leavevmode\\leaders\\hrule height 1pt\\hfill\\kern0pt
}

Total: \\thickhrulefill`}</code></pre>

          {/* ── noindent ── */}
          <h2>\noindent and Full-Width Lines</h2>
          <p>
            A full-width rule is exactly as wide as the line, so any indent makes it too wide.
            Every new paragraph is indented by <code>\parindent</code> (about 15pt in the
            standard classes), which is why a bare <code>{`\\rule{\\linewidth}{0.4pt}`}</code>{' '}
            ends up shifted right and overflowing the margin. <code>\noindent</code> at the start
            of the paragraph cancels the indent:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Text before.

\\rule{\\linewidth}{0.4pt}            % wrong: indented, runs into the margin

\\noindent\\rule{\\linewidth}{0.4pt}   % right: starts at the left margin

\\begin{itemize}
  \\item An item with a line that respects the list indent:\\par
  \\noindent\\rule{\\linewidth}{0.4pt}
\\end{itemize}

\\end{document}`}</code></pre>
          <p>
            Use <code>\linewidth</code> rather than <code>\textwidth</code> for the width.
            Inside a list or quote, <code>\linewidth</code> shrinks to the current
            line while <code>\textwidth</code> stays at the document text width, so a{' '}
            <code>\textwidth</code> rule pokes out on the right. A minipage resets both widths;
            a list nested inside that minipage narrows only <code>\linewidth</code> again.
            <code>\hrule</code> is not affected by the paragraph indent,
            but <code>\hrulefill</code> at the start of a paragraph begins after it, so a
            full-width fill also needs <code>\noindent</code>.
          </p>

          {/* ── In text ── */}
          <h3>A divider inside a narrow panel</h3>
          <p>
            Use the same command at each nesting level rather than hard-coding the outer
            page width. This complete example draws one divider across the panel and another
            across the narrower list item. End the rule paragraph explicitly so the following
            text cannot join it and overflow the line.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\noindent\\begin{minipage}{0.6\\linewidth}
Panel heading
\\par\\noindent\\rule{\\linewidth}{0.4pt}\\par
\\begin{itemize}
  \\item A narrower divider follows this item.
  \\par\\noindent\\rule{\\linewidth}{0.4pt}\\par
  Text below the divider stays inside the item.
\\end{itemize}
\\end{minipage}
\\end{document}`}</code></pre>

          <h2>Horizontal Line in Text</h2>
          <p>
            For a horizontal line in text, inside a sentence rather than between paragraphs, use{' '}
            <code>\rule</code> or <code>\hrulefill</code>. Both stay in the paragraph. The
            optional first argument of <code>\rule</code> raises it from the baseline, which is
            how you draw a line at the height of a dash or through the middle of the letters:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Fill in the blank: the capital of France is \\rule{3cm}{0.4pt}.

A line at mid-height \\rule[0.5ex]{2cm}{0.4pt} between two words.

Name: \\hrulefill

Total \\dotfill 42

% a line that fills a fixed-width gap
Answer: \\makebox[4cm]{\\hrulefill} (in words)

\\end{document}`}</code></pre>
          <p>
            Do not use <code>\hrule</code> here. It is a vertical-mode command, so TeX ends the
            current paragraph, draws the line on its own and starts a new paragraph after it.
            That is the usual cause of a &ldquo;line that jumps to the next line&rdquo;.
          </p>

          {/* ── Partial / centred ── */}
          <h2>Partial-Width and Centred Lines</h2>
          <p>
            A line that spans half the text width is just <code>\rule</code> with a fraction. To
            centre it, put it in a <code>center</code> environment or use{' '}
            <code>\centerline</code>, which adds no vertical space (it must sit between
            paragraphs, so leave a blank line before it):
          </p>
          <pre><code>{`\\begin{center}
  \\rule{0.5\\linewidth}{0.4pt}
\\end{center}

% or, with no extra space above and below:
\\centerline{\\rule{0.5\\linewidth}{0.4pt}}

% right-aligned
\\begin{flushright}
  \\rule{4cm}{0.4pt}
\\end{flushright}`}</code></pre>
          <p>
            A short centred rule is the traditional way to mark a scene break in fiction; a
            common definition is:
          </p>
          <pre><code>{`\\newcommand{\\scenebreak}{%
  \\par\\medskip\\centerline{\\rule{0.3\\linewidth}{0.4pt}}\\medskip
}

The door closed behind her.
\\scenebreak
Three weeks later, the letter arrived.`}</code></pre>

          {/* ── Spacing ── */}
          <h2>Space Above and Below a Line</h2>
          <p>
            A rule in its own paragraph picks up the normal paragraph spacing, which is often not
            what you want. Control it explicitly with <code>\vspace</code> or the skip commands:
          </p>
          <pre><code>{`\\vspace{1em}
\\noindent\\rule{\\linewidth}{0.4pt}
\\vspace{1em}

% compact form with explicit paragraph boundaries
\\par\\medskip\\noindent\\rule{\\linewidth}{0.4pt}\\par\\medskip`}</code></pre>
          <p>
            <code>\smallskip</code>, <code>\medskip</code> and <code>\bigskip</code> insert
            roughly 3pt, 6pt and 12pt of stretchable space. For a reusable divider, wrap the
            whole thing in a <code>\newcommand</code> so every instance is spaced identically.
            These skips still interact with <code>\parskip</code> and normal line spacing;
            they are not a promise of an exact gap. Unstarred <code>\vspace</code> can also
            disappear at a page boundary. Use <code>\vspace*</code> only when that space must
            remain at the top of a page.
          </p>

          {/* ── Colored ── */}
          <h2>Colored Lines</h2>
          <p>
            A <code>\rule</code> is drawn in the current text color, so any{' '}
            <code>xcolor</code> command works. Keep the color change inside a group so it does
            not leak into the following text:
          </p>
          <pre><code>{`\\usepackage{xcolor}

\\noindent{\\color{gray}\\rule{\\linewidth}{0.4pt}}
\\noindent\\textcolor{blue!60}{\\rule{\\linewidth}{1pt}}
Total: {\\color{red}\\hrulefill}        % \\hrulefill takes the color too`}</code></pre>

          {/* ── Dashed ── */}
          <h2>Dashed and Dotted Lines</h2>
          <p>
            Plain LaTeX has <code>\dotfill</code> and nothing else. For a real dashed rule use
            the <code>dashrule</code> package, whose <code>\hdashrule</code> has the same
            arguments as <code>\rule</code> plus a dash pattern of alternating on/off lengths:
          </p>
          <pre><code>{`\\usepackage{dashrule}

\\noindent\\hdashrule{\\linewidth}{0.4pt}{1pt}       % 1pt dash, 1pt gap
\\noindent\\hdashrule{\\linewidth}{0.4pt}{3mm 1mm}   % 3mm dash, 1mm gap
\\hdashrule[0.5ex]{4cm}{1pt}{2pt}                 % raised, short`}</code></pre>
          <p>
            With TikZ you get full control over the dash pattern, line caps and color:
          </p>
          <pre><code>{`\\usepackage{tikz}

\\noindent\\begin{tikzpicture}
  \\draw[dashed] (0,0) -- (\\linewidth,0);
\\end{tikzpicture}

\\noindent\\tikz\\draw[dotted, thick, gray] (0,0) -- (\\linewidth,0);
\\noindent\\tikz\\draw[dash pattern=on 6pt off 2pt, line width=0.8pt] (0,0) -- (\\linewidth,0);`}</code></pre>

          {/* ── Tables ── */}
          <h2>Horizontal Lines in Tables: \hline and \midrule</h2>
          <p>
            Inside <code>tabular</code>, horizontal lines are not drawn with <code>\rule</code>{' '}
            but with dedicated row commands. The standard ones are <code>\hline</code> for a
            line across the whole table and <code>{`\\cline{i-j}`}</code> for a line under
            columns <em>i</em> to <em>j</em>. Both must appear at the start of a row, i.e. right
            after <code>\\</code> or immediately after <code>{`\\begin{tabular}{...}`}</code>:
          </p>
          <pre><code>{`\\begin{tabular}{lcc}
  \\hline\\hline               % double line
  Item  & 2025 & 2026 \\\\
  \\hline
  Apples & 12 & 15 \\\\
  Pears  &  8 & 11 \\\\
  \\cline{2-3}                % line under the two number columns only
  Total  & 20 & 26 \\\\
  \\hline
\\end{tabular}`}</code></pre>
          <p>
            The thickness of every <code>\hline</code> is the length <code>\arrayrulewidth</code>{' '}
            (default 0.4pt): <code>{`\\setlength{\\arrayrulewidth}{1pt}`}</code> makes them all
            heavier.
          </p>

          <h3>booktabs: \toprule, \midrule, \bottomrule</h3>
          <p>
            For publication tables load <code>booktabs</code>. Its three rules have different
            thicknesses and, more importantly, built-in vertical padding, which is what makes a
            table look professionally typeset:
          </p>
          <pre><code>{`\\usepackage{booktabs}

\\begin{tabular}{lrr}
  \\toprule
  Method   & Accuracy & Time (s) \\\\
  \\midrule
  Baseline & 91.2 & 14 \\\\
  Ours     & 94.7 &  9 \\\\
  \\cmidrule(lr){2-3}          % partial rule, trimmed on both sides
  Mean     & 93.0 & 11.5 \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>
          <p>
            Do not mix <code>\hline</code> into a booktabs table. <code>\hline</code> has no
            padding, so the text sits directly on the line and the spacing becomes uneven
            compared with the booktabs rules around it; the package documentation also advises
            against vertical lines and double rules for the same reason. If you need a rule with
            custom thickness and spacing, use{' '}
            <code>{`\\specialrule{thickness}{space above}{space below}`}</code>, and use{' '}
            <code>\addlinespace</code> for a little extra air between rows without a line. The
            thicknesses are the lengths <code>\heavyrulewidth</code> (0.08em) and{' '}
            <code>\lightrulewidth</code> (0.05em).
          </p>

          {/* ── Headers and footers ── */}
          <h2>Lines in Headers and Footers</h2>
          <p>
            With <code>fancyhdr</code> the header rule is on by default and the footer rule is
            off. Both are controlled by two commands (not lengths, so use{' '}
            <code>\renewcommand</code>):
          </p>
          <pre><code>{`\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\leftmark}
\\fancyfoot[C]{\\thepage}
\\renewcommand{\\headrulewidth}{0.4pt}   % 0pt removes the header rule
\\renewcommand{\\footrulewidth}{0.4pt}   % add a footer rule

% colored header rule
\\usepackage{xcolor}
\\renewcommand{\\headrule}{{\\color{gray}%
  \\hrule height\\headrulewidth width\\headwidth \\vskip-\\headrulewidth}}`}</code></pre>

          {/* ── Section titles ── */}
          <h2>Lines Under Section Titles</h2>
          <p>
            The <code>titlesec</code> package formats headings, and its <code>\titlerule</code>{' '}
            draws a rule the full width of the heading. Give it as the optional &ldquo;after
            code&rdquo; argument of <code>\titleformat</code>:
          </p>
          <pre><code>{`\\usepackage{titlesec}

\\titleformat{\\section}
  {\\normalfont\\Large\\bfseries}   % format of the whole title
  {\\thesection}                  % label
  {1em}                          % space between label and title
  {}                             % code before the title
  [\\titlerule]                   % code after: a rule under the title

% thicker rule, or a dotted one
\\titleformat{\\section}{\\Large\\bfseries}{\\thesection}{1em}{}[{\\titlerule[1pt]}]
\\titleformat{\\section}{\\Large\\bfseries}{\\thesection}{1em}{}[{\\titlerule*[0.5pc]{.}}]`}</code></pre>
          <p>
            Without titlesec, the quick way is <code>{`\\section{Title}\\vspace{-1ex}\\noindent\\rule{\\linewidth}{0.4pt}`}</code>{' '}
            wrapped in a helper command, but it does not survive page breaks as gracefully.
          </p>

          {/* ── Signature ── */}
          <h2>Signature and Form Lines</h2>
          <p>
            A signature line is a rule of fixed width with a label underneath. Leave room above
            it for the pen, and use a <code>tabular</code> to keep several lines aligned:
          </p>
          <pre><code>{`\\vspace{2cm}
\\noindent\\rule{6cm}{0.4pt}\\\\
Signature

% two signature lines side by side with labels
\\vspace{2cm}
\\noindent
\\begin{tabular}{@{}p{6cm}@{\\hspace{1.5cm}}p{4cm}@{}}
  \\rule{6cm}{0.4pt} & \\rule{4cm}{0.4pt} \\\\
  Signature         & Date
\\end{tabular}

% a line that fills a fixed-width box
Name: \\makebox[6cm]{\\hrulefill}`}</code></pre>

          {/* ── Vertical ── */}
          <h2>Aside: Vertical Rules</h2>
          <p>
            The vertical counterparts behave the same way. <code>\vrule</code> is the primitive
            for horizontal mode (it stretches to the height of the enclosing line or box), and{' '}
            <code>\rule</code> with a small width and a large height gives a vertical bar of fixed
            size. In tables, a <code>|</code> in the column specification draws a vertical rule
            between columns:
          </p>
          <pre><code>{`left \\vrule\\ right                 % bar as tall as the line
left \\rule{0.4pt}{1cm} right       % 1cm bar standing on the baseline
left \\rule[-0.4cm]{0.4pt}{1cm} right  % lowered so it straddles the baseline

\\begin{tabular}{|l|c|}             % vertical rules between columns
  \\hline
  a & b \\\\
  \\hline
\\end{tabular}`}</code></pre>

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
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
                <td><em>Misplaced \noalign</em></td>
                <td><code>\hline</code>, <code>\cline</code> or <code>\midrule</code> in the middle of a row (after a cell, or before the <code>\\</code> that ends the previous row)</td>
                <td>End the row with <code>\\</code> first; the rule command must be the very first thing in a row</td>
              </tr>
              <tr>
                <td>Line sticks out into the right margin, <em>Overfull \hbox</em></td>
                <td><code>{`\\rule{\\linewidth}{...}`}</code> after a paragraph indent</td>
                <td>Add <code>\noindent</code> before the rule</td>
              </tr>
              <tr>
                <td>Line appears on its own line although it was meant inline</td>
                <td><code>\hrule</code> used inside a paragraph</td>
                <td>Use <code>\rule</code> or <code>\hrulefill</code> in running text</td>
              </tr>
              <tr>
                <td>Uneven spacing around rules in a booktabs table</td>
                <td><code>\hline</code> mixed with <code>\toprule</code>/<code>\midrule</code></td>
                <td>Use only the booktabs rules, <code>\cmidrule</code> and <code>\specialrule</code></td>
              </tr>
              <tr>
                <td>Line is too long inside a list or quote</td>
                <td>Width given as <code>\textwidth</code></td>
                <td>Use <code>\linewidth</code>, which follows the current indentation</td>
              </tr>
              <tr>
                <td><code>\hrule</code> stays left-aligned inside <code>center</code></td>
                <td><code>\hrule</code> is not a box, so alignment environments do not affect it</td>
                <td>Use <code>{`\\centerline{\\rule{0.5\\linewidth}{0.4pt}}`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \toprule</em></td>
                <td><code>booktabs</code> not loaded</td>
                <td><code>{`\\usepackage{booktabs}`}</code></td>
              </tr>
            </tbody>
          </table>
          </div>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage[margin=2.5cm, headheight=15pt]{geometry}
\\usepackage{xcolor}
\\usepackage{booktabs}
\\usepackage{dashrule}
\\usepackage{fancyhdr}
\\usepackage{titlesec}

% header rule only, in gray
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{Horizontal Lines}
\\fancyfoot[C]{\\thepage}
\\renewcommand{\\headrulewidth}{0.4pt}
\\renewcommand{\\headrule}{{\\color{gray}%
  \\hrule height\\headrulewidth width\\headwidth \\vskip-\\headrulewidth}}

% rule under every section title
\\titleformat{\\section}{\\normalfont\\Large\\bfseries}{\\thesection}{1em}{}[\\titlerule]

% reusable divider with fixed spacing
\\newcommand{\\divider}{\\par\\medskip\\noindent\\rule{\\linewidth}{0.4pt}\\par\\medskip}

\\begin{document}

\\section{Rules in Text}
A full-width line separates this paragraph from the next.
\\divider
A short centred rule marks a scene break.

\\centerline{\\rule{0.3\\linewidth}{0.4pt}}
A colored dashed rule:
\\par\\noindent{\\color{blue!60}\\hdashrule{\\linewidth}{0.6pt}{3mm 1mm}}

\\section{Rules in a Table}
\\begin{center}
\\begin{tabular}{lrr}
  \\toprule
  Method   & Accuracy & Time (s) \\\\
  \\midrule
  Baseline & 91.2 & 14 \\\\
  Ours     & 94.7 &  9 \\\\
  \\cmidrule(lr){2-3}
  Mean     & 93.0 & 11.5 \\\\
  \\bottomrule
\\end{tabular}
\\end{center}

\\section{Signature}
\\vspace{1.5cm}
\\noindent
\\begin{tabular}{@{}p{6cm}@{\\hspace{1.5cm}}p{4cm}@{}}
  \\rule{6cm}{0.4pt} & \\rule{4cm}{0.4pt} \\\\
  Signature         & Date
\\end{tabular}

\\end{document}`}</code></pre>


          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you draw a horizontal line in LaTeX?</h3>
          <p>
            Put <code>{`\\noindent\\rule{\\linewidth}{0.4pt}`}</code> on its own line between
            two paragraphs. It draws a 0.4pt line across the full text width and needs no
            package. <code>\hrule</code> does the same in one word, and <code>\hrulefill</code>{' '}
            fills only the rest of the current line.
          </p>
          <h3>How do I put a horizontal line in text, in the middle of a sentence?</h3>
          <p>
            Use <code>{`\\rule{3cm}{0.4pt}`}</code> for a line of fixed length or{' '}
            <code>\hrulefill</code> for a line that stretches to the end of the line, as in{' '}
            <code>Name: \hrulefill</code>. Both stay inside the paragraph. Do not use{' '}
            <code>\hrule</code> there: it ends the paragraph and puts the line on a line of its
            own.
          </p>
          <h3>Why do I need \noindent before \rule?</h3>
          <p>
            A new paragraph starts with an indent, usually 15pt.{' '}
            <code>{`\\rule{\\linewidth}{0.4pt}`}</code> is already as wide as the line, so the
            indent pushes it past the right margin and LaTeX reports an Overfull \hbox.{' '}
            <code>\noindent</code> removes the indent so the line starts at the left margin.
          </p>
          <h3>What is the difference between \hrule, \rule and \hrulefill?</h3>
          <p>
            <code>\hrule</code> is a TeX primitive that only works between paragraphs and always
            spans the full width unless you give it a width. <code>{`\\rule{width}{thickness}`}</code>{' '}
            is a box that behaves like a word, so it can be centred, colored or placed inline.{' '}
            <code>\hrulefill</code> is stretchable space drawn as a line that fills whatever room
            is left on the current line.
          </p>
          <h3>How do I make a thicker horizontal line in LaTeX?</h3>
          <p>
            Change the second argument of <code>\rule</code>:{' '}
            <code>{`\\noindent\\rule{\\linewidth}{1pt}`}</code> draws a 1pt line. With{' '}
            <code>\hrule</code> write <code>\hrule height 1pt</code>. In tables,{' '}
            <code>{`\\setlength{\\arrayrulewidth}{1pt}`}</code> thickens every <code>\hline</code>,
            and booktabs takes a thickness in brackets, as in <code>\midrule[1pt]</code>.
          </p>
          <h3>How do I add a horizontal line in a LaTeX table?</h3>
          <p>
            Write <code>\hline</code> at the start of a row for a line across the whole table and{' '}
            <code>{`\\cline{2-3}`}</code> for a line under columns 2 to 3. For publication tables
            load booktabs and use <code>\toprule</code>, <code>\midrule</code> and{' '}
            <code>\bottomrule</code>, which add padding around the line. A rule placed in the
            middle of a row causes the Misplaced \noalign error.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Lines in place? These guides pick up where this one stops:</p>
          <ul>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; booktabs, multicolumn, multirow, longtable and colored tables</li>
            <li><Link href="/blog/latex-blank-spaces-line-breaks-guide">Blank Spaces and Line Breaks in LaTeX</Link> &ndash; <code>\vspace</code>, <code>\\</code>, <code>\newline</code> and the spacing around your rules</li>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; fancyhdr headers and footers, page styles and numbering</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; The xcolor names and mixes used for colored rules</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test rules and spacing with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> &ndash; Convert spreadsheets to booktabs tables</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX formatting" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix layout problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Open the complete example in Octree, change a rule&apos;s width, and compare the
              PDF. If your own layout overflows, ask the AI assistant to explain the warning
              before applying a fix.
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
