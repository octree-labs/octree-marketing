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
  slug: 'strikethrough',
  title: 'LaTeX Strikethrough: Cross Out Text and Math',
  seoTitle: 'LaTeX Strikethrough: sout, st and cancel',
  description:
    'Cross out LaTeX text with ulem or soul, cancel math terms, color strike lines, and mark revisions with complete examples and troubleshooting.',
  keywords:
    'latex strikethrough, latex strikethrough math, latex strikethrough text, latex sout, latex cancel',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-22'
const faq: FaqItem[] = [
  {
    question: 'How do I strikethrough text in LaTeX?',
    answer:
      'Load \\usepackage[normalem]{ulem} in the preamble and use \\sout{text} in the body. The normalem option preserves ordinary italic emphasis. Use a separate command for each paragraph.',
  },
  {
    question: 'How do I cross out a term in a LaTeX equation?',
    answer:
      'Load cancel and write \\cancel{x} in math mode. Use \\bcancel for the opposite diagonal, \\xcancel for an X, or \\cancelto{0}{expression} for an arrow to zero. Check that the cancellation is mathematically valid.',
  },
  {
    question: 'Can I keep black text with a red strike?',
    answer:
      'Yes. Load xcolor and soul, then use {\\setstcolor{red}\\st{text}}. The braces keep the setting local, and the strike color is separate from the text color.',
  },
  {
    question: 'Does strikethrough hide confidential information?',
    answer:
      'No. Struck text remains in the source and generally remains readable and extractable from the PDF. Remove confidential content rather than covering it with a strike.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Start with horizontal strikethrough for text',
    paragraphs: [
      'The ulem package supplies \\sout, which preserves the original words while drawing a line through them. It is suitable for an old price, a corrected date, or a short editorial deletion. Put the package declaration in the preamble and the command in the document body. Braces determine exactly which words receive the line; punctuation outside the braces remains unchanged.',
      "The normalem option is important because ulem otherwise changes ordinary emphasis into underlining. That can alter existing \\emph commands throughout a document even if you only intended to cross out one word. With normalem, emphasis keeps its usual behavior while ulem's explicit underline and strikeout commands remain available.",
      'Unlike placing text in a fixed-width box and drawing a rule over it, \\sout can break a passage across lines. It still is not a container for multiple paragraphs. Apply separate commands to separate paragraphs, and inspect line endings at the final font size. A deletion that looks clear on screen may be difficult to read in a small printed footnote.',
    ],
    code: '\\documentclass{article}\n\\usepackage[normalem]{ulem}\n\\begin{document}\nThe deadline is \\sout{Friday} Monday.\nThe revised price is \\sout{\\$40} \\$25.\n\\emph{This emphasis remains italic.}\n\\end{document}',
  },
  {
    title: "Choose sout, xout, or soul's st",
    paragraphs: [
      'Use \\sout for a single horizontal strike and \\xout for diagonal hatching through text. Hatching can make a deletion conspicuous but also harder to decipher. Neither command removes the original content from the PDF. If the old wording must not be distributed, delete it from the source instead of treating a line as redaction.',
      'The soul package offers \\st for strikeout and \\setstcolor for the line color. Load xcolor when using named colors. Setting the strike color does not recolor the letters, so the example produces a red line over otherwise black text. Group the color setting when only one passage should use it; an ungrouped setting affects subsequent strikeouts.',
      "soul scans text to support spacing and hyphenation, so complex command arguments deserve a small test. An unrecognized command inside the argument can cause reconstruction errors. Keep citations or elaborate formatting outside the strike where possible, or follow the package's registration instructions for the particular command rather than adding braces at random.",
    ],
    code: '\\documentclass{article}\n\\usepackage[normalem]{ulem}\n\\usepackage{xcolor}\n\\usepackage{soul}\n\\begin{document}\n\\sout{Horizontal deletion} and \\xout{hatched deletion}.\n\n{\\setstcolor{red}\\st{Black letters with a red strike.}}\n\\end{document}',
  },
  {
    title: 'Cancel mathematical terms with cancel',
    paragraphs: [
      'Mathematical cancellation is usually diagonal, so use the cancel package rather than putting \\sout around an equation. The stroke scales with the expression. \\cancel draws a rising diagonal, \\bcancel a falling diagonal, and \\xcancel both. The argument can be a single symbol or a grouped expression, but it must match the quantity you actually mean to cancel.',
      'A cancellation mark does not establish that the algebra is valid. In the fraction below, cancellation assumes x is nonzero; state that condition rather than silently changing the domain. Do not cross out matching terms across addition as if they were common factors. A visually convincing annotation can still communicate a mathematically false step.',
      'Use \\cancelto{value}{expression} when an arrow to a limiting value is more informative than a plain stroke. Its first argument is the value and its second is the expression being annotated. This command needs math mode. A cancellation package is unnecessary for a negated relation: use \\neq or \\notin when the meaning is not equal or not an element of.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{cancel}\n\\begin{document}\nFor $x\\neq 0$,\n\\[\n  \\frac{\\cancel{x}(x+1)}{\\cancel{x}}=x+1.\n\\]\n\\[\n  \\bcancel{a}\\qquad \\xcancel{b}\\qquad\n  \\lim_{n\\to\\infty}\\left(2+\\cancelto{0}{\\frac{1}{n}}\\right)=2.\n\\]\n\\end{document}',
  },
  {
    title: 'Color and weight without changing meaning',
    paragraphs: [
      "For cancel, redefine \\CancelColor using an xcolor color command. Group that redefinition when the color should be local. The package's thicklines option makes the strokes heavier, while makeroom reserves additional horizontal room. These options can help crowded annotations, but neither replaces checking the PDF for collisions with neighboring symbols.",
      "For ulem, \\ULthickness controls rule thickness and can be changed with \\renewcommand. A modest increase is usually enough. Avoid changing \\ULdepth simply to move a strike: that parameter primarily belongs to the package's underline placement, and treating it as a universal strikethrough-position control produces misleading expectations.",
      'Choose color as a secondary cue rather than the only way to distinguish a revision. Black-and-white printouts, low-contrast projectors, and color-vision differences can hide a color distinction. A strike plus an explicit replacement remains interpretable even when the red or blue styling is lost.',
    ],
    code: '\\documentclass{article}\n\\usepackage{xcolor}\n\\usepackage[normalem]{ulem}\n\\usepackage[thicklines,makeroom]{cancel}\n\\begin{document}\n{\\renewcommand{\\ULthickness}{0.8pt}\\sout{A heavier text strike}}\n\n{\\renewcommand{\\CancelColor}{\\color{red}}\n\\[\n  a+\\cancel{b}-\\cancel{b}=a\n\\]}\n\\end{document}',
  },
  {
    title: 'Tables, slides, and revision workflows',
    paragraphs: [
      'A short strikeout works inside a table cell using the same text command. Keep prices, units, and punctuation inside the argument when they belong to the deleted value. A narrow paragraph-style cell can wrap; an ordinary left-aligned cell does not automatically wrap long prose. Solve the cell-width problem with an appropriate column type, not extra strike commands.',
      'In Beamer, \\alt can replace plain text with its struck version on later overlays. Using mutually exclusive alternatives avoids showing both versions simultaneously. Keep the change short enough that its altered width does not disrupt the slide layout. Compile the whole slide sequence, since checking only the first PDF page will miss overlay mistakes.',
      'For extensive revisions, use a revision package instead of scattering unrelated strikes. The changes package supplies \\added, \\deleted, and \\replaced, and its final option suppresses revision markup. That is a typesetting mode, not proof that a collaborator has approved the changes. Review the resulting clean PDF before distribution, and do not assume struck text is inaccessible to copying or extraction.',
    ],
    code: '\\documentclass{beamer}\n\\usepackage[normalem]{ulem}\n\\begin{document}\n\\begin{frame}{Updated plan}\n\\alt<2->{\\sout{Ship on Friday}}{Ship on Friday}\n\\only<2->{ Ship on Monday}\n\\end{frame}\n\\end{document}',
  },
  {
    title: 'Accept revisions without leaving strike commands behind',
    paragraphs: [
      'For a small revision example, load changes in draft mode and use \\replaced{new}{old} when the two versions form one edit. The argument order matters: reversing it marks the intended replacement as deleted. Keep surrounding spaces and punctuation in a deliberate place so the final version still reads correctly when markup is hidden.',
      'Compile the same source once with draft and once with final. Compare the accepted wording, not just the presence of colored annotations. If you also use standalone \\sout commands elsewhere, those commands are independent of the changes package and do not disappear merely because changes is switched to final. Use one consistent mechanism for revisions that must be accepted together.',
    ],
    code: '\\documentclass{article}\n\\usepackage[draft]{changes}\n\\begin{document}\nThe deadline is \\replaced{Monday}{Friday}.\nWe \\added{also} checked the final wording.\nThe \\deleted{obsolete }plan is archived.\n\\end{document}',
  },
  {
    title: 'Fix common strikethrough errors',
    paragraphs: [
      'An undefined control sequence usually means the corresponding package was not loaded: ulem for \\sout, soul for \\st, or cancel for \\cancel. Check spelling and capitalization before installing anything. If the log instead says the package file is missing, install it through your TeX distribution or use an environment that includes it.',
      "If emphasized text unexpectedly becomes underlined, check how ulem was first loaded, including by another package. Add normalem to the appropriate load or use the package's documented \\normalem declaration. If a strike fails only around bold text or a citation, reduce the argument to plain words and reintroduce the nested command separately.",
      'Do not paste Unicode combining strikeout from a text generator as a substitute. Support depends on the engine and font, and the result can be hard to search, copy, or align. Keep ordinary readable source text and let the package draw the annotation. Finally, check the compiled words and mathematical conditions, not only whether the compiler exits successfully.',
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
              "For LaTeX strikethrough text, load \\usepackage[normalem]{ulem} and write \\sout{deleted words}. For strikethrough in math, load cancel and use \\cancel{x} inside math mode. These solve different problems: ulem draws a horizontal line through words, while cancel draws a diagonal stroke through an expression. Use soul's \\st when you specifically want a separately colored strike line."
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
            The <a href="https://ctan.org/pkg/ulem">ulem documentation</a>,{' '}
            <a href="https://ctan.org/pkg/soul">soul documentation</a>, and{' '}
            <a href="https://ctan.org/pkg/cancel">cancel manual</a> describe their argument handling
            and styling options.
          </p>
          <ul>
            <li>
              <Link href="/learn/bold-italics-underline">Bold, italics, and underline</Link>
            </li>
            <li>
              <Link href="/learn/comments">Comments and hidden source text</Link>
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">Mathematical expressions</Link>
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
