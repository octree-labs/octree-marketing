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
  slug: 'multiple-columns',
  title: 'LaTeX Two Columns: twocolumn, multicol and Tables',
  seoTitle: 'LaTeX Two Columns: twocolumn vs multicol',
  description:
    'Create two-column LaTeX documents or local multicol sections, control breaks and widths, span figures, and distinguish table multicolumn commands.',
  keywords:
    'latex two columns, latex twocolumn, latex multicol, latex multicolumn, latex columnbreak',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-22'
const faq: FaqItem[] = [
  {
    question: 'How do I make a LaTeX document two columns?',
    answer:
      'Use \\documentclass[twocolumn]{article}, unless your publisher class already controls the layout. For a selected region instead, load multicol and use \\begin{multicols}{2} ... \\end{multicols}.',
  },
  {
    question: 'What is the difference between multicol and multicolumn?',
    answer:
      'multicol is a package for flowing text columns through multicols environments. \\multicolumn is a table command that merges a specified number of adjacent cells. It does not change page layout.',
  },
  {
    question: 'How do I make a figure span both columns?',
    answer:
      'Use figure* in a standard two-column document and size the content to the full text width. Its placement is constrained, normally to a later page top or float page; it is not an exact-position command.',
  },
  {
    question: 'How do I force the next column?',
    answer:
      'Use \\columnbreak inside multicols. In standard twocolumn mode, \\newpage ends the current column, while \\clearpage also flushes pending floats and finishes the page.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Choose the column mechanism before formatting',
    paragraphs: [
      "The twocolumn class option makes the document's main text flow down the left column and then the right. It is appropriate when the whole paper follows a two-column layout. A publisher's class may already enable or manage this mode, so begin with the supplied template rather than layering another column system on top.",
      'The multicol package provides the multicols environment for a selected region. It supports more than two columns and can return to one-column text on the same page. At the end of the environment, it normally balances the columns. This makes it useful for a compact handout, glossary-like prose, or a short newspaper-style section.',
      'Neither mechanism is a way to keep two independent paragraphs aligned side by side row by row. For parallel independent material, use an appropriate table or side-by-side boxes; for synchronized parallel text, consider a package designed for that workflow. Flowing columns have a reading order, and text moves as preceding content changes.',
    ],
    code: '\\documentclass[twocolumn]{article}\n\\setlength{\\columnsep}{20pt}\n\\begin{document}\n\\section{Introduction}\nThis text belongs to the first column of a two-column paper.\nThe next column is filled when the first one runs out of room.\n\n\\newpage\nThis paragraph begins in the next column.\n\\end{document}',
  },
  {
    title: 'Put only one section into multiple columns',
    paragraphs: [
      'Load multicol in the preamble, then supply the number of columns as the required argument to multicols. Text before and after the environment stays in the surrounding layout. The environment can span pages; it is not inherently a single-page box. Its final balancing redistributes content to make the ending columns similar in height.',
      'The optional argument immediately after the column count supplies material above the columns, such as a heading spanning the region. This is different from putting a heading inside the first column. Keep that full-width introduction concise enough to leave useful space for the column text below.',
      'If the last columns should remain unbalanced, multicol also provides the multicols* environment. Choose it deliberately rather than trying to defeat balancing with empty lines or invisible filler. Very short examples can exaggerate balancing effects; test representative paragraphs and headings before judging the final appearance.',
    ],
    code: '\\documentclass{article}\n\\usepackage{multicol}\n\\begin{document}\nThis introduction spans the normal text width.\n\n\\begin{multicols}{2}[\\section*{Two-column summary}]\nThe first topic introduces the purpose of the handout.\nEach paragraph flows within the narrower column width.\n\n\\columnbreak\nThe second topic begins in the next column.\nIts text remains part of the same multicols environment.\n\\end{multicols}\n\nThis closing paragraph returns to one column.\n\\end{document}',
  },
  {
    title: 'Control the gap, rule, and available width',
    paragraphs: [
      '\\columnsep sets the horizontal gap between text columns. \\columnseprule sets the thickness of a vertical rule in that gap; zero means no rule. Make these assignments before entering the column layout. A rule can separate dense reference material, but it is not necessary for an ordinary research paper.',
      'Increasing the gap while keeping the page margins fixed makes each column narrower. That can increase hyphenation, overfull lines, and the height of paragraphs. Do not diagnose these effects as a font problem without checking the geometry. Paper size, margins, font size, column count, and gap jointly determine the usable line width.',
      'Use \\linewidth when sizing an object to its immediate container. In ordinary two-column text, \\columnwidth describes one column while \\textwidth describes the full text block. Inside nested lists or boxes, the local line width can be smaller still. A graphic sized to \\textwidth in a single-column float can extend into its neighbor.',
    ],
    code: '\\documentclass{article}\n\\usepackage{multicol}\n\\setlength{\\columnsep}{24pt}\n\\setlength{\\columnseprule}{0.4pt}\n\\begin{document}\n\\begin{multicols}{2}\n\\noindent\\rule{\\linewidth}{0.4pt}\n\nA rule using the local line width fits this column.\n\\columnbreak\n\\noindent\\rule{\\linewidth}{0.4pt}\n\nThe same command fits the second column.\n\\end{multicols}\n\\end{document}',
  },
  {
    title: 'Column breaks are not always page breaks',
    paragraphs: [
      'Inside multicols, use \\columnbreak when the following material must start in the next column. The package normally distributes text automatically, so manual breaks are most useful for intentional topic divisions. Too many forced breaks can leave poor spacing or become wrong after a small edit earlier in the document.',
      'In standard twocolumn mode, \\newpage ends the current column. From the first column it moves to the second; from the second it moves to the next page. \\clearpage also flushes pending floats and finishes the page. These commands are not interchangeable when figures are waiting to be placed.',
      "The \\onecolumn and \\twocolumn commands switch document modes but start a new page. They are not suitable for a full-width paragraph halfway down an existing two-column page. For same-page switching, use a local multicol region when its limitations fit your content, or follow the specialist class's supported mechanism.",
    ],
  },
  {
    title: 'Figures and tables across two columns',
    paragraphs: [
      "In standard two-column mode, an ordinary figure or table float occupies one column. A figure* or table* spans the full text width. The star changes the float's width and placement rules; it does not simply stretch a one-column object at the current source position. Size the content to the width of the chosen float.",
      'Under the standard output routine, full-width floats normally appear at the top of a later page or on a float page, rather than exactly where their source occurs. The h placement request is not a promise of placement here. Packages and publisher classes can alter these rules, so avoid adding float-control packages before reading the template documentation.',
      "Ordinary single-column figure and table floats are not supported inside multicols. For a small nonfloating illustration, place the content directly within the column and use an appropriate caption mechanism if needed. For a floating full-width object, consult multicol's documented starred-float behavior or move the object outside the local column region. Do not silence float errors by randomly moving environment endings.",
    ],
    code: '\\documentclass[twocolumn]{article}\n\\begin{document}\n\\section{Results}\nThis paragraph introduces a full-width illustration.\n\n\\begin{figure*}[t]\n\\centering\n\\rule{0.9\\textwidth}{20mm}\n\\caption{A placeholder spanning the two-column text block.}\n\\end{figure*}\n\n\\begin{figure}[t]\n\\centering\n\\rule{0.9\\linewidth}{12mm}\n\\caption{A placeholder fitting one column.}\n\\end{figure}\n\\clearpage\n\\end{document}',
  },
  {
    title: 'Wide equations and full-width introductions',
    paragraphs: [
      "An equation that fits a one-column document may overflow a two-column paper. Split it at meaningful mathematical boundaries using an amsmath environment rather than scaling it until the symbols become unreadable. A line break should preserve the derivation's logic, not merely satisfy the width limit.",
      'For a full-width opening in the standard article class, \\twocolumn accepts an optional argument containing material above the columns. This is a page-opening mechanism, not a general full-width insertion anywhere in the document. Publisher classes often supply their own title and abstract interfaces, which should take precedence.',
      'Avoid copying a title-and-abstract workaround without testing footnotes, author blocks, and the chosen class. Commands that work in normal page flow can behave differently inside the boxed opening material. If only a local summary needs columns, a single-column document with multicols may be simpler than rebuilding the first page of a journal template.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\twocolumn[\n\\begin{center}\n{\\Large A Two-Column Note}\\par\nA short full-width introduction to the following results.\n\\end{center}\n]\n\\section{Calculation}\n\\begin{align*}\n f(x) &= a_0+a_1x+a_2x^2\\\\\n      &\\quad+a_3x^3+a_4x^4.\n\\end{align*}\n\\end{document}',
  },
  {
    title: 'Multicolumn in tables and common errors',
    paragraphs: [
      "\\multicolumn belongs to tabular and related alignments. Its three arguments are the number of cells to span, the replacement alignment specification, and the content. The span still counts toward the table's total columns. In a three-column table, a two-cell heading plus one ordinary cell fills the entire row.",
      'The alignment argument replaces the underlying column specification for the spanned entry, including vertical rules. A missing or unexpected border may therefore come from that argument rather than from the surrounding table. Merging rows is a separate task, usually handled by multirow; it is not an option of \\multicolumn.',
      'For a missing multicols environment, check that multicol is loaded and that the environment name ends in s. For Misplaced omit, check the placement of \\multicolumn and the row structure. For an overfull box, inspect local widths and unbreakable content. A successful compile does not guarantee that text, figures, and reading order fit the intended two-column design.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\n\\begin{tabular}{lrr}\n\\multicolumn{2}{c}{Grouped heading} & Total \\\\\nItem & Value & Count \\\\\nA & 12 & 3\n\\end{tabular}\n\\end{document}',
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
        datePublished="2026-11-09"
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
              'For a two-column LaTeX document, use \\documentclass[twocolumn]{article}. For only part of a page, load multicol and wrap the text in \\begin{multicols}{2} ... \\end{multicols}. Choose the document option for a conventional two-column paper with floats, and multicols for local column sections. The similarly named \\multicolumn command merges table cells; it does not create page columns.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 22, 2026</p>
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
            See the <a href="https://ctan.org/pkg/multicol">multicol manual</a> for balancing and
            float limitations, and the{' '}
            <a href="https://www.latex-project.org/help/documentation/classes.pdf">
              standard classes documentation
            </a>{' '}
            for two-column class behavior.
          </p>
          <ul>
            <li>
              <Link href="/learn/document-classes">Document classes</Link>
            </li>
            <li>
              <Link href="/learn/images">Images and floats</Link>
            </li>
            <li>
              <Link href="/learn/tables">LaTeX tables</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Compile a small example first</h2>
            <p className="text-muted-foreground mb-4">
              Paste a complete example into a project in Octree, compile it, and inspect the PDF
              before applying the change to your main document. Keep the packages and document class
              from your real template when checking compatibility.
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
