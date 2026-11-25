import type { Metadata } from 'next/types'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const page = {
  slug: 'bibliography-examples',
  title: 'LaTeX Bibliography Examples: Reference Lists, Styles and Annotations',
  seoTitle: 'LaTeX Bibliography Examples: References and Annotations',
  description:
    'Compare APA, MLA, Chicago and IEEE bibliography outputs from shared book, article and online-source data, with tested LaTeX and annotated-reference examples.',
  keywords:
    'latex bibliography, bibliography examples, latex references example, annotated bibliography latex, reference list example',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'
const faq: FaqItem[] = [
  {
    question: 'What is the simplest LaTeX bibliography example?',
    answer:
      'Use thebibliography with one \\bibitem per source and cite each key with \\cite. It needs no BibTeX or Biber step, but you format and order the entries yourself.',
  },
  {
    question: 'How do I print sources I did not cite?',
    answer:
      'With a generated bibliography, use \\nocite{key} for selected sources or \\nocite{*} for every entry in the database. Check that the assignment permits uncited works in the list.',
  },
  {
    question: 'Is numeric bibliography output automatically IEEE style?',
    answer:
      'No. Numbered references are used by many styles. Use the required publisher style or a suitable maintained implementation and compare its output with the publication instructions.',
  },
  {
    question: 'Why is my annotation field not printed?',
    answer:
      'The active bibliography style may ignore that field. Choose a documented annotated-bibliography style or customize its driver; adding data alone does not change what the style renders.',
  },
]
const sections: { id?: string; title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Decide what the bibliography is meant to contain',
    paragraphs: [
      'A reference list usually contains works actually cited in the document. A broader bibliography may include relevant works consulted but not cited, depending on the assignment or publication rules. Works Cited is the usual MLA heading for cited sources. Do not infer the required contents from a LaTeX environment name: the software does not know which sources your instructor expects you to include.',
      'Choose the required style before formatting individual entries. Numbered styles, author-date styles and note-based systems organize information differently. A generic numeric bibliography is not automatically IEEE, and a generic author-year bibliography is not automatically APA. Match the required handbook edition and publisher instructions, then check the generated output. A recognizable visual pattern is not evidence that every punctuation, capitalization and source-type rule has been followed.',
    ],
  },
  {
    title: 'Start with a complete manual reference list',
    paragraphs: [
      "The thebibliography environment works without a separate bibliography processor. Each \\bibitem creates an entry identified by a key, and \\cite uses that key in the text. The environment's argument is a sample label wide enough for the list, not the number of sources: 9 is suitable for a short one-digit list, while 99 reserves space for two-digit labels.",
      'This method is useful for a short handout or a carefully controlled example, but you are responsible for the entry formatting and order. Adding a new source does not automatically alphabetize manually typed entries. The example is a simple numeric reference, not a claim of compliance with a particular publication style. Compile twice so the citation label resolves, and verify that the cited edition is the one you actually consulted.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nKnuth describes the typesetting system in \\cite{knuth1984}.\n\\begin{thebibliography}{9}\n\\bibitem{knuth1984}\nDonald E. Knuth.\n\\textit{The TeXbook}.\nAddison-Wesley, 1984.\n\\end{thebibliography}\n\\end{document}',
  },
  {
    title: 'Reproduce the comparison with one shared database',
    paragraphs: [
      'This complete document prints all three sources without requiring an in-text citation. Save it as main.tex in a clean directory, run pdflatex main, biber main, then pdflatex main twice. The APA package line produces the first comparison above; replace that line with the named configuration shown for MLA, Chicago or IEEE to reproduce the others. Do not load two bibliography styles simultaneously.',
      'The filecontents block creates comparison.bib for this standalone demonstration. In an existing project, keep those entries in your normal database instead. The xurl package allows long URLs to wrap, while hyperref makes them clickable. This is an output comparison, not a migration recipe: keep the bibliography system and style files your publisher requires, and use the separate BibTeX guide for database setup and processor troubleshooting.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage{lmodern}\n\\usepackage[american]{babel}\n\\usepackage{csquotes}\n\\begin{filecontents*}{comparison.bib}\n@book{knuth1984,\n  author = {Donald E. Knuth},\n  title = {The {TeXbook}},\n  location = {Reading, MA},\n  publisher = {Addison-Wesley},\n  date = {1984}\n}\n@article{shannon1948,\n  author = {C. E. Shannon},\n  title = {A Mathematical Theory of Communication},\n  journaltitle = {Bell System Technical Journal},\n  volume = {27},\n  number = {3},\n  pages = {379--423},\n  date = {1948-07},\n  doi = {10.1002/j.1538-7305.1948.tb01338.x}\n}\n@online{wcag2023,\n  author = {{W3C}},\n  title = {Web Content Accessibility Guidelines ({WCAG}) 2.2 is a {W3C} Recommendation},\n  date = {2023-10-05},\n  url = {https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/},\n  urldate = {2026-11-25}\n}\n\\end{filecontents*}\n\\usepackage[backend=biber,style=apa]{biblatex}\n\\usepackage{xurl}\n\\usepackage[hidelinks]{hyperref}\n\\addbibresource{comparison.bib}\n\\begin{document}\n\\nocite{knuth1984,shannon1948,wcag2023}\n\\printbibliography\n\\end{document}',
  },
  {
    title: 'Check a book, article or website against its source',
    paragraphs: [
      'A book reference needs the correct author or editor, title, edition when relevant, publisher and publication date. A journal article needs its article title and journal identity, along with the applicable volume, issue, pages or article number and DOI. A website may have a corporate author, a changing title or no clear publication date. Use the fields supported by your chosen bibliography system rather than forcing every source into a book entry.',
      'Copy metadata from the work itself or a reliable publisher record, then verify it. A citation generator can suggest an entry, but it can also return the wrong edition, omit an author or mistake an access date for a publication date. Protect meaningful capitalization in titles where the style might change it, and separate multiple authors with the database syntax rather than typing a formatted author list into one field.',
    ],
  },
  {
    title: 'Add useful annotations rather than repeating abstracts',
    paragraphs: [
      "An annotated bibliography adds an explanation beneath each source. The annotation may summarize the argument, evaluate its methods or explain its relevance to your project. Follow the assignment's purpose and length rather than assuming every annotation should have the same structure. Distinguish what the source claims from your own assessment, and avoid presenting an unread work as if you had evaluated its evidence.",
      'The manual example below demonstrates an annotation paragraph, not a complete APA or MLA template. For a long generated list, use a documented style or driver that prints your chosen annotation field. Simply adding an annotation field to a .bib entry does not guarantee that the active style will display it. Check indentation and paragraph spacing in the PDF, and keep commentary visually distinct from the bibliographic identification.',
    ],
    code: "\\documentclass{article}\n\\begin{document}\n\\section*{Annotated bibliography}\n\\noindent Donald E. Knuth. \\textit{The TeXbook}.\nAddison-Wesley, 1984.\n\\begin{quote}\nThis technical reference explains TeX's typesetting model.\nFor a project about LaTeX document preparation, it provides\nbackground on the underlying engine rather than a replacement\nfor documentation of current LaTeX packages.\n\\end{quote}\n\\end{document}",
  },
  {
    title: 'Preserve enough information to reproduce the references',
    paragraphs: [
      'Keep the database, bibliography configuration and document source together when handing the project to a collaborator. A PDF alone does not preserve the citation keys or processing choices. Record which backend and style the project expects, especially when a publication template supplies custom files. Before sharing a minimal example, remove unrelated private entries from the database rather than assuming unused entries cannot be inspected in the source.',
    ],
  },
  {
    id: 'common-errors',
    title: 'Resolve missing entries and finish with an output audit',
    paragraphs: [
      "An undefined citation can mean a misspelled key, a missing database file or an incomplete processing sequence. Read the bibliography processor's log as well as the LaTeX log. With a generated bibliography, only cited entries normally appear; \\nocite{key} includes a selected uncited work, while \\nocite{*} requests every entry in the active database. Use that broad command only when the intended bibliography really includes the whole database.",
      'Before submission, compare the printed list with the citations in the text. Check duplicate entries, missing identifiers, incorrect years and names that were parsed as one author. Confirm the heading and ordering, then inspect long URLs and line breaks. Keep the source database with the project so the bibliography can be rebuilt. A clean compilation confirms that the files can be processed, not that the references are genuine, complete or correctly attributed.',
    ],
  },
]

export default async function LearnGuidePage() {
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
        datePublished="2026-10-20"
        dateModified={LAST_UPDATED}
        faq={faq}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Learn
          </Link>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>{page.title}</h1>
          <p className="lead">
            {
              'A LaTeX bibliography needs source entries and a command that prints the list. Sources are usually cited in the text, but manual lists and \\nocite can include uncited works when required. For a small manual list, use thebibliography with \\bibitem. For reusable data, use a .bib file with BibTeX or biblatex. The examples below focus on the resulting reference list and its contents; the separate BibTeX guide explains the database workflow in more detail.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 25, 2026</p>
          <section id="bibliography-styles">
            <h2>APA, MLA, Chicago and IEEE: the same three sources</h2>
            <p>
              These are transcriptions of output compiled from the shared database below, using
              biblatex-apa 9.17, biblatex-mla 2.1a, biblatex-chicago’s 2022/11/17 notes style and
              biblatex-ieee 1.3f. Italics and punctuation are retained; PDF line wrapping is not.
              They demonstrate these package versions, not a guarantee that every publisher accepts
              the defaults. The Chicago example uses the notes-and-bibliography configuration
              associated with the package’s seventeenth-edition support, not Chicago author-date or
              a claim of eighteenth-edition compliance.
            </p>
            <p>
              Each group contains a book, a journal article and an online announcement. The book
              metadata comes from Knuth’s own publication list; Shannon’s original print date and
              page range come from the DOI record, not its later online date. The W3C announcement
              supplies its publication date; the access date records this example’s lookup. Protect
              the corporate author with an extra pair of braces so it is not parsed as a person’s
              first and last names.
            </p>
            <h3>APA: author and date first</h3>
            <p>
              Use <code>style=apa</code> with biblatex. Notice the initials, parenthesized dates and
              sentence-case titles.
            </p>
            <p>
              Knuth, D. E. (1984). <em>The TeXbook</em>. Addison-Wesley.
            </p>
            <p>
              Shannon, C. E. (1948). A mathematical theory of communication.{' '}
              <em>Bell System Technical Journal, 27</em>(3), 379–423.{' '}
              <a href="https://doi.org/10.1002/j.1538-7305.1948.tb01338.x">
                https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
              </a>
            </p>
            <p>
              W3C. (2023, October 5).{' '}
              <em>Web content accessibility guidelines (WCAG) 2.2 is a W3C recommendation</em>.
              Retrieved November 25, 2026, from{' '}
              <a href="https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/">
                https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/
              </a>
            </p>
            <h3>MLA: titles and publication containers</h3>
            <p>
              Replace the package line with{' '}
              <code>{'\\usepackage[backend=biber,style=mla]{biblatex}'}</code>. This style prints a
              Works Cited heading and retains the available full given name.
            </p>
            <p>
              Knuth, Donald E. <em>The TeXbook</em>. Addison-Wesley, 1984.
            </p>
            <p>
              Shannon, C. E. “A Mathematical Theory of Communication.”{' '}
              <em>Bell System Technical Journal</em>, vol. 27, no. 3, July 1948, pp. 379–423.{' '}
              <a href="https://doi.org/10.1002/j.1538-7305.1948.tb01338.x">
                https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
              </a>
              .
            </p>
            <p>
              W3C. “Web Content Accessibility Guidelines (WCAG) 2.2 is a W3C Recommendation,” 5 Oct.
              2023,{' '}
              <a href="https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/">
                www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/
              </a>
              . Accessed 25 Nov. 2026.
            </p>
            <h3>Chicago: notes-and-bibliography entries</h3>
            <p>
              Replace the biblatex package line with{' '}
              <code>{'\\usepackage[notes,backend=biber]{biblatex-chicago}'}</code>. These are
              bibliography entries, not first or shortened footnotes.
            </p>
            <p>
              Knuth, Donald E. <em>The TeXbook</em>. Reading, MA: Addison-Wesley, 1984.
            </p>
            <p>
              Shannon, C. E. “A Mathematical Theory of Communication.”{' '}
              <em>Bell System Technical Journal</em> 27, no. 3 (July 1948): 379–423.{' '}
              <a href="https://doi.org/10.1002/j.1538-7305.1948.tb01338.x">
                https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
              </a>
              .
            </p>
            <p>
              W3C. “Web Content Accessibility Guidelines (WCAG) 2.2 is a W3C Recommendation,”
              October 5, 2023. Accessed November 25, 2026.{' '}
              <a href="https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/">
                https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/
              </a>
              .
            </p>
            <h3>IEEE: numbered references in the requested order</h3>
            <p>
              Use <code>{'\\usepackage[backend=biber,style=ieee,sorting=none]{biblatex}'}</code>.
              The explicit nocite keys in this demonstration set the order; ordinary cited
              references follow citation order.
            </p>
            <p>
              [1] D. E. Knuth, <em>The TeXbook</em>. Reading, MA: Addison-Wesley, 1984.
            </p>
            <p>
              [2] C. E. Shannon, “A mathematical theory of communication,”{' '}
              <em>Bell System Technical Journal</em>, vol. 27, no. 3, pp. 379–423, Jul. 1948. doi:{' '}
              <a href="https://doi.org/10.1002/j.1538-7305.1948.tb01338.x">
                10.1002/j.1538-7305.1948.tb01338.x
              </a>
              .
            </p>
            <p>
              [3] W3C. “Web content accessibility guidelines (WCAG) 2.2 is a W3C recommendation.”
              (Oct. 5, 2023), [Online]. Available:{' '}
              <a href="https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/">
                https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/
              </a>{' '}
              (visited on 11/25/2026).
            </p>
            <p>
              Access-date treatment depends on the source and style. This database deliberately
              includes urldate to expose how each tested package prints it; remove or retain it
              according to your publication’s rules rather than copying every field mechanically.
              Before switching styles, preserve the original data and compare the new output; a
              changed name order or omitted field may be a style decision, not lost metadata.
            </p>
          </section>

          {sections.map(({ id, title, paragraphs, code }) => (
            <section key={title} id={id}>
              <h2>{title}</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {code && (
                <pre>
                  <code>{code}</code>
                </pre>
              )}
            </section>
          ))}
          <h2>Frequently asked questions</h2>
          {faq.map(({ question, answer }) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}
          <h2>Documentation and related guides</h2>
          <p>
            Consult the package documentation for supported options and version-specific behavior:
          </p>
          <ul>
            <li>
              <a href="https://www-cs-faculty.stanford.edu/~knuth/abcde.html">
                Knuth’s book metadata
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex">biblatex manual</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex-apa">biblatex APA style documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex-mla">biblatex MLA style documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex-chicago">
                biblatex Chicago style documentation
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex-ieee">biblatex IEEE style documentation</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/bibtex">BibTeX database setup and compilation</Link>
            </li>
            <li>
              <Link href="/learn/mla-book-citation">MLA book citation examples</Link>
            </li>
            <li>
              <Link href="/learn/mla-in-text-citation">MLA in-text citation rules</Link>
            </li>
          </ul>
          <p>
            <a href="https://tools.useoctree.com/tools/citation-generator">Citation generator</a>{' '}
            can provide a starting entry. Verify the author, title, year and identifier against the
            original source before including it.
          </p>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Test the example in your document</h2>
            <p className="text-muted-foreground mb-4">
              Open a project in Octree to edit LaTeX and compile a PDF. Start with a complete
              example, then check the result with your real document class and packages. External
              bibliography or indexing steps depend on the build workflow; check the log rather than
              assuming a missing list will appear automatically.
            </p>
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Open Octree
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
