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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Equation Numbering', 'equation-numbering')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXEquationNumberingPage() {
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
          <h1>LaTeX Equation Numbering and Referencing: \label, \eqref, \tag and align</h1>
          <p className="lead">
            LaTeX numbers every <code>equation</code> environment automatically, and a{' '}
            <code>\label</code> inside it lets you cite that number anywhere in the text with{' '}
            <code>\eqref</code>. That is the whole system for a single-line equation. The questions
            start with everything else: how to number equations per section, how to break a long
            equation onto a new line, how to number a multi-line derivation once or on every line,
            how to write (1a) and (1b), how to replace the number with a custom tag, and how to
            turn numbering off. This guide answers all of them with <code>amsmath</code> and{' '}
            <code>cleveref</code>.
          </p>

          {/* ── Basics ── */}
          <h2>Numbered and Unnumbered Equations</h2>
          <p>
            The <code>equation</code> environment produces a centered, numbered display. Its
            starred twin <code>equation*</code>, provided by <code>amsmath</code>, produces the
            same display without a number, and <code>{`\\[ ... \\]`}</code> is a shorthand for it.
            Load <code>amsmath</code> in every document that contains math; almost everything in
            this guide depends on it.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\begin{equation}
  E = mc^2
\\end{equation}

\\begin{equation*}
  a^2 + b^2 = c^2
\\end{equation*}

\\[ F = ma \\]

\\end{document}`}</code></pre>
          <p>
            The first display is &ldquo;(1)&rdquo;; the other two are unnumbered. The rule of thumb
            used by most journals: number an equation only if you refer to it somewhere. Avoid
            the plain TeX <code>$$ ... $$</code> form; it has wrong spacing with amsmath and does
            not support <code>\tag</code> or <code>\label</code> properly.
          </p>

          {/* ── label/ref/eqref ── */}
          <h2>Referencing an Equation: \label, \ref and \eqref</h2>
          <p>
            Put <code>\label</code> anywhere inside the numbered environment. Three commands read
            it back:
          </p>
          <pre><code>{`\\begin{equation}
  \\label{eq:energy}
  E = mc^2
\\end{equation}

Equation~\\ref{eq:energy} ...      % prints: Equation 1
Equation~(\\ref{eq:energy}) ...    % prints: Equation (1)
Equation~\\eqref{eq:energy} ...    % prints: Equation (1), with amsmath
on page~\\pageref{eq:energy}        % prints: on page 4`}</code></pre>
          <ul>
            <li><code>\ref</code> prints the bare number. You add the parentheses yourself.</li>
            <li><code>\eqref</code> (amsmath) prints the number with parentheses, in upright text even inside italics, exactly as the equation itself shows it. Use it for equations.</li>
            <li>The tilde <code>~</code> is a non-breaking space; it stops &ldquo;Equation&rdquo; and &ldquo;(1)&rdquo; from landing on different lines.</li>
          </ul>
          <p>
            Labels are resolved on the <em>next</em> compilation run, so the first build after
            adding a label shows <strong>??</strong> and the warning <em>Label(s) may have changed.
            Rerun to get cross-references right</em>. Compile twice, or use <code>latexmk</code>,
            which reruns as needed.
          </p>
          <p>
            Pick a naming convention and keep it: <code>eq:</code> for equations,{' '}
            <code>fig:</code> for figures, <code>tab:</code> for tables, <code>sec:</code> for
            sections. The prefix is only a convention, but it makes <code>\ref</code> commands
            readable and prevents an equation and a figure from sharing a label by accident.
          </p>

          <h3>cleveref: \cref and \Cref</h3>
          <p>
            The <code>cleveref</code> package writes the word &ldquo;equation&rdquo; for you and
            handles lists and ranges. Load it after <code>hyperref</code> if you use that, and
            after <code>amsmath</code>:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\usepackage{hyperref}
\\usepackage{cleveref}

See \\cref{eq:energy}.                      % eq. (1)
See \\Cref{eq:energy}.                      % Equation (1), at sentence start
See \\cref{eq:energy,eq:momentum}.          % eqs. (1) and (2)
See \\crefrange{eq:first}{eq:last}.         % eqs. (1) to (5)

% Change the wording once in the preamble
\\crefname{equation}{Eq.}{Eqs.}
\\Crefname{equation}{Equation}{Equations}`}</code></pre>
          <p>
            With <code>hyperref</code>, every reference becomes a clickable link to the equation.
            See <Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> for the loading order and
            link colors.
          </p>

          {/* ── Numbering style ── */}
          <h2>Numbering Within Sections or Chapters</h2>
          <p>
            In <code>article</code>, equations are numbered 1, 2, 3 through the whole document. In{' '}
            <code>book</code> and <code>report</code> they are numbered per chapter: (2.1), (2.2).
            To number per section in any class, use <code>\numberwithin</code> from amsmath:
          </p>
          <pre><code>{`\\usepackage{amsmath}
\\numberwithin{equation}{section}   % (1.1), (1.2), (2.1), ...

% In book/report, per section instead of per chapter:
\\numberwithin{equation}{section}   % (1.1.1), (1.1.2), ...

% Change only the printed form, keeping the counter global
\\renewcommand{\\theequation}{\\Roman{equation}}       % (I), (II), ...
\\renewcommand{\\theequation}{\\thesection-\\arabic{equation}}  % (1-1), (1-2)`}</code></pre>
          <p>
            <code>\numberwithin</code> both resets the equation counter at each section and
            prefixes the section number. The kernel command <code>\counterwithin</code> does the
            same without amsmath, and <code>\counterwithout</code> undoes it, which is how you
            get document-wide numbering in a <code>book</code>:{' '}
            <code>{`\\counterwithout{equation}{chapter}`}</code>.
          </p>

          <h3>Numbers on the left</h3>
          <p>
            Equation numbers sit at the right margin by default. The <code>leqno</code> option
            moves them to the left, and <code>fleqn</code> left-aligns the equations themselves
            instead of centering them. Both are class options that amsmath also accepts:
          </p>
          <pre><code>{`\\documentclass[leqno]{article}      % numbers on the left
\\documentclass[fleqn]{article}      % equations flush left
\\usepackage[leqno, fleqn]{amsmath}  % same, as package options`}</code></pre>

          {/* ── Tags ── */}
          <h2>Custom Tags: \tag and \tag*</h2>
          <p>
            <code>\tag</code> replaces the automatic number with any text for that one equation.
            The equation counter is not advanced, so the next automatic number continues as if the
            tagged equation were not there. <code>\tag*</code> prints the tag without parentheses:
          </p>
          <pre><code>{`\\begin{equation}
  \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0} \\tag{Gauss}
\\end{equation}

\\begin{equation}
  x^2 + y^2 = r^2 \\tag*{(circle)}
\\end{equation}

% Tags work in the starred environments too
\\begin{align*}
  f(x) &= x^2 \\tag{A} \\\\
  g(x) &= 2x \\tag{B} \\label{eq:B}
\\end{align*}

% Reuse an earlier number, e.g. when repeating an equation
\\begin{equation}
  E = mc^2 \\tag{\\ref{eq:energy}}
\\end{equation}`}</code></pre>
          <p>
            A tagged equation can carry a <code>\label</code>, and <code>\eqref</code> then prints
            the tag. For a primed repeat of equation (3), write{' '}
            <code>{`\\tag{\\ref{eq:energy}$'$}`}</code> to get (3&prime;).
          </p>

          {/* ── Suppress ── */}
          <h2>Suppressing Numbers: \nonumber, \notag and Starred Environments</h2>
          <p>
            There are three levels of control. For a whole display, use the starred environment
            (<code>equation*</code>, <code>align*</code>, <code>gather*</code>). For single lines
            in a multi-line environment, put <code>\notag</code> (or its older synonym{' '}
            <code>\nonumber</code>) before the line break:
          </p>
          <pre><code>{`\\begin{align}
  (a+b)^2 &= (a+b)(a+b) \\notag \\\\
          &= a^2 + ab + ba + b^2 \\notag \\\\
          &= a^2 + 2ab + b^2 \\label{eq:binomial}
\\end{align}`}</code></pre>
          <p>
            Only the last line gets a number, (1), and the label refers to it. This is the most
            common pattern in derivations: intermediate steps unnumbered, the result numbered.
          </p>

          {/* ── Multi-line ── */}
          <h2>Multi-Line Equations: align, split, multline and gather</h2>
          <p>
            amsmath offers several environments for displays with more than one line. The choice
            depends on two things: whether the lines should be aligned on a symbol, and whether
            you want one number for the whole block or one per line.
          </p>
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Alignment</th>
                <th>Numbering</th>
                <th>Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>align</code> / <code>align*</code></td><td>At each <code>&amp;</code></td><td>Every line (or none)</td><td>Derivations, systems of equations</td></tr>
              <tr><td><code>split</code> (inside <code>equation</code>)</td><td>At <code>&amp;</code></td><td>One number, centered on the block</td><td>One long equation broken into aligned lines</td></tr>
              <tr><td><code>multline</code> / <code>multline*</code></td><td>First line left, last line right</td><td>One number on the last line</td><td>One long equation with no natural alignment point</td></tr>
              <tr><td><code>gather</code> / <code>gather*</code></td><td>Each line centered</td><td>Every line (or none)</td><td>Several unrelated equations in one display</td></tr>
              <tr><td><code>aligned</code>, <code>gathered</code></td><td>Like <code>align</code>/<code>gather</code></td><td>Inherit from the enclosing <code>equation</code></td><td>Aligned block that is part of a larger equation</td></tr>
              <tr><td><code>cases</code></td><td>Left-aligned columns with a brace</td><td>Inherits</td><td>Piecewise definitions</td></tr>
              <tr><td><code>flalign</code></td><td>Spread to full width</td><td>Every line</td><td>Equation on the left, condition on the right</td></tr>
            </tbody>
          </table>

          <h3>align: a number on every line</h3>
          <pre><code>{`\\begin{align}
  x + y &= 10 \\label{eq:sum} \\\\
  x - y &= 2  \\label{eq:diff}
\\end{align}

Adding \\eqref{eq:sum} and \\eqref{eq:diff} gives $x = 6$.`}</code></pre>
          <p>
            The <code>&amp;</code> marks the alignment point (usually just before <code>=</code>),
            and <code>\\</code> ends each line except the last. A second pair of columns can be
            added with more ampersands: <code>{`a &= b & c &= d`}</code> sets two equations side by
            side.
          </p>

          <h3>split: one number for a broken equation</h3>
          <pre><code>{`\\begin{equation}
  \\label{eq:long}
  \\begin{split}
    (a + b)^4 &= a^4 + 4a^3b + 6a^2b^2 \\\\
              &\\quad + 4ab^3 + b^4
  \\end{split}
\\end{equation}`}</code></pre>
          <p>
            The number is centered vertically on the whole block, and the label goes on the outer{' '}
            <code>equation</code>. The <code>\quad</code> at the start of the continuation line is
            the conventional indent that shows the line is a continuation, not a new equation.
          </p>

          <h3>multline: long equations without an alignment point</h3>
          <pre><code>{`\\begin{multline}
  \\label{eq:series}
  1 + \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} + \\frac{1}{5} + \\frac{1}{6}
  + \\frac{1}{7} + \\frac{1}{8} \\\\
  + \\frac{1}{9} + \\frac{1}{10} + \\dots + \\frac{1}{n} = H_n
\\end{multline}`}</code></pre>

          <h3>gather: centered lines, each numbered</h3>
          <pre><code>{`\\begin{gather}
  a = b + c \\\\
  d + e + f + g = h \\notag \\\\
  x = y
\\end{gather}`}</code></pre>

          <h3>aligned and cases inside equation</h3>
          <p>
            <code>aligned</code> and <code>gathered</code> are building blocks, not full displays:
            they take no number of their own and can sit next to other material in an{' '}
            <code>equation</code>. <code>cases</code> is the same idea with a left brace:
          </p>
          <pre><code>{`\\begin{equation}
  \\label{eq:abs}
  |x| =
  \\begin{cases}
    x  & \\text{if } x \\geq 0 \\\\
    -x & \\text{if } x < 0
  \\end{cases}
\\end{equation}

\\begin{equation}
  \\left.
  \\begin{aligned}
    u &= x + y \\\\
    v &= x - y
  \\end{aligned}
  \\right\\} \\quad \\text{(change of variables)}
\\end{equation}`}</code></pre>
          <p>
            Never nest <code>align</code> inside <code>equation</code>: both are top-level displays
            and amsmath stops with <em>erroneous nesting of equation structures</em>. Use{' '}
            <code>split</code> or <code>aligned</code> inside, and <code>align</code> on its own.
          </p>

          {/* ── Line breaks ── */}
          <h2>New Line in an Equation: Line Breaks in Long Equations</h2>
          <p>
            <code>\\</code> does not work inside a plain <code>equation</code>; the environment is
            a single line by design. To start a new line, switch to one of the multi-line
            environments above. The decision is simple:
          </p>
          <ul>
            <li>One equation, one number, lines aligned on <code>=</code> &rarr; <code>split</code> inside <code>equation</code>.</li>
            <li>One equation, one number, no alignment &rarr; <code>multline</code>.</li>
            <li>Several equations or derivation steps &rarr; <code>align</code>, with <code>\notag</code> on lines that should not be numbered.</li>
          </ul>
          <p>
            Two related tools: <code>\intertext</code> inserts a line of normal text between
            aligned lines without breaking the alignment, and <code>\allowdisplaybreaks</code>{' '}
            allows a page break inside a multi-line display, which amsmath forbids by default:
          </p>
          <pre><code>{`\\allowdisplaybreaks   % in the preamble, or in a group around one display

\\begin{align}
  f(x) &= x^2 + 2x + 1 \\\\
  \\intertext{which factors as}
  f(x) &= (x+1)^2
\\end{align}`}</code></pre>
          <p>
            To permit a break at one specific line instead, put <code>\displaybreak</code> just
            before that line&apos;s <code>\\</code>. The <code>mathtools</code> package adds{' '}
            <code>\shortintertext</code>, which uses less vertical space than{' '}
            <code>\intertext</code>.
          </p>
          <p>
            If you would rather not choose break points by hand, the <code>breqn</code> package
            provides a <code>dmath</code> environment that breaks and aligns long equations
            automatically. It is powerful but interacts badly with some other packages, so try it
            on a copy of the document first.
          </p>

          {/* ── Subequations ── */}
          <h2>Subequations: (1a), (1b), (1c)</h2>
          <p>
            Wrap any numbered environment in <code>subequations</code> and the lines are numbered
            with the parent number plus a letter. A label on the wrapper refers to the group:
          </p>
          <pre><code>{`\\begin{subequations}
  \\label{eq:maxwell}
  \\begin{align}
    \\nabla \\cdot \\mathbf{E}  &= \\frac{\\rho}{\\varepsilon_0} \\label{eq:gauss} \\\\
    \\nabla \\cdot \\mathbf{B}  &= 0 \\label{eq:nomonopole} \\\\
    \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\label{eq:faraday}
  \\end{align}
\\end{subequations}

Maxwell's equations \\eqref{eq:maxwell} ...  % (1)
Gauss's law \\eqref{eq:gauss} ...            % (1a)`}</code></pre>
          <p>
            The letter style comes from <code>\theequation</code> inside the group; for roman
            numerals or another separator, redefine it right after{' '}
            <code>{`\\begin{subequations}`}</code>:{' '}
            <code>{`\\renewcommand{\\theequation}{\\theparentequation.\\roman{equation}}`}</code>{' '}
            gives (1.i), (1.ii).
          </p>

          {/* ── Text refs ── */}
          <h2>Referencing From the Text</h2>
          <p>
            Two conventions are common. Mathematics journals and most physics journals write the
            number alone in parentheses: &ldquo;substituting (3) into (5)&rdquo;. Engineering,
            computer science and many theses spell it out: &ldquo;as shown in Equation (3)&rdquo;
            or &ldquo;Eq. (3)&rdquo;. Either way, <code>\eqref</code> provides the parentheses,
            so do not add a second pair:
          </p>
          <pre><code>{`Substituting \\eqref{eq:sum} into \\eqref{eq:diff} ...   % (1) into (2)
As shown in Equation~\\eqref{eq:sum} ...                % Equation (1)
As shown in Eq.~\\eqref{eq:sum} ...                     % Eq. (1)
As shown in \\cref{eq:sum} ...                          % eq. (1), cleveref
\\Cref{eq:sum} shows ...                                % Equation (1), cleveref`}</code></pre>
          <p>
            With <code>cleveref</code> the wording lives in one place (<code>\crefname</code>), so
            a journal&apos;s request to switch from &ldquo;Eq.&rdquo; to &ldquo;Equation&rdquo;
            is a one-line change. Avoid <code>\autoref</code> from hyperref for equations: it
            prints &ldquo;Equation 3&rdquo; without parentheses, which is inconsistent with{' '}
            <code>\eqref</code> elsewhere.
          </p>

          <h3>Manual numbering with \refstepcounter</h3>
          <p>
            Occasionally you need an equation number in a place amsmath does not number, such as
            one line of an <code>align*</code>. Step the counter yourself and use the result as a
            tag; <code>\refstepcounter</code> (not <code>\stepcounter</code>) is what makes the
            following <code>\label</code> pick up the new value:
          </p>
          <pre><code>{`\\begin{align*}
  a &= b + c \\\\
  \\refstepcounter{equation}
  d &= e + f \\tag{\\theequation} \\label{eq:manual}
\\end{align*}

Only the second line is numbered, as \\eqref{eq:manual}.`}</code></pre>

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
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
                <td>Math-only syntax (<code>_</code>, <code>^</code>, <code>\frac</code>, Greek letters) used outside math, or an unclosed <code>$</code></td>
                <td>Wrap the expression in <code>$...$</code> or a display environment; check for a missing <code>{`\\end{equation}`}</code></td>
              </tr>
              <tr>
                <td><code>\\</code> inside <code>equation</code> does nothing or errors</td>
                <td><code>equation</code> is single-line</td>
                <td>Use <code>split</code>, <code>multline</code> or <code>align</code></td>
              </tr>
              <tr>
                <td><em>Label(s) may have changed. Rerun to get cross-references right</em></td>
                <td>Labels are resolved on the next run</td>
                <td>Compile again (twice after adding labels), or use <code>latexmk</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \eqref</em></td>
                <td><code>amsmath</code> not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code></td>
              </tr>
              <tr>
                <td>Reference shows <strong>??</strong></td>
                <td>Label misspelled, not yet compiled twice, or placed outside the numbered environment</td>
                <td>Check the spelling; keep <code>\label</code> inside the environment</td>
              </tr>
              <tr>
                <td><em>Erroneous nesting of equation structures</em></td>
                <td><code>align</code> or <code>gather</code> inside <code>equation</code></td>
                <td>Use <code>split</code>, <code>aligned</code> or <code>gathered</code> inside; <code>align</code> on its own</td>
              </tr>
              <tr>
                <td><em>Multiple \label&apos;s: label &apos;eq:x&apos; will be lost</em></td>
                <td>Two <code>\label</code> commands on the same numbered line</td>
                <td>Keep one label per number</td>
              </tr>
              <tr>
                <td><em>\tag not allowed here</em> or tag ignored</td>
                <td><code>\tag</code> inside <code>$$...$$</code>, or in an environment that cannot number (<code>aligned</code>, <code>split</code>)</td>
                <td>Use <code>{`\\[ \\]`}</code> or <code>equation</code>; put the tag on the outer environment</td>
              </tr>
              <tr>
                <td>Numbers like (0.1) in an <code>article</code></td>
                <td><code>\numberwithin</code> used but the equation comes before the first <code>\section</code></td>
                <td>Move the equation after a section heading, or drop <code>\numberwithin</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage[hidelinks]{hyperref}
\\usepackage{cleveref}

\\numberwithin{equation}{section}
\\crefname{equation}{Eq.}{Eqs.}
\\Crefname{equation}{Equation}{Equations}

\\begin{document}

\\section{Kinematics}

A body with constant acceleration satisfies
\\begin{equation}
  \\label{eq:velocity}
  v = v_0 + at
\\end{equation}
and
\\begin{equation}
  \\label{eq:position}
  x = x_0 + v_0 t + \\tfrac{1}{2} a t^2 .
\\end{equation}
Eliminating $t$ between \\cref{eq:velocity,eq:position}:
\\begin{align}
  t   &= \\frac{v - v_0}{a} \\notag \\\\
  x - x_0 &= v_0 \\frac{v - v_0}{a} + \\frac{(v - v_0)^2}{2a} \\notag \\\\
  v^2 &= v_0^2 + 2a(x - x_0). \\label{eq:torricelli}
\\end{align}
\\Cref{eq:torricelli} contains no time variable.

\\section{Field equations}

\\begin{subequations}
  \\label{eq:maxwell}
  \\begin{align}
    \\nabla \\cdot \\mathbf{E}  &= \\rho / \\varepsilon_0 \\label{eq:gauss} \\\\
    \\nabla \\cdot \\mathbf{B}  &= 0 \\label{eq:nomono}
  \\end{align}
\\end{subequations}
Together, \\eqref{eq:maxwell} are two of Maxwell's equations;
\\eqref{eq:gauss} alone is Gauss's law.

A long identity with a single number:
\\begin{equation}
  \\label{eq:binom}
  \\begin{split}
    (a+b)^4 &= a^4 + 4a^3 b + 6a^2 b^2 \\\\
            &\\quad + 4ab^3 + b^4 .
  \\end{split}
\\end{equation}

A named equation instead of a number:
\\begin{equation}
  e^{i\\pi} + 1 = 0 \\tag{Euler}
\\end{equation}

The piecewise function
\\begin{equation*}
  |x| =
  \\begin{cases}
    x  & \\text{if } x \\ge 0, \\\\
    -x & \\text{otherwise}
  \\end{cases}
\\end{equation*}
is not numbered because it is never referenced; \\cref{eq:binom} is.

\\end{document}`}</code></pre>
          <p>
            Compile twice. The equations are numbered (1.1), (1.2), (1.3), (2.1a), (2.1b), (2.2)
            and (Euler), and every <code>\cref</code> and <code>\eqref</code> resolves to the
            right one.
          </p>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Numbered equation</td><td><code>{`\\begin{equation} ... \\end{equation}`}</code></td></tr>
              <tr><td>Unnumbered equation</td><td><code>{`\\begin{equation*} ... \\end{equation*}`}</code> or <code>{`\\[ ... \\]`}</code></td></tr>
              <tr><td>Label an equation</td><td><code>{`\\label{eq:name}`}</code> inside the environment</td></tr>
              <tr><td>Reference with parentheses</td><td><code>{`\\eqref{eq:name}`}</code> &rarr; (3)</td></tr>
              <tr><td>Reference with the word</td><td><code>{`\\cref{eq:name}`}</code> &rarr; eq. (3); <code>{`\\Cref{eq:name}`}</code> &rarr; Equation (3)</td></tr>
              <tr><td>Number per section</td><td><code>{`\\numberwithin{equation}{section}`}</code></td></tr>
              <tr><td>Custom tag</td><td><code>{`\\tag{Gauss}`}</code>; without parentheses <code>{`\\tag*{Gauss}`}</code></td></tr>
              <tr><td>No number on one line</td><td><code>\notag</code> (or <code>\nonumber</code>) before <code>\\</code></td></tr>
              <tr><td>Aligned lines, each numbered</td><td><code>{`\\begin{align} a &= b \\\\ c &= d \\end{align}`}</code></td></tr>
              <tr><td>Aligned lines, one number</td><td><code>{`\\begin{equation}\\begin{split} ... \\end{split}\\end{equation}`}</code></td></tr>
              <tr><td>Long equation, one number</td><td><code>{`\\begin{multline} ... \\\\ ... \\end{multline}`}</code></td></tr>
              <tr><td>Several centered equations</td><td><code>{`\\begin{gather} ... \\end{gather}`}</code></td></tr>
              <tr><td>Piecewise definition</td><td><code>{`\\begin{cases} ... \\end{cases}`}</code> inside <code>equation</code></td></tr>
              <tr><td>Sub-numbers (1a), (1b)</td><td><code>{`\\begin{subequations} ... \\end{subequations}`}</code></td></tr>
              <tr><td>Text between aligned lines</td><td><code>{`\\intertext{...}`}</code></td></tr>
              <tr><td>Allow page breaks in displays</td><td><code>\allowdisplaybreaks</code> in the preamble</td></tr>
              <tr><td>Numbers on the left</td><td><code>{`\\documentclass[leqno]{article}`}</code></td></tr>
              <tr><td>Manual number</td><td><code>{`\\refstepcounter{equation}`}</code> + <code>{`\\tag{\\theequation}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Numbering under control? Continue with the rest of the math toolkit:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, roots, operators and the amsmath environments in detail</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> &ndash; Big operators, limits above and below, and multi-line sums</li>
            <li><Link href="/learn/theorems-proofs">Theorems, Lemmas and Proofs</Link> &ndash; amsthm, \newtheorem and the QED symbol, with the same \label/\cref workflow</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> &ndash; pmatrix, bmatrix and augmented matrices inside numbered equations</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> &ndash; Every symbol used in the examples above</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; Make equation references clickable with hyperref</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-equation-editor" target="_blank" rel="noopener noreferrer">LaTeX Equation Editor</Link> &ndash; Write and preview equations visually</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check equation numbering with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix equation errors faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor spots undefined labels, picks the right amsmath environment
              for a multi-line equation, and compiles your document in seconds.
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
    title: 'LaTeX Equation Numbering and Referencing: \\label, \\eqref, \\tag and align',
    description: 'How to number and reference equations in LaTeX: equation vs equation*, \\label, \\ref, \\eqref and cleveref \\cref, numbering within sections, custom tags, \\nonumber and \\notag, multi-line equations with align, split, multline and gather, line breaks in long equations, subequations (1a, 1b), left-hand numbers, and common errors.',
    keywords: 'latex equation numbering, latex reference equation, cite equation latex, latex eqref, latex label equation, latex new line in equation, latex align equation, latex split equation, latex multline, latex nonumber, latex notag, latex tag equation, latex subequations, latex numberwithin, latex equation number left, cleveref equation, latex equation without number, latex line break equation',
    openGraph: mergeOpenGraph({
      title: 'LaTeX Equation Numbering and Referencing: \\label, \\eqref, \\tag and align',
      description: 'Number, reference and break equations in LaTeX: \\label and \\eqref, cleveref, numbering per section, custom tags, align, split, multline and subequations.',
      type: 'article',
      url: '/learn/equation-numbering',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'LaTeX Equation Numbering and Referencing',
      description: 'Number, label and reference equations in LaTeX, including multi-line equations with align and split.',
    },
    alternates: {
      canonical: '/learn/equation-numbering',
    },
  }
}
