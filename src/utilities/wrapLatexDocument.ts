/**
 * Helpers for the "Open in Octree" CTA: decide whether a code sample is LaTeX
 * and turn a fragment into a document the app can compile straight away.
 * Pure functions, no DOM, so they are unit tested in tests/unit.
 */

/**
 * Commands that only ever appear in LaTeX. One of these (as a whole command,
 * not a prefix of a longer one) is enough to call a snippet LaTeX. The CMS
 * has no LaTeX language option, so blog code blocks are tagged as
 * typescript/javascript and only the content tells us.
 */
const LATEX_COMMANDS = [
  'documentclass',
  'usepackage',
  'begin',
  'end',
  'frac',
  'dfrac',
  'tfrac',
  'sqrt',
  'sum',
  'prod',
  'int',
  'iint',
  'oint',
  'lim',
  'infty',
  'partial',
  'nabla',
  'cdot',
  'times',
  'pm',
  'leq',
  'geq',
  'neq',
  'approx',
  'equiv',
  'rightarrow',
  'leftarrow',
  'Rightarrow',
  'mathbb',
  'mathcal',
  'mathrm',
  'mathbf',
  'textbf',
  'textit',
  'emph',
  'underline',
  'section',
  'subsection',
  'chapter',
  'title',
  'author',
  'maketitle',
  'item',
  'label',
  'ref',
  'cite',
  'caption',
  'includegraphics',
  'hline',
  'toprule',
  'midrule',
  'bottomrule',
  'multicolumn',
  'multirow',
  'newcommand',
  'renewcommand',
  'left',
  'right',
  'hat',
  'bar',
  'vec',
  'dot',
  'overline',
  'text',
  'quad',
  'qquad',
  'alpha',
  'beta',
  'gamma',
  'delta',
  'epsilon',
  'varepsilon',
  'zeta',
  'eta',
  'theta',
  'vartheta',
  'iota',
  'kappa',
  'lambda',
  'mu',
  'nu',
  'xi',
  'pi',
  'varpi',
  'rho',
  'varrho',
  'sigma',
  'varsigma',
  'tau',
  'upsilon',
  'phi',
  'varphi',
  'chi',
  'psi',
  'omega',
  'Gamma',
  'Delta',
  'Theta',
  'Lambda',
  'Xi',
  'Pi',
  'Sigma',
  'Upsilon',
  'Phi',
  'Psi',
  'Omega',
]

const LATEX_COMMAND_RE = new RegExp(`\\\\(?:${LATEX_COMMANDS.join('|')})(?![A-Za-z])`)

/**
 * True when a code sample looks like LaTeX: it is tagged as such, or it
 * contains a known LaTeX command such as `\usepackage`, `\begin{`, `\frac`
 * or `\alpha`. Short samples of output, shell commands or JavaScript do not
 * match because a bare backslash is not enough.
 */
export function isLatexSnippet(code: string | null | undefined, language?: string | null): boolean {
  if (!code) return false
  if (language && /^(la)?tex$/i.test(language.trim())) return true
  return LATEX_COMMAND_RE.test(code)
}

/** True when the snippet is already a full document (has `\documentclass`). */
export function isFullLatexDocument(code: string): boolean {
  return /\\documentclass\b/.test(code)
}

/**
 * Commands that only work in math mode. A fragment made only of these is
 * wrapped in a display-math environment so it compiles.
 */
const MATH_ONLY_RE =
  /\\(?:frac|dfrac|tfrac|sqrt|sum|prod|int|iint|oint|lim|infty|partial|nabla|cdot|times|pm|leq|geq|neq|approx|equiv|mathbb|mathcal|mathrm|mathbf|hat|bar|vec|overline|left|right|alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?![A-Za-z])/

/** True when the fragment already opens math mode itself. */
const OPENS_MATH_RE = /\$|\\\[|\\\(|\\begin\{(?:equation|align|gather|multline|eqnarray|displaymath|math)\*?\}/

/** Preamble lines (`\usepackage`, `\newcommand`, ...) that must sit before `\begin{document}`. */
const PREAMBLE_LINE_RE =
  /^\s*\\(?:usepackage|newcommand|renewcommand|providecommand|DeclareMathOperator|newtheorem|theoremstyle|setlength|geometry|hypersetup|usetikzlibrary|pgfplotsset|newcolumntype|definecolor|bibliographystyle|graphicspath|title|author|date)\b/

/** Packages the wrapper always loads; a fragment's own `\usepackage` of these is dropped to avoid clashes. */
const DEFAULT_PACKAGES = ['amsmath', 'amssymb']

function escapeForTitle(title: string): string {
  return title.replace(/([\\{}$&#^_%~])/g, '\\$1')
}

/**
 * Returns LaTeX the app can compile as-is. A full document is passed through
 * untouched. Anything else is placed inside a minimal `article` with amsmath
 * and amssymb; preamble-only lines in the fragment (`\usepackage`,
 * `\newcommand`, ...) are hoisted into the preamble, and a fragment that is
 * pure math (`\frac{a}{b}`, `\alpha`) is wrapped in `\[ ... \]`.
 */
export function wrapLatexDocument(code: string, title?: string): string {
  const snippet = (code ?? '').replace(/\r\n/g, '\n').trim()
  if (!snippet) return defaultLatexDocument(title)
  if (isFullLatexDocument(snippet)) return snippet.endsWith('\n') ? snippet : `${snippet}\n`

  const preambleLines: string[] = []
  const bodyLines: string[] = []
  for (const line of snippet.split('\n')) {
    if (PREAMBLE_LINE_RE.test(line)) {
      const pkg = line.match(/^\s*\\usepackage(?:\[[^\]]*\])?\{([^}]*)\}/)
      const names = pkg ? pkg[1].split(',').map((s) => s.trim()) : []
      if (names.length > 0 && names.every((n) => DEFAULT_PACKAGES.includes(n))) continue
      preambleLines.push(line)
    } else {
      bodyLines.push(line)
    }
  }

  let body = bodyLines.join('\n').trim()
  const hasTitle = preambleLines.some((l) => /^\s*\\title\b/.test(l))
  if (body && MATH_ONLY_RE.test(body) && !OPENS_MATH_RE.test(body) && !/\\begin\{/.test(body)) {
    body = `\\[\n${body}\n\\]`
  }
  if (!body) {
    body = '% Your content here'
  }

  const preamble = [
    '\\documentclass{article}',
    ...DEFAULT_PACKAGES.map((p) => `\\usepackage{${p}}`),
    ...preambleLines,
  ]
  const documentBody = [
    '\\begin{document}',
    ...(hasTitle ? ['\\maketitle', ''] : []),
    body,
    '\\end{document}',
  ]
  return `${preamble.join('\n')}\n\n${documentBody.join('\n')}\n`
}

/** A short compilable document used when a page has no LaTeX sample of its own. */
export function defaultLatexDocument(title?: string): string {
  const safeTitle = escapeForTitle((title || 'Untitled').trim())
  return [
    '\\documentclass{article}',
    '\\usepackage{amsmath}',
    '\\usepackage{amssymb}',
    '',
    `\\title{${safeTitle}}`,
    '\\author{}',
    '\\date{\\today}',
    '',
    '\\begin{document}',
    '\\maketitle',
    '',
    '\\section{Introduction}',
    'Start writing here. Octree compiles this document for you as you type.',
    '',
    '\\end{document}',
    '',
  ].join('\n')
}
