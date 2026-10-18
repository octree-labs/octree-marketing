import { describe, expect, it } from 'vitest'

import {
  defaultLatexDocument,
  isFullLatexDocument,
  isLatexSnippet,
  wrapLatexDocument,
} from '@/utilities/wrapLatexDocument'
import { findFirstLatexCodeBlock, isLastContentNode } from '@/utilities/findLatexCodeBlock'

describe('isLatexSnippet', () => {
  it('detects LaTeX by content regardless of the tagged language', () => {
    expect(isLatexSnippet('\\usepackage{amsmath}', 'typescript')).toBe(true)
    expect(isLatexSnippet('\\begin{equation} x \\end{equation}', 'javascript')).toBe(true)
    expect(isLatexSnippet('$\\frac{a}{b}$')).toBe(true)
    expect(isLatexSnippet('The symbol is $\\alpha$ and $\\Omega$')).toBe(true)
    expect(isLatexSnippet('\\documentclass{article}')).toBe(true)
  })

  it('trusts a latex/tex language tag', () => {
    expect(isLatexSnippet('hello', 'latex')).toBe(true)
    expect(isLatexSnippet('hello', 'TeX')).toBe(true)
  })

  it('rejects code that only happens to contain backslashes', () => {
    expect(isLatexSnippet("const s = 'C:\\\\Users\\\\me'", 'javascript')).toBe(false)
    expect(isLatexSnippet('echo "a\\nb"')).toBe(false)
    expect(isLatexSnippet('\\alphabet is not a command')).toBe(false)
    expect(isLatexSnippet('')).toBe(false)
    expect(isLatexSnippet(null)).toBe(false)
    expect(isLatexSnippet('SLEEP DEPRIVATION AND WORKING MEMORY     1')).toBe(false)
  })
})

describe('wrapLatexDocument', () => {
  it('passes a full document through untouched', () => {
    const doc = '\\documentclass{article}\n\\begin{document}\nHi\n\\end{document}'
    expect(wrapLatexDocument(doc)).toBe(`${doc}\n`)
    expect(isFullLatexDocument(doc)).toBe(true)
  })

  it('wraps a body fragment in an article with amsmath and amssymb', () => {
    const out = wrapLatexDocument('\\section{Intro}\nSome text.')
    expect(out.startsWith('\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n')).toBe(true)
    expect(out).toContain('\\begin{document}\n\\section{Intro}\nSome text.\n\\end{document}\n')
  })

  it('hoists preamble lines above \\begin{document} and drops duplicate packages', () => {
    const out = wrapLatexDocument('\\usepackage{amsmath}\n\\usepackage{booktabs}\n\\begin{tabular}{ll}\na & b\n\\end{tabular}')
    const preambleEnd = out.indexOf('\\begin{document}')
    expect(out.indexOf('\\usepackage{booktabs}')).toBeLessThan(preambleEnd)
    expect(out.match(/\\usepackage\{amsmath\}/g)).toHaveLength(1)
    expect(out.indexOf('\\begin{tabular}')).toBeGreaterThan(preambleEnd)
  })

  it('puts pure math fragments in display math', () => {
    const out = wrapLatexDocument('\\frac{a}{b} + \\alpha')
    expect(out).toContain('\\[\n\\frac{a}{b} + \\alpha\n\\]')
  })

  it('does not double-wrap math that already opens math mode', () => {
    expect(wrapLatexDocument('$\\alpha$')).not.toContain('\\[')
    expect(wrapLatexDocument('\\begin{equation}\n\\alpha\n\\end{equation}')).not.toContain('\\[')
  })

  it('adds \\maketitle when the fragment declares a title', () => {
    const out = wrapLatexDocument('\\title{T}\n\\author{A}\nBody')
    expect(out.indexOf('\\title{T}')).toBeLessThan(out.indexOf('\\begin{document}'))
    expect(out).toContain('\\begin{document}\n\\maketitle\n\nBody')
  })

  it('puts each line of a multi-line math fragment in its own display', () => {
    const out = wrapLatexDocument('\\sin^2\\theta + \\cos^2\\theta = 1\nf(n) = \\Theta(n \\log n)')
    expect(out).toContain('\\[\n\\sin^2\\theta + \\cos^2\\theta = 1\n\\]\n\\[\nf(n) = \\Theta(n \\log n)\n\\]')
  })

  it('keeps a cases/matrix environment inside one display and still wraps the fragment', () => {
    const out = wrapLatexDocument('\\delta_{ij} = \\begin{cases}\n1 & i = j \\\\\n0 & i \\neq j\n\\end{cases}\n\\nabla^2 \\phi = 0')
    expect(out).toContain('\\[\n\\delta_{ij} = \\begin{cases}\n1 & i = j \\\\\n0 & i \\neq j\n\\end{cases}\n\\]\n\\[\n\\nabla^2 \\phi = 0\n\\]')
  })

  it('treats unescaped ^ and _ as math but never wraps text-mode commands', () => {
    expect(wrapLatexDocument('x^2 + y_1')).toContain('\\[\nx^2 + y_1\n\\]')
    expect(wrapLatexDocument('\\section{Intro}\n\\alpha is first')).not.toContain('\\[')
    expect(wrapLatexDocument('\\begin{tabular}{ll}\na & \\alpha\n\\end{tabular}')).not.toContain('\\[')
  })

  it('loads packages the fragment visibly relies on', () => {
    const out = wrapLatexDocument('\\mu = 1\n\\qty{4.7}{\\micro\\farad}')
    expect(out.indexOf('\\usepackage{siunitx}')).toBeLessThan(out.indexOf('\\begin{document}'))
    const tikz = wrapLatexDocument('\\begin{tikzpicture}\n\\draw (0,0) -- (1,1);\n\\end{tikzpicture}')
    expect(tikz).toContain('\\usepackage{tikz}')
    expect(tikz).not.toContain('\\[')
    const table = wrapLatexDocument('\\begin{tabular}{ll}\\toprule a & b \\\\ \\bottomrule\\end{tabular}')
    expect(table).toContain('\\usepackage{booktabs}')
    expect(table.match(/\\usepackage\{booktabs\}/g)).toHaveLength(1)
    // not added twice when the fragment loads it (with options)
    const own = wrapLatexDocument('\\usepackage[table]{xcolor}\n\\rowcolor{gray!20} a')
    expect(own.match(/xcolor/g)).toHaveLength(1)
  })

  it('gives a preamble-only fragment a body so the document has a page', () => {
    const out = wrapLatexDocument('\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta}')
    expect(out).toContain('\\usetikzlibrary{arrows.meta}\n\n\\begin{document}\nStart writing here.')
    expect(out).not.toContain('% Your content here')
  })

  it('handles a fragment with \\begin{document} but no \\documentclass', () => {
    const out = wrapLatexDocument('\\usepackage{booktabs}\n\\begin{document}\nHello\n\\end{document}')
    expect(out.match(/\\begin\{document\}/g)).toHaveLength(1)
    expect(out.match(/\\documentclass/g)).toHaveLength(1)
    expect(out).toContain('\\begin{document}\nHello\n\\end{document}')
    expect(out.indexOf('\\usepackage{booktabs}')).toBeLessThan(out.indexOf('\\begin{document}'))
  })

  it('adds a \\title when a fragment or document calls \\maketitle without one', () => {
    const frag = wrapLatexDocument('\\maketitle\n\\section{A}\nText', 'My Guide')
    expect(frag.indexOf('\\title{My Guide}')).toBeLessThan(frag.indexOf('\\begin{document}'))
    expect(frag.match(/\\maketitle/g)).toHaveLength(1)
    const full = wrapLatexDocument('\\documentclass{article}\n\\begin{document}\n\\maketitle\nHi\n\\end{document}', 'My Guide')
    expect(full).toContain('\\title{My Guide}\n\\author{}\n\n\\begin{document}')
  })

  it('completes a full document that stops after the preamble', () => {
    const out = wrapLatexDocument('\\documentclass{article}\n\\usepackage{hyperref}')
    expect(out).toContain('\\usepackage{hyperref}\n\n\\begin{document}\nStart writing here.')
    expect(out.trim().endsWith('\\end{document}')).toBe(true)
    const noEnd = wrapLatexDocument('\\documentclass{article}\n\\begin{document}\nHi')
    expect(noEnd.trim().endsWith('Hi\n\\end{document}')).toBe(true)
  })

  it('falls back to the default document for empty input', () => {
    expect(wrapLatexDocument('', 'My Post')).toBe(defaultLatexDocument('My Post'))
  })
})

describe('defaultLatexDocument', () => {
  it('escapes the title and compiles standalone', () => {
    const out = defaultLatexDocument('Omega & Co: 100% _fun_')
    expect(out).toContain('\\title{Omega \\& Co: 100\\% \\_fun\\_}')
    expect(out).toContain('\\documentclass{article}')
    expect(out.trim().endsWith('\\end{document}')).toBe(true)
  })
})

describe('findFirstLatexCodeBlock', () => {
  const para = (text: string) => ({ type: 'paragraph', children: [{ type: 'text', text }] })
  const code = (c: string, language = 'typescript') => ({
    type: 'block',
    fields: { blockType: 'code', code: c, language },
  })

  it('skips non-LaTeX code blocks and finds the first LaTeX one by identity', () => {
    const js = code('console.log(1)', 'javascript')
    const tex = code('\\begin{align} a \\end{align}')
    const data = { root: { children: [para('Hi'), js, para('mid'), tex, code('\\alpha')] } }
    const found = findFirstLatexCodeBlock(data)
    expect(found?.node).toBe(tex)
    expect(found?.code).toBe('\\begin{align} a \\end{align}')
  })

  it('returns null when a post has no LaTeX', () => {
    expect(findFirstLatexCodeBlock({ root: { children: [para('x'), code('let a = 1')] } })).toBeNull()
    expect(findFirstLatexCodeBlock(null)).toBeNull()
  })

  it('reports whether the block is the last real content node', () => {
    const tex = code('\\frac{1}{2}')
    const empty = { type: 'paragraph', children: [] }
    expect(isLastContentNode({ root: { children: [para('a'), tex, empty] } }, tex)).toBe(true)
    expect(isLastContentNode({ root: { children: [tex, para('after')] } }, tex)).toBe(false)
  })
})
