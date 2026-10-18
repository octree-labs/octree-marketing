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
