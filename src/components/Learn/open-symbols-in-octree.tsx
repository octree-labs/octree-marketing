import React from 'react'

import { OpenInOctree } from '@/components/OpenInOctree'

/**
 * Starter documents for the symbol guides: a short article that already uses
 * a handful of the symbols on the page (inline, displayed and in text mode),
 * so a visitor who came to copy one command lands in the editor with them
 * compiling. Each compiles as is with pdfLaTeX.
 */
export const LATEX_SYMBOLS_STARTER = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}

\\title{LaTeX Symbols}
\\date{}

\\begin{document}
\\maketitle

\\section{Inline}
Operators and relations: $a \\pm b$, $3 \\times 4$, $x \\leq y$, $\\alpha \\neq \\beta$, $\\pi \\approx 3.14$.

Sets and logic: $A \\subseteq B$, $x \\in \\mathbb{R}$, $A \\cap B = \\varnothing$, $p \\implies q$.

Arrows: $f \\colon A \\to B$, $x \\mapsto x^2$, $P \\Rightarrow Q$, $x \\rightarrow \\infty$.

\\section{Displayed}
\\begin{equation}
  \\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}, \\qquad
  \\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}
\\end{equation}
\\[
  \\forall \\varepsilon > 0 \\; \\exists \\delta > 0 :
  |x - a| < \\delta \\implies |f(x) - f(a)| < \\varepsilon
\\]

\\section{Text mode}
50\\% off, R\\&D, item \\#3, \\$5, 25\\textdegree{}C, \\S 2.1.

% Edit the lines above or add your own; the PDF updates when you compile.
\\end{document}
`

export const GREEK_SYMBOLS_STARTER = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}

\\title{Greek Letters and Math Symbols}
\\date{}

\\begin{document}
\\maketitle

\\section{Greek letters}
Lowercase: $\\alpha, \\beta, \\gamma, \\delta, \\varepsilon, \\theta, \\lambda, \\mu, \\pi, \\sigma, \\phi, \\omega$.

Uppercase: $\\Gamma, \\Delta, \\Theta, \\Lambda, \\Sigma, \\Phi, \\Omega$.

\\section{In formulas}
The mean is $\\mu$ and the standard deviation $\\sigma$, with
\\begin{equation}
  \\sigma^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\mu)^2 .
\\end{equation}
\\[
  e^{i\\pi} + 1 = 0, \\qquad
  \\Delta E = \\hbar \\omega, \\qquad
  \\lambda \\in \\mathbb{C}, \\qquad
  \\theta \\approx 0.785
\\]

\\section{Symbols}
$a \\pm b$, $x \\leq y$, $A \\subseteq B$, $p \\Rightarrow q$, $\\nabla f$, $\\partial_x u$, $\\infty$, $\\ldots$

% Edit the lines above or add your own; the PDF updates when you compile.
\\end{document}
`

const COPY = 'Try these symbols in a real document: opens a compilable starter file in Octree, the free LaTeX editor with AI.'

/**
 * "Open these symbols in Octree" box for the symbol guides. `source` is the
 * analytics placement (cta_impression / open_in_octree_clicked) and the draft
 * source, e.g. `www:learn:latex-symbols:symbols-top`.
 */
export function OpenSymbolsInOctree({
  latex,
  title,
  source,
}: {
  latex: string
  title: string
  source: string
}) {
  return (
    <OpenInOctree
      latex={latex}
      title={title}
      source={source}
      raw
      label="Open these symbols in Octree"
      copy={COPY}
    />
  )
}
