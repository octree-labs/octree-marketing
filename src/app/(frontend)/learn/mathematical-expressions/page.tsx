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

const breadcrumbs = getLearnBreadcrumbs('Inline and Display Math', 'mathematical-expressions')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'mathematical-expressions',
  title: 'Inline and Display Math in LaTeX: $…$, \\[…\\] and equation',
  seoTitle: 'Inline and Display Math in LaTeX: $…$ and \\[…\\]',
  description: 'LaTeX inline math with $…$ or \\(…\\), display math with \\[…\\] and equation, why $$ is discouraged, math syntax basics, \\text in math and common errors.',
  keywords: 'latex inline, latex in line, latex inline math, inline math latex, latex inline equation, latex maths, latex math syntax, latex display math, latex equation vs equation*, latex displaymath, latex double dollar, latex displaystyle inline, latex text in math, latex math, latex equation, latex math mode, latex fraction, latex square root, latex nth root, latex brackets, latex align, latex equation numbering, latex amsmath, latex cases, piecewise function latex, latex dcases, latex rcases, latex mathstrut, latex displaystyle, how to write equations in latex, latex math errors',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do you write inline math in LaTeX?',
    answer:
      'Put the formula between single dollar signs, $a^2 + b^2 = c^2$, or between \\( and \\), as in \\(a^2 + b^2 = c^2\\). Both keep the math in line with the text at text size. No package is needed.',
  },
  {
    question: 'What is the difference between $...$ and \\[...\\]?',
    answer:
      '$...$ is inline math: the formula sits inside the sentence at a compact size. \\[...\\] is display math: the formula is centred on its own line at full size. Use equation instead of \\[...\\] when the display needs a number.',
  },
  {
    question: 'Should I use $$...$$ in LaTeX?',
    answer:
      'No. $$...$$ is plain TeX syntax. In LaTeX it ignores the fleqn class option and is not understood by amsmath, so \\tag does not work inside it. Use \\[...\\] for an unnumbered display and equation for a numbered one.',
  },
  {
    question: 'What is the difference between equation and equation*?',
    answer:
      'equation prints a number next to the display and accepts a \\label for \\ref and \\eqref. equation* (from amsmath) is the same display without a number, equivalent to \\[...\\]. Both hold a single line; use align for several lines.',
  },
  {
    question: 'How do I write text inside a LaTeX equation?',
    answer:
      'Load amsmath and wrap the words in \\text{...}, as in $f(x) = 0 \\text{ for all } x$. Put spaces inside the braces, because spaces in math mode are ignored. Without \\text the letters are set as italic variables run together.',
  },
  {
    question: 'What does “Missing $ inserted” mean?',
    answer:
      'LaTeX met a math-only command or character (such as ^, _, \\frac or \\alpha) outside math mode, an opening $ was never closed, or a display contains a blank line. Wrap the expression in $...$ or \\[...\\], check that every $ has a partner, and remove blank lines inside displays.',
  },
]

export default async function MathematicalExpressionsPage() {
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
          <h1>Inline and Display Math in LaTeX: $…$, \[…\] and equation</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Inline math (in line with the text):</strong> <code>{`$a^2 + b^2 = c^2$`}</code>{' '}
                or <code>{`\\(a^2 + b^2 = c^2\\)`}</code>.
              </li>
              <li>
                <strong>Display math, unnumbered:</strong> <code>{`\\[ E = mc^2 \\]`}</code>, on its own
                centred line.
              </li>
              <li>
                <strong>Display math, numbered:</strong>{' '}
                <code>{`\\begin{equation} E = mc^2 \\end{equation}`}</code>; <code>equation*</code>{' '}
                (amsmath) for no number.
              </li>
              <li>
                <strong>Do not use</strong> <code>{`$$ ... $$`}</code>: it is plain TeX and breaks{' '}
                <code>fleqn</code>, <code>\tag</code> and amsmath spacing.
              </li>
              <li>
                <strong>Words inside math:</strong> <code>{`\\text{if } x > 0`}</code> (amsmath).
              </li>
              <li>
                <strong>Full-size fraction inline:</strong> <code>{`$\\displaystyle\\frac{1}{2}$`}</code>{' '}
                or <code>{`$\\dfrac{1}{2}$`}</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            LaTeX has two math modes. Inline math sits inside a sentence and is written between{' '}
            <code>$...$</code> or <code>\(...\)</code>; display math stands on its own line and is
            written with <code>\[...\]</code> or, when it needs a number, the <code>equation</code>{' '}
            environment. This guide covers both modes and the basic LaTeX math syntax, then
            fractions, roots, piecewise functions, brackets, aligned equations, numbering, spacing,
            text inside math, and the errors you will meet along the way.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Inline Math in LaTeX</h2>
          <p>
            To put math in line with your text, wrap it in single dollar signs,{' '}
            <code>$...$</code>, or in <code>\(...\)</code>. The formula is set at text size inside
            the paragraph and the line breaks around it like any other word:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

The Pythagorean theorem states that $a^2 + b^2 = c^2$.

% The same thing with \\( ... \\)
The Pythagorean theorem states that \\(a^2 + b^2 = c^2\\).

Let $f(x) = x^2$ and $n \\geq 1$; then $f(n) \\geq n$.

\\end{document}`}</code></pre>
          <p>
            The two forms produce identical output. <code>\(...\)</code> has one practical
            advantage: the opening and closing commands differ, so a forgotten <code>\)</code> is
            caught at the next <code>\(</code> with <em>Bad math environment delimiter</em>. A
            forgotten <code>$</code> silently pairs with the next <code>$</code>, and the error
            shows up lines later. Most people still type <code>$</code> because it is shorter;
            either is correct.
          </p>
          <p>
            Inline math is set in <em>text style</em>: fractions shrink, and limits on sums and
            integrals move to the side so the formula fits the line height. That is why{' '}
            <code>{`$\\frac{1}{2}$`}</code> and <code>{`$\\sum_{i=1}^n i$`}</code> look smaller in a
            sentence than in a display.
          </p>

          <h3>\displaystyle inline</h3>
          <p>
            To force full-size pieces inside a sentence, start the formula with{' '}
            <code>\displaystyle</code>, or use <code>\dfrac</code> for a single fraction. The
            reverse, <code>\textstyle</code> and <code>\tfrac</code>, shrinks pieces inside a
            display:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}   % for \\dfrac and \\tfrac
\\begin{document}

The series $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ converges.

The ratio $\\dfrac{a}{b}$ is large; the exponent $2^{\\tfrac{n}{2}}$ is small.

\\[
  \\textstyle\\frac{1}{2} \\qquad \\textstyle\\sum_{i=1}^{n} \\qquad \\textstyle\\int_0^1
\\]

\\end{document}`}</code></pre>
          <p>
            Use <code>\displaystyle</code> inline sparingly: it makes the line taller and pushes
            the lines around it apart. If an inline formula needs display style, it usually wants
            to be a display.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Display Math in LaTeX: \[...\], equation and displaymath</h2>
          <p>
            Display math puts the formula on its own line, centred, with space above and below.
            Fractions, sums and integrals are set at full size. There are four ways to write it:
          </p>

          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Syntax</th>
                <th>Numbered</th>
                <th>Needs</th>
                <th>Use it for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>{`\\[ ... \\]`}</code></td><td>No</td><td>nothing</td><td>Most unnumbered displays</td></tr>
              <tr><td><code>{`\\begin{displaymath} ... \\end{displaymath}`}</code></td><td>No</td><td>nothing</td><td>Same as <code>\[...\]</code>, long form</td></tr>
              <tr><td><code>{`\\begin{equation} ... \\end{equation}`}</code></td><td>Yes</td><td>nothing</td><td>Equations you will refer back to</td></tr>
              <tr><td><code>{`\\begin{equation*} ... \\end{equation*}`}</code></td><td>No</td><td><code>amsmath</code></td><td>An unnumbered <code>equation</code>, e.g. while drafting</td></tr>
              <tr><td><code>{`$$ ... $$`}</code></td><td>No</td><td>nothing</td><td>Nothing: plain TeX, avoid in LaTeX</td></tr>
            </tbody>
          </table>
          </div>

          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

An unnumbered display:
\\[
  E = mc^2
\\]
and the same with the long form:
\\begin{displaymath}
  E = mc^2
\\end{displaymath}

A numbered display:
\\begin{equation}
  E = mc^2 \\label{eq:energy}
\\end{equation}
As \\eqref{eq:energy} shows, mass and energy are equivalent.

\\begin{equation*}
  E = mc^2   % no number, amsmath
\\end{equation*}

\\end{document}`}</code></pre>
          <p>
            Do not leave a blank line before or inside a display. A display belongs to the
            paragraph around it, so a blank line before <code>\[</code> adds an unwanted paragraph
            break and extra space, and a blank line inside it stops the compile with{' '}
            <em>Missing $ inserted</em>.
          </p>

          <h3>equation vs equation*</h3>
          <p>
            <code>equation</code> numbers the display, (1), (2) and so on, and lets you attach a{' '}
            <code>\label</code> for <code>\ref</code> or <code>\eqref</code>.{' '}
            <code>equation*</code> is the same environment without the number; it comes from
            amsmath and gives the same result as <code>\[...\]</code>. Switching between the two is
            a one-character change, which makes <code>equation*</code> handy for equations whose
            number you may need later. Both hold exactly one line; for several lines use{' '}
            <code>align</code> or <code>split</code> (see{' '}
            <Link href="/learn/multiline-equations">multiline equations</Link>).
          </p>

          <h3>Why $$...$$ is discouraged</h3>
          <p>
            You will see <code>$$...$$</code> in older documents and on the web, and it does
            compile. It is plain TeX syntax, though, and in LaTeX it misbehaves in three ways: it
            ignores the <code>fleqn</code> class option, so that display stays centred while every{' '}
            <code>\[...\]</code> moves to the left margin; amsmath does not know about it, so{' '}
            <code>\tag</code> stops with <em>\tag not allowed here</em> and the spacing above the
            display can come out wrong; and it is unchecked, so a stray <code>$$</code> goes
            unnoticed where <code>\[</code> would report an error. Use <code>\[...\]</code>; it is
            the same number of keystrokes.
          </p>
          <pre><code>{`% Avoid
$$ E = mc^2 $$

% Prefer
\\[ E = mc^2 \\]`}</code></pre>

          <h3>When to use each</h3>
          <ul>
            <li><strong>Inline math</strong>: short expressions in running text, such as &ldquo;where <code>$n$</code> is a positive integer&rdquo;.</li>
            <li><strong>Display math</strong>: important equations, long formulas, or anything the reader should study.</li>
            <li><strong>Numbered display</strong> (<code>equation</code>, <code>align</code>): anything you will refer back to.</li>
          </ul>

          {/* ------------------------------------------------------------------ */}
          <h2>LaTeX Math Syntax Basics</h2>
          <p>
            Inside either math mode the same rules apply. These cover most of what you type in
            LaTeX maths:
          </p>
          <ul>
            <li><strong>Superscripts and subscripts:</strong> <code>x^2</code>, <code>a_i</code>. Braces group more than one character: <code>{`x^{10}`}</code>, <code>{`a_{ij}`}</code>.</li>
            <li><strong>Commands start with a backslash:</strong> <code>\alpha</code>, <code>\infty</code>, <code>\leq</code>, <code>\sin</code>. Arguments go in braces: <code>{`\\frac{a}{b}`}</code>, <code>{`\\sqrt{x}`}</code>.</li>
            <li><strong>Spaces are ignored:</strong> <code>$a+b$</code> and <code>$a + b$</code> are identical. LaTeX spaces operators and relations itself; use <code>\,</code> or <code>\quad</code> to add space.</li>
            <li><strong>Letters are variables:</strong> each letter is set in italic as a separate symbol, so words need <code>\text</code> and function names need <code>\sin</code>, <code>\log</code> or <code>\operatorname</code>.</li>
            <li><strong>Reserved characters:</strong> <code>{`{ }`}</code> group, <code>&amp;</code> aligns, <code>%</code> starts a comment. Write <code>{`\\{ \\}`}</code>, <code>\&amp;</code>, <code>\%</code> to print them.</li>
          </ul>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

Scripts: $x^2$, $x^{10}$, $a_{ij}$, $e^{-x^2}$, $x_1^2$.

Commands: $\\alpha + \\beta \\leq \\infty$, $\\sin x$, $\\frac{a}{b}$, $\\sqrt{2}$.

Spacing is automatic: $a+b=c$ and $a + b = c$ look the same.

Text in math: $f(x) = 0 \\text{ for all } x$.

Literal characters: $\\{1, 2, 3\\}$, $50\\%$.

\\end{document}`}</code></pre>

          <h3>Text inside math: \text&#123;&#125;</h3>
          <p>
            Typed words inside <code>$...$</code> come out as italic variables run together
            (<em>forall</em> instead of &ldquo;for all&rdquo;). Wrap them in <code>\text</code>{' '}
            from amsmath, which uses the surrounding text font and scales correctly in sub- and
            superscripts. Put the spaces inside the braces, because spaces in math are ignored:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\[
  f(x) = x^2 \\quad \\text{for all } x \\geq 0
\\]

% \\text inside a subscript scales down with it
\\[
  v_{\\text{max}} = 3 \\text{ m/s}
\\]

% Math inside \\text goes back in $...$
\\[
  g(n) = 1 \\quad \\text{if $n$ is prime}
\\]

\\end{document}`}</code></pre>
          <p>
            <code>\mathrm</code> and <code>\mbox</code> are alternatives, covered under Text
            Inside Math further down.
          </p>

          <h3>Keeping heights consistent with \mathstrut</h3>
          <p>
            Radicals, fractions and brackets size themselves to their content, so{' '}
            <code>\sqrt&#123;a&#125;</code> and <code>\sqrt&#123;y&#125;</code> come out with
            roots of different heights. <code>\mathstrut</code> is an invisible box as tall as a
            parenthesis; putting it inside each root makes them match:
          </p>
          <pre><code>{`\\[
  \\sqrt{a} + \\sqrt{b} + \\sqrt{y}                          % uneven
  \\qquad
  \\sqrt{\\mathstrut a} + \\sqrt{\\mathstrut b} + \\sqrt{\\mathstrut y}   % even
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Fractions</h2>
          <p>
            Fractions are one of the most common constructs in mathematical writing. LaTeX
            provides several commands depending on how you want them displayed.
          </p>

          <h3><code>\frac&#123;&#125;&#123;&#125;</code> – Standard Fraction</h3>
          <p>
            The basic <code>\frac</code> command adapts its size to the current mode: full-size
            in display math, compact in inline math.
          </p>
          <pre><code>{`% Display mode – full size
\\[
  \\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}
\\]

% Inline mode – compact
The probability is $\\frac{1}{6}$ for each face.`}</code></pre>

          <h3><code>\dfrac&#123;&#125;&#123;&#125;</code> – Display-Style Fraction</h3>
          <p>
            Forces a full-size (display-style) fraction even in inline mode. Requires the
            <code>amsmath</code> package.
          </p>
          <pre><code>{`% Force display-size fraction inside inline text
The answer is $\\dfrac{n!}{k!(n-k)!}$.`}</code></pre>

          <h3><code>\tfrac&#123;&#125;&#123;&#125;</code> – Text-Style Fraction</h3>
          <p>
            Forces a compact (text-style) fraction even in display mode. Useful inside
            exponents or subscripts.
          </p>
          <pre><code>{`\\[
  2^{\\tfrac{n}{2}} \\quad \\text{instead of} \\quad 2^{\\frac{n}{2}}
\\]`}</code></pre>

          <h3><code>\cfrac</code> – Continued Fractions</h3>
          <p>
            Designed specifically for continued fractions, keeping each level properly sized.
          </p>
          <pre><code>{`\\[
  \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\cfrac{1}{\\ddots}}}}
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Square Roots, Nth Roots and Radicals</h2>
          <p>
            The <code>\sqrt</code> command produces a square root symbol that automatically
            stretches to fit its argument.
          </p>

          <h3>Basic Square Root</h3>
          <pre><code>{`\\[
  \\sqrt{a^2 + b^2} \\qquad \\sqrt{\\frac{a}{b}} \\qquad \\sqrt{2} \\approx 1.414
\\]`}</code></pre>

          <h3>Nth Root</h3>
          <p>
            Pass an optional argument in square brackets for an arbitrary root index. The
            radical and its index are equivalent to a fractional power, which is often clearer
            in running text.
          </p>
          <pre><code>{`\\[
  \\sqrt[3]{27} = 3
  \\qquad
  \\sqrt[n]{x} = x^{1/n}
  \\qquad
  \\sqrt[4]{x^3}
  \\qquad
  \\sqrt[n]{a^n} = |a|
\\]`}</code></pre>

          <h3>Positioning the index: \leftroot and \uproot</h3>
          <p>
            A tall or wide index such as <code>n</code> or <code>\beta</code> can sit too low and
            too far from the radical. amsmath provides <code>\leftroot</code> and{' '}
            <code>\uproot</code> to nudge it; the arguments are in small units, negative{' '}
            <code>\leftroot</code> moves the index right (closer to the radical) and positive{' '}
            <code>\uproot</code> moves it up:
          </p>
          <pre><code>{`\\usepackage{amsmath}

\\[
  \\sqrt[n]{x}
  \\qquad
  \\sqrt[\\leftroot{-2}\\uproot{2}n]{x}        % index tucked in and raised
  \\qquad
  \\sqrt[\\leftroot{-3}\\uproot{3}\\beta]{k}
  \\qquad
  \\sqrt[\\uproot{3}n]{x}                      % raise only
\\]`}</code></pre>

          <h3>Nested Roots</h3>
          <p>
            LaTeX handles nested roots gracefully; each inner root is drawn at the size of its
            content. For deeply nested expressions you may want to add a small space with{' '}
            <code>\,</code> for readability, and <code>\smash[b]</code> keeps a root with a
            descender (such as <em>y</em>) from being taller than its neighbours.
          </p>
          <pre><code>{`\\[
  \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + x}}}}
  \\qquad
  \\sqrt{2 + \\sqrt{3}}
  \\qquad
  \\sqrt{x}\\,\\sqrt{y}
  \\qquad
  \\sqrt{\\smash[b]{y}}
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Parentheses and Brackets</h2>
          <p>
            Delimiters (parentheses, brackets, braces) are essential for grouping sub-expressions.
            LaTeX can automatically scale them to fit or you can control sizing manually. The{' '}
            <Link href="/learn/brackets">brackets guide</Link> covers every delimiter in
            detail; here are the essentials.
          </p>

          <h3>Basic Delimiters</h3>
          <pre><code>{`\\[
  (a + b) \\quad [a + b] \\quad \\{a + b\\}
  \\quad \\langle a + b \\rangle
  \\quad |a + b| \\quad \\|a + b\\|
\\]`}</code></pre>

          <h3>Auto-Sizing with <code>\left</code> and <code>\right</code></h3>
          <p>
            Wrap your delimiters with <code>\left</code> and <code>\right</code> to scale
            them automatically to the height of the enclosed content.
          </p>
          <pre><code>{`\\[
  \\left( \\frac{a}{b} \\right)
  \\qquad
  \\left[ \\sum_{i=1}^{n} x_i \\right]
  \\qquad
  \\left\\{ \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4} \\right\\}
\\]`}</code></pre>
          <p>
            If you need only one side, use <code>\left.</code> or <code>\right.</code> for
            an invisible delimiter:
          </p>
          <pre><code>{`\\[
  \\left. \\frac{d f}{d x} \\right|_{x=0}
\\]`}</code></pre>

          <h3>Manual Sizing</h3>
          <p>
            Sometimes <code>\left</code>/<code>\right</code> don&apos;t produce the size you
            want. Use the manual sizing commands for precise control:
          </p>
          <pre><code>{`\\[
  \\big( \\Big( \\bigg( \\Bigg(
  \\quad
  \\big] \\Big] \\bigg] \\Bigg]
  \\quad
  \\big\\{ \\Big\\{ \\bigg\\{ \\Bigg\\{
\\]`}</code></pre>
          <p>
            This is especially helpful inside multi-line equations where auto-sizing cannot
            span across line breaks.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Aligned Equations</h2>
          <p>
            When you have multiple lines of equations that should line up at a particular
            point (usually the equals sign), use alignment environments from the
            <code>amsmath</code> package. The{' '}
            <Link href="/learn/multiline-equations">multiline equations guide</Link> goes
            through every case.
          </p>

          <h3>The <code>align</code> Environment</h3>
          <p>
            The workhorse for multi-line equations. Use <code>&amp;</code> to mark the
            alignment point and <code>\\</code> to break lines.
          </p>
          <pre><code>{`\\begin{align}
  f(x) &= x^2 + 2x + 1 \\\\
       &= (x + 1)^2
\\end{align}`}</code></pre>
          <p>
            Each line is numbered by default. Use <code>align*</code> to suppress all numbers,
            or <code>\nonumber</code> on individual lines.
          </p>
          <pre><code>{`\\begin{align}
  a &= b + c \\nonumber \\\\
  d &= e + f \\label{eq:important}
\\end{align}`}</code></pre>

          <h3>The <code>split</code> Environment</h3>
          <p>
            Use <code>split</code> inside an <code>equation</code> environment when you want
            a single equation number for multiple lines.
          </p>
          <pre><code>{`\\begin{equation}
  \\begin{split}
    (a + b)^3 &= (a + b)(a + b)^2 \\\\
              &= (a + b)(a^2 + 2ab + b^2) \\\\
              &= a^3 + 3a^2b + 3ab^2 + b^3
  \\end{split}
\\end{equation}`}</code></pre>

          <h3>The <code>multline</code> Environment</h3>
          <p>
            For a single long equation that must be broken across lines. The first line is
            left-aligned, the last is right-aligned, and middle lines are centred.
          </p>
          <pre><code>{`\\begin{multline}
  p(x) = x^8 + x^7 + x^6 + x^5 \\\\
       + x^4 + x^3 + x^2 + x + 1
\\end{multline}`}</code></pre>

          <h3>The <code>gather</code> Environment</h3>
          <p>
            Centres every line independently with no alignment point. Useful for listing
            several separate equations together.
          </p>
          <pre><code>{`\\begin{gather}
  x + y = 4 \\\\
  x - y = 2
\\end{gather}`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Equation Numbering</h2>
          <p>
            Numbered equations are essential for academic papers so you can reference
            results later. LaTeX makes this effortless.
          </p>

          <h3>The <code>equation</code> Environment</h3>
          <p>
            Produces a single numbered display equation.
          </p>
          <pre><code>{`\\begin{equation}
  E = mc^2
  \\label{eq:einstein}
\\end{equation}

As shown in Equation~\\ref{eq:einstein}, energy and mass are equivalent.`}</code></pre>

          <h3><code>\label</code> and <code>\ref</code></h3>
          <p>
            Assign a label to any numbered equation with <code>\label&#123;eq:name&#125;</code>
            and reference it anywhere in your document with <code>\ref&#123;eq:name&#125;</code>
            or <code>\eqref&#123;eq:name&#125;</code> (the latter adds parentheses automatically
            and requires <code>amsmath</code>).
          </p>
          <pre><code>{`From \\eqref{eq:einstein} we can derive...`}</code></pre>

          <h3>Custom Tags with <code>\tag&#123;&#125;</code></h3>
          <p>
            Override the automatic number with a custom label.
          </p>
          <pre><code>{`\\begin{equation}
  a^2 + b^2 = c^2 \\tag{Pythagoras}
\\end{equation}`}</code></pre>

          <h3>Unnumbered Equations</h3>
          <p>
            Add a <code>*</code> to suppress numbering: <code>equation*</code>,
            <code>align*</code>, <code>gather*</code>, etc.
          </p>
          <pre><code>{`\\begin{equation*}
  \\sum_{k=0}^{\\infty} x^k = \\frac{1}{1-x}, \\quad |x| < 1
\\end{equation*}`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Piecewise Functions with cases</h2>
          <p>
            The <code>cases</code> environment (from <code>amsmath</code>) is the standard
            way to write piecewise-defined functions. It draws a single left brace that grows
            with the number of cases; inside it, <code>&amp;</code> separates each value from its
            condition and <code>\\</code> starts the next case.
          </p>
          <pre><code>{`\\[
  f(x) =
  \\begin{cases}
    x^2       & \\text{if } x \\geq 0 \\\\
    -x^2      & \\text{if } x < 0
  \\end{cases}
\\]`}</code></pre>
          <p>
            The condition is ordinary text, so wrap words in <code>\text</code> and keep the
            trailing space inside the braces (<code>\text&#123;if &#125;</code>), otherwise
            &ldquo;if&rdquo; runs into the variable. You can have as many cases as you need, and
            commas or full stops after the values are fine:
          </p>
          <pre><code>{`\\[
  |x| =
  \\begin{cases}
    x,  & \\text{for } x \\geq 0, \\\\
    -x, & \\text{for } x < 0.
  \\end{cases}
\\]

% Sign function
\\[
  \\operatorname{sgn}(x) =
  \\begin{cases}
    1   & \\text{if } x > 0 \\\\
    0   & \\text{if } x = 0 \\\\
    -1  & \\text{if } x < 0
  \\end{cases}
\\]

% Text conditions with math inside them
\\[
  f(n) =
  \\begin{cases}
    n/2    & \\text{if $n$ is even} \\\\
    3n + 1 & \\text{if $n$ is odd}
  \\end{cases}
  \\qquad
  \\chi(x) =
  \\begin{cases}
    1, & x \\in \\mathbb{Q} \\\\
    0, & \\text{otherwise}
  \\end{cases}
\\]

% Extra space before the conditions with \\quad
\\[
  f(x) =
  \\begin{cases}
    x^2  & \\quad \\text{if } x \\geq 0 \\\\
    -x^2 & \\quad \\text{if } x < 0
  \\end{cases}
\\]

% A numbered piecewise definition
\\begin{equation}
  \\delta_{ij} =
  \\begin{cases}
    1 & i = j \\\\
    0 & i \\neq j
  \\end{cases}
  \\label{eq:kronecker}
\\end{equation}`}</code></pre>

          <h3>Fractions in cases: dcases from mathtools</h3>
          <p>
            The contents of <code>cases</code> are set in text style, so a fraction inside it
            comes out small. The <code>mathtools</code> package provides <code>dcases</code>,
            which sets each case in display style, and <code>cases*</code> /{' '}
            <code>dcases*</code>, whose second column is plain text so you can drop the{' '}
            <code>\text</code>:
          </p>
          <pre><code>{`\\usepackage{mathtools}

\\[
  f(x) =
  \\begin{cases}
    \\frac{1}{x} & x \\neq 0 \\\\
    0           & x = 0
  \\end{cases}
  \\qquad
  f(x) =
  \\begin{dcases}
    \\frac{1}{x} & x \\neq 0 \\\\
    0           & x = 0
  \\end{dcases}
\\]

% Second column is text mode: no \\text needed, math goes back in $...$
\\[
  g(x) =
  \\begin{dcases*}
    \\frac{1}{x} & if $x \\neq 0$ \\\\
    0           & otherwise
  \\end{dcases*}
\\]

% Without mathtools: \\dfrac and a little extra row space
\\[
  f(x) =
  \\begin{cases}
    \\dfrac{1}{x} & x \\neq 0 \\\\[4pt]
    0            & x = 0
  \\end{cases}
\\]`}</code></pre>

          <h3>Right brace: rcases</h3>
          <p>
            For a brace on the right-hand side, use <code>rcases</code> (and{' '}
            <code>drcases</code>, <code>rcases*</code>), also from <code>mathtools</code>:
          </p>
          <pre><code>{`\\usepackage{mathtools}

\\[
  \\begin{rcases}
    x > 0 \\\\
    y > 0
  \\end{rcases}
  \\Rightarrow x + y > 0
\\]`}</code></pre>
          <p>
            If you cannot load mathtools, the old-fashioned way is an <code>array</code> with an
            invisible right delimiter: <code>{`\\left\\{ \\begin{array}{ll} x^2 & x \\ge 0 \\\\ -x^2 & x < 0 \\end{array} \\right.`}</code>.
            The <code>cases</code> environment is cleaner and spaces the columns properly.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Matrices</h2>
          <p>
            LaTeX provides several matrix environments through the <code>amsmath</code> package.
            Here is a brief overview; for a deep dive see our dedicated{' '}
            <Link href="/learn/matrices">Matrices in LaTeX</Link> guide.
          </p>

          <h3>Parenthesised Matrix (<code>pmatrix</code>)</h3>
          <pre><code>{`\\[
  \\begin{pmatrix}
    1 & 2 \\\\
    3 & 4
  \\end{pmatrix}
\\]`}</code></pre>

          <h3>Bracketed Matrix (<code>bmatrix</code>)</h3>
          <pre><code>{`\\[
  \\begin{bmatrix}
    a & b \\\\
    c & d
  \\end{bmatrix}
\\]`}</code></pre>
          <p>
            Other variants include <code>Bmatrix</code> (curly braces),
            <code>vmatrix</code> (vertical bars for determinants), and
            <code>Vmatrix</code> (double vertical bars for norms).
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Spacing in Math Mode</h2>
          <p>
            LaTeX handles most mathematical spacing automatically, but sometimes you need
            manual adjustments. Here are the spacing commands available in math mode, from
            thinnest to widest:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Width</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\!</code></td>
                <td>-3/18 em</td>
                <td>Negative thin space (pulls elements closer)</td>
              </tr>
              <tr>
                <td><code>\,</code></td>
                <td>3/18 em</td>
                <td>Thin space</td>
              </tr>
              <tr>
                <td><code>\:</code></td>
                <td>4/18 em</td>
                <td>Medium space</td>
              </tr>
              <tr>
                <td><code>\;</code></td>
                <td>5/18 em</td>
                <td>Thick space</td>
              </tr>
              <tr>
                <td><code>\quad</code></td>
                <td>1 em</td>
                <td>Quad space</td>
              </tr>
              <tr>
                <td><code>\qquad</code></td>
                <td>2 em</td>
                <td>Double quad space</td>
              </tr>
            </tbody>
          </table>
          </div>

          <pre><code>{`\\[
  \\int_0^1 f(x) \\, dx            % thin space before dx
  \\qquad
  \\sqrt{2} \\, x                   % thin space after root
  \\qquad
  \\iint\\limits_D f(x,y) \\, dA    % double integral
\\]`}</code></pre>
          <p>
            The negative thin space <code>\!</code> is handy for tightening things like
            double integrals:
          </p>
          <pre><code>{`\\[
  \\int \\!\\!\\! \\int_D f \\, dA
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Text Inside Math</h2>
          <p>
            Sometimes you need to include words or phrases within a mathematical expression.
            LaTeX provides several commands for this purpose.
          </p>

          <h3><code>\text&#123;&#125;</code> (recommended)</h3>
          <p>
            From the <code>amsmath</code> package, <code>\text</code> renders its argument in
            the surrounding text font and respects the current size. This is the preferred
            approach.
          </p>
          <pre><code>{`\\[
  f(x) = x^2 \\quad \\text{for all } x \\in \\mathbb{R}
\\]`}</code></pre>

          <h3><code>\mathrm&#123;&#125;</code></h3>
          <p>
            Produces upright (Roman) text but stays in math mode. Useful for multi-letter
            operator names or unit labels.
          </p>
          <pre><code>{`\\[
  \\mathrm{pH} = -\\log[\\mathrm{H}^+]
\\]`}</code></pre>

          <h3><code>\mbox&#123;&#125;</code></h3>
          <p>
            An older TeX command that puts text in an unbreakable horizontal box.
            <code>\text</code> is generally preferred in modern documents, but
            <code>\mbox</code> works without loading <code>amsmath</code>.
          </p>
          <pre><code>{`\\[
  x = y \\mbox{ if and only if } y = x
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Common Math Constructs</h2>
          <p>
            Here is a quick-reference table of frequently used LaTeX math commands:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\frac&#123;a&#125;&#123;b&#125;</code></td>
                <td>Fraction a/b</td>
              </tr>
              <tr>
                <td><code>\sqrt&#123;x&#125;</code></td>
                <td>Square root of x</td>
              </tr>
              <tr>
                <td><code>\sqrt[n]&#123;x&#125;</code></td>
                <td>Nth root of x</td>
              </tr>
              <tr>
                <td><code>x^&#123;n&#125;</code></td>
                <td>Superscript (exponent)</td>
              </tr>
              <tr>
                <td><code>x_&#123;i&#125;</code></td>
                <td>Subscript</td>
              </tr>
              <tr>
                <td><code>\sum_&#123;i=1&#125;^&#123;n&#125;</code></td>
                <td>Summation</td>
              </tr>
              <tr>
                <td><code>\int_&#123;a&#125;^&#123;b&#125;</code></td>
                <td>Definite integral</td>
              </tr>
              <tr>
                <td><code>\lim_&#123;x \to 0&#125;</code></td>
                <td>Limit</td>
              </tr>
              <tr>
                <td><code>\begin&#123;cases&#125;</code></td>
                <td>Piecewise function</td>
              </tr>
              <tr>
                <td><code>\infty</code></td>
                <td>Infinity symbol</td>
              </tr>
              <tr>
                <td><code>\partial</code></td>
                <td>Partial derivative symbol</td>
              </tr>
              <tr>
                <td><code>\nabla</code></td>
                <td>Nabla (gradient) operator</td>
              </tr>
              <tr>
                <td><code>\cdot</code></td>
                <td>Centred dot (multiplication)</td>
              </tr>
              <tr>
                <td><code>\times</code></td>
                <td>Cross product</td>
              </tr>
              <tr>
                <td><code>\leq</code>, <code>\geq</code></td>
                <td>Less/greater than or equal</td>
              </tr>
              <tr>
                <td><code>\neq</code></td>
                <td>Not equal</td>
              </tr>
              <tr>
                <td><code>\approx</code></td>
                <td>Approximately equal</td>
              </tr>
              <tr>
                <td><code>\equiv</code></td>
                <td>Identical / congruent</td>
              </tr>
              <tr>
                <td><code>\in</code>, <code>\notin</code></td>
                <td>Element of / not element of</td>
              </tr>
              <tr>
                <td><code>\subset</code>, <code>\supset</code></td>
                <td>Subset / superset</td>
              </tr>
              <tr>
                <td><code>\cup</code>, <code>\cap</code></td>
                <td>Union / intersection</td>
              </tr>
              <tr>
                <td><code>\mathbb&#123;R&#125;</code></td>
                <td>Blackboard bold (e.g. real numbers)</td>
              </tr>
              <tr>
                <td><code>\overline&#123;x&#125;</code></td>
                <td>Overline (mean, conjugate)</td>
              </tr>
              <tr>
                <td><code>\hat&#123;x&#125;</code></td>
                <td>Hat accent (estimator)</td>
              </tr>
              <tr>
                <td><code>\vec&#123;v&#125;</code></td>
                <td>Vector arrow</td>
              </tr>
              <tr>
                <td><code>\dot&#123;x&#125;</code>, <code>\ddot&#123;x&#125;</code></td>
                <td>Time derivatives (Newton notation)</td>
              </tr>
            </tbody>
          </table>
          </div>

          {/* ------------------------------------------------------------------ */}
          <h2>The amsmath Package</h2>
          <p>
            The <code>amsmath</code> package, developed by the American Mathematical Society, is
            the single most important package for mathematical typesetting in LaTeX. If you write
            any non-trivial mathematics, you should include it in every document.
          </p>
          <pre><code>{`\\usepackage{amsmath}`}</code></pre>
          <p>Here is what <code>amsmath</code> provides:</p>
          <ul>
            <li><strong>Alignment environments</strong> – <code>align</code>, <code>gather</code>, <code>multline</code>, <code>split</code>, <code>flalign</code>, <code>alignat</code></li>
            <li><strong>Matrix environments</strong> – <code>pmatrix</code>, <code>bmatrix</code>, <code>vmatrix</code>, <code>Bmatrix</code>, <code>Vmatrix</code></li>
            <li><strong>The <code>cases</code> environment</strong> – for piecewise-defined functions</li>
            <li><strong>Display-style fractions</strong> – <code>\dfrac</code>, <code>\tfrac</code>, <code>\cfrac</code></li>
            <li><strong><code>\text&#123;&#125;</code> command</strong> – for inserting text inside math mode</li>
            <li><strong><code>\eqref&#123;&#125;</code></strong> – for referencing equations with automatic parentheses</li>
            <li><strong><code>\operatorname&#123;&#125;</code></strong> – for defining custom operator names (e.g. <code>\operatorname&#123;argmax&#125;</code>)</li>
            <li><strong><code>\tag&#123;&#125;</code></strong> – for custom equation labels</li>
            <li><strong>Root positioning</strong> – <code>\leftroot</code> and <code>\uproot</code></li>
            <li><strong>Improved spacing</strong> – better default spacing around operators and relations</li>
          </ul>
          <p>
            You can also load the companion packages <code>amssymb</code> (extra symbols like
            <code>\mathbb</code>, <code>\mathfrak</code>), <code>amsthm</code> (theorem
            environments) and <code>mathtools</code>, which extends amsmath with{' '}
            <code>dcases</code>, <code>rcases</code>, <code>psmallmatrix</code> and many fixes:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}
\\usepackage{mathtools}   % loads amsmath itself`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Common Errors</h2>
          <p>
            Most math errors come from a <code>$</code> that is missing, extra or in the wrong
            place. The message, the cause and the fix:
          </p>
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
                <td><em>Missing $ inserted</em></td>
                <td>A math command (<code>\frac</code>, <code>^</code>, <code>_</code>, <code>\alpha</code>) in text, or an unclosed <code>$</code></td>
                <td>Wrap in <code>$...$</code> or <code>\[...\]</code>; check every <code>$</code> has a partner</td>
              </tr>
              <tr>
                <td><em>Display math should end with $$</em></td>
                <td>A single <code>$</code> inside a display opened with <code>\[</code> or <code>$$</code>, often a stray <code>$</code> pasted into an equation</td>
                <td>Remove the inner <code>$</code>; close <code>\[</code> with <code>\]</code> and <code>$$</code> with <code>$$</code> (better: switch to <code>\[...\]</code>)</td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em> inside <code>equation</code> or <code>\[...\]</code></td>
                <td>A blank line inside the display ends the paragraph, and math cannot span paragraphs</td>
                <td>Delete the blank line, or put a <code>%</code> on it to keep the source readable</td>
              </tr>
              <tr>
                <td><em>\tag not allowed here</em></td>
                <td><code>\tag</code> inside <code>$$...$$</code></td>
                <td>Use <code>equation</code> or <code>\[...\]</code></td>
              </tr>
              <tr>
                <td><em>Bad math environment delimiter</em></td>
                <td><code>\]</code> without <code>\[</code>, or <code>\[</code> inside <code>$...$</code></td>
                <td>Match the delimiters; do not nest display math in inline math</td>
              </tr>
              <tr>
                <td><em>Environment cases undefined</em> / <em>dcases undefined</em></td>
                <td>amsmath (for cases) or mathtools (for dcases, rcases) not loaded</td>
                <td>Add the package to the preamble</td>
              </tr>
              <tr>
                <td><em>Missing \right. inserted</em> / <em>Extra \right</em></td>
                <td>Unbalanced <code>\left</code> and <code>\right</code>, or a line break between them in align</td>
                <td>Pair them on the same line; use <code>\right.</code> for an invisible partner, or <code>\bigl</code>/<code>\bigr</code></td>
              </tr>
              <tr>
                <td><em>Double superscript</em> / <em>Double subscript</em></td>
                <td><code>x^a^b</code> or <code>x_i_j</code></td>
                <td>Group: <code>{`x^{ab}`}</code>, <code>{`x_{ij}`}</code></td>
              </tr>
              <tr>
                <td><em>Missing &#123; inserted</em></td>
                <td>Nothing valid after <code>^</code>, <code>_</code> or <code>\frac</code>; often a missing argument</td>
                <td>Supply both arguments of <code>\frac</code>, brace the script</td>
              </tr>
              <tr>
                <td><em>Extra alignment tab has been changed to \cr</em></td>
                <td>Too many <code>&amp;</code> in an <code>align</code> or <code>cases</code> row</td>
                <td>One <code>&amp;</code> per alignment point; use <code>alignat</code> or <code>aligned</code> for more columns</td>
              </tr>
              <tr>
                <td><em>Misplaced alignment tab character &amp;</em></td>
                <td><code>&amp;</code> outside align/cases/matrix, e.g. in <code>equation</code></td>
                <td>Switch to <code>align</code> or <code>split</code>, or write <code>\&amp;</code> for a literal ampersand</td>
              </tr>
              <tr>
                <td><em>Package amsmath Error: \begin&#123;split&#125; won&apos;t work here</em></td>
                <td><code>split</code> used outside a display environment</td>
                <td>Put it inside <code>equation</code> or <code>align</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \text</em> / <em>\dfrac</em> / <em>\eqref</em></td>
                <td>amsmath not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code></td>
              </tr>
              <tr>
                <td>Words in math come out as italic letters run together</td>
                <td>Plain text typed inside <code>$...$</code></td>
                <td>Wrap it in <code>\text&#123;...&#125;</code></td>
              </tr>
              <tr>
                <td>Extra space above a display</td>
                <td>Blank line before <code>\[</code></td>
                <td>Remove the blank line; a display continues the paragraph</td>
              </tr>
            </tbody>
          </table>
          </div>

          {/* ------------------------------------------------------------------ */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you write inline math in LaTeX?</h3>
          <p>
            Put the formula between single dollar signs, <code>{`$a^2 + b^2 = c^2$`}</code>, or
            between <code>\(</code> and <code>\)</code>, as in{' '}
            <code>{`\\(a^2 + b^2 = c^2\\)`}</code>. Both keep the math in line with the text at text
            size. No package is needed.
          </p>
          <h3>What is the difference between $...$ and \[...\]?</h3>
          <p>
            <code>$...$</code> is inline math: the formula sits inside the sentence at a compact
            size. <code>\[...\]</code> is display math: the formula is centred on its own line at
            full size. Use <code>equation</code> instead of <code>\[...\]</code> when the display
            needs a number.
          </p>
          <h3>Should I use $$...$$ in LaTeX?</h3>
          <p>
            No. <code>$$...$$</code> is plain TeX syntax. In LaTeX it ignores the{' '}
            <code>fleqn</code> class option and is not understood by amsmath, so{' '}
            <code>\tag</code> does not work inside it. Use <code>\[...\]</code> for an unnumbered
            display and <code>equation</code> for a numbered one.
          </p>
          <h3>What is the difference between equation and equation*?</h3>
          <p>
            <code>equation</code> prints a number next to the display and accepts a{' '}
            <code>\label</code> for <code>\ref</code> and <code>\eqref</code>.{' '}
            <code>equation*</code> (from amsmath) is the same display without a number, equivalent
            to <code>\[...\]</code>. Both hold a single line; use <code>align</code> for several
            lines.
          </p>
          <h3>How do I write text inside a LaTeX equation?</h3>
          <p>
            Load amsmath and wrap the words in <code>{`\\text{...}`}</code>, as in{' '}
            <code>{`$f(x) = 0 \\text{ for all } x$`}</code>. Put spaces inside the braces, because
            spaces in math mode are ignored. Without <code>\text</code> the letters are set as
            italic variables run together.
          </p>
          <h3>What does &ldquo;Missing $ inserted&rdquo; mean?</h3>
          <p>
            LaTeX met a math-only command or character (such as <code>^</code>, <code>_</code>,{' '}
            <code>\frac</code> or <code>\alpha</code>) outside math mode, an opening{' '}
            <code>$</code> was never closed, or a display contains a blank line. Wrap the
            expression in <code>$...$</code> or <code>\[...\]</code>, check that every{' '}
            <code>$</code> has a partner, and remove blank lines inside displays.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Next Steps</h2>
          <p>Now that you&apos;ve mastered the foundations of mathematical expressions, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits in LaTeX</Link> – advanced integral notation, multi-index sums, and limit constructs</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses in LaTeX</Link> – every delimiter, \left and \right, and manual sizing</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> – align, split, multline and breaking long equations</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> – all matrix environments, augmented matrices, and large matrices</li>
            <li><Link href="/learn/math-functions">Math Functions</Link> – \sin, \log, \exp and custom operators</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> – complete reference for Greek letters, arrows, set notation, and more</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts in LaTeX</Link> – nested scripts, multi-character scripts, and combining sub/superscripts</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> – \label, \eqref, cleveref, custom tags, subequations and line breaks in long equations</li>
            <li><Link href="/learn/theorems-proofs">Theorems, Lemmas and Proofs</Link> – amsthm, \newtheorem, the proof environment and the QED symbol</li>
          </ul>

          {/* ------------------------------------------------------------------ */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> – Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> – Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Browse math operators and Greek letters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX math" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
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
