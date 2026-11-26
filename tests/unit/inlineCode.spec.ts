import { describe, expect, it } from 'vitest'

import { splitInlineCode, stripInlineCode } from '@/utilities/inlineCode'

describe('splitInlineCode', () => {
  it('returns plain text as one segment', () => {
    expect(splitInlineCode('No code here.')).toEqual([{ text: 'No code here.', code: false }])
  })

  it('splits backtick spans into code segments', () => {
    expect(splitInlineCode('Call `compile_latex` then `check_latex`.')).toEqual([
      { text: 'Call ', code: false },
      { text: 'compile_latex', code: true },
      { text: ' then ', code: false },
      { text: 'check_latex', code: true },
      { text: '.', code: false },
    ])
  })

  it('handles code at the start and end', () => {
    expect(splitInlineCode('`a` and `b`')).toEqual([
      { text: 'a', code: true },
      { text: ' and ', code: false },
      { text: 'b', code: true },
    ])
  })

  it('keeps an unpaired backtick as text', () => {
    expect(splitInlineCode('one ` tick')).toEqual([{ text: 'one ` tick', code: false }])
    expect(splitInlineCode('`x` and `y')).toEqual([
      { text: 'x', code: true },
      { text: ' and `y', code: false },
    ])
  })

  it('leaves empty backtick pairs alone', () => {
    expect(splitInlineCode('a `` b')).toEqual([{ text: 'a `` b', code: false }])
  })

  it('does not interpret HTML or markdown inside code', () => {
    expect(splitInlineCode('`<b>{ path, content }</b>` and \\input')).toEqual([
      { text: '<b>{ path, content }</b>', code: true },
      { text: ' and \\input', code: false },
    ])
  })

  it('returns nothing for an empty string', () => {
    expect(splitInlineCode('')).toEqual([])
  })
})

describe('stripInlineCode', () => {
  it('removes the code-span backticks and keeps the text', () => {
    expect(
      stripInlineCode('Send them as `Authorization: Bearer oct_live_…` to `https://app.useoctree.com/api/mcp`.'),
    ).toBe('Send them as Authorization: Bearer oct_live_… to https://app.useoctree.com/api/mcp.')
  })

  it('keeps unpaired backticks', () => {
    expect(stripInlineCode('a ` b')).toBe('a ` b')
  })
})
