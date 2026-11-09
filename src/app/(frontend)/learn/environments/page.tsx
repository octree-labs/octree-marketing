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

const breadcrumbs = getLearnBreadcrumbs('Environments in LaTeX', 'environments')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'environments',
  title: 'Environments in LaTeX: \\begin, \\end and Defining Your Own',
  seoTitle: 'Environments in LaTeX: \\begin, \\end and Your Own',
  description: 'LaTeX environments explained: \\begin and \\end, common environments, \\newenvironment, a numbered example environment with amsthm, arguments and fixes.',
  keywords: 'example environment latex, latex example environment, example in latex, latex environments, environments in latex, latex environment, begin end latex, newenvironment, latex newenvironment, renewenvironment, latex define environment, latex custom environment, newtheorem example, amsthm example, latex numbered example, latex environment with arguments, NewDocumentEnvironment, latex environment undefined, ended by end, tcolorbox example',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is an environment in LaTeX?',
    answer:
      'An environment is a block of the document that starts with \\begin{name} and ends with \\end{name} and is formatted in a particular way: a list, a centered block, a table, an equation, a figure or a theorem. Settings made inside an environment, such as a font change, end with it.',
  },
  {
    question: 'How do I create an example environment in LaTeX?',
    answer:
      'For a numbered example, load amsthm and write \\theoremstyle{definition} and \\newtheorem{example}{Example}[section] in the preamble, then use \\begin{example} ... \\end{example}. For an unnumbered example with your own formatting, define it with \\newenvironment{example}{\\par\\noindent\\textbf{Example.} }{\\par}.',
  },
  {
    question: 'What is the difference between \\newenvironment and \\renewenvironment?',
    answer:
      '\\newenvironment defines a new environment and stops with “Command \\name already defined” if the name exists. \\renewenvironment replaces an existing environment and stops with an error if it does not exist. Use \\renewenvironment only to change environments such as quote or abstract that the class already defines.',
  },
  {
    question: 'How do I pass an argument to a LaTeX environment?',
    answer:
      'Give the number of arguments in square brackets: \\newenvironment{note}[1]{\\textbf{#1:} }{}. A second pair of brackets makes the first argument optional with a default: \\newenvironment{note}[1][Note]{...}{...}. The arguments can only be used in the begin code; for access in the end code, use \\NewDocumentEnvironment.',
  },
  {
    question: 'How do I fix “\\begin{itemize} ended by \\end{enumerate}”?',
    answer:
      'Every \\begin needs a matching \\end with the same name, and nested environments must close in reverse order. The message names the environment that is still open and the line where it started; correct the \\end on that line or add the missing one.',
  },
  {
    question: 'Why do I get “Environment example undefined”?',
    answer:
      'No package or class defines an environment of that name. Example environments are not built into LaTeX; define one with \\newtheorem{example}{Example} (amsthm) or \\newenvironment, or load the package that provides it. In Beamer, example is already defined and works without any setup.',
  },
]

export default async function LearnEnvironmentsPage() {
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
          <h1>Environments in LaTeX: \begin, \end and Defining Your Own</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Use one:</strong> <code>{`\\begin{name} ... \\end{name}`}</code>, e.g.{' '}
                <code>itemize</code>, <code>center</code>, <code>figure</code>,{' '}
                <code>equation</code>.
              </li>
              <li>
                <strong>Define one:</strong>{' '}
                <code>{`\\newenvironment{name}{begin code}{end code}`}</code>; change an existing
                one with <code>\renewenvironment</code>.
              </li>
              <li>
                <strong>Numbered example:</strong> <code>{`\\usepackage{amsthm}`}</code>,{' '}
                <code>{`\\theoremstyle{definition}`}</code>,{' '}
                <code>{`\\newtheorem{example}{Example}`}</code>.
              </li>
              <li>
                <strong>With an argument:</strong>{' '}
                <code>{`\\newenvironment{name}[1]{... #1 ...}{...}`}</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsthm}
\\theoremstyle{definition}
\\newtheorem{example}{Example}

\\begin{document}
\\begin{example}
  The sum of the first $n$ odd numbers is $n^2$: $1 + 3 + 5 = 9$.
\\end{example}

\\begin{example}[Geometric series]
  $1 + \\tfrac12 + \\tfrac14 + \\dots = 2$.
\\end{example}
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Environments are the building blocks of a LaTeX document. Everything from the
            document itself to a bulleted list, an aligned equation or a figure is an
            environment, opened with <code>\begin</code> and closed with <code>\end</code>. This
            guide explains how environments work, lists the ones you will use most, and shows
            how to define your own: an example environment with{' '}
            <code>\newenvironment</code>, a numbered one with <code>amsthm</code>, environments
            with arguments, and changes to existing ones with{' '}
            <code>\renewenvironment</code>. Every snippet compiles as shown.
          </p>

          {/* ── basics ── */}
          <h2>How \begin and \end Work</h2>
          <p>
            An environment is everything between <code>{`\\begin{name}`}</code> and{' '}
            <code>{`\\end{name}`}</code>. Some take arguments right after the{' '}
            <code>\begin</code>, in braces when required and in square brackets when optional.
            Environments can be nested, as long as the inner one closes first:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}               % the document environment itself

\\begin{center}                 % no arguments
  A centered line.
\\end{center}

\\begin{minipage}{5cm}          % required argument: the width
  \\begin{itemize}              % nested environment
    \\item Inside a 5\\,cm box.
  \\end{itemize}                % inner one closes first
\\end{minipage}

\\begin{tabular}{lr}            % required argument: column spec
  Left & Right \\\\
\\end{tabular}

\\begin{figure}[h]              % optional argument: placement
  \\centering
  \\fbox{A figure}
  \\caption{Placed here if possible.}
\\end{figure}

\\end{document}`}</code></pre>
          <p>
            An environment is also a group: a declaration such as <code>\bfseries</code> or{' '}
            <code>\small</code> inside it stops at <code>\end</code>. Many environments have a{' '}
            <em>starred</em> version with slightly different behaviour, for example{' '}
            <code>equation*</code> (no number) and <code>figure*</code> (both columns).
          </p>

          {/* ── table ── */}
          <h2>Common LaTeX Environments</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Environment</th>
                  <th>Purpose</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>document</code></td><td>The body of the document</td><td>&ndash;</td></tr>
                <tr><td><code>itemize</code>, <code>enumerate</code>, <code>description</code></td><td>Bulleted, numbered and labelled <Link href="/learn/lists">lists</Link></td><td>&ndash; (<code>enumitem</code> to customize)</td></tr>
                <tr><td><code>center</code>, <code>flushleft</code>, <code>flushright</code></td><td>Centered, left- or right-aligned text</td><td>&ndash;</td></tr>
                <tr><td><code>quote</code>, <code>quotation</code>, <code>verse</code></td><td>Indented quotations and poetry (see <Link href="/learn/quotes">quotes</Link>)</td><td>&ndash;</td></tr>
                <tr><td><code>abstract</code></td><td>The abstract in article and report</td><td>&ndash;</td></tr>
                <tr><td><code>figure</code>, <code>table</code></td><td>Floats with a caption and number</td><td>&ndash;</td></tr>
                <tr><td><code>tabular</code></td><td>The grid of a <Link href="/learn/tables">table</Link></td><td>&ndash;</td></tr>
                <tr><td><code>minipage</code></td><td>A box of fixed width, e.g. for side-by-side content</td><td>&ndash;</td></tr>
                <tr><td><code>verbatim</code></td><td>Text printed exactly as typed, in monospace</td><td>&ndash;</td></tr>
                <tr><td><code>equation</code>, <code>align</code>, <code>gather</code></td><td>Numbered display math (see <Link href="/learn/multiline-equations">multiline equations</Link>)</td><td><code>amsmath</code> for <code>align</code> and <code>gather</code></td></tr>
                <tr><td><code>cases</code>, <code>pmatrix</code>, <code>bmatrix</code></td><td><Link href="/learn/piecewise-functions">Piecewise functions</Link> and <Link href="/learn/matrices">matrices</Link></td><td><code>amsmath</code></td></tr>
                <tr><td><code>proof</code>, <code>theorem</code>-like</td><td><Link href="/learn/theorems-proofs">Theorems and proofs</Link></td><td><code>amsthm</code></td></tr>
                <tr><td><code>titlepage</code></td><td>A custom <Link href="/learn/title-page">title page</Link></td><td>&ndash;</td></tr>
                <tr><td><code>frame</code></td><td>One slide in <Link href="/learn/beamer">Beamer</Link></td><td>beamer class</td></tr>
                <tr><td><code>tikzpicture</code></td><td>A <Link href="/learn/tikz">TikZ</Link> drawing</td><td><code>tikz</code></td></tr>
                <tr><td><code>lstlisting</code></td><td>Source code with syntax highlighting</td><td><code>listings</code></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── newenvironment ── */}
          <h2>Defining an Example Environment with \newenvironment</h2>
          <p>
            <code>\newenvironment</code> creates an environment from two pieces of code: what
            happens at <code>\begin</code> and what happens at <code>\end</code>. An unnumbered
            example environment:
          </p>
          <pre><code>{`\\documentclass{article}

\\newenvironment{example}
  {\\par\\medskip\\noindent\\textbf{Example.}\\ }   % begin code
  {\\par\\medskip}                                % end code

\\begin{document}
Some text before.

\\begin{example}
  To convert 3\\,km to metres, multiply by 1000: 3000\\,m.
\\end{example}

Some text after.
\\end{document}`}</code></pre>
          <p>
            The begin code starts a new paragraph, adds a little space and prints the label;
            the end code finishes the paragraph and adds space again. Anything can go in
            either part, including other environments, as long as they are opened in the
            begin code and closed in the end code. Here the example is indented and set in a
            smaller font by wrapping it in a <code>quote</code>:
          </p>
          <pre><code>{`\\documentclass{article}

\\newenvironment{example}
  {\\begin{quote}\\small\\textbf{Example.}\\ }
  {\\end{quote}}

\\begin{document}
\\begin{example}
  Indented on both sides and in a smaller font, because
  the environment opens a quote and closes it again.
\\end{example}
\\end{document}`}</code></pre>
          <p>
            For a shaded box with a title, the <code>tcolorbox</code> package defines the
            environment for you with <code>\newtcolorbox</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{tcolorbox}

\\newtcolorbox{examplebox}[1][Example]{
  colback=blue!5, colframe=blue!50!black, fonttitle=\\bfseries, title=#1}

\\begin{document}
\\begin{examplebox}
  A boxed example with the default title.
\\end{examplebox}

\\begin{examplebox}[Example: unit conversion]
  $3\\,\\mathrm{km} = 3000\\,\\mathrm{m}$.
\\end{examplebox}
\\end{document}`}</code></pre>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Let AI write the preamble</h3>
            <p className="text-muted-foreground mb-4">
              Describe the environment you need, such as a numbered example, a boxed exercise
              or a solution that can be hidden, and Octree&apos;s AI writes the definition and
              shows the PDF next to the code. Sign up free.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open Octree &rarr;
            </Link>
          </div>

          {/* ── amsthm ── */}
          <h2>Numbered Example Environment with amsthm</h2>
          <p>
            For examples numbered like theorems (&ldquo;Example 1.2&rdquo;), use{' '}
            <code>\newtheorem</code> from <code>amsthm</code>. The <code>definition</code>{' '}
            style sets the body upright, which suits examples better than the italic{' '}
            <code>plain</code> style used for theorems:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amsthm}

\\theoremstyle{plain}
\\newtheorem{theorem}{Theorem}[section]          % numbered within sections
\\theoremstyle{definition}
\\newtheorem{example}[theorem]{Example}          % shares the theorem counter
\\newtheorem*{remark}{Remark}                    % unnumbered

\\begin{document}
\\section{Series}

\\begin{theorem}
  If $|r| < 1$, then $\\sum_{k=0}^{\\infty} r^k = \\frac{1}{1-r}$.
\\end{theorem}

\\begin{example}[Halves]\\label{ex:halves}
  With $r = \\tfrac12$ the sum is $2$.
\\end{example}

\\begin{remark}
  Example~\\ref{ex:halves} uses Theorem~1.1.
\\end{remark}
\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Definition</th>
                  <th>Numbering</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\newtheorem{example}{Example}`}</code></td><td>Example 1, 2, 3 &hellip; through the document</td></tr>
                <tr><td><code>{`\\newtheorem{example}{Example}[section]`}</code></td><td>Example 1.1, 1.2, 2.1 &hellip; reset each section</td></tr>
                <tr><td><code>{`\\newtheorem{example}[theorem]{Example}`}</code></td><td>Shares the counter with <code>theorem</code>: Theorem 1.1, Example 1.2</td></tr>
                <tr><td><code>{`\\newtheorem*{example}{Example}`}</code></td><td>No number</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Styles, proofs and QED symbols are covered in{' '}
            <Link href="/learn/theorems-proofs">theorems and proofs in LaTeX</Link>.
          </p>

          {/* ── arguments ── */}
          <h2>Environments with Arguments</h2>
          <p>
            An optional number in square brackets after the name gives the environment
            arguments, used as <code>#1</code>, <code>#2</code> and so on in the begin code. A
            second pair of brackets makes the first argument optional and sets its default:
          </p>
          <pre><code>{`\\documentclass{article}

% one required argument
\\newenvironment{exercise}[1]
  {\\par\\medskip\\noindent\\textbf{Exercise (#1 points).}\\ }
  {\\par\\medskip}

% first argument optional, default "Note"
\\newenvironment{note}[1][Note]
  {\\par\\noindent\\textit{#1:}\\ }
  {\\par}

\\begin{document}
\\begin{exercise}{10}
  Prove that $\\sqrt{2}$ is irrational.
\\end{exercise}

\\begin{note}
  Uses the default label.
\\end{note}

\\begin{note}[Hint]
  Assume the opposite.
\\end{note}
\\end{document}`}</code></pre>
          <p>
            The arguments are not available in the end code; <code>#1</code> there causes{' '}
            <em>Illegal parameter number</em>. The newer <code>\NewDocumentEnvironment</code>,
            built into LaTeX since 2020, has no such limit and a more flexible argument syntax
            (<code>O{`{default}`}</code> for an optional argument, <code>m</code> for a
            mandatory one):
          </p>
          <pre><code>{`\\documentclass{article}

\\NewDocumentEnvironment{solution}{O{Solution} m}
  {\\par\\noindent\\textbf{#1 to #2.}\\ }
  {\\hfill\\textit{(end of #1)}\\par}

\\begin{document}
\\begin{solution}{Exercise 3}
  $x = 4$.
\\end{solution}

\\begin{solution}[Answer]{Exercise 4}
  $y = 2$.
\\end{solution}
\\end{document}`}</code></pre>

          {/* ── renewenvironment ── */}
          <h2>Changing Existing Environments with \renewenvironment</h2>
          <p>
            <code>\renewenvironment</code> takes the same arguments as{' '}
            <code>\newenvironment</code> but replaces an environment that already exists.
            Often you only need to add something at the start, and then a hook is safer
            because it keeps the original definition:
          </p>
          <pre><code>{`\\documentclass{article}

% Replace quote entirely: italic, with a rule on the left
\\renewenvironment{quote}
  {\\par\\smallskip\\noindent\\hspace{1em}\\vrule\\hspace{0.8em}%
   \\begin{minipage}{0.85\\linewidth}\\itshape}
  {\\end{minipage}\\par\\smallskip}

% Only add to an environment: every center block in sans serif
\\AddToHook{env/center/begin}{\\sffamily}

\\begin{document}
\\begin{quote}
  A quotation in italics with a rule on the left.
\\end{quote}

\\begin{center}
  Centered, now in sans serif.
\\end{center}
\\end{document}`}</code></pre>
          <p>
            <code>\AddToHook</code> is built into LaTeX since 2020; in older installations the{' '}
            <code>etoolbox</code> package offers <code>\AtBeginEnvironment</code> for the same
            purpose. Fonts like <code>\sffamily</code> are explained in{' '}
            <Link href="/learn/fonts">fonts in LaTeX</Link>.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>LaTeX Error: \begin&#123;itemize&#125; on input line 3 ended by \end&#123;enumerate&#125;</em></td>
                  <td>Mismatched names, or nested environments closed in the wrong order</td>
                  <td>Match every <code>\end</code> to its <code>\begin</code>; close the inner environment first</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: \begin&#123;center&#125; on input line 3 ended by \end&#123;document&#125;</em></td>
                  <td>An environment was never closed</td>
                  <td>Add the missing <code>{`\\end{center}`}</code> after the line the message names</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Environment example undefined</em></td>
                  <td>No class or package defines it; typo in the name</td>
                  <td>Define it with <code>\newtheorem</code> or <code>\newenvironment</code>, or load the package (<code>amsmath</code>, <code>mathtools</code>, <code>subcaption</code>&hellip;)</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Command \example already defined</em></td>
                  <td><code>\newenvironment</code> or <code>\newtheorem</code> with a name that exists, e.g. <code>example</code> in Beamer or <code>quote</code></td>
                  <td>Choose another name, or use <code>\renewenvironment</code> to replace it on purpose</td>
                </tr>
                <tr>
                  <td><em>Illegal parameter number in definition of \endexample</em></td>
                  <td><code>#1</code> used in the end code of <code>\newenvironment</code></td>
                  <td>Use <code>\NewDocumentEnvironment</code>, or save the argument in a macro in the begin code</td>
                </tr>
                <tr>
                  <td><em>Missing $ inserted</em> at <code>cases</code> or <code>pmatrix</code></td>
                  <td>A math-only environment used in normal text</td>
                  <td>Put it inside <code>{`\\[ ... \\]`}</code>, <code>equation</code> or <code>$...$</code></td>
                </tr>
                <tr>
                  <td><em>Package amsmath Error: Erroneous nesting of equation structures</em></td>
                  <td><code>align</code> or <code>equation</code> inside <code>{`\\[ ... \\]`}</code> or another display</td>
                  <td>Use <code>align</code> on its own; inside another display use <code>aligned</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is an environment in LaTeX?</h3>
          <p>
            An environment is a block of the document that starts with{' '}
            <code>{`\\begin{name}`}</code> and ends with <code>{`\\end{name}`}</code> and is
            formatted in a particular way: a list, a centered block, a table, an equation, a
            figure or a theorem. Settings made inside an environment, such as a font change,
            end with it.
          </p>
          <h3>How do I create an example environment in LaTeX?</h3>
          <p>
            For a numbered example, load <code>amsthm</code> and write{' '}
            <code>{`\\theoremstyle{definition}`}</code> and{' '}
            <code>{`\\newtheorem{example}{Example}[section]`}</code> in the preamble, then use{' '}
            <code>{`\\begin{example} ... \\end{example}`}</code>. For an unnumbered example with
            your own formatting, define it with{' '}
            <code>{`\\newenvironment{example}{\\par\\noindent\\textbf{Example.} }{\\par}`}</code>.
          </p>
          <h3>What is the difference between \newenvironment and \renewenvironment?</h3>
          <p>
            <code>\newenvironment</code> defines a new environment and stops with &ldquo;Command
            \name already defined&rdquo; if the name exists. <code>\renewenvironment</code>{' '}
            replaces an existing environment and stops with an error if it does not exist. Use{' '}
            <code>\renewenvironment</code> only to change environments such as{' '}
            <code>quote</code> or <code>abstract</code> that the class already defines.
          </p>
          <h3>How do I pass an argument to a LaTeX environment?</h3>
          <p>
            Give the number of arguments in square brackets:{' '}
            <code>{`\\newenvironment{note}[1]{\\textbf{#1:} }{}`}</code>. A second pair of
            brackets makes the first argument optional with a default:{' '}
            <code>{`\\newenvironment{note}[1][Note]{...}{...}`}</code>. The arguments can only
            be used in the begin code; for access in the end code, use{' '}
            <code>\NewDocumentEnvironment</code>.
          </p>
          <h3>How do I fix &ldquo;\begin&#123;itemize&#125; ended by \end&#123;enumerate&#125;&rdquo;?</h3>
          <p>
            Every <code>\begin</code> needs a matching <code>\end</code> with the same name, and
            nested environments must close in reverse order. The message names the environment
            that is still open and the line where it started; correct the <code>\end</code> on
            that line or add the missing one.
          </p>
          <h3>Why do I get &ldquo;Environment example undefined&rdquo;?</h3>
          <p>
            No package or class defines an environment of that name. Example environments are
            not built into LaTeX; define one with <code>{`\\newtheorem{example}{Example}`}</code>{' '}
            (<code>amsthm</code>) or <code>\newenvironment</code>, or load the package that
            provides it. In Beamer, <code>example</code> is already defined and works without
            any setup.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/theorems-proofs">Theorems and Proofs</Link> &ndash; amsthm styles, proofs and QED symbols</li>
            <li><Link href="/learn/lists">Lists in LaTeX</Link> &ndash; itemize, enumerate and description</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> &ndash; align, gather and split</li>
            <li><Link href="/learn/piecewise-functions">Piecewise Functions</Link> &ndash; The cases environment</li>
            <li><Link href="/learn/sections">Sections and Chapters</Link> &ndash; Structuring the document around your environments</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every document builds on</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test a new environment instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe an environment and get the code</li>
            <li><Link href="https://tools.useoctree.com/templates/lecture-notes" target="_blank" rel="noopener noreferrer">Lecture Notes Template</Link> &ndash; Example, theorem and definition environments ready to use</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix environment errors with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI finds the unclosed <code>\begin</code>, defines the
              environments your document is missing and explains every error, with the PDF
              compiled next to your code.
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
