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
  slug: 'tables',
  title: 'LaTeX Tables: Multicolumn Cells, Captions and Column Widths',
  seoTitle: 'LaTeX Tables: multicolumn, multirow and booktabs',
  description:
    'Build LaTeX tables with multicolumn and multirow cells, booktabs rules, wrapping columns, captions, longtable and practical alignment fixes.',
  keywords:
    'latex table, latex multicolumn, latex multirow, latex tabular, latex booktabs, latex table width',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'
const faq: FaqItem[] = [
  {
    question: 'How do I merge two columns in LaTeX?',
    answer:
      'Use \\multicolumn{2}{c}{Heading} inside tabular. It occupies two columns and centers the content. The remaining cells in that row must fill only the columns left over.',
  },
  {
    question: 'Can multicolumn wrap a long heading?',
    answer:
      'Yes, use a paragraph specification such as p{5cm} as its second argument. A plain c alignment keeps the content on one unbroken line, even when the underlying columns wrap.',
  },
  {
    question: 'Does multicolumn create a two-column document?',
    answer:
      'No. It merges table cells. Use a document class option such as twocolumn or the multicol package for page-level text columns.',
  },
  {
    question: 'Why does my table reference show question marks?',
    answer:
      'Put \\label immediately after \\caption, check the reference key, and compile again. A label inside an uncaptioned tabular does not automatically create a numbered table.',
  },
]
const sections: { id?: string; title: string; paragraphs: string[]; code?: string }[] = [
  {
    id: 'tabular',
    title: 'Start with a complete table, not an isolated row',
    paragraphs: [
      'A tabular environment describes a grid. Its column specification declares how many columns exist and how their content aligns: l means left, c means centered, and r means right. Separate cells with an ampersand and terminate a row with two backslashes. An ampersand printed as content must be escaped, otherwise LaTeX treats it as another cell boundary.',
      'The table environment is a separate wrapper that can float to a suitable position. Place the caption before the grid when that matches your style guide, and put the label immediately after the caption so it captures the table counter. Compile twice to resolve the reference. The booktabs package supplies rules with spacing designed for publication tables; it does not create the grid or merge cells.',
    ],
    code: '\\documentclass{article}\n\\usepackage{booktabs}\n\\begin{document}\nSee Table~\\ref{tab:results}.\n\\begin{table}[htbp]\n\\centering\n\\caption{Measurements by group}\\label{tab:results}\n\\begin{tabular}{lrr}\n\\toprule\nGroup & Count & Mean \\\\\n\\midrule\nA & 12 & 4.2 \\\\\nB & 15 & 5.1 \\\\\n\\bottomrule\n\\end{tabular}\n\\end{table}\n\\end{document}',
  },
  {
    id: 'booktabs',
    title: 'Merge columns and draw booktabs rules',
    paragraphs: [
      'A multicolumn entry replaces several ordinary cells, but those cells still count toward the row width. In a three-column table, a span of two followed by one normal cell fills the row. Do not add an extra empty cell for every merged column: that is a common cause of an extra alignment tab error. Count the spans rather than merely counting visible ampersands.',
      "The second argument replaces the alignment specification for that entry, including vertical rules. In a ruled grid, write the desired edge rules in that argument; they are not automatically preserved from the original columns. A one-column multicolumn is also useful for changing one heading's alignment without changing the data underneath. For booktabs tables, prefer clear spacing and partial horizontal rules over a dense rectangular grid.",
    ],
    code: '\\documentclass{article}\n\\usepackage{booktabs}\n\\begin{document}\n\\begin{tabular}{lrr}\n\\toprule\n& \\multicolumn{2}{c}{Measurements} \\\\\n\\cmidrule(lr){2-3}\nGroup & Before & After \\\\\n\\midrule\nA & 12 & 15 \\\\\nB & 9 & 11 \\\\\n\\bottomrule\n\\end{tabular}\n\\end{document}',
  },
  {
    title: 'Merge rows without overwriting neighboring content',
    paragraphs: [
      'The multirow package handles vertical spans. Its usual arguments specify the number of rows, the width, and the content; an asterisk for width uses the natural content width. Reserve the covered cells in subsequent rows by leaving them empty. If you fill those positions again, the output can overlap even when compilation succeeds.',
      'A rule across the whole table can cut through a multirow label. Use a partial rule over only the columns that need separation, or remove the internal rule when grouping is already clear. Combining horizontal and vertical spans is possible, but it makes cell counting harder. Build the ordinary grid first, add one span at a time, and check each intermediate PDF before introducing more formatting.',
    ],
    code: '\\documentclass{article}\n\\usepackage{multirow}\n\\begin{document}\n\\begin{tabular}{llr}\nGroup & Trial & Score \\\\\n\\hline\n\\multirow{2}{*}{Control} & First & 7 \\\\\n& Second & 9 \\\\\nTreatment & First & 12\n\\end{tabular}\n\\end{document}',
  },
  {
    title: 'Wrap long content instead of shrinking everything',
    paragraphs: [
      'The l, c and r column types do not wrap paragraphs. A long sentence can therefore make the table wider than the text area. Use p{width} for a top-aligned paragraph column, or load array for m and b columns when you need vertically centered or bottom-aligned paragraph content. Width includes only the paragraph box, not every surrounding gap and rule.',
      'For a table that should fill the current line width, tabularx provides X columns that share the remaining space. Use \\linewidth rather than assuming that \\textwidth equals the space inside a list, minipage or document column. A merged heading does not automatically make long text wrap: its replacement specification needs an appropriate paragraph width too. Reduce redundant wording before reducing the font size to something difficult to read.',
    ],
    code: '\\documentclass{article}\n\\usepackage{tabularx,booktabs}\n\\begin{document}\n\\noindent\\begin{tabularx}{\\linewidth}{lXr}\n\\toprule\nItem & Description & Cost \\\\\n\\midrule\nA & A longer description that wraps within the available table width. & 12 \\\\\nB & Another explanation, without manually inserted line breaks. & 18 \\\\\n\\bottomrule\n\\end{tabularx}\n\\end{document}',
  },
  {
    title: 'Use spacing and numeric alignment deliberately',
    paragraphs: [
      'The length \\tabcolsep controls padding beside cells, while \\arraystretch scales the normal row strut. Keep such settings local with a surrounding group when only one table needs them. Increasing row spacing is useful for crowded subscripts, but it cannot fix a wrongly counted row or an unbreakable paragraph. With booktabs, \\addlinespace can separate logical groups without inserting another rule.',
      'Right alignment is a reasonable start for integers, but decimal values often read better with siunitx S columns. Declare an appropriate table-format for the expected digits and signs, and protect textual headings as documented by the package. Do not insert spaces into numbers to simulate alignment. For colored rows, load xcolor with its table option and maintain sufficient contrast; color should reinforce grouping rather than carry the only explanation.',
    ],
  },
  {
    title: 'Choose placement and page breaks separately',
    paragraphs: [
      'The placement option htbp asks LaTeX to consider here, top, bottom and a float page. It is not an instruction to put a table at an exact source line. If a short table moves, first check the available space and pending floats. Forcing every table into place can create large blank areas and does not make an oversized table fit.',
      'A normal tabular cannot break across pages. Use longtable for a genuinely multipage table and do not place it inside a table float. Its header and footer declarations let you repeat headings on subsequent pages. Standard longtable is not a general solution inside two-column layout. A landscape page or sidewaystable can help a wide table, but changing orientation does not replace deciding whether the information should be split into smaller tables.',
    ],
    code: '\\documentclass{article}\n\\usepackage{longtable,booktabs}\n\\begin{document}\n\\begin{longtable}{lr}\n\\caption{Inventory}\\label{tab:inventory}\\\\\n\\toprule Item & Quantity \\\\\n\\midrule\n\\endfirsthead\n\\toprule Item & Quantity \\\\\n\\midrule\n\\endhead\n\\bottomrule\n\\endfoot\nPencils & 24 \\\\\nFolders & 12 \\\\\nNotebooks & 18 \\\\\n\\end{longtable}\n\\end{document}',
  },
  {
    id: 'captions',
    title: 'Make the table understandable without the surrounding paragraph',
    paragraphs: [
      'A caption should say what was measured, which groups are compared and what the values represent. Put units in column headings when every entry uses the same unit, rather than repeating the unit in every cell. Explain abbreviations and special marks in a table note. A reader scanning the table should not have to search several pages backward to discover whether a value is a count, a percentage or a mean.',
      'Keep precision consistent with the underlying measurement. Extra decimal places do not create extra accuracy, and removing trailing zeros can change the visual comparison between values. If a blank cell means not measured, distinguish it from zero and from not applicable. These are data decisions, not formatting options, and a LaTeX converter cannot reliably infer them from an empty spreadsheet cell.',
      'Review the table in the final document rather than only as a standalone screenshot. Check that the caption stays associated with the correct grid, that notes are legible, and that the reading order is sensible. A complex arrangement of merged cells may look compact while making comparisons harder; sometimes two simpler tables communicate the result more accurately.',
    ],
  },
  {
    id: 'latex-table-generator',
    title: 'Review generated table code and diagnose the first error',
    paragraphs: [
      'A spreadsheet export can save transcription time, but inspect the generated column specification, escaped characters and numeric precision before using it. Keep a copy of the source data so you can verify totals and labels after formatting. Add meaningful captions and references yourself. A converter cannot decide whether two cells represent one logical category or whether a published table should include a particular observation.',
      'For an extra alignment tab, count the declared columns and every multicolumn span in the failing row. For Misplaced noalign, check that the previous row ended before a horizontal rule. For an undefined rule command, verify its package declaration. Footnotes need special care inside tabular: use a documented table-note approach such as threeparttable rather than assuming an ordinary footnote will appear correctly. Fix the first diagnostic before chasing downstream errors.',
    ],
  },
  {
    id: 'tables-in-overleaf',
    title: 'Use the same table source in Overleaf or another editor',
    paragraphs: [
      'These table commands belong to LaTeX and its packages, not to a particular editor. In Overleaf, Octree or a local project, put package declarations in the preamble of the main document and the table in the document body. Do not paste a second documentclass or begin-document command into the middle of an existing paper: those lines make the examples standalone, but your paper already supplies them.',
      'When a table behaves differently after moving between projects, compare the document class, package versions, font size and available line width. A publisher template may change caption styling or float placement. Test the table inside that template before attributing the difference to the editor, and retain the template’s required package configuration.',
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
              'Use \\multicolumn{2}{c}{Heading} to merge two adjacent cells in a LaTeX table. The arguments are the number of columns, the replacement alignment, and the cell content. Start with tabular for the grid; add a table environment when you need a floating caption and reference. Merging table cells is different from making a two-column document.'
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
              <a href="https://ctan.org/pkg/booktabs">booktabs manual</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/array">array and paragraph columns</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/multirow">multirow documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/longtable">longtable documentation</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/multiple-columns">Two-column documents versus table spans</Link>
            </li>
            <li>
              <Link href="/learn/horizontal-lines">Horizontal rules and partial lines</Link>
            </li>
            <li>
              <Link href="/learn/footnotes">Footnotes and table notes</Link>
            </li>
          </ul>
          <p>
            <a href="https://tools.useoctree.com/tools/table-to-latex">Table to LaTeX</a> can help
            turn tabular data into a starting point. Check the generated code against the original
            values before adding merged headings.
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
