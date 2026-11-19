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
  slug: 'bold-italics-underline',
  title: 'Underline, Bold and Italics in LaTeX',
  seoTitle: 'LaTeX Underline, Bold and Italics: Commands and Examples',
  description:
    'Underline in LaTeX with underline, ulem or soul; make bold and italic text, wrap long underlines, format math, and fix common font and emphasis problems.',
  keywords:
    'latex underline, underline latex, latex bold, bold in latex, latex italic, latex italics, textbf, textit, emph, ulem, soul',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-19'
const faq: FaqItem[] = [
  {
    question: 'How do I underline text in LaTeX?',
    answer:
      'Use \\underline{text} for a short phrase without any package. For text that should wrap, load \\usepackage[normalem]{ulem} and use \\uline{text}. The soul package offers \\ul{text} when you also need automatic hyphenation.',
  },
  {
    question: 'Why does \\emph underline instead of italicize?',
    answer:
      'The ulem package changes emphasis by default. Load it with the normalem option to keep ordinary italic emphasis while still using \\uline and its other underline commands. A document class can also redefine emphasis.',
  },
  {
    question: 'How do I make bold italic text?',
    answer:
      'Nest the commands: \\textbf{\\textit{text}}. The selected font must supply a bold italic shape. For a scoped declaration, use {\\bfseries\\itshape text}; text after the group returns to its previous style.',
  },
  {
    question: 'Can I underline an equation?',
    answer:
      'Yes. Use \\underline{expression} inside math mode. For a labeled brace beneath several terms, use \\underbrace{expression}_{label} instead; that is a different mathematical annotation, not a straight underline.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Start with the built-in formatting commands',
    paragraphs: [
      'Put the words you want to format inside braces. The style ends at the closing brace, so the following sentence returns to its previous font. The example below is a complete document: paste it into a new .tex file and compile it with pdfLaTeX. It shows the three basic commands without any package dependencies.',
      'Bold changes the font series, while italic changes the font shape. Underlining draws a rule beneath the content rather than selecting another font. That distinction matters when you combine them: bold italic requires a font with that combination available, whereas an underline can be drawn beneath either shape. Keep routine emphasis restrained so readers can tell which words actually matter.',
      'Use text commands for prose, not dollar signs. Putting a word inside math delimiters may look italic, but it treats the letters as mathematical symbols and changes spacing. In particular, spaces between ordinary words are ignored in math mode. For a book title or a foreign phrase, \\textit is the direct choice.',
    ],
    code: '\\documentclass{article}\n\\begin{document}\nThis is \\underline{underlined text}.\n\nThis is \\textbf{bold text} and this is \\textit{italic text}.\n\nThis word has \\emph{emphasis}.\n\\end{document}',
  },
  {
    title: 'Why a long underline runs into the margin',
    paragraphs: [
      'The built-in \\underline keeps its argument together in an unbreakable box. LaTeX cannot wrap a long underlined sentence at its spaces, even when there is room for a sensible line break. An overfull box warning is therefore a layout problem, not necessarily a missing-brace error. Shorten the underlined material or switch to a breakable underline command.',
      'The rule depth also depends on the material inside the box. Words with descending letters, such as g or y, can put the rule lower than a neighboring underlined word without descenders. If several separate underlined terms must share a consistent rule depth, use a package designed for text underlining rather than adding manual spacing to each word.',
      'Load ulem with the normalem option to preserve ordinary italic emphasis. Without that option, ulem changes \\emph to use underlining. Its \\uline command permits breaks at spaces, but does not automatically hyphenate ordinary words. A single long word or an unbreakable object can still overflow; wrapping is not a guarantee that every possible argument will fit.',
    ],
    code: '\\documentclass{article}\n\\usepackage[normalem]{ulem}\n\\begin{document}\n\\begin{minipage}{0.55\\linewidth}\n\\uline{This underlined sentence is deliberately long enough to wrap across several lines in this narrow paragraph.}\n\\end{minipage}\n\n\\emph{Emphasis remains italic.}\n\\end{document}',
  },
  {
    title: 'Use soul for hyphenation and a colored underline',
    paragraphs: [
      'The soul package provides \\ul, which can underline text while allowing line breaks and hyphenation. Choose it when you need those capabilities rather than loading several packages for the same job. With xcolor loaded, \\setulcolor selects the rule color without changing the text color. The two arguments of \\setul set the underline depth and thickness.',
      'Keep local adjustments inside a group so later underlines return to their previous settings. In the example, the colored, thicker rule applies only to the second passage. A colored underline is still an underline, not a background highlight; the text remains readable in its original color. Check a grayscale copy if the document will be printed.',
      'Because soul analyzes its argument, arbitrary nested commands, references, and citations can need special handling. Do not assume every macro accepted in ordinary text will work unchanged inside \\ul. If a complex argument fails, reduce it to plain words first, then consult the package documentation for supported grouping or command registration. Moving a citation outside the underline is often simpler.',
    ],
    code: '\\documentclass{article}\n\\usepackage{xcolor}\n\\usepackage{soul}\n\\begin{document}\n\\begin{minipage}{0.55\\linewidth}\n\\ul{Underlining a longer explanation should still allow sensible line breaks and hyphenation.}\n\\end{minipage}\n\n{\\setulcolor{blue}\\setul{1.5pt}{0.8pt}\n\\ul{A blue rule beneath black text.}}\n\n\\ul{The default underline returns.}\n\\end{document}',
  },
  {
    title: 'Double, wavy, dashed, and dotted underlines',
    paragraphs: [
      'With ulem loaded, use \\uuline for a double underline, \\uwave for a wavy line, \\dashuline for dashes, and \\dotuline for dots. These text decorations use the same general word-based approach as \\uline. They are useful for a required marking convention, but mixing several patterns in ordinary prose usually makes the page harder to read.',
      'For a short item without a package, nesting \\underline inside itself produces two rules. Both layers remain unbreakable, so this is not a workaround for long text. Prefer \\uuline when you are already using ulem. Leave enough vertical space in tables or tight headings and inspect the PDF for collisions with the line below.',
      'The following block is body-only source. Insert it after \\begin{document} in a document whose preamble contains \\usepackage[normalem]{ulem}. Separate paragraphs make the different decorations easier to compare than putting all of them on one crowded line.',
    ],
    code: '\\uuline{Double underline}\n\n\\uwave{Wavy underline}\n\n\\dashuline{Dashed underline}\n\n\\dotuline{Dotted underline}',
  },
  {
    title: 'Bold and italic text: commands, declarations, and emphasis',
    paragraphs: [
      'Use \\textbf or \\textit for a phrase. For a longer passage, the declarations \\bfseries and \\itshape affect subsequent text within the current group or environment. Braces provide a convenient group. Do not write \\bfseries{words} expecting the braces to limit the declaration: the switch happens before that group starts and can affect later text.',
      'In the standard setup, \\emph makes upright text italic and switches back to upright inside italic text. That makes it appropriate for a stressed word in an already italic passage. By contrast, \\textit requests italic shape regardless of the surrounding prose. Classes and packages can customize emphasis, so inspect the actual document rather than assuming its typography is untouched.',
      'Nest \\textbf and \\textit to request bold italic. Put the style commands outside \\uline when underlining a styled phrase; this keeps the underline argument simple. If the result lacks the requested weight or shape, inspect font substitution warnings. A missing font shape cannot be fixed by repeating the same formatting command.',
    ],
    code: '\\documentclass{article}\n\\usepackage[normalem]{ulem}\n\\begin{document}\n{\\bfseries A locally bold sentence.} Normal text follows.\n\n{\\itshape An italic passage with \\emph{upright emphasis}.}\n\n\\textbf{\\textit{Bold italic text.}}\n\n\\textbf{\\uline{Bold and underlined text.}}\n\\end{document}',
  },
  {
    title: 'Underline and bold symbols in math mode',
    paragraphs: [
      'Inside an equation, \\underline underlines the expression in its argument. Use it only when that notation has a defined meaning in your document. An underbrace is different: \\underbrace draws a brace beneath an expression, and a subscript supplies its explanatory label. It does not produce a straight underline with a caption.',
      'For bold upright Latin letters and digits, use \\mathbf. It does not make every mathematical symbol bold. Use \\boldsymbol from amsmath for symbols such as Greek alpha, or use the separate bm package when you need its broader bold-symbol handling. Text formatting commands are not substitutes for a consistent mathematical font convention.',
      'Ordinary Latin variables are italic by default in math; not every mathematical character is. Use \\mathrm for upright identifiers and \\text from amsmath for words that need text spacing. For example, a descriptive subscript such as max should not look like the product of three variables. The example keeps text, notation, and emphasis in their respective modes.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\underline{x+y},\\qquad \\mathbf{F}=m\\mathbf{a},\\qquad\n\\boldsymbol{\\alpha}+\\boldsymbol{\\beta}\n\\]\n\\[\n\\underbrace{a+b+c}_{\\text{three terms}},\\qquad x_{\\mathrm{max}}=3\n\\]\n\\end{document}',
  },
  {
    title: 'Troubleshoot formatting before changing the layout',
    paragraphs: [
      'If a command is undefined, check its spelling and load the required package in the preamble, not halfway through the document body. The built-in \\underline, \\textbf, and \\textit need no package; \\uline and \\ul belong to different packages and are not interchangeable names.',
      'If formatting continues farther than expected, look for an ungrouped declaration or a misplaced closing brace. If the compiler succeeds but the page looks wrong, check the log for overfull boxes and missing font shapes. Reduce the problem to one paragraph before changing margins or font sizes: those layout changes can hide the symptom without fixing the underlying command.',
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
        datePublished="2026-02-24"
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
              'Use \\underline{text} to underline a short phrase in LaTeX, \\textbf{text} for bold, and \\textit{text} for italics. These commands need no package. For an underline that can wrap across lines, load \\usepackage[normalem]{ulem} and use \\uline{text}. Use \\emph{text} when you mean emphasis rather than a fixed italic appearance.'
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
              <Link href="/learn/colors">Text colors and highlighting</Link>
            </li>
            <li>
              <Link href="/learn/font-size">Font sizes in LaTeX</Link>
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">Mathematical expressions</Link>
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
