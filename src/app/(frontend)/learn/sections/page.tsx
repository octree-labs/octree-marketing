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

const breadcrumbs = getLearnBreadcrumbs('Sections and Subsections in LaTeX', 'sections')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'sections',
  title: 'Sections and Subsections in LaTeX: Numbering, Unnumbered Sections, and the Table of Contents',
  seoTitle: 'LaTeX Sections, Subsections and Table of Contents',
  description: 'LaTeX heading levels, unnumbered sections in the TOC, secnumdepth and tocdepth, \\tableofcontents, custom numbering, titlesec formatting and \\appendix.',
  keywords: 'latex subsection, latex section, latex subsubsection, latex unnumbered section, latex table of contents, latex section numbering, latex paragraph heading, latex chapter, latex section without number, latex tableofcontents, latex secnumdepth, latex tocdepth, latex addcontentsline, latex titlesec, latex appendix, latex section font size, latex heading levels, latex part, latex frontmatter mainmatter',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'How do I make an unnumbered section in LaTeX?',
    answer:
      'Use the starred form: \\section*{Title}. It prints no number and is left out of the table of contents. To list it anyway, add \\addcontentsline{toc}{section}{Title} right after it, preceded by \\phantomsection if hyperref is loaded so the link lands on the heading.',
  },
  {
    question: 'Why is my table of contents empty or out of date?',
    answer:
      'The first compile writes the headings to a .toc file; \\tableofcontents can only read it on the next run. Compile twice (three times with hyperref) or use latexmk, which repeats until the document is stable. If the TOC is still empty, check that the .toc file is not being deleted between runs.',
  },
  {
    question: 'How do I number subsubsections in LaTeX?',
    answer:
      'Raise the secnumdepth counter: \\setcounter{secnumdepth}{3} numbers down to \\subsubsection in every class, and 4 includes \\paragraph. Articles number to level 3 by default; report and book stop at \\subsection (level 2). Use \\setcounter{tocdepth}{3} as well if they should appear in the contents.',
  },
  {
    question: 'What is the difference between \\chapter and \\section?',
    answer:
      '\\chapter is the top level in the report and book classes and starts a new page; \\section is the top level in article, which has no \\chapter (using it gives "Undefined control sequence"). In report and book, section numbers are prefixed with the chapter number, as in 2.1.',
  },
  {
    question: 'How do I change the section numbering to letters or Roman numerals?',
    answer:
      'Redefine the counter representation: \\renewcommand{\\thesection}{\\Alph{section}} for A, B, C or \\Roman{section} for I, II, III. Subsections follow automatically because \\thesubsection is defined as \\thesection.\\arabic{subsection}. \\appendix switches sections (or chapters) to letters for you.',
  },
  {
    question: 'How do I change the font, size or color of section headings?',
    answer:
      'Load the titlesec package and use \\titleformat{\\section}{<format>}{\\thesection}{1em}{}, where <format> is any font commands, for example \\normalfont\\Large\\bfseries\\color{blue}. \\titlespacing* sets the space before and after. Redefining the internal \\section macro by hand is fragile and unnecessary.',
  },
]

export default async function LaTeXSectionsPage() {
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
          <h1>Sections and Subsections in LaTeX: Numbering, Unnumbered Sections, and the Table of Contents</h1>
          <p className="lead">
            LaTeX headings are a hierarchy of commands, from <code>\part</code> down to{' '}
            <code>\subparagraph</code>, that number themselves, build the table of contents and
            feed the running headers without any help from you. This guide covers which levels
            each document class has, starred forms for unnumbered headings and how to keep them
            in the contents, the <code>secnumdepth</code> and <code>tocdepth</code> counters,{' '}
            <code>\tableofcontents</code> and its two-compile rule, short titles for the
            contents, numbering with letters or Roman numerals, formatting with{' '}
            <code>titlesec</code>, <code>\appendix</code>, the book-class matter commands,
            hyperref links, and the errors headings cause.
          </p>

          {/* ── Hierarchy ── */}
          <h2>The Heading Hierarchy</h2>
          <p>
            Seven commands make up the hierarchy. Which ones exist and how they number depends
            on the document class:
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Level</th>
                <th>article</th>
                <th>report / book</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\part</code></td><td>&minus;1 (0 in article)</td><td>Yes, numbered &ldquo;Part I&rdquo;, no page break</td><td>Yes, on its own page</td></tr>
              <tr><td><code>\chapter</code></td><td>0</td><td>Not defined</td><td>Yes, starts a new page, numbered 1, 2, 3</td></tr>
              <tr><td><code>\section</code></td><td>1</td><td>1, 2, 3</td><td>1.1, 1.2 (chapter prefix)</td></tr>
              <tr><td><code>\subsection</code></td><td>2</td><td>1.1</td><td>1.1.1</td></tr>
              <tr><td><code>\subsubsection</code></td><td>3</td><td>1.1.1</td><td>Unnumbered by default</td></tr>
              <tr><td><code>\paragraph</code></td><td>4</td><td>Unnumbered, run-in heading</td><td>Unnumbered, run-in heading</td></tr>
              <tr><td><code>\subparagraph</code></td><td>5</td><td>Unnumbered, indented run-in</td><td>Unnumbered, indented run-in</td></tr>
            </tbody>
          </table>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\tableofcontents
\\part{Foundations}
\\section{Introduction}
\\subsection{Background}
\\subsubsection{Detail}
\\paragraph{A paragraph heading} runs into the text that follows it.
\\subparagraph{A subparagraph} is indented and also runs in.
\\end{document}`}</code></pre>
          <p>
            <code>\paragraph</code> and <code>\subparagraph</code> are headings, not paragraph
            breaks: they print a bold title and the body text continues on the same line. A new
            paragraph of ordinary text is just a blank line in the source. In the standard
            classes, <code>\section</code> is set in <code>\Large\bfseries</code>,{' '}
            <code>\subsection</code> in <code>\large\bfseries</code> and the lower levels in{' '}
            <code>\normalsize\bfseries</code>; see the{' '}
            <Link href="/learn/font-size">font size guide</Link> for what those sizes mean at
            each base size.
          </p>
          <p>
            <code>\chapter</code> exists only in report, book and the classes derived from them
            (memoir, KOMA-Script&apos;s scrreprt and scrbook). Using it in an article gives{' '}
            <em>Undefined control sequence</em>. Beamer has no numbered headings at all; its{' '}
            <code>\section</code> only populates the navigation.
          </p>

          {/* ── Unnumbered ── */}
          <h2>Unnumbered Sections</h2>
          <p>
            Every heading command has a starred form that prints no number, does not advance
            the counter, and is omitted from the table of contents and the running headers.
            That is what you want for a preface, acknowledgements or a one-off note. If the
            heading should still be listed, add it to the contents by hand:
          </p>
          <pre><code>{`\\section*{Acknowledgements}
\\addcontentsline{toc}{section}{Acknowledgements}

% with hyperref, anchor the link first so it lands on this heading
\\clearpage
\\phantomsection
\\addcontentsline{toc}{section}{Preface}
\\section*{Preface}

% in report and book
\\chapter*{Foreword}
\\addcontentsline{toc}{chapter}{Foreword}
\\markboth{Foreword}{}     % the starred form sets no running header`}</code></pre>
          <p>
            <code>\addcontentsline{'{toc}{level}{text}'}</code> writes one line to the{' '}
            <code>.toc</code> file at the given level (<code>chapter</code>,{' '}
            <code>section</code>, <code>subsection</code>, …). Without <code>\phantomsection</code>,
            hyperref links the entry to the most recent anchor, which is usually the previous
            numbered heading. Placing <code>\phantomsection</code> and{' '}
            <code>\addcontentsline</code> <em>before</em> the starred heading, as in the preface
            example, is the ordering that works when the heading starts a new page; after a{' '}
            <code>\section*</code> that does not break the page, either order is fine. The
            KOMA-Script classes provide <code>\addsec</code> and <code>\addchap</code> that do
            all of this in one command.
          </p>

          {/* ── Depth counters ── */}
          <h2>How Deep to Number: secnumdepth and tocdepth</h2>
          <p>
            Two counters control the hierarchy. <code>secnumdepth</code> is the lowest level
            that receives a number, and <code>tocdepth</code> the lowest level that appears in
            the contents. The levels are the numbers in the table above. Articles default to 3
            for both; report and book default to 2, which is why their subsubsections are
            unnumbered:
          </p>
          <pre><code>{`\\setcounter{secnumdepth}{4}   % number down to \\paragraph
\\setcounter{tocdepth}{2}      % list only down to \\subsection

\\setcounter{secnumdepth}{0}   % parts and chapters only (book); parts only (article)
\\setcounter{secnumdepth}{-2}  % no numbers anywhere, but headings stay in the TOC`}</code></pre>
          <p>
            Setting <code>secnumdepth</code> low is the clean way to get an entire document
            without section numbers while keeping the headings in the contents, which the
            starred forms would not do. Remember that <code>\part</code> sits at level 0 in
            article and &minus;1 in report and book, so <code>-1</code> still numbers the parts
            of a book; <code>-2</code> switches every number off. Both settings belong in the
            preamble. To change the
            contents depth part-way through, for example to list only chapters in an appendix,
            write the change into the <code>.toc</code> file:
          </p>
          <pre><code>{`\\addtocontents{toc}{\\protect\\setcounter{tocdepth}{0}}`}</code></pre>

          {/* ── TOC ── */}
          <h2>The Table of Contents</h2>
          <p>
            <code>\tableofcontents</code> prints the contents where it appears. Each heading
            command writes its title and page number to the <code>.toc</code> file during the
            run, and <code>\tableofcontents</code> reads that file. On the first compile the
            file is empty, so the table is blank; the second compile fills it in; and if the
            table itself changed the page numbers, a third makes them right. With hyperref,
            three runs is the norm. <code>latexmk</code> and most editors, including Octree,
            repeat the compile until the document is stable.
          </p>
          <pre><code>{`\\renewcommand{\\contentsname}{Table of Contents}   % default is "Contents"
\\tableofcontents
\\listoffigures
\\listoftables`}</code></pre>
          <p>
            To put the contents on its own page, follow it with <code>\clearpage</code>{' '}
            (chapters do this themselves). The <code>tocloft</code> package controls the
            typography of the contents, and <code>tocbibind</code> adds the bibliography and
            index to it. <code>\tableofcontents</code> can also be placed at the end of the
            document; nothing requires it at the front. The{' '}
            <Link href="/learn/table-of-contents">table of contents guide</Link> has a complete
            example and covers styling, renaming and Beamer outlines in detail.
          </p>

          <h3>Short titles for the contents and headers</h3>
          <p>
            A long title is often too much for the contents and the running header. The optional
            argument gives a shorter version used in both places, while the full title is still
            printed in the body:
          </p>
          <pre><code>{`\\section[Short title]{A very long section title that would clutter the
  table of contents and the running header}`}</code></pre>
          <p>
            The same optional argument is the fix for things that should not travel to the{' '}
            <code>.toc</code> file and the running header: a footnote (which is an error there),
            a <code>\\</code> line break or complex math in the title goes in the mandatory
            argument only, and a plain version in the brackets. With hyperref, math or
            formatting in a title also needs{' '}
            <code>\texorpdfstring{'{tex}{pdf}'}</code> so the PDF bookmark gets plain text:
          </p>
          <pre><code>{`\\section{Results\\texorpdfstring{ for $x^2$}{ for x\\textasciicircum2}}
\\section[Two-line title]{A title with a forced\\texorpdfstring{\\\\}{ }line break}`}</code></pre>

          {/* ── Numbering styles ── */}
          <h2>Changing the Numbering Style</h2>
          <p>
            A heading&apos;s number is printed by the macro <code>\the&lt;level&gt;</code>:{' '}
            <code>\thesection</code>, <code>\thesubsection</code>, and so on. The default
            definitions chain together, so <code>\thesubsection</code> is{' '}
            <code>\thesection.\arabic{'{subsection}'}</code>, and changing the top level changes
            everything below it. The counter representations are <code>\arabic</code>,{' '}
            <code>\alph</code>, <code>\Alph</code>, <code>\roman</code> and <code>\Roman</code>:
          </p>
          <pre><code>{`\\renewcommand{\\thesection}{\\Roman{section}}          % I, II, III
\\renewcommand{\\thesection}{\\Alph{section}}           % A, B, C
\\renewcommand{\\thesubsection}{\\thesection.\\roman{subsection}}   % A.i, A.ii

% report/book: sections numbered 1, 2, 3 without the chapter prefix
\\renewcommand{\\thesection}{\\arabic{section}}

% a trailing period after the number ("1." instead of "1")
\\renewcommand{\\thesection}{\\arabic{section}.}`}</code></pre>
          <p>
            The last form puts the period into every reference too, so{' '}
            <code>Section~\ref{'{sec:x}'}</code> prints &ldquo;Section 1.&rdquo;; titlesec&apos;s{' '}
            <code>\titlelabel</code> or <code>\titleformat</code> changes the heading without
            affecting references. Dropping the chapter prefix with <code>\arabic{'{section}'}</code>{' '}
            also means the section counter still resets at each chapter, so two chapters will
            both contain a Section 1; that is sometimes intended and sometimes a surprise.
          </p>

          <h3>Restarting numbering</h3>
          <p>
            Counters can be set directly. <code>\setcounter{'{section}{0}'}</code> before a
            section makes it number 1 again; <code>\setcounter{'{section}{4}'}</code> makes the
            next section 5. Restarting creates duplicate numbers, and with hyperref duplicate
            anchors as well, which shows up as a <em>destination with the same identifier has
            been already used</em> warning and links that jump to the wrong place. If the
            restart is for an appendix, use <code>\appendix</code> instead, which changes the
            numbering style so nothing is duplicated.
          </p>

          {/* ── titlesec ── */}
          <h2>Formatting Headings with titlesec</h2>
          <p>
            The standard classes bury the heading fonts inside internal macros. The{' '}
            <code>titlesec</code> package exposes them through two commands:{' '}
            <code>\titleformat</code> for the font, label and layout, and{' '}
            <code>\titlespacing</code> for the space around the heading. A plain{' '}
            <code>\titleformat</code> has five arguments: the command, the format applied to
            the whole heading, the label, the gap between label and title, and code run before
            the title:
          </p>
          <pre><code>{`\\usepackage{xcolor}
\\usepackage{titlesec}

% blue sans-serif section titles
\\titleformat{\\section}
  {\\normalfont\\sffamily\\Large\\bfseries\\color{blue!60!black}}
  {\\thesection}{1em}{}

% subsections as run-in headings ending with a period
\\titleformat{\\subsection}[runin]
  {\\normalfont\\bfseries}{\\thesubsection}{1em}{}[.\\quad]

% space: left indent, before, after
\\titlespacing*{\\section}{0pt}{3.5ex plus 1ex minus .2ex}{2.3ex plus .2ex}

% chapters as "Chapter 1" on one line and the title below, in book/report
\\titleformat{\\chapter}[display]
  {\\normalfont\\huge\\bfseries}{\\chaptertitlename\\ \\thechapter}{20pt}{\\Huge}

% start every section on a new page
\\newcommand{\\sectionbreak}{\\clearpage}`}</code></pre>
          <p>
            The optional shape argument (<code>[runin]</code>, <code>[display]</code>,{' '}
            <code>[block]</code>, <code>[hang]</code>, <code>[frame]</code>) changes the
            layout, and the trailing optional argument is code run after the title. The
            starred <code>\titlespacing*</code> suppresses the paragraph indentation after the
            heading, which matches the default classes. For a quick, uniform change, the{' '}
            <code>sectsty</code> package offers one-liners such as{' '}
            <code>\sectionfont{'{\\color{red}\\large}'}</code>, and the KOMA-Script classes have
            their own <code>\setkomafont{'{section}{...}'}</code>; do not combine titlesec with
            KOMA or memoir, which have native mechanisms. Colors are covered in the{' '}
            <Link href="/learn/colors">colors guide</Link>.
          </p>

          {/* ── Appendix and matter ── */}
          <h2>\appendix and the Book Matter Commands</h2>
          <p>
            <code>\appendix</code> is a switch, not an environment: everything after it is
            numbered as an appendix. In article the sections become A, B, C; in report and
            book the chapters do, and sections inside them become A.1, A.2. The headings are
            written with the ordinary commands:
          </p>
          <pre><code>{`\\appendix
\\section{Data tables}        % printed as "A  Data tables"
\\subsection{Raw values}      % A.1`}</code></pre>
          <p>
            The <code>appendix</code> package adds &ldquo;Appendix A&rdquo; wording and a
            contents heading, and <code>\appendixname</code> holds the word used by chapter
            headings in book and report. The book class also has three commands that organise
            the whole document:
          </p>
          <pre><code>{`\\documentclass{book}
\\begin{document}
\\frontmatter      % roman page numbers, chapters unnumbered but in the TOC
\\tableofcontents
\\chapter{Preface}
\\mainmatter       % arabic page numbers restarting at 1, numbered chapters
\\chapter{Introduction}
\\appendix
\\chapter{Proofs}  % Appendix A
\\backmatter       % chapters unnumbered again, for the bibliography and index
\\chapter{Index-like material}
\\end{document}`}</code></pre>
          <p>
            These three exist in book, memoir and scrbook, not in report or article. The page
            numbering changes they make are detailed in the{' '}
            <Link href="/learn/page-numbering">page numbering guide</Link>.
          </p>

          {/* ── hyperref ── */}
          <h2>Links in the Contents with hyperref</h2>
          <p>
            Loading <code>hyperref</code> turns every contents entry into a link and builds the
            PDF bookmark panel from the headings; no further setup is needed. Three options are
            worth knowing: <code>bookmarksnumbered</code> puts the section numbers in the
            bookmarks, <code>linktoc=all</code> makes the page number as well as the title
            clickable, and <code>hidelinks</code> removes the coloured boxes:
          </p>
          <pre><code>{`\\usepackage[bookmarksnumbered, linktoc=all, hidelinks]{hyperref}`}</code></pre>
          <p>
            Load hyperref after titlesec and most other packages. <code>\phantomsection</code>{' '}
            creates an anchor for links that have no heading of their own, as shown above, and{' '}
            <code>\pdfbookmark[level]{'{text}{name}'}</code> adds a bookmark with no contents
            entry. Referencing a section is the same as any other label: <code>\label</code>{' '}
            after the heading and <code>\ref</code> or <code>\pageref</code> to cite it; see
            the <Link href="/learn/hyperlinks">hyperlinks guide</Link> for the options.
          </p>

          {/* ── Page breaks ── */}
          <h2>Page Breaks Before Headings</h2>
          <p>
            Chapters start a new page by themselves (a right-hand page in two-sided book
            layouts, via <code>\cleardoublepage</code>). Sections do not; a{' '}
            <code>\clearpage</code> before the heading forces one and flushes pending floats,
            while <code>\newpage</code> breaks without flushing them. For a global rule, the{' '}
            <code>\sectionbreak</code> hook from titlesec shown above is cleaner than editing
            every section. LaTeX already prevents a heading from being stranded at the bottom
            of a page, so there is no need for manual breaks to avoid that.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Fixes</h2>
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
                <td>The table of contents is empty or shows old entries</td>
                <td>Only one compile since the headings changed</td>
                <td>Compile twice (three times with hyperref) or use latexmk</td>
              </tr>
              <tr>
                <td><em>Undefined control sequence \chapter</em></td>
                <td>Article class has no chapters</td>
                <td>Use <code>\section</code>, or switch to report or book</td>
              </tr>
              <tr>
                <td><code>\ref</code> to a section prints the wrong number</td>
                <td><code>\label</code> placed before the heading, or after a starred heading that has no number</td>
                <td>Put <code>\label</code> after <code>\section</code>, and only on numbered headings (or use <code>\nameref</code>)</td>
              </tr>
              <tr>
                <td>Subsubsections have no number (report, book)</td>
                <td><code>secnumdepth</code> is 2 in those classes</td>
                <td><code>{`\\setcounter{secnumdepth}{3}`}</code></td>
              </tr>
              <tr>
                <td>A heading is missing from the contents</td>
                <td>Starred form, or <code>tocdepth</code> too small</td>
                <td><code>\addcontentsline</code>, or <code>{`\\setcounter{tocdepth}{3}`}</code></td>
              </tr>
              <tr>
                <td>Contents link jumps to the previous section</td>
                <td><code>\addcontentsline</code> without an anchor</td>
                <td><code>\phantomsection</code> before <code>\addcontentsline</code></td>
              </tr>
              <tr>
                <td><em>Token not allowed in a PDF string (Unicode)</em> warning</td>
                <td>Math or a command in a heading that hyperref cannot put in a bookmark</td>
                <td><code>\texorpdfstring{'{tex}{plain}'}</code></td>
              </tr>
              <tr>
                <td><em>Use of \@xfootnote doesn&apos;t match its definition</em> (older kernels: <em>Argument of \@sect has an extra {'}'}</em>), or <em>\verb illegal in argument</em></td>
                <td>A <code>\footnote</code> or <code>\verb</code> in a heading</td>
                <td>Give a plain optional title so the footnote never reaches the <code>.toc</code> file, or prefix it with <code>\protect</code>; replace <code>\verb</code> with <code>\texttt</code></td>
              </tr>
              <tr>
                <td>Starred chapter or section has no running header</td>
                <td>Starred forms do not set the header marks</td>
                <td><code>\markboth{'{Title}{}'}</code> or <code>\sectionmark{'{Title}'}</code> after the heading</td>
              </tr>
              <tr>
                <td><em>destination with the same identifier has been already used</em></td>
                <td>Numbering restarted with <code>\setcounter</code>, so two headings share a hyperref anchor</td>
                <td>Use <code>\appendix</code>, or accept the warning if links are not needed</td>
              </tr>
              <tr>
                <td>Number has a stray period in cross-references</td>
                <td><code>\thesection</code> redefined with a trailing period</td>
                <td>Format the label with titlesec instead</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage[bookmarksnumbered, hidelinks]{hyperref}

\\setcounter{secnumdepth}{3}
\\setcounter{tocdepth}{2}
\\titleformat{\\section}
  {\\normalfont\\Large\\bfseries\\color{blue!60!black}}{\\thesection}{1em}{}

\\begin{document}
\\tableofcontents
\\clearpage

\\section{Introduction}\\label{sec:intro}
\\subsection{Motivation}
\\subsubsection{A numbered subsubsection}
\\paragraph{Scope.} This paragraph heading runs into its text.

\\section[Methods]{Methods, materials and a title too long for the contents}
Section~\\ref{sec:intro} begins on page~\\pageref{sec:intro}.

\\phantomsection
\\addcontentsline{toc}{section}{Acknowledgements}
\\section*{Acknowledgements}
Unnumbered, but listed and linked.

\\appendix
\\section{Supplementary data}
\\subsection{Raw measurements}
\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Headings</td><td><code>\part</code>, <code>\chapter</code> (report/book), <code>\section</code>, <code>\subsection</code>, <code>\subsubsection</code>, <code>\paragraph</code>, <code>\subparagraph</code></td></tr>
              <tr><td>Unnumbered</td><td><code>\section*{'{Title}'}</code></td></tr>
              <tr><td>Unnumbered but in the TOC</td><td><code>\phantomsection</code> <code>\addcontentsline{'{toc}{section}{Title}'}</code></td></tr>
              <tr><td>Short title for TOC and header</td><td><code>\section[Short]{'{Long}'}</code></td></tr>
              <tr><td>Numbering depth</td><td><code>\setcounter{'{secnumdepth}{n}'}</code></td></tr>
              <tr><td>TOC depth</td><td><code>\setcounter{'{tocdepth}{n}'}</code></td></tr>
              <tr><td>Table of contents</td><td><code>\tableofcontents</code>, compile twice</td></tr>
              <tr><td>Rename the TOC</td><td><code>\renewcommand{'{\\contentsname}{...}'}</code></td></tr>
              <tr><td>Roman / letter numbering</td><td><code>\renewcommand{'{\\thesection}{\\Roman{section}}'}</code>, <code>\Alph</code></td></tr>
              <tr><td>Restart numbering</td><td><code>\setcounter{'{section}{0}'}</code></td></tr>
              <tr><td>Appendices</td><td><code>\appendix</code> then ordinary headings</td></tr>
              <tr><td>Heading font / color</td><td><code>\titleformat{'{\\section}{\\Large\\bfseries\\color{blue}}{\\thesection}{1em}{}'}</code> (titlesec)</td></tr>
              <tr><td>Heading spacing</td><td><code>\titlespacing*{'{\\section}{0pt}{before}{after}'}</code></td></tr>
              <tr><td>New page before each section</td><td><code>\newcommand{'{\\sectionbreak}{\\clearpage}'}</code> (titlesec)</td></tr>
              <tr><td>Book structure</td><td><code>\frontmatter</code>, <code>\mainmatter</code>, <code>\backmatter</code></td></tr>
              <tr><td>Math in a heading with hyperref</td><td><code>\texorpdfstring{'{$x^2$}{x^2}'}</code></td></tr>
            </tbody>
          </table>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make an unnumbered section in LaTeX?</h3>
          <p>
            Use the starred form: <code>\section*{'{Title}'}</code>. It prints no number and is
            left out of the table of contents. To list it anyway, add{' '}
            <code>\addcontentsline{'{toc}{section}{Title}'}</code> right after it, preceded by{' '}
            <code>\phantomsection</code> if hyperref is loaded so the link lands on the heading.
          </p>
          <h3>Why is my table of contents empty or out of date?</h3>
          <p>
            The first compile writes the headings to a <code>.toc</code> file;{' '}
            <code>\tableofcontents</code> can only read it on the next run. Compile twice (three
            times with hyperref) or use latexmk, which repeats until the document is stable. If
            the TOC is still empty, check that the <code>.toc</code> file is not being deleted
            between runs.
          </p>
          <h3>How do I number subsubsections in LaTeX?</h3>
          <p>
            Raise the <code>secnumdepth</code> counter: <code>{`\\setcounter{secnumdepth}{3}`}</code>{' '}
            numbers down to <code>\subsubsection</code> in every class, and 4 includes{' '}
            <code>\paragraph</code>. Articles number to level 3 by default; report and book stop
            at <code>\subsection</code> (level 2). Use <code>{`\\setcounter{tocdepth}{3}`}</code>{' '}
            as well if they should appear in the contents.
          </p>
          <h3>What is the difference between \chapter and \section?</h3>
          <p>
            <code>\chapter</code> is the top level in the report and book classes and starts a
            new page; <code>\section</code> is the top level in article, which has no{' '}
            <code>\chapter</code> (using it gives &ldquo;Undefined control sequence&rdquo;). In
            report and book, section numbers are prefixed with the chapter number, as in 2.1.
          </p>
          <h3>How do I change the section numbering to letters or Roman numerals?</h3>
          <p>
            Redefine the counter representation:{' '}
            <code>{`\\renewcommand{\\thesection}{\\Alph{section}}`}</code> for A, B, C or{' '}
            <code>\Roman{'{section}'}</code> for I, II, III. Subsections follow automatically
            because <code>\thesubsection</code> is defined as{' '}
            <code>\thesection.\arabic{'{subsection}'}</code>. <code>\appendix</code> switches
            sections (or chapters) to letters for you.
          </p>
          <h3>How do I change the font, size or color of section headings?</h3>
          <p>
            Load the <code>titlesec</code> package and use{' '}
            <code>{`\\titleformat{\\section}{<format>}{\\thesection}{1em}{}`}</code>, where{' '}
            <code>&lt;format&gt;</code> is any font commands, for example{' '}
            <code>{`\\normalfont\\Large\\bfseries\\color{blue}`}</code>.{' '}
            <code>\titlespacing*</code> sets the space before and after. Redefining the internal{' '}
            <code>\section</code> macro by hand is fragile and unnecessary.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Structure in place? These guides cover the rest of the document skeleton:</p>
          <ul>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; Roman and arabic numbers, the matter commands and fancyhdr headers</li>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; The size commands used in heading formats and what they mean at each base size</li>
            <li><Link href="/learn/hyperlinks">Hyperlinks in LaTeX</Link> &ndash; hyperref options, link colors and cross-references</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; xcolor names and mixes for colored headings</li>
            <li><Link href="/learn/page-size-margins">Page Size and Margins</Link> &ndash; geometry settings that go with your heading layout</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; See heading styles and the contents with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> &ndash; Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse every symbol by category</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX document structure" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Structure documents faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up heading levels, numbering and a linked table of
              contents for your class, explains hyperref and titlesec warnings, and recompiles
              until the TOC is right.
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
