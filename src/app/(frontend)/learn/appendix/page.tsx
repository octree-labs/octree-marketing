import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('Appendix in LaTeX', 'appendix')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'appendix',
  title: 'Appendix in LaTeX: \\appendix, Numbering and the appendix Package',
  seoTitle: 'Appendix in LaTeX: \\appendix and appendix Package',
  description:
    'Appendix in LaTeX: \\appendix for lettered sections and chapters, the appendix package, appendices in the table of contents, equation numbering and errors.',
  keywords:
    'latex appendix, appendix latex, appendix in latex, latex appendices, appendix package latex, begin appendices, latex appendix toc, latex appendix table of contents, latex appendix numbering, latex appendix equation numbering, latex appendix figure numbering, latex appendixname, latex appendix title, latex appendix chapter, latex appendix article, latex appendix section, latex single appendix, latex appendix reference, latex numberwithin, latex appendix page, latex subappendices',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-16'

const faq: FaqItem[] = [
  {
    question: 'How do I add an appendix in LaTeX?',
    answer:
      'Write \\appendix after the main text, then start each appendix with \\section (in article) or \\chapter (in report and book) as usual. From that point the numbering switches to letters: sections become A, B, C and chapters become Appendix A, Appendix B. \\appendix is a command, not an environment, so it has no \\end.',
  },
  {
    question: 'How do I add the appendix to the table of contents?',
    answer:
      'Appendix sections and chapters made with \\section and \\chapter after \\appendix appear in the table of contents automatically, as A, B and so on. For an “Appendices” heading in the contents, load \\usepackage[toc]{appendix} and wrap the appendices in \\begin{appendices} … \\end{appendices}; add titletoc to show the word Appendix before each entry.',
  },
  {
    question: 'How do I get “Appendix A” instead of just “A” in an article?',
    answer:
      'In the article class, \\appendix only changes the numbers to letters. Load the appendix package with the title option, \\usepackage[title]{appendix}, and put the sections inside \\begin{appendices} … \\end{appendices}; the headings then read “Appendix A”. The titletoc option does the same in the table of contents. In report and book, chapters already say “Appendix A”.',
  },
  {
    question: 'How do I number equations as (A.1) in the appendix?',
    answer:
      'In an article, equations keep counting from the main text. Write \\numberwithin{equation}{section} (from amsmath) right after \\appendix, and equations in appendix A become (A.1), (A.2). Do the same for figures and tables with \\counterwithin{figure}{section}. In report and book, equations are already numbered by chapter, so they become (A.1) automatically.',
  },
  {
    question: 'How do I add a single appendix without a letter?',
    answer:
      'Use an unnumbered heading and add it to the table of contents by hand: \\section*{Appendix} followed by \\addcontentsline{toc}{section}{Appendix}. A single lettered Appendix A is also valid; follow your publisher or university style guide rather than removing its letter automatically.',
  },
  {
    question: 'How do I rename the appendix in LaTeX?',
    answer:
      'Redefine \\appendixname, which is “Appendix” in English: \\renewcommand{\\appendixname}{Supplement}. When babel is loaded, put the change in \\addto\\captionsenglish{…} so babel does not reset it. The appendix package also provides \\appendixtocname and \\appendixpagename for the “Appendices” headings.',
  },
]

export default async function LearnAppendixPage() {
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
          <h1>Appendix in LaTeX: \appendix, Numbering and the appendix Package</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Quick answer
            </p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Basic appendix:</strong> write <code>\appendix</code> after the main text,
                then <code>{`\\section{...}`}</code> (article) or <code>{`\\chapter{...}`}</code>{' '}
                (report, book). Numbering switches to A, B, C.
              </li>
              <li>
                <strong>&ldquo;Appendix A&rdquo; headings and a TOC entry in an article:</strong>{' '}
                <code>{`\\usepackage[toc,page,title]{appendix}`}</code> with{' '}
                <code>{`\\begin{appendices} ... \\end{appendices}`}</code>.
              </li>
              <li>
                <strong>Equations (A.1):</strong> <code>{`\\numberwithin{equation}{section}`}</code>{' '}
                (amsmath) right after <code>\appendix</code>; figures with{' '}
                <code>{`\\counterwithin{figure}{section}`}</code>.
              </li>
              <li>
                <strong>Rename:</strong> <code>{`\\renewcommand{\\appendixname}{Supplement}`}</code>
                .
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm">
              <code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\tableofcontents

\\section{Introduction}
Main text. The proof is in Appendix~\\ref{app:proofs}.

\\appendix
\\numberwithin{equation}{section}

\\section{Proofs}\\label{app:proofs}
\\begin{equation} a^2 + b^2 = c^2 \\end{equation}

\\section{Additional Data}
\\end{document}`}</code>
            </pre>
          </div>
          <p className="lead">
            An appendix in LaTeX takes one command. <code>\appendix</code> marks the point where the
            appendices start, and every <code>\section</code> or <code>\chapter</code> after it is
            lettered instead of numbered. Everything else &mdash; an &ldquo;Appendices&rdquo;
            heading in the table of contents, the word &ldquo;Appendix&rdquo; in article headings,
            equations numbered (A.1), a single unnumbered appendix &mdash; is a matter of a few
            settings or the <code>appendix</code> package. This guide shows each, for article,
            report and book, and fixes the errors that come up along the way.
          </p>
          <h2>The \appendix Command</h2>
          <p>
            <code>\appendix</code> is a switch, not an environment: it resets the section (or
            chapter) counter and changes its numbering to capital letters. It does not print
            anything itself. What happens next depends on the class:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Appendix heading</th>
                  <th>Heading output</th>
                  <th>TOC entry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>article</td>
                  <td>
                    <code>{`\\section{Proofs}`}</code>
                  </td>
                  <td>A Proofs</td>
                  <td>A Proofs</td>
                </tr>
                <tr>
                  <td>report, book</td>
                  <td>
                    <code>{`\\chapter{Proofs}`}</code>
                  </td>
                  <td>Appendix A / Proofs</td>
                  <td>A Proofs</td>
                </tr>
                <tr>
                  <td>
                    article + <code>[title]{`{appendix}`}</code>
                  </td>
                  <td>
                    <code>{`\\section{Proofs}`}</code> in <code>appendices</code>
                  </td>
                  <td>Appendix A Proofs</td>
                  <td>
                    A Proofs (<code>titletoc</code>: Appendix A Proofs)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Appendix in a report or book</h3>
          <pre>
            <code>{`\\documentclass{report}
\\usepackage{amsmath}

\\begin{document}
\\tableofcontents

\\chapter{Introduction}
\\begin{equation} E = mc^2 \\end{equation}

\\chapter{Results}
See Appendix~\\ref{app:data} for the raw data.

\\appendix
\\chapter{Raw Data}\\label{app:data}
\\section{Measurements}
\\begin{equation} F = ma \\end{equation}

\\chapter{Code Listings}
\\end{document}`}</code>
          </pre>
          <p>
            In report and book, sections inside an appendix chapter are numbered A.1, A.2, and
            equations, figures and tables are already numbered per chapter, so they become (A.1)
            without extra work. A bibliography placed after the appendices uses an unnumbered
            chapter and is not lettered.
          </p>
          <h2>The appendix Package: \begin{`{appendices}`}</h2>
          <p>
            The <code>appendix</code> package adds an <code>appendices</code> environment and
            options for the parts that <code>\appendix</code> leaves out. Put the appendices inside
            the environment instead of after <code>\appendix</code>:
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage[toc,page,title,titletoc]{appendix}

\\begin{document}
\\tableofcontents

\\section{Introduction}
Main text.

\\begin{appendices}
\\section{Proofs}
Proof of the main theorem.

\\section{Survey Questions}
The full questionnaire.
\\end{appendices}
\\end{document}`}</code>
          </pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>toc</code>
                  </td>
                  <td>Adds an &ldquo;Appendices&rdquo; heading to the table of contents</td>
                </tr>
                <tr>
                  <td>
                    <code>page</code>
                  </td>
                  <td>
                    Prints an &ldquo;Appendices&rdquo; title before the first appendix (a page of
                    its own in report and book)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>title</code>
                  </td>
                  <td>Puts &ldquo;Appendix&rdquo; before each letter in the headings (article)</td>
                </tr>
                <tr>
                  <td>
                    <code>titletoc</code>
                  </td>
                  <td>Puts &ldquo;Appendix&rdquo; before each letter in the table of contents</td>
                </tr>
                <tr>
                  <td>
                    <code>header</code>
                  </td>
                  <td>Puts &ldquo;Appendix&rdquo; in the running head</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For appendices at the end of each chapter of a thesis, the package also provides{' '}
            <code>subappendices</code>: used inside a chapter, its sections are numbered 2.A, 2.B.
            The headings &ldquo;Appendices&rdquo; come from <code>\appendixtocname</code> and{' '}
            <code>\appendixpagename</code>, which you can redefine like <code>\appendixname</code>.
          </p>
          <h2>Appendix in the Table of Contents</h2>
          <p>
            Lettered appendices made with <code>\section</code> or <code>\chapter</code> appear in
            the table of contents automatically. The usual adjustments are an
            &ldquo;Appendices&rdquo; line above them (the package&apos;s <code>toc</code> option)
            and the word &ldquo;Appendix&rdquo; in each entry (<code>titletoc</code>). For a single
            appendix without a letter, use a starred heading and add the entry by hand:
          </p>
          <pre>
            <code>{`\\documentclass{article}

\\begin{document}
\\tableofcontents

\\section{Introduction}
Main text.

\\section*{Appendix}
\\addcontentsline{toc}{section}{Appendix}
The one appendix, unnumbered, but listed in the contents.
\\end{document}`}</code>
          </pre>
          <p>
            More on adjusting entries, depth and titles in the{' '}
            <Link href="/learn/table-of-contents">table of contents guide</Link>.
          </p>
          <h2>Numbering Equations, Figures and Tables in the Appendix</h2>
          <p>
            In an article, equations, figures and tables are numbered through the whole document, so
            the first equation in appendix A might be (14). Most style guides want (A.1) instead.
            Tie the counters to the section right after <code>\appendix</code>:
          </p>
          <pre>
            <code>{`\\documentclass{article}
\\usepackage{amsmath}

\\begin{document}
\\section{Main Result}
\\begin{equation} x + y = z \\end{equation}

\\appendix
\\numberwithin{equation}{section}
\\counterwithin{figure}{section}
\\counterwithin{table}{section}

\\section{Derivations}
\\begin{equation} x = z - y \\end{equation}
\\begin{table}[h]
  \\centering
  \\begin{tabular}{cc} 1 & 2 \\end{tabular}
  \\caption{Numbered A.1.}
\\end{table}
\\end{document}`}</code>
          </pre>
          <p>
            <code>\numberwithin</code> comes from amsmath; <code>\counterwithin</code> is built into
            LaTeX. Place these settings after <code>\appendix</code> but before the first appendix
            section: the next section resets the dependent counters. Earlier main-text numbers stay
            unchanged, but these settings remain active for the rest of the document. For theorem
            numbering in appendices, see{' '}
            <Link href="/learn/theorems-proofs">theorems and proofs</Link>, and for equation numbers
            in general <Link href="/learn/equation-numbering">equation numbering</Link>.
          </p>
          <h2>Referencing and Renaming the Appendix</h2>
          <p>
            Label an appendix like any section and refer to it with{' '}
            <code>{`Appendix~\\ref{app:proofs}`}</code>, which prints &ldquo;Appendix A&rdquo;.
            Place the label immediately after the numbered heading, not before it. A starred heading
            does not advance a section counter, so an ordinary reference to it can reproduce an
            earlier number. Compile again to resolve references after moving an appendix. To change
            the word &ldquo;Appendix&rdquo; (in report and book headings, and with the
            package&apos;s <code>title</code> option), redefine <code>\appendixname</code>:
          </p>
          <pre>
            <code>{`\\documentclass{report}
\\usepackage[english]{babel}
\\addto\\captionsenglish{\\renewcommand{\\appendixname}{Supplement}}

\\begin{document}
\\chapter{Introduction}
Details are in Supplement~\\ref{app:extra}.

\\appendix
\\chapter{Extra Material}\\label{app:extra}
\\end{document}`}</code>
          </pre>
          <p>
            Without babel, a plain <code>{`\\renewcommand{\\appendixname}{Supplement}`}</code> in
            the preamble is enough. With babel, the <code>\addto\captionsenglish</code> wrapper is
            needed because babel sets the name again at <code>{`\\begin{document}`}</code>.
          </p>
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
                  <td>Appendix numbered 5, 6 instead of A, B</td>
                  <td>
                    <code>\appendix</code> missing
                  </td>
                  <td>
                    Add <code>\appendix</code> before the first appendix heading
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>Undefined control sequence</em> at <code>\chapter</code>
                  </td>
                  <td>
                    <code>\chapter</code> in the article class
                  </td>
                  <td>
                    Use <code>\section</code> for appendices in an article
                  </td>
                </tr>
                <tr>
                  <td>No &ldquo;Appendix&rdquo; before the letter in an article</td>
                  <td>The article class only letters the sections</td>
                  <td>
                    <code>{`\\usepackage[title]{appendix}`}</code> with the <code>appendices</code>{' '}
                    environment
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>{`\\begin{appendix}`}</code> &hellip; <code>{`\\end{appendix}`}</code>
                  </td>
                  <td>
                    <code>\appendix</code> is a command; it happens to work as an environment in the
                    standard classes but not in every class
                  </td>
                  <td>
                    Write <code>\appendix</code> once, or use <code>{`\\begin{appendices}`}</code>{' '}
                    from the package
                  </td>
                </tr>
                <tr>
                  <td>Equations in the appendix numbered (12) instead of (A.1)</td>
                  <td>Article numbers equations through the document</td>
                  <td>
                    <code>{`\\numberwithin{equation}{section}`}</code> after <code>\appendix</code>
                  </td>
                </tr>
                <tr>
                  <td>Appendix missing from the table of contents</td>
                  <td>
                    Starred heading such as <code>{`\\section*{Appendix}`}</code>
                  </td>
                  <td>
                    Add <code>{`\\addcontentsline{toc}{section}{Appendix}`}</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    pdfTeX warning:{' '}
                    <em>
                      destination with the same identifier (name{`{section.1}`}) has been already
                      used
                    </em>
                  </td>
                  <td>
                    A section counter was reset without changing its hyperlink identifier (
                    <code>{`\\setcounter{section}{0}`}</code>) instead of with{' '}
                    <code>\appendix</code>
                  </td>
                  <td>
                    Use <code>\appendix</code>, which hyperref knows about
                  </td>
                </tr>
                <tr>
                  <td>
                    Renamed <code>\appendixname</code> has no effect
                  </td>
                  <td>
                    babel resets the name, or a plain article heading does not print that name
                  </td>
                  <td>
                    Use the title option for article; with babel wrap the rename:{' '}
                    <code>{`\\addto\\captionsenglish{\\renewcommand{\\appendixname}{...}}`}</code>
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
              <Link href="/learn/table-of-contents">Table of contents</Link>
            </li>
            <li>
              <Link href="/learn/equation-numbering">Equation numbering</Link>
            </li>
          </ul>
          <p>
            Paste a complete example into the{' '}
            <Link href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview tool</Link>{' '}
            to inspect the PDF before adding it to your project.
          </p>

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Finish your thesis appendices with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree&apos;s AI editor sets up lettered appendices, fixes their numbering and table
              of contents entries, and compiles your document in seconds.
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
