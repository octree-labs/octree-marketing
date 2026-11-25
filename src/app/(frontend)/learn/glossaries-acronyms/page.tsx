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
  slug: 'glossaries-acronyms',
  title: 'LaTeX Acronyms and Glossaries: First Use, Lists and Build Steps',
  seoTitle: 'LaTeX Acronym and Glossary: Complete Working Examples',
  description:
    'Define LaTeX acronyms, expand first use, print abbreviation lists and build glossaries with or without makeglossaries. Diagnose missing entries and reset behavior.',
  keywords:
    'latex acronym, latex glossary, latex abbreviations, glossaries package, makeglossaries, newacronym',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'
const faq: FaqItem[] = [
  {
    question: 'How do I expand a LaTeX acronym only on first use?',
    answer:
      'Use \\ac with the acronym package or \\gls with a glossaries acronym definition. The package tracks first use and prints the short form on later references.',
  },
  {
    question: 'Can I make a glossary without makeglossaries?',
    answer:
      'Yes. For a small list, use \\makenoidxglossaries with \\printnoidxglossaries and run LaTeX again to settle the list. Do not mix those commands with the indexed printing workflow.',
  },
  {
    question: 'Why is a defined acronym missing from the list?',
    answer:
      'Check whether it was used through the package command, whether the correct list is printed, and whether the build steps completed. Use \\glsaddall only when you intentionally want every defined entry included.',
  },
  {
    question: 'How do I expand acronyms again after the abstract?',
    answer:
      'With glossaries, place \\glsresetall at the intended boundary, or use \\glsreset{label} for one acronym. The acronym package has its own \\acresetall command.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Choose an abbreviation list or a full glossary',
    paragraphs: [
      'An acronym has a short form and an expansion, while a glossary entry has a name and a definition. A thesis may need both, plus a separate list of mathematical symbols. Decide which lists readers actually need before selecting a package. A page of unexplained abbreviations is not improved simply by adding more headings or sorting machinery.',
      'The acronym package is a straightforward choice for abbreviations alone. Glossaries supports terminology, acronyms and multiple lists, with more choices about indexing and presentation. Glossaries-extra extends that system with additional abbreviation and resource workflows. These packages are not interchangeable command dictionaries: choose one approach and use its definitions, references and printing commands consistently. Follow the university or publisher template if it already establishes a supported method.',
    ],
  },
  {
    title: 'Make a simple acronym list without an indexer',
    paragraphs: [
      'The acronym environment defines and typesets the list. Its optional argument gives a sample width for the short-form column; choose a representative long abbreviation rather than a number. Each \\acro entry supplies a label and expansion. The label is the identifier used in the body, so keep it stable even if the wording of the expansion changes.',
      "The first \\ac call normally prints the expansion followed by the short form, and later calls print only the short form. Compile more than once so auxiliary information and references settle. Define unusual plurals deliberately instead of assuming an appended s is always grammatical. Use the package's explicit short or long commands when the surrounding sentence needs a particular form, rather than manually typing a second inconsistent version of the abbreviation.",
    ],
    code: '\\documentclass{article}\n\\usepackage{acronym}\n\\begin{document}\n\\section*{Abbreviations}\n\\begin{acronym}[GPU]\n\\acro{CPU}{central processing unit}\n\\acro{GPU}{graphics processing unit}\n\\end{acronym}\nThe \\ac{CPU} coordinates the calculation.\nThe \\ac{CPU} sends work to the \\ac{GPU}.\n\\end{document}',
  },
  {
    title: 'Build a small glossary with the no-index method',
    paragraphs: [
      'The no-index workflow performs the list preparation within LaTeX rather than calling an external indexing program. Use \\makenoidxglossaries in the preamble and the matching \\printnoidxglossaries command in the body. This is a useful starting point for a short glossary because it removes one source of build configuration errors while retaining named entries and first-use behavior.',
      'Define entries before using them, and provide a meaningful description rather than repeating the name. In the example, the acronym option creates a separate acronym list alongside the main terminology list. Hyperref is loaded before glossaries so the package can integrate its links. This example still needs repeated LaTeX runs; no external indexer does not mean every reference is complete after the first pass.',
    ],
    code: '\\documentclass{article}\n\\usepackage[hidelinks]{hyperref}\n\\usepackage[acronym]{glossaries}\n\\makenoidxglossaries\n\\newglossaryentry{latency}{\n  name={latency},\n  description={the delay between a request and its response}}\n\\newacronym{gpu}{GPU}{graphics processing unit}\n\\begin{document}\nThe \\gls{gpu} reduces processing time.\nThe \\gls{gpu} also affects \\gls{latency}.\n\\printnoidxglossaries\n\\end{document}',
  },
  {
    title: 'Understand the indexed makeglossaries build sequence',
    paragraphs: [
      'For the indexed workflow, replace the no-index setup with \\makeglossaries and print with \\printglossaries. Save the document as main.tex, run pdflatex main, then makeglossaries main, then pdflatex main twice. The indexing command takes the base name, not the PDF filename. It reads the entry information generated by the first LaTeX pass and produces files that later passes can include.',
      'Do not assume that latexmk or an online editor automatically runs every glossary backend. Some workflows need a latexmk configuration rule, an enabled build feature, or a separately executed indexing command. Read the build log to confirm what ran. If your environment does not support an external indexer, the no-index example is a practical alternative for a small list; enabling unrestricted shell escape is not a necessary first troubleshooting step.',
    ],
    code: '\\documentclass{article}\n\\usepackage[acronym]{glossaries}\n\\makeglossaries\n\\newglossaryentry{throughput}{\n  name={throughput},\n  description={the amount of work completed per unit time}}\n\\newacronym{cpu}{CPU}{central processing unit}\n\\begin{document}\nThe \\gls{cpu} influences system \\gls{throughput}.\n\\printglossaries\n\\end{document}',
  },
  {
    title: 'Let latexmk rebuild both indexed lists',
    paragraphs: [
      'Save the following Perl configuration as .latexmkrc beside main.tex, not inside the LaTeX document. It registers dependencies for the main glossary and acronym list, then invokes makeglossaries in the document’s directory. Run latexmk -pdf main.tex from the project directory; latexmk repeats LaTeX as needed after the index files change. The recipe was tested on the indexed example above with both lists present.',
      'The machine must have latexmk, Perl, makeglossaries and the selected indexing backend installed, and the build must permit the helper process. A hosted editor may supply equivalent rules, ignore project configuration or restrict external programs. Check its build log instead of assuming this recipe is accepted everywhere. If it is unavailable, use the manual sequence or the no-index method. This configuration does not require enabling unrestricted TeX shell escape.',
    ],
    code: "add_cus_dep('glo', 'gls', 0, 'makeglossaries');\nadd_cus_dep('acn', 'acr', 0, 'makeglossaries');\nsub makeglossaries {\n  my ($base_name, $path) = fileparse( $_[0] );\n  pushd $path;\n  my $return = system \"makeglossaries\", $base_name;\n  popd;\n  return $return;\n}",
  },
  {
    title: 'Control first use without surprising the reader',
    paragraphs: [
      'First use is state maintained by the package, not a guess based on where a word appears on a page. An acronym introduced in an abstract may already be marked as used before the main text starts. With glossaries, \\glsreset{label} resets one entry and \\glsresetall resets all entries; acronym offers its own reset commands. Reset at a deliberate structural boundary when readers need a fresh expansion.',
      'For glossaries acronyms, explicit short and long forms are available through commands such as \\acrshort and \\acrlong. Check their documented interaction with first-use tracking rather than assuming all commands behave like \\gls. Avoid expanding a long phrase in a heading merely because it happens to be the first reference. Headings, captions and PDF bookmarks have additional formatting constraints, so keep their wording simple and introduce terminology in ordinary prose when possible.',
    ],
    code: '\\documentclass{article}\n\\usepackage[acronym]{glossaries}\n\\makenoidxglossaries\n\\newacronym{api}{API}{application programming interface}\n\\begin{document}\n\\section*{Abstract}\nWe describe an \\gls{api}.\n\\glsreset{api}\n\\section{Introduction}\nThe \\gls{api} accepts requests.\nLater, the \\gls{api} returns a result.\n\\printnoidxglossary[type=\\acronymtype]\n\\end{document}',
  },
  {
    title: 'Decide which entries belong in each printed list',
    paragraphs: [
      'Defining an entry does not necessarily mean it will appear in the printed glossary. The usual workflow records entries used through glossary commands. This keeps a shared definitions file from printing every term in every document. If the assignment requires a complete list, use the documented add-entry commands deliberately, such as \\glsaddall, rather than inserting invisible uses into random paragraphs.',
      'Separate the list title from its contents. Renaming a heading to Abbreviations does not turn ordinary glossary entries into acronyms, and changing the display name does not change the label used by references. For symbols containing mathematics, supply a simple sort key where necessary. Sorting depends on the selected backend and workflow, so test accented names, capitalization and symbol entries with the actual method your final build will use.',
    ],
  },
  {
    title: 'Keep definitions reusable and choose larger workflows carefully',
    paragraphs: [
      'A separate definitions file helps a long project maintain one spelling and explanation for each term. Load it after the relevant package and setup commands, before the entries are used. Keep labels unique across included files. When two chapters use the same abbreviation differently, resolve that ambiguity in the writing instead of redefining one label midway through the document.',
      'For a larger resource database, glossaries-extra and bib2gls offer workflows beyond the basic examples here, but they introduce their own setup and processing requirements. Nomencl is another choice for a dedicated nomenclature list and has a different indexing procedure. Do not mix instructions from these systems: a command for a nomenclature file does not build a glossaries acronym list. Adopt the additional machinery only when it solves a real organization or sorting requirement.',
    ],
  },
  {
    title: 'Edit the terminology as carefully as the commands',
    paragraphs: [
      'Use the same expansion everywhere unless the subject genuinely requires different meanings. An acronym list is a navigation aid, not a substitute for explaining an unfamiliar concept when it first matters. A useful definition tells the reader what the term means in this document, and may distinguish it from a nearby concept that is easy to confuse.',
      'Check the final list for unused specialist terms, circular definitions and abbreviations introduced only once. Spelling out a phrase can be clearer than creating another label. For collaborative projects, review terminology changes alongside prose changes so one chapter does not retain an obsolete expansion while another uses the revised definition.',
    ],
  },
  {
    title: 'Diagnose missing lists from the build artifacts',
    paragraphs: [
      'If the list is empty, first check that an entry is used, that its label matches exactly, and that the printing command matches the setup method. For an indexed glossary, confirm that the first LaTeX run produced glossary input files and that makeglossaries ran successfully. A second LaTeX run cannot invent an indexed output file that was never generated.',
      'If the output is stale, rebuild the relevant auxiliary files in a disposable copy and inspect the new log. Missing descriptions, duplicate labels and unsupported commands can be more important than the final empty-list warning. Inspect the PDF for the full first expansion, later short forms, correct list headings and functional links. A successful build alone does not verify that the terminology is accurate or that the reader encounters definitions before they are needed.',
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
        datePublished="2026-10-18"
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
              'For a simple abbreviation list, load acronym and use \\ac{label} to print the long form on first use and the short form later. For both terminology and acronyms, use glossaries with \\newacronym and \\gls. A glossary also needs a list-building workflow: choose the no-index method for a small example or run makeglossaries for an indexed list.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 25, 2026</p>
          {sections.map(({ title, paragraphs, code }) => (
            <section key={title}>
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
              <a href="https://ctan.org/pkg/glossaries">glossaries user guide and build methods</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/acronym">acronym package documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/glossaries-extra">glossaries-extra documentation</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/hyperlinks">Hyperlinks and package loading</Link>
            </li>
            <li>
              <Link href="/learn/page-numbering">Front matter and page numbering</Link>
            </li>
            <li>
              <Link href="/learn/greek-letters-math-symbols">
                Mathematical symbols for a terminology list
              </Link>
            </li>
          </ul>
          <p>
            <a href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview</a> can help
            check a small no-index example. For indexed lists, verify that your chosen build
            actually runs the external indexing step.
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
