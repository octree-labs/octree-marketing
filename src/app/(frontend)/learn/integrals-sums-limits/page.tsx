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

const breadcrumbs = getLearnBreadcrumbs('Integrals, Sums & Limits', 'integrals-sums-limits')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'integrals-sums-limits',
  title: 'Integrals, Sums and Limits in LaTeX: \\int, \\sum, \\lim and \\partial',
  seoTitle: 'Integrals, Sums and Limits in LaTeX',
  description: 'Integrals, sums and limits in LaTeX: the sum symbol Σ with \\sum, \\int and multiple integrals, \\lim and \\limits, partial derivatives with \\partial and ∇.',
  keywords: 'latex integral, latex sum, sum symbol, sigma notation latex, latex sigma, latex summation, latex limit, latex product, latex double integral, latex triple integral, latex contour integral, latex partial derivative, partial symbol, latex partial, latex nabla, latex gradient, latex lim, latex infty, latex series, latex big operators, latex limits nolimits, latex substack, latex mathop, latex dx upright, sum latex, summation latex, latex sum symbol, latex sum notation, integral latex, latex integral symbol, latex definite integral, latex indefinite integral, limit latex, latex limsup liminf, integrals sums and limits latex, latex fundamental theorem of calculus, latex derivative d dx',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I write the sum symbol Σ in LaTeX?',
    answer:
      'Use \\sum in math mode, with the index and bounds as subscript and superscript: $\\sum_{i=1}^{n} a_i$. Do not use \\Sigma, which is the plain Greek capital letter and does not take limits above and below.',
  },
  {
    question: 'How do I put the limits above and below the sum in inline text?',
    answer:
      'Inline math sets the bounds beside the Σ to keep the line compact. Write $\\sum\\limits_{i=1}^{n} a_i$ to force them above and below, or $\\displaystyle\\sum_{i=1}^{n} a_i$ for a full-size operator. In display math (\\[...\\]) the bounds are stacked by default.',
  },
  {
    question: 'How do I write a partial derivative in LaTeX?',
    answer:
      'The partial symbol ∂ is \\partial. A first partial derivative is \\frac{\\partial f}{\\partial x}, a second is \\frac{\\partial^2 f}{\\partial x^2}, and a mixed one is \\frac{\\partial^2 f}{\\partial x\\, \\partial y}. The physics package shortens this to \\pdv{f}{x}.',
  },
  {
    question: 'How do I write an integral with bounds in LaTeX?',
    answer:
      'Write $\\int_a^b f(x)\\,\\mathrm{d}x$. The subscript is the lower bound, the superscript the upper, and \\, puts a thin space before dx. \\iint and \\iiint from amsmath give double and triple integrals, \\oint a contour integral.',
  },
  {
    question: 'Should dx be upright or italic?',
    answer:
      'Both are common. ISO 80000-2 asks for an upright d, written \\mathrm{d}x; most mathematics journals accept italic dx. Define \\newcommand{\\dd}{\\mathrm{d}} once and use \\dd x everywhere so the choice is easy to change.',
  },
  {
    question: 'How do I write a limit in LaTeX?',
    answer:
      'Use \\lim with the condition in a subscript: $\\lim_{x \\to 0} f(x)$. \\to gives the arrow. In display math the subscript sits below "lim"; inline it goes to the side unless you add \\limits.',
  },
]

export default async function IntegralsSumsLimitsPage() {
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
          <h1>Integrals, Sums and Limits in LaTeX: \int, \sum, \lim and \partial</h1>
          <p className="lead">
            The integral sign is <code>\int</code>, the sum symbol Σ is <code>\sum</code>, a
            limit is <code>\lim</code>, and the partial symbol ∂ is <code>\partial</code>. Bounds
            and indices go in subscripts and superscripts: <code>{`$\\int_a^b f(x)\\,dx$`}</code>,{' '}
            <code>{`$\\sum_{i=1}^{n} a_i$`}</code>, <code>{`$\\lim_{x \\to 0} f(x)$`}</code>. This
            guide explains sigma notation and the <code>\sum</code> family, single and multiple
            integrals, limits, where the bounds go (<code>\limits</code>, <code>\nolimits</code>,{' '}
            <code>\displaystyle</code>), partial derivatives and the nabla operator, upright
            differentials, series, the big-operator family, and the usual mistakes.
          </p>

          <table>
            <thead>
              <tr>
                <th>You want</th>
                <th>Write</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Sum from 1 to n</td><td><code>{`$\\sum_{i=1}^{n} a_i$`}</code></td></tr>
              <tr><td>Definite integral</td><td><code>{`$\\int_a^b f(x)\\,\\mathrm{d}x$`}</code></td></tr>
              <tr><td>Limit</td><td><code>{`$\\lim_{x \\to \\infty} f(x)$`}</code></td></tr>
              <tr><td>Partial derivative</td><td><code>{`$\\frac{\\partial f}{\\partial x}$`}</code></td></tr>
              <tr><td>Product</td><td><code>{`$\\prod_{k=1}^{n} k$`}</code></td></tr>
              <tr><td>Double integral</td><td><code>{`$\\iint_D f\\,\\mathrm{d}A$`}</code></td></tr>
              <tr><td>Bounds above/below inline</td><td><code>{`$\\sum\\limits_{i=1}^{n}$`}</code></td></tr>
            </tbody>
          </table>

          {/* ---- Sum symbol ---- */}
          <h2>Sum Symbol Σ: Meaning and LaTeX</h2>
          <p>
            The capital Greek letter sigma, Σ, stands for &ldquo;sum&rdquo;. In sigma notation
            the small expression under the symbol names an index variable and its starting
            value, the expression above gives the final value, and the expression to the right
            is added up once for every value of the index. Whether you call it the sum symbol,
            a summation or sigma notation, the LaTeX is the same. So{' '}
            <code>{`\\sum_{i=1}^{5} i^2`}</code> means 1² + 2² + 3² + 4² + 5² = 55. In LaTeX the
            operator is <code>\sum</code>; the lower bound is a subscript and the upper bound a
            superscript:
          </p>
          <pre><code>{`% Sigma notation: index i runs from 1 to n
$\\sum_{i=1}^{n} a_i$

% Expanded
\\[
  \\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
\\]

% Closed forms
\\[
  \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
  \\qquad
  \\sum_{k=0}^{\\infty} \\frac{1}{2^k} = 2
\\]

% Bounds can be conditions or sets rather than numbers
\\[
  \\sum_{i \\in S} x_i \\qquad
  \\sum_{n \\geq 1} \\frac{1}{n^2} \\qquad
  \\sum_{1 \\le i < j \\le n} a_i a_j \\qquad
  \\sum_{i} a_i \\qquad \\sum a_i
\\]

% Mean and variance in sigma notation
\\[
  \\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i
  \\qquad
  \\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2
\\]`}</code></pre>
          <p>
            Use <code>\sum</code>, not <code>\Sigma</code>. <code>\Sigma</code> is the ordinary
            Greek letter (used for a covariance matrix or an alphabet) and is set at text height
            with its scripts beside it; <code>\sum</code> is a big operator that grows in display
            math and stacks its bounds. The lowercase <code>\sigma</code> is a different symbol
            again (standard deviation). The{' '}
            <Link href="https://www.useoctree.com/blog/sigma-symbol-meaning-uses-how-to-type">
              sigma symbol post on our blog
            </Link>{' '}
            covers its meanings and how to type Σ outside LaTeX, and the{' '}
            <Link href="https://tools.useoctree.com/symbols/summation" target="_blank" rel="noopener noreferrer">
              summation symbol page
            </Link>{' '}
            has the copy-paste variants.
          </p>

          <h3>Inline sums: \limits and \displaystyle</h3>
          <p>
            In inline mode LaTeX places the bounds to the right of the sigma to keep the line
            height compact. In display mode (between <code>\[</code> and <code>\]</code> or inside{' '}
            <code>equation</code>), limits appear above and below by default. Two commands
            override this:
          </p>
          <pre><code>{`Inline: $\\sum_{i=1}^{n} x_i$ puts the bounds to the side.

Stacked bounds inline: $\\sum\\limits_{i=1}^{n} x_i$

Full display size inline: $\\displaystyle\\sum_{i=1}^{n} x_i$

Display:
\\[
  \\sum_{i=1}^{n} x_i          % bounds above and below
  \\qquad
  \\sum\\nolimits_{i=1}^{n} x_i % bounds to the side
  \\qquad
  \\textstyle\\sum_{i=1}^{n} x_i % whole thing at inline size
\\]`}</code></pre>

          <h3>Double sums and conditions with \substack</h3>
          <pre><code>{`% Double summation
\\[
  \\sum_{i=1}^{m} \\sum_{j=1}^{n} a_{ij}
  \\qquad
  \\sum_{i,j} a_{ij}
\\]

% Several lines of conditions under one sigma (amsmath)
\\[
  \\sum_{\\substack{i=1 \\\\ i \\neq j}}^{n} a_i
  \\qquad
  \\sum_{\\substack{0 \\le i \\le m \\\\ 0 < j < n}} P(i,j)
  \\qquad
  \\sum_{\\substack{p \\text{ prime} \\\\ p \\le x}} \\frac{1}{p}
\\]`}</code></pre>

          <h3>Products, coproducts, unions and intersections</h3>
          <p>
            Every big operator works exactly like <code>\sum</code>: <code>\prod</code> is the
            product Π, <code>\coprod</code> the coproduct, <code>\bigcup</code> and{' '}
            <code>\bigcap</code> the union and intersection of a family of sets.
          </p>
          <pre><code>{`\\[
  \\prod_{i=1}^{n} a_i
  \\qquad
  n! = \\prod_{k=1}^{n} k
  \\qquad
  \\coprod_{i \\in I} X_i
\\]
\\[
  \\bigcup_{i=1}^{n} A_i
  \\qquad
  \\bigcap_{i=1}^{n} A_i
  \\qquad
  \\bigsqcup_{i} X_i
  \\qquad
  \\bigoplus_{k} V_k
\\]

% Infinite product
\\[
  \\prod_{n=1}^{\\infty} \\left(1 - \\frac{x^2}{n^2 \\pi^2}\\right) = \\frac{\\sin x}{x}
\\]`}</code></pre>

          <h3>Your own operators with \mathop and \DeclareMathOperator*</h3>
          <p>
            <code>\mathop</code> turns any symbol or word into an operator that takes limits, and
            amsmath&apos;s <code>\DeclareMathOperator*</code> (note the star) does the same with
            an upright name defined once in the preamble:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\DeclareMathOperator*{\\argmin}{arg\\,min}   % preamble

\\[
  \\argmin_{x} f(x)
  \\qquad
  \\operatorname*{argmax}_{x} f(x)          % one-off version
  \\qquad
  \\mathop{\\mathrm{E}}_{x \\sim p}[f(x)]
  \\qquad
  \\mathop{\\sum\\sum}_{i,j} a_{ij}          % one shared subscript under two sigmas
\\]`}</code></pre>

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
\\]

% The thin space before dx, with and without
$\\int f(x)\\,dx$   % correct
$\\int f(x)dx$      % too tight: f(x) runs into dx`}</code></pre>
          <p>
            The thin space <code>\,</code> before <code>dx</code> is a standard convention that
            improves readability. Unlike <code>\sum</code>, an integral keeps its bounds beside
            the sign even in display mode; <code>\int\limits</code> stacks them, as shown below.
          </p>

          {/* ---- Multiple Integrals ---- */}
          <h2>Multiple Integrals: \iint, \iiint, \oint, \idotsint</h2>
          <p>
            The <code>amsmath</code> package provides commands for double, triple, and
            contour integrals with correctly tightened spacing between the signs. These are
            essential for multivariable calculus, physics, and engineering.
          </p>
          <pre><code>{`\\usepackage{amsmath}

% Double integral
\\[
  \\iint_D f(x,y) \\, \\mathrm{d}A
\\]

% Triple integral
\\[
  \\iiint_V f(x,y,z) \\, \\mathrm{d}V
\\]

% Contour integral (closed path)
\\[
  \\oint_C \\mathbf{F} \\cdot \\mathrm{d}\\mathbf{r}
\\]

% n-fold integral with dots
\\[
  \\idotsint_{\\Omega} f \\, \\mathrm{d}x_1 \\cdots \\mathrm{d}x_n
\\]

% Separate bounds on each sign: two \\int with a negative space between
\\[
  \\int_{0}^{1}\\!\\!\\int_{0}^{1} f(x,y) \\, \\mathrm{d}x \\, \\mathrm{d}y
  \\qquad
  \\int_0^\\infty \\int_0^\\infty e^{-(x^2+y^2)} \\, \\mathrm{d}x \\, \\mathrm{d}y = \\frac{\\pi}{4}
\\]

% Bounds under the sign with \\limits
\\[
  \\int\\limits_0^1 f(x) \\, \\mathrm{d}x
  \\qquad
  \\iint\\limits_D f \\, \\mathrm{d}A
\\]`}</code></pre>

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
                <td><code>\iiiint</code></td>
                <td>Quadruple integral sign</td>
                <td>Four-fold integral (amsmath)</td>
              </tr>
              <tr>
                <td><code>\oint</code></td>
                <td>Contour integral sign</td>
                <td>Closed path / contour integral</td>
              </tr>
              <tr>
                <td><code>\oiint</code></td>
                <td>Closed surface integral sign</td>
                <td>Closed surface integral (esint)</td>
              </tr>
              <tr>
                <td><code>\idotsint</code></td>
                <td>Integral with dots</td>
                <td>n-fold integral (amsmath)</td>
              </tr>
              <tr>
                <td><code>\int\limits</code></td>
                <td>Bounds above and below</td>
                <td>Works on every integral sign</td>
              </tr>
            </tbody>
          </table>

          {/* ---- Differentials ---- */}
          <h2>Upright Differentials: \mathrm&#123;d&#125;x and \,</h2>
          <p>
            The &ldquo;d&rdquo; in <em>dx</em> is an operator, not a variable, and ISO 80000-2
            asks for it to be upright: <code>{`\\mathrm{d}x`}</code>. Many mathematics journals
            are happy with italic <code>dx</code>. Whichever you choose, put a thin space{' '}
            <code>\,</code> between the integrand and the differential, and define a macro so the
            choice is made once:
          </p>
          <pre><code>{`% Italic d (traditional) vs upright d (ISO)
\\[
  \\int f(x) \\, dx
  \\qquad
  \\int f(x) \\, \\mathrm{d}x
  \\qquad
  \\frac{dy}{dx}
  \\qquad
  \\frac{\\mathrm{d}y}{\\mathrm{d}x}
\\]

% Define it once
\\newcommand{\\dd}{\\mathrm{d}}
\\[
  \\int_0^1 f(x) \\, \\dd x
  \\qquad
  \\frac{\\dd y}{\\dd x}
  \\qquad
  \\frac{\\dd^2 y}{\\dd x^2}
  \\qquad
  \\dd s^2 = \\dd x^2 + \\dd y^2
\\]`}</code></pre>
          <p>
            The <code>physics</code> package defines its own <code>\dd</code>, which inserts the
            thin space for you (<code>{`\\dd{x}`}</code>, <code>{`\\dd[3]{x}`}</code> for d³x), plus{' '}
            <code>\dv</code> and <code>\pdv</code> for derivatives. Two caveats: your own{' '}
            <code>\newcommand&#123;\dd&#125;</code> will clash with it, and <code>physics</code>{' '}
            redefines some common commands (<code>\div</code> becomes divergence, and it conflicts
            with <code>siunitx</code>&apos;s <code>\qty</code>). The newer <code>derivative</code>{' '}
            package offers <code>\odv</code>, <code>\pdv</code> and <code>\odif</code> without those
            side effects.
          </p>

          {/* ---- Partial derivatives ---- */}
          <h2>Partial Derivatives and the ∂ Symbol</h2>
          <p>
            The partial symbol ∂ is <code>\partial</code>. A partial derivative is a fraction with{' '}
            <code>\partial</code> in both parts; the order goes on the top <code>\partial</code>{' '}
            and on the variable below, and mixed partials list the variables with a thin space:
          </p>
          <pre><code>{`% First and second partial derivatives
\\[
  \\frac{\\partial f}{\\partial x}
  \\qquad
  \\frac{\\partial^2 f}{\\partial x^2}
  \\qquad
  \\frac{\\partial^{n} f}{\\partial x^{n}}
\\]

% Mixed partials
\\[
  \\frac{\\partial^2 f}{\\partial x\\, \\partial y}
  \\qquad
  \\frac{\\partial^3 f}{\\partial x\\, \\partial y\\, \\partial z}
\\]

% Operator form, subscript shorthand, evaluation at a point
\\[
  \\frac{\\partial}{\\partial t} u(x,t)
  \\qquad
  \\partial_x f \\qquad f_x \\qquad f_{xy}
  \\qquad
  \\left.\\frac{\\partial f}{\\partial x}\\right|_{x=0}
  \\qquad
  \\left(\\frac{\\partial f}{\\partial x}\\right)_{y}   % thermodynamics: y held fixed
\\]

% The boundary of a region also uses \\partial
\\[
  \\oint_{\\partial \\Omega} \\mathbf{F} \\cdot \\mathrm{d}\\mathbf{r}
\\]`}</code></pre>

          <h3>Nabla: gradient, divergence, curl and Laplacian</h3>
          <p>
            The nabla operator ∇ is <code>\nabla</code>. Gradient, divergence and curl are written
            with <code>\nabla</code> and the vector products, or with upright operator names:
          </p>
          <pre><code>{`\\[
  \\nabla f = \\left( \\frac{\\partial f}{\\partial x},
                     \\frac{\\partial f}{\\partial y},
                     \\frac{\\partial f}{\\partial z} \\right)
  \\qquad \\text{gradient}
\\]
\\[
  \\nabla \\cdot \\mathbf{F} \\quad \\text{divergence}
  \\qquad
  \\nabla \\times \\mathbf{F} \\quad \\text{curl}
  \\qquad
  \\nabla^2 f = \\Delta f \\quad \\text{Laplacian}
\\]

% Named operators (upright)
\\[
  \\operatorname{grad} f \\qquad
  \\operatorname{div} \\mathbf{F} \\qquad
  \\operatorname{curl} \\mathbf{F}
\\]

% Bold or arrowed nabla when vectors are bold
$\\boldsymbol{\\nabla} f$ (amsmath) \\quad $\\vec{\\nabla} f$`}</code></pre>

          <h3>The physics package shortcuts</h3>
          <pre><code>{`\\usepackage{physics}

\\[
  \\dv{f}{x} \\qquad \\dv[2]{f}{x}         % ordinary derivatives
  \\qquad
  \\pdv{f}{x} \\qquad \\pdv[2]{f}{x} \\qquad \\pdv{f}{x}{y}   % partial, second, mixed
  \\qquad
  \\grad f \\qquad \\div \\vb{F} \\qquad \\curl \\vb{F} \\qquad \\laplacian f
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
            paragraph, prefer <code>\displaystyle</code> instead. To make every integral in the
            document stack its bounds, load amsmath with the <code>intlimits</code> option; the{' '}
            <code>nosumlimits</code> option does the reverse for sums.
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
                <td>Summation Σ</td>
                <td>Discrete sums, sigma notation</td>
              </tr>
              <tr>
                <td><code>\prod</code></td>
                <td>Product Π</td>
                <td>Finite / infinite products</td>
              </tr>
              <tr>
                <td><code>\coprod</code></td>
                <td>Coproduct</td>
                <td>Category theory</td>
              </tr>
              <tr>
                <td><code>\int</code>, <code>\iint</code>, <code>\oint</code></td>
                <td>Integrals</td>
                <td>Bounds beside the sign unless <code>\limits</code></td>
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
              <tr>
                <td><code>\lim</code>, <code>\max</code>, <code>\min</code>, <code>\sup</code>, <code>\inf</code></td>
                <td>Named operators that take limits</td>
                <td>Analysis</td>
              </tr>
              <tr>
                <td><code>\mathop&#123;...&#125;</code></td>
                <td>Make anything a limit-taking operator</td>
                <td>Custom operators</td>
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

          <h3>Fundamental Theorem of Calculus</h3>
          <pre><code>{`% Evaluation form
\\[
  \\int_a^b f'(x) \\, dx = f(b) - f(a)
\\]

% Derivative of an integral with a variable upper bound
\\[
  \\frac{d}{dx} \\int_a^x f(t) \\, dt = f(x)
\\]`}</code></pre>

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

          <h3>Heat Equation</h3>
          <pre><code>{`\\[
  \\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u
  = \\alpha \\left( \\frac{\\partial^2 u}{\\partial x^2}
                  + \\frac{\\partial^2 u}{\\partial y^2} \\right)
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
$\\left[\\frac{x^2}{2}\\right]_0^1$

% WRONG: the letter d as a partial
$\\frac{d f}{d x}$ for a function of two variables
% CORRECT
$\\frac{\\partial f}{\\partial x}$

% WRONG: two conditions with \\\\ outside \\substack
$\\sum_{i=1 \\\\ i \\ne j}$     % no error, but the line breaks inside the formula
% CORRECT
$\\sum_{\\substack{i=1 \\\\ i \\ne j}}$`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Undefined control sequence \iint</em> / <em>\substack</em> / <em>\idotsint</em></td>
                <td>amsmath not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \dv</em> / <em>\pdv</em> / <em>\oiint</em></td>
                <td>physics (for <code>\dv</code>, <code>\pdv</code>) or esint (for <code>\oiint</code>) not loaded</td>
                <td><code>{`\\usepackage{physics}`}</code> or <code>{`\\usepackage{esint}`}</code></td>
              </tr>
              <tr>
                <td><em>Command \dd already defined</em></td>
                <td>Your <code>\newcommand</code> clashes with physics</td>
                <td>Drop one of them, or use <code>\renewcommand</code></td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em></td>
                <td><code>\sum</code>, <code>\int</code> or <code>\partial</code> used in text</td>
                <td>Wrap in <code>$...$</code> or <code>\[...\]</code></td>
              </tr>
              <tr>
                <td><em>Double superscript</em> / <em>Double subscript</em></td>
                <td>Two bounds on one side, e.g. <code>\sum_i_j</code></td>
                <td><code>{`\\sum_{i,j}`}</code> or <code>\substack</code></td>
              </tr>
              <tr>
                <td><em>Can be used only in preamble</em></td>
                <td><code>\DeclareMathOperator</code> inside the document</td>
                <td>Move it before <code>\begin&#123;document&#125;</code>, or use <code>\operatorname*</code> inline</td>
              </tr>
            </tbody>
          </table>

          {/* ---- FAQ ---- */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write the sum symbol Σ in LaTeX?</h3>
          <p>
            Use <code>\sum</code> in math mode, with the index and bounds as subscript and
            superscript: <code>{`$\\sum_{i=1}^{n} a_i$`}</code>. Do not use <code>\Sigma</code>,
            which is the plain Greek capital letter and does not take limits above and below.
          </p>
          <h3>How do I put the limits above and below the sum in inline text?</h3>
          <p>
            Inline math sets the bounds beside the Σ to keep the line compact. Write{' '}
            <code>{`$\\sum\\limits_{i=1}^{n} a_i$`}</code> to force them above and below, or{' '}
            <code>{`$\\displaystyle\\sum_{i=1}^{n} a_i$`}</code> for a full-size operator. In display
            math (<code>\[...\]</code>) the bounds are stacked by default.
          </p>
          <h3>How do I write a partial derivative in LaTeX?</h3>
          <p>
            The partial symbol ∂ is <code>\partial</code>. A first partial derivative is{' '}
            <code>{`\\frac{\\partial f}{\\partial x}`}</code>, a second is{' '}
            <code>{`\\frac{\\partial^2 f}{\\partial x^2}`}</code>, and a mixed one is{' '}
            <code>{`\\frac{\\partial^2 f}{\\partial x\\, \\partial y}`}</code>. The physics package
            shortens this to <code>{`\\pdv{f}{x}`}</code>.
          </p>
          <h3>How do I write an integral with bounds in LaTeX?</h3>
          <p>
            Write <code>{`$\\int_a^b f(x)\\,\\mathrm{d}x$`}</code>. The subscript is the lower bound,
            the superscript the upper, and <code>\,</code> puts a thin space before dx.{' '}
            <code>\iint</code> and <code>\iiint</code> from amsmath give double and triple
            integrals, <code>\oint</code> a contour integral.
          </p>
          <h3>Should dx be upright or italic?</h3>
          <p>
            Both are common. ISO 80000-2 asks for an upright d, written{' '}
            <code>{`\\mathrm{d}x`}</code>; most mathematics journals accept italic <code>dx</code>.
            Define <code>{`\\newcommand{\\dd}{\\mathrm{d}}`}</code> once and use <code>\dd x</code>{' '}
            everywhere so the choice is easy to change.
          </p>
          <h3>How do I write a limit in LaTeX?</h3>
          <p>
            Use <code>\lim</code> with the condition in a subscript:{' '}
            <code>{`$\\lim_{x \\to 0} f(x)$`}</code>. <code>\to</code> gives the arrow. In display
            math the subscript sits below &ldquo;lim&rdquo;; inline it goes to the side unless you
            add <code>\limits</code>.
          </p>

          {/* ---- Next Steps ---- */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Equations, fractions, inline vs display math and core math typesetting</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> – The <code>^</code> and <code>_</code> syntax behind every bound and index</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> – Σ, Π, ∂, ∇ and the rest of the symbol reference</li>
            <li><Link href="/learn/math-functions">Math Functions in LaTeX</Link> – \sin, \log, \exp and defining operators with \DeclareMathOperator</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> – Typeset matrices, determinants, and systems of equations</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering &amp; Referencing</Link> – Number and reference the displays above with \label, \eqref and align</li>
            <li><Link href="https://www.useoctree.com/blog/sigma-symbol-meaning-uses-how-to-type">The sigma symbol: meaning, uses and how to type it</Link> – Σ and σ outside LaTeX</li>
          </ul>

          {/* ---- Free LaTeX Tools ---- */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your integrals, sums, and limits with live preview</li>
            <li><Link href="https://tools.useoctree.com/symbols/summation" target="_blank" rel="noopener noreferrer">Summation Symbol</Link> – Copy Σ and the LaTeX for every summation variant</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX Converter</Link> – Turn handwritten or typed math into LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Describe a formula in words and get the LaTeX</li>
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
  return learnMetadata(page)
}
