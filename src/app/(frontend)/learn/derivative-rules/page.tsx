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

const breadcrumbs = getLearnBreadcrumbs('Derivative Rules', 'derivative-rules')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'derivative-rules',
  title: 'Derivative Rules: Power, Product, Quotient, Chain, Trig and Inverse Trig Derivatives',
  seoTitle: 'Derivative Rules: Trig, Inverse Trig + LaTeX',
  description: 'Derivative rules with LaTeX source: power, product, quotient and chain, a table of trig derivatives, the six inverse trig derivatives and worked examples.',
  keywords: 'derivative rules, trig derivatives, inverse trig derivatives, derivative of arcsin, derivative of arccos, derivative of arctan, derivative of arcsec, derivative of arccsc, derivative of arccot, power rule, product rule, quotient rule, chain rule, derivative of sin, derivative of cos, derivative of tan, derivative of sec, derivative of ln x, derivative of e^x, derivative of a^x, derivative table, differentiation rules, derivative latex, frac d dx latex, physics package dv',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-19'

const faq: FaqItem[] = [
  {
    question: 'What are the basic derivative rules?',
    answer:
      'Seven rules cover almost everything: the constant rule (a constant differentiates to 0), the constant multiple rule (pull the constant out), the sum and difference rule (differentiate term by term), the power rule d/dx xⁿ = n xⁿ⁻¹, the product rule (fg)′ = f′g + fg′, the quotient rule (f/g)′ = (f′g − fg′)/g², and the chain rule d/dx f(g(x)) = f′(g(x)) g′(x). Combined with a short table of derivatives of elementary functions, they differentiate any expression built from them.',
  },
  {
    question: 'What are the derivatives of the six trig functions?',
    answer:
      'sin x → cos x, cos x → −sin x, tan x → sec² x, cot x → −csc² x, sec x → sec x tan x, and csc x → −csc x cot x. The three co-functions (cos, cot, csc) all carry a minus sign, and the last four follow from the first two by the quotient rule. All six assume x is in radians.',
  },
  {
    question: 'What are the inverse trig derivatives?',
    answer:
      'arcsin x → 1/√(1 − x²), arccos x → −1/√(1 − x²), arctan x → 1/(1 + x²), arccot x → −1/(1 + x²), arcsec x → 1/(|x|√(x² − 1)), and arccsc x → −1/(|x|√(x² − 1)). Each co-function is the negative of its partner because arcsin x + arccos x = π/2 (and likewise for the other pairs), so the pair’s derivatives must sum to zero. The square-root ones need |x| < 1, and the arcsec and arccsc ones need |x| > 1.',
  },
  {
    question: 'How do I write d/dx in LaTeX?',
    answer:
      'In math mode, \\frac{d}{dx} gives the Leibniz operator; \\frac{df}{dx} or \\frac{d}{dx} f(x) applies it to a function, and \\frac{d^2 f}{dx^2} is the second derivative. Use \\dfrac for full-size fractions in running text, \\partial for partial derivatives, f\'(x) for Lagrange notation and \\dot{x} for Newton notation. The optional physics package shortens all of this to \\dv{f}{x} and \\pdv{f}{x}.',
  },
]

export default async function DerivativeRulesPage() {
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
          <h1>Derivative Rules: Power, Product, Quotient, Chain, Trig and Inverse Trig Derivatives</h1>
          <p className="lead">
            The derivative of a function <em>f</em> at a point <em>x</em> is the instantaneous rate
            of change of <em>f</em> there: the slope of the tangent line, defined as the limit of the
            difference quotient
          </p>
          <p className="text-center text-xl">
            <em>f</em>&prime;(<em>x</em>) = lim<sub><em>h</em>&rarr;0</sub>{' '}
            [<em>f</em>(<em>x</em> + <em>h</em>) &minus; <em>f</em>(<em>x</em>)] / <em>h</em>
          </p>
          <p>
            Nobody evaluates that limit more than a few times in a calculus course. Instead you learn
            a handful of <strong>derivative rules</strong> that say how differentiation interacts with
            sums, products, quotients and composition, plus a short table of derivatives of the
            elementary functions, and every other derivative is assembled from those. This page is
            that reference: the seven core rules, a table of common and trig derivatives, the six
            inverse trig derivatives, two worked examples, and the LaTeX source for every formula so
            you can paste it into your own notes.
          </p>

          {/* ───────────────────────────── Core Rules ───────────────────────────── */}
          <h2>The Core Derivative Rules</h2>
          <p>
            Throughout, <em>c</em> and <em>n</em> are constants, <em>f</em> and <em>g</em> are
            differentiable functions of <em>x</em>, and a prime means the derivative with respect
            to <em>x</em>. The right-hand column is the LaTeX that produces each formula, using{' '}
            <code>\frac&#123;d&#125;&#123;dx&#125;</code> for the operator.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Rule</th>
                <th scope="col">Formula</th>
                <th scope="col">LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Constant</td>
                <td>d/d<em>x</em> [<em>c</em>] = 0</td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125; c = 0</code></td>
              </tr>
              <tr>
                <td>Constant multiple</td>
                <td>d/d<em>x</em> [<em>c f</em>(<em>x</em>)] = <em>c f</em>&prime;(<em>x</em>)</td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125;\bigl[c\,f(x)\bigr] = c\,f&apos;(x)</code></td>
              </tr>
              <tr>
                <td>Sum and difference</td>
                <td>d/d<em>x</em> [<em>f</em>(<em>x</em>) &plusmn; <em>g</em>(<em>x</em>)] = <em>f</em>&prime;(<em>x</em>) &plusmn; <em>g</em>&prime;(<em>x</em>)</td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125;\bigl[f(x) \pm g(x)\bigr] = f&apos;(x) \pm g&apos;(x)</code></td>
              </tr>
              <tr>
                <td>Power</td>
                <td>d/d<em>x</em> <em>x</em><sup><em>n</em></sup> = <em>n x</em><sup><em>n</em>&minus;1</sup></td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125; x^n = n x^&#123;n-1&#125;</code></td>
              </tr>
              <tr>
                <td>Product</td>
                <td>d/d<em>x</em> [<em>f</em>(<em>x</em>) <em>g</em>(<em>x</em>)] = <em>f</em>&prime;(<em>x</em>) <em>g</em>(<em>x</em>) + <em>f</em>(<em>x</em>) <em>g</em>&prime;(<em>x</em>)</td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125;\bigl[f(x)\,g(x)\bigr] = f&apos;(x)\,g(x) + f(x)\,g&apos;(x)</code></td>
              </tr>
              <tr>
                <td>Quotient</td>
                <td>d/d<em>x</em> [<em>f</em>(<em>x</em>) / <em>g</em>(<em>x</em>)] = [<em>f</em>&prime;(<em>x</em>) <em>g</em>(<em>x</em>) &minus; <em>f</em>(<em>x</em>) <em>g</em>&prime;(<em>x</em>)] / <em>g</em>(<em>x</em>)<sup>2</sup></td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125;\left[\frac&#123;f(x)&#125;&#123;g(x)&#125;\right] = \frac&#123;f&apos;(x)\,g(x) - f(x)\,g&apos;(x)&#125;&#123;g(x)^2&#125;</code></td>
              </tr>
              <tr>
                <td>Chain</td>
                <td>d/d<em>x</em> <em>f</em>(<em>g</em>(<em>x</em>)) = <em>f</em>&prime;(<em>g</em>(<em>x</em>)) <em>g</em>&prime;(<em>x</em>)</td>
                <td><code>\frac&#123;d&#125;&#123;dx&#125; f\bigl(g(x)\bigr) = f&apos;\bigl(g(x)\bigr)\,g&apos;(x)</code></td>
              </tr>
            </tbody>
          </table>
          <p>
            A few things worth knowing about each:
          </p>
          <ul>
            <li>
              <strong>Constant, constant multiple, sum:</strong> together these say differentiation
              is <em>linear</em>. They let you differentiate a polynomial term by term, and they are
              why a constant added to a function never changes its derivative.
            </li>
            <li>
              <strong>Power rule:</strong> valid for every real exponent <em>n</em>, not just
              positive integers. Writing roots and reciprocals as powers is usually the fastest route:{' '}
              &radic;<em>x</em> = <em>x</em><sup>1/2</sup> gives 1/(2&radic;<em>x</em>), and
              1/<em>x</em> = <em>x</em><sup>&minus;1</sup> gives &minus;1/<em>x</em><sup>2</sup>.
            </li>
            <li>
              <strong>Product rule:</strong> the derivative of a product is <em>not</em> the product
              of the derivatives. Differentiate one factor at a time, keep the other, and add. For
              three factors, (<em>fgh</em>)&prime; = <em>f</em>&prime;<em>gh</em> + <em>fg</em>&prime;<em>h</em> + <em>fgh</em>&prime;.
            </li>
            <li>
              <strong>Quotient rule:</strong> the order in the numerator matters because of the minus
              sign. The mnemonic &quot;low d-high minus high d-low, over low squared&quot; keeps it
              straight. Any quotient can also be written as <em>f</em> &middot; <em>g</em><sup>&minus;1</sup> and
              done with the product and chain rules.
            </li>
            <li>
              <strong>Chain rule:</strong> differentiate the outer function, leave the inside alone,
              then multiply by the derivative of the inside. In Leibniz notation, if{' '}
              <em>y</em> = <em>f</em>(<em>u</em>) and <em>u</em> = <em>g</em>(<em>x</em>), then
              d<em>y</em>/d<em>x</em> = (d<em>y</em>/d<em>u</em>)(d<em>u</em>/d<em>x</em>). Nested
              functions just mean more factors.
            </li>
          </ul>
          <p>
            Here are all seven as one <code>align*</code> block. The <code>&amp;</code> before each
            equals sign lines them up, and <code>\bigl[ \bigr]</code> gives brackets slightly larger
            than the fraction.
          </p>
          <pre><code>{`\\begin{align*}
  \\frac{d}{dx}\\, c &= 0 \\\\
  \\frac{d}{dx}\\bigl[c\\,f(x)\\bigr] &= c\\,f'(x) \\\\
  \\frac{d}{dx}\\bigl[f(x) \\pm g(x)\\bigr] &= f'(x) \\pm g'(x) \\\\
  \\frac{d}{dx}\\, x^n &= n x^{n-1} \\\\
  \\frac{d}{dx}\\bigl[f(x)\\,g(x)\\bigr] &= f'(x)\\,g(x) + f(x)\\,g'(x) \\\\
  \\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] &= \\frac{f'(x)\\,g(x) - f(x)\\,g'(x)}{g(x)^2} \\\\
  \\frac{d}{dx}\\, f\\bigl(g(x)\\bigr) &= f'\\bigl(g(x)\\bigr)\\,g'(x)
\\end{align*}`}</code></pre>

          {/* ───────────────────────────── Common Derivatives ───────────────────────────── */}
          <h2>Table of Common Derivatives and Trig Derivatives</h2>
          <p>
            The rules above tell you how to take things apart; this table tells you what to do with
            the pieces. Powers, exponentials and logarithms come first, then the six trig
            derivatives and the two hyperbolic ones. Trig arguments are in radians; the derivatives
            of sin and cos pick up a factor of &pi;/180 in degrees.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col"><em>f</em>(<em>x</em>)</th>
                <th scope="col"><em>f</em>&prime;(<em>x</em>)</th>
                <th scope="col">LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><em>x</em><sup><em>n</em></sup></td><td><em>n x</em><sup><em>n</em>&minus;1</sup></td><td><code>\frac&#123;d&#125;&#123;dx&#125; x^n = n x^&#123;n-1&#125;</code></td></tr>
              <tr><td><em>e</em><sup><em>x</em></sup></td><td><em>e</em><sup><em>x</em></sup></td><td><code>\frac&#123;d&#125;&#123;dx&#125; e^x = e^x</code></td></tr>
              <tr><td><em>a</em><sup><em>x</em></sup> (<em>a</em> &gt; 0)</td><td><em>a</em><sup><em>x</em></sup> ln <em>a</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; a^x = a^x \ln a</code></td></tr>
              <tr><td>ln <em>x</em> (<em>x</em> &gt; 0)</td><td>1 / <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \ln x = \frac&#123;1&#125;&#123;x&#125;</code></td></tr>
              <tr><td>log<sub><em>a</em></sub> <em>x</em> (<em>x</em> &gt; 0)</td><td>1 / (<em>x</em> ln <em>a</em>)</td><td><code>\frac&#123;d&#125;&#123;dx&#125; \log_a x = \frac&#123;1&#125;&#123;x \ln a&#125;</code></td></tr>
              <tr><td>sin <em>x</em></td><td>cos <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \sin x = \cos x</code></td></tr>
              <tr><td>cos <em>x</em></td><td>&minus;sin <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \cos x = -\sin x</code></td></tr>
              <tr><td>tan <em>x</em></td><td>sec<sup>2</sup> <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \tan x = \sec^2 x</code></td></tr>
              <tr><td>cot <em>x</em></td><td>&minus;csc<sup>2</sup> <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \cot x = -\csc^2 x</code></td></tr>
              <tr><td>sec <em>x</em></td><td>sec <em>x</em> tan <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \sec x = \sec x \tan x</code></td></tr>
              <tr><td>csc <em>x</em></td><td>&minus;csc <em>x</em> cot <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \csc x = -\csc x \cot x</code></td></tr>
              <tr><td>sinh <em>x</em></td><td>cosh <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \sinh x = \cosh x</code></td></tr>
              <tr><td>cosh <em>x</em></td><td>sinh <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \cosh x = \sinh x</code></td></tr>
            </tbody>
          </table>
          <p>
            Two patterns make the trig derivatives easier to remember. Every <em>co</em>-function
            (cos, cot, csc) has a minus sign, and the other three do not. And the last four rows are
            not independent facts: they follow from sin and cos by the quotient rule. For tan,
          </p>
          <p className="text-center text-xl">
            d/d<em>x</em> [sin <em>x</em> / cos <em>x</em>] = (cos <em>x</em> &middot; cos <em>x</em> &minus; sin <em>x</em> &middot; (&minus;sin <em>x</em>)) / cos<sup>2</sup> <em>x</em>{' '}
            = 1 / cos<sup>2</sup> <em>x</em> = sec<sup>2</sup> <em>x</em>,
          </p>
          <p>
            using sin<sup>2</sup> <em>x</em> + cos<sup>2</sup> <em>x</em> = 1 in the numerator. The
            same computation on 1/cos <em>x</em> gives sec <em>x</em> tan <em>x</em>. Note also that{' '}
            <em>e</em><sup><em>x</em></sup> is the only exponential that is its own derivative; the
            ln <em>a</em> in the <em>a</em><sup><em>x</em></sup> row is what you get from writing{' '}
            <em>a</em><sup><em>x</em></sup> = <em>e</em><sup><em>x</em> ln <em>a</em></sup> and applying the chain rule.
            Unlike the trig functions, sinh and cosh swap without any sign change.
          </p>

          {/* ───────────────────────────── Inverse Trig ───────────────────────────── */}
          <h2>Inverse Trig Derivatives</h2>
          <p>
            The inverse trig derivatives look nothing like the trig derivatives: they are algebraic
            functions, which is why they show up when you <em>integrate</em> expressions like
            1/(1 + <em>x</em><sup>2</sup>). Each one is found by implicit differentiation. For{' '}
            <em>y</em> = arcsin <em>x</em>, write sin <em>y</em> = <em>x</em>, differentiate to get
            cos <em>y</em> &middot; <em>y</em>&prime; = 1, and then cos <em>y</em> = &radic;(1 &minus; sin<sup>2</sup> <em>y</em>) = &radic;(1 &minus; <em>x</em><sup>2</sup>),
            where the positive root is correct because arcsin takes values in [&minus;&pi;/2, &pi;/2]
            and cos is non-negative there.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col"><em>f</em>(<em>x</em>)</th>
                <th scope="col"><em>f</em>&prime;(<em>x</em>)</th>
                <th scope="col">Valid for</th>
                <th scope="col">LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>arcsin <em>x</em></td><td>1 / &radic;(1 &minus; <em>x</em><sup>2</sup>)</td><td>|<em>x</em>| &lt; 1</td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arcsin x = \frac&#123;1&#125;&#123;\sqrt&#123;1 - x^2&#125;&#125;</code></td></tr>
              <tr><td>arccos <em>x</em></td><td>&minus;1 / &radic;(1 &minus; <em>x</em><sup>2</sup>)</td><td>|<em>x</em>| &lt; 1</td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arccos x = -\frac&#123;1&#125;&#123;\sqrt&#123;1 - x^2&#125;&#125;</code></td></tr>
              <tr><td>arctan <em>x</em></td><td>1 / (1 + <em>x</em><sup>2</sup>)</td><td>all <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arctan x = \frac&#123;1&#125;&#123;1 + x^2&#125;</code></td></tr>
              <tr><td>arccot <em>x</em></td><td>&minus;1 / (1 + <em>x</em><sup>2</sup>)</td><td>all <em>x</em></td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arccot x = -\frac&#123;1&#125;&#123;1 + x^2&#125;</code></td></tr>
              <tr><td>arcsec <em>x</em></td><td>1 / (|<em>x</em>| &radic;(<em>x</em><sup>2</sup> &minus; 1))</td><td>|<em>x</em>| &gt; 1</td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arcsec x = \frac&#123;1&#125;&#123;|x|\sqrt&#123;x^2 - 1&#125;&#125;</code></td></tr>
              <tr><td>arccsc <em>x</em></td><td>&minus;1 / (|<em>x</em>| &radic;(<em>x</em><sup>2</sup> &minus; 1))</td><td>|<em>x</em>| &gt; 1</td><td><code>\frac&#123;d&#125;&#123;dx&#125; \arccsc x = -\frac&#123;1&#125;&#123;|x|\sqrt&#123;x^2 - 1&#125;&#125;</code></td></tr>
            </tbody>
          </table>
          <p>
            The three co-functions are again the negatives of their partners, this time for a
            cleaner reason: arcsin <em>x</em> + arccos <em>x</em> = &pi;/2 for every <em>x</em> in
            [&minus;1, 1] (and similarly for the other two pairs), so the derivatives have to cancel.
            The |<em>x</em>| in the arcsec and arccsc rows comes from the usual choice of range,
            [0, &pi;/2) &cup; (&pi;/2, &pi;] for arcsec, on which the function is increasing for both{' '}
            <em>x</em> &gt; 1 and <em>x</em> &lt; &minus;1; some textbooks choose a different range and
            drop the absolute value. The derivatives are undefined at <em>x</em> = &plusmn;1, where
            the inverse functions have vertical tangents.
          </p>
          <p>
            With the chain rule these become general formulas. For an inner function <em>u</em>(<em>x</em>),
          </p>
          <p className="text-center text-xl">
            d/d<em>x</em> arctan <em>u</em> = <em>u</em>&prime; / (1 + <em>u</em><sup>2</sup>),
            &emsp; so &emsp; d/d<em>x</em> arctan(2<em>x</em>) = 2 / (1 + 4<em>x</em><sup>2</sup>),
          </p>
          <p>
            and d/d<em>x</em> arcsin(<em>x</em><sup>2</sup>) = 2<em>x</em> / &radic;(1 &minus; <em>x</em><sup>4</sup>).
            In LaTeX, <code>\arcsin</code>, <code>\arccos</code> and <code>\arctan</code> are built in,
            but <code>\arccot</code>, <code>\arcsec</code> and <code>\arccsc</code> are not; the
            complete document below declares them with <code>\DeclareMathOperator</code>. If you
            prefer the sin<sup>&minus;1</sup> notation, write <code>\sin^&#123;-1&#125; x</code>.
          </p>

          {/* ───────────────────────────── Worked Examples ───────────────────────────── */}
          <h2>Worked Examples</h2>
          <p>
            Most real derivatives need two or three rules at once. The trick is to identify the
            outermost structure first (is it a sum? a product? a quotient? a composition?) and apply
            that rule, leaving the inner pieces for later.
          </p>

          <h3>Example 1: product rule with the chain rule</h3>
          <p>
            Differentiate <em>f</em>(<em>x</em>) = <em>x</em><sup>2</sup> sin(3<em>x</em>).
          </p>
          <ol>
            <li>
              The outer structure is a product, <em>u</em> &middot; <em>v</em> with{' '}
              <em>u</em> = <em>x</em><sup>2</sup> and <em>v</em> = sin(3<em>x</em>). By the product
              rule, <em>f</em>&prime; = <em>u</em>&prime;<em>v</em> + <em>uv</em>&prime;.
            </li>
            <li>
              <em>u</em>&prime; = 2<em>x</em> by the power rule.
            </li>
            <li>
              <em>v</em> = sin(3<em>x</em>) is a composition: outer function sin, inner function
              3<em>x</em>. Chain rule: <em>v</em>&prime; = cos(3<em>x</em>) &middot; 3 = 3 cos(3<em>x</em>).
            </li>
            <li>
              Assemble:{' '}
              <strong><em>f</em>&prime;(<em>x</em>) = 2<em>x</em> sin(3<em>x</em>) + 3<em>x</em><sup>2</sup> cos(3<em>x</em>)</strong>,
              or <em>x</em>[2 sin(3<em>x</em>) + 3<em>x</em> cos(3<em>x</em>)] after factoring.
            </li>
          </ol>
          <p>
            Sanity check: <em>f</em>(0) = 0 and the graph starts flat at the origin, so{' '}
            <em>f</em>&prime;(0) should be 0, and it is. The LaTeX for the result is{' '}
            <code>f&apos;(x) = 2x\sin(3x) + 3x^2\cos(3x)</code>.
          </p>

          <h3>Example 2: quotient rule</h3>
          <p>
            Differentiate <em>g</em>(<em>x</em>) = (3<em>x</em> &minus; 1) / (<em>x</em><sup>2</sup> + 2).
          </p>
          <ol>
            <li>
              Name the parts: high = 3<em>x</em> &minus; 1 with derivative 3; low = <em>x</em><sup>2</sup> + 2
              with derivative 2<em>x</em>.
            </li>
            <li>
              Low d-high minus high d-low, over low squared:{' '}
              <em>g</em>&prime;(<em>x</em>) = [(<em>x</em><sup>2</sup> + 2)(3) &minus; (3<em>x</em> &minus; 1)(2<em>x</em>)] / (<em>x</em><sup>2</sup> + 2)<sup>2</sup>.
            </li>
            <li>
              Expand the numerator: 3<em>x</em><sup>2</sup> + 6 &minus; 6<em>x</em><sup>2</sup> + 2<em>x</em> = &minus;3<em>x</em><sup>2</sup> + 2<em>x</em> + 6.
            </li>
            <li>
              So{' '}
              <strong><em>g</em>&prime;(<em>x</em>) = (&minus;3<em>x</em><sup>2</sup> + 2<em>x</em> + 6) / (<em>x</em><sup>2</sup> + 2)<sup>2</sup></strong>.
              Leave the denominator factored; expanding it only hides the structure.
            </li>
          </ol>
          <p>
            Sanity check at <em>x</em> = 0: the formula gives 6/4 = 3/2, and near zero{' '}
            <em>g</em>(<em>x</em>) &asymp; (3<em>x</em> &minus; 1)/2 has slope 3/2. Typeset with{' '}
            <code>\frac&#123;-3x^2 + 2x + 6&#125;&#123;(x^2 + 2)^2&#125;</code>. Both examples are
            worked line by line in the <code>align*</code> environment in the complete document below.
          </p>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>Typesetting Derivatives in LaTeX</h2>
          <p>
            Every derivative formula on this page is plain <code>amsmath</code>. The pieces you need:
          </p>
          <ul>
            <li>
              <code>\frac&#123;d&#125;&#123;dx&#125;</code> is the Leibniz operator. Put the function
              after it, <code>\frac&#123;d&#125;&#123;dx&#125; f(x)</code>, or inside it,{' '}
              <code>\frac&#123;df&#125;&#123;dx&#125;</code>. The second derivative is{' '}
              <code>\frac&#123;d^2 f&#125;&#123;dx^2&#125;</code>. Many journals set the d upright
              with <code>\mathrm&#123;d&#125;</code>, as in <code>\frac&#123;\mathrm&#123;d&#125;f&#125;&#123;\mathrm&#123;d&#125;x&#125;</code>;
              define <code>\newcommand&#123;\dd&#125;&#123;\mathrm&#123;d&#125;&#125;</code> once if you want that.
            </li>
            <li>
              <code>\dfrac</code> forces a display-size fraction. Inside running text{' '}
              <code>\frac</code> shrinks to a cramped inline fraction; <code>\dfrac&#123;d&#125;&#123;dx&#125;</code>{' '}
              keeps it readable, at the cost of taller lines. The reverse, <code>\tfrac</code>, gives a
              small fraction inside a display.
            </li>
            <li>
              <code>\partial</code> is the partial derivative symbol:{' '}
              <code>\frac&#123;\partial f&#125;&#123;\partial x&#125;</code>, and{' '}
              <code>\frac&#123;\partial^2 f&#125;&#123;\partial x \, \partial y&#125;</code> for a mixed
              second derivative, with <code>\,</code> for the thin space between the two differentials.
            </li>
            <li>
              Lagrange notation is just a prime: <code>f&apos;(x)</code>, <code>f&apos;&apos;(x)</code>,
              and <code>f^&#123;(n)&#125;(x)</code> for the <em>n</em>th derivative. Type the apostrophe
              directly; <code>\prime</code> is only needed when you want the symbol without the
              superscript.
            </li>
            <li>
              Newton notation for time derivatives: <code>\dot&#123;x&#125;</code> and{' '}
              <code>\ddot&#123;x&#125;</code> give <em>x</em>&#775; and <em>x</em>&#776;.
            </li>
            <li>
              The optional <code>physics</code> package adds <code>\dv&#123;f&#125;&#123;x&#125;</code> for
              d<em>f</em>/d<em>x</em>, <code>\dv[2]&#123;f&#125;&#123;x&#125;</code> for the second
              derivative, <code>\dv&#123;x&#125;</code> for the bare operator and{' '}
              <code>\pdv&#123;f&#125;&#123;x&#125;</code> for partials. It is a convenience, not a
              requirement, and it redefines a few common macros, so leave it out if a co-author or a
              journal template does not already load it.
            </li>
          </ul>

          <h3>Complete document</h3>
          <p>
            This compiles with pdfLaTeX and produces the rules block, both derivative tables and the
            two worked examples. <code>booktabs</code> supplies the table rules, <code>array</code>{' '}
            lets a column be set in math mode, and the three <code>\DeclareMathOperator</code> lines
            supply the inverse trig functions that <code>amsmath</code> leaves out.
          </p>
          <pre><code>{`\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\usepackage{booktabs,array}

% amsmath defines \\arcsin, \\arccos and \\arctan but not these three.
\\DeclareMathOperator{\\arccot}{arccot}
\\DeclareMathOperator{\\arcsec}{arcsec}
\\DeclareMathOperator{\\arccsc}{arccsc}

\\begin{document}

\\section*{Derivative rules}
\\begin{align*}
  \\frac{d}{dx}\\, c &= 0 \\\\
  \\frac{d}{dx}\\bigl[c\\,f(x)\\bigr] &= c\\,f'(x) \\\\
  \\frac{d}{dx}\\bigl[f(x) \\pm g(x)\\bigr] &= f'(x) \\pm g'(x) \\\\
  \\frac{d}{dx}\\, x^n &= n x^{n-1} \\\\
  \\frac{d}{dx}\\bigl[f(x)\\,g(x)\\bigr] &= f'(x)\\,g(x) + f(x)\\,g'(x) \\\\
  \\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] &= \\frac{f'(x)\\,g(x) - f(x)\\,g'(x)}{g(x)^2} \\\\
  \\frac{d}{dx}\\, f\\bigl(g(x)\\bigr) &= f'\\bigl(g(x)\\bigr)\\,g'(x)
\\end{align*}

\\section*{Common derivatives}
\\renewcommand{\\arraystretch}{1.4}
\\begin{tabular}{>{$}l<{$} >{$}l<{$} @{\\qquad} >{$}l<{$} >{$}l<{$}}
  \\toprule
  f(x) & f'(x) & f(x) & f'(x) \\\\
  \\midrule
  x^n     & n x^{n-1}         & \\sin x  & \\cos x           \\\\
  e^x     & e^x               & \\cos x  & -\\sin x          \\\\
  a^x     & a^x \\ln a         & \\tan x  & \\sec^2 x         \\\\
  \\ln x   & \\dfrac{1}{x}      & \\cot x  & -\\csc^2 x        \\\\
  \\log_a x & \\dfrac{1}{x \\ln a} & \\sec x & \\sec x \\tan x   \\\\
  \\sinh x & \\cosh x           & \\csc x  & -\\csc x \\cot x   \\\\
  \\cosh x & \\sinh x           & \\multicolumn{2}{c}{}     \\\\
  \\bottomrule
\\end{tabular}

\\section*{Inverse trig derivatives}
\\begin{align*}
  \\frac{d}{dx} \\arcsin x &= \\frac{1}{\\sqrt{1 - x^2}}, &
  \\frac{d}{dx} \\arccos x &= -\\frac{1}{\\sqrt{1 - x^2}}, & |x| &< 1 \\\\
  \\frac{d}{dx} \\arctan x &= \\frac{1}{1 + x^2}, &
  \\frac{d}{dx} \\arccot x &= -\\frac{1}{1 + x^2} \\\\
  \\frac{d}{dx} \\arcsec x &= \\frac{1}{|x|\\sqrt{x^2 - 1}}, &
  \\frac{d}{dx} \\arccsc x &= -\\frac{1}{|x|\\sqrt{x^2 - 1}}, & |x| &> 1
\\end{align*}

\\section*{Worked examples}
Product and chain rule, $f(x) = x^2 \\sin(3x)$:
\\begin{align*}
  f'(x) &= \\frac{d}{dx}\\bigl[x^2\\bigr] \\sin(3x) + x^2 \\frac{d}{dx}\\bigl[\\sin(3x)\\bigr] \\\\
        &= 2x \\sin(3x) + x^2 \\cdot 3\\cos(3x) \\\\
        &= 2x \\sin(3x) + 3x^2 \\cos(3x).
\\end{align*}

Quotient rule, $g(x) = \\dfrac{3x - 1}{x^2 + 2}$:
\\begin{align*}
  g'(x) &= \\frac{(x^2 + 2)(3) - (3x - 1)(2x)}{(x^2 + 2)^2} \\\\
        &= \\frac{3x^2 + 6 - 6x^2 + 2x}{(x^2 + 2)^2} \\\\
        &= \\frac{-3x^2 + 2x + 6}{(x^2 + 2)^2}.
\\end{align*}

\\end{document}`}</code></pre>
          <p>
            The <code>&gt;&#123;$&#125;l&lt;&#123;$&#125;</code> column type from <code>array</code>{' '}
            wraps every cell in math mode so you do not need dollar signs in the table body, and{' '}
            <code>@&#123;\qquad&#125;</code> puts a wide gap between the two halves of the table.
            Lining up the inverse trig derivatives in three columns uses <code>align*</code> with
            extra <code>&amp;</code> pairs; every odd <code>&amp;</code> is an alignment point and
            every even one is a column gap.
          </p>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What are the basic derivative rules?</h3>
          <p>
            Seven rules cover almost everything: the constant rule (a constant differentiates to 0),
            the constant multiple rule (pull the constant out), the sum and difference rule
            (differentiate term by term), the power rule d/d<em>x</em> <em>x</em><sup><em>n</em></sup> = <em>n x</em><sup><em>n</em>&minus;1</sup>,
            the product rule (<em>fg</em>)&prime; = <em>f</em>&prime;<em>g</em> + <em>fg</em>&prime;,
            the quotient rule (<em>f</em>/<em>g</em>)&prime; = (<em>f</em>&prime;<em>g</em> &minus; <em>fg</em>&prime;)/<em>g</em><sup>2</sup>,
            and the chain rule d/d<em>x</em> <em>f</em>(<em>g</em>(<em>x</em>)) = <em>f</em>&prime;(<em>g</em>(<em>x</em>)) <em>g</em>&prime;(<em>x</em>).
            Combined with a short table of derivatives of elementary functions, they differentiate
            any expression built from them.
          </p>
          <h3>What are the derivatives of the six trig functions?</h3>
          <p>
            sin <em>x</em> &rarr; cos <em>x</em>, cos <em>x</em> &rarr; &minus;sin <em>x</em>,
            tan <em>x</em> &rarr; sec<sup>2</sup> <em>x</em>, cot <em>x</em> &rarr; &minus;csc<sup>2</sup> <em>x</em>,
            sec <em>x</em> &rarr; sec <em>x</em> tan <em>x</em>, and csc <em>x</em> &rarr; &minus;csc <em>x</em> cot <em>x</em>.
            The three co-functions (cos, cot, csc) all carry a minus sign, and the last four follow
            from the first two by the quotient rule. All six assume <em>x</em> is in radians.
          </p>
          <h3>What are the inverse trig derivatives?</h3>
          <p>
            arcsin <em>x</em> &rarr; 1/&radic;(1 &minus; <em>x</em><sup>2</sup>),
            arccos <em>x</em> &rarr; &minus;1/&radic;(1 &minus; <em>x</em><sup>2</sup>),
            arctan <em>x</em> &rarr; 1/(1 + <em>x</em><sup>2</sup>),
            arccot <em>x</em> &rarr; &minus;1/(1 + <em>x</em><sup>2</sup>),
            arcsec <em>x</em> &rarr; 1/(|<em>x</em>|&radic;(<em>x</em><sup>2</sup> &minus; 1)), and
            arccsc <em>x</em> &rarr; &minus;1/(|<em>x</em>|&radic;(<em>x</em><sup>2</sup> &minus; 1)).
            Each co-function is the negative of its partner because arcsin <em>x</em> + arccos <em>x</em> = &pi;/2
            (and likewise for the other pairs), so the pair&apos;s derivatives must sum to zero. The
            square-root ones need |<em>x</em>| &lt; 1, and the arcsec and arccsc ones need |<em>x</em>| &gt; 1.
          </p>
          <h3>How do I write d/d<em>x</em> in LaTeX?</h3>
          <p>
            In math mode, <code>\frac&#123;d&#125;&#123;dx&#125;</code> gives the Leibniz operator;{' '}
            <code>\frac&#123;df&#125;&#123;dx&#125;</code> or <code>\frac&#123;d&#125;&#123;dx&#125; f(x)</code>{' '}
            applies it to a function, and <code>\frac&#123;d^2 f&#125;&#123;dx^2&#125;</code> is the
            second derivative. Use <code>\dfrac</code> for full-size fractions in running text,{' '}
            <code>\partial</code> for partial derivatives, <code>f&apos;(x)</code> for Lagrange
            notation and <code>\dot&#123;x&#125;</code> for Newton notation. The optional{' '}
            <code>physics</code> package shortens all of this to <code>\dv&#123;f&#125;&#123;x&#125;</code>{' '}
            and <code>\pdv&#123;f&#125;&#123;x&#125;</code>.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The rules are the easy part; these guides cover the LaTeX around them:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Fractions, roots, inline versus display math and the amsmath environments used above</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> – The limit in the definition, partial derivatives and upright differentials</li>
            <li><Link href="/learn/math-functions">Math Functions in LaTeX</Link> – \sin, \ln, \exp and \DeclareMathOperator for arcsec and friends</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> – Number the chain rule and cite it from the text with \eqref</li>
            <li><Link href="/learn/multiline-equations">Multi-line Equations</Link> – align, split and gather for step-by-step derivations like the worked examples</li>
            <li><Link href="/learn/laplace-transform-table">Laplace Transform Table</Link> – The transform that turns derivatives into multiplication by <em>s</em></li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste the document above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Turn a handwritten derivative into LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Look up \partial, \prime, \infty and every other symbol</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Typeset your own calculus notes</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor: paste the document above, ask it to add the
              hyperbolic inverses or switch to upright d, and see the compiled PDF update as you type.
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
