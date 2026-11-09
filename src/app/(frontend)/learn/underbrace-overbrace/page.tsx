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

const breadcrumbs = getLearnBreadcrumbs('Underbrace and Overbrace in LaTeX', 'underbrace-overbrace')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'underbrace-overbrace',
  title: 'Underbrace and Overbrace in LaTeX: \\underbrace, \\overbrace and Annotations',
  seoTitle: 'Underbrace in LaTeX: \\underbrace and \\overbrace',
  description: 'Underbrace in LaTeX: \\underbrace{a+b}_{\\text{sum}}, \\overbrace with labels, nested and overlapping braces, \\underset, \\overset, \\underbracket and errors.',
  keywords: 'underbrace latex, latex underbrace, underbrace in latex, overbrace latex, latex overbrace, latex underbrace text, latex underbrace label, latex brace under equation, latex curly brace under text, latex horizontal brace, latex nested underbrace, latex overlapping braces, latex underset, latex overset, latex stackrel, latex xrightarrow, latex xleftarrow, latex underbracket, latex overbracket, mathtools underbracket, latex mathclap, latex annotate equation, latex underbrace color',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I put a brace under an expression in LaTeX?',
    answer:
      'Use \\underbrace in math mode: $\\underbrace{a+b+c}_{\\text{sum}}$. The brace spans everything in the first pair of braces, and the subscript after it becomes the label under the brace. \\text needs the amsmath package; for a math label such as n write _{n}.',
  },
  {
    question: 'How do I put a brace over an expression?',
    answer:
      'Use \\overbrace with a superscript for the label: $\\overbrace{x_1 + \\dots + x_n}^{n \\text{ terms}}$. It works exactly like \\underbrace, with the brace and the label above the expression instead of below.',
  },
  {
    question: 'Can I use \\underbrace in normal text?',
    answer:
      'Not directly: \\underbrace is a math command, and in running text it stops with “Missing $ inserted”. Wrap it in math mode and put the words in \\text: $\\underbrace{\\text{these words}}_{\\text{a label}}$. In a sentence, inline braces push the lines apart, so put larger annotations in a display.',
  },
  {
    question: 'How do I make braces overlap in LaTeX?',
    answer:
      'Draw one brace normally and the other over an invisible copy of the overlapping part. With mathtools: {\\overbrace{a+b+\\mathrlap{\\underbrace{\\phantom{c+d}}_{y}}c}^{x}}+d puts an overbrace over a+b+c and an underbrace under c+d. \\mathrlap makes the underbrace take no width, and \\phantom gives it the right length.',
  },
  {
    question: 'What is the difference between \\underbrace and \\underset?',
    answer:
      '\\underbrace draws a horizontal curly brace under an expression and puts the label under the brace. \\underset{below}{symbol} places something directly under a symbol with no brace, for example \\underset{n \\to \\infty}{\\longrightarrow} or a small note under an equals sign. \\overset is the counterpart above.',
  },
  {
    question: 'Why is the space around my underbrace too wide?',
    answer:
      'A label that is wider than the expression under the brace widens the whole expression. Wrap the label in \\mathclap from the mathtools package, \\underbrace{x}_{\\mathclap{\\text{a long label}}}, so it takes no horizontal space. Split long labels over two lines with \\substack.',
  },
]

export default async function LearnUnderbraceOverbracePage() {
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
          <h1>Underbrace and Overbrace in LaTeX: \underbrace, \overbrace and Annotations</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Brace below:</strong> <code>{`\\underbrace{a+b}_{\\text{sum}}`}</code> in math
                mode; <code>\text</code> needs amsmath.
              </li>
              <li>
                <strong>Brace above:</strong> <code>{`\\overbrace{a+b}^{\\text{sum}}`}</code>.
              </li>
              <li>
                <strong>Nested:</strong> <code>{`\\underbrace{a + \\underbrace{b+c}_{y}}_{x}`}</code>.
              </li>
              <li>
                <strong>A label without a brace:</strong>{' '}
                <code>{`\\underset{\\text{def}}{=}`}</code>, <code>{`\\overset{!}{=}`}</code>; labelled
                arrows <code>{`\\xrightarrow[\\text{below}]{\\text{above}}`}</code>,{' '}
                <code>\xleftarrow</code>.
              </li>
              <li>
                <strong>Square brackets instead:</strong>{' '}
                <code>{`\\underbracket{a+b}_{\\text{sum}}`}</code> (mathtools).
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{mathtools}   % loads amsmath

\\begin{document}
\\[
  {\\underbrace{a + b}_{\\text{sum}}} \\cdot
  \\overbrace{x_1 x_2 \\cdots x_n}^{n \\text{ factors}}
  \\overset{!}{=} \\underbracket{c}_{\\text{target}}
\\]
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Horizontal curly braces are the standard way to annotate part of an equation:
            counting terms, naming a sub-expression or explaining a step. LaTeX has them built in
            as <code>\underbrace</code> and <code>\overbrace</code>, and amsmath and mathtools add
            labels, brackets and arrows around them. This guide shows how to label braces, nest
            and overlap them, keep long labels from stretching the equation, put notes under and
            over symbols with <code>\underset</code> and <code>\overset</code>, and fix the errors
            these commands produce.
          </p>

          {/* ── underbrace ── */}
          <h2>Underbrace in LaTeX</h2>
          <p>
            <code>{`\\underbrace{expression}_{label}`}</code> draws a brace under the expression and
            sets the subscript under the brace. It only works in math mode. Use{' '}
            <code>\text</code> (amsmath) for words in the label, and plain math for symbols:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[ \\underbrace{1 + 1 + \\cdots + 1}_{n \\text{ times}} = n \\]

\\[ (a+b)^2 = a^2 + {\\underbrace{2ab}_{\\text{cross term}}} + b^2 \\]

\\[ \\int_0^1 \\underbrace{x^2}_{f(x)} \\, dx = \\frac{1}{3} \\]

Inline it works too: $\\underbrace{x + y}_{z}$, but it pushes the lines apart.
\\end{document}`}</code></pre>
          <p>
            The label is set in the smaller script size, like any subscript. For a label at full
            size, write <code>{`_{\\displaystyle ...}`}</code>, and for an empty brace leave the
            subscript out. The brace grows with the expression; there is no size to set.
          </p>
          <p>
            One spacing detail: TeX treats a braced expression as an operator, like{' '}
            <code>\sum</code>, so a <code>+</code> or <code>&minus;</code> right after it loses
            its space and reads as a sign (&ldquo;b +c&rdquo;). Wrap the whole brace in an extra
            pair of braces, <code>{`{\\underbrace{2ab}_{\\text{cross term}}} + b^2`}</code>, as in
            the example above, and the normal spacing comes back.
          </p>

          {/* ── overbrace ── */}
          <h2>Overbrace in LaTeX</h2>
          <p>
            <code>{`\\overbrace{expression}^{label}`}</code> is the same above the expression, with a
            superscript for the label. Combining the two annotates one expression from both sides:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[ \\overbrace{x_1 + x_2 + \\cdots + x_n}^{n \\text{ terms}} \\]

\\[ {\\overbrace{a + b}^{\\text{first}}} + \\underbrace{c + d}_{\\text{second}} \\]

\\[ e^{i\\pi} + 1 = \\overbrace{0}^{\\text{zero}} \\]
\\end{document}`}</code></pre>

          {/* ── nested ── */}
          <h2>Nested and Overlapping Braces</h2>
          <p>
            Braces nest without any trick: put one <code>\underbrace</code> inside another. Each
            inner label sits between the expression and the outer brace:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[
  \\underbrace{a + \\underbrace{b + c}_{\\text{inner}}}_{\\text{outer}}
  \\qquad
  \\overbrace{{\\underbrace{x + y}_{\\text{below}}} + z}^{\\text{above}}
\\]
\\end{document}`}</code></pre>
          <p>
            Overlapping braces, where one brace covers <em>a+b+c</em> and another{' '}
            <em>c+d</em>, need a phantom. Draw the second brace under an invisible copy of the
            shared part and use <code>\mathrlap</code> (mathtools) so it takes no width:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools}

\\begin{document}
\\[
  {\\overbrace{a + b + \\mathrlap{\\underbrace{\\phantom{c + d}}_{y}} c}^{x}} + d
\\]
\\end{document}`}</code></pre>
          <p>
            Read it from the inside: <code>{`\\phantom{c + d}`}</code> is empty space as wide as{' '}
            <em>c+d</em>, the underbrace is drawn under that space, and{' '}
            <code>\mathrlap</code> overlaps it with what follows, so the real <em>c</em> and{' '}
            <em>+d</em> print on top of it.
          </p>

          {/* ── long labels ── */}
          <h2>Long Labels: \mathclap and \substack</h2>
          <p>
            A label wider than its expression widens the expression, which opens gaps in the
            equation. <code>\mathclap</code> from mathtools centres the label without letting it
            take width; <code>\substack</code> from amsmath splits it over lines:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools}

\\begin{document}
\\[ a + {\\underbrace{b}_{\\text{a rather long label}}} + c \\]   % gaps around b

\\[ a + {\\underbrace{b}_{\\mathclap{\\text{a rather long label}}}} + c \\]   % no gaps

\\[ f(x) = {\\underbrace{x^2}_{\\substack{\\text{quadratic} \\\\ \\text{term}}}}
         + \\underbrace{3x}_{\\substack{\\text{linear} \\\\ \\text{term}}} \\]
\\end{document}`}</code></pre>
          <p>
            In <code>align</code>, labels add depth to their line; if two labelled lines come too
            close, add space after the line break with <code>{`\\\\[1ex]`}</code>. See{' '}
            <Link href="/learn/multiline-equations">multiline equations</Link> for alignment.
          </p>

          {/* ── underset/overset ── */}
          <h2>\underset, \overset and Labelled Arrows</h2>
          <p>
            When you want a note under or over a single symbol without a brace, use{' '}
            <code>\underset</code> and <code>\overset</code> from amsmath. Extensible arrows with
            labels come from <code>\xrightarrow</code> and <code>\xleftarrow</code>:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Result</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\underbrace{x}_{a}`}</code></td><td>Brace under <em>x</em>, label <em>a</em> below</td><td>built in</td></tr>
                <tr><td><code>{`\\overbrace{x}^{a}`}</code></td><td>Brace over <em>x</em>, label above</td><td>built in</td></tr>
                <tr><td><code>{`\\underset{a}{x}`}</code></td><td><em>a</em> set under <em>x</em>, no brace</td><td>amsmath</td></tr>
                <tr><td><code>{`\\overset{a}{x}`}</code></td><td><em>a</em> set over <em>x</em>, no brace</td><td>amsmath</td></tr>
                <tr><td><code>{`\\stackrel{a}{=}`}</code></td><td><em>a</em> over a relation (older form of <code>\overset</code>)</td><td>built in</td></tr>
                <tr><td><code>{`\\xrightarrow[b]{a}`}</code></td><td>Arrow that stretches to fit <em>a</em> above, <em>b</em> below</td><td>amsmath</td></tr>
                <tr><td><code>{`\\xleftarrow[b]{a}`}</code></td><td>The same, pointing left</td><td>amsmath</td></tr>
                <tr><td><code>{`\\underbracket{x}_{a}`}</code></td><td>Square bracket under <em>x</em></td><td>mathtools</td></tr>
                <tr><td><code>{`\\overbracket{x}^{a}`}</code></td><td>Square bracket over <em>x</em></td><td>mathtools</td></tr>
                <tr><td><code>{`\\underline{x}`}</code>, <code>{`\\overline{x}`}</code></td><td>Plain line, no label</td><td>built in</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\[ f(x) \\overset{\\text{def}}{=} x^2 \\qquad
   a \\underset{\\text{(1)}}{\\le} b \\qquad
   x_n \\xrightarrow[n \\to \\infty]{\\text{a.s.}} x \\qquad
   A \\xleftarrow{\\ f\\ } B \\]

\\[ \\lim_{n \\to \\infty} a_n \\qquad \\underset{n \\to \\infty}{\\lim} a_n \\]
\\end{document}`}</code></pre>
          <p>
            For limits under operators such as <code>\lim</code>, <code>\sum</code> or{' '}
            <code>\max</code>, a subscript already goes underneath in display math, so{' '}
            <code>\underset</code> is not needed; see{' '}
            <Link href="/learn/integrals-sums-limits">integrals, sums and limits</Link>.
          </p>

          {/* ── underbracket ── */}
          <h2>\underbracket and \overbracket (mathtools)</h2>
          <p>
            mathtools adds square-bracket versions. Two optional arguments set the rule thickness
            and the height of the bracket ends:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{mathtools,xcolor}

\\begin{document}
\\[ \\underbracket{a + b}_{\\text{default}} \\quad
   \\underbracket[1pt][6pt]{a + b}_{\\text{thick, tall}} \\quad
   \\overbracket{c + d}^{\\text{over}} \\]

% Coloured brace and label: put the colour inside a group
\\[ x = {\\color{blue}\\underbrace{a + b}_{\\text{blue part}}} + c \\]
\\end{document}`}</code></pre>
          <p>
            For colour, <code>\color</code> inside a group colours the brace, the label and the
            expression; for more colour options see <Link href="/learn/colors">colors</Link>.
            Vertical curly braces, as in a piecewise function, are a different construction:{' '}
            <code>{`\\left\\{ ... \\right.`}</code> or the <code>cases</code> environment, covered in{' '}
            <Link href="/learn/brackets">brackets</Link>.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
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
                  <td><code>\underbrace</code> or <code>\overbrace</code> used in running text</td>
                  <td>Wrap it in math: <code>{`$\\underbrace{\\text{words}}_{\\text{label}}$`}</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\text</code></td>
                  <td><code>\text</code> comes from amsmath, which is not loaded</td>
                  <td><code>{`\\usepackage{amsmath}`}</code> (or mathtools, which loads it)</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\underbracket</code>, <code>\mathclap</code> or <code>\mathrlap</code></td>
                  <td>These come from mathtools</td>
                  <td><code>{`\\usepackage{mathtools}`}</code></td>
                </tr>
                <tr>
                  <td><em>Double subscript</em></td>
                  <td>Two labels after one brace: <code>{`\\underbrace{x}_{a}_{b}`}</code></td>
                  <td>One label per brace; stack lines with <code>{`\\substack{a \\\\ b}`}</code></td>
                </tr>
                <tr>
                  <td>Only the first letter of the label is under the brace</td>
                  <td>Label without braces: <code>{`\\underbrace{x}_sum`}</code></td>
                  <td>Brace the label: <code>{`_{\\text{sum}}`}</code></td>
                </tr>
                <tr>
                  <td>Words in the label are italic and run together</td>
                  <td>Label typed as math: <code>{`_{the sum}`}</code></td>
                  <td>Use <code>{`_{\\text{the sum}}`}</code></td>
                </tr>
                <tr>
                  <td>No space in <code>+</code> after a brace (&ldquo;b +c&rdquo;)</td>
                  <td>The brace is an operator, so the next <code>+</code> is read as a sign</td>
                  <td>Group it: <code>{`{\\underbrace{b}_{x}} + c`}</code></td>
                </tr>
                <tr>
                  <td>Big gaps around a short expression</td>
                  <td>A long label widens it</td>
                  <td><code>{`\\mathclap{...}`}</code> around the label, or <code>\substack</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I put a brace under an expression in LaTeX?</h3>
          <p>
            Use <code>\underbrace</code> in math mode:{' '}
            <code>{`$\\underbrace{a+b+c}_{\\text{sum}}$`}</code>. The brace spans everything in the
            first pair of braces, and the subscript after it becomes the label under the brace.{' '}
            <code>\text</code> needs the amsmath package; for a math label such as <em>n</em>{' '}
            write <code>{`_{n}`}</code>.
          </p>
          <h3>How do I put a brace over an expression?</h3>
          <p>
            Use <code>\overbrace</code> with a superscript for the label:{' '}
            <code>{`$\\overbrace{x_1 + \\dots + x_n}^{n \\text{ terms}}$`}</code>. It works exactly
            like <code>\underbrace</code>, with the brace and the label above the expression
            instead of below.
          </p>
          <h3>Can I use \underbrace in normal text?</h3>
          <p>
            Not directly: <code>\underbrace</code> is a math command, and in running text it stops
            with &ldquo;Missing $ inserted&rdquo;. Wrap it in math mode and put the words in{' '}
            <code>\text</code>: <code>{`$\\underbrace{\\text{these words}}_{\\text{a label}}$`}</code>.
            In a sentence, inline braces push the lines apart, so put larger annotations in a
            display.
          </p>
          <h3>How do I make braces overlap in LaTeX?</h3>
          <p>
            Draw one brace normally and the other over an invisible copy of the overlapping part.
            With mathtools:{' '}
            <code>{`{\\overbrace{a+b+\\mathrlap{\\underbrace{\\phantom{c+d}}_{y}}c}^{x}}+d`}</code> puts
            an overbrace over <em>a+b+c</em> and an underbrace under <em>c+d</em>.{' '}
            <code>\mathrlap</code> makes the underbrace take no width, and <code>\phantom</code>{' '}
            gives it the right length.
          </p>
          <h3>What is the difference between \underbrace and \underset?</h3>
          <p>
            <code>\underbrace</code> draws a horizontal curly brace under an expression and puts
            the label under the brace. <code>{`\\underset{below}{symbol}`}</code> places something
            directly under a symbol with no brace, for example{' '}
            <code>{`\\underset{n \\to \\infty}{\\longrightarrow}`}</code> or a small note under an
            equals sign. <code>\overset</code> is the counterpart above.
          </p>
          <h3>Why is the space around my underbrace too wide?</h3>
          <p>
            A label that is wider than the expression under the brace widens the whole
            expression. Wrap the label in <code>\mathclap</code> from the mathtools package,{' '}
            <code>{`\\underbrace{x}_{\\mathclap{\\text{a long label}}}`}</code>, so it takes no
            horizontal space. Split long labels over two lines with <code>\substack</code>.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Inline and display math with amsmath</li>
            <li><Link href="/learn/brackets">Brackets</Link> &ndash; Vertical braces, \left and \right, and cases</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; align, split and labelled steps</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> &ndash; How the labels are placed</li>
            <li><Link href="/learn/commands-macros">LaTeX Commands and Macros</Link> &ndash; Define shortcuts for repeated annotations</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check brace placement with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate annotated equations from text</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Annotate equations faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe the annotation you want and Octree&apos;s AI writes the braces, labels and
              arrows, fixes &ldquo;Missing $ inserted&rdquo; and compiles your document in seconds.
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
