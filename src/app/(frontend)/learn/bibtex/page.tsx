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

const breadcrumbs = getLearnBreadcrumbs('Bibliography Management with BibTeX', 'bibtex')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'bibtex',
  title: 'Bibliography Management with BibTeX: .bib Files, \\cite and Styles',
  seoTitle: 'BibTeX in LaTeX: Bibliography Management Guide',
  description: 'BibTeX in LaTeX: write a .bib file, cite with \\cite, pick a \\bibliographystyle, compile in order, natbib vs biblatex, and citation errors.',
  keywords: 'bibtex, bibtex latex, latex bibtex, bibliography management with bibtex, bibtex bibliography, latex bibliography, bib file, .bib file, bibtex entry types, bibtex article, bibtex book, bibtex inproceedings, bibtex misc, bibtex website, latex cite, bibliographystyle, latex bibliography styles, plain unsrt alpha abbrv, ieeetr, natbib, citep citet, biblatex vs bibtex, natbib vs biblatex, biber, latex bibtex order, citation undefined latex, empty thebibliography, i found no bibdata command, bibtex capital letters, nocite, references latex',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const faq: FaqItem[] = [
  {
    question: 'How do I use BibTeX in LaTeX?',
    answer:
      'Put your references in a .bib file, cite them in the text with \\cite{key}, and at the point where the list should appear write \\bibliographystyle{plain} and \\bibliography{refs} (the file name without .bib). Then compile with LaTeX, BibTeX, LaTeX and LaTeX again, or let latexmk, Octree or Overleaf run the sequence for you.',
  },
  {
    question: 'Why are my citations showing as question marks?',
    answer:
      'A [?] means LaTeX has no entry for that key yet. Either BibTeX has not been run since you added the citation, the key is misspelled, or the entry is missing from the .bib file. Run the full LaTeX, BibTeX, LaTeX, LaTeX sequence and check the .blg log for warnings such as “I didn\'t find a database entry”.',
  },
  {
    question: 'Why is my bibliography empty?',
    answer:
      'BibTeX only lists entries that are cited. An empty list, or the error “Empty thebibliography environment”, means no \\cite or \\nocite reached BibTeX, BibTeX was not run, or it could not open the .bib file. Add \\nocite{*} to list every entry in the file without citing it.',
  },
  {
    question: 'Should I use BibTeX, natbib or biblatex?',
    answer:
      'Use the plain BibTeX setup or natbib when a journal or conference template asks for a .bst style, which most do. natbib adds \\citet and \\citep for author-year citations on top of BibTeX. Use biblatex with the biber program for theses and your own documents: styles are set with package options and it handles Unicode, URLs and dates better.',
  },
  {
    question: 'How do I keep capital letters in BibTeX titles?',
    answer:
      'Many styles lower-case titles, so protect the letters that must stay capital with braces: title = {A Study of {DNA} Repair in {E}scherichia coli}. Wrap whole words or acronyms, not the entire title, so the style can still format the rest.',
  },
]

export default async function LearnBibtexPage() {
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
          <h1>Bibliography Management with BibTeX: .bib Files, \cite and Styles</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40 break-words">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>References:</strong> entries in <code>refs.bib</code>, one per source, each
                with a key.
              </li>
              <li>
                <strong>Cite:</strong> <code>{`\\cite{key}`}</code> in the text.
              </li>
              <li>
                <strong>Print the list:</strong> <code>{`\\bibliographystyle{plain}`}</code> and{' '}
                <code>{`\\bibliography{refs}`}</code> (no <code>.bib</code>).
              </li>
              <li>
                <strong>Compile:</strong> pdfLaTeX &rarr; BibTeX &rarr; pdfLaTeX &rarr; pdfLaTeX.
                Octree and Overleaf do this automatically.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\begin{document}

Knuth designed \\TeX{} for high-quality typesetting \\cite{knuth1984}.

\\bibliographystyle{plain}
\\bibliography{refs}      % reads refs.bib

\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            BibTeX keeps your references in a separate database file and formats only the ones
            you cite, in whatever style the journal asks for. You write each source once, cite it
            by a short key, and switch from numbered to author-year citations by changing one line.
            This guide covers the <code>.bib</code> file and its entry types, citing, choosing a
            style, the compile order, natbib and biblatex, and the errors that leave you with{' '}
            <code>[?]</code> in the text. Ready-made entries for APA, MLA, Chicago and IEEE are in
            the <Link href="/learn/bibliography-examples">bibliography examples</Link>.
          </p>

          {/* ── bib file ── */}
          <h2>The .bib File</h2>
          <p>
            A <code>.bib</code> file is plain text. Each entry starts with <code>@type</code>, then
            a citation key you choose, then <code>field = {'{value}'}</code> pairs separated by
            commas. Save this next to your <code>.tex</code> file as <code>refs.bib</code>:
          </p>
          <pre><code>{`% refs.bib
@book{knuth1984,
  author    = {Knuth, Donald E.},
  title     = {The {\\TeX}book},
  publisher = {Addison-Wesley},
  address   = {Reading, MA},
  year      = {1984}
}

@article{lamport1987,
  author  = {Lamport, Leslie},
  title   = {Document Production: Visual or Logical?},
  journal = {Notices of the American Mathematical Society},
  volume  = {34},
  pages   = {621--624},
  year    = {1987}
}

@inproceedings{vaswani2017,
  author    = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and others},
  title     = {Attention Is All You Need},
  booktitle = {Advances in Neural Information Processing Systems},
  volume    = {30},
  year      = {2017}
}

@misc{who2023,
  author       = {{World Health Organization}},
  title        = {World Health Statistics 2023},
  howpublished = {\\url{https://www.who.int/data/gho}},
  note         = {Accessed 9 November 2026},
  year         = {2023}
}`}</code></pre>
          <p>
            Write authors as <code>Last, First</code> joined by <code>and</code>, never by
            commas. Wrap a company name in a second pair of braces so BibTeX does not split it into
            first and last names. Page ranges use <code>--</code> for an en dash.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Entry type</th>
                  <th>For</th>
                  <th>Required fields</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>@article</code></td><td>Journal article</td><td>author, title, journal, year</td></tr>
                <tr><td><code>@book</code></td><td>Book</td><td>author or editor, title, publisher, year</td></tr>
                <tr><td><code>@inproceedings</code></td><td>Conference paper</td><td>author, title, booktitle, year</td></tr>
                <tr><td><code>@incollection</code></td><td>Chapter in an edited book</td><td>author, title, booktitle, publisher, year</td></tr>
                <tr><td><code>@phdthesis</code> / <code>@mastersthesis</code></td><td>Thesis</td><td>author, title, school, year</td></tr>
                <tr><td><code>@techreport</code></td><td>Report</td><td>author, title, institution, year</td></tr>
                <tr><td><code>@misc</code></td><td>Websites, software, anything else</td><td>none; use title, howpublished, note, year</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Classic BibTeX styles have no <code>@online</code> type; use <code>@misc</code> with
            the URL in <code>howpublished</code> (and load <code>url</code> or{' '}
            <code>hyperref</code> for <code>\url</code>). biblatex does support{' '}
            <code>@online</code> with a <code>url</code> field.
          </p>

          {/* ── citing ── */}
          <h2>Citing and Printing the Bibliography</h2>
          <pre><code>{`\\documentclass{article}
\\usepackage{url}
\\begin{document}

\\section{Introduction}
\\TeX{} was designed by Knuth \\cite{knuth1984}, and \\LaTeX{} added logical
markup on top of it \\cite{lamport1987}. Several sources at once
\\cite{knuth1984,vaswani2017}, and a page number \\cite[p.~12]{knuth1984}.

\\nocite{who2023}   % listed without being cited

\\bibliographystyle{plain}
\\bibliography{refs}

\\end{document}`}</code></pre>
          <p>
            <code>{`\\nocite{*}`}</code> lists every entry in the file. The heading is
            &ldquo;References&rdquo; in <code>article</code> and &ldquo;Bibliography&rdquo; in{' '}
            <code>report</code> and <code>book</code>; rename it with{' '}
            <code>{`\\renewcommand{\\refname}{Sources}`}</code> (or <code>\bibname</code>). To list
            it in the table of contents, add <code>{`\\usepackage[nottoc]{tocbibind}`}</code>.
          </p>

          {/* ── styles ── */}
          <h2>Bibliography Styles</h2>
          <p>
            <code>\bibliographystyle</code> picks a <code>.bst</code> file that controls the order
            and look of entries. Journals usually supply their own; these ship with every TeX
            distribution:
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Style</th>
                  <th>Labels</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>plain</code></td><td>[1], [2]</td><td>Alphabetical by author</td></tr>
                <tr><td><code>unsrt</code></td><td>[1], [2]</td><td>Order of first citation</td></tr>
                <tr><td><code>abbrv</code></td><td>[1], [2]</td><td>Alphabetical, first names abbreviated</td></tr>
                <tr><td><code>alpha</code></td><td>[Knu84]</td><td>Alphabetical</td></tr>
                <tr><td><code>ieeetr</code></td><td>[1], [2]</td><td>Order of citation, IEEE layout</td></tr>
                <tr><td><code>plainnat</code>, <code>abbrvnat</code>, <code>unsrtnat</code></td><td>Author-year or numbers</td><td>Need <code>natbib</code></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── compile order ── */}
          <h2>The Compile Order: LaTeX, BibTeX, LaTeX, LaTeX</h2>
          <p>
            BibTeX is a separate program, and each pass hands information to the next:
          </p>
          <ol>
            <li><strong>pdflatex</strong> writes every <code>\cite</code> key, the style and the database name to the <code>.aux</code> file. Citations print as <code>[?]</code>.</li>
            <li><strong>bibtex</strong> reads the <code>.aux</code>, looks up the keys in <code>refs.bib</code> and writes the formatted list to a <code>.bbl</code> file.</li>
            <li><strong>pdflatex</strong> reads the <code>.bbl</code> and prints the bibliography; the labels are now known but not yet used in the text.</li>
            <li><strong>pdflatex</strong> once more puts the right labels in place of <code>[?]</code>.</li>
          </ol>
          <p>
            On the command line, <code>latexmk -pdf main.tex</code> runs exactly as many passes as
            needed. In Octree and Overleaf, one click of Compile does the same. The labels and{' '}
            <code>.aux</code> file work the same way as for <code>\ref</code>; see{' '}
            <Link href="/learn/cross-referencing">cross-referencing</Link>.
          </p>

          {/* ── natbib vs biblatex ── */}
          <h2>natbib and biblatex</h2>
          <p>
            <code>natbib</code> keeps BibTeX but adds author-year citation commands:{' '}
            <code>\citet</code> for &ldquo;Knuth (1984)&rdquo; and <code>\citep</code> for
            &ldquo;(Knuth, 1984)&rdquo;:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[round]{natbib}
\\usepackage{url}
\\begin{document}

\\citet{knuth1984} designed \\TeX{}; transformers came later \\citep{vaswani2017}.

\\bibliographystyle{plainnat}
\\bibliography{refs}

\\end{document}`}</code></pre>
          <p>
            <code>biblatex</code> replaces BibTeX entirely. It uses the <code>biber</code>{' '}
            program, takes the file name <em>with</em> its extension, and sets the style as a
            package option:
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage[style=authoryear, backend=biber]{biblatex}
\\addbibresource{refs.bib}
\\begin{document}

\\textcite{knuth1984} designed \\TeX{} \\parencite[see][12]{knuth1984}.

\\printbibliography

\\end{document}`}</code></pre>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>BibTeX (+ natbib)</th>
                  <th>biblatex</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Program</td><td><code>bibtex</code></td><td><code>biber</code></td></tr>
                <tr><td>Style</td><td><code>{`\\bibliographystyle{...}`}</code> with a <code>.bst</code> file</td><td><code>style=</code> option, customised in LaTeX</td></tr>
                <tr><td>Database</td><td><code>{`\\bibliography{refs}`}</code></td><td><code>{`\\addbibresource{refs.bib}`}</code></td></tr>
                <tr><td>Unicode, URLs, dates</td><td>Limited</td><td>Full support, <code>@online</code> type</td></tr>
                <tr><td>Best for</td><td>Journal and conference templates</td><td>Theses, books, APA and MLA</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Do not load both, and do not mix their commands. APA and MLA styles are built on
            biblatex; see <Link href="/learn/mla-in-text-citation">MLA in-text citations</Link>{' '}
            and the <Link href="/learn/ama-citation-format">AMA citation format</Link>.
          </p>

          {/* ── Mistakes ── */}
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
                  <td><em>LaTeX Warning: Citation &lsquo;knuth1984&rsquo; on page 1 undefined</em>, and <code>[?]</code> in the PDF</td>
                  <td>BibTeX not run yet, or the key is not in the <code>.bib</code> file</td>
                  <td>Run the full sequence; check the key&apos;s spelling and case</td>
                </tr>
                <tr>
                  <td><em>Empty &lsquo;thebibliography&rsquo; environment</em></td>
                  <td>No citations reached BibTeX, or BibTeX failed</td>
                  <td>Add a <code>\cite</code> or <code>{`\\nocite{*}`}</code>; read the <code>.blg</code> log</td>
                </tr>
                <tr>
                  <td><em>I couldn&apos;t open database file refs.bib.bib</em></td>
                  <td><code>.bib</code> written in <code>\bibliography</code></td>
                  <td><code>{`\\bibliography{refs}`}</code></td>
                </tr>
                <tr>
                  <td><em>I found no \bibdata command</em> / <em>no \bibstyle command</em></td>
                  <td><code>\bibliography</code> or <code>\bibliographystyle</code> missing</td>
                  <td>Add both before <code>{`\\end{document}`}</code></td>
                </tr>
                <tr>
                  <td><em>I was expecting a &lsquo;,&rsquo; or a &lsquo;&#125;&rsquo;</em></td>
                  <td>A missing comma between fields, or an unbalanced brace</td>
                  <td>Check the entry on the line the <code>.blg</code> names</td>
                </tr>
                <tr>
                  <td>Acronyms print as &ldquo;Dna&rdquo; or &ldquo;latex&rdquo;</td>
                  <td>The style lower-cases titles</td>
                  <td>Protect them: <code>{`{DNA}`}</code>, <code>{`{\\LaTeX}`}</code></td>
                </tr>
                <tr>
                  <td>The bibliography does not update after editing <code>refs.bib</code></td>
                  <td>The old <code>.bbl</code> is still used</td>
                  <td>Run BibTeX again, or delete the auxiliary files</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I use BibTeX in LaTeX?</h3>
          <p>
            Put your references in a <code>.bib</code> file, cite them in the text with{' '}
            <code>{`\\cite{key}`}</code>, and at the point where the list should appear write{' '}
            <code>{`\\bibliographystyle{plain}`}</code> and <code>{`\\bibliography{refs}`}</code>{' '}
            (the file name without <code>.bib</code>). Then compile with LaTeX, BibTeX, LaTeX and
            LaTeX again, or let latexmk, Octree or Overleaf run the sequence for you.
          </p>
          <h3>Why are my citations showing as question marks?</h3>
          <p>
            A <code>[?]</code> means LaTeX has no entry for that key yet. Either BibTeX has not
            been run since you added the citation, the key is misspelled, or the entry is missing
            from the <code>.bib</code> file. Run the full LaTeX, BibTeX, LaTeX, LaTeX sequence and
            check the <code>.blg</code> log for warnings such as &ldquo;I didn&apos;t find a
            database entry&rdquo;.
          </p>
          <h3>Why is my bibliography empty?</h3>
          <p>
            BibTeX only lists entries that are cited. An empty list, or the error &ldquo;Empty
            thebibliography environment&rdquo;, means no <code>\cite</code> or{' '}
            <code>\nocite</code> reached BibTeX, BibTeX was not run, or it could not open the{' '}
            <code>.bib</code> file. Add <code>{`\\nocite{*}`}</code> to list every entry in the
            file without citing it.
          </p>
          <h3>Should I use BibTeX, natbib or biblatex?</h3>
          <p>
            Use the plain BibTeX setup or natbib when a journal or conference template asks for a{' '}
            <code>.bst</code> style, which most do. natbib adds <code>\citet</code> and{' '}
            <code>\citep</code> for author-year citations on top of BibTeX. Use biblatex with the
            biber program for theses and your own documents: styles are set with package options
            and it handles Unicode, URLs and dates better.
          </p>
          <h3>How do I keep capital letters in BibTeX titles?</h3>
          <p>
            Many styles lower-case titles, so protect the letters that must stay capital with
            braces: <code>{`title = {A Study of {DNA} Repair in {E}scherichia coli}`}</code>. Wrap
            whole words or acronyms, not the entire title, so the style can still format the rest.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/bibliography-examples">Bibliography Examples</Link> &ndash; APA, MLA, Chicago and IEEE entries with their BibTeX source</li>
            <li><Link href="/learn/mla-in-text-citation">MLA In-Text Citation</Link> &ndash; Author-page citations and biblatex-mla</li>
            <li><Link href="/learn/ama-citation-format">AMA Citation Format</Link> &ndash; Superscript numbered citations in LaTeX</li>
            <li><Link href="/learn/cross-referencing">Cross-Referencing</Link> &ndash; \label, \ref and the same two-pass rule</li>
            <li><Link href="/learn/table-of-contents">Table of Contents</Link> &ndash; Adding the bibliography to the contents</li>
          </ul>

          <h2>Free LaTeX Tools</h2>
          <ul>
            <li><Link href="https://tools.useoctree.com/tools/latex-preview" target="_blank" rel="noopener noreferrer">LaTeX Preview</Link> &ndash; Compile any example above and see the result instantly</li>
            <li><Link href="https://tools.useoctree.com/tools/ai-latex-generator" target="_blank" rel="noopener noreferrer">AI LaTeX Generator</Link> &ndash; Describe a document and get the LaTeX</li>
          </ul>

          <RelatedPosts searchTerm="bibliography" title="Related Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Citations without the compile dance</h3>
            <p className="text-muted-foreground mb-4">
              Octree runs BibTeX or biber for you on every compile. Paste a DOI or a messy
              reference and its AI writes the <code>.bib</code> entry, then fixes undefined
              citations with the PDF next to your code.
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
