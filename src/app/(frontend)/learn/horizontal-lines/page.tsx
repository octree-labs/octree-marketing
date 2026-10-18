import type { Metadata } from 'next/types'

import { learnMetadata } from '@/utilities/learnMetadata'
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

const breadcrumbs = getLearnBreadcrumbs('Horizontal Lines in LaTeX', 'horizontal-lines')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'horizontal-lines',
  title: 'Horizontal Lines in LaTeX: \\hrule, \\rule, \\hrulefill and Table Rules',
  seoTitle: 'Horizontal Lines in LaTeX: \\hrule, \\rule, \\hline',
  description: 'How to draw a horizontal line in LaTeX: \\hrule vs \\rule{\\linewidth}{0.4pt}, \\hrulefill and \\dotfill, partial and centred lines, colored and dashed rules, \\hline and booktabs rules in tables, header and footer rules with fancyhdr, rules under section titles, signature lines and the Misplaced \\noalign error.',
  keywords: 'horizontal line latex, latex horizontal line, latex horizontal line in text, latex horizontal rule, latex hrule, latex rule, latex hrulefill, latex line across page, latex draw line, latex dashed line, latex colored line, latex hline, booktabs toprule midrule bottomrule, latex signature line, latex headrulewidth, misplaced noalign, latex vertical line',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

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
          <h1>Horizontal Lines in LaTeX: \hrule, \rule, \hrulefill and Table Rules</h1>
          <p className="lead">
            A horizontal line in LaTeX is drawn with one of three commands, and which one you
            need depends on where the line goes. <code>\hrule</code> is the TeX primitive for a
            line between paragraphs, <code>\rule</code> draws a line of any width and thickness
            inside text, and <code>\hrulefill</code> stretches a line to fill the rest of a line.
            This guide covers all three, plus partial and centred lines, colored and dashed lines,
            rules in tables with <code>booktabs</code>, header and footer rules with{' '}
            <code>fancyhdr</code>, rules under section titles, signature lines and the{' '}
            <em>Misplaced \noalign</em> error.
          </p>

          {/* ── Three commands ── */}
          <h2>The Three Line Commands</h2>

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
            quotes and minipages; <code>\textwidth</code> is always the full text block. In a
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
}`}</code></pre>

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
}`}</code></pre>

          {/* ── Spacing ── */}
          <h2>Space Above and Below a Line</h2>
          <p>
            A rule in its own paragraph picks up the normal paragraph spacing, which is often not
            what you want. Control it explicitly with <code>\vspace</code> or the skip commands:
          </p>
          <pre><code>{`\\vspace{1em}
\\noindent\\rule{\\linewidth}{0.4pt}
\\vspace{1em}

% compact form that does not depend on \\parskip
\\par\\medskip\\noindent\\rule{\\linewidth}{0.4pt}\\par\\medskip`}</code></pre>
          <p>
            <code>\smallskip</code>, <code>\medskip</code> and <code>\bigskip</code> insert
            roughly 3pt, 6pt and 12pt of stretchable space. For a reusable divider, wrap the
            whole thing in a <code>\newcommand</code> so every instance is spaced identically.
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
          <h2>Lines in Tables</h2>
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
          <h2>Common Errors and Fixes</h2>
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
              <tr><td>Full-width line between paragraphs</td><td><code>\hrule</code> or <code>{`\\noindent\\rule{\\linewidth}{0.4pt}`}</code></td></tr>
              <tr><td>Thicker line</td><td><code>{`\\noindent\\rule{\\linewidth}{1pt}`}</code></td></tr>
              <tr><td>Short line, inline</td><td><code>{`\\rule{3cm}{0.4pt}`}</code></td></tr>
              <tr><td>Raised line</td><td><code>{`\\rule[0.5ex]{3cm}{0.4pt}`}</code></td></tr>
              <tr><td>Fill the rest of the line</td><td><code>\hrulefill</code> / <code>\dotfill</code></td></tr>
              <tr><td>Centred half-width line</td><td><code>{`\\centerline{\\rule{0.5\\linewidth}{0.4pt}}`}</code></td></tr>
              <tr><td>Colored line</td><td><code>{`{\\color{gray}\\rule{\\linewidth}{0.4pt}}`}</code> (xcolor)</td></tr>
              <tr><td>Dashed line</td><td><code>{`\\hdashrule{\\linewidth}{0.4pt}{3mm 1mm}`}</code> (dashrule)</td></tr>
              <tr><td>Dashed line with TikZ</td><td><code>{`\\tikz\\draw[dashed] (0,0) -- (\\linewidth,0);`}</code></td></tr>
              <tr><td>Table line, full / partial</td><td><code>\hline</code> / <code>{`\\cline{2-3}`}</code></td></tr>
              <tr><td>Booktabs rules</td><td><code>\toprule</code>, <code>\midrule</code>, <code>{`\\cmidrule(lr){2-3}`}</code>, <code>\bottomrule</code></td></tr>
              <tr><td>Table rule thickness</td><td><code>{`\\setlength{\\arrayrulewidth}{1pt}`}</code></td></tr>
              <tr><td>Header / footer rule (fancyhdr)</td><td><code>{`\\renewcommand{\\headrulewidth}{0.4pt}`}</code> / <code>{`\\renewcommand{\\footrulewidth}{0.4pt}`}</code></td></tr>
              <tr><td>Rule under section titles</td><td><code>{`\\titleformat{\\section}{...}{\\thesection}{1em}{}[\\titlerule]`}</code> (titlesec)</td></tr>
              <tr><td>Signature line</td><td><code>{`\\rule{6cm}{0.4pt}`}</code></td></tr>
              <tr><td>Vertical bar</td><td><code>\vrule</code> or <code>{`\\rule{0.4pt}{1cm}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Lines in place? These guides pick up where this one stops:</p>
          <ul>
            <li><Link href="/learn/tables">LaTeX Tables</Link> &ndash; booktabs, multicolumn, multirow, longtable and colored tables</li>
            <li><Link href="/blog/latex-blank-spaces-line-breaks-guide">Blank Spaces and Line Breaks in LaTeX</Link> &ndash; <code>\vspace</code>, <code>\\</code>, <code>\newline</code> and the spacing around your rules</li>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; fancyhdr headers and footers, page styles and numbering</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; The xcolor names and mixes used for colored rules</li>
            <li><Link href="/learn/tikz">Learn TikZ</Link> &ndash; Draw lines, arrows and diagrams programmatically</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
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
              Octree&apos;s AI editor explains <em>Misplaced \noalign</em> and overfull box
              warnings in plain language, fixes your tables, and compiles your document in
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
