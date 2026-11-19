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
  slug: 'environments',
  title: 'LaTeX Environments: begin, end, and Custom Blocks',
  seoTitle: 'LaTeX Environments: Syntax and Custom Blocks',
  description:
    'Use LaTeX environments for lists, equations and tables, define custom blocks with arguments, and fix mismatched begin and end errors.',
  keywords:
    'latex environments, latex example environment, newenvironment, begin end latex, custom environment',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-19'
const faq: FaqItem[] = [
  {
    question: 'What is a LaTeX environment?',
    answer:
      'An environment is a named block between matching begin and end commands. It applies a particular structure or formatting, such as a list, equation, quotation, or table. Some environments require packages or declarations in the preamble.',
  },
  {
    question: 'Can LaTeX environments be nested?',
    answer:
      'Yes, when their contents permit it. Close the inner environment before the outer one. For example, an itemize can be nested inside an enumerate item, but display-math environments should not be nested inside one another.',
  },
  {
    question: 'How do I make a numbered example environment?',
    answer:
      'Load amsthm, select the definition theorem style, and declare the example with newtheorem. Use a section-based counter if you want numbers such as 1.1, and put labels inside each example.',
  },
  {
    question: 'Why is my environment undefined?',
    answer:
      'Check the exact spelling and capitalization, then verify that the required package, class, or custom definition is present. Loading amsthm supplies proof but does not automatically declare every theorem-like environment.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'The basic syntax and a complete first example',
    paragraphs: [
      "The environment name goes inside braces and is case-sensitive. itemize is different from Itemize. An environment can also take arguments after its opening command: tabular requires a column specification, while minipage requires a width. There is no universal set of options that works with every environment; consult the specific environment's interface.",
      'The document environment surrounds the body of a complete document. Package loading and reusable environment definitions normally belong in the preamble before it. A fragment beginning with itemize is valid inside the body, but it is not a complete standalone file. The example below includes both the preamble and the body.',
      'Each list entry starts with \\item. A nested list belongs inside an outer item, and its closing command must appear before the outer list closes. Indentation is not required by LaTeX, but it makes this relationship visible. Use consistent indentation to find mistakes before the compiler reports them.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\n\\begin{enumerate}\n  \\item Prepare the source.\n  \\item Check the output:\n    \\begin{itemize}\n      \\item Read the headings.\n      \\item Verify the equations.\n    \\end{itemize}\n\\end{enumerate}\n\\end{document}',
  },
  {
    title: 'Choose an environment by its job',
    paragraphs: [
      'Use itemize for bullets, enumerate for numbered items, and description for labeled entries. Use quote for a short indented quotation and quotation for longer quotations with paragraph indentation. center, flushleft, and flushright create aligned blocks with surrounding vertical space; they are not merely font or alignment switches.',
      "Use equation for a single numbered display. The amsmath package supplies align for aligned multi-line equations and equation* or align* for unnumbered versions. A star is part of the environment's name: begin{align*} must end with end{align*}. Do not put align inside dollar signs or another display-math environment.",
      'Use tabular for a grid of rows and columns. A table environment is a floating container, typically holding a tabular and a caption. Likewise, figure is a float container rather than an image-loading command. Confusing the container with its contents makes it harder to diagnose placement and alignment issues.',
      'Some environments come from the document class, others from packages. article provides abstract, but standard book does not. amsthm provides proof; a theorem or example environment must usually be declared separately. When copying a block, copy its required package or definition as well, but do not duplicate declarations already in your template.',
    ],
  },
  {
    title: 'Grouping, declarations, and paragraph boundaries',
    paragraphs: [
      'Environments normally create a group, so local formatting changes are restored when the environment ends. A font declaration such as \\itshape inside quote affects that quotation, not the following paragraph. This does not mean every effect is undone: counter increments, labels, and writes to auxiliary files can persist.',
      'Declarations and environments can differ in spacing. \\centering changes alignment without adding the vertical spacing of center. Inside a figure, \\centering is usually preferable to nesting a center environment, which can add unwanted space above and below the image. Choose the construct for its behavior, not just its name.',
      "A paragraph's alignment is applied when the paragraph ends. If you group an alignment declaration manually, finish the paragraph with \\par before closing the group. Similarly, custom environments that change paragraph layout should establish clear paragraph boundaries at both ends. Otherwise the surrounding text can inherit surprising spacing or alignment.",
    ],
    code: '\\documentclass{article}\n\\begin{document}\n\\begin{quote}\n\\itshape\nThis quotation is italic.\n\\end{quote}\nThis paragraph is upright.\n\n{\\centering\nThis paragraph is centered without a center environment.\\par}\nThis paragraph uses the normal alignment.\n\\end{document}',
  },
  {
    title: 'Floats and ordinary blocks behave differently',
    paragraphs: [
      'A figure or table may move to another page because LaTeX places floats according to available space and placement rules. An option such as [htbp] offers permitted locations; it is not an absolute instruction to print at the source position. A quote or tabular, in contrast, does not float by itself.',
      'Put a caption inside the float and place its label after the caption, since the caption advances the figure or table counter. Keep a tabular inside the table when you want a numbered, captioned floating table. If you need a table at the current location without a floating caption, a bare tabular may be enough.',
      'Do not place ordinary floats inside a minipage or other restricted box. A minipage holds its contents together and cannot break across pages, so reserve it for compact material. When a long block runs off the page, changing its width will not make a nonbreaking box split vertically.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\n\\begin{table}[htbp]\n\\centering\n\\begin{tabular}{lr}\nItem & Count \\\\\nDrafts & 3 \\\\\nRevisions & 2\n\\end{tabular}\n\\caption{Project activity}\n\\label{tab:activity}\n\\end{table}\nTable~\\ref{tab:activity} summarizes the work.\n\\end{document}',
  },
  {
    title: 'Define a reusable environment with an argument',
    paragraphs: [
      'The traditional interface is \\newenvironment{name}[number][default]{begin-code}{end-code}. The first argument names the environment, the next optional argument counts its parameters, and an optional default makes the first parameter optional. The two final groups specify what runs when the environment opens and closes.',
      'In the definition below, #1 represents the heading argument. Because a default is supplied, \\begin{note} uses Note and \\begin{note}[Caution] uses Caution. The body is ordinary document content, not another argument to the definition. Both uses share the same layout, so changing that layout later requires one edit.',
      'Start and finish with suitable paragraph boundaries. Here quote handles indentation while \\par prevents the heading or final text from merging with surrounding paragraphs. The bold command affects only the heading; it does not make the whole note bold. Choose semantic names such as note or exercise rather than names tied to a particular color.',
      'Do not use \\newenvironment for a name that already exists. If you intentionally replace a known definition, \\renewenvironment is the corresponding interface, but first check how the class or package uses it. Replacing a standard environment can break assumptions elsewhere in the document.',
    ],
    code: '\\documentclass{article}\n\\newenvironment{note}[1][Note]\n  {\\begin{quote}\\noindent\\textbf{#1.}\\ }\n  {\\par\\end{quote}}\n\\begin{document}\nText before the note.\n\\begin{note}\nSave a copy before changing the document class.\n\\end{note}\n\\begin{note}[Caution]\nA local formatting change is not always a local counter change.\n\\end{note}\nText after the notes.\n\\end{document}',
  },
  {
    title: 'Create a numbered example with amsthm',
    paragraphs: [
      'For numbered examples, lemmas, or definitions, use a theorem mechanism instead of manually incrementing counters in a custom environment. Load amsthm and declare an example environment with \\newtheorem. The definition style gives an upright body, which is usually easier to read for worked examples containing explanatory prose.',
      'Adding [section] after the printed heading resets the example counter at each numbered section and includes that section number in the label. Put a numbered section before the first example to avoid an initial 0.1. Place \\label inside the environment, after it opens, and refer to the result with \\ref.',
      'The optional heading in brackets names a particular example; it does not replace its number. Compile twice to resolve the reference. This pattern also gives you a reliable place to change numbering later, without finding and editing every occurrence of the word Example in the source.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsthm}\n\\theoremstyle{definition}\n\\newtheorem{example}{Example}[section]\n\\begin{document}\n\\section{Arithmetic}\n\\begin{example}[An even integer]\n\\label{ex:even}\nThe integer $8$ is even because $8=2\\cdot4$.\n\\end{example}\nSee Example~\\ref{ex:even}.\n\\end{document}',
  },
  {
    title: 'Verbatim content and modern definitions',
    paragraphs: [
      'The verbatim environment prints source characters literally instead of interpreting them as ordinary commands. It uses special input scanning, so it cannot generally be placed inside a command argument such as a caption. Nor can you reliably make a wrapper by simply putting begin{verbatim} and end{verbatim} in a basic newenvironment definition.',
      'For more elaborate argument interfaces, current LaTeX provides \\NewDocumentEnvironment. Its argument specification can distinguish optional and mandatory arguments more explicitly than the traditional interface. Older installations may need xparse for that command. Use the simplest interface that fits your actual requirements; an ordinary note does not need body capture or custom parsing.',
    ],
  },
  {
    title: 'Read the first environment error, not the last',
    paragraphs: [
      'Environment name undefined usually means a misspelling, a missing package, or a missing declaration. Search the preamble for the relevant definition before changing the body. A message saying one environment was ended by another usually indicates a missing closing command or incorrect nesting earlier in the file.',
      'If LaTeX reports a missing \\item, check that every list has at least one item and no loose text before its first item. If the error appears far below the suspected block, check braces and math delimiters too: an unmatched argument can change how subsequent begin and end commands are read.',
      'Reduce the problem to a complete minimal file, then add blocks back one at a time. After the error disappears, inspect the PDF for spacing, numbering, and placement. Correctly paired environment names prove only that the structure is balanced, not that the chosen environment is suitable for the content.',
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
          <h1>{page.title}</h1>
          <p className="lead">
            {
              'A LaTeX environment is a block opened with \\begin{name} and closed with \\end{name}. Use the same name at both ends and close nested environments in reverse order. Lists, equations, tables, figures, and proofs use environments; packages or your own preamble definitions can add more.'
            }
          </p>
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
              <Link href="/learn/lists">Lists and bullet points</Link>
            </li>
            <li>
              <Link href="/learn/commands-macros">Commands and macros</Link>
            </li>
            <li>
              <Link href="/learn/theorems-proofs">Theorems and proofs</Link>
            </li>
          </ul>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Test the example in your own document</h2>
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
