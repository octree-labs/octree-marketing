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

const breadcrumbs = getLearnBreadcrumbs('Approximately Equal Symbol', 'approximately-equal')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'approximately-equal',
  title: 'Approximately Equal Symbol (≈): Meaning, How to Type It, and LaTeX',
  seoTitle: 'Approximately Equal Symbol (≈): Meaning, How to Type, LaTeX',
  description:
    'What the approximately equal symbol ≈ means, how to type it on Windows, Mac, iPhone and in HTML, ≈ vs ~ vs ≃ vs ≅, and \\approx in LaTeX with negated forms.',
  keywords:
    'approximate symbol, approximately equal symbol, approximately symbol, approx symbol, almost equal to symbol, approximately equal sign, approximate sign, latex approximately equal, latex approx, ≈ symbol, how to type approximately equal symbol, approximately equal alt code, approx symbol mac, approximately equal html, asymp, u+2248, approx vs tilde, \\approx, \\sim, \\simeq, \\cong, not approximately equal, \\not\\approx, \\thickapprox, \\approxeq, \\lesssim',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-21'

const faq: FaqItem[] = [
  {
    question: 'What does the ≈ symbol mean?',
    answer:
      '≈ means "approximately equal to" or "almost equal to". It says the two sides are close enough for the purpose at hand but not exactly the same, usually because one side has been rounded or estimated: π ≈ 3.14, √2 ≈ 1.414. Its Unicode name is ALMOST EQUAL TO (U+2248).',
  },
  {
    question: 'How do I type the approximately equal symbol?',
    answer:
      'On Windows hold Alt and type 247 on the numeric keypad, or type 2248 followed by Alt+X in Word. On a Mac press Option+X. On iPhone and Android open the number keyboard and long-press the = key. In HTML write &asymp; or &#8776;. In LaTeX write \\approx inside math mode. Or copy it from here: ≈',
  },
  {
    question: 'How do I write approximately equal in LaTeX?',
    answer:
      'Use \\approx in math mode: $\\pi \\approx 3.1416$. It needs no package. The related commands are \\sim (~), \\simeq (≃), \\cong (≅) and \\doteq (≐); amssymb adds \\thickapprox, \\approxeq, \\lesssim and \\gtrsim. For "not approximately equal" write \\not\\approx; there is no \\napprox command. Outside math mode \\approx stops with "Missing $ inserted", so wrap it as $\\approx$.',
  },
  {
    question: 'What is the difference between ≈ and ~?',
    answer:
      'The tilde ~ (U+007E on the keyboard, ∼ U+223C as the math operator) is a looser relation: "of the same order of magnitude", "asymptotic to" or, in statistics, "distributed as", and in everyday writing it marks a rough estimate (~10 minutes). The double tilde ≈ states a numeric approximation that is close in value, such as a rounded number. Use ≈ when the digits matter and ~ when only the scale does.',
  },
  {
    question: 'What is the difference between ≈ and ≅?',
    answer:
      'They look alike and Unicode even names ≅ (U+2245) APPROXIMATELY EQUAL TO, but in practice ≅ means congruent (identical in shape and size in geometry) or isomorphic (in algebra), and ≈ means almost equal in value. For a rounded number use ≈, never ≅.',
  },
  {
    question: 'What is the Alt code for approximately equal?',
    answer:
      'Alt+247. Hold the Alt key, type 2 4 7 on the numeric keypad with Num Lock on, and release Alt. It works on a US or Western European Windows layout because 247 is the position of ≈ in the old DOS code page 437. On a laptop without a keypad, use Win+. (the emoji panel) and open the Symbols tab, or type 2248 then Alt+X in Word.',
  },
]

export default async function ApproximatelyEqualPage() {
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
          <h1>Approximately Equal Symbol (≈): Meaning, How to Type It, and LaTeX</h1>
          <p className="lead">
            The <strong>approximately equal symbol</strong> ≈ (two stacked tildes, Unicode U+2248,
            officially named <em>Almost Equal To</em>) says that two quantities are close in value
            but not exactly the same: π ≈ 3.14, √2 ≈ 1.414. This page covers what it means, how it
            differs from the single tilde ~ and the lookalikes ≃ ≅ ≐ ≒, how to type it on every
            platform, and how to write it in LaTeX with <code>\approx</code>, the negated form and
            the amssymb variants. Every LaTeX example here was compiled on TeX Live 2025.
          </p>
          <p>
            Copy it from here if that is all you need: <strong>≈</strong>. For the single squiggle
            and its many meanings see the post on the{' '}
            <Link href="/blog/squiggly-line-tilde-symbol-meaning-how-to-type">
              tilde symbol ~
            </Link>
            ; this guide is about the double one.
          </p>

          {/* ───────────────────────────── Meaning ───────────────────────────── */}
          <h2>What ≈ Means</h2>
          <p>
            <em>a</em> ≈ <em>b</em> is read &quot;a is approximately equal to b&quot; or &quot;a is
            almost equal to b&quot;. It is used whenever an exact equality would be false but the
            difference does not matter for the argument:
          </p>
          <ul>
            <li>
              <strong>Rounded values:</strong> π ≈ 3.1416, e ≈ 2.718, 1/3 ≈ 0.333. The right-hand
              side is a decimal that has been cut short.
            </li>
            <li>
              <strong>Measured or estimated values:</strong> g ≈ 9.81 m/s², the population of a
              city ≈ 2 million.
            </li>
            <li>
              <strong>Approximations in analysis:</strong> sin x ≈ x for small x, (1 + x)ⁿ ≈ 1 + nx
              when x is small, a Taylor series truncated after a few terms.
            </li>
            <li>
              <strong>Numerical results:</strong> the output of a solver or a simulation, where the
              answer is correct to a stated number of digits.
            </li>
          </ul>
          <p>
            Mathematically ≈ has no fixed tolerance. How close is &quot;close enough&quot; depends
            on the context, which is why careful writing often states it: &quot;≈ 3.14 (to two
            decimal places)&quot;. The symbol was introduced by Alfred Greenhill in 1892 and is now
            universal across mathematics, physics, engineering and everyday notation.
          </p>

          {/* ───────────────────────────── Lookalikes ───────────────────────────── */}
          <h2 id="lookalikes">≈ vs ~ vs ≃ vs ≅ vs ≐ vs ≒</h2>
          <p>
            There is a whole family of wavy equals signs, and each one has a settled meaning in
            mathematics. The table lists the ones you are likely to meet, with the Unicode code
            point, the character&apos;s official name (which is not always what mathematicians call
            it) and the LaTeX command.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Unicode</th>
                <th scope="col">Unicode name</th>
                <th scope="col">Typical meaning</th>
                <th scope="col">LaTeX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≈</td>
                <td>U+2248</td>
                <td>Almost Equal To</td>
                <td>Approximately equal in value; rounded or estimated numbers</td>
                <td><code>\approx</code></td>
              </tr>
              <tr>
                <td>~</td>
                <td>U+007E</td>
                <td>Tilde</td>
                <td>The keyboard tilde; in prose &quot;roughly&quot; (~10 min); file paths, home directory</td>
                <td><code>\textasciitilde</code> or <code>\~&#123;&#125;</code> (text)</td>
              </tr>
              <tr>
                <td>∼</td>
                <td>U+223C</td>
                <td>Tilde Operator</td>
                <td>Same order of magnitude; asymptotic to; &quot;distributed as&quot; in statistics; equivalence relations</td>
                <td><code>\sim</code></td>
              </tr>
              <tr>
                <td>≃</td>
                <td>U+2243</td>
                <td>Asymptotically Equal To</td>
                <td>Asymptotic equality; homotopy equivalence; sometimes &quot;approximately&quot; in physics</td>
                <td><code>\simeq</code></td>
              </tr>
              <tr>
                <td>≅</td>
                <td>U+2245</td>
                <td>Approximately Equal To</td>
                <td>Congruent (geometry) or isomorphic (algebra), despite the Unicode name</td>
                <td><code>\cong</code></td>
              </tr>
              <tr>
                <td>≐</td>
                <td>U+2250</td>
                <td>Approaches the Limit</td>
                <td>Approaches the limit; in some texts &quot;equal by definition&quot; or &quot;approximately&quot;</td>
                <td><code>\doteq</code></td>
              </tr>
              <tr>
                <td>≒</td>
                <td>U+2252</td>
                <td>Approximately Equal To or the Image Of</td>
                <td>Approximately equal in Japanese and Korean typography; image of a map</td>
                <td><code>\fallingdotseq</code> (amssymb)</td>
              </tr>
              <tr>
                <td>≊</td>
                <td>U+224A</td>
                <td>Almost Equal or Equal To</td>
                <td>Approximately or exactly equal</td>
                <td><code>\approxeq</code> (amssymb)</td>
              </tr>
              <tr>
                <td>≉</td>
                <td>U+2249</td>
                <td>Not Almost Equal To</td>
                <td>Not approximately equal</td>
                <td><code>\not\approx</code></td>
              </tr>
              <tr>
                <td>≲ ≳</td>
                <td>U+2272, U+2273</td>
                <td>Less-Than / Greater-Than or Equivalent To</td>
                <td>Less than or roughly equal; bounds up to a constant</td>
                <td><code>\lesssim</code>, <code>\gtrsim</code> (amssymb)</td>
              </tr>
            </tbody>
          </table>
          <p>
            Three distinctions cover most of the confusion. <strong>≈ vs ~:</strong> the double
            tilde says the values are close (π ≈ 3.14); the single tilde says only that they are of
            the same size or scale (L ~ 10³ m) or that one quantity follows a distribution (X ~
            N(0, 1)). <strong>≈ vs ≅:</strong> ≅ means congruent or isomorphic, not approximately
            equal, whatever its Unicode name says; see the post on the{' '}
            <Link href="/blog/congruent-symbol-meaning-how-to-type">congruent symbol ≅</Link>.{' '}
            <strong>≈ vs ≃:</strong> ≃ is asymptotic equality (the ratio tends to 1) or homotopy
            equivalence; some physicists use it where a mathematician would write ≈, but ≈ is the
            safe choice for a rounded number.
          </p>

          {/* ───────────────────────────── How to type ───────────────────────────── */}
          <h2 id="how-to-type">How to Type the Approximately Equal Symbol</h2>
          <p>
            Nothing on a standard keyboard produces ≈ directly, so every platform has a shortcut or
            a picker. The quickest route is usually to copy the character: <strong>≈</strong>
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Where</th>
                <th scope="col">How to type ≈</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Windows (any app)</td>
                <td>Hold <kbd>Alt</kbd> and type <kbd>247</kbd> on the numeric keypad with Num Lock on</td>
              </tr>
              <tr>
                <td>Windows (Word, Outlook)</td>
                <td>Type <kbd>2248</kbd> then press <kbd>Alt</kbd>+<kbd>X</kbd></td>
              </tr>
              <tr>
                <td>Windows 10 / 11 emoji panel</td>
                <td><kbd>Win</kbd>+<kbd>.</kbd>, open the Symbols tab, Math Symbols</td>
              </tr>
              <tr>
                <td>Mac (US and UK layouts)</td>
                <td><kbd>Option</kbd>+<kbd>X</kbd></td>
              </tr>
              <tr>
                <td>Mac Character Viewer</td>
                <td><kbd>Control</kbd>+<kbd>Command</kbd>+<kbd>Space</kbd>, search &quot;almost equal&quot;</td>
              </tr>
              <tr>
                <td>iPhone / iPad</td>
                <td>Switch to the <kbd>123</kbd> keyboard and long-press <kbd>=</kbd>, then slide to ≈</td>
              </tr>
              <tr>
                <td>Android (Gboard)</td>
                <td>Switch to <kbd>?123</kbd> and long-press <kbd>=</kbd>, then slide to ≈</td>
              </tr>
              <tr>
                <td>Google Docs</td>
                <td>Insert → Special characters, search &quot;almost equal&quot;</td>
              </tr>
              <tr>
                <td>Microsoft Word (menu)</td>
                <td>Insert → Symbol → More Symbols, subset Mathematical Operators, character code 2248 (Unicode hex)</td>
              </tr>
              <tr>
                <td>HTML</td>
                <td><code>&amp;asymp;</code>, <code>&amp;#8776;</code> or <code>&amp;#x2248;</code></td>
              </tr>
              <tr>
                <td>Markdown, plain text, code</td>
                <td>Paste the Unicode character ≈ directly; UTF-8 handles it everywhere</td>
              </tr>
              <tr>
                <td>LaTeX</td>
                <td><code>$\approx$</code> (see <a href="#latex">below</a>)</td>
              </tr>
            </tbody>
          </table>
          <h3>Windows</h3>
          <p>
            The Alt code is <kbd>Alt</kbd>+<kbd>247</kbd>. It works in every Windows program on a US
            or Western European keyboard layout because 247 is where ≈ sits in code page 437, the
            original IBM PC character set that Alt codes still use. It needs a real numeric keypad:
            on a laptop, use the Fn-layer keypad if there is one, or open the emoji panel with{' '}
            <kbd>Win</kbd>+<kbd>.</kbd> and pick ≈ from the Symbols tab. In Word and Outlook you can
            also type the hexadecimal code point <kbd>2248</kbd> and press <kbd>Alt</kbd>+<kbd>X</kbd>,
            which converts the four digits into the character.
          </p>
          <h3>Mac</h3>
          <p>
            <kbd>Option</kbd>+<kbd>X</kbd> gives ≈ on the US and British layouts. If your layout
            differs, the Character Viewer
            (<kbd>Control</kbd>+<kbd>Command</kbd>+<kbd>Space</kbd>) finds it under &quot;almost
            equal&quot; or by pasting 2248 into the search field.
          </p>
          <h3>iPhone and Android</h3>
          <p>
            Both stock keyboards hide ≈ behind the equals key. Switch to the numeric layer, hold{' '}
            <kbd>=</kbd> until the pop-up appears, and slide to ≈ (the same pop-up has ≠). The
            symbol is not under the tilde key, which is why people searching for it there never
            find it.
          </p>
          <h3>HTML and Unicode</h3>
          <p>
            The named entity is <code>&amp;asymp;</code> (for &quot;asymptotic&quot;, an older name
            for the symbol); the numeric forms are <code>&amp;#8776;</code> in decimal and{' '}
            <code>&amp;#x2248;</code> in hexadecimal. HTML5 also accepts <code>&amp;approx;</code>{' '}
            and <code>&amp;ap;</code>. In any UTF-8 document, including Markdown and source code,
            you can paste ≈ as is. The related entities are <code>&amp;sim;</code> for ∼,{' '}
            <code>&amp;simeq;</code> for ≃, <code>&amp;cong;</code> for ≅ and{' '}
            <code>&amp;ne;</code> for ≠.
          </p>

          {/* ───────────────────────────── LaTeX ───────────────────────────── */}
          <h2 id="latex">Approximately Equal in LaTeX: \approx</h2>
          <p>
            The command is <code>\approx</code>. It is built into LaTeX, needs no package, and
            works only in math mode, so wrap it in <code>$...$</code>, <code>\( ... \)</code> or a
            display environment. It is a relation symbol (<code>\mathrel</code>), so LaTeX puts the
            same medium space on both sides that it puts around <code>=</code>, whether or not you
            type spaces in the source.
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}

Inline: $\\pi \\approx 3.1416$, $\\sqrt{2} \\approx 1.414$, $e \\approx 2.718$, $1/3 \\approx 0.333$.

Spacing is automatic: $a\\approx b$ and $a \\approx b$ print the same.

The relatives: $a \\sim b$, $a \\simeq b$, $a \\cong b$, $a \\doteq b$, $a \\asymp b$, $a \\propto b$.

Negated: $a \\not\\approx b$, $a \\not\\sim b$, $a \\not\\cong b$, $a \\neq b$.

\\end{document}`}</code></pre>
          <p>
            For a bolder &quot;not approximately equal&quot; and the other variants you need{' '}
            <code>amssymb</code>. Note that <strong><code>\napprox</code> does not exist</strong>:
            amssymb defines <code>\nsim</code> and <code>\ncong</code> but no negated{' '}
            <code>\approx</code>, and the command stops pdfLaTeX with &quot;Undefined control
            sequence&quot;. <code>\not\approx</code> is the standard way to write ≉, and it works
            without any package.
          </p>

          <h3>The full set of commands</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Command</th>
                <th scope="col">Output</th>
                <th scope="col">Package</th>
                <th scope="col">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\approx</code></td><td>≈</td><td>none</td><td>Approximately equal</td></tr>
              <tr><td><code>\not\approx</code></td><td>≉</td><td>none</td><td>Not approximately equal</td></tr>
              <tr><td><code>\sim</code></td><td>∼</td><td>none</td><td>Same order; distributed as; asymptotic to</td></tr>
              <tr><td><code>\simeq</code></td><td>≃</td><td>none</td><td>Asymptotically equal; homotopy equivalent</td></tr>
              <tr><td><code>\cong</code></td><td>≅</td><td>none</td><td>Congruent; isomorphic</td></tr>
              <tr><td><code>\doteq</code></td><td>≐</td><td>none</td><td>Approaches the limit; equal by definition in some texts</td></tr>
              <tr><td><code>\asymp</code></td><td>≍</td><td>none</td><td>Equivalent up to constants</td></tr>
              <tr><td><code>\propto</code></td><td>∝</td><td>none</td><td>Proportional to</td></tr>
              <tr><td><code>\thickapprox</code></td><td>≈ (heavier)</td><td>amssymb</td><td>Bold variant of ≈</td></tr>
              <tr><td><code>\approxeq</code></td><td>≊</td><td>amssymb</td><td>Approximately or exactly equal</td></tr>
              <tr><td><code>\lesssim</code>, <code>\gtrsim</code></td><td>≲ ≳</td><td>amssymb</td><td>Less or greater than, up to a constant</td></tr>
              <tr><td><code>\nsim</code>, <code>\ncong</code></td><td>≁ ≇</td><td>amssymb</td><td>Negated ∼ and ≅</td></tr>
              <tr><td><code>\fallingdotseq</code>, <code>\risingdotseq</code></td><td>≒ ≓</td><td>amssymb</td><td>Approximately equal (East Asian convention)</td></tr>
              <tr><td><code>\doteqdot</code>, <code>\triangleq</code></td><td>≑ ≜</td><td>amssymb</td><td>Equal by definition</td></tr>
              <tr><td><code>\thicksim</code>, <code>\backsim</code>, <code>\eqsim</code></td><td>∼ ∽ ≂</td><td>amssymb</td><td>Variants of the tilde operator</td></tr>
            </tbody>
          </table>
          <p>
            All of these compiled in our test with <code>\usepackage&#123;amsmath,amssymb&#125;</code>.
            The full relations list, with copy-paste commands, is in the{' '}
            <Link href="https://tools.useoctree.com/symbols/relations" target="_blank" rel="noopener noreferrer">
              relations section of the symbol reference
            </Link>
            .
          </p>

          <h3>A worked example in align</h3>
          <p>
            Rounded constants line up neatly on the relation when you put the <code>&amp;</code>{' '}
            before <code>\approx</code>, exactly as you would before <code>=</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\begin{align}
  \\pi          &\\approx 3.1416, \\\\
  \\sqrt{2}     &\\approx 1.4142, \\\\
  e            &\\approx 2.7183, \\\\
  \\tfrac{1}{3} &\\approx 0.3333.
\\end{align}

For small $x$,
\\begin{align*}
  \\sin x &\\approx x - \\frac{x^3}{6}, &
  (1 + x)^n &\\approx 1 + nx, &
  e^x &\\approx 1 + x + \\frac{x^2}{2}.
\\end{align*}

\\end{document}`}</code></pre>

          <h3>\sim for &quot;distributed as&quot; and order of magnitude</h3>
          <p>
            In statistics the single tilde is the standard notation for &quot;has the
            distribution&quot;: <code>$X \sim \mathcal&#123;N&#125;(\mu, \sigma^2)$</code> reads
            &quot;X is normally distributed with mean μ and variance σ²&quot;. In physics and
            asymptotics it means &quot;of the order of&quot; or &quot;asymptotically equivalent
            to&quot;, as in Stirling&apos;s formula. Using <code>\approx</code> in either place is
            wrong, and using <code>\sim</code> for a rounded number is equally wrong.
          </p>
          <pre><code>{`\\usepackage{amsmath,amssymb}

Distribution: $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, \\quad $K \\sim \\mathrm{Poisson}(\\lambda)$.

Asymptotics: $n! \\sim \\sqrt{2\\pi n}\\,(n/e)^n$, \\quad $\\pi(x) \\sim x/\\ln x$.

Order of magnitude: $L \\sim 10^{3}\\,\\mathrm{m}$, \\quad bounds: $f(n) \\lesssim g(n)$.`}</code></pre>

          <h3>Three errors and what they mean</h3>
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
                <td><code>! Missing $ inserted.</code></td>
                <td>You wrote <code>\approx</code> in running text, for example &quot;The value is \approx 3.14.&quot;</td>
                <td>Wrap it: <code>$\approx$ 3.14</code>, or put the whole statement in math: <code>$x \approx 3.14$</code>.</td>
              </tr>
              <tr>
                <td><code>Undefined control sequence.</code> pointing at <code>\napprox</code> or <code>\textapprox</code></td>
                <td>Neither command exists in LaTeX, amssymb or textcomp.</td>
                <td>Use <code>\not\approx</code> for ≉ and <code>$\approx$</code> in text; there is no text-mode command like <code>\textasciitilde</code> for ≈.</td>
              </tr>
              <tr>
                <td><code>LaTeX Error: Unicode character ≈ (U+2248) not set up for use with LaTeX.</code></td>
                <td>You pasted the ≈ character into a pdfLaTeX document.</td>
                <td>Replace it with <code>\approx</code>, add <code>\DeclareUnicodeCharacter&#123;2248&#125;&#123;\ensuremath&#123;\approx&#125;&#125;</code> to the preamble, or compile with XeLaTeX or LuaLaTeX and unicode-math.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Here is the first one reproduced. The line <code>The value is \approx 3.14.</code>{' '}
            produces this in the log, and because TeX inserts a <code>$</code> and carries on, the
            rest of the paragraph gets typeset in math italics before a second &quot;Missing
            $&quot; appears at the end:
          </p>
          <pre><code>{`./main.tex:3: Missing $ inserted.
<inserted text>
                $
l.3 The value is \\approx
                         3.14.
I've inserted a begin-math/end-math symbol since I think
you left one out. Proceed, with fingers crossed.`}</code></pre>

          <h3>≈ in text, and the typed character</h3>
          <p>
            For a symbol in a sentence (&quot;≈ 3 cm&quot;) write <code>$\approx$</code>, or define
            a shortcut that works in both modes with <code>\ensuremath</code>. In text, follow it
            with <code>&#123;&#125;</code> (<code>\apx&#123;&#125; 3 cm</code>): a command name
            swallows the space after it, so <code>\apx 3 cm</code> prints &quot;≈3 cm&quot;. A pasted ≈ only works
            in pdfLaTeX after a <code>\DeclareUnicodeCharacter</code> line; with XeLaTeX or LuaLaTeX
            and <code>unicode-math</code>, the character works in math mode out of the box. In text
            mode under those engines it printed nothing in our test, because the default Latin
            Modern text font has no ≈ glyph, so keep it inside <code>$...$</code> there too or
            choose a text font that has it.
          </p>
          <pre><code>{`\\documentclass{article}
\\DeclareUnicodeCharacter{2248}{\\ensuremath{\\approx}}  % pdfLaTeX: make a pasted ≈ work
\\newcommand{\\apx}{\\ensuremath{\\approx}}              % works in text and in math
\\begin{document}

The length is \\apx{} 3 cm, and in math $L \\apx 3$.

Typed directly: $x ≈ y$ and in text ≈ 3 cm.

\\end{document}`}</code></pre>

          {/* ───────────────────────────── Conventions ───────────────────────────── */}
          <h2 id="conventions">When to Use ≈, When to Use ~ and ±, and When ≈ Is Wrong</h2>
          <ul>
            <li>
              <strong>Rounding:</strong> ≈ is the right symbol when you have shortened a number, and
              the number of digits shown is the implied precision: π ≈ 3.14, π ≈ 3.14159. If the
              rounding is stated elsewhere (&quot;all values rounded to two decimals&quot;), many
              journals prefer a plain <code>=</code> in the tables, since every entry is understood
              to be rounded.
            </li>
            <li>
              <strong>Order of magnitude:</strong> use ~ (<code>\sim</code>) when only the scale is
              meant: a wavelength ~ 500 nm, N ~ 10²³ particles. Writing ≈ 10²³ would claim the
              coefficient is close to 1, which is a stronger statement.
            </li>
            <li>
              <strong>Tolerances and uncertainty:</strong> a measured value with an error band is
              written with ±, not ≈: 9.81 ± 0.02 m/s². The{' '}
              <Link href="/blog/plus-minus-symbol-meaning-how-to-type">plus-minus symbol</Link>{' '}
              gives a range; ≈ gives no information about how far off the value could be.
            </li>
            <li>
              <strong>Definitions and identities:</strong> never write ≈ where the equality is
              exact. 0.999… = 1, not ≈ 1; ∑ 1/n² = π²/6 exactly; a quantity defined by a formula uses{' '}
              <code>=</code>, <code>:=</code> or <code>\triangleq</code>.
            </li>
            <li>
              <strong>Congruence and isomorphism:</strong> use ≅ (<code>\cong</code>) for congruent
              triangles and isomorphic groups, and ≡ for modular arithmetic. ≈ in those places reads
              as a rounding statement.
            </li>
            <li>
              <strong>Inequalities that are not strict:</strong> if the two sides are known to be
              different, say so with ≠; see the{' '}
              <Link href="/blog/not-equal-sign-meaning-how-to-type">not equal sign</Link>. ≈ and ≠
              are not opposites: 3.14 ≠ π and 3.14 ≈ π are both true.
            </li>
          </ul>

          {/* ───────────────────────────── Full example ───────────────────────────── */}
          <h2>Complete Example</h2>
          <p>
            One document that uses each relation in its proper place: ≈ for rounding, ∼ for a
            distribution and an asymptotic law, ± for a measured tolerance, ≅ for congruence and
            the amssymb bounds. Compiled with pdfLaTeX on TeX Live 2025.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}   % \\thickapprox, \\approxeq, \\lesssim, \\gtrsim, \\nsim, \\ncong
\\newcommand{\\apx}{\\ensuremath{\\approx}}   % usable in text and math

\\begin{document}

\\section*{Rounding}
Since $\\pi = 3.14159\\ldots$ we write $\\pi \\approx 3.14$ to two decimal places, and
\\begin{align}
  \\sqrt{2} &\\approx 1.414, &
  e        &\\approx 2.718, &
  \\ln 2    &\\approx 0.693.
\\end{align}
The error of the first approximation is $|\\sqrt{2} - 1.414| \\approx 2.1 \\times 10^{-4}$,
so $\\sqrt{2} \\not\\approx 1.5$ at this precision.

\\section*{Scale, distribution and tolerance}
A typical cell is $\\sim 10\\,\\mu\\mathrm{m}$ across, the sample mean satisfies
$\\bar{X} \\sim \\mathcal{N}(\\mu, \\sigma^2/n)$, and Stirling's formula gives
$n! \\sim \\sqrt{2\\pi n}\\,(n/e)^n$. The measured value is $g = 9.81 \\pm 0.02\\ \\mathrm{m/s^2}$,
and the runtime is bounded by $T(n) \\lesssim n \\log n$.

\\section*{Not approximation}
Triangles $ABC \\cong DEF$ are congruent, $7 \\equiv 1 \\pmod 3$, and $0.999\\ldots = 1$ exactly.
In text the length is \\apx{} 3 cm; the heavier $a \\thickapprox b$ and $a \\approxeq b$ are
amssymb variants.

\\end{document}`}</code></pre>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What does the ≈ symbol mean?</h3>
          <p>
            ≈ means &quot;approximately equal to&quot; or &quot;almost equal to&quot;. It says the
            two sides are close enough for the purpose at hand but not exactly the same, usually
            because one side has been rounded or estimated: π ≈ 3.14, √2 ≈ 1.414. Its Unicode name
            is ALMOST EQUAL TO (U+2248).
          </p>
          <h3>How do I type the approximately equal symbol?</h3>
          <p>
            On Windows hold Alt and type 247 on the numeric keypad, or type 2248 followed by Alt+X
            in Word. On a Mac press Option+X. On iPhone and Android open the number keyboard and
            long-press the = key. In HTML write <code>&amp;asymp;</code> or{' '}
            <code>&amp;#8776;</code>. In LaTeX write <code>\approx</code> inside math mode. Or copy
            it from here: ≈
          </p>
          <h3>How do I write approximately equal in LaTeX?</h3>
          <p>
            Use <code>\approx</code> in math mode: <code>$\pi \approx 3.1416$</code>. It needs no
            package. The related commands are <code>\sim</code> (∼), <code>\simeq</code> (≃),{' '}
            <code>\cong</code> (≅) and <code>\doteq</code> (≐); amssymb adds{' '}
            <code>\thickapprox</code>, <code>\approxeq</code>, <code>\lesssim</code> and{' '}
            <code>\gtrsim</code>. For &quot;not approximately equal&quot; write{' '}
            <code>\not\approx</code>; there is no <code>\napprox</code> command. Outside math mode{' '}
            <code>\approx</code> stops with &quot;Missing $ inserted&quot;, so wrap it as{' '}
            <code>$\approx$</code>.
          </p>
          <h3>What is the difference between ≈ and ~?</h3>
          <p>
            The tilde ~ (U+007E on the keyboard, ∼ U+223C as the math operator) is a looser
            relation: &quot;of the same order of magnitude&quot;, &quot;asymptotic to&quot; or, in
            statistics, &quot;distributed as&quot;, and in everyday writing it marks a rough
            estimate (~10 minutes). The double tilde ≈ states a numeric approximation that is close
            in value, such as a rounded number. Use ≈ when the digits matter and ~ when only the
            scale does.
          </p>
          <h3>What is the difference between ≈ and ≅?</h3>
          <p>
            They look alike and Unicode even names ≅ (U+2245) APPROXIMATELY EQUAL TO, but in
            practice ≅ means congruent (identical in shape and size in geometry) or isomorphic (in
            algebra), and ≈ means almost equal in value. For a rounded number use ≈, never ≅.
          </p>
          <h3>What is the Alt code for approximately equal?</h3>
          <p>
            Alt+247. Hold the Alt key, type 2 4 7 on the numeric keypad with Num Lock on, and
            release Alt. It works on a US or Western European Windows layout because 247 is the
            position of ≈ in the old DOS code page 437. On a laptop without a keypad, use Win+.
            (the emoji panel) and open the Symbols tab, or type 2248 then Alt+X in Word.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The symbols that sit next to ≈ in most documents:</p>
          <ul>
            <li><Link href="/blog/squiggly-line-tilde-symbol-meaning-how-to-type">The Tilde Symbol ~</Link> – The single squiggle: its meanings, the three Unicode tildes and how to type it</li>
            <li><Link href="/blog/plus-minus-symbol-meaning-how-to-type">The Plus-Minus Symbol ±</Link> – Tolerances and uncertainty, where ≈ is the wrong choice</li>
            <li><Link href="/blog/not-equal-sign-meaning-how-to-type">The Not Equal Sign ≠</Link> – Alt codes, HTML and <code>\neq</code></li>
            <li><Link href="/blog/congruent-symbol-meaning-how-to-type">The Congruent Symbol ≅</Link> – The lookalike that means something else</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions in LaTeX</Link> – Inline and display math, where <code>\approx</code> lives</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> – π, σ, μ and the rest of the relation symbols</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/symbols/relations" target="_blank" rel="noopener noreferrer">Relation Symbols Reference</Link> – ≈, ∼, ≃, ≅, ≤, ≥ and every other relation with its LaTeX command</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – All categories: Greek letters, arrows, operators, set theory and more</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste any example above and see the PDF without installing TeX</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Symbol" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Get the relation symbols right the first time</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with TeX Live already set up: paste any example
              above, ask for &quot;approximately equal&quot; or &quot;distributed as&quot; in plain
              English, and see the compiled PDF as you type.
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
