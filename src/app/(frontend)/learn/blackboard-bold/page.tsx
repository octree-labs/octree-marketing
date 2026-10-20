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

const breadcrumbs = getLearnBreadcrumbs('Blackboard Bold', 'blackboard-bold')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'blackboard-bold',
  title: 'Blackboard Bold in LaTeX: \\mathbb{R}, Number Sets, Lowercase and Digits',
  seoTitle: 'Blackboard Bold in LaTeX: \\mathbb{R}, ℕ ℤ ℚ ℝ ℂ',
  description:
    'Blackboard bold in LaTeX: \\mathbb{R} with amssymb, all 26 letters with Unicode code points, lowercase and 𝟙 via dsfont, bbm, bbold or unicode-math.',
  keywords:
    'blackboard bold latex, latex blackboard bold, blackboard bold in latex, mathbb, mathbb latex, latex real numbers symbol, latex natural numbers, latex integers symbol, latex rational numbers, latex complex numbers symbol, double struck latex, mathbb lowercase, mathbb 1, indicator function latex, mathds, bbm latex, bbold, unicode-math symbb, amssymb mathbb, mathbb allowed only in math mode',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-20'

const faq: FaqItem[] = [
  {
    question: 'How do you write blackboard bold in LaTeX?',
    answer:
      'Load amssymb (or just amsfonts) in the preamble and use \\mathbb{...} inside math mode: $\\mathbb{R}$ prints ℝ, $\\mathbb{N}$ prints ℕ, $\\mathbb{Z}$ prints ℤ. It works for the 26 uppercase letters only. Outside math mode LaTeX stops with "\\mathbb allowed only in math mode", and without the package it reports "Undefined control sequence".',
  },
  {
    question: 'Why does \\mathbb{1} not work?',
    answer:
      'The AMS blackboard bold font has only uppercase letters, and \\mathbb{1} picks the symbol that sits in the digit-one slot of that font, which is the \\nVdash relation ⊮. For a double-struck 1, load dsfont and write \\mathds{1}, load bbm and write \\mathbbm{1}, or load bbold, whose \\mathbb{1} is a real digit. With XeLaTeX or LuaLaTeX and unicode-math, \\symbb{1} or the typed character 𝟙 works too.',
  },
  {
    question: 'Is there a lowercase blackboard bold in LaTeX?',
    answer:
      'Not in amssymb: \\mathbb{r} prints the \\smallsetminus symbol, and the only lowercase letter it provides is \\Bbbk for 𝕜. For lowercase, use \\mathbbm{r} from the bbm package or load bbold, which replaces \\mathbb with a full upper and lowercase alphabet in a lighter design. On XeLaTeX or LuaLaTeX, unicode-math gives \\symbb{r} with Latin Modern Math or STIX Two Math, both of which include the lowercase glyphs.',
  },
  {
    question: 'Should I use \\mathbb{R} or \\mathbf{R} for the real numbers?',
    answer:
      'Both are correct and both are in use. Blackboard bold started as the chalkboard way of writing bold, and many authors and journals now treat ℝ as the standard notation for number sets, while some printed styles still prefer bold R. Pick one and be consistent, and keep \\mathbf and \\boldsymbol for vectors and matrices, where bold has a different meaning.',
  },
]

export default async function BlackboardBoldPage() {
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
          <h1>Blackboard Bold in LaTeX: \mathbb&#123;R&#125;, Number Sets, Lowercase and Digits</h1>
          <p className="lead">
            <strong>Blackboard bold</strong> (also called double-struck) is the lettering with a
            doubled vertical stroke: ℕ, ℤ, ℚ, ℝ, ℂ. In LaTeX you get it with{' '}
            <code>\mathbb&#123;R&#125;</code> after loading <code>amssymb</code>, in math mode only,
            and for uppercase letters only. This page covers the command, a copy-paste table of all
            26 letters with their Unicode code points, the packages that add lowercase letters and
            digits, the Unicode-engine route, and the errors people hit.
          </p>
          <p>
            Every example here was compiled on TeX Live 2025. If you only need the real numbers
            symbol and its meaning, the shorter post on the{' '}
            <Link href="/blog/real-numbers-symbol-blackboard-bold">real numbers symbol ℝ</Link>{' '}
            covers that one letter; this guide is the general how-to.
          </p>

          {/* ───────────────────────────── What it is ───────────────────────────── */}
          <h2>What Blackboard Bold Is Used For</h2>
          <p>
            Blackboard bold marks a letter as a fixed, named object rather than a variable. The
            classic uses:
          </p>
          <ul>
            <li>
              <strong>Number systems:</strong> ℕ natural numbers, ℤ integers, ℚ rationals, ℝ
              reals, ℂ complex numbers, ℍ quaternions.
            </li>
            <li>
              <strong>Probability:</strong> 𝔼 for expectation, ℙ for a probability measure, and the
              indicator function 𝟙<sub>A</sub>.
            </li>
            <li>
              <strong>Algebra and geometry:</strong> 𝔽<sub>q</sub> for a finite field, 𝕂 for an
              arbitrary field, ℙ<sup>n</sup> for projective space, 𝔸<sup>n</sup> for affine space,
              𝕊<sup>n</sup> for the sphere, 𝕋 for the torus, 𝔻 for the unit disc.
            </li>
          </ul>
          <p>
            The name is literal. Bold type is hard to write with chalk, so lecturers doubled one
            stroke of the letter instead, and the chalkboard form made its way back into print.
            Printed books traditionally used bold (<strong>R</strong>) for the same sets; see the{' '}
            <a href="#bold-vs-blackboard-bold">comparison below</a> before you decide which to use.
          </p>

          {/* ───────────────────────────── The command ───────────────────────────── */}
          <h2>The Command: \mathbb with amssymb</h2>
          <p>
            <code>\mathbb</code> is defined by the <code>amsfonts</code> package.{' '}
            <code>amssymb</code> loads <code>amsfonts</code> and adds the AMS symbol commands, so
            most documents load <code>amssymb</code> and get both. Either package is enough for{' '}
            <code>\mathbb</code>; both compiled identically in our tests. The command only works
            in math mode, so wrap it in <code>$...$</code>, <code>\( ... \)</code> or a display
            environment.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}   % loads amsfonts, which defines \\mathbb

\\begin{document}

The number sets: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}
\\subset \\mathbb{R} \\subset \\mathbb{C}$.

A function $f\\colon \\mathbb{R}^n \\to \\mathbb{R}$, the finite field
$\\mathbb{F}_q$, projective space $\\mathbb{P}^n(\\mathbb{C})$ and a
Hilbert space $\\mathbb{H}$.

\\[
  \\forall \\varepsilon > 0\\; \\exists N \\in \\mathbb{N} :
  n > N \\implies |x_n - x| < \\varepsilon .
\\]

\\end{document}`}</code></pre>
          <p>
            Note the braces: <code>\mathbb&#123;R&#125;^n</code> puts the exponent outside the
            blackboard bold letter. <code>\mathbb&#123;R^n&#125;</code> compiles, but the{' '}
            <code>n</code> is then looked up in the blackboard bold font, where that slot holds the{' '}
            <code>\ltimes</code> symbol ⋉; see <a href="#common-mistakes">common mistakes</a>.
          </p>

          <h3>Two errors and what they mean</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Error in the log</th>
                <th scope="col">Cause</th>
                <th scope="col">Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>LaTeX Error: \mathbb allowed only in math mode.</code></td>
                <td>You wrote <code>\mathbb&#123;R&#125;</code> in running text.</td>
                <td>Wrap it: <code>$\mathbb&#123;R&#125;$</code>.</td>
              </tr>
              <tr>
                <td><code>Undefined control sequence.</code> pointing at <code>\mathbb</code></td>
                <td>Neither <code>amssymb</code> nor <code>amsfonts</code> is loaded.</td>
                <td>Add <code>\usepackage&#123;amssymb&#125;</code> to the preamble.</td>
              </tr>
            </tbody>
          </table>

          <h3>Shortcuts: \R, \N, \Z are not predefined</h3>
          <p>
            Typing <code>\mathbb&#123;R&#125;</code> fifty times is tedious, and many papers define
            one-letter macros. None of them exist until you define them: <code>\R</code> on its own
            is an undefined control sequence. Put these in the preamble:
          </p>
          <pre><code>{`\\usepackage{amssymb}

\\newcommand{\\N}{\\mathbb{N}}
\\newcommand{\\Z}{\\mathbb{Z}}
\\newcommand{\\Q}{\\mathbb{Q}}
\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\C}{\\mathbb{C}}
\\newcommand{\\E}{\\mathbb{E}}
\\newcommand{\\Prob}{\\mathbb{P}}   % \\P is already taken

% then in the text:
$f\\colon \\R^n \\to \\R$, \\quad $\\E[X] = \\sum_{k \\in \\N} k\\,\\Prob(X = k)$`}</code></pre>
          <p>
            A few single letters are already LaTeX commands and <code>\newcommand</code> will refuse
            them with &quot;Command ... already defined&quot;: <code>\P</code> is the pilcrow ¶,{' '}
            <code>\S</code> the section sign §, <code>\L</code> and <code>\O</code> are Ł and Ø, and{' '}
            <code>\H</code> is the double-acute accent. Use <code>\Prob</code>, <code>\Sph</code>,{' '}
            <code>\Hil</code> or similar for those, or <code>\renewcommand</code> if you are sure you
            never need the original. <code>\N</code>, <code>\Z</code>, <code>\Q</code>,{' '}
            <code>\R</code>, <code>\C</code>, <code>\E</code> and <code>\F</code> are free in a plain{' '}
            <code>article</code>, though a class or package you load later might define them.
          </p>

          {/* ───────────────────────────── Table ───────────────────────────── */}
          <h2>Every Blackboard Bold Letter with Its Unicode Code Point</h2>
          <p>
            All 26 uppercase letters work with <code>\mathbb</code>. The Unicode characters are
            useful for copy-pasting into plain text, Markdown, or a Unicode-engine LaTeX document
            (see <a href="#unicode-engines">below</a>). Seven letters, ℂ ℍ ℕ ℙ ℚ ℝ ℤ, were encoded
            early in the Letterlike Symbols block (U+2100 to U+214F); the other nineteen live in
            Mathematical Alphanumeric Symbols at U+1D538 to U+1D550, which skips the seven slots
            already taken.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">LaTeX</th>
                <th scope="col">Symbol</th>
                <th scope="col">Unicode</th>
                <th scope="col">Common meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\mathbb&#123;A&#125;</code></td><td>𝔸</td><td>U+1D538</td><td>Affine space, adeles</td></tr>
              <tr><td><code>\mathbb&#123;B&#125;</code></td><td>𝔹</td><td>U+1D539</td><td>Boolean domain, closed ball</td></tr>
              <tr><td><code>\mathbb&#123;C&#125;</code></td><td>ℂ</td><td>U+2102</td><td>Complex numbers</td></tr>
              <tr><td><code>\mathbb&#123;D&#125;</code></td><td>𝔻</td><td>U+1D53B</td><td>Unit disc</td></tr>
              <tr><td><code>\mathbb&#123;E&#125;</code></td><td>𝔼</td><td>U+1D53C</td><td>Expectation</td></tr>
              <tr><td><code>\mathbb&#123;F&#125;</code></td><td>𝔽</td><td>U+1D53D</td><td>Field, finite field 𝔽<sub>q</sub></td></tr>
              <tr><td><code>\mathbb&#123;G&#125;</code></td><td>𝔾</td><td>U+1D53E</td><td>Algebraic group</td></tr>
              <tr><td><code>\mathbb&#123;H&#125;</code></td><td>ℍ</td><td>U+210D</td><td>Quaternions, upper half-plane</td></tr>
              <tr><td><code>\mathbb&#123;I&#125;</code></td><td>𝕀</td><td>U+1D540</td><td>Unit interval, identity</td></tr>
              <tr><td><code>\mathbb&#123;J&#125;</code></td><td>𝕁</td><td>U+1D541</td><td></td></tr>
              <tr><td><code>\mathbb&#123;K&#125;</code></td><td>𝕂</td><td>U+1D542</td><td>Arbitrary field</td></tr>
              <tr><td><code>\mathbb&#123;L&#125;</code></td><td>𝕃</td><td>U+1D543</td><td></td></tr>
              <tr><td><code>\mathbb&#123;M&#125;</code></td><td>𝕄</td><td>U+1D544</td><td></td></tr>
              <tr><td><code>\mathbb&#123;N&#125;</code></td><td>ℕ</td><td>U+2115</td><td>Natural numbers</td></tr>
              <tr><td><code>\mathbb&#123;O&#125;</code></td><td>𝕆</td><td>U+1D546</td><td>Octonions</td></tr>
              <tr><td><code>\mathbb&#123;P&#125;</code></td><td>ℙ</td><td>U+2119</td><td>Probability, projective space, primes</td></tr>
              <tr><td><code>\mathbb&#123;Q&#125;</code></td><td>ℚ</td><td>U+211A</td><td>Rational numbers</td></tr>
              <tr><td><code>\mathbb&#123;R&#125;</code></td><td>ℝ</td><td>U+211D</td><td>Real numbers</td></tr>
              <tr><td><code>\mathbb&#123;S&#125;</code></td><td>𝕊</td><td>U+1D54A</td><td>Sphere 𝕊<sup>n</sup></td></tr>
              <tr><td><code>\mathbb&#123;T&#125;</code></td><td>𝕋</td><td>U+1D54B</td><td>Torus, unit circle</td></tr>
              <tr><td><code>\mathbb&#123;U&#125;</code></td><td>𝕌</td><td>U+1D54C</td><td></td></tr>
              <tr><td><code>\mathbb&#123;V&#125;</code></td><td>𝕍</td><td>U+1D54D</td><td>Vector space, variety</td></tr>
              <tr><td><code>\mathbb&#123;W&#125;</code></td><td>𝕎</td><td>U+1D54E</td><td>Whole numbers (some texts)</td></tr>
              <tr><td><code>\mathbb&#123;X&#125;</code></td><td>𝕏</td><td>U+1D54F</td><td></td></tr>
              <tr><td><code>\mathbb&#123;Y&#125;</code></td><td>𝕐</td><td>U+1D550</td><td></td></tr>
              <tr><td><code>\mathbb&#123;Z&#125;</code></td><td>ℤ</td><td>U+2124</td><td>Integers</td></tr>
            </tbody>
          </table>
          <p>
            Lowercase letters run from 𝕒 (U+1D552) to 𝕫 (U+1D56B) in alphabetical order, so 𝕜 is
            U+1D55C and 𝕣 is U+1D563. The digits 𝟘 to 𝟡 are U+1D7D8 to U+1D7E1, so the indicator
            one 𝟙 is U+1D7D9. None of these lowercase or digit characters come from{' '}
            <code>\mathbb</code> with amssymb; the next section shows how to get them.
          </p>

          {/* ───────────────────────────── Lowercase and digits ───────────────────────────── */}
          <h2 id="lowercase-and-digits">Lowercase Letters and Digits: dsfont, bbm and bbold</h2>
          <p>
            The AMS font behind <code>\mathbb</code> holds only A to Z. The one lowercase letter
            amssymb offers is <code>\Bbbk</code> for 𝕜. For a double-struck 1 or a lowercase letter
            you need another package. We compiled all three; here is what each actually provides.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Command</th>
                <th scope="col">Uppercase</th>
                <th scope="col">Lowercase</th>
                <th scope="col">Digits</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>amssymb</code></td>
                <td><code>\mathbb</code></td>
                <td>Yes</td>
                <td>Only <code>\Bbbk</code></td>
                <td>No</td>
                <td>The standard. Type 1 fonts.</td>
              </tr>
              <tr>
                <td><code>dsfont</code></td>
                <td><code>\mathds</code></td>
                <td>Yes</td>
                <td>No</td>
                <td>Only 1</td>
                <td>Made for 𝟙. Type 1 fonts; <code>[sans]</code> option for a sans-serif design.</td>
              </tr>
              <tr>
                <td><code>bbm</code></td>
                <td><code>\mathbbm</code></td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Only 1 and 2</td>
                <td>Bitmap (Type 3) fonts on TeX Live 2025, so it looks rough when zoomed.</td>
              </tr>
              <tr>
                <td><code>bbold</code></td>
                <td><code>\mathbb</code></td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes, 0 to 9</td>
                <td>Lighter, sans-serif design. Replaces <code>\mathbb</code> for the whole document.</td>
              </tr>
            </tbody>
          </table>

          <h3>dsfont: the usual choice for 𝟙</h3>
          <pre><code>{`\\usepackage{amssymb}
\\usepackage{dsfont}           % or \\usepackage[sans]{dsfont}

$\\mathds{1}_A(x)$, \\quad $\\mathds{R}$, $\\mathds{N}$, \\quad compare $\\mathbb{R}$`}</code></pre>
          <p>
            <code>\mathds&#123;1&#125;</code> is the standard way to typeset an indicator function.
            The dsfont letters are a slightly different design from the AMS ones, so most authors
            keep <code>\mathbb</code> for sets and use <code>\mathds</code> only for the 1. In our
            compile, <code>\mathds&#123;r&#125;</code>, <code>\mathds&#123;0&#125;</code> and{' '}
            <code>\mathds&#123;2&#125;</code> each printed nothing and left a &quot;Missing
            character&quot; warning in the log: the font has no such glyphs.
          </p>

          <h3>bbm: upper and lowercase</h3>
          <pre><code>{`\\usepackage{bbm}

$\\mathbbm{1}_A$, \\quad $\\mathbbm{r}$, $\\mathbbm{abc}$, \\quad $\\mathbbm{R}$,
\\quad sans $\\mathbbmss{1}$, \\quad typewriter $\\mathbbmtt{1}$`}</code></pre>
          <p>
            <code>bbm</code> gives both cases and three designs (serif, sans, typewriter). Two
            caveats from our test: only the digits 1 and 2 exist (0 and 3 to 9 printed nothing and
            warned), and TeX Live ships bbm as Metafont bitmaps, so pdfLaTeX embedded it as a Type 3
            font. That is fine on paper but blurry on screen and a problem for some publishers&apos;
            PDF checks.
          </p>

          <h3>bbold: full alphabet and digits, but it takes over \mathbb</h3>
          <pre><code>{`\\usepackage{amssymb}
\\usepackage{bbold}   % \\mathbb is now bbold's, in either load order

$\\mathbb{R}$, $\\mathbb{r}$, $\\mathbb{1}$, $\\mathbb{abcdefghijklmnopqrstuvwxyz}$,
$\\mathbb{0123456789}$`}</code></pre>
          <p>
            <code>bbold</code> is the only one of the three with every letter in both cases and all
            ten digits, as Type 1 fonts. The price is the design, which is a geometric sans-serif,
            much lighter than the AMS letters, and the fact that it replaces <code>\mathbb</code>.
            Load order does not rescue the AMS letters: <code>amsfonts</code> only defines{' '}
            <code>\mathbb</code> when nothing else has, so with <code>bbold</code> loaded anywhere
            in the preamble every <code>\mathbb</code> in the document uses the bbold font. If you
            want both designs, give the AMS alphabet a second name before loading bbold, or use the
            bbold font under its own name without the package:
          </p>
          <pre><code>{`% Option 1: keep the AMS letters as \\mathbbams, use bbold's \\mathbb
\\usepackage{amssymb}
\\DeclareSymbolFontAlphabet{\\mathbbams}{AMSb}
\\usepackage{bbold}
$\\mathbbams{R}$ \\quad $\\mathbb{r}\\mathbb{1}$

% Option 2: keep \\mathbb as the AMS letters, add bbold as \\mathbbold
\\usepackage{amssymb}
\\DeclareMathAlphabet{\\mathbbold}{U}{bbold}{m}{n}
$\\mathbb{R}$ \\quad $\\mathbbold{r}\\mathbbold{1}$`}</code></pre>
          <p>Both options compiled, with both fonts embedded side by side.</p>

          {/* ───────────────────────────── Unicode engines ───────────────────────────── */}
          <h2 id="unicode-engines">XeLaTeX and LuaLaTeX: unicode-math and \symbb</h2>
          <p>
            With XeLaTeX or LuaLaTeX, <code>unicode-math</code> replaces the whole math font setup
            with one OpenType math font, and blackboard bold becomes an ordinary part of that font:
            upper, lower and digits, all in one design.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{unicode-math}   % XeLaTeX or LuaLaTeX; default font is Latin Modern Math
% \\setmathfont{STIXTwoMath-Regular.otf}   % or another OpenType math font

\\begin{document}
Command: $\\symbb{R}$, $\\symbb{N}$, $\\symbb{Z}$, $\\symbb{Q}$, $\\symbb{C}$

Typed directly: $ℝ$, $ℕ$, $𝔼$, $𝟙$, $𝕜$

Lowercase and digits: $\\symbb{r}$, $\\symbb{1}$, $\\symbb{0123456789}$
\\end{document}`}</code></pre>
          <p>
            Three things we checked while compiling this on both engines:
          </p>
          <ul>
            <li>
              <code>\symbb&#123;r&#125;</code> and <code>\symbb&#123;1&#125;</code> work with the
              default Latin Modern Math. We queried the font directly and it has glyphs for the full
              double-struck range: capitals, 𝕒 to 𝕫 and 𝟘 to 𝟡.
            </li>
            <li>
              Typing ℝ, 𝟙 or 𝕜 straight into the source is equivalent to the command, which is
              where the Unicode table above comes in handy.
            </li>
            <li>
              <code>\setmathfont&#123;STIXTwoMath-Regular.otf&#125;</code> (the file name) worked on
              both engines. The family name, <code>\setmathfont&#123;STIX Two Math&#125;</code>,
              worked on LuaLaTeX but not on XeLaTeX on our server, because XeLaTeX finds fonts by
              name through the operating system and TeX Live&apos;s fonts were not registered there.
              If you get a &quot;font not found&quot; error, switch to the file name.
            </li>
          </ul>

          {/* ───────────────────────────── Bold vs blackboard bold ───────────────────────────── */}
          <h2 id="bold-vs-blackboard-bold">Blackboard Bold vs \mathbf vs \boldsymbol</h2>
          <pre><code>{`\\usepackage{amsmath,amssymb}
\\usepackage{bm}

Vectors and matrices in bold: $\\mathbf{v} \\in \\mathbb{R}^3$, $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$.
Bold Greek and bold italic: $\\boldsymbol{\\alpha}$, $\\boldsymbol{v}$, $\\bm{\\mu}$.
Sets, two conventions: $\\mathbb{R}$, $\\mathbb{Z}$ \\quad or \\quad $\\mathbf{R}$, $\\mathbf{Z}$.`}</code></pre>
          <ul>
            <li>
              <code>\mathbf&#123;v&#125;</code> is upright bold Roman. It is the usual notation for
              vectors and matrices, and it does nothing useful to Greek letters or to symbols.
            </li>
            <li>
              <code>\boldsymbol</code> (from amsmath) and <code>\bm</code> (from the bm package)
              produce bold italic and bold symbols, so <code>\boldsymbol&#123;\alpha&#125;</code> is
              the bold vector 𝛂.
            </li>
            <li>
              <code>\mathbb</code> is a different alphabet, not a weight. It marks a specific named
              set or operator, and putting a variable in it is a mistake.
            </li>
          </ul>
          <p>
            Historically, print used bold for number sets and the blackboard form was a lecture-hall
            substitute. Today both are common; some journals and textbooks still ask for{' '}
            <code>\mathbf&#123;R&#125;</code>, many others expect <code>\mathbb&#123;R&#125;</code>.
            Whatever you choose, do not mix them, and never use bold for both vectors and sets in
            the same paper. A <code>\newcommand&#123;\R&#125;&#123;...&#125;</code> in the preamble
            makes the switch a one-line change if a journal asks for the other style.
          </p>

          {/* ───────────────────────────── Full example ───────────────────────────── */}
          <h2>Complete Example</h2>
          <p>
            A preamble that covers the usual needs: amssymb for the sets, dsfont for the indicator,
            and shortcuts, compiled with pdfLaTeX on TeX Live 2025.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}   % \\mathbb{...}: uppercase blackboard bold
\\usepackage{dsfont}    % \\mathds{1}: double-struck indicator 1

% Shortcuts: none of these exist until you define them
\\newcommand{\\N}{\\mathbb{N}}
\\newcommand{\\Z}{\\mathbb{Z}}
\\newcommand{\\Q}{\\mathbb{Q}}
\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\C}{\\mathbb{C}}
\\newcommand{\\E}{\\mathbb{E}}
\\newcommand{\\Prob}{\\mathbb{P}}
\\newcommand{\\ind}{\\mathds{1}}

\\begin{document}

Let $f\\colon \\R^n \\to \\R$ be continuous and let $A \\subseteq \\R^n$ be measurable.
The indicator function of $A$ is
\\[
  \\ind_A(x) =
  \\begin{cases}
    1 & \\text{if } x \\in A, \\\\
    0 & \\text{if } x \\notin A,
  \\end{cases}
  \\qquad \\text{so that} \\qquad
  \\Prob(X \\in A) = \\E\\bigl[\\ind_A(X)\\bigr].
\\]

The chain of number systems is $\\N \\subset \\Z \\subset \\Q \\subset \\R \\subset \\C$,
and for a prime power $q$ the finite field $\\mathbb{F}_q$ has $q$ elements.

\\end{document}`}</code></pre>

          {/* ───────────────────────────── Common mistakes ───────────────────────────── */}
          <h2 id="common-mistakes">Common Mistakes</h2>
          <p>
            These all come from the same fact: the amssymb blackboard bold font has glyphs only in
            the A to Z slots, and every other slot holds an unrelated AMS symbol. LaTeX does not
            warn you; it simply prints whatever sits in that slot. Each of these compiled without a
            single error in our test, which is exactly why they are easy to miss.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">You wrote</th>
                <th scope="col">You get</th>
                <th scope="col">Write instead</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>$\mathbb&#123;1&#125;$</code></td>
                <td>⊮ (the <code>\nVdash</code> relation, which lives in the &quot;1&quot; slot)</td>
                <td><code>\mathds&#123;1&#125;</code> with dsfont, or <code>\mathbbm&#123;1&#125;</code> with bbm</td>
              </tr>
              <tr>
                <td><code>$\mathbb&#123;r&#125;$</code></td>
                <td>∖ (<code>\smallsetminus</code>)</td>
                <td><code>\mathbbm&#123;r&#125;</code> with bbm, or bbold</td>
              </tr>
              <tr>
                <td><code>$\mathbb&#123;k&#125;$</code></td>
                <td>ℸ (<code>\daleth</code>)</td>
                <td><code>\Bbbk</code> from amssymb</td>
              </tr>
              <tr>
                <td><code>$\mathbb&#123;R^n&#125;$</code></td>
                <td>ℝ with ⋉ (<code>\ltimes</code>) as the exponent</td>
                <td><code>\mathbb&#123;R&#125;^n</code></td>
              </tr>
              <tr>
                <td><code>\mathbb&#123;R&#125;</code> in text</td>
                <td>Error: <code>\mathbb allowed only in math mode</code></td>
                <td><code>$\mathbb&#123;R&#125;$</code></td>
              </tr>
              <tr>
                <td><code>\mathbb&#123;R&#125;</code> without a package</td>
                <td>Error: <code>Undefined control sequence</code></td>
                <td><code>\usepackage&#123;amssymb&#125;</code></td>
              </tr>
              <tr>
                <td><code>$\mathbb&#123;RR&#125;$</code></td>
                <td>ℝℝ, two letters</td>
                <td>One letter per symbol: <code>\mathbb&#123;R&#125;</code>; the braces take a whole string, not a code</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do you write blackboard bold in LaTeX?</h3>
          <p>
            Load <code>amssymb</code> (or just <code>amsfonts</code>) in the preamble and use{' '}
            <code>\mathbb&#123;...&#125;</code> inside math mode: <code>$\mathbb&#123;R&#125;$</code>{' '}
            prints ℝ, <code>$\mathbb&#123;N&#125;$</code> prints ℕ, <code>$\mathbb&#123;Z&#125;$</code>{' '}
            prints ℤ. It works for the 26 uppercase letters only. Outside math mode LaTeX stops with
            &quot;\mathbb allowed only in math mode&quot;, and without the package it reports
            &quot;Undefined control sequence&quot;.
          </p>
          <h3>Why does \mathbb&#123;1&#125; not work?</h3>
          <p>
            The AMS blackboard bold font has only uppercase letters, and{' '}
            <code>\mathbb&#123;1&#125;</code> picks the symbol that sits in the digit-one slot of that
            font, which is the <code>\nVdash</code> relation ⊮. For a double-struck 1, load dsfont and
            write <code>\mathds&#123;1&#125;</code>, load bbm and write{' '}
            <code>\mathbbm&#123;1&#125;</code>, or load bbold, whose <code>\mathbb&#123;1&#125;</code>{' '}
            is a real digit. With XeLaTeX or LuaLaTeX and unicode-math,{' '}
            <code>\symbb&#123;1&#125;</code> or the typed character 𝟙 works too.
          </p>
          <h3>Is there a lowercase blackboard bold in LaTeX?</h3>
          <p>
            Not in amssymb: <code>\mathbb&#123;r&#125;</code> prints the <code>\smallsetminus</code>{' '}
            symbol, and the only lowercase letter it provides is <code>\Bbbk</code> for 𝕜. For
            lowercase, use <code>\mathbbm&#123;r&#125;</code> from the bbm package or load bbold,
            which replaces <code>\mathbb</code> with a full upper and lowercase alphabet in a lighter
            design. On XeLaTeX or LuaLaTeX, unicode-math gives <code>\symbb&#123;r&#125;</code> with
            Latin Modern Math or STIX Two Math, both of which include the lowercase glyphs.
          </p>
          <h3>Should I use \mathbb&#123;R&#125; or \mathbf&#123;R&#125; for the real numbers?</h3>
          <p>
            Both are correct and both are in use. Blackboard bold started as the chalkboard way of
            writing bold, and many authors and journals now treat ℝ as the standard notation for
            number sets, while some printed styles still prefer bold R. Pick one and be consistent,
            and keep <code>\mathbf</code> and <code>\boldsymbol</code> for vectors and matrices,
            where bold has a different meaning.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>Blackboard bold rarely appears alone; these guides cover what sits around it:</p>
          <ul>
            <li><Link href="/blog/real-numbers-symbol-blackboard-bold">The Real Numbers Symbol ℝ</Link> – What ℝ means, where it came from and how to type it everywhere, not just in LaTeX</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> – The set-theory operators (∈, ⊂, ∀, ∃) that go with number sets</li>
            <li><Link href="/learn/brackets">Brackets in LaTeX</Link> – Set-builder notation such as &#123; x ∈ ℝ | x &gt; 0 &#125; with properly sized braces</li>
            <li><Link href="/learn/matrices">Matrices in LaTeX</Link> – Writing A ∈ ℝ<sup>m×n</sup> and the matrix environments</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics and Underline</Link> – The text and math bold commands in one place</li>
            <li><Link href="/learn/math-functions">Math Functions</Link> – Function notation f: ℝ → ℝ, operators and norms</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste any example above and see the PDF without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Blackboard bold, Greek letters, arrows and relations with copy-paste commands</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">LaTeX Templates</Link> – Article and thesis templates with amsmath and amssymb already loaded</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Symbol" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write math with the right symbols the first time</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with TeX Live, XeLaTeX and LuaLaTeX already set
              up: paste any example above, ask for the indicator function or a number-set shortcut,
              and see the compiled PDF as you type.
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
