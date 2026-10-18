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

const breadcrumbs = getLearnBreadcrumbs('Brackets and Parentheses in LaTeX', 'brackets')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'brackets',
  title: 'Brackets and Parentheses in LaTeX: Sizing, \\left \\right, and Matrix Brackets',
  seoTitle: 'Brackets in LaTeX: \\left \\right, Sizes, Matrices',
  description: 'Every bracket in LaTeX: ( ) [ ] \\{ \\}, angle brackets, absolute value and norm bars, floor and ceiling, automatic sizing with \\left \\right, manual \\big to \\Bigg, matrix brackets, cases, and mathtools \\abs and \\norm.',
  keywords: 'latex brackets, brackets in latex, latex angle brackets, angular brackets latex, latex matrix brackets, latex curly braces, latex big brackets, latex left right, latex absolute value bars, latex norm, latex floor ceiling, latex langle rangle, latex parentheses size, latex bracket sizes, latex square brackets, latex pmatrix bmatrix, latex cases bracket, latex underbrace, latex missing right inserted',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I write angle brackets in LaTeX?',
    answer:
      'Use \\langle and \\rangle in math mode: $\\langle x, y \\rangle$. Do not use < and >, which are the less-than and greater-than relations and get the wrong shape and spacing. In text mode use \\textlangle and \\textrangle.',
  },
  {
    question: 'How do I make brackets bigger in LaTeX?',
    answer:
      'Wrap the contents in \\left( ... \\right) and LaTeX sizes the brackets automatically to the height of what is between them. For manual control use \\bigl( \\Bigl( \\biggl( \\Biggl( with the matching \\bigr) and so on; these four sizes grow from 1.2 to 3 times the normal height.',
  },
  {
    question: 'How do I put brackets around a matrix?',
    answer:
      'Use the amsmath matrix environments: pmatrix for parentheses, bmatrix for square brackets, Bmatrix for curly braces, vmatrix for single bars (a determinant) and Vmatrix for double bars. Plain matrix has no brackets. Without amsmath, wrap an array in \\left( ... \\right).',
  },
  {
    question: 'Why do I get "Missing \\right. inserted"?',
    answer:
      'Every \\left must be matched by a \\right in the same line and the same cell of an alignment. A \\left( on one line of an align and the \\right) on the next, or on the other side of an &, triggers this error (inside align it is reported as "Extra }, or forgotten \\right"). Close the first line with \\right. and open the next with \\left. (the dot is an invisible delimiter), or use the manual \\bigl and \\bigr sizes, which need no matching.',
  },
  {
    question: 'How do I write curly braces in LaTeX?',
    answer:
      'Braces are reserved for grouping, so escape them: \\{ and \\} work in both text and math. In math you can also write \\lbrace and \\rbrace, and \\left\\{ ... \\right\\} for automatic sizing. Bmatrix gives a matrix in braces and cases gives a left brace for piecewise definitions.',
  },
]

export default async function LaTeXBracketsPage() {
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
          <h1>Brackets and Parentheses in LaTeX: Sizing, \left \right, and Matrix Brackets</h1>
          <p className="lead">
            Parentheses and square brackets are typed as they are. Curly braces need a backslash,
            angle brackets need <code>\langle</code> and <code>\rangle</code>, and anything
            wrapped around a fraction, a sum or a matrix needs to grow to fit. This guide covers
            every delimiter LaTeX offers, automatic sizing with <code>\left</code> and{' '}
            <code>\right</code>, the manual <code>\big</code> to <code>\Bigg</code> sizes, matrix
            brackets, piecewise <code>cases</code>, braces over and under expressions, the{' '}
            <code>mathtools</code> way to define <code>\abs</code> and <code>\norm</code>, and
            the errors that come up.
          </p>

          {/* ── Basic delimiters ── */}
          <h2>The Delimiters</h2>
          <p>
            In math mode, round and square brackets are ordinary characters. Everything else is
            a command, and most come in an opening and a closing form:
          </p>
          <table>
            <thead>
              <tr>
                <th>Bracket</th>
                <th>Code</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>( )</td><td><code>( )</code></td><td>Typed directly</td></tr>
              <tr><td>[ ]</td><td><code>[ ]</code></td><td>Typed directly</td></tr>
              <tr><td>{'{ }'}</td><td><code>{`\\{ \\}`}</code> or <code>\lbrace \rbrace</code></td><td>Bare braces group and print nothing</td></tr>
              <tr><td>&#x27E8; &#x27E9;</td><td><code>\langle \rangle</code></td><td>Angle brackets; not <code>&lt; &gt;</code></td></tr>
              <tr><td>| |</td><td><code>\lvert \rvert</code></td><td>Absolute value (amsmath); plain <code>|</code> also works</td></tr>
              <tr><td>&#x2016; &#x2016;</td><td><code>\lVert \rVert</code></td><td>Norm (amsmath); plain <code>\|</code> also works</td></tr>
              <tr><td>&lfloor; &rfloor;</td><td><code>\lfloor \rfloor</code></td><td>Floor</td></tr>
              <tr><td>&lceil; &rceil;</td><td><code>\lceil \rceil</code></td><td>Ceiling</td></tr>
              <tr><td>/ \</td><td><code>/ \backslash</code></td><td>Slashes can be sized too</td></tr>
              <tr><td>&#x231C; &#x231D;</td><td><code>\ulcorner \urcorner</code></td><td>amssymb; also <code>\llcorner \lrcorner</code></td></tr>
            </tbody>
          </table>
          <pre><code>{`\\usepackage{amsmath, amssymb}

$(a)$ $[b]$ $\\{c\\}$ $\\langle d \\rangle$ $\\lvert e \\rvert$ $\\lVert f \\rVert$
$\\lfloor g \\rfloor$ $\\lceil h \\rceil$`}</code></pre>
          <p>
            The full list, including <code>\lgroup</code>, <code>\lmoustache</code> and the
            arrows that can act as delimiters, is in the{' '}
            <Link href="https://tools.useoctree.com/symbols/brackets" target="_blank" rel="noopener noreferrer">brackets symbol reference</Link>.
          </p>

          <h3>Why &lt; and &gt; are the wrong angle brackets</h3>
          <p>
            <code>$&lt;x, y&gt;$</code> compiles, but it is wrong twice over. The characters are
            the less-than and greater-than <em>relations</em>, so TeX surrounds them with the
            wide spacing it puts around <code>=</code>, and their glyphs are shorter and more
            open than real angle brackets. <code>\langle</code> and <code>\rangle</code> are
            proper opening and closing delimiters with the right shape, the right spacing, and
            the ability to grow with <code>\left</code> and <code>\right</code>. Outside math,{' '}
            <code>\textlangle</code> and <code>\textrangle</code> give the text-mode versions.
          </p>

          <h3>Bars: | versus \lvert, \mid and \|</h3>
          <p>
            A plain <code>|</code> is an ordinary symbol, so TeX does not know whether it opens
            or closes. In <code>$|{'-'}x|$</code> the minus sign is treated as binary and gets
            space on both sides. <code>\lvert ... \rvert</code> fixes that by declaring an
            opening and a closing bar. When the bar is a relation, as in set-builder notation
            or conditional probability, use <code>\mid</code> instead, which gets relation
            spacing on both sides. <code>\|</code> and <code>\lVert ... \rVert</code> are the
            double-bar equivalents for norms.
          </p>

          {/* ── Braces in text ── */}
          <h2>Curly Braces in Text and Math</h2>
          <p>
            Braces are LaTeX&apos;s grouping characters, so <code>{'{'}</code> and{' '}
            <code>{'}'}</code> never print by themselves. <code>{`\\{`}</code> and{' '}
            <code>{`\\}`}</code> print them in both text and math; <code>\lbrace</code> and{' '}
            <code>\rbrace</code> are the math-only synonyms. The other reserved characters are
            covered in the <Link href="/learn/special-characters">special characters guide</Link>.
          </p>
          <pre><code>{`Text braces \\{ \\}, a set $\\{1, 2, 3\\}$,
set-builder $\\{\\, x \\in \\mathbb{R} \\mid x > 0 \\,\\}$.`}</code></pre>
          <p>
            The thin spaces <code>\,</code> inside the set-builder braces are a typographic
            convention, not a requirement; they stop the braces from crowding the contents.
          </p>

          {/* ── left right ── */}
          <h2>Automatic Sizing with \left and \right</h2>
          <p>
            Brackets around a fraction, a sum with limits or a matrix should be as tall as the
            contents. Put <code>\left</code> before the opening delimiter and <code>\right</code>{' '}
            before the closing one, and TeX picks a size that covers whatever is between them:
          </p>
          <pre><code>{`\\[
  \\left( \\frac{a}{b} \\right) \\quad
  \\left[ \\frac{a}{b} \\right] \\quad
  \\left\\{ \\frac{a}{b} \\right\\} \\quad
  \\left\\langle \\frac{a}{b} \\right\\rangle \\quad
  \\left\\lvert \\frac{a}{b} \\right\\rvert \\quad
  \\left\\lVert \\frac{a}{b} \\right\\rVert \\quad
  \\left\\lfloor \\frac{a}{b} \\right\\rfloor \\quad
  \\left\\lceil \\frac{a}{b} \\right\\rceil
\\]`}</code></pre>
          <p>
            Three rules govern the pair. They must match one-to-one, every <code>\left</code>{' '}
            needs a <code>\right</code>, and both must sit in the same line and the same
            alignment cell. They do not have to be the same shape: <code>\left(</code> can be
            closed by <code>\right]</code> for a half-open interval.
          </p>

          <h3>One-sided brackets with \right. and \middle</h3>
          <p>
            A period after <code>\left</code> or <code>\right</code> is an invisible delimiter.
            That is how you size a single bar for evaluation at a point, and it is also how a
            pair is split across lines (see below). For a bar in the middle of a sized pair,
            such as the conditional bar in a probability or the bar in bra-ket notation, use{' '}
            <code>\middle</code>, which every current engine provides:
          </p>
          <pre><code>{`\\[
  \\left. \\frac{\\partial f}{\\partial x} \\right|_{x=0}
  \\qquad
  \\left( \\frac{a}{b} \\middle| c \\right)
  \\qquad
  \\left\\langle \\psi \\middle| \\phi \\right\\rangle
\\]`}</code></pre>

          <h3>When \left and \right pick the wrong size</h3>
          <p>
            Automatic sizing is not always best. <code>\left( \sum_{'{i=1}'}^{'{n}'} x_i \right)</code>{' '}
            in a display produces brackets that cover the limits above and below the sum, which
            is taller than most people want; <code>{`\\Bigl( \\sum_{i=1}^{n} x_i \\Bigr)`}</code>{' '}
            looks better. Around a plain <code>\tfrac</code> or a superscript, <code>\left</code>{' '}
            also adds a small extra space on each side because it turns the pair into an inner
            formula. For these cases, the manual sizes are the tool.
          </p>

          {/* ── big ── */}
          <h2>Manual Sizes: \big, \Big, \bigg, \Bigg</h2>
          <p>
            Four fixed sizes grow from 1.2 to 3 times the height of a normal bracket. Each has an
            opening form ending in <code>l</code>, a closing form ending in <code>r</code>, and a
            middle form ending in <code>m</code> for relations; the bare command (<code>\big(</code>)
            makes an ordinary symbol with no spacing information, so the l and r forms are the
            ones to use:
          </p>
          <pre><code>{`\\[ ( \\bigl( \\Bigl( \\biggl( \\Biggl( x \\Biggr) \\biggr) \\Bigr) \\bigr) ) \\]
\\[ \\bigl\\{ \\Bigl[ \\biggl\\langle \\Biggl\\lvert x \\Biggr\\rvert \\biggr\\rangle \\Bigr] \\bigr\\} \\]
\\[ \\bigl\\langle \\psi \\bigm| \\phi \\bigr\\rangle \\]`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Open / close / middle</th>
                <th>Height (10pt font)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>normal</td><td><code>( ) |</code></td><td>as the text</td></tr>
              <tr><td><code>\big</code></td><td><code>\bigl \bigr \bigm</code></td><td>12pt (1.2&times;)</td></tr>
              <tr><td><code>\Big</code></td><td><code>\Bigl \Bigr \Bigm</code></td><td>18pt (1.8&times;)</td></tr>
              <tr><td><code>\bigg</code></td><td><code>\biggl \biggr \biggm</code></td><td>24pt (2.4&times;)</td></tr>
              <tr><td><code>\Bigg</code></td><td><code>\Biggl \Biggr \Biggm</code></td><td>30pt (3&times;)</td></tr>
            </tbody>
          </table>
          <p>
            Manual sizes have two advantages over <code>\left</code> and <code>\right</code>:
            they do not need to be matched, so they can be split across lines freely, and they
            let you choose a size that is slightly smaller than the automatic one, which usually
            looks better. A common rule of thumb is <code>\bigl</code> for a fraction or
            superscript, <code>\Bigl</code> for a sum or integral, and <code>\biggl</code> or{' '}
            <code>\Biggl</code> for stacked fractions. Plain TeX&apos;s <code>\big</code> sizes
            are fixed; amsmath makes them scale with the current font size, which is one more
            reason to load it.
          </p>

          {/* ── Nested ── */}
          <h2>Nested Brackets</h2>
          <p>
            Mathematical convention nests square brackets outside parentheses and braces outside
            those, with each level a step larger. Manual sizes express the hierarchy exactly;{' '}
            <code>\left</code> and <code>\right</code> make the outer pair only as big as the
            inner one, so the levels blend together:
          </p>
          <pre><code>{`\\[
  \\Bigl[ \\bigl( a + b \\bigr) \\bigl( c + d \\bigr) \\Bigr]^2
  \\qquad
  \\left[ \\left( a + b \\right) \\left( c + d \\right) \\right]^2   % all the same size
\\]
\\[ f\\bigl(g(x)\\bigr) \\]`}</code></pre>

          {/* ── Fractions ── */}
          <h2>Brackets Around Fractions</h2>
          <pre><code>{`\\[
  \\left( \\frac{1}{2} \\right)   % automatic: full height
  \\quad \\bigl( \\tfrac{1}{2} \\bigr)   % small fraction, slightly enlarged bracket
  \\quad (\\tfrac{1}{2})              % small fraction, normal bracket
  \\quad \\left( \\frac{a}{b} \\right)^{\\!2}   % \\! pulls the exponent closer
\\]`}</code></pre>
          <p>
            Inline, <code>$(\frac{'{a}{b}'})$</code> is typeset in text style, where the
            fraction is only slightly taller than the line and normal brackets are usually fine.
            The <Link href="/learn/mathematical-expressions">mathematical expressions guide</Link>{' '}
            covers <code>\frac</code>, <code>\tfrac</code> and <code>\dfrac</code> in detail.
          </p>

          {/* ── Line breaks ── */}
          <h2>Brackets Across Line Breaks</h2>
          <p>
            A pair sized with <code>\left</code> and <code>\right</code> cannot span a{' '}
            <code>\\</code> in an <code>align</code> or <code>split</code>, nor an <code>&amp;</code>.
            Either close each line with the invisible <code>\right.</code> and reopen the next
            with <code>\left.</code>, or use manual sizes, which have no such restriction. The
            manual version is more reliable, because the two halves of a split{' '}
            <code>\left</code> pair are sized independently and can come out different heights:
          </p>
          <pre><code>{`\\begin{align}
  f(x) &= \\Bigl( a + b + c \\\\
       &\\qquad + d + e \\Bigr)
\\end{align}

\\begin{align}
  f(x) &= \\left( a + b + c \\right. \\\\
       &\\qquad \\left. + d + e \\right)
\\end{align}`}</code></pre>
          <p>
            The <Link href="/learn/multiline-equations">multi-line equations guide</Link> covers
            the <code>align</code> and <code>split</code> environments used here.
          </p>

          {/* ── Matrices ── */}
          <h2>Matrix Brackets</h2>
          <p>
            amsmath provides one matrix environment per bracket style. They all use{' '}
            <code>&amp;</code> between columns and <code>\\</code> between rows, and they size
            the brackets automatically:
          </p>
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Brackets</th>
                <th>Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>matrix</code></td><td>none</td><td>Building block inside other delimiters</td></tr>
              <tr><td><code>pmatrix</code></td><td>( )</td><td>Matrices and vectors</td></tr>
              <tr><td><code>bmatrix</code></td><td>[ ]</td><td>Matrices (common in engineering)</td></tr>
              <tr><td><code>Bmatrix</code></td><td>{'{ }'}</td><td>Sets of vectors, rarely</td></tr>
              <tr><td><code>vmatrix</code></td><td>| |</td><td>Determinants</td></tr>
              <tr><td><code>Vmatrix</code></td><td>&#x2016; &#x2016;</td><td>Matrix norms</td></tr>
              <tr><td><code>smallmatrix</code></td><td>none</td><td>Inline; <code>psmallmatrix</code>, <code>bsmallmatrix</code> etc. with mathtools</td></tr>
            </tbody>
          </table>
          <pre><code>{`\\usepackage{amsmath, mathtools}

\\[
  \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}
  \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}
  \\begin{Bmatrix} 1 & 2 \\\\ 3 & 4 \\end{Bmatrix}
  \\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}
  \\begin{Vmatrix} 1 & 2 \\\\ 3 & 4 \\end{Vmatrix}
\\]

% without amsmath, or for a vertical rule between columns
\\[
  \\left( \\begin{array}{cc} 1 & 2 \\\\ 3 & 4 \\end{array} \\right)
  \\qquad
  \\left[ \\begin{array}{cc|c} 1 & 2 & 5 \\\\ 3 & 4 & 6 \\end{array} \\right]
\\]

$M = \\begin{psmallmatrix} 1 & 2 \\\\ 3 & 4 \\end{psmallmatrix}$ inline.`}</code></pre>
          <p>
            The <code>array</code> fallback is also the way to get an augmented matrix, because
            its column specification accepts <code>|</code>. Column alignment, dots, block
            matrices and determinants are covered in the{' '}
            <Link href="/learn/matrices">matrices guide</Link>.
          </p>

          {/* ── cases ── */}
          <h2>Piecewise Functions: cases</h2>
          <p>
            <code>cases</code> is a left brace that grows to cover a set of alternatives, with{' '}
            <code>&amp;</code> separating the value from its condition:
          </p>
          <pre><code>{`\\[
  |x| = \\begin{cases}
    x  & \\text{if } x \\ge 0 \\\\
    -x & \\text{if } x < 0
  \\end{cases}
\\]`}</code></pre>
          <p>
            Entries are set in text style, so a fraction inside comes out small; mathtools&apos;{' '}
            <code>dcases</code> is the same environment in display style. <code>rcases</code>{' '}
            (also mathtools) puts the brace on the right.
          </p>

          {/* ── underbrace ── */}
          <h2>Horizontal Braces: \underbrace and \overbrace</h2>
          <pre><code>{`\\[
  \\underbrace{a + b + \\cdots + z}_{26 \\text{ terms}}
  \\qquad
  \\overbrace{x + y}^{\\text{sum}}
\\]`}</code></pre>
          <p>
            The label goes in a subscript for <code>\underbrace</code> and a superscript for{' '}
            <code>\overbrace</code>. mathtools adds <code>\underbracket</code> and{' '}
            <code>\overbracket</code> with square ends.
          </p>

          {/* ── mathtools ── */}
          <h2>Defining \abs and \norm with mathtools</h2>
          <p>
            Typing <code>\lvert x \rvert</code> for every absolute value is verbose, and
            switching between automatic and manual sizing means editing both ends. mathtools&apos;{' '}
            <code>\DeclarePairedDelimiter</code> defines a command that takes the contents as its
            argument and offers all three sizing modes:
          </p>
          <pre><code>{`\\usepackage{mathtools}
\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}
\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}
\\DeclarePairedDelimiter{\\floor}{\\lfloor}{\\rfloor}
\\DeclarePairedDelimiter{\\ceil}{\\lceil}{\\rceil}
\\DeclarePairedDelimiter{\\inner}{\\langle}{\\rangle}

\\[
  \\abs{x}                  % normal size
  \\quad \\abs*{\\frac{a}{b}}   % * = \\left \\right
  \\quad \\abs[\\Big]{\\frac{a}{b}}   % optional argument = manual size
  \\quad \\norm{v} \\quad \\floor{x} \\quad \\ceil*{\\frac{n}{2}} \\quad \\inner{u, v}
\\]`}</code></pre>
          <p>
            The physics package offers ready-made <code>\abs</code>, <code>\norm</code> and{' '}
            <code>\bra</code>/<code>\ket</code> commands, but it has well-documented spacing
            quirks; <code>\DeclarePairedDelimiter</code> is the standard recommendation, and the{' '}
            <code>braket</code> package is a lighter alternative for quantum notation.
          </p>

          {/* ── Unicode ── */}
          <h2>Pasting Unicode Brackets</h2>
          <p>
            Copying &#x27E8;, &#x27E9;, &lfloor; or &#x2016; from a web page into a pdfLaTeX
            document stops with <em>Unicode character ⟨ (U+27E8) not set up for use with
            LaTeX</em>. Replace them with the commands above. Under XeLaTeX or LuaLaTeX with the{' '}
            <code>unicode-math</code> package the characters are accepted in math mode and map
            to the same delimiters, so <code>\left⟨ x \right⟩</code> works; without
            unicode-math they are printed, if at all, as text glyphs with no delimiter behaviour.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
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
                <td><em>Missing \right. inserted</em>, or inside align <em>Extra {'}'}, or forgotten \right</em></td>
                <td>A <code>\left</code> with no <code>\right</code> before the end of the math, the line or the alignment cell</td>
                <td>Add <code>\right</code> with a delimiter or <code>\right.</code>; for multi-line brackets use <code>\bigl</code>/<code>\bigr</code></td>
              </tr>
              <tr>
                <td><em>Extra \right</em></td>
                <td>A <code>\right</code> with no open <code>\left</code>, often after a <code>\\</code> or <code>&amp;</code></td>
                <td>Open the line with <code>\left.</code> or switch to manual sizes</td>
              </tr>
              <tr>
                <td><em>Missing delimiter (. inserted)</em></td>
                <td>The token after <code>\left</code> or <code>\right</code> is not a delimiter, e.g. a bare brace in <code>\left{'{'}</code> or a command such as <code>\left\frac</code></td>
                <td>Use <code>\left\{'{'}</code>; only delimiters (brackets, bars, <code>\langle</code>, <code>.</code>) may follow <code>\left</code></td>
              </tr>
              <tr>
                <td>Brackets too tall around a sum</td>
                <td><code>\left</code> covers the limits above and below</td>
                <td><code>\Bigl( \sum ... \Bigr)</code></td>
              </tr>
              <tr>
                <td>Split pair has different heights on each line</td>
                <td><code>\right.</code> and <code>\left.</code> size each half separately</td>
                <td>Use the same manual size on both lines, or <code>\vphantom</code> to equalise</td>
              </tr>
              <tr>
                <td>Angle brackets look like &lt; &gt; with wide spaces</td>
                <td>Relation symbols used as delimiters</td>
                <td><code>\langle \rangle</code></td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em> on a <code>\langle</code></td>
                <td>Math delimiter used in text</td>
                <td>Wrap in <code>$...$</code> or use <code>\textlangle</code></td>
              </tr>
              <tr>
                <td><em>Environment pmatrix undefined</em></td>
                <td>amsmath not loaded</td>
                <td><code>{`\\usepackage{amsmath}`}</code></td>
              </tr>
              <tr>
                <td><em>Unicode character ⟨ (U+27E8) not set up for use with LaTeX</em></td>
                <td>Pasted Unicode bracket under pdfLaTeX</td>
                <td>Replace with <code>\langle</code>, or compile with XeLaTeX/LuaLaTeX and unicode-math</td>
              </tr>
              <tr>
                <td><em>Too many {'}'}&apos;s</em> near a set</td>
                <td>Literal braces typed as <code>{'{ }'}</code></td>
                <td><code>{`\\{ \\}`}</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath, amssymb, mathtools}
\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}
\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}

\\begin{document}

\\section{Sizing}
\\[
  \\left( \\frac{a}{b} \\right)
  \\quad \\Bigl( \\sum_{i=1}^{n} x_i \\Bigr)
  \\quad \\Bigl[ \\bigl( a + b \\bigr) \\bigl( c + d \\bigr) \\Bigr]^2
  \\quad \\left. \\frac{df}{dx} \\right|_{x=0}
\\]

\\section{Angle brackets, bars and norms}
\\[
  \\langle u, v \\rangle
  \\quad \\abs*{\\frac{a}{b}}
  \\quad \\norm{v}_2
  \\quad \\{\\, x \\in \\mathbb{R} \\mid \\abs{x} < 1 \\,\\}
  \\quad \\left\\langle \\psi \\middle| \\phi \\right\\rangle
\\]

\\section{Matrices and cases}
\\[
  A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}, \\qquad
  \\det A = \\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}, \\qquad
  \\operatorname{sgn}(x) = \\begin{cases}
    1  & x > 0 \\\\
    0  & x = 0 \\\\
    -1 & x < 0
  \\end{cases}
\\]

\\section{Across lines}
\\begin{align}
  F(x) &= \\Bigl( a_1 + a_2 + \\cdots + a_n \\\\
       &\\qquad + \\underbrace{b_1 + \\cdots + b_m}_{m \\text{ terms}} \\Bigr)
\\end{align}

\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Curly braces</td><td><code>{`\\{ ... \\}`}</code></td></tr>
              <tr><td>Angle brackets</td><td><code>\langle ... \rangle</code></td></tr>
              <tr><td>Absolute value</td><td><code>\lvert x \rvert</code> (amsmath)</td></tr>
              <tr><td>Norm</td><td><code>\lVert v \rVert</code></td></tr>
              <tr><td>Floor, ceiling</td><td><code>\lfloor x \rfloor</code>, <code>\lceil x \rceil</code></td></tr>
              <tr><td>Auto-sized pair</td><td><code>\left( ... \right)</code></td></tr>
              <tr><td>One-sided bar</td><td><code>\left. ... \right|_{'{x=0}'}</code></td></tr>
              <tr><td>Middle bar</td><td><code>\left( a \middle| b \right)</code></td></tr>
              <tr><td>Manual sizes</td><td><code>\bigl( \Bigl( \biggl( \Biggl(</code> with <code>\bigr)</code> etc.</td></tr>
              <tr><td>Pair across lines</td><td><code>\Bigl( ... \\ ... \Bigr)</code> or <code>\right.</code> / <code>\left.</code></td></tr>
              <tr><td>Matrix in ( ) [ ] {'{ }'} | | &#x2016; &#x2016;</td><td><code>pmatrix</code> <code>bmatrix</code> <code>Bmatrix</code> <code>vmatrix</code> <code>Vmatrix</code></td></tr>
              <tr><td>Augmented matrix</td><td><code>{`\\left[ \\begin{array}{cc|c} ... \\end{array} \\right]`}</code></td></tr>
              <tr><td>Piecewise</td><td><code>{`\\begin{cases} a & \\text{if } ... \\\\ b & \\text{otherwise} \\end{cases}`}</code></td></tr>
              <tr><td>Brace under / over</td><td><code>{`\\underbrace{...}_{label}`}</code>, <code>{`\\overbrace{...}^{label}`}</code></td></tr>
              <tr><td>Define \abs</td><td><code>{`\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}`}</code>, then <code>\abs{'{x}'}</code>, <code>\abs*{'{...}'}</code>, <code>\abs[\Big]{'{...}'}</code></td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write angle brackets in LaTeX?</h3>
          <p>
            Use <code>\langle</code> and <code>\rangle</code> in math mode:{' '}
            <code>$\langle x, y \rangle$</code>. Do not use <code>&lt;</code> and{' '}
            <code>&gt;</code>, which are the less-than and greater-than relations and get the
            wrong shape and spacing. In text mode use <code>\textlangle</code> and{' '}
            <code>\textrangle</code>.
          </p>
          <h3>How do I make brackets bigger in LaTeX?</h3>
          <p>
            Wrap the contents in <code>\left( ... \right)</code> and LaTeX sizes the brackets
            automatically to the height of what is between them. For manual control use{' '}
            <code>\bigl( \Bigl( \biggl( \Biggl(</code> with the matching <code>\bigr)</code> and
            so on; these four sizes grow from 1.2 to 3 times the normal height.
          </p>
          <h3>How do I put brackets around a matrix?</h3>
          <p>
            Use the amsmath matrix environments: <code>pmatrix</code> for parentheses,{' '}
            <code>bmatrix</code> for square brackets, <code>Bmatrix</code> for curly braces,{' '}
            <code>vmatrix</code> for single bars (a determinant) and <code>Vmatrix</code> for
            double bars. Plain <code>matrix</code> has no brackets. Without amsmath, wrap an{' '}
            <code>array</code> in <code>\left( ... \right)</code>.
          </p>
          <h3>Why do I get &ldquo;Missing \right. inserted&rdquo;?</h3>
          <p>
            Every <code>\left</code> must be matched by a <code>\right</code> in the same line
            and the same cell of an alignment. A <code>\left(</code> on one line of an{' '}
            <code>align</code> and the <code>\right)</code> on the next, or on the other side of
            an <code>&amp;</code>, triggers this error (inside <code>align</code> it is reported
            as &ldquo;Extra {'}'}, or forgotten \right&rdquo;). Close the first line with{' '}
            <code>\right.</code> and open the next with <code>\left.</code> (the dot is an
            invisible delimiter), or use the manual <code>\bigl</code> and <code>\bigr</code>{' '}
            sizes, which need no matching.
          </p>
          <h3>How do I write curly braces in LaTeX?</h3>
          <p>
            Braces are reserved for grouping, so escape them: <code>{`\\{`}</code> and{' '}
            <code>{`\\}`}</code> work in both text and math. In math you can also write{' '}
            <code>\lbrace</code> and <code>\rbrace</code>, and{' '}
            <code>{`\\left\\{ ... \\right\\}`}</code> for automatic sizing. <code>Bmatrix</code>{' '}
            gives a matrix in braces and <code>cases</code> gives a left brace for piecewise
            definitions.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Brackets under control? These guides cover what goes inside them:</p>
          <ul>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> &ndash; Alignment, dots, block matrices, determinants and inline matrices</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, roots, operators and the amsmath environments</li>
            <li><Link href="/learn/multiline-equations">Multi-line Equations</Link> &ndash; align, split, multline and gather, including brackets across lines</li>
            <li><Link href="/learn/special-characters">Special Characters in LaTeX</Link> &ndash; Braces, pipes, less-than and greater-than in text</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; Limits placement, which affects bracket sizing around sums</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/symbols/brackets" target="_blank" rel="noopener noreferrer">Brackets and Delimiters Reference</Link> &ndash; Every delimiter with its command, ready to copy</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compare \left \right and manual sizes with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX math" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix bracket errors faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor finds the unmatched \left behind a &ldquo;Missing \right.
              inserted&rdquo; error, picks the right size for nested brackets, and compiles your
              document in seconds.
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
