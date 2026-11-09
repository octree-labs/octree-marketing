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

const breadcrumbs = getLearnBreadcrumbs('Page Numbering in LaTeX', 'page-numbering')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'page-numbering',
  title: 'Page Numbering in LaTeX: \\pagenumbering, fancyhdr and Starting Pages',
  seoTitle: 'Page Numbering in LaTeX: \\pagenumbering, fancyhdr',
  description: 'Page numbering in LaTeX: \\pagenumbering{roman} and {arabic}, start at any page with \\setcounter, hide the page number, move it with fancyhdr, Page X of Y.',
  keywords: 'page numbering latex, page number latex, latex page numbering, latex page number, page numbers in latex, latex page number position, latex page number bottom right, latex roman numerals page numbers, latex start page number, latex remove page number, latex no page number first page, latex page number position, fancyhdr page number, latex page x of y, latex pagenumbering, latex setcounter page, latex frontmatter mainmatter, beamer frame number, latex thispagestyle empty',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I add page numbers in LaTeX?',
    answer:
      'Page numbers are on by default: the article, report and book classes print \\thepage in the footer or header of every page. If they are missing, a \\pagestyle{empty} or \\thispagestyle{empty} has switched them off; put \\pagestyle{plain} after \\begin{document} for a centred number in the footer, or use fancyhdr with \\fancyfoot[C]{\\thepage}.',
  },
  {
    question: 'How do I start page numbering from a specific page in LaTeX?',
    answer:
      'Write \\setcounter{page}{n} at the point where the numbering should change; that page is then numbered n. If you also switch the style, put \\clearpage, then \\pagenumbering{arabic}, then \\setcounter{page}{n}, because \\pagenumbering resets the counter to 1.',
  },
  {
    question: 'How do I remove the page number from the first page?',
    answer:
      'Put \\thispagestyle{empty} on that page. In an article with \\maketitle it must come after \\maketitle, which sets the plain style on the title page itself. To remove page numbers from every page, use \\pagestyle{empty} instead.',
  },
  {
    question: 'How do I use roman numerals for the front matter and arabic numbers after?',
    answer:
      'Write \\pagenumbering{roman} at the start of the document and \\clearpage followed by \\pagenumbering{arabic} where the main text begins; the arabic numbering restarts at 1. In the book class, \\frontmatter and \\mainmatter do both switches for you.',
  },
  {
    question: 'How do I put the page number in the bottom right or top right corner?',
    answer:
      'Load fancyhdr, then write \\pagestyle{fancy}, \\fancyhf{} to clear the defaults, and \\fancyfoot[R]{\\thepage} for the bottom right or \\fancyhead[R]{\\thepage} for the top right. L and C give the left and centre positions. Redefine the plain style with \\fancypagestyle{plain} if title and chapter pages should match.',
  },
  {
    question: 'How do I show "Page X of Y" in LaTeX?',
    answer:
      'Load the lastpage package and write the total as \\pageref{LastPage}, for example \\fancyfoot[C]{Page \\thepage\\ of \\pageref{LastPage}} with fancyhdr. Compile twice so the label is known; with hyperref use \\pageref*{LastPage} to avoid a link.',
  },
]

export default async function LaTeXPageNumberingPage() {
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
          <h1>Page Numbering in LaTeX: \pagenumbering, fancyhdr and Starting Pages</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Roman, then arabic:</strong> <code>{`\\pagenumbering{roman}`}</code> for the
                front matter, then <code>\clearpage</code> and{' '}
                <code>{`\\pagenumbering{arabic}`}</code>, which restarts at 1.
              </li>
              <li>
                <strong>Start at a given page number:</strong> <code>{`\\setcounter{page}{1}`}</code>{' '}
                (any number), after <code>\pagenumbering</code>.
              </li>
              <li>
                <strong>No page number:</strong> <code>{`\\thispagestyle{empty}`}</code> for one page
                (after <code>\maketitle</code>), <code>{`\\pagestyle{empty}`}</code> for all.
              </li>
              <li>
                <strong>Built-in styles:</strong> <code>{`\\pagestyle{plain}`}</code> (number centred
                in the footer), <code>headings</code> (number in the header), <code>empty</code>.
              </li>
              <li>
                <strong>Move the page number:</strong> <code>{`\\usepackage{fancyhdr}`}</code>,{' '}
                <code>{`\\pagestyle{fancy}`}</code>, <code>{`\\fancyhf{}`}</code>, then{' '}
                <code>{`\\fancyfoot[C]{\\thepage}`}</code> (or <code>[R]</code>, <code>[L]</code>,{' '}
                <code>\fancyhead</code>).
              </li>
              <li>
                <strong>Page X of Y:</strong> <code>{`\\usepackage{lastpage}`}</code> and{' '}
                <code>{`\\fancyfoot[C]{Page \\thepage\\ of \\pageref{LastPage}}`}</code>.
              </li>
            </ul>
          </div>
          <p className="lead">
            LaTeX numbers pages automatically, but almost every real document needs more than the
            default: roman numerals for the front matter, no number on the title page, a number
            that starts at a given value, or &ldquo;Page 3 of 12&rdquo; in the footer. This guide
            covers <code>\pagenumbering</code>, <code>\setcounter</code>, the built-in page
            styles, the <code>fancyhdr</code> package, chapter-based numbering, Beamer frame
            numbers, and the errors people run into along the way.
          </p>

          {/* ── Defaults ── */}
          <h2>How Page Numbering in LaTeX Works by Default</h2>
          <p>
            Every page has a counter called <code>page</code>, and the command{' '}
            <code>\thepage</code> prints it. In <code>article</code> the first page is 1, the
            number is printed centred in the footer (page style <code>plain</code>), and the
            title made by <code>\maketitle</code> is numbered like any other page. In{' '}
            <code>book</code> and <code>report</code> the title page is a page of its own without
            a number. <code>report</code> keeps the <code>plain</code> style, while <code>book</code>
            defaults to <code>headings</code>: the number sits in the outer corner of the header
            next to the running chapter or section title.
          </p>

          {/* ── pagenumbering ── */}
          <h2>Roman and Arabic Page Numbering: \pagenumbering</h2>
          <p>
            <code>{`\\pagenumbering{style}`}</code> switches the numeral style <strong>and
            resets the counter to 1</strong>. The five built-in styles are:
          </p>
          <pre><code>{`\\pagenumbering{arabic}  % 1, 2, 3   (default)
\\pagenumbering{roman}   % i, ii, iii
\\pagenumbering{Roman}   % I, II, III
\\pagenumbering{alph}    % a, b, c   (only up to 26 pages)
\\pagenumbering{Alph}    % A, B, C`}</code></pre>
          <p>
            Because the counter is reset, you normally issue the command right after a page break.
            The classic article layout with a roman-numbered table of contents and an
            arabic-numbered body looks like this:
          </p>
          <pre><code>{`\\documentclass{article}
\\title{Report}
\\author{A. Author}
\\begin{document}
\\pagenumbering{roman}     % i, ii, ...
\\maketitle
\\tableofcontents
\\clearpage
\\pagenumbering{arabic}    % back to 1, 2, ...

\\section{Introduction}
Body text starts on page 1.
\\end{document}`}</code></pre>
          <p>
            Always put <code>\clearpage</code> (or <code>\cleardoublepage</code> in two-sided
            documents) before the switch. The page counter is read when a page is shipped out, so
            changing the style mid-page would affect the page you are still on.
          </p>

          {/* ── Front matter ── */}
          <h2>Front Matter and Main Matter in book</h2>
          <p>
            The <code>book</code> class has three commands that do the switching for you and
            also control chapter numbering:
          </p>
          <pre><code>{`\\documentclass{book}
\\title{Thesis}
\\author{A. Author}
\\begin{document}
\\frontmatter   % roman page numbers; \\chapter is unnumbered
\\maketitle
\\tableofcontents
\\chapter{Preface}

\\mainmatter    % arabic page numbers restart at 1; chapters numbered
\\chapter{Introduction}

\\appendix      % chapters lettered A, B, ...; page numbers continue
\\chapter{Data Tables}

\\backmatter    % chapters unnumbered again; page numbers continue
\\chapter{Bibliography}
\\end{document}`}</code></pre>
          <p>
            <code>\frontmatter</code> calls <code>{`\\pagenumbering{roman}`}</code>,{' '}
            <code>\mainmatter</code> calls <code>{`\\pagenumbering{arabic}`}</code>, and both
            start with <code>\cleardoublepage</code>. The <code>report</code> and{' '}
            <code>article</code> classes do not define these commands; use the manual{' '}
            <code>\pagenumbering</code> sequence above, or load the <code>memoir</code> class,
            which has them.
          </p>

          {/* ── setcounter ── */}
          <h2>Start Page Numbering at a Specific Page: \setcounter</h2>
          <p>
            To start a chapter extracted from a larger work at page 37, or to continue the
            numbering of a previous volume, set the counter directly. Do it <em>after</em>{' '}
            <code>\pagenumbering</code>, because that command resets the counter:
          </p>
          <pre><code>{`\\clearpage
\\pagenumbering{arabic}
\\setcounter{page}{37}   % this page is numbered 37`}</code></pre>
          <p>
            A common variant is a document whose title page is counted but not printed. With{' '}
            <code>{`\\setcounter{page}{0}`}</code> before a hand-made title page the first body
            page comes out as 1 (<code>\maketitle</code> in book and report resets the counter
            itself, so this trick does not work there); with <code>{`\\setcounter{page}{2}`}</code> after the title page the
            title is implicitly page 1.
          </p>

          {/* ── Removing numbers ── */}
          <h2>Remove the Page Number in LaTeX</h2>

          <h3>On the title page</h3>
          <p>
            <code>{`\\thispagestyle{empty}`}</code> removes header and footer from the current
            page only. In <code>article</code>, <code>\maketitle</code> sets the page style of
            the title page itself, so the command has to come <em>after</em> it:
          </p>
          <pre><code>{`\\maketitle
\\thispagestyle{empty}   % after \\maketitle, not before`}</code></pre>
          <p>
            With the <code>titlepage</code> class option, or in <code>book</code> and{' '}
            <code>report</code>, the title page is already empty. The same trick works for a
            hand-made <code>titlepage</code> environment, a dedication, or any page that should
            carry no number.
          </p>

          <h3>On chapter opening pages</h3>
          <p>
            <code>\chapter</code> issues <code>{`\\thispagestyle{plain}`}</code> for its first
            page, which is why chapter openers show a centred number even when the rest of the
            document uses <code>headings</code> or <code>fancy</code>. To change what those pages
            look like, redefine the <code>plain</code> style rather than fighting each chapter.
            With <code>fancyhdr</code>:
          </p>
          <pre><code>{`\\usepackage{fancyhdr}
\\fancypagestyle{plain}{%
  \\fancyhf{}%                            % clear header and footer
  \\renewcommand{\\headrulewidth}{0pt}%    % no rule
}`}</code></pre>
          <p>
            That makes every chapter opener completely blank. To keep the number but drop the
            header, add <code>{`\\fancyfoot[C]{\\thepage}`}</code> inside the definition.
          </p>

          <h3>Everywhere</h3>
          <pre><code>{`\\pagestyle{empty}   % no headers or footers in the whole document`}</code></pre>

          {/* ── Page styles ── */}
          <h2>The Built-in Page Styles</h2>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Style</th>
                <th>Header</th>
                <th>Footer</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>empty</code></td><td>nothing</td><td>nothing</td></tr>
              <tr><td><code>plain</code></td><td>nothing</td><td>page number, centred</td></tr>
              <tr><td><code>headings</code></td><td>running title and page number</td><td>nothing</td></tr>
              <tr><td><code>myheadings</code></td><td>text you set with <code>\markboth</code>/<code>\markright</code>, and the page number</td><td>nothing</td></tr>
            </tbody>
          </table>
          </div>
          <p>
            <code>{`\\pagestyle{...}`}</code> applies from the current page onward;{' '}
            <code>{`\\thispagestyle{...}`}</code> affects one page. For <code>myheadings</code>,
            set the text with <code>{`\\markboth{left header}{right header}`}</code> (two-sided)
            or <code>{`\\markright{header}`}</code> (one-sided). Anything beyond these four styles
            is the job of <code>fancyhdr</code>.
          </p>

          {/* ── Position ── */}
          <h2>Page Number Position in LaTeX: Bottom, Top, Left or Right</h2>
          <p>
            The built-in styles only offer two positions: centred in the footer{' '}
            (<code>plain</code>) or in the header next to the running title (<code>headings</code>).
            For any other position, load <code>fancyhdr</code>, clear its defaults and put{' '}
            <code>\thepage</code> in the slot you want. <code>\fancyfoot</code> is the footer,{' '}
            <code>\fancyhead</code> the header, and <code>[L]</code>, <code>[C]</code>,{' '}
            <code>[R]</code> pick left, centre and right:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}                          % clear header and footer
\\fancyfoot[R]{\\thepage}             % page number bottom right
% \\fancyhead[R]{\\thepage}           % ...or top right instead
\\renewcommand{\\headrulewidth}{0pt}  % no line under the header

% Title and chapter pages use the plain style: give it the same footer
\\fancypagestyle{plain}{\\fancyhf{}\\fancyfoot[R]{\\thepage}}

\\title{Notes}
\\author{A. Author}

\\begin{document}
\\maketitle
\\section{Introduction}
The number sits in the bottom right corner of every page.
\\end{document}`}</code></pre>
          <p>
            The <code>\fancypagestyle&#123;plain&#125;</code> line matters: without it the title
            page still shows the default centred number, because <code>\maketitle</code> and{' '}
            <code>\chapter</code> switch that page to <code>plain</code>. Formatting goes inside
            the slot too, for example <code>{`\\fancyfoot[C]{\\textbf{\\thepage}}`}</code> or{' '}
            <code>{`\\fancyfoot[C]{-- \\thepage\\ --}`}</code>.
          </p>

          {/* ── fancyhdr ── */}
          <h2>Custom Headers and Footers with fancyhdr</h2>
          <p>
            <code>fancyhdr</code> gives you six slots: left, centre and right in both header and
            footer. Start by clearing them with <code>\fancyhf{'{}'}</code>, then fill the ones
            you need:
          </p>
          <pre><code>{`\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}                           % clear all six fields
\\fancyhead[L]{\\leftmark}             % chapter or section title
\\fancyhead[R]{Draft, October 2026}
\\fancyfoot[C]{\\thepage}              % page number, centred footer
\\renewcommand{\\headrulewidth}{0.4pt}
\\renewcommand{\\footrulewidth}{0pt}`}</code></pre>
          <p>
            <code>\leftmark</code> holds the current chapter title (or section title in{' '}
            <code>article</code>) and <code>\rightmark</code> the current section (or
            subsection). The default <code>fancy</code> style uppercases them; wrap the mark in{' '}
            <code>\nouppercase</code> if you prefer mixed case.
          </p>

          <h3>Two-sided documents: E and O</h3>
          <p>
            With the <code>twoside</code> class option the slot letters can be combined with{' '}
            <code>E</code> (even pages) and <code>O</code> (odd pages). The usual book layout puts
            the page number on the outer edge:
          </p>
          <pre><code>{`\\documentclass[twoside]{book}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[LE,RO]{\\thepage}            % outer corner: left on even, right on odd
\\fancyhead[RE]{\\nouppercase{\\leftmark}}   % chapter on even pages
\\fancyhead[LO]{\\nouppercase{\\rightmark}}  % section on odd pages`}</code></pre>

          <h3>&ldquo;Page X of Y&rdquo; with lastpage</h3>
          <p>
            The <code>lastpage</code> package writes a label on the final page, so the total is{' '}
            <code>{`\\pageref{LastPage}`}</code>. It needs two compilations to settle, and with{' '}
            <code>hyperref</code> you will usually want the unlinked <code>\pageref*</code>:
          </p>
          <pre><code>{`\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{hyperref}
\\pagestyle{fancy}
\\fancyfoot[C]{Page \\thepage\\ of \\pageref*{LastPage}}`}</code></pre>
          <p>
            <code>LastPage</code> reports the number <em>as printed</em> on the last page. If
            the back matter is numbered differently from the body, the total will reflect that,
            so place the switch to arabic before the first page that shows &ldquo;of Y&rdquo;.
          </p>

          <h3>\headheight</h3>
          <p>
            Headers taller than the default 12pt trigger the warning{' '}
            <em>&ldquo;\headheight is too small (12.0pt): Make it at least 14.5pt&rdquo;</em>.
            Set the length once in the preamble, either directly or through{' '}
            <code>geometry</code>:
          </p>
          <pre><code>{`\\setlength{\\headheight}{15pt}
% or
\\usepackage[a4paper, margin=2.5cm, headheight=15pt]{geometry}`}</code></pre>

          {/* ── \thepage ── */}
          <h2>Custom Number Formats: Redefining \thepage</h2>
          <p>
            <code>\pagenumbering</code> is really two things: a reset of the counter and a
            redefinition of <code>\thepage</code>. If you want a different format{' '}
            <em>without</em> restarting at 1, redefine <code>\thepage</code> yourself. The same
            technique produces prefixed numbers for appendices or supplements:
          </p>
          <pre><code>{`% Switch to Roman numerals but keep counting
\\renewcommand{\\thepage}{\\Roman{page}}

% Appendix pages as A-1, A-2, ... (page counter restarted)
\\appendix
\\clearpage
\\setcounter{page}{1}
\\renewcommand{\\thepage}{A-\\arabic{page}}`}</code></pre>
          <p>
            With <code>hyperref</code>, <code>\thepage</code> must produce a different string for
            every page, otherwise you get <em>&ldquo;destination with the same identifier has
            been already used&rdquo;</em> warnings and links that jump to the wrong page. The
            prefix in the example above keeps the labels unique.
          </p>

          {/* ── include ── */}
          <h2>Numbering Across \include and \input Files</h2>
          <p>
            A document assembled from several files with <code>\include</code> or{' '}
            <code>\input</code> has one page counter, so numbering continues from file to file
            with no extra work. Two things break it: a <code>\pagenumbering</code> or{' '}
            <code>\setcounter{'{page}'}</code> left at the top of a chapter file, and compiling a
            chapter on its own with the <code>subfiles</code> package, where the counter naturally
            starts at 1 because nothing precedes it. With <code>\includeonly</code> the page
            numbers of the skipped files are taken from their <code>.aux</code> files, so the
            compiled chapters keep their final numbers after one full run.
          </p>

          {/* ── per chapter ── */}
          <h2>Restarting Page Numbers in Every Chapter</h2>
          <p>
            Manuals and standards sometimes number pages 1-1, 1-2, 2-1, 2-2. The tempting one-liner{' '}
            <code>{`\\counterwithin{page}{chapter}`}</code> does <strong>not</strong> work: it
            resets <code>page</code> to 0 at the moment <code>\chapter</code> steps the chapter
            counter, which is after the page break, so every chapter opener prints 0. Use the{' '}
            <code>chappg</code> package, which defines a <code>bychapter</code> numbering style and
            handles front matter, appendices and the separator correctly:
          </p>
          <pre><code>{`\\documentclass{report}
\\usepackage{chappg}        % pages are numbered 1-1, 1-2, 2-1, ...
\\renewcommand{\\chappgsep}{--}   % optional: en dash instead of hyphen
\\begin{document}
\\pagenumbering{bychapter}  % issued automatically unless you load [noauto]
\\chapter{First}
\\chapter{Second}
\\end{document}`}</code></pre>
          <p>
            If you prefer not to add a package, hook the reset onto <code>\chapter</code> with{' '}
            <code>etoolbox</code>. The reset happens before the chapter&apos;s own page break, so
            the opener is page 1:
          </p>
          <pre><code>{`\\usepackage{etoolbox}
\\pretocmd{\\chapter}{\\cleardoublepage\\setcounter{page}{1}}{}{}
\\renewcommand{\\thepage}{\\thechapter-\\arabic{page}}`}</code></pre>

          {/* ── beamer ── */}
          <h2>Frame Numbers in Beamer</h2>
          <p>
            Beamer slides have a frame counter rather than a page counter. Most themes hide it;
            the quickest way to show &ldquo;3 / 20&rdquo; is the built-in footline template:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\setbeamertemplate{navigation symbols}{}      % remove the navigation bar
\\setbeamertemplate{footline}[frame number]    % "3 / 20" bottom right

% or build your own footline
\\setbeamertemplate{footline}{%
  \\hfill\\insertframenumber\\,/\\,\\inserttotalframenumber
  \\hspace{2em}\\vspace{1em}%
}`}</code></pre>
          <p>
            <code>\insertframenumber</code> and <code>\inserttotalframenumber</code> are the two
            macros to know; the total is read from the <code>.aux</code> file, so it needs a second
            compile. Backup slides should not count: give them the{' '}
            <code>[noframenumbering]</code> frame option, or load{' '}
            <code>appendixnumberbeamer</code> and put <code>\appendix</code> before them, which
            also restarts the frame count for the appendix.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
          <p>
            Most page numbering problems are not errors at all: the document compiles and the
            number is simply missing, wrong or in the wrong place. These are the ones that come up
            most, with the log message where there is one:
          </p>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No page number on the first page, numbers elsewhere</td>
                <td>The first page uses <code>plain</code> (set by <code>\maketitle</code> or <code>\chapter</code>) while your <code>fancy</code> style puts the number in the header</td>
                <td>Redefine <code>plain</code> with <code>\fancypagestyle</code>, or write <code>{`\\thispagestyle{fancy}`}</code> after <code>\maketitle</code></td>
              </tr>
              <tr>
                <td>Numbering restarts at 1 after changing the style</td>
                <td><code>\pagenumbering</code> always resets the counter</td>
                <td>Redefine <code>\thepage</code> instead, or add <code>{`\\setcounter{page}{n}`}</code> afterwards</td>
              </tr>
              <tr>
                <td><em>\headheight is too small</em> warning, header overlaps text</td>
                <td>Multi-line or large-font header in <code>fancyhdr</code></td>
                <td><code>{`\\setlength{\\headheight}{15pt}`}</code> or <code>headheight=15pt</code> in <code>geometry</code></td>
              </tr>
              <tr>
                <td>Title page shows a number although <code>{`\\thispagestyle{empty}`}</code> is present</td>
                <td>The command came before <code>\maketitle</code>, which sets <code>plain</code> afterwards</td>
                <td>Move it after <code>\maketitle</code></td>
              </tr>
              <tr>
                <td><code>{`\\pageref{LastPage}`}</code> prints <strong>??</strong></td>
                <td>The label is written at the end of the run</td>
                <td>Compile twice</td>
              </tr>
              <tr>
                <td><em>destination with the same identifier (name{'{'}page.1{'}'}) has been already used</em></td>
                <td>Two pages print the same <code>\thepage</code>, typically a counted title page and body page 1</td>
                <td>Use roman numbering for the front matter, or <code>{`\\hypersetup{pageanchor=false}`}</code> on the unnumbered pages</td>
              </tr>
              <tr>
                <td>Chapter opener numbered 0</td>
                <td><code>{`\\counterwithin{page}{chapter}`}</code></td>
                <td>Use <code>chappg</code> or the <code>\pretocmd</code> hook above</td>
              </tr>
              <tr>
                <td>Page number on the wrong side in a two-sided book</td>
                <td>Roman and arabic sections start on even pages, or <code>twoside</code> is missing</td>
                <td>Use <code>\cleardoublepage</code> before each switch and check the class option</td>
              </tr>
            </tbody>
          </table>
          </div>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <p>
            A two-sided book with roman front matter, arabic main matter, running heads, a
            &ldquo;Page X of Y&rdquo; footer and clean chapter openers:
          </p>
          <pre><code>{`\\documentclass[11pt, twoside]{book}
\\usepackage[a4paper, margin=2.5cm, headheight=15pt]{geometry}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{hyperref}

\\pagestyle{fancy}
% fancyhdr's \\chaptermark ignores \\frontmatter, so front-matter chapters
% would get "Chapter 0." in the running head; this version checks it
\\makeatletter
\\renewcommand{\\chaptermark}[1]{%
  \\markboth{\\if@mainmatter\\chaptername\\ \\thechapter.\\ \\fi #1}{}}
\\makeatother
\\fancyhf{}
\\fancyhead[LE]{\\nouppercase{\\leftmark}}     % chapter title on even pages
\\fancyhead[RO]{\\nouppercase{\\rightmark}}    % section title on odd pages
\\fancyfoot[C]{Page \\thepage\\ of \\pageref*{LastPage}}
\\renewcommand{\\headrulewidth}{0.4pt}

% Chapter opening pages: footer only, no header rule
\\fancypagestyle{plain}{%
  \\fancyhf{}%
  \\fancyfoot[C]{Page \\thepage\\ of \\pageref*{LastPage}}%
  \\renewcommand{\\headrulewidth}{0pt}%
}

\\title{Page Numbering in Practice}
\\author{A. Author}

\\begin{document}
\\frontmatter                 % i, ii, iii ...
\\maketitle                   % unnumbered title page in book
\\tableofcontents
\\chapter{Preface}
Front-matter pages carry lowercase roman numerals.

\\mainmatter                  % 1, 2, 3 ...
\\chapter{Introduction}
The opening page of each chapter uses the redefined \\texttt{plain}
style; every other page uses \\texttt{fancy}.
\\section{Running Heads}
Even pages show the chapter, odd pages show the section.

\\appendix
\\chapter{Extra Material}
Appendix pages continue the arabic sequence.
\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Roman numerals (resets to i)</td><td><code>{`\\pagenumbering{roman}`}</code></td></tr>
              <tr><td>Arabic numerals (resets to 1)</td><td><code>{`\\pagenumbering{arabic}`}</code></td></tr>
              <tr><td>Start at page 5</td><td><code>{`\\setcounter{page}{5}`}</code></td></tr>
              <tr><td>No number on this page</td><td><code>{`\\thispagestyle{empty}`}</code> (after <code>\maketitle</code>)</td></tr>
              <tr><td>No numbers anywhere</td><td><code>{`\\pagestyle{empty}`}</code></td></tr>
              <tr><td>Number only, centred footer</td><td><code>{`\\pagestyle{plain}`}</code></td></tr>
              <tr><td>Running heads with number</td><td><code>{`\\pagestyle{headings}`}</code></td></tr>
              <tr><td>Front/main matter switch (book)</td><td><code>\frontmatter</code> / <code>\mainmatter</code></td></tr>
              <tr><td>Number in footer with fancyhdr</td><td><code>{`\\fancyhf{} \\fancyfoot[C]{\\thepage}`}</code></td></tr>
              <tr><td>Number on the outer edge (twoside)</td><td><code>{`\\fancyhead[LE,RO]{\\thepage}`}</code></td></tr>
              <tr><td>Page X of Y</td><td><code>{`\\fancyfoot[C]{Page \\thepage\\ of \\pageref{LastPage}}`}</code> with <code>lastpage</code></td></tr>
              <tr><td>Blank chapter openers</td><td><code>{`\\fancypagestyle{plain}{\\fancyhf{}\\renewcommand{\\headrulewidth}{0pt}}`}</code></td></tr>
              <tr><td>Change format without reset</td><td><code>{`\\renewcommand{\\thepage}{\\Roman{page}}`}</code></td></tr>
              <tr><td>Per-chapter numbering 2-1, 2-2</td><td><code>{`\\usepackage{chappg}`}</code></td></tr>
              <tr><td>Fix header height warning</td><td><code>{`\\setlength{\\headheight}{15pt}`}</code></td></tr>
              <tr><td>Beamer frame numbers</td><td><code>{`\\setbeamertemplate{footline}[frame number]`}</code></td></tr>
            </tbody>
          </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I add page numbers in LaTeX?</h3>
          <p>
            Page numbers are on by default: the <code>article</code>, <code>report</code> and{' '}
            <code>book</code> classes print <code>\thepage</code> in the footer or header of every
            page. If they are missing, a <code>{`\\pagestyle{empty}`}</code> or{' '}
            <code>{`\\thispagestyle{empty}`}</code> has switched them off; put{' '}
            <code>{`\\pagestyle{plain}`}</code> after <code>{`\\begin{document}`}</code> for a
            centred number in the footer, or use fancyhdr with{' '}
            <code>{`\\fancyfoot[C]{\\thepage}`}</code>.
          </p>
          <h3>How do I start page numbering from a specific page in LaTeX?</h3>
          <p>
            Write <code>{`\\setcounter{page}{n}`}</code> at the point where the numbering should
            change; that page is then numbered <em>n</em>. If you also switch the style, put{' '}
            <code>\clearpage</code>, then <code>{`\\pagenumbering{arabic}`}</code>, then{' '}
            <code>{`\\setcounter{page}{n}`}</code>, because <code>\pagenumbering</code> resets the
            counter to 1.
          </p>
          <h3>How do I remove the page number from the first page?</h3>
          <p>
            Put <code>{`\\thispagestyle{empty}`}</code> on that page. In an article with{' '}
            <code>\maketitle</code> it must come after <code>\maketitle</code>, which sets the{' '}
            <code>plain</code> style on the title page itself. To remove page numbers from every
            page, use <code>{`\\pagestyle{empty}`}</code> instead.
          </p>
          <h3>How do I use roman numerals for the front matter and arabic numbers after?</h3>
          <p>
            Write <code>{`\\pagenumbering{roman}`}</code> at the start of the document and{' '}
            <code>\clearpage</code> followed by <code>{`\\pagenumbering{arabic}`}</code> where the
            main text begins; the arabic numbering restarts at 1. In the <code>book</code> class,{' '}
            <code>\frontmatter</code> and <code>\mainmatter</code> do both switches for you.
          </p>
          <h3>How do I put the page number in the bottom right or top right corner?</h3>
          <p>
            Load fancyhdr, then write <code>{`\\pagestyle{fancy}`}</code>,{' '}
            <code>{`\\fancyhf{}`}</code> to clear the defaults, and{' '}
            <code>{`\\fancyfoot[R]{\\thepage}`}</code> for the bottom right or{' '}
            <code>{`\\fancyhead[R]{\\thepage}`}</code> for the top right. <code>L</code> and{' '}
            <code>C</code> give the left and centre positions. Redefine the <code>plain</code> style
            with <code>{`\\fancypagestyle{plain}`}</code> if title and chapter pages should match.
          </p>
          <h3>How do I show &quot;Page X of Y&quot; in LaTeX?</h3>
          <p>
            Load the <code>lastpage</code> package and write the total as{' '}
            <code>{`\\pageref{LastPage}`}</code>, for example{' '}
            <code>{`\\fancyfoot[C]{Page \\thepage\\ of \\pageref{LastPage}}`}</code> with
            fancyhdr. Compile twice so the label is known; with hyperref use{' '}
            <code>{`\\pageref*{LastPage}`}</code> to avoid a link.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Page numbers sorted? Keep working on the layout:</p>
          <ul>
            <li><Link href="/learn/table-of-contents">Table of Contents in LaTeX</Link> &ndash; <code>\tableofcontents</code>, depth, roman-numbered contents pages and tocloft styling</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Paper size, margins and <code>headheight</code> with the geometry package</li>
            <li><Link href="/learn/horizontal-lines">Horizontal Lines in LaTeX</Link> &ndash; Header and footer rules, <code>\hrule</code>, <code>\rule</code> and table rules</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes in tables, headings and captions</li>
            <li><Link href="/learn/hyperlinks">LaTeX Hyperlinks</Link> &ndash; hyperref, link colors and the duplicate page anchor warning</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test page styles and fancyhdr settings with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX page layout" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix page numbering faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up front matter, fancyhdr headers and page styles for
              you, explains the warnings, and compiles your document in seconds.
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
