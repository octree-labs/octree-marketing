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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Commands and Macros', 'commands-macros')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'commands-macros',
  title: 'LaTeX Commands and Macros: \\newcommand, \\renewcommand and \\def',
  seoTitle: 'LaTeX Commands and Macros: \\newcommand and \\def',
  description: 'LaTeX commands and macros: define your own with \\newcommand, arguments and defaults, \\renewcommand, \\DeclareMathOperator, \\def, and 40 common LaTeX codes.',
  keywords: 'latex codes, latex commands, latex define, define latex, latex macros, latex newcommand, newcommand latex, latex renewcommand, latex providecommand, latex def, latex def vs newcommand, latex newcommand optional argument, latex newcommand arguments, latex declaremathoperator, latex newdocumentcommand, xparse, latex newenvironment, latex command already defined, illegal parameter number in definition, latex list of commands, latex commands list, common latex commands, latex custom command, latex xspace',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I define a new command in LaTeX?',
    answer:
      'Put \\newcommand{\\name}{definition} in the preamble, for example \\newcommand{\\R}{\\mathbb{R}}, and then write \\R wherever you want the definition. For arguments, give their number in brackets and use #1, #2 in the definition: \\newcommand{\\norm}[1]{\\lVert #1 \\rVert} turns \\norm{x} into ‖x‖.',
  },
  {
    question: 'What is the difference between \\newcommand and \\renewcommand?',
    answer:
      '\\newcommand defines a command that does not exist yet and stops with “Command \\x already defined” if it does. \\renewcommand changes a command that already exists and stops with “Command \\x undefined” if it does not. \\providecommand defines the command only when it is missing and otherwise does nothing.',
  },
  {
    question: 'How do I give a LaTeX command an optional argument?',
    answer:
      'Add the default value as a second bracket: \\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}. The first argument (#1) is now optional and defaults to 2, so \\vecnorm{x} gives the 2-norm and \\vecnorm[\\infty]{x} the infinity norm. \\newcommand allows only one optional argument, and it must come first; use \\NewDocumentCommand for anything more.',
  },
  {
    question: 'Should I use \\def or \\newcommand in LaTeX?',
    answer:
      'Use \\newcommand in documents. \\def is the underlying TeX primitive: it silently overwrites any existing command, including essential ones such as \\end or \\section, and has no syntax for optional arguments. \\newcommand checks the name first and reports an error instead. \\def is still useful in package code and for delimited arguments.',
  },
  {
    question: 'What are LaTeX codes?',
    answer:
      'People often call LaTeX commands “LaTeX codes”. Each starts with a backslash, such as \\section, \\textbf or \\frac, and takes its arguments in braces. The most used ones set up the document (\\documentclass, \\usepackage), structure it (\\section, \\label, \\ref), format text (\\textbf, \\emph) and write math (\\frac, \\sqrt, \\sum).',
  },
  {
    question: 'Why do I get “Illegal parameter number in definition”?',
    answer:
      'The definition uses a #n that the command does not have: #2 in a command declared with [1], or #1 in a command declared with no argument count at all. Make the number in brackets match the highest #n in the definition. Inside the definition of a new environment, the arguments can only be used in the begin code, not in the end code.',
  },
]

export default async function LearnCommandsMacrosPage() {
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
          <h1>LaTeX Commands and Macros: \newcommand, \renewcommand and \def</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>A shortcut:</strong> <code>{`\\newcommand{\\R}{\\mathbb{R}}`}</code> in the
                preamble, then <code>$x \in \R$</code>.
              </li>
              <li>
                <strong>With arguments:</strong>{' '}
                <code>{`\\newcommand{\\norm}[1]{\\lVert #1 \\rVert}`}</code>, used as{' '}
                <code>{`\\norm{x}`}</code>.
              </li>
              <li>
                <strong>Optional first argument:</strong>{' '}
                <code>{`\\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}`}</code> &mdash;{' '}
                <code>[2]</code> arguments, the first defaults to <code>2</code>.
              </li>
              <li>
                <strong>Change an existing command:</strong> <code>\renewcommand</code>; define
                only if missing: <code>\providecommand</code>.
              </li>
              <li>
                <strong>Operator names:</strong> <code>{`\\DeclareMathOperator{\\tr}{tr}`}</code>{' '}
                (amsmath) for upright names with correct spacing.
              </li>
              <li>
                <strong>Avoid <code>\def</code></strong> in documents: it overwrites any command
                without warning. For complex signatures use{' '}
                <code>{`\\NewDocumentCommand{\\name}{O{2} m}{...}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath,amssymb}

\\newcommand{\\R}{\\mathbb{R}}                         % no arguments
\\newcommand{\\norm}[1]{\\lVert #1 \\rVert}            % one argument
\\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}  % optional first argument
\\DeclareMathOperator{\\tr}{tr}                       % operator name
\\renewcommand{\\vec}[1]{\\mathbf{#1}}                % change an existing command

\\begin{document}
Let $\\vec{x} \\in \\R^n$ with $\\norm{\\vec{x}} \\le 1$.
Then $\\vecnorm{\\vec{x}} \\le \\vecnorm[1]{\\vec{x}}$ and $\\tr(A) = \\sum_i a_{ii}$.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Everything you type in LaTeX that starts with a backslash is a command, and a macro is
            simply a command you define yourself. Defining macros is how you keep notation
            consistent (change <code>\R</code> once and every occurrence follows), shorten long
            constructions and give meaning to markup. This guide covers how to define commands
            with <code>\newcommand</code>, with and without arguments, how to change existing ones
            with <code>\renewcommand</code>, when <code>\def</code> and{' '}
            <code>\NewDocumentCommand</code> are the right tool, and lists the 40 LaTeX commands
            (the &ldquo;LaTeX codes&rdquo; people search for) you will use most.
          </p>

          {/* ── newcommand ── */}
          <h2>How to Define a Command in LaTeX with \newcommand</h2>
          <p>
            The full syntax is <code>{`\\newcommand{\\name}[number of arguments][default]{definition}`}</code>.
            Only the name and the definition are required. Put the definitions in the preamble,
            after the packages they use, so that they apply to the whole document:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Example</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Name</td><td><code>{`{\\R}`}</code></td><td>Backslash plus letters only; no digits, no underscores</td></tr>
                <tr><td>Number of arguments</td><td><code>[1]</code></td><td>0 to 9; omit it for a command without arguments</td></tr>
                <tr><td>Default</td><td><code>[2]</code></td><td>Makes argument 1 optional, with this default</td></tr>
                <tr><td>Definition</td><td><code>{`{\\lVert #1 \\rVert}`}</code></td><td>What the command expands to; <code>#1</code> to <code>#9</code> are the arguments</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amssymb}

\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\N}{\\mathbb{N}}
\\newcommand{\\eps}{\\varepsilon}
\\newcommand{\\octree}{\\textsc{Octree}}

\\begin{document}
For every $\\eps > 0$ there is $n \\in \\N$ with $x_n \\in \\R$.
This guide was compiled with \\octree{} in seconds.
\\end{document}`}</code></pre>
          <p>
            A command without arguments swallows the space after it, so{' '}
            <code>\octree is</code> prints &ldquo;Octreeis&rdquo;. Write <code>{`\\octree{} is`}</code>, or
            load the <code>xspace</code> package and end the definition with <code>\xspace</code>,
            which adds a space unless punctuation follows. In math mode the space does not matter,
            because math ignores spaces anyway.
          </p>

          {/* ── arguments ── */}
          <h2>\newcommand with Arguments</h2>
          <p>
            Give the number of arguments in brackets and refer to them as <code>#1</code>,{' '}
            <code>#2</code> and so on. Each argument is passed in its own pair of braces:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\newcommand{\\norm}[1]{\\left\\lVert #1 \\right\\rVert}
\\newcommand{\\abs}[1]{\\left\\lvert #1 \\right\\rvert}
\\newcommand{\\inner}[2]{\\langle #1, #2 \\rangle}
\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}
\\newcommand{\\keyword}[1]{\\textbf{\\emph{#1}}}

\\begin{document}
A \\keyword{norm} satisfies $\\norm{x + y} \\le \\norm{x} + \\norm{y}$ and
$\\abs{\\inner{x}{y}} \\le \\norm{x}\\,\\norm{y}$.
\\[ \\pd{f}{x} + \\pd{f}{y} = 0 \\]
\\end{document}`}</code></pre>
          <p>
            An argument can be used several times or not at all, and the definition can call other
            macros. If an argument is a single token you can leave out the braces (<code>\norm x</code>{' '}
            works), but always bracing them avoids surprises.
          </p>

          {/* ── optional ── */}
          <h2>Optional Arguments in \newcommand</h2>
          <p>
            A second pair of brackets after the argument count gives the first argument a default
            value and makes it optional. The optional argument is written in square brackets when
            the command is used:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

% [2][2]: two arguments, the first is optional with default 2
\\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}
% [1][Note]: one argument, optional, default "Note"
\\newcommand{\\remark}[1][Note]{\\textbf{#1:}\\ }

\\begin{document}
$\\vecnorm{x}$, $\\vecnorm[1]{x}$, $\\vecnorm[\\infty]{x}$

\\remark Optional arguments are in brackets.

\\remark[Warning] Only the first argument can be optional.
\\end{document}`}</code></pre>
          <p>
            <code>\newcommand</code> allows exactly one optional argument and it is always{' '}
            <code>#1</code>. For an optional argument in another position, several optional
            arguments or a starred variant, use <code>\NewDocumentCommand</code> (below).
          </p>

          {/* ── renewcommand ── */}
          <h2>\renewcommand and \providecommand</h2>
          <p>
            <code>\renewcommand</code> has the same syntax but only works on a command that
            already exists. Use it to change the names LaTeX prints, adjust class settings or
            redefine a symbol:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath,amssymb}

\\renewcommand{\\abstractname}{Summary}      % heading of the abstract
\\renewcommand{\\contentsname}{Overview}      % heading of the table of contents
\\renewcommand{\\vec}[1]{\\boldsymbol{#1}}     % bold vectors instead of arrows
\\renewcommand{\\arraystretch}{1.3}           % taller table rows

\\providecommand{\\R}{\\mathbb{R}}             % only if no package defined it

\\begin{document}
\\tableofcontents
\\begin{abstract}
The vector $\\vec{v}$ is bold.
\\end{abstract}
\\section{Introduction}
Text.
\\end{document}`}</code></pre>
          <p>
            <code>\providecommand</code> defines the command only when it does not exist yet and
            quietly does nothing otherwise. It is handy in a file that is <code>\input</code> into
            several documents, or for a macro that a package or class might also define.
          </p>

          {/* ── DeclareMathOperator ── */}
          <h2>Math Operators with \DeclareMathOperator</h2>
          <p>
            For a function name such as tr, rank or argmax, do not define{' '}
            <code>{`\\newcommand{\\tr}{\\text{tr}}`}</code>. <code>\DeclareMathOperator</code> from
            amsmath sets the name upright and adds the same spacing as <code>\sin</code> or{' '}
            <code>\log</code>. The starred form puts limits under the name in display math:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

\\DeclareMathOperator{\\tr}{tr}
\\DeclareMathOperator{\\rank}{rank}
\\DeclareMathOperator*{\\argmax}{arg\\,max}

\\begin{document}
$\\tr A + \\rank B$
\\[ \\hat\\theta = \\argmax_{\\theta \\in \\Theta} L(\\theta) \\]
\\end{document}`}</code></pre>
          <p>
            <code>\DeclareMathOperator</code> only works in the preamble. For a one-off use{' '}
            <code>{`\\operatorname{rank}`}</code> in the body. More on operator names in{' '}
            <Link href="/learn/math-functions">math functions</Link>.
          </p>

          {/* ── def ── */}
          <h2>\def vs \newcommand</h2>
          <p>
            <code>\def</code> is the TeX primitive underneath <code>\newcommand</code>. It
            defines a macro with no safety checks: <code>{`\\def\\end{...}`}</code> silently
            replaces the command that closes every environment, and the document breaks with
            errors far from the cause. <code>\newcommand</code> refuses the same name with
            &ldquo;Command \end already defined&rdquo;.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>\newcommand</code></th>
                  <th><code>\def</code></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Existing name</td><td>Error, nothing overwritten</td><td>Silently overwritten</td></tr>
                <tr><td>Arguments</td><td><code>[2]</code>, then <code>#1 #2</code></td><td><code>{`\\def\\pair#1#2{(#1, #2)}`}</code></td></tr>
                <tr><td>Optional argument</td><td>Yes, one</td><td>No</td></tr>
                <tr><td>Delimited arguments</td><td>No</td><td>Yes: <code>{`\\def\\pt(#1,#2){...}`}</code></td></tr>
                <tr><td>Multi-paragraph arguments</td><td>Yes (<code>\newcommand*</code> forbids them)</td><td>Only with <code>\long\def</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}

% Delimited arguments: something \\newcommand cannot do
\\def\\point(#1,#2){\\ensuremath{(#1;\\,#2)}}
% \\let copies the current meaning of a command
\\let\\oldemph\\emph
\\renewcommand{\\emph}[1]{\\textbf{\\oldemph{#1}}}

\\begin{document}
The \\emph{point} \\point(3,4) lies on the circle.
\\end{document}`}</code></pre>
          <p>
            Use <code>\def</code> for delimited arguments and in package code, and{' '}
            <code>\let</code> to save a command before redefining it. In a document, prefer{' '}
            <code>\newcommand</code> and <code>\renewcommand</code>.
          </p>

          {/* ── NewDocumentCommand ── */}
          <h2>\NewDocumentCommand (xparse)</h2>
          <p>
            <code>\NewDocumentCommand</code> describes every argument with a letter, so it can
            handle what <code>\newcommand</code> cannot: several optional arguments, an optional
            argument after a mandatory one, and starred variants. It came with the{' '}
            <code>xparse</code> package and has been part of the LaTeX kernel since 2020, so no
            package is needed on a current TeX distribution.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Letter</th>
                  <th>Argument type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>m</code></td><td>Mandatory, in braces</td></tr>
                <tr><td><code>o</code></td><td>Optional in brackets, no default; test with <code>{`\\IfValueTF{#1}{...}{...}`}</code></td></tr>
                <tr><td><code>{`O{default}`}</code></td><td>Optional in brackets, with a default</td></tr>
                <tr><td><code>s</code></td><td>An optional star; test with <code>{`\\IfBooleanTF{#1}{...}{...}`}</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}

% s = optional star, m = mandatory, O{2} = optional with default 2
\\NewDocumentCommand{\\pnorm}{s m O{2}}{%
  \\IfBooleanTF{#1}
    {\\left\\lVert #2 \\right\\rVert_{#3}}
    {\\lVert #2 \\rVert_{#3}}%
}
\\RenewDocumentCommand{\\vec}{m}{\\mathbf{#1}}

\\begin{document}
$\\pnorm{\\vec{x}}$, $\\pnorm{\\vec{x}}[\\infty]$, $\\pnorm*{\\frac{\\vec{x}}{2}}[1]$
\\end{document}`}</code></pre>

          {/* ── newenvironment ── */}
          <h2>Defining Environments with \newenvironment</h2>
          <p>
            Environments work the same way, with code for the beginning and code for the end.
            Arguments can only be used in the beginning code:
          </p>
          <pre><code>{`\\documentclass{article}

\\newenvironment{note}[1][Note]
  {\\par\\medskip\\noindent\\textbf{#1.}\\ \\itshape}
  {\\par\\medskip}

\\begin{document}
\\begin{note}
Environments group their content.
\\end{note}
\\begin{note}[Tip]
Use \\verb|\\renewenvironment| to change an existing one.
\\end{note}
\\end{document}`}</code></pre>
          <p>
            For numbered theorem-like environments use <code>\newtheorem</code> instead; see{' '}
            <Link href="/learn/theorems-proofs">theorems and proofs</Link>.
          </p>

          {/* ── 40 commands ── */}
          <h2>The 40 Most Used LaTeX Commands (LaTeX Codes)</h2>
          <p>
            These are the commands that appear in almost every LaTeX document. The package column
            says what to load; an empty cell means the command is built in.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>What it does</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={3}><strong>Document setup</strong></td></tr>
                <tr><td><code>{`\\documentclass{article}`}</code></td><td>Sets the document type (article, report, book, beamer)</td><td></td></tr>
                <tr><td><code>{`\\usepackage{amsmath}`}</code></td><td>Loads a package</td><td></td></tr>
                <tr><td><code>{`\\begin{env} ... \\end{env}`}</code></td><td>Opens and closes an environment</td><td></td></tr>
                <tr><td><code>{`\\title{...}`}</code></td><td>Document title</td><td></td></tr>
                <tr><td><code>{`\\author{...}`}</code></td><td>Author names</td><td></td></tr>
                <tr><td><code>{`\\date{...}`}</code></td><td>Date (<code>\today</code> for today)</td><td></td></tr>
                <tr><td><code>\maketitle</code></td><td>Prints the title block</td><td></td></tr>
                <tr><td><code>\tableofcontents</code></td><td>Prints the table of contents</td><td></td></tr>
                <tr><td colSpan={3}><strong>Structure and references</strong></td></tr>
                <tr><td><code>{`\\section{...}`}</code></td><td>Numbered section; <code>\section*</code> for unnumbered</td><td></td></tr>
                <tr><td><code>{`\\subsection{...}`}</code></td><td>Numbered subsection</td><td></td></tr>
                <tr><td><code>{`\\chapter{...}`}</code></td><td>Chapter (report and book only)</td><td></td></tr>
                <tr><td><code>{`\\label{key}`}</code></td><td>Marks a place to refer to</td><td></td></tr>
                <tr><td><code>{`\\ref{key}`}</code></td><td>Number of a labelled section, figure or equation</td><td></td></tr>
                <tr><td><code>{`\\cite{key}`}</code></td><td>Citation from the bibliography</td><td></td></tr>
                <tr><td><code>{`\\footnote{...}`}</code></td><td>Footnote</td><td></td></tr>
                <tr><td><code>{`\\href{url}{text}`}</code></td><td>Clickable link</td><td>hyperref</td></tr>
                <tr><td colSpan={3}><strong>Text formatting</strong></td></tr>
                <tr><td><code>{`\\textbf{...}`}</code></td><td>Bold</td><td></td></tr>
                <tr><td><code>{`\\textit{...}`}</code></td><td>Italic</td><td></td></tr>
                <tr><td><code>{`\\emph{...}`}</code></td><td>Emphasis (italic, or upright inside italic)</td><td></td></tr>
                <tr><td><code>{`\\underline{...}`}</code></td><td>Underline</td><td></td></tr>
                <tr><td><code>{`\\texttt{...}`}</code></td><td>Monospaced (typewriter) text</td><td></td></tr>
                <tr><td><code>\small</code>, <code>\large</code></td><td>Font size from here on</td><td></td></tr>
                <tr><td colSpan={3}><strong>Layout</strong></td></tr>
                <tr><td><code>{`\\\\`}</code></td><td>Line break</td><td></td></tr>
                <tr><td><code>\newpage</code></td><td>Page break</td><td></td></tr>
                <tr><td><code>\noindent</code></td><td>No indent for this paragraph</td><td></td></tr>
                <tr><td><code>{`\\vspace{1em}`}</code></td><td>Vertical space</td><td></td></tr>
                <tr><td><code>{`\\hspace{1em}`}</code></td><td>Horizontal space</td><td></td></tr>
                <tr><td><code>\centering</code></td><td>Centers the rest of the group or float</td><td></td></tr>
                <tr><td><code>\item</code></td><td>Entry in itemize, enumerate or description</td><td></td></tr>
                <tr><td><code>{`\\includegraphics{file}`}</code></td><td>Inserts an image</td><td>graphicx</td></tr>
                <tr><td><code>{`\\caption{...}`}</code></td><td>Caption of a figure or table</td><td></td></tr>
                <tr><td colSpan={3}><strong>Math</strong></td></tr>
                <tr><td><code>{`\\frac{a}{b}`}</code></td><td>Fraction</td><td></td></tr>
                <tr><td><code>{`\\sqrt{x}`}</code></td><td>Square root; <code>{`\\sqrt[3]{x}`}</code> for cube root</td><td></td></tr>
                <tr><td><code>{`\\sum_{i=1}^{n}`}</code></td><td>Sum with limits</td><td></td></tr>
                <tr><td><code>{`\\int_a^b`}</code></td><td>Integral with limits</td><td></td></tr>
                <tr><td><code>\alpha</code>, <code>\beta</code>, &hellip;</td><td>Greek letters</td><td></td></tr>
                <tr><td><code>\left( ... \right)</code></td><td>Brackets that grow with their content</td><td></td></tr>
                <tr><td><code>{`\\text{...}`}</code></td><td>Upright text inside math</td><td>amsmath</td></tr>
                <tr><td><code>{`\\mathbb{R}`}</code></td><td>Blackboard bold letters</td><td>amssymb</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath,amssymb,graphicx,hyperref}

\\title{A Short Example}
\\author{Ada Lovelace}
\\date{\\today}

\\begin{document}
\\maketitle
\\tableofcontents

\\section{Introduction}\\label{sec:intro}
This is \\textbf{bold}, \\textit{italic}, \\emph{emphasised}, \\underline{underlined}
and \\texttt{monospaced} text.\\footnote{A footnote.} See \\href{https://useoctree.com}{Octree}.

\\subsection{Math}
\\begin{itemize}
  \\item $\\frac{a}{b} + \\sqrt{x} + \\sum_{i=1}^{n} i^2 + \\int_0^1 f(x)\\,dx$
  \\item $\\alpha \\in \\mathbb{R}$ and $\\left( \\frac{1}{2} \\right)$ \\text{ok}
\\end{itemize}
Section~\\ref{sec:intro} is the one you are reading.
\\end{document}`}</code></pre>
          <p>
            For symbols beyond these, see <Link href="/learn/greek-letters-math-symbols">Greek
            letters and math symbols</Link> and{' '}
            <Link href="/learn/special-characters">special characters</Link>; for the basics of
            how a document is put together, start with{' '}
            <Link href="/learn/latex">Learn LaTeX</Link>.
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
                  <td><em>LaTeX Error: Command \R already defined</em></td>
                  <td><code>\newcommand</code> on a name that exists, often defined by a package or class</td>
                  <td>Pick another name, or use <code>\renewcommand</code> if you mean to replace it</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Command \foo undefined</em></td>
                  <td><code>\renewcommand</code> on a name that does not exist</td>
                  <td>Use <code>\newcommand</code> (or <code>\providecommand</code>)</td>
                </tr>
                <tr>
                  <td><em>Illegal parameter number in definition of \norm</em></td>
                  <td><code>#2</code> in a command declared with <code>[1]</code>, or <code>#1</code> without any <code>[n]</code></td>
                  <td>Make <code>[n]</code> match the highest <code>#n</code></td>
                </tr>
                <tr>
                  <td><em>File ended while scanning use of \@argdef</em></td>
                  <td>A missing closing brace in the definition: <code>{`\\newcommand{\\R}{\\mathbb{R}`}</code></td>
                  <td>Count the braces; every <code>{`{`}</code> needs a <code>{`}`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: \mathbb allowed only in math mode</em> or <em>Missing $ inserted</em></td>
                  <td>A math macro such as <code>\R</code> used in running text</td>
                  <td>Write <code>$\R$</code>, or wrap the definition in <code>{`\\ensuremath{...}`}</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Can be used only in preamble</em></td>
                  <td><code>\DeclareMathOperator</code> after <code>{`\\begin{document}`}</code></td>
                  <td>Move it to the preamble, or use <code>{`\\operatorname{...}`}</code></td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em></td>
                  <td>A typo in the command name, or a command from a package that is not loaded</td>
                  <td>Check the spelling; load the package (see the table above)</td>
                </tr>
                <tr>
                  <td>Text runs together after a macro</td>
                  <td>A command without arguments eats the following space</td>
                  <td><code>{`\\octree{} is`}</code>, or <code>\xspace</code> at the end of the definition</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Missing braces are the most common cause of strange output with macros that take
            arguments. Without braces only the next single token is the argument:
          </p>
          <pre><code>{`\\documentclass{article}
\\newcommand{\\keyword}[1]{\\textbf{#1}}
\\begin{document}
\\keyword important     % only the "i" is bold
\\keyword{important}    % the whole word is bold
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I define a new command in LaTeX?</h3>
          <p>
            Put <code>{`\\newcommand{\\name}{definition}`}</code> in the preamble, for example{' '}
            <code>{`\\newcommand{\\R}{\\mathbb{R}}`}</code>, and then write <code>\R</code> wherever
            you want the definition. For arguments, give their number in brackets and use{' '}
            <code>#1</code>, <code>#2</code> in the definition:{' '}
            <code>{`\\newcommand{\\norm}[1]{\\lVert #1 \\rVert}`}</code> turns{' '}
            <code>{`\\norm{x}`}</code> into ‖x‖.
          </p>
          <h3>What is the difference between \newcommand and \renewcommand?</h3>
          <p>
            <code>\newcommand</code> defines a command that does not exist yet and stops with
            &ldquo;Command \x already defined&rdquo; if it does. <code>\renewcommand</code> changes a
            command that already exists and stops with &ldquo;Command \x undefined&rdquo; if it does
            not. <code>\providecommand</code> defines the command only when it is missing and
            otherwise does nothing.
          </p>
          <h3>How do I give a LaTeX command an optional argument?</h3>
          <p>
            Add the default value as a second bracket:{' '}
            <code>{`\\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}`}</code>. The first argument
            (<code>#1</code>) is now optional and defaults to 2, so <code>{`\\vecnorm{x}`}</code>{' '}
            gives the 2-norm and <code>{`\\vecnorm[\\infty]{x}`}</code> the infinity norm.{' '}
            <code>\newcommand</code> allows only one optional argument, and it must come first;
            use <code>\NewDocumentCommand</code> for anything more.
          </p>
          <h3>Should I use \def or \newcommand in LaTeX?</h3>
          <p>
            Use <code>\newcommand</code> in documents. <code>\def</code> is the underlying TeX
            primitive: it silently overwrites any existing command, including essential ones such
            as <code>\end</code> or <code>\section</code>, and has no syntax for optional
            arguments. <code>\newcommand</code> checks the name first and reports an error
            instead. <code>\def</code> is still useful in package code and for delimited
            arguments.
          </p>
          <h3>What are LaTeX codes?</h3>
          <p>
            People often call LaTeX commands &ldquo;LaTeX codes&rdquo;. Each starts with a
            backslash, such as <code>\section</code>, <code>\textbf</code> or <code>\frac</code>,
            and takes its arguments in braces. The most used ones set up the document (
            <code>\documentclass</code>, <code>\usepackage</code>), structure it (
            <code>\section</code>, <code>\label</code>, <code>\ref</code>), format text (
            <code>\textbf</code>, <code>\emph</code>) and write math (<code>\frac</code>,{' '}
            <code>\sqrt</code>, <code>\sum</code>).
          </p>
          <h3>Why do I get &ldquo;Illegal parameter number in definition&rdquo;?</h3>
          <p>
            The definition uses a <code>#n</code> that the command does not have: <code>#2</code>{' '}
            in a command declared with <code>[1]</code>, or <code>#1</code> in a command declared
            with no argument count at all. Make the number in brackets match the highest{' '}
            <code>#n</code> in the definition. Inside the definition of a new environment, the
            arguments can only be used in the begin code, not in the end code.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/math-functions">Math Functions</Link> &ndash; \operatorname and built-in operator names</li>
            <li><Link href="/learn/theorems-proofs">Theorems and Proofs</Link> &ndash; \newtheorem for numbered environments</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters and Math Symbols</Link> &ndash; The symbols to build macros from</li>
            <li><Link href="/learn/blackboard-bold">Blackboard Bold</Link> &ndash; \mathbb for \R, \N and \Z shortcuts</li>
            <li><Link href="/learn/underbrace-overbrace">Underbrace and Overbrace</Link> &ndash; Annotating parts of an equation</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics, from the first document up</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test your macros with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Look up the command for any symbol</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write and debug LaTeX macros with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor writes \newcommand definitions for your notation, explains
              &ldquo;already defined&rdquo; and &ldquo;illegal parameter&rdquo; errors, and
              compiles your document in seconds.
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
