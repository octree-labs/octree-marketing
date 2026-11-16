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
  slug: 'commands-macros',
  title: 'LaTeX Commands and Macros: \\newcommand, \\renewcommand and \\def',
  seoTitle: 'LaTeX newcommand: Arguments, Defaults and Macros',
  description:
    'Define LaTeX commands with newcommand, mandatory and optional arguments, safe redefinitions, math operators, and practical fixes for macro errors.',
  keywords:
    'latex newcommand, latex commands, latex macros, latex newcommand optional argument, latex renewcommand, latex def',
}
const breadcrumbSchema = generateBreadcrumbSchema(
  getLearnBreadcrumbs('LaTeX Commands and Macros', page.slug),
)
const LAST_UPDATED = '2026-11-16'
const faq: FaqItem[] = [
  {
    question: 'How do I define a new command in LaTeX?',
    answer:
      'Use \\newcommand{\\name}{replacement} for a shortcut without arguments, or \\newcommand{\\name}[1]{replacement using #1} for one argument. Put shared definitions in the preamble after required packages, and call argument-taking commands with braces.',
  },
  {
    question: 'How do I add an optional argument to newcommand?',
    answer:
      'Write a default after the total argument count, as in \\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}. Load amsmath and use it in math mode. The first argument is optional in brackets; the second remains mandatory in braces.',
  },
  {
    question: 'Why does text run together after my macro?',
    answer:
      'TeX consumes spaces after a letter-based command name. Write an empty group after a text shortcut, as in \\projectname{} is ready, to preserve the following word space without forcing unwanted space before punctuation.',
  },
  {
    question: 'Should I replace newcommand with def to fix a conflict?',
    answer:
      'No. The already-defined error protects an existing command. Choose a distinctive new name, or use \\renewcommand only for an intentional replacement. The primitive \\def silently overwrites definitions and can break other document code.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Your first newcommand definition',
    paragraphs: [
      'A macro gives a name to a piece of source. When LaTeX encounters that name, it uses the replacement text. This is useful for repeated notation, product names, or formatting conventions that might change later. A semantic name describes what the content means, so changing the definition updates all uses without searching through individual equations.',
      'The first braced group contains the command name, including its backslash. The second contains the replacement. Ordinary command names use letters and are case-sensitive: \\dataset and \\Dataset are different commands. Avoid digits in names such as \\model2, because TeX reads the letters as the command and leaves the digit as following input.',
      'Spaces after a letter-based command name are consumed while TeX finds the end of that name. For a text shortcut, write an empty group after it when a following word needs a separating space. The group ends the command without printing anything. Do not automatically add a space inside the definition, because that can produce unwanted spacing before punctuation.',
    ],
    code: '\\documentclass{article}\n\\newcommand{\\projectname}{Octree}\n\\begin{document}\n\\projectname{} is the project name.\nWelcome to \\projectname.\n\\end{document}',
  },
  {
    title: 'Mandatory arguments: count them and brace them',
    paragraphs: [
      'The optional bracket after the name declares how many arguments the command accepts. With [2], the replacement can use #1 and #2 in any order or repeat them. Traditional \\newcommand supports up to nine arguments. Without an argument count it defines a command with no parameters, even if the replacement accidentally contains a parameter marker.',
      'Supply each argument in braces. Without braces, LaTeX takes only the next token, which may be a single letter rather than the word you intended. A command can therefore compile successfully while formatting only the first character. Braces make calls readable and prevent that subtle error when you later replace a short value with a longer expression.',
      'An argument is source text, not a typed value with a declared data type. If the replacement uses math-only commands, the caller must use math mode unless the macro explicitly handles the transition. Similarly, an argument containing a paragraph break needs a definition that permits paragraphs: ordinary \\newcommand does, while its starred form rejects them.',
    ],
    code: '\\documentclass{article}\n\\newcommand{\\term}[1]{\\textbf{#1}}\n\\newcommand{\\pair}[2]{(#1, #2)}\n\\begin{document}\nA \\term{training example} contains two values.\nThe ordered pair is $\\pair{x}{y}$.\n\\end{document}',
  },
  {
    title: 'One optional argument with a default',
    paragraphs: [
      'Add another bracket after the argument count to supply the default for the first argument. The count includes that optional argument. In a two-argument definition with a default, #1 comes from brackets when supplied and #2 still comes from braces. If the brackets are absent, LaTeX substitutes the default automatically.',
      'The norm example below uses 2 as its default subscript. Both calls require math mode, and amsmath supplies the norm delimiters. Passing empty brackets explicitly supplies an empty value; it does not request the default again. That distinction matters when an empty subscript or label has a meaning in your document.',
      'Only the first argument can be optional with this syntax. If you need several optional arguments, a star, or an optional argument after a mandatory one, use \\NewDocumentCommand instead of building a fragile parser yourself. Keep the interface small: a macro with many switches is often harder to read than the original LaTeX.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\newcommand{\\vecnorm}[2][2]{\\lVert #2 \\rVert_{#1}}\n\\begin{document}\nDefault: $\\vecnorm{x}$.\nOverride: $\\vecnorm[\\infty]{x}$.\nExplicitly empty: $\\vecnorm[]{x}$.\n\\end{document}',
  },
  {
    title: 'newcommand, renewcommand, providecommand, and def',
    paragraphs: [
      'Use \\newcommand for a new name: it reports an error rather than overwriting an existing definition. Use \\renewcommand for an existing name: it reports an error if the command is missing. These checks catch spelling mistakes and package conflicts early, before a redefinition changes unrelated parts of a document.',
      'Use \\providecommand for a fallback definition that should be installed only when the name is absent. It does not check whether an existing command accepts the arguments or has the meaning you expected. For project-specific notation, a distinctive name is generally safer than silently accepting whichever definition another package installed first.',
      "The TeX primitive \\def has lower-level parameter syntax and silently replaces an existing command. It is useful for specialist macro programming, including delimited arguments, but it is not a safer shortcut for resolving an already-defined error. Redefining a standard command can break a class, package, or collaborator's source that relies on its original meaning.",
    ],
    code: '\\documentclass{article}\n\\newcommand{\\statuslabel}{Draft}\n\\renewcommand{\\statuslabel}{Reviewed}\n\\providecommand{\\fallbacklabel}{Untitled}\n\\begin{document}\nStatus: \\statuslabel.\nFallback: \\fallbacklabel.\n\\end{document}',
  },
  {
    title: 'Math shortcuts versus named math operators',
    paragraphs: [
      'For a symbol shortcut, use the command that already provides the desired mathematical font or structure. The example below loads amssymb for blackboard bold and wraps the replacement in \\ensuremath so the shortcut can be used in text or math. This does not make arbitrary text-mode formatting safe inside formulas; it only ensures a math context for its contents.',
      'For a function name such as variance or rank, use \\DeclareMathOperator from amsmath rather than a plain text replacement. It gives the operator upright letters and the correct mathematical spacing. Put the declaration in the preamble. A starred operator declaration places limits beneath it in display style, like a limit or maximum.',
      'Avoid defining an operator as a sequence of ordinary math letters: LaTeX treats those as separate variables. Also avoid making every delimiter automatically resize. Fixed-size delimiters are appropriate for small expressions; larger expressions can use a separate command or a starred interface when automatic sizing is actually useful.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\newcommand{\\reals}{\\ensuremath{\\mathbb{R}}}\n\\DeclareMathOperator{\\Var}{Var}\n\\begin{document}\nThe domain is \\reals.\n\\[\n  x \\in \\reals,\\qquad \\Var(X)=1\n\\]\n\\end{document}',
  },
  {
    title: 'Scope, whitespace, and reusable definitions',
    paragraphs: [
      'Definitions follow TeX grouping. A definition made inside a group or ordinary environment normally disappears when that group ends. A definition in the document preamble is available throughout the document unless something later changes it. If a command works in one location but is undefined elsewhere, check where it was defined before adding another copy.',
      'Keep shared definitions together, after the packages they rely on. A larger project can put them in a separate file and load it with \\input from the preamble. That file should contain definitions rather than another document class or document environment. Establish one owner for each macro so chapters do not silently diverge.',
      'When breaking a definition across lines, remember that some line endings become spaces. A trailing % suppresses the line ending, but it is not needed after every command indiscriminately. Prefer compact definitions until multiline formatting improves readability. For text macros, test punctuation and sentence boundaries as well as the isolated command.',
    ],
  },
  {
    title: 'NewDocumentCommand for a starred interface',
    paragraphs: [
      'Current LaTeX includes \\NewDocumentCommand in the kernel; older installations may require xparse. Its argument specification describes the interface: m is mandatory, s detects an optional star, and O{2} supplies an optional bracketed argument with default 2. Unlike traditional \\newcommand, those argument types can appear in a chosen order.',
      "In this example the norm's optional subscript comes after its mandatory expression. The star selects scalable delimiters, while an unstarred call keeps them fixed. That placement is intentional: do not copy the earlier traditional command's calling order. Consistent interfaces matter more than making every command accept every possible variation.",
      'Use \\IfBooleanTF to test the star rather than treating it as printable text. If you instead use the o argument type, an omitted argument has a special no-value marker and should be tested with \\IfValueTF. A defaulted O argument usually makes simple document macros easier to reason about.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\NewDocumentCommand{\\projectnorm}{s m O{2}}{%\n  \\IfBooleanTF{#1}\n    {\\left\\lVert #2 \\right\\rVert_{#3}}\n    {\\lVert #2 \\rVert_{#3}}%\n}\n\\begin{document}\n$\\projectnorm{x}$ and $\\projectnorm{x}[\\infty]$.\n\\[\n  \\projectnorm*{\\frac{x}{2}}[1]\n\\]\n\\end{document}',
  },
  {
    title: 'Debug the definition before the whole document',
    paragraphs: [
      'For an undefined control sequence, check the exact name, capitalization, package imports, and definition order. For an already-defined error, search the class and packages before choosing a new name. Do not replace \\newcommand with \\renewcommand just to silence the message unless you understand what you are replacing.',
      'An illegal parameter number commonly means the definition uses #2 but declares only one argument, or uses #1 without declaring any. Nested definitions require doubled parameter markers for the inner definition, which is a different case. A literal hash sign in typeset text should be escaped as \\# rather than used as a parameter marker.',
      'A runaway argument often means a missing closing brace in the definition or its call. Reduce the document to one definition and one invocation, then add the optional and mandatory arguments back separately. Compile a text use, a math use when supported, and a punctuation case; a successful compile alone does not prove the notation or spacing is correct.',
    ],
  },
]

export default async function LearnCommandsMacrosPage() {
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
              'Use \\newcommand{\\name}{replacement} to define a LaTeX shortcut. For a command with one argument, write \\newcommand{\\name}[1]{replacement using #1}. Put reusable definitions in the preamble, after any packages they depend on. Use \\renewcommand only when you deliberately want to replace an existing command; a name collision is usually a reason to choose a clearer name.'
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
              <Link href="/learn/comments">LaTeX comments</Link>
            </li>
            <li>
              <Link href="/learn/math-functions">Math functions and operators</Link>
            </li>
            <li>
              <Link href="/learn/blackboard-bold">Blackboard bold</Link>
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
