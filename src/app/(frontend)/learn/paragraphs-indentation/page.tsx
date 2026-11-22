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
  slug: 'paragraphs-indentation',
  title: 'LaTeX noindent: Paragraphs, Indentation and Spacing',
  seoTitle: 'LaTeX noindent: Remove or Set Paragraph Indentation',
  description:
    'Use LaTeX noindent for one paragraph, set parindent globally, choose parskip spacing, and create hanging indents or indented blocks correctly.',
  keywords:
    'latex noindent, latex indentation, latex parindent, latex parskip, latex hanging indent',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-22'
const faq: FaqItem[] = [
  {
    question: 'How do I remove indentation from one paragraph?',
    answer:
      'Start a new paragraph with a blank line or \\par, then write \\noindent before its first word. The command changes that paragraph only; it does not remove list or quotation margins.',
  },
  {
    question: 'How do I remove all paragraph indents?',
    answer:
      'Set \\setlength{\\parindent}{0pt} in the preamble. For a spaced-paragraph style, consider \\usepackage{parskip}, which also manages paragraph separation and related spacing.',
  },
  {
    question: 'Why is the first paragraph after a section not indented?',
    answer:
      'Standard classes normally suppress that indent. If your required style calls for it, load indentfirst and keep \\parindent nonzero. Specialist classes or language settings may use different conventions.',
  },
  {
    question: 'Why does noindent not work after a line break?',
    answer:
      "A forced line break is not a new paragraph. End the paragraph with a blank source line or \\par, then put \\noindent at the next paragraph's start.",
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Use noindent at the start of a real paragraph',
    paragraphs: [
      'A paragraph begins after a blank source line or an explicit \\par. A single source newline normally becomes a space, so putting \\noindent on the next source line does not necessarily start a new paragraph. End the preceding paragraph first, then apply the command to the paragraph whose first-line indentation should disappear.',
      "\\noindent affects that paragraph's opening, not every later paragraph. It is useful after a displayed object when the following prose deliberately continues an explanation, or for a standalone label that should start at the left edge. Do not place it at the start of every paragraph if a document-wide style is what you actually want.",
      'The example includes an ordinary paragraph, an unindented one, and another ordinary paragraph. Comparing all three is more informative than testing the command immediately after a heading, where the class may already suppress indentation. The command takes no argument; braces around the entire paragraph are unnecessary.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nThis paragraph uses the normal first-line indentation.\n\n\\noindent This paragraph starts at the left margin.\n\nThis paragraph returns to the normal indentation.\n\\end{document}',
  },
  {
    title: 'Set parindent and preserve paragraph boundaries',
    paragraphs: [
      '\\parindent is a length controlling the first-line inset. Set it with \\setlength and include a unit such as pt, em, or mm. A value of 0pt removes the inset; a value of 2em makes it proportional to the font size in effect when the assignment is made. It does not continuously recalculate whenever the font changes.',
      "Place a global setting in the preamble after packages that configure paragraph layout, and follow your document class's guidance if it supplies a dedicated interface. Class defaults vary, so do not rely on one hard-coded default as a rule for every template. Publisher classes may intentionally impose their own spacing.",
      'Removing indentation without adding paragraph separation can make adjacent paragraphs visually merge. That may be acceptable for a special layout, but ordinary prose needs a clear boundary. Choose either traditional first-line indentation or a carefully designed space-between-paragraphs style rather than erasing both cues accidentally.',
    ],
    code: '\\documentclass{article}\n\\setlength{\\parindent}{2em}\n\\begin{document}\nThis paragraph begins with a two-em indent.\n\n{\\setlength{\\parindent}{0pt}\nThis locally unindented paragraph is ended inside the group.\\par}\n\nThis paragraph uses the document setting again.\n\\end{document}',
  },
  {
    title: 'Use parskip for a spaced-paragraph style',
    paragraphs: [
      "The parskip package is a convenient choice for prose with no first-line indents and visible inter-paragraph space. It does more than a bare assignment to \\parskip: it also addresses spacing interactions with structures such as lists and contents. Load it only if the document's required style permits that overall presentation.",
      "A manual positive \\parskip affects places where LaTeX uses paragraph-based structures internally, so it can introduce surprising gaps in lists or around headings. Do not compensate with scattered negative vertical spaces before identifying the source. Either use a package designed for the style or use the class's paragraph-spacing controls.",
      'The package does not remove the need for blank lines in the source. Those lines still identify paragraph boundaries; the style determines how the boundaries look. Avoid adding repeated blank lines in the hope of larger gaps, since they are not a precise vertical-spacing interface. Keep semantic paragraph breaks separate from layout adjustments.',
    ],
    code: '\\documentclass{article}\n\\usepackage{parskip}\n\\begin{document}\nThis first paragraph begins without a first-line inset.\n\nThis second paragraph is separated by vertical space.\nIt is still one paragraph despite this source newline.\n\\end{document}',
  },
  {
    title: 'Understand the first paragraph after a heading',
    paragraphs: [
      'The standard article, report, and book classes normally suppress the indent after a heading. This is a typographic convention, not a failure of \\parindent. Later paragraphs in the same section can still be indented. Test a second paragraph before concluding that a global setting has been ignored.',
      'When your style requires indentation after headings too, the indentfirst package changes that behavior in standard classes. It does not choose a new indent width; \\parindent still supplies the length. If that length is zero, loading indentfirst will not create a visible inset. Language packages and specialist classes may have their own conventions.',
      "Do not use extra spaces or a tab character to repair a heading's first paragraph. LaTeX normally collapses such whitespace, and forced spaces encode an appearance without changing the underlying paragraph policy. Use the appropriate class option or package so later sections follow the same rule automatically.",
    ],
    code: '\\documentclass{article}\n\\usepackage{indentfirst}\n\\setlength{\\parindent}{2em}\n\\begin{document}\n\\section{Results}\nThis first paragraph is indented too.\n\nThe next paragraph uses the same first-line inset.\n\\end{document}',
  },
  {
    title: 'Line breaks, tabs, and horizontal space are different',
    paragraphs: [
      'A double backslash requests a line break in contexts that support it; it does not create a new paragraph. Using it to separate ordinary paragraphs bypasses the paragraph-spacing and indentation rules, and can produce a no-line-to-end error. Use a blank line for a new paragraph and reserve explicit breaks for structures that actually require them.',
      'The \\indent command inserts an indentation box using the current \\parindent. It is not a universal override for heading behavior, nor does it help when that length is zero. For a deliberate fixed gap, \\hspace adds horizontal space and \\hspace* preserves it where ordinary discardable space could disappear at a line boundary.',
      'Neither \\hspace nor repeated spaces creates a reliable multi-column alignment. Use tabular for aligned fields or tabbing when you specifically need tab stops. The keyboard Tab character is source whitespace, not a request for a fixed visual stop in the PDF. Treat source indentation as an editing aid, separate from typeset indentation.',
    ],
  },
  {
    title: 'Hanging indents and indented blocks',
    paragraphs: [
      'A hanging indent leaves the first line at the ordinary left edge and moves subsequent lines inward. Set \\hangindent to the desired amount and \\hangafter to 1 for that pattern. These are paragraph-shape settings, so ensure the paragraph ends while the settings are still active, particularly when placing the construction inside a group.',
      "The example uses a narrow minipage only to make the wrapping visible in a small document. A minipage is unbreakable across pages, so do not copy that wrapper around a long bibliography. For references, use the bibliography system's formatting rather than manually shaping every entry; it can handle labels and continued lines consistently.",
      "To inset an entire passage at both margins, use quote or quotation rather than a first-line indent. For adjustable left and right offsets, changepage provides adjustwidth. These structures change the block's usable line width. Images and rules inside them should generally respect \\linewidth instead of assuming the full page text width.",
    ],
    code: '\\documentclass{article}\n\\usepackage{changepage}\n\\begin{document}\n\\begin{minipage}{7cm}\n\\noindent\\hangindent=2em\\hangafter=1\nThis example entry is long enough to wrap across several\nlines, showing that the first line starts at the left\nwhile the following lines begin farther inward.\\par\n\\end{minipage}\n\n\\begin{adjustwidth}{2em}{1em}\nThis whole block has an inset left margin and an inset\nright margin, independently of its first-line indentation.\n\\end{adjustwidth}\n\\end{document}',
  },
  {
    title: 'Scope settings and diagnose unexpected indentation',
    paragraphs: [
      'TeX finishes paragraph layout when the paragraph ends. If you change paragraph parameters inside braces, end the paragraph with \\par before closing the group. Otherwise the restored outer settings can be active when line breaking occurs. This is especially important for hanging indents, alignment declarations, and local changes to the available width.',
      "If \\noindent appears ineffective, first confirm that it is before the first word of a new paragraph. Then check whether the apparent inset is actually a list margin, quote margin, table padding, or a minipage's position. A first-line command cannot remove an environment's left margin, because those are different parts of the layout.",
      'If spacing changes unexpectedly halfway through the document, inspect nearby declarations and grouping. A command outside braces can remain active beyond the paragraph you intended to alter. Reduce the case to two paragraphs and the surrounding environment, then add your class and packages back in order. Check the final PDF at a page break as well as in the middle of a page.',
      "Keep formatting decisions consistent with the document's purpose. A thesis or journal template may prescribe indented paragraphs even if a web-style spaced layout looks more familiar. Prefer the template's supported settings over local overrides, and compare a representative heading, list, quotation, and ordinary paragraph before accepting a global change.",
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
              'To remove indentation from one LaTeX paragraph, put \\noindent immediately before its first word, after a blank line or \\par. To remove it throughout the document, set \\setlength{\\parindent}{0pt} in the preamble. If you also want visible space between paragraphs, use the parskip package rather than inserting manual line breaks.'
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
            Consult the <a href="https://ctan.org/pkg/parskip">parskip manual</a>,{' '}
            <a href="https://ctan.org/pkg/indentfirst">indentfirst documentation</a>, and{' '}
            <a href="https://ctan.org/pkg/changepage">changepage documentation</a> for their class
            interactions and options.
          </p>
          <ul>
            <li>
              <Link href="/learn/spacing">LaTeX spacing</Link>
            </li>
            <li>
              <Link href="/learn/quotes">Block quotations</Link>
            </li>
            <li>
              <Link href="/learn/page-size-margins">Page size and margins</Link>
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
