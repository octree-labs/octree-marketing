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
  slug: 'integrals-sums-limits',
  title: 'Sums, Integrals and Limits in LaTeX: Bounds and Examples',
  seoTitle: 'LaTeX Sum, Integral and Limit: Syntax and Bounds',
  description:
    'Write LaTeX sums, integrals and limits with correct bounds, display styles, substack conditions, differentials and complete amsmath examples.',
  keywords:
    'latex sum, latex integral, latex limits, latex summation, latex substack, latex partial derivative',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-28'
const faq: FaqItem[] = [
  {
    question: 'How do I write the sum symbol in LaTeX?',
    answer:
      'Use \\sum in math mode, for example $\\sum_{i=1}^{n} a_i$. \\Sigma is the Greek capital letter, not the summation operator.',
  },
  {
    question: 'What is the difference between limits and displaystyle?',
    answer:
      '\\limits places scripts above and below an operator. \\displaystyle changes the mathematical style, including operator and fraction sizes. Either can make inline mathematics taller.',
  },
  {
    question: 'Why are integral bounds beside the sign?',
    answer:
      'That is the normal integral convention, including in display math. Write \\int\\limits_a^b if you deliberately want stacked bounds, or use the amsmath intlimits option for a document-wide policy.',
  },
  {
    question: 'Which package provides double integrals and stacked conditions?',
    answer:
      'Load amsmath for \\iint, \\iiint and \\substack. Basic \\int, \\sum and \\lim are available without it, but amsmath also supplies the alignment and operator tools used in these examples.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Write a summation with a grouped index and upper bound',
    paragraphs: [
      'The subscript names the index and its starting value; the superscript gives the final value. Braces group every character belonging to a bound. Without braces, a subscript or superscript consumes only its next token, so a multi-character condition can end up partly on the baseline. The expression to the right is the summand, evaluated for each value of the index.',
      'The commands \\sigma, \\Sigma and \\sum are different objects. Lowercase sigma is a letter, often used for standard deviation. Capital Sigma is also a letter, often used for a covariance matrix. The summation operator grows in display style and supports the usual above-and-below bound placement. Choosing the operator is what gives the right layout; enlarging the Greek letter is not an equivalent repair.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nInline: $\\sum_{i=1}^{n} a_i$.\n\\[\n\\sum_{i=1}^{5}i^2=1+4+9+16+25=55,\n\\qquad\n\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}.\n\\]\n\\end{document}',
  },
  {
    title: 'Separate operator size from bounds placement',
    paragraphs: [
      'Inline mathematics uses text style to fit within a paragraph. A sum is smaller and its bounds sit beside it. A displayed equation uses display style, with a larger sum and stacked bounds. The command \\limits changes where scripts are placed; it does not by itself select the larger operator. Conversely, \\nolimits requests side placement even when the operator is large.',
      "The declaration \\displaystyle changes the style of the following mathematics in its scope, including fractions and operator sizes. Both a stacked small sum and a full-sized display sum can increase an inline line's height. If the notation dominates the paragraph, move it into a separate display rather than assuming \\displaystyle is a harmless inline fix. Group a local style change when later material should return to the surrounding style.",
      'Integral signs are an important exception to the default sum behavior: bounds normally remain beside an integral even in display math. Put \\limits directly after \\int if the publication wants stacked bounds. The amsmath intlimits option makes this a document-level policy; do not enable it simply to repair one isolated formula.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nInline comparison: $\\sum_{i=1}^{n}a_i$,\n$\\sum\\limits_{i=1}^{n}a_i$.\n\\[\n\\sum\\nolimits_{i=1}^{n}a_i\n\\qquad\n\\int_0^1 x\\,\\mathrm{d}x\n\\qquad\n\\int\\limits_0^1 x\\,\\mathrm{d}x\n\\]\n\\end{document}',
  },
  {
    title: 'Use substack for several conditions under a sum',
    paragraphs: [
      'With amsmath, \\substack builds a compact stack inside a subscript. Separate conditions with a double backslash. This is useful for restrictions such as two bounded indices with an inequality, but the stack does not create several independent sums. Use nested \\sum commands when the mathematics really has an outer and an inner summation.',
      'Long conditions can make a sum wider than expected. Introduce an index set in the surrounding text rather than hiding a full sentence below the symbol. The same bound syntax works for \\prod, \\coprod, \\bigcup and \\bigcap. Use the big operator forms for indexed products or families of sets; ordinary \\cup and \\cap are binary operations between individual sets.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\sum_{\\substack{1\\leq i,j\\leq n\\\\i\\neq j}}a_{ij}\n\\qquad\n\\sum_{i=1}^{n}\\sum_{j=1}^{m}a_{ij}\n\\]\n\\[\n\\prod_{k=1}^{n}k=n!,\n\\qquad\n\\bigcup_{i=1}^{n}A_i\n\\]\n\\end{document}',
  },
  {
    title: 'Write integrals and their differentials consistently',
    paragraphs: [
      "A definite integral uses both bounds; an indefinite integral omits them. Put a thin space before the differential so it does not run into the integrand. The example uses an upright d through \\mathrm{d}. An italic dx is also a common mathematical convention; follow the journal's style and use one convention consistently rather than changing it from equation to equation.",
      "If you introduce a differential macro, check whether the template or another package already defines its name. A locally defined \\dd can conflict with the physics package's command of the same name. The plain amsmath example needs no physics-specific commands. Package shortcuts can be convenient, but they are not necessary to write an ordinary integral or derivative.",
    ],
    code: "\\documentclass{article}\n\\usepackage{amsmath}\n\\newcommand{\\diff}{\\mathop{}\\!\\mathrm{d}}\n\\begin{document}\n\\[\n\\int x^2\\,\\diff x=\\frac{x^3}{3}+C,\n\\qquad\n\\int_0^1 x^2\\,\\diff x=\\frac13.\n\\]\n\\[\n\\int_a^b f'(x)\\,\\diff x=f(b)-f(a).\n\\]\n\\end{document}",
  },
  {
    title: 'Choose multiple and contour integral commands',
    paragraphs: [
      'Amsmath supplies \\iint, \\iiint, \\iiiint and \\idotsint with coordinated spacing between integral signs. Use \\oint for a closed contour integral; it is available in standard LaTeX. Repeating \\int with arbitrary negative spaces is harder to maintain and may fail when the math style changes. A domain subscript can describe a region without separate numeric bounds on each sign.',
      "For iterated integrals, repeated \\int commands are appropriate because each integration has its own limits and differential. Check the order of variables: the differential nearest the integrand is normally integrated first. LaTeX will typeset an inconsistent order without warning. Specialized closed double-integral symbols require additional symbol support, so verify the command's package instead of assuming every integral variant belongs to amsmath.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\iint_D f(x,y)\\,\\mathrm{d}A\n\\qquad\n\\iiint_V g(x,y,z)\\,\\mathrm{d}V\n\\]\n\\[\n\\int_0^1\\int_0^x y\\,\\mathrm{d}y\\,\\mathrm{d}x=\\frac16,\n\\qquad\n\\oint_C f(z)\\,\\mathrm{d}z\n\\]\n\\end{document}',
  },
  {
    title: 'Use named limit operators instead of italic letters',
    paragraphs: [
      'The command \\lim gives an upright operator with the right spacing and script placement. Typing the three letters lim produces three italic variables instead. Put the approach condition inside a grouped subscript, using \\to for the arrow and \\infty for infinity. One-sided limits attach a plus or minus superscript to the approached value, not to the entire limit operator.',
      "LaTeX also provides \\limsup and \\liminf. For a new named operator, amsmath's \\DeclareMathOperator defines its spacing and upright name; the starred version permits display-style limits beneath it. Use that mechanism for a recurring name such as arg max rather than repeatedly assembling roman text and manual spaces. Keep definitions in the preamble.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\DeclareMathOperator*{\\argmax}{arg\\,max}\n\\begin{document}\n\\[\n\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\qquad\n\\lim_{x\\to0^+}\\log x=-\\infty\n\\]\n\\[\n\\limsup_{n\\to\\infty}a_n,\\qquad\n\\argmax_{x\\in D}f(x)\n\\]\n\\end{document}',
  },
  {
    title: 'Retain clear notation for derivatives and series',
    paragraphs: [
      "Write a partial derivative with \\partial in the numerator and denominator of a fraction. For a second derivative, the exponent belongs on the numerator's partial symbol and the denominator's variable. The nabla command \\nabla supplies the symbol used for gradients; divergence and curl combine it with \\cdot and \\times. Bold vector notation is a separate choice from choosing the derivative symbol.",
      'Sums and limits often appear together in series and Riemann sums. State the convergence domain or limiting assumptions in the prose when they matter. A beautifully formatted infinite series can still be mathematically false outside its domain. In the example, the exponential series is valid for every real x, while the Riemann-sum identity assumes a continuous function on the stated interval.',
      'For example, a Taylor expansion of log(1+x) should state an interval such as |x|<1 rather than present the power series as an identity for every x. Similarly, a contour integral needs an oriented contour and any hypotheses required by the theorem being applied. The source commands express notation, not those assumptions. Keeping a short explanatory sentence beside a displayed formula makes a copied example useful without implying that LaTeX has checked its mathematical validity.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n\\frac{\\partial^2 u}{\\partial t^2}\n=c^2\\frac{\\partial^2 u}{\\partial x^2},\n\\qquad\n\\nabla\\cdot\\mathbf{F}\n\\]\n\\[\ne^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}\n\\]\nFor continuous $f$ on $[a,b]$, set $\\Delta x=(b-a)/n$.\n\\[\n\\int_a^b f(x)\\,\\mathrm{d}x\n=\\lim_{n\\to\\infty}\\sum_{k=1}^{n}f(a+k\\Delta x)\\Delta x.\n\\]\n\\end{document}',
  },
  {
    title: 'Fix the first error and check the final column width',
    paragraphs: [
      'A missing math delimiter can cause “Missing $ inserted”; a missing amsmath declaration can leave \\substack or multiple-integral commands undefined. A “Double subscript” error often means an operator received two separate subscripts instead of one grouped condition. Repair the first diagnostic, then compile again before treating later messages as independent problems.',
      'A successful compile does not guarantee that a display fits. Check long bounds, nested sums and equation numbers in the actual document column. Split a derivation with an appropriate amsmath environment or introduce a named expression before shrinking the entire formula. Copy the body of a standalone example into an existing paper, not its documentclass and document boundaries.',
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
              'Write \\sum_{i=1}^{n} a_i for a sum, \\int_a^b f(x)\\,\\mathrm{d}x for a definite integral, and \\lim_{x\\to0} f(x) for a limit, all inside math mode. Use \\sum, not the Greek letter \\Sigma. Display math normally stacks sum bounds, while integral bounds normally stay beside the sign.'
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
                amsmath user guide: operators, multiple integrals and limits
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/learn/mathematical-expressions">Inline and display math</Link>
            </li>
            <li>
              <Link href="/learn/multiline-equations">Multiline equations</Link>
            </li>
            <li>
              <Link href="/learn/brackets">Delimiters around sums</Link>
            </li>
            <li>
              <Link href="/learn/equation-numbering">Equation numbering and references</Link>
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
