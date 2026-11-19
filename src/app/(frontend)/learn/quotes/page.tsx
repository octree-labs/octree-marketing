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
  slug: 'quotes',
  title: 'Quotes in LaTeX: Quotation Marks, Block Quotes and csquotes',
  seoTitle: 'LaTeX Quotation Marks, Block Quotes and csquotes',
  description:
    'Write opening and closing quotation marks in LaTeX, nest quotes with csquotes, format block quotations, and fix backwards marks or literal code quotes.',
  keywords:
    'latex quotation marks, quotes in latex, latex double quotes, latex single quotes, latex block quote, csquotes, enquote, quotation',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-19'
const faq: FaqItem[] = [
  {
    question: 'How do I type double quotation marks in LaTeX?',
    answer:
      "Type two backticks before the text and two apostrophes after it: ``text''. Alternatively, load csquotes and write \\enquote{text}. Both methods avoid using a closing quotation mark at the beginning of a passage.",
  },
  {
    question: 'How do I put a quote inside a quote?',
    answer:
      'With csquotes, nest \\enquote commands. Under the default English style, the outer quotation uses double marks and the inner one uses single marks. The package also handles the spacing between adjacent closing quotation marks.',
  },
  {
    question: 'What is the difference between quote and quotation?',
    answer:
      'Both environments indent a displayed passage without adding quotation marks. In the standard classes, quote uses unindented paragraph starts, while quotation uses first-line indentation and suits multiple paragraphs. Your document class can customize their spacing.',
  },
  {
    question: 'Does csquotes automatically cite the source?',
    answer:
      'No. \\enquote supplies quotation marks, not source information. Use an attribution or citation command. Citation-aware commands such as \\textcquote still require a configured bibliography system and a valid citation key.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Opening and closing quotation marks without a package',
    paragraphs: [
      'English typographic quotation marks have different opening and closing shapes. In traditional LaTeX input, the opening character is the backtick, also called a grave accent, while the closing character is the apostrophe. Two of each form a double quotation mark. These are source conventions: the PDF should display curved marks, not a pair of visibly separate keyboard characters.',
      'The backtick key is often near the top-left corner of an English keyboard, but its position varies with the keyboard layout. If entering it is inconvenient, use csquotes instead of substituting an apostrophe. Two apostrophes at the beginning of a quotation produce closing marks, which is the usual reason an opening quote looks backwards.',
      'Do not rely on the straight double-quote key to select opening and closing punctuation in prose. Its output depends on the font and encoding, and language packages may give it another role. The document below demonstrates the conventional source form with the standard article class and T1 font encoding. Compile it and compare the left and right marks in the PDF.',
    ],
    code: "\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\begin{document}\nShe called it ``a useful result''.\n\nThe word `approximate' matters here.\n\nThe author's explanation is clear.\n\\end{document}",
  },
  {
    title: 'Use csquotes for nested quotations',
    paragraphs: [
      'Load csquotes in the preamble and use \\enquote around the quoted words. In its default English style, the outer quotation uses double marks and a quotation nested inside it uses single marks. The package also handles the spacing where nested closing marks meet. This makes a long passage easier to edit than a string of manually counted apostrophes.',
      "The command supplies delimiters, not the wording or punctuation of the quotation. Put commas and periods where your required editorial style calls for them. American and British conventions can differ, and a language setting does not decide whether a particular punctuation mark belongs to the quoted material. Preserve the source wording and follow the publication's style guide.",
      "Use nested \\enquote commands when an inner quotation is genuinely inside an outer one. The starred form, \\enquote*, requests the inner quotation style directly; it is useful for a standalone single-quoted expression under the default English setup. Do not hard-code single marks everywhere if your document may later switch to another language's quotation conventions.",
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage{csquotes}\n\\begin{document}\n\\enquote{She called it \\enquote{a useful result}.}\n\nThe term \\enquote*{approximate} needs a definition.\n\\end{document}',
  },
  {
    title: 'Language-aware quotation styles',
    paragraphs: [
      'Load babel with the document language, then load csquotes with the autostyle option. That connects the quotation style to the active language rather than merely assuming English punctuation. A multilingual document can switch language locally, and quotations made with \\enquote can follow those changes. Automatic style selection needs a supported language and the relevant language files installed.',
      'If a publisher specifies a particular convention, select a csquotes style explicitly rather than replacing marks throughout the source by hand. The example uses the american and british styles to show that even English-language documents can have different outer and inner quotation marks. Changing the style affects subsequent quotation commands; it does not rewrite literal marks you already typed.',
      'For a small document, manual marks may be enough. For a thesis, translation, or reusable template, semantic quotation commands make global changes safer. Keep language selection separate from font selection: loading an appropriate font does not by itself tell csquotes which editorial quotation style to use. Conversely, selecting a language does not ensure every chosen font contains all required glyphs.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage[english]{babel}\n\\usepackage[autostyle]{csquotes}\n\\begin{document}\n\\setquotestyle{american}\n\\enquote{An outer quote with \\enquote{an inner quote}.}\n\n\\setquotestyle{british}\n\\enquote{An outer quote with \\enquote{an inner quote}.}\n\\end{document}',
  },
  {
    title: 'Block quotes: quote versus quotation',
    paragraphs: [
      'Use the quote environment for a short displayed passage. In the standard article class, it indents both margins, leaves paragraph starts unindented, and adds vertical space around the block. It does not insert quotation marks or switch the text to italics. Those are separate formatting decisions, so avoid adding them unless your style guide requires them.',
      'The quotation environment is intended for longer passages containing multiple paragraphs. In the standard classes, it uses first-line paragraph indentation, including at the start of the passage. Separate paragraphs with a blank source line rather than forcing a break with two backslashes. Exact spacing and indentation can change with the class or packages, so inspect your actual template.',
      'Do not wrap an ordinary block quote in a figure float, a tabular, or an unbreakable box simply to indent it. Those structures change placement or page-breaking behavior for unrelated reasons. Use the quotation environment directly in the text, and place the source attribution where the required citation style expects it.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nA short displayed passage follows.\n\\begin{quote}\nThis is a short example passage. Its margins are inset,\nbut it has no automatic quotation marks.\n\\end{quote}\n\nA longer passage follows.\n\\begin{quotation}\nThis first paragraph introduces the example and establishes\nits subject in a few ordinary words.\n\nThis second paragraph continues the same passage and shows\nthe first-line indentation of the quotation environment.\n\\end{quotation}\n\\end{document}',
  },
  {
    title: 'Attribution, citations, and automatic block selection',
    paragraphs: [
      "A quotation still needs attribution when you borrow another author's words. The quote environment only formats the passage; it does not record a source or generate a bibliography entry. Use the citation system already configured for your document, and include a page or other locator when the source and your style require one.",
      'With csquotes, \\textquote accepts an optional citation argument. The body-only snippet below uses plain attribution text, so it does not need a bibliography database or an extra processing tool. Insert it into a document that already loads csquotes. For a real source, replace the illustrative attribution with an accurate citation rather than copying this fictional label.',
      "For documents using biblatex, csquotes also offers citation-aware commands such as \\textcquote, whose citation key must exist in the bibliography database. The \\blockquote command can choose inline or displayed treatment using the package's length and paragraph criteria. That convenience does not override a publisher's explicit block-quotation rules; choose the environment yourself when the required presentation is fixed.",
    ],
    code: '\\textquote[Example attribution]{This sentence illustrates quotation formatting, not a quotation from a published source.}',
  },
  {
    title: 'Poetry, apostrophes, and literal quotes in code',
    paragraphs: [
      'Poetry needs deliberate line endings rather than ordinary paragraph wrapping. The standard verse environment is designed for that layout: use two backslashes to end a verse line and a blank line between stanzas. It does not add quote marks automatically. A long verse line can wrap with a hanging indentation, which helps distinguish the continuation from the next poetic line.',
      "An apostrophe in ordinary English prose is normally a single closing mark, as in the author's draft. Do not replace it with a backtick, which would produce an opening mark. Smart punctuation pasted from a word processor may work in modern LaTeX, but the result depends on the engine, font, and input setup. Conventional source notation or csquotes is easier to keep consistent.",
      'Literal programming quotes are a different requirement. A code example needs straight characters, not typographic opening and closing marks. Use a verbatim or dedicated code-listing mechanism rather than ordinary prose formatting. The upquote package helps produce straight quote characters in verbatim material with traditional LaTeX fonts. Avoid \\verb inside ordinary command arguments such as section titles or captions.',
    ],
    code: '\\documentclass{article}\n\\usepackage[T1]{fontenc}\n\\usepackage{upquote}\n\\begin{document}\n\\begin{verse}\nAn example line begins the day,\\\\\nAnother carries it away.\n\nA second stanza starts anew.\n\\end{verse}\n\nLiteral code: \\verb|print("hello")|\n\\end{document}',
  },
  {
    title: 'Fix backwards marks and missing quote commands',
    paragraphs: [
      'When quotation marks look wrong, inspect the opening characters first. Apostrophes and backticks can look similar in a small editor font, so compare the source with a minimal working document. If the minimal example is correct but the full document is not, check language shorthands, font changes, and package settings before replacing punctuation throughout the file.',
      'If \\enquote is undefined, add csquotes to the preamble and compile again. If quotation marks render correctly but attribution is missing, inspect the citation command and bibliography workflow separately. Finally, check the PDF at a readable zoom: successful compilation proves that the source was accepted, not that opening marks, nesting, and block indentation match your intended style.',
    ],
  },
]

export default async function LearnPage() {
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
        datePublished="2026-10-17"
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
              "For English quotation marks in LaTeX, type two backticks to open and two apostrophes to close: ``text''. For single quotes, use `text'. Alternatively, load csquotes and write \\enquote{text}; it selects paired marks and handles nested quotations. For an indented passage without surrounding marks, use the built-in quote or quotation environment."
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 19, 2026</p>
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
          <h2>Related guides</h2>
          <ul>
            <li>
              <Link href="/learn/special-characters">Special characters in LaTeX</Link>
            </li>
            <li>
              <Link href="/learn/paragraphs-indentation">Paragraphs and indentation</Link>
            </li>
            <li>
              <Link href="/learn/bibliography-examples">Bibliography examples</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Check the result in your own document</h2>
            <p className="text-muted-foreground mb-4">
              Open a small project in Octree, paste a complete example, and compile it before moving
              the changes into your main document. Check the PDF as well as the error log.
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
