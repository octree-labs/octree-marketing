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

const breadcrumbs = getLearnBreadcrumbs('Code Listings in LaTeX', 'code-listings')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'code-listings',
  title: 'Code Listings in LaTeX: listings, minted and verbatim',
  seoTitle: 'Code Listings in LaTeX: listings, minted, verbatim',
  description: 'Code in LaTeX: lstlisting with language=Python, \\lstinputlisting, \\lstset styling, minted and -shell-escape, verbatim, \\verb and \\lstinline, plus errors.',
  keywords: 'coding in latex, latex listing, listing latex, latex lstlisting, lstlisting python, latex code block, latex code listing, latex source code, latex lstset, lstinputlisting, latex minted, minted shell-escape, latex verbatim, latex verb, lstinline, latex syntax highlighting, latex code style, latex python code, listings package, couldn\'t load requested language, listings utf8, listings extendedchars',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I put code in a LaTeX document?',
    answer:
      'Load the listings package with \\usepackage{listings} and wrap the code in \\begin{lstlisting}[language=Python] … \\end{lstlisting}. For a file on disk use \\lstinputlisting[language=Python]{script.py}, and for code inside a sentence use \\lstinline|x = 1| or \\verb|x = 1|. The verbatim environment prints code with no highlighting and needs no package.',
  },
  {
    question: 'What is the difference between listings and minted?',
    answer:
      'listings is written in TeX, needs no external program and works on every compiler, but its highlighting only knows keywords, comments and strings. minted calls the Python program Pygments, so it highlights far more languages more accurately, but it needs Pygments installed and LaTeX run with -shell-escape. Use listings when you cannot control the compiler, minted when you can.',
  },
  {
    question: 'How do I add colors and line numbers to a listing?',
    answer:
      'Set them with \\lstset in the preamble, after loading xcolor: basicstyle=\\ttfamily\\small for the font, keywordstyle=\\color{blue}, commentstyle=\\color{gray}, stringstyle=\\color{red} for the colors, numbers=left with numberstyle=\\tiny for line numbers, and frame=single for a box. \\lstdefinestyle lets you name a style and apply it with style=name.',
  },
  {
    question: 'Why does minted say “You must invoke LaTeX with the -shell-escape flag”?',
    answer:
      'minted runs Pygments as an external program, which LaTeX blocks by default. Compile with pdflatex -shell-escape (or latexmk -shell-escape), enable shell escape in your editor settings, and make sure Pygments is installed (pip install Pygments). If you cannot enable shell escape, switch to the listings package, which needs no external program.',
  },
  {
    question: 'Which languages does the listings package support?',
    answer:
      'Around a hundred, including Python, Java, C, C++, Matlab, R, SQL, HTML, XML, bash, Fortran, Haskell and TeX. Language names are case-insensitive, and some take a dialect in brackets, such as [Sharp]C for C#. JavaScript, Rust, Go, Kotlin and Swift are not built in; define them with \\lstdefinelanguage or use minted.',
  },
  {
    question: 'How do I write inline code in LaTeX?',
    answer:
      'Use \\verb|code| for plain monospaced text; the delimiter can be any character that does not appear in the code. With the listings package, \\lstinline|code| also applies the current language highlighting, and minted offers \\mintinline{python}|code|. \\verb cannot be used inside the argument of another command such as \\section or \\footnote; use \\texttt with escaped special characters there.',
  },
]

export default async function LearnCodeListingsPage() {
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
          <h1>Code Listings in LaTeX: listings, minted and verbatim</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Code block with highlighting:</strong> <code>{`\\usepackage{listings}`}</code>, then{' '}
                <code>{`\\begin{lstlisting}[language=Python]`}</code> &hellip;{' '}
                <code>{`\\end{lstlisting}`}</code>.
              </li>
              <li>
                <strong>Code from a file:</strong> <code>{`\\lstinputlisting[language=Python]{script.py}`}</code>.
              </li>
              <li>
                <strong>Styling for every listing:</strong> <code>{`\\lstset{basicstyle=\\ttfamily\\small, numbers=left, frame=single}`}</code>{' '}
                in the preamble.
              </li>
              <li>
                <strong>Better highlighting:</strong> <code>{`\\usepackage{minted}`}</code> and{' '}
                <code>{`\\begin{minted}{python}`}</code>; needs Pygments and compiling with{' '}
                <code>-shell-escape</code>.
              </li>
              <li>
                <strong>No package, no colors:</strong> <code>{`\\begin{verbatim}`}</code> &hellip;{' '}
                <code>{`\\end{verbatim}`}</code>.
              </li>
              <li>
                <strong>Inline code:</strong> <code>{`\\verb|x = 1|`}</code> or, with listings,{' '}
                <code>{`\\lstinline|x = 1|`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{listings}
\\usepackage{xcolor}
\\lstset{basicstyle=\\ttfamily\\small, numbers=left, frame=single,
        keywordstyle=\\color{blue}, commentstyle=\\color{gray}}

\\begin{document}
\\begin{lstlisting}[language=Python]
def square(x):
    # return the square of x
    return x * x
\\end{lstlisting}

Inline: \\lstinline|square(3)| or \\verb|square(3)|.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Coding in LaTeX usually means showing code, not writing it: a program in a thesis
            appendix, a snippet in a paper, a command in a tutorial. LaTeX has three tools for
            this. The <code>listings</code> package highlights code with no outside help and
            works on every compiler; <code>minted</code> gives better highlighting through the
            Python library Pygments; and the built-in <code>verbatim</code> environment prints
            code exactly as typed with no colors at all. This guide covers all three, how to
            style a listing, include code from a file, add captions and line numbers, and fix
            the errors each one produces.
          </p>

          {/* ── Comparison ── */}
          <h2>listings vs minted vs verbatim</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>listings</code></th>
                  <th><code>minted</code></th>
                  <th><code>verbatim</code></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Syntax highlighting</td><td>Keywords, comments, strings</td><td>Full, token-by-token (Pygments)</td><td>None</td></tr>
                <tr><td>Languages</td><td>About 100 built in</td><td>500+</td><td>Any (no highlighting)</td></tr>
                <tr><td>External program</td><td>No</td><td>Pygments (Python)</td><td>No</td></tr>
                <tr><td>Needs <code>-shell-escape</code></td><td>No</td><td>Yes (see below)</td><td>No</td></tr>
                <tr><td>Block environment</td><td><code>lstlisting</code></td><td><code>minted</code></td><td><code>verbatim</code></td></tr>
                <tr><td>From a file</td><td><code>\lstinputlisting</code></td><td><code>\inputminted</code></td><td><code>\verbatiminput</code> (verbatim package)</td></tr>
                <tr><td>Inline</td><td><code>\lstinline</code></td><td><code>\mintinline</code></td><td><code>\verb</code></td></tr>
                <tr><td>Line breaking</td><td><code>breaklines=true</code></td><td><code>breaklines</code></td><td>No</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            If you are not sure, start with <code>listings</code>: it compiles anywhere, including
            online editors and journal submission systems where you cannot pass compiler flags.
          </p>

          {/* ── listings ── */}
          <h2>LaTeX Listing with the listings Package</h2>
          <p>
            Load <code>listings</code> in the preamble and put the code between{' '}
            <code>{`\\begin{lstlisting}`}</code> and <code>{`\\end{lstlisting}`}</code>. Everything
            inside is printed as typed, including backslashes, braces and <code>%</code> signs,
            so you do not escape anything. The <code>language</code> option turns on keyword
            highlighting:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{listings}

\\begin{document}
\\begin{lstlisting}[language=Python]
import math

def area(r):
    """Area of a circle with radius r."""
    return math.pi * r**2  # %, \\ and {} are fine

print(area(2))
\\end{lstlisting}
\\end{document}`}</code></pre>
          <p>
            Without a style, keywords are only set in bold. The language names are
            case-insensitive; some need a dialect in square brackets. The most used ones:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Python</td><td><code>language=Python</code></td></tr>
                <tr><td>C / C++</td><td><code>language=C</code>, <code>language=C++</code></td></tr>
                <tr><td>C#</td><td><code>{`language={[Sharp]C}`}</code></td></tr>
                <tr><td>Java</td><td><code>language=Java</code></td></tr>
                <tr><td>MATLAB</td><td><code>language=Matlab</code></td></tr>
                <tr><td>R</td><td><code>language=R</code></td></tr>
                <tr><td>SQL</td><td><code>language=SQL</code></td></tr>
                <tr><td>Shell</td><td><code>language=bash</code></td></tr>
                <tr><td>HTML / XML</td><td><code>language=HTML</code>, <code>language=XML</code></td></tr>
                <tr><td>LaTeX</td><td><code>{`language={[LaTeX]TeX}`}</code></td></tr>
                <tr><td>JavaScript, Rust, Go, Swift</td><td>Not built in: use <code>\lstdefinelanguage</code> or minted</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Captions, labels and a list of listings</h3>
          <p>
            Add <code>caption</code> and <code>label</code> as options. Listings are numbered
            separately from figures and tables, and <code>\lstlistoflistings</code> prints a
            list of them like a list of figures:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{listings}
\\renewcommand{\\lstlistingname}{Code}             % "Listing 1" -> "Code 1"
\\renewcommand{\\lstlistlistingname}{List of Code}

\\begin{document}
\\lstlistoflistings

\\begin{lstlisting}[language=C, caption={Hello world in C}, label={lst:hello}]
#include <stdio.h>
int main(void) { printf("Hello\\n"); return 0; }
\\end{lstlisting}

Code~\\ref{lst:hello} prints a greeting.
\\end{document}`}</code></pre>

          {/* ── lstinputlisting ── */}
          <h2>Including Code from a File with \lstinputlisting</h2>
          <p>
            For real programs, keep the source in its own file and include it, so the document
            always shows the current version. <code>firstline</code> and <code>lastline</code>{' '}
            select a range of lines:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{listings}
\\begin{filecontents*}[overwrite]{fib.py}
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fib(10))
\\end{filecontents*}

\\begin{document}
% the whole file
\\lstinputlisting[language=Python, caption={fib.py}]{fib.py}

% only lines 1 to 5, numbered from 1
\\lstinputlisting[language=Python, firstline=1, lastline=5,
                 numbers=left]{fib.py}
\\end{document}`}</code></pre>
          <p>
            The <code>filecontents*</code> block only creates <code>fib.py</code> so the example
            is self-contained; in your project the file already exists. Paths are relative to the
            main <code>.tex</code> file, e.g. <code>{`\\lstinputlisting{code/fib.py}`}</code>.
          </p>

          {/* ── lstset styling ── */}
          <h2>Styling Code with \lstset</h2>
          <p>
            <code>\lstset</code> in the preamble sets options for every listing. For several
            looks in one document, name each with <code>\lstdefinestyle</code> and pick one per
            listing with <code>style=</code>. A complete, readable style:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{listings}
\\usepackage{xcolor}

\\definecolor{codebg}{rgb}{0.96,0.96,0.96}
\\definecolor{codegreen}{rgb}{0.15,0.5,0.15}
\\definecolor{codepurple}{rgb}{0.55,0.1,0.55}

\\lstdefinestyle{mystyle}{
  backgroundcolor=\\color{codebg},
  basicstyle=\\ttfamily\\footnotesize,
  keywordstyle=\\color{blue}\\bfseries,
  commentstyle=\\color{codegreen}\\itshape,
  stringstyle=\\color{codepurple},
  numbers=left,
  numberstyle=\\tiny\\color{gray},
  numbersep=8pt,
  frame=single,
  rulecolor=\\color{gray!50},
  breaklines=true,
  showstringspaces=false,
  tabsize=4,
  captionpos=b
}
\\lstset{style=mystyle}

\\begin{document}
\\begin{lstlisting}[language=Python, caption={Counting words}]
from collections import Counter

def top_words(text, n=3):
    # split on whitespace and count each word
    counts = Counter(text.lower().split())
    return counts.most_common(n)

print(top_words("the cat and the hat and the bat"))
\\end{lstlisting}
\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>basicstyle</code></td><td>Font of all code, e.g. <code>\ttfamily\small</code></td></tr>
                <tr><td><code>keywordstyle</code>, <code>commentstyle</code>, <code>stringstyle</code></td><td>Look of keywords, comments and strings</td></tr>
                <tr><td><code>numbers=left</code></td><td>Line numbers (<code>numberstyle</code> sets their font)</td></tr>
                <tr><td><code>firstnumber=10</code></td><td>Start numbering at 10</td></tr>
                <tr><td><code>frame=single</code></td><td>Box around the code; <code>lines</code>, <code>tb</code>, <code>leftline</code> are lighter</td></tr>
                <tr><td><code>breaklines=true</code></td><td>Wrap long lines instead of running into the margin</td></tr>
                <tr><td><code>showstringspaces=false</code></td><td>Hide the &blank; marks inside strings</td></tr>
                <tr><td><code>tabsize=4</code></td><td>Width of a tab character</td></tr>
                <tr><td><code>escapeinside=&#123;(*&#125;&#123;*)&#125;</code></td><td>Run LaTeX inside <code>(* ... *)</code> in the code, e.g. math</td></tr>
                <tr><td><code>morekeywords=&#123;self&#125;</code></td><td>Highlight extra words as keywords</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            For a framed, colored box with a title bar around the code, the{' '}
            <code>tcolorbox</code> package has a <code>listings</code> library; see the{' '}
            <Link href="/blog/colored-boxes-latex-tcolorbox-guide">tcolorbox guide</Link>. Colors
            are defined as in the <Link href="/learn/colors">colors guide</Link>.
          </p>

          {/* ── minted ── */}
          <h2>Syntax Highlighting with minted</h2>
          <p>
            <code>minted</code> hands the code to Pygments, the highlighter many websites use,
            so it colors every token correctly and knows hundreds of languages. The price is an
            external program: Pygments must be installed (<code>pip install Pygments</code>), and
            LaTeX must be allowed to run it with the <code>-shell-escape</code> flag.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{minted}
\\setminted{fontsize=\\small, linenos, frame=lines, breaklines}

\\begin{document}
\\begin{minted}{python}
def greet(name: str) -> str:
    return f"Hello, {name}!"
\\end{minted}

Inline: \\mintinline{python}|greet("Ada")|.
\\end{document}`}</code></pre>
          <p>Compile it with shell escape enabled:</p>
          <pre><code>{`pdflatex -shell-escape main.tex
latexmk -pdf -shell-escape main.tex`}</code></pre>
          <p>
            Other useful options are <code>style=friendly</code> (any Pygments color scheme),{' '}
            <code>bgcolor</code> and <code>\inputminted&#123;python&#125;&#123;file.py&#125;</code>{' '}
            for files. Captions work by wrapping the code in{' '}
            <code>{`\\begin{listing}`}</code> with <code>\caption</code> and <code>\label</code>.
            Recent minted versions (3.x) use a helper program that up-to-date TeX
            distributions can allow under restricted shell escape; with older setups the full{' '}
            <code>-shell-escape</code> flag is required. Shell escape lets a document run
            programs, so only enable it for documents you trust.
          </p>

          {/* ── verbatim ── */}
          <h2>verbatim and Inline Code with \verb</h2>
          <p>
            The <code>verbatim</code> environment needs no package: it prints its contents in a
            monospaced font with every character as typed. <code>\verb</code> does the same
            inline; the character right after <code>\verb</code> is the delimiter, so pick one
            that does not appear in the code. With listings loaded, <code>\lstinline</code>{' '}
            works the same way but applies the current language style.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{listings}
\\lstset{basicstyle=\\ttfamily, language=Python}

\\begin{document}
\\begin{verbatim}
$ python3 script.py --input data.csv
  100% done, {42} rows, total = $1,024
\\end{verbatim}

Run \\verb|pip install numpy| first, or \\verb+x|y+ when the code has a bar.
The call \\lstinline|len(items)| is highlighted as Python.
Plain monospace without verbatim: \\texttt{x\\_max = 10\\%}.
\\end{document}`}</code></pre>
          <p>
            <code>verbatim</code> does not wrap long lines; the <code>fancyvrb</code> package
            adds frames, line numbers and font sizes to it with the <code>Verbatim</code>{' '}
            environment. Neither <code>\verb</code> nor any verbatim environment can go inside
            the argument of another command; see the errors below.
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
                  <td><em>Package minted Error: You must invoke LaTeX with the -shell-escape flag</em></td>
                  <td>minted cannot run Pygments without shell escape</td>
                  <td>Compile with <code>-shell-escape</code> (or turn it on in the editor); otherwise switch to <code>listings</code></td>
                </tr>
                <tr>
                  <td><em>Package minted Error: You must have &lsquo;pygmentize&rsquo; installed</em></td>
                  <td>Pygments is missing or not on the PATH LaTeX sees</td>
                  <td><code>pip install Pygments</code>, then restart the editor</td>
                </tr>
                <tr>
                  <td><em>Package Listings Error: Couldn&apos;t load requested language</em></td>
                  <td>The language is not built in (e.g. JavaScript, Rust, Go) or is misspelled, or a dialect is missing</td>
                  <td>Check the name, add the dialect (<code>{`{[Sharp]C}`}</code>), or define it with <code>\lstdefinelanguage</code></td>
                </tr>
                <tr>
                  <td>Accented letters jump to the start of a word, vanish, or give <em>Invalid UTF-8 byte sequence</em></td>
                  <td>listings reads one byte at a time under pdfLaTeX and cannot handle multi-byte UTF-8</td>
                  <td>Add <code>extendedchars=true</code> plus a <code>literate</code> mapping (below), or compile with XeLaTeX/LuaLaTeX, or use minted</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: \verb illegal in argument</em>, or <em>Missing $ inserted</em> from code in a footnote</td>
                  <td><code>\verb</code> or a listing inside <code>\section</code>, <code>\footnote</code>, <code>\caption</code> or a macro argument</td>
                  <td>Use <code>\texttt</code> with escaped characters there, or <code>\lstinline</code> outside the argument</td>
                </tr>
                <tr>
                  <td>Code runs off the right margin</td>
                  <td>Long lines are not wrapped by default</td>
                  <td><code>breaklines=true</code> in <code>\lstset</code> (or <code>breaklines</code> for minted)</td>
                </tr>
                <tr>
                  <td>Odd &blank; symbols in strings</td>
                  <td>listings marks spaces inside strings</td>
                  <td><code>showstringspaces=false</code></td>
                </tr>
                <tr>
                  <td>Indentation is wrong after a tab</td>
                  <td>Tabs are expanded to 8 columns</td>
                  <td><code>tabsize=4</code>, or convert tabs to spaces</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For UTF-8 inside <code>lstlisting</code> with pdfLaTeX, map each character you use to
            a LaTeX command. The number after each replacement is its width in characters:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{listings}
\\lstset{
  extendedchars=true,
  literate={á}{{\\'a}}1 {é}{{\\'e}}1 {ü}{{\\"u}}1 {ö}{{\\"o}}1 {ñ}{{\\~n}}1
}

\\begin{document}
\\begin{lstlisting}[language=Python]
nombre = "José Núñez"   # señal, über, schön
\\end{lstlisting}
\\end{document}`}</code></pre>
          <p>
            Only the characters listed are mapped, so add every one your code contains (here{' '}
            <code>ú</code> and <code>Ñ</code> would still need entries under pdfLaTeX). With
            XeLaTeX or LuaLaTeX, or with minted, no mapping is needed.
          </p>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I put code in a LaTeX document?</h3>
          <p>
            Load the listings package with <code>{`\\usepackage{listings}`}</code> and wrap the
            code in <code>{`\\begin{lstlisting}[language=Python]`}</code> &hellip;{' '}
            <code>{`\\end{lstlisting}`}</code>. For a file on disk use{' '}
            <code>{`\\lstinputlisting[language=Python]{script.py}`}</code>, and for code inside a
            sentence use <code>{`\\lstinline|x = 1|`}</code> or <code>{`\\verb|x = 1|`}</code>.
            The verbatim environment prints code with no highlighting and needs no package.
          </p>
          <h3>What is the difference between listings and minted?</h3>
          <p>
            listings is written in TeX, needs no external program and works on every compiler,
            but its highlighting only knows keywords, comments and strings. minted calls the
            Python program Pygments, so it highlights far more languages more accurately, but it
            needs Pygments installed and LaTeX run with -shell-escape. Use listings when you
            cannot control the compiler, minted when you can.
          </p>
          <h3>How do I add colors and line numbers to a listing?</h3>
          <p>
            Set them with <code>\lstset</code> in the preamble, after loading xcolor:{' '}
            <code>basicstyle=\ttfamily\small</code> for the font,{' '}
            <code>{`keywordstyle=\\color{blue}`}</code>, <code>{`commentstyle=\\color{gray}`}</code>,{' '}
            <code>{`stringstyle=\\color{red}`}</code> for the colors, <code>numbers=left</code>{' '}
            with <code>numberstyle=\tiny</code> for line numbers, and <code>frame=single</code>{' '}
            for a box. <code>\lstdefinestyle</code> lets you name a style and apply it with{' '}
            <code>style=name</code>.
          </p>
          <h3>Why does minted say &ldquo;You must invoke LaTeX with the -shell-escape flag&rdquo;?</h3>
          <p>
            minted runs Pygments as an external program, which LaTeX blocks by default. Compile
            with <code>pdflatex -shell-escape</code> (or <code>latexmk -shell-escape</code>),
            enable shell escape in your editor settings, and make sure Pygments is installed (
            <code>pip install Pygments</code>). If you cannot enable shell escape, switch to the
            listings package, which needs no external program.
          </p>
          <h3>Which languages does the listings package support?</h3>
          <p>
            Around a hundred, including Python, Java, C, C++, Matlab, R, SQL, HTML, XML, bash,
            Fortran, Haskell and TeX. Language names are case-insensitive, and some take a dialect
            in brackets, such as <code>[Sharp]C</code> for C#. JavaScript, Rust, Go, Kotlin and
            Swift are not built in; define them with <code>\lstdefinelanguage</code> or use
            minted.
          </p>
          <h3>How do I write inline code in LaTeX?</h3>
          <p>
            Use <code>{`\\verb|code|`}</code> for plain monospaced text; the delimiter can be any
            character that does not appear in the code. With the listings package,{' '}
            <code>{`\\lstinline|code|`}</code> also applies the current language highlighting, and
            minted offers <code>{`\\mintinline{python}|code|`}</code>. \verb cannot be used inside
            the argument of another command such as <code>\section</code> or{' '}
            <code>\footnote</code>; use <code>\texttt</code> with escaped special characters there.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/blog/latex-code-listings-programming-display">Code Listings in LaTeX (blog)</Link> &ndash; More examples of displaying programs in documents</li>
            <li><Link href="/learn/algorithms">Algorithms in LaTeX</Link> &ndash; Pseudocode with algorithm2e and algpseudocode</li>
            <li><Link href="/learn/colors">Colors in LaTeX</Link> &ndash; Defining the colors used in a code style</li>
            <li><Link href="/learn/special-characters">Special Characters</Link> &ndash; Escaping %, $, _ and &amp; outside code</li>
            <li><Link href="/learn/framebox">Boxes and Frames</Link> &ndash; Frames around text and code</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try listings styles with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="code" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Format code listings faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up a listings style for your language, explains
              &ldquo;Couldn&apos;t load requested language&rdquo; and UTF-8 errors, and compiles
              your document in seconds.
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
