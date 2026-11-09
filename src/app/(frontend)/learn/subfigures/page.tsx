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

const breadcrumbs = getLearnBreadcrumbs('Subfigures in LaTeX', 'subfigures')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'subfigures',
  title: 'Subfigures in LaTeX: Side-by-Side Figures with subcaption',
  seoTitle: 'Subfigures in LaTeX: Side-by-Side with subcaption',
  description: 'LaTeX subfigures with the subcaption package: two figures side by side, a 2×2 grid, panel captions and labels, \\ref and \\subref, legacy subfig and fixes.',
  keywords: 'subfigures in latex, latex subfigures, subfigure latex, latex subfigure, subcaption, subcaption package, begin subfigure, side by side figures latex, latex figures side by side, latex two figures side by side, latex subfigure grid, latex 2x2 figure, subref, subfig, subfloat, latex subfigure caption, latex subfigure label, environment subfigure undefined, latex minipage figures',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I make subfigures in LaTeX?',
    answer:
      'Load \\usepackage{subcaption} (and graphicx), then put one subfigure environment per panel inside a figure: \\begin{subfigure}[b]{0.45\\linewidth} ... \\end{subfigure}. Each subfigure gets its own \\caption and \\label, and the figure gets a main \\caption. Panels are labelled (a), (b) and so on automatically.',
  },
  {
    question: 'How do I put two figures side by side in LaTeX?',
    answer:
      'Place two subfigure environments in the same figure with widths that add up to less than the line width, for example 0.48\\linewidth each, separated by \\hfill. If both images should keep their own figure numbers instead of (a) and (b), use two minipage environments with a \\caption in each.',
  },
  {
    question: 'How do I reference a subfigure?',
    answer:
      'Put \\label after the subfigure’s \\caption, then use \\ref{fig:a}, which prints 1a, or \\subref{fig:a}, which prints only (a). To get 1(a) from \\ref, add \\renewcommand\\thesubfigure{(\\alph{subfigure})} and \\captionsetup[sub]{labelformat=simple} to the preamble.',
  },
  {
    question: 'Should I use subfigure, subfig or subcaption?',
    answer:
      'Use subcaption. The subfigure package is obsolete, and subfig has not been updated since 2005. subcaption is maintained together with the caption package. The packages cannot be combined: loading subcaption together with subfig or subfigure stops with an error.',
  },
  {
    question: 'Why are my subfigures stacked instead of side by side?',
    answer:
      'The widths plus the space between them are more than \\linewidth, or there is a blank line between the subfigures, which starts a new paragraph. Reduce the widths (0.48\\linewidth for two, 0.31\\linewidth for three), remove blank lines, and end lines with % or separate the panels with \\hfill.',
  },
  {
    question: 'How do I make a 2×2 grid of subfigures?',
    answer:
      'Put four subfigure environments of 0.48\\linewidth in one figure, with \\hfill between the two panels of each row and a blank line or \\par\\medskip between the rows. The blank line ends the first row, so the third and fourth panels start a new one.',
  },
]

export default async function LearnSubfiguresPage() {
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
          <h1>Subfigures in LaTeX: Side-by-Side Figures with subcaption</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Package:</strong> <code>{`\\usepackage{subcaption}`}</code> with{' '}
                <code>graphicx</code>.
              </li>
              <li>
                <strong>One panel:</strong> <code>{`\\begin{subfigure}[b]{0.45\\linewidth}`}</code>{' '}
                &hellip; <code>{`\\end{subfigure}`}</code> inside a <code>figure</code>, with its
                own <code>\caption</code> and <code>\label</code>.
              </li>
              <li>
                <strong>Side by side:</strong> widths that sum to less than{' '}
                <code>\linewidth</code>, separated by <code>\hfill</code>.
              </li>
              <li>
                <strong>References:</strong> <code>{`\\ref{fig:a}`}</code> prints 1a,{' '}
                <code>{`\\subref{fig:a}`}</code> prints (a).
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{Before}
    \\label{fig:a}
  \\end{subfigure}
  \\hfill
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{After}
    \\label{fig:b}
  \\end{subfigure}
  \\caption{Two subfigures side by side.}
  \\label{fig:both}
\\end{figure}

Figure~\\ref{fig:both} has two panels: \\ref{fig:a} and \\ref{fig:b}.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            Subfigures are panels inside one figure, each with its own small caption, sharing
            one figure number and a main caption. The <code>subcaption</code> package is the
            modern way to make them in LaTeX. This guide covers two figures side by side, the
            options that control widths and alignment, a 2&times;2 grid, referencing single
            panels, customizing the subcaptions, the older <code>subfig</code> package and the
            errors that come up most. Every snippet compiles as shown; the{' '}
            <code>example-image</code> placeholders come with TeX Live, so replace them with
            your own file names.
          </p>

          {/* ── subcaption ── */}
          <h2>Subfigures in LaTeX with subcaption</h2>
          <p>
            The <code>subfigure</code> environment works like a <code>minipage</code>: it takes
            a width, and everything inside, usually an <code>\includegraphics</code>, a{' '}
            <code>\caption</code> and a <code>\label</code>, is set in a box of that width.
            Its syntax is:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}

\\begin{document}
\\begin{figure}
  \\centering
  % \\begin{subfigure}[position]{width}
  \\begin{subfigure}[t]{0.3\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{First}
  \\end{subfigure}
  \\begin{subfigure}[t]{0.3\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{Second}
  \\end{subfigure}
  \\begin{subfigure}[t]{0.3\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-c}
    \\caption{Third}
  \\end{subfigure}
  \\caption{Three panels in one row.}
\\end{figure}
\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`{0.45\\linewidth}`}</code></td><td>Width of the panel; the image inside should use <code>width=\linewidth</code> to fill it</td></tr>
                <tr><td><code>[b]</code></td><td>Align panels at their bottoms, so captions line up when images have different heights</td></tr>
                <tr><td><code>[t]</code></td><td>Align at the top line; with images, this aligns their bottom edges too, because an image sits on the baseline</td></tr>
                <tr><td><code>[c]</code></td><td>Align at the vertical centers (the default)</td></tr>
                <tr><td><code>\caption</code> inside</td><td>Subcaption labelled (a), (b), &hellip;</td></tr>
                <tr><td><code>\caption</code> outside</td><td>The main caption with the figure number</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── side by side ── */}
          <h2>Side-by-Side Figures: Widths and Spacing</h2>
          <p>
            Panels go next to each other as long as their widths, plus any space between them,
            fit in <code>\linewidth</code>. Three ways to control the gap:
          </p>
          <ul>
            <li>
              <code>\hfill</code> pushes the panels to the margins and puts all leftover space
              between them.
            </li>
            <li>
              <code>{`\\hspace{1em}`}</code> gives a fixed gap; use it with{' '}
              <code>\centering</code>.
            </li>
            <li>
              A <code>%</code> at the end of a line removes the space a line break would add,
              so two panels of <code>0.5\linewidth</code> fit exactly.
            </li>
          </ul>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{subfigure}[b]{0.4\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{A wide image}
    \\label{fig:wide}
  \\end{subfigure}%
  \\hspace{2em}%
  \\begin{subfigure}[b]{0.25\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-golden-upright}
    \\caption{A tall image}
    \\label{fig:tall}
  \\end{subfigure}
  \\caption{Panels of different sizes, aligned at the bottom.}
\\end{figure}
\\end{document}`}</code></pre>
          <p>
            Common widths: <code>0.48\linewidth</code> for two panels,{' '}
            <code>0.31\linewidth</code> for three and <code>0.23\linewidth</code> for four.
            Inside a two-column document, <code>\linewidth</code> is the column width; use{' '}
            <code>figure*</code> to span both columns.
          </p>

          {/* ── grid ── */}
          <h2>Subfigure Grid: 2&times;2 Example</h2>
          <p>
            A grid is several rows of side-by-side panels. A blank line (or{' '}
            <code>\par</code>) ends a row, and <code>\medskip</code> or{' '}
            <code>{`\\vspace{...}`}</code> adds space between rows:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{subfigure}[b]{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{Top left}
    \\label{fig:tl}
  \\end{subfigure}
  \\hfill
  \\begin{subfigure}[b]{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{Top right}
    \\label{fig:tr}
  \\end{subfigure}

  \\medskip
  \\begin{subfigure}[b]{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-c}
    \\caption{Bottom left}
    \\label{fig:bl}
  \\end{subfigure}
  \\hfill
  \\begin{subfigure}[b]{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image}
    \\caption{Bottom right}
    \\label{fig:br}
  \\end{subfigure}
  \\caption{A 2$\\times$2 grid of subfigures.}
  \\label{fig:grid}
\\end{figure}

Panels \\subref{fig:tl} and \\subref{fig:br} of Figure~\\ref{fig:grid}.
\\end{document}`}</code></pre>
          <p>
            A grid of four large images may be taller than the page allows, in which case the
            figure moves to the end of the document. Reduce the widths or use{' '}
            <code>{`\\begin{figure}[p]`}</code> for a page of its own. Placement options are
            explained in the <Link href="/learn/tables">tables guide</Link>, which uses the same
            float rules.
          </p>

          <div className="not-prose my-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Lay out figures without trial and error</h3>
            <p className="text-muted-foreground mb-4">
              Upload your images to Octree and ask the AI for a 2&times;2 grid or two panels
              side by side. It writes the <code>subcaption</code> code, sizes the panels and
              shows the PDF next to it. Sign up free.
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

          {/* ── referencing ── */}
          <h2>Referencing Subfigures with \ref and \subref</h2>
          <p>
            Put each <code>\label</code> after the <code>\caption</code> it belongs to. A label
            inside a subfigure refers to the panel, a label after the main caption to the whole
            figure:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Output</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`\\ref{fig:both}`}</code></td><td>1</td><td>The whole figure</td></tr>
                <tr><td><code>{`\\ref{fig:a}`}</code></td><td>1a</td><td>A panel, in running text</td></tr>
                <tr><td><code>{`\\subref{fig:a}`}</code></td><td>(a)</td><td>A panel, when the figure number is already clear</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Many journals prefer &ldquo;Figure 1(a)&rdquo;. Changing the subfigure counter
            format gives that from <code>\ref</code>, and switching the caption label format to{' '}
            <code>simple</code> stops the parentheses from doubling in the subcaptions:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}
\\renewcommand\\thesubfigure{(\\alph{subfigure})}
\\captionsetup[sub]{labelformat=simple}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{Left}
    \\label{fig:left}
  \\end{subfigure}
  \\hfill
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{Right}
    \\label{fig:right}
  \\end{subfigure}
  \\caption{Panels referenced as 1(a) and 1(b).}
\\end{figure}

See Figure~\\ref{fig:left} and Figure~\\ref{fig:right}.
\\end{document}`}</code></pre>
          <p>
            With <code>hyperref</code> loaded, the references become links that jump to the
            panel; see <Link href="/learn/hyperlinks">hyperlinks in LaTeX</Link>.
          </p>

          {/* ── customizing ── */}
          <h2>Customizing Subcaptions</h2>
          <p>
            <code>subcaption</code> is part of the <code>caption</code> bundle, so{' '}
            <code>\captionsetup</code> controls the subcaptions with the <code>sub</code>{' '}
            (or <code>subfigure</code>) key:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subcaption}
\\captionsetup[sub]{font=footnotesize, labelfont=bf, justification=centering}
\\renewcommand\\thesubfigure{\\Alph{subfigure}}   % (A), (B) instead of (a), (b)

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{Bold labels, small text}
  \\end{subfigure}
  \\hfill
  \\begin{subfigure}[b]{0.45\\linewidth}
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{}   % label only, no text
  \\end{subfigure}
  \\caption{Customized subcaptions.}
\\end{figure}
\\end{document}`}</code></pre>
          <p>
            An empty <code>{`\\caption{}`}</code> prints just the label, such as (B). Leave out{' '}
            <code>\caption</code> entirely for a panel without a label.
          </p>

          {/* ── minipage ── */}
          <h2>Side-by-Side Figures with Separate Numbers (minipage)</h2>
          <p>
            When two images are separate figures that should simply sit next to each other,
            with &ldquo;Figure 1&rdquo; and &ldquo;Figure 2&rdquo; rather than (a) and (b),
            use two <code>minipage</code> environments in one <code>figure</code>. No extra
            package is needed:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}

\\begin{document}
\\begin{figure}[htbp]
  \\begin{minipage}[b]{0.48\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{The first figure.}
    \\label{fig:first}
  \\end{minipage}
  \\hfill
  \\begin{minipage}[b]{0.48\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{The second figure.}
    \\label{fig:second}
  \\end{minipage}
\\end{figure}
\\end{document}`}</code></pre>
          <p>
            The same trick puts a figure next to a table: use <code>\captionof</code> from the{' '}
            <code>caption</code> package inside the minipage, for example{' '}
            <code>{`\\captionof{table}{...}`}</code>, to give each its own counter.
          </p>

          {/* ── subfig ── */}
          <h2>The Legacy subfig Package and \subfloat</h2>
          <p>
            Older templates use <code>subfig</code> and its <code>\subfloat</code> command,
            which takes the caption as an optional argument. It still works, but{' '}
            <code>subcaption</code> is the maintained choice for new documents, and the two
            cannot be loaded together. The even older <code>subfigure</code> package is
            obsolete.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{subfig}   % legacy: do not combine with subcaption

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\subfloat[Left panel\\label{fig:sf-a}]{%
    \\includegraphics[width=0.45\\linewidth]{example-image-a}}
  \\hfill
  \\subfloat[Right panel\\label{fig:sf-b}]{%
    \\includegraphics[width=0.45\\linewidth]{example-image-b}}
  \\caption{Two panels with subfig.}
\\end{figure}
\\end{document}`}</code></pre>
          <p>
            <code>subcaption</code> has a <code>\subcaptionbox</code> command that takes the
            same two pieces, caption and content, so porting old <code>\subfloat</code> code is easy:{' '}
            <code>{`\\subcaptionbox{Left panel\\label{fig:a}}{\\includegraphics[width=0.45\\linewidth]{img}}`}</code>.
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
                  <td><em>LaTeX Error: Environment subfigure undefined</em></td>
                  <td><code>subcaption</code> is not loaded</td>
                  <td><code>{`\\usepackage{subcaption}`}</code> in the preamble</td>
                </tr>
                <tr>
                  <td><em>Package subcaption Error: This package can&apos;t be used in cooperation with the subfig package</em> (or <em>subfigure package</em>)</td>
                  <td><code>subcaption</code> together with <code>subfig</code> or <code>subfigure</code>, often from a template</td>
                  <td>Keep one package; convert <code>\subfloat</code> to <code>\subcaptionbox</code></td>
                </tr>
                <tr>
                  <td>Panels stacked vertically instead of side by side</td>
                  <td>Widths plus spaces exceed <code>\linewidth</code>, or a blank line between panels</td>
                  <td>Smaller widths (<code>0.48\linewidth</code>), <code>\hfill</code> between panels, <code>%</code> at line ends, no blank lines inside a row</td>
                </tr>
                <tr>
                  <td><em>Overfull \hbox</em>, image sticks out of its panel</td>
                  <td>Image wider than the subfigure, e.g. <code>width=\textwidth</code> inside a <code>0.45\linewidth</code> panel</td>
                  <td>Use <code>width=\linewidth</code> inside the subfigure; it refers to the panel width</td>
                </tr>
                <tr>
                  <td><code>\ref</code> prints a wrong number (the section or an earlier figure), not the panel</td>
                  <td><code>\label</code> before the subfigure&apos;s <code>\caption</code></td>
                  <td>Put <code>\label</code> after <code>\caption</code> inside the subfigure</td>
                </tr>
                <tr>
                  <td>Captions not aligned when images differ in height</td>
                  <td>Default center alignment</td>
                  <td><code>{`\\begin{subfigure}[b]{...}`}</code> on every panel</td>
                </tr>
                <tr>
                  <td><em>File `image.png&apos; not found</em></td>
                  <td>Image not uploaded or name differs in case or extension</td>
                  <td>Check the file name, or set <code>{`\\graphicspath{{figures/}}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I make subfigures in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage{subcaption}`}</code> (and <code>graphicx</code>), then put
            one <code>subfigure</code> environment per panel inside a <code>figure</code>:{' '}
            <code>{`\\begin{subfigure}[b]{0.45\\linewidth} ... \\end{subfigure}`}</code>. Each
            subfigure gets its own <code>\caption</code> and <code>\label</code>, and the figure
            gets a main <code>\caption</code>. Panels are labelled (a), (b) and so on
            automatically.
          </p>
          <h3>How do I put two figures side by side in LaTeX?</h3>
          <p>
            Place two <code>subfigure</code> environments in the same figure with widths that
            add up to less than the line width, for example <code>0.48\linewidth</code> each,
            separated by <code>\hfill</code>. If both images should keep their own figure
            numbers instead of (a) and (b), use two <code>minipage</code> environments with a{' '}
            <code>\caption</code> in each.
          </p>
          <h3>How do I reference a subfigure?</h3>
          <p>
            Put <code>\label</code> after the subfigure&rsquo;s <code>\caption</code>, then use{' '}
            <code>{`\\ref{fig:a}`}</code>, which prints 1a, or <code>{`\\subref{fig:a}`}</code>,
            which prints only (a). To get 1(a) from <code>\ref</code>, add{' '}
            <code>{`\\renewcommand\\thesubfigure{(\\alph{subfigure})}`}</code> and{' '}
            <code>{`\\captionsetup[sub]{labelformat=simple}`}</code> to the preamble.
          </p>
          <h3>Should I use subfigure, subfig or subcaption?</h3>
          <p>
            Use <code>subcaption</code>. The <code>subfigure</code> package is obsolete, and{' '}
            <code>subfig</code> has not been updated since 2005. <code>subcaption</code> is maintained together with
            the <code>caption</code> package. The packages cannot be combined: loading{' '}
            <code>subcaption</code> together with <code>subfig</code> or{' '}
            <code>subfigure</code> stops with an error.
          </p>
          <h3>Why are my subfigures stacked instead of side by side?</h3>
          <p>
            The widths plus the space between them are more than <code>\linewidth</code>, or
            there is a blank line between the subfigures, which starts a new paragraph. Reduce
            the widths (<code>0.48\linewidth</code> for two, <code>0.31\linewidth</code> for
            three), remove blank lines, and end lines with <code>%</code> or separate the
            panels with <code>\hfill</code>.
          </p>
          <h3>How do I make a 2×2 grid of subfigures?</h3>
          <p>
            Put four <code>subfigure</code> environments of <code>0.48\linewidth</code> in one
            figure, with <code>\hfill</code> between the two panels of each row and a blank line
            or <code>\par\medskip</code> between the rows. The blank line ends the first row, so
            the third and fourth panels start a new one.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> &ndash; Floats, captions and placement for tables</li>
            <li><Link href="/learn/tikz">TikZ in LaTeX</Link> &ndash; Draw the diagrams that go into your panels</li>
            <li><Link href="/learn/pgfplots">pgfplots</Link> &ndash; Plots that can sit inside subfigures</li>
            <li><Link href="/learn/hyperlinks">Hyperlinks in LaTeX</Link> &ndash; Clickable references with hyperref</li>
            <li><Link href="/learn/page-size-margins">Page Size &amp; Margins</Link> &ndash; More room for wide figures</li>
            <li><Link href="/learn/latex">Learn LaTeX: Tutorial for Beginners</Link> &ndash; Figures, graphics and the basics</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Check a subfigure layout instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/image-to-tikz" target="_blank" rel="noopener noreferrer">Image to TikZ</Link> &ndash; Turn a sketch into a TikZ figure</li>
            <li><Link href="https://tools.useoctree.com/tools/pgfplots-generator" target="_blank" rel="noopener noreferrer">pgfplots Generator</Link> &ndash; Generate plots for your panels</li>
          </ul>

          <RelatedPosts searchTerm="Figure" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Arrange figures with AI</h3>
            <p className="text-muted-foreground mb-4">
              Tell Octree&apos;s AI how the panels should be arranged and it writes the{' '}
              <code>subcaption</code> code, fixes overflowing widths and broken references,
              with the PDF compiled next to your code.
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
