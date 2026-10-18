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

const breadcrumbs = getLearnBreadcrumbs('Laplace Transform Table', 'laplace-transform-table')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'laplace-transform-table',
  title: 'Laplace Transform Table: Common Pairs, Properties and LaTeX Source',
  seoTitle: 'Laplace Transform Table: Pairs, Properties + LaTeX',
  description: 'Laplace transform table with 26 pairs and regions of convergence, all properties and theorems, inverse transforms by partial fractions, and LaTeX source.',
  keywords: 'laplace transform table, laplace table, table of laplace transforms, laplace transform chart, laplace transform properties, inverse laplace transform table, laplace transform of sin, laplace transform of cos, laplace transform of e^at, laplace transform of t^n, laplace transform of unit step, laplace transform of delta function, laplace transform pairs, laplace transform latex, mathcal L latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'What is the Laplace transform of 1?',
    answer:
      '1/s, valid for Re s > 0. A constant c transforms to c/s by linearity, and the unit step u(t) has the same transform as 1 because the integral only runs from t = 0.',
  },
  {
    question: 'What is the Laplace transform of e^(at)?',
    answer:
      '1/(s − a), valid for Re s > Re a. Replacing a by −a gives 1/(s + a) for the decaying exponential e^(−at), which is the pair that appears in almost every circuit and differential-equation problem.',
  },
  {
    question: 'What are the Laplace transforms of sin(ωt) and cos(ωt)?',
    answer:
      'sin(ωt) transforms to ω/(s² + ω²) and cos(ωt) to s/(s² + ω²), both for Re s > 0. The one with s in the numerator is the cosine: cos(0) = 1, so its transform has to behave like 1/s for large s, while sin(0) = 0 makes its transform fall off like 1/s².',
  },
  {
    question: 'What does the "Re s > a" column mean?',
    answer:
      'It is the region of convergence: the defining integral only converges for s to the right of the abscissa a, and the closed-form F(s) is only guaranteed to equal the integral there. For solving initial value problems you rarely need it, because you read the inverse transform straight off the table.',
  },
  {
    question: 'Is this the one-sided or two-sided Laplace transform?',
    answer:
      'One-sided (unilateral), integrating from 0 to ∞. That is the transform used for initial value problems and in engineering courses, and the derivative rules with f(0) and f′(0) only make sense for it. The bilateral transform integrates from −∞ to ∞, is closer to the Fourier transform, and has different tables for functions that are nonzero for t < 0.',
  },
  {
    question: 'How do I write the Laplace transform symbol in LaTeX?',
    answer:
      '\\mathcal{L} in math mode gives the calligraphic ℒ; \\mathscr{L} from the mathrsfs package gives the script form many textbooks use. Define \\newcommand{\\Lap}{\\mathcal{L}} once in the preamble and write \\Lap\\{f(t)\\}, with the braces escaped so they are printed.',
  },
]

export default async function LaplaceTransformTablePage() {
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
          <h1>Laplace Transform Table: Common Pairs, Properties and LaTeX Source</h1>
          <p className="lead">
            The Laplace transform turns a function of time <em>f</em>(<em>t</em>) into a function
            of a complex variable <em>F</em>(<em>s</em>), and in doing so turns derivatives into
            multiplication by <em>s</em>. That is why it solves linear differential equations,
            circuits and control systems by algebra. This page is the table you keep open while
            doing that: 26 transform pairs with their regions of convergence, every property and
            theorem, two worked inverse transforms, and the LaTeX source for the whole table so you
            can paste it into your own notes.
          </p>

          {/* ───────────────────────────── Definition ───────────────────────────── */}
          <h2>Definition and Region of Convergence</h2>
          <p>
            For a function <em>f</em>(<em>t</em>) defined for <em>t</em> &ge; 0, the (one-sided)
            Laplace transform is
          </p>
          <p className="text-center text-xl">
            <em>F</em>(<em>s</em>) = &#8466;&#123;<em>f</em>(<em>t</em>)&#125; = &int;<sub>0</sub><sup>&infin;</sup>{' '}
            <em>e</em><sup>&minus;<em>st</em></sup> <em>f</em>(<em>t</em>) d<em>t</em>
          </p>
          <p>
            The integral converges only when <em>s</em> is far enough to the right in the complex
            plane: there is a real number <em>a</em>, the <strong>abscissa of convergence</strong>,
            such that the integral exists for every <em>s</em> with Re <em>s</em> &gt; <em>a</em>{' '}
            and (for most functions) diverges to its left. That half-plane is the{' '}
            <strong>region of convergence</strong>, and it is the third column of the table below.
            The transform is written &#8466;&#123;<em>f</em>&#125;, &#8466;[<em>f</em>] or simply{' '}
            <em>F</em>(<em>s</em>); the inverse transform &#8466;<sup>&minus;1</sup>&#123;<em>F</em>&#125;
            recovers <em>f</em>(<em>t</em>) for <em>t</em> &ge; 0.
          </p>
          <p>
            Throughout the table, <em>n</em> is a non-negative integer, <em>a</em>, <em>b</em>{' '}
            and &omega; are constants, <em>u</em>(<em>t</em> &minus; <em>a</em>) is the unit step
            (Heaviside function, also written <em>H</em> or &theta;) that jumps from 0 to 1 at{' '}
            <em>t</em> = <em>a</em>, and &delta; is the Dirac delta.
          </p>

          {/* ───────────────────────────── Pairs Table ───────────────────────────── */}
          <h2>Table of Laplace Transform Pairs</h2>
          <p>
            The pairs are grouped as they are usually taught: powers of <em>t</em>, exponentials,
            sines and cosines, damped and growing oscillations, then the step and impulse functions
            that handle switching. Read it left to right for a forward transform and right to left
            for an inverse one.
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th><em>f</em>(<em>t</em>)</th>
                <th><em>F</em>(<em>s</em>) = &#8466;&#123;<em>f</em>(<em>t</em>)&#125;</th>
                <th>Converges for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>1 (or <em>u</em>(<em>t</em>))</td><td>1 / <em>s</em></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>2</td><td><em>t</em></td><td>1 / <em>s</em><sup>2</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>3</td><td><em>t</em><sup><em>n</em></sup> (<em>n</em> = 0, 1, 2, …)</td><td><em>n</em>! / <em>s</em><sup><em>n</em>+1</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>4</td><td><em>t</em><sup><em>p</em></sup> (<em>p</em> &gt; &minus;1)</td><td>&Gamma;(<em>p</em> + 1) / <em>s</em><sup><em>p</em>+1</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>5</td><td>&radic;<em>t</em></td><td>&radic;&pi; / (2 <em>s</em><sup>3/2</sup>)</td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>6</td><td>1 / &radic;<em>t</em></td><td>&radic;(&pi; / <em>s</em>)</td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>7</td><td><em>e</em><sup><em>at</em></sup></td><td>1 / (<em>s</em> &minus; <em>a</em>)</td><td>Re <em>s</em> &gt; Re <em>a</em></td></tr>
              <tr><td>8</td><td><em>t e</em><sup><em>at</em></sup></td><td>1 / (<em>s</em> &minus; <em>a</em>)<sup>2</sup></td><td>Re <em>s</em> &gt; Re <em>a</em></td></tr>
              <tr><td>9</td><td><em>t</em><sup><em>n</em></sup> <em>e</em><sup><em>at</em></sup></td><td><em>n</em>! / (<em>s</em> &minus; <em>a</em>)<sup><em>n</em>+1</sup></td><td>Re <em>s</em> &gt; Re <em>a</em></td></tr>
              <tr><td>10</td><td>(<em>e</em><sup><em>at</em></sup> &minus; <em>e</em><sup><em>bt</em></sup>) / (<em>a</em> &minus; <em>b</em>)</td><td>1 / ((<em>s</em> &minus; <em>a</em>)(<em>s</em> &minus; <em>b</em>))</td><td>Re <em>s</em> &gt; max(Re <em>a</em>, Re <em>b</em>)</td></tr>
              <tr><td>11</td><td>sin(&omega;<em>t</em>)</td><td>&omega; / (<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)</td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>12</td><td>cos(&omega;<em>t</em>)</td><td><em>s</em> / (<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)</td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>13</td><td>sinh(<em>at</em>)</td><td><em>a</em> / (<em>s</em><sup>2</sup> &minus; <em>a</em><sup>2</sup>)</td><td>Re <em>s</em> &gt; |<em>a</em>|</td></tr>
              <tr><td>14</td><td>cosh(<em>at</em>)</td><td><em>s</em> / (<em>s</em><sup>2</sup> &minus; <em>a</em><sup>2</sup>)</td><td>Re <em>s</em> &gt; |<em>a</em>|</td></tr>
              <tr><td>15</td><td><em>e</em><sup><em>at</em></sup> sin(&omega;<em>t</em>)</td><td>&omega; / ((<em>s</em> &minus; <em>a</em>)<sup>2</sup> + &omega;<sup>2</sup>)</td><td>Re <em>s</em> &gt; <em>a</em></td></tr>
              <tr><td>16</td><td><em>e</em><sup><em>at</em></sup> cos(&omega;<em>t</em>)</td><td>(<em>s</em> &minus; <em>a</em>) / ((<em>s</em> &minus; <em>a</em>)<sup>2</sup> + &omega;<sup>2</sup>)</td><td>Re <em>s</em> &gt; <em>a</em></td></tr>
              <tr><td>17</td><td><em>t</em> sin(&omega;<em>t</em>)</td><td>2&omega;<em>s</em> / (<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)<sup>2</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>18</td><td><em>t</em> cos(&omega;<em>t</em>)</td><td>(<em>s</em><sup>2</sup> &minus; &omega;<sup>2</sup>) / (<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)<sup>2</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>19</td><td>sin(&omega;<em>t</em>) &minus; &omega;<em>t</em> cos(&omega;<em>t</em>)</td><td>2&omega;<sup>3</sup> / (<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)<sup>2</sup></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>20</td><td>sin(&omega;<em>t</em>) / <em>t</em></td><td>arctan(&omega; / <em>s</em>)</td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>21</td><td>&delta;(<em>t</em>)</td><td>1</td><td>all <em>s</em></td></tr>
              <tr><td>22</td><td>&delta;(<em>t</em> &minus; <em>a</em>), <em>a</em> &ge; 0</td><td><em>e</em><sup>&minus;<em>as</em></sup></td><td>all <em>s</em></td></tr>
              <tr><td>23</td><td><em>u</em>(<em>t</em> &minus; <em>a</em>), <em>a</em> &ge; 0</td><td><em>e</em><sup>&minus;<em>as</em></sup> / <em>s</em></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>24</td><td><em>u</em>(<em>t</em> &minus; <em>a</em>) <em>f</em>(<em>t</em> &minus; <em>a</em>)</td><td><em>e</em><sup>&minus;<em>as</em></sup> <em>F</em>(<em>s</em>)</td><td>as for <em>f</em></td></tr>
              <tr><td>25</td><td>ln <em>t</em></td><td>&minus;(&gamma; + ln <em>s</em>) / <em>s</em></td><td>Re <em>s</em> &gt; 0</td></tr>
              <tr><td>26</td><td>erf(&radic;<em>t</em>)</td><td>1 / (<em>s</em> &radic;(<em>s</em> + 1))</td><td>Re <em>s</em> &gt; 0</td></tr>
            </tbody>
          </table>
          <p>
            Notes: &Gamma; is the gamma function, which reduces row 4 to row 3 when <em>p</em> is
            an integer because &Gamma;(<em>n</em> + 1) = <em>n</em>!. Rows 5 and 6 are the{' '}
            <em>p</em> = ½ and <em>p</em> = &minus;½ cases of row 4, using &Gamma;(½) = &radic;&pi;.
            In row 25, &gamma; &asymp; 0.5772 is the Euler–Mascheroni constant. Rows 13 and 14 are
            rows 11 and 12 with &omega; = <em>ia</em>, which is why the sign in the denominator
            flips. Row 10 is the partial-fraction pair you meet most often when inverting a
            transform with two real poles.
          </p>

          {/* ───────────────────────────── Properties Table ───────────────────────────── */}
          <h2>Properties of the Laplace Transform</h2>
          <p>
            The properties are what make the table small enough to fit on a page: any function you
            can build from the pairs above by shifting, scaling, differentiating or multiplying by{' '}
            <em>t</em> has a transform you can write down without integrating. Here{' '}
            <em>F</em> = &#8466;&#123;<em>f</em>&#125; and <em>G</em> = &#8466;&#123;<em>g</em>&#125;.
          </p>
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th><em>f</em>(<em>t</em>)</th>
                <th><em>F</em>(<em>s</em>)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Linearity</td><td><em>a f</em>(<em>t</em>) + <em>b g</em>(<em>t</em>)</td><td><em>a F</em>(<em>s</em>) + <em>b G</em>(<em>s</em>)</td></tr>
              <tr><td>First derivative</td><td><em>f</em>&prime;(<em>t</em>)</td><td><em>s F</em>(<em>s</em>) &minus; <em>f</em>(0)</td></tr>
              <tr><td>Second derivative</td><td><em>f</em>&Prime;(<em>t</em>)</td><td><em>s</em><sup>2</sup> <em>F</em>(<em>s</em>) &minus; <em>s f</em>(0) &minus; <em>f</em>&prime;(0)</td></tr>
              <tr><td><em>n</em>th derivative</td><td><em>f</em><sup>(<em>n</em>)</sup>(<em>t</em>)</td><td><em>s</em><sup><em>n</em></sup> <em>F</em>(<em>s</em>) &minus; <em>s</em><sup><em>n</em>&minus;1</sup> <em>f</em>(0) &minus; … &minus; <em>f</em><sup>(<em>n</em>&minus;1)</sup>(0)</td></tr>
              <tr><td>Integral</td><td>&int;<sub>0</sub><sup><em>t</em></sup> <em>f</em>(&tau;) d&tau;</td><td><em>F</em>(<em>s</em>) / <em>s</em></td></tr>
              <tr><td>Shift in <em>s</em> (damping)</td><td><em>e</em><sup><em>at</em></sup> <em>f</em>(<em>t</em>)</td><td><em>F</em>(<em>s</em> &minus; <em>a</em>)</td></tr>
              <tr><td>Shift in <em>t</em> (delay)</td><td><em>u</em>(<em>t</em> &minus; <em>a</em>) <em>f</em>(<em>t</em> &minus; <em>a</em>)</td><td><em>e</em><sup>&minus;<em>as</em></sup> <em>F</em>(<em>s</em>)</td></tr>
              <tr><td>Scaling</td><td><em>f</em>(<em>at</em>), <em>a</em> &gt; 0</td><td>(1 / <em>a</em>) <em>F</em>(<em>s</em> / <em>a</em>)</td></tr>
              <tr><td>Multiplication by <em>t</em></td><td><em>t f</em>(<em>t</em>)</td><td>&minus;<em>F</em>&prime;(<em>s</em>)</td></tr>
              <tr><td>Multiplication by <em>t</em><sup><em>n</em></sup></td><td><em>t</em><sup><em>n</em></sup> <em>f</em>(<em>t</em>)</td><td>(&minus;1)<sup><em>n</em></sup> <em>F</em><sup>(<em>n</em>)</sup>(<em>s</em>)</td></tr>
              <tr><td>Division by <em>t</em></td><td><em>f</em>(<em>t</em>) / <em>t</em></td><td>&int;<sub><em>s</em></sub><sup>&infin;</sup> <em>F</em>(&sigma;) d&sigma;</td></tr>
              <tr><td>Convolution</td><td>(<em>f</em> &lowast; <em>g</em>)(<em>t</em>) = &int;<sub>0</sub><sup><em>t</em></sup> <em>f</em>(&tau;) <em>g</em>(<em>t</em> &minus; &tau;) d&tau;</td><td><em>F</em>(<em>s</em>) <em>G</em>(<em>s</em>)</td></tr>
              <tr><td>Periodic function, period <em>T</em></td><td><em>f</em>(<em>t</em> + <em>T</em>) = <em>f</em>(<em>t</em>)</td><td>&int;<sub>0</sub><sup><em>T</em></sup> <em>e</em><sup>&minus;<em>st</em></sup> <em>f</em>(<em>t</em>) d<em>t</em> / (1 &minus; <em>e</em><sup>&minus;<em>sT</em></sup>)</td></tr>
              <tr><td>Initial value theorem</td><td><em>f</em>(0<sup>+</sup>)</td><td>lim<sub><em>s</em>&rarr;&infin;</sub> <em>s F</em>(<em>s</em>)</td></tr>
              <tr><td>Final value theorem</td><td>lim<sub><em>t</em>&rarr;&infin;</sub> <em>f</em>(<em>t</em>)</td><td>lim<sub><em>s</em>&rarr;0</sub> <em>s F</em>(<em>s</em>)</td></tr>
            </tbody>
          </table>
          <p>
            Two cautions. The derivative rules assume <em>f</em> is continuous on [0, &infin;) with a
            piecewise-continuous derivative; a jump at <em>t</em> = 0 means <em>f</em>(0) must be read
            as <em>f</em>(0<sup>+</sup>). The final value theorem only holds when the limit exists,
            which requires every pole of <em>s F</em>(<em>s</em>) to lie in the open left half-plane:
            applying it to <em>F</em>(<em>s</em>) = &omega;/(<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)
            gives 0, but sin(&omega;<em>t</em>) has no limit.
          </p>

          {/* ───────────────────────────── Using the Table ───────────────────────────── */}
          <h2>Inverse Transforms with Partial Fractions</h2>
          <p>
            Going backwards is where the table earns its keep. A transform that comes out of a
            differential equation is almost always a rational function, and the strategy is the same
            every time: factor the denominator, split into partial fractions, then match each term to
            a row of the table, pulling constants out by linearity.
          </p>

          <h3>Example 1: two real poles</h3>
          <p>
            Find <em>f</em>(<em>t</em>) when{' '}
            <em>F</em>(<em>s</em>) = (<em>s</em> + 3) / (<em>s</em><sup>2</sup> + 3<em>s</em> + 2).
          </p>
          <ol>
            <li>
              Factor: <em>s</em><sup>2</sup> + 3<em>s</em> + 2 = (<em>s</em> + 1)(<em>s</em> + 2), so{' '}
              <em>F</em>(<em>s</em>) = <em>A</em>/(<em>s</em> + 1) + <em>B</em>/(<em>s</em> + 2).
            </li>
            <li>
              Cover-up method: <em>A</em> = (<em>s</em> + 3)/(<em>s</em> + 2) at <em>s</em> = &minus;1,
              which is 2; <em>B</em> = (<em>s</em> + 3)/(<em>s</em> + 1) at <em>s</em> = &minus;2, which
              is &minus;1.
            </li>
            <li>
              Row 7 with <em>a</em> = &minus;1 and <em>a</em> = &minus;2:{' '}
              <strong><em>f</em>(<em>t</em>) = 2<em>e</em><sup>&minus;<em>t</em></sup> &minus; <em>e</em><sup>&minus;2<em>t</em></sup></strong>{' '}
              for <em>t</em> &ge; 0.
            </li>
          </ol>
          <p>
            Check with the initial value theorem: <em>s F</em>(<em>s</em>) &rarr; 1 as{' '}
            <em>s</em> &rarr; &infin;, and <em>f</em>(0) = 2 &minus; 1 = 1.
          </p>

          <h3>Example 2: complex poles and an initial value problem</h3>
          <p>
            Solve <em>y</em>&Prime; + 2<em>y</em>&prime; + 5<em>y</em> = 0 with <em>y</em>(0) = 1 and{' '}
            <em>y</em>&prime;(0) = 0.
          </p>
          <ol>
            <li>
              Transform both sides with the derivative rules, writing <em>Y</em> = &#8466;&#123;<em>y</em>&#125;:{' '}
              (<em>s</em><sup>2</sup><em>Y</em> &minus; <em>s</em>) + 2(<em>sY</em> &minus; 1) + 5<em>Y</em> = 0,
              so <em>Y</em>(<em>s</em>) = (<em>s</em> + 2) / (<em>s</em><sup>2</sup> + 2<em>s</em> + 5).
            </li>
            <li>
              The denominator has complex roots, so complete the square instead of factoring:{' '}
              <em>s</em><sup>2</sup> + 2<em>s</em> + 5 = (<em>s</em> + 1)<sup>2</sup> + 2<sup>2</sup>.
            </li>
            <li>
              Split the numerator to match rows 15 and 16 with <em>a</em> = &minus;1 and &omega; = 2:{' '}
              <em>Y</em>(<em>s</em>) = (<em>s</em> + 1) / ((<em>s</em> + 1)<sup>2</sup> + 4) + ½ · 2 / ((<em>s</em> + 1)<sup>2</sup> + 4).
            </li>
            <li>
              Read off:{' '}
              <strong><em>y</em>(<em>t</em>) = <em>e</em><sup>&minus;<em>t</em></sup> cos 2<em>t</em> + ½ <em>e</em><sup>&minus;<em>t</em></sup> sin 2<em>t</em></strong>.
              It satisfies <em>y</em>(0) = 1, and differentiating gives <em>y</em>&prime;(0) = &minus;1 + 1 = 0.
            </li>
          </ol>
          <p>
            A delayed input works the same way with row 24 in reverse: a factor{' '}
            <em>e</em><sup>&minus;<em>as</em></sup> in <em>F</em>(<em>s</em>) means &quot;invert the rest,
            then replace <em>t</em> by <em>t</em> &minus; <em>a</em> and multiply by the step
            <em>u</em>(<em>t</em> &minus; <em>a</em>)&quot;. For instance{' '}
            <em>e</em><sup>&minus;3<em>s</em></sup> / (<em>s</em><sup>2</sup> + 4) inverts to
            ½ <em>u</em>(<em>t</em> &minus; 3) sin 2(<em>t</em> &minus; 3). Repeated poles use rows 8
            and 9, and a term <em>A</em>/(<em>s</em> &minus; <em>a</em>)<sup>2</sup> is{' '}
            <em>A t e</em><sup><em>at</em></sup>.
          </p>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2>Typesetting the Laplace Transform Table in LaTeX</h2>
          <p>
            Everything above was produced from the LaTeX below, which compiles with pdfLaTeX and
            only standard packages: <code>amsmath</code> for <code>\dfrac</code> and{' '}
            <code>\text</code>, <code>booktabs</code> for the rules, <code>array</code> for math-mode
            columns and <code>longtable</code> because 26 rows of fractions will not fit on one page.
            Start with the operator symbol.
          </p>

          <h3>The &#8466; symbol and a definition</h3>
          <p>
            <code>\mathcal&#123;L&#125;</code> gives the calligraphic &#8466;. Define it once as{' '}
            <code>\Lap</code> so you can change it everywhere later (many textbooks prefer the script{' '}
            <code>\mathscr&#123;L&#125;</code> from <code>mathrsfs</code>). The braces around the
            argument must be escaped as <code>\&#123;</code> and <code>\&#125;</code>, otherwise LaTeX
            treats them as grouping and prints nothing. <code>\operatorname&#123;Re&#125;</code> gives an
            upright &quot;Re&quot;; the built-in <code>\Re</code> prints a Fraktur &#8476; that most
            readers find harder to parse.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath,amssymb}

\\newcommand{\\Lap}{\\mathcal{L}}          % the transform operator
\\newcommand{\\iLap}{\\mathcal{L}^{-1}}    % its inverse
\\DeclareMathOperator{\\re}{Re}           % upright Re, for the region of convergence

\\begin{document}

The Laplace transform of $f(t)$ is
\\[
  F(s) = \\Lap\\{f(t)\\} = \\int_{0}^{\\infty} e^{-st} f(t)\\,\\mathrm{d}t,
  \\qquad \\re s > a,
\\]
and $f(t) = \\iLap\\{F(s)\\}$ for $t \\ge 0$. For example,
$\\Lap\\{e^{at}\\} = \\dfrac{1}{s-a}$ for $\\re s > \\re a$.

\\end{document}`}</code></pre>

          <h3>The pairs table with booktabs and longtable</h3>
          <p>
            The <code>array</code> package lets a column type open and close math mode around every
            cell, so <code>\newcolumntype&#123;M&#125;&#123;&gt;&#123;$&#125;l&lt;&#123;$&#125;&#125;</code>{' '}
            means you type <code>\dfrac&#123;1&#125;&#123;s&#125;</code> rather than{' '}
            <code>$\dfrac&#123;1&#125;&#123;s&#125;$</code> in each cell. Header text in such a column
            must be wrapped in <code>\multicolumn&#123;1&#125;&#123;l&#125;&#123;...&#125;</code> to
            switch it back to text mode. <code>\arraystretch</code> opens the rows up so stacked
            fractions do not touch; <code>\endhead</code> repeats the header on every page and{' '}
            <code>\endlastfoot</code> puts the bottom rule only after the final row.
          </p>
          <pre><code>{`% Preamble: \\usepackage{booktabs,array,longtable} and
% \\newcolumntype{M}{>{$}l<{$}}  (see the complete document below)

\\renewcommand{\\arraystretch}{1.9}
\\begin{longtable}[l]{M M M}
  \\toprule
  \\multicolumn{1}{l}{$f(t)$} &
  \\multicolumn{1}{l}{$F(s) = \\Lap\\{f(t)\\}$} &
  \\multicolumn{1}{l}{Converges for} \\\\
  \\midrule
  \\endhead
  \\bottomrule
  \\endlastfoot
  1 & \\dfrac{1}{s} & \\re s > 0 \\\\
  t & \\dfrac{1}{s^{2}} & \\re s > 0 \\\\
  t^{n}\\quad (n = 0, 1, 2, \\dots) & \\dfrac{n!}{s^{n+1}} & \\re s > 0 \\\\
  t^{p}\\quad (p > -1) & \\dfrac{\\Gamma(p+1)}{s^{p+1}} & \\re s > 0 \\\\
  \\sqrt{t} & \\dfrac{\\sqrt{\\pi}}{2 s^{3/2}} & \\re s > 0 \\\\
  \\dfrac{1}{\\sqrt{t}} & \\sqrt{\\dfrac{\\pi}{s}} & \\re s > 0 \\\\
  e^{at} & \\dfrac{1}{s-a} & \\re s > \\re a \\\\
  t\\,e^{at} & \\dfrac{1}{(s-a)^{2}} & \\re s > \\re a \\\\
  t^{n} e^{at} & \\dfrac{n!}{(s-a)^{n+1}} & \\re s > \\re a \\\\
  \\dfrac{e^{at} - e^{bt}}{a - b} & \\dfrac{1}{(s-a)(s-b)} & \\re s > \\max(\\re a, \\re b) \\\\
  \\sin(\\omega t) & \\dfrac{\\omega}{s^{2} + \\omega^{2}} & \\re s > 0 \\\\
  \\cos(\\omega t) & \\dfrac{s}{s^{2} + \\omega^{2}} & \\re s > 0 \\\\
  \\sinh(at) & \\dfrac{a}{s^{2} - a^{2}} & \\re s > |a| \\\\
  \\cosh(at) & \\dfrac{s}{s^{2} - a^{2}} & \\re s > |a| \\\\
  e^{at} \\sin(\\omega t) & \\dfrac{\\omega}{(s-a)^{2} + \\omega^{2}} & \\re s > a \\\\
  e^{at} \\cos(\\omega t) & \\dfrac{s-a}{(s-a)^{2} + \\omega^{2}} & \\re s > a \\\\
  t \\sin(\\omega t) & \\dfrac{2 \\omega s}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  t \\cos(\\omega t) & \\dfrac{s^{2} - \\omega^{2}}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  \\sin(\\omega t) - \\omega t \\cos(\\omega t) & \\dfrac{2 \\omega^{3}}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  \\dfrac{\\sin(\\omega t)}{t} & \\arctan\\dfrac{\\omega}{s} & \\re s > 0 \\\\
  \\delta(t) & 1 & \\text{all } s \\\\
  \\delta(t - a)\\quad (a \\ge 0) & e^{-as} & \\text{all } s \\\\
  u(t - a)\\quad (a \\ge 0) & \\dfrac{e^{-as}}{s} & \\re s > 0 \\\\
  u(t - a)\\, f(t - a) & e^{-as} F(s) & \\text{as for } f \\\\
  \\ln t & -\\dfrac{\\gamma + \\ln s}{s} & \\re s > 0 \\\\
  \\operatorname{erf}\\bigl(\\sqrt{t}\\bigr) & \\dfrac{1}{s \\sqrt{s + 1}} & \\re s > 0 \\\\
\\end{longtable}`}</code></pre>
          <p>
            If you only need a dozen rows, swap <code>longtable</code> for a plain{' '}
            <code>tabular</code> and delete the <code>\endhead</code> and <code>\endlastfoot</code>{' '}
            lines. Our <Link href="/learn/tables">LaTeX tables guide</Link> covers both environments
            in detail, including captions and column widths.
          </p>

          <h3>The properties table</h3>
          <p>
            The first column is ordinary text, so its type is <code>l</code>, and the other two use
            the <code>M</code> type again. Integrals and limits inside a table are set in text style
            by default; <code>\displaystyle</code> restores the full-size operator with the limits in
            the right place.
          </p>
          <pre><code>{`\\renewcommand{\\arraystretch}{1.9}
\\begin{tabular}{l M M}
  \\toprule
  Property & f(t) & F(s) \\\\
  \\midrule
  Linearity & a f(t) + b g(t) & a F(s) + b G(s) \\\\
  First derivative & f'(t) & s F(s) - f(0) \\\\
  Second derivative & f''(t) & s^{2} F(s) - s f(0) - f'(0) \\\\
  $n$th derivative & f^{(n)}(t) & s^{n} F(s) - s^{n-1} f(0) - \\dots - f^{(n-1)}(0) \\\\
  Integral & \\displaystyle\\int_{0}^{t} f(\\tau)\\,\\mathrm{d}\\tau & \\dfrac{F(s)}{s} \\\\
  Shift in $s$ & e^{at} f(t) & F(s - a) \\\\
  Shift in $t$ & u(t - a)\\, f(t - a) & e^{-as} F(s) \\\\
  Scaling & f(at)\\quad (a > 0) & \\dfrac{1}{a} F\\!\\left(\\dfrac{s}{a}\\right) \\\\
  Multiply by $t$ & t f(t) & -F'(s) \\\\
  Multiply by $t^{n}$ & t^{n} f(t) & (-1)^{n} F^{(n)}(s) \\\\
  Divide by $t$ & \\dfrac{f(t)}{t} & \\displaystyle\\int_{s}^{\\infty} F(\\sigma)\\,\\mathrm{d}\\sigma \\\\
  Convolution & (f * g)(t) = \\displaystyle\\int_{0}^{t} f(\\tau) g(t - \\tau)\\,\\mathrm{d}\\tau & F(s)\\, G(s) \\\\
  Periodic, period $T$ & f(t + T) = f(t) & \\dfrac{1}{1 - e^{-sT}} \\displaystyle\\int_{0}^{T} e^{-st} f(t)\\,\\mathrm{d}t \\\\
  Initial value & f(0^{+}) & \\displaystyle\\lim_{s \\to \\infty} s F(s) \\\\
  Final value & \\displaystyle\\lim_{t \\to \\infty} f(t) & \\displaystyle\\lim_{s \\to 0} s F(s) \\\\
  \\bottomrule
\\end{tabular}`}</code></pre>

          <h3>A worked inverse transform with align*</h3>
          <p>
            For the derivations, <code>align*</code> lines up the equals signs and{' '}
            <code>\left. ... \right|_&#123;s=-1&#125;</code> produces the evaluation bar used in the
            cover-up method. Inverse transforms use <code>\iLap</code>, defined in the preamble as{' '}
            <code>\mathcal&#123;L&#125;^&#123;-1&#125;</code>.
          </p>
          <pre><code>{`\\begin{align*}
  F(s) &= \\frac{s + 3}{s^{2} + 3s + 2}
        = \\frac{s + 3}{(s + 1)(s + 2)}
        = \\frac{A}{s + 1} + \\frac{B}{s + 2} \\\\
  A &= \\left.\\frac{s + 3}{s + 2}\\right|_{s = -1} = 2, \\qquad
  B = \\left.\\frac{s + 3}{s + 1}\\right|_{s = -2} = -1 \\\\
  f(t) &= \\iLap\\{F(s)\\} = 2e^{-t} - e^{-2t}, \\qquad t \\ge 0.
\\end{align*}`}</code></pre>

          <h3>Complete document</h3>
          <p>
            Here is everything in one file. Compile it twice so <code>longtable</code> can settle the
            column widths; the output is three pages with the pairs table breaking cleanly across the
            first two.
          </p>
          <pre><code>{`\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\usepackage{booktabs,array,longtable}
\\usepackage[margin=2.5cm]{geometry}

% Shorthand for the transform operators
\\newcommand{\\Lap}{\\mathcal{L}}
\\newcommand{\\iLap}{\\mathcal{L}^{-1}}
\\DeclareMathOperator{\\re}{Re}

% Math-mode columns: no need to type $...$ in every cell
\\newcolumntype{M}{>{$}l<{$}}

\\begin{document}

\\section*{Laplace transform table}

The Laplace transform of $f(t)$ is
\\[
  F(s) = \\Lap\\{f(t)\\} = \\int_{0}^{\\infty} e^{-st} f(t)\\,\\mathrm{d}t,
\\]
defined for every complex $s$ with $\\re s$ larger than the abscissa of
convergence of $f$.

\\subsection*{Transform pairs}

\\renewcommand{\\arraystretch}{1.9}
\\begin{longtable}[l]{M M M}
  \\toprule
  \\multicolumn{1}{l}{$f(t)$} &
  \\multicolumn{1}{l}{$F(s) = \\Lap\\{f(t)\\}$} &
  \\multicolumn{1}{l}{Converges for} \\\\
  \\midrule
  \\endhead
  \\bottomrule
  \\endlastfoot
  1 & \\dfrac{1}{s} & \\re s > 0 \\\\
  t & \\dfrac{1}{s^{2}} & \\re s > 0 \\\\
  t^{n}\\quad (n = 0, 1, 2, \\dots) & \\dfrac{n!}{s^{n+1}} & \\re s > 0 \\\\
  t^{p}\\quad (p > -1) & \\dfrac{\\Gamma(p+1)}{s^{p+1}} & \\re s > 0 \\\\
  \\sqrt{t} & \\dfrac{\\sqrt{\\pi}}{2 s^{3/2}} & \\re s > 0 \\\\
  \\dfrac{1}{\\sqrt{t}} & \\sqrt{\\dfrac{\\pi}{s}} & \\re s > 0 \\\\
  e^{at} & \\dfrac{1}{s-a} & \\re s > \\re a \\\\
  t\\,e^{at} & \\dfrac{1}{(s-a)^{2}} & \\re s > \\re a \\\\
  t^{n} e^{at} & \\dfrac{n!}{(s-a)^{n+1}} & \\re s > \\re a \\\\
  \\dfrac{e^{at} - e^{bt}}{a - b} & \\dfrac{1}{(s-a)(s-b)} & \\re s > \\max(\\re a, \\re b) \\\\
  \\sin(\\omega t) & \\dfrac{\\omega}{s^{2} + \\omega^{2}} & \\re s > 0 \\\\
  \\cos(\\omega t) & \\dfrac{s}{s^{2} + \\omega^{2}} & \\re s > 0 \\\\
  \\sinh(at) & \\dfrac{a}{s^{2} - a^{2}} & \\re s > |a| \\\\
  \\cosh(at) & \\dfrac{s}{s^{2} - a^{2}} & \\re s > |a| \\\\
  e^{at} \\sin(\\omega t) & \\dfrac{\\omega}{(s-a)^{2} + \\omega^{2}} & \\re s > a \\\\
  e^{at} \\cos(\\omega t) & \\dfrac{s-a}{(s-a)^{2} + \\omega^{2}} & \\re s > a \\\\
  t \\sin(\\omega t) & \\dfrac{2 \\omega s}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  t \\cos(\\omega t) & \\dfrac{s^{2} - \\omega^{2}}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  \\sin(\\omega t) - \\omega t \\cos(\\omega t) & \\dfrac{2 \\omega^{3}}{(s^{2} + \\omega^{2})^{2}} & \\re s > 0 \\\\
  \\dfrac{\\sin(\\omega t)}{t} & \\arctan\\dfrac{\\omega}{s} & \\re s > 0 \\\\
  \\delta(t) & 1 & \\text{all } s \\\\
  \\delta(t - a)\\quad (a \\ge 0) & e^{-as} & \\text{all } s \\\\
  u(t - a)\\quad (a \\ge 0) & \\dfrac{e^{-as}}{s} & \\re s > 0 \\\\
  u(t - a)\\, f(t - a) & e^{-as} F(s) & \\text{as for } f \\\\
  \\ln t & -\\dfrac{\\gamma + \\ln s}{s} & \\re s > 0 \\\\
  \\operatorname{erf}\\bigl(\\sqrt{t}\\bigr) & \\dfrac{1}{s \\sqrt{s + 1}} & \\re s > 0 \\\\
\\end{longtable}

\\subsection*{Properties}

\\renewcommand{\\arraystretch}{1.9}
\\begin{tabular}{l M M}
  \\toprule
  Property & f(t) & F(s) \\\\
  \\midrule
  Linearity & a f(t) + b g(t) & a F(s) + b G(s) \\\\
  First derivative & f'(t) & s F(s) - f(0) \\\\
  Second derivative & f''(t) & s^{2} F(s) - s f(0) - f'(0) \\\\
  $n$th derivative & f^{(n)}(t) & s^{n} F(s) - s^{n-1} f(0) - \\dots - f^{(n-1)}(0) \\\\
  Integral & \\displaystyle\\int_{0}^{t} f(\\tau)\\,\\mathrm{d}\\tau & \\dfrac{F(s)}{s} \\\\
  Shift in $s$ & e^{at} f(t) & F(s - a) \\\\
  Shift in $t$ & u(t - a)\\, f(t - a) & e^{-as} F(s) \\\\
  Scaling & f(at)\\quad (a > 0) & \\dfrac{1}{a} F\\!\\left(\\dfrac{s}{a}\\right) \\\\
  Multiply by $t$ & t f(t) & -F'(s) \\\\
  Multiply by $t^{n}$ & t^{n} f(t) & (-1)^{n} F^{(n)}(s) \\\\
  Divide by $t$ & \\dfrac{f(t)}{t} & \\displaystyle\\int_{s}^{\\infty} F(\\sigma)\\,\\mathrm{d}\\sigma \\\\
  Convolution & (f * g)(t) = \\displaystyle\\int_{0}^{t} f(\\tau) g(t - \\tau)\\,\\mathrm{d}\\tau & F(s)\\, G(s) \\\\
  Periodic, period $T$ & f(t + T) = f(t) & \\dfrac{1}{1 - e^{-sT}} \\displaystyle\\int_{0}^{T} e^{-st} f(t)\\,\\mathrm{d}t \\\\
  Initial value & f(0^{+}) & \\displaystyle\\lim_{s \\to \\infty} s F(s) \\\\
  Final value & \\displaystyle\\lim_{t \\to \\infty} f(t) & \\displaystyle\\lim_{s \\to 0} s F(s) \\\\
  \\bottomrule
\\end{tabular}

\\subsection*{Worked inverse transform}

\\begin{align*}
  F(s) &= \\frac{s + 3}{s^{2} + 3s + 2}
        = \\frac{s + 3}{(s + 1)(s + 2)}
        = \\frac{A}{s + 1} + \\frac{B}{s + 2} \\\\
  A &= \\left.\\frac{s + 3}{s + 2}\\right|_{s = -1} = 2, \\qquad
  B = \\left.\\frac{s + 3}{s + 1}\\right|_{s = -2} = -1 \\\\
  f(t) &= \\iLap\\{F(s)\\} = 2e^{-t} - e^{-2t}, \\qquad t \\ge 0.
\\end{align*}

\\end{document}`}</code></pre>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is the Laplace transform of 1?</h3>
          <p>
            1/<em>s</em>, valid for Re <em>s</em> &gt; 0. A constant <em>c</em> transforms to{' '}
            <em>c</em>/<em>s</em> by linearity, and the unit step <em>u</em>(<em>t</em>) has the same
            transform as 1 because the integral only runs from <em>t</em> = 0.
          </p>
          <h3>What is the Laplace transform of <em>e</em><sup><em>at</em></sup>?</h3>
          <p>
            1/(<em>s</em> &minus; <em>a</em>), valid for Re <em>s</em> &gt; Re <em>a</em>. Replacing{' '}
            <em>a</em> by &minus;<em>a</em> gives 1/(<em>s</em> + <em>a</em>) for the decaying
            exponential <em>e</em><sup>&minus;<em>at</em></sup>, which is the pair that appears in
            almost every circuit and differential-equation problem.
          </p>
          <h3>What are the Laplace transforms of sin(&omega;<em>t</em>) and cos(&omega;<em>t</em>)?</h3>
          <p>
            sin(&omega;<em>t</em>) transforms to &omega;/(<em>s</em><sup>2</sup> + &omega;<sup>2</sup>)
            and cos(&omega;<em>t</em>) to <em>s</em>/(<em>s</em><sup>2</sup> + &omega;<sup>2</sup>),
            both for Re <em>s</em> &gt; 0. The one with <em>s</em> in the numerator is the cosine:
            cos(0) = 1, so its transform has to behave like 1/<em>s</em> for large <em>s</em>, while
            sin(0) = 0 makes its transform fall off like 1/<em>s</em><sup>2</sup>.
          </p>
          <h3>What does the &quot;Re <em>s</em> &gt; <em>a</em>&quot; column mean?</h3>
          <p>
            It is the region of convergence: the defining integral only converges for <em>s</em> to
            the right of the abscissa <em>a</em>, and the closed-form <em>F</em>(<em>s</em>) is only
            guaranteed to equal the integral there. For solving initial value problems you rarely need
            it, because you read the inverse transform straight off the table.
          </p>
          <h3>Is this the one-sided or two-sided Laplace transform?</h3>
          <p>
            One-sided (unilateral), integrating from 0 to &infin;. That is the transform used for
            initial value problems and in engineering courses, and the derivative rules with{' '}
            <em>f</em>(0) and <em>f</em>&prime;(0) only make sense for it. The bilateral transform
            integrates from &minus;&infin; to &infin;, is closer to the Fourier transform, and has
            different tables for functions that are nonzero for <em>t</em> &lt; 0.
          </p>
          <h3>How do I write the Laplace transform symbol in LaTeX?</h3>
          <p>
            <code>\mathcal&#123;L&#125;</code> in math mode gives the calligraphic &#8466;;{' '}
            <code>\mathscr&#123;L&#125;</code> from the <code>mathrsfs</code> package gives the script
            form many textbooks use. Define <code>\newcommand&#123;\Lap&#125;&#123;\mathcal&#123;L&#125;&#125;</code>{' '}
            once in the preamble and write <code>\Lap\&#123;f(t)\&#125;</code>, with the braces escaped
            so they are printed.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The table is the easy part; these guides cover the LaTeX around it:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Fractions, roots, aligned equations and the amsmath environments used above</li>
            <li><Link href="/learn/tables">LaTeX Tables</Link> – booktabs, longtable, column types, captions and multi-page tables</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> – Typeset the defining integral and the convolution with proper limits</li>
            <li><Link href="/learn/greek-alphabet">The Greek Alphabet</Link> – &omega;, &tau;, &sigma;, &gamma; and &delta; with their LaTeX commands</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> – Number the transform definition and cite it from the text</li>
            <li><Link href="/learn/math-functions">Math Functions in LaTeX</Link> – \sin, \cos, \ln, \operatorname and \DeclareMathOperator</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste the table source and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Turn a handwritten transform pair into LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Look up \mathcal, \infty, \omega and every other symbol</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Typeset your own reference tables</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor: paste the table above, ask it to add a row or
              switch to script &#8466;, and see the compiled PDF update as you type.
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
