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

const breadcrumbs = getLearnBreadcrumbs('Figures in LaTeX', 'images')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'images',
  title: 'Figures in LaTeX: \\includegraphics, Captions and References',
  seoTitle: 'Figures in LaTeX: \\includegraphics, Captions, \\ref',
  description: 'Figures in LaTeX: \\includegraphics with width and scale, the figure environment, [htbp] and [H] placement, captions, \\label and \\ref, wrapfig and errors.',
  keywords: 'figures in latex, figure in latex, latex figure, latex includegraphics, includegraphics, latex image, latex insert image, figures reference, figure ref, latex figure ref, latex ref figure, latex autoref, latex caption, latex figure placement, latex figure htbp, latex figure H, latex float, latex centering figure, latex figure width, graphicspath, wrapfig, wrapfigure, list of figures, too many unprocessed floats, latex file not found image',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I insert an image in LaTeX?',
    answer:
      'Load \\usepackage{graphicx} in the preamble and write \\includegraphics[width=0.8\\textwidth]{plot} where the image should go. The file extension can be left out; pdfLaTeX accepts PDF, PNG and JPG. For a numbered figure with a caption, put it inside \\begin{figure} … \\end{figure} with \\centering, \\caption{...} and \\label{fig:plot}.',
  },
  {
    question: 'How do I reference a figure in LaTeX?',
    answer:
      'Give the figure a label after its caption, \\caption{Results}\\label{fig:results}, and write Figure~\\ref{fig:results} in the text. With hyperref, \\autoref{fig:results} adds the word “Figure” and makes it a link. Compile twice so the numbers resolve; ?? means the label is not known yet or is misspelled.',
  },
  {
    question: 'How do I keep a figure where I put it in LaTeX?',
    answer:
      'Figures are floats, so LaTeX moves them to where they fit best. Give a placement such as [htbp] or [!htbp] to allow more positions, or load the float package and use [H] to force the figure exactly where it is in the source. \\FloatBarrier from the placeins package stops figures from moving past a point, for example the end of a section.',
  },
  {
    question: 'Why does my figure caption show the wrong number?',
    answer:
      'The \\label is before the \\caption. \\label picks up the most recent number, which before the caption is the section number. Always put \\label after \\caption (or inside it). If the number is ?? instead, compile again, since references take two runs.',
  },
  {
    question: 'How do I put two figures side by side in LaTeX?',
    answer:
      'Place two minipages next to each other inside one figure environment, each with its own \\includegraphics and \\caption, and widths that add up to less than \\linewidth, such as 0.48\\linewidth each. For sub-labels (a) and (b) under one main caption, use the subcaption package and its subfigure environment.',
  },
  {
    question: 'What does “Too many unprocessed floats” mean?',
    answer:
      'LaTeX keeps up to 18 figures and tables waiting to be placed. If one cannot be placed, often because its placement is too strict like [h] or it is too large, everything after it queues up until the limit is hit. Allow more positions with [htbp], make the figure smaller, add \\clearpage to flush the queue, or use [H] from the float package.',
  },
]

export default async function LearnImagesPage() {
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
          <h1>Figures in LaTeX: \includegraphics, Captions and References</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Insert an image:</strong> <code>{`\\usepackage{graphicx}`}</code>, then{' '}
                <code>{`\\includegraphics[width=0.8\\textwidth]{plot}`}</code> (PDF, PNG or JPG;
                extension optional).
              </li>
              <li>
                <strong>A numbered figure:</strong> wrap it in <code>{`\\begin{figure}[htbp]`}</code>{' '}
                with <code>\centering</code>, <code>{`\\caption{...}`}</code> and{' '}
                <code>{`\\label{fig:plot}`}</code>, label after caption.
              </li>
              <li>
                <strong>Reference it:</strong> <code>{`Figure~\\ref{fig:plot}`}</code>, or{' '}
                <code>{`\\autoref{fig:plot}`}</code> with hyperref.
              </li>
              <li>
                <strong>Keep it in place:</strong> <code>{`\\usepackage{float}`}</code> and{' '}
                <code>{`\\begin{figure}[H]`}</code>.
              </li>
              <li>
                <strong>Text around it:</strong> <code>wrapfigure</code> from the{' '}
                <code>wrapfig</code> package. <strong>List of figures:</strong>{' '}
                <code>\listoffigures</code>.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{graphicx}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.6\\textwidth]{example-image-a}
  \\caption{A sample figure.}
  \\label{fig:sample}
\\end{figure}

Figure~\\ref{fig:sample} shows a sample image.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            A figure in LaTeX has two parts: the image itself, inserted with{' '}
            <code>\includegraphics</code> from the <code>graphicx</code> package, and the{' '}
            <code>figure</code> environment around it, which adds a numbered caption and lets
            LaTeX place it where it fits on the page. This guide covers both, how to size and
            position images, how to label and reference figures, wrapping text around a figure,
            the list of figures, and the errors that come up most: missing files, too many
            unprocessed floats and figures that drift away from their text.
          </p>
          <p>
            The examples use <code>example-image-a</code>, a placeholder that ships with every
            TeX distribution (the <code>mwe</code> package), so they compile as they are. Replace
            it with your own file name, such as <code>figures/plot</code>.
          </p>

          {/* ── includegraphics ── */}
          <h2>LaTeX \includegraphics: Inserting an Image</h2>
          <p>
            <code>{`\\includegraphics{file}`}</code> places an image at its natural size, like a
            large letter in the line. The optional argument sizes and transforms it:
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
                <tr><td><code>width=0.8\textwidth</code></td><td>Width as a fraction of the text width (height scales to match)</td></tr>
                <tr><td><code>width=\linewidth</code></td><td>Full width of the current column or minipage</td></tr>
                <tr><td><code>height=5cm</code></td><td>A fixed height</td></tr>
                <tr><td><code>width=8cm, height=5cm, keepaspectratio</code></td><td>Fit inside the box without distortion</td></tr>
                <tr><td><code>scale=0.5</code></td><td>Half the natural size</td></tr>
                <tr><td><code>angle=90</code></td><td>Rotate counter-clockwise by 90 degrees</td></tr>
                <tr><td><code>trim=1cm 0 1cm 0, clip</code></td><td>Cut 1cm from the left and right (left bottom right top)</td></tr>
                <tr><td><code>page=3</code></td><td>Page 3 of a multi-page PDF</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\graphicspath{{figures/}{images/}}   % folders to search, each in braces

\\begin{document}
\\includegraphics[width=0.45\\textwidth]{example-image-a}
\\hfill
\\includegraphics[scale=0.2, angle=90]{example-image-b}

\\includegraphics[width=\\linewidth, height=3cm, keepaspectratio]{example-image}

\\includegraphics[trim=2cm 1cm 2cm 1cm, clip, width=0.5\\textwidth]{example-image-c}
\\end{document}`}</code></pre>
          <p>
            Leave out the file extension and LaTeX picks the best format available. pdfLaTeX,
            XeLaTeX and LuaLaTeX read PDF, PNG and JPG; EPS files are converted to PDF
            automatically by current distributions. SVG is not supported directly: export it to
            PDF, or use the <code>svg</code> package with Inkscape installed. Prefer PDF for
            plots and diagrams so they stay sharp at any zoom, and PNG or JPG for photos.
          </p>

          {/* ── figure env ── */}
          <h2>The figure Environment and Captions</h2>
          <p>
            Wrap the image in <code>figure</code> to get a caption and a number. Inside it:
          </p>
          <ul>
            <li><code>\centering</code> centers the content. Prefer it to the <code>center</code> environment, which adds extra vertical space inside the float.</li>
            <li><code>{`\\caption{...}`}</code> adds &ldquo;Figure 1: ...&rdquo;. Put it below the image for figures (above is the convention for tables).</li>
            <li><code>{`\\caption[Short]{Long caption...}`}</code> puts the short version in the list of figures.</li>
            <li><code>{`\\label{fig:name}`}</code> goes <em>after</em> <code>\caption</code>.</li>
          </ul>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{caption}
\\captionsetup{font=small, labelfont=bf}   % "Figure 1:" in bold, small text

\\begin{document}
\\listoffigures

\\section{Results}
\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.7\\textwidth]{example-image-a}
  \\caption[Measured response]{Measured response of the system over ten trials.
           The shaded band is one standard deviation.}
  \\label{fig:response}
\\end{figure}

The response in Figure~\\ref{fig:response} settles after a few trials.
\\end{document}`}</code></pre>

          {/* ── Placement ── */}
          <h2>Figure Placement: [htbp], [H] and Floats</h2>
          <p>
            <code>figure</code> is a <em>float</em>: LaTeX moves it to a place where it does not
            leave a half-empty page. The optional argument says which places are allowed, and
            LaTeX tries them in the order h, t, b, p regardless of how you write them:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Specifier</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>h</code></td><td>Here, at this point in the text, if it fits</td></tr>
                <tr><td><code>t</code></td><td>Top of a page</td></tr>
                <tr><td><code>b</code></td><td>Bottom of a page</td></tr>
                <tr><td><code>p</code></td><td>On a separate page of floats</td></tr>
                <tr><td><code>!</code></td><td>Relax the limits on how much of a page floats may take</td></tr>
                <tr><td><code>H</code></td><td>Exactly here, not a float at all (needs <code>{`\\usepackage{float}`}</code>)</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The default is <code>tbp</code>. <code>[htbp]</code> is the usual safe choice;
            a lone <code>[h]</code> is risky, because if the figure does not fit right there it
            waits, and every later float waits behind it.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{float}      % provides [H]
\\usepackage{placeins}   % provides \\FloatBarrier

\\begin{document}
\\section{Setup}
Text before the figure.

\\begin{figure}[H]       % exactly here, never moved
  \\centering
  \\includegraphics[width=0.5\\textwidth]{example-image-b}
  \\caption{The setup, placed exactly where it appears in the source.}
  \\label{fig:setup}
\\end{figure}

Text after the figure.
\\FloatBarrier           % no float from above moves past this point

\\section{Next}
Figure~\\ref{fig:setup} stays in the Setup section.
\\end{document}`}</code></pre>
          <p>
            <code>[H]</code> can leave a large gap at the bottom of a page when the figure does
            not fit and moves to the next one. If that happens, let the figure float with{' '}
            <code>[htbp]</code> and refer to it by number instead of &ldquo;below&rdquo;.
          </p>

          {/* ── References ── */}
          <h2>Figure References: \label, \ref and \autoref</h2>
          <p>
            A label gives the figure a name; references print its number and update when figures
            are added or moved. Use a prefix like <code>fig:</code> to keep labels organized, and
            a <code>~</code> so &ldquo;Figure&rdquo; and the number never split across lines.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Output</th>
                  <th>Package</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>{`Figure~\\ref{fig:plot}`}</code></td><td>Figure 2</td><td>None</td></tr>
                <tr><td><code>{`\\pageref{fig:plot}`}</code></td><td>The page number, e.g. 5</td><td>None</td></tr>
                <tr><td><code>{`\\autoref{fig:plot}`}</code></td><td>Figure 2 (as a link)</td><td><code>hyperref</code></td></tr>
                <tr><td><code>{`\\cref{fig:plot}`}</code></td><td>fig. 2 (<code>\Cref</code>: Figure 2)</td><td><code>cleveref</code>, after hyperref</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{cleveref}   % load after hyperref

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=0.5\\textwidth]{example-image-c}
  \\caption{Error rate per epoch.}
  \\label{fig:error}     % after \\caption
\\end{figure}

As Figure~\\ref{fig:error} on page~\\pageref{fig:error} shows, the error drops.
\\autoref{fig:error} is a clickable reference, and so is \\Cref{fig:error}.
\\end{document}`}</code></pre>
          <p>
            References need two compilations: the first writes the numbers to the{' '}
            <code>.aux</code> file, the second reads them. Until then you see{' '}
            <strong>??</strong>. Hyperlink styling is covered in{' '}
            <Link href="/learn/hyperlinks">hyperlinks</Link>, and the same{' '}
            <code>\label</code>/<code>\ref</code> scheme numbers equations in{' '}
            <Link href="/learn/equation-numbering">equation numbering</Link>.
          </p>

          {/* ── Side by side + wrapfig ── */}
          <h2>Side-by-Side Figures and wrapfig</h2>
          <p>
            For two images in one figure, put each in a <code>minipage</code> with its own
            caption. For panels labeled (a), (b) under a shared caption, use{' '}
            <code>subcaption</code>; the <Link href="/learn/subfigures">subfigures guide</Link>{' '}
            covers it in detail.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}

\\begin{document}
\\begin{figure}[htbp]
  \\centering
  \\begin{minipage}{0.48\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-a}
    \\caption{Before training.}
    \\label{fig:before}
  \\end{minipage}\\hfill
  \\begin{minipage}{0.48\\linewidth}
    \\centering
    \\includegraphics[width=\\linewidth]{example-image-b}
    \\caption{After training.}
    \\label{fig:after}
  \\end{minipage}
\\end{figure}
\\end{document}`}</code></pre>
          <p>
            To let text flow around a smaller figure, use <code>wrapfigure</code> from{' '}
            <code>wrapfig</code>. It takes the side (<code>r</code> or <code>l</code>) and the
            width, and must start at the beginning of a paragraph, not right before a list or a
            heading:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{graphicx}
\\usepackage{wrapfig}
\\usepackage{lipsum}

\\begin{document}
\\begin{wrapfigure}{r}{0.4\\textwidth}
  \\centering
  \\includegraphics[width=0.38\\textwidth]{example-image-a}
  \\caption{A figure with text wrapped around it.}
  \\label{fig:wrapped}
\\end{wrapfigure}
\\lipsum[1-2]
\\end{document}`}</code></pre>

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
                  <td><em>LaTeX Error: File `plot&apos; not found</em></td>
                  <td>Wrong path or name, a different case (<code>Plot.PNG</code> vs <code>plot.png</code>), or the file was not uploaded</td>
                  <td>Check the path relative to the main <code>.tex</code> file, match the case, or set <code>\graphicspath</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Unknown graphics extension: .svg</em></td>
                  <td>The engine cannot read that format</td>
                  <td>Convert to PDF or PNG, or use the <code>svg</code> package</td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Too many unprocessed floats</em></td>
                  <td>One float cannot be placed (strict <code>[h]</code>, too large) and 18 more queue up behind it</td>
                  <td>Use <code>[htbp]</code>, shrink the figure, add <code>\clearpage</code>, or use <code>[H]</code></td>
                </tr>
                <tr>
                  <td>Figure ends up pages away or at the end of the chapter</td>
                  <td>The figure is too tall for the space, or only <code>[h]</code> or <code>[p]</code> is allowed</td>
                  <td><code>[!htbp]</code>, a smaller width, <code>\FloatBarrier</code>, or <code>[H]</code></td>
                </tr>
                <tr>
                  <td>The reference shows <strong>??</strong></td>
                  <td>Only one compile, or a misspelled label</td>
                  <td>Compile again; check the label name in the log warning <em>Reference ... undefined</em></td>
                </tr>
                <tr>
                  <td>The reference shows the section number</td>
                  <td><code>\label</code> is before <code>\caption</code></td>
                  <td>Move <code>\label</code> after <code>\caption</code></td>
                </tr>
                <tr>
                  <td><em>LaTeX Error: Not in outer par mode</em></td>
                  <td>A <code>figure</code> inside a minipage, table cell or another float</td>
                  <td>Use plain <code>\includegraphics</code> with <code>\captionof&#123;figure&#125;</code> (caption package) there</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\includegraphics</code></td>
                  <td><code>graphicx</code> is not loaded</td>
                  <td><code>{`\\usepackage{graphicx}`}</code></td>
                </tr>
                <tr>
                  <td><em>Overfull \hbox</em>, image sticks into the margin</td>
                  <td>Natural size or a width larger than <code>\textwidth</code></td>
                  <td><code>width=\linewidth</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Paths with spaces or extra dots in the file name (<code>my plot.v2.png</code>) also
            cause trouble on some setups; rename files to letters, digits, hyphens and
            underscores. For a full walkthrough of image formats and folder layouts, see the{' '}
            <Link href="/blog/insert-images-latex-complete-guide">guide to inserting images in LaTeX</Link>.
          </p>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I insert an image in LaTeX?</h3>
          <p>
            Load <code>{`\\usepackage{graphicx}`}</code> in the preamble and write{' '}
            <code>{`\\includegraphics[width=0.8\\textwidth]{plot}`}</code> where the image should
            go. The file extension can be left out; pdfLaTeX accepts PDF, PNG and JPG. For a
            numbered figure with a caption, put it inside <code>{`\\begin{figure}`}</code> &hellip;{' '}
            <code>{`\\end{figure}`}</code> with <code>\centering</code>,{' '}
            <code>{`\\caption{...}`}</code> and <code>{`\\label{fig:plot}`}</code>.
          </p>
          <h3>How do I reference a figure in LaTeX?</h3>
          <p>
            Give the figure a label after its caption,{' '}
            <code>{`\\caption{Results}\\label{fig:results}`}</code>, and write{' '}
            <code>{`Figure~\\ref{fig:results}`}</code> in the text. With hyperref,{' '}
            <code>{`\\autoref{fig:results}`}</code> adds the word &ldquo;Figure&rdquo; and makes it
            a link. Compile twice so the numbers resolve; ?? means the label is not known yet or
            is misspelled.
          </p>
          <h3>How do I keep a figure where I put it in LaTeX?</h3>
          <p>
            Figures are floats, so LaTeX moves them to where they fit best. Give a placement such
            as <code>[htbp]</code> or <code>[!htbp]</code> to allow more positions, or load the
            float package and use <code>[H]</code> to force the figure exactly where it is in the
            source. <code>\FloatBarrier</code> from the placeins package stops figures from moving
            past a point, for example the end of a section.
          </p>
          <h3>Why does my figure caption show the wrong number?</h3>
          <p>
            The <code>\label</code> is before the <code>\caption</code>. <code>\label</code> picks
            up the most recent number, which before the caption is the section number. Always put{' '}
            <code>\label</code> after <code>\caption</code> (or inside it). If the number is ??
            instead, compile again, since references take two runs.
          </p>
          <h3>How do I put two figures side by side in LaTeX?</h3>
          <p>
            Place two minipages next to each other inside one figure environment, each with its
            own <code>\includegraphics</code> and <code>\caption</code>, and widths that add up
            to less than <code>\linewidth</code>, such as <code>0.48\linewidth</code> each. For
            sub-labels (a) and (b) under one main caption, use the subcaption package and its
            subfigure environment.
          </p>
          <h3>What does &ldquo;Too many unprocessed floats&rdquo; mean?</h3>
          <p>
            LaTeX keeps up to 18 figures and tables waiting to be placed. If one cannot be placed,
            often because its placement is too strict like <code>[h]</code> or it is too large,
            everything after it queues up until the limit is hit. Allow more positions with{' '}
            <code>[htbp]</code>, make the figure smaller, add <code>\clearpage</code> to flush the
            queue, or use <code>[H]</code> from the float package.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/subfigures">Subfigures</Link> &ndash; Panels (a), (b) with subcaption</li>
            <li><Link href="/blog/insert-images-latex-complete-guide">Insert Images in LaTeX (blog)</Link> &ndash; Formats, folders and troubleshooting</li>
            <li><Link href="/learn/tables">Tables</Link> &ndash; The other common float, with captions above</li>
            <li><Link href="/learn/tikz">TikZ</Link> &ndash; Draw diagrams directly in LaTeX</li>
            <li><Link href="/learn/pgfplots">PGFPlots</Link> &ndash; Plots from data, without exporting images</li>
            <li><Link href="/learn/table-of-contents">Table of Contents</Link> &ndash; Contents, list of figures and list of tables</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Try figure layouts with a live PDF preview</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Generate LaTeX from text descriptions</li>
            <li><Link href="https://tools.useoctree.com/symbols" target="_blank" rel="noopener noreferrer">LaTeX Symbols Reference</Link> &ndash; Browse math operators and special characters</li>
          </ul>

          <RelatedPosts searchTerm="images" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Place figures faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sizes and captions your images, fixes &ldquo;File not
              found&rdquo; and float placement problems, and compiles your document in seconds.
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
