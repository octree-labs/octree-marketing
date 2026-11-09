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

const breadcrumbs = getLearnBreadcrumbs('Greek Letters in LaTeX', 'greek-letters-math-symbols')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'greek-letters-math-symbols',
  title: 'Greek Letters in LaTeX: Full Table, Epsilon, Lambda and Math Symbols',
  seoTitle: 'Greek Letters in LaTeX: Epsilon, Lambda, Full Table',
  description: 'All 24 Greek letters in LaTeX: uppercase, variants like \\varepsilon, epsilon vs varepsilon, lambda, bold and upright Greek, and common math symbols.',
  keywords: 'latex greek letters, greek letters in latex, latex epsilon, epsilon in latex, latex varepsilon, epsilon vs varepsilon, lambda latex, latex lambda, latex alpha, latex beta, latex gamma, latex delta, latex theta, latex mu, latex pi, latex sigma, latex phi, latex varphi, latex omega, latex kappa, latex rho, latex upright greek, upgreek, latex upmu, latex bold greek, boldsymbol, latex symbols, latex math symbols, latex infinity, latex arrow, latex operators, latex relations',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do you write epsilon in LaTeX?',
    answer:
      'In math mode, $\\epsilon$ gives the lunate epsilon ϵ and $\\varepsilon$ gives the curly epsilon ε that most textbooks use. Both are built in, no package needed. Capital epsilon has no command because it looks like a Latin E, so write E (or \\mathrm{E}).',
  },
  {
    question: 'What is the difference between \\epsilon and \\varepsilon?',
    answer:
      'They are two shapes of the same letter. \\epsilon is the lunate form ϵ, which looks like the set membership sign; \\varepsilon is the open, curly form ε used in most analysis and physics texts for small quantities and permittivity. To get ε everywhere, add \\renewcommand{\\epsilon}{\\varepsilon} to the preamble.',
  },
  {
    question: 'How do I write lambda in LaTeX?',
    answer:
      'Use $\\lambda$ for lowercase λ and $\\Lambda$ for uppercase Λ, both in math mode with no package. Typical uses are eigenvalues ($A\\mathbf{v} = \\lambda\\mathbf{v}$), wavelength ($c = \\lambda\\nu$) and the Poisson rate. For a bold lambda write $\\boldsymbol{\\lambda}$ with amsmath.',
  },
  {
    question: 'Why is \\Alpha an undefined control sequence?',
    answer:
      'LaTeX only defines capital Greek letters that look different from Latin ones: \\Gamma, \\Delta, \\Theta, \\Lambda, \\Xi, \\Pi, \\Sigma, \\Upsilon, \\Phi, \\Psi and \\Omega. Capital alpha, beta, epsilon, zeta, eta, iota, kappa, mu, nu, omicron, rho, tau and chi are written with the Latin letters A, B, E, Z, H, I, K, M, N, O, P, T and X.',
  },
  {
    question: 'Why do I get "Missing $ inserted" when I type \\alpha?',
    answer:
      'Greek letter commands only work in math mode. Typed in a normal sentence, \\alpha makes LaTeX insert a $ and stop. Write $\\alpha$ instead, or load the textgreek package and use \\textalpha for a Greek letter in running text.',
  },
]

type GreekRow = {
  name: string
  glyphs: string
  lower: string
  upper: string
  /** True when the uppercase is a plain Latin letter rather than a command. */
  upperIsLatin?: boolean
  variant?: string
  unicode: string
  use: string
}

const greekLetters: GreekRow[] = [
  { name: 'Alpha', glyphs: 'α Α', lower: '\\alpha', upper: 'A', upperIsLatin: true, unicode: 'U+03B1 / U+0391', use: 'Angles, significance level' },
  { name: 'Beta', glyphs: 'β Β', lower: '\\beta', upper: 'B', upperIsLatin: true, unicode: 'U+03B2 / U+0392', use: 'Coefficients, beta function' },
  { name: 'Gamma', glyphs: 'γ Γ', lower: '\\gamma', upper: '\\Gamma', unicode: 'U+03B3 / U+0393', use: 'Gamma function, Lorentz factor' },
  { name: 'Delta', glyphs: 'δ Δ', lower: '\\delta', upper: '\\Delta', unicode: 'U+03B4 / U+0394', use: 'Small change, Dirac delta' },
  { name: 'Epsilon', glyphs: 'ϵ ε Ε', lower: '\\epsilon', upper: 'E', upperIsLatin: true, variant: '\\varepsilon', unicode: 'U+03F5, U+03B5 / U+0395', use: 'Small quantity, permittivity' },
  { name: 'Zeta', glyphs: 'ζ Ζ', lower: '\\zeta', upper: 'Z', upperIsLatin: true, unicode: 'U+03B6 / U+0396', use: 'Riemann zeta, damping ratio' },
  { name: 'Eta', glyphs: 'η Η', lower: '\\eta', upper: 'H', upperIsLatin: true, unicode: 'U+03B7 / U+0397', use: 'Efficiency, learning rate' },
  { name: 'Theta', glyphs: 'θ ϑ Θ', lower: '\\theta', upper: '\\Theta', variant: '\\vartheta', unicode: 'U+03B8, U+03D1 / U+0398', use: 'Angles, parameters, big-Theta' },
  { name: 'Iota', glyphs: 'ι Ι', lower: '\\iota', upper: 'I', upperIsLatin: true, unicode: 'U+03B9 / U+0399', use: 'Inclusion map' },
  { name: 'Kappa', glyphs: 'κ ϰ Κ', lower: '\\kappa', upper: 'K', upperIsLatin: true, variant: '\\varkappa', unicode: 'U+03BA, U+03F0 / U+039A', use: 'Curvature, Cohen’s kappa' },
  { name: 'Lambda', glyphs: 'λ Λ', lower: '\\lambda', upper: '\\Lambda', unicode: 'U+03BB / U+039B', use: 'Eigenvalue, wavelength, rate' },
  { name: 'Mu', glyphs: 'μ Μ', lower: '\\mu', upper: 'M', upperIsLatin: true, unicode: 'U+03BC / U+039C', use: 'Mean, micro prefix' },
  { name: 'Nu', glyphs: 'ν Ν', lower: '\\nu', upper: 'N', upperIsLatin: true, unicode: 'U+03BD / U+039D', use: 'Frequency, degrees of freedom' },
  { name: 'Xi', glyphs: 'ξ Ξ', lower: '\\xi', upper: '\\Xi', unicode: 'U+03BE / U+039E', use: 'Random variable, coordinate' },
  { name: 'Omicron', glyphs: 'ο Ο', lower: 'o', upper: 'O', upperIsLatin: true, unicode: 'U+03BF / U+039F', use: 'Rarely used (looks like o)' },
  { name: 'Pi', glyphs: 'π ϖ Π', lower: '\\pi', upper: '\\Pi', variant: '\\varpi', unicode: 'U+03C0, U+03D6 / U+03A0', use: 'Circle constant, product' },
  { name: 'Rho', glyphs: 'ρ ϱ Ρ', lower: '\\rho', upper: 'P', upperIsLatin: true, variant: '\\varrho', unicode: 'U+03C1, U+03F1 / U+03A1', use: 'Density, correlation' },
  { name: 'Sigma', glyphs: 'σ ς Σ', lower: '\\sigma', upper: '\\Sigma', variant: '\\varsigma', unicode: 'U+03C3, U+03C2 / U+03A3', use: 'Standard deviation, sum' },
  { name: 'Tau', glyphs: 'τ Τ', lower: '\\tau', upper: 'T', upperIsLatin: true, unicode: 'U+03C4 / U+03A4', use: 'Torque, time constant' },
  { name: 'Upsilon', glyphs: 'υ Υ', lower: '\\upsilon', upper: '\\Upsilon', unicode: 'U+03C5 / U+03A5', use: 'Upsilon meson' },
  { name: 'Phi', glyphs: 'ϕ φ Φ', lower: '\\phi', upper: '\\Phi', variant: '\\varphi', unicode: 'U+03D5, U+03C6 / U+03A6', use: 'Golden ratio, phase, normal CDF' },
  { name: 'Chi', glyphs: 'χ Χ', lower: '\\chi', upper: 'X', upperIsLatin: true, unicode: 'U+03C7 / U+03A7', use: 'Chi-squared, characteristic function' },
  { name: 'Psi', glyphs: 'ψ Ψ', lower: '\\psi', upper: '\\Psi', unicode: 'U+03C8 / U+03A8', use: 'Wave function' },
  { name: 'Omega', glyphs: 'ω Ω', lower: '\\omega', upper: '\\Omega', unicode: 'U+03C9 / U+03A9', use: 'Angular frequency, ohm' },
]

export default async function GreekLettersMathSymbolsPage() {
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
          <h1>Greek Letters in LaTeX: Full Table, Epsilon, Lambda and Math Symbols</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Greek letters are math-mode commands:</strong> a backslash plus the
                name, <code>$\alpha$</code>, <code>$\beta$</code>, <code>$\lambda$</code>. No
                package needed.
              </li>
              <li>
                <strong>Uppercase:</strong> capitalise the name, <code>$\Delta$</code>,{' '}
                <code>$\Lambda$</code>, <code>$\Omega$</code>. Capitals that look Latin have no
                command: write <code>A</code>, <code>B</code>, <code>E</code>.
              </li>
              <li>
                <strong>Epsilon:</strong> <code>$\epsilon$</code> gives ϵ,{' '}
                <code>$\varepsilon$</code> gives the curly ε most books use.
              </li>
              <li>
                <strong>Bold:</strong> <code>{`$\\boldsymbol{\\alpha}$`}</code> (amsmath).{' '}
                <strong>Upright:</strong> <code>$\upmu$</code> with the <code>upgreek</code>{' '}
                package.
              </li>
              <li>
                <strong>In plain text</strong> a bare <code>\alpha</code> gives{' '}
                <em>Missing $ inserted</em>; wrap it in <code>$...$</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            Every Greek letter in LaTeX is a math-mode command made of a backslash and the
            letter&apos;s English name: <code>\alpha</code>, <code>\epsilon</code>,{' '}
            <code>\lambda</code>, <code>\omega</code>. This page has the full table of all 24
            letters with their uppercase forms, variants and Unicode code points, the difference
            between <code>\epsilon</code> and <code>\varepsilon</code>, lambda, upright and bold
            Greek, the errors you will meet, and a reference for the other math symbols:
            operators, relations, arrows, dots and accents.
          </p>

          {/* ───────────────────────────── All 24 Greek Letters ───────────────────────────── */}
          <h2>All 24 Greek Letters in LaTeX</h2>
          <p>
            The table lists the letters in alphabetical order. Use the commands inside math mode,{' '}
            <code>$...$</code> in a sentence or <code>\[...\]</code> on a line of their own.
            Where the uppercase column shows a plain letter, LaTeX has no separate command
            because the capital looks the same as the Latin one. <code>\varkappa</code> needs{' '}
            <code>amssymb</code>; everything else works in a bare <code>article</code>.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Letter</th>
                  <th>Lowercase</th>
                  <th>Uppercase</th>
                  <th>Variant</th>
                  <th>Unicode</th>
                  <th>Typical use</th>
                </tr>
              </thead>
              <tbody>
                {greekLetters.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <span className="whitespace-nowrap">{row.glyphs}</span> {row.name}
                    </td>
                    <td><code>{row.lower}</code></td>
                    <td>{row.upperIsLatin ? <>{row.upper} <span className="text-muted-foreground">(Latin)</span></> : <code>{row.upper}</code>}</td>
                    <td>{row.variant ? <code>{row.variant}</code> : '–'}</td>
                    <td className="whitespace-nowrap">{row.unicode}</td>
                    <td>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Omicron is the odd one out: it has no command in either case because it is
            indistinguishable from the letter o, so write <code>o</code> and <code>O</code>.
            For the alphabet in order with pronunciation and meanings, see{' '}
            <Link href="/learn/greek-alphabet">the Greek alphabet</Link>.
          </p>

          <pre><code>{`% Greek letters in equations
$\\alpha + \\beta = \\gamma$

$\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$     % eigenvalues

$\\theta \\in [0, 2\\pi)$                         % angle range

$\\mu = \\frac{1}{n} \\sum_{i=1}^{n} x_i$        % sample mean

$\\Gamma(n) = (n-1)!$                         % Gamma function

$\\Delta x = x_2 - x_1$                       % difference

$\\Omega = \\{1, 2, 3, 4, 5, 6\\}$              % sample space

$f(n) = \\Theta(n \\log n)$                     % algorithm complexity`}</code></pre>

          {/* ───────────────────────────── Epsilon ───────────────────────────── */}
          <h2>Epsilon in LaTeX (\epsilon vs \varepsilon)</h2>
          <p>
            LaTeX has two lowercase epsilons. <code>\epsilon</code> is the lunate form ϵ, a
            half-moon with a bar; <code>\varepsilon</code> is the open, curly form ε that
            you will see in most analysis and physics books. Both are built in.
          </p>
          <pre><code>{`$\\epsilon$      % ϵ  lunate epsilon (U+03F5)
$\\varepsilon$   % ε  curly epsilon  (U+03B5)

% Analysis: the epsilon-delta definition
For every $\\varepsilon > 0$ there is a $\\delta > 0$ such that
$|x - a| < \\delta$ implies $|f(x) - L| < \\varepsilon$.

% Physics: vacuum permittivity
$\\varepsilon_0 \\approx 8.854 \\times 10^{-12}\\,\\mathrm{F/m}$

% Capital epsilon is a Latin E
$\\mathrm{E}$

% Set membership is \\in, not an epsilon
$x \\in A$`}</code></pre>
          <p>
            Which one to use is a matter of style, but be consistent. Most authors prefer{' '}
            <code>\varepsilon</code> because <code>\epsilon</code> is easy to confuse with the
            membership sign <code>\in</code> (∈). To switch a whole document without editing
            every formula, redefine the command once in the preamble:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\renewcommand{\\epsilon}{\\varepsilon}  % every \\epsilon now prints ε

\\begin{document}
$\\epsilon > 0$
\\end{document}`}</code></pre>
          <p>
            There is no <code>\Epsilon</code>; capital epsilon is written <code>E</code>. More on
            the symbol itself, outside LaTeX, is in{' '}
            <Link href="https://www.useoctree.com/blog/epsilon-symbol-meaning-uses-how-to-type">the epsilon symbol: meaning and how to type it</Link>.
          </p>

          {/* ───────────────────────────── Lambda ───────────────────────────── */}
          <h2>Lambda in LaTeX</h2>
          <p>
            Lowercase lambda is <code>\lambda</code> (λ) and uppercase is <code>\Lambda</code>{' '}
            (Λ). Both work in math mode with no package. Lambda is the standard letter for
            eigenvalues, wavelength, rates and the lambda calculus:
          </p>
          <pre><code>{`$A\\mathbf{v} = \\lambda \\mathbf{v}$            % eigenvalue equation
$\\det(A - \\lambda I) = 0$                    % characteristic equation
$\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$     % eigenvalues
$\\lambda_{\\max}$                             % largest eigenvalue
$c = \\lambda \\nu$                            % wavelength and frequency
$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$ % Poisson distribution
$\\Lambda = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n)$
$(\\lambda x.\\, x + 1)\\, 2$                   % lambda calculus
$\\boldsymbol{\\lambda}$                       % bold lambda (amsmath)
$\\varLambda$                                 % italic capital lambda (amsmath)`}</code></pre>
          <p>
            Note the thin space <code>\,</code> after the dot in lambda-calculus terms; without
            it the body crowds the binder. For the history and other meanings of the letter, see{' '}
            <Link href="https://www.useoctree.com/blog/lambda-symbol-meaning-uses-how-to-type">the lambda symbol: meaning and uses</Link>.
          </p>

          {/* ───────────────────────────── Variants ───────────────────────────── */}
          <h2>Variant Greek Letters</h2>
          <p>
            Seven lowercase letters have a second shape, selected with a <code>\var</code>{' '}
            prefix (<code>\varkappa</code> needs <code>amssymb</code>). Both forms are correct Greek; fields simply settle on one.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Standard</th>
                  <th>Variant</th>
                  <th>Where the variant is common</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\epsilon</code> ϵ</td><td><code>\varepsilon</code> ε</td><td>Analysis, permittivity <code>\varepsilon_0</code></td></tr>
                <tr><td><code>\theta</code> θ</td><td><code>\vartheta</code> ϑ</td><td>Some physics and astronomy texts</td></tr>
                <tr><td><code>\pi</code> π</td><td><code>\varpi</code> ϖ</td><td>Longitude of periapsis, rare elsewhere</td></tr>
                <tr><td><code>\rho</code> ρ</td><td><code>\varrho</code> ϱ</td><td>Density when ρ is already taken</td></tr>
                <tr><td><code>\sigma</code> σ</td><td><code>\varsigma</code> ς</td><td>Final sigma; rare in math</td></tr>
                <tr><td><code>\phi</code> ϕ</td><td><code>\varphi</code> φ</td><td>Euler&apos;s totient, angles, potentials</td></tr>
                <tr><td><code>\kappa</code> κ</td><td><code>\varkappa</code> ϰ</td><td>Needs <code>amssymb</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            amsmath also defines italic capitals, <code>\varGamma</code>,{' '}
            <code>\varDelta</code> up to <code>\varOmega</code>, for when an uppercase Greek
            letter is a variable rather than an operator. <code>amssymb</code> also adds the
            archaic <code>\digamma</code> (ϝ, U+03DD).
          </p>
          <pre><code>{`\\usepackage{amsmath, amssymb}

$\\epsilon\\ \\varepsilon \\quad \\theta\\ \\vartheta \\quad \\pi\\ \\varpi \\quad
 \\rho\\ \\varrho \\quad \\sigma\\ \\varsigma \\quad \\phi\\ \\varphi \\quad \\kappa\\ \\varkappa$

$\\Gamma\\ \\varGamma \\quad \\Omega\\ \\varOmega$`}</code></pre>

          {/* ───────────────────────────── Upright ───────────────────────────── */}
          <h2>Upright Greek Letters (upgreek and \upmu)</h2>
          <p>
            Lowercase Greek letters are italic in math mode. ISO style asks for upright letters
            when a symbol is a constant or a unit prefix, such as μ in μm or π as the number. The{' '}
            <code>upgreek</code> package adds an <code>\up</code> version of every letter:
          </p>
          <pre><code>{`\\usepackage{upgreek}

$\\upalpha\\ \\upbeta\\ \\upmu\\ \\uppi\\ \\Updelta$

$5\\,\\upmu\\mathrm{m}$          % 5 μm with an upright micro sign`}</code></pre>
          <p>
            For units, <code>siunitx</code> handles the micro prefix for you:{' '}
            <code>{`\\qty{5}{\\micro\\metre}`}</code>. Uppercase Greek is upright by default, so{' '}
            <code>\Omega</code> is already the right shape for ohms.
          </p>

          {/* ───────────────────────────── Bold ───────────────────────────── */}
          <h2>Bold Greek Letters (\boldsymbol)</h2>
          <p>
            <code>{`\\mathbf{\\alpha}`}</code> does <em>not</em> make α bold: <code>\mathbf</code>{' '}
            only changes Latin letters and digits. Use <code>\boldsymbol</code> from amsmath, or{' '}
            <code>\bm</code> from the <code>bm</code> package, which handles more cases:
          </p>
          <pre><code>{`\\usepackage{amsmath}   % \\boldsymbol
\\usepackage{amssymb}   % \\mathbb
\\usepackage{bm}        % \\bm (optional)

$\\boldsymbol{\\alpha}$  $\\boldsymbol{\\Sigma}$  $\\bm{\\mu}$

$\\boldsymbol{\\mu} = \\mathbb{E}[\\mathbf{x}]$   % mean vector`}</code></pre>
          <p>
            Bold Greek is the usual notation for vectors and matrices of parameters, such as{' '}
            <code>{`\\boldsymbol{\\theta}`}</code> in statistics or{' '}
            <code>{`\\boldsymbol{\\Sigma}`}</code> for a covariance matrix. The{' '}
            <Link href="/learn/bold-italics-underline">bold and italics guide</Link> covers bold
            math in general.
          </p>

          {/* ───────────────────────────── Text mode and errors ───────────────────────────── */}
          <h2>Greek Letters in Text and Common Errors</h2>
          <p>
            To put a Greek letter in a sentence, the simplest way is inline math:{' '}
            <code>the $\alpha$ particle</code>. For text-mode letters that follow the
            surrounding font, load <code>textgreek</code>:
          </p>
          <pre><code>{`\\usepackage{textgreek}

The \\textalpha{} particle and a 5\\,\\textmu m wire.`}</code></pre>
          <div className="overflow-x-auto">
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
                  <td><em>Missing $ inserted</em></td>
                  <td><code>\alpha</code> typed in normal text</td>
                  <td>Write <code>$\alpha$</code>, or <code>\textalpha</code> with textgreek</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\Alpha</code>, <code>\Epsilon</code>, <code>\omicron</code></td>
                  <td>These capitals (and omicron) have no command</td>
                  <td>Use the Latin letters <code>A</code>, <code>E</code>, <code>o</code></td>
                </tr>
                <tr>
                  <td><em>Unicode character α (U+03B1) not set up for use with LaTeX</em></td>
                  <td>A Greek character pasted into the source under pdfLaTeX</td>
                  <td>Replace it with <code>$\alpha$</code>, or compile with XeLaTeX/LuaLaTeX and <code>unicode-math</code></td>
                </tr>
                <tr>
                  <td>α is not bold inside <code>\mathbf</code></td>
                  <td><code>\mathbf</code> ignores Greek</td>
                  <td><code>{`\\boldsymbol{\\alpha}`}</code> or <code>{`\\bm{\\alpha}`}</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\varkappa</code> or <code>\upmu</code></td>
                  <td>Package not loaded</td>
                  <td><code>amssymb</code> for <code>\varkappa</code>, <code>upgreek</code> for <code>\up...</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ───────────────────────────── Binary Operators ───────────────────────────── */}
          <h2>Binary Operators</h2>
          <p>
            Binary operators appear between two operands with appropriate spacing.
            LaTeX automatically adds the correct spacing around these symbols when
            used in math mode.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\times</code></td><td>&#215;</td><td>Multiplication (cross product)</td></tr>
              <tr><td><code>\div</code></td><td>&#247;</td><td>Division</td></tr>
              <tr><td><code>\pm</code></td><td>&#177;</td><td>Plus or minus</td></tr>
              <tr><td><code>\mp</code></td><td>&#8723;</td><td>Minus or plus</td></tr>
              <tr><td><code>\cdot</code></td><td>&#183;</td><td>Centered dot (scalar multiplication)</td></tr>
              <tr><td><code>\circ</code></td><td>&#8728;</td><td>Function composition</td></tr>
              <tr><td><code>\ast</code></td><td>&#8727;</td><td>Asterisk operator (convolution)</td></tr>
              <tr><td><code>\oplus</code></td><td>&#8853;</td><td>Direct sum, XOR</td></tr>
              <tr><td><code>\otimes</code></td><td>&#8855;</td><td>Tensor product, Kronecker product</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Binary operators
$3 \\times 4 = 12$

$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$    % quadratic formula

$\\mathbf{a} \\cdot \\mathbf{b} = |a||b|\\cos\\theta$   % dot product

$(f \\circ g)(x) = f(g(x))$                    % composition

$V = V_1 \\oplus V_2$                           % direct sum`}</code></pre>

          {/* ───────────────────────────── Relation Symbols ───────────────────────────── */}
          <h2>Relation Symbols</h2>
          <p>
            Relation symbols express relationships between mathematical expressions.
            LaTeX spaces them differently from binary operators to preserve readability.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\leq</code></td><td>&#8804;</td><td>Less than or equal to</td></tr>
              <tr><td><code>\geq</code></td><td>&#8805;</td><td>Greater than or equal to</td></tr>
              <tr><td><code>\neq</code></td><td>&#8800;</td><td>Not equal to</td></tr>
              <tr><td><code>\approx</code></td><td>&#8776;</td><td>Approximately equal to</td></tr>
              <tr><td><code>\equiv</code></td><td>&#8801;</td><td>Identical / congruent to</td></tr>
              <tr><td><code>\sim</code></td><td>&#8764;</td><td>Similar to, distributed as</td></tr>
              <tr><td><code>\simeq</code></td><td>&#8771;</td><td>Asymptotically equal to</td></tr>
              <tr><td><code>\propto</code></td><td>&#8733;</td><td>Proportional to</td></tr>
              <tr><td><code>\ll</code></td><td>&#8810;</td><td>Much less than</td></tr>
              <tr><td><code>\gg</code></td><td>&#8811;</td><td>Much greater than</td></tr>
              <tr><td><code>\subset</code></td><td>&#8834;</td><td>Proper subset of</td></tr>
              <tr><td><code>\supset</code></td><td>&#8835;</td><td>Proper superset of</td></tr>
              <tr><td><code>\subseteq</code></td><td>&#8838;</td><td>Subset of or equal to</td></tr>
              <tr><td><code>\supseteq</code></td><td>&#8839;</td><td>Superset of or equal to</td></tr>
              <tr><td><code>\in</code></td><td>&#8712;</td><td>Element of</td></tr>
              <tr><td><code>\ni</code></td><td>&#8715;</td><td>Contains as member</td></tr>
              <tr><td><code>\notin</code></td><td>&#8713;</td><td>Not an element of</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Relation symbols
$x \\leq y$                       % less than or equal

$a \\neq b$                       % not equal

$\\pi \\approx 3.14159$             % approximately

$a \\equiv b \\pmod{n}$             % modular congruence

$X \\sim \\mathcal{N}(\\mu, \\sigma^2)$  % normal distribution

$F \\propto ma$                    % proportional

$A \\subseteq B$                   % subset or equal

$x \\in \\mathbb{R}$                % element of real numbers

$0 \\notin \\mathbb{N}$             % not a natural number (by convention)`}</code></pre>

          {/* ───────────────────────────── Arrows ───────────────────────────── */}
          <h2>Arrows</h2>
          <p>
            Arrow symbols are used for mappings, implications, limits, and
            many other mathematical constructs.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\leftarrow</code></td><td>&#8592;</td><td>Left arrow</td></tr>
              <tr><td><code>\rightarrow</code></td><td>&#8594;</td><td>Right arrow (tends to)</td></tr>
              <tr><td><code>\Leftarrow</code></td><td>&#8656;</td><td>Double left arrow (implied by)</td></tr>
              <tr><td><code>\Rightarrow</code></td><td>&#8658;</td><td>Double right arrow (implies)</td></tr>
              <tr><td><code>\leftrightarrow</code></td><td>&#8596;</td><td>Bidirectional arrow</td></tr>
              <tr><td><code>\Leftrightarrow</code></td><td>&#8660;</td><td>If and only if (iff)</td></tr>
              <tr><td><code>\longrightarrow</code></td><td>&#10230;</td><td>Long right arrow</td></tr>
              <tr><td><code>\mapsto</code></td><td>&#8614;</td><td>Maps to (function mapping)</td></tr>
              <tr><td><code>\uparrow</code></td><td>&#8593;</td><td>Up arrow</td></tr>
              <tr><td><code>\downarrow</code></td><td>&#8595;</td><td>Down arrow</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Arrows in practice
$x \\rightarrow \\infty$             % x tends to infinity

$A \\Rightarrow B$                  % A implies B

$P \\Leftrightarrow Q$              % P if and only if Q

$f: X \\rightarrow Y$               % function from X to Y

$x \\mapsto x^2$                    % maps x to x squared

$f: \\mathbb{R} \\longrightarrow \\mathbb{R}$  % long arrow mapping

$\\lim_{n \\to \\infty} a_n = L$      % limit notation (\\to is alias for \\rightarrow)`}</code></pre>

          {/* ───────────────────────────── Miscellaneous Symbols ───────────────────────────── */}
          <h2>Miscellaneous Symbols</h2>
          <p>
            These symbols appear frequently in advanced mathematics, physics,
            and theoretical computer science.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\infty</code></td><td>&#8734;</td><td>Infinity</td></tr>
              <tr><td><code>\nabla</code></td><td>&#8711;</td><td>Nabla / gradient operator</td></tr>
              <tr><td><code>\partial</code></td><td>&#8706;</td><td>Partial derivative</td></tr>
              <tr><td><code>\forall</code></td><td>&#8704;</td><td>For all (universal quantifier)</td></tr>
              <tr><td><code>\exists</code></td><td>&#8707;</td><td>There exists (existential quantifier)</td></tr>
              <tr><td><code>\nexists</code></td><td>&#8708;</td><td>There does not exist (requires amssymb)</td></tr>
              <tr><td><code>\emptyset</code></td><td>&#8709;</td><td>Empty set (old style)</td></tr>
              <tr><td><code>\varnothing</code></td><td>&#8709;</td><td>Empty set (preferred, requires amssymb)</td></tr>
              <tr><td><code>\hbar</code></td><td>&#8463;</td><td>Reduced Planck constant</td></tr>
              <tr><td><code>\ell</code></td><td>&#8467;</td><td>Cursive l (often used for length)</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Miscellaneous symbols in context
$\\lim_{x \\to \\infty} f(x) = 0$           % limit at infinity

$\\nabla f = \\left( \\frac{\\partial f}{\\partial x},
  \\frac{\\partial f}{\\partial y},
  \\frac{\\partial f}{\\partial z} \\right)$  % gradient

$\\forall x \\in \\mathbb{R}, \\; x^2 \\geq 0$  % universal statement

$\\exists n \\in \\mathbb{N} : n > 100$       % existential statement

$A \\cap B = \\varnothing$                   % disjoint sets

$E = \\frac{p^2}{2m} + V(x)$               % using \\hbar: $E = \\hbar\\omega$`}</code></pre>

          {/* ───────────────────────────── Dots and Ellipses ───────────────────────────── */}
          <h2>Dots and Ellipses</h2>
          <p>
            LaTeX provides several dot commands for different positions and orientations.
            Choosing the right one improves the visual quality of your equations.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\ldots</code></td><td>&#8230;</td><td>Baseline dots (lists: 1, 2, ..., n)</td></tr>
              <tr><td><code>\cdots</code></td><td>&#8943;</td><td>Centered dots (sums: a + b + ... + z)</td></tr>
              <tr><td><code>\vdots</code></td><td>&#8942;</td><td>Vertical dots (matrices)</td></tr>
              <tr><td><code>\ddots</code></td><td>&#8945;</td><td>Diagonal dots (matrices)</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Dots and ellipses
$x_1, x_2, \\ldots, x_n$                    % baseline dots for lists

$x_1 + x_2 + \\cdots + x_n$                 % centered dots for operations

% Matrix with dots
$\\begin{pmatrix}
  a_{11} & a_{12} & \\cdots & a_{1n} \\\\
  a_{21} & a_{22} & \\cdots & a_{2n} \\\\
  \\vdots & \\vdots & \\ddots & \\vdots \\\\
  a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}$`}</code></pre>

          {/* ───────────────────────────── Accents and Decorations ───────────────────────────── */}
          <h2>Accents and Decorations</h2>
          <p>
            Math accents add marks above or below symbols to denote vectors, estimates,
            averages, derivatives, and other modifications.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Example</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\hat&#123;a&#125;</code></td><td>a&#770;</td><td>Hat (unit vector, estimator)</td></tr>
              <tr><td><code>\tilde&#123;a&#125;</code></td><td>a&#771;</td><td>Tilde (approximation, conjugate)</td></tr>
              <tr><td><code>\bar&#123;a&#125;</code></td><td>a&#772;</td><td>Bar (average, closure, conjugate)</td></tr>
              <tr><td><code>\vec&#123;a&#125;</code></td><td>a&#8407;</td><td>Vector arrow</td></tr>
              <tr><td><code>\dot&#123;a&#125;</code></td><td>a&#775;</td><td>Single dot (time derivative)</td></tr>
              <tr><td><code>\ddot&#123;a&#125;</code></td><td>a&#776;</td><td>Double dot (second time derivative)</td></tr>
              <tr><td><code>\widehat&#123;abc&#125;</code></td><td>abc&#770;</td><td>Wide hat spanning multiple characters</td></tr>
              <tr><td><code>\widetilde&#123;abc&#125;</code></td><td>abc&#771;</td><td>Wide tilde spanning multiple characters</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example usage:</p>
          <pre><code>{`% Accents in practice
$\\hat{\\theta}$                   % estimated parameter

$\\bar{x} = \\frac{1}{n}\\sum x_i$ % sample mean

$\\vec{F} = m\\vec{a}$             % Newton's second law

$\\dot{x} = \\frac{dx}{dt}$        % velocity

$\\ddot{x} = \\frac{d^2x}{dt^2}$  % acceleration

$\\widehat{ABC}$                  % wide hat over angle name

$\\tilde{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i \\xi x} \\, dx$  % Fourier transform`}</code></pre>

          {/* ───────────────────────────── Using Symbols in Practice ───────────────────────────── */}
          <h2>Using Symbols in Practice</h2>
          <p>
            Here is a comprehensive example combining many Greek letters and math
            symbols in real physics and mathematics equations:
          </p>

          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath, amssymb}

\\begin{document}

\\section{Maxwell's Equations}
\\begin{align}
  \\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\
  \\nabla \\cdot \\vec{B} &= 0 \\\\
  \\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\
  \\nabla \\times \\vec{B} &= \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}
\\end{align}

\\section{Schrödinger Equation}
\\[
  i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\vec{r}, t)
  = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\vec{r}, t) \\right] \\Psi(\\vec{r}, t)
\\]

\\section{Euler's Identity}
\\[
  e^{i\\pi} + 1 = 0
\\]

\\section{Navier-Stokes Equation}
\\[
  \\rho \\left( \\frac{\\partial \\vec{v}}{\\partial t}
  + (\\vec{v} \\cdot \\nabla) \\vec{v} \\right)
  = -\\nabla p + \\mu \\nabla^2 \\vec{v} + \\rho \\vec{g}
\\]

\\section{Gaussian Integral}
\\[
  \\int_{-\\infty}^{\\infty} e^{-\\alpha x^2} \\, dx = \\sqrt{\\frac{\\pi}{\\alpha}},
  \\quad \\alpha > 0
\\]

\\section{Cauchy's Integral Formula}
\\[
  f(a) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - a} \\, dz
\\]

\\section{Bayes' Theorem}
\\[
  P(A \\mid B) = \\frac{P(B \\mid A) \\, P(A)}{P(B)},
  \\quad P(B) \\neq 0
\\]

\\section{General Relativity — Einstein Field Equations}
\\[
  R_{\\mu\\nu} - \\frac{1}{2} R g_{\\mu\\nu} + \\Lambda g_{\\mu\\nu}
  = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}
\\]

\\end{document}`}</code></pre>

          {/* ───────────────────────────── The amssymb Package ───────────────────────────── */}
          <h2>The amssymb Package</h2>
          <p>
            The <code>amssymb</code> package from the American Mathematical Society adds
            hundreds of extra symbols. Load it with <code>\usepackage&#123;amssymb&#125;</code>.
            Here are some of the most useful additions:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\mathbb&#123;R&#125;</code></td><td>&#8477;</td><td>Blackboard bold R (real numbers)</td></tr>
              <tr><td><code>\mathbb&#123;Z&#125;</code></td><td>&#8484;</td><td>Blackboard bold Z (integers)</td></tr>
              <tr><td><code>\mathbb&#123;N&#125;</code></td><td>&#8469;</td><td>Blackboard bold N (natural numbers)</td></tr>
              <tr><td><code>\mathbb&#123;Q&#125;</code></td><td>&#8474;</td><td>Blackboard bold Q (rationals)</td></tr>
              <tr><td><code>\mathbb&#123;C&#125;</code></td><td>&#8450;</td><td>Blackboard bold C (complex numbers)</td></tr>
              <tr><td><code>\nexists</code></td><td>&#8708;</td><td>Does not exist</td></tr>
              <tr><td><code>\varnothing</code></td><td>&#8709;</td><td>Empty set (preferred style)</td></tr>
              <tr><td><code>\therefore</code></td><td>&#8756;</td><td>Therefore</td></tr>
              <tr><td><code>\because</code></td><td>&#8757;</td><td>Because</td></tr>
              <tr><td><code>\leqslant</code></td><td>&#10877;</td><td>Slanted less-or-equal</td></tr>
              <tr><td><code>\geqslant</code></td><td>&#10878;</td><td>Slanted greater-or-equal</td></tr>
              <tr><td><code>\lll</code></td><td>&#8920;</td><td>Very much less than</td></tr>
              <tr><td><code>\ggg</code></td><td>&#8921;</td><td>Very much greater than</td></tr>
              <tr><td><code>\trianglelefteq</code></td><td>&#8884;</td><td>Normal subgroup of</td></tr>
              <tr><td><code>\square</code></td><td>&#9633;</td><td>QED square / d&apos;Alembertian</td></tr>
              <tr><td><code>\blacksquare</code></td><td>&#9632;</td><td>Filled QED square</td></tr>
            </tbody>
          </table>
          </div>

          <p>Example with number sets:</p>
          <pre><code>{`\\usepackage{amssymb}

% Number sets
$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}
  \\subset \\mathbb{R} \\subset \\mathbb{C}$

% Proof endings
$\\therefore x = 5 \\quad \\blacksquare$

% Non-existence
$\\nexists \\, x \\in \\mathbb{R} : x^2 < 0$`}</code></pre>

          {/* ───────────────────────────── Quick Reference Table ───────────────────────────── */}
          <h2>Quick Reference Table</h2>
          <p>
            The most commonly searched LaTeX symbols in one place. Copy and paste
            the command directly into your document.
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>What You Need</th>
                <th>LaTeX Command</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Alpha</td><td><code>\alpha</code></td><td>&#945;</td></tr>
              <tr><td>Beta</td><td><code>\beta</code></td><td>&#946;</td></tr>
              <tr><td>Gamma</td><td><code>\gamma</code> / <code>\Gamma</code></td><td>&#947; / &#915;</td></tr>
              <tr><td>Delta</td><td><code>\delta</code> / <code>\Delta</code></td><td>&#948; / &#916;</td></tr>
              <tr><td>Epsilon</td><td><code>\epsilon</code> / <code>\varepsilon</code></td><td>&#1013; / &#949;</td></tr>
              <tr><td>Theta</td><td><code>\theta</code> / <code>\Theta</code></td><td>&#952; / &#920;</td></tr>
              <tr><td>Lambda</td><td><code>\lambda</code> / <code>\Lambda</code></td><td>&#955; / &#923;</td></tr>
              <tr><td>Mu</td><td><code>\mu</code></td><td>&#956;</td></tr>
              <tr><td>Pi</td><td><code>\pi</code> / <code>\Pi</code></td><td>&#960; / &#928;</td></tr>
              <tr><td>Sigma</td><td><code>\sigma</code> / <code>\Sigma</code></td><td>&#963; / &#931;</td></tr>
              <tr><td>Phi</td><td><code>\phi</code> / <code>\varphi</code> / <code>\Phi</code></td><td>&#981; / &#966; / &#934;</td></tr>
              <tr><td>Omega</td><td><code>\omega</code> / <code>\Omega</code></td><td>&#969; / &#937;</td></tr>
              <tr><td>Psi</td><td><code>\psi</code> / <code>\Psi</code></td><td>&#968; / &#936;</td></tr>
              <tr><td>Infinity</td><td><code>\infty</code></td><td>&#8734;</td></tr>
              <tr><td>Not equal</td><td><code>\neq</code></td><td>&#8800;</td></tr>
              <tr><td>Approximately</td><td><code>\approx</code></td><td>&#8776;</td></tr>
              <tr><td>Less/greater or equal</td><td><code>\leq</code> / <code>\geq</code></td><td>&#8804; / &#8805;</td></tr>
              <tr><td>Times / divide</td><td><code>\times</code> / <code>\div</code></td><td>&#215; / &#247;</td></tr>
              <tr><td>Plus-minus</td><td><code>\pm</code></td><td>&#177;</td></tr>
              <tr><td>Right arrow</td><td><code>\rightarrow</code></td><td>&#8594;</td></tr>
              <tr><td>Implies</td><td><code>\Rightarrow</code></td><td>&#8658;</td></tr>
              <tr><td>If and only if</td><td><code>\Leftrightarrow</code></td><td>&#8660;</td></tr>
              <tr><td>Partial derivative</td><td><code>\partial</code></td><td>&#8706;</td></tr>
              <tr><td>Nabla / gradient</td><td><code>\nabla</code></td><td>&#8711;</td></tr>
              <tr><td>For all</td><td><code>\forall</code></td><td>&#8704;</td></tr>
              <tr><td>There exists</td><td><code>\exists</code></td><td>&#8707;</td></tr>
              <tr><td>Element of</td><td><code>\in</code></td><td>&#8712;</td></tr>
              <tr><td>Not element of</td><td><code>\notin</code></td><td>&#8713;</td></tr>
              <tr><td>Subset</td><td><code>\subset</code> / <code>\subseteq</code></td><td>&#8834; / &#8838;</td></tr>
              <tr><td>Empty set</td><td><code>\emptyset</code> / <code>\varnothing</code></td><td>&#8709;</td></tr>
              <tr><td>Dots (low / center)</td><td><code>\ldots</code> / <code>\cdots</code></td><td>&#8230; / &#8943;</td></tr>
              <tr><td>Real numbers</td><td><code>\mathbb&#123;R&#125;</code></td><td>&#8477;</td></tr>
            </tbody>
          </table>
          </div>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you write epsilon in LaTeX?</h3>
          <p>
            In math mode, <code>$\epsilon$</code> gives the lunate epsilon ϵ and{' '}
            <code>$\varepsilon$</code> gives the curly epsilon ε that most textbooks use. Both
            are built in, no package needed. Capital epsilon has no command because it looks
            like a Latin E, so write <code>E</code> (or <code>{`\\mathrm{E}`}</code>).
          </p>
          <h3>What is the difference between \epsilon and \varepsilon?</h3>
          <p>
            They are two shapes of the same letter. <code>\epsilon</code> is the lunate form ϵ,
            which looks like the set membership sign; <code>\varepsilon</code> is the open,
            curly form ε used in most analysis and physics texts for small quantities and
            permittivity. To get ε everywhere, add{' '}
            <code>{`\\renewcommand{\\epsilon}{\\varepsilon}`}</code> to the preamble.
          </p>
          <h3>How do I write lambda in LaTeX?</h3>
          <p>
            Use <code>$\lambda$</code> for lowercase λ and <code>$\Lambda$</code> for uppercase
            Λ, both in math mode with no package. Typical uses are eigenvalues (
            <code>{`$A\\mathbf{v} = \\lambda\\mathbf{v}$`}</code>), wavelength (
            <code>$c = \lambda\nu$</code>) and the Poisson rate. For a bold lambda write{' '}
            <code>{`$\\boldsymbol{\\lambda}$`}</code> with amsmath.
          </p>
          <h3>Why is \Alpha an undefined control sequence?</h3>
          <p>
            LaTeX only defines capital Greek letters that look different from Latin ones:{' '}
            <code>\Gamma</code>, <code>\Delta</code>, <code>\Theta</code>, <code>\Lambda</code>,{' '}
            <code>\Xi</code>, <code>\Pi</code>, <code>\Sigma</code>, <code>\Upsilon</code>,{' '}
            <code>\Phi</code>, <code>\Psi</code> and <code>\Omega</code>. Capital alpha, beta,
            epsilon, zeta, eta, iota, kappa, mu, nu, omicron, rho, tau and chi are written with
            the Latin letters A, B, E, Z, H, I, K, M, N, O, P, T and X.
          </p>
          <h3>Why do I get &ldquo;Missing $ inserted&rdquo; when I type \alpha?</h3>
          <p>
            Greek letter commands only work in math mode. Typed in a normal sentence,{' '}
            <code>\alpha</code> makes LaTeX insert a <code>$</code> and stop. Write{' '}
            <code>$\alpha$</code> instead, or load the <code>textgreek</code> package and use{' '}
            <code>\textalpha</code> for a Greek letter in running text.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Now that you have a complete reference for Greek letters and math symbols, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/greek-alphabet">The Greek Alphabet</Link> – All 24 letters in order with pronunciation, Unicode code points, and what each one means in math and science</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Learn how to write inline and display math, fractions, roots, and more</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> – Master sub/superscript positioning and nesting</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits</Link> – Typeset integral signs, summation notation, and limit expressions</li>
            <li><Link href="/learn/blackboard-bold">Blackboard Bold</Link> – <code>{`\\mathbb{R}`}</code> and the other number sets</li>
          </ul>

          <h2>Individual Greek Letters</h2>
          <ul>
            <li><Link href="https://www.useoctree.com/blog/alpha-symbol-uses-meaning-complete-guide">Alpha (α)</Link> – Meaning and uses in math, statistics and finance</li>
            <li><Link href="https://www.useoctree.com/blog/delta-symbols-math-science-complete-guide">Delta (δ, Δ)</Link> – Every delta symbol in math and science</li>
            <li><Link href="https://www.useoctree.com/blog/epsilon-symbol-meaning-uses-how-to-type">Epsilon (ϵ, ε)</Link> – Meaning, uses and how to type it</li>
            <li><Link href="https://www.useoctree.com/blog/kappa-symbol-greek-letters-latex">Kappa (κ)</Link> – Curvature, Cohen&apos;s kappa and the LaTeX commands</li>
            <li><Link href="https://www.useoctree.com/blog/lambda-symbol-meaning-uses-how-to-type">Lambda (λ, Λ)</Link> – Eigenvalues, wavelength and how to type it</li>
            <li><Link href="https://www.useoctree.com/blog/sigma-symbol-meaning-uses-how-to-type">Sigma (σ, Σ)</Link> – Standard deviation, summation and how to type it</li>
            <li><Link href="https://www.useoctree.com/blog/phi-symbol-latex-greek-letters-physics">Phi (ϕ, φ, Φ)</Link> – Phi in LaTeX, physics and the golden ratio</li>
            <li><Link href="https://www.useoctree.com/blog/omega-symbol-meaning-uses-math-science">Omega (ω, Ω)</Link> – Angular frequency, ohms and more</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Browse and search every Greek letter and math operator interactively</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your symbol commands with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Generate LaTeX from text descriptions</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX symbols" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Ready to start writing?</h3>
            <p className="text-muted-foreground mb-4">
              Try Octree – the AI-powered LaTeX editor that makes writing faster and easier.
              All symbols are just a keystroke away with intelligent autocomplete.
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
