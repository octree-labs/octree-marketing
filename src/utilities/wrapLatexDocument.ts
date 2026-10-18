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

/** Unescaped `^` or `_`: only valid in math mode, so a strong hint on its own. */
const SCRIPT_RE = /(^|[^\\])[\^_]/

/** Commands that only work in text mode; a fragment using one is never wrapped in display math. */
const TEXT_ONLY_RE =
  /\\(?:section|subsection|subsubsection|chapter|part|paragraph|textbf|textit|emph|item|maketitle|caption|includegraphics|footnote|noindent|centering|newpage|clearpage|tableofcontents|url|href|cite|parencite|textcite|today|LaTeX|TeX|verb|par|hline|toprule|midrule|bottomrule|multicolumn|multirow|textsc|texttt)(?![A-Za-z])/

/** True when the fragment already opens math mode itself. */
const OPENS_MATH_RE = /\$|\\\[|\\\(|\\begin\{(?:equation|align|alignat|gather|multline|flalign|eqnarray|displaymath|math)\*?\}/

/** Environments that only exist inside math mode; any other `\begin{...}` means text-mode content. */
const MATH_INNER_ENVS = new Set([
  'cases', 'dcases', 'rcases', 'aligned', 'alignedat', 'gathered', 'split', 'multlined', 'subarray',
  'matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix', 'smallmatrix', 'array',
])

/** Preamble lines (`\usepackage`, `\newcommand`, ...) that must sit before `\begin{document}`. */
const PREAMBLE_LINE_RE =
  /^\s*\\(?:usepackage|RequirePackage|newcommand|renewcommand|providecommand|DeclareMathOperator|DeclareSIUnit|newtheorem|theoremstyle|setlength|geometry|hypersetup|usetikzlibrary|pgfplotsset|tikzset|newcolumntype|definecolor|bibliographystyle|addbibresource|graphicspath|sisetup|lstset|newacronym|makeglossaries|pagestyle|fancyhf|fancyhead|fancyfoot|title|author|date)\b/

/** Packages the wrapper always loads; a fragment's own `\usepackage` of these is dropped to avoid clashes. */
const DEFAULT_PACKAGES = ['amsmath', 'amssymb']

/**
 * Packages a fragment needs but which samples routinely leave out, keyed by
 * the commands that give them away. Added only when the fragment does not
 * load the package itself.
 */
const PACKAGE_HINTS: Array<{ test: RegExp; pkg: string; options?: string }> = [
  { test: /\\(?:qty|unit|SI|si|num|ang|DeclareSIUnit|sisetup)(?![A-Za-z])/, pkg: 'siunitx' },
  { test: /\\begin\{axis\}|\\pgfplotsset|\\addplot/, pkg: 'pgfplots' },
  { test: /\\begin\{tikzpicture\}|\\tikz(?![A-Za-z])|\\usetikzlibrary|\\tikzset/, pkg: 'tikz' },
  { test: /\\(?:toprule|midrule|bottomrule|cmidrule|addlinespace)(?![A-Za-z])/, pkg: 'booktabs' },
  { test: /\\includegraphics(?![A-Za-z])/, pkg: 'graphicx' },
  { test: /\\multirow(?![A-Za-z])/, pkg: 'multirow' },
  { test: /\\begin\{tabularx\}/, pkg: 'tabularx' },
  { test: /\\begin\{longtable\}/, pkg: 'longtable' },
  { test: /\\begin\{sidewaystable\}|\\begin\{sidewaysfigure\}/, pkg: 'rotating' },
  { test: /\\begin\{subfigure\}|\\subcaption(?![A-Za-z])/, pkg: 'subcaption' },
  { test: /\\(?:href|url)(?![A-Za-z])/, pkg: 'hyperref' },
  { test: /\\(?:rowcolor|cellcolor|columncolor)(?![A-Za-z])/, pkg: 'xcolor', options: 'table' },
  { test: /\\(?:textcolor|color|colorbox|fcolorbox|definecolor|pagecolor)(?![A-Za-z])/, pkg: 'xcolor' },
  { test: /\\bm(?![A-Za-z])/, pkg: 'bm' },
  { test: /\\[Uu]p(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)(?![A-Za-z])/, pkg: 'upgreek' },
  { test: /\\begin\{proof\}|\\theoremstyle|\\qedhere/, pkg: 'amsthm' },
  { test: /\\begin\{lstlisting\}|\\lstset|\\lstinline/, pkg: 'listings' },
  { test: /\\(?:sout|xout|uline|uwave)(?![A-Za-z])/, pkg: 'ulem', options: 'normalem' },
  { test: /\\(?:ce|cee)(?![A-Za-z])/, pkg: 'mhchem', options: 'version=4' },
  { test: /\\(?:newacronym|gls|Gls|glspl|printglossaries|makeglossaries)(?![A-Za-z])/, pkg: 'glossaries' },
  { test: /\\enquote(?![A-Za-z])/, pkg: 'csquotes' },
  { test: /\\(?:setstretch|onehalfspacing|doublespacing|singlespacing)(?![A-Za-z])/, pkg: 'setspace' },
  { test: /\\(?:fancyhf|fancyhead|fancyfoot|pagestyle\{fancy\})/, pkg: 'fancyhdr' },
  { test: /\\geometry(?![A-Za-z])/, pkg: 'geometry' },
  { test: /\\(?:mathscr)(?![A-Za-z])/, pkg: 'mathrsfs' },
  { test: /\\(?:lipsum)(?![A-Za-z])/, pkg: 'lipsum' },
  { test: /\\(?:euro|EUR)(?![A-Za-z])/, pkg: 'eurosym' },
]

/** Body used when a sample is preamble only, so the document still has a page. */
const PLACEHOLDER_BODY = 'Start writing here. Octree compiles this document for you as you type.'

function escapeForTitle(title: string): string {
  return title.replace(/([\\{}$&#^_%~])/g, '\\$1')
}

function loadedPackages(preambleLines: string[]): Set<string> {
  const names = new Set<string>(DEFAULT_PACKAGES)
  for (const line of preambleLines) {
    const m = line.match(/^\s*\\(?:usepackage|RequirePackage)(?:\[[^\]]*\])?\{([^}]*)\}/)
    if (m) m[1].split(',').forEach((n) => names.add(n.trim()))
  }
  return names
}

function missingPackageLines(snippet: string, preambleLines: string[]): string[] {
  const loaded = loadedPackages(preambleLines)
  const lines: string[] = []
  for (const { test, pkg, options } of PACKAGE_HINTS) {
    if (loaded.has(pkg) || !test.test(snippet)) continue
    loaded.add(pkg)
    lines.push(options ? `\\usepackage[${options}]{${pkg}}` : `\\usepackage{${pkg}}`)
  }
  return lines
}

function isMathFragment(body: string): boolean {
  if (OPENS_MATH_RE.test(body) || TEXT_ONLY_RE.test(body)) return false
  for (const m of body.matchAll(/\\begin\{([^}]*)\}/g)) {
    if (!MATH_INNER_ENVS.has(m[1].trim().replace(/\*$/, ''))) return false
  }
  return MATH_ONLY_RE.test(body) || SCRIPT_RE.test(body)
}

/**
 * Puts a pure-math fragment in display math, one `\[ ... \]` per line so
 * `a = b` on one line and `c = d` on the next become two displays instead of
 * running together. Lines inside a `cases`/`matrix`/... environment stay in
 * one display; blank lines and comment-only lines are kept as they are.
 */
function wrapMathLines(body: string): string {
  const out: string[] = []
  let chunk: string[] = []
  let depth = 0
  const flush = () => {
    if (chunk.length) out.push(`\\[\n${chunk.join('\n')}\n\\]`)
    chunk = []
  }
  for (const line of body.split('\n')) {
    const trimmed = line.trim()
    if (depth === 0 && (!trimmed || trimmed.startsWith('%'))) {
      flush()
      if (trimmed) out.push(line)
      continue
    }
    chunk.push(line)
    depth += (line.match(/\\begin\{/g) ?? []).length - (line.match(/\\end\{/g) ?? []).length
    if (depth <= 0) {
      depth = 0
      flush()
    }
  }
  flush()
  return out.join('\n')
}

/**
 * A sample that already has `\documentclass` is kept as written, with only
 * what it needs to compile added: `\begin{document}`/`\end{document}` when
 * the sample is preamble only, and a `\title` when it calls `\maketitle`
 * without one.
 */
function completeFullDocument(doc: string, title?: string): string {
  let out = doc
  if (!/\\begin\{document\}/.test(out)) {
    out = `${out}\n\n\\begin{document}\n${PLACEHOLDER_BODY}\n\\end{document}`
  } else if (!/\\end\{document\}/.test(out)) {
    out = `${out}\n\\end{document}`
  }
  if (/\\maketitle(?![A-Za-z])/.test(out) && !/\\title(?![A-Za-z])/.test(out)) {
    out = out.replace(/\\begin\{document\}/, `\\title{${escapeForTitle((title || 'Untitled').trim())}}\n\\author{}\n\n\\begin{document}`)
  }
  return out.endsWith('\n') ? out : `${out}\n`
}

/**
 * Returns LaTeX the app can compile as-is. A full document is passed through
 * (completed only where it cannot compile otherwise). Anything else is placed
 * inside a minimal `article` with amsmath and amssymb; preamble-only lines in
 * the fragment (`\usepackage`, `\newcommand`, ...) are hoisted into the
 * preamble, packages the fragment visibly relies on (siunitx, tikz, booktabs,
 * ...) are added, and a fragment that is pure math (`\frac{a}{b}`, `\alpha`)
 * is wrapped in `\[ ... \]` line by line.
 */
export function wrapLatexDocument(code: string, title?: string): string {
  const snippet = (code ?? '').replace(/\r\n/g, '\n').trim()
  if (!snippet) return defaultLatexDocument(title)
  if (isFullLatexDocument(snippet)) return completeFullDocument(snippet, title)

  const preambleLines: string[] = []
  const bodyLines: string[] = []
  const docStart = snippet.search(/\\begin\{document\}/)
  if (docStart >= 0) {
    // A fragment that has a document body but no \documentclass: everything
    // before \begin{document} is preamble, the rest is the body.
    preambleLines.push(...snippet.slice(0, docStart).split('\n'))
    bodyLines.push(
      ...snippet
        .slice(docStart)
        .replace(/\\begin\{document\}/, '')
        .replace(/\\end\{document\}[\s\S]*$/, '')
        .split('\n'),
    )
  } else {
    for (const line of snippet.split('\n')) {
      if (PREAMBLE_LINE_RE.test(line)) preambleLines.push(line)
      else bodyLines.push(line)
    }
  }

  const keptPreamble = preambleLines.filter((line) => {
    if (!line.trim()) return false
    const pkg = line.match(/^\s*\\usepackage(?:\[[^\]]*\])?\{([^}]*)\}/)
    const names = pkg ? pkg[1].split(',').map((s) => s.trim()) : []
    return !(names.length > 0 && names.every((n) => DEFAULT_PACKAGES.includes(n)))
  })

  let body = bodyLines.join('\n').trim()
  const hasTitle = keptPreamble.some((l) => /^\s*\\title\b/.test(l))
  const hasMaketitle = /\\maketitle(?![A-Za-z])/.test(body)
  if (body && isMathFragment(body)) {
    body = wrapMathLines(body)
  }
  if (!body) {
    body = PLACEHOLDER_BODY
  }

  const preamble = [
    '\\documentclass{article}',
    ...DEFAULT_PACKAGES.map((p) => `\\usepackage{${p}}`),
    ...missingPackageLines(snippet, keptPreamble),
    ...keptPreamble,
    ...(hasMaketitle && !hasTitle ? [`\\title{${escapeForTitle((title || 'Untitled').trim())}}`, '\\author{}'] : []),
  ]
  const documentBody = [
    '\\begin{document}',
    ...(hasTitle && !hasMaketitle ? ['\\maketitle', ''] : []),
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
