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
    'Compare complete LaTeX bibliography examples using manual references, BibTeX and biblatex. Choose headings, citation order, source fields and annotated entries.',
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
    title: 'Generate a classic BibTeX list from reusable data',
    paragraphs: [
      'A .bib entry separates bibliographic facts from their presentation. In this complete example, filecontents* creates a small database alongside the document so you can test the whole workflow. In a real project, keep the database as a separate file and edit it directly. An existing file may not be overwritten by filecontents, so use a clean test directory when comparing examples.',
      "The plain style produces a numbered list ordered by its sorting rules, rather than by first citation. To test a document saved as main.tex, run pdflatex main, bibtex main, then pdflatex main twice. The BibTeX command takes the document's base name, not the database filename. For journal submissions, use the supplied style and instructions instead of replacing them with plain merely because this small example compiles.",
    ],
    code: '\\documentclass{article}\n\\begin{filecontents*}{example-references.bib}\n@book{knuth1984,\n  author = {Donald E. Knuth},\n  title = {The {TeXbook}},\n  publisher = {Addison-Wesley},\n  year = {1984}\n}\n\\end{filecontents*}\n\\begin{document}\nSee the discussion in \\cite{knuth1984}.\n\\bibliographystyle{plain}\n\\bibliography{example-references}\n\\end{document}',
  },
  {
    title: 'Use biblatex when you need its list controls',
    paragraphs: [
      'Biblatex moves bibliography formatting into LaTeX and commonly uses Biber to process the data. The preamble loads the package and names the resource with its .bib extension; \\printbibliography creates the list in the body. Do not combine this setup with classic \\bibliographystyle and \\bibliography commands. Mixing the two workflows can produce confusing errors or an empty list.',
      'The numeric example uses sorting=none to list entries in citation order. It is still a generic numeric style, not a promise of IEEE formatting. Save it as main.tex and run pdflatex main, biber main, then pdflatex main twice. When a template uses another backend or a specialized style package, follow that configuration. A migration from classic BibTeX can require reviewing entry types, fields and style-specific options, not just replacing one package line.',
    ],
    code: '\\documentclass{article}\n\\begin{filecontents*}{example-biblatex.bib}\n@book{knuth1984,\n  author = {Donald E. Knuth},\n  title = {The {TeXbook}},\n  publisher = {Addison-Wesley},\n  date = {1984}\n}\n\\end{filecontents*}\n\\usepackage[backend=biber,style=numeric,sorting=none]{biblatex}\n\\addbibresource{example-biblatex.bib}\n\\begin{document}\nThis reference is generated from structured data \\cite{knuth1984}.\n\\printbibliography[title={References}]\n\\end{document}',
  },
  {
    title: 'Check a book, article or website against its source',
    paragraphs: [
      'A book reference needs the correct author or editor, title, edition when relevant, publisher and publication date. A journal article needs its article title and journal identity, along with the applicable volume, issue, pages or article number and DOI. A website may have a corporate author, a changing title or no clear publication date. Use the fields supported by your chosen bibliography system rather than forcing every source into a book entry.',
      'Copy metadata from the work itself or a reliable publisher record, then verify it. A citation generator can suggest an entry, but it can also return the wrong edition, omit an author or mistake an access date for a publication date. Protect meaningful capitalization in titles where the style might change it, and separate multiple authors with the database syntax rather than typing a formatted author list into one field.',
    ],
  },
  {
    title: 'Compare style output without treating punctuation as universal',
    paragraphs: [
      "For the same book, an APA-style reference begins with the author's surname and initials followed by the year in parentheses; an MLA-style entry normally presents the author's name, title, publisher and year in a different sequence. A numbered engineering style puts a reference label beside the entry and uses its own name and title conventions. These differences come from the style rules, not from the underlying identity of the source.",
      "For an exact required style, choose a maintained implementation such as the appropriate biblatex style package or the publisher's supplied .bst file, then compare representative output against the official examples. Check at least one book, article and online source if your paper uses all three. Do not hand-correct a generated .bbl file as your normal workflow: the next bibliography run can replace it, leaving the correction disconnected from the original data.",
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
              'A LaTeX bibliography needs source entries, citations in the text, and a command that prints the list. For a small manual list, use thebibliography with \\bibitem. For reusable data, use a .bib file with BibTeX or biblatex. The examples below focus on the resulting reference list and its contents; the separate BibTeX guide explains the database workflow in more detail.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 25, 2026</p>
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
              <a href="https://ctan.org/pkg/bibtex">BibTeX documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex">biblatex manual</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/biblatex-apa">biblatex APA style documentation</a>
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
