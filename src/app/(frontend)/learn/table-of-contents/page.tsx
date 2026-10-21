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

const breadcrumbs = getLearnBreadcrumbs('Table of Contents in LaTeX', 'table-of-contents')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'table-of-contents',
  title: 'Table of Contents in LaTeX: \\tableofcontents, Depth, Links and Styling',
  seoTitle: 'Table of Contents in LaTeX: Example, Depth, Links, Styling',
  description:
    'Make a table of contents in LaTeX: \\tableofcontents, a full example, tocdepth, unnumbered entries, clickable links, tocloft styling and Beamer outlines.',
  keywords:
    'table of contents, table of contents example, latex table of contents, table of contents latex, \\tableofcontents, latex tableofcontents, latex toc, tocdepth, latex tocdepth, secnumdepth, addcontentsline, latex unnumbered section in table of contents, tocloft, latex table of contents dots, hyperref table of contents, clickable table of contents latex, contentsname, latex list of figures, listoffigures, listoftables, tocbibind, beamer table of contents, beamer outline currentsection, latex table of contents not showing',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-21'

const faq: FaqItem[] = [
  {
    question: 'How do I make a table of contents in LaTeX?',
    answer:
      'Put \\tableofcontents where the contents should appear, usually right after \\maketitle, and use \\chapter, \\section and \\subsection for your headings. Compile twice: the first run writes the headings to a .toc file and the second run prints them. latexmk and online editors such as Octree repeat the run automatically.',
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
      'Sections, subsections and lower levels already have dotted leaders in the standard classes; only chapter entries (and section entries in article) have none. Load tocloft and redefine the leader, for example \\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}} for sections in article, or \\cftchapleader for chapters in report and book.',
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
          <h1>Table of Contents in LaTeX: \tableofcontents, Depth, Links and Styling</h1>
          <p className="lead">
            A <strong>table of contents</strong> lists the chapters and sections of a document
            with their page numbers. In LaTeX you never type it by hand: one command,{' '}
            <code>\tableofcontents</code>, builds it from your headings and keeps the page numbers
            right as the document grows. This guide starts with a three-line version and a
            complete table of contents example, then covers depth, unnumbered entries, clickable
            links, renaming, styling with tocloft, lists of figures and tables, and Beamer
            outlines. Every example was compiled on TeX Live 2025.
          </p>

          {/* ───────────────────────────── Minimal ───────────────────────────── */}
          <h2 id="minimal">A Table of Contents in Three Lines</h2>
          <p>
            The smallest working document needs only the command itself and a few headings:
          </p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\tableofcontents

\\section{Introduction}
The table of contents above lists this section.
\\subsection{Background}
And this subsection.
\\section{Method}
And this one.
\\end{document}`}</code></pre>
          <p>
            The result is a &ldquo;Contents&rdquo; heading followed by three entries: section 1 in
            bold with its page number, subsection 1.1 indented with a dotted leader, and section 2.
            There is one catch that confuses almost everyone the first time:{' '}
            <strong>you have to compile twice</strong>.
          </p>
          <p>
            LaTeX reads the source once from top to bottom. When it reaches{' '}
            <code>\tableofcontents</code> it has not seen the headings yet, so it cannot know their
            titles or page numbers. Instead, every <code>\section</code> writes a line to an
            auxiliary file called <code>main.toc</code> (named after your <code>.tex</code> file),
            and <code>\tableofcontents</code> reads that file on the <em>next</em> run. On the very
            first compile the file does not exist yet, so the log says{' '}
            <code>No file main.toc.</code> and the contents are blank. That message is
            informational, not an error. The second run prints the entries; if the contents
            themselves push the body onto a later page, a third run settles the page numbers.
          </p>
          <p>
            You rarely do this by hand. <code>latexmk -pdf main.tex</code> reruns LaTeX until the
            auxiliary files stop changing, and online editors, Octree included, do the same on
            every compile.
          </p>

          {/* ───────────────────────────── Full example ───────────────────────────── */}
          <h2 id="example">Table of Contents Example</h2>
          <p>
            Here is a complete, compilable report with a title page, four chapters, sections and
            subsections. It uses the <code>lipsum</code> package for filler text so the chapters
            span several pages and the page numbers in the contents are realistic:
          </p>
          <pre><code>{`\\documentclass[11pt]{report}
\\usepackage[T1]{fontenc}
\\usepackage{lipsum}   % dummy text

\\title{Soil Moisture Sensing on a Budget}
\\author{A. Student}
\\date{October 2026}

\\begin{document}
\\maketitle
\\tableofcontents

\\chapter{Introduction}
\\lipsum[1-2]
\\section{Motivation}
\\lipsum[3]
\\section{Contributions}
\\lipsum[4]

\\chapter{Related Work}
\\section{Capacitive Sensors}
\\lipsum[5-6]
\\subsection{Calibration}
\\lipsum[7]
\\subsection{Temperature Drift}
\\lipsum[8]
\\section{Resistive Sensors}
\\lipsum[9-10]

\\chapter{Method}
\\section{Hardware}
\\lipsum[11-12]
\\section{Firmware}
\\lipsum[13]
\\subsection{Sampling}
\\lipsum[14]
\\subsubsection{Not in the contents}
Report sets tocdepth to 2, so this level is left out.

\\chapter{Conclusion}
\\lipsum[15]
\\end{document}`}</code></pre>
          <p>
            The compiled PDF has nine pages. The title page comes first, then a page headed
            &ldquo;Contents&rdquo; in large bold type. It reads, top to bottom: <em>1 Introduction
            &hellip; 2</em>, with the chapter in bold and its page number flush right but no dots;
            then <em>1.1 Motivation</em> and <em>1.2 Contributions</em>, indented, with dotted
            leaders to pages 2 and 3; then <em>2 Related Work &hellip; 4</em> with sections 2.1
            and 2.2 and, indented one step further, subsections 2.1.1 Calibration and 2.1.2
            Temperature Drift; then <em>3 Method &hellip; 6</em> with 3.1, 3.2 and 3.2.1
            Sampling; and finally <em>4 Conclusion &hellip; 8</em>. The subsubsection
            &ldquo;Not in the contents&rdquo; is missing, and it is also printed without a number,
            because the report and book classes stop numbering and listing at the subsection
            level. The next section shows how to change that.
          </p>
          <p>
            The contents get a page of their own because <code>\chapter</code> always starts a
            new page. In <code>article</code> the top-level entries are sections, which are bold
            and have no dots.
          </p>

          {/* ───────────────────────────── Depth ───────────────────────────── */}
          <h2 id="depth">Controlling Depth: tocdepth and secnumdepth</h2>
          <p>
            Each heading command has a level number. The counter <code>tocdepth</code> decides the
            deepest level that appears in the contents:
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Command</th>
                <th scope="col">Level</th>
                <th scope="col">Classes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\part</code></td><td>&minus;1 (0 in article)</td><td>all</td></tr>
              <tr><td><code>\chapter</code></td><td>0</td><td>report, book</td></tr>
              <tr><td><code>\section</code></td><td>1</td><td>all</td></tr>
              <tr><td><code>\subsection</code></td><td>2</td><td>all</td></tr>
              <tr><td><code>\subsubsection</code></td><td>3</td><td>all</td></tr>
              <tr><td><code>\paragraph</code></td><td>4</td><td>all</td></tr>
              <tr><td><code>\subparagraph</code></td><td>5</td><td>all</td></tr>
            </tbody>
          </table>
          <p>
            The defaults are <code>tocdepth</code> 3 in article (down to subsubsections) and 2 in
            report and book (down to subsections). A second counter, <code>secnumdepth</code>,
            decides the deepest level that gets a <em>number</em>, with the same defaults. The two
            are independent: you can number subsubsections but leave them out of the contents, or
            list headings that have no number.
          </p>
          <pre><code>{`\\documentclass{report}
\\setcounter{tocdepth}{1}     % chapters and sections only
\\setcounter{secnumdepth}{3}  % but number down to subsubsections
\\begin{document}
\\tableofcontents
\\chapter{Main Part}
\\section{A section}
\\subsection{Numbered, not listed}
\\subsubsection{Numbered as 1.1.1.1}
\\appendix
\\addtocontents{toc}{\\protect\\setcounter{tocdepth}{0}}  % appendices: chapters only
\\chapter{Raw Data}
\\section{Hidden from the contents}
\\end{document}`}</code></pre>
          <p>
            The contents of this document show <em>1 Main Part</em>, <em>1.1 A section</em> and{' '}
            <em>A Raw Data</em>, while the body numbers the subsubsection 1.1.1.1. The value that
            counts is the one in force when <code>\tableofcontents</code> runs, so put{' '}
            <code>\setcounter{'{tocdepth}'}</code> in the preamble: a{' '}
            <code>\setcounter{'{tocdepth}'}{'{1}'}</code> placed after{' '}
            <code>\tableofcontents</code> has no effect on the table.
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

          {/* ───────────────────────────── Unnumbered ───────────────────────────── */}
          <h2 id="unnumbered">Adding Unnumbered Sections, the Bibliography and Appendices</h2>
          <p>
            Starred headings such as <code>\section*</code> and <code>\chapter*</code> are
            unnumbered <em>and</em> never written to the contents. To list one anyway, add the
            entry yourself with{' '}
            <code>\addcontentsline{'{toc}{level}{text}'}</code> right after the heading. The
            bibliography, index and lists of figures are unnumbered chapters or sections too, and
            the <code>tocbibind</code> package adds them for you:
          </p>
          <pre><code>{`\\documentclass{report}
\\usepackage[nottoc]{tocbibind}   % bibliography (and index, lists) in the TOC
\\usepackage{hyperref}            % load last

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
\\end{document}`}</code></pre>
          <p>The contents of this document read:</p>
          <pre><code>{`Contents
Preface                                  2
1 Introduction                           3
    A note on notation . . . . . . . .   3
A Proofs                                 4
Bibliography                             5`}</code></pre>
          <ul>
            <li>
              <strong><code>\phantomsection</code></strong> matters only with hyperref. It drops
              an invisible link target at the current spot; without it the contents entry links
              to the last numbered heading before it, which is often the wrong page.
            </li>
            <li>
              <strong><code>\appendix</code></strong> switches chapter numbering to letters (or
              section numbering in article) from that point on, so appendix entries show up as
              A, B, C with no extra work.
            </li>
            <li>
              <strong><code>tocbibind</code></strong> adds the bibliography, index, list of
              figures and list of tables. The <code>nottoc</code> option stops it from also
              listing the table of contents inside itself, which is almost never wanted. It works
              with <code>thebibliography</code>, BibTeX and <code>\printbibliography</code>; with
              biblatex you can also write{' '}
              <code>\printbibliography[heading=bibintoc]</code> instead.
            </li>
          </ul>
          <p>
            For a document with no section numbers at all, starring every heading is the wrong
            tool. Set <code>{`\\setcounter{secnumdepth}{0}`}</code> (or <code>-2</code> to drop
            the numbers on parts as well) and keep the normal commands: the numbers disappear but
            every heading stays in the contents. The{' '}
            <Link href="/learn/sections">sections guide</Link> covers the heading commands
            themselves in more detail.
          </p>

          {/* ───────────────────────────── hyperref ───────────────────────────── */}
          <h2 id="hyperref">Clickable Table of Contents with hyperref</h2>
          <p>
            Loading <code>hyperref</code> is all it takes to turn every contents entry into a link
            and to fill the bookmark panel of the PDF viewer. Load it after the other packages; it
            redefines many commands and most packages expect to come before it.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{hyperref}
\\hypersetup{
  colorlinks = true,
  linkcolor  = blue,     % colour of TOC entries and \\ref
  urlcolor   = cyan,
  linktoc    = all,      % title and page number are both links
  bookmarksnumbered = true,
  pdftitle   = {Clickable contents}
}
\\begin{document}
\\tableofcontents
\\section{Results for \\texorpdfstring{$x^2$}{x squared}}
Text.
\\section{Discussion}
Text.
\\end{document}`}</code></pre>
          <p>
            By default hyperref draws a red box around each link, visible on screen and not in
            print. <code>colorlinks</code> colours the text instead; <code>linkcolor</code> is the
            option that controls the contents and cross-references. <code>linktoc</code> chooses
            what is clickable: <code>section</code> (the default, the title only),{' '}
            <code>page</code>, <code>all</code> or <code>none</code>. For a version that will be
            printed, or a thesis whose rules forbid coloured text, keep the links but hide them:
          </p>
          <pre><code>{`\\usepackage[hidelinks]{hyperref}`}</code></pre>
          <p>
            The <code>\texorpdfstring</code> in the first heading is there because a PDF bookmark
            can only hold plain text. Math or formatting commands in a heading make hyperref
            print <em>Package hyperref Warning: Token not allowed in a PDF string (Unicode)</em>{' '}
            and drop the offending part from the bookmark;{' '}
            <code>\texorpdfstring{'{TeX version}{plain version}'}</code> gives it a plain
            alternative. More link options, including URL styling and{' '}
            <code>\autoref</code>, are in the <Link href="/learn/hyperlinks">hyperlinks guide</Link>.
          </p>

          {/* ───────────────────────────── Renaming / placing ───────────────────────────── */}
          <h2 id="rename">Renaming and Placing the Table of Contents</h2>
          <p>
            The heading is stored in <code>\contentsname</code>, &ldquo;Contents&rdquo; by
            default. Redefine it in the preamble:
          </p>
          <pre><code>{`\\renewcommand{\\contentsname}{Table of Contents}`}</code></pre>
          <p>
            If you load <code>babel</code>, that line is overwritten at{' '}
            <code>\begin{'{document}'}</code>, when babel sets the captions for the language.
            Hook the change into the language&apos;s caption list instead (use{' '}
            <code>\captionsngerman</code>, <code>\captionsfrench</code> and so on for other
            languages). This complete article also puts the title and the contents on their own
            unnumbered pages and starts the body at page 1:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[english]{babel}
\\addto\\captionsenglish{\\renewcommand{\\contentsname}{Table of Contents}}
\\begin{document}
\\title{Lab Report}\\author{A. Student}\\maketitle
\\thispagestyle{empty}
\\clearpage
\\tableofcontents
\\thispagestyle{empty}
\\clearpage
\\setcounter{page}{1}
\\section{Aim}
Text.
\\section{Results}
Text.
\\end{document}`}</code></pre>
          <p>
            In <code>article</code> the contents simply continue on the current page, so a{' '}
            <code>\clearpage</code> (or <code>\newpage</code>) after them moves the body to a fresh
            page; <code>\clearpage</code> also flushes pending figures, which is usually what you
            want. <code>\thispagestyle{'{empty}'}</code> after <code>\tableofcontents</code> removes
            the page number from the contents page (if the contents run over several pages, only
            the last one is affected). In report and book the contents are a chapter of their
            own and always start on a new page.
          </p>
          <p>
            Books and theses usually number the front matter in roman numerals. The{' '}
            <code>book</code> class does that with <code>\frontmatter</code> and{' '}
            <code>\mainmatter</code>:
          </p>
          <pre><code>{`\\documentclass{book}
\\renewcommand{\\contentsname}{Table of Contents}
\\begin{document}
\\frontmatter            % roman page numbers, unnumbered chapters
\\begin{titlepage}
  \\centering\\Huge My Thesis
\\end{titlepage}
\\tableofcontents
\\chapter{Acknowledgements}
Thanks.

\\mainmatter             % arabic numbers restart at 1
\\chapter{Introduction}
\\section{Background}
Text.
\\chapter{Results}
Text.
\\end{document}`}</code></pre>
          <p>
            The contents land on page iii, list <em>Acknowledgements &hellip; v</em> without a
            number, and then <em>1 Introduction &hellip; 1</em>. In the front matter{' '}
            <code>\chapter</code> behaves like <code>\chapter*</code> for numbering but still
            writes a contents entry. Report and article do not have these commands; use{' '}
            <code>{`\\pagenumbering{roman}`}</code> before the contents and{' '}
            <code>{`\\pagenumbering{arabic}`}</code> after them, as shown in the{' '}
            <Link href="/learn/page-numbering">page numbering guide</Link>. Nothing forces the
            contents to the front, either: <code>\tableofcontents</code> works anywhere,
            including at the end of the document.
          </p>

          {/* ───────────────────────────── tocloft ───────────────────────────── */}
          <h2 id="tocloft">Styling with tocloft</h2>
          <p>
            The <code>tocloft</code> package exposes the look of every contents entry as a set of
            macros and lengths whose names follow one pattern: <code>\cft</code> + the level
            (<code>part</code>, <code>chap</code>, <code>sec</code>, <code>subsec</code>,{' '}
            <code>subsubsec</code>, also <code>fig</code> and <code>tab</code> for the lists) + the
            property. The ones you will use most:
          </p>
          <ul>
            <li><code>\cftsecfont</code> and <code>\cftsecpagefont</code>: the font of the title and of the page number</li>
            <li><code>\cftsecleader</code>: what fills the gap between them (dots or blank space)</li>
            <li><code>\cftbeforesecskip</code>: vertical space above each entry</li>
            <li><code>\cftsecindent</code> and <code>\cftsecnumwidth</code>: the indent of the entry and the room reserved for its number</li>
            <li><code>\cftdotsep</code>: the spacing of the dots, 4.5 by default; larger is sparser</li>
          </ul>
          <pre><code>{`\\documentclass{report}
\\usepackage{tocloft}

% Chapter entries: sans-serif bold, no dots, a little more space above
\\renewcommand{\\cftchapfont}{\\sffamily\\bfseries}
\\renewcommand{\\cftchappagefont}{\\sffamily\\bfseries}
\\setlength{\\cftbeforechapskip}{1.2em}

% Section entries: dotted leaders (the default for sections in report),
% wider dot spacing and a deeper indent
\\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}}
\\renewcommand{\\cftdotsep}{3}
\\renewcommand{\\cftsecfont}{\\itshape}
\\renewcommand{\\cftsecpagefont}{\\itshape}
\\setlength{\\cftsecindent}{2em}
\\setlength{\\cftbeforesecskip}{0.3em}

% Title of the contents
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
\\end{document}`}</code></pre>
          <p>
            The most common request is dots after the top-level entries, which the standard
            classes leave out: chapters in report and book, sections in article. One line adds
            them. In article:
          </p>
          <pre><code>{`\\usepackage{tocloft}
\\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}}  % dots for sections`}</code></pre>
          <p>
            and <code>\cftchapleader</code> in the same way for chapters. To remove dots
            everywhere, set <code>{`\\renewcommand{\\cftdotsep}{\\cftnodots}`}</code>. Do not
            combine tocloft with <code>memoir</code>, which has the same commands built in, or
            with the KOMA-Script classes, which style their contents through{' '}
            <code>tocbasic</code>.
          </p>
          <p>
            If you already format headings with <code>titlesec</code>, its companion{' '}
            <code>titletoc</code> is the alternative. Its <code>\titlecontents</code> command
            describes a whole entry at once (indent, label, title, filler and page) and{' '}
            <code>\dottedcontents</code> is a shortcut for the usual dotted line, for example{' '}
            <code>{`\\dottedcontents{section}[3.8em]{}{2.3em}{1pc}`}</code>. It is more flexible
            than tocloft for unusual layouts, such as entries that run into one paragraph, but
            for changing fonts, spacing and dots tocloft is simpler.
          </p>

          {/* ───────────────────────────── LOF/LOT ───────────────────────────── */}
          <h2 id="lists">List of Figures and Tables</h2>
          <p>
            <code>\listoffigures</code> and <code>\listoftables</code> work exactly like{' '}
            <code>\tableofcontents</code>, only their entries come from the{' '}
            <code>\caption</code> of each <code>figure</code> and <code>table</code> and are stored
            in the <code>.lof</code> and <code>.lot</code> files. Long captions make poor list
            entries, so give a short version in the optional argument:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage[nottoc]{tocbibind}   % adds the lists to the TOC
\\begin{document}
\\tableofcontents
\\listoffigures
\\listoftables
\\clearpage

\\section{Data}
\\begin{figure}[ht]
  \\centering
  \\rule{4cm}{2cm}   % stand-in for \\includegraphics
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
\\end{document}`}</code></pre>
          <p>
            The list of figures shows only &ldquo;1 Sensor layout&rdquo;, while the figure itself
            keeps the full caption. Thanks to <code>tocbibind</code> the table of contents now
            starts with <em>List of Figures</em> and <em>List of Tables</em> entries. Without that
            package, add them by hand with{' '}
            <code>{`\\addcontentsline{toc}{section}{\\listfigurename}`}</code> directly before{' '}
            <code>\listoffigures</code> (use <code>chapter</code> as the level in report and
            book, after a <code>\cleardoublepage</code> so the page number is right). See the{' '}
            <Link href="/blog/insert-images-latex-complete-guide">guide to figures and images</Link>{' '}
            and the <Link href="/learn/tables">tables guide</Link> for the floats themselves.
          </p>

          {/* ───────────────────────────── Beamer ───────────────────────────── */}
          <h2 id="beamer">Table of Contents in Beamer</h2>
          <p>
            Beamer slides use the same <code>\tableofcontents</code>, placed inside a frame. Its
            optional argument filters and highlights the entries, which is how most talks get an
            outline slide at the start of every section:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usetheme{Madrid}
\\title{Soil Moisture Sensing}
\\author{A. Student}

\\AtBeginSection[]{
  \\begin{frame}{Outline}
    \\tableofcontents[currentsection, hideallsubsections]
  \\end{frame}
}

\\begin{document}
\\frame{\\titlepage}

\\begin{frame}{Outline}
  \\tableofcontents
\\end{frame}

\\section{Introduction}
\\subsection{Motivation}
\\begin{frame}{Why measure moisture?}
  Irrigation scheduling.
\\end{frame}

\\section{Method}
\\subsection{Hardware}
\\begin{frame}{The sensor}
  A capacitive probe.
\\end{frame}

\\section{Results}
\\begin{frame}{Findings}
  It works.
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            The result is eight slides: the title, a full outline with sections and subsections,
            and before each of the three sections an &ldquo;Outline&rdquo; slide that shows the
            section titles only, with the current one highlighted and the others shaded. The
            options that matter most:
          </p>
          <ul>
            <li><code>currentsection</code>: highlight the current section and shade the rest</li>
            <li><code>hideallsubsections</code> / <code>hideothersubsections</code>: drop all subsections, or all except those of the current section</li>
            <li><code>sections={'{2-3}'}</code>: show only some sections, useful to split a long outline over two slides</li>
            <li><code>pausesections</code>: reveal the outline one section at a time</li>
          </ul>
          <p>
            The empty <code>[]</code> after <code>\AtBeginSection</code> is the code used for
            starred sections, so <code>\section*</code> gets no outline slide. Frame titles do not
            appear in the outline; only <code>\section</code> and <code>\subsection</code> do,
            and they must sit outside frames. Beamer also needs two runs before the outline
            appears.
          </p>

          {/* ───────────────────────────── Errors ───────────────────────────── */}
          <h2 id="errors">Common Errors</h2>
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
                <td>The contents come from the <code>.toc</code> file of the previous run</td>
                <td>Compile again (three times with hyperref if pages shift), or use <code>latexmk</code></td>
              </tr>
              <tr>
                <td><em>No file main.toc.</em> in the log</td>
                <td>Normal on the first run: the file has not been written yet</td>
                <td>Nothing; it goes away on the second run</td>
              </tr>
              <tr>
                <td>A section is missing</td>
                <td>Starred heading (<code>\section*</code>), or a level deeper than <code>tocdepth</code></td>
                <td><code>\addcontentsline</code> after the heading, or raise <code>tocdepth</code></td>
              </tr>
              <tr>
                <td>Page numbers in the contents are off by one or two after edits</td>
                <td>The contents grew or shrank and moved the body, but only one run happened since</td>
                <td>Run LaTeX once more; latexmk detects this and reruns by itself</td>
              </tr>
              <tr>
                <td><em>Package hyperref Warning: Token not allowed in a PDF string (Unicode)</em></td>
                <td>Math or a formatting command in a heading that goes into a PDF bookmark</td>
                <td><code>\texorpdfstring{'{tex}{plain text}'}</code> in the heading</td>
              </tr>
              <tr>
                <td>Contents link jumps to the wrong page</td>
                <td><code>\addcontentsline</code> for an unnumbered heading without a link target</td>
                <td><code>\phantomsection</code> right before <code>\addcontentsline</code></td>
              </tr>
              <tr>
                <td><code>tocdepth</code> seems to be ignored</td>
                <td>Set after <code>\tableofcontents</code> (too late), or the class has its own mechanism (memoir)</td>
                <td>Move <code>\setcounter</code> to the preamble; in memoir use <code>{`\\settocdepth{section}`}</code></td>
              </tr>
              <tr>
                <td>Renamed or deleted headings still listed</td>
                <td>A stale <code>.toc</code> file from an earlier run, often after a failed compile</td>
                <td>Delete the auxiliary files (<code>latexmk -c</code>, or <code>.aux</code>, <code>.toc</code>, <code>.out</code>) and compile again</td>
              </tr>
              <tr>
                <td><code>\renewcommand{'{\\contentsname}'}</code> has no effect</td>
                <td>babel resets the caption at <code>\begin{'{document}'}</code></td>
                <td><code>{`\\addto\\captionsenglish{...}`}</code> as shown above</td>
              </tr>
            </tbody>
          </table>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make a table of contents in LaTeX?</h3>
          <p>
            Put <code>\tableofcontents</code> where the contents should appear, usually right
            after <code>\maketitle</code>, and use <code>\chapter</code>, <code>\section</code>{' '}
            and <code>\subsection</code> for your headings. Compile twice: the first run writes the
            headings to a <code>.toc</code> file and the second run prints them. latexmk and online
            editors such as Octree repeat the run automatically.
          </p>
          <h3>Why is my LaTeX table of contents empty?</h3>
          <p>
            The contents are read from the <code>.toc</code> file written by the previous run, so
            after a single compile the table is empty or out of date. Compile again, or use
            latexmk. If it stays empty, check that your headings are not starred{' '}
            (<code>\section*</code> never goes to the contents) and that <code>tocdepth</code> is
            not set too low.
          </p>
          <h3>How do I add an unnumbered section to the table of contents?</h3>
          <p>
            Follow the starred heading with <code>\addcontentsline</code>:{' '}
            <code>{`\\section*{Preface}`}</code> then{' '}
            <code>{`\\addcontentsline{toc}{section}{Preface}`}</code>. With hyperref, put{' '}
            <code>\phantomsection</code> before <code>\addcontentsline</code> so the link jumps to
            the right page.
          </p>
          <h3>How do I limit the table of contents to chapters and sections?</h3>
          <p>
            Set the <code>tocdepth</code> counter in the preamble:{' '}
            <code>{`\\setcounter{tocdepth}{1}`}</code> lists parts, chapters and sections only.
            The levels are part &minus;1 (0 in article), chapter 0, section 1, subsection 2,
            subsubsection 3, paragraph 4 and subparagraph 5. The setting must come before{' '}
            <code>\tableofcontents</code>.
          </p>
          <h3>How do I make the table of contents clickable?</h3>
          <p>
            Load hyperref, normally as the last package:{' '}
            <code>{`\\usepackage{hyperref}`}</code>. Every entry becomes a link and the PDF gets
            bookmarks. Add <code>linktoc=all</code> to make the page numbers clickable too,{' '}
            <code>colorlinks</code> to colour the text instead of drawing boxes, or{' '}
            <code>hidelinks</code> for a print version with no visible link styling.
          </p>
          <h3>How do I add dots to the table of contents in LaTeX?</h3>
          <p>
            Sections, subsections and lower levels already have dotted leaders in the standard
            classes; only chapter entries (and section entries in article) have none. Load
            tocloft and redefine the leader, for example{' '}
            <code>{`\\renewcommand{\\cftsecleader}{\\cftdotfill{\\cftdotsep}}`}</code> for sections
            in article, or <code>\cftchapleader</code> for chapters in report and book.
          </p>

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <p>The guides that usually come next when you structure a long document:</p>
          <ul>
            <li><Link href="/learn/sections">Sections &amp; Subsections</Link> &ndash; The heading commands that feed the contents, numbering styles and titlesec</li>
            <li><Link href="/learn/page-numbering">LaTeX Page Numbering</Link> &ndash; Roman front matter, arabic body and page styles around the contents</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; hyperref options, link colours, bookmarks and cross-references</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes in headings without breaking the contents</li>
            <li><Link href="/blog/insert-images-latex-complete-guide">Inserting Images in LaTeX</Link> &ndash; Figures and captions for the list of figures</li>
            <li><Link href="/learn/bibliography-examples">Bibliography Examples</Link> &ndash; The reference list that tocbibind adds to the contents</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Paste any example above and see the compiled table of contents without installing TeX</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Every symbol by category with its LaTeX command</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="LaTeX document structure" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">A table of contents that is never out of date</h3>
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
