import type { Metadata } from 'next/types'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Integrals, Sums & Limits', 'integrals-sums-limits')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function IntegralsSumsLimitsPage() {
  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <h1>Integrals, Sums and Limits in LaTeX</h1>
          <p className="lead">
            Integrals, summations, and limits are cornerstone math constructs used throughout
            calculus, analysis, and applied mathematics. LaTeX provides powerful commands for
            typesetting each of these with precise control over notation, bounds placement,
            and display style.
          </p>

          {/* ---- Basic Integrals ---- */}
          <h2>Basic Integrals</h2>
          <p>
            The <code>\int</code> command produces the integral sign. You can add lower and upper
            bounds with subscript and superscript syntax to create definite integrals, or omit
            them for indefinite integrals.
          </p>
          <pre><code>{`% Indefinite integral
$\\int f(x) \\, dx$

% Definite integral from a to b
$\\int_a^b f(x) \\, dx$

% Display-style definite integral
\\[
  \\int_0^\\infty e^{-x} \\, dx = 1
\\]

% Definite integral with evaluated bounds
\\[
  \\int_0^1 x^2 \\, dx = \\left[ \\frac{x^3}{3} \\right]_0^1 = \\frac{1}{3}
\\]`}</code></pre>
          <p>
            The thin space <code>\,</code> before <code>dx</code> is a standard convention that
            improves readability. In inline mode, bounds appear to the side of the integral sign;
            in display mode, they appear above and below.
          </p>

          {/* ---- Multiple Integrals ---- */}
          <h2>Multiple Integrals</h2>
          <p>
            LaTeX and the <code>amsmath</code> package provide commands for double, triple, and
            contour integrals. These are essential for multivariable calculus, physics, and
            engineering.
          </p>
          <pre><code>{`\\usepackage{amsmath}

% Double integral
\\[
  \\iint_D f(x,y) \\, dA
\\]

% Triple integral
\\[
  \\iiint_V f(x,y,z) \\, dV
\\]

% Contour integral (closed path)
\\[
  \\oint_C \\mathbf{F} \\cdot d\\mathbf{r}
\\]

% Surface integral
\\[
  \\iint_S \\mathbf{F} \\cdot d\\mathbf{S}
\\]

% Volume integral with specific bounds
\\[
  \\iiint_V \\rho(x,y,z) \\, dx \\, dy \\, dz
\\]`}</code></pre>

          {/* ---- Integral Variations ---- */}
          <h2>Integral Variations</h2>
          <p>
            The following table summarises the integral commands available with the
            <code>amsmath</code> package:
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Output</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\int</code></td>
                <td>Single integral sign</td>
                <td>Standard integral</td>
              </tr>
              <tr>
                <td><code>\iint</code></td>
                <td>Double integral sign</td>
                <td>Double integral (amsmath)</td>
              </tr>
              <tr>
                <td><code>\iiint</code></td>
                <td>Triple integral sign</td>
                <td>Triple integral (amsmath)</td>
              </tr>
              <tr>
                <td><code>\oint</code></td>
                <td>Contour integral sign</td>
                <td>Closed path / contour integral</td>
              </tr>
              <tr>
                <td><code>\oiint</code></td>
                <td>Closed surface integral sign</td>
                <td>Closed surface integral (amsmath / esint)</td>
              </tr>
              <tr>
                <td><code>\idotsint</code></td>
                <td>Integral with dots</td>
                <td>Multiple integral with dots (amsmath)</td>
              </tr>
            </tbody>
          </table>

          {/* ---- Summations ---- */}
          <h2>Summations</h2>
          <p>
            The <code>\sum</code> command typesets the capital sigma used in summation notation.
            Subscripts and superscripts control the lower and upper bounds of the sum.
          </p>
          <pre><code>{`% Basic summation
$\\sum_{i=1}^{n} a_i$

% Display-style summation
\\[
  \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
\\]

% Double summation
\\[
  \\sum_{i=1}^{m} \\sum_{j=1}^{n} a_{ij}
\\]

% Summation with conditions
\\[
  \\sum_{\\substack{i=1 \\\\ i \\neq j}}^{n} a_i
\\]

% Inline vs display comparison
Inline: $\\sum_{i=1}^{n} x_i$ places limits to the side.

Display:
\\[
  \\sum_{i=1}^{n} x_i \\quad \\text{places limits above and below.}
\\]`}</code></pre>
          <p>
            In inline mode LaTeX places the bounds to the right of the sigma to keep the line
            height compact. In display mode (between <code>\[</code> and <code>\]</code> or
            inside <code>equation</code>), limits appear above and below by default.
          </p>

          {/* ---- Products ---- */}
          <h2>Products</h2>
          <p>
            The <code>\prod</code> command renders the product symbol (capital pi). It works
            exactly like <code>\sum</code> for bound placement.
          </p>
          <pre><code>{`% Basic product
$\\prod_{i=1}^{n} a_i$

% Display-style product
\\[
  \\prod_{i=1}^{n} i = n!
\\]

% Factorial definition
\\[
  n! = \\prod_{k=1}^{n} k
\\]

% Infinite product
\\[
  \\prod_{n=1}^{\\infty} \\left(1 - \\frac{x^2}{n^2 \\pi^2}\\right) = \\frac{\\sin x}{x}
\\]`}</code></pre>

          {/* ---- Limits ---- */}
          <h2>Limits</h2>
          <p>
            The <code>\lim</code> command typesets the &quot;lim&quot; operator in upright Roman text
            with the subscript expression placed below (in display mode) or beside (inline).
          </p>
          <pre><code>{`% Basic limit
$\\lim_{x \\to a} f(x)$

% Limit at infinity
\\[
  \\lim_{x \\to \\infty} \\frac{1}{x} = 0
\\]

% One-sided limits
\\[
  \\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty
  \\qquad
  \\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty
\\]

% Limit superior and limit inferior
\\[
  \\limsup_{n \\to \\infty} a_n
  \\qquad
  \\liminf_{n \\to \\infty} a_n
\\]

% Limit definition of derivative
\\[
  f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}
\\]

% Limit definition of e
\\[
  e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n
\\]`}</code></pre>

          {/* ---- Controlling Limits Placement ---- */}
          <h2>Controlling Limits Placement</h2>
          <p>
            By default, LaTeX places limits above/below big operators in display mode and
            to the side in inline mode. You can override this behaviour with <code>\limits</code>,
            <code>\nolimits</code>, and <code>\displaystyle</code>.
          </p>
          <pre><code>{`% Force limits above/below in inline mode
$\\sum\\limits_{i=1}^{n} a_i$

% Force limits to the side in display mode
\\[
  \\sum\\nolimits_{i=1}^{n} a_i
\\]

% Use displaystyle in inline math
$\\displaystyle \\sum_{i=1}^{n} a_i$

% Force limits on an integral (above/below)
\\[
  \\int\\limits_0^1 f(x) \\, dx
\\]

% Comparison of placements
\\[
  \\sum_{i=1}^{n}          \\quad \\text{(default display)}
  \\qquad
  \\sum\\nolimits_{i=1}^{n} \\quad \\text{(nolimits)}
\\]

% textstyle forces inline behaviour in display
\\[
  \\textstyle \\sum_{i=1}^{n} a_i
  \\quad \\text{vs} \\quad
  \\displaystyle \\sum_{i=1}^{n} a_i
\\]`}</code></pre>
          <p>
            Use <code>\limits</code> sparingly in inline math because it increases the line
            height and can disrupt vertical spacing. When you need full-size operators inside a
            paragraph, prefer <code>\displaystyle</code> instead.
          </p>

          {/* ---- Series and Sequences ---- */}
          <h2>Series and Sequences</h2>
          <p>
            Many important formulas combine sums with limits. Here are common examples including
            Taylor series and Fourier series.
          </p>
          <pre><code>{`% Infinite series (combining sum and limit)
\\[
  \\sum_{n=0}^{\\infty} a_n = \\lim_{N \\to \\infty} \\sum_{n=0}^{N} a_n
\\]

% Taylor series expansion of e^x
\\[
  e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}
      = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots
\\]

% Maclaurin series for sin(x)
\\[
  \\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1)!} x^{2n+1}
\\]

% Fourier series
\\[
  f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty}
    \\left( a_n \\cos\\frac{n\\pi x}{L} + b_n \\sin\\frac{n\\pi x}{L} \\right)
\\]

% Fourier coefficients
\\[
  a_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\cos\\frac{n\\pi x}{L} \\, dx
  \\qquad
  b_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\sin\\frac{n\\pi x}{L} \\, dx
\\]

% Geometric series
\\[
  \\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}, \\quad |r| < 1
\\]`}</code></pre>

          {/* ---- Big Operators Reference ---- */}
          <h2>Big Operators Reference</h2>
          <p>
            LaTeX provides a full family of &quot;big operators&quot; that behave like <code>\sum</code> with
            respect to limits placement. Here is a reference table:
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
                <th>Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\sum</code></td>
                <td>Summation</td>
                <td>Discrete sums</td>
              </tr>
              <tr>
                <td><code>\prod</code></td>
                <td>Product</td>
                <td>Finite / infinite products</td>
              </tr>
              <tr>
                <td><code>\coprod</code></td>
                <td>Coproduct</td>
                <td>Category theory</td>
              </tr>
              <tr>
                <td><code>\bigcup</code></td>
                <td>Big union</td>
                <td>Set theory unions</td>
              </tr>
              <tr>
                <td><code>\bigcap</code></td>
                <td>Big intersection</td>
                <td>Set theory intersections</td>
              </tr>
              <tr>
                <td><code>\bigoplus</code></td>
                <td>Big direct sum</td>
                <td>Linear algebra, module theory</td>
              </tr>
              <tr>
                <td><code>\bigotimes</code></td>
                <td>Big tensor product</td>
                <td>Tensor algebra</td>
              </tr>
              <tr>
                <td><code>\bigvee</code></td>
                <td>Big logical OR</td>
                <td>Logic, lattice theory</td>
              </tr>
              <tr>
                <td><code>\bigwedge</code></td>
                <td>Big logical AND</td>
                <td>Logic, lattice theory</td>
              </tr>
              <tr>
                <td><code>\bigsqcup</code></td>
                <td>Big square union</td>
                <td>Disjoint unions</td>
              </tr>
              <tr>
                <td><code>\biguplus</code></td>
                <td>Big multiset union</td>
                <td>Multiset operations</td>
              </tr>
            </tbody>
          </table>
          <pre><code>{`% Examples of big operators with bounds
\\[
  \\bigcup_{i=1}^{n} A_i
  \\qquad
  \\bigcap_{i=1}^{n} A_i
  \\qquad
  \\bigoplus_{k=1}^{n} V_k
  \\qquad
  \\bigotimes_{k=1}^{n} W_k
\\]`}</code></pre>

          {/* ---- Practical Examples ---- */}
          <h2>Practical Examples</h2>
          <p>
            Below are complete, real-world formulas that combine integrals, sums, and limits.
          </p>

          <h3>Gaussian Integral</h3>
          <pre><code>{`\\[
  \\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
\\]`}</code></pre>

          <h3>Euler&apos;s Identity Derivation</h3>
          <pre><code>{`% Start from the Taylor series of e^{ix}
\\[
  e^{ix} = \\sum_{n=0}^{\\infty} \\frac{(ix)^n}{n!}
         = \\underbrace{\\sum_{k=0}^{\\infty} \\frac{(-1)^k x^{2k}}{(2k)!}}_{\\cos x}
         + i\\underbrace{\\sum_{k=0}^{\\infty} \\frac{(-1)^k x^{2k+1}}{(2k+1)!}}_{\\sin x}
\\]

% Setting x = pi gives Euler's identity
\\[
  e^{i\\pi} + 1 = 0
\\]`}</code></pre>

          <h3>Taylor Expansion of ln(1+x)</h3>
          <pre><code>{`\\[
  \\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} x^n
            = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots,
  \\quad |x| \\leq 1
\\]`}</code></pre>

          <h3>Riemann Sum</h3>
          <pre><code>{`% Definition of the Riemann integral as a limit of sums
\\[
  \\int_a^b f(x) \\, dx
  = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*) \\, \\Delta x
\\]

% Where
\\[
  \\Delta x = \\frac{b - a}{n},
  \\qquad
  x_i^* \\in [x_{i-1}, x_i]
\\]`}</code></pre>

          <h3>Laplace Transform</h3>
          <pre><code>{`\\[
  \\mathcal{L}\\{f(t)\\} = \\int_0^{\\infty} e^{-st} f(t) \\, dt
\\]`}</code></pre>

          <h3>Residue Theorem</h3>
          <pre><code>{`\\[
  \\oint_C f(z) \\, dz = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k)
\\]`}</code></pre>

          {/* ---- Common Mistakes ---- */}
          <h2>Common Mistakes</h2>
          <p>
            Here are frequent errors when typesetting integrals, sums, and limits in LaTeX,
            along with corrected versions.
          </p>
          <pre><code>{`% WRONG: Missing thin space before dx
$\\int f(x)dx$
% CORRECT: Add \\, before dx
$\\int f(x) \\, dx$

% WRONG: Using \\limits in inline mode (disrupts line spacing)
The sum $\\sum\\limits_{i=1}^{n} a_i$ is too tall.
% BETTER: Let LaTeX handle inline placement naturally
The sum $\\sum_{i=1}^{n} a_i$ fits the line.

% WRONG: Bare subscript on lim (no \\to)
$\\lim_{x a} f(x)$
% CORRECT: Use \\to for the arrow
$\\lim_{x \\to a} f(x)$

% WRONG: Using \\Sigma instead of \\sum for summation
$\\Sigma_{i=1}^{n}$
% CORRECT: \\sum is a big operator with proper limits
$\\sum_{i=1}^{n}$

% WRONG: Forgetting braces around multi-character bounds
$\\int_0^10$
% CORRECT: Wrap multi-character exponents in braces
$\\int_0^{10}$

% WRONG: Missing \\left and \\right for tall delimiters
$[\\frac{x^2}{2}]_0^1$
% CORRECT: Auto-sizing delimiters
$\\left[\\frac{x^2}{2}\\right]_0^1$`}</code></pre>

          {/* ---- Next Steps ---- */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Equations, fractions, and core math typesetting</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> – Complete symbol reference for scientific writing</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> – Typeset matrices, determinants, and systems of equations</li>
            <li><Link href="/learn/latex">Learn LaTeX Basics</Link> – Review the fundamentals</li>
          </ul>

          {/* ---- Free LaTeX Tools ---- */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your integrals, sums, and limits with live preview</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-equation-editor" target="_blank" rel="noopener noreferrer">LaTeX Equation Editor</Link> – Write and preview math equations visually</li>
            <li><Link href="https://tools.useoctree.com/tools/image-to-latex" target="_blank" rel="noopener noreferrer">Image to LaTeX</Link> – Convert handwritten or printed math to LaTeX code</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX calculus" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write LaTeX math faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI-powered editor helps you write integrals, sums, and complex
              mathematical notation without memorising every command.
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
  return {
    title: 'Integrals, Sums and Limits in LaTeX – Guide 2026',
    description: 'Learn how to write integrals, summations, and limits in LaTeX. Guide covers definite integrals, multiple integrals, summation notation, products, limits, and big operator placement.',
    keywords: 'latex integral, latex sum, latex limit, latex summation, latex product, latex double integral, latex triple integral, latex contour integral, latex lim, latex infty, latex series, latex sigma notation, latex big operators',
    openGraph: mergeOpenGraph({
      title: 'Integrals, Sums and Limits in LaTeX – Guide 2026',
      description: 'Complete guide to integrals, summations, and limits in LaTeX.',
      type: 'article',
      url: '/learn/integrals-sums-limits',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Integrals, Sums and Limits in LaTeX',
      description: 'Learn to write integrals, sums, and limits in LaTeX with examples.',
    },
    alternates: {
      canonical: '/learn/integrals-sums-limits',
    },
  }
}
