import { describe, expect, it } from 'vitest'

import { GREEK_SYMBOLS_STARTER, LATEX_SYMBOLS_STARTER } from '@/components/Learn/open-symbols-in-octree'
import { OCTREE_DRAFTS_URL, draftsActionUrl } from '@/utilities/openInOctree'
import { isFullLatexDocument } from '@/utilities/wrapLatexDocument'

describe('draftsActionUrl', () => {
  it('posts to the app drafts endpoint with www utm params', () => {
    const url = new URL(draftsActionUrl('www:learn:latex-symbols:symbols-top'))
    expect(`${url.origin}${url.pathname}`).toBe(OCTREE_DRAFTS_URL)
    expect(url.searchParams.get('utm_source')).toBe('www')
    expect(url.searchParams.get('utm_medium')).toBe('draft')
    expect(url.searchParams.get('utm_campaign')).toBe('www:learn:latex-symbols:symbols-top')
  })

  it('omits utm_campaign without a source', () => {
    expect(new URL(draftsActionUrl()).searchParams.has('utm_campaign')).toBe(false)
  })
})

describe('symbol starter documents', () => {
  for (const [name, latex] of Object.entries({ LATEX_SYMBOLS_STARTER, GREEK_SYMBOLS_STARTER })) {
    it(`${name} is a complete document that loads amsmath and amssymb`, () => {
      expect(isFullLatexDocument(latex)).toBe(true)
      expect(latex).toMatch(/^\\documentclass\{article\}\n/)
      expect(latex).toContain('\\usepackage{amsmath}')
      expect(latex).toContain('\\usepackage{amssymb}')
      expect(latex.trim()).toMatch(/\\end\{document\}$/)
      // Plain ASCII, so the compile service keeps pdfLaTeX.
      expect(/[^\u0000-\u007f]/.test(latex)).toBe(false)
    })
  }
})
