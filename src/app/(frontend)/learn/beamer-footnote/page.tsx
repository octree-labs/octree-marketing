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

const breadcrumbs = getLearnBreadcrumbs('Beamer Footnotes', 'beamer-footnote')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'beamer-footnote',
  title: 'Footnotes in Beamer: \\footnote[frame], No Number, Size and Citations',
  seoTitle: 'Beamer Footnote: \\footnote[frame], Size, No Number',
  description:
    'Beamer footnotes: \\footnote on a frame, \\footnote[frame] in columns, footnotes without a number, smaller size, per-frame numbering, overlays and \\footcite.',
  keywords:
    'beamer footnote, footnote in beamer, footnote beamer, latex beamer footnote, beamer footnote without number, beamer footnote size, beamer footnote citation, beamer cite footnote, beamer footnote not showing, beamer footnote title page, beamer footnote columns, footnote frame beamer, beamer footnote pause, beamer footnote onslide, beamer footcite, beamer reset footnote counter, beamer footnote rule',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-10-23'

const faq: FaqItem[] = [
  {
    question: 'How do I add a footnote in Beamer?',
    answer:
      'Write \\footnote{text} inside a frame, exactly as in an article. Beamer puts the mark in the text and the note at the bottom of the frame, in a smaller font above a short rule. The footnote counter is not reset between frames, so the numbers keep counting up through the whole presentation unless you reset them.',
  },
  {
    question: 'Why is my Beamer footnote at the bottom of the column instead of the slide?',
    answer:
      'Inside a column or a minipage, \\footnote behaves like a minipage footnote: the mark is a letter (a, b, ...) and the note is set under that column. Use \\footnote[frame]{text} to send it to the bottom of the frame with a normal number.',
  },
  {
    question: 'How do I make a footnote without a number in Beamer?',
    answer:
      'Define \\newcommand\\blfootnote[1]{\\begingroup\\renewcommand\\thefootnote{}\\footnote{#1}\\addtocounter{footnote}{-1}\\endgroup} in the preamble and write \\blfootnote{Source: ...}. The note appears at the bottom of the frame with no mark, and the next numbered footnote keeps its number.',
  },
  {
    question: 'How do I change the footnote size in Beamer?',
    answer:
      'Use \\setbeamerfont{footnote}{size=\\tiny} in the preamble; \\scriptsize is a slightly larger option. The color is set with \\setbeamercolor{footnote}{fg=gray} for the note and \\setbeamercolor{footnote mark}{fg=red} for the marks, and \\renewcommand\\footnoterule{} removes the short line above the notes.',
  },
  {
    question: 'How do I cite a reference in a Beamer footnote?',
    answer:
      'With biblatex, load it with style=verbose and write \\footcite{key}: the first citation gives the full reference in the footnote and later ones a short form. Without biblatex, \\footnote{\\cite{key}} puts a numbered citation in the footnote that points to a thebibliography or \\bibliography frame.',
  },
  {
    question: 'Why does my Beamer footnote show up before the text it belongs to?',
    answer:
      'When the footnoted text is behind a \\pause or an overlay, the mark is hidden on the early slides but the note at the bottom is not, so it appears too soon. Give the footnote the same overlay specification as the text, for example \\footnote<2->{...}, and it is shown only from slide 2 on.',
  },
]

export default async function BeamerFootnotePage() {
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
          <h1>Footnotes in Beamer: \footnote[frame], No Number, Size and Citations</h1>
          <p className="lead">
            <strong>A footnote in Beamer</strong> is written the same way as in any LaTeX document:{' '}
            <code>\footnote&#123;text&#125;</code> inside a frame puts a mark in the text and the
            note at the bottom of the slide. The differences are in the details: footnotes in
            columns land under the column unless you use <code>\footnote[frame]</code>, the
            numbers run on through the whole talk, and a footnote behind a <code>\pause</code>{' '}
            shows up too early. This guide covers all of it, plus footnotes without a number,
            smaller footnotes, title-page notes and citations in footnotes.
          </p>
          <p>
            Every example was compiled with pdfLaTeX (Beamer, TeX Live). The whole presentation
            below compiles as it is:
          </p>
          <pre><code>{`\\documentclass{beamer}

% A footnote with no mark, for sources and credits
\\newcommand\\blfootnote[1]{%
  \\begingroup
  \\renewcommand\\thefootnote{}\\footnote{#1}%
  \\addtocounter{footnote}{-1}%
  \\endgroup
}

\\title{Footnotes in Beamer}
\\author{A. Author\\thanks{University of Somewhere}}
\\date{}

\\begin{document}

\\begin{frame}
  \\titlepage
\\end{frame}

\\begin{frame}{A plain footnote}
  Beamer was written by Till Tantau.\\footnote{The class dates from 2003.}
\\end{frame}

\\begin{frame}{Footnotes in columns}
  \\begin{columns}
    \\begin{column}{0.5\\textwidth}
      Left column.\\footnote{Under the column, marked a.}
      More text.\\footnote[frame]{At the bottom of the frame, numbered.}
    \\end{column}
    \\begin{column}{0.5\\textwidth}
      Right column.
    \\end{column}
  \\end{columns}
\\end{frame}

\\begin{frame}{No number}
  GDP grew by 3\\%.\\blfootnote{Source: World Bank, 2024.}
\\end{frame}

\\begin{frame}{Overlays}
  First point.
  \\pause
  Second point.\\footnote<2->{Shown only from slide 2.}
\\end{frame}

\\end{document}`}</code></pre>

          {/* ───────────────────────────── Basic ───────────────────────────── */}
          <h2>Add a Footnote to a Frame</h2>
          <p>
            Put <code>\footnote&#123;...&#125;</code> directly after the word it refers to, with
            no space before it. Beamer sets the mark as a superscript and the note at the bottom
            of the frame, in a smaller font (9pt with the default 11pt class size) above a short
            rule:
          </p>
          <pre><code>{`\\begin{frame}{Results}
  Accuracy rose to 94\\%.\\footnote{Measured on the held-out test set.}
  Training took two hours.\\footnote{On a single GPU.}
\\end{frame}`}</code></pre>
          <p>
            The footnote counter belongs to the whole presentation, not to the frame. If the
            first frame has notes 1 and 2, the next footnote on the next frame is 3. Overlays do
            not change this: all slides of one frame share the same numbers. To start again at 1
            on every frame, see <a href="#reset-numbering">Restart numbering on each frame</a>.
          </p>

          {/* ───────────────────────────── Columns ───────────────────────────── */}
          <h2>Footnotes in Columns and Minipages: \footnote[frame]</h2>
          <p>
            Inside a <code>column</code> or a <code>minipage</code>, Beamer treats{' '}
            <code>\footnote</code> as a minipage footnote: the mark is a lowercase letter and the
            note is set at the bottom of that column, not of the slide. Usually that is not what
            you want. The <code>frame</code> option sends the note to the bottom of the frame
            with an ordinary number:
          </p>
          <pre><code>{`\\begin{frame}{Two columns}
  \\begin{columns}
    \\begin{column}{0.5\\textwidth}
      Left column.\\footnote{Under the column, marked a.}
      More text.\\footnote[frame]{At the bottom of the frame, numbered.}
    \\end{column}
    \\begin{column}{0.5\\textwidth}
      Right column.
    \\end{column}
  \\end{columns}
\\end{frame}`}</code></pre>
          <p>
            <code>block</code>, <code>alertblock</code> and <code>exampleblock</code> are not
            minipages, so a plain <code>\footnote</code> inside a block already goes to the bottom
            of the frame.
          </p>

          {/* ───────────────────────────── No number ───────────────────────────── */}
          <h2>Beamer Footnote Without a Number</h2>
          <p>
            Image credits, data sources and &ldquo;joint work with&rdquo; lines often belong at the
            bottom of the slide without a mark. Define a small command in the preamble that empties
            the footnote number for one note and then gives the number back:
          </p>
          <pre><code>{`\\newcommand\\blfootnote[1]{%
  \\begingroup
  \\renewcommand\\thefootnote{}\\footnote{#1}%
  \\addtocounter{footnote}{-1}%
  \\endgroup
}

% in a frame:
GDP grew by 3\\%.\\blfootnote{Source: World Bank, 2024.}`}</code></pre>
          <p>
            The note is printed with no number and no mark appears in the text. Because the
            counter is stepped back, the next normal footnote keeps the number it would have had.
          </p>

          {/* ───────────────────────────── Reset ───────────────────────────── */}
          <h2 id="reset-numbering">Restart Footnote Numbering on Each Frame</h2>
          <p>
            Many speakers prefer every slide to start at footnote 1, since the audience never sees
            the previous slide&rsquo;s notes. One line in the preamble does it, using the{' '}
            <code>etoolbox</code> hook that runs at the start of every frame:
          </p>
          <pre><code>{`\\usepackage{etoolbox}
\\AtBeginEnvironment{frame}{\\setcounter{footnote}{0}}`}</code></pre>
          <p>
            The reset happens once per frame, so a frame built up with <code>\pause</code> keeps
            consistent numbers across its slides.
          </p>

          {/* ───────────────────────────── Size ───────────────────────────── */}
          <h2>Change the Footnote Size, Color and Rule</h2>
          <p>
            Beamer styles footnotes through its font and color templates, so the usual{' '}
            <code>\footnotesize</code> redefinition is not the way to go. In the preamble:
          </p>
          <pre><code>{`\\setbeamerfont{footnote}{size=\\tiny}          % 6pt instead of 9pt
\\setbeamercolor{footnote}{fg=gray}             % color of the note text
\\setbeamercolor{footnote mark}{fg=red}         % color of the marks
\\renewcommand\\footnoterule{}                   % remove the line above the notes`}</code></pre>
          <p>
            <code>size=\scriptsize</code> is a middle ground between the default and{' '}
            <code>\tiny</code>. The <code>footnote mark</code> color applies to both the mark in
            the text and the number in front of the note.
          </p>

          {/* ───────────────────────────── Symbols ───────────────────────────── */}
          <h2>Symbols Instead of Numbers</h2>
          <p>
            To mark footnotes with *, &dagger;, &Dagger; and so on, change{' '}
            <code>\thefootnote</code>. Put the change in the preamble for the whole talk, or wrap
            the frames in braces to limit it to those frames:
          </p>
          <pre><code>{`{
\\renewcommand\\thefootnote{\\fnsymbol{footnote}}
\\begin{frame}{Symbols}
  First claim.\\footnote{Marked with an asterisk.}
  Second claim.\\footnote{Marked with a dagger.}
\\end{frame}
}`}</code></pre>
          <p>
            <code>\fnsymbol</code> has nine symbols, so combine it with the per-frame reset above
            if a talk has more than nine footnotes.
          </p>

          {/* ───────────────────────────── Overlays ───────────────────────────── */}
          <h2>Footnotes with \pause and Overlays</h2>
          <p>
            Beamer hides the footnote mark together with the text after a <code>\pause</code>,
            but the note at the bottom of the frame is shown on every slide of the frame. The
            audience reads the footnote before the sentence it belongs to. Give the footnote an
            overlay specification that matches the text:
          </p>
          <pre><code>{`\\begin{frame}{Overlays}
  First point.
  \\pause
  Second point.\\footnote<2->{Shown only from slide 2.}
\\end{frame}`}</code></pre>
          <p>
            <code>&lt;2-&gt;</code> means &ldquo;slide 2 and later&rdquo;; use{' '}
            <code>&lt;3-&gt;</code> for text revealed on the third slide, and so on. The same
            specification works with <code>\onslide</code>, <code>\only</code> and{' '}
            <code>\item&lt;n-&gt;</code>.
          </p>

          {/* ───────────────────────────── Title page ───────────────────────────── */}
          <h2>Footnotes on the Title Page</h2>
          <p>
            Use <code>\thanks</code> inside <code>\title</code> or <code>\author</code> for
            affiliations, funding and acknowledgements. Beamer prints the notes at the bottom of
            the title frame:
          </p>
          <pre><code>{`\\title{Footnotes in Beamer\\thanks{Slides for the reading group.}}
\\author{A. Author\\thanks{University of Somewhere}}

\\begin{document}
\\begin{frame}
  \\titlepage
\\end{frame}`}</code></pre>
          <p>
            <code>\thanks</code> uses the same counter as <code>\footnote</code>, so the first
            footnote after the title page continues from the last <code>\thanks</code> number.
            The per-frame reset above avoids that.
          </p>

          {/* ───────────────────────────── Citations ───────────────────────────── */}
          <h2>Citations in Beamer Footnotes</h2>
          <p>
            Slides have no room for a bibliography on every page, so references often go in
            footnotes. With <code>biblatex</code>, the <code>verbose</code> style and{' '}
            <code>\footcite</code> print the full reference the first time and a short form after
            that:
          </p>
          <pre><code>{`\\documentclass{beamer}
\\usepackage[style=verbose, backend=bibtex]{biblatex}
\\addbibresource{refs.bib}

\\begin{document}
\\begin{frame}{Footnote citations}
  \\TeX\\ was designed for beautiful math.\\footcite{knuth84}
  A later citation is shortened.\\footcite[p.~10]{knuth84}
\\end{frame}

\\begin{frame}{References}
  \\printbibliography
\\end{frame}
\\end{document}`}</code></pre>
          <p>
            Here <code>refs.bib</code> holds a normal BibTeX entry with the key{' '}
            <code>knuth84</code>. <code>backend=bibtex</code> makes the example work with plain
            BibTeX; drop it to use biber, the biblatex default, which Overleaf and latexmk run for
            you. Without biblatex, put an ordinary citation inside a footnote:
          </p>
          <pre><code>{`\\begin{frame}{Cite}
  Knuth's book\\footnote{\\cite{knuth84}} is the standard reference.
\\end{frame}

\\begin{frame}{References}
  \\begin{thebibliography}{9}
    \\bibitem{knuth84} D. E. Knuth, \\emph{The \\TeX book}, Addison-Wesley, 1984.
  \\end{thebibliography}
\\end{frame}`}</code></pre>
          <p>
            For more citation styles and the full BibTeX workflow, see the{' '}
            <Link href="/learn/bibliography-examples">bibliography examples guide</Link>.
          </p>

          {/* ───────────────────────────── Tables and figures ───────────────────────────── */}
          <h2>Footnotes in Tables and Figure Captions</h2>
          <p>
            A <code>\footnote</code> inside a <code>tabular</code> works in Beamer and the note
            goes to the bottom of the frame. Captions are different: Beamer sets a caption that
            is longer than one line twice (once to measure it), so a <code>\footnote</code>{' '}
            inside it prints the note twice under two numbers. Split the footnote into a mark in
            the caption and the text after the figure:
          </p>
          <pre><code>{`\\begin{frame}{Figure}
  \\begin{figure}
    \\rule{2cm}{1cm}
    \\caption{A box.\\protect\\footnotemark}
  \\end{figure}
  \\footnotetext{Figure source: own drawing.}
\\end{frame}`}</code></pre>
          <p>
            The same <code>\footnotemark</code> / <code>\footnotetext</code> pair works anywhere a
            direct footnote misbehaves. The <Link href="/learn/footnotes">LaTeX footnotes
            guide</Link> covers it in more detail for articles and reports.
          </p>

          {/* ───────────────────────────── Troubleshooting ───────────────────────────── */}
          <h2>Beamer Footnote Not Showing? Common Causes</h2>
          <ul>
            <li>
              <strong>It is under the column.</strong> In <code>columns</code> or a{' '}
              <code>minipage</code> the note sits at the bottom of that column with a letter mark.
              Use <code>\footnote[frame]&#123;...&#125;</code>.
            </li>
            <li>
              <strong>It appears too early or on the wrong slide.</strong> The note ignores{' '}
              <code>\pause</code>; add an overlay specification such as{' '}
              <code>\footnote&lt;2-&gt;&#123;...&#125;</code>.
            </li>
            <li>
              <strong>The mark is there but the note is missing.</strong> A{' '}
              <code>\footnotemark</code> needs a matching <code>\footnotetext</code> in the same
              frame.
            </li>
            <li>
              <strong>The number looks wrong.</strong> Numbers run through the whole
              presentation and include <code>\thanks</code> on the title page. Reset the counter
              on each frame with the <code>etoolbox</code> line above.
            </li>
            <li>
              <strong>The note is too large for the slide.</strong> Make it smaller with{' '}
              <code>\setbeamerfont&#123;footnote&#125;&#123;size=\tiny&#125;</code> or move long
              references to a final references frame.
            </li>
          </ul>

          {/* ───────────────────────────── FAQ ───────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          {faq.map((item) => (
            <React.Fragment key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </React.Fragment>
          ))}

          {/* ───────────────────────────── Next Steps ───────────────────────────── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/blog/beamer-presentations-latex-slides-tutorial">Beamer Tutorial</Link> – Frames, overlays, themes and handouts for a complete presentation</li>
            <li><Link href="/learn/footnotes">LaTeX Footnotes</Link> – \footnote, footmisc and footnotes in tables for articles, reports and theses</li>
            <li><Link href="/learn/bibliography-examples">Bibliography Examples</Link> – APA, MLA, Chicago and IEEE with BibTeX and biblatex</li>
            <li><Link href="/learn/table-of-contents">Table of Contents in LaTeX</Link> – Including the Beamer outline frame</li>
            <li><Link href="/learn/tables">Tables in LaTeX</Link> – tabular, booktabs and the tables you put on slides</li>
          </ul>

          {/* ───────────────────────────── Free LaTeX Tools ───────────────────────────── */}
          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/templates/beamer-presentation" target="_blank" rel="noopener noreferrer">Beamer Presentation Template</Link> – A ready-made Beamer deck to drop these footnotes into</li>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> – Paste any example above and see the PDF without installing TeX</li>
          </ul>

          {/* ───────────────────────────── Related Posts ───────────────────────────── */}
          <RelatedPosts searchTerm="Beamer" title="Related Articles" />

          {/* ───────────────────────────── CTA Box ───────────────────────────── */}
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Build the slides, not the preamble</h3>
            <p className="text-muted-foreground mb-4">
              Octree is an AI-powered LaTeX editor with TeX Live already set up: paste any example
              above, ask for footnoted sources on every slide, and watch the Beamer PDF update as
              you type.
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
