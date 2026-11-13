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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Equation Numbering', 'equation-numbering')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'equation-numbering',
  title: 'Equation Numbering and Referencing in LaTeX: \\label, \\ref, \\eqref',
  seoTitle: 'LaTeX Equation Numbering and Referencing',
  description:
    'LaTeX equation numbering and referencing: number equations, label them with \\label and cite them with \\ref, \\eqref or \\cref. \\tag, subequations and fixes.',
  keywords: 'latex equation numbering, latex number equations, reference equations latex, label equations latex, latex reference equation, cite equation latex, latex eqref, latex label equation, latex new line in equation, latex align equation, latex split equation, latex multline, latex nonumber, latex notag, latex tag equation, latex subequations, latex numberwithin, latex equation number left, cleveref equation, latex equation without number, latex line break equation',
}

const faq: FaqItem[] = [
  {
    question: 'How do you number equations in LaTeX?',
    answer:
      'Use the equation environment: \\begin{equation} E = mc^2 \\end{equation} is numbered (1), (2), (3) automatically. Use equation* or \\[ ... \\] for an unnumbered display, and align for several numbered lines. Add \\numberwithin{equation}{section} to the preamble to number per section, as (1.1), (1.2).',
  },
  {
    question: 'How do you reference an equation in LaTeX?',
    answer:
      'Put \\label{eq:name} inside the equation and write \\eqref{eq:name} where you want the number. \\eqref comes from amsmath and prints the number in parentheses, (1). \\ref{eq:name} prints the bare number, and \\cref{eq:name} from cleveref adds the word, eq. (1). Compile twice so the numbers resolve.',
  },
  {
    question: 'What is the difference between \\ref and \\eqref?',
    answer:
      '\\ref prints only the number, so you write the parentheses yourself: (\\ref{eq:x}). \\eqref prints the number with parentheses, upright even inside italic text, exactly as it appears next to the equation. Use \\eqref for equations and \\ref for sections, figures and tables.',
  },
  {
    question: 'Why does my equation reference show ?? or say Reference undefined?',
    answer:
      'LaTeX writes labels to the .aux file on one run and reads them on the next, so the first LaTeX pass after adding a new label can show ??. Compile a second time. If the warning stays, the label name is misspelled, or \\label is outside the numbered environment, or it is on a line suppressed with \\notag.',
  },
  {
    question: 'How do I remove the number from one equation?',
    answer:
      'Use the starred environment, equation* or align*, for a whole display. Inside a numbered align, put \\notag (or \\nonumber) before the \\\\ of each line that should not be numbered. \\tag{text} replaces the number with your own label instead.',
  },
  {
    question: 'How do I number equations as (1a), (1b)?',
    answer:
      'Wrap the equations in the subequations environment from amsmath: \\begin{subequations} \\begin{align} ... \\end{align} \\end{subequations}. Each line gets the parent number plus a letter, and a \\label placed directly inside subequations refers to the whole group.',
  },
]

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-13'

export default async function LaTeXEquationNumberingPage() {
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
          <h1>Equation Numbering and Referencing in LaTeX: \label, \ref, \eqref</h1>
          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Number an equation:</strong> <code>{`\\begin{equation}`}</code> ... <code>{`\\end{equation}`}</code> is numbered automatically; <code>{`equation*`}</code> (or <code>{`\\[ ... \\]`}</code>) is not.
              </li>
              <li>
                <strong>Label it:</strong> put <code>{`\\label{eq:energy}`}</code> inside the environment.
              </li>
              <li>
                <strong>Reference it:</strong> <code>{`\\eqref{eq:energy}`}</code> prints (1); <code>{`\\ref{eq:energy}`}</code> prints 1; <code>{`\\cref{eq:energy}`}</code> (cleveref) prints eq. (1).
              </li>
              <li>
                <strong>Custom number:</strong> <code>{`\\tag{A}`}</code> replaces the number; <code>{`\\notag`}</code> drops it on one line of align.
              </li>
              <li>
                <strong>Per-section numbers:</strong> <code>{`\\numberwithin{equation}{section}`}</code> in the preamble gives (1.1), (1.2), (2.1).
              </li>
              <li>
                <strong>References show ??:</strong> compile twice; labels are resolved on the second run.
              </li>
            </ul>
          </div>
          <p className="lead">
            Use <code>equation</code> to number a display, put <code>\label</code> inside it,
            and reference the number with <code>\eqref</code> from <code>amsmath</code>.
            Choose <code>align</code> for separate numbered lines or <code>split</code>
            inside <code>equation</code> for one number across several lines.
          </p>

          {/* ── Basics ── */}
          <h2>How to Number Equations in LaTeX: equation vs equation*</h2>
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
          <h2>How to Label and Reference Equations: \label, \ref and \eqref</h2>
          <p>
            Put <code>\label</code> inside the numbered environment. In <code>align</code>,
            place it on the intended row before the row break, not after the entire display.
            Three commands read
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
            Labels are resolved on the <em>next</em> compilation run, so the first LaTeX pass after
            adding a new label can show <strong>??</strong> and the warning <em>Label(s) may have changed.
            Rerun to get cross-references right</em>. Compile twice, or use <code>latexmk</code>,
            which reruns as needed. An editor may already run LaTeX several times per build,
            so a single click can resolve the references. If they remain undefined, check the
            exact label spelling and whether the target actually has a number.
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
            tagged equation were not there. Avoid tags that duplicate automatic numbers: two
            equations called (1) are ambiguous even when their labels differ. Put a label on the
            tagged equation to reference the tag instead of typing it in the prose.
            <code>\tag*</code> prints the tag without parentheses:
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
          <div className="overflow-x-auto">
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
          </div>

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

          <p>
            For text between rows of <code>align</code>, use <code>\intertext</code>.
            <code>\allowdisplaybreaks</code> permits page breaks between rows of environments
            such as <code>align</code> and <code>gather</code>, but not inside the unbreakable
            <code>split</code> and <code>aligned</code> building blocks. A long derivation that
            must span pages should not be wrapped in one <code>equation</code>.
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

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
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
                <td><em>LaTeX Warning: Reference `eq:x&apos; on page 1 undefined</em></td>
                <td>The label has not been written to the <code>.aux</code> file yet, or it does not exist</td>
                <td>Compile a second time; if the warning stays, the label is misspelled or missing</td>
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
          </div>

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

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you number equations in LaTeX?</h3>
          <p>
            Use the equation environment: <code>{`\\begin{equation}`}</code> E = mc^2 <code>{`\\end{equation}`}</code> is numbered (1), (2), (3) automatically. Use equation* or <code>{`\\[ ... \\]`}</code> for an unnumbered display, and align for several numbered lines. Add <code>{`\\numberwithin{equation}{section}`}</code> to the preamble to number per section, as (1.1), (1.2).
          </p>
          <h3>How do you reference an equation in LaTeX?</h3>
          <p>
            Put <code>{`\\label{eq:name}`}</code> inside the equation and write <code>{`\\eqref{eq:name}`}</code> where you want the number. <code>{`\\eqref`}</code> comes from amsmath and prints the number in parentheses, (1). <code>{`\\ref{eq:name}`}</code> prints the bare number, and <code>{`\\cref{eq:name}`}</code> from cleveref adds the word, eq. (1). Compile twice so the numbers resolve.
          </p>
          <h3>What is the difference between \ref and \eqref?</h3>
          <p>
            <code>{`\\ref`}</code> prints only the number, so you write the parentheses yourself: (<code>{`\\ref{eq:x}`}</code>). <code>{`\\eqref`}</code> prints the number with parentheses, upright even inside italic text, exactly as it appears next to the equation. Use <code>{`\\eqref`}</code> for equations and <code>{`\\ref`}</code> for sections, figures and tables.
          </p>
          <h3>Why does my equation reference show ?? or say Reference undefined?</h3>
          <p>
            LaTeX writes labels to the .aux file on one run and reads them on the next, so the first LaTeX pass after adding a new label can show ??. Compile a second time. If the warning stays, the label name is misspelled, or <code>{`\\label`}</code> is outside the numbered environment, or it is on a line suppressed with <code>{`\\notag`}</code>.
          </p>
          <h3>How do I remove the number from one equation?</h3>
          <p>
            Use the starred environment, <code>{`equation*`}</code> or <code>{`align*`}</code>, for a whole display. Inside a numbered align, put <code>{`\\notag`}</code> (or <code>{`\\nonumber`}</code>) before the \\ of each line that should not be numbered. <code>{`\\tag{text}`}</code> replaces the number with your own label instead.
          </p>
          <h3>How do I number equations as (1a), (1b)?</h3>
          <p>
            Wrap the equations in the subequations environment from amsmath: <code>{`\\begin{subequations}`}</code> <code>{`\\begin{align}`}</code> ... <code>{`\\end{align}`}</code> <code>{`\\end{subequations}`}</code>. Each line gets the parent number plus a letter, and a <code>{`\\label`}</code> placed directly inside subequations refers to the whole group.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Numbering under control? Continue with the rest of the math toolkit:</p>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, roots, operators and the amsmath environments in detail</li>
            <li><Link href="/learn/theorems-proofs">Theorems, Lemmas and Proofs</Link> &ndash; amsthm, \newtheorem and the QED symbol, with the same \label/\cref workflow</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> &ndash; pmatrix, bmatrix and augmented matrices inside numbered equations</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; Make equation references clickable with hyperref</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX Converter</Link> &ndash; Turn handwritten or typed math into LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check equation numbering with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix equation errors faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Open the complete example in Octree and ask AI chat about a numbering error.
              Compile the result, then check the printed numbers and clickable references.
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
