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

const breadcrumbs = getLearnBreadcrumbs('Display Style in Math Mode', 'display-style-math')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'display-style-math',
  title: 'Display Style in LaTeX Math: \\displaystyle, \\textstyle and Inline vs Display',
  seoTitle: '\\displaystyle in LaTeX: Inline vs Display Math',
  description: 'Display style in LaTeX: inline vs display math, $$ vs \\[ \\] vs equation, \\displaystyle and \\textstyle, \\limits for inline sums and the common mistakes.',
  keywords: 'latex displaystyle, displaystyle latex, displaystyle, latex textstyle, latex scriptstyle, scriptscriptstyle, latex display math, latex inline math, inline vs display math latex, latex $$ vs \\[, double dollar latex, latex equation vs \\[, latex display mode, latex sum limits inline, latex limits, latex nolimits, latex sum below, latex integral limits inline, latex big fraction inline, latex math styles, latex everymath displaystyle, mathchoice, latex math mode size',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What does \\displaystyle do in LaTeX?',
    answer:
      'It switches math to display style, the size used for equations on their own line, until the end of the current formula or group. Inline, $\\displaystyle \\sum_{i=1}^n i$ puts the limits above and below the sum and draws it full size, and fractions get full-size numerators and denominators.',
  },
  {
    question: 'What is the difference between $$, \\[ \\] and equation?',
    answer:
      '\\[ ... \\] and equation* (amsmath) give an unnumbered displayed equation; equation gives a numbered one. $$ ... $$ is plain TeX syntax: it still compiles, but it ignores the fleqn option and can leave wrong vertical spacing, so LaTeX documents should use \\[ ... \\] instead.',
  },
  {
    question: 'How do I put limits above and below a sum in inline math?',
    answer:
      'Add \\limits after the operator: $\\sum\\limits_{i=1}^{n} x_i$. Only the limits move; the symbol keeps its inline size. For the full display look, use $\\displaystyle\\sum_{i=1}^{n} x_i$, but expect it to push the lines of the paragraph apart.',
  },
  {
    question: 'What is the difference between inline and display math?',
    answer:
      'Inline math, written $...$ or \\(...\\), sits inside a line of text and is set in text style, compact enough to keep the line spacing even. Display math, written \\[...\\] or an environment such as equation, gets its own centred line and is set in display style, with larger operators and fractions.',
  },
  {
    question: 'Should I use \\everymath{\\displaystyle}?',
    answer:
      'Usually not. It makes every inline formula display size, which forces uneven line spacing throughout the document. Apply \\displaystyle to the few formulas that need it, use \\dfrac for a single fraction, or move a large formula into a display.',
  },
]

export default async function LearnDisplayStyleMathPage() {
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
          <h1>Display Style in LaTeX Math: \displaystyle, \textstyle and Inline vs Display</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Inline math</strong> (<code>$...$</code>) uses <code>\textstyle</code>;{' '}
                <strong>display math</strong> (<code>{`\\[...\\]`}</code>) uses{' '}
                <code>\displaystyle</code>.
              </li>
              <li>
                <strong>Force the display look inline:</strong>{' '}
                <code>{`$\\displaystyle \\sum_{i=1}^n i$`}</code>.
              </li>
              <li>
                <strong>Only move the limits:</strong> <code>{`$\\sum\\limits_{i=1}^n i$`}</code>.
              </li>
              <li>
                <strong>Use <code>{`\\[ \\]`}</code> or <code>equation</code>, not{' '}
                <code>$$</code></strong> in LaTeX documents.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\begin{document}

Text style: $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$.

Display style inline: $\\displaystyle \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$.

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            The same formula looks different inline and on its own line: a sum&apos;s limits move
            to the side, fractions shrink, integrals get shorter. LaTeX does this on purpose, so
            that math inside a paragraph does not push the lines apart. This guide explains the
            four math styles behind that behaviour, the difference between <code>$$</code>,{' '}
            <code>{`\\[ \\]`}</code> and <code>equation</code>, and how to override the style with{' '}
            <code>\displaystyle</code>, <code>\textstyle</code> and <code>\limits</code> when the
            default is not what you want. Every example compiles with pdfLaTeX.
          </p>

          {/* ── inline vs display ── */}
          <h2>Inline vs Display Math</h2>
          <p>
            Inline math sits in the line of text. Display math gets its own centred line, with space
            above and below:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

Inline, with dollars $a^2 + b^2 = c^2$ or parentheses \\(a^2 + b^2 = c^2\\).

Unnumbered display:
\\[
  \\int_0^1 x^2 \\, dx = \\frac{1}{3}
\\]
Numbered display:
\\begin{equation}
  \\int_0^1 x^2 \\, dx = \\frac{1}{3}
  \\label{eq:int}
\\end{equation}
Unnumbered with amsmath:
\\begin{equation*}
  \\int_0^1 x^2 \\, dx = \\frac{1}{3}
\\end{equation*}

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Syntax</th>
                  <th>Kind</th>
                  <th>Numbered</th>
                  <th>Use in LaTeX?</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>$...$</code>, <code>{`\\(...\\)`}</code></td><td>Inline</td><td>No</td><td>Yes</td></tr>
                <tr><td><code>{`\\[...\\]`}</code></td><td>Display</td><td>No</td><td>Yes</td></tr>
                <tr><td><code>equation*</code> (amsmath)</td><td>Display</td><td>No</td><td>Yes, same as <code>{`\\[...\\]`}</code></td></tr>
                <tr><td><code>equation</code></td><td>Display</td><td>Yes</td><td>Yes</td></tr>
                <tr><td><code>$$...$$</code></td><td>Display</td><td>No</td><td>No: plain TeX, see below</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── $$ ── */}
          <h2>Why Not $$...$$?</h2>
          <p>
            <code>$$</code> is the display syntax of plain TeX, which LaTeX is built on, so it
            still compiles. But LaTeX&apos;s own display code never runs. The visible
            consequences: the <code>fleqn</code> option no longer sets equations flush left, the
            space above a display that starts a new paragraph comes out as an extra empty line, and{' '}
            <code>amsmath</code> features such as <code>\tag</code> are unavailable. Replacing{' '}
            <code>$$</code> with <code>{`\\[`}</code> and <code>{`\\]`}</code> costs nothing and
            avoids all of them. More on choosing an environment in the{' '}
            <Link href="/learn/mathematical-expressions">mathematical expressions guide</Link>.
          </p>

          {/* ── four styles ── */}
          <h2>The Four Math Styles</h2>
          <p>
            Every piece of a formula is set in one of four styles. LaTeX chooses them
            automatically, and you can switch with a command that lasts to the end of the formula
            or the current group:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Used by default for</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\displaystyle</code></td><td>Display math</td><td>Large operators, limits above and below, full-size fractions</td></tr>
                <tr><td><code>\textstyle</code></td><td>Inline math; fraction parts in a display; matrix and <code>cases</code> cells</td><td>Normal size, limits to the side, small fractions</td></tr>
                <tr><td><code>\scriptstyle</code></td><td>Subscripts and superscripts; fraction parts inline</td><td>About 70% size</td></tr>
                <tr><td><code>\scriptscriptstyle</code></td><td>Scripts of scripts</td><td>About 50% size</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\begin{document}

\\[
  \\displaystyle \\sum_{k=1}^{n} \\frac{1}{k} \\quad
  \\textstyle \\sum_{k=1}^{n} \\frac{1}{k} \\quad
  \\scriptstyle \\sum_{k=1}^{n} \\frac{1}{k} \\quad
  \\scriptscriptstyle \\sum_{k=1}^{n} \\frac{1}{k}
\\]

\\end{document}`}</code></pre>
          <p>
            Each switch applies to everything after it, so the line above shrinks step by step.
            To change one part only, put it in braces: <code>{`{\\displaystyle \\int_0^1 f}`}</code>.
          </p>

          {/* ── inline sums ── */}
          <h2>Sums, Integrals and Limits in a Line of Text</h2>
          <p>
            Inline, the limits of <code>\sum</code>, <code>\prod</code> and <code>\lim</code> go to
            the side. There are three ways to change that, from lightest to heaviest:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Default: $\\sum_{i=1}^{n} x_i$ and $\\lim_{x \\to 0} f(x)$.

Limits only: $\\sum\\limits_{i=1}^{n} x_i$ and $\\lim\\limits_{x \\to 0} f(x)$.

Full display: $\\displaystyle \\sum_{i=1}^{n} x_i$ and
$\\displaystyle \\int_0^1 f(x)\\,dx$.

And the reverse, in a display:
\\[
  \\sum\\nolimits_{i=1}^{n} x_i \\qquad \\textstyle \\sum_{i=1}^{n} x_i
\\]

\\end{document}`}</code></pre>
          <p>
            <code>\limits</code> moves the limits but keeps the symbol small, so it disturbs the
            line spacing less than <code>\displaystyle</code>. <code>\nolimits</code> does the
            opposite in a display. For integrals, limits are beside the sign in every style;{' '}
            <code>\int\limits</code> puts them above and below. The{' '}
            <Link href="/learn/integrals-sums-limits">integrals, sums and limits guide</Link> has
            more examples.
          </p>

          {/* ── fractions, matrices, cases ── */}
          <h2>Fractions, Matrices and cases</h2>
          <p>
            Inside a fraction, a matrix or <code>cases</code>, LaTeX drops to text style, so a
            fraction in there comes out small even in a display. Use <code>\dfrac</code> for one
            fraction, or the display-style variants of the environment:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools}   % loads amsmath, adds dcases
\\begin{document}

\\[
  f(x) =
  \\begin{cases}
    \\frac{1}{x} & x > 0 \\\\
    0            & x \\le 0
  \\end{cases}
  \\qquad
  f(x) =
  \\begin{dcases}
    \\frac{1}{x} & x > 0 \\\\
    0            & x \\le 0
  \\end{dcases}
\\]
\\[
  \\begin{pmatrix} \\frac{1}{2} & 0 \\\\ 0 & \\dfrac{1}{2} \\end{pmatrix}
\\]

\\end{document}`}</code></pre>
          <p>
            <code>dcases</code> comes from <code>mathtools</code>. The size rules for{' '}
            <code>\frac</code>, <code>\dfrac</code> and <code>\tfrac</code> are covered in{' '}
            <Link href="/learn/fractions-binomials">fractions and binomials</Link>.
          </p>

          {/* ── Mistakes ── */}
          <h2>Common Mistakes</h2>
          <div className="overflow-x-auto">
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
                  <td>Uneven gaps between lines of a paragraph</td>
                  <td><code>\displaystyle</code> or <code>\dfrac</code> inline</td>
                  <td><code>\limits</code>, <code>\frac</code>, or move the formula into a display</td>
                </tr>
                <tr>
                  <td><code>\displaystyle</code> changes more than intended</td>
                  <td>It lasts to the end of the formula or group</td>
                  <td>Limit it with braces: <code>{`{\\displaystyle ...}`}</code></td>
                </tr>
                <tr>
                  <td>Equations ignore <code>fleqn</code> or have odd spacing</td>
                  <td><code>$$...$$</code></td>
                  <td><code>{`\\[...\\]`}</code> or <code>equation*</code></td>
                </tr>
                <tr>
                  <td><em>Limit controls must follow a math operator</em></td>
                  <td><code>\limits</code> after something that is not an operator, such as a letter or a macro defined with <code>\newcommand</code></td>
                  <td>Use it only after <code>\sum</code>, <code>\int</code>, <code>\lim</code> or a <code>\DeclareMathOperator*</code> operator</td>
                </tr>
                <tr>
                  <td>Small fractions in <code>cases</code></td>
                  <td>Cells are in text style</td>
                  <td><code>dcases</code> from <code>mathtools</code>, or <code>\dfrac</code></td>
                </tr>
                <tr>
                  <td><code>{`\\everymath{\\displaystyle}`}</code> in the preamble</td>
                  <td>Forces display size on every inline formula</td>
                  <td>Remove it; apply styles where needed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What does \displaystyle do in LaTeX?</h3>
          <p>
            It switches math to display style, the size used for equations on their own line, until
            the end of the current formula or group. Inline,{' '}
            <code>{`$\\displaystyle \\sum_{i=1}^n i$`}</code> puts the limits above and below the
            sum and draws it full size, and fractions get full-size numerators and denominators.
          </p>
          <h3>What is the difference between $$, \[ \] and equation?</h3>
          <p>
            <code>{`\\[ ... \\]`}</code> and <code>equation*</code> (amsmath) give an unnumbered
            displayed equation; <code>equation</code> gives a numbered one. <code>$$ ... $$</code>{' '}
            is plain TeX syntax: it still compiles, but it ignores the <code>fleqn</code> option
            and can leave wrong vertical spacing, so LaTeX documents should use{' '}
            <code>{`\\[ ... \\]`}</code> instead.
          </p>
          <h3>How do I put limits above and below a sum in inline math?</h3>
          <p>
            Add <code>\limits</code> after the operator:{' '}
            <code>{`$\\sum\\limits_{i=1}^{n} x_i$`}</code>. Only the limits move; the symbol keeps
            its inline size. For the full display look, use{' '}
            <code>{`$\\displaystyle\\sum_{i=1}^{n} x_i$`}</code>, but expect it to push the lines
            of the paragraph apart.
          </p>
          <h3>What is the difference between inline and display math?</h3>
          <p>
            Inline math, written <code>$...$</code> or <code>{`\\(...\\)`}</code>, sits inside a
            line of text and is set in text style, compact enough to keep the line spacing even.
            Display math, written <code>{`\\[...\\]`}</code> or an environment such as{' '}
            <code>equation</code>, gets its own centred line and is set in display style, with
            larger operators and fractions.
          </p>
          <h3>Should I use \everymath{'{\\displaystyle}'}?</h3>
          <p>
            Usually not. It makes every inline formula display size, which forces uneven line
            spacing throughout the document. Apply <code>\displaystyle</code> to the few formulas
            that need it, use <code>\dfrac</code> for a single fraction, or move a large formula
            into a display.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Inline and display math from the start</li>
            <li><Link href="/learn/fractions-binomials">Fractions and Binomials</Link> &ndash; \frac, \dfrac, \tfrac and \binom</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; Operators with limits in every position</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; align, split and gather for longer displays</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering</Link> &ndash; Numbered displays, \label and \eqref</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a formula and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="math" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Get the math right with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI writes formulas from a description, turns <code>$$</code> into
              proper displays and tidies inline sums, with the compiled PDF next to your code.
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
