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

const breadcrumbs = getLearnBreadcrumbs('Framebox', 'framebox')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'framebox',
  title: 'Framebox in LaTeX: \\fbox, \\framebox, Empty Boxes and Boxed Text',
  seoTitle: 'Framebox in LaTeX: \\fbox, \\framebox, Empty Boxes',
  description:
    'Draw a box around text in LaTeX with \\fbox and \\framebox: fixed widths, empty boxes for forms, checkboxes, multi-line boxes, \\boxed and colored frames.',
  keywords:
    'framebox latex, latex frame box, latex framebox, empty box latex, blank box latex, latex fbox, fbox latex, latex box around text, latex boxed text, latex checkbox, latex empty checkbox, latex square box, fboxsep, fboxrule, latex boxed equation, latex parbox frame, latex minipage frame, fcolorbox, latex form fields',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-20'

const faq: FaqItem[] = [
  {
    question: 'How do I put a box around text in LaTeX?',
    answer:
      'Use \\fbox{your text}. It needs no package, works inline and draws a 0.4pt frame with 3pt of padding. For a fixed width use \\framebox[4cm]{text} with an optional l, r or s alignment, and for text that should wrap over several lines put a \\parbox or minipage inside the \\fbox.',
  },
  {
    question: 'How do I make an empty box in LaTeX?',
    answer:
      'For a blank single-line field write \\framebox[3cm]{\\strut}; the \\strut gives the box the height of a text line, because an empty argument only produces a flat 6.8pt-high frame. For a multi-line answer box use \\fbox{\\parbox[c][3cm][t]{5cm}{\\strut}}. A completely empty \\parbox collapses to zero width, so keep the \\strut inside.',
  },
  {
    question: 'How do I make a checkbox in LaTeX?',
    answer:
      'Load amssymb and write $\\square$ for an empty checkbox and $\\boxtimes$ for a checked one. Without any package, \\fbox{\\phantom{X}} draws a text-mode square the size of a capital letter. For clickable boxes in a PDF form you need the hyperref Form environment instead.',
  },
  {
    question: 'What is the difference between \\fbox and \\framebox?',
    answer:
      '\\fbox{text} fits the frame to its content. \\framebox[width][pos]{text} does the same but takes an optional width and an alignment (c by default, l, r or s). With no optional arguments the two are identical. \\framebox also has a picture-mode form, \\framebox(w,h){text}, chosen whenever the first character after the command is an opening parenthesis.',
  },
  {
    question: 'Why does my \\fbox overflow the margin?',
    answer:
      'The frame is added outside the content, so \\fbox{\\parbox{\\linewidth}{...}} is \\linewidth plus 2\\fboxsep plus 2\\fboxrule, 6.8pt too wide by default, and pdflatex reports an Overfull \\hbox. Set the inner width to \\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax so the frame ends exactly at the margin.',
  },
]

export default async function FrameboxPage() {
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
          <h1>Framebox in LaTeX: \fbox, \framebox, Empty Boxes and Boxed Text</h1>
          <p className="lead">
            <strong>A frame box in LaTeX</strong> is a rectangle drawn around a piece of content.
            The two kernel commands are <code>\fbox&#123;text&#125;</code>, which fits the frame to
            its content, and <code>\framebox[width][pos]&#123;text&#125;</code>, which lets you fix
            the width and align the text inside. Neither needs a package. This guide covers both,
            the empty boxes and checkboxes used in forms, multi-line boxes with{' '}
            <code>\parbox</code> and <code>minipage</code>, <code>\boxed</code> for equations,
            colored frames, and the errors you will meet.
          </p>
          <p>
            Every example was compiled with pdfLaTeX on TeX Live 2025. The whole document below
            compiles as it is:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}   % \\boxed
\\usepackage{amssymb}   % \\square, \\boxtimes
\\usepackage{xcolor}    % \\fcolorbox, \\colorbox

\\begin{document}

A framed word: \\fbox{boxed text} sits inline, and math works too: \\fbox{$E = mc^2$}.

Fixed width: \\framebox[4cm]{centred} \\framebox[4cm][l]{left} \\framebox[4cm][r]{right}

Blank fields: Name: \\framebox[5cm]{\\strut} \\quad Date: \\framebox[3cm]{\\strut}

Checkboxes: $\\square$ Yes \\quad $\\square$ No \\quad $\\boxtimes$ Done

Color: \\fcolorbox{red}{yellow}{red frame, yellow fill} \\quad \\colorbox{yellow}{fill only}

\\[ \\boxed{x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}} \\]

\\noindent\\fbox{\\parbox{\\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax}{%
  A multi-line box: the \\texttt{\\string\\parbox} wraps the text, and its width is
  reduced by the frame so the box ends exactly at the right margin.}}

\\end{document}`}</code></pre>

          {/* ───────────────────────────── \fbox ───────────────────────────── */}
          <h2>\fbox: The Basic Framed Box</h2>
          <p>
            <code>\fbox&#123;...&#125;</code> puts its argument in a horizontal box and draws a rule
            around it. It is an inline command, so it sits in the line like a word, and anything
            that fits on one line can go inside, including math in <code>$...$</code>:
          </p>
          <pre><code>{`A framed word: \\fbox{boxed text} sits inline with the sentence.

Math inside: \\fbox{$E = mc^2$} and \\fbox{$\\int_0^1 x^2\\,dx = \\tfrac13$}.`}</code></pre>
          <p>
            Two lengths control the look. <code>\fboxsep</code> is the padding between the content
            and the rule, 3pt by default; <code>\fboxrule</code> is the thickness of the rule, 0.4pt
            by default. Both are ordinary lengths, so you change them with{' '}
            <code>\setlength</code>. Put the change in a group (a pair of braces) and it only
            applies to the boxes inside that group:
          </p>
          <pre><code>{`Defaults: \\fbox{default frame}

Tighter and thicker, changed locally inside a group:
{\\setlength{\\fboxsep}{1pt}\\setlength{\\fboxrule}{1.2pt}\\fbox{tight, thick frame}}

No padding at all: {\\setlength{\\fboxsep}{0pt}\\fbox{flush}}

Back to the defaults outside the group: \\fbox{default frame}`}</code></pre>
          <p>
            Setting the lengths in the preamble, outside any group, changes every frame in the
            document, including the ones <code>\fcolorbox</code> and <code>\boxed</code> draw.
          </p>

          {/* ───────────────────────────── \framebox ───────────────────────────── */}
          <h2>\framebox: Fixed Width and Alignment</h2>
          <p>
            <code>\framebox[width][pos]&#123;text&#125;</code> is <code>\fbox</code> with two
            optional arguments. The first is the width of the content area; the second says where
            the text sits in it: <code>c</code> centred (the default), <code>l</code> left,{' '}
            <code>r</code> right, or <code>s</code> to stretch the inter-word space so the text
            fills the box. <code>\makebox</code> takes the same arguments and draws no frame.
          </p>
          <pre><code>{`Fixed width, centred by default: \\framebox[4cm]{centred}

Left aligned:  \\framebox[4cm][l]{left}

Right aligned: \\framebox[4cm][r]{right}

Stretched, the inter-word space grows: \\framebox[6cm][s]{one two three}

Same width, no frame: \\makebox[4cm][l]{left}`}</code></pre>
          <p>
            The width is the content width. The frame adds <code>\fboxsep</code> and{' '}
            <code>\fboxrule</code> on each side, so <code>\framebox[4cm]&#123;..&#125;</code> is
            4cm + 6.8pt wide on the page. There is also a picture-mode form,{' '}
            <code>\framebox(4,1.5)&#123;text&#125;</code>, which measures in{' '}
            <code>\unitlength</code> and is meant for the <code>picture</code> environment; it
            compiled fine in our test, but it is rarely what people searching for a frame box want,
            and it is the cause of one error <a href="#common-errors">listed below</a>.
          </p>

          {/* ───────────────────────────── Empty boxes ───────────────────────────── */}
          <h2 id="empty-boxes">Empty Boxes, Blank Fields and Checkboxes</h2>
          <p>
            An empty argument gives you almost nothing: <code>\framebox[2cm]&#123;&#125;</code>{' '}
            compiles, but the box is only 6.8pt tall, padding and rule with no content. To get a
            blank field the height of a text line, put a <code>\strut</code> inside, or an
            invisible <code>\rule</code> of the height you want next to a <code>\hspace</code> of
            the width you want:
          </p>
          <pre><code>{`Single-line blanks: \\framebox[2cm]{\\strut} \\quad \\fbox{\\rule{0pt}{1.5em}\\hspace{3cm}}

Multi-line answer box, 5cm wide and 3cm tall: \\fbox{\\parbox[c][3cm][t]{5cm}{\\strut}}`}</code></pre>
          <p>
            The <code>\strut</code> in the <code>\parbox</code> matters. We measured{' '}
            <code>\fbox&#123;\parbox[c][3cm][t]&#123;5cm&#125;&#123;&#125;&#125;</code> with a
            genuinely empty body, and it came out 3cm tall but only 6.8pt wide: an empty paragraph
            box has no lines, so it collapses to zero width and the frame is a thin vertical bar.
            Any content, even <code>\strut</code> or <code>~</code>, restores the full 5cm.
          </p>
          <p>
            For checkboxes, <code>amssymb</code> provides <code>$\square$</code> (empty) and{' '}
            <code>$\boxtimes$</code> (checked). Without a package,{' '}
            <code>\fbox&#123;\phantom&#123;X&#125;&#125;</code> draws a square the size of a capital
            letter, 14.3pt by 13.6pt in a 10pt document. A typical form row:
          </p>
          <pre><code>{`\\usepackage{amssymb}

\\noindent Name: \\framebox[6cm]{\\strut} \\quad Date: \\framebox[3cm]{\\strut}

\\noindent Email: \\framebox[\\dimexpr\\linewidth-1.3cm\\relax][l]{\\strut}

\\noindent Attending? \\quad $\\square$ Yes \\quad $\\square$ No \\quad $\\square$ Maybe

\\noindent Text-mode checkbox without amssymb: \\fbox{\\phantom{X}}

\\noindent Comments:\\\\[4pt]
\\noindent\\fbox{\\parbox[c][3cm][t]{\\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax}{\\strut}}`}</code></pre>
          <p>
            These are printed boxes for a form you fill in by hand. Boxes that can be ticked in a
            PDF viewer are a different mechanism, the <code>Form</code> environment of{' '}
            <code>hyperref</code>.
          </p>

          {/* ───────────────────────────── Multi-line ───────────────────────────── */}
          <h2 id="multi-line-boxes">Multi-Line Boxes: \parbox, minipage and \boxed</h2>
          <p>
            <code>\fbox</code> never wraps text. For a framed paragraph put a <code>\parbox</code>{' '}
            inside it, and for anything with lists, displayed equations or footnotes use a{' '}
            <code>minipage</code>. The catch is the width: the frame is added outside the content,
            so <code>\fbox&#123;\parbox&#123;\linewidth&#125;&#123;...&#125;&#125;</code> is{' '}
            <code>\linewidth</code> plus 2<code>\fboxsep</code> plus 2<code>\fboxrule</code>, which
            is 6.8pt too wide and pokes into the right margin. Subtract the frame with{' '}
            <code>\dimexpr</code>:
          </p>
          <pre><code>{`\\noindent\\fbox{\\parbox{\\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax}{%
  A framed paragraph that wraps to the text width. The width is reduced by
  twice \\texttt{\\string\\fboxsep} plus twice \\texttt{\\string\\fboxrule} so the
  frame itself ends exactly at the right margin.}}

\\bigskip
\\noindent\\fbox{\\begin{minipage}{\\dimexpr\\linewidth-2\\fboxsep-2\\fboxrule\\relax}
  A minipage can hold anything a page can: lists, equations, footnotes.
  \\begin{itemize}
    \\item one item
    \\item another item
  \\end{itemize}
  \\[ a^2 + b^2 = c^2 \\]
\\end{minipage}}`}</code></pre>
          <p>
            In our compile the plain <code>\parbox&#123;\linewidth&#125;</code> version measured
            351.8pt against a 345pt line and logged{' '}
            <code>Overfull \hbox (6.79999pt too wide)</code>; the <code>\dimexpr</code> version
            measured exactly 345pt. The <code>\noindent</code> stops the paragraph indent from
            pushing the box right by another <code>\parindent</code>.
          </p>
          <p>
            For math, <code>amsmath</code> gives <code>\boxed&#123;...&#125;</code>, which is an{' '}
            <code>\fbox</code> whose content is typeset in display math style. It works in displayed
            equations, numbered equations and inline:
          </p>
          <pre><code>{`\\usepackage{amsmath}

\\[
  \\boxed{x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}}
\\]

\\begin{equation}
  \\boxed{\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}}
\\end{equation}

Inline: $\\boxed{E = mc^2}$.`}</code></pre>

          {/* ───────────────────────────── Color ───────────────────────────── */}
          <h2>Colored Frames and Backgrounds</h2>
          <p>
            With <code>xcolor</code> loaded, <code>\fcolorbox&#123;frame&#125;&#123;background&#125;&#123;text&#125;</code>{' '}
            draws a colored frame over a colored background, and{' '}
            <code>\colorbox&#123;background&#125;&#123;text&#125;</code> fills without a frame. Both
            obey <code>\fboxsep</code> and <code>\fboxrule</code>. The color names, mixes such as{' '}
            <code>green!60!black</code> and your own <code>\definecolor</code> palettes are covered
            in the <Link href="/learn/colors">colors guide</Link>.
          </p>
          <pre><code>{`\\usepackage{xcolor}

\\fcolorbox{red}{yellow}{red frame, yellow background} \\quad
\\colorbox{yellow}{background only, no frame} \\quad
\\fcolorbox{blue}{white}{blue frame, white background}

{\\setlength{\\fboxrule}{2pt}\\fcolorbox{green!60!black}{green!10}{thick green frame}}`}</code></pre>
          <p>
            Rounded corners, shadows, titles and boxes that break across pages are beyond{' '}
            <code>\fbox</code>. That is what <code>tcolorbox</code> is for, and the{' '}
            <Link href="/blog/colored-boxes-latex-tcolorbox-guide">tcolorbox guide</Link> goes
            through its options; the shortest useful example is six lines:
          </p>
          <pre><code>{`\\usepackage[most]{tcolorbox}

\\begin{tcolorbox}[colback=blue!5, colframe=blue!60!black, title=Note,
                  arc=3mm, drop shadow]
  A rounded box with a title and a shadow.
\\end{tcolorbox}`}</code></pre>

          {/* ───────────────────────────── Figures, tables, equations ───────────────────────────── */}
          <h2>A Box Around a Figure, Table or Equation</h2>
          <p>
            <code>\fbox</code> frames any box, so wrap it around an <code>\includegraphics</code> or
            a <code>tabular</code>. Set <code>\fboxsep</code> to 0pt for a frame that touches the
            image edge. The example uses two <code>\rule</code>s as a 5cm by 3cm stand-in so it
            compiles without an image file:
          </p>
          <pre><code>{`\\usepackage{graphicx}
\\usepackage{booktabs}

\\begin{figure}[h]
  \\centering
  \\fbox{\\rule{0pt}{3cm}\\rule{5cm}{0pt}}   % stand-in for \\fbox{\\includegraphics[width=5cm]{plot.pdf}}
  \\caption{A framed figure.}
\\end{figure}

\\begin{table}[h]
  \\centering
  \\fbox{%
    \\begin{tabular}{lr}
      \\toprule
      Item  & Cost  \\\\
      \\midrule
      Paper & 3.00  \\\\
      Ink   & 12.50 \\\\
      \\bottomrule
    \\end{tabular}}
  \\caption{A framed table.}
\\end{table}

Tight frame, no padding: {\\setlength{\\fboxsep}{0pt}\\fbox{\\rule{3cm}{1cm}}}   % same with \\includegraphics[width=3cm]{logo.png}`}</code></pre>
          <p>
            For equations use <code>\boxed</code> from the previous section rather than{' '}
            <code>\fbox&#123;$...$&#125;</code>, which would set the math in text style with small
            fractions and limits.
          </p>

          {/* ───────────────────────────── Errors ───────────────────────────── */}
          <h2 id="common-errors">Common Errors and Surprises</h2>
          <p>Each of these was reproduced on TeX Live 2025; the log line is quoted as it appears.</p>
          <table>
            <thead>
              <tr>
                <th scope="col">What you see</th>
                <th scope="col">Cause</th>
                <th scope="col">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Text after a blank line is pulled onto the same line inside the box, often with <code>Overfull \hbox (315.52344pt too wide)</code></td>
                <td>A blank line inside <code>\fbox&#123;...&#125;</code>. There is no error: the box is a single horizontal line, the paragraph break is ignored and the whole text runs on without wrapping.</td>
                <td>Put a <code>\parbox</code> or <code>minipage</code> inside the <code>\fbox</code>, as in <a href="#multi-line-boxes">multi-line boxes</a>.</td>
              </tr>
              <tr>
                <td><code>Overfull \hbox (6.79999pt too wide)</code></td>
                <td><code>\fbox&#123;\parbox&#123;\linewidth&#125;...&#125;</code>: the frame is added outside the content width.</td>
                <td>Width <code>\dimexpr\linewidth-2\fboxsep-2\fboxrule\relax</code>.</td>
              </tr>
              <tr>
                <td><code>Runaway argument?</code> then <code>! File ended while scanning use of \@framepicbox.</code></td>
                <td><code>\framebox (a) text</code>: when the first character after <code>\framebox</code> is <code>(</code>, LaTeX reads the picture-mode form and looks for <code>(width,height)</code> until the file ends.</td>
                <td>Brace the argument: <code>\framebox&#123;(a) text&#125;</code>, which compiles.</td>
              </tr>
              <tr>
                <td><code>! Undefined control sequence.</code> at <code>\fcolorbox</code> or <code>\colorbox</code></td>
                <td><code>xcolor</code> (or <code>color</code>) is not loaded.</td>
                <td><code>\usepackage&#123;xcolor&#125;</code></td>
              </tr>
              <tr>
                <td><code>! Undefined control sequence.</code> at <code>\boxed</code></td>
                <td><code>amsmath</code> is not loaded.</td>
                <td><code>\usepackage&#123;amsmath&#125;</code></td>
              </tr>
              <tr>
                <td><code>! Missing $ inserted.</code></td>
                <td>A blank line inside <code>\boxed&#123;...&#125;</code>: the paragraph break ends math mode.</td>
                <td>Remove the blank line; use <code>aligned</code> or <code>gathered</code> inside <code>\boxed</code> for several rows.</td>
              </tr>
              <tr>
                <td>A thin vertical bar instead of an answer box</td>
                <td><code>\fbox&#123;\parbox[c][3cm][t]&#123;5cm&#125;&#123;&#125;&#125;</code> with an empty body collapses to zero width.</td>
                <td>Put <code>\strut</code> inside the <code>\parbox</code>.</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I put a box around text in LaTeX?</h3>
          <p>
            Use <code>\fbox&#123;your text&#125;</code>. It needs no package, works inline and draws
            a 0.4pt frame with 3pt of padding. For a fixed width use{' '}
            <code>\framebox[4cm]&#123;text&#125;</code> with an optional <code>l</code>,{' '}
            <code>r</code> or <code>s</code> alignment, and for text that should wrap over several
            lines put a <code>\parbox</code> or <code>minipage</code> inside the <code>\fbox</code>.
          </p>
          <h3>How do I make an empty box in LaTeX?</h3>
          <p>
            For a blank single-line field write <code>\framebox[3cm]&#123;\strut&#125;</code>; the{' '}
            <code>\strut</code> gives the box the height of a text line, because an empty argument
            only produces a flat 6.8pt-high frame. For a multi-line answer box use{' '}
            <code>\fbox&#123;\parbox[c][3cm][t]&#123;5cm&#125;&#123;\strut&#125;&#125;</code>. A
            completely empty <code>\parbox</code> collapses to zero width, so keep the{' '}
            <code>\strut</code> inside.
          </p>
          <h3>How do I make a checkbox in LaTeX?</h3>
          <p>
            Load <code>amssymb</code> and write <code>$\square$</code> for an empty checkbox and{' '}
            <code>$\boxtimes$</code> for a checked one. Without any package,{' '}
            <code>\fbox&#123;\phantom&#123;X&#125;&#125;</code> draws a text-mode square the size of a
            capital letter. For clickable boxes in a PDF form you need the <code>hyperref</code>{' '}
            <code>Form</code> environment instead.
          </p>
          <h3>What is the difference between \fbox and \framebox?</h3>
          <p>
            <code>\fbox&#123;text&#125;</code> fits the frame to its content.{' '}
            <code>\framebox[width][pos]&#123;text&#125;</code> does the same but takes an optional
            width and an alignment (<code>c</code> by default, <code>l</code>, <code>r</code> or{' '}
            <code>s</code>). With no optional arguments the two are identical. <code>\framebox</code>{' '}
            also has a picture-mode form, <code>\framebox(w,h)&#123;text&#125;</code>, chosen
            whenever the first character after the command is an opening parenthesis.
          </p>
          <h3>Why does my \fbox overflow the margin?</h3>
          <p>
            The frame is added outside the content, so{' '}
            <code>\fbox&#123;\parbox&#123;\linewidth&#125;&#123;...&#125;&#125;</code> is{' '}
            <code>\linewidth</code> plus 2<code>\fboxsep</code> plus 2<code>\fboxrule</code>, 6.8pt
            too wide by default, and pdflatex reports an <code>Overfull \hbox</code>. Set the inner
            width to <code>\dimexpr\linewidth-2\fboxsep-2\fboxrule\relax</code> so the frame ends
            exactly at the margin.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Frames usually come with one of these:</p>
          <ul>
            <li><Link href="/blog/colored-boxes-latex-tcolorbox-guide">Colored Boxes with tcolorbox</Link> – Rounded corners, titles, shadows, theorem boxes and boxes that break across pages</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> – The xcolor names, mixes and custom colors that \fcolorbox and \colorbox take</li>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines</Link> – \rule, \hrule and the other ways to draw lines without a box</li>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> – Borders around and inside a tabular with booktabs and vertical rules</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> – The amsmath environments that go inside \boxed</li>
            <li><Link href="/learn/theorems-proofs">Theorems and Proofs</Link> – Framed theorem environments with thmtools and tcolorbox</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste any example above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – \square, \boxtimes and the other box and shape symbols with copy-paste commands</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Forms, reports and articles with xcolor and amsmath already loaded</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Box" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Frame it, see it, fix the width in one go</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with TeX Live already set up: paste any example
              above, ask for a form with blank fields or a boxed equation, and watch the PDF update
              as you type, overfull boxes included.
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
