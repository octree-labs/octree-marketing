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
  slug: 'special-characters',
  title: 'LaTeX Special Characters: Escape Characters Correctly',
  seoTitle: 'LaTeX Special Characters and Escape Characters',
  description:
    'Escape LaTeX special characters, print underscores and backslashes, handle URLs and literal code, and distinguish text symbols from math notation.',
  keywords:
    'latex special characters, latex escape characters, latex underscore, latex percent sign, latex backslash',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-22'
const faq: FaqItem[] = [
  {
    question: 'Which LaTeX characters need escaping?',
    answer:
      'In ordinary text, write \\# \\$ \\% \\& \\_ \\{ \\} for those seven reserved characters. Use \\textbackslash{}, \\textasciitilde{}, and \\textasciicircum{} for a literal backslash, tilde, and caret.',
  },
  {
    question: 'Why does my percent sign hide the rest of a line?',
    answer:
      'A bare % begins a comment. Use \\% to print a percentage. Check whether the comment also hid a closing brace, because that can cause a later runaway-argument error.',
  },
  {
    question: 'How do I print a filename containing underscores?',
    answer:
      'Use \\texttt{file\\_name} for simple text or \\verb|file_name| in ordinary body content. For a URL, prefer \\url from hyperref or url rather than manually escaping its characters.',
  },
  {
    question: 'Is a double backslash a printable backslash?',
    answer:
      'No. It requests a line break in supported contexts. Use \\textbackslash{} in text, \\backslash in math, or \\verb for a short literal code fragment.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'The ten reserved characters and their printable forms',
    paragraphs: [
      'LaTeX assigns syntax to ten familiar keyboard characters: backslash, braces, dollar, ampersand, hash, percent, underscore, caret, and tilde. Their source meaning is different from the glyph you may want to print. The usual escape is a backslash followed by the character, but that rule does not work uniformly for all ten.',
      'A backslash followed by another backslash is a line-break command, not a printable backslash. Similarly, backslash-tilde and backslash-caret are accent commands rather than reliable literal ASCII symbols. Use the named text commands for these three characters. The empty braces after a letter-based command terminate its name without consuming the following word space.',
      'The complete example prints the characters in a text context with T1 font encoding. Current LaTeX supports UTF-8 input by default, but input encoding and font encoding are different concerns. T1 selects an output font encoding with suitable text glyphs; it does not make reserved syntax stop being special.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\begin{document}\nHash: \\#; dollar: \\$; percent: \\%; ampersand: \\&.\n\nUnderscore: \\_; braces: \\{ and \\}.\n\nBackslash: \\textbackslash{};\ntilde: \\textasciitilde{};\ncaret: \\textasciicircum{}.\n\\end{document}',
  },
  {
    title: 'Percent, dollar, ampersand, and hash',
    paragraphs: [
      'An unescaped percent begins a comment that continues to the end of the source line. If a sentence disappears after a percentage, write \\% rather than changing the font or adding math mode. A comment can also swallow a closing brace, making the eventual error appear much later than the actual mistake.',
      'An unescaped dollar changes math mode. Use \\$ for a price and ordinary text for the surrounding currency description. Putting an entire price sentence inside math mode changes spacing and letter styling unnecessarily. For mathematical quantities, enter math mode intentionally and keep currency or explanatory words in an appropriate text context.',
      'An ampersand separates alignment cells in tabular and mathematical alignments. A company name containing an ampersand must use \\& even inside a table cell. A hash is a parameter marker in macro definitions; use \\# when you mean a visible issue number or hashtag. These escapes preserve the intended content instead of altering the surrounding structure.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nThe discount is 15\\%, and the price is \\$20.\nIssue \\#42 belongs to Research \\& Development.\n\n\\begin{tabular}{ll}\nDepartment & Budget \\\\\nResearch \\& Development & \\$20\n\\end{tabular}\n\\end{document}',
  },
  {
    title: 'Underscores, braces, and mathematical meaning',
    paragraphs: [
      'An underscore introduces a subscript in math mode. In ordinary text it commonly triggers Missing dollar inserted, because TeX assumes you intended a mathematical subscript. Use \\_ for a literal underscore in an identifier. Do not fix a filename by putting it in math mode: that would treat its letters as variables and the suffix as a subscript.',
      'Braces group source and delimit command arguments, so plain braces are not printed. Use \\{ and \\} for visible braces in text or math. In a set expression, escaped braces are delimiters, while the unescaped braces around a command argument remain structural. Both roles can occur next to each other in valid source.',
      'The same visual character can have different mathematical jobs. A literal underscore is not a subscript, and an ASCII caret is not an exponent. For actual mathematical structure, use the syntax x_i or x^2 inside math mode. Escaping everything indiscriminately can turn a correct formula into literal text instead of protecting it.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\begin{document}\nThe identifier is \\texttt{sample\\_id}.\nThe visible group is \\{alpha, beta\\}.\n\nThe mathematical expression is $x_i^2$.\nThe set is $A=\\{1,2,3\\}$.\n\\end{document}',
  },
  {
    title: 'Literal code and file paths',
    paragraphs: [
      'For a short literal fragment, \\verb uses a delimiter of your choice and prints the intervening characters without normal command interpretation. Choose a delimiter absent from the fragment. A vertical bar is common, but a fragment containing a bar needs another character. The opening and closing delimiter must match on the same source line.',
      '\\verb is useful for showing a Windows path, a command name, or an identifier with several special characters. It is not suitable inside ordinary command arguments such as section headings or captions. In those locations, use escaped text with \\texttt for simple content, or a package interface explicitly designed for the context.',
      'For a multi-line literal block, the verbatim environment preserves source-like characters and spacing. Long lines do not automatically become well-formatted wrapped code. For larger listings with line breaking or syntax highlighting, choose a dedicated code package rather than forcing a paragraph of \\verb fragments into a narrow column.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\begin{document}\nPath: \\verb|C:\\data\\run_01|.\nCommand: \\verb|\\textbf{example}|.\nA pipe: \\verb+left|right+.\n\n\\begin{verbatim}\n# literal example\ncost = "$20"  # 15% discount\nfile_name = "run_01"\n\\end{verbatim}\n\\end{document}',
  },
  {
    title: 'URLs need URL handling, not ordinary text escaping',
    paragraphs: [
      'Load hyperref and use \\url for a visible clickable URL. It understands common URL characters such as underscores and gives LaTeX suitable break opportunities. Writing the same address as ordinary text can trigger syntax errors or create a line too long for the available width. The url package is an alternative when you do not need hyperlinks.',
      'Use \\href when the visible link text should differ from the address. The label is ordinary LaTeX content and must follow ordinary escaping rules, even though the destination has special URL handling. Do not apply one blanket escape operation to both arguments without considering their separate contexts.',
      'Test real addresses in the generated PDF, especially those containing percent-encoded bytes, fragments, or query strings. Wrapping a URL command in another macro can change when special characters are interpreted. A valid-looking printed address is not enough: check that the clickable destination is the intended one and that punctuation after the link is not accidentally part of it.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage{hyperref}\n\\begin{document}\n\\url{https://example.org/data/sample_id}\n\n\\href{https://example.org/data/sample_id}{View sample\\_id}\n\\end{document}',
  },
  {
    title: 'Tildes, pipes, angle brackets, and Unicode',
    paragraphs: [
      'A bare tilde creates a nonbreaking space, useful between a label and number when they should stay together. A visible text tilde uses \\textasciitilde; a mathematical similarity relation uses \\sim. These are different operations, not interchangeable ways to solve the same display problem. Use an accent command only when you actually want a tilde accent.',
      'For a text pipe, use \\textbar. In mathematics, use \\mid for a relation such as divides, and \\lvert and \\rvert from amsmath for absolute-value delimiters. The glyph may look similar, but the mathematical role controls surrounding spacing. Likewise, use text angle-bracket commands for literal text and mathematical comparison symbols in math mode.',
      "Some direct keyboard glyphs depend on the text font encoding. Under traditional OT1 encoding, a raw pipe or angle bracket can print an unexpected character, so named text commands and a suitable encoding are safer. Unicode support also depends on the engine and selected font. Switching engines can expand font access, but does not remove LaTeX's reserved-character syntax.",
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage{amsmath}\n\\begin{document}\nFigure~1 stays together.\nLiteral: \\textasciitilde{}, \\textbar{},\n\\textless{}tag\\textgreater{}.\n\nMath: $a\\sim b$, $a\\mid b$, $\\lvert x\\rvert$, and $x<y$.\n\\end{document}',
  },
  {
    title: 'Escape once, at the right boundary',
    paragraphs: [
      "When generating LaTeX from a program, distinguish the programming language's string syntax from the final LaTeX source. A doubled backslash in a JSON or JavaScript string may produce one backslash in the emitted file. Inspect the actual .tex output before adding more escapes, because fixing the representation you see in a debugger can corrupt the document.",
      'Treat plain-text fields and trusted LaTeX fragments differently. Escape plain text before inserting it into ordinary text contexts, but do not blindly escape commands that are meant to execute. Conversely, accepting arbitrary LaTeX is not made safe by replacing a handful of characters. Security and compilation sandboxing require separate controls.',
      'For debugging, read the first relevant error and inspect the preceding source line too. A missing brace, dollar, or commented-out delimiter can shift the apparent location of a failure. Reduce the input to the troublesome character in a minimal document, then restore its original heading, URL, table, or math context to identify which rules apply.',
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
              'In ordinary LaTeX text, escape # $ % & _ { } with a backslash: \\# \\$ \\% \\& \\_ \\{ \\}. Print the remaining reserved characters with \\textbackslash{}, \\textasciitilde{}, and \\textasciicircum{}. A bare backslash begins a command, a bare tilde creates a nonbreaking space, and a bare caret has a special TeX role. For literal code or URLs, use a purpose-built command instead of escaping each character manually.'
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
            The <a href="https://www.latex-project.org/help/documentation/">LaTeX documentation</a>,{' '}
            <a href="https://ctan.org/pkg/url">url documentation</a>, and{' '}
            <a href="https://ctan.org/pkg/hyperref">hyperref manual</a> cover text commands and
            URL-specific parsing.
          </p>
          <ul>
            <li>
              <Link href="/learn/comments">Comments and percent signs</Link>
            </li>
            <li>
              <Link href="/learn/hyperlinks">Hyperlinks</Link>
            </li>
            <li>
              <Link href="/learn/code-listings">Code listings</Link>
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
