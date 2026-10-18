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

const breadcrumbs = getLearnBreadcrumbs('Multi-line Equations in LaTeX', 'multiline-equations')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'multiline-equations',
  title: 'Multi-line Equations in LaTeX: align, split, multline, gather',
  seoTitle: 'Multi-line Equations in LaTeX: align, split, multline',
  description: 'Break and align equations over several lines in LaTeX: align and align*, split for one number, multline for one long equation, gather, aligned, alignat, \\intertext, page breaks, brackets across lines, and the errors to avoid.',
  keywords: 'latex new line in equation, latex multiline equation, latex align equations, latex break long equation, latex equation array, latex split equation, latex gather, latex align environment, latex multline, latex aligned, latex alignat, latex intertext, latex equation line break, latex eqnarray, latex allowdisplaybreaks, latex nonumber, latex cases, latex system of equations',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I start a new line inside an equation in LaTeX?',
    answer:
      'The equation environment is single-line. Use an amsmath environment that allows \\\\: align or align* for several aligned equations, split inside equation for one equation with one number, or multline for one long equation with no alignment point.',
  },
  {
    question: 'What is the difference between align and split?',
    answer:
      'align is a complete display that numbers every line (suppress a number with \\notag). split is used inside equation, align or gather and treats its lines as one equation with a single number centred on the group. Use align for a sequence of equations and split for one derivation that happens to be long.',
  },
  {
    question: 'How do I break a long equation that has no equals sign to align on?',
    answer:
      'Use multline. Its first line is set flush left, its last line flush right, and any lines between are centred, with one equation number on the last line. Break before an operator (+, -, =) so the next line starts with it.',
  },
  {
    question: 'Why does align give me "Misplaced alignment tab character &"?',
    answer:
      'That message means an & was found where no alignment is active, usually in a plain equation or \\[ ... \\] environment. Switch to align, or wrap the lines in split. Inside gather, which has no alignment points, the same mistake reports "Extra alignment tab has been changed to \\cr".',
  },
  {
    question: 'Should I use eqnarray?',
    answer:
      'No. eqnarray is a pre-amsmath environment with wrong spacing around the = column, no way to stop long lines from overprinting the equation number, and inconsistent handling of \\nonumber. amsmath\'s align does the same job correctly and every modern document should use it.',
  },
  {
    question: 'How do I allow a page break inside a long align?',
    answer:
      'amsmath forbids page breaks inside displays by default. Put \\allowdisplaybreaks in the preamble to allow them in align, gather, alignat and multline, and use \\\\* on a specific line to forbid a break after it. aligned, gathered and split are single boxes and never break.',
  },
]

export default async function LaTeXMultilineEquationsPage() {
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
          <h1>Multi-line Equations in LaTeX: align, split, multline, gather</h1>
          <p className="lead">
            The <code>equation</code> environment holds exactly one line. The moment a
            derivation needs a second line, or a formula runs past the margin, you need one of
            the amsmath display environments. This guide shows which one to pick:{' '}
            <code>align</code> for a stack of equations lined up on their equals signs,{' '}
            <code>split</code> for one long equation with one number, <code>multline</code> for a
            long expression with no alignment point, <code>gather</code> for centred lines, and
            the <code>aligned</code> and <code>gathered</code> building blocks that nest inside
            other environments. It also covers numbering, text between lines, brackets that span
            a break, page breaks, <code>cases</code>, the automatic <code>breqn</code> package,
            and why <code>eqnarray</code> should be retired.
          </p>
          <p>
            Every environment below needs <code>{`\\usepackage{amsmath}`}</code>. Basic math
            syntax is covered in the{' '}
            <Link href="/learn/mathematical-expressions">mathematical expressions guide</Link>;
            labels, <code>\eqref</code> and numbering styles have their own{' '}
            <Link href="/learn/equation-numbering">equation numbering guide</Link>.
          </p>

          {/* ── Which one ── */}
          <h2>Which Environment Do I Need?</h2>
          <table>
            <thead>
              <tr>
                <th>Situation</th>
                <th>Environment</th>
                <th>Numbers</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Several equations, aligned on <code>=</code></td><td><code>align</code></td><td>One per line</td></tr>
              <tr><td>One equation too long for a line, aligned continuation</td><td><code>split</code> inside <code>equation</code></td><td>One for the group</td></tr>
              <tr><td>One long equation, no alignment point</td><td><code>multline</code></td><td>One, on the last line</td></tr>
              <tr><td>Several equations, each centred</td><td><code>gather</code></td><td>One per line</td></tr>
              <tr><td>Aligned block inside a larger formula or beside another</td><td><code>aligned</code>, <code>gathered</code></td><td>From the outer environment</td></tr>
              <tr><td>Several alignment columns with controlled spacing</td><td><code>alignat</code></td><td>One per line</td></tr>
              <tr><td>Piecewise definition</td><td><code>cases</code> inside <code>equation</code></td><td>One</td></tr>
            </tbody>
          </table>
          <p>
            Each has a starred form (<code>align*</code>, <code>gather*</code>,{' '}
            <code>multline*</code>, <code>equation*</code>) that prints no numbers at all.
          </p>

          {/* ── align ── */}
          <h2>align: Equations Aligned on a Symbol</h2>
          <p>
            <code>&amp;</code> marks the alignment point on each line, usually just before the
            relation symbol, and <code>\\</code> ends a line. Every line gets its own number
            unless you suppress it:
          </p>
          <pre><code>{`\\begin{align}
  f(x) &= (x + 1)^2 \\\\
       &= x^2 + 2x + 1 \\label{eq:expanded}
\\end{align}

\\begin{align*}
  f(x) &= (x + 1)^2 \\\\
       &= x^2 + 2x + 1
\\end{align*}`}</code></pre>
          <p>
            Put <code>&amp;</code> <em>before</em> the <code>=</code>, not after it. The
            material to the left of <code>&amp;</code> is set flush right and the material to
            the right flush left, so <code>&amp;=</code> keeps the equals signs in a column
            with correct spacing. Do not end the last line with <code>\\</code>: it creates an
            empty extra line that still receives an equation number.
          </p>

          <h3>Removing the number from some lines</h3>
          <p>
            <code>\notag</code> (or the older <code>\nonumber</code>) before the <code>\\</code>{' '}
            suppresses the number on that line only. The usual pattern numbers just the final
            result:
          </p>
          <pre><code>{`\\begin{align}
  a &= b + c \\notag \\\\
    &= d + e \\notag \\\\
    &= f \\label{eq:result}
\\end{align}`}</code></pre>

          <h3>Several equations side by side</h3>
          <p>
            Each extra pair of <code>&amp;</code> adds a column. Odd-numbered ampersands align;
            even-numbered ones separate the columns, and amsmath spreads the columns evenly
            across the line:
          </p>
          <pre><code>{`\\begin{align}
  x  &= 1,  & y  &= 2,  & z  &= 3 \\\\
  x' &= 10, & y' &= 20, & z' &= 30
\\end{align}`}</code></pre>

          {/* ── split ── */}
          <h2>split: One Equation, One Number</h2>
          <p>
            When a single equation is too long, <code>split</code> inside <code>equation</code>{' '}
            gives aligned continuation lines and a single number centred vertically on the
            group. <code>split</code> cannot stand alone; it must be wrapped in{' '}
            <code>equation</code>, <code>align</code> or <code>gather</code>, and the{' '}
            <code>\label</code> belongs to the outer environment:
          </p>
          <pre><code>{`\\begin{equation}
  \\begin{split}
    (a + b)^2 &= (a + b)(a + b) \\\\
              &= a^2 + ab + ba + b^2 \\\\
              &= a^2 + 2ab + b^2
  \\end{split}
  \\label{eq:square}
\\end{equation}`}</code></pre>
          <p>
            For an unnumbered version use <code>equation*</code> (or <code>\[ ... \]</code>,
            which amsmath makes equivalent) around the <code>split</code>.
          </p>

          {/* ── multline ── */}
          <h2>multline: A Long Expression With No Alignment Point</h2>
          <p>
            Some expressions are just long: a sum of many terms, a polynomial, a product. There
            is nothing to align on, so <code>multline</code> sets the first line flush left, the
            last line flush right and anything in between centred, with one number on the last
            line. Break before an operator so each continuation line starts with it:
          </p>
          <pre><code>{`\\begin{multline}
  a + b + c + d + e + f + g + h \\\\
  + i + j + k + l + m + n \\\\
  = p + q + r + s + t + u \\label{eq:long}
\\end{multline}`}</code></pre>
          <p>
            <code>\shoveleft{'{...}'}</code> and <code>\shoveright{'{...}'}</code> push a middle
            line to one side, and the length <code>\multlinegap</code> (default 10pt) controls
            the indentation of the first and last lines from the margins.
          </p>

          {/* ── gather ── */}
          <h2>gather: Centred Lines</h2>
          <p>
            <code>gather</code> stacks equations without aligning them; each line is centred and
            numbered. It is the right choice for a list of unrelated results or a system of
            equations of very different shapes:
          </p>
          <pre><code>{`\\begin{gather}
  a_1 = b_1 + c_1 \\\\
  a_2 = b_2 + c_2 - d_2 + e_2 \\label{eq:second}
\\end{gather}`}</code></pre>
          <p>
            There are no <code>&amp;</code> in <code>gather</code>; using one gives{' '}
            <em>Extra alignment tab has been changed to \cr</em>.
          </p>

          {/* ── aligned / gathered ── */}
          <h2>aligned and gathered: Blocks Inside Other Math</h2>
          <p>
            <code>aligned</code> and <code>gathered</code> produce the same layouts as{' '}
            <code>align</code> and <code>gather</code> but as a box that can be placed inside any
            math, including beside a brace or next to another block. They take an optional
            position argument (<code>[t]</code>, <code>[b]</code>) and leave numbering to the
            surrounding environment:
          </p>
          <pre><code>{`\\begin{equation}
  \\left.
  \\begin{aligned}
    a &= b + c \\\\
    d &= e
  \\end{aligned}
  \\right\\} \\quad \\text{(both hold)}
\\end{equation}

\\[
  \\begin{aligned}
    x &= r \\cos\\theta \\\\
    y &= r \\sin\\theta
  \\end{aligned}
  \\qquad
  \\begin{gathered}
    u = 1 \\\\ v = 2
  \\end{gathered}
\\]`}</code></pre>
          <p>
            Nesting a full <code>align</code> inside <code>equation</code> is an error
            (<em>Erroneous nesting of equation structures</em>); <code>aligned</code> is the
            environment designed for that position.
          </p>

          {/* ── alignat ── */}
          <h2>alignat: Alignment Columns With Fixed Spacing</h2>
          <p>
            <code>align</code> decides the space between columns itself. <code>alignat{'{n}'}</code>{' '}
            takes the number of alignment columns and adds no space of its own, so you control
            the gaps. It is ideal for annotating steps and for lining up a system of linear
            equations term by term:
          </p>
          <pre><code>{`\\begin{alignat}{2}
  x &= 2y + 1  &\\qquad& \\text{(by definition)} \\\\
  y &= 3       &      & \\text{(given)}
\\end{alignat}

\\begin{alignat*}{3}
  10x &+ 3y &{}={}& 2 \\\\
   3x &- 6y &{}={}& -1
\\end{alignat*}`}</code></pre>
          <p>
            The <code>{'{}={}'}</code> idiom keeps binary-operator spacing around a symbol that
            sits directly after an <code>&amp;</code>; without the empty groups TeX would treat
            the <code>=</code> as unary and drop the space on one side. <code>alignat{'{n}'}</code>{' '}
            allows at most <code>2n &minus; 1</code> ampersands per line; one more gives{' '}
            <em>Extra &amp; on this line</em>.
          </p>

          {/* ── intertext ── */}
          <h2>Text Between Lines: \intertext and \shortintertext</h2>
          <p>
            To insert a sentence between the lines of an <code>align</code> without losing the
            alignment, use <code>\intertext</code>. The alignment columns continue across the
            text. mathtools&apos; <code>\shortintertext</code> is the same with less vertical
            space around the text:
          </p>
          <pre><code>{`\\usepackage{mathtools}   % loads amsmath; needed for \\shortintertext

\\begin{align}
  a &= b + c \\\\
  \\intertext{and, substituting into the second equation,}
  d &= e \\\\
  \\shortintertext{so}
  f &= g
\\end{align}`}</code></pre>

          {/* ── brackets across lines ── */}
          <h2>Brackets That Span a Line Break</h2>
          <p>
            A <code>\left ... \right</code> pair cannot cross <code>\\</code>; inside{' '}
            <code>align</code> the error is <em>Extra {'}'}, or forgotten \right</em>. The
            cleanest fix is the manual sizes <code>\bigl</code>, <code>\Bigl</code> and so on,
            which need no partner. The alternative is to close the first line with the invisible
            delimiter <code>\right.</code> and reopen with <code>\left.</code>; this works but the
            two halves are sized independently. Sizing is covered in depth in the{' '}
            <Link href="/learn/brackets">brackets guide</Link>.
          </p>
          <pre><code>{`\\begin{align}
  f(x) &= \\Bigl( a + b + c \\\\
       &\\qquad + d + e \\Bigr) \\\\[6pt]
  g(x) &= \\left( \\frac{a}{b} \\right. \\\\
       &\\qquad \\left. + c \\right)
\\end{align}`}</code></pre>
          <p>
            The <code>\\[6pt]</code> on the second line adds 6pt of extra vertical space before
            the next line, a convenient way to separate groups of lines inside one environment.
          </p>

          {/* ── cases ── */}
          <h2>Piecewise Functions: cases</h2>
          <p>
            A definition by cases is a multi-line formula with one number. <code>cases</code>{' '}
            draws the brace and aligns the conditions in a second column; <code>dcases</code>{' '}
            from mathtools is the same in display style, so fractions in the cases are full
            size:
          </p>
          <pre><code>{`\\begin{equation}
  |x| = \\begin{cases}
    x  & \\text{if } x \\ge 0 \\\\
    -x & \\text{if } x < 0
  \\end{cases}
\\end{equation}

\\begin{equation}
  f(n) = \\begin{dcases}
    \\frac{n}{2}    & n \\text{ even} \\\\
    \\frac{3n+1}{2} & n \\text{ odd}
  \\end{dcases}
\\end{equation}`}</code></pre>

          {/* ── page breaks ── */}
          <h2>Page Breaks Inside Displays</h2>
          <p>
            amsmath never breaks a page inside a display by default, so a long{' '}
            <code>align</code> near the bottom of a page is pushed whole onto the next one,
            leaving a gap. <code>\allowdisplaybreaks</code> in the preamble lifts the ban for{' '}
            <code>align</code>, <code>gather</code>, <code>alignat</code> and <code>multline</code>.
            An optional argument from 1 to 4 sets how willing TeX should be. Inside such a
            display, <code>\\*</code> forbids a break after that line and{' '}
            <code>\displaybreak</code> before a <code>\\</code> encourages one. <code>split</code>,{' '}
            <code>aligned</code> and <code>gathered</code> are single boxes and never break:
          </p>
          <pre><code>{`\\allowdisplaybreaks        % preamble

\\begin{align}
  a &= b \\\\*                % no page break after this line
  c &= d \\\\
  e &= f \\displaybreak[0] \\\\  % a break is acceptable here
  g &= h
\\end{align}`}</code></pre>

          {/* ── Numbering and labels ── */}
          <h2>Labels and Custom Tags per Line</h2>
          <p>
            In <code>align</code> and <code>gather</code>, every numbered line can carry its own{' '}
            <code>\label</code>, placed anywhere on the line before the <code>\\</code>. A
            second <code>\label</code> on the same line gives <em>Multiple \label&apos;s: label
            will be lost</em>, and a <code>\label</code> on a <code>\notag</code> line has no
            number to refer to. <code>\tag{'{...}'}</code> replaces the automatic number on one
            line; <code>\tag*</code> drops the parentheses:
          </p>
          <pre><code>{`\\begin{align}
  x &= y \\tag{A} \\label{eq:a} \\\\
  z &= w \\tag*{(star)}
\\end{align}

See \\eqref{eq:a}.`}</code></pre>
          <p>
            For numbering by section, <code>\numberwithin</code>, <code>cleveref</code> and
            subequations, see the <Link href="/learn/equation-numbering">equation numbering guide</Link>.
          </p>

          {/* ── breqn ── */}
          <h2>Automatic Line Breaking: breqn</h2>
          <p>
            The <code>breqn</code> package breaks long equations by itself. Its{' '}
            <code>dmath</code> environment replaces <code>equation</code> and needs no{' '}
            <code>\\</code> at all:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\usepackage{breqn}       % load after amsmath and other math packages

\\begin{dmath}
  f(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + a_4 x^4 + a_5 x^5
       + a_6 x^6 + a_7 x^7 + a_8 x^8 + a_9 x^9 + a_{10} x^{10}
\\end{dmath}`}</code></pre>
          <p>
            It is convenient for drafts and for generated formulas, with caveats. breqn
            re-implements a large part of math typesetting, so it must be loaded last and it
            conflicts with some packages; its line breaks are chosen mechanically and rarely
            match what an author would pick; and most journals do not accept it. For a final
            document, break lines by hand with the environments above.
          </p>

          {/* ── eqnarray ── */}
          <h2>Why Not eqnarray</h2>
          <p>
            Older tutorials use <code>eqnarray</code>, which predates amsmath. It compiles, but
            it has three real defects: the space around the middle column is wider than the
            standard spacing around <code>=</code>, so its equations look different from every
            other formula in the document; a long line overprints the equation number instead
            of moving it; and <code>\nonumber</code> and labels behave inconsistently.{' '}
            <code>align</code> is a drop-in replacement with <code>&amp;=</code> instead of{' '}
            <code>&amp;=&amp;</code>:
          </p>
          <pre><code>{`% old
\\begin{eqnarray}
  a & = & b + c \\\\
  d & = & e
\\end{eqnarray}

% replacement
\\begin{align}
  a &= b + c \\\\
  d &= e
\\end{align}`}</code></pre>

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
                <td><em>Misplaced alignment tab character &amp;</em></td>
                <td><code>&amp;</code> inside <code>equation</code> or <code>\[ ... \]</code>, which have no alignment</td>
                <td>Use <code>align</code>, or wrap the lines in <code>split</code></td>
              </tr>
              <tr>
                <td><em>Extra alignment tab has been changed to \cr</em></td>
                <td><code>&amp;</code> inside <code>gather</code>, or more columns than a table/array declares</td>
                <td>Remove the <code>&amp;</code>, or switch to <code>align</code></td>
              </tr>
              <tr>
                <td><em>Package amsmath Error: Extra &amp; on this line</em></td>
                <td>More than 2n&minus;1 ampersands in <code>alignat{'{n}'}</code></td>
                <td>Increase n or remove the extra <code>&amp;</code></td>
              </tr>
              <tr>
                <td><em>Package amsmath Error: \begin{'{split}'} won&apos;t work here</em></td>
                <td><code>split</code> used outside a display environment</td>
                <td>Wrap it in <code>equation</code>, <code>align</code> or <code>gather</code></td>
              </tr>
              <tr>
                <td><em>Package amsmath Error: Erroneous nesting of equation structures</em></td>
                <td><code>align</code> or <code>gather</code> inside <code>equation</code></td>
                <td>Use <code>aligned</code>, <code>gathered</code> or <code>split</code> inside</td>
              </tr>
              <tr>
                <td><em>LaTeX Error: Environment align undefined</em></td>
                <td>amsmath not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code></td>
              </tr>
              <tr>
                <td><em>Extra {'}'}, or forgotten \right</em> / <em>Missing \right. inserted</em></td>
                <td><code>\left</code> and <code>\right</code> on different lines or across an <code>&amp;</code></td>
                <td>Use <code>\bigl</code>/<code>\bigr</code>, or <code>\right.</code> and <code>\left.</code></td>
              </tr>
              <tr>
                <td>An empty numbered line at the end of the display</td>
                <td><code>\\</code> after the last line</td>
                <td>Delete the trailing <code>\\</code></td>
              </tr>
              <tr>
                <td><em>Package amsmath Error: Multiple \label&apos;s: label will be lost</em></td>
                <td>Two <code>\label</code> commands on one line, or a <code>\label</code> inside <code>split</code> plus one outside</td>
                <td>Keep one label per numbered line</td>
              </tr>
              <tr>
                <td>Equation number printed on a line by itself</td>
                <td>The line is too wide for the number to fit beside it (amsmath moves it rather than overprint)</td>
                <td>Break the line earlier, or accept it</td>
              </tr>
              <tr>
                <td>Lines refuse to break across pages, leaving a gap</td>
                <td>amsmath&apos;s default no-break rule</td>
                <td><code>\allowdisplaybreaks</code> in the preamble</td>
              </tr>
              <tr>
                <td>Uneven spacing around <code>=</code> after an <code>&amp;</code></td>
                <td>The symbol is read as unary because nothing precedes it in the cell</td>
                <td>Write <code>{'&{}={}'}</code>, or put the <code>&amp;</code> before the symbol</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath, mathtools}
\\allowdisplaybreaks

\\begin{document}

\\section{A derivation}
\\begin{align}
  (a + b)^2 &= (a + b)(a + b) \\notag \\\\
            &= a^2 + ab + ba + b^2 \\notag \\\\
            &= a^2 + 2ab + b^2 \\label{eq:binomial}
\\end{align}

\\section{One long equation}
\\begin{equation}
  \\begin{split}
    I &= \\int_0^1 \\Bigl( x^3 + 3x^2 \\\\
      &\\qquad + 3x + 1 \\Bigr) \\, dx = \\frac{15}{4}
  \\end{split}
  \\label{eq:integral}
\\end{equation}

\\begin{multline}
  (x + y + z)^3 = x^3 + y^3 + z^3 + 3x^2 y + 3x^2 z \\\\
  + 3y^2 x + 3y^2 z + 3z^2 x + 3z^2 y + 6xyz
\\end{multline}

\\section{A system and a piecewise function}
\\begin{alignat*}{3}
  2x &+ 3y &{}={}& 7 \\\\
   x &- 4y &{}={}& -2
\\end{alignat*}
\\begin{equation}
  H(x) = \\begin{cases}
    1 & \\text{if } x \\ge 0 \\\\
    0 & \\text{otherwise}
  \\end{cases}
\\end{equation}

\\section{With commentary}
\\begin{align}
  y' &= 2x \\\\
  \\intertext{Integrating both sides gives}
  y  &= x^2 + C.
\\end{align}

Equations \\eqref{eq:binomial} and \\eqref{eq:integral} are referenced here.

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>New line in an equation</td><td><code>\\</code> inside <code>align</code>, <code>split</code>, <code>multline</code> or <code>gather</code></td></tr>
              <tr><td>Align on =</td><td><code>&amp;=</code> on each line of <code>align</code></td></tr>
              <tr><td>No numbers</td><td><code>align*</code>, <code>gather*</code>, <code>multline*</code></td></tr>
              <tr><td>No number on one line</td><td><code>\notag</code> before <code>\\</code></td></tr>
              <tr><td>One number for several lines</td><td><code>{`\\begin{equation}\\begin{split} ... \\end{split}\\end{equation}`}</code></td></tr>
              <tr><td>Long equation, no alignment</td><td><code>multline</code>; <code>\shoveleft</code>, <code>\shoveright</code></td></tr>
              <tr><td>Centred lines</td><td><code>gather</code></td></tr>
              <tr><td>Aligned block inside math</td><td><code>aligned</code>, <code>gathered</code></td></tr>
              <tr><td>Side-by-side columns</td><td><code>align</code> with extra <code>&amp;</code> pairs, or <code>alignat{'{n}'}</code></td></tr>
              <tr><td>Text between lines</td><td><code>\intertext{'{...}'}</code>, <code>\shortintertext{'{...}'}</code> (mathtools)</td></tr>
              <tr><td>Bracket across lines</td><td><code>\Bigl( ... \\ ... \Bigr)</code></td></tr>
              <tr><td>Extra space between lines</td><td><code>\\[6pt]</code></td></tr>
              <tr><td>Allow page breaks</td><td><code>\allowdisplaybreaks</code>; <code>\\*</code> to forbid one</td></tr>
              <tr><td>Piecewise</td><td><code>cases</code>, <code>dcases</code> (mathtools)</td></tr>
              <tr><td>Automatic breaking</td><td><code>dmath</code> from <code>breqn</code></td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I start a new line inside an equation in LaTeX?</h3>
          <p>
            The <code>equation</code> environment is single-line. Use an amsmath environment that
            allows <code>\\</code>: <code>align</code> or <code>align*</code> for several aligned
            equations, <code>split</code> inside <code>equation</code> for one equation with one
            number, or <code>multline</code> for one long equation with no alignment point.
          </p>
          <h3>What is the difference between align and split?</h3>
          <p>
            <code>align</code> is a complete display that numbers every line (suppress a number
            with <code>\notag</code>). <code>split</code> is used inside <code>equation</code>,{' '}
            <code>align</code> or <code>gather</code> and treats its lines as one equation with a
            single number centred on the group. Use <code>align</code> for a sequence of
            equations and <code>split</code> for one derivation that happens to be long.
          </p>
          <h3>How do I break a long equation that has no equals sign to align on?</h3>
          <p>
            Use <code>multline</code>. Its first line is set flush left, its last line flush
            right, and any lines between are centred, with one equation number on the last line.
            Break before an operator (+, &minus;, =) so the next line starts with it.
          </p>
          <h3>Why does align give me &ldquo;Misplaced alignment tab character &amp;&rdquo;?</h3>
          <p>
            That message means an <code>&amp;</code> was found where no alignment is active,
            usually in a plain <code>equation</code> or <code>\[ ... \]</code> environment.
            Switch to <code>align</code>, or wrap the lines in <code>split</code>. Inside{' '}
            <code>gather</code>, which has no alignment points, the same mistake reports
            &ldquo;Extra alignment tab has been changed to \cr&rdquo;.
          </p>
          <h3>Should I use eqnarray?</h3>
          <p>
            No. <code>eqnarray</code> is a pre-amsmath environment with wrong spacing around the{' '}
            <code>=</code> column, no way to stop long lines from overprinting the equation
            number, and inconsistent handling of <code>\nonumber</code>. amsmath&apos;s{' '}
            <code>align</code> does the same job correctly and every modern document should use
            it.
          </p>
          <h3>How do I allow a page break inside a long align?</h3>
          <p>
            amsmath forbids page breaks inside displays by default. Put{' '}
            <code>\allowdisplaybreaks</code> in the preamble to allow them in <code>align</code>,{' '}
            <code>gather</code>, <code>alignat</code> and <code>multline</code>, and use{' '}
            <code>\\*</code> on a specific line to forbid a break after it. <code>aligned</code>,{' '}
            <code>gathered</code> and <code>split</code> are single boxes and never break.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Lines breaking where you want them? These guides cover the rest of display math:</p>
          <ul>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> &ndash; <code>\label</code>, <code>\eqref</code>, numbering by section, subequations and cleveref</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, roots, operators and the amsmath basics</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses</Link> &ndash; Sizing with \left \right and the manual sizes used across line breaks</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> &ndash; pmatrix, bmatrix and arrays inside your equations</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; The operators that make equations long in the first place</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try align, split and multline with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols/operators" target="_blank" rel="noopener noreferrer">Math Operators Reference</Link> &ndash; Sums, products, integrals and other large operators</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX equations" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Break long equations faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor converts a runaway equation into a clean align or split,
              explains amsmath errors in plain language, and compiles your document in seconds.
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
