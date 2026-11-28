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
  slug: 'brackets',
  title: 'Brackets in LaTeX: Curly Braces, Angle Brackets and Sizing',
  seoTitle: 'LaTeX Brackets: Curly Braces, Sizes and \\left \\right',
  description:
    'Write LaTeX brackets with correct spacing: curly braces, angle brackets, automatic and manual sizes, matrices, cases and multiline delimiter fixes.',
  keywords:
    'latex brackets, latex curly braces, latex angle brackets, latex left right, latex parentheses',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-28'
const faq: FaqItem[] = [
  {
    question: 'How do I write curly brackets in LaTeX?',
    answer:
      'Use \\{ and \\} in text or math. Bare braces group source without printing. In math, \\left\\{ ... \\right\\} makes a growing pair; cases supplies a left brace for alternatives.',
  },
  {
    question: 'Why do my angle brackets have too much space?',
    answer:
      'Use \\langle and \\rangle rather than < and >. The latter are relation symbols, not opening and closing delimiters, so they receive different spacing.',
  },
  {
    question: 'How do I fix a bracket across two equation lines?',
    answer:
      'Use manual sizes such as \\Bigl( and \\Bigr) across the rows. A \\left and \\right pair must stay within its alignment cell; invisible partners work but size each row independently.',
  },
  {
    question: 'Should every bracket use left and right?',
    answer:
      'No. Natural-sized brackets are often best for short inline expressions. Use automatic sizing for tall contents and manual sizes when nesting or multiline alignment needs consistent heights.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Choose the delimiter, not a look-alike character',
    paragraphs: [
      'Parentheses and square brackets work in both ordinary text and mathematics. Braces are different: unescaped { and } group source without printing anything. Use \\{ and \\} when the reader should see the braces. The math-only synonyms \\lbrace and \\rbrace are useful in delimiter definitions. In text, \\textbraceleft and \\textbraceright also print braces, including inside typewriter text.',
      'Angle brackets are \\langle and \\rangle, not the less-than and greater-than characters. The latter are relations, so their spacing and shapes are wrong for an inner product. Likewise, use \\lfloor and \\rfloor for floor, and \\lceil and \\rceil for ceiling. Copying a visually similar Unicode character into pdfLaTeX can produce an unsupported-character error or a text glyph that cannot grow as a mathematical delimiter.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nText braces: \\{example\\}.\n\\[\n(a+b)\\quad [a,b]\\quad \\{1,2,3\\}\\quad\n\\langle u,v\\rangle\\quad \\lfloor x\\rfloor\\quad \\lceil x\\rceil\n\\]\n\\end{document}',
  },
  {
    title: 'Use bars according to their mathematical role',
    paragraphs: [
      'For an absolute value, use \\lvert x\\rvert; for a norm, use \\lVert x\\rVert. These opening and closing forms tell TeX how to space adjacent material, especially a leading minus sign. A plain vertical bar does not express that opening or closing role. For a relation inside set-builder notation, use \\mid instead: it receives relation spacing rather than delimiter spacing.',
      'The same distinction matters in conditional probability and inner products. A bar can separate two arguments without enclosing either one. If it must grow alongside an automatically sized outer pair, \\middle| supplies the scalable middle delimiter; spacing around it may still need attention. Choose the meaning first, then the command, instead of fixing every bar with arbitrary spaces.',
    ],
  },
  {
    title: 'Size tall contents with left and right',
    paragraphs: [
      'Put \\left immediately before the opening delimiter and \\right immediately before its closing partner. LaTeX measures the enclosed material and chooses a delimiter size. Fractions, arrays and stacked expressions are common reasons to do this. The two shapes need not match: \\left( ... \\right] is valid for a half-open interval. Matching means a balanced command pair, not identical punctuation.',
      'A dot after either command means an invisible delimiter. This is useful for an evaluation bar: \\left. supplies the otherwise missing opening partner. The dot is syntax, not a printed decimal point. A missing partner can trigger “Missing \\right. inserted” or another grouping error, so inspect the nearest pair before adding closing braces elsewhere in the document.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\left(\\frac{a}{b}\\right)\n\\quad \\left\\{\\frac{a}{b}\\right\\}\n\\quad \\left\\langle\\frac{a}{b},c\\right\\rangle\n\\quad \\left.\\frac{\\partial f}{\\partial x}\\right|_{x=0}\n\\]\n\\end{document}',
  },
  {
    title: 'Prefer manual sizes for nesting and line breaks',
    paragraphs: [
      'The manual sizes are \\big, \\Big, \\bigg and \\Bigg, in increasing order. Use their l and r forms for opening and closing delimiters, such as \\Bigl[ and \\Bigr]. A middle relation can use the m form, as in \\bigm|. These sizes do not require a balanced command pair, although the mathematics should still have the intended opening and closing brackets.',
      'Automatic sizing can make brackets around a display-style sum unexpectedly tall because the limits contribute to its height. It can also make nested levels look too similar. Manual sizes let the outer grouping be visibly larger than the inner grouping without forcing every bracket to cover the tallest subscript. Inspect the actual font and display rather than treating a particular size as a universal rule.',
      'A \\left and \\right pair cannot cross a row break or alignment cell boundary in align. Use manual sizes across a continuation, as below. Alternatively close a row with \\right. and reopen with \\left., but those two pairs are measured independently and may have different heights. Source newlines alone do not split a display; the alignment environment controls the rows.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align*}\nF(x) &= \\Bigl[(x+1)^2+(x+2)^2\\\\\n     &\\qquad {}+(x+3)^2\\Bigr].\n\\end{align*}\n\\end{document}',
  },
  {
    title: 'Keep interval and set notation unambiguous',
    paragraphs: [
      "Intervals can mix round and square ends because the ends communicate inclusion or exclusion. Ordinary-sized brackets usually suffice for short endpoints. In conventions that write an open interval with reversed square brackets, preserve the author's notation rather than converting the shapes merely to satisfy an imagined matching rule. TeX's delimiter-pair requirement is separate from the mathematical convention.",
      'For a set of real numbers, put the condition after \\mid and load amssymb if you use \\mathbb{R}. Thin spaces just inside the braces can improve legibility but do not change the set. Curly braces are also called accolades in some languages; they still require escaping. A square bracket after a command accepting optional arguments may be parsed as an option, so group literal bracketed text when necessary.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\begin{document}\n\\[\n[0,1)\\qquad\n\\{\\,x\\in\\mathbb{R}\\mid x>0\\,\\}\\qquad\n\\langle u\\mid v\\rangle\n\\]\n\\end{document}',
  },
  {
    title: 'Let matrix and cases environments supply their brackets',
    paragraphs: [
      'The amsmath matrix family handles bracket sizes automatically. Use pmatrix for parentheses, bmatrix for square brackets, Bmatrix for braces, vmatrix for single bars and Vmatrix for double bars. Plain matrix supplies no surrounding delimiters. Inside each environment, ampersands separate columns and double backslashes separate rows. Do not add another bracket pair unless you really need an outer grouping.',
      'For an augmented matrix, an array gives explicit column specifications and a vertical separator. For a piecewise function, cases supplies a growing left brace and two columns: the value and its condition. Conditions containing words belong in \\text. Ordinary cases uses text-style fractions; mathtools supplies dcases for display-style entries and rcases for a right-side brace.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\nA=\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix},\n\\qquad\nf(x)=\\begin{cases}x^2&\\text{if }x\\geq0,\\\\-x&\\text{if }x<0.\\end{cases}\n\\]\n\\[\n\\left[\\begin{array}{cc|c}1&0&a\\\\0&1&b\\end{array}\\right]\n\\]\n\\end{document}',
  },
  {
    title: 'Define reusable absolute values and norms',
    paragraphs: [
      'Mathtools provides \\DeclarePairedDelimiter so that an absolute value or norm has one command rather than two manually repeated endpoints. The ordinary form uses natural-sized delimiters, the starred form sizes automatically, and an optional size selects a manual size. Keeping all three choices available is useful because a definition that looks good inline may need a different size in a display.',
      'Choose macro names that your template has not already defined. Loading another package that also supplies \\abs or \\norm can produce a command-already-defined error. Do not silence that error by changing package order blindly: decide which implementation you intend to use. For annotations underneath or above expressions, use \\underbrace with a subscript or \\overbrace with a superscript instead of a vertical delimiter.',
    ],
    code: '\\documentclass{article}\n\\usepackage{mathtools}\n\\DeclarePairedDelimiter{\\abs}{\\lvert}{\\rvert}\n\\DeclarePairedDelimiter{\\norm}{\\lVert}{\\rVert}\n\\begin{document}\n\\[\n\\abs{-x}\\quad \\abs*{\\frac{a}{b}}\\quad \\norm[\\Big]{v}\n\\quad \\underbrace{x+\\cdots+x}_{n\\text{ terms}}\n\\]\n\\end{document}',
  },
  {
    title: 'Diagnose delimiter errors without changing the formula',
    paragraphs: [
      'Start with the first error in the log. “Missing delimiter” often means a sizing command was followed by something that is not a delimiter: \\left cannot be followed directly by a fraction or an ordinary letter. “Missing $ inserted” usually points to a math-only command used in text. An unmatched brace can also hide the true boundary of a formula, so reduce the failing display to a small example before changing several unrelated lines.',
      "A successful compile does not establish correct spacing. Check negative values inside bars, the heights of nested brackets and whether a continuation still communicates the same grouping. Compare the standalone example with the final document class, especially in narrow columns. Copy only the needed package declarations into your preamble and only the mathematical body into an existing document; do not nest a complete example's document environment inside your paper.",
      "When collaborating across engines, command-based delimiters are the portable choice. LuaLaTeX and XeLaTeX with unicode-math support Unicode mathematical delimiters, but that is a separate font and engine setup, not a reason to paste arbitrary look-alikes into a pdfLaTeX project. Keep the document's compiler choice consistent and retain the original notation while repairing its source.",
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
              'Type ( ) and [ ] directly; print curly braces with \\{ and \\}. In math mode use \\langle and \\rangle for angle brackets. Put \\left and \\right before a pair to size it automatically, or choose matching \\bigl and \\bigr sizes manually. Load amsmath for the matrix and alignment examples below.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 28, 2026</p>

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
            Use the package authors&apos; documentation for supported commands, options and
            font-dependent behavior:
          </p>
          <ul>
            <li>
              <a href="https://mirrors.ctan.org/macros/latex/required/amsmath/amsldoc.pdf">
                amsmath user guide: matrices and delimiters
              </a>
            </li>
            <li>
              <a href="https://mirrors.ctan.org/macros/latex/contrib/mathtools/mathtools.pdf">
                mathtools manual: paired delimiters
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/matrices">Matrix environments and column alignment</Link>
            </li>
            <li>
              <Link href="/learn/piecewise-functions">Cases and piecewise functions</Link>
            </li>
            <li>
              <Link href="/learn/multiline-equations">Multiline equations</Link>
            </li>
            <li>
              <Link href="/learn/special-characters">Escaping special characters</Link>
            </li>
          </ul>
          <p>
            Test a complete example with{' '}
            <a href="https://tools.useoctree.com/tools/latex-preview">LaTeX Preview</a>, then check
            it in the final document class. The class, math font and available column width can
            change the result.
          </p>
          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-lg font-semibold mb-2">Try the notation in your document</h2>
            <p className="text-muted-foreground mb-4">
              Open Octree to edit LaTeX and compile a PDF. Copy the example into a small document
              first, then transfer the relevant packages and formulas into your paper.
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
