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
  slug: 'underbrace-overbrace',
  title: 'LaTeX Underbrace and Overbrace: Labels and Examples',
  seoTitle: 'LaTeX Underbrace and Overbrace with Text Labels',
  description:
    'Add LaTeX underbrace and overbrace annotations with text labels, nested braces, aligned equations, and practical fixes for spacing and math errors.',
  keywords: 'latex underbrace, latex underbrace with text, latex overbrace, latex brace label',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-22'
const faq: FaqItem[] = [
  {
    question: 'How do I add text below an underbrace?',
    answer:
      'Load amsmath and write \\underbrace{a+b}_{\\text{sum}} in math mode. The first group is the expression; the subscript is the label. Use \\text so words retain their spaces and text styling.',
  },
  {
    question: 'Does underbrace require a package?',
    answer:
      '\\underbrace and \\overbrace are built into LaTeX. Load amsmath for \\text, \\substack, and aligned equations, or mathtools when you need \\mathclap and bracket-shaped annotations.',
  },
  {
    question: 'How do I put a label above an overbrace?',
    answer:
      "Use a superscript: \\overbrace{x_1+\\cdots+x_n}^{n\\text{ terms}}. Put the expression inside the command's braces and the complete annotation inside the superscript braces.",
  },
  {
    question: 'Why does my long label push nearby terms apart?',
    answer:
      "The label contributes to the construction's width. Shorten it or split it with \\substack first. \\mathclap from mathtools removes its reserved width, but can create collisions that you must check in the PDF.",
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'A complete underbrace example with a text label',
    paragraphs: [
      'Start with a displayed equation when learning the syntax. The expression enclosed in the first pair of braces determines the width of the horizontal curly brace. The subscript following \\underbrace places the annotation below it. A missing pair of braces can leave only the next token inside the span, so group the complete sum deliberately.',
      "Use \\text for words such as fixed cost or total, because ordinary letters in math mode are treated as mathematical variables. Without \\text, spaces disappear and the letters are italicized individually. The amsmath package supplies this command and adapts its size to the annotation's mathematical style.",
      'The example distinguishes the variable expression from its explanation. Keep annotations short enough that a reader can identify the intended group immediately. A label is not a substitute for defining a symbol in the surrounding prose, especially when the same symbol appears in several equations or has units that the formula alone does not explain.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nThe total combines a fixed and a variable contribution:\n\\[\n  C=\\underbrace{a+b}_{\\text{fixed cost}}\n    +\\underbrace{cx}_{\\text{variable cost}}.\n\\]\n\\end{document}',
  },
  {
    title: 'Overbrace labels and mathematical annotations',
    paragraphs: [
      'An overbrace uses a superscript rather than a subscript for its label. The grouping rules are otherwise the same. A mathematical label such as n can be written directly; a mixed label uses math for the variable and \\text for the words. Keep a deliberate space inside the text argument when it separates a number or variable from a word.',
      'For a sum of repeated terms, annotate the count above the complete sequence, not merely the last term. The brace scales to the width of that sequence. It does not infer how many terms are present, so updating the expression still requires checking that the stated count is correct.',
      'A superscript immediately after an overbrace belongs to its annotation, rather than automatically becoming an exponent on the entire annotated expression. If you need to square a grouped sum as well, place suitable delimiters around the expression and put the exponent outside those delimiters. This avoids both ambiguous notation and accidental double-superscript errors.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n  \\overbrace{x_1+x_2+\\cdots+x_n}^{n\\text{ terms}}\n  \\qquad\n  \\left(\\underbrace{a+b}_{\\text{sum}}\\right)^2\n\\]\n\\end{document}',
  },
  {
    title: 'Text under a brace versus a brace under text',
    paragraphs: [
      'A label under a mathematical expression and a brace under ordinary words are separate uses of the same construction. For the latter, put the words themselves inside \\text within the brace argument. The outer construction still needs math mode, even though its visible content is prose.',
      'Do not wrap a long sentence in this construction and expect normal paragraph wrapping. Text inside \\text is boxed; it will not break naturally across lines. An inline underbrace also adds depth to the line, potentially increasing the distance to the next baseline. Displays are usually clearer for substantial annotations.',
      'When the content is genuinely ordinary prose, consider whether a nearby explanation or a table would communicate the grouping better. Horizontal braces work well for compact grammatical examples or short named components, but several long labels inside a paragraph quickly become harder to read than a simple sentence.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n  \\underbrace{\\text{input data}}_{\\text{known}}\n  \\longrightarrow\n  \\overbrace{\\text{model output}}^{\\text{predicted}}\n\\]\n\\end{document}',
  },
  {
    title: 'Manage long labels and horizontal spacing',
    paragraphs: [
      'An annotation wider than its expression contributes to the overall width of the construction. This is normally useful because it prevents nearby material from colliding with the label. If a one-letter term seems surrounded by excessive space, inspect the annotation before changing equation spacing or inserting negative skips.',
      "First shorten the wording or split the label into two lines. The \\substack command makes a small multiline mathematical annotation; use \\text on each line for words. Its double backslash separates the annotation's lines, not the lines of the surrounding equation. The extra depth can still make a display tall.",
      'For intentional overlap, mathtools provides \\mathclap, which typesets its contents without reserving horizontal width. That can compact a long label but transfers responsibility for collisions to you. Use it only when there is enough empty space below the neighboring terms, and inspect the result at the actual column width rather than a wide scratch page.',
    ],
    code: '\\documentclass{article}\n\\usepackage{mathtools}\n\\begin{document}\n\\[\n  \\underbrace{a+b}_{\\substack{\\text{measured}\\\\\\text{contribution}}}\n  +c\n\\]\n\\[\n  \\underbrace{x}_{\\mathclap{\\text{known input}}}\n  \\qquad+\\qquad y\n\\]\n\\end{document}',
  },
  {
    title: 'Nested braces and annotations on both sides',
    paragraphs: [
      'Nested braces can show a group within a larger group. Put the smaller construction inside the argument of the larger one and make each label specific. The outer brace spans the entire nested expression, including the structure created by the inner annotation. This increases the height or depth of the equation.',
      'Using an overbrace for one grouping and an underbrace for another can be clearer than stacking two labels below the same region. Reserve nested structures for a genuine hierarchy. If the reader must follow several competing braces, split the derivation into successive equations and explain each grouping separately.',
      'Partially overlapping groups are more difficult than nesting: one group might span a+b while another spans b+c. That requires positioning or phantom constructions, not simply wrapping one command inside another. Such arrangements are sensitive to font and expression changes. Prefer separate displays unless the overlap is essential, and do not reuse fixed negative spacing after editing the formula.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n \\underbrace{\n   \\underbrace{a+b}_{\\text{first group}}+c\n }_{\\text{complete sum}}\n\\]\n\\[\n \\overbrace{\n   \\underbrace{x+y}_{\\text{inputs}}+z\n }^{\\text{total}}\n\\]\n\\end{document}',
  },
  {
    title: 'Aligned equations, brackets, and alternatives',
    paragraphs: [
      'A brace cannot directly span an alignment separator. In an align environment, the ampersand belongs to the alignment structure rather than to an ordinary mathematical expression. Put a self-contained expression on one side of the alignment point. If the content under a single brace needs several lines, nest an aligned environment inside that argument.',
      'Use \\underset{label}{symbol} or \\overset{label}{symbol} when you want an annotation without a brace. These amsmath commands place the first argument below or above the second. They are useful for a short explanation over an equals sign, but a named arrow command may be preferable for labeling a transformation.',
      "If your notation requires a square-ended horizontal bracket, mathtools supplies \\underbracket and \\overbracket. Do not confuse these with visible curly delimiters around a set, which use \\{ and \\}. A horizontal annotation groups an expression visually; a pair of delimiters is part of the expression's mathematical syntax.",
    ],
    code: '\\documentclass{article}\n\\usepackage{mathtools}\n\\begin{document}\n\\begin{align*}\n F &= \\underbrace{a+b}_{\\text{fixed}}+cx,\\\\\n G &= \\underbracket{x+y}_{\\text{group}}.\n\\end{align*}\n\\[\n a+b\\overset{\\text{definition}}{=}c\n \\qquad\n \\underbrace{\\begin{aligned}a&+b\\\\c&+d\\end{aligned}}_{\\text{two rows}}\n\\]\n\\end{document}',
  },
  {
    title: 'Diagnose errors before adjusting the layout',
    paragraphs: [
      'Missing dollar inserted usually means a math-only command was used in ordinary text. Put the complete construction inside a math environment rather than adding dollar signs around just the label. An undefined \\text, \\substack, or aligned environment means amsmath is missing; an undefined \\mathclap or \\underbracket means mathtools is missing.',
      "For double-subscript or double-superscript errors, identify whether the script belongs to a variable or the brace. Put the variable's own script inside the brace argument, then add the annotation outside. Brace counting is especially important with nested constructions, because a balanced but misplaced group can compile while labeling the wrong part.",
      'An overfull box is a width problem, not proof that the brace command failed. Check the formula at its intended column width and shorten labels before shrinking the entire display. Inspect both the PDF and the source meaning: the compiler cannot tell whether a brace spans the quantity that your explanation actually describes.',
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
              'Write \\underbrace{a+b}_{\\text{sum}} inside math mode to put a brace and text label beneath an expression. Use \\overbrace{a+b}^{\\text{sum}} for a brace above it. The brace commands are built into LaTeX; load amsmath for \\text and useful equation environments. The first argument chooses the span, while the subscript or superscript supplies the label.'
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
            See the{' '}
            <a href="https://www.latex-project.org/help/documentation/amsldoc.pdf">
              amsmath user guide
            </a>{' '}
            for text and alignment commands and the{' '}
            <a href="https://ctan.org/pkg/mathtools">mathtools documentation</a> for clap and
            bracket annotations.
          </p>
          <ul>
            <li>
              <Link href="/learn/brackets">Brackets and delimiters</Link>
            </li>
            <li>
              <Link href="/learn/multiline-equations">Multiline equations</Link>
            </li>
            <li>
              <Link href="/learn/subscripts-superscripts">Subscripts and superscripts</Link>
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
