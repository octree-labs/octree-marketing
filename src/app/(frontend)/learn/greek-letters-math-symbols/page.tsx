import type { Metadata } from 'next/types'
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

const breadcrumbs = getLearnBreadcrumbs('Greek Letters & Math Symbols', 'greek-letters-math-symbols')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function GreekLettersMathSymbolsPage() {
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
          <h1>Greek Letters and Math Symbols in LaTeX</h1>
          <p className="lead">
            Greek letters and math symbols are essential for scientific and mathematical writing.
            LaTeX provides commands for every Greek letter, operator, relation, arrow, and
            miscellaneous symbol you will ever need. This complete reference covers them all
            with copy-paste commands you can use immediately.
          </p>

          {/* ───────────────────────────── Lowercase Greek Letters ───────────────────────────── */}
          <h2>Lowercase Greek Letters</h2>
          <p>
            Lowercase Greek letters are used extensively in mathematics, physics, statistics,
            and engineering. Each letter is produced by a backslash followed by the letter&apos;s
            English name. All Greek letter commands must be used inside math mode
            (between <code>$...$</code> or <code>\[...\]</code>).
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Letter</th>
                <th>Common Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\alpha</code></td><td>&#945;</td><td>Angles, coefficients, significance level</td></tr>
              <tr><td><code>\beta</code></td><td>&#946;</td><td>Angles, coefficients, beta function</td></tr>
              <tr><td><code>\gamma</code></td><td>&#947;</td><td>Euler-Mascheroni constant, photon</td></tr>
              <tr><td><code>\delta</code></td><td>&#948;</td><td>Small change, Dirac delta, Kronecker delta</td></tr>
              <tr><td><code>\epsilon</code></td><td>&#1013;</td><td>Small positive quantity, set membership</td></tr>
              <tr><td><code>\varepsilon</code></td><td>&#949;</td><td>Preferred epsilon variant in analysis</td></tr>
              <tr><td><code>\zeta</code></td><td>&#950;</td><td>Riemann zeta function, damping ratio</td></tr>
              <tr><td><code>\eta</code></td><td>&#951;</td><td>Efficiency, metric tensor component</td></tr>
              <tr><td><code>\theta</code></td><td>&#952;</td><td>Angles, parameter estimation</td></tr>
              <tr><td><code>\vartheta</code></td><td>&#977;</td><td>Script-style theta variant</td></tr>
              <tr><td><code>\iota</code></td><td>&#953;</td><td>Inclusion map, index variable</td></tr>
              <tr><td><code>\kappa</code></td><td>&#954;</td><td>Curvature, condition number</td></tr>
              <tr><td><code>\lambda</code></td><td>&#955;</td><td>Eigenvalue, wavelength, rate parameter</td></tr>
              <tr><td><code>\mu</code></td><td>&#956;</td><td>Mean, micro prefix, measure</td></tr>
              <tr><td><code>\nu</code></td><td>&#957;</td><td>Frequency, degrees of freedom</td></tr>
              <tr><td><code>\xi</code></td><td>&#958;</td><td>Random variable, coordinate</td></tr>
              <tr><td><code>\pi</code></td><td>&#960;</td><td>Circle constant 3.14159...</td></tr>
              <tr><td><code>\varpi</code></td><td>&#982;</td><td>Variant pi (pomega)</td></tr>
              <tr><td><code>\rho</code></td><td>&#961;</td><td>Density, correlation coefficient</td></tr>
              <tr><td><code>\varrho</code></td><td>&#1009;</td><td>Variant rho with curled tail</td></tr>
              <tr><td><code>\sigma</code></td><td>&#963;</td><td>Standard deviation, stress</td></tr>
              <tr><td><code>\varsigma</code></td><td>&#962;</td><td>Final sigma (used in Greek text)</td></tr>
              <tr><td><code>\tau</code></td><td>&#964;</td><td>Torque, time constant, tau function</td></tr>
              <tr><td><code>\upsilon</code></td><td>&#965;</td><td>Upsilon meson</td></tr>
              <tr><td><code>\phi</code></td><td>&#981;</td><td>Golden ratio, phase angle</td></tr>
              <tr><td><code>\varphi</code></td><td>&#966;</td><td>Preferred phi variant, Euler&apos;s totient</td></tr>
              <tr><td><code>\chi</code></td><td>&#967;</td><td>Chi-squared test, susceptibility</td></tr>
              <tr><td><code>\psi</code></td><td>&#968;</td><td>Wave function, angle</td></tr>
              <tr><td><code>\omega</code></td><td>&#969;</td><td>Angular frequency, argument of periapsis</td></tr>
            </tbody>
          </table>

          <p>Example usage:</p>
          <pre><code>{`% Lowercase Greek letters in equations
$\\alpha + \\beta = \\gamma$

$\\epsilon > 0$

$\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$    % eigenvalues

$\\theta \\in [0, 2\\pi)$                        % angle range

$\\mu = \\frac{1}{n} \\sum_{i=1}^{n} x_i$       % sample mean`}</code></pre>

          {/* ───────────────────────────── Uppercase Greek Letters ───────────────────────────── */}
          <h2>Uppercase Greek Letters</h2>
          <p>
            Not every Greek letter has a distinct uppercase form in LaTeX. Letters
            like Alpha (A) and Beta (B) look identical to their Latin counterparts,
            so LaTeX does not provide separate commands for them — simply type the
            Latin letter instead. The letters below have unique uppercase forms.
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Letter</th>
                <th>Common Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\Gamma</code></td><td>&#915;</td><td>Gamma function, Christoffel symbols</td></tr>
              <tr><td><code>\Delta</code></td><td>&#916;</td><td>Change/difference, Laplacian</td></tr>
              <tr><td><code>\Theta</code></td><td>&#920;</td><td>Big-O family, Heaviside function</td></tr>
              <tr><td><code>\Lambda</code></td><td>&#923;</td><td>Diagonal matrix, cosmological constant</td></tr>
              <tr><td><code>\Xi</code></td><td>&#926;</td><td>Grand canonical partition function</td></tr>
              <tr><td><code>\Pi</code></td><td>&#928;</td><td>Product operator, profit function</td></tr>
              <tr><td><code>\Sigma</code></td><td>&#931;</td><td>Summation, covariance matrix</td></tr>
              <tr><td><code>\Upsilon</code></td><td>&#933;</td><td>Upsilon particle</td></tr>
              <tr><td><code>\Phi</code></td><td>&#934;</td><td>Cumulative normal distribution, electric potential</td></tr>
              <tr><td><code>\Psi</code></td><td>&#936;</td><td>Wave function (quantum mechanics)</td></tr>
              <tr><td><code>\Omega</code></td><td>&#937;</td><td>Ohm, sample space, solid angle</td></tr>
            </tbody>
          </table>

          <p>Example usage:</p>
          <pre><code>{`% Uppercase Greek letters
$\\Gamma(n) = (n-1)!$                     % Gamma function

$\\Delta x = x_2 - x_1$                   % difference

$\\Sigma = \\begin{pmatrix}
  \\sigma_1^2 & \\rho\\sigma_1\\sigma_2 \\\\
  \\rho\\sigma_1\\sigma_2 & \\sigma_2^2
\\end{pmatrix}$                            % covariance matrix

$\\Omega = \\{1, 2, 3, 4, 5, 6\\}$          % sample space

$f(n) = \\Theta(n \\log n)$                 % algorithm complexity`}</code></pre>

          {/* ───────────────────────────── Binary Operators ───────────────────────────── */}
          <h2>Binary Operators</h2>
          <p>
            Binary operators appear between two operands with appropriate spacing.
            LaTeX automatically adds the correct spacing around these symbols when
            used in math mode.
          </p>
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
  \\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\epsilon_0} \\\\
  \\nabla \\cdot \\vec{B} &= 0 \\\\
  \\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\
  \\nabla \\times \\vec{B} &= \\mu_0 \\vec{J} + \\mu_0 \\epsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}
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

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Now that you have a complete reference for Greek letters and math symbols, explore these related topics:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Learn how to write inline and display math, fractions, roots, and more</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> – Master sub/superscript positioning and nesting</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums, and Limits</Link> – Typeset integral signs, summation notation, and limit expressions</li>
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
  return {
    title: 'Greek Letters and Math Symbols in LaTeX – Complete Reference 2026',
    description: 'Complete reference for Greek letters and math symbols in LaTeX. Find every symbol: alpha, beta, gamma, delta, infinity, arrows, operators, relations, and more with copy-paste LaTeX commands.',
    keywords: 'latex greek letters, latex alpha, latex beta, latex gamma, latex delta, latex symbols, latex math symbols, latex infinity, latex arrow, latex operators, latex relations, latex degree symbol, latex pi, latex theta, latex sigma, latex omega, latex lambda, latex epsilon, latex phi, latex psi, latex mu, latex nabla, latex partial, latex forall, latex exists',
    openGraph: {
      title: 'Greek Letters and Math Symbols in LaTeX – Complete Reference 2026',
      description: 'Find every Greek letter and math symbol in LaTeX with copy-paste commands.',
      type: 'article',
      url: '/learn/greek-letters-math-symbols',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Greek Letters and Math Symbols in LaTeX',
      description: 'Complete LaTeX symbol reference: Greek letters, operators, arrows, relations.',
    },
    alternates: {
      canonical: '/learn/greek-letters-math-symbols',
    },
  }
}
