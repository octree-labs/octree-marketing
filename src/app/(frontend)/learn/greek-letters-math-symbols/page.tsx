import type { Metadata } from 'next/types'
import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import { generateBreadcrumbSchema, getLearnBreadcrumbs } from '@/utilities/generateBreadcrumbs'
import { LearnSchema } from '@/components/Learn/schema'
import { OpenInOctree } from '@/components/OpenInOctree'
import { GREEK_SYMBOLS_STARTER } from '@/components/Learn/open-symbols-in-octree'

export const dynamic = 'force-static'
export const revalidate = 3600

const page = {
  slug: 'greek-letters-math-symbols',
  title: 'Greek Letters in LaTeX: Variants, Capitals and Math Fonts',
  seoTitle: 'LaTeX Greek Letters: Variants, Bold and Upright',
  description:
    'Choose LaTeX Greek letter variants, uppercase forms, bold vectors and upright symbols. Compare amsmath, amssymb, bm, upgreek and Unicode math.',
  keywords:
    'latex greek letters, latex epsilon, latex lambda, latex bold greek, latex upright greek, latex math symbols',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-28'
const faq: FaqItem[] = [
  {
    question: 'How do I write epsilon in LaTeX?',
    answer:
      'Use $\\epsilon$ or $\\varepsilon$ in math mode. They select different glyph variants; neither requires an extra package in traditional LaTeX. The exact shapes depend on your math font.',
  },
  {
    question: 'Why does Alpha give an undefined control sequence?',
    answer:
      'Standard traditional LaTeX uses the Latin A for capital alpha. It defines separate capital Greek commands only for distinct shapes such as \\Gamma, \\Lambda and \\Omega.',
  },
  {
    question: 'How do I make Greek letters bold?',
    answer:
      'Use \\boldsymbol{\\alpha} with amsmath or \\bm{\\alpha} with bm. In a traditional math setup, \\mathbf{\\alpha} does not generally select bold Greek.',
  },
  {
    question: 'How do I write an upright mu?',
    answer:
      'With traditional pdfLaTeX math, load upgreek and use \\upmu. For a measurement with a micro prefix, use a unit package such as siunitx and its documented unit commands instead.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Start with mathematical commands, not pasted glyphs',
    paragraphs: [
      'A Greek letter in an equation is a mathematical symbol, not just a character with a familiar outline. Commands give LaTeX the appropriate math font and behavior in subscripts, superscripts and surrounding formulas. Put them inside dollar signs in a sentence or display delimiters for a standalone equation. Writing \\alpha directly in ordinary text commonly produces “Missing $ inserted”.',
      'Most lowercase commands are the English letter name after a backslash: \\alpha, \\beta, \\gamma, \\delta, \\theta, \\lambda, \\mu, \\pi, \\rho, \\sigma and \\omega. In the traditional math setup, omicron is an exception: use Latin o rather than an undefined \\omicron. This guide focuses on mathematical case, variant and package choices; the separate Greek alphabet guide supplies the ordered alphabet, pronunciation and general meanings.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\begin{document}\nThe parameters are $\\alpha$, $\\beta$ and $\\lambda$.\n\\[\n\\lambda\\in\\mathbb{R}\n\\]\n\\end{document}',
  },
  {
    title: 'Choose uppercase commands deliberately',
    paragraphs: [
      'Traditional LaTeX defines distinct capital commands for \\Gamma, \\Delta, \\Theta, \\Lambda, \\Xi, \\Pi, \\Sigma, \\Upsilon, \\Phi, \\Psi and \\Omega. Capitals whose shapes coincide with Latin letters are normally written as Latin letters instead: A, B, E, Z, H, I, K, M, N, O, P, T and X. An undefined \\Alpha or \\Beta is therefore not evidence that amsmath failed to load.',
      'Case changes meaning as well as shape. A lowercase lambda may denote an eigenvalue while uppercase Lambda names a matrix of eigenvalues. Likewise, \\sigma, \\Sigma and \\sum are not interchangeable: the first two are letters, while the third is a summation operator with different sizing and limits behavior. Select the intended mathematical object rather than picking whichever glyph most resembles a screenshot.',
      "Standard capital Greek commands are upright in the usual Computer Modern setup. Amsmath supplies italic capital variants such as \\varGamma and \\varOmega. Use these when your notation requires italic variables, but check the publisher's math font and style. Changing from one font package to another can alter both the shape and default posture of Greek letters.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\lambda,\\ \\Lambda,\\quad \\sigma,\\ \\Sigma,\\quad\n\\Gamma,\\ \\varGamma,\\quad \\Omega,\\ \\varOmega\n\\]\n\\[\n\\Sigma=\\sum_{i=1}^{n} A_i\n\\]\n\\end{document}',
  },
  {
    title: 'Compare epsilon, phi and the other lowercase variants',
    paragraphs: [
      'In the usual traditional fonts, \\epsilon gives a lunate epsilon and \\varepsilon an open, curly form. The corresponding phi choices are \\phi and \\varphi. Other built-in pairs are \\theta and \\vartheta, \\pi and \\varpi, \\rho and \\varrho, and \\sigma and \\varsigma. Amssymb adds \\varkappa as an alternative to \\kappa. The exact outlines depend on the selected math font.',
      'Variant glyphs do not automatically create different mathematical meanings. A paper can use both deliberately for different quantities, or choose one form consistently for the same quantity. Define that convention before changing commands globally. In particular, do not replace every epsilon with varepsilon if an existing derivation uses the two shapes to distinguish two independent parameters.',
      "The membership relation \\in is not an epsilon variant. Even if its outline looks similar at small size, it has relation spacing and a different mathematical role. Similarly, final sigma \\varsigma is a separate available glyph, not a command that LaTeX automatically substitutes according to a word's position. Mathematical Greek is not a Greek-language text-shaping system.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\begin{document}\n\\[\n\\begin{aligned}\n&\\epsilon,\\ \\varepsilon,\\quad \\phi,\\ \\varphi,\\quad \\theta,\\ \\vartheta\\\\\n&\\pi,\\ \\varpi,\\quad \\rho,\\ \\varrho,\\quad \\sigma,\\ \\varsigma\\\\\n&\\kappa,\\ \\varkappa,\\quad \\epsilon\\neq\\varepsilon,\\quad x\\in A\n\\end{aligned}\n\\]\n\\end{document}',
  },
  {
    title: 'Use boldsymbol or bm for bold Greek',
    paragraphs: [
      'In traditional math, \\mathbf changes the math alphabet used for Latin letters and digits; it does not generally turn \\alpha into bold alpha. Use \\boldsymbol from amsmath or \\bm from the bm package. Both are intended for mathematical symbols. Bold Greek is useful for vectors of parameters and covariance matrices, but the actual bold glyph depends on available font support.',
      'Keep the notation consistent between a vector and its components. A bold theta might name the whole vector while an ordinary theta with a subscript names one scalar component. Applying bold formatting to every symbol in a formula can erase that distinction. Math accents also have meaning: \\hat{\\theta} often denotes an estimate, while \\bar{\\theta} denotes some stated average or related construction.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,bm}\n\\begin{document}\n\\[\n\\boldsymbol{\\theta}=(\\theta_1,\\theta_2),\\qquad\n\\bm{\\Sigma}=\\begin{pmatrix}1&\\rho\\\\\\rho&1\\end{pmatrix}\n\\]\n\\[\n\\hat{\\theta},\\quad \\widehat{\\alpha+\\beta},\\quad\n\\bar{\\mu},\\quad \\dot{\\phi}\n\\]\n\\end{document}',
  },
  {
    title: 'Choose upright Greek for the notation your discipline requires',
    paragraphs: [
      'Lowercase Greek is normally italic in traditional math. The upgreek package adds upright commands such as \\upalpha, \\upmu and \\uppi; its capital command names include forms such as \\Upgamma. These are additional math symbols rather than a global switch that changes every Greek letter. Use them when the notation requires upright shapes, not simply because a source image happened to use another font.',
      'Wrapping a traditional Greek command in \\mathrm does not reliably turn it upright, because those Greek symbols are not selected through that roman math alphabet. Use a package designed for the task. For physical units and prefixes, prefer the unit notation supported by siunitx rather than assembling a Greek mu and a unit letter by hand. A variable named mu and the micro prefix have different roles.',
      'Do not assume that every constant must be changed to an upright Greek glyph in every publication. Journal conventions differ, particularly for familiar constants such as pi. Follow the target style and document the choice through consistent commands. This avoids a last-minute global replacement that inadvertently changes a variable sharing the same letter.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,upgreek}\n\\begin{document}\n\\[\n\\mu,\\ \\upmu,\\qquad \\pi,\\ \\uppi,\\qquad\n\\Gamma,\\ \\Upgamma\n\\]\n\\end{document}',
  },
  {
    title: 'Distinguish mathematical Greek from Greek in running text',
    paragraphs: [
      "Inline math is appropriate when a sentence mentions a mathematical parameter: “the coefficient alpha” can contain an inline \\alpha. A Greek word, a transliterated name or an extended passage is a different problem. Use the document's language and text-font configuration rather than treating a word as a sequence of italic math variables. Text-mode packages such as textgreek address individual Greek letters in text.",
      "Pasting a Unicode Greek letter into a pdfLaTeX source does not guarantee mathematical font selection or even successful input handling. For portable traditional examples, use commands. If you intentionally use LuaLaTeX or XeLaTeX with unicode-math, Greek input and alphabet commands follow that package's Unicode-math model. It requires an OpenType math font and is not a package to add to a pdfLaTeX preamble.",
    ],
  },
  {
    title: 'Choose packages by the commands you actually need',
    paragraphs: [
      'Basic Greek commands need no extra package. Amsmath adds tools such as \\boldsymbol, italic capital variants, aligned displays and text inside formulas. Amssymb supplies additional symbols, including \\varkappa, \\digamma and \\mathbb for blackboard-bold sets. Bm specializes in bold math, while upgreek supplies upright Greek. These purposes overlap only partially; loading amsmath does not automatically load every AMS symbol.',
      'Related mathematical symbols also carry spacing classes. Use \\pm or \\times for binary operations, \\leq or \\in for relations, and \\to or \\mapsto for arrows. For ellipses, \\cdots is appropriate between plus signs while \\ldots commonly separates a comma-delimited list. The dedicated symbol reference covers the larger inventory; here the important point is to use a semantic command instead of a visually similar text character.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\begin{document}\n\\[\n\\lambda\\in\\mathbb{C},\\qquad\n\\alpha\\leq\\beta,\\qquad\nf\\colon\\mathbb{R}\\to\\mathbb{R},\\quad x\\mapsto x^2\n\\]\n\\[\n\\alpha_1,\\ldots,\\alpha_n,\\qquad\n\\alpha_1+\\cdots+\\alpha_n\n\\]\n\\end{document}',
  },
  {
    title: 'Debug an undefined symbol before changing notation',
    paragraphs: [
      'Check spelling and capitalization first, then identify the package that defines the command. An undefined \\varkappa suggests missing amssymb; an undefined \\upmu suggests missing upgreek; an undefined \\Alpha in a traditional setup calls for a different command, not another random package. If a command already exists, inspect the template before redefining it.',
      'Compile the minimal example with the same engine as the paper, then add its packages and font settings gradually. Check the resulting PDF at normal reading size: epsilon and membership, nu and Latin v, or rho and Latin p may be difficult to distinguish in a particular font. A symbol table documents the intended meaning when visual similarity cannot be eliminated.',
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
              'Write Greek variables in math mode, for example $\\alpha$, $\\lambda$ and $\\Omega$. Use \\varepsilon or \\vartheta when you want a variant glyph, \\boldsymbol with amsmath for bold Greek, and upgreek for upright Greek in a traditional pdfLaTeX setup. Capitalization matters: \\lambda and \\Lambda are different commands, and standard LaTeX does not define \\Alpha.'
            }
          </p>
          <p className="text-sm text-muted-foreground">Updated November 28, 2026</p>
          <p>
            For all 24 letters and their LaTeX commands, use the{' '}
            <Link href="/learn/latex-symbols">Greek command table in the symbol reference</Link>.
            This guide explains which variant and math font to choose.
          </p>
          <OpenInOctree
            latex={GREEK_SYMBOLS_STARTER}
            title="Greek Letters and Math Symbols"
            source="www:learn:greek-letters-math-symbols:symbols-top"
            raw
            label="Open these symbols in Octree"
            copy="Open a starter document in Octree to edit the symbols and compile a PDF."
          />

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
          <OpenInOctree
            latex={GREEK_SYMBOLS_STARTER}
            title="Greek Letters and Math Symbols"
            source="www:learn:greek-letters-math-symbols:symbols-tables"
            raw
            label="Open these symbols in Octree"
            copy="Try the Greek starter document in Octree. Sign-in and account access may be required."
          />
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
              <a href="https://ctan.org/pkg/amsmath">
                amsmath user guide
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/bm">
                bm package documentation
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/upgreek">
                upgreek package manual
              </a>
            </li>
            <li>
              <a href="https://ctan.org/pkg/unicode-math">
                unicode-math documentation and engine requirements
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/greek-alphabet">
                Greek alphabet: names, order and pronunciation
              </Link>
            </li>
            <li>
              <Link href="/learn/latex-symbols">LaTeX symbol reference</Link>
            </li>
            <li>
              <Link href="/learn/bold-italics-underline">Bold text and mathematics</Link>
            </li>
            <li>
              <Link href="/learn/integrals-sums-limits">Sums versus Greek capital sigma</Link>
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
