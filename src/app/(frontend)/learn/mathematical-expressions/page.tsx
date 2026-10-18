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

const breadcrumbs = getLearnBreadcrumbs('Mathematical Expressions', 'mathematical-expressions')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'mathematical-expressions',
  title: 'Mathematical Expressions in LaTeX – Complete Guide 2026',
  seoTitle: 'Mathematical Expressions in LaTeX – Guide 2026',
  description: 'Learn how to write mathematical expressions in LaTeX. Guide covers fractions, roots, aligned equations, brackets, equation numbering, cases, spacing, and the amsmath package.',
  keywords: 'latex math, latex equation, latex fraction, latex square root, latex brackets, latex align, latex equation numbering, latex amsmath, latex math mode, latex inline math, latex display math, latex cases, latex piecewise function, how to write equations in latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

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
          <h1>Mathematical Expressions in LaTeX</h1>
          <p className="lead">
            LaTeX is the gold standard for typesetting mathematical expressions. Whether you&apos;re
            writing a simple equation or a multi-page derivation, LaTeX gives you precise control
            over how your math looks. This guide covers everything from basic inline formulas to
            aligned multi-line equations, equation numbering, and the essential amsmath package.
          </p>

          {/* ------------------------------------------------------------------ */}
          <h2>Inline vs Display Math</h2>
          <p>
            LaTeX provides two primary ways to include mathematics in your document:
            <strong>inline math</strong> and <strong>display math</strong>. Choosing the right
            mode is important because it affects both the appearance of the formula and the flow
            of your text.
          </p>

          <h3>Inline Math</h3>
          <p>
            Inline math is placed directly within a line of text using dollar signs
            (<code>$...$</code>) or <code>\(...\)</code>. It keeps the formula compact so it
            doesn&apos;t break the paragraph flow.
          </p>
          <pre><code>{`The Pythagorean theorem states that $a^2 + b^2 = c^2$.

% Equivalent using \\(...\\)
The Pythagorean theorem states that \\(a^2 + b^2 = c^2\\).`}</code></pre>
          <p>
            Inline mode automatically reduces the size of large operators, fractions, and limits
            so the formula fits within the line height. For instance, a fraction like
            <code>$\frac&#123;1&#125;&#123;2&#125;$</code> will appear smaller than in display mode.
          </p>

          <h3>Display Math</h3>
          <p>
            Display math places the expression on its own line, centred and with generous
            vertical spacing. Use <code>\[...\]</code> (or the <code>equation</code> environment
            when you need numbering).
          </p>
          <pre><code>{`\\[
  E = mc^2
\\]

% Or equivalently (plain TeX syntax, less recommended):
$$
  E = mc^2
$$`}</code></pre>
          <p>
            Display mode renders fractions, sums, and integrals at full size, making them
            easier to read. Use it for any expression you want the reader to focus on.
          </p>

          <h3>When to Use Each</h3>
          <ul>
            <li><strong>Inline math</strong> – short expressions referenced in running text, e.g. &quot;where <code>$n$</code> is a positive integer.&quot;</li>
            <li><strong>Display math</strong> – important equations, long formulas, or anything you want the reader to study carefully.</li>
          </ul>

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
          <h2>Square Roots and Nth Roots</h2>
          <p>
            The <code>\sqrt</code> command produces a square root symbol that automatically
            stretches to fit its argument.
          </p>

          <h3>Basic Square Root</h3>
          <pre><code>{`\\[
  \\sqrt{a^2 + b^2}
\\]`}</code></pre>

          <h3>Nth Root</h3>
          <p>
            Pass an optional argument in square brackets for an arbitrary root index.
          </p>
          <pre><code>{`\\[
  \\sqrt[3]{27} = 3
  \\qquad
  \\sqrt[n]{x}
\\]`}</code></pre>

          <h3>Nested Roots</h3>
          <p>
            LaTeX handles nested roots gracefully. For deeply nested expressions you may want
            to add a small space with <code>\,</code> for readability.
          </p>
          <pre><code>{`\\[
  \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + x}}}}
\\]`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Parentheses and Brackets</h2>
          <p>
            Delimiters (parentheses, brackets, braces) are essential for grouping sub-expressions.
            LaTeX can automatically scale them to fit or you can control sizing manually.
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
            <code>amsmath</code> package.
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
          <h2>Cases and Piecewise Functions</h2>
          <p>
            The <code>cases</code> environment (from <code>amsmath</code>) is the standard
            way to write piecewise-defined functions.
          </p>
          <pre><code>{`\\[
  f(x) =
  \\begin{cases}
    x^2       & \\text{if } x \\geq 0 \\\\
    -x^2      & \\text{if } x < 0
  \\end{cases}
\\]`}</code></pre>
          <p>You can have as many cases as you need:</p>
          <pre><code>{`\\[
  |x| =
  \\begin{cases}
    x   & \\text{if } x \\geq 0 \\\\
    -x  & \\text{if } x < 0
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
\\]`}</code></pre>
          <p>
            For a right-side brace, use the <code>rcases</code> environment (also from
            <code>amsmath</code>):
          </p>
          <pre><code>{`\\[
  \\begin{rcases}
    x > 0 \\\\
    y > 0
  \\end{rcases}
  \\Rightarrow x + y > 0
\\]`}</code></pre>

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
            <li><strong>Improved spacing</strong> – better default spacing around operators and relations</li>
          </ul>
          <p>
            You can also load the companion packages <code>amssymb</code> (extra symbols like
            <code>\mathbb</code>, <code>\mathfrak</code>) and <code>amsthm</code> (theorem
            environments). Together they form the AMS-LaTeX bundle:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}`}</code></pre>

          {/* ------------------------------------------------------------------ */}
          <h2>Next Steps</h2>
          <p>Now that you&apos;ve mastered the foundations of mathematical expressions, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits in LaTeX</Link> – advanced integral notation, multi-index sums, and limit constructs</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> – all matrix environments, augmented matrices, and large matrices</li>
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
