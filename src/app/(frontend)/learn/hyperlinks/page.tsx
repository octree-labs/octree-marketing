import type { Metadata } from 'next/types'

import { learnMetadata } from '@/utilities/learnMetadata'
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

const breadcrumbs = getLearnBreadcrumbs('LaTeX Hyperlinks', 'hyperlinks')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'hyperlinks',
  title: 'LaTeX Hyperlinks: hyperref, \\url, \\href and Clickable Links',
  seoTitle: 'LaTeX Hyperlinks: hyperref, \\url and \\href',
  description: 'How to add hyperlinks in LaTeX with the hyperref package: \\url, \\href and \\nolinkurl, email links, internal links with \\autoref and \\nameref, removing the colored link boxes, link colors, PDF metadata, breaking long URLs, and fixing common hyperref errors.',
  keywords: 'latex hyperlink, hyperref latex, latex url, latex link, latex href, latex clickable link, latex hyperlink color, latex remove link box, latex link to section, latex email link, hidelinks, colorlinks, hypersetup, latex autoref, latex nameref, latex break long url',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-17'

export default async function LaTeXHyperlinksPage() {
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
          <h1>LaTeX Hyperlinks: hyperref, \url, \href and Clickable Links</h1>
          <p className="lead">
            Hyperlinks in LaTeX come from one package: <code>hyperref</code>. Load it and every{' '}
            <code>\ref</code>, <code>\cite</code> and table-of-contents entry becomes clickable,
            and you get <code>\url</code> and <code>\href</code> for links to the web. This guide
            covers loading the package correctly, the three URL commands, internal links, the
            colored boxes everyone wants to remove, PDF metadata, email links, and the errors
            hyperref is famous for.
          </p>

          {/* ── Loading hyperref ── */}
          <h2>Loading hyperref (Last)</h2>
          <p>
            hyperref redefines commands from many other packages, so it has to see them first.
            The rule of thumb: <strong>load hyperref as the last package in the preamble</strong>.
            Options can go in the square brackets or in a <code>\hypersetup</code> call, which is
            easier to read:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{booktabs}
% ... all other packages ...
\\usepackage{hyperref}
\\hypersetup{
  colorlinks=true,
  linkcolor=blue,
  citecolor=blue,
  urlcolor=blue,
}`}</code></pre>
          <p>
            There are a few well-known exceptions that must be loaded <em>after</em> hyperref
            because they build on it: <code>cleveref</code>, <code>glossaries</code>,{' '}
            <code>bookmark</code>, <code>hypcap</code> and <code>algorithm</code> (from the{' '}
            <code>algorithms</code> bundle). When in doubt, check the package documentation; most
            packages that need a special position say so on the first page.
          </p>

          {/* ── url / href / nolinkurl ── */}
          <h2>\url, \href and \nolinkurl</h2>
          <p>The three commands for external links differ in what they print and whether it is clickable:</p>
          <pre><code>{`% Print the address and link it
\\url{https://www.useoctree.com/learn}

% Link arbitrary text to an address
\\href{https://www.useoctree.com/learn}{the Octree learning hub}

% Print the address in URL style, but do not make it a link
\\nolinkurl{https://www.useoctree.com/learn}`}</code></pre>
          <ul>
            <li><code>{`\\url{...}`}</code> typesets the address verbatim in a monospaced font and links it. Special characters such as <code>%</code>, <code>#</code>, <code>~</code>, <code>&amp;</code> and <code>_</code> can be typed directly.</li>
            <li><code>{`\\href{URL}{text}`}</code> shows <em>text</em> and links to <em>URL</em>. The text is ordinary LaTeX, so it can contain formatting, math or an image.</li>
            <li><code>{`\\nolinkurl{...}`}</code> is <code>\url</code> without the link, useful for printed documents or for showing an address inside <code>\href</code>: <code>{`\\href{https://example.org}{\\nolinkurl{example.org}}`}</code>.</li>
          </ul>
          <p>
            Without hyperref, the <code>url</code> package alone provides <code>\url</code> (no
            link, just correct typesetting). hyperref loads <code>url</code> for you.
          </p>

          <h3>Links to local files and relative addresses</h3>
          <p>
            <code>\href</code> is not limited to the web. A <code>file:</code> address opens
            another document, and <code>run:</code> asks the viewer to launch a file with its
            default application. Whether these work depends on the PDF viewer and its security
            settings, so use them only for documents that stay on one machine or intranet:
          </p>
          <pre><code>{`\\href{file:./appendix.pdf}{the appendix}
\\href{run:./analysis.xlsx}{the spreadsheet}

% A target without a scheme is treated as a local file, not a web URL
\\href{appendix.pdf}{the appendix}   % same as file:appendix.pdf`}</code></pre>
          <p>
            Links to figures or data hosted online are more robust than file links; if a document
            is going to be emailed or uploaded, prefer a full <code>https://</code> address.
          </p>

          {/* ── Line breaking ── */}
          <h2>Line-Breaking Long URLs</h2>
          <p>
            By default a URL may break after <code>/</code>, <code>.</code> and a handful of other
            characters, but not after hyphens and not inside long alphanumeric runs, which leads to
            overfull lines. Three fixes, from lightest to heaviest:
          </p>
          <pre><code>{`% 1. Allow breaks at hyphens: pass the option to url BEFORE hyperref
\\usepackage[hyphens]{url}
\\usepackage{hyperref}

% 2. Add extra break points yourself (after loading hyperref)
\\makeatletter
\\g@addto@macro{\\UrlBreaks}{\\UrlOrds}   % also allow breaks after - * ~ ' \"
\\makeatother

% 3. Let URLs break anywhere: load xurl after hyperref
\\usepackage{hyperref}
\\usepackage{xurl}`}</code></pre>
          <p>
            <code>xurl</code> is the simplest modern answer and works with pdfLaTeX, XeLaTeX and
            LuaLaTeX. The older <code>breakurl</code> package is only needed for the{' '}
            <code>latex</code> &rarr; <code>dvips</code> &rarr; <code>ps2pdf</code> route, where
            links otherwise cannot span a line break; do not load it with pdfLaTeX.
          </p>

          <h3>URL font</h3>
          <p>
            <code>\url</code> uses a typewriter font. Change it for the whole document with{' '}
            <code>\urlstyle</code>:
          </p>
          <pre><code>{`\\urlstyle{same}  % same font as the surrounding text
\\urlstyle{tt}    % typewriter (default)
\\urlstyle{rm}    % roman
\\urlstyle{sf}    % sans-serif`}</code></pre>

          {/* ── Internal links ── */}
          <h2>Internal Links: \ref, \autoref, \nameref and \hyperref</h2>
          <p>
            With hyperref loaded, every <code>\ref</code> and <code>\pageref</code> becomes a link
            to the corresponding <code>\label</code>. hyperref adds three more commands, and{' '}
            <code>cleveref</code> adds <code>\cref</code>:
          </p>
          <pre><code>{`\\section{Method}\\label{sec:method}

See Section~\\ref{sec:method}.            % "Section 2" - only the number is a link
See \\autoref{sec:method}.               % "section 2" - name + number, all linked
See \\nameref{sec:method}.               % "Method" - the section title, linked
See \\hyperref[sec:method]{the method}.  % your own link text

% With cleveref (load after hyperref):
\\usepackage{cleveref}
See \\cref{sec:method}.                  % "section 2"
See \\Cref{sec:method}.                  % "Section 2"`}</code></pre>
          <p>
            <code>\autoref</code> takes its words from macros such as{' '}
            <code>\sectionautorefname</code> and <code>\figureautorefname</code>. The default for
            sections is lowercase; to get &ldquo;Section 2&rdquo; add{' '}
            <code>{`\\renewcommand{\\sectionautorefname}{Section}`}</code> after loading hyperref.{' '}
            <code>cleveref</code> is more flexible (ranges, lists, capitalisation) and is the better
            choice for a new document.
          </p>

          <h3>Anchors for unnumbered sections: \phantomsection</h3>
          <p>
            <code>\section*</code> creates no anchor, so a link to it jumps to the previous one.
            Insert <code>\phantomsection</code> right before the <code>\addcontentsline</code>:
          </p>
          <pre><code>{`\\clearpage
\\phantomsection
\\addcontentsline{toc}{section}{Acknowledgements}
\\section*{Acknowledgements}\\label{sec:ack}`}</code></pre>

          <h3>Arbitrary targets: \hypertarget and \hyperlink</h3>
          <p>
            To link to a spot that has no counter at all, place a named target and link to it by
            name:
          </p>
          <pre><code>{`\\hypertarget{data-note}{The raw data were collected in 2025.}
...
As noted \\hyperlink{data-note}{earlier}, the data are recent.`}</code></pre>

          <h3>Links in the table of contents</h3>
          <p>
            In the table of contents only the section title is linked by default. Make the page
            number clickable too with <code>linktoc=all</code>, or only the page number with{' '}
            <code>linktoc=page</code>:
          </p>
          <pre><code>{`\\hypersetup{linktoc=all}`}</code></pre>

          {/* ── Colors and boxes ── */}
          <h2>Removing the Colored Boxes (or Coloring the Links)</h2>
          <p>
            Out of the box hyperref draws a colored rectangle around every link: red for internal
            links, green for citations, cyan for URLs. The boxes are PDF annotations &ndash; they
            show up in viewers but <strong>are never printed</strong>. Still, most people want them
            gone. Pick one of the following:
          </p>
          <pre><code>{`% Option A: no boxes, no colors - links are invisible but still clickable
\\usepackage[hidelinks]{hyperref}

% Option B: colored link text instead of boxes (this color DOES print)
\\usepackage{hyperref}
\\hypersetup{
  colorlinks=true,
  linkcolor=blue,       % internal links: \\ref, ToC, footnotes
  citecolor=teal,       % \\cite
  urlcolor=magenta,     % \\url and \\href
  filecolor=magenta,    % links to local files
}

% Option C: keep boxes but make them invisible
\\hypersetup{pdfborder={0 0 0}}

% Option D: colored text that still prints black
\\hypersetup{colorlinks=true, allcolors=black}`}</code></pre>
          <p>
            A fourth style, common in theses, is an underline instead of a box or a color:{' '}
            <code>{`\\hypersetup{pdfborderstyle={/S/U/W 1}}`}</code> draws a one-point line under
            each link. Like the boxes, it is an annotation and does not print.
          </p>
          <p>
            <code>allcolors</code> sets every link type at once. For a document that will be
            printed, the usual choice is <code>colorlinks=true</code> with dark, readable colors,
            or <code>hidelinks</code> if the links should not be visible on paper at all. Colors
            can be any <code>xcolor</code> name or definition, e.g.{' '}
            <code>{`\\definecolor{linkblue}{RGB}{0,51,153}`}</code>.
          </p>

          {/* ── Metadata ── */}
          <h2>PDF Metadata and Bookmarks with \hypersetup</h2>
          <p>
            hyperref also writes the PDF&apos;s document properties and the bookmark panel. Set
            them once in the preamble:
          </p>
          <pre><code>{`\\hypersetup{
  pdftitle={Fast Hyperlinks in LaTeX},
  pdfauthor={Ada Lovelace},
  pdfsubject={A guide to the hyperref package},
  pdfkeywords={LaTeX, hyperref, PDF},
  pdfpagemode=UseOutlines,   % open with the bookmark panel visible
  bookmarks=true,
  bookmarksopen=true,        % expand the bookmark tree
  bookmarksnumbered=true,    % show section numbers in bookmarks
  unicode=true,              % allow non-ASCII characters in metadata
}`}</code></pre>
          <p>
            If you would rather reuse <code>\title</code> and <code>\author</code>, load hyperref
            with the <code>pdfusetitle</code> option. Other useful values for{' '}
            <code>pdfpagemode</code> are <code>UseNone</code>, <code>UseThumbs</code> and{' '}
            <code>FullScreen</code>. The bookmark tree is built from the <code>.out</code> file,
            so it needs two compilation runs to be complete.
          </p>

          {/* ── Email ── */}
          <h2>Email Links</h2>
          <p>
            An email address is just a URL with the <code>mailto:</code> scheme. Use{' '}
            <code>\href</code> for the link and, if you want the address in the URL font,{' '}
            <code>\nolinkurl</code> for the visible text:
          </p>
          <pre><code>{`\\href{mailto:ada@example.edu}{ada@example.edu}
\\href{mailto:ada@example.edu}{\\nolinkurl{ada@example.edu}}
\\href{mailto:ada@example.edu?subject=Question%20about%20the%20paper}{Email the author}`}</code></pre>

          {/* ── Fragile contexts ── */}
          <h2>Links in Section Titles, Captions and Footnotes</h2>
          <p>
            Section titles and captions are written to the table of contents and to PDF bookmarks.
            Bookmarks are plain strings: no math, no formatting, no links. hyperref warns{' '}
            <em>&ldquo;Token not allowed in a PDF string&rdquo;</em> and drops the offending
            tokens. <code>\texorpdfstring</code> gives two versions, one for TeX and one for the
            bookmark:
          </p>
          <pre><code>{`\\section{Results for \\texorpdfstring{$\\alpha > 1$}{alpha > 1}}
\\section{The \\texorpdfstring{\\href{https://ctan.org}{CTAN}}{CTAN} archive}

% In a caption, URLs with special characters can break: use a short caption
\\caption[Data source]{Data from \\protect\\url{https://example.org/data}}

% Inside a footnote \\url and \\href work when the address has no special
% characters (for % # ~ & _ see the next section)
Details are online.\\footnote{\\url{https://example.org/details}}`}</code></pre>

          {/* ── Special chars ── */}
          <h2>Special Characters in URLs</h2>
          <p>
            Typed directly in the body of the document, <code>\url</code> and the first argument
            of <code>\href</code> both accept <code>%</code>, <code>#</code>, <code>~</code>,{' '}
            <code>&amp;</code> and <code>_</code> as they are. The exception is when the command
            sits inside the argument of another command (a <code>\footnote</code>, a{' '}
            <code>\newcommand</code> definition, a <code>\multicolumn</code> or <code>tabularx</code> cell). There the characters are read by
            TeX before <code>\url</code> sees them. For <code>\href</code> the fix is simple:
            hyperref accepts the escaped forms <code>\%</code>, <code>\#</code>,{' '}
            <code>\&amp;</code>, <code>\_</code> and <code>\~</code> in the URL argument. For{' '}
            <code>\url</code> in such a place, define the address once with{' '}
            <code>\urldef</code> and use the resulting command:
          </p>
          <pre><code>{`% Fine in running text:
\\url{https://example.org/~ada/report_v2.pdf#page=3}
\\href{https://example.org/search?q=latex&lang=en}{search}

% Inside another command's argument, escape in \\href:
\\newcommand{\\homepage}{\\href{https://example.org/\\~ada/a\\_b.html\\#top}{home}}
Data at 100\\% quality.\\footnote{\\href{https://example.org/?x=1\\&y=2}{source}}

% For \\url, pre-define the address with \\urldef (in the preamble or body)
\\urldef{\\datalink}\\url{https://example.org/~ada/report_v2.pdf#page=3}
\\footnote{See \\datalink.}`}</code></pre>

          {/* ── beamer ── */}
          <h2>hyperref with Beamer</h2>
          <p>
            Beamer loads hyperref itself. Loading it again with options causes an{' '}
            <em>option clash</em>; instead, pass options through the class or with{' '}
            <code>\hypersetup</code>:
          </p>
          <pre><code>{`\\documentclass[hyperref={colorlinks=true, urlcolor=blue}]{beamer}
% or, in the preamble:
\\hypersetup{colorlinks=true, urlcolor=blue}`}</code></pre>
          <p>
            The same applies to other classes and packages that load hyperref for you. A general
            escape hatch is <code>{`\\PassOptionsToPackage{hidelinks}{hyperref}`}</code> placed
            before <code>\documentclass</code>.
          </p>

          {/* ── Errors ── */}
          <h2>Common Errors and Warnings</h2>
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
                <td><em>Token not allowed in a PDF string (Unicode): removing `math shift&apos;</em></td>
                <td>Math or a command in a section title that goes into the bookmarks</td>
                <td>Wrap it in <code>{`\\texorpdfstring{TeX}{plain text}`}</code></td>
              </tr>
              <tr>
                <td><em>destination with the same identifier (name{'{'}page.1{'}'}) has been already used, duplicate ignored</em></td>
                <td>Two pages share the same number, e.g. the title page and the first page of the body</td>
                <td>Use <code>\pagenumbering</code> to switch styles (roman front matter, arabic body), or <code>{`\\hypersetup{pageanchor=false}`}</code> around the unnumbered pages</td>
              </tr>
              <tr>
                <td><em>Option clash for package hyperref</em></td>
                <td>hyperref already loaded by the class or another package with different options</td>
                <td>Remove the options from <code>\usepackage</code> and use <code>\hypersetup</code>, or <code>\PassOptionsToPackage</code> before <code>\documentclass</code></td>
              </tr>
              <tr>
                <td><em>Rerun to get /PageLabels entry</em> or <em>outlines (.out) file has changed</em></td>
                <td>Links and bookmarks need a second pass</td>
                <td>Compile again</td>
              </tr>
              <tr>
                <td>Links jump to the wrong place</td>
                <td>Missing anchor, often an unnumbered section or a float</td>
                <td>Add <code>\phantomsection</code>; put <code>\label</code> after <code>\caption</code></td>
              </tr>
              <tr>
                <td>Link text is cut off at a line break</td>
                <td>Using <code>latex</code> + <code>dvips</code></td>
                <td>Load <code>breakurl</code> after hyperref, or switch to pdfLaTeX</td>
              </tr>
            </tbody>
          </table>

          {/* ── Complete example ── */}
          <h2>Complete Example</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage[hyphens]{url}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{cleveref}

\\hypersetup{
  colorlinks=true,
  linkcolor=blue!60!black,
  citecolor=green!50!black,
  urlcolor=magenta!70!black,
  linktoc=all,
  pdftitle={Hyperlinks in LaTeX},
  pdfauthor={Ada Lovelace},
  pdfkeywords={LaTeX, hyperref},
  bookmarksnumbered=true,
}
\\renewcommand{\\sectionautorefname}{Section}
\\urlstyle{same}

\\title{Hyperlinks in LaTeX}
\\author{Ada Lovelace\\\\ \\href{mailto:ada@example.edu}{\\nolinkurl{ada@example.edu}}}

\\begin{document}
\\maketitle
\\tableofcontents

\\section{Introduction}\\label{sec:intro}
The \\texttt{hyperref} manual lives on
\\href{https://ctan.org/pkg/hyperref}{CTAN}; the plain address is
\\url{https://ctan.org/pkg/hyperref}. Results follow in \\cref{sec:results}.

\\section{Results}\\label{sec:results}
As promised in \\autoref{sec:intro}, see \\nameref{sec:intro} and
\\hyperref[sec:intro]{the opening section}.

\\clearpage
\\phantomsection
\\addcontentsline{toc}{section}{Acknowledgements}
\\section*{Acknowledgements}
Thanks to everyone who reads the manual before asking.
\\end{document}`}</code></pre>

          {/* ── Quick reference ── */}
          <h2>Quick Reference</h2>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Clickable URL</td><td><code>{`\\url{https://...}`}</code></td></tr>
              <tr><td>Link with custom text</td><td><code>{`\\href{https://...}{text}`}</code></td></tr>
              <tr><td>URL without a link</td><td><code>{`\\nolinkurl{https://...}`}</code></td></tr>
              <tr><td>Email link</td><td><code>{`\\href{mailto:a@b.org}{a@b.org}`}</code></td></tr>
              <tr><td>Link to a label with own text</td><td><code>{`\\hyperref[label]{text}`}</code></td></tr>
              <tr><td>&ldquo;Section 2&rdquo; with link</td><td><code>{`\\autoref{label}`}</code> or <code>{`\\Cref{label}`}</code> (cleveref)</td></tr>
              <tr><td>Section title as link</td><td><code>{`\\nameref{label}`}</code></td></tr>
              <tr><td>Named anchor</td><td><code>{`\\hypertarget{name}{text}`}</code> / <code>{`\\hyperlink{name}{text}`}</code></td></tr>
              <tr><td>Anchor for <code>\section*</code></td><td><code>\phantomsection</code> before <code>\addcontentsline</code></td></tr>
              <tr><td>Remove the colored boxes</td><td><code>{`\\usepackage[hidelinks]{hyperref}`}</code></td></tr>
              <tr><td>Colored link text</td><td><code>{`\\hypersetup{colorlinks=true, linkcolor=blue, urlcolor=blue}`}</code></td></tr>
              <tr><td>Clickable page numbers in ToC</td><td><code>{`\\hypersetup{linktoc=all}`}</code></td></tr>
              <tr><td>PDF title and author</td><td><code>{`\\hypersetup{pdftitle={...}, pdfauthor={...}}`}</code></td></tr>
              <tr><td>Break long URLs anywhere</td><td><code>{`\\usepackage{xurl}`}</code> after hyperref</td></tr>
              <tr><td>URL in the text font</td><td><code>{`\\urlstyle{same}`}</code></td></tr>
              <tr><td>Math in a bookmarked title</td><td><code>{`\\texorpdfstring{$x$}{x}`}</code></td></tr>
            </tbody>
          </table>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <p>Links done? Keep polishing the document:</p>
          <ul>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> &ndash; Footnotes in tables, headings and captions, including the <code>hyperfootnotes</code> option</li>
            <li><Link href="/learn/comments">LaTeX Comments</Link> &ndash; Single-line, multi-line and block comments, plus todo notes</li>
            <li><Link href="/learn/colors">Using Colors in LaTeX</Link> &ndash; Define the xcolor names you use for <code>linkcolor</code> and <code>urlcolor</code></li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; Page layout with the geometry package</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; Complete beginner tutorial covering all the basics</li>
          </ul>

          {/* ── Free LaTeX Tools ── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Test hyperref settings with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/citation-generator" target="_blank" rel="noopener noreferrer">Citation Generator</Link> &ndash; Generate BibTeX entries with URLs and DOIs</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="LaTeX" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Fix hyperref problems faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sorts out package order, explains hyperref warnings in plain
              language, and compiles your document in seconds.
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
