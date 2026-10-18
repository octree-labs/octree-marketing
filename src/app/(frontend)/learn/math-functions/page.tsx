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

const breadcrumbs = getLearnBreadcrumbs('Math Functions in LaTeX', 'math-functions')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'math-functions',
  title: 'Math Functions in LaTeX: log, ln, exp, argmax, floor, ceiling, absolute value and norm',
  seoTitle: 'LaTeX Math Functions: log, exp, argmax, abs, norm',
  description:
    'How to typeset functions in LaTeX: \\log, \\ln, \\exp and the other predefined operators, argmax with \\DeclareMathOperator*, floor and ceiling, absolute value with \\lvert \\rvert, norms with \\lVert \\rVert, mathtools \\DeclarePairedDelimiter, roots, fractions, function notation, piecewise functions and common errors.',
  keywords:
    'latex log, latex ln, latex exp, logarithms in latex, latex argmax, latex argmin, latex floor, latex ceiling, latex absolute value, absolute value bars latex, latex norm, latex sin cos, latex limit, latex function notation, DeclareMathOperator, operatorname, DeclarePairedDelimiter, lvert rvert, lfloor rfloor, latex piecewise function, latex mapsto',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I write log base 2 or log base 10 in LaTeX?',
    answer:
      'Put the base in a subscript on the operator: \\log_2 x and \\log_{10} x. Braces are needed when the base has more than one character. \\ln x is the natural logarithm and \\lg x is defined as well; ISO 80000-2 reserves lg for base 10 and lb for base 2, and \\lb does not exist, so define it with \\DeclareMathOperator{\\lb}{lb} if you follow that convention.',
  },
  {
    question: 'Why does my function name come out in italics?',
    answer:
      'Because you typed log or sin as plain letters, which LaTeX treats as the product of the variables l, o and g. Use the operator commands \\log, \\sin, \\exp and so on; they set the name upright and add the correct space before the argument. For a function that has no command, write \\operatorname{name}, or define it once in the preamble with \\DeclareMathOperator.',
  },
  {
    question: 'How do I write argmax with the argument underneath?',
    answer:
      'Load amsmath and define the operator with the starred form, \\DeclareMathOperator*{\\argmax}{arg\\,max}. The star makes subscripts go below the operator in display math, like \\lim and \\max, so \\argmax_{\\theta} f(\\theta) puts \\theta underneath. In inline math the subscript stays to the right unless you add \\limits.',
  },
  {
    question: 'What is the difference between |x|, \\lvert x \\rvert and \\left| x \\right|?',
    answer:
      'A plain | is an ordinary symbol, so LaTeX does not know whether it opens or closes and spaces it badly next to minus signs and operators. \\lvert and \\rvert from amsmath are proper opening and closing delimiters with correct spacing. \\left| ... \\right| additionally scales the bars to the height of the content, which you want around fractions but not around a single letter, where it adds unwanted space. The cleanest option is a mathtools paired delimiter: \\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert} gives \\abs{x} for fixed bars and \\abs*{...} for scaled ones.',
  },
  {
    question: 'How do I typeset a norm in LaTeX?',
    answer:
      'Use \\lVert x \\rVert, or \\| x \\| for a quick fixed-size version. Subscripts for the type of norm go after the closing delimiter, \\lVert x \\rVert_2, \\lVert x \\rVert_\\infty, \\lVert A \\rVert_F. With mathtools, \\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert} lets you write \\norm{x}_2 and \\norm*{...} for automatic sizing.',
  },
  {
    question: 'Should I use \\frac or \\dfrac?',
    answer:
      '\\frac picks the style for you: full-size in display math and small in inline math. \\dfrac forces the display size and \\tfrac the small text size regardless of context. Use \\dfrac sparingly in inline text, as it stretches the line spacing; it is most useful inside a matrix or a cases environment where \\frac would be reduced.',
  },
]

export default async function LaTeXMathFunctionsPage() {
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
          <h1>Math Functions in LaTeX: log, ln, exp, argmax, floor, ceiling, absolute value and norm</h1>
          <p className="lead">
            Function names in mathematics are set upright, not in italics, and with a small
            space before their argument: log <em>x</em>, not <em>log x</em>. LaTeX gets this
            right only if you use the operator commands. This guide lists every predefined
            function, shows how to define your own (argmax, sgn, tr) with the right spacing
            and limits, and covers the delimiters that go with them: floor and ceiling,
            absolute value bars and norms, roots, fractions, function notation and piecewise
            definitions.
          </p>

          {/* ── Why \log ── */}
          <h2>Why \log and Not log</h2>
          <p>
            In math mode every letter is a variable, so <code>$log(x)$</code> is typeset as the
            product <em>l</em>&middot;<em>o</em>&middot;<em>g</em> in italics, with no spacing
            logic. <code>\log</code> is an <em>operator</em>: upright roman, and LaTeX inserts a
            thin space between it and what follows unless that is a parenthesis:
          </p>
          <pre><code>{`$log(x)$   $sin x$      % wrong: italic variables l, o, g
$\\log(x)$  $\\sin x$     % right: upright, correctly spaced
$\\log_2 x$  $\\log_{10} x$  $\\ln x$  $\\lg x$`}</code></pre>
          <p>
            The base of a logarithm is a subscript on the operator. <code>\ln</code> is the
            natural logarithm and <code>\lg</code> exists too; ISO 80000-2 defines lg as base
            10 and lb as base 2, but there is no <code>\lb</code> command, so define it if you
            need it (see below). Powers go on the operator as well: <code>\sin^2 x</code> and{' '}
            <code>\log^2 x</code> are standard, though <code>\log(x)^2</code> is clearer when
            there is any chance of confusion with <code>\log x^2</code>.
          </p>

          {/* ── predefined ── */}
          <h2>All Predefined Function Operators</h2>
          <p>
            These are built into LaTeX and amsmath, so no package is needed for the first
            group. Operators marked with limits take their subscript underneath in display
            math, like <code>\lim_{'{x \\to 0}'}</code>:
          </p>
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Commands</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Trigonometric</td><td><code>\sin \cos \tan \cot \sec \csc</code></td></tr>
              <tr><td>Inverse trigonometric</td><td><code>\arcsin \arccos \arctan</code> (write <code>\operatorname{'{arccot}'}</code> for the others)</td></tr>
              <tr><td>Hyperbolic</td><td><code>\sinh \cosh \tanh \coth</code></td></tr>
              <tr><td>Logarithms and exponential</td><td><code>\log \ln \lg \exp</code></td></tr>
              <tr><td>Limits (limits below)</td><td><code>\lim \limsup \liminf \varlimsup \varliminf \injlim \projlim \varinjlim \varprojlim</code></td></tr>
              <tr><td>Extrema (limits below)</td><td><code>\max \min \sup \inf</code></td></tr>
              <tr><td>Algebra</td><td><code>\det \dim \ker \deg \gcd \hom \arg \Pr</code> (<code>\det</code>, <code>\gcd</code> and <code>\Pr</code> take limits below)</td></tr>
            </tbody>
          </table>
          <pre><code>{`\\[ \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\qquad
   \\max_{i} a_i, \\qquad \\gcd(a, b), \\qquad \\Pr(X \\le x), \\qquad \\det A \\]`}</code></pre>
          <p>
            Inline, the subscript of a limit-taking operator sits to the right
            (<em>lim</em><sub><em>x</em>&rarr;0</sub>) so the line spacing stays even; add{' '}
            <code>\limits</code> after the operator if you insist on it underneath, or wrap the
            formula in <code>\displaystyle</code>.
          </p>

          {/* ── exp ── */}
          <h2>Exponentials: e^x versus \exp</h2>
          <p>
            Both are correct; choose by the size of the argument. A short exponent reads best
            as a superscript, a long one as <code>\exp</code> so the reader does not have to
            squint at a tiny fraction:
          </p>
          <pre><code>{`\\[ e^{x}, \\qquad e^{-x^2/2\\sigma^2}, \\qquad
   \\exp\\left(-\\frac{x^2}{2\\sigma^2}\\right) \\]`}</code></pre>
          <p>
            ISO and many physics journals set the constant upright as <code>\mathrm{'{e}'}</code>;
            most mathematics journals leave it italic. Pick one and keep it consistent, ideally
            through a macro such as <code>{`\\newcommand{\\e}{\\mathrm{e}}`}</code>.
          </p>

          {/* ── Custom operators ── */}
          <h2>Defining Your Own: argmax, sgn, tr and operatorname</h2>
          <p>
            argmax, argmin, sgn, tr, rank, Var, softmax and the like have no command. For a
            one-off use <code>\operatorname{'{...}'}</code>; for anything you use more than
            once, define it in the preamble with amsmath&apos;s{' '}
            <code>\DeclareMathOperator</code>. The starred form makes subscripts go underneath
            in display math, which is what argmax needs:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\DeclareMathOperator*{\\argmax}{arg\\,max}   % * = limits go below
\\DeclareMathOperator*{\\argmin}{arg\\,min}
\\DeclareMathOperator{\\sgn}{sgn}
\\DeclareMathOperator{\\tr}{tr}
\\DeclareMathOperator{\\rank}{rank}
\\DeclareMathOperator{\\lb}{lb}               % binary logarithm

\\[ \\hat\\theta = \\argmax_{\\theta \\in \\Theta} \\mathcal{L}(\\theta), \\qquad
   \\operatorname*{arg\\,max}_{x} f(x), \\qquad
   \\sgn(x), \\quad \\tr(A), \\quad \\operatorname{softmax}(z)_i \\]`}</code></pre>
          <p>
            The <code>\,</code> inside <code>arg\,max</code> is a thin space; without it the two
            words run together. <code>\DeclareMathOperator</code> may only be used in the
            preamble, and it refuses to redefine an existing command, so if a class or package
            already provides <code>\argmax</code> you will see{' '}
            <em>Command \argmax already defined</em>; delete your definition or use{' '}
            <code>\renewcommand</code> with <code>\operatorname*</code>. Do not reach for{' '}
            <code>\mathrm{'{argmax}'}</code>: it gives upright letters but none of the operator
            spacing, and limits would be set as ordinary subscripts.
          </p>

          {/* ── floor/ceil ── */}
          <h2>Floor and Ceiling</h2>
          <p>
            Floor and ceiling are not operators but pairs of delimiters, so they are written with
            the bracket commands <code>\lfloor \rfloor</code> and <code>\lceil \rceil</code>:
          </p>
          <pre><code>{`\\[ \\lfloor x \\rfloor, \\quad \\lceil x \\rceil, \\quad
   \\left\\lfloor \\frac{n}{2} \\right\\rfloor, \\quad
   \\lceil \\log_2 n \\rceil \\]`}</code></pre>
          <p>
            <code>\left</code> and <code>\right</code> scale the brackets to the content; use
            them around fractions and leave them off around a single symbol. With mathtools
            you can wrap this into a command that handles both cases (next section).
          </p>

          {/* ── abs ── */}
          <h2>Absolute Value: |x|, \lvert x \rvert and \left| x \right|</h2>
          <p>
            Typing <code>|x|</code> works for a quick formula, but the vertical bar is an
            ordinary symbol with no idea of whether it opens or closes, so the spacing is wrong
            next to operators: <code>$|-x|$</code> has an uneven gap around the minus. amsmath
            provides <code>\lvert</code> and <code>\rvert</code>, which are real opening and
            closing delimiters:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\[ |x|, \\qquad \\lvert x \\rvert, \\qquad \\lvert -x \\rvert,
   \\qquad \\left\\lvert \\frac{a}{b} \\right\\rvert \\]`}</code></pre>
          <p>
            The same three choices exist for every delimiter: plain for a single letter,{' '}
            <code>\lvert ... \rvert</code> for correct spacing, <code>\left ... \right</code>{' '}
            when the content is tall. <code>\left|</code> around a single letter is a common
            mistake: it adds space on both sides and is slightly too tall.
          </p>

          {/* ── norm ── */}
          <h2>Norms: \lVert x \rVert and \|x\|</h2>
          <p>
            Double bars follow the same pattern. <code>\|</code> is a single ordinary symbol
            that prints two bars; <code>\lVert</code> and <code>\rVert</code> are the proper
            delimiters. The subscript naming the norm goes after the closing bar:
          </p>
          <pre><code>{`\\[ \\|x\\|, \\qquad \\lVert x \\rVert_2, \\qquad \\lVert x \\rVert_\\infty,
   \\qquad \\lVert A \\rVert_F, \\qquad \\left\\lVert \\frac{x}{\\|x\\|} \\right\\rVert \\]`}</code></pre>
          <p>
            Never write <code>||x||</code> with two single bars: LaTeX sets a space between
            them and the result looks like four separate strokes.
          </p>

          {/* ── mathtools ── */}
          <h2>mathtools: \DeclarePairedDelimiter for \abs, \norm, \floor and \ceil</h2>
          <p>
            mathtools (which loads amsmath) lets you define a delimiter pair as one command.
            The plain form gives fixed-size delimiters, the starred form inserts{' '}
            <code>\left</code> and <code>\right</code>, and an optional argument sets a manual
            size:
          </p>
          <pre><code>{`\\usepackage{mathtools}
\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}
\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}
\\DeclarePairedDelimiter{\\floor}{\\lfloor}{\\rfloor}
\\DeclarePairedDelimiter{\\ceil}{\\lceil}{\\rceil}

\\[ \\abs{x}, \\quad \\abs*{\\frac{a}{b}}, \\quad \\abs[\\Big]{\\frac{a}{b}}, \\quad
   \\norm{x}_2, \\quad \\norm*{\\frac{x}{\\norm{x}}}, \\quad
   \\floor{\\frac{n}{2}}, \\quad \\floor*{\\frac{n}{2}}, \\quad \\ceil[\\big]{\\frac{n}{2}} \\]`}</code></pre>
          <p>
            This is the recommended way to handle absolute values and norms in any document
            longer than a page: the notation is consistent, and if a journal wants different
            delimiters you change one line.
          </p>

          {/* ── roots, fractions ── */}
          <h2>Roots and Fractions</h2>
          <pre><code>{`\\[ \\sqrt{x}, \\quad \\sqrt[3]{x}, \\quad \\sqrt[n]{x^2 + 1}, \\quad
   \\frac{a}{b}, \\quad \\dfrac{a}{b}, \\quad \\tfrac{a}{b}, \\quad
   \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!} \\]`}</code></pre>
          <p>
            <code>\sqrt[n]{'{...}'}</code> takes the index as an optional argument.{' '}
            <code>\frac</code> adapts to its context, <code>\dfrac</code> forces display size
            and <code>\tfrac</code> forces text size; <code>\binom</code>, <code>\dbinom</code>{' '}
            and <code>\tbinom</code> do the same for binomial coefficients. Inline, prefer{' '}
            <code>a/b</code> or <code>\tfrac</code> for simple ratios so the line spacing is not
            pushed apart.
          </p>

          {/* ── function notation ── */}
          <h2>Function Notation: f\colon A \to B, \mapsto, composition and inverses</h2>
          <p>
            A function is declared with its domain and codomain using <code>\colon</code>{' '}
            rather than a bare colon (which is spaced as a relation, with too much room on the
            left) and <code>\to</code>; the rule is written with <code>\mapsto</code>:
          </p>
          <pre><code>{`\\[ f\\colon \\mathbb{R} \\to \\mathbb{R}, \\quad x \\mapsto x^2, \\qquad
   (g \\circ f)(x) = g(f(x)), \\qquad f^{-1}(y), \\qquad
   f'(x), \\; f''(x), \\; f^{(n)}(x) \\]`}</code></pre>
          <p>
            <code>\mathbb</code> needs <code>amssymb</code>. <code>\circ</code> is
            composition, and <code>f^{'{-1}'}</code> is the inverse (note that{' '}
            <code>\sin^{'{-1}'} x</code> means arcsin, which is why <code>\arcsin</code> is
            clearer). Derivatives use primes, and the differential is often set upright,{' '}
            <code>\frac{'{\\mathrm{d}y}{\\mathrm{d}x}'}</code>, with <code>\partial</code> for
            partial derivatives:
          </p>
          <pre><code>{`\\[ \\frac{\\mathrm{d}}{\\mathrm{d}x} \\sin x = \\cos x, \\qquad
   \\frac{\\partial f}{\\partial x}, \\qquad
   \\frac{\\partial^2 f}{\\partial x\\, \\partial y}, \\qquad \\nabla f \\]`}</code></pre>

          {/* ── piecewise ── */}
          <h2>Piecewise Functions with cases</h2>
          <p>
            amsmath&apos;s <code>cases</code> environment sets the brace and aligns the
            conditions; separate the value and the condition with <code>&amp;</code> and put
            the condition text in <code>\text</code>:
          </p>
          <pre><code>{`\\[ |x| = \\begin{cases}
     x  & \\text{if } x \\ge 0, \\\\
     -x & \\text{if } x < 0.
   \\end{cases} \\]`}</code></pre>
          <p>
            Fractions inside <code>cases</code> are set in text style; use <code>\dfrac</code>{' '}
            there if they are hard to read, or mathtools&apos; <code>dcases</code> environment,
            which does it for every line.
          </p>

          {/* ── physics ── */}
          <h2>The physics Package: Convenient, with Caveats</h2>
          <p>
            The <code>physics</code> package offers ready-made <code>\abs</code>,{' '}
            <code>\norm</code>, <code>\dv{'{f}{x}'}</code>, <code>\pdv{'{f}{x}'}</code>,{' '}
            <code>\grad</code>, <code>\curl</code> and more, with automatic sizing by default:
          </p>
          <pre><code>{`\\usepackage{physics}
\\[ \\abs{x}, \\quad \\norm{v}, \\quad \\dv{f}{x}, \\quad \\pdv[2]{f}{x}, \\quad
   \\grad f, \\quad \\div \\vb{F}, \\quad \\curl \\vb{F} \\]`}</code></pre>
          <p>
            Three things to know before adopting it. It redefines <code>\div</code>, so the
            division sign &divide; is gone. It defines <code>\abs</code> and <code>\norm</code>{' '}
            itself, so combining it with the mathtools definitions above fails with{' '}
            <em>Command \abs already defined</em>; pick one. And its argument parsing is
            unusual (it looks ahead for parentheses), which produces surprising output in edge
            cases. The newer <code>physics2</code> and <code>derivative</code> packages fix
            these problems and are the better choice for a new document.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <table>
            <thead>
              <tr>
                <th>Symptom or message</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Function name in italics, no space before the argument</td>
                <td><code>log x</code> instead of <code>\log x</code></td>
                <td>Use the operator command or <code>\operatorname</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \argmax</em> (or <code>\sgn</code>, <code>\tr</code>, <code>\abs</code>, <code>\norm</code>)</td>
                <td>Not predefined</td>
                <td><code>\DeclareMathOperator</code> / <code>\DeclarePairedDelimiter</code> in the preamble</td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \lvert</em> / <code>\dfrac</code> / <code>\text</code></td>
                <td>amsmath not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code> (or mathtools)</td>
              </tr>
              <tr>
                <td><em>Command \abs already defined</em></td>
                <td>physics and a mathtools definition both define it</td>
                <td>Remove one; or name yours differently</td>
              </tr>
              <tr>
                <td><em>Can be used only in preamble</em></td>
                <td><code>\DeclareMathOperator</code> inside the document</td>
                <td>Move it before <code>\begin{'{document}'}</code>; use <code>\operatorname</code> in the body</td>
              </tr>
              <tr>
                <td><em>Missing \right. inserted</em> / <em>Extra \right</em></td>
                <td><code>\left</code> and <code>\right</code> not paired in the same line or group</td>
                <td>Pair them; use <code>\right.</code> for an invisible closing delimiter</td>
              </tr>
              <tr>
                <td>Subscript of argmax or lim sits to the right in display math</td>
                <td>Defined without the star, or <code>\mathrm</code> used</td>
                <td><code>\DeclareMathOperator*</code> or <code>\operatorname*</code></td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em> around <code>\frac</code> or <code>\sqrt</code></td>
                <td>Math command used in text</td>
                <td>Wrap in <code>$...$</code> or <code>\[...\]</code></td>
              </tr>
              <tr>
                <td>Bars around a single letter look too wide</td>
                <td><code>\left|</code> ... <code>\right|</code> on a small argument</td>
                <td>Use <code>\lvert ... \rvert</code> or the unstarred paired delimiter</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath, amssymb}
\\usepackage{mathtools}
\\DeclareMathOperator*{\\argmax}{arg\\,max}
\\DeclareMathOperator{\\sgn}{sgn}
\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}
\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}
\\DeclarePairedDelimiter{\\floor}{\\lfloor}{\\rfloor}

\\begin{document}
Let $f\\colon \\mathbb{R}^n \\to \\mathbb{R}$ be differentiable. The maximiser
\\[
  x^\\star = \\argmax_{x \\in \\mathbb{R}^n} f(x)
  \\quad\\text{satisfies}\\quad
  \\norm{\\nabla f(x^\\star)}_2 = 0 .
\\]
For $x \\neq 0$ we have $\\sgn(x) = x / \\abs{x}$, and
\\[
  \\ln\\bigl(\\exp(x)\\bigr) = x, \\qquad
  \\log_2 n \\le \\floor{\\log_2 n} + 1, \\qquad
  \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 .
\\]
The sign function is piecewise:
\\[
  \\sgn(x) = \\begin{cases}
    1  & \\text{if } x > 0, \\\\
    0  & \\text{if } x = 0, \\\\
    -1 & \\text{if } x < 0.
  \\end{cases}
\\]
\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Logarithm, base 2, natural</td><td><code>\log x</code>, <code>\log_2 x</code>, <code>\ln x</code></td></tr>
              <tr><td>Exponential</td><td><code>e^{'{x}'}</code>, <code>\exp(x)</code></td></tr>
              <tr><td>Trigonometric and inverse</td><td><code>\sin x</code>, <code>\cos x</code>, <code>\tan x</code>, <code>\arcsin x</code>, <code>\sinh x</code></td></tr>
              <tr><td>Limit, max, min, sup, inf</td><td><code>\lim_{'{x \\to a}'}</code>, <code>\max_i</code>, <code>\sup_x</code></td></tr>
              <tr><td>argmax / argmin</td><td><code>{`\\DeclareMathOperator*{\\argmax}{arg\\,max}`}</code> then <code>\argmax_x</code></td></tr>
              <tr><td>Custom operator</td><td><code>\operatorname{'{sgn}'}</code> or <code>{`\\DeclareMathOperator{\\sgn}{sgn}`}</code></td></tr>
              <tr><td>Floor, ceiling</td><td><code>\lfloor x \rfloor</code>, <code>\lceil x \rceil</code></td></tr>
              <tr><td>Absolute value</td><td><code>\lvert x \rvert</code>; <code>\abs{'{x}'}</code> with <code>\DeclarePairedDelimiter</code></td></tr>
              <tr><td>Norm</td><td><code>\lVert x \rVert_2</code>, <code>\|x\|</code>; <code>\norm{'{x}'}</code></td></tr>
              <tr><td>Auto-sized delimiters</td><td><code>\left\lvert ... \right\rvert</code>, <code>\abs*{'{...}'}</code></td></tr>
              <tr><td>Roots</td><td><code>\sqrt{'{x}'}</code>, <code>\sqrt[n]{'{x}'}</code></td></tr>
              <tr><td>Fractions</td><td><code>\frac</code>, <code>\dfrac</code>, <code>\tfrac</code>, <code>\binom</code></td></tr>
              <tr><td>Function declaration</td><td><code>f\colon A \to B</code>, <code>x \mapsto f(x)</code></td></tr>
              <tr><td>Composition, inverse</td><td><code>g \circ f</code>, <code>f^{'{-1}'}</code></td></tr>
              <tr><td>Derivatives</td><td><code>f&apos;(x)</code>, <code>\frac{'{\\mathrm{d}y}{\\mathrm{d}x}'}</code>, <code>\partial</code></td></tr>
              <tr><td>Piecewise</td><td><code>\begin{'{cases}'} ... \end{'{cases}'}</code></td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write log base 2 or log base 10 in LaTeX?</h3>
          <p>
            Put the base in a subscript on the operator: <code>\log_2 x</code> and{' '}
            <code>\log_{'{10}'} x</code>. Braces are needed when the base has more than one
            character. <code>\ln x</code> is the natural logarithm and <code>\lg x</code> is
            defined as well; ISO 80000-2 reserves lg for base 10 and lb for base 2, and{' '}
            <code>\lb</code> does not exist, so define it with{' '}
            <code>{`\\DeclareMathOperator{\\lb}{lb}`}</code> if you follow that convention.
          </p>
          <h3>Why does my function name come out in italics?</h3>
          <p>
            Because you typed <code>log</code> or <code>sin</code> as plain letters, which LaTeX
            treats as the product of the variables <em>l</em>, <em>o</em> and <em>g</em>. Use the
            operator commands <code>\log</code>, <code>\sin</code>, <code>\exp</code> and so on;
            they set the name upright and add the correct space before the argument. For a
            function that has no command, write <code>\operatorname{'{name}'}</code>, or define
            it once in the preamble with <code>\DeclareMathOperator</code>.
          </p>
          <h3>How do I write argmax with the argument underneath?</h3>
          <p>
            Load amsmath and define the operator with the starred form,{' '}
            <code>{`\\DeclareMathOperator*{\\argmax}{arg\\,max}`}</code>. The star makes
            subscripts go below the operator in display math, like <code>\lim</code> and{' '}
            <code>\max</code>, so <code>\argmax_{'{\\theta}'} f(\theta)</code> puts &theta;
            underneath. In inline math the subscript stays to the right unless you add{' '}
            <code>\limits</code>.
          </p>
          <h3>What is the difference between |x|, \lvert x \rvert and \left| x \right|?</h3>
          <p>
            A plain <code>|</code> is an ordinary symbol, so LaTeX does not know whether it
            opens or closes and spaces it badly next to minus signs and operators.{' '}
            <code>\lvert</code> and <code>\rvert</code> from amsmath are proper opening and
            closing delimiters with correct spacing. <code>\left| ... \right|</code>{' '}
            additionally scales the bars to the height of the content, which you want around
            fractions but not around a single letter, where it adds unwanted space. The
            cleanest option is a mathtools paired delimiter:{' '}
            <code>{`\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}`}</code> gives{' '}
            <code>\abs{'{x}'}</code> for fixed bars and <code>\abs*{'{...}'}</code> for scaled ones.
          </p>
          <h3>How do I typeset a norm in LaTeX?</h3>
          <p>
            Use <code>\lVert x \rVert</code>, or <code>\| x \|</code> for a quick fixed-size
            version. Subscripts for the type of norm go after the closing delimiter,{' '}
            <code>\lVert x \rVert_2</code>, <code>\lVert x \rVert_\infty</code>,{' '}
            <code>\lVert A \rVert_F</code>. With mathtools,{' '}
            <code>{`\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}`}</code> lets you write{' '}
            <code>\norm{'{x}'}_2</code> and <code>\norm*{'{...}'}</code> for automatic sizing.
          </p>
          <h3>Should I use \frac or \dfrac?</h3>
          <p>
            <code>\frac</code> picks the style for you: full-size in display math and small in
            inline math. <code>\dfrac</code> forces the display size and <code>\tfrac</code>{' '}
            the small text size regardless of context. Use <code>\dfrac</code> sparingly in
            inline text, as it stretches the line spacing; it is most useful inside a matrix or
            a <code>cases</code> environment where <code>\frac</code> would be reduced.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Functions sorted? These guides cover the rest of math typesetting:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Inline and display math, fractions, roots and the amsmath environments</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses</Link> &ndash; <code>\left</code>, <code>\right</code>, <code>\big</code> sizes and every delimiter</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; Large operators and where their limits go</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> &ndash; Bases, exponents and multi-character indices</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; &theta;, &sigma;, &nabla; and the rest</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> &ndash; Label and reference the equations you write</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert a handwritten or pasted formula to LaTeX, operators included</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check the spacing of your operators and delimiters live</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Delimiters, arrows and operator symbols</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX math" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write math faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor turns &ldquo;argmax over theta of the likelihood&rdquo;
              into correct LaTeX, defines the operators you need in the preamble, and
              compiles your document in seconds.
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
