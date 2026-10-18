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

const breadcrumbs = getLearnBreadcrumbs('Strikethrough and Cross Out in LaTeX', 'strikethrough')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXStrikethroughPage() {
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
          <h1>Strikethrough and Cross Out in LaTeX: \sout, \cancel and \st</h1>
          <p className="lead">
            LaTeX has no built-in strikethrough command. The standard answer is{' '}
            <code>\sout</code> from the <code>ulem</code> package for text, and{' '}
            <code>\cancel</code> from the <code>cancel</code> package for math. This guide
            covers both, the <code>soul</code> alternative <code>\st</code>, colored strikes,
            crossing out in tables and Beamer, negated relations with <code>\not</code>,
            redlining with the <code>changes</code> package, why Unicode strikethrough is a bad
            idea, and the errors you will meet.
          </p>

          {/* ── ulem ── */}
          <h2>Strikethrough Text with ulem: \sout</h2>
          <p>
            Load <code>ulem</code> with the <code>normalem</code> option and use{' '}
            <code>\sout</code>. The option matters: without it, ulem redefines{' '}
            <code>\emph</code> and <code>\em</code> to underline instead of italicise, which
            silently changes every emphasised word in your document.
          </p>
          <pre><code>{`\\usepackage[normalem]{ulem}

\\sout{struck through}        % horizontal line through the text
\\xout{crossed out}           % hatched with slashes ///
\\uline{underlined}
\\uuline{double underlined}
\\uwave{wavy underline}
\\dashuline{dashed underline}
\\dotuline{dotted underline}`}</code></pre>
          <p>
            ulem&apos;s commands allow line breaks inside the argument, so a struck-out passage
            can run over several lines. The thickness of the line is held in the macro{' '}
            <code>\ULthickness</code> and its vertical position in the dimension{' '}
            <code>\ULdepth</code>; both can be changed, for example <code>{`\\renewcommand{\\ULthickness}{1pt}`}</code> for a
            heavier strike.
          </p>
          <p>
            Two limitations: the argument is treated word by word, so a command that takes
            arguments inside <code>\sout</code> occasionally needs an extra pair of braces
            (<code>{`\\sout{{\\textbf{bold}} text}`}</code>), and the text cannot contain a
            paragraph break.
          </p>

          {/* ── soul ── */}
          <h2>The soul Alternative: \st</h2>
          <p>
            The <code>soul</code> package provides <code>\st</code> for strikeout, along with{' '}
            <code>\ul</code> (underline), <code>\hl</code> (highlight) and <code>\so</code>{' '}
            (letter spacing). It processes the text syllable by syllable, so hyphenation and
            line breaking are handled well, and it has a clean way to color the line:
          </p>
          <pre><code>{`\\usepackage{xcolor}
\\usepackage{soul}

\\st{struck through}
\\setstcolor{red}              % red line, text keeps its color
\\st{struck through in red}`}</code></pre>
          <p>
            The price of soul&apos;s syllable scanning is that it must understand everything in
            the argument. Commands with arguments must be registered first
            (<code>{`\\soulregister{\\cite}{1}`}</code>), math and <code>\\</code> are not
            allowed, and unusual font encodings or unregistered commands produce the error{' '}
            <em>&ldquo;Package soul Error: Reconstruction failed&rdquo;</em>. With pdfLaTeX and
            non-ASCII characters (umlauts, accented letters), use current soul (version 3,
            TeX Live 2023 or later), which includes the UTF-8 support that used to be a separate{' '}
            <code>soulutf8</code> package. For short phrases of plain text, <code>\st</code> is
            excellent; for anything with markup inside, <code>\sout</code> is more forgiving.
          </p>

          {/* ── cancel ── */}
          <h2>Crossing Out in Math: the cancel Package</h2>
          <p>
            For equations, the <code>cancel</code> package draws diagonal strokes that scale
            with the expression, which is what a reader expects when terms cancel out:
          </p>
          <pre><code>{`\\usepackage{cancel}

\\[
  \\frac{\\cancel{x}\\,(x+1)}{\\cancel{x}} = x + 1        % diagonal /
\\]
\\[
  \\bcancel{y} \\qquad \\xcancel{z}                      % backslash \\, cross X
\\]
\\[
  \\lim_{n \\to \\infty} \\Bigl( 2 + \\cancelto{0}{\\frac{1}{n}} \\Bigr) = 2   % arrow to a value
\\]`}</code></pre>
          <ul>
            <li><code>{`\\cancel{...}`}</code> &ndash; diagonal stroke from bottom left to top right</li>
            <li><code>{`\\bcancel{...}`}</code> &ndash; stroke from top left to bottom right</li>
            <li><code>{`\\xcancel{...}`}</code> &ndash; both strokes, an X</li>
            <li><code>{`\\cancelto{value}{...}`}</code> &ndash; arrow pointing at the value the term becomes; math mode only</li>
          </ul>
          <p>
            The first three also work in text mode. The <code>thicklines</code> package option
            gives heavier strokes, and <code>makeroom</code> adds horizontal space so the strokes
            do not collide with neighbours. The color of the strokes is set with{' '}
            <code>\CancelColor</code>:
          </p>
          <pre><code>{`\\usepackage{xcolor}
\\usepackage[thicklines]{cancel}
\\renewcommand{\\CancelColor}{\\color{red}}

\\[ a + \\cancel{b} - \\cancel{b} = a \\]`}</code></pre>

          <h3>Negating a relation: \not</h3>
          <p>
            Crossing out a relation symbol is a different job. <code>\not</code> overlays a slash
            on the next symbol, but the dedicated negated symbols are spaced better and should be
            preferred where they exist:
          </p>
          <pre><code>{`$a \\not= b$        % works, but \\neq is better
$a \\neq b$
$x \\notin A$       % rather than \\not\\in
$A \\not\\subset B$  % no dedicated symbol in the kernel; \\nsubseteq is in amssymb
$a \\not\\equiv b$   % \\nequiv does not exist; \\not\\equiv is fine`}</code></pre>

          {/* ── Tables and beamer ── */}
          <h2>Strikethrough in Tables and Beamer</h2>
          <p>
            <code>\sout</code> works inside table cells with no special treatment. In Beamer,
            crossing something out on the next slide is a matter of overlays; use{' '}
            <code>\alt</code> or <code>\only</code> so the struck version replaces the original:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usepackage[normalem]{ulem}

\\begin{frame}{Plan}
  \\begin{itemize}
    \\item \\alt<2->{\\sout{Ship on Friday}}{Ship on Friday}
    \\item<2-> Ship on Monday
  \\end{itemize}

  \\begin{tabular}{lr}
    Old price & \\sout{\\$40} \\\\
    New price & \\alert{\\$25}
  \\end{tabular}
\\end{frame}`}</code></pre>
          <p>
            Note that the <code>normalem</code> option is essential in Beamer, which relies on{' '}
            <code>\emph</code> and <code>\alert</code> for its own highlighting. For simply
            drawing attention to a change, <code>\alert</code> is often clearer than a strike.
          </p>

          {/* ── Colored ── */}
          <h2>Colored Strikethrough</h2>
          <p>
            With ulem, the line takes the color in force where <code>\sout</code> is called, and
            the text inside can be switched back:
          </p>
          <pre><code>{`\\usepackage{xcolor}
\\usepackage[normalem]{ulem}

\\textcolor{red}{\\sout{text and line both red}}
{\\color{red}\\sout{\\textcolor{black}{black text, red line}}}

% as a reusable command
\\newcommand{\\redsout}[1]{{\\color{red}\\sout{\\textcolor{black}{#1}}}}`}</code></pre>
          <p>
            soul&apos;s <code>{`\\setstcolor{red}`}</code> does the same with less nesting, and
            cancel uses <code>\CancelColor</code> as shown above.
          </p>

          {/* ── changes ── */}
          <h2>Track Changes: the changes Package</h2>
          <p>
            If the strikethrough is meant to show an editor what was deleted, use a package
            designed for redlining. <code>changes</code> marks additions, deletions and
            replacements by author, with a list of changes and a single switch to accept them
            all:
          </p>
          <pre><code>{`\\usepackage[draft]{changes}
\\definechangesauthor[name={Ada Lovelace}, color=blue]{AL}

The result was \\deleted[id=AL]{inconclusive}\\added[id=AL]{significant}.
We used \\replaced[id=AL]{five}{three} runs.
\\highlight[id=AL]{This sentence needs a citation.}\\comment[id=AL]{Which paper?}

\\listofchanges     % summary of all changes`}</code></pre>
          <p>
            Switching the option to <code>final</code>{' '}
            (<code>{`\\usepackage[final]{changes}`}</code>) accepts every change: deleted text
            disappears, added text is printed normally, and the markup can stay in the source. For
            annotations that live in the PDF&apos;s comment layer rather than in the typeset text,{' '}
            <code>pdfcomment</code> offers <code>{`\\pdfmarkupcomment[markup=StrikeOut]{text}{note}`}</code>,
            which readers can show or hide in their viewer.
          </p>

          {/* ── Unicode ── */}
          <h2>Why Not Unicode Strikethrough</h2>
          <p>
            Online &ldquo;strikethrough text generators&rdquo; insert the combining character
            U+0336 after every letter (s̶t̶r̶i̶k̶e̶). In LaTeX this is the wrong tool: pdfLaTeX stops
            with <em>&ldquo;Unicode character ̶ (U+0336) not set up for use with LaTeX&rdquo;</em>,
            and under XeLaTeX or LuaLaTeX the result depends on whether the font has the combining
            glyph; most text fonts draw it badly or not at all. It also breaks searching and
            copying from the PDF. Use <code>\sout</code> and let LaTeX draw the line.
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
                <td>Every <code>\emph</code> is underlined instead of italic</td>
                <td>ulem loaded without <code>normalem</code></td>
                <td><code>{`\\usepackage[normalem]{ulem}`}</code></td>
              </tr>
              <tr>
                <td><code>\sout</code> in an equation: line in the wrong place, fractions and subscripts mis-sized</td>
                <td>ulem boxes the math as a single unit and ignores math styles</td>
                <td>Use <code>\cancel</code>, <code>\bcancel</code> or <code>\xcancel</code> from <code>cancel</code></td>
              </tr>
              <tr>
                <td><em>Package soul Error: Reconstruction failed</em></td>
                <td>A command, math or font change inside <code>\st</code> that soul cannot scan</td>
                <td>Register the command with <code>\soulregister</code>, keep markup outside <code>\st</code>, or use <code>\sout</code></td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \sout</em> / <em>\st</em> / <em>\cancel</em></td>
                <td>Package not loaded</td>
                <td>Add <code>\usepackage</code> for <code>ulem</code>, <code>soul</code> or <code>cancel</code></td>
              </tr>
              <tr>
                <td><code>\cancelto</code> gives <em>Missing $ inserted</em></td>
                <td>Used in text mode</td>
                <td><code>\cancelto</code> is math only; wrap it in <code>$...$</code></td>
              </tr>
              <tr>
                <td>Strike line is invisible or too thin in a printout</td>
                <td>Default 0.4pt rule at small font sizes</td>
                <td><code>{`\\renewcommand{\\ULthickness}{0.8pt}`}</code> or the <code>thicklines</code> option of cancel</td>
              </tr>
              <tr>
                <td>Beamer overlays show both the plain and the struck text</td>
                <td>Two <code>\only</code> blocks with overlapping specifications</td>
                <td>Use <code>{`\\alt<2->{\\sout{text}}{text}`}</code></td>
              </tr>
              <tr>
                <td><em>Unicode character ̶ (U+0336) not set up for use with LaTeX</em></td>
                <td>Pasted Unicode strikethrough text</td>
                <td>Remove the combining characters and use <code>\sout</code></td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath, amssymb}
\\usepackage{xcolor}
\\usepackage[normalem]{ulem}
\\usepackage{soul}
\\usepackage{cancel}
\\usepackage[draft]{changes}

\\renewcommand{\\CancelColor}{\\color{red}}
\\setstcolor{red}
\\definechangesauthor[name={Ada Lovelace}, color=blue]{AL}

\\begin{document}

\\section{Text}
The deadline is \\sout{Friday} Monday. The budget was
\\xout{generous} \\uwave{adequate}, and the plan is \\st{on track}.

\\begin{center}
\\begin{tabular}{lr}
  Old price & \\sout{\\$40} \\\\
  New price & \\$25
\\end{tabular}
\\end{center}

\\section{Math}
\\[
  \\frac{\\cancel{(x+1)}(x-1)}{\\cancel{(x+1)}} = x - 1,
  \\qquad
  \\lim_{n \\to \\infty} \\left( 2 + \\cancelto{0}{\\frac{1}{n}} \\right) = 2,
  \\qquad
  3 \\notin \\{1, 2\\}, \\quad A \\nsubseteq B.
\\]

\\section{Revision}
The result was \\deleted[id=AL]{inconclusive}\\added[id=AL]{significant},
based on \\replaced[id=AL]{five}{three} runs.

\\end{document}`}</code></pre>

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
              <tr><td>Strikethrough text</td><td><code>{`\\sout{text}`}</code> with <code>{`\\usepackage[normalem]{ulem}`}</code></td></tr>
              <tr><td>Cross out with slashes</td><td><code>{`\\xout{text}`}</code></td></tr>
              <tr><td>Wavy / dashed / dotted underline</td><td><code>{`\\uwave{}`}</code> / <code>{`\\dashuline{}`}</code> / <code>{`\\dotuline{}`}</code></td></tr>
              <tr><td>Strikethrough with soul</td><td><code>{`\\st{text}`}</code></td></tr>
              <tr><td>Colored strike, black text</td><td><code>{`\\setstcolor{red}`}</code> (soul) or <code>{`{\\color{red}\\sout{\\textcolor{black}{text}}}`}</code></td></tr>
              <tr><td>Thicker line (ulem)</td><td><code>{`\\renewcommand{\\ULthickness}{1pt}`}</code></td></tr>
              <tr><td>Cancel a term in math</td><td><code>{`\\cancel{x}`}</code>, <code>{`\\bcancel{x}`}</code>, <code>{`\\xcancel{x}`}</code></td></tr>
              <tr><td>Cancel to a value</td><td><code>{`\\cancelto{0}{x}`}</code> (math only)</td></tr>
              <tr><td>Red cancel strokes</td><td><code>{`\\renewcommand{\\CancelColor}{\\color{red}}`}</code></td></tr>
              <tr><td>Negate a relation</td><td><code>\neq</code>, <code>\notin</code>, <code>\nsubseteq</code>, or <code>\not</code> before the symbol</td></tr>
              <tr><td>Strike on the next Beamer slide</td><td><code>{`\\alt<2->{\\sout{text}}{text}`}</code></td></tr>
              <tr><td>Track changes</td><td><code>{`\\deleted{}`}</code>, <code>{`\\added{}`}</code>, <code>{`\\replaced{new}{old}`}</code> (changes)</td></tr>
              <tr><td>Accept all changes</td><td><code>{`\\usepackage[final]{changes}`}</code></td></tr>
              <tr><td>PDF strike-out annotation</td><td><code>{`\\pdfmarkupcomment[markup=StrikeOut]{text}{note}`}</code> (pdfcomment)</td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Deleted text marked? These guides cover the rest of text formatting:</p>
          <ul>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> &ndash; <code>\textbf</code>, <code>\emph</code>, and the underline commands of ulem and soul</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; The xcolor names used for colored strikes and change tracking</li>
            <li><Link href="/learn/comments">LaTeX Comments</Link> &ndash; Hide text from the output entirely, todo notes and draft switches</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, limits and the amsmath environments used with <code>\cancel</code></li>
            <li><Link href="/learn/quotes">LaTeX Quotation Marks and Quotes</Link> &ndash; Correct quotation marks and block quotes</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test strikethrough and cancel code with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse negated relations and other math symbols</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX formatting" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix formatting problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor picks the right package for strikethrough in text, math or
              slides, explains ulem and soul errors, and compiles your document in seconds.
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
    title: 'Strikethrough and Cross Out in LaTeX: \\sout, \\cancel and \\st',
    description: 'How to strike through and cross out text in LaTeX: \\sout and \\xout from ulem (with the normalem option), \\st from soul, \\cancel, \\bcancel, \\xcancel and \\cancelto in math, \\not for negated relations, strikethrough in tables and Beamer, colored strikes, track changes with the changes package, and common errors.',
    keywords: 'latex strikethrough, latex cross out, cross out in latex, latex strike through text, latex sout, ulem sout, latex cancel package, latex cancel math, latex cancelto, latex st soul, latex strikethrough math, latex strikethrough beamer, latex track changes, changes package latex, latex deleted text, latex not symbol, latex red strikethrough',
    openGraph: mergeOpenGraph({
      title: 'Strikethrough and Cross Out in LaTeX: \\sout, \\cancel and \\st',
      description: 'Strike through text with ulem and soul, cancel terms in math with the cancel package, cross out in tables and Beamer, color the line, and track changes with the changes package.',
      type: 'article',
      url: '/learn/strikethrough',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Strikethrough and Cross Out in LaTeX',
      description: '\\sout, \\st and \\cancel explained, plus colored strikes, Beamer overlays and track changes.',
    },
    alternates: {
      canonical: '/learn/strikethrough',
    },
  }
}
