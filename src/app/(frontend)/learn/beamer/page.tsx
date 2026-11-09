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

const breadcrumbs = getLearnBreadcrumbs('Beamer in LaTeX', 'beamer')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'beamer',
  title: 'Beamer in LaTeX: Presentations, Frames and Themes',
  description: 'Beamer LaTeX tutorial: a minimal deck, frames, themes and color themes, \\pause and \\only overlays, columns, blocks, title page, handouts, notes and errors.',
  keywords: 'beamer, beamer latex, latex beamer, latex frame, latex frames, beamer frame, beamer presentation, latex presentation, latex slides, beamer themes, beamer color themes, usetheme madrid, beamer pause, beamer only, beamer onslide, beamer overlays, beamer columns, beamer block, beamer title page, beamer handout, beamer notes, beamer allowframebreaks, beamer fragile, beamer verbatim, beamer tutorial',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'What is Beamer in LaTeX?',
    answer:
      'Beamer is a LaTeX document class for presentations. You write \\documentclass{beamer} instead of article, put each slide in a frame environment, and compile to a PDF in which every page is a slide. It ships with every TeX distribution, so there is nothing extra to install.',
  },
  {
    question: 'What is a frame in LaTeX Beamer?',
    answer:
      'A frame is one slide: everything between \\begin{frame} and \\end{frame}. The frame title goes in braces after \\begin{frame} or in \\frametitle. With overlays such as \\pause, one frame can produce several PDF pages that build up step by step.',
  },
  {
    question: 'How do I change the Beamer theme?',
    answer:
      'Add \\usetheme{Madrid} (or Berlin, Warsaw, Copenhagen, CambridgeUS, metropolis and so on) to the preamble. The colors can be changed separately with \\usecolortheme{beaver}, \\usecolortheme{dolphin} or another color theme, and the fonts with \\usefonttheme{serif}.',
  },
  {
    question: 'How do I make text appear one item at a time in Beamer?',
    answer:
      'Put \\pause between the items, or give the list an overlay specification: \\begin{itemize}[<+->] reveals one \\item per slide. For finer control use \\item<2-> or \\onslide<2->{...}, which reserve space for hidden content, and \\only<2>{...}, which does not.',
  },
  {
    question: 'How do I fix content that does not fit on a Beamer frame?',
    answer:
      'Beamer does not move overflowing content to a new slide; it simply runs off the bottom. Split the frame, use \\begin{frame}[allowframebreaks] to continue it on extra slides (useful for bibliographies), or \\begin{frame}[shrink=10] to scale the content down. Reducing the font with \\small inside the frame also works.',
  },
  {
    question: 'Why does verbatim or lstlisting fail inside a Beamer frame?',
    answer:
      'Beamer reads the whole frame as an argument before typesetting it, and verbatim material cannot be read that way. Add the fragile option: \\begin{frame}[fragile]. Without it you get errors such as “Missing } inserted” or “File ended while scanning use of \\@xverbatim”. The \\end{frame} of a fragile frame must be on a line of its own.',
  },
]

export default async function LearnBeamerPage() {
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
          <h1>Beamer in LaTeX: Presentations, Frames and Themes</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Class:</strong> <code>{`\\documentclass{beamer}`}</code>. Each slide is a{' '}
                <code>frame</code>: <code>{`\\begin{frame}{Title} ... \\end{frame}`}</code>.
              </li>
              <li>
                <strong>Theme:</strong> <code>{`\\usetheme{Madrid}`}</code>, colors with{' '}
                <code>{`\\usecolortheme{beaver}`}</code>.
              </li>
              <li>
                <strong>Step by step:</strong> <code>\pause</code>, <code>{`\\item<2->`}</code>,{' '}
                <code>{`\\only<2>{...}`}</code>, <code>{`\\onslide<3->{...}`}</code>.
              </li>
              <li>
                <strong>Code on a slide:</strong> <code>{`\\begin{frame}[fragile]`}</code>.{' '}
                <strong>Too much content:</strong> <code>[allowframebreaks]</code> or <code>[shrink]</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{beamer}
\\usetheme{Madrid}

\\title{My First Talk}
\\author{Ada Lovelace}
\\date{\\today}

\\begin{document}

\\begin{frame}
  \\titlepage
\\end{frame}

\\begin{frame}{Main points}
  \\begin{itemize}
    \\item First point
    \\pause
    \\item Second point, shown on the next click
  \\end{itemize}
\\end{frame}

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Beamer is the LaTeX class for slides. You write a presentation the same way you write
            a paper, with the same math, citations and figures, and the result is a PDF that
            opens full screen on any computer. This guide starts from a complete deck and covers
            frames, the built-in themes and color themes, overlays with <code>\pause</code>,{' '}
            <code>\only</code> and <code>\onslide</code>, columns, blocks and figures, the title
            page and section navigation, handouts and speaker notes, and the errors that come up
            most. Every snippet compiles as shown.
          </p>

          {/* ── Frames ── */}
          <h2>Frames in Beamer (\begin&#123;frame&#125;)</h2>
          <p>
            A Beamer document is a sequence of <em>frames</em>. Each{' '}
            <code>{`\\begin{frame} ... \\end{frame}`}</code> is one slide, and the frame title can
            be given in braces right after <code>{`\\begin{frame}`}</code> or with{' '}
            <code>\frametitle</code> inside it. A subtitle goes in a second pair of braces or{' '}
            <code>\framesubtitle</code>:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\begin{document}

\\begin{frame}{Frame title}{Optional subtitle}
  Text on the slide.
\\end{frame}

\\begin{frame}
  \\frametitle{The same, with commands}
  \\framesubtitle{Useful when the title is long}
  Text on the slide.
\\end{frame}

\\end{document}`}</code></pre>
          <p>
            Anything outside a frame (other than preamble-style commands such as{' '}
            <code>\section</code>) is ignored. Frames take options in square brackets, and these
            are the ones worth knowing:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>[fragile]</code></td><td>Allows <code>verbatim</code>, <code>\verb</code>, <code>lstlisting</code> and <code>minted</code> on the frame</td></tr>
                <tr><td><code>[allowframebreaks]</code></td><td>Content that does not fit continues on extra slides, titled &ldquo;Title I, II, &hellip;&rdquo;</td></tr>
                <tr><td><code>[shrink=10]</code></td><td>Shrinks the content by at least 10% (more if needed) to fit; small text, use sparingly</td></tr>
                <tr><td><code>[plain]</code></td><td>Hides headline, footline and sidebars, e.g. for a full-slide image</td></tr>
                <tr><td><code>[t]</code>, <code>[c]</code>, <code>[b]</code></td><td>Aligns content at the top, center (default) or bottom</td></tr>
                <tr><td><code>[noframenumbering]</code></td><td>Does not count the frame, e.g. for backup slides</td></tr>
                <tr><td><code>[label=name]</code></td><td>Names the frame so it can be repeated with <code>{`\\againframe{name}`}</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Two related terms often get mixed up: a <em>frame</em> is what you write, a{' '}
            <em>slide</em> is a PDF page. A frame with overlays produces several slides, one per
            step, but they share a frame number.
          </p>

          {/* ── Themes ── */}
          <h2>Themes and Color Themes</h2>
          <p>
            The look of a deck is set in the preamble. <code>\usetheme</code> picks the overall
            layout (headline, footline, sidebar and block style), <code>\usecolortheme</code>{' '}
            changes only the colors, and <code>\usefonttheme</code> changes the fonts:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usetheme{Madrid}
\\usecolortheme{beaver}
\\usefonttheme{professionalfonts}

\\title{Themes}
\\author{Ada Lovelace}
\\institute{Analytical Engine Lab}

\\begin{document}
\\begin{frame}{Madrid with the beaver color theme}
  \\begin{block}{A block}
    Blocks, the footline and the title bar follow the theme colors.
  \\end{block}
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            Beamer&apos;s presentation themes are named after cities. Most of them fall into a few
            families that differ mainly in where the navigation goes:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Theme</th>
                  <th>Layout</th>
                  <th>Good for</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>default</code></td><td>Plain white, no navigation bars</td><td>Minimal decks, full control</td></tr>
                <tr><td><code>Madrid</code></td><td>Colored title bar, three-part footline with author, title and page</td><td>The most common choice for talks</td></tr>
                <tr><td><code>CambridgeUS</code></td><td>Like Madrid in red, with a headline for sections</td><td>Conference talks</td></tr>
                <tr><td><code>Boadilla</code></td><td>Madrid layout with lighter, rounded blocks</td><td>Clean lecture slides</td></tr>
                <tr><td><code>Berlin</code></td><td>Headline with section and frame navigation dots</td><td>Long talks with many sections</td></tr>
                <tr><td><code>Warsaw</code></td><td>Shaded headline with sections, footline with author and title</td><td>Classic academic look</td></tr>
                <tr><td><code>Copenhagen</code></td><td>Warsaw without shading, flat colors</td><td>Academic talks with a lighter feel</td></tr>
                <tr><td><code>Frankfurt</code></td><td>Navigation dots in the headline, no footline</td><td>Seminars</td></tr>
                <tr><td><code>AnnArbor</code></td><td>Dense headline and footline in blue and yellow</td><td>Recognisable branding-style decks</td></tr>
                <tr><td><code>Singapore</code></td><td>Light headline with navigation dots, white body</td><td>Low-ink slides that print well</td></tr>
                <tr><td><code>PaloAlto</code>, <code>Berkeley</code>, <code>Hannover</code></td><td>Table of contents in a sidebar</td><td>Lectures where the outline should stay visible</td></tr>
                <tr><td><code>metropolis</code></td><td>Flat, modern, minimal (separate package, bundled with TeX Live)</td><td>Modern talks; looks best with Fira fonts under XeLaTeX/LuaLaTeX</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The built-in color themes are <code>albatross</code>, <code>beaver</code>,{' '}
            <code>beetle</code>, <code>crane</code>, <code>dolphin</code>, <code>dove</code>,{' '}
            <code>fly</code>, <code>lily</code>, <code>orchid</code>, <code>rose</code>,{' '}
            <code>seagull</code>, <code>seahorse</code>, <code>spruce</code>,{' '}
            <code>whale</code> and <code>wolverine</code>. <code>dove</code> and{' '}
            <code>seagull</code> are greyscale and good for printing. To match a university or
            company color, set the main structure color directly:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usetheme{Madrid}
\\definecolor{brand}{RGB}{0, 92, 151}
\\usecolortheme[named=brand]{structure}
\\setbeamercolor{alerted text}{fg=orange}
\\setbeamertemplate{navigation symbols}{}   % hide the small icons bottom right

\\begin{document}
\\begin{frame}{Brand colors}
  Normal text and \\alert{alerted text}.
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            The aspect ratio is a class option: <code>{`\\documentclass[aspectratio=169]{beamer}`}</code>{' '}
            gives 16:9 slides (the default is 4:3); <code>1610</code>, <code>149</code> and{' '}
            <code>43</code> are also available. For font sizes on slides see{' '}
            <Link href="/learn/font-size">LaTeX font size</Link>.
          </p>

          {/* ── Overlays ── */}
          <h2>Overlays and Pauses</h2>
          <p>
            Overlays reveal a frame step by step. The simplest is <code>\pause</code>: everything
            after it appears on the next slide. Overlay specifications in angle brackets give
            exact control; <code>{`<2->`}</code> means &ldquo;from slide 2 on&rdquo;,{' '}
            <code>{`<3>`}</code> only slide 3, <code>{`<1-2>`}</code> slides 1 and 2, and{' '}
            <code>{`<+->`}</code> &ldquo;from the next step on&rdquo;:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\begin{document}

\\begin{frame}{\\textbackslash pause}
  First sentence.
  \\pause
  Second sentence, on the next slide.
\\end{frame}

\\begin{frame}{Item by item}
  \\begin{itemize}[<+->]        % every item gets its own step
    \\item One
    \\item Two
    \\item Three
  \\end{itemize}
\\end{frame}

\\begin{frame}{\\textbackslash only versus \\textbackslash onslide}
  \\only<1>{Shown on slide 1, takes no space afterwards.}
  \\only<2>{Replaces the line above on slide 2.}

  \\onslide<2->{Hidden on slide 1 but its space is reserved.}

  \\alert<3>{Highlighted on slide 3 only.}
\\end{frame}

\\end{document}`}</code></pre>
          <p>
            The difference between the commands is what happens to hidden content:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Hidden content</th>
                  <th>Typical use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>\pause</code></td><td>Invisible, space reserved</td><td>Reveal the rest of the frame</td></tr>
                <tr><td><code>{`\\onslide<n>{...}`}</code>, <code>{`\\uncover<n>{...}`}</code></td><td>Invisible, space reserved</td><td>Reveal parts without the layout jumping</td></tr>
                <tr><td><code>{`\\visible<n>{...}`}</code></td><td>Invisible, space reserved (no transparency effect)</td><td>Same as <code>\uncover</code></td></tr>
                <tr><td><code>{`\\only<n>{...}`}</code></td><td>Removed, takes no space</td><td>Swap one picture or line for another</td></tr>
                <tr><td><code>{`\\alt<n>{a}{b}`}</code></td><td>Shows <em>a</em> on slide n, <em>b</em> otherwise</td><td>Change a word or formula in place</td></tr>
                <tr><td><code>{`\\item<n->`}</code>, <code>{`\\alert<n>{...}`}</code></td><td>Item hidden or highlight off</td><td>Step through a list</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            With <code>{`\\setbeamercovered{transparent}`}</code> in the preamble, upcoming content
            is shown greyed out instead of invisible, which helps the audience see where the
            frame is going.
          </p>

          {/* ── Columns, blocks, figures ── */}
          <h2>Columns, Blocks and Figures</h2>
          <p>
            The <code>columns</code> environment splits a frame side by side; each{' '}
            <code>column</code> takes a width. Blocks are the boxed paragraphs with a title bar
            that the theme styles: <code>block</code>, <code>alertblock</code> and{' '}
            <code>exampleblock</code>, plus <code>theorem</code>, <code>definition</code>,{' '}
            <code>example</code> and <code>proof</code>, which Beamer defines for you.
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usetheme{Madrid}
\\begin{document}

\\begin{frame}{Two columns}
  \\begin{columns}[T]                         % align column tops
    \\begin{column}{0.48\\textwidth}
      \\begin{itemize}
        \\item Text on the left
        \\item A second point
      \\end{itemize}
      \\begin{alertblock}{Watch out}
        Columns need explicit widths.
      \\end{alertblock}
    \\end{column}
    \\begin{column}{0.48\\textwidth}
      \\centering
      \\includegraphics[width=\\linewidth]{example-image-a}
    \\end{column}
  \\end{columns}
\\end{frame}

\\begin{frame}{Blocks}
  \\begin{block}{Block}
    A standard block.
  \\end{block}
  \\begin{exampleblock}{Example}
    An example block.
  \\end{exampleblock}
  \\begin{theorem}[Pythagoras]
    $a^2 + b^2 = c^2$
  \\end{theorem}
\\end{frame}

\\begin{frame}{A figure with a caption}
  \\begin{figure}
    \\centering
    \\includegraphics[height=0.6\\textheight]{example-image-b}
    \\caption{Figures do not float in Beamer; they stay where you put them.}
  \\end{figure}
\\end{frame}

\\end{document}`}</code></pre>
          <p>
            Beamer loads <code>graphicx</code> and <code>xcolor</code> itself, so{' '}
            <code>\includegraphics</code> works without a <code>\usepackage</code> line. The{' '}
            <code>example-image-a</code> placeholders come from the <code>mwe</code> package;
            replace them with your own file names. Figure captions are unnumbered by default; add{' '}
            <code>{`\\setbeamertemplate{caption}[numbered]`}</code> to number them. Diagrams drawn
            with <Link href="/learn/tikz">TikZ</Link> and plots from{' '}
            <Link href="/learn/pgfplots">pgfplots</Link> go straight into a frame, and{' '}
            <Link href="/learn/tables">tables</Link> work as in any document.
          </p>

          {/* ── Title page and sections ── */}
          <h2>Title Page and Sections</h2>
          <p>
            Set the title information in the preamble and typeset it with{' '}
            <code>\titlepage</code> inside a frame. Short forms in square brackets go into the
            footline, where the full title would not fit. Sections are ordinary{' '}
            <code>\section</code> commands between frames; they drive the navigation bars and{' '}
            the outline:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usetheme{Warsaw}

\\title[Short title]{A Long and Descriptive Title}
\\subtitle{With a subtitle}
\\author[A. Lovelace]{Ada Lovelace}
\\institute[AEL]{Analytical Engine Lab}
\\date{Seminar, \\today}

% Show the outline with the current section highlighted at each new section
\\AtBeginSection[]{
  \\begin{frame}{Outline}
    \\tableofcontents[currentsection]
  \\end{frame}
}

\\begin{document}

\\begin{frame}[plain]
  \\titlepage
\\end{frame}

\\begin{frame}{Outline}
  \\tableofcontents
\\end{frame}

\\section{Introduction}
\\begin{frame}{Motivation}
  Why this matters.
\\end{frame}

\\section{Results}
\\subsection{Main result}
\\begin{frame}{Main result}
  What we found.
\\end{frame}

\\end{document}`}</code></pre>
          <p>
            Adding a logo is one line in the preamble, <code>{`\\logo{\\includegraphics[height=0.8cm]{logo}}`}</code>,
            and footnotes on slides have their own quirks, covered in{' '}
            <Link href="/learn/beamer-footnote">Footnotes in Beamer</Link>. The{' '}
            <Link href="/learn/table-of-contents">table of contents guide</Link> covers outline
            styling in more depth.
          </p>

          {/* ── Handouts and notes ── */}
          <h2>Handouts and Notes</h2>
          <p>
            The <code>handout</code> class option collapses every overlay, so each frame becomes
            a single page with all content visible. That is the version to hand out or upload
            after the talk:
          </p>
          <pre><code>{`\\documentclass[handout]{beamer}
\\usepackage{pgfpages}
\\pgfpagesuselayout{4 on 1}[a4paper, border shrink=5mm, landscape]

\\begin{document}
\\begin{frame}{One page per frame}
  \\begin{itemize}[<+->]
    \\item In the handout
    \\item all items
    \\item appear at once.
  \\end{itemize}
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            <code>pgfpages</code> is optional; the <code>4 on 1</code> layout puts four frames on
            each sheet, and <code>2 on 1</code> or <code>8 on 1</code> also work. Overlays can be
            kept or dropped per mode with specifications such as{' '}
            <code>{`\\only<handout:0>{...}`}</code> (never in the handout) or{' '}
            <code>{`<1-| handout:2>`}</code>.
          </p>
          <p>
            Speaker notes go in <code>{`\\note{...}`}</code>, inside or right after a frame. By
            default they are not shown; one option decides where they go:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usepackage{pgfpages}
\\setbeameroption{show notes on second screen=right}   % slide left, notes right
% \\setbeameroption{show only notes}                   % a notes-only PDF to print

\\begin{document}
\\begin{frame}{Results}
  The chart.
  \\note{Mention the outlier in March before moving on.}
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            The second-screen layout produces double-width pages. A PDF presenter such as{' '}
            <code>pdfpc</code> splits them so the audience sees the slide and you see the notes.
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
                  <td>Frame is too large: content runs off the bottom, <em>Overfull \vbox</em></td>
                  <td>Beamer never moves content to a new slide by itself</td>
                  <td>Split the frame, or use <code>[allowframebreaks]</code> (bibliographies, long lists) or <code>[shrink=10]</code></td>
                </tr>
                <tr>
                  <td><em>Missing &#125; inserted</em>, <em>\verb illegal in command argument</em> or <em>File ended while scanning use of \@xverbatim</em></td>
                  <td><code>\verb</code>, <code>verbatim</code>, <code>lstlisting</code> or <code>minted</code> in a normal frame</td>
                  <td><code>{`\\begin{frame}[fragile]`}</code>, with <code>{`\\end{frame}`}</code> alone on its line</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\usetheme</code></td>
                  <td>The document class is not <code>beamer</code> (e.g. <code>article</code>)</td>
                  <td><code>{`\\documentclass{beamer}`}</code>; for an article version of the slides use <code>{`\\usepackage{beamerarticle}`}</code></td>
                </tr>
                <tr>
                  <td><em>File `beamerthemeMadird.sty&apos; not found</em></td>
                  <td>Misspelled theme name (names are case-sensitive)</td>
                  <td>Check the spelling: <code>Madrid</code>, <code>CambridgeUS</code>, <code>metropolis</code></td>
                </tr>
                <tr>
                  <td>Text outside frames does not appear</td>
                  <td>Only frame content is typeset</td>
                  <td>Move it into a <code>frame</code></td>
                </tr>
                <tr>
                  <td>Layout jumps between overlay steps</td>
                  <td><code>\only</code> removes content and its space</td>
                  <td>Use <code>\onslide</code> or <code>\uncover</code>, or wrap the alternatives in an <code>overlayarea</code></td>
                </tr>
                <tr>
                  <td>Figure numbers or caption labels missing</td>
                  <td>Beamer captions are unnumbered by default</td>
                  <td><code>{`\\setbeamertemplate{caption}[numbered]`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Code listings are the most common reason to need <code>[fragile]</code>:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usepackage{listings}
\\begin{document}
\\begin{frame}[fragile]{Code on a slide}
\\begin{lstlisting}[language=Python]
def square(x):
    return x * x
\\end{lstlisting}
  Inline code works too: \\verb|square(3)|.
\\end{frame}
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>What is Beamer in LaTeX?</h3>
          <p>
            Beamer is a LaTeX document class for presentations. You write{' '}
            <code>{`\\documentclass{beamer}`}</code> instead of <code>article</code>, put each
            slide in a <code>frame</code> environment, and compile to a PDF in which every page
            is a slide. It ships with every TeX distribution, so there is nothing extra to
            install.
          </p>
          <h3>What is a frame in LaTeX Beamer?</h3>
          <p>
            A frame is one slide: everything between <code>{`\\begin{frame}`}</code> and{' '}
            <code>{`\\end{frame}`}</code>. The frame title goes in braces after{' '}
            <code>{`\\begin{frame}`}</code> or in <code>\frametitle</code>. With overlays such as{' '}
            <code>\pause</code>, one frame can produce several PDF pages that build up step by
            step.
          </p>
          <h3>How do I change the Beamer theme?</h3>
          <p>
            Add <code>{`\\usetheme{Madrid}`}</code> (or Berlin, Warsaw, Copenhagen, CambridgeUS,
            metropolis and so on) to the preamble. The colors can be changed separately with{' '}
            <code>{`\\usecolortheme{beaver}`}</code>, <code>{`\\usecolortheme{dolphin}`}</code> or
            another color theme, and the fonts with <code>{`\\usefonttheme{serif}`}</code>.
          </p>
          <h3>How do I make text appear one item at a time in Beamer?</h3>
          <p>
            Put <code>\pause</code> between the items, or give the list an overlay
            specification: <code>{`\\begin{itemize}[<+->]`}</code> reveals one{' '}
            <code>\item</code> per slide. For finer control use <code>{`\\item<2->`}</code> or{' '}
            <code>{`\\onslide<2->{...}`}</code>, which reserve space for hidden content, and{' '}
            <code>{`\\only<2>{...}`}</code>, which does not.
          </p>
          <h3>How do I fix content that does not fit on a Beamer frame?</h3>
          <p>
            Beamer does not move overflowing content to a new slide; it simply runs off the
            bottom. Split the frame, use <code>{`\\begin{frame}[allowframebreaks]`}</code> to
            continue it on extra slides (useful for bibliographies), or{' '}
            <code>{`\\begin{frame}[shrink=10]`}</code> to scale the content down. Reducing the
            font with <code>\small</code> inside the frame also works.
          </p>
          <h3>Why does verbatim or lstlisting fail inside a Beamer frame?</h3>
          <p>
            Beamer reads the whole frame as an argument before typesetting it, and verbatim
            material cannot be read that way. Add the fragile option:{' '}
            <code>{`\\begin{frame}[fragile]`}</code>. Without it you get errors such as
            &ldquo;Missing &#125; inserted&rdquo; or &ldquo;File ended while scanning use of
            \@xverbatim&rdquo;. The <code>{`\\end{frame}`}</code> of a fragile frame must be on a
            line of its own.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/beamer-footnote">Footnotes in Beamer</Link> &ndash; Footnotes in columns, without numbers and on the title page</li>
            <li><Link href="/blog/beamer-presentations-latex-slides-tutorial">Beamer Tutorial (blog)</Link> &ndash; Building a complete talk from outline to handout</li>
            <li><Link href="/learn/tikz">TikZ in LaTeX</Link> &ndash; Diagrams that build up with overlays</li>
            <li><Link href="/learn/font-size">LaTeX Font Size</Link> &ndash; Class options and size commands for slides</li>
            <li><Link href="/learn/spacing">Spacing in LaTeX</Link> &ndash; Vertical space, line spacing and spacing in math</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; The basics every deck builds on</li>
          </ul>

          <h2>Free Beamer Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/beamer-presentation" target="_blank" rel="noopener noreferrer">Beamer Presentation Template</Link> &ndash; A ready-made deck with title page, sections, columns and overlays</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile a frame and see the slide instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a slide and get the Beamer code</li>
          </ul>

          <RelatedPosts searchTerm="Beamer" title="Related Beamer Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Build Beamer slides with AI</h3>
            <p className="text-muted-foreground mb-4">
              Describe your talk and let Octree&apos;s AI write the frames, pick a theme, add the
              overlays and fix the errors, with the PDF compiled next to your code.
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
