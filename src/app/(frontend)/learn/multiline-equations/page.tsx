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
  slug: 'multiline-equations',
  title: 'Multiline Equations in LaTeX: align, split, multline and aligned',
  seoTitle: 'LaTeX Multiline Equation: align, split and Line Breaks',
  description:
    'Break LaTeX equations across lines with amsmath. Choose align, split, multline, gather or aligned, control numbering, and fix alignment and delimiter errors.',
  keywords:
    'latex multiline equation, latex align, latex split equation, latex new line in equation, latex multline',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-25'
const faq: FaqItem[] = [
  {
    question: 'How do I start a new line in a LaTeX equation?',
    answer:
      'Use an amsmath environment that supports rows, such as align, split or multline, and insert \\\\ between rows. A source newline alone only changes the source formatting.',
  },
  {
    question: 'How do I give a multiline equation just one number?',
    answer:
      'Put split inside equation, or use multline when no alignment point is needed. Use a single label for the whole numbered expression.',
  },
  {
    question: 'Can I put align inside equation?',
    answer:
      'No. Align creates its own display. Use aligned or split inside equation when you need an inner multiline block.',
  },
  {
    question: 'Why does a bracket fail across an align line break?',
    answer:
      'A \\left and \\right pair must be balanced within the row. Use manual delimiter sizes across rows, or balanced pairs with invisible delimiters where appropriate.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Choose the display structure before adding line breaks',
    paragraphs: [
      'A multiline display can represent several independent equations, a sequence of equivalent steps, or one expression that is too wide. Those are different structures. Align supports several rows and normally numbers each row; split groups rows inside a surrounding display; multline gives a single expression room to continue without aligning every relation. Choose the structure that matches the mathematics rather than whichever command happens to remove an error.',
      'The starred variants of top-level amsmath displays suppress automatic numbering. Do not put align inside dollar signs, display brackets or another equation environment: it already creates display math. By contrast, aligned and split are building blocks that need a surrounding math context. Confusing those two categories produces nested-display errors and often leads to unnecessary packages or extra delimiters that make the source harder to maintain.',
    ],
  },
  {
    title: 'Align related equations at the relation sign',
    paragraphs: [
      'Put the alignment marker immediately before the equals sign, not on both sides of it. The relation then keeps normal mathematical spacing. Continue a derivation with an empty left-hand side if repeating it would add clutter, but make sure the omitted expression is genuinely the same. End intermediate rows with a double backslash and usually omit a trailing break after the final row.',
      "The optional spacing after a row break can add a small vertical gap, but it should not replace good grouping. If each row states a distinct result, give the rows distinct labels. If the rows only unpack one result, consider split instead. A numbering choice is part of the document's explanation: readers should know whether a reference points to one claim or an entire derivation.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align}\nf(x) &= (x+1)^2 \\label{eq:definition}\\\\\n     &= x^2+2x+1. \\notag\n\\end{align}\nEquation~\\eqref{eq:definition} defines the function.\n\\end{document}',
  },
  {
    title: 'Use split for one equation and one number',
    paragraphs: [
      'Place split inside equation when several rows form a single numbered unit. The outer environment owns the number, so attach one label to that unit rather than trying to reference every internal line. The alignment point is still marked with an ampersand. This is useful for a polynomial expansion, a long definition, or a calculation that will be cited as a whole.',
      'When a continuation starts with a plus or minus sign, preserve the intended operator spacing. An empty group before the operator can prevent it from being treated as a unary sign in a context where you intend a binary operation. Do not indent continuation lines with repeated spaces: ordinary source spaces are ignored in math mode. Use the alignment structure and a deliberate spacing command when the notation genuinely calls for one.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{equation}\\label{eq:polynomial}\n\\begin{split}\nP(x) &= a_0+a_1x+a_2x^2\\\\\n     &\\quad {}+a_3x^3+a_4x^4.\n\\end{split}\n\\end{equation}\nThe coefficients in \\eqref{eq:polynomial} are fixed.\n\\end{document}',
  },
  {
    title: 'Choose multline or gather when alignment is unnecessary',
    paragraphs: [
      'Multline is spelled without a second i. It puts the first line toward the left and the last toward the right, with intervening lines centered in the normal layout. It supplies one equation number rather than a number for each continuation. There is no shared ampersand alignment column: use it when the expression needs room but aligning relations would misrepresent its structure.',
      'Gather centers separate equations independently. It is useful for a short collection of formulas with no meaningful common alignment point. Gather does not become align simply because you insert ampersands. Choose gather* for an unnumbered collection. In either environment, break at a mathematically sensible boundary and keep punctuation consistent with the surrounding sentence; a displayed equation is still part of the prose when the sentence continues through it.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{multline}\nS=a_1+a_2+a_3+a_4+a_5\\\\\n{}+a_6+a_7+a_8+a_9+a_{10}.\n\\end{multline}\n\\begin{gather*}\nx^2+y^2=1\\\\\nz=0\n\\end{gather*}\n\\end{document}',
  },
  {
    title: 'Put an aligned block inside delimiters',
    paragraphs: [
      'Aligned creates a compact mathematical block inside an existing math environment. That makes it useful for a system of equations enclosed by a brace. A matching invisible delimiter can close the pair when only the left brace should be visible. The outer display controls numbering; aligned does not create a separate display or automatic number for each row.',
      'A left and right delimiter pair cannot simply start on one align row and finish on another. Each row is processed separately. For a long parenthesized expression, use appropriately sized manual delimiters on each continuation, or end and restart delimiter pairs with invisible partners where that is visually justified. Inspect both heights and spacing: eliminating a missing-delimiter error does not guarantee that the reader can identify the intended grouping.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\left\\{\n\\begin{aligned}\nx+y &= 3,\\\\\nx-y &= 1.\n\\end{aligned}\n\\right.\n\\]\n\\end{document}',
  },
  {
    title: 'Add text and several alignment pairs carefully',
    paragraphs: [
      'Use \\text for a short phrase inside mathematics, such as a condition or explanatory label. For a sentence between rows of an alignment, \\intertext preserves the surrounding alignment while inserting prose. Put it between completed rows, not inside an unfinished cell. Mathtools provides \\shortintertext when the standard spacing is too generous for a short connecting phrase.',
      'Align can contain several alignment pairs, but the spacing between groups may be larger than you expect. Alignat gives explicit control over the number of pairs and leaves intergroup spacing to you. Its argument counts pairs, not individual cells. Start with a simple two-column derivation before adding several groups; a miscounted ampersand is much easier to find in a small display than in a dense system with many simultaneous relations.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align*}\nu &= x+y\\\\\n\\intertext{Subtracting the second component gives}\nu-y &= x.\n\\end{align*}\n\\begin{alignat*}{2}\nx &= 1, &\\qquad y &= 2,\\\\\nu &= 3, & v &= 4.\n\\end{alignat*}\n\\end{document}',
  },
  {
    title: 'Manage numbering and page breaks without layout hacks',
    paragraphs: [
      'Use \\notag on an align row when that row should not receive an automatic number. Put each label on the row it describes, and use \\eqref for a parenthesized equation reference. Compile again after adding or moving labels. A custom tag can be appropriate for a named relation, but manually typing equation numbers into the source makes them drift as the document changes.',
      'Long top-level align or gather displays can allow page breaks with \\allowdisplaybreaks, or a targeted \\displaybreak at an appropriate row boundary. Boxed substructures such as aligned and split cannot break internally across pages in the same way. Avoid forcing a break in the middle of a mathematical argument solely to fill a page. First consider whether the derivation should be divided into two displays connected by a short explanatory sentence.',
    ],
  },
  {
    title: 'Keep each continuation mathematically unambiguous',
    paragraphs: [
      'A line break should not make an expression look like a new independent equation when it is only a continuation. Retain the necessary operator, delimiters and punctuation, and check that a minus sign still applies to the intended group. When a fraction or nested sum remains too wide, introduce a named quantity and explain it rather than breaking the notation at an arbitrary character.',
      'For piecewise definitions, use cases rather than imitating a left brace with unrelated aligned rows. The condition column should explain the domain of each branch, and the branches should cover the intended cases without accidental overlap. Layout choices should expose the mathematical structure, not conceal an ambiguity in it.',
    ],
  },
  {
    title: 'Fix alignment errors and inspect the final width',
    paragraphs: [
      'A misplaced ampersand usually means you are outside an alignment environment. An extra alignment tab can mean a row has more cells than its environment supports. An undefined environment can indicate a missing amsmath declaration or a misspelled multline. Start with the first log error and verify the opening and closing environments before changing the mathematical content.',
      "A successful compile can still leave an overfull display or a formula crowding its number. Test at the actual column width, not only in a wide standalone document. Prefer meaningful line breaks and named intermediate expressions over scaling the whole equation. For new work, amsmath's environments are a better default than eqnarray because they provide suitable relation spacing and more deliberate numbering and alignment controls.",
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
              'Load amsmath and use align for several equations aligned at an equals sign: place & before the relation and end each nonfinal row with \\\\. For one long equation with one number, use split inside equation. Use multline when you need line breaks without a shared alignment point. A source newline alone does not create a new mathematical row.'
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
              <a href="https://ctan.org/pkg/amsmath">amsmath user guide</a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/mathtools">mathtools documentation</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/equation-numbering">Equation labels, tags and numbering</Link>
            </li>
            <li>
              <Link href="/learn/brackets">Brackets and delimiter sizes</Link>
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">Inline and display math</Link>
            </li>
          </ul>
          <p>
            <a href="https://tools.useoctree.com/tools/latex-preview">LaTeX preview</a> lets you
            check a complete equation example; also compile in the final paper to catch
            narrower-column overflows.
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
