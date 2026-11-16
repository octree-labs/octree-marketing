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
  slug: 'comments',
  title: 'LaTeX Comments: Single-Line, Multi-Line and Block Comments',
  seoTitle: 'LaTeX Comments: Single-Line, Multi-Line and Block',
  description:
    'Write LaTeX comments with %, hide multiple lines with the comment package, and fix missing text, whitespace, and conditional-block errors.',
  keywords:
    'latex comments, latex multiline comment, latex block comment, latex comment out, latex percent sign',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs('LaTeX Comments', page.slug))
const LAST_UPDATED = '2026-11-16'
const faq: FaqItem[] = [
  {
    question: 'How do I comment out multiple lines in LaTeX?',
    answer:
      'Put % at the start of each selected line, or load the comment package and wrap the block in a comment environment. Keep the opening and closing delimiters alone on unindented lines. Do not nest comment environments.',
  },
  {
    question: 'Why does a percent sign hide the rest of my sentence?',
    answer:
      'An unescaped % begins a source comment and discards the rest of that line. Write \\% to print a percent sign. Check whether the comment also removed a closing brace or math delimiter.',
  },
  {
    question: 'Can I put a comment inside a comment block?',
    answer:
      'Ordinary percent-sign comments can appear in an excluded block, but nested comment environments are not supported. The first matching closing delimiter ends the block, even if you intended it to close an inner environment.',
  },
  {
    question: 'Do LaTeX comments appear in the PDF?',
    answer:
      'Ordinary source comments do not appear in the PDF. They remain readable in the .tex file. For visible review notes use a note package; for confidential material, remove it before sharing the source.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Single-line comments and literal percent signs',
    paragraphs: [
      'A percent sign starts a comment wherever TeX is reading ordinary document input. Everything after it on that physical line is discarded, including the line ending. You can leave a note after a sentence or disable a whole source line. No package is needed. A comment is not a PDF annotation: it is an instruction to ignore source text.',
      'Place the comment after any commands that still need to run. In particular, closing braces, math delimiters, and table row endings must come before the percent sign. If you comment out a closing brace, TeX may keep reading later paragraphs while looking for it. The error can appear far below the line that caused the problem.',
      'Write \\% for a percentage in ordinary text or math. A value such as 95% without the backslash does not print a percentage: it prints 95 and discards everything else on that line. This can remove a citation or even the end of the document. Check literal percent signs first when a sentence mysteriously ends early.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nThe accuracy is 95\\%. % Verify against the final results.\n% This sentence is not printed.\nThe next sentence is printed.\n\\end{document}',
  },
  {
    title: 'What a comment does to spaces and paragraphs',
    paragraphs: [
      'A normal line ending inside a paragraph usually behaves like a space. A percent sign removes that line ending, so adjacent text can join across lines. For example, super% followed immediately by script on the next line produces superscript. Any space already present before the percent sign remains; the comment does not reach backward to remove it.',
      'This matters in macro definitions and side-by-side boxes, where an accidental space can change the output. End a source line with % only when you intend to suppress that space. It is not true that every line break in every macro automatically introduces a space: TeX also ignores spaces after control words and in certain input states.',
      'A line containing only a comment is not a blank line and does not end a paragraph. Leave a genuinely empty line, or use \\par, when you want a paragraph break. Conversely, deleting a comment line should not be your method for controlling paragraph spacing; keep the paragraph structure explicit so another editor can understand it.',
    ],
    code: '\\documentclass{article}\n\\newcommand{\\brand}{%\n  \\textbf{Oc}%\n  \\textit{tree}%\n}\n\\begin{document}\nsuper%\nscript\n\n\\brand{} keeps its two parts together.\n\\end{document}',
  },
  {
    title: 'Multi-line and block comments with the comment package',
    paragraphs: [
      'For a long discarded passage, load comment in the preamble, before \\begin{document}. The package supplies a comment environment that skips lines without executing the commands inside them. This is useful for an unfinished derivation or an alternative paragraph, including material with unmatched braces that would fail if LaTeX tried to typeset it.',
      "Keep both environment delimiters alone on their own lines, with no indentation or trailing text. In particular, the closing line must be recognized by the package's line-oriented scanner. A space, extra command, or misspelled environment name on that line can make the scanner continue to the end of the file and report a runaway argument.",
      'Do not nest comment environments. The first matching closing line ends the discarded block; the scanner does not maintain a stack of nested environments. Also, do not put this line-scanning environment inside a command argument such as a caption or footnote. Use percent signs on source lines, or remove the unwanted argument text, in those contexts.',
    ],
    code: '\\documentclass{article}\n\\usepackage{comment}\n\\begin{document}\nThis paragraph is included.\n\\begin{comment}\nThis unfinished paragraph has an unmatched {\nand an undefined \\unfinishedcommand.\n\\end{comment}\nThis paragraph is also included.\n\\end{document}',
  },
  {
    title: 'Switch named blocks on or off',
    paragraphs: [
      'The same package can create a named environment for solutions, internal notes, or optional explanations. Use \\excludecomment{solution} to hide solution blocks, or replace it with \\includecomment{solution} to include them. Choose the setting once in the preamble rather than changing every occurrence throughout a long document.',
      'Included blocks must contain valid LaTeX; excluded blocks can contain unfinished source. Keep the delimiter lines in the same strict format for both settings so switching versions does not require editing their contents. Choose an environment name that is not already supplied by your class or another package.',
      'After changing the setting, compile and inspect the resulting PDF. Removing whole sections can change numbering, references, pagination, and the table of contents. A second compilation updates many cross-references, but references to labels inside excluded material remain undefined and need to be removed or redirected.',
    ],
    code: '\\documentclass{article}\n\\usepackage{comment}\n\\excludecomment{solution}\n\\begin{document}\nQuestion: What is two plus two?\n\\begin{solution}\nThe answer is four.\n\\end{solution}\n\\end{document}',
  },
  {
    title: 'When to use a no-package alternative',
    paragraphs: [
      "For a few lines, prefixing every line with % is the simplest and most predictable option. Most source editors offer a toggle-line-comment action that inserts or removes those prefixes on the selection. Search the editor's command menu or keyboard settings for that action; shortcuts depend on the editor, operating system, and keyboard layout.",
      'TeX also skips material between \\iffalse and \\fi. This can be convenient for a small, controlled block, but it is conditional processing rather than a general-purpose comment environment. TeX still scans conditional tokens while skipping: nested conditionals must balance, and a stray \\else or \\fi can expose text or terminate the skipped region unexpectedly.',
      'Do not treat \\iffalse as safe storage for arbitrary code samples containing conditional commands. For unknown or broken source, percent-prefix the lines or use the comment package instead. Likewise, a custom command that discards its argument still requires balanced argument braces; it does not turn the argument into raw, unread text.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nVisible before.\n\\iffalse\nThis alternative paragraph is omitted.\n\\fi\nVisible after.\n\\end{document}',
  },
  {
    title: 'Tables, equations, and verbatim text',
    paragraphs: [
      'In tables and aligned equations, put an explanatory comment after the row terminator, not before it. Otherwise the percent sign can swallow the two backslashes and merge the next row into the current one. To remove a whole row, comment out its entire source, including the terminator; check that surrounding rules and alignment separators still make sense.',
      'Inside a verbatim environment or a \\verb command, percent signs are literal characters and are printed rather than treated as comments. Listings packages can have additional language-specific highlighting rules, so colored source text does not necessarily mean LaTeX is discarding it. Decide whether you are editing executable document source or a displayed code sample.',
      'The verbatim package also defines an environment named comment. If you use that implementation, follow its documentation rather than assuming every detail matches the separate comment package. Avoid loading both merely to get block comments: they share a name, and mixing implementations makes behavior depend on package order.',
    ],
    code: "\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{tabular}{lr}\nItem & Count \\\\ % End the row before the comment.\nA & 12 \\\\\nB & 7\n\\end{tabular}\n\\begin{align}\nf(x) &= x^2 + 1 \\\\ % A complete first row.\nf'(x) &= 2x\n\\end{align}\n\\verb|95% is literal here|\n\\end{document}",
  },
  {
    title: 'Visible review notes are different from comments',
    paragraphs: [
      'If a co-author needs to see a note in the PDF, a source comment is the wrong tool. A package such as todonotes produces visible review notes; its inline option avoids the narrow-margin problems of margin notes. Add the disable package option when producing a clean copy, then inspect the PDF rather than assuming that every kind of draft markup disappeared.',
      'Neither hidden blocks nor disabled notes are a privacy boundary for the source file. Anyone receiving the .tex file or a project archive can read the omitted material. Delete confidential notes before sharing source, and remember that a clean PDF does not prove that attachments or source bundles are clean.',
      'When debugging a missing passage, inspect the first percent sign on its line, then check nearby block delimiters and conditional switches. Restore a small region at a time and compile after each change. This separates genuine syntax errors from content that you deliberately excluded and avoids introducing several new problems at once.',
    ],
    code: '\\documentclass{article}\n\\usepackage[disable]{todonotes}\n\\begin{document}\nThe reported result is 95\\%.\n\\todo[inline]{Check the final sample count before submission.}\n\\end{document}',
  },
]

export default async function LaTeXCommentsPage() {
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
              'Use % to comment out the rest of a line in LaTeX. To hide several lines, put % at the start of each line or load the comment package and wrap the block in a comment environment. To print a percent sign instead, write \\%. Comments stay in your source file but normally do not appear in the compiled PDF.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 16, 2026</p>
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
              <Link href="/learn/special-characters">Special characters</Link>
            </li>
            <li>
              <Link href="/learn/commands-macros">Commands and macros</Link>
            </li>
            <li>
              <Link href="/learn/errors">LaTeX errors</Link>
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
