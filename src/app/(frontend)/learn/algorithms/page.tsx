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

const breadcrumbs = getLearnBreadcrumbs('Algorithms in LaTeX', 'algorithms')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'algorithms',
  title: 'Algorithms in LaTeX: algorithm2e, algorithmic and algpseudocode',
  seoTitle: 'Algorithms in LaTeX: algorithm2e and algpseudocode',
  description: 'Write pseudocode in LaTeX: algorithm with algpseudocode (\\State, \\If, \\For), algorithm2e, the old algorithmic, line numbers, captions and errors.',
  keywords: 'latex algorithm, latex algorithmic, algorithms latex, algorithm latex, latex pseudocode, pseudocode in latex, algpseudocode, algorithmicx, algorithm2e, latex algorithm example, latex state if for, latex algorithm line numbers, latex algorithm caption, latex algorithm require ensure, latex procedure function, command algorithmic already defined, state undefined control sequence, some blocks are not closed, latex algorithm float, latex algorithm H',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I write an algorithm in LaTeX?',
    answer:
      'Load \\usepackage{algorithm} and \\usepackage{algpseudocode}. Put \\begin{algorithm} around the pseudocode with a \\caption and \\label, and inside it \\begin{algorithmic}[1] with one command per line: \\State for a statement, \\If{...} … \\EndIf, \\For{...} … \\EndFor and \\Return. The [1] numbers every line.',
  },
  {
    question: 'Which is better, algorithm2e or algpseudocode?',
    answer:
      'Both are widely used. algpseudocode (part of algorithmicx) has one command per line, ends each block with \\EndIf or \\EndFor, and is easy to extend. algorithm2e is a single package with its own algorithm float, braces for blocks, \\; at line ends and built-in options for vertical lines and keyword styles. Pick one and do not load both, since they define the same environment.',
  },
  {
    question: 'What is the difference between algorithmic and algpseudocode?',
    answer:
      'algorithmic is the original package from the algorithms bundle and uses uppercase commands such as \\STATE, \\IF and \\ENDIF. algpseudocode, from the algorithmicx bundle, replaces it with mixed-case commands such as \\State, \\If and \\EndIf, and adds \\Procedure, \\Function and \\Call. Both use an environment named algorithmic, so only one of them can be loaded.',
  },
  {
    question: 'How do I add line numbers to an algorithm?',
    answer:
      'With algorithmic or algpseudocode, give the environment an optional argument: \\begin{algorithmic}[1] numbers every line, [5] every fifth. With algorithm2e, add the package option linesnumbered, or \\LinesNumbered inside one algorithm. A \\label on a line can then be referenced with \\ref to print its number.',
  },
  {
    question: 'Why do I get “Undefined control sequence” at \\State?',
    answer:
      '\\State is an algpseudocode command. The error means that package is not loaded, usually because the old algorithmic package was loaded instead, which spells it \\STATE. Load \\usepackage{algpseudocode} (and remove algorithmic), or switch the commands to uppercase. In algorithm2e there is no \\State at all; lines end with \\; instead.',
  },
  {
    question: 'How do I keep an algorithm from moving to another page?',
    answer:
      'The algorithm environment is a float, like a figure, so LaTeX places it where it fits. Use \\begin{algorithm}[H] to place it exactly where it is in the source; the algorithm package provides [H] itself, and algorithm2e accepts [H] too. Long algorithms that must break across pages can be written without the float, using algorithmic on its own.',
  },
]

export default async function LearnAlgorithmsPage() {
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
          <h1>Algorithms in LaTeX: algorithm2e, algorithmic and algpseudocode</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Recommended:</strong> <code>{`\\usepackage{algorithm}`}</code> (the float with
                a caption) plus <code>{`\\usepackage{algpseudocode}`}</code> (the pseudocode).
              </li>
              <li>
                <strong>Commands:</strong> <code>\State</code>, <code>{`\\If{}`}</code> &hellip;{' '}
                <code>\EndIf</code>, <code>{`\\For{}`}</code> &hellip; <code>\EndFor</code>,{' '}
                <code>{`\\While{}`}</code>, <code>\Return</code>, <code>{`\\Comment{}`}</code>.
              </li>
              <li>
                <strong>Line numbers:</strong> <code>{`\\begin{algorithmic}[1]`}</code>.
              </li>
              <li>
                <strong>Alternative:</strong> <code>algorithm2e</code>, with <code>\;</code> at
                line ends and braces for blocks. Do not combine it with the{' '}
                <code>algorithm</code> package.
              </li>
              <li>
                <strong>Reference:</strong> <code>{`\\label{alg:name}`}</code> after{' '}
                <code>\caption</code>, then <code>{`Algorithm~\\ref{alg:name}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{algorithm}
\\usepackage{algpseudocode}

\\begin{document}
\\begin{algorithm}
\\caption{Sum of positive numbers}\\label{alg:sum}
\\begin{algorithmic}[1]
\\State $s \\gets 0$
\\For{$i \\gets 1$ to $n$}
  \\If{$a_i > 0$}
    \\State $s \\gets s + a_i$
  \\EndIf
\\EndFor
\\State \\Return $s$
\\end{algorithmic}
\\end{algorithm}
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Algorithms in LaTeX are written as pseudocode, set in a numbered float like a figure.
            Three packages do the work, and they are easy to mix up: the original{' '}
            <code>algorithmic</code>, its successor <code>algpseudocode</code> from the
            algorithmicx bundle, and the self-contained <code>algorithm2e</code>. This guide
            compares them, gives a complete example for each, and covers line numbers, captions
            and references, and the errors that come from loading the wrong combination.
          </p>

          {/* ── Comparison ── */}
          <h2>LaTeX Algorithm Packages Compared</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>algorithm</code> + <code>algpseudocode</code></th>
                  <th><code>algorithm</code> + <code>algorithmic</code></th>
                  <th><code>algorithm2e</code></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Status</td><td>Current, most common</td><td>Original, still works</td><td>Current, popular</td></tr>
                <tr><td>Statement</td><td><code>\State</code></td><td><code>\STATE</code></td><td><code>text\;</code></td></tr>
                <tr><td>If block</td><td><code>{`\\If{c}`}</code> &hellip; <code>\EndIf</code></td><td><code>{`\\IF{c}`}</code> &hellip; <code>\ENDIF</code></td><td><code>{`\\If{c}{...}`}</code></td></tr>
                <tr><td>For loop</td><td><code>{`\\For{c}`}</code> &hellip; <code>\EndFor</code></td><td><code>{`\\FOR{c}`}</code> &hellip; <code>\ENDFOR</code></td><td><code>{`\\For{c}{...}`}</code></td></tr>
                <tr><td>Procedures</td><td><code>\Procedure</code>, <code>\Function</code>, <code>\Call</code></td><td>No</td><td><code>\SetKwFunction</code></td></tr>
                <tr><td>Input / output</td><td><code>\Require</code>, <code>\Ensure</code></td><td><code>\REQUIRE</code>, <code>\ENSURE</code></td><td><code>\KwIn</code>, <code>\KwOut</code></td></tr>
                <tr><td>Line numbers</td><td><code>{`\\begin{algorithmic}[1]`}</code></td><td><code>{`\\begin{algorithmic}[1]`}</code></td><td>Option <code>linesnumbered</code></td></tr>
                <tr><td>Float environment</td><td><code>algorithm</code> (from the algorithm package)</td><td><code>algorithm</code> (same)</td><td>Its own <code>algorithm</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The split matters because <code>algorithm</code> and <code>algorithmic</code> are names
            of environments as well as packages. The <code>algorithm</code> package only provides
            the floating box with its caption; what goes inside comes from <code>algorithmic</code>{' '}
            or <code>algpseudocode</code>, which both define an environment named{' '}
            <code>algorithmic</code>. <code>algorithm2e</code> provides everything itself.
          </p>

          {/* ── algpseudocode ── */}
          <h2>LaTeX Algorithm with algorithm and algpseudocode</h2>
          <p>
            A complete example with inputs, a procedure, a loop, a condition, comments and
            numbered lines:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{algorithm}
\\usepackage{algpseudocode}

\\begin{document}
\\begin{algorithm}
\\caption{Binary search}\\label{alg:bsearch}
\\begin{algorithmic}[1]
\\Require sorted array $A[1..n]$, target $x$
\\Ensure index $i$ with $A[i] = x$, or $0$ if $x$ is absent
\\Procedure{BinarySearch}{$A, n, x$}
  \\State $lo \\gets 1$, $hi \\gets n$
  \\While{$lo \\le hi$}
    \\State $mid \\gets \\lfloor (lo + hi)/2 \\rfloor$
    \\If{$A[mid] = x$}
      \\State \\Return $mid$ \\Comment{found}
    \\ElsIf{$A[mid] < x$}
      \\State $lo \\gets mid + 1$
    \\Else
      \\State $hi \\gets mid - 1$
    \\EndIf
  \\EndWhile
  \\State \\Return $0$ \\Comment{not found}
\\EndProcedure
\\end{algorithmic}
\\end{algorithm}

Algorithm~\\ref{alg:bsearch} runs in $O(\\log n)$ time.
\\end{document}`}</code></pre>
          <p>The commands you will use most:</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\State</code></td><td>A statement on its own line</td></tr>
                <tr><td><code>{`\\If{c}`}</code>, <code>{`\\ElsIf{c}`}</code>, <code>\Else</code>, <code>\EndIf</code></td><td><strong>if</strong> c <strong>then</strong> &hellip; <strong>end if</strong></td></tr>
                <tr><td><code>{`\\For{c}`}</code>, <code>{`\\ForAll{c}`}</code>, <code>\EndFor</code></td><td><strong>for</strong> c <strong>do</strong> &hellip; <strong>end for</strong></td></tr>
                <tr><td><code>{`\\While{c}`}</code>, <code>\EndWhile</code></td><td><strong>while</strong> c <strong>do</strong> &hellip;</td></tr>
                <tr><td><code>\Repeat</code>, <code>{`\\Until{c}`}</code></td><td><strong>repeat</strong> &hellip; <strong>until</strong> c</td></tr>
                <tr><td><code>{`\\Procedure{Name}{args}`}</code>, <code>\EndProcedure</code></td><td><strong>procedure</strong> N<small>AME</small>(args)</td></tr>
                <tr><td><code>{`\\Function{Name}{args}`}</code>, <code>\EndFunction</code></td><td><strong>function</strong> N<small>AME</small>(args)</td></tr>
                <tr><td><code>{`\\Call{Name}{args}`}</code></td><td>A call, N<small>AME</small>(args)</td></tr>
                <tr><td><code>\Return</code></td><td><strong>return</strong></td></tr>
                <tr><td><code>{`\\Comment{text}`}</code></td><td>&#9655; text, aligned right</td></tr>
                <tr><td><code>\Require</code>, <code>\Ensure</code></td><td><strong>Require:</strong>, <strong>Ensure:</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Write expressions in math mode (<code>$i \gets i + 1$</code>);{' '}
            <code>\gets</code> prints the assignment arrow &larr;. To print{' '}
            <strong>Input:</strong>/<strong>Output:</strong> instead of Require/Ensure, add{' '}
            <code>{`\\renewcommand{\\algorithmicrequire}{\\textbf{Input:}}`}</code> and the same for{' '}
            <code>\algorithmicensure</code> in the preamble.
          </p>

          {/* ── algorithmic ── */}
          <h2>The Original algorithmic Package</h2>
          <p>
            Older papers and some journal templates use <code>algorithmic</code>, with uppercase
            commands. The structure is the same:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{algorithm}
\\usepackage{algorithmic}

\\begin{document}
\\begin{algorithm}
\\caption{Maximum of a list}\\label{alg:max}
\\begin{algorithmic}[1]
\\REQUIRE list $a_1, \\dots, a_n$ with $n \\ge 1$
\\STATE $m \\gets a_1$
\\FOR{$i = 2$ \\TO $n$}
  \\IF{$a_i > m$}
    \\STATE $m \\gets a_i$
  \\ENDIF
\\ENDFOR
\\RETURN $m$
\\end{algorithmic}
\\end{algorithm}
\\end{document}`}</code></pre>
          <p>
            Do not load <code>algorithmic</code> and <code>algpseudocode</code> together, and
            do not mix their commands: <code>\STATE</code> works only with the first,{' '}
            <code>\State</code> only with the second.
          </p>

          {/* ── algorithm2e ── */}
          <h2>Algorithms with algorithm2e</h2>
          <p>
            <code>algorithm2e</code> is one package that provides both the float and the
            pseudocode. Blocks take their body in braces, every line ends with <code>\;</code>,
            and the package options set the look: <code>ruled</code> for rules around the caption,{' '}
            <code>vlined</code> for vertical lines marking blocks, <code>linesnumbered</code> for
            line numbers.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[ruled,vlined,linesnumbered]{algorithm2e}

\\begin{document}
\\begin{algorithm}
\\caption{Euclid's algorithm}\\label{alg:gcd}
\\KwIn{integers $a \\ge b \\ge 0$}
\\KwOut{$\\gcd(a, b)$}
\\While{$b \\neq 0$}{
  $r \\gets a \\bmod b$\\;
  $a \\gets b$\\;
  $b \\gets r$\\;
}
\\eIf{$a = 1$}{
  \\tcp{$a$ and $b$ were coprime}
  \\Return{$1$}\\;
}{
  \\Return{$a$}\\;
}
\\end{algorithm}

Algorithm~\\ref{alg:gcd} terminates because $b$ strictly decreases.
\\end{document}`}</code></pre>
          <p>
            The main algorithm2e commands are <code>{`\\If{c}{...}`}</code>,{' '}
            <code>{`\\eIf{c}{then}{else}`}</code>, <code>{`\\For{c}{...}`}</code>,{' '}
            <code>{`\\ForEach{c}{...}`}</code>, <code>{`\\While{c}{...}`}</code>,{' '}
            <code>{`\\Repeat{c}{...}`}</code>, <code>{`\\tcp{comment}`}</code> and{' '}
            <code>{`\\Return{x}`}</code>. Custom keywords and function names are declared with{' '}
            <code>\SetKw</code> and <code>\SetKwFunction</code>.
          </p>

          {/* ── Numbering / refs ── */}
          <h2>Line Numbers, Captions and References</h2>
          <p>
            <code>{`\\begin{algorithmic}[1]`}</code> numbers every line; <code>[2]</code> numbers
            every second line. Lines can carry a <code>\label</code> and be referenced like
            equations, and <code>\listofalgorithms</code> prints a list of all algorithms with
            their captions:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{algorithm}
\\usepackage{algpseudocode}
\\floatname{algorithm}{Procedure}          % "Algorithm 1" -> "Procedure 1"

\\begin{document}
\\listofalgorithms

\\begin{algorithm}[H]                      % here, not floating
\\caption{Insertion sort}\\label{alg:isort}
\\begin{algorithmic}[1]
\\For{$j \\gets 2$ to $n$}
  \\State $key \\gets A[j]$; $i \\gets j - 1$
  \\While{$i > 0$ and $A[i] > key$} \\label{line:inner}
    \\State $A[i+1] \\gets A[i]$; $i \\gets i - 1$
  \\EndWhile
  \\State $A[i+1] \\gets key$
\\EndFor
\\end{algorithmic}
\\end{algorithm}

The loop on line~\\ref{line:inner} of Procedure~\\ref{alg:isort}
shifts larger elements to the right.
\\end{document}`}</code></pre>
          <p>
            As with figures, put <code>\label</code> after <code>\caption</code>, and compile
            twice so references resolve. Algorithms float like figures; the{' '}
            <Link href="/learn/images">figures guide</Link> explains float placement in detail.
            To rename the list title, use{' '}
            <code>{`\\renewcommand{\\listalgorithmname}{List of Procedures}`}</code>.
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
                  <td><em>LaTeX Error: Command \algorithmic already defined</em></td>
                  <td><code>algorithmic</code> and <code>algpseudocode</code> are both loaded</td>
                  <td>Keep one; algpseudocode for <code>\State</code>, algorithmic for <code>\STATE</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Command \algorithm already defined</em></td>
                  <td><code>algorithm</code> and <code>algorithm2e</code> are both loaded</td>
                  <td>Use algorithm2e alone, or algorithm with algpseudocode</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> at <code>\State</code></td>
                  <td>algpseudocode is not loaded (often <code>algorithmic</code> is loaded instead), or the code is algorithm2e</td>
                  <td>Load <code>algpseudocode</code>, or use <code>\STATE</code> with algorithmic</td>
                </tr>
                <tr>
                  <td><em>Package algorithmicx Error: Some blocks are not closed!!!</em></td>
                  <td>An <code>\If</code>, <code>\For</code> or <code>\While</code> without its <code>\End...</code></td>
                  <td>Add the missing <code>\EndIf</code>, <code>\EndFor</code> or <code>\EndWhile</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Environment algorithm undefined</em></td>
                  <td>Only algpseudocode is loaded; it has no float</td>
                  <td>Add <code>{`\\usepackage{algorithm}`}</code></td>
                </tr>
                <tr>
                  <td><em>Missing $ inserted</em></td>
                  <td>Subscripts or symbols such as <code>a_i</code> or <code>\gets</code> outside math mode</td>
                  <td>Wrap expressions in <code>$...$</code></td>
                </tr>
                <tr>
                  <td>The algorithm appears on another page</td>
                  <td><code>algorithm</code> is a float</td>
                  <td><code>{`\\begin{algorithm}[H]`}</code>, or <code>[htbp]</code> for more freedom</td>
                </tr>
                <tr>
                  <td>algorithm2e lines run together</td>
                  <td>Missing <code>\;</code> at line ends</td>
                  <td>End each statement with <code>\;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A float cannot break across pages, so an algorithm longer than a page sticks out at
            the bottom. Split it into procedures, or drop the <code>algorithm</code> float and use{' '}
            <code>algorithmic</code> on its own, with a <code>\captionof</code> from the{' '}
            <code>caption</code> package if it still needs a number:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{algorithm}
\\usepackage{algpseudocode}
\\usepackage{caption}

\\begin{document}
\\captionof{algorithm}{A long procedure that may break across pages}
\\label{alg:long}
\\begin{algorithmic}[1]
\\State initialise
\\For{$k \\gets 1$ to $K$}
  \\State step $k$
\\EndFor
\\end{algorithmic}
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write an algorithm in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage{algorithm}`}</code> and{' '}
            <code>{`\\usepackage{algpseudocode}`}</code>. Put <code>{`\\begin{algorithm}`}</code>{' '}
            around the pseudocode with a <code>\caption</code> and <code>\label</code>, and inside
            it <code>{`\\begin{algorithmic}[1]`}</code> with one command per line:{' '}
            <code>\State</code> for a statement, <code>{`\\If{...}`}</code> &hellip;{' '}
            <code>\EndIf</code>, <code>{`\\For{...}`}</code> &hellip; <code>\EndFor</code> and{' '}
            <code>\Return</code>. The <code>[1]</code> numbers every line.
          </p>
          <h3>Which is better, algorithm2e or algpseudocode?</h3>
          <p>
            Both are widely used. algpseudocode (part of algorithmicx) has one command per line,
            ends each block with <code>\EndIf</code> or <code>\EndFor</code>, and is easy to
            extend. algorithm2e is a single package with its own algorithm float, braces for
            blocks, <code>\;</code> at line ends and built-in options for vertical lines and
            keyword styles. Pick one and do not load both, since they define the same
            environment.
          </p>
          <h3>What is the difference between algorithmic and algpseudocode?</h3>
          <p>
            algorithmic is the original package from the algorithms bundle and uses uppercase
            commands such as <code>\STATE</code>, <code>\IF</code> and <code>\ENDIF</code>.
            algpseudocode, from the algorithmicx bundle, replaces it with mixed-case commands such
            as <code>\State</code>, <code>\If</code> and <code>\EndIf</code>, and adds{' '}
            <code>\Procedure</code>, <code>\Function</code> and <code>\Call</code>. Both use an
            environment named algorithmic, so only one of them can be loaded.
          </p>
          <h3>How do I add line numbers to an algorithm?</h3>
          <p>
            With algorithmic or algpseudocode, give the environment an optional argument:{' '}
            <code>{`\\begin{algorithmic}[1]`}</code> numbers every line, <code>[5]</code> every
            fifth. With algorithm2e, add the package option <code>linesnumbered</code>, or{' '}
            <code>\LinesNumbered</code> inside one algorithm. A <code>\label</code> on a line can
            then be referenced with <code>\ref</code> to print its number.
          </p>
          <h3>Why do I get &ldquo;Undefined control sequence&rdquo; at \State?</h3>
          <p>
            <code>\State</code> is an algpseudocode command. The error means that package is not
            loaded, usually because the old algorithmic package was loaded instead, which spells it{' '}
            <code>\STATE</code>. Load <code>{`\\usepackage{algpseudocode}`}</code> (and remove
            algorithmic), or switch the commands to uppercase. In algorithm2e there is no{' '}
            <code>\State</code> at all; lines end with <code>\;</code> instead.
          </p>
          <h3>How do I keep an algorithm from moving to another page?</h3>
          <p>
            The algorithm environment is a float, like a figure, so LaTeX places it where it
            fits. Use <code>{`\\begin{algorithm}[H]`}</code> to place it exactly where it is in the
            source; the algorithm package provides <code>[H]</code> itself, and algorithm2e
            accepts <code>[H]</code> too. Long algorithms that must break across pages can be
            written without the float, using algorithmic on its own.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/blog/pseudocode-generator-latex-algorithms">Pseudocode Generator for LaTeX (blog)</Link> &ndash; Turn a description into algorithm code</li>
            <li><Link href="/learn/code-listings">Code Listings</Link> &ndash; Real source code with listings and minted</li>
            <li><Link href="/learn/images">Figures in LaTeX</Link> &ndash; Float placement, captions and references</li>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> &ndash; The math used inside pseudocode</li>
            <li><Link href="/learn/theorems-proofs">Theorems &amp; Proofs</Link> &ndash; Lemmas and proofs for correctness arguments</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try pseudocode with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="algorithm" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write pseudocode faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor turns a description or a code snippet into algorithmic
              pseudocode, fixes package clashes, and compiles your document in seconds.
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
