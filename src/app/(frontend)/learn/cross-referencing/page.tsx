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

const breadcrumbs = getLearnBreadcrumbs('Cross-Referencing in LaTeX', 'cross-referencing')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'cross-referencing',
  title: 'Cross-Referencing in LaTeX: \\label, \\ref, \\eqref, \\autoref and \\cref',
  seoTitle: 'Cross-Referencing in LaTeX: \\label, \\ref, \\cref',
  description: 'Cross-reference in LaTeX: \\label and \\ref for sections, figures, tables and equations, \\eqref, \\pageref, \\autoref, cleveref, varioref, and fixing ?? marks.',
  keywords: 'latex cross reference, cross reference latex, latex ref, latex label, label ref latex, latex reference figure, latex reference table, latex reference section, latex reference equation, latex eqref, latex pageref, latex autoref, autoref, cleveref, latex cref, cref vs autoref, latex varioref, vref, latex nameref, latex question marks instead of reference, latex ?? reference, latex undefined references, label before caption, hyperref link color, colorlinks, latex hyperref ref, latex reference appendix, latex multiply defined labels',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I reference a figure, table or section in LaTeX?',
    answer:
      'Put \\label{fig:plot} right after the \\caption of the figure (or after \\section{...} for a section), then write Figure~\\ref{fig:plot} in the text. \\ref prints the number, \\pageref{fig:plot} prints the page, and the ~ keeps the word and number on the same line.',
  },
  {
    question: 'Why does my LaTeX reference show ?? instead of a number?',
    answer:
      'LaTeX writes labels to the .aux file during one compile and reads them in the next, so a new reference shows ?? until you compile twice. If it stays, the label is misspelled, missing, or inside a part of the document that is not compiled. The log lists each one as “Reference `key\' on page 1 undefined”.',
  },
  {
    question: 'Why does \\ref give the section number instead of the figure number?',
    answer:
      'The \\label comes before \\caption, or the figure has no caption. A label picks up the last number that was stepped, and inside a figure that is the caption counter only after \\caption has run. Move \\label to just after \\caption, inside the same figure or table.',
  },
  {
    question: 'What is the difference between \\ref, \\autoref and \\cref?',
    answer:
      '\\ref prints only the number, so you type “Figure” yourself. \\autoref from hyperref adds the name (“Figure 3”) automatically. \\cref from cleveref does the same, handles lists and ranges such as “figs. 2 and 3”, and lets you configure every name; \\Cref capitalises it at the start of a sentence.',
  },
  {
    question: 'How do I change the colour of reference links in LaTeX?',
    answer:
      'Load hyperref and set \\hypersetup{colorlinks=true, linkcolor=blue, citecolor=teal, urlcolor=magenta}. colorlinks colours the text instead of drawing boxes; linkcolor covers \\ref, \\eqref, \\cref and the table of contents. Set the colours to black for a printed copy.',
  },
]

export default async function LearnCrossReferencingPage() {
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
          <h1>Cross-Referencing in LaTeX: \label, \ref, \eqref, \autoref and \cref</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Mark it:</strong> <code>{`\\label{fig:plot}`}</code> after{' '}
                <code>\caption</code>, <code>\section</code> or inside an equation.
              </li>
              <li>
                <strong>Refer to it:</strong> <code>{`Figure~\\ref{fig:plot}`}</code>,{' '}
                <code>{`\\eqref{eq:energy}`}</code>, <code>{`\\pageref{fig:plot}`}</code>.
              </li>
              <li>
                <strong>Add the name automatically:</strong> <code>{`\\cref{fig:plot}`}</code> with{' '}
                <code>cleveref</code>, or <code>{`\\autoref{fig:plot}`}</code> with{' '}
                <code>hyperref</code>.
              </li>
              <li>
                <strong>?? in the PDF:</strong> compile twice.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section{Results}\\label{sec:results}
\\begin{equation}
  E = mc^2 \\label{eq:energy}
\\end{equation}
Section~\\ref{sec:results} derives Equation~\\eqref{eq:energy}
on page~\\pageref{eq:energy}.

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Never type a section, figure or equation number by hand. Give the item a label, refer
            to the label, and LaTeX fills in the number, keeping every reference right when you
            reorder chapters or add a figure. This guide covers <code>\label</code> and{' '}
            <code>\ref</code> for each kind of object, <code>\eqref</code> and{' '}
            <code>\pageref</code>, why references show <code>??</code> until the second compile,
            clickable links with <code>hyperref</code>, automatic names with{' '}
            <code>\autoref</code> and <code>cleveref</code>, and <code>varioref</code>. Every
            example compiles with pdfLaTeX.
          </p>

          {/* ── basics ── */}
          <h2>\label and \ref</h2>
          <p>
            <code>{`\\label{key}`}</code> remembers the number of the most recent numbered item:
            the current section, the last caption, an equation or a list item.{' '}
            <code>{`\\ref{key}`}</code> prints that number and <code>{`\\pageref{key}`}</code> the
            page it is on. A prefix in the key (<code>sec:</code>, <code>fig:</code>,{' '}
            <code>tab:</code>, <code>eq:</code>) is only a naming habit, but it keeps hundreds of
            labels readable:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\begin{document}

\\section{Introduction}\\label{sec:intro}
We measure growth (Section~\\ref{sec:method}), plot it in
Figure~\\ref{fig:growth} on page~\\pageref{fig:growth}, list the data in
Table~\\ref{tab:data} and fit Equation~\\eqref{eq:model}.

\\section{Method}\\label{sec:method}
\\subsection{Model}\\label{sec:model}
\\begin{equation}
  y = a e^{bt} \\label{eq:model}
\\end{equation}

\\begin{figure}[ht]
  \\centering
  \\includegraphics[width=0.5\\linewidth]{example-image}
  \\caption{Growth over time.}
  \\label{fig:growth}
\\end{figure}

\\begin{table}[ht]
  \\centering
  \\caption{Measured values.}
  \\label{tab:data}
  \\begin{tabular}{cc}
    $t$ & $y$ \\\\
    0   & 1.0 \\\\
    1   & 2.7
  \\end{tabular}
\\end{table}

\\begin{enumerate}
  \\item First step.
  \\item Second step.\\label{item:second}
\\end{enumerate}
Step~\\ref{item:second} matters most; subsection~\\ref{sec:model} explains why.

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Object</th>
                  <th>Where to put <code>\label</code></th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Section, chapter</td><td>Right after <code>{`\\section{...}`}</code></td><td><code>{`Section~\\ref{sec:intro}`}</code></td></tr>
                <tr><td>Figure</td><td>After <code>\caption</code>, inside <code>figure</code></td><td><code>{`Figure~\\ref{fig:growth}`}</code></td></tr>
                <tr><td>Table</td><td>After <code>\caption</code>, inside <code>table</code></td><td><code>{`Table~\\ref{tab:data}`}</code></td></tr>
                <tr><td>Equation</td><td>Inside <code>equation</code> or on a line of <code>align</code></td><td><code>{`\\eqref{eq:model}`}</code> prints (1)</td></tr>
                <tr><td>List item</td><td>After <code>\item</code></td><td><code>{`\\ref{item:second}`}</code></td></tr>
                <tr><td>Theorem, footnote</td><td>Inside the <code>theorem</code> environment or the footnote text</td><td><code>\ref</code> as usual</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The tie <code>~</code> stops a line break between the word and the number. Equation
            numbering schemes and <code>\tag</code> are covered in{' '}
            <Link href="/learn/equation-numbering">equation numbering</Link>; captions and float
            placement in the <Link href="/learn/images">figures guide</Link>; heading numbering in{' '}
            <Link href="/learn/sections">sections and headings</Link>.
          </p>

          {/* ── two pass ── */}
          <h2>?? Marks and the Two-Pass Rule</h2>
          <p>
            LaTeX reads the document once from top to bottom, so on the first compile it cannot
            know the number of a figure that appears later. It writes every label to the{' '}
            <code>.aux</code> file and prints <code>??</code> for anything it has not yet seen. The
            next compile reads the <code>.aux</code> and fills the numbers in. The log tells you
            when another run is needed:
          </p>
          <pre><code>{`LaTeX Warning: Reference \`fig:growth' on page 1 undefined on input line 7.
LaTeX Warning: There were undefined references.
LaTeX Warning: Label(s) may have changed. Rerun to get cross-references right.`}</code></pre>
          <p>
            <code>latexmk</code>, Octree and Overleaf rerun automatically until the labels settle.
            If a <code>??</code> survives a second compile, the label does not exist under that
            name: check the spelling (keys are case-sensitive) and that the{' '}
            <code>\label</code> is not commented out or in a file the document never inputs.
            Citations work the same way; see <Link href="/learn/bibtex">BibTeX</Link>.
          </p>

          {/* ── hyperref ── */}
          <h2>Clickable References with hyperref and \autoref</h2>
          <p>
            Load <code>hyperref</code> (near the end of the preamble) and every <code>\ref</code>,{' '}
            <code>\eqref</code>, citation and table-of-contents entry becomes a link. It also adds{' '}
            <code>\autoref</code>, which prints the name with the number, and{' '}
            <code>\nameref</code>, which prints the title:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{hyperref}
\\hypersetup{
  colorlinks = true,     % coloured text instead of boxes
  linkcolor  = blue,     % \\ref, \\eqref, table of contents
  citecolor  = teal,     % \\cite
  urlcolor   = magenta   % \\url, \\href
}
\\begin{document}

\\section{Background}\\label{sec:background}
\\begin{equation}
  a^2 + b^2 = c^2 \\label{eq:pythagoras}
\\end{equation}

The theorem in \\autoref{sec:background} (\\nameref{sec:background})
is \\autoref{eq:pythagoras}.

\\end{document}`}</code></pre>
          <p>
            That prints &ldquo;The theorem in section 1 (Background) is Equation 1&rdquo;:{' '}
            <code>hyperref</code> names sections in lower case and equations without
            parentheses. Change a name with{' '}
            <code>{`\\renewcommand{\\sectionautorefname}{Section}`}</code>.
          </p>
          <p>
            Without <code>colorlinks</code>, links get coloured boxes that show on screen but not
            in print. Link styles, <code>\url</code> and <code>\href</code> are covered in the{' '}
            <Link href="/learn/hyperlinks">hyperlinks guide</Link>.
          </p>

          {/* ── cleveref ── */}
          <h2>cleveref: \cref and \Cref</h2>
          <p>
            <code>cleveref</code> goes further than <code>\autoref</code>: it names the type,
            groups several labels, compresses ranges and lets you set every name. Load it{' '}
            <strong>after</strong> <code>hyperref</code> and <code>amsmath</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{hyperref}
\\usepackage[capitalise, noabbrev]{cleveref}
\\begin{document}

\\section{Model}\\label{sec:model}
\\begin{align}
  x &= 1 \\label{eq:a} \\\\
  y &= 2 \\label{eq:b} \\\\
  z &= 3 \\label{eq:c}
\\end{align}

\\Cref{sec:model} defines \\cref{eq:a}, and \\cref{eq:a,eq:b,eq:c}
follow from it; see also \\crefrange{eq:a}{eq:c}.

\\end{document}`}</code></pre>
          <p>
            That prints &ldquo;Section 1 defines Equation (1), and Equations (1) to (3) follow from
            it&rdquo;. Without the options, <code>\cref</code> abbreviates (&ldquo;eq. (1)&rdquo;,
            &ldquo;fig. 2&rdquo;); use <code>\Cref</code> at the start of a sentence. Change a name
            with <code>{`\\crefname{figure}{Fig.}{Figs.}`}</code>.
          </p>

          {/* ── varioref ── */}
          <h2>varioref: References with the Page</h2>
          <p>
            <code>varioref</code>&apos;s <code>\vref</code> adds the page only when it helps:
            nothing if the target is on the same page, &ldquo;on the next page&rdquo; or &ldquo;on
            page 7&rdquo; otherwise. With <code>cleveref</code> loaded after it,{' '}
            <code>\vref</code> also adds the name. The order is <code>varioref</code>, then{' '}
            <code>hyperref</code>, then <code>cleveref</code>:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{varioref}
\\usepackage{hyperref}
\\usepackage{cleveref}
\\begin{document}

As \\vref{fig:map} shows, the route is short.
\\clearpage

\\begin{figure}[ht]
  \\centering
  \\includegraphics[width=0.4\\linewidth]{example-image-a}
  \\caption{The route.}\\label{fig:map}
\\end{figure}

\\end{document}`}</code></pre>

          {/* ── Mistakes ── */}
          <h2>Common Mistakes</h2>
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
                  <td><code>??</code> in the PDF, <em>Reference &lsquo;key&rsquo; on page 1 undefined</em></td>
                  <td>Only one compile, or a misspelled key</td>
                  <td>Compile twice; check the key</td>
                </tr>
                <tr>
                  <td>A figure reference prints the section number</td>
                  <td><code>\label</code> before <code>\caption</code>, or no caption</td>
                  <td>Put <code>\label</code> after <code>\caption</code></td>
                </tr>
                <tr>
                  <td>Reference to <code>equation*</code> or <code>\section*</code> prints the wrong number</td>
                  <td>Unnumbered items have no number of their own</td>
                  <td>Use the numbered form, or <code>{`\\tag{...}`}</code> for an equation</td>
                </tr>
                <tr>
                  <td><em>LaTeX Warning: Label &lsquo;fig:x&rsquo; multiply defined</em></td>
                  <td>The same key used twice, often in a copied figure</td>
                  <td>Give every label a unique key</td>
                </tr>
                <tr>
                  <td><em>Package cleveref Error: cleveref must be loaded after amsmath!</em></td>
                  <td>Wrong package order</td>
                  <td><code>amsmath</code>, <code>varioref</code>, <code>hyperref</code>, then <code>cleveref</code></td>
                </tr>
                <tr>
                  <td>Red or green boxes around every link</td>
                  <td><code>hyperref</code> defaults</td>
                  <td><code>{`\\hypersetup{colorlinks=true}`}</code>, or <code>hidelinks</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I reference a figure, table or section in LaTeX?</h3>
          <p>
            Put <code>{`\\label{fig:plot}`}</code> right after the <code>\caption</code> of the
            figure (or after <code>{`\\section{...}`}</code> for a section), then write{' '}
            <code>{`Figure~\\ref{fig:plot}`}</code> in the text. <code>\ref</code> prints the
            number, <code>{`\\pageref{fig:plot}`}</code> prints the page, and the <code>~</code>{' '}
            keeps the word and number on the same line.
          </p>
          <h3>Why does my LaTeX reference show ?? instead of a number?</h3>
          <p>
            LaTeX writes labels to the <code>.aux</code> file during one compile and reads them in
            the next, so a new reference shows <code>??</code> until you compile twice. If it
            stays, the label is misspelled, missing, or inside a part of the document that is not
            compiled. The log lists each one as &ldquo;Reference `key&apos; on page 1
            undefined&rdquo;.
          </p>
          <h3>Why does \ref give the section number instead of the figure number?</h3>
          <p>
            The <code>\label</code> comes before <code>\caption</code>, or the figure has no
            caption. A label picks up the last number that was stepped, and inside a figure that is
            the caption counter only after <code>\caption</code> has run. Move{' '}
            <code>\label</code> to just after <code>\caption</code>, inside the same figure or
            table.
          </p>
          <h3>What is the difference between \ref, \autoref and \cref?</h3>
          <p>
            <code>\ref</code> prints only the number, so you type &ldquo;Figure&rdquo; yourself.{' '}
            <code>\autoref</code> from <code>hyperref</code> adds the name (&ldquo;Figure
            3&rdquo;) automatically. <code>\cref</code> from <code>cleveref</code> does the same,
            handles lists and ranges such as &ldquo;figs. 2 and 3&rdquo;, and lets you configure
            every name; <code>\Cref</code> capitalises it at the start of a sentence.
          </p>
          <h3>How do I change the colour of reference links in LaTeX?</h3>
          <p>
            Load <code>hyperref</code> and set{' '}
            <code>{`\\hypersetup{colorlinks=true, linkcolor=blue, citecolor=teal, urlcolor=magenta}`}</code>.{' '}
            <code>colorlinks</code> colours the text instead of drawing boxes;{' '}
            <code>linkcolor</code> covers <code>\ref</code>, <code>\eqref</code>,{' '}
            <code>\cref</code> and the table of contents. Set the colours to black for a printed
            copy.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/equation-numbering">Equation Numbering</Link> &ndash; Numbering by section, \tag and \eqref</li>
            <li><Link href="/learn/images">Figures in LaTeX</Link> &ndash; Captions, placement and labels</li>
            <li><Link href="/learn/sections">Sections and Headings</Link> &ndash; Numbered headings you can reference</li>
            <li><Link href="/learn/hyperlinks">Hyperlinks</Link> &ndash; hyperref options, \url and \href</li>
            <li><Link href="/learn/bibtex">BibTeX</Link> &ndash; Citations, which follow the same two-pass rule</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a document and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="reference" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">No more ?? in your PDF</h3>
            <p className="text-muted-foreground mb-4">
              Octree reruns LaTeX until every reference resolves. Its AI finds the label behind a
              stray <code>??</code>, adds missing labels and switches your references to{' '}
              <code>\cref</code>, with the PDF next to your code.
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
