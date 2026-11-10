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

const breadcrumbs = getLearnBreadcrumbs('Fractions and Binomials', 'fractions-binomials')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'fractions-binomials',
  title: 'Fractions and Binomials in LaTeX: \\frac, \\dfrac, \\tfrac and \\binom',
  seoTitle: 'Fractions in LaTeX: \\frac, \\dfrac, \\tfrac, \\binom',
  description: 'Fractions in LaTeX: \\frac, \\dfrac and \\tfrac sizes, nested and continued fractions, \\binom, fractions without a line, \\sfrac in text, and common errors.',
  keywords: 'latex fraction, fraction latex, latex frac, frac latex, how to write fractions in latex, latex dfrac, latex tfrac, dfrac vs frac, latex binomial, latex binom, binomial coefficient latex, latex choose, latex n choose k, latex fraction without line, latex genfrac, latex atop, latex nested fractions, latex continued fraction, latex cfrac, latex fraction in text, latex sfrac, xfrac, nicefrac, latex slanted fraction, latex one half, textonehalf, latex big fraction, latex partial derivative fraction, latex fraction size',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is the difference between \\frac, \\dfrac and \\tfrac?',
    answer:
      '\\frac picks its size from the surroundings: small in inline math, full size in a display. \\dfrac always uses the full display size and \\tfrac always uses the small inline size. \\dfrac and \\tfrac come from the amsmath package.',
  },
  {
    question: 'How do I write a binomial coefficient (n choose k) in LaTeX?',
    answer:
      'Load amsmath and write \\binom{n}{k}. Like \\frac it adapts to inline or display math, and \\dbinom and \\tbinom force the display or inline size. The plain TeX form {n \\choose k} also works but is not recommended in LaTeX documents.',
  },
  {
    question: 'How do I write a continued fraction in LaTeX?',
    answer:
      'Use \\cfrac from amsmath and nest it: 1 + \\cfrac{1}{2 + \\cfrac{1}{2 + \\dotsb}}. Unlike nested \\frac, every level stays full size and the denominators line up. \\cfrac[l] and \\cfrac[r] set the numerator flush left or right.',
  },
  {
    question: 'Why does {n \\choose k} give a warning in LaTeX?',
    answer:
      '\\choose, \\atop and \\over are plain TeX commands. amsmath logs “Foreign command \\atopwithdelims” (or \\atop, \\over) for them, and they take everything in the surrounding group as their arguments, which is easy to get wrong. Replace {n \\choose k} with \\binom{n}{k} and {a \\over b} with \\frac{a}{b}.',
  },
  {
    question: 'Why is a fraction inside another fraction so small?',
    answer:
      'Each level of a fraction drops one math style: in a display the parts of a fraction are set in text style, and a fraction inside them in script style. Write the inner one as \\dfrac to keep it full size, or use \\cfrac for continued fractions.',
  },
]

export default async function LearnFractionsBinomialsPage() {
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
          <h1>Fractions and Binomials in LaTeX: \frac, \dfrac, \tfrac and \binom</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Fraction:</strong> <code>{`\\frac{a}{b}`}</code> in math mode.
              </li>
              <li>
                <strong>Force the size:</strong> <code>{`\\dfrac{a}{b}`}</code> (display) or{' '}
                <code>{`\\tfrac{a}{b}`}</code> (inline), with <code>amsmath</code>.
              </li>
              <li>
                <strong>Binomial:</strong> <code>{`\\binom{n}{k}`}</code>, with <code>amsmath</code>.
              </li>
              <li>
                <strong>No fraction line:</strong> <code>{`\\genfrac{}{}{0pt}{}{a}{b}`}</code>.
              </li>
              <li>
                <strong>In text:</strong> <code>{`\\sfrac{1}{2}`}</code> with <code>xfrac</code>, or
                just <code>1/2</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

Inline: $\\frac{1}{2}$ and $\\binom{n}{k}$.
\\[
  \\frac{x+1}{x-1} \\qquad \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}
\\]

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            A fraction in LaTeX is <code>{`\\frac{numerator}{denominator}`}</code>, and that covers
            most of what you will write. The questions start when the fraction looks wrong: too
            small in a sentence, too big in a line of text, cramped when nested, or needed without
            a line at all. This guide covers the three fraction sizes, nested and continued
            fractions, binomial coefficients, <code>\genfrac</code> for custom fractions, and
            fractions in ordinary text, with a table of mistakes at the end. For worked formulas
            (quadratic formula, derivatives, partial fractions), see the{' '}
            <Link href="/blog/fractions-latex-mathematical-notation-guide">fractions in LaTeX post
            on the blog</Link>. Every example compiles with pdfLaTeX.
          </p>

          {/* ── \frac ── */}
          <h2>\frac: The Basic Fraction</h2>
          <p>
            <code>\frac</code> takes two arguments in braces and works only in math mode. Either
            argument can contain any math:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

The ratio $\\frac{a}{b}$ sits in the line of text.
\\[
  \\frac{x^2 - 1}{x + 1} = x - 1
  \\qquad
  \\frac{\\sqrt{a}}{2\\pi}
  \\qquad
  \\frac{dy}{dx}
  \\qquad
  \\frac{\\partial f}{\\partial x}
\\]

\\end{document}`}</code></pre>
          <p>
            Braces can be dropped when each argument is a single character:{' '}
            <code>\frac12</code> gives &frac12;. That shortcut bites with longer numbers, because{' '}
            <code>\frac123</code> means <code>{`\\frac{1}{2}3`}</code>, so keep the braces in
            anything you share.
          </p>

          {/* ── sizes ── */}
          <h2>\frac vs \dfrac vs \tfrac</h2>
          <p>
            In a displayed equation, <code>\frac</code> sets both parts at full size. Inline, it
            shrinks them so the line spacing stays even. The <code>amsmath</code> commands{' '}
            <code>\dfrac</code> and <code>\tfrac</code> fix the size whatever the context:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

Inline: $\\frac{1}{2}$, $\\dfrac{1}{2}$ and $\\tfrac{1}{2}$.
\\[
  \\frac{1}{2} \\qquad \\dfrac{1}{2} \\qquad \\tfrac{1}{2}
\\]

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Inline math</th>
                  <th>Display math</th>
                  <th>Typical use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\frac</code></td><td>Small</td><td>Full size</td><td>Almost everything</td></tr>
                <tr><td><code>\dfrac</code></td><td>Full size</td><td>Full size</td><td>Fractions inside a matrix, <code>cases</code> or another fraction</td></tr>
                <tr><td><code>\tfrac</code></td><td>Small</td><td>Small</td><td>A coefficient such as <code>\tfrac12 x</code> in a display</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            A full-size fraction inside a paragraph forces extra space between lines. For a
            sentence, <code>$a/b$</code> often reads better than either size. The rules that decide
            these sizes are explained in{' '}
            <Link href="/learn/display-style-math">display style in LaTeX</Link>.
          </p>

          {/* ── nested ── */}
          <h2>Nested and Continued Fractions</h2>
          <p>
            Each level of nesting drops to a smaller style, so a fraction inside a fraction gets
            hard to read quickly. Use <code>\dfrac</code> for the inner parts, or{' '}
            <code>\cfrac</code> for continued fractions, which keeps every level full size and
            aligned:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\[
  \\frac{1}{1 + \\frac{1}{x}}
  \\qquad
  \\frac{1}{1 + \\dfrac{1}{x}}
\\]
\\[
  \\sqrt{2} = 1 + \\cfrac{1}{2 + \\cfrac{1}{2 + \\cfrac{1}{2 + \\dotsb}}}
\\]
\\[
  \\left( \\frac{a + b}{c} \\right)^{2}
\\]

\\end{document}`}</code></pre>
          <p>
            <code>{`\\cfrac[l]{1}{x}`}</code> and <code>{`\\cfrac[r]{1}{x}`}</code> push the
            numerator left or right. Brackets that grow with the fraction come from{' '}
            <code>\left</code> and <code>\right</code>; see the{' '}
            <Link href="/learn/brackets">brackets guide</Link>.
          </p>

          {/* ── binomials ── */}
          <h2>Binomial Coefficients: \binom</h2>
          <p>
            <code>{`\\binom{n}{k}`}</code> from <code>amsmath</code> prints &ldquo;n choose k&rdquo;
            in parentheses with no line. It follows the same size rules as <code>\frac</code>, with{' '}
            <code>\dbinom</code> and <code>\tbinom</code> to force a size:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

There are $\\binom{5}{2} = 10$ ways to choose 2 items from 5.
\\[
  (x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^{k}
  \\qquad
  \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}
\\]

\\end{document}`}</code></pre>
          <p>
            Plain TeX writes the same thing as <code>{`{n \\choose k}`}</code>. It still prints,
            but it takes everything in the surrounding group as its arguments, and with{' '}
            <code>amsmath</code> loaded it logs a &ldquo;Foreign command \atopwithdelims&rdquo;
            warning; prefer <code>\binom</code>.
          </p>

          {/* ── genfrac ── */}
          <h2>Fractions Without a Line: \genfrac</h2>
          <p>
            <code>\genfrac</code> is the general command behind <code>\frac</code> and{' '}
            <code>\binom</code>. Its six arguments are the left delimiter, the right delimiter, the
            rule thickness, the size (0 display, 1 text, 2 script, 3 scriptscript, empty for
            automatic), the numerator and the denominator:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\newcommand{\\stack}[2]{\\genfrac{}{}{0pt}{}{#1}{#2}}
\\begin{document}

\\[
  \\genfrac{}{}{0pt}{}{a}{b}        % no line
  \\qquad
  \\genfrac{[}{]}{0pt}{}{n}{k}     % Stirling-style brackets
  \\qquad
  \\genfrac{}{}{1pt}{0}{a}{b}      % thick line, display size
  \\qquad
  \\stack{i < n}{j < m}
\\]
\\[
  \\sum_{\\substack{0 \\le i \\le m \\\\ 0 < j < n}} P(i, j)
\\]

\\end{document}`}</code></pre>
          <p>
            The plain TeX <code>{`{a \\atop b}`}</code> also stacks without a line, but with{' '}
            <code>amsmath</code> loaded it triggers a &ldquo;Foreign command \atop&rdquo; warning.
            For conditions under a sum, <code>\substack</code> is the clearer choice.
          </p>

          {/* ── text mode ── */}
          <h2>Fractions in Text: \sfrac, nicefrac and ½</h2>
          <p>
            <code>\frac</code> outside math mode is an error. In running text, choose between a
            slash, a slanted fraction from <code>xfrac</code>, or a ready-made symbol:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{xfrac}
\\begin{document}

Add \\sfrac{1}{2} cup of sugar and \\sfrac{3}{4} cup of flour.

In math too: $\\sfrac{a}{b}$, or a plain slash: $a/b$.

Ready-made symbols: \\textonehalf, \\textonequarter, \\textthreequarters.

\\end{document}`}</code></pre>
          <p>
            The older <code>nicefrac</code> package offers <code>{`\\nicefrac{1}{2}`}</code> with a
            similar look. For units such as m/s, a slash or the <code>siunitx</code> package is
            more common than any fraction.
          </p>

          {/* ── Mistakes ── */}
          <h2>Common Mistakes</h2>
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
                  <td><code>\frac</code> or <code>\binom</code> outside math mode</td>
                  <td>Wrap it in <code>$...$</code>, or use <code>\sfrac</code> in text</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\dfrac</code>, <code>\tfrac</code> or <code>\binom</code></td>
                  <td><code>amsmath</code> not loaded</td>
                  <td><code>{`\\usepackage{amsmath}`}</code></td>
                </tr>
                <tr>
                  <td><code>\frac123</code> prints &frac12; followed by 3</td>
                  <td>Braces dropped, so each argument is one character</td>
                  <td><code>{`\\frac{12}{3}`}</code> or <code>{`\\frac{1}{23}`}</code></td>
                </tr>
                <tr>
                  <td>Tiny inner fraction in a nested fraction</td>
                  <td>Each level drops one style</td>
                  <td><code>\dfrac</code> inside, or <code>\cfrac</code></td>
                </tr>
                <tr>
                  <td>Uneven line spacing around an inline fraction</td>
                  <td><code>\dfrac</code> or a tall fraction in a paragraph</td>
                  <td><code>\frac</code>, <code>\tfrac</code> or <code>a/b</code></td>
                </tr>
                <tr>
                  <td><em>Package amsmath Warning: Foreign command \over</em></td>
                  <td>Plain TeX <code>\over</code>, <code>\atop</code> or <code>\choose</code> with amsmath</td>
                  <td><code>\frac</code> or <code>\genfrac</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is the difference between \frac, \dfrac and \tfrac?</h3>
          <p>
            <code>\frac</code> picks its size from the surroundings: small in inline math, full
            size in a display. <code>\dfrac</code> always uses the full display size and{' '}
            <code>\tfrac</code> always uses the small inline size. <code>\dfrac</code> and{' '}
            <code>\tfrac</code> come from the <code>amsmath</code> package.
          </p>
          <h3>How do I write a binomial coefficient (n choose k) in LaTeX?</h3>
          <p>
            Load <code>amsmath</code> and write <code>{`\\binom{n}{k}`}</code>. Like{' '}
            <code>\frac</code> it adapts to inline or display math, and <code>\dbinom</code> and{' '}
            <code>\tbinom</code> force the display or inline size. The plain TeX form{' '}
            <code>{`{n \\choose k}`}</code> also works but is not recommended in LaTeX documents.
          </p>
          <h3>How do I write a continued fraction in LaTeX?</h3>
          <p>
            Use <code>\cfrac</code> from <code>amsmath</code> and nest it:{' '}
            <code>{`1 + \\cfrac{1}{2 + \\cfrac{1}{2 + \\dotsb}}`}</code>. Unlike nested{' '}
            <code>\frac</code>, every level stays full size and the denominators line up.{' '}
            <code>\cfrac[l]</code> and <code>\cfrac[r]</code> set the numerator flush left or
            right.
          </p>
          <h3>Why does {'{n \\choose k}'} give a warning in LaTeX?</h3>
          <p>
            <code>\choose</code>, <code>\atop</code> and <code>\over</code> are plain TeX
            commands. <code>amsmath</code> logs &ldquo;Foreign command \atopwithdelims&rdquo; (or{' '}
            <code>\atop</code>, <code>\over</code>) for them, and they take everything in the
            surrounding group as their arguments, which is easy to get wrong. Replace{' '}
            <code>{`{n \\choose k}`}</code> with <code>{`\\binom{n}{k}`}</code> and{' '}
            <code>{`{a \\over b}`}</code> with <code>{`\\frac{a}{b}`}</code>.
          </p>
          <h3>Why is a fraction inside another fraction so small?</h3>
          <p>
            Each level of a fraction drops one math style: in a display the parts of a fraction
            are set in text style, and a fraction inside them in script style. Write the inner one
            as <code>\dfrac</code> to keep it full size, or use <code>\cfrac</code> for continued
            fractions.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Inline and display math, roots and amsmath</li>
            <li><Link href="/learn/display-style-math">Display Style in Math</Link> &ndash; \displaystyle, \textstyle and why inline fractions shrink</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses</Link> &ndash; \left and \right around tall fractions</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; \sum, \int and stacked limits</li>
            <li><Link href="/learn/derivative-rules">Derivative Rules</Link> &ndash; Fractions in every derivative formula</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a formula and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="fraction" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write math faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe a formula in words and Octree&apos;s AI writes the LaTeX, picks the right
              fraction size and fixes math-mode errors, with the PDF compiled next to your code.
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
