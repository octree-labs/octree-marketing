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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Tutorial for Beginners', 'latex')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'latex',
  title: 'LaTeX Tutorial for Beginners (2026): Your First Document in 15 Minutes',
  seoTitle: 'LaTeX Tutorial for Beginners (2026)',
  description: 'Learn LaTeX from zero: what it is, no-install setup, your first compilable document, the preamble, formatting, sections, math, tables, figures, citations.',
  keywords: 'latex tutorial, tutorial latex, learn latex, latex for beginners, how to use latex, latex basics, latex beginner guide, how to write latex, latex first document, latex preamble, latex document class, latex packages, latex online editor, latex vs word, bibtex tutorial, latex figures, latex tables, latex math, latex errors, overleaf alternative',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-18'

const faq: FaqItem[] = [
  {
    question: 'Is LaTeX hard to learn?',
    answer:
      'The basics take an afternoon: a document is plain text with a handful of commands such as \\section, \\textbf and \\begin{itemize}. What takes longer is learning the package for each new need (tables, figures, citations), and this tutorial links to a guide for each one. You do not need to know everything to write a complete paper.',
  },
  {
    question: 'Do I need to install anything to use LaTeX?',
    answer:
      'No. An online editor such as Octree compiles in the browser, so you can write and see the PDF without installing a TeX distribution. For offline work install TeX Live (Windows, Linux, macOS as MacTeX) or MiKTeX (Windows) plus an editor.',
  },
  {
    question: 'What is the difference between TeX and LaTeX?',
    answer:
      'TeX is the typesetting engine Donald Knuth wrote in 1978. LaTeX is a set of macros on top of TeX, written by Leslie Lamport, that gives you document-level commands like \\section and \\cite. When people say "LaTeX" they almost always mean writing documents with LaTeX macros, compiled by a modern engine such as pdfTeX, XeTeX or LuaTeX.',
  },
  {
    question: 'Should I use pdfLaTeX, XeLaTeX or LuaLaTeX?',
    answer:
      'pdfLaTeX is the default and works for most documents. Choose XeLaTeX or LuaLaTeX when you need system fonts (fontspec) or extensive non-Latin scripts. Journals and templates usually say which they expect; if nothing is specified, pdfLaTeX is the safe choice.',
  },
  {
    question: 'Why does my document not compile?',
    answer:
      'Open the log and find the first line starting with "!". That is the error; everything after it may be a knock-on effect. The line number after "l." tells you where. The most common causes are an unclosed brace or $, a misspelled command, and a package you forgot to load.',
  },
  {
    question: 'How do I convert a Word document to LaTeX?',
    answer:
      'Pandoc converts .docx to .tex with pandoc paper.docx -o paper.tex, and Octree can import a .docx or paste of formatted text. Expect to tidy the result: tables and equations in particular come out better when rewritten in LaTeX directly.',
  },
]

export default async function LearnLatexPage() {
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
          <h1>LaTeX Tutorial for Beginners (2026): Your First Document in 15 Minutes</h1>
          <p className="lead">
            This LaTeX tutorial takes you from nothing to a compiled PDF with a title, sections,
            formatted text, lists, an equation, a table, a figure and a citation. It explains what
            LaTeX is and when to use it, how to start with zero installation, what every line of
            the preamble does, how to read an error log, and where to go next. Every snippet
            compiles as written.
          </p>

          {/* ── What ── */}
          <h2>What LaTeX Is and When to Use It</h2>
          <p>
            LaTeX (pronounced &ldquo;LAY-tek&rdquo; or &ldquo;LAH-tek&rdquo;) is a document
            preparation system. You write plain text with commands that describe the structure
            of the document &mdash; this is a section, this is emphasised, this is an equation
            &mdash; and a compiler turns it into a PDF. Unlike a word processor, you do not
            arrange the page by hand; LaTeX makes the typographic decisions from the structure
            you give it, which is why documents written by two different people in the same
            class look consistent.
          </p>
          <p>It is the right tool when:</p>
          <ul>
            <li><strong>You write mathematics.</strong> LaTeX&apos;s math typesetting is still the standard that every other system imitates, and most journals and arXiv expect it.</li>
            <li><strong>The document is long or structured.</strong> Numbering of sections, figures, tables and equations, cross-references, the table of contents and the bibliography are all automatic and stay correct as the document changes.</li>
            <li><strong>You cite a lot.</strong> Keep references in one <code>.bib</code> file and switch citation style for a different journal by changing one line.</li>
            <li><strong>You work with others or with version control.</strong> Source files are plain text, so Git diffs, reviews and merges work.</li>
            <li><strong>A template is required.</strong> Theses, conference papers, CVs and slides (Beamer) all have mature templates.</li>
          </ul>
          <p>
            It is the wrong tool for a one-page letter you need in five minutes, for documents
            where a colleague must leave tracked changes in Word, or for layouts built around
            precise manual placement of images. For everything in between, it is worth the
            afternoon it takes to learn.
          </p>

          {/* ── Get started ── */}
          <h2>Getting Started with Zero Install</h2>
          <p>
            The fastest route is an online editor. <Link href="https://www.useoctree.com">Octree</Link>{' '}
            is free, runs in the browser, compiles your document on every save and shows the PDF
            beside the source. You can also ask its AI assistant to write or fix LaTeX for you,
            which is a good way to learn a command you do not know yet. Overleaf is the other
            well-known online option.
          </p>
          <p>
            For local, offline work install a TeX distribution and an editor:
          </p>
          <ul>
            <li><strong>TeX Live</strong> (Windows, Linux; on macOS as <strong>MacTeX</strong>) &ndash; the complete distribution, several gigabytes with every package. Install once a year.</li>
            <li><strong>MiKTeX</strong> (Windows, also macOS and Linux) &ndash; smaller; installs packages on demand the first time a document needs them.</li>
            <li><strong>An editor</strong> &ndash; TeXstudio and TeXworks come with everything configured; VS Code with the LaTeX Workshop extension is popular with programmers.</li>
          </ul>
          <p>
            Whichever you choose, the workflow is the same: write a <code>.tex</code> file,
            compile it with pdfLaTeX, look at the PDF, repeat.
          </p>

          {/* ── First document ── */}
          <h2>Your First Document</h2>
          <p>
            Paste this into a new file called <code>main.tex</code> and compile it. It is a
            complete, valid document:
          </p>
          <pre><code>{`\\documentclass{article}

\\title{My First Document}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Hello, \\LaTeX{}! This is my first document.

\\section{Mathematics}
Here is an inline equation: $E = mc^2$.

And a displayed equation:
\\[
  \\int_0^\\infty e^{-x^2} \\, \\mathrm{d}x = \\frac{\\sqrt{\\pi}}{2}
\\]

\\end{document}`}</code></pre>
          <p>Four things to notice:</p>
          <ul>
            <li>Commands start with a backslash: <code>\section</code>, <code>\maketitle</code>. Their arguments go in curly braces.</li>
            <li>Everything before <code>\begin&#123;document&#125;</code> is the <strong>preamble</strong>; it configures the document but prints nothing.</li>
            <li>Environments come in <code>\begin&#123;...&#125;</code> / <code>\end&#123;...&#125;</code> pairs. <code>document</code> is the outermost one.</li>
            <li>A blank line starts a new paragraph. A single line break is just a space. A <code>%</code> starts a comment that runs to the end of the line.</li>
          </ul>
          <p>
            Ten characters have special meaning and must be escaped to print them literally:{' '}
            <code>\&amp; \% \$ \# \_ \&#123; \&#125;</code>, plus <code>\textasciitilde</code>,{' '}
            <code>\textasciicircum</code> and <code>\textbackslash</code>. Forgetting to escape a{' '}
            <code>%</code> or <code>&amp;</code> is the most common beginner error; the{' '}
            <Link href="/learn/special-characters">special characters guide</Link> has the full
            list.
          </p>

          {/* ── Preamble ── */}
          <h2>The Preamble Explained</h2>
          <p>
            A realistic preamble is a little longer. Here is one you can use for almost any
            article, with every line explained:
          </p>
          <pre><code>{`\\documentclass[12pt,a4paper]{article}  % class and its options

\\usepackage[utf8]{inputenc}   % source file is UTF-8 (default since 2018; harmless)
\\usepackage[T1]{fontenc}      % proper hyphenation and accented characters in the PDF
\\usepackage{amsmath}          % equations, align, cases, matrices
\\usepackage{graphicx}         % \\includegraphics
\\usepackage{booktabs}         % professional table rules
\\usepackage{hyperref}         % clickable links and references; load last

\\title{My First Document}
\\author{Your Name}
\\date{\\today}                 % or \\date{} for no date`}</code></pre>
          <h3>Document classes</h3>
          <p>
            The class sets the overall design. Options in square brackets adjust it: font size
            (<code>10pt</code>, <code>11pt</code>, <code>12pt</code>), paper
            (<code>a4paper</code>, <code>letterpaper</code>), two-sided printing
            (<code>twoside</code>), and so on.
          </p>
          <ul>
            <li><code>article</code> &ndash; papers, short reports, homework. Sections but no chapters.</li>
            <li><code>report</code> &ndash; longer documents with chapters and a title page.</li>
            <li><code>book</code> &ndash; books: chapters, front and back matter, two-sided layout.</li>
            <li><code>beamer</code> &ndash; presentations.</li>
            <li><code>letter</code> &ndash; formal letters.</li>
          </ul>
          <h3>Packages</h3>
          <p>
            Packages extend LaTeX, and almost every document loads a few. Beyond the ones above,
            the ones you will meet first are <code>geometry</code> (margins, see{' '}
            <Link href="/learn/page-size-margins">page size and margins</Link>),{' '}
            <code>xcolor</code> (<Link href="/learn/colors">colors</Link>), <code>enumitem</code>{' '}
            (list styling), <code>siunitx</code> (units) and <code>biblatex</code> (citations).
            Load a package once, in the preamble; loading it twice with different options is an
            error.
          </p>

          {/* ── Text formatting ── */}
          <h2>Text Formatting</h2>
          <pre><code>{`\\textbf{bold}, \\textit{italic}, \\emph{emphasised}, \\underline{underlined},
\\texttt{monospace}, \\textsc{Small Caps}

{\\large larger text} and {\\small smaller text}   % braces limit the scope

A long dash---like this---and an en dash for ranges: 1990--2000.
Quotes use \`\`two backticks and two apostrophes''.`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>\textbf&#123;bold&#125;</code></td><td><strong>bold</strong></td></tr>
              <tr><td><code>\textit&#123;italic&#125;</code></td><td><em>italic</em></td></tr>
              <tr><td><code>\emph&#123;emphasis&#125;</code></td><td><em>emphasis</em> (italic in upright text, upright in italic text)</td></tr>
              <tr><td><code>\underline&#123;underline&#125;</code></td><td><u>underline</u></td></tr>
              <tr><td><code>\texttt&#123;monospace&#125;</code></td><td><code>monospace</code></td></tr>
            </tbody>
          </table>
          <p>
            Prefer <code>\emph</code> over <code>\textit</code> for emphasis, and use underlining
            sparingly; it is a typewriter habit. The{' '}
            <Link href="/learn/bold-italics-underline">bold, italics and underline guide</Link>{' '}
            covers nesting, bold math and the <code>ulem</code> and <code>soul</code> packages,
            and the <Link href="/learn/font-size">font size guide</Link> lists every size
            command.
          </p>

          {/* ── Sections ── */}
          <h2>Sections and Structure</h2>
          <pre><code>{`\\section{Introduction}            % 1
\\subsection{Background}           % 1.1
\\subsubsection{Earlier work}      % 1.1.1
\\paragraph{A run-in heading}      % bold, unnumbered, inline

\\section*{Acknowledgements}       % starred: no number, not in the contents

\\tableofcontents                  % anywhere; compile twice to fill it`}</code></pre>
          <p>
            Numbering, the table of contents and running heads are generated from these
            commands, which is why you never type &ldquo;1.1&rdquo; yourself. In{' '}
            <code>report</code> and <code>book</code> there is also <code>\chapter</code> above{' '}
            <code>\section</code>. Give a section a <code>\label</code> and refer to it with{' '}
            <code>\ref</code>; the number updates itself when sections move. The{' '}
            <Link href="/learn/sections">sections guide</Link> covers numbering depth, custom
            heading styles and unnumbered sections in the contents.
          </p>
          <pre><code>{`\\section{Method}\\label{sec:method}
...
As described in Section~\\ref{sec:method}, ...   % ~ is a non-breaking space`}</code></pre>

          {/* ── Lists ── */}
          <h2>Lists</h2>
          <pre><code>{`% Bullet points
\\begin{itemize}
  \\item First item
  \\item Second item
\\end{itemize}

% Numbered list
\\begin{enumerate}
  \\item First step
  \\item Second step
\\end{enumerate}

% Term and definition
\\begin{description}
  \\item[Compiler] Turns .tex into .pdf.
  \\item[Preamble] Everything before \\verb|\\begin{document}|.
\\end{description}`}</code></pre>
          <p>
            Lists nest inside each other, and the <code>enumitem</code> package changes bullets,
            numbering (a), (b), (c) and spacing. See{' '}
            <Link href="/learn/lists">lists and bullet points in LaTeX</Link>.
          </p>

          {/* ── Math ── */}
          <h2>Mathematics</h2>
          <p>
            Math goes in math mode: <code>$...$</code> inside a sentence, <code>\[...\]</code>{' '}
            for a displayed formula on its own line, and <code>equation</code> for a numbered
            one. Load <code>amsmath</code> for anything beyond the basics.
          </p>
          <pre><code>{`% Inline math
The equation $a^2 + b^2 = c^2$ is Pythagoras' theorem.

% Display math
\\[
  \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
\\]

% Numbered equation with a reference
\\begin{equation}
  a^2 + b^2 = c^2 \\label{eq:pythagoras}
\\end{equation}
Equation~\\eqref{eq:pythagoras} holds for right triangles.

% Aligned equations (amsmath)
\\begin{align}
  f(x) &= x^2 + 2x + 1 \\\\
       &= (x + 1)^2
\\end{align}`}</code></pre>
          <p>
            The building blocks are <code>^</code> and <code>_</code> for{' '}
            <Link href="/learn/subscripts-superscripts">superscripts and subscripts</Link>,{' '}
            <code>\frac&#123;a&#125;&#123;b&#125;</code> for fractions, <code>\sqrt</code>,
            Greek letters such as <code>\alpha</code>, and operators such as{' '}
            <code>\sum</code> and <code>\int</code>. Start with{' '}
            <Link href="/learn/mathematical-expressions">mathematical expressions</Link>, then{' '}
            <Link href="/learn/integrals-sums-limits">integrals, sums and limits</Link>,{' '}
            <Link href="/learn/matrices">matrices</Link> and{' '}
            <Link href="/learn/greek-letters-math-symbols">Greek letters and symbols</Link>.
          </p>

          {/* ── Tables ── */}
          <h2>Tables</h2>
          <p>
            A <code>tabular</code> holds the rows: the argument <code>lcc</code> says there are
            three columns, the first left-aligned and the other two centred; <code>&amp;</code>{' '}
            separates cells and <code>\\</code> ends a row. The <code>table</code> environment
            around it makes it a floating, numbered table with a caption.
          </p>
          <pre><code>{`\\usepackage{booktabs}   % preamble

\\begin{table}[htbp]
  \\centering
  \\begin{tabular}{lcc}
    \\toprule
    Name    & Score & Grade \\\\
    \\midrule
    Alice   & 95    & A \\\\
    Bob     & 87    & B \\\\
    Charlie & 92    & A \\\\
    \\bottomrule
  \\end{tabular}
  \\caption{Student grades}
  \\label{tab:grades}
\\end{table}

Table~\\ref{tab:grades} lists the results.`}</code></pre>
          <p>
            Use the three <code>booktabs</code> rules and no vertical lines; that is what
            journals expect. Column widths, merged cells, long tables and colour are in the{' '}
            <Link href="/learn/tables">tables guide</Link>, and the{' '}
            <Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX converter</Link>{' '}
            turns a spreadsheet into this code.
          </p>

          {/* ── Figures ── */}
          <h2>Figures and Images</h2>
          <p>
            Images need the <code>graphicx</code> package and <code>\includegraphics</code>. The{' '}
            <code>figure</code> environment makes the image float to a good position, numbers it
            and adds the caption; the <code>\label</code> must come after the{' '}
            <code>\caption</code> so <code>\ref</code> picks up the right number.
          </p>
          <pre><code>{`\\usepackage{graphicx}   % preamble

\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.8\\textwidth]{example-image}
  \\caption{A descriptive caption.}
  \\label{fig:plot}
\\end{figure}

See Figure~\\ref{fig:plot}.`}</code></pre>
          <ul>
            <li><code>example-image</code> is a placeholder picture that ships with every TeX distribution (the <code>mwe</code> package), so the snippet compiles as written; replace it with your own file name, such as <code>plot.png</code>.</li>
            <li><code>[htbp]</code> lists the placements LaTeX may use: here, top of page, bottom, or a page of floats. It is a preference, not a command; <code>[H]</code> from the <code>float</code> package forces &ldquo;exactly here&rdquo;.</li>
            <li><code>width=0.8\textwidth</code> scales the image to 80% of the text width; <code>scale=0.5</code> and <code>height=5cm</code> also work.</li>
            <li>PDF, PNG and JPEG are accepted by pdfLaTeX; an EPS file is converted to PDF on the fly (graphicx loads <code>epstopdf</code> for you), and SVG needs the <code>svg</code> package or a manual export to PDF.</li>
            <li>Put images in a folder and point to it once: <code>\graphicspath&#123;&#123;figures/&#125;&#125;</code>.</li>
            <li>Side-by-side images use the <code>subcaption</code> package.</li>
          </ul>

          {/* ── Citations ── */}
          <h2>Citations and Bibliography</h2>
          <p>
            References live in a <code>.bib</code> file, one entry per work. In the text,{' '}
            <code>\cite&#123;key&#125;</code> inserts the citation and the bibliography is
            generated from the entries you actually cited.
          </p>
          <pre><code>{`% references.bib
@article{einstein1905,
  author  = {Einstein, Albert},
  title   = {Zur Elektrodynamik bewegter K{\\"o}rper},
  journal = {Annalen der Physik},
  year    = {1905},
  volume  = {322},
  number  = {10},
  pages   = {891--921}
}

@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  year      = {1984}
}`}</code></pre>
          <h3>BibTeX (classic)</h3>
          <pre><code>{`As shown by Einstein~\\cite{einstein1905}, and in~\\cite[p.~5]{knuth1984}, ...

\\bibliographystyle{plain}     % or abbrv, unsrt, ieeetr, apalike
\\bibliography{references}     % the .bib file without extension`}</code></pre>
          <h3>biblatex (modern)</h3>
          <pre><code>{`\\usepackage[backend=biber,style=authoryear]{biblatex}   % preamble
\\addbibresource{references.bib}                        % also preamble

\\textcite{knuth1984} wrote it; see also \\parencite{einstein1905}.

\\printbibliography`}</code></pre>
          <p>
            Both need extra compilation runs: pdfLaTeX, then BibTeX or Biber, then pdfLaTeX
            twice more. Online editors and <code>latexmk</code> do this for you. BibTeX is what
            most journal templates still expect; biblatex is easier to customise and handles
            Unicode names and modern styles (APA, Chicago) better. The{' '}
            <Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">citation generator</Link>{' '}
            turns a DOI into a <code>.bib</code> entry.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and How to Read the Log</h2>
          <p>
            When compilation fails, LaTeX writes a log. Scroll to the <em>first</em> line that
            begins with <code>!</code>; later errors are often consequences of it. The line
            number after <code>l.</code> says where LaTeX noticed the problem, which is usually
            at or just after the real mistake.
          </p>
          <pre><code>{`! Undefined control sequence.
l.42 \\textbol
             {important}`}</code></pre>
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Usual cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Undefined control sequence</em></td>
                <td>A misspelled command, or the package that defines it is not loaded</td>
                <td>Check the spelling; add the <code>\usepackage</code></td>
              </tr>
              <tr>
                <td><em>Missing $ inserted</em></td>
                <td>A math symbol (<code>^</code>, <code>_</code>, <code>\alpha</code>) outside math mode, or an unescaped <code>_</code> in a URL or file name</td>
                <td>Wrap in <code>$...$</code>, or write <code>\_</code></td>
              </tr>
              <tr>
                <td><em>Runaway argument?</em> / <em>File ended while scanning use of ...</em></td>
                <td>An unclosed brace <code>&#123;</code></td>
                <td>Find the command named in the message and close its brace</td>
              </tr>
              <tr>
                <td><em>\begin&#123;itemize&#125; ended by \end&#123;document&#125;</em></td>
                <td>Mismatched or missing <code>\end</code></td>
                <td>Pair every <code>\begin</code> with its <code>\end</code></td>
              </tr>
              <tr>
                <td><em>File `foo.sty&apos; not found</em></td>
                <td>Package not installed</td>
                <td>Install it with your distribution&apos;s package manager (MiKTeX does it automatically)</td>
              </tr>
              <tr>
                <td><em>Missing \begin&#123;document&#125;</em></td>
                <td>Printable text in the preamble, often a stray character after <code>\usepackage</code></td>
                <td>Move the text after <code>\begin&#123;document&#125;</code></td>
              </tr>
              <tr>
                <td><em>Misplaced alignment tab character &amp;</em></td>
                <td>A literal <code>&amp;</code> in text</td>
                <td>Write <code>\&amp;</code></td>
              </tr>
              <tr>
                <td><em>Overfull \hbox</em> (warning)</td>
                <td>A line that could not be broken, often a long URL or formula</td>
                <td>Usually ignorable; otherwise rephrase or allow hyphenation</td>
              </tr>
              <tr>
                <td><em>LaTeX Warning: Reference `fig:plot&apos; undefined</em></td>
                <td>Labels are resolved on the next run</td>
                <td>Compile again; if it persists, the label is misspelled or placed before the caption</td>
              </tr>
            </tbody>
          </table>
          <p>
            Two habits prevent most errors: compile often, so a mistake is in the few lines you
            just wrote, and comment out half the document with <code>\iffalse ... \fi</code>{' '}
            (see <Link href="/learn/comments">LaTeX comments</Link>) to find which half contains a
            stubborn one.
          </p>

          {/* ── Next steps ── */}
          <h2>Next Steps: Every Guide</h2>
          <p>
            You now know enough LaTeX to write a complete document. Each guide below goes deep on
            one topic, with compiled examples you can copy.
          </p>
          <h3>Document structure and text</h3>
          <ul>
            <li><Link href="/learn/sections">Sections and Headings</Link> – \section, \subsection, numbering and the table of contents</li>
            <li><Link href="/learn/bold-italics-underline">Bold, Italics &amp; Underline</Link> – Text formatting commands and packages</li>
            <li><Link href="/learn/font-size">Font Size</Link> – \tiny to \Huge, class options and \fontsize</li>
            <li><Link href="/learn/lists">Lists and Bullet Points</Link> – itemize, enumerate, description and enumitem</li>
            <li><Link href="/learn/special-characters">Special Characters</Link> – Escaping &amp;, %, $, # and typing accents and symbols</li>
            <li><Link href="/learn/quotes">Quotation Marks and Quotes</Link> – Correct quotes and block quotations</li>
            <li><Link href="/learn/strikethrough">Strikethrough &amp; Cross Out</Link> – \sout, \cancel and track changes</li>
            <li><Link href="/learn/footnotes">Footnotes</Link> – \footnote in text, tables and captions</li>
            <li><Link href="/learn/hyperlinks">Hyperlinks</Link> – hyperref, \url, \href and link colours</li>
            <li><Link href="/learn/comments">Comments</Link> – %, block comments and todo notes</li>
            <li><Link href="/learn/colors">Colors</Link> – xcolor for text, boxes and tables</li>
            <li><Link href="/learn/glossaries-acronyms">Glossaries and Acronyms</Link> – The glossaries package and automatic acronym expansion</li>
          </ul>
          <h3>Page layout</h3>
          <ul>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> – The geometry package and landscape pages</li>
            <li><Link href="/learn/page-numbering">Page Numbering</Link> – Roman and arabic numbers, fancyhdr and &ldquo;Page X of Y&rdquo;</li>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines</Link> – \hrule, \rule and table rules</li>
            <li><Link href="/learn/apa-title-page">APA Title Page</Link> – APA 7 title pages and the apa7 class</li>
          </ul>
          <h3>Mathematics</h3>
          <ul>
            <li><Link href="/learn/mathematical-expressions">Mathematical Expressions</Link> – Inline and display math, fractions, roots, cases and amsmath</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts &amp; Superscripts</Link> – ^, _, exponents and text-mode scripts</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses</Link> – \left, \right and every delimiter</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums &amp; Limits</Link> – \int, \sum, \lim and partial derivatives</li>
            <li><Link href="/learn/multiline-equations">Multiline Equations</Link> – align, split, multline and breaking long equations</li>
            <li><Link href="/learn/equation-numbering">Equation Numbering &amp; Referencing</Link> – \label, \eqref, cleveref and custom tags</li>
            <li><Link href="/learn/matrices">Matrices</Link> – pmatrix, bmatrix, determinants and augmented matrices</li>
            <li><Link href="/learn/math-functions">Math Functions</Link> – \sin, \log, \exp and \DeclareMathOperator</li>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters &amp; Math Symbols</Link> – Complete symbol reference</li>
            <li><Link href="/learn/greek-alphabet">The Greek Alphabet</Link> – All 24 letters with their LaTeX commands</li>
            <li><Link href="/learn/theorems-proofs">Theorems, Lemmas &amp; Proofs</Link> – amsthm and the proof environment</li>
          </ul>
          <h3>Tables, graphics and science</h3>
          <ul>
            <li><Link href="/learn/tables">Tables</Link> – booktabs, multicolumn, multirow, longtable and colour</li>
            <li><Link href="/learn/tikz">TikZ</Link> – Diagrams and drawings in LaTeX</li>
            <li><Link href="/learn/pgfplots">PGFPlots</Link> – Publication-quality plots from data</li>
            <li><Link href="/learn/molecular-orbital-diagrams">Molecular Orbital Diagrams</Link> – MO diagrams with TikZ and the modiagram package</li>
          </ul>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>Is LaTeX hard to learn?</h3>
          <p>
            The basics take an afternoon: a document is plain text with a handful of commands
            such as <code>\section</code>, <code>\textbf</code> and{' '}
            <code>\begin&#123;itemize&#125;</code>. What takes longer is learning the package for
            each new need (tables, figures, citations), and this tutorial links to a guide for
            each one. You do not need to know everything to write a complete paper.
          </p>
          <h3>Do I need to install anything to use LaTeX?</h3>
          <p>
            No. An online editor such as Octree compiles in the browser, so you can write and see
            the PDF without installing a TeX distribution. For offline work install TeX Live
            (Windows, Linux, macOS as MacTeX) or MiKTeX (Windows) plus an editor.
          </p>
          <h3>What is the difference between TeX and LaTeX?</h3>
          <p>
            TeX is the typesetting engine Donald Knuth wrote in 1978. LaTeX is a set of macros on
            top of TeX, written by Leslie Lamport, that gives you document-level commands like{' '}
            <code>\section</code> and <code>\cite</code>. When people say &ldquo;LaTeX&rdquo; they
            almost always mean writing documents with LaTeX macros, compiled by a modern engine
            such as pdfTeX, XeTeX or LuaTeX.
          </p>
          <h3>Should I use pdfLaTeX, XeLaTeX or LuaLaTeX?</h3>
          <p>
            pdfLaTeX is the default and works for most documents. Choose XeLaTeX or LuaLaTeX when
            you need system fonts (<code>fontspec</code>) or extensive non-Latin scripts. Journals
            and templates usually say which they expect; if nothing is specified, pdfLaTeX is the
            safe choice.
          </p>
          <h3>Why does my document not compile?</h3>
          <p>
            Open the log and find the first line starting with <code>!</code>. That is the
            error; everything after it may be a knock-on effect. The line number after{' '}
            <code>l.</code> tells you where. The most common causes are an unclosed brace or{' '}
            <code>$</code>, a misspelled command, and a package you forgot to load.
          </p>
          <h3>How do I convert a Word document to LaTeX?</h3>
          <p>
            Pandoc converts <code>.docx</code> to <code>.tex</code> with{' '}
            <code>pandoc paper.docx -o paper.tex</code>, and Octree can import a{' '}
            <code>.docx</code> or paste of formatted text. Expect to tidy the result: tables and
            equations in particular come out better when rewritten in LaTeX directly.
          </p>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Test your LaTeX code with live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/math-to-latex" target="_blank" rel="noopener noreferrer">Math to LaTeX</Link> – Convert handwritten equations to LaTeX</li>
            <li><Link href="https://tools.useoctree.com/tools/table-to-latex" target="_blank" rel="noopener noreferrer">Excel to LaTeX</Link> – Convert spreadsheets to LaTeX tables</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> – Generate BibTeX citations from DOIs</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> – Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> – Browse math operators and Greek letters</li>
          </ul>

          <h2>LaTeX Templates</h2>
          <p>Get started quickly with our professional templates:</p>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/research-paper" target="_blank" rel="noopener noreferrer">Research Paper</Link> – IEEE-style academic paper</li>
            <li><Link href="https://tools.useoctree.com/templates/thesis" target="_blank" rel="noopener noreferrer">PhD Thesis</Link> – Comprehensive thesis template</li>
            <li><Link href="https://tools.useoctree.com/templates/beamer-presentation" target="_blank" rel="noopener noreferrer">Beamer Presentation</Link> – Academic slides</li>
            <li><Link href="https://tools.useoctree.com/templates" target="_blank" rel="noopener noreferrer">View all templates →</Link></li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related LaTeX Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write your first document now</h3>
            <p className="text-muted-foreground mb-4">
              Octree compiles in the browser, so there is nothing to install, and its AI assistant
              explains any error in the log in plain English.
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
