import type { Metadata } from 'next/types'

import { learnMetadata, type FaqItem } from '@/utilities/learnMetadata'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import {
  generateBreadcrumbSchema,
  getLearnBreadcrumbs,
} from '@/utilities/generateBreadcrumbs'
import { RelatedPosts } from '@/components/Learn/related-posts'
import { LearnSchema } from '@/components/Learn/schema'

export const dynamic = 'force-static'
export const revalidate = 3600

const breadcrumbs = getLearnBreadcrumbs('LaTeX Symbols', 'latex-symbols')
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

const page = {
  slug: 'latex-symbols',
  title: 'LaTeX Symbols: The Complete List (Math, Greek, Arrows, Sets, Logic)',
  seoTitle: 'LaTeX Symbols: Complete List (Math, Greek, Arrows)',
  description: 'Every common LaTeX symbol with its command and package: math operators, Greek letters, relations (\\approx), logic, sets, arrows, brackets, \\# and \\sum.',
  keywords: 'latex symbols, symbols in latex, latex symbol, symbol latex, latex math symbols, math symbols latex, latex mathematical symbols, greek symbols math, greek symbols in math, latex greek symbols, latex approximately symbol, latex about symbol, latex approx, latex and symbol, latex land, latex wedge, latex # symbol, latex hash symbol, latex sum symbol, latex sum with limits, latex integral symbol, latex arrow symbols, latex set symbols, latex logic symbols, latex relation symbols, latex brackets, latex special characters, amssymb symbols, latex symbol list',
}

/** Last content update, used for dateModified in the article schema. */
const LAST_UPDATED = '2026-11-09'

const TOOLS = 'https://tools.useoctree.com/symbols'

const faq: FaqItem[] = [
  {
    question: 'How do I write symbols in LaTeX?',
    answer:
      'Most LaTeX symbols are commands that start with a backslash and only work in math mode: write $\\alpha$, $\\leq$ or $\\infty$ inside dollar signs in a sentence, or inside \\[ ... \\] on a line of their own. Many extra symbols (\\mathbb{R}, \\therefore, \\varnothing) need \\usepackage{amssymb}. To find the command for a symbol you can see but not name, search the Octree symbols reference or draw it in Detexify.',
  },
  {
    question: 'Which package do I need for math symbols in LaTeX?',
    answer:
      'The basic operators, relations, arrows and Greek letters are built into LaTeX. Load \\usepackage{amssymb} for the AMS symbol fonts (\\mathbb, \\therefore, \\nexists, \\varnothing, \\lesssim) and \\usepackage{amsmath} for \\implies, \\iff, \\iint, \\text and \\xrightarrow. Loading both in every document that has math is the usual habit.',
  },
  {
    question: 'What is the LaTeX approximately symbol?',
    answer:
      'The LaTeX approximately symbol is \\approx, which prints ≈ in math mode: $\\pi \\approx 3.14$. It needs no package. Related commands are \\sim (∼, same order of magnitude), \\simeq (≃, asymptotically equal) and \\cong (≅, congruent or isomorphic).',
  },
  {
    question: 'How do I type the # symbol in LaTeX?',
    answer:
      'The # symbol in LaTeX is \\#. A bare # is reserved for macro arguments (#1, #2), so typing it in text gives the error “You can’t use macro parameter character # in horizontal mode”. \\# works in both text and math mode, and in a URL inside \\url{...} you can type # directly.',
  },
  {
    question: 'What is the LaTeX and symbol?',
    answer:
      'For logical AND (∧) the LaTeX and symbol is \\land, or its synonym \\wedge; logical OR (∨) is \\lor or \\vee, and NOT (¬) is \\lnot or \\neg. For the ampersand character & in text, write \\&, because a bare & separates table columns.',
  },
  {
    question: 'How do I write the sum symbol with limits in LaTeX?',
    answer:
      'Write \\sum_{i=1}^{n} a_i in math mode. In a display (\\[ ... \\]) the limits go above and below the ∑; inline ($...$) they go to the side to keep the line height small. Force them above and below inline with \\sum\\limits_{i=1}^{n} or \\displaystyle, and to the side in a display with \\sum\\nolimits.',
  },
]

type SymbolRow = {
  /** Rendered glyph(s). */
  glyph: string
  /** LaTeX source, shown in a code span. */
  cmd: string
  /** Required package, or '' when the command is built in. */
  pkg: string
  meaning: string
  /** `<category>/<slug>` of the tools.useoctree.com symbol page, when one exists. */
  tool?: string
}

const mathRows: SymbolRow[] = [
  { glyph: '+', cmd: '+', pkg: '', meaning: 'Addition', tool: 'math/addition' },
  { glyph: '−', cmd: '-', pkg: '', meaning: 'Subtraction, minus sign', tool: 'math/subtraction' },
  { glyph: '±', cmd: String.raw`\pm`, pkg: '', meaning: 'Plus or minus', tool: 'math/plus-minus' },
  { glyph: '∓', cmd: String.raw`\mp`, pkg: '', meaning: 'Minus or plus' },
  { glyph: '×', cmd: String.raw`\times`, pkg: '', meaning: 'Multiplication, cross product', tool: 'math/multiplication' },
  { glyph: '÷', cmd: String.raw`\div`, pkg: '', meaning: 'Division', tool: 'math/division' },
  { glyph: '⋅', cmd: String.raw`\cdot`, pkg: '', meaning: 'Multiplication dot, dot product', tool: 'math/dot-product' },
  { glyph: '∗', cmd: String.raw`\ast`, pkg: '', meaning: 'Asterisk, convolution', tool: 'operators/asterisk' },
  { glyph: '∘', cmd: String.raw`\circ`, pkg: '', meaning: 'Function composition', tool: 'operators/composition' },
  { glyph: '•', cmd: String.raw`\bullet`, pkg: '', meaning: 'Bullet operator', tool: 'operators/bullet' },
  { glyph: 'a⁄b', cmd: String.raw`\frac{a}{b}`, pkg: '', meaning: 'Fraction', tool: 'math/fraction' },
  { glyph: '√x', cmd: String.raw`\sqrt{x}`, pkg: '', meaning: 'Square root', tool: 'math/square-root' },
  { glyph: 'ⁿ√x', cmd: String.raw`\sqrt[n]{x}`, pkg: '', meaning: 'n-th root', tool: 'math/n-th-root' },
  { glyph: '∞', cmd: String.raw`\infty`, pkg: '', meaning: 'Infinity', tool: 'math/infinity' },
  { glyph: '∂', cmd: String.raw`\partial`, pkg: '', meaning: 'Partial derivative', tool: 'math/partial-derivative' },
  { glyph: '∇', cmd: String.raw`\nabla`, pkg: '', meaning: 'Nabla, gradient', tool: 'math/nabla' },
  { glyph: '⊕', cmd: String.raw`\oplus`, pkg: '', meaning: 'Direct sum, XOR', tool: 'operators/direct-sum' },
  { glyph: '⊗', cmd: String.raw`\otimes`, pkg: '', meaning: 'Tensor product', tool: 'operators/tensor-product' },
]

type GreekRow = {
  name: string
  lower: [string, string]
  /** Uppercase glyph and command; command is null when the capital is a Latin letter. */
  upper: [string, string | null]
  variant?: [string, string]
  meaning: string
  /** Tool slugs: lowercase, uppercase, variant. */
  tools: { lower?: string; upper?: string; variant?: string }
}

const greekRows: GreekRow[] = [
  { name: 'Alpha', lower: ['α', String.raw`\alpha`], upper: ['A', null], meaning: 'Angles, significance level', tools: { lower: 'greek/alpha' } },
  { name: 'Beta', lower: ['β', String.raw`\beta`], upper: ['B', null], meaning: 'Angles, regression coefficients', tools: { lower: 'greek/beta' } },
  { name: 'Gamma', lower: ['γ', String.raw`\gamma`], upper: ['Γ', String.raw`\Gamma`], meaning: 'Gamma function, Lorentz factor', tools: { lower: 'greek/gamma', upper: 'greek/gamma-upper' } },
  { name: 'Delta', lower: ['δ', String.raw`\delta`], upper: ['Δ', String.raw`\Delta`], meaning: 'Change, small quantity, Laplacian', tools: { lower: 'greek/delta', upper: 'greek/delta-upper' } },
  { name: 'Epsilon', lower: ['ϵ', String.raw`\epsilon`], upper: ['E', null], variant: ['ε', String.raw`\varepsilon`], meaning: 'Small positive number, permittivity', tools: { lower: 'greek/epsilon', variant: 'greek/epsilon-variant' } },
  { name: 'Zeta', lower: ['ζ', String.raw`\zeta`], upper: ['Z', null], meaning: 'Riemann zeta function, damping ratio', tools: { lower: 'greek/zeta' } },
  { name: 'Eta', lower: ['η', String.raw`\eta`], upper: ['H', null], meaning: 'Efficiency, learning rate', tools: { lower: 'greek/eta' } },
  { name: 'Theta', lower: ['θ', String.raw`\theta`], upper: ['Θ', String.raw`\Theta`], variant: ['ϑ', String.raw`\vartheta`], meaning: 'Angles, parameters, Big-Theta', tools: { lower: 'greek/theta', upper: 'greek/theta-upper' } },
  { name: 'Iota', lower: ['ι', String.raw`\iota`], upper: ['I', null], meaning: 'Inclusion map, index', tools: { lower: 'greek/iota' } },
  { name: 'Kappa', lower: ['κ', String.raw`\kappa`], upper: ['K', null], variant: ['ϰ', String.raw`\varkappa`], meaning: 'Curvature, condition number', tools: { lower: 'greek/kappa' } },
  { name: 'Lambda', lower: ['λ', String.raw`\lambda`], upper: ['Λ', String.raw`\Lambda`], meaning: 'Eigenvalue, wavelength', tools: { lower: 'greek/lambda', upper: 'greek/lambda-upper' } },
  { name: 'Mu', lower: ['μ', String.raw`\mu`], upper: ['M', null], meaning: 'Mean, micro, friction coefficient', tools: { lower: 'greek/mu' } },
  { name: 'Nu', lower: ['ν', String.raw`\nu`], upper: ['N', null], meaning: 'Frequency, degrees of freedom', tools: { lower: 'greek/nu' } },
  { name: 'Xi', lower: ['ξ', String.raw`\xi`], upper: ['Ξ', String.raw`\Xi`], meaning: 'Random variable, damping', tools: { lower: 'greek/xi', upper: 'greek/xi-upper' } },
  { name: 'Omicron', lower: ['o', 'o'], upper: ['O', null], meaning: 'Rarely used (looks like o)', tools: {} },
  { name: 'Pi', lower: ['π', String.raw`\pi`], upper: ['Π', String.raw`\Pi`], variant: ['ϖ', String.raw`\varpi`], meaning: 'π ≈ 3.14159, product (Π)', tools: { lower: 'greek/pi', upper: 'greek/pi-upper' } },
  { name: 'Rho', lower: ['ρ', String.raw`\rho`], upper: ['P', null], variant: ['ϱ', String.raw`\varrho`], meaning: 'Density, correlation', tools: { lower: 'greek/rho' } },
  { name: 'Sigma', lower: ['σ', String.raw`\sigma`], upper: ['Σ', String.raw`\Sigma`], variant: ['ς', String.raw`\varsigma`], meaning: 'Standard deviation, covariance matrix (Σ)', tools: { lower: 'greek/sigma', upper: 'greek/sigma-upper' } },
  { name: 'Tau', lower: ['τ', String.raw`\tau`], upper: ['T', null], meaning: 'Time constant, torque', tools: { lower: 'greek/tau' } },
  { name: 'Upsilon', lower: ['υ', String.raw`\upsilon`], upper: ['Υ', String.raw`\Upsilon`], meaning: 'Rare; particle physics', tools: { lower: 'greek/upsilon', upper: 'greek/upsilon-upper' } },
  { name: 'Phi', lower: ['ϕ', String.raw`\phi`], upper: ['Φ', String.raw`\Phi`], variant: ['φ', String.raw`\varphi`], meaning: 'Golden ratio, angle, flux (Φ)', tools: { lower: 'greek/phi', upper: 'greek/phi-upper' } },
  { name: 'Chi', lower: ['χ', String.raw`\chi`], upper: ['X', null], meaning: 'Chi-squared, characteristic function', tools: { lower: 'greek/chi' } },
  { name: 'Psi', lower: ['ψ', String.raw`\psi`], upper: ['Ψ', String.raw`\Psi`], meaning: 'Wave function', tools: { lower: 'greek/psi', upper: 'greek/psi-upper' } },
  { name: 'Omega', lower: ['ω', String.raw`\omega`], upper: ['Ω', String.raw`\Omega`], meaning: 'Angular frequency, ohm (Ω)', tools: { lower: 'greek/omega', upper: 'greek/omega-upper' } },
]

const relationRows: SymbolRow[] = [
  { glyph: '=', cmd: '=', pkg: '', meaning: 'Equal to' },
  { glyph: '≠', cmd: String.raw`\neq`, pkg: '', meaning: 'Not equal to (also \\ne)', tool: 'math/not-equal' },
  { glyph: '≈', cmd: String.raw`\approx`, pkg: '', meaning: 'Approximately equal to', tool: 'math/approximately-equal' },
  { glyph: '≡', cmd: String.raw`\equiv`, pkg: '', meaning: 'Identical to, congruent modulo n', tool: 'relations/equivalent' },
  { glyph: '<', cmd: '<', pkg: '', meaning: 'Less than', tool: 'relations/less-than' },
  { glyph: '>', cmd: '>', pkg: '', meaning: 'Greater than', tool: 'relations/greater-than' },
  { glyph: '≤', cmd: String.raw`\leq`, pkg: '', meaning: 'Less than or equal to (also \\le)', tool: 'math/less-than-or-equal' },
  { glyph: '≥', cmd: String.raw`\geq`, pkg: '', meaning: 'Greater than or equal to (also \\ge)', tool: 'math/greater-than-or-equal' },
  { glyph: '≪', cmd: String.raw`\ll`, pkg: '', meaning: 'Much less than', tool: 'relations/much-less-than' },
  { glyph: '≫', cmd: String.raw`\gg`, pkg: '', meaning: 'Much greater than', tool: 'relations/much-greater-than' },
  { glyph: '∝', cmd: String.raw`\propto`, pkg: '', meaning: 'Proportional to', tool: 'relations/proportional-to' },
  { glyph: '∼', cmd: String.raw`\sim`, pkg: '', meaning: 'Similar to, same order, distributed as', tool: 'relations/similar-to' },
  { glyph: '≃', cmd: String.raw`\simeq`, pkg: '', meaning: 'Asymptotically equal, homotopy equivalent', tool: 'geometry/similar-or-equal' },
  { glyph: '≅', cmd: String.raw`\cong`, pkg: '', meaning: 'Congruent, isomorphic', tool: 'relations/congruent' },
  { glyph: '≍', cmd: String.raw`\asymp`, pkg: '', meaning: 'Asymptotic, same growth rate', tool: 'relations/asymptotic' },
  { glyph: '≐', cmd: String.raw`\doteq`, pkg: '', meaning: 'Approaches the limit, defined as' },
  { glyph: '≜', cmd: String.raw`\triangleq`, pkg: 'amssymb', meaning: 'Defined as', tool: 'relations/triangle-equal' },
  { glyph: '≔', cmd: String.raw`\coloneqq`, pkg: 'mathtools', meaning: 'Assignment, defined as' },
  { glyph: '⊥', cmd: String.raw`\perp`, pkg: '', meaning: 'Perpendicular, orthogonal', tool: 'relations/perpendicular' },
  { glyph: '∥', cmd: String.raw`\parallel`, pkg: '', meaning: 'Parallel', tool: 'relations/parallel' },
]

const logicSetRows: SymbolRow[] = [
  { glyph: '∧', cmd: String.raw`\land`, pkg: '', meaning: 'Logical AND (same as \\wedge)', tool: 'logic/logical-and' },
  { glyph: '∨', cmd: String.raw`\lor`, pkg: '', meaning: 'Logical OR (same as \\vee)', tool: 'logic/logical-or' },
  { glyph: '¬', cmd: String.raw`\neg`, pkg: '', meaning: 'Logical NOT (same as \\lnot)', tool: 'logic/negation' },
  { glyph: '⟹', cmd: String.raw`\implies`, pkg: 'amsmath', meaning: 'Implies (short form: \\Rightarrow)', tool: 'math/implies' },
  { glyph: '⟺', cmd: String.raw`\iff`, pkg: 'amsmath', meaning: 'If and only if (short form: \\Leftrightarrow)', tool: 'math/if-and-only-if' },
  { glyph: '∀', cmd: String.raw`\forall`, pkg: '', meaning: 'For all', tool: 'math/for-all' },
  { glyph: '∃', cmd: String.raw`\exists`, pkg: '', meaning: 'There exists', tool: 'math/exists' },
  { glyph: '∄', cmd: String.raw`\nexists`, pkg: 'amssymb', meaning: 'There does not exist', tool: 'logic/not-exists' },
  { glyph: '∴', cmd: String.raw`\therefore`, pkg: 'amssymb', meaning: 'Therefore', tool: 'logic/therefore' },
  { glyph: '∵', cmd: String.raw`\because`, pkg: 'amssymb', meaning: 'Because', tool: 'logic/because' },
  { glyph: '⊢', cmd: String.raw`\vdash`, pkg: '', meaning: 'Proves, entails', tool: 'logic/proves' },
  { glyph: '∈', cmd: String.raw`\in`, pkg: '', meaning: 'Element of', tool: 'math/element-of' },
  { glyph: '∉', cmd: String.raw`\notin`, pkg: '', meaning: 'Not an element of', tool: 'math/not-element-of' },
  { glyph: '⊂', cmd: String.raw`\subset`, pkg: '', meaning: 'Proper subset', tool: 'math/subset' },
  { glyph: '⊆', cmd: String.raw`\subseteq`, pkg: '', meaning: 'Subset or equal', tool: 'relations/subset-or-equal' },
  { glyph: '∪', cmd: String.raw`\cup`, pkg: '', meaning: 'Union', tool: 'math/union' },
  { glyph: '∩', cmd: String.raw`\cap`, pkg: '', meaning: 'Intersection', tool: 'math/intersection' },
  { glyph: '∖', cmd: String.raw`\setminus`, pkg: '', meaning: 'Set difference', tool: 'operators/set-minus' },
  { glyph: '∅', cmd: String.raw`\emptyset`, pkg: '', meaning: 'Empty set', tool: 'math/empty-set' },
  { glyph: '⌀', cmd: String.raw`\varnothing`, pkg: 'amssymb', meaning: 'Empty set (rounder form)', tool: 'set-theory/empty-set-variant' },
  { glyph: 'ℝ', cmd: String.raw`\mathbb{R}`, pkg: 'amssymb', meaning: 'Real numbers (also ℕ ℤ ℚ ℂ)', tool: 'set-theory/real-numbers' },
]

const arrowRows: SymbolRow[] = [
  { glyph: '→', cmd: String.raw`\to`, pkg: '', meaning: 'Maps to (a set), tends to; same as \\rightarrow', tool: 'arrows/right-arrow' },
  { glyph: '←', cmd: String.raw`\leftarrow`, pkg: '', meaning: 'Left arrow, assignment (also \\gets)', tool: 'arrows/left-arrow' },
  { glyph: '↔', cmd: String.raw`\leftrightarrow`, pkg: '', meaning: 'Left-right arrow', tool: 'arrows/left-right-arrow' },
  { glyph: '⇒', cmd: String.raw`\Rightarrow`, pkg: '', meaning: 'Implies (short double arrow)', tool: 'arrows/right-arrow-double' },
  { glyph: '⇐', cmd: String.raw`\Leftarrow`, pkg: '', meaning: 'Is implied by', tool: 'arrows/left-arrow-double' },
  { glyph: '⇔', cmd: String.raw`\Leftrightarrow`, pkg: '', meaning: 'Equivalent (short double arrow)', tool: 'arrows/left-right-arrow-double' },
  { glyph: '⟶', cmd: String.raw`\longrightarrow`, pkg: '', meaning: 'Long right arrow', tool: 'arrows/long-right-arrow' },
  { glyph: '⟹', cmd: String.raw`\Longrightarrow`, pkg: '', meaning: 'Long double right arrow', tool: 'arrows/long-right-arrow-double' },
  { glyph: '⟷', cmd: String.raw`\longleftrightarrow`, pkg: '', meaning: 'Long left-right arrow', tool: 'arrows/long-left-right-arrow' },
  { glyph: '↦', cmd: String.raw`\mapsto`, pkg: '', meaning: 'Maps to (an element)', tool: 'arrows/maps-to' },
  { glyph: '⟼', cmd: String.raw`\longmapsto`, pkg: '', meaning: 'Long maps to', tool: 'arrows/long-maps-to' },
  { glyph: '↑', cmd: String.raw`\uparrow`, pkg: '', meaning: 'Up arrow, increasing', tool: 'arrows/up-arrow' },
  { glyph: '↓', cmd: String.raw`\downarrow`, pkg: '', meaning: 'Down arrow, decreasing', tool: 'arrows/down-arrow' },
  { glyph: '↕', cmd: String.raw`\updownarrow`, pkg: '', meaning: 'Up-down arrow', tool: 'arrows/up-down-arrow' },
  { glyph: '↗', cmd: String.raw`\nearrow`, pkg: '', meaning: 'North-east arrow', tool: 'arrows/northeast-arrow' },
  { glyph: '↘', cmd: String.raw`\searrow`, pkg: '', meaning: 'South-east arrow', tool: 'arrows/southeast-arrow' },
  { glyph: '↪', cmd: String.raw`\hookrightarrow`, pkg: '', meaning: 'Injection, embedding', tool: 'arrows/hook-right-arrow' },
  { glyph: '⇌', cmd: String.raw`\rightleftharpoons`, pkg: '', meaning: 'Chemical equilibrium', tool: 'chemistry/equilibrium-arrow' },
  { glyph: '→ᶠ', cmd: String.raw`\xrightarrow{f}`, pkg: 'amsmath', meaning: 'Arrow that stretches under a label' },
]

const bracketRows: SymbolRow[] = [
  { glyph: '( )', cmd: String.raw`\left( x \right)`, pkg: '', meaning: 'Parentheses that grow with their content', tool: 'brackets/parentheses' },
  { glyph: '[ ]', cmd: String.raw`\left[ x \right]`, pkg: '', meaning: 'Square brackets, closed interval', tool: 'brackets/square-brackets' },
  { glyph: '{ }', cmd: String.raw`\left\{ x \right\}`, pkg: '', meaning: 'Curly braces, sets (escape with \\)', tool: 'brackets/curly-braces' },
  { glyph: '⟨ ⟩', cmd: String.raw`\langle x \rangle`, pkg: '', meaning: 'Angle brackets, inner product', tool: 'brackets/angle-brackets' },
  { glyph: '| |', cmd: String.raw`\left| x \right|`, pkg: '', meaning: 'Absolute value (or \\lvert x \\rvert)', tool: 'brackets/vertical-bar' },
  { glyph: '‖ ‖', cmd: String.raw`\| x \|`, pkg: '', meaning: 'Norm (or \\lVert x \\rVert)', tool: 'brackets/norm' },
  { glyph: '⌊ ⌋', cmd: String.raw`\lfloor x \rfloor`, pkg: '', meaning: 'Floor', tool: 'brackets/floor' },
  { glyph: '⌈ ⌉', cmd: String.raw`\lceil x \rceil`, pkg: '', meaning: 'Ceiling', tool: 'brackets/ceiling' },
  { glyph: '⟦ ⟧', cmd: String.raw`\llbracket x \rrbracket`, pkg: 'stmaryrd', meaning: 'Double brackets, semantics', tool: 'brackets/double-brackets' },
  { glyph: '[ )', cmd: String.raw`\left[ x \right)`, pkg: '', meaning: 'Half-open interval', tool: 'brackets/half-open-interval-brackets' },
  { glyph: 'x )', cmd: String.raw`\left. x \right)`, pkg: '', meaning: 'One-sided delimiter (invisible \\left.)', tool: 'brackets/right-delimiter-with-invisible-left' },
  { glyph: '( )', cmd: String.raw`\Big( x \Big)`, pkg: '', meaning: 'Manual size: \\big, \\Big, \\bigg, \\Bigg', tool: 'brackets/big-parentheses' },
]

const textRows: SymbolRow[] = [
  { glyph: '#', cmd: String.raw`\#`, pkg: '', meaning: 'Hash, number sign' },
  { glyph: '$', cmd: String.raw`\$`, pkg: '', meaning: 'Dollar sign', tool: 'finance/dollar-sign' },
  { glyph: '%', cmd: String.raw`\%`, pkg: '', meaning: 'Percent sign', tool: 'finance/percent-sign' },
  { glyph: '&', cmd: String.raw`\&`, pkg: '', meaning: 'Ampersand' },
  { glyph: '_', cmd: String.raw`\_`, pkg: '', meaning: 'Underscore' },
  { glyph: '{ }', cmd: String.raw`\{ \}`, pkg: '', meaning: 'Curly braces' },
  { glyph: '~', cmd: String.raw`\textasciitilde`, pkg: '', meaning: 'Tilde (a bare ~ is a non-breaking space)' },
  { glyph: '^', cmd: String.raw`\textasciicircum`, pkg: '', meaning: 'Caret' },
  { glyph: '\\', cmd: String.raw`\textbackslash`, pkg: '', meaning: 'Backslash (\\\\ is a line break)' },
  { glyph: '°', cmd: String.raw`\textdegree`, pkg: '', meaning: 'Degree sign in text (math: ^\\circ)' },
  { glyph: '§', cmd: String.raw`\S`, pkg: '', meaning: 'Section sign' },
  { glyph: '¶', cmd: String.raw`\P`, pkg: '', meaning: 'Pilcrow, paragraph sign' },
  { glyph: '©', cmd: String.raw`\copyright`, pkg: '', meaning: 'Copyright' },
  { glyph: '†', cmd: String.raw`\dag`, pkg: '', meaning: 'Dagger in text (math: \\dagger)' },
  { glyph: '…', cmd: String.raw`\dots`, pkg: '', meaning: 'Ellipsis' },
  { glyph: '—', cmd: '---', pkg: '', meaning: 'Em dash (-- gives the en dash –)' },
]

const bigOpRows: SymbolRow[] = [
  { glyph: '∑', cmd: String.raw`\sum`, pkg: '', meaning: 'Sum (summation, sigma notation)', tool: 'summation/summation' },
  { glyph: '∑ᵢ₌₁ⁿ', cmd: String.raw`\sum_{i=1}^{n}`, pkg: '', meaning: 'Sum with lower and upper limits', tool: 'math/summation' },
  { glyph: '∑ₙ₌₀^∞', cmd: String.raw`\sum_{n=0}^{\infty}`, pkg: '', meaning: 'Infinite series', tool: 'summation/summation-to-infinity' },
  { glyph: '∑∑', cmd: String.raw`\sum_{i=1}^{m} \sum_{j=1}^{n}`, pkg: '', meaning: 'Double sum', tool: 'summation/double-sum' },
  { glyph: '∏', cmd: String.raw`\prod`, pkg: '', meaning: 'Product', tool: 'summation/product' },
  { glyph: '∐', cmd: String.raw`\coprod`, pkg: '', meaning: 'Coproduct', tool: 'summation/coproduct' },
  { glyph: '∫', cmd: String.raw`\int`, pkg: '', meaning: 'Integral', tool: 'calculus/integral' },
  { glyph: '∫ₐᵇ', cmd: String.raw`\int_{a}^{b}`, pkg: '', meaning: 'Definite integral', tool: 'math/integral' },
  { glyph: '∬', cmd: String.raw`\iint`, pkg: 'amsmath', meaning: 'Double integral', tool: 'calculus/double-integral' },
  { glyph: '∭', cmd: String.raw`\iiint`, pkg: 'amsmath', meaning: 'Triple integral', tool: 'calculus/triple-integral' },
  { glyph: '∮', cmd: String.raw`\oint`, pkg: '', meaning: 'Contour (closed line) integral', tool: 'calculus/contour-integral' },
  { glyph: 'lim', cmd: String.raw`\lim_{x \to \infty}`, pkg: '', meaning: 'Limit', tool: 'math/limit' },
  { glyph: '⋃', cmd: String.raw`\bigcup`, pkg: '', meaning: 'Union of a family of sets', tool: 'set-theory/big-union' },
  { glyph: '⋂', cmd: String.raw`\bigcap`, pkg: '', meaning: 'Intersection of a family of sets', tool: 'set-theory/big-intersection' },
  { glyph: '⨁', cmd: String.raw`\bigoplus`, pkg: '', meaning: 'Direct sum of a family', tool: 'summation/big-direct-sum' },
  { glyph: '⨂', cmd: String.raw`\bigotimes`, pkg: '', meaning: 'Tensor product of a family', tool: 'summation/big-tensor-product' },
  { glyph: '⋀', cmd: String.raw`\bigwedge`, pkg: '', meaning: 'Big AND, exterior product', tool: 'summation/big-wedge' },
  { glyph: '⋁', cmd: String.raw`\bigvee`, pkg: '', meaning: 'Big OR', tool: 'summation/big-vee' },
]

const ExtLink: React.FC<{ href: string; children: React.ReactNode; className?: string; title?: string }> = ({
  href,
  children,
  className,
  title,
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className={className} title={title}>
    {children}
  </Link>
)

const Glyph: React.FC<{ glyph: string; tool?: string; label: string }> = ({ glyph, tool, label }) =>
  tool ? (
    <ExtLink href={`${TOOLS}/${tool}`} className="whitespace-nowrap text-lg" title={`${label}: LaTeX symbol page`}>
      {glyph}
    </ExtLink>
  ) : (
    <span className="whitespace-nowrap text-lg">{glyph}</span>
  )

const SymbolTable: React.FC<{ rows: SymbolRow[] }> = ({ rows }) => (
  <div className="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Command</th>
          <th>Package</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.cmd}>
            <td><Glyph glyph={row.glyph} tool={row.tool} label={row.meaning} /></td>
            <td><code className="whitespace-nowrap">{row.cmd}</code></td>
            <td>{row.pkg ? <code>{row.pkg}</code> : <span className="text-muted-foreground">none</span>}</td>
            <td>{row.meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default async function LearnLatexSymbolsPage() {
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
          <h1>LaTeX Symbols: The Complete List (Math, Greek, Arrows, Sets, Logic)</h1>

          <div className="not-prose my-6 p-6 rounded-lg border bg-muted/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Quick answer</p>
            <ul className="space-y-2 text-base list-disc pl-5">
              <li>
                <strong>Math mode:</strong> almost every symbol is a backslash command that only works
                inside math: <code>$\alpha \leq \infty$</code> in a sentence, or{' '}
                <code>{`\\[ ... \\]`}</code> on its own line.
              </li>
              <li>
                <strong>Text mode:</strong> the reserved characters need a backslash:{' '}
                <code>{`\\# \\$ \\% \\& \\_ \\{ \\}`}</code>, plus <code>\textasciitilde</code>,{' '}
                <code>\textasciicircum</code> and <code>\textbackslash</code>.
              </li>
              <li>
                <strong>Packages:</strong> load <code>amsmath</code> and <code>amssymb</code>. Without
                amssymb, <code>{`\\mathbb{R}`}</code>, <code>\therefore</code> and{' '}
                <code>\varnothing</code> give &ldquo;Undefined control sequence&rdquo;.
              </li>
              <li>
                <strong>Find a symbol:</strong> search the{' '}
                <ExtLink href={TOOLS}>Octree symbols reference</ExtLink>, draw it in Detexify, or run{' '}
                <code>texdoc symbols</code> for the 200-page Comprehensive LaTeX Symbol List.
              </li>
            </ul>
            <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 text-sm"><code>{`\\documentclass{article}
\\usepackage{amsmath}   % \\implies, \\iint, \\text, \\xrightarrow
\\usepackage{amssymb}   % \\mathbb, \\therefore, \\varnothing, \\nexists

\\begin{document}
Inline: $x \\approx 3.14$, $\\alpha \\leq \\beta$, $A \\subseteq B$.

Displayed:
\\[
  \\forall \\varepsilon > 0 \; \\exists \\delta > 0 :
  |x - a| < \\delta \\implies |f(x) - f(a)| < \\varepsilon
\\]

Text mode: 50\\% off, R\\&D, item \\#3, a\\_b.
\\end{document}`}</code></pre>
          </div>
          <p className="lead">
            LaTeX has a command for every symbol you are likely to need, from ± and ≈ to ∀, ⇒ and
            ∑. This page is the complete list of the common ones, grouped the way you look for
            them: math operators, Greek symbols, relations, logic and sets, arrows, brackets,
            special characters in text and the big operators. Each table gives the symbol, the
            command, the package (if any) and what it usually means; click a symbol to open its
            own page with variants and copy-ready code. Every snippet compiles as shown.
          </p>

          {/* ── Math mode vs text mode ── */}
          <h2>Math Mode vs Text Mode</h2>
          <p>
            LaTeX typesets text and math differently, and most symbol commands exist in only one of
            the two. Math symbols (<code>\pm</code>, <code>\leq</code>, <code>\alpha</code>,{' '}
            <code>\rightarrow</code>) must be inside <code>$...$</code>, <code>{`\\( ... \\)`}</code>,{' '}
            <code>{`\\[ ... \\]`}</code> or an <code>equation</code>/<code>align</code> environment.
            Text symbols (<code>\#</code>, <code>\S</code>, <code>\textdegree</code>) belong in
            ordinary paragraphs. A few, such as <code>\$</code>, <code>\%</code>, <code>\#</code>{' '}
            and <code>\&amp;</code>, work in both. Using a math command in text is the cause of the
            &ldquo;Missing $ inserted&rdquo; error; see{' '}
            <Link href="/learn/mathematical-expressions">mathematical expressions</Link> for the
            basics of math mode.
          </p>
          <pre><code>{`\\documentclass{article}
\\usepackage{amssymb}
\\begin{document}
In text: 25\\textdegree{}C, \\S 2.1, \\copyright{} 2026, 10\\% and \\$5.

In math: $25^\\circ$, $a \\pm b$, $x \\in \\mathbb{R}$, $f \\colon A \\to B$.
\\end{document}`}</code></pre>

          {/* ── Math symbols ── */}
          <h2>Math Symbols in LaTeX</h2>
          <p>
            The arithmetic operators and the most used calculus symbols are built in; none of them
            needs a package. Use <code>\cdot</code> rather than <code>*</code> for multiplication and{' '}
            <code>\times</code> for the cross product or dimensions (3 × 4). All math symbols are
            listed in the <ExtLink href={`${TOOLS}/math`}>math symbols reference</ExtLink>, with more
            binary operators under <ExtLink href={`${TOOLS}/operators`}>operators</ExtLink>.
          </p>
          <SymbolTable rows={mathRows} />
          <pre><code>{`\\documentclass{article}
\\begin{document}
\\[
  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\qquad
  \\nabla f = \\left( \\frac{\\partial f}{\\partial x},
                    \\frac{\\partial f}{\\partial y} \\right), \\qquad
  (f \\circ g)(x), \\quad 3 \\times 4 \\div 2 \\cdot 5
\\]
\\end{document}`}</code></pre>

          {/* ── Greek ── */}
          <h2>Greek Symbols in Math</h2>
          <p>
            Greek symbols in math are written with the letter&apos;s English name:{' '}
            <code>\alpha</code>, <code>\beta</code>, <code>\pi</code>. A capitalised name gives the
            uppercase letter (<code>\Delta</code>, <code>\Omega</code>), but only where it looks
            different from a Latin letter; capital alpha is just <code>A</code>. The{' '}
            <code>\var...</code> commands are alternative shapes, and <code>\varkappa</code> is the
            only one that needs <code>amssymb</code>. All 24 letters are below; see the{' '}
            <ExtLink href={`${TOOLS}/greek`}>Greek letter symbols reference</ExtLink>, the{' '}
            <Link href="/learn/greek-alphabet">Greek alphabet</Link> page and{' '}
            <Link href="/learn/greek-letters-math-symbols">Greek letters in LaTeX</Link> for bold and
            upright Greek.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Command</th>
                  <th>Package</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {greekRows.map((row) => (
                  <tr key={row.name}>
                    <td className="whitespace-nowrap">
                      <Glyph glyph={row.lower[0]} tool={row.tools.lower} label={`${row.name} (lowercase)`} />{' '}
                      {row.upper[1] ? (
                        <Glyph glyph={row.upper[0]} tool={row.tools.upper} label={`${row.name} (uppercase)`} />
                      ) : null}{' '}
                      {row.variant ? (
                        <Glyph glyph={row.variant[0]} tool={row.tools.variant} label={`${row.name} (variant)`} />
                      ) : null}
                    </td>
                    <td>
                      <strong>{row.name}:</strong> <code>{row.lower[1]}</code>
                      {row.upper[1] ? <>, <code>{row.upper[1]}</code></> : <>, capital <code>{row.upper[0]}</code></>}
                      {row.variant ? <>, <code>{row.variant[1]}</code></> : null}
                    </td>
                    <td>
                      {row.name === 'Kappa' ? (
                        <><code>amssymb</code> <span className="text-muted-foreground">(variant)</span></>
                      ) : (
                        <span className="text-muted-foreground">none</span>
                      )}
                    </td>
                    <td>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre><code>{`\\documentclass{article}
\\usepackage{amssymb}
\\begin{document}
$\\alpha, \\beta, \\gamma, \\Gamma, \\delta, \\Delta, \\epsilon, \\varepsilon,
 \\theta, \\vartheta, \\kappa, \\varkappa, \\lambda, \\Lambda, \\mu, \\pi, \\Pi,
 \\sigma, \\Sigma, \\phi, \\varphi, \\Phi, \\psi, \\omega, \\Omega$

\\[
  \\Delta E = \\hbar \\omega, \\qquad
  \\sigma^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2
\\]
\\end{document}`}</code></pre>

          {/* ── Relations ── */}
          <h2>Relation Symbols</h2>
          <p>
            Relations compare two expressions, and LaTeX spaces them more widely than operators,
            so <code>a\leq b</code> and <code>a \leq b</code> look the same. The LaTeX
            approximately symbol is <code>\approx</code> (≈); it is also what people mean by the
            &ldquo;about&rdquo; symbol, and the{' '}
            <Link href="/learn/approximately-equal">approximately equal guide</Link> compares it with{' '}
            <code>\sim</code>, <code>\simeq</code> and <code>\cong</code>. Negate any relation with{' '}
            <code>\not</code> (<code>\not\approx</code>) or use a dedicated command such as{' '}
            <code>\neq</code>. More in the{' '}
            <ExtLink href={`${TOOLS}/relations`}>relation symbols reference</ExtLink>.
          </p>
          <SymbolTable rows={relationRows} />
          <pre><code>{`\\documentclass{article}
\\usepackage{amssymb}
\\usepackage{mathtools}
\\begin{document}
$\\pi \\approx 3.14159$, \\quad $x \\neq 0$, \\quad $a \\leq b < c$, \\quad
$17 \\equiv 2 \\pmod{5}$, \\quad $F \\propto \\frac{1}{r^2}$, \\quad
$X \\sim \\mathcal{N}(0, 1)$, \\quad $\\triangle ABC \\cong \\triangle DEF$, \\quad
$f(n) \\coloneqq n^2$, \\quad $u \\perp v$, \\quad $x \\not\\approx y$
\\end{document}`}</code></pre>

          {/* ── Mid CTA ── */}
          <div className="not-prose my-10 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Stop hunting for symbol commands</h3>
            <p className="text-muted-foreground mb-4">
              Describe the symbol or paste a screenshot of the equation, and Octree&apos;s AI writes
              the LaTeX, adds the right packages and compiles the PDF next to your code.
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

          {/* ── Logic and sets ── */}
          <h2>Logic and Set Symbols</h2>
          <p>
            The LaTeX and symbol is <code>\land</code> (or <code>\wedge</code>), which prints the
            logical AND ∧; OR is <code>\lor</code> (<code>\vee</code>) and NOT is{' '}
            <code>\neg</code> (<code>\lnot</code>). For the ampersand character &amp; itself, write{' '}
            <code>\&amp;</code>. The long arrows <code>\implies</code> and <code>\iff</code> come
            from <code>amsmath</code>, and <code>\therefore</code>, <code>\nexists</code>,{' '}
            <code>\varnothing</code> and <code>\mathbb</code> from <code>amssymb</code>. Browse the{' '}
            <ExtLink href={`${TOOLS}/logic`}>logic symbols</ExtLink> and{' '}
            <ExtLink href={`${TOOLS}/set-theory`}>set theory symbols</ExtLink> references for the
            rest, and <Link href="/learn/blackboard-bold">blackboard bold</Link> for ℕ, ℤ, ℚ, ℝ and
            ℂ.
          </p>
          <SymbolTable rows={logicSetRows} />
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\begin{document}
\\[
  (p \\land q) \\lor \\neg r, \\qquad
  p \\implies q \\iff \\neg q \\implies \\neg p
\\]
\\[
  \\forall x \\in \\mathbb{R} \; \\exists n \\in \\mathbb{N} : n > x, \\qquad
  A \\cap B = \\varnothing, \\qquad
  A \\setminus B \\subseteq A \\cup B
\\]
$x \\notin \\emptyset$, therefore $\\therefore$ and because $\\because$.
\\end{document}`}</code></pre>

          {/* ── Arrows ── */}
          <h2>Arrows</h2>
          <p>
            Arrow names follow a pattern: lowercase <code>\rightarrow</code> is a single arrow,
            capitalised <code>\Rightarrow</code> is double, and a <code>long</code> prefix makes it
            longer. <code>\to</code> is a short name for <code>\rightarrow</code> and{' '}
            <code>\gets</code> for <code>\leftarrow</code>. For an arrow with text above it use{' '}
            <code>{`\\xrightarrow{text}`}</code> from amsmath, which stretches to fit. The{' '}
            <ExtLink href={`${TOOLS}/arrows`}>arrow symbols reference</ExtLink> lists harpoons and
            every diagonal.
          </p>
          <SymbolTable rows={arrowRows} />
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\begin{document}
\\[
  f \\colon \\mathbb{R} \\to \\mathbb{R}, \\quad x \\mapsto x^2, \\qquad
  \\lim_{n \\to \\infty} a_n, \\qquad
  A \\xrightarrow{\;f\;} B \\xrightarrow[\\text{onto}]{g} C
\\]
\\[
  \\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3}, \\qquad
  x \\uparrow \\implies y \\downarrow, \\qquad
  P \\Longrightarrow Q
\\]
\\end{document}`}</code></pre>

          {/* ── Brackets ── */}
          <h2>Brackets and Delimiters</h2>
          <p>
            Parentheses and square brackets are typed directly; curly braces must be escaped as{' '}
            <code>{`\\{ \\}`}</code> because bare braces group code. Put <code>\left</code> and{' '}
            <code>\right</code> in front of any delimiter to size it to the content, or use{' '}
            <code>\big</code> to <code>\Bigg</code> for a fixed size. The full treatment is in{' '}
            <Link href="/learn/brackets">brackets and parentheses</Link>, and every delimiter is in
            the <ExtLink href={`${TOOLS}/brackets`}>brackets reference</ExtLink>.
          </p>
          <SymbolTable rows={bracketRows} />
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{stmaryrd}
\\begin{document}
\\[
  \\left( \\frac{a}{b} \\right)^2, \\quad
  \\left\\{ x \\in \\mathbb{Z} : x > 0 \\right\\}, \\quad
  \\langle u, v \\rangle, \\quad
  \\lvert x \\rvert, \\quad \\lVert v \\rVert, \\quad
  \\lfloor 2.7 \\rfloor = 2, \\quad \\lceil 2.1 \\rceil = 3
\\]
\\[
  [0, 1), \\quad \\llbracket P \\rrbracket, \\quad
  \\left. \\frac{df}{dx} \\right|_{x=0}, \\quad
  \\Big( (a+b) \\Big)
\\]
\\end{document}`}</code></pre>

          {/* ── Special characters ── */}
          <h2>Special Characters in Text Mode</h2>
          <p>
            Ten characters are reserved by LaTeX: <code>{`# $ % & _ { } ~ ^ \\`}</code>. The #
            symbol in LaTeX is <code>\#</code>; likewise <code>\$</code>, <code>\%</code>,{' '}
            <code>\&amp;</code>, <code>\_</code>, <code>{`\\{`}</code> and <code>{`\\}`}</code>{' '}
            print the character. The last three need named commands, because <code>\~</code> and{' '}
            <code>\^</code> are accents and <code>\\</code> is a line break. The{' '}
            <Link href="/learn/special-characters">special characters guide</Link> covers
            underscores in URLs, the pipe, quotes and currency signs.
          </p>
          <SymbolTable rows={textRows} />
          <pre><code>{`\\documentclass{article}
\\begin{document}
Issue \\#42 costs \\$5 (a 10\\% discount) at Smith \\& Sons.

File: my\\_file.tex, set \\{a, b\\}, approx.\\ \\textasciitilde 3 km,
2\\textasciicircum 10, C:\\textbackslash Users.

Water boils at 100\\textdegree C. See \\S 3 and \\P 2. \\copyright{} 2026.
Footnote mark\\dag, ellipsis \\dots{} and an em dash---like this.
\\end{document}`}</code></pre>

          {/* ── Big operators ── */}
          <h2>Sum, Integral and Big Operators</h2>
          <p>
            The LaTeX sum symbol is <code>\sum</code>. Add limits with a subscript and a
            superscript: <code>{`\\sum_{i=1}^{n} a_i`}</code>. In display math the limits sit above
            and below the ∑; inline they go to the side so the line spacing is not disturbed. Force
            the display style inline with <code>\limits</code> or <code>\displaystyle</code>. The
            same rules apply to <code>\prod</code>, <code>\bigcup</code> and the other big
            operators, while integrals put their limits to the side by default. See{' '}
            <Link href="/learn/integrals-sums-limits">integrals, sums and limits</Link> for
            multi-line limits and spacing, and the{' '}
            <ExtLink href={`${TOOLS}/summation`}>sums and big operators reference</ExtLink> and{' '}
            <ExtLink href={`${TOOLS}/calculus`}>calculus symbols</ExtLink> for more.
          </p>
          <SymbolTable rows={bigOpRows} />
          <pre><code>{`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
Inline: $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$, forced: $\\sum\\limits_{i=1}^{n} i$.

Display:
\\[
  \\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}, \\qquad
  \\sum_{\\substack{0 \\le i \\le m \\\\ 0 < j < n}} P(i, j), \\qquad
  \\prod_{k=1}^{n} k = n!
\\]
\\[
  \\int_{0}^{1} x^2 \\, dx = \\frac{1}{3}, \\qquad
  \\iint_{D} f \\, dA, \\qquad
  \\oint_{C} \\mathbf{F} \\cdot d\\mathbf{r}, \\qquad
  \\lim_{x \\to \\infty} \\frac{1}{x} = 0, \\qquad
  \\bigcup_{i=1}^{\\infty} A_i
\\]
\\end{document}`}</code></pre>

          {/* ── Errors ── */}
          <h2>Common Errors</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Error</th>
                  <th>Cause</th>
                  <th>Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\mathbb</code>, <code>\therefore</code>, <code>\varnothing</code>, <code>\nexists</code> or <code>\lesssim</code></td>
                  <td>The symbol is in the AMS fonts, and <code>amssymb</code> is not loaded</td>
                  <td><code>{`\\usepackage{amssymb}`}</code> in the preamble</td>
                </tr>
                <tr>
                  <td><em>Undefined control sequence</em> on <code>\implies</code>, <code>\iff</code> (long form), <code>\iint</code> or <code>\xrightarrow</code></td>
                  <td>These come from <code>amsmath</code></td>
                  <td><code>{`\\usepackage{amsmath}`}</code></td>
                </tr>
                <tr>
                  <td><em>Missing $ inserted</em></td>
                  <td>A math command (<code>\alpha</code>, <code>\leq</code>, <code>\infty</code>) or a bare <code>_</code> / <code>^</code> in ordinary text</td>
                  <td>Wrap the math in <code>$...$</code>; in text write <code>\_</code> or <code>\textasciicircum</code></td>
                </tr>
                <tr>
                  <td>Degree sign prints as a raised circle in the wrong font, or <em>Undefined control sequence</em> on <code>\degree</code></td>
                  <td>Mixing up text and math: <code>\degree</code> is from <code>gensymb</code>, <code>^\circ</code> is math only</td>
                  <td>In text use <code>\textdegree</code> (25\textdegree C); in math use <code>{`$25^\\circ$`}</code>; or <code>{`\\SI{25}{\\degreeCelsius}`}</code> with siunitx</td>
                </tr>
                <tr>
                  <td><em>You can&apos;t use `macro parameter character #&apos; in horizontal mode</em></td>
                  <td>A bare # in text</td>
                  <td>Write <code>\#</code></td>
                </tr>
                <tr>
                  <td><em>Misplaced alignment tab character &amp;</em></td>
                  <td>A bare &amp; outside a table or align</td>
                  <td>Write <code>\&amp;</code> for the ampersand, or <code>\land</code> for logical AND</td>
                </tr>
                <tr>
                  <td><em>Missing \right. inserted</em></td>
                  <td>A <code>\left</code> without a matching <code>\right</code></td>
                  <td>Pair every <code>\left</code> with a <code>\right</code>; use <code>\right.</code> for an invisible one</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>The degree sign is the one people trip over most often. Both of these work:</p>
          <pre><code>{`\\documentclass{article}
\\begin{document}
Text mode: the oven is at 180\\textdegree C.

Math mode: an angle of $90^\\circ$ and $\\theta = 45^{\\circ}$.
\\end{document}`}</code></pre>

          {/* ── FAQ ── */}
          <h2>Frequently Asked Questions</h2>
          <h3>How do I write symbols in LaTeX?</h3>
          <p>
            Most LaTeX symbols are commands that start with a backslash and only work in math mode:
            write <code>$\alpha$</code>, <code>$\leq$</code> or <code>$\infty$</code> inside dollar
            signs in a sentence, or inside <code>{`\\[ ... \\]`}</code> on a line of their own. Many
            extra symbols (<code>{`\\mathbb{R}`}</code>, <code>\therefore</code>,{' '}
            <code>\varnothing</code>) need <code>{`\\usepackage{amssymb}`}</code>. To find the
            command for a symbol you can see but not name, search the{' '}
            <ExtLink href={TOOLS}>Octree symbols reference</ExtLink> or draw it in Detexify.
          </p>
          <h3>Which package do I need for math symbols in LaTeX?</h3>
          <p>
            The basic operators, relations, arrows and Greek letters are built into LaTeX. Load{' '}
            <code>{`\\usepackage{amssymb}`}</code> for the AMS symbol fonts (<code>\mathbb</code>,{' '}
            <code>\therefore</code>, <code>\nexists</code>, <code>\varnothing</code>,{' '}
            <code>\lesssim</code>) and <code>{`\\usepackage{amsmath}`}</code> for{' '}
            <code>\implies</code>, <code>\iff</code>, <code>\iint</code>, <code>\text</code> and{' '}
            <code>\xrightarrow</code>. Loading both in every document that has math is the usual
            habit.
          </p>
          <h3>What is the LaTeX approximately symbol?</h3>
          <p>
            The LaTeX approximately symbol is <code>\approx</code>, which prints ≈ in math mode:{' '}
            <code>$\pi \approx 3.14$</code>. It needs no package. Related commands are{' '}
            <code>\sim</code> (∼, same order of magnitude), <code>\simeq</code> (≃, asymptotically
            equal) and <code>\cong</code> (≅, congruent or isomorphic).
          </p>
          <h3>How do I type the # symbol in LaTeX?</h3>
          <p>
            The # symbol in LaTeX is <code>\#</code>. A bare # is reserved for macro arguments (#1,
            #2), so typing it in text gives the error &ldquo;You can&rsquo;t use macro parameter
            character # in horizontal mode&rdquo;. <code>\#</code> works in both text and math mode,
            and in a URL inside <code>{`\\url{...}`}</code> you can type # directly.
          </p>
          <h3>What is the LaTeX and symbol?</h3>
          <p>
            For logical AND (∧) the LaTeX and symbol is <code>\land</code>, or its synonym{' '}
            <code>\wedge</code>; logical OR (∨) is <code>\lor</code> or <code>\vee</code>, and NOT
            (¬) is <code>\lnot</code> or <code>\neg</code>. For the ampersand character &amp; in
            text, write <code>\&amp;</code>, because a bare &amp; separates table columns.
          </p>
          <h3>How do I write the sum symbol with limits in LaTeX?</h3>
          <p>
            Write <code>{`\\sum_{i=1}^{n} a_i`}</code> in math mode. In a display (
            <code>{`\\[ ... \\]`}</code>) the limits go above and below the ∑; inline (
            <code>$...$</code>) they go to the side to keep the line height small. Force them above
            and below inline with <code>{`\\sum\\limits_{i=1}^{n}`}</code> or{' '}
            <code>\displaystyle</code>, and to the side in a display with{' '}
            <code>\sum\nolimits</code>.
          </p>

          {/* ── Next Steps ── */}
          <h2>Next Steps</h2>
          <ul>
            <li><Link href="/learn/greek-letters-math-symbols">Greek Letters in LaTeX</Link> &ndash; Epsilon vs varepsilon, bold and upright Greek, dots and accents</li>
            <li><Link href="/learn/special-characters">Special Characters in LaTeX</Link> &ndash; Every reserved character, the pipe, quotes and currency</li>
            <li><Link href="/learn/approximately-equal">Approximately Equal (≈)</Link> &ndash; \approx vs \sim, \simeq and \cong</li>
            <li><Link href="/learn/integrals-sums-limits">Integrals, Sums and Limits</Link> &ndash; Limits, multiple integrals and spacing</li>
            <li><Link href="/learn/brackets">Brackets and Parentheses</Link> &ndash; \left, \right and manual sizes</li>
            <li><Link href="/learn/subscripts-superscripts">Subscripts and Superscripts</Link> &ndash; ^ and _ in math and text</li>
            <li><Link href="/learn/math-functions">Math Functions</Link> &ndash; \sin, \log and \DeclareMathOperator</li>
            <li><Link href="/learn/latex">Learn LaTeX</Link> &ndash; The beginner tutorial</li>
          </ul>

          <h2>Free LaTeX Symbol Tools</h2>
          <ul>
            <li><ExtLink href={TOOLS}>LaTeX Symbols Reference</ExtLink> &ndash; Search 600+ symbols by name, category or command</li>
            <li><ExtLink href="https://tools.useoctree.com/tools/latex-preview">LaTeX Preview</ExtLink> &ndash; Paste a formula and see it rendered</li>
            <li><ExtLink href="https://tools.useoctree.com/tools/math-to-latex">Math to LaTeX</ExtLink> &ndash; Turn an image of an equation into LaTeX</li>
            <li><ExtLink href="https://tools.useoctree.com/tools/ai-latex-generator">AI LaTeX Generator</ExtLink> &ndash; Describe the math and get the code</li>
          </ul>

          <RelatedPosts searchTerm="symbol" title="Related Symbol Articles" />

          <div className="not-prose mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Write math faster with AI</h3>
            <p className="text-muted-foreground mb-4">
              Octree autocompletes symbol commands, adds amssymb and amsmath when you need them, and
              explains every compile error in plain words.
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
