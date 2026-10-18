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

const breadcrumbs = getLearnBreadcrumbs('Theorems and Proofs in LaTeX', 'theorems-proofs')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

export default async function LaTeXTheoremsProofsPage() {
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
          <h1>Theorems, Lemmas and Proofs in LaTeX: amsthm, \newtheorem and the QED Symbol</h1>
          <p className="lead">
            LaTeX has no built-in <code>theorem</code> environment. You create one with{' '}
            <code>\newtheorem</code>, and the <code>amsthm</code> package adds the styles, the{' '}
            <code>proof</code> environment and the end-of-proof symbol. This guide sets that up
            step by step: numbered and unnumbered theorems, lemmas that share the theorem counter,
            the three built-in styles, proofs that end with the QED box in the right place (even
            after an equation or a list), changing the symbol, referencing theorems with{' '}
            <code>\ref</code> and <code>cleveref</code>, colored theorem boxes with{' '}
            <code>tcolorbox</code>, and the errors that come up along the way.
          </p>

          {/* ── Setup ── */}
          <h2>Setting Up amsthm</h2>
          <p>
            Load <code>amsmath</code> first, then <code>amsthm</code>, then declare the
            environments you need. The second argument of <code>\newtheorem</code> is the word that
            is printed; the first is the name you use in <code>\begin</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsthm}

\\newtheorem{theorem}{Theorem}

\\begin{document}

\\begin{theorem}
  Every bounded monotone sequence of real numbers converges.
\\end{theorem}

\\begin{proof}
  Let $(a_n)$ be increasing and bounded above, and let $L = \\sup_n a_n$.
  For any $\\varepsilon > 0$ there is an $N$ with $a_N > L - \\varepsilon$,
  and then $L - \\varepsilon < a_n \\le L$ for all $n \\ge N$.
\\end{proof}

\\end{document}`}</code></pre>
          <p>
            This prints <strong>Theorem 1.</strong> followed by the statement in italics, then{' '}
            <em>Proof.</em> and the argument in upright type, ending with a hollow square (□) at
            the right margin. An optional argument adds a name or attribution to the heading:{' '}
            <code>{`\\begin{theorem}[Monotone Convergence]`}</code> prints{' '}
            <strong>Theorem 1</strong> (Monotone Convergence).
          </p>
          <p>
            The AMS classes (<code>amsart</code>, <code>amsbook</code>) already load{' '}
            <code>amsthm</code>; with any other class you load it yourself. The order matters: if{' '}
            <code>amsmath</code> is loaded <em>after</em> <code>amsthm</code>, the proof
            environment&apos;s handling of the QED symbol in displayed equations breaks
            (&ldquo;The \qedhere command may not work correctly here&rdquo;).
          </p>

          {/* ── Numbering ── */}
          <h2>Numbering: Within Sections and Shared Counters</h2>
          <p>
            A bare <code>{`\\newtheorem{theorem}{Theorem}`}</code> numbers theorems 1, 2, 3 across
            the whole document. Most papers number within sections (Theorem 2.1, 2.2) and most
            books within chapters. The optional argument after the printed name does this:
          </p>
          <pre><code>{`\\newtheorem{theorem}{Theorem}[section]   % Theorem 1.1, 1.2, 2.1, ...
% \\newtheorem{theorem}{Theorem}[chapter] % per chapter, in book/report`}</code></pre>
          <p>
            The second question is whether lemmas, propositions and corollaries get their own
            sequence or share the theorem counter. Sharing is the norm in mathematics: it lets a
            reader find &ldquo;Lemma 2.3&rdquo; between Theorem 2.2 and Corollary 2.4 without
            searching. An optional argument <em>before</em> the printed name makes an environment
            use another environment&apos;s counter:
          </p>
          <pre><code>{`\\newtheorem{theorem}{Theorem}[section]
\\newtheorem{lemma}[theorem]{Lemma}               % shares the theorem counter
\\newtheorem{proposition}[theorem]{Proposition}
\\newtheorem{corollary}[theorem]{Corollary}

% Definitions and examples often get their own counters
\\newtheorem{definition}{Definition}[section]
\\newtheorem{example}{Example}[section]`}</code></pre>
          <p>
            You cannot use both optional arguments at once: an environment either shares a counter
            or defines its own, and the shared one inherits the <code>[section]</code> reset from
            the environment it follows.
          </p>

          <h3>Unnumbered theorems</h3>
          <p>
            The starred form defines an environment with no number at all, used for famous named
            results and for remarks:
          </p>
          <pre><code>{`\\newtheorem*{fermat}{Fermat's Last Theorem}
\\newtheorem*{remark}{Remark}

\\begin{fermat}
  No three positive integers $a$, $b$, $c$ satisfy $a^n + b^n = c^n$
  for any integer $n > 2$.
\\end{fermat}`}</code></pre>
          <p>
            To put the number before the name (&ldquo;2.1 Theorem&rdquo; instead of &ldquo;Theorem
            2.1&rdquo;), issue <code>\swapnumbers</code> before the <code>\newtheorem</code>{' '}
            declarations it should affect.
          </p>

          {/* ── Styles ── */}
          <h2>Theorem Styles: plain, definition and remark</h2>
          <p>
            amsthm ships three styles. <code>\theoremstyle</code> switches the current style, and
            each <code>\newtheorem</code> that follows picks it up:
          </p>
          <table>
            <thead>
              <tr>
                <th>Style</th>
                <th>Heading</th>
                <th>Body</th>
                <th>Use for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>plain</code> (default)</td><td>Bold</td><td>Italic</td><td>Theorem, Lemma, Proposition, Corollary, Conjecture</td></tr>
              <tr><td><code>definition</code></td><td>Bold</td><td>Upright</td><td>Definition, Example, Problem, Exercise</td></tr>
              <tr><td><code>remark</code></td><td>Italic</td><td>Upright</td><td>Remark, Note, Notation, Case</td></tr>
            </tbody>
          </table>
          <pre><code>{`\\theoremstyle{plain}
\\newtheorem{theorem}{Theorem}[section]
\\newtheorem{lemma}[theorem]{Lemma}
\\newtheorem{corollary}[theorem]{Corollary}

\\theoremstyle{definition}
\\newtheorem{definition}[theorem]{Definition}
\\newtheorem{example}[theorem]{Example}

\\theoremstyle{remark}
\\newtheorem*{remark}{Remark}
\\newtheorem*{notation}{Notation}`}</code></pre>
          <p>
            The italic body of the <code>plain</code> style is why definitions get their own
            style: a definition full of italic text with italic variables is hard to read, and
            the word being defined cannot be emphasised. Inside an italic theorem, use{' '}
            <code>\textup</code> or <code>\emph</code> (which toggles back to upright) for text
            that should not be slanted.
          </p>

          <h3>Custom styles with \newtheoremstyle</h3>
          <p>
            For a journal that wants, say, small caps headings or a line break after the heading,
            define your own style. The nine arguments are: name, space above, space below, body
            font, indent, heading font, punctuation after the heading, space after the heading
            (or <code>\newline</code>), and a heading specification (leave empty for the default):
          </p>
          <pre><code>{`\\newtheoremstyle{scthm}   % name
  {\\topsep}               % space above
  {\\topsep}               % space below
  {\\itshape}              % body font
  {}                      % indent
  {\\scshape}              % heading font
  {.}                     % punctuation after heading
  {\\newline}              % space after heading: \\newline or a length
  {}                      % heading spec (empty = default)

\\theoremstyle{scthm}
\\newtheorem{claim}{Claim}`}</code></pre>

          {/* ── Proofs ── */}
          <h2>The proof Environment and the QED Symbol</h2>
          <p>
            <code>proof</code> prints an italic <em>Proof.</em> heading and places the
            end-of-proof symbol, by default a hollow box (<code>\openbox</code>), flush right on
            the last line. The symbol is often called the QED symbol, tombstone or Halmos, after{' '}
            <em>quod erat demonstrandum</em> and the mathematician who popularised the box.
          </p>
          <p>
            Change the heading for one proof with the optional argument. This is the standard way
            to prove a theorem stated earlier, or to split a proof into parts:
          </p>
          <pre><code>{`\\begin{proof}[Proof of Theorem~\\ref{thm:main}]
  ...
\\end{proof}

\\begin{proof}[Sketch of proof]
  ...
\\end{proof}

% The default word, for all proofs (e.g. for another language)
\\renewcommand{\\proofname}{Beweis}`}</code></pre>

          <h3>\qedhere: the symbol after an equation or a list</h3>
          <p>
            If a proof ends with a displayed equation, the box lands on its own line below the
            equation, which looks wrong. Put <code>\qedhere</code> at the end of the last display
            and amsthm moves the symbol onto that line instead:
          </p>
          <pre><code>{`\\begin{proof}
  Expanding the square and collecting terms,
  \\begin{align*}
    (a+b)^2 &= a^2 + ab + ba + b^2 \\\\
            &= a^2 + 2ab + b^2. \\qedhere
  \\end{align*}
\\end{proof}

\\begin{proof}
  Both directions are immediate:
  \\begin{itemize}
    \\item If $x \\in A$ then $x \\in A \\cup B$.
    \\item If $x \\in A \\cup B$ and $x \\notin B$ then $x \\in A$. \\qedhere
  \\end{itemize}
\\end{proof}`}</code></pre>
          <p>
            <code>\qedhere</code> works in <code>equation</code>, <code>align</code>,{' '}
            <code>gather</code>, their starred forms, <code>{`\\[ ... \\]`}</code>, and in the last
            item of a list. With a <em>numbered</em> equation the symbol is placed to the left of
            the equation number. If the proof simply ends with text, you need nothing: the symbol
            appears automatically.
          </p>

          <h3>Changing the QED symbol</h3>
          <p>
            The symbol is stored in <code>\qedsymbol</code>. Redefine it in the preamble; a filled
            square from <code>amssymb</code> is the most common replacement:
          </p>
          <pre><code>{`\\usepackage{amssymb}

\\renewcommand{\\qedsymbol}{$\\blacksquare$}        % filled square
\\renewcommand{\\qedsymbol}{$\\square$}             % hollow square from amssymb
\\renewcommand{\\qedsymbol}{\\rule{0.5em}{0.5em}}   % filled square, no package
\\renewcommand{\\qedsymbol}{QED}                    % the letters
\\renewcommand{\\qedsymbol}{}                       % no symbol at all`}</code></pre>
          <p>
            The amsthm default, <code>\openbox</code>, and the amssymb <code>\square</code> look
            almost the same; <code>\blacksquare</code> is the filled version. In plain text or
            Unicode-aware editors the dedicated character is ∎, U+220E &ldquo;End of Proof&rdquo;,
            which you can use with XeLaTeX or LuaLaTeX and a font that contains it. To put the
            symbol somewhere by hand, outside a <code>proof</code> environment, use the{' '}
            <code>\qed</code> command.
          </p>

          {/* ── Referencing ── */}
          <h2>Referencing Theorems</h2>
          <p>
            A <code>\label</code> inside the environment (after <code>\begin</code>) records the
            theorem number, exactly as for equations and figures. <code>\ref</code> prints the
            number; <code>cleveref</code> adds the environment&apos;s name:
          </p>
          <pre><code>{`\\usepackage{hyperref}   % optional, for clickable references
\\usepackage{cleveref}   % after hyperref and amsthm

\\begin{theorem}[Pythagoras]
  \\label{thm:pythagoras}
  In a right triangle, $a^2 + b^2 = c^2$.
\\end{theorem}

\\begin{lemma}
  \\label{lem:aux}
  ...
\\end{lemma}

By Theorem~\\ref{thm:pythagoras} ...        % Theorem 1.1
By \\cref{thm:pythagoras} ...               % theorem 1.1
\\Cref{thm:pythagoras,lem:aux} show ...     % Theorem 1.1 and Lemma 1.2`}</code></pre>
          <p>
            cleveref learns the name of each environment from its <code>\newtheorem</code>{' '}
            declaration. To change the wording or capitalise it everywhere, set it once:{' '}
            <code>{`\\crefname{theorem}{Theorem}{Theorems}`}</code>, or load cleveref with the{' '}
            <code>capitalise</code> option. The same labels work with{' '}
            <code>\autoref</code> from hyperref, which prints &ldquo;Theorem 1.1&rdquo; using{' '}
            <code>\theoremautorefname</code>.
          </p>

          {/* ── Alternatives ── */}
          <h2>thmtools, ntheorem and Theorem Boxes with tcolorbox</h2>

          <h3>thmtools</h3>
          <p>
            <code>thmtools</code> is a layer on top of amsthm with a key&ndash;value interface. It
            is handy when you want many environments with slightly different settings, and it
            adds a list of theorems:
          </p>
          <pre><code>{`\\usepackage{amsthm}
\\usepackage{thmtools}

\\declaretheorem[name=Theorem, numberwithin=section]{theorem}
\\declaretheorem[name=Lemma, numberwithin=section]{lemma}
\\declaretheorem[name=Remark, style=remark, numbered=no]{remark}

\\listoftheorems   % like \\listoffigures, for theorems`}</code></pre>
          <p>
            The <code>sibling=theorem</code> key is thmtools&apos; equivalent of the{' '}
            <code>[theorem]</code> optional argument for sharing a counter. Note that thmtools has
            not kept pace with recent LaTeX kernel releases: on the newest TeX Live, shared
            counters fail with <em>Command \c@lemma already defined</em> as soon as thmtools is
            loaded. If you hit that, drop thmtools and use plain amsthm, which handles everything in
            this guide.
          </p>

          <h3>ntheorem</h3>
          <p>
            <code>ntheorem</code> is an older alternative to amsthm with its own styles and
            automatic end marks (<code>{`\\usepackage[thmmarks, amsmath]{ntheorem}`}</code>). It
            works, but it is not compatible with amsthm; pick one package per document. New
            documents should use amsthm, which every journal class understands.
          </p>

          <h3>Colored theorem boxes with tcolorbox</h3>
          <p>
            For lecture notes and textbooks, <code>tcolorbox</code> can draw each theorem in a
            framed, shaded box. <code>\newtcbtheorem</code> defines a numbered environment that
            takes a title and a label suffix as arguments:
          </p>
          <pre><code>{`\\usepackage[most]{tcolorbox}

\\newtcbtheorem[number within=section]{boxthm}{Theorem}{%
  colback=blue!5, colframe=blue!60!black,
  fonttitle=\\bfseries, separator sign={.}
}{thm}

\\begin{boxthm}{Pythagoras}{pyth}
  In a right triangle, $a^2 + b^2 = c^2$.
\\end{boxthm}

See Theorem~\\ref{thm:pyth}.   % the label is prefix:suffix`}</code></pre>
          <p>
            Use an empty first argument, <code>{`\\begin{boxthm}{}{pyth}`}</code>, for a theorem with
            no name. tcolorbox theorems have their own counters, so if you mix them with amsthm
            environments, give them the amsthm counter with{' '}
            <code>use counter*=theorem</code> in the options (<code>use counter=</code> without the star would overwrite amsthm&apos;s numbering format).
          </p>

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
                <td><em>Environment theorem undefined</em></td>
                <td>No <code>\newtheorem</code> in the preamble; amsthm provides <code>proof</code> only</td>
                <td>Add <code>{`\\newtheorem{theorem}{Theorem}`}</code> before <code>{`\\begin{document}`}</code></td>
              </tr>
              <tr>
                <td><em>Environment proof undefined</em></td>
                <td><code>amsthm</code> not loaded</td>
                <td><code>{`\\usepackage{amsthm}`}</code></td>
              </tr>
              <tr>
                <td><em>Command \proof already defined</em></td>
                <td><code>{`\\newtheorem{proof}{Proof}`}</code> with amsthm loaded, or an AMS class that already defines it</td>
                <td>Delete the <code>\newtheorem</code>; use the built-in <code>proof</code> environment</td>
              </tr>
              <tr>
                <td>QED box on its own line after an equation</td>
                <td>The proof ends with a display and nothing after it</td>
                <td>Add <code>\qedhere</code> inside the last display or list item</td>
              </tr>
              <tr>
                <td>Two QED symbols</td>
                <td><code>\qed</code> written manually inside a <code>proof</code> environment</td>
                <td>Remove <code>\qed</code>; use <code>\qedhere</code> if placement is the issue</td>
              </tr>
              <tr>
                <td>Theorems numbered 0.1, 0.2 in an <code>article</code></td>
                <td><code>[section]</code> used but no <code>\section</code> precedes the theorem</td>
                <td>Add a section, or number without <code>[section]</code></td>
              </tr>
              <tr>
                <td>Lemma numbering restarts at 1</td>
                <td>Lemma has its own counter</td>
                <td><code>{`\\newtheorem{lemma}[theorem]{Lemma}`}</code> to share the theorem counter</td>
              </tr>
              <tr>
                <td>&ldquo;The \qedhere command may not work correctly here&rdquo;, QED in the wrong place</td>
                <td><code>amsthm</code> loaded before <code>amsmath</code></td>
                <td>Load <code>amsmath</code> first, then <code>amsthm</code></td>
              </tr>
              <tr>
                <td><code>\theoremstyle</code> has no effect</td>
                <td>It was issued after the <code>\newtheorem</code> it was meant for</td>
                <td>Put <code>\theoremstyle</code> before the declarations it applies to</td>
              </tr>
              <tr>
                <td><code>\cref</code> prints <strong>??</strong> or the wrong name</td>
                <td>Not compiled twice, or <code>\label</code> placed before <code>\begin</code></td>
                <td>Compile twice; put <code>\label</code> inside the environment</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}
\\usepackage[hidelinks]{hyperref}
\\usepackage{cleveref}

\\theoremstyle{plain}
\\newtheorem{theorem}{Theorem}[section]
\\newtheorem{lemma}[theorem]{Lemma}
\\newtheorem{corollary}[theorem]{Corollary}

\\theoremstyle{definition}
\\newtheorem{definition}[theorem]{Definition}

\\theoremstyle{remark}
\\newtheorem*{remark}{Remark}

\\renewcommand{\\qedsymbol}{$\\blacksquare$}

\\begin{document}

\\section{Divisibility}

\\begin{definition}
  \\label{def:even}
  An integer $n$ is \\emph{even} if $n = 2k$ for some integer $k$.
\\end{definition}

\\begin{lemma}
  \\label{lem:square}
  If $n$ is even, then $n^2$ is even.
\\end{lemma}

\\begin{proof}
  Write $n = 2k$ as in \\cref{def:even}. Then
  \\[
    n^2 = 4k^2 = 2(2k^2),
  \\]
  which is even. \\qedhere
\\end{proof}

\\begin{theorem}[Euclid]
  \\label{thm:euclid}
  There are infinitely many primes.
\\end{theorem}

\\begin{proof}[Proof of \\Cref{thm:euclid}]
  Suppose $p_1, \\dots, p_n$ are all the primes and let
  $N = p_1 p_2 \\cdots p_n + 1$. No $p_i$ divides $N$, so $N$ has a
  prime factor not in the list, a contradiction.
\\end{proof}

\\begin{corollary}
  \\label{cor:unbounded}
  The set of primes is unbounded.
\\end{corollary}

\\begin{remark}
  \\Cref{cor:unbounded} follows from \\cref{thm:euclid} because a finite
  set of integers is bounded. \\Cref{lem:square} was not needed.
\\end{remark}

\\end{document}`}</code></pre>
          <p>
            Compile twice. Definition 1.1, Lemma 1.2, Theorem 1.3 and Corollary 1.4 share one
            counter, the remark is unnumbered, and every proof ends with a filled square.
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
              <tr><td>Load the package</td><td><code>{`\\usepackage{amsmath}`}</code> then <code>{`\\usepackage{amsthm}`}</code></td></tr>
              <tr><td>Numbered theorem</td><td><code>{`\\newtheorem{theorem}{Theorem}`}</code></td></tr>
              <tr><td>Numbered within sections</td><td><code>{`\\newtheorem{theorem}{Theorem}[section]`}</code></td></tr>
              <tr><td>Share the theorem counter</td><td><code>{`\\newtheorem{lemma}[theorem]{Lemma}`}</code></td></tr>
              <tr><td>Unnumbered</td><td><code>{`\\newtheorem*{remark}{Remark}`}</code></td></tr>
              <tr><td>Style</td><td><code>{`\\theoremstyle{plain}`}</code> / <code>definition</code> / <code>remark</code> before <code>\newtheorem</code></td></tr>
              <tr><td>Named theorem</td><td><code>{`\\begin{theorem}[Pythagoras]`}</code></td></tr>
              <tr><td>Proof</td><td><code>{`\\begin{proof} ... \\end{proof}`}</code></td></tr>
              <tr><td>Custom proof heading</td><td><code>{`\\begin{proof}[Proof of Theorem~\\ref{thm:main}]`}</code></td></tr>
              <tr><td>QED after an equation or list item</td><td><code>\qedhere</code> at the end of the display or item</td></tr>
              <tr><td>Filled QED square</td><td><code>{`\\renewcommand{\\qedsymbol}{$\\blacksquare$}`}</code> (amssymb)</td></tr>
              <tr><td>No QED symbol</td><td><code>{`\\renewcommand{\\qedsymbol}{}`}</code></td></tr>
              <tr><td>Manual QED symbol</td><td><code>\qed</code></td></tr>
              <tr><td>Reference a theorem</td><td><code>{`\\label{thm:x}`}</code> inside; <code>{`\\ref{thm:x}`}</code> or <code>{`\\cref{thm:x}`}</code></td></tr>
              <tr><td>Number before name</td><td><code>\swapnumbers</code> before <code>\newtheorem</code></td></tr>
              <tr><td>Boxed theorem</td><td><code>{`\\newtcbtheorem{boxthm}{Theorem}{options}{thm}`}</code> (tcolorbox)</td></tr>
              <tr><td>List of theorems</td><td><code>\listoftheorems</code> (thmtools)</td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Theorems in place? These guides cover what goes inside them:</p>
          <ul>
            <li><Link href="/learn/equation-numbering">Equation Numbering and Referencing</Link> &ndash; \label, \eqref, align and split for the equations in your proofs</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; Fractions, roots, operators and the amsmath environments</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> &ndash; Set notation, logic symbols and arrows for theorem statements</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> &ndash; Big operators and limits in displayed math</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; Clickable theorem references with hyperref and cleveref</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test theorem styles with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX Converter</Link> &ndash; Turn handwritten or typed math into LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write proofs faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up amsthm for you, places the QED symbol correctly,
              and compiles your document in seconds.
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
    title: 'Theorems, Lemmas and Proofs in LaTeX: amsthm, \\newtheorem and the QED Symbol',
    description: 'How to write theorems, lemmas, definitions and proofs in LaTeX with amsthm: \\newtheorem with numbering within sections and shared counters, theorem styles, the proof environment, placing the end-of-proof (QED) symbol with \\qedhere, changing it to a filled square, referencing theorems with \\ref and cleveref, boxed theorems with tcolorbox, and common errors.',
    keywords: 'latex theorem, end of proof symbol latex, theorem definition latex, latex newtheorem, amsthm, latex proof environment, latex qed symbol, qedhere, latex lemma, latex theorem numbering, latex theoremstyle, latex blacksquare, latex proof box, latex corollary, latex definition environment, thmtools, tcolorbox theorem, latex reference theorem',
    openGraph: mergeOpenGraph({
      title: 'Theorems, Lemmas and Proofs in LaTeX: amsthm, \\newtheorem and the QED Symbol',
      description: 'Theorems and proofs in LaTeX with amsthm: \\newtheorem, shared counters, theorem styles, the proof environment, \\qedhere, changing the QED symbol, and referencing theorems.',
      type: 'article',
      url: '/learn/theorems-proofs',
    }),
    twitter: {
      card: 'summary_large_image',
      title: 'Theorems and Proofs in LaTeX',
      description: 'Set up amsthm, number theorems and lemmas, and place the QED symbol correctly.',
    },
    alternates: {
      canonical: '/learn/theorems-proofs',
    },
  }
}
