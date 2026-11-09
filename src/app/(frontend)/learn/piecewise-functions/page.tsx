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

const breadcrumbs = getLearnBreadcrumbs('Piecewise Functions in LaTeX', 'piecewise-functions')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'piecewise-functions',
  title: 'Piecewise Functions in LaTeX: the cases Environment',
  seoTitle: 'Piecewise Functions in LaTeX: cases Environment',
  description: 'Write piecewise functions in LaTeX with \\begin{cases} (amsmath): \\text{if} conditions, dcases for full-size fractions, right braces, numbering and fixes.',
  keywords: 'piecewise functions latex, piecewise function latex, latex piecewise function, latex piecewise, cases latex, latex cases, begin cases, latex cases environment, dcases, mathtools dcases, rcases, latex right brace cases, latex if otherwise, piecewise defined function latex, numcases, latex absolute value piecewise, latex left brace multiple lines, missing right inserted',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I write a piecewise function in LaTeX?',
    answer:
      'Load amsmath and use the cases environment inside math mode: f(x) = \\begin{cases} x^2 & \\text{if } x \\ge 0 \\\\ -x & \\text{if } x < 0 \\end{cases}. Each row is one case, & separates the value from the condition, and \\\\ starts the next row. The large left brace is added automatically.',
  },
  {
    question: 'Which package do I need for cases in LaTeX?',
    answer:
      'amsmath, loaded with \\usepackage{amsmath}. It defines the cases environment. The mathtools package, which loads amsmath for you, adds dcases (display-style rows), dcases* (text conditions) and rcases (a brace on the right).',
  },
  {
    question: 'How do I write “if” and “otherwise” in a piecewise function?',
    answer:
      'Wrap the words in \\text{...}, which typesets them as upright text with normal spaces: \\text{if } x > 0 and \\text{otherwise}. Without \\text, LaTeX treats the letters as variables, sets them in italic and drops the spaces, so “if x” turns into “ifx”.',
  },
  {
    question: 'Why are the fractions in my cases environment so small?',
    answer:
      'cases sets its rows in text style, the size used for inline math, so \\frac and \\sum come out small. Use dcases from the mathtools package to get full display-size rows, or write \\dfrac for a single fraction.',
  },
  {
    question: 'How do I put the brace on the right side?',
    answer:
      'With mathtools, use the rcases environment, which works like cases with the brace on the right. Without mathtools, build it with an array and an invisible left delimiter: \\left. \\begin{array}{ll} ... \\end{array} \\right\\}.',
  },
  {
    question: 'How do I number each case of a piecewise function?',
    answer:
      'Load the cases package and use numcases: \\begin{numcases}{f(x)=} x^2, & $x \\ge 0$ \\\\ -x, & $x < 0$ \\end{numcases}. Every row gets its own equation number and can carry a \\label. The second column of numcases is in text mode, so math there needs dollar signs.',
  },
]

export default async function LearnPiecewiseFunctionsPage() {
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
          <h1>Piecewise Functions in LaTeX: the cases Environment</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Package:</strong> <code>{`\\usepackage{amsmath}`}</code>, then{' '}
                <code>{`\\begin{cases} ... \\end{cases}`}</code> inside math mode.
              </li>
              <li>
                <strong>Rows:</strong> value <code>&amp;</code> condition, rows separated by{' '}
                <code>\\</code>. Words go in <code>{`\\text{if }`}</code> and{' '}
                <code>{`\\text{otherwise}`}</code>.
              </li>
              <li>
                <strong>Full-size fractions:</strong> <code>dcases</code> from{' '}
                <code>mathtools</code>. <strong>Brace on the right:</strong>{' '}
                <code>rcases</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[
  |x| =
  \\begin{cases}
    x  & \\text{if } x \\ge 0, \\\\
    -x & \\text{if } x < 0.
  \\end{cases}
\\]
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            A piecewise function is defined by different formulas on different parts of its
            domain, and in LaTeX it is written with the <code>cases</code> environment from{' '}
            <code>amsmath</code>. It draws the large left brace, aligns the values and the
            conditions in two columns, and works inline or in display math. This guide covers
            the basic syntax, text in the conditions, display-size rows with{' '}
            <code>dcases</code>, braces on the right, numbering, ready-made examples and the
            errors that come up most. Every snippet compiles as shown.
          </p>

          {/* ── cases ── */}
          <h2>Piecewise Functions with \begin&#123;cases&#125;</h2>
          <p>
            Inside <code>cases</code>, every row is one piece of the function. An ampersand{' '}
            <code>&amp;</code> separates the value from its condition, and <code>\\</code> ends
            the row (not needed after the last one). The environment must be inside math mode,
            usually a displayed equation:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
The Heaviside step function is
\\[
  H(x) =
  \\begin{cases}
    0 & \\text{if } x < 0, \\\\
    1 & \\text{if } x \\ge 0.
  \\end{cases}
\\]
With three pieces:
\\[
  f(x) =
  \\begin{cases}
    x^2     & \\text{for } x < 0, \\\\
    0       & \\text{for } 0 \\le x \\le 1, \\\\
    \\ln x   & \\text{for } x > 1.
  \\end{cases}
\\]
\\end{document}`}</code></pre>
          <p>
            Both columns are left-aligned, and the brace grows with the number of rows. The
            same code works inline, <code>{`$f(x) = \\begin{cases} ... \\end{cases}$`}</code>,
            but a tall brace in running text pushes the lines apart; display math reads better.
            How display math works is covered in{' '}
            <Link href="/learn/mathematical-expressions">inline and display math</Link>.
          </p>

          {/* ── text ── */}
          <h2>Text in cases: \text&#123;if&#125; and Otherwise</h2>
          <p>
            Conditions are still math, so words must go in <code>{`\\text{...}`}</code>.
            Without it, &ldquo;if&rdquo; is set as the italic variables <em>i</em> and{' '}
            <em>f</em> and the spaces disappear. Put the space inside the braces:{' '}
            <code>{`\\text{if } x > 0`}</code>. A catch-all row is written with{' '}
            <code>{`\\text{otherwise}`}</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[
  \\operatorname{sgn}(x) =
  \\begin{cases}
    -1 & \\text{if } x < 0, \\\\
     0 & \\text{if } x = 0, \\\\
     1 & \\text{otherwise}.
  \\end{cases}
\\]
\\[
  \\mathbf{1}_A(x) =
  \\begin{cases}
    1 & x \\in A, \\\\
    0 & x \\notin A.
  \\end{cases}
\\]
\\end{document}`}</code></pre>
          <p>
            Whether you write &ldquo;if&rdquo;, &ldquo;for&rdquo; or only the condition, and
            whether the rows end with a comma, is a matter of style; just keep it consistent.
            For named functions such as <code>\operatorname{`{sgn}`}</code>, see{' '}
            <Link href="/learn/math-functions">math functions in LaTeX</Link>.
          </p>

          {/* ── dcases ── */}
          <h2>Display-Style Cases with dcases (mathtools)</h2>
          <p>
            <code>cases</code> typesets its rows in text style, the size of inline math, so
            fractions, sums and integrals come out small. The <code>dcases</code> environment
            from <code>mathtools</code> uses display style instead, and <code>dcases*</code>{' '}
            additionally sets the condition column as normal text, so no{' '}
            <code>\text</code> is needed:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools}   % loads amsmath

\\begin{document}
\\[
  g(x) =
  \\begin{cases}
    \\frac{1}{x} & x \\neq 0 \\\\
    0           & x = 0
  \\end{cases}
  \\qquad
  g(x) =
  \\begin{dcases}
    \\frac{1}{x} & x \\neq 0 \\\\
    0           & x = 0
  \\end{dcases}
\\]
\\[
  h(n) =
  \\begin{dcases*}
    \\sum_{k=1}^{n} k & if $n$ is positive, \\\\
    0                & otherwise.
  \\end{dcases*}
\\]
\\end{document}`}</code></pre>
          <p>
            For a single large fraction in an ordinary <code>cases</code>, <code>\dfrac</code>{' '}
            does the same job. <code>mathtools</code> also provides <code>cases*</code>, the
            text-condition version of plain <code>cases</code>.
          </p>

          {/* ── right brace ── */}
          <h2>Left Brace vs Right Brace</h2>
          <p>
            The brace of <code>cases</code> is always on the left. For a brace on the right,
            for instance to label a group of equations, use <code>rcases</code> from{' '}
            <code>mathtools</code>, or build it yourself from an <code>array</code> with{' '}
            <code>\left.</code>, an invisible delimiter, on the other side:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools}

\\begin{document}
\\[
  \\begin{rcases}
    x + y = 3 \\\\
    x - y = 1
  \\end{rcases}
  \\implies x = 2,\\ y = 1
\\]
\\[
  \\left.
  \\begin{array}{l}
    a > 0 \\\\
    b > 0
  \\end{array}
  \\right\\}
  \\implies ab > 0
\\]
\\[
  f(x) = \\left\\{
  \\begin{array}{ll}
    x^2 & \\text{if } x \\ge 0 \\\\
    -x  & \\text{if } x < 0
  \\end{array}
  \\right.
\\]
\\end{document}`}</code></pre>
          <p>
            The last example is the manual version of <code>cases</code>, which you still see
            in older documents. Every <code>\left</code> needs a matching <code>\right</code>;
            <code>\right.</code> closes it without drawing anything. More delimiters are listed
            in <Link href="/learn/brackets">brackets in LaTeX</Link>.
          </p>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Turn a photo of a formula into LaTeX</h3>
            <p className="text-muted-foreground mb-4">
              Have a piecewise function on paper or in a PDF? The free Math to LaTeX tool
              converts an image or a typed description into a <code>cases</code> environment
              you can paste straight into your document.
            </p>
            <Link
              href="https://tools.useoctree.com/tools/math-to-latex"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open Math to LaTeX &rarr;
            </Link>
          </div>

          {/* ── alignment ── */}
          <h2>Aligning Conditions and Several Piecewise Functions</h2>
          <p>
            Within one <code>cases</code> the conditions already start in the same column. To
            line up the relation symbols inside the conditions as well, use an{' '}
            <code>array</code> with separate columns for each side. To align several piecewise
            definitions at their equals signs, put each <code>cases</code> in a line of{' '}
            <code>align</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[
  f(x) = \\left\\{
  \\begin{array}{@{}l@{\\quad}r@{}l@{}}
    x^2,  & x     & {} < 0 \\\\
    2x,   & 0 \\le x & {} \\le 10 \\\\
    100,  & x     & {} > 10
  \\end{array}
  \\right.
\\]
\\begin{align}
  u(x) &= \\begin{cases} 1 & x \\ge 0 \\\\ 0 & x < 0 \\end{cases} \\\\
  \\operatorname{ReLU}(x) &= \\begin{cases} x & x \\ge 0 \\\\ 0 & x < 0 \\end{cases}
\\end{align}
\\end{document}`}</code></pre>
          <p>
            The <Link href="/learn/multiline-equations">multiline equations guide</Link> covers{' '}
            <code>align</code> and its relatives in detail.
          </p>

          {/* ── numbering ── */}
          <h2>Numbering a Piecewise Function</h2>
          <p>
            Inside an <code>equation</code> environment the whole piecewise function gets one
            number. To number every case on its own, use <code>numcases</code> from the{' '}
            <code>cases</code> package. Its first argument is the left-hand side, and its
            second column is text, so math there needs <code>$...$</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{cases}

\\begin{document}
One number for the whole function:
\\begin{equation}
  f(x) =
  \\begin{cases}
    x^2 & \\text{if } x \\ge 0 \\\\
    -x  & \\text{if } x < 0
  \\end{cases}
  \\label{eq:f}
\\end{equation}

One number per case:
\\begin{numcases}{g(x) =}
  x^2, & $x \\ge 0$ \\label{eq:g-pos} \\\\
  -x,  & $x < 0$   \\label{eq:g-neg}
\\end{numcases}
Equation \\eqref{eq:f}, and the cases \\eqref{eq:g-pos} and \\eqref{eq:g-neg}.
\\end{document}`}</code></pre>
          <p>
            Labels and references for equations are explained in{' '}
            <Link href="/learn/equation-numbering">equation numbering</Link>.
          </p>

          {/* ── examples ── */}
          <h2>Piecewise Function Examples</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Function</th>
                  <th>LaTeX</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Absolute value</td><td><code>{`|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}`}</code></td></tr>
                <tr><td>Sign function</td><td><code>{`\\operatorname{sgn}(x) = \\begin{cases} -1 & x < 0 \\\\ 0 & x = 0 \\\\ 1 & x > 0 \\end{cases}`}</code></td></tr>
                <tr><td>Heaviside step</td><td><code>{`H(x) = \\begin{cases} 0 & x < 0 \\\\ 1 & x \\ge 0 \\end{cases}`}</code></td></tr>
                <tr><td>ReLU</td><td><code>{`\\operatorname{ReLU}(x) = \\begin{cases} x & x > 0 \\\\ 0 & \\text{otherwise} \\end{cases}`}</code></td></tr>
                <tr><td>Kronecker delta</td><td><code>{`\\delta_{ij} = \\begin{cases} 1 & i = j \\\\ 0 & i \\neq j \\end{cases}`}</code></td></tr>
                <tr><td>Parity</td><td><code>{`(-1)^n = \\begin{cases} 1 & n \\text{ even} \\\\ -1 & n \\text{ odd} \\end{cases}`}</code></td></tr>
              </tbody>
            </table>
          </div>

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
                  <td><em>Missing \right. inserted</em></td>
                  <td>A manual <code>{`\\left\\{`}</code> without a closing <code>\right</code>, or <code>\left</code> and <code>\right</code> split across lines of <code>align</code></td>
                  <td>Close with <code>\right.</code> in the same line, or use <code>cases</code>, which needs neither</td>
                </tr>
                <tr>
                  <td><em>Missing $ inserted</em></td>
                  <td><code>cases</code> used in normal text, outside math mode</td>
                  <td>Put it inside <code>{`\\[ ... \\]`}</code>, <code>equation</code> or <code>$...$</code></td>
                </tr>
                <tr>
                  <td><em>Misplaced alignment tab character &amp;</em></td>
                  <td><code>amsmath</code> not loaded, so <code>{`\\begin{cases}`}</code> falls back to an old plain TeX macro</td>
                  <td><code>{`\\usepackage{amsmath}`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Environment dcases undefined</em></td>
                  <td><code>dcases</code>, <code>rcases</code> and <code>cases*</code> come from <code>mathtools</code></td>
                  <td><code>{`\\usepackage{mathtools}`}</code></td>
                </tr>
                <tr>
                  <td><em>Extra alignment tab has been changed to \cr</em></td>
                  <td>More than one <code>&amp;</code> in a row; <code>cases</code> has only two columns</td>
                  <td>Keep one <code>&amp;</code> per row, or use an <code>array</code> with more columns</td>
                </tr>
                <tr>
                  <td>&ldquo;ifx&gt;0&rdquo; in italics, no spaces</td>
                  <td>Words written as math</td>
                  <td><code>{`\\text{if } x > 0`}</code>, or <code>dcases*</code> for text conditions</td>
                </tr>
                <tr>
                  <td>Fractions and sums look too small</td>
                  <td><code>cases</code> uses text style</td>
                  <td><code>dcases</code> from <code>mathtools</code>, or <code>\dfrac</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write a piecewise function in LaTeX?</h3>
          <p>
            Load <code>amsmath</code> and use the <code>cases</code> environment inside math
            mode:{' '}
            <code>{`f(x) = \\begin{cases} x^2 & \\text{if } x \\ge 0 \\\\ -x & \\text{if } x < 0 \\end{cases}`}</code>.
            Each row is one case, <code>&amp;</code> separates the value from the condition,
            and <code>\\</code> starts the next row. The large left brace is added
            automatically.
          </p>
          <h3>Which package do I need for cases in LaTeX?</h3>
          <p>
            <code>amsmath</code>, loaded with <code>{`\\usepackage{amsmath}`}</code>. It defines
            the <code>cases</code> environment. The <code>mathtools</code> package, which loads{' '}
            <code>amsmath</code> for you, adds <code>dcases</code> (display-style rows),{' '}
            <code>dcases*</code> (text conditions) and <code>rcases</code> (a brace on the
            right).
          </p>
          <h3>How do I write &ldquo;if&rdquo; and &ldquo;otherwise&rdquo; in a piecewise function?</h3>
          <p>
            Wrap the words in <code>{`\\text{...}`}</code>, which typesets them as upright text
            with normal spaces: <code>{`\\text{if } x > 0`}</code> and{' '}
            <code>{`\\text{otherwise}`}</code>. Without <code>\text</code>, LaTeX treats the
            letters as variables, sets them in italic and drops the spaces, so &ldquo;if
            x&rdquo; turns into &ldquo;ifx&rdquo;.
          </p>
          <h3>Why are the fractions in my cases environment so small?</h3>
          <p>
            <code>cases</code> sets its rows in text style, the size used for inline math, so{' '}
            <code>\frac</code> and <code>\sum</code> come out small. Use <code>dcases</code>{' '}
            from the <code>mathtools</code> package to get full display-size rows, or write{' '}
            <code>\dfrac</code> for a single fraction.
          </p>
          <h3>How do I put the brace on the right side?</h3>
          <p>
            With <code>mathtools</code>, use the <code>rcases</code> environment, which works
            like <code>cases</code> with the brace on the right. Without{' '}
            <code>mathtools</code>, build it with an array and an invisible left delimiter:{' '}
            <code>{`\\left. \\begin{array}{ll} ... \\end{array} \\right\\}`}</code>.
          </p>
          <h3>How do I number each case of a piecewise function?</h3>
          <p>
            Load the <code>cases</code> package and use <code>numcases</code>:{' '}
            <code>{`\\begin{numcases}{f(x)=} x^2, & $x \\ge 0$ \\\\ -x, & $x < 0$ \\end{numcases}`}</code>.
            Every row gets its own equation number and can carry a <code>\label</code>. The
            second column of <code>numcases</code> is in text mode, so math there needs dollar
            signs.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; <code>align</code>, <code>gather</code> and <code>split</code></li>
            <li><Link href="/learn/brackets">Brackets in LaTeX</Link> &ndash; Braces, <code>\left</code> and <code>\right</code> and sizing</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> &ndash; The other two-dimensional math layout</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering</Link> &ndash; Labels, references and custom numbers</li>
            <li><Link href="/learn/math-functions">Math Functions</Link> &ndash; <code>\sin</code>, <code>\log</code> and <code>\operatorname</code></li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free LaTeX Math Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert a formula image into LaTeX code</li>
            <li><Link href="https://tools.useoctree.com/tools/equation-to-latex" target="_blank" rel="noopener noreferrer">Equation to LaTeX</Link> &ndash; Describe an equation and get the code</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check a <code>cases</code> environment instantly</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Relations, arrows and operators for the conditions</li>
          </ul>

          <RelatedPosts searchTerm="Function" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write math faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe the function in words and Octree&apos;s AI writes the{' '}
              <code>cases</code> environment, loads the right packages and fixes the errors,
              with the PDF compiled next to your code.
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
