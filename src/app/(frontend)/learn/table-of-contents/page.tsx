import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Table of Contents in LaTeX', 'table-of-contents')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'table-of-contents',
  title: 'Table of Contents in LaTeX: \\tableofcontents, Depth and Styling',
  seoTitle: 'Table of Contents in LaTeX: Depth, Links, Styling',
  description:
    'Table of contents in LaTeX: \\tableofcontents, compiling twice, tocdepth, unnumbered sections, lists of figures, hyperref links, tocloft styling and errors.',
  keywords:
    'table of contents, table of contents example, latex table of contents, table of contents latex, table of contents in latex, toc latex, latex toc depth, titletoc, \\tableofcontents, latex tableofcontents, latex toc, tocdepth, latex tocdepth, secnumdepth, addcontentsline, latex unnumbered section in table of contents, tocloft, latex table of contents dots, hyperref table of contents, clickable table of contents latex, contentsname, latex list of figures, listoffigures, listoftables, tocbibind, beamer table of contents, beamer outline currentsection, latex table of contents not showing',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-16'

const faq: FaqItem[] = [
  {
    question: 'How do I make a table of contents in LaTeX?',
    answer:
      'Put \\tableofcontents where the contents should appear, usually right after \\maketitle, and use \\chapter, \\section and \\subsection for your headings. Compile twice: the first run writes the headings to a .toc file and the second run prints them. latexmk repeats runs until auxiliary files stabilize; check the build log if your editor still shows stale entries.',
  },
  {
    question: 'Why is my LaTeX table of contents empty?',
    answer:
      'The contents are read from the .toc file written by the previous run, so after a single compile the table is empty or out of date. Compile again, or use latexmk. If it stays empty, check that your headings are not starred (\\section* never goes to the contents) and that tocdepth is not set too low.',
  },
  {
    question: 'How do I add an unnumbered section to the table of contents?',
    answer:
      'Follow the starred heading with \\addcontentsline: \\section*{Preface} then \\addcontentsline{toc}{section}{Preface}. With hyperref, put \\phantomsection before \\addcontentsline so the link jumps to the right page.',
  },
  {
    question: 'How do I limit the table of contents to chapters and sections?',
    answer:
      'Set the tocdepth counter in the preamble: \\setcounter{tocdepth}{1} lists parts, chapters and sections only. The levels are part -1 (0 in article), chapter 0, section 1, subsection 2, subsubsection 3, paragraph 4 and subparagraph 5. The setting must come before \\tableofcontents.',
  },
  {
    question: 'How do I make the table of contents clickable?',
    answer:
      'Load hyperref, normally as the last package: \\usepackage{hyperref}. Every entry becomes a link and the PDF gets bookmarks. Add linktoc=all to make the page numbers clickable too, colorlinks to colour the text instead of drawing boxes, or hidelinks for a print version with no visible link styling.',
  },
  {
    question: 'How do I add dots to the table of contents in LaTeX?',
    answer:
      'In article, subsections and lower levels have dotted leaders by default, but sections and parts do not. In report and book, sections have dots but chapters and parts do not. Load tocloft and redefine the leader, for example \\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}} for sections in article, or \\cftchapleader for chapters in report and book.',
  },
]

export default async function TableOfContentsPage() {
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
        datePublished="2026-11-09"
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
          <h1>Table of Contents in LaTeX: \tableofcontents, Depth and Styling</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Quick answer
            </p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Command:</strong> <code>\tableofcontents</code> after{' '}
                <code>\maketitle</code>, then <strong>compile twice</strong> (the first run only
                writes the <code>.toc</code> file).
              </li>
              <li>
                <strong>Depth:</strong> <code>{`\\setcounter{tocdepth}{1}`}</code> lists sections
                only; <code>2</code> adds subsections.
              </li>
              <li>
                <strong>Unnumbered entries:</strong> <code>{`\\section*{Preface}`}</code> then{' '}
                <code>{`\\addcontentsline{toc}{section}{Preface}`}</code>.
              </li>
              <li>
                <strong>Lists and links:</strong> <code>\listoffigures</code>,{' '}
                <code>\listoftables</code>; <code>{`\\usepackage{hyperref}`}</code> makes every
                entry clickable.
              </li>
              <li>
                <strong>Styling and title:</strong> <code>tocloft</code> or <code>titletoc</code>{' '}
                for fonts, dots and spacing;{' '}
                <code>{`\\renewcommand{\\contentsname}{Table of Contents}`}</code> renames
                &ldquo;Contents&rdquo;.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm">
              <code>{`\\documentclass{article}
\\usepackage{hyperref}
\\setcounter{tocdepth}{2}
\\renewcommand{\\contentsname}{Table of Contents}

\\begin{document}

\\tableofcontents
\\listoffigures

\\section*{Preface}
\\addcontentsline{toc}{section}{Preface}

\\section{Introduction}
\\subsection{Background}

\\begin{figure}[h]
  \\centering
  \\rule{3cm}{1cm}
  \\caption{A placeholder figure}
\\end{figure}

\\end{document}`}</code>
            </pre>
          </div>
          <p className="lead">
            A <strong>table of contents</strong> (TOC) lists the chapters and sections of a document
            with their page numbers. In LaTeX you never type the TOC by hand: one command,{' '}
            <code>\tableofcontents</code>, builds it from your headings and keeps the page numbers
            right as the document grows. This guide starts with a three-line version and complete
            examples, then covers depth, unnumbered entries, clickable links, renaming, styling with
            tocloft, lists of figures and tables, and troubleshooting.
          </p>
          <h2 id="minimal">A Table of Contents in Three Lines</h2>
          <p>The smallest working document needs only the command itself and a few headings:</p>
          <pre>
            <code>{`\\documentclass{article}
\\begin{document}
\\tableofcontents

\\section{Introduction}
The table of contents above lists this section.
\\subsection{Background}
And this subsection.
\\section{Method}
And this one.
\\end{document}`}</code>
          </pre>
          <p>
            The result is a &ldquo;Contents&rdquo; heading followed by three entries: section 1 in
            bold with its page number, subsection 1.1 indented with a dotted leader, and section 2.
            There is one catch: <strong>you have to compile twice</strong>.
          </p>
          <p>
            LaTeX stores headings and page numbers in auxiliary files. The contents read the
            previous run&apos;s .toc file, so an empty first pass is normal. Compile again before
            diagnosing missing entries.
          </p>
          <p>
            Use <code>latexmk -pdf main.tex</code> to rerun LaTeX until the auxiliary files
            stabilize. Two runs usually populate a small contents page; a larger contents page may
            need another pass because its new height changes later page numbers.
          </p>
          <h2 id="depth">Controlling Depth: tocdepth and secnumdepth</h2>
          <p>
            Each heading command has a level number. The counter <code>tocdepth</code> decides the
            deepest level that appears in the contents:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Command</th>
                  <th scope="col">Level</th>
                  <th scope="col">Classes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>\part</code>
                  </td>
                  <td>&minus;1 (0 in article)</td>
                  <td>all</td>
                </tr>
                <tr>
                  <td>
                    <code>\chapter</code>
                  </td>
                  <td>0</td>
                  <td>report, book</td>
                </tr>
                <tr>
                  <td>
                    <code>\section</code>
                  </td>
                  <td>1</td>
                  <td>all</td>
                </tr>
                <tr>
                  <td>
                    <code>\subsection</code>
                  </td>
                  <td>2</td>
                  <td>all</td>
                </tr>
                <tr>
                  <td>
                    <code>\subsubsection</code>
                  </td>
                  <td>3</td>
                  <td>all</td>
                </tr>
                <tr>
                  <td>
                    <code>\paragraph</code>
                  </td>
                  <td>4</td>
                  <td>all</td>
                </tr>
                <tr>
                  <td>
                    <code>\subparagraph</code>
                  </td>
                  <td>5</td>
                  <td>all</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The defaults are <code>tocdepth</code> 3 in article (down to subsubsections) and 2 in
            report and book (down to subsections). A second counter, <code>secnumdepth</code>,
            decides the deepest level that gets a <em>number</em>, with the same defaults. The two
            are independent: you can number subsubsections but leave them out of the contents, or
            list headings that have no number.
          </p>
          <pre>
            <code>{`\\documentclass{report}
\\setcounter{tocdepth}{1}
\\setcounter{secnumdepth}{3}
\\begin{document}
\\tableofcontents
\\chapter{Main Part}
\\section{A section}
\\subsection{Numbered, not listed}
\\subsubsection{Numbered as 1.1.1.1}
\\appendix
\\addtocontents{toc}{\\protect\\setcounter{tocdepth}{0}}
\\chapter{Raw Data}
\\section{Hidden from the contents}
\\end{document}`}</code>
          </pre>
          <p>
            The contents show Main Part, A section and Raw Data. Set the overall depth before
            printing the contents; changing it afterward cannot alter entries already read.
          </p>
          <p>
            To change the depth for one part of the document only, the last trick in the example
            writes the counter change <em>into</em> the <code>.toc</code> file with{' '}
            <code>\addtocontents</code>. It takes effect at that point in the contents, so every
            entry after it (here the appendix) is filtered at the new depth. To restore the depth
            for a later chapter, add another <code>\addtocontents</code> line with the old value.
            The <code>\protect</code> is harmless with the current LaTeX kernel and keeps the line
            working on older installations.
          </p>
          <h2 id="unnumbered">Adding Unnumbered Sections, the Bibliography and Appendices</h2>
          <p>
            Starred headings such as <code>\section*</code> and <code>\chapter*</code> are
            unnumbered <em>and</em> never written to the contents. To list one anyway, add the entry
            yourself with <code>\addcontentsline{'{toc}{level}{text}'}</code> right after the
            heading. The bibliography, index and lists of figures are unnumbered chapters or
            sections too, and the <code>tocbibind</code> package adds them for you:
          </p>
          <pre>
            <code>{`\\documentclass{report}
\\usepackage[nottoc]{tocbibind}
\\usepackage{hyperref}

\\begin{document}
\\tableofcontents

\\chapter*{Preface}
\\phantomsection
\\addcontentsline{toc}{chapter}{Preface}
This chapter has no number but still appears in the contents.

\\chapter{Introduction}
See \\cite{knuth84}.
\\section*{A note on notation}
\\phantomsection
\\addcontentsline{toc}{section}{A note on notation}
Unnumbered, listed, and the link lands here.

\\appendix
\\chapter{Proofs}
Appendix chapters are lettered A, B, \\ldots{} in the contents.

\\begin{thebibliography}{9}
\\bibitem{knuth84} D. E. Knuth, \\emph{The \\TeX book}, Addison-Wesley, 1984.
\\end{thebibliography}
\\end{document}`}</code>
          </pre>
          <p>The contents of this document read:</p>
          <pre>
            <code>{`Contents
Preface                                  2
1 Introduction                           3
    A note on notation . . . . . . . .   3
A Proofs                                 4
Bibliography                             5`}</code>
          </pre>
          <ul>
            <li>
              <strong>
                <code>\phantomsection</code>
              </strong>{' '}
              matters only with hyperref. It drops an invisible link target at the current spot.
              Current hyperref already gives <code>\section*</code> and <code>\chapter*</code> a
              target of their own, but older installations do not, and an{' '}
              <code>\addcontentsline</code> that is not right after a heading never has one: the
              entry then links to the previous target, often on the wrong page. Keeping{' '}
              <code>\phantomsection</code> costs nothing.
            </li>
            <li>
              <strong>
                <code>\appendix</code>
              </strong>{' '}
              switches chapter numbering to letters (or section numbering in article) from that
              point on, so appendix entries show up as A, B, C with no extra work.
            </li>
            <li>
              <strong>
                <code>tocbibind</code>
              </strong>{' '}
              adds the bibliography, index, list of figures and list of tables. The{' '}
              <code>nottoc</code> option stops it from also listing the table of contents inside
              itself, which is almost never wanted. It works with <code>thebibliography</code> and
              BibTeX but not with biblatex, whose <code>\printbibliography</code> ignores it; there,
              write <code>\printbibliography[heading=bibintoc]</code> instead.
            </li>
          </ul>
          <p>
            For a document with no section numbers at all, starring every heading is the wrong tool.
            Keep the normal commands and lower <code>secnumdepth</code> instead: <code>0</code>{' '}
            removes the section numbers in article, <code>-1</code> also removes the chapter numbers
            in report and book, and <code>{`\\setcounter{secnumdepth}{-2}`}</code> switches off
            every number, parts included. The numbers disappear but every heading stays in the
            contents. The <Link href="/learn/sections">sections guide</Link> covers the heading
            commands themselves in more detail.
          </p>
          <h2 id="hyperref">Clickable Table of Contents with hyperref</h2>
          <p>
            Loading <code>hyperref</code> is all it takes to turn every contents entry into a link
            and to fill the bookmark panel of the PDF viewer. Load it after the other packages; it
            redefines many commands and most packages expect to come before it.
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{hyperref}
\\hypersetup{
  colorlinks = true,
  linkcolor  = blue,
  urlcolor   = cyan,
  linktoc    = all,
  bookmarksnumbered = true,
  pdftitle   = {Clickable contents}
}
\\begin{document}
\\tableofcontents
\\section{Results for \\texorpdfstring{$x^2$}{x squared}}
Text.
\\section{Discussion}
Text.
\\end{document}`}</code>
          </pre>
          <p>
            By default hyperref draws a red box around each link, visible on screen and not in
            print. <code>colorlinks</code> colours the text instead; <code>linkcolor</code> is the
            option that controls the contents and cross-references. <code>linktoc</code> chooses
            what is clickable: <code>section</code> (the default, the title only), <code>page</code>
            , <code>all</code> or <code>none</code>. For a version that will be printed, or a thesis
            whose rules forbid coloured text, keep the links but hide them:
          </p>
          <pre>
            <code>{`\\usepackage[hidelinks]{hyperref}`}</code>
          </pre>
          <p>
            The <code>\texorpdfstring</code> in the first heading is there because a PDF bookmark
            can only hold plain text. Math or formatting commands in a heading make hyperref print{' '}
            <em>Package hyperref Warning: Token not allowed in a PDF string (Unicode)</em> and drop
            the offending part from the bookmark;{' '}
            <code>\texorpdfstring{'{TeX version}{plain version}'}</code> gives it a plain
            alternative. More link options, including URL styling and <code>\autoref</code>, are in
            the <Link href="/learn/hyperlinks">hyperlinks guide</Link>.
          </p>
          <h2 id="rename">Renaming and placing the contents</h2>
          <p>
            Redefine <code>\contentsname</code> in the preamble to change the title. With babel, put
            the redefinition inside the active language caption hook, such as
            <code>\addto\captionsenglish</code>, so language selection does not overwrite it. In
            article, the contents continue on the current page; use <code>\clearpage</code>
            afterward if the body should begin on a fresh page. Report and book start the contents
            with a chapter-style heading on a new page.
          </p>
          <pre>
            <code>{`\\documentclass{book}
\\renewcommand{\\contentsname}{Table of Contents}
\\begin{document}
\\frontmatter
\\tableofcontents
\\chapter{Acknowledgements}
Thanks to the laboratory team.
\\mainmatter
\\chapter{Introduction}
\\section{Background}
The main text starts here.
\\end{document}`}</code>
          </pre>
          <p>
            In book, <code>\frontmatter</code> uses Roman page numbers and unnumbered chapters that
            still appear in the contents. <code>\mainmatter</code> restarts Arabic page numbers and
            chapter numbering. Article and report do not provide these commands; use{' '}
            <code>\pagenumbering</code> with roman and arabic instead, placing a page break before
            each switch. Hiding a printed page number does not change its underlying value or
            prevent duplicate PDF destinations when numbering is reset.
          </p>

          <h2 id="tocloft">Styling with tocloft</h2>
          <p>
            Use <code>tocloft</code> to adjust entry fonts, indents and dotted leaders. This report
            gives chapters bold sans-serif text and sections italic text with tighter dots.
          </p>
          <pre>
            <code>{`\\documentclass{report}
\\usepackage{tocloft}


\\renewcommand{\\cftchapfont}{\\sffamily\\bfseries}
\\renewcommand{\\cftchappagefont}{\\sffamily\\bfseries}
\\setlength{\\cftbeforechapskip}{1.2em}



\\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}}
\\renewcommand{\\cftdotsep}{3}
\\renewcommand{\\cftsecfont}{\\itshape}
\\renewcommand{\\cftsecpagefont}{\\itshape}
\\setlength{\\cftsecindent}{2em}
\\setlength{\\cftbeforesecskip}{0.3em}


\\renewcommand{\\cfttoctitlefont}{\\hfill\\Large\\bfseries}
\\renewcommand{\\cftaftertoctitle}{\\hfill}

\\begin{document}
\\tableofcontents
\\chapter{Introduction}
\\section{Scope}
\\section{Outline}
\\chapter{Theory}
\\section{Model}
\\subsection{Assumptions}
\\end{document}`}</code>
          </pre>
          <p>
            The most common request is dots after the top-level entries, which the standard classes
            leave out: chapters in report and book, sections in article. One line adds them. In
            article:
          </p>
          <pre>
            <code>{`\\usepackage{tocloft}
\\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}}`}</code>
          </pre>
          <p>
            and <code>\cftchapleader</code> in the same way for chapters. To remove dots everywhere,
            set <code>{`\\renewcommand{\\cftdotsep}{\\cftnodots}`}</code>. Do not combine tocloft
            with <code>memoir</code>, which has the same commands built in, or with the KOMA-Script
            classes, which style their contents through <code>tocbasic</code>.
          </p>
          <h2 id="lists">List of Figures and Tables</h2>
          <p>
            <code>\listoffigures</code> and <code>\listoftables</code> work exactly like{' '}
            <code>\tableofcontents</code>, only their entries come from the <code>\caption</code> of
            each <code>figure</code> and <code>table</code> and are stored in the <code>.lof</code>{' '}
            and <code>.lot</code> files. Long captions make poor list entries, so give a short
            version in the optional argument:
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage[nottoc]{tocbibind}
\\begin{document}
\\tableofcontents
\\listoffigures
\\listoftables
\\clearpage

\\section{Data}
\\begin{figure}[ht]
  \\centering
  \\rule{4cm}{2cm}
  \\caption[Sensor layout]{Sensor layout in the test field, with the three
    depth levels marked and the reference probe at the centre.}
\\end{figure}

\\begin{table}[ht]
  \\centering
  \\caption{Mean moisture by depth}
  \\begin{tabular}{lr}
    Depth & Moisture \\\\ \\hline
    10 cm & 21\\,\\% \\\\
    30 cm & 27\\,\\% \\\\
  \\end{tabular}
\\end{table}
\\end{document}`}</code>
          </pre>
          <p>
            The list of figures shows only &ldquo;1 Sensor layout&rdquo;, while the figure itself
            keeps the full caption. Thanks to <code>tocbibind</code> the table of contents now
            starts with <em>List of Figures</em> and <em>List of Tables</em> entries. Without that
            package, add them by hand with{' '}
            <code>{`\\addcontentsline{toc}{section}{\\listfigurename}`}</code> directly before{' '}
            <code>\listoffigures</code> (use <code>chapter</code> as the level in report and book,
            after a <code>\cleardoublepage</code> so the page number is right). See the{' '}
            <Link href="/blog/insert-images-latex-complete-guide">guide to figures and images</Link>{' '}
            and the <Link href="/learn/tables">tables guide</Link> for the floats themselves.
          </p>
          <h2 id="errors">Common Errors</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Symptom or message</th>
                  <th scope="col">Cause</th>
                  <th scope="col">Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Table of contents is empty or shows old titles</td>
                  <td>
                    The contents come from the <code>.toc</code> file of the previous run
                  </td>
                  <td>
                    Compile again until page numbers settle, or use <code>latexmk</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>No file main.toc.</em> in the log
                  </td>
                  <td>Normal on the first run: the file has not been written yet</td>
                  <td>Nothing; it goes away on the second run</td>
                </tr>
                <tr>
                  <td>A section is missing</td>
                  <td>
                    Starred heading (<code>\section*</code>), or a level deeper than{' '}
                    <code>tocdepth</code>
                  </td>
                  <td>
                    <code>\addcontentsline</code> after the heading, or raise <code>tocdepth</code>
                  </td>
                </tr>
                <tr>
                  <td>Page numbers in the contents are off by one or two after edits</td>
                  <td>
                    The contents grew or shrank and moved the body, but only one run happened since
                  </td>
                  <td>Run LaTeX once more; latexmk detects this and reruns by itself</td>
                </tr>
                <tr>
                  <td>
                    <em>Package hyperref Warning: Token not allowed in a PDF string (Unicode)</em>
                  </td>
                  <td>Math or a formatting command in a heading that goes into a PDF bookmark</td>
                  <td>
                    <code>\texorpdfstring{'{tex}{plain text}'}</code> in the heading
                  </td>
                </tr>
                <tr>
                  <td>Contents link jumps to the wrong page</td>
                  <td>
                    <code>\addcontentsline</code> with no link target before it (older hyperref, or
                    an entry not tied to a heading)
                  </td>
                  <td>
                    <code>\phantomsection</code> right before <code>\addcontentsline</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>tocdepth</code> seems to be ignored
                  </td>
                  <td>
                    Set after <code>\tableofcontents</code>, which is too late for that table
                  </td>
                  <td>
                    Move <code>\setcounter</code> to the preamble, or use{' '}
                    <code>\addtocontents</code> as shown above
                  </td>
                </tr>
                <tr>
                  <td>Renamed or deleted headings still listed</td>
                  <td>
                    A stale <code>.toc</code> file from an earlier run, often after a failed compile
                  </td>
                  <td>
                    Delete the auxiliary files (<code>latexmk -c</code>, or <code>.aux</code>,{' '}
                    <code>.toc</code>, <code>.out</code>) and compile again
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>\renewcommand{'{\\contentsname}'}</code> has no effect
                  </td>
                  <td>
                    babel resets the caption at <code>\begin{'{document}'}</code>
                  </td>
                  <td>
                    <code>{`\\addto\\captionsenglish{...}`}</code> as shown above
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2>Frequently Asked Questions</h2>
          {faq.map(({ question, answer }) => (
            <React.Fragment key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </React.Fragment>
          ))}

          <h2>Related guides and a place to test</h2>
          <ul>
            <li>
              <Link href="/learn/sections">Sections and chapters</Link>
            </li>
            <li>
              <Link href="/learn/appendix">Appendices</Link>
            </li>
            <li>
              <Link href="/learn/page-numbering">Page numbering</Link>
            </li>
          </ul>
          <p>
            Paste a complete example into the{' '}
            <Link href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview tool</Link>{' '}
            to inspect the PDF before adding it to your project.
          </p>

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">
              A table of contents that is never out of date
            </h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with TeX Live already set up and every compile
              run to completion, so the contents, page numbers and links are always current. Paste
              any example above, or ask for &quot;dots after the chapters&quot; in plain English.
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
