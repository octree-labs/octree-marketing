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
  slug: 'algorithms',
  title: 'Algorithms in LaTeX: algpseudocode, algorithmic and algorithm2e',
  seoTitle: 'LaTeX Algorithm: algpseudocode and algorithm2e Examples',
  description:
    'Write LaTeX algorithms with compatible packages, numbered pseudocode, loops, captions and references. Compare algpseudocode, algorithmic and algorithm2e.',
  keywords: 'latex algorithm, latex pseudocode, algpseudocode, algorithm2e, algorithmic latex',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'
const faq: FaqItem[] = [
  {
    question: 'Which packages do I need for a LaTeX algorithm?',
    answer:
      'Use algorithm plus algpseudocode for a float containing title-case pseudocode commands. Use algorithm2e alone for its integrated alternative. Follow the package family already required by your template.',
  },
  {
    question: 'Why is State an undefined control sequence?',
    answer:
      'The command \\State belongs to algpseudocode. The older algorithmic package uses \\STATE instead. Check which package is loaded before changing the command.',
  },
  {
    question: 'How do I number every pseudocode line?',
    answer:
      'With algpseudocode, use the optional argument [1] on the algorithmic environment. With algorithm2e, use the linesnumbered package option. The caption number is separate from statement numbering.',
  },
  {
    question: 'Can a long algorithm break across pages?',
    answer:
      'A normal algorithm float cannot split across pages. A nonfloating algorithmic block can participate in page layout, or you can divide the procedure into smaller named parts. Check the publication template before changing its float design.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Choose a package family before copying commands',
    paragraphs: [
      'The similarly named packages solve different problems. The algorithm package supplies a float, caption and list of algorithms, but does not define statements or loops. The algpseudocode package is a layout built on algorithmicx; it supplies the algorithmic environment and title-case commands. Together they separate where an algorithm appears from how its steps are typeset.',
      'The older algorithmic package also defines an algorithmic environment, but uses uppercase commands such as \\STATE and \\IF. Algorithm2e instead provides its own algorithm environment, keyword system and line-ending convention. Start from the family required by your publisher or existing document. Installing every package named algorithm is not a compatibility strategy: overlapping environment names and conflicting commands can prevent the document from compiling at all.',
    ],
  },
  {
    title: 'Build a small numbered algorithm with algpseudocode',
    paragraphs: [
      'The example below sums a sequence. The optional argument [1] on algorithmic requests a line number on every statement line; it is not a starting number. The algorithm float gets a separate number from its caption. The label follows the caption, and a second LaTeX pass resolves the reference in the surrounding prose.',
      'Use math mode for variables, indices, assignment arrows and comparisons. The keyword commands themselves belong outside math mode. Keeping those roles separate avoids accidental italic prose and missing-dollar errors. This example defines a mathematical procedure, not executable software: compiling it checks the typesetting syntax, but it does not execute the loop or prove that an implementation returns the correct result. Test the logic separately when documenting real code.',
    ],
    code: '\\documentclass{article}\n\\usepackage{algorithm}\n\\usepackage{algpseudocode}\n\\begin{document}\nAlgorithm~\\ref{alg:sum} computes a sum.\n\\begin{algorithm}[htbp]\n\\caption{Sum a sequence}\\label{alg:sum}\n\\begin{algorithmic}[1]\n\\Require Values $x_1,\\ldots,x_n$\n\\Ensure Their sum $s$\n\\State $s \\gets 0$\n\\For{$i=1,\\ldots,n$}\n  \\State $s \\gets s+x_i$\n\\EndFor\n\\State \\Return $s$\n\\end{algorithmic}\n\\end{algorithm}\n\\end{document}',
  },
  {
    title: 'Express conditions, loops and procedures clearly',
    paragraphs: [
      'A block opener needs the matching closer from the same package. Pair \\If with \\EndIf, \\For with \\EndFor, and \\While with \\EndWhile. Indentation in the source makes those pairs easier to inspect, while the package controls the printed indentation. An ordinary source newline is not a statement command; introduce a step with \\State when the layout requires one.',
      "Write the algorithm's preconditions before its operations. A search routine should state whether indices start at one, what range is searched, and what value means not found. A division step needs a nonzero denominator or a branch for the exceptional case. These details are more valuable than decorative keywords because they determine how readers translate the pseudocode into an implementation and how they evaluate the correctness argument.",
    ],
    code: '\\documentclass{article}\n\\usepackage{algorithm,algpseudocode}\n\\begin{document}\n\\begin{algorithm}[htbp]\n\\caption{Find the first matching index}\n\\begin{algorithmic}[1]\n\\Procedure{Find}{$A,x,n$}\n  \\For{$i=1,\\ldots,n$}\n    \\If{$A[i]=x$}\n      \\State \\Return $i$\n    \\EndIf\n  \\EndFor\n  \\State \\Return $0$ \\Comment{Zero means no match}\n\\EndProcedure\n\\end{algorithmic}\n\\end{algorithm}\n\\end{document}',
  },
  {
    title: 'Read legacy algorithmic examples without mixing syntax',
    paragraphs: [
      'If a template loads algorithmic, retain its uppercase command vocabulary unless you deliberately migrate the whole algorithm. Replacing only \\STATE with \\State leaves other incompatibilities behind. Inspect the preamble as well as the body: many copied examples omit the package declarations that explain which commands are available.',
      "Migration means checking every block, comment, input declaration and return statement, not merely changing the capitalization of a few words. Package options can also change the appearance of closing keywords and line numbers. Compile a small isolated example first, then compare the final PDF against the template's requirements. Do not load algorithmic and algpseudocode together simply to make both spellings available; they both claim the same core environment name.",
    ],
    code: '\\documentclass{article}\n\\usepackage{algorithm,algorithmic}\n\\begin{document}\n\\begin{algorithm}[htbp]\n\\caption{Legacy algorithmic syntax}\n\\begin{algorithmic}[1]\n\\REQUIRE A nonnegative integer $n$\n\\STATE $s \\gets 0$\n\\FOR{$i=1$ to $n$}\n  \\STATE $s \\gets s+i$\n\\ENDFOR\n\\RETURN $s$\n\\end{algorithmic}\n\\end{algorithm}\n\\end{document}',
  },
  {
    title: 'Use algorithm2e as a separate complete alternative',
    paragraphs: [
      'Algorithm2e combines the floating container with its pseudocode vocabulary. The ruled option adds rules around the algorithm heading, vlined shows block guides, and linesnumbered enables statement numbering. These are presentation choices, not requirements for mathematical correctness. In this family, \\KwIn and \\KwOut describe inputs and outputs, and a loop body is enclosed in braces.',
      'Statements commonly end with \\; in algorithm2e. Omitting it can join steps that should occupy separate lines. That command has a special role here; copying it into algpseudocode is not a way to end a statement there. Likewise, an algpseudocode \\EndFor does not close an algorithm2e brace-delimited loop. Keep the complete example self-contained and choose one family for the document unless you have a documented reason and configuration for coexistence.',
    ],
    code: '\\documentclass{article}\n\\usepackage[ruled,vlined,linesnumbered]{algorithm2e}\n\\begin{document}\n\\begin{algorithm}[htbp]\n\\caption{Sum with algorithm2e}\n\\KwIn{Values $x_1,\\ldots,x_n$}\n\\KwOut{Their sum $s$}\n$s \\gets 0$\\;\n\\For{$i\\gets 1$ \\KwTo $n$}{\n  $s \\gets s+x_i$\\;\n}\n\\Return{$s$}\\;\n\\end{algorithm}\n\\end{document}',
  },
  {
    title: 'Control captions, references and placement',
    paragraphs: [
      'A caption should identify the procedure, while the surrounding paragraph explains why the reader needs it. Put the label after the caption and refer to the algorithm by number rather than by page position. A float may move during layout, so wording such as the algorithm below becomes fragile after edits or a change of paper size.',
      'Placement options are requests. The htbp combination offers several legal locations; it does not guarantee the current source position. A floating algorithm cannot normally break across pages. If the procedure is too long, simplify the presentation, separate coherent subprocedures, or use a nonfloating algorithmic block with a carefully chosen caption strategy. Do not solve a page-height problem by shrinking the entire algorithm until its variables and subscripts are unreadable.',
    ],
  },
  {
    title: 'Keep comments and long expressions readable',
    paragraphs: [
      "Comments should explain an invariant, a boundary condition or an intentional exception, not repeat the statement in different words. A long right-aligned comment can extend past the available line width. Shorten it, move the explanation into the surrounding paragraph, or put a separate unnumbered note on its own line using the package's supported commands.",
      'A long update formula is often clearer when a named intermediate quantity is defined first. That improves both the layout and the explanation. Keep consistent symbols between the algorithm and the equations in the paper; using x in one place and an unexplained data variable elsewhere makes verification harder. For actual language syntax, imports and runnable functions, use a source-code listing instead of forcing an entire program into pseudocode commands.',
    ],
  },
  {
    title: 'Separate a readable procedure from its correctness argument',
    paragraphs: [
      'Pseudocode is most useful when the reader can identify the input, the state that changes and the condition under which the procedure finishes. State whether an input sequence may be empty and whether repeated values are allowed. For the search example, zero is an explicit sentinel because valid indices begin at one. If your implementation uses zero-based indices, choose another unambiguous failure result and change the explanation with the code.',
      'Put a lengthy proof or complexity analysis in the surrounding text instead of burying it in comments. A loop invariant can be named briefly beside the relevant step and justified in a separate paragraph. This keeps the algorithm readable while making the claim testable. When revising the procedure, update its preconditions, return description and discussion together; otherwise a beautifully formatted algorithm can contradict the paper that cites it.',
    ],
  },
  {
    title: 'Diagnose package errors before changing the algorithm',
    paragraphs: [
      'An undefined \\State usually points to a missing algpseudocode declaration or an uppercase algorithmic template. An already-defined algorithm environment often means algorithm and algorithm2e were both loaded. A block-ending error can originate several lines earlier at a missing brace or mismatched closer. Read the first error in the log and reduce the document to the smallest failing block.',
      'After compilation succeeds, inspect the PDF for clipped comments, duplicated numbers and captions detached from the intended procedure. Verify the example with a tiny input by hand, including an empty sequence or unsuccessful search where applicable. Typesetting success is only one check: the algorithm also needs well-defined inputs, a termination condition and an output that matches the claim made in the surrounding text.',
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
              'For a numbered LaTeX algorithm, load algorithm for the floating container and algpseudocode for the pseudocode syntax. Put an algorithmic environment inside algorithm, then write commands such as \\State, \\If and \\For. Alternatively, use algorithm2e on its own with its different syntax. Do not mix commands from the two families.'
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
              <a href="https://ctan.org/pkg/algorithmicx">
                algorithmicx and algpseudocode documentation
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/algorithms">algorithm and algorithmic documentation</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/algorithm2e">algorithm2e manual</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/code-listings">Source code listings rather than pseudocode</Link>
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">
                Mathematical expressions inside algorithms
              </Link>
            </li>
            <li>
              <Link href="/blog/pseudocode-generator-latex-algorithms">
                Pseudocode generation workflow
              </Link>
            </li>
          </ul>
          <p>
            <a href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview</a> is useful
            for checking a small complete document before you integrate it into a larger paper.
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
