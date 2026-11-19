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
  slug: 'theorems-proofs',
  title: 'LaTeX Theorems and Proofs: amsthm, Numbering, and QED',
  seoTitle: 'LaTeX Theorem and Proof Environments with amsthm',
  description:
    'Define a LaTeX theorem, lemma or definition with amsthm, share numbering, write proofs, and place the QED symbol correctly in equations.',
  keywords:
    'latex theorem, latex proof, amsthm, newtheorem, latex qed symbol, theorem numbering, definition environment',
}
const breadcrumbSchema = generateBreadcrumbSchema(getLearnBreadcrumbs(page.title, page.slug))
const LAST_UPDATED = '2026-11-19'
const faq: FaqItem[] = [
  {
    question: 'How do I define a theorem in LaTeX?',
    answer:
      'Load amsthm and declare \\newtheorem{theorem}{Theorem} in the preamble. Put the statement inside the theorem environment. amsthm supplies proof automatically, but you declare theorem-like statement environments yourself.',
  },
  {
    question: 'How do I share numbering between theorems and lemmas?',
    answer:
      'Declare the theorem first, then use \\newtheorem{lemma}[theorem]{Lemma}. The middle optional argument reuses the theorem counter. A final [section] on the theorem declaration resets that shared sequence by section.',
  },
  {
    question: 'Why is the QED square below my equation?',
    answer:
      'The automatic end mark is being placed after the display. Load amsmath before amsthm and put \\qedhere inside the last display at the intended location. Inspect the PDF, especially for multi-line or numbered equations.',
  },
  {
    question: 'How do I make an upright definition environment?',
    answer:
      'Issue \\theoremstyle{definition} before declaring the definition with \\newtheorem. The style is selected at declaration time. Use the theorem counter in the declaration if definitions should share the result sequence.',
  },
]
const sections: { title: string; paragraphs: string[]; code?: string }[] = [
  {
    title: 'Start with a complete theorem and proof',
    paragraphs: [
      'amsthm supplies the proof environment and theorem-formatting tools, but it does not automatically create an environment named theorem. The \\newtheorem declaration belongs in the preamble. Its first argument is the environment name used in the source; its second argument is the heading printed in the PDF.',
      'The statement and proof are separate blocks. A theorem states the result, while a proof explains why the result follows from its assumptions. Do not define proof with \\newtheorem: the existing proof environment has different behavior, including its automatic end mark and optional heading.',
      'The minimal example uses a single global theorem counter. It prints Theorem 1 followed by a proof whose last line ends with a hollow square. No special symbol package is required for that default mark. Keep this version working before adding shared counters, custom styles, or decorative boxes.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\newtheorem{theorem}{Theorem}\n\\begin{document}\n\\begin{theorem}\nThe sum of two even integers is even.\n\\end{theorem}\n\\begin{proof}\nLet $a=2r$ and $b=2s$ for integers $r$ and $s$.\nThen $a+b=2(r+s)$, which is even.\n\\end{proof}\n\\end{document}',
  },
  {
    title: 'Choose global, section, or shared numbering',
    paragraphs: [
      'With no optional counter argument, each declared environment receives its own counter. A theorem and a lemma can therefore both be numbered 1. That is valid, but a single shared sequence is often easier for readers because the next result always has the next number, regardless of its kind.',
      'Put [section] at the end of the theorem declaration to number results within sections. Theorems in section 2 then become 2.1, 2.2, and so on. Put [theorem] between the environment name and printed heading when declaring a lemma to make it share the existing theorem counter.',
      'These optional arguments have different positions and purposes. A final [section] creates a counter that resets with the section; a middle [theorem] reuses another counter. Do not declare independent section-based counters if you actually want theorems and lemmas to advance one sequence.',
      'In report or book, a chapter-based counter may be appropriate. Standard article has no chapter counter, so [chapter] produces an error there. Also, a section-based result before the first numbered section can be numbered 0.1. Add the intended numbered heading rather than manually changing each displayed result number.',
    ],
  },
  {
    title: 'Use theorem styles for definitions and remarks',
    paragraphs: [
      'amsthm provides three standard styles. plain uses a bold heading and italic body, suitable for theorems, lemmas, and corollaries. definition uses a bold heading with upright body text, useful for definitions and worked examples. remark uses an italic heading with an upright body.',
      'Apply \\theoremstyle before the declarations it should affect. The selected style is stored when an environment is defined; switching styles immediately before using an already-defined environment does not restyle that environment. Group related declarations in the preamble so the intended formatting is easy to audit.',
      'Use \\newtheorem* for an unnumbered environment, such as an informal remark. An unnumbered result does not provide a new result number for a normal cross-reference. If readers need to cite that remark elsewhere, a numbered declaration is usually the simpler and more robust choice.',
      'An optional argument on a theorem instance adds a name or attribution, such as [Euclid]. It is not the same as the counter options on the declaration. Keep the title short enough to fit a heading, and place lengthy historical notes or citations in the surrounding text when necessary.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\newtheorem{theorem}{Theorem}[section]\n\\newtheorem{lemma}[theorem]{Lemma}\n\\theoremstyle{definition}\n\\newtheorem{definition}[theorem]{Definition}\n\\theoremstyle{remark}\n\\newtheorem*{remark}{Remark}\n\\begin{document}\n\\section{Integers}\n\\begin{definition}\nAn integer $n$ is even if $n=2k$ for some integer $k$.\n\\end{definition}\n\\begin{lemma}\nEvery multiple of four is even.\n\\end{lemma}\n\\begin{proof}\nIf $n=4k$, then $n=2(2k)$.\n\\end{proof}\n\\begin{theorem}[Closure under addition]\nThe sum of two even integers is even.\n\\end{theorem}\n\\begin{proof}\nWrite the integers as $2r$ and $2s$, and add them.\n\\end{proof}\n\\begin{remark}\nThe definition, lemma, and theorem share one counter.\n\\end{remark}\n\\end{document}',
  },
  {
    title: 'Reference a theorem without hard-coding its number',
    paragraphs: [
      'Place \\label just inside the theorem environment, after its opening command. At that point the result counter has advanced, so the label records the correct number. A label before the environment can capture the preceding section or another counter instead, even though the source still compiles.',
      'Write Theorem~\\ref{thm:main} to produce a named reference with a nonbreaking space. Choose descriptive label keys rather than embedding the current number in the key. Then inserting a new lemma earlier in the file updates references without renaming labels or editing prose by hand.',
      'Compile twice after adding or moving labels. The first run writes the number to the auxiliary file, and the next run reads it. If question marks remain, check the exact label spelling, duplicate-label warnings, and whether the labeled material is actually included in the document.',
      'hyperref makes references clickable when loaded appropriately for the template. cleveref can add names automatically, but shared-counter naming deserves a check in the resulting PDF. For a small document, explicit wording plus \\ref avoids adding another package merely to save a few characters.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\usepackage[hidelinks]{hyperref}\n\\newtheorem{theorem}{Theorem}\n\\begin{document}\n\\begin{theorem}[Euclid]\n\\label{thm:primes}\nThere are infinitely many primes.\n\\end{theorem}\n\\begin{proof}[Proof of Theorem~\\ref{thm:primes}]\nSuppose the primes form a finite list $p_1,\\ldots,p_n$.\nThe integer $p_1\\cdots p_n+1$ has a prime divisor\ndifferent from every prime on the list, a contradiction.\n\\end{proof}\nTheorem~\\ref{thm:primes} rules out a largest prime.\n\\end{document}',
  },
  {
    title: 'Place the QED symbol after a displayed equation',
    paragraphs: [
      'The proof environment places its end mark automatically when it closes. If the proof ends with ordinary text, this normally gives the expected result. If it ends with displayed mathematics, the square can land on a separate line below the display instead of next to the final mathematical step.',
      'Use \\qedhere inside the final display to place the automatic mark there. Load amsmath before amsthm so the proof package can cooperate with the math environments. The example below uses an unnumbered equation, which is a straightforward choice when the final identity does not need its own reference.',
      'In a multi-line align environment, place \\qedhere on the final relevant row, before the environment closes. Numbered or unusually nested displays can need additional care; inspect the actual output rather than assuming the same placement works for every equation structure. A proof ending in a list similarly needs its mark checked on the last item.',
      'Do not add \\qed manually inside a normal proof just to move the square. That can leave both a manually inserted mark and the automatic closing mark. Use \\qedhere for placement, and avoid an empty paragraph immediately before \\end{proof}, which can also create an unwanted final line.',
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\begin{document}\n\\begin{proof}\nFor any real number $x$,\n\\begin{equation*}\n(x+1)^2-x^2=2x+1. \\qedhere\n\\end{equation*}\n\\end{proof}\n\n\\begin{proof}\nExpanding and collecting terms gives\n\\begin{align*}\n(x+1)^2 &= x^2+2x+1,\\\\\n(x+1)^2-x^2 &= 2x+1. \\qedhere\n\\end{align*}\n\\end{proof}\n\\end{document}',
  },
  {
    title: 'Change the proof heading or end symbol',
    paragraphs: [
      'An optional argument changes the proof heading, for example \\begin{proof}[Proof of the lemma] or [Proof sketch]. The heading is descriptive text, not a label declaration. A proof sketch should make clear which steps are omitted; the formatting cannot make an incomplete argument into a complete proof.',
      'The default square is controlled by \\qedsymbol. To use a filled square, load amssymb and redefine it to a math-mode \\blacksquare. Put the redefinition in the preamble for a document-wide change. Avoid inserting the raw Unicode square into a pdfLaTeX source file when a supported command is available.',
      "Outside a proof, amsthm's \\qed command can add an end mark to an informal solution. Inside a proof, let the environment manage it. If a journal requires no end mark, an empty \\qedsymbol redefinition removes it, but follow the publisher's style rather than changing it solely for decoration.",
    ],
    code: '\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{amsthm}\n\\renewcommand{\\qedsymbol}{$\\blacksquare$}\n\\begin{document}\n\\begin{proof}[Proof sketch]\nApply the preceding identity and simplify.\n\\end{proof}\n\\end{document}',
  },
  {
    title: 'Fix common errors and respect existing templates',
    paragraphs: [
      'Environment theorem undefined means the environment was not declared, or its source name differs from the declaration. Environment proof undefined usually means amsthm is missing and the class does not supply an equivalent. Check the template first: AMS classes already include theorem support, so avoid defining a second proof environment.',
      'If a command is already defined, look for duplicate declarations or competing theorem packages. amsthm and ntheorem are alternative systems, not packages to stack indiscriminately. A publisher may already define theorem names and counters; reuse its definitions or follow its documented customization interface.',
      'For boxed results, a package such as tcolorbox can provide a separate presentation layer, but its counters and labels must be configured deliberately. Establish correct statements, numbering, and references with the plain environment first. Then test the styling on a long theorem that crosses a page, not only a one-line example.',
      'Before delivery, inspect every theorem heading, the first result after each section, all references, and every proof-ending display. A clean compile does not catch a wrong label location, an unintended independent lemma counter, or a square that sits awkwardly below the last equation.',
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
        datePublished="2026-10-17"
        dateModified={LAST_UPDATED}
        faq={faq}
      />
      <div className="container">
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h1>{page.title}</h1>
          <p className="lead">
            {
              'For a LaTeX theorem and proof, load amsmath followed by amsthm, declare the theorem with \\newtheorem{theorem}{Theorem}, and write the statement inside a theorem environment. Write its argument in the separate proof environment. amsthm adds the proof heading and an end-of-proof square automatically.'
            }
          </p>
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
              <Link href="/learn/equation-numbering">Equation numbering</Link>
            </li>
            <li>
              <Link href="/learn/mathematical-expressions">Mathematical expressions</Link>
            </li>
            <li>
              <Link href="/learn/environments">LaTeX environments</Link>
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
