import { describe, expect, it } from 'vitest'

import {
  extractFaqFromLexical,
  MAX_FAQ_ANSWER_LENGTH,
} from '@/utilities/extractFaqFromLexical'

// Trimmed copies of live post bodies (first paragraph + the nodes from just
// before the FAQ heading to the end), fetched from /api/blogs on 2026-11-08.
import blankSpaces from './fixtures/blog-blank-spaces.content.json'
import delta from './fixtures/blog-delta.content.json'
import omega from './fixtures/blog-omega.content.json'

const text = (value: string, format = 0) => ({
  type: 'text',
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})
const heading = (tag: string, value: string) => ({ type: 'heading', tag, children: [text(value)] })
const paragraph = (...children: object[]) => ({ type: 'paragraph', children })
const list = (listType: string, ...items: string[]) => ({
  type: 'list',
  listType,
  tag: listType,
  children: items.map((item, i) => ({ type: 'listitem', value: i + 1, children: [text(item)] })),
})
type Content = Parameters<typeof extractFaqFromLexical>[0]
const doc = (...children: object[]) => ({ root: { type: 'root', children } }) as Content

describe('extractFaqFromLexical', () => {
  it('extracts the "Frequently Asked Questions" section and stops at the next H2', () => {
    const faq = extractFaqFromLexical(omega as never)
    expect(faq).toHaveLength(9)
    expect(faq[0].question).toBe('What is the definition of omega?')
    expect(faq[0].answer).toMatch(/^Omega is the last letter of the Greek alphabet/)
    expect(faq[8].question).toBe('How do you write omega in LaTeX?')
    // Inline code keeps its text.
    expect(faq[8].answer).toContain('$\\Omega$')
    // Content of the following "Writing Technical Documents" H2 is not included.
    expect(faq.some((item) => /Circuit descriptions/.test(item.answer))).toBe(false)
  })

  it('handles the "<Topic> FAQ" heading variant', () => {
    const faq = extractFaqFromLexical(delta as never)
    expect(faq).toHaveLength(5)
    expect(faq.every((item) => item.question.endsWith('?'))).toBe(true)
    expect(faq.every((item) => item.answer.length > 0)).toBe(true)
  })

  it('handles an FAQ at the end of the post and drops the closing CTA paragraph', () => {
    const faq = extractFaqFromLexical(blankSpaces as never)
    expect(faq).toHaveLength(9)
    const last = faq[faq.length - 1]
    expect(last.question).toBe('How do I break a line inside a table cell?')
    expect(last.answer).toMatch(/makecell/)
    expect(last.answer).not.toMatch(/useoctree\.com/)
  })

  it('returns [] for posts without an FAQ section', () => {
    expect(
      extractFaqFromLexical(
        doc(heading('h2', 'Introduction'), heading('h3', 'Is this a question?'), paragraph(text('No.'))),
      ),
    ).toEqual([])
    expect(extractFaqFromLexical(null)).toEqual([])
    expect(extractFaqFromLexical({ root: { children: [] } })).toEqual([])
  })

  it('skips questions without an answer', () => {
    const faq = extractFaqFromLexical(
      doc(
        heading('h2', 'FAQ'),
        heading('h3', 'Unanswered?'),
        heading('h3', 'Answered?'),
        paragraph(text('Yes.')),
        heading('h3', 'Empty paragraph?'),
        paragraph(),
      ),
    )
    expect(faq).toEqual([{ question: 'Answered?', answer: 'Yes.' }])
  })

  it('joins multiple paragraphs and list items, keeping link and inline code text', () => {
    const faq = extractFaqFromLexical(
      doc(
        paragraph(text('Intro.')),
        heading('h2', 'Frequently asked questions'),
        heading('h3', 'Which packages do I need?'),
        paragraph(
          text('Load '),
          text('amsmath', 16),
          text(' and see the '),
          { type: 'link', fields: { url: 'https://ctan.org' }, children: [text('CTAN page')] },
          text('.'),
        ),
        list('ul', 'amsmath for equations', 'graphicx for images'),
        { type: 'block', fields: { blockType: 'code', code: '\\usepackage{amsmath}' } },
        heading('h3', 'Second?'),
        paragraph(text('Line one'), { type: 'linebreak' }, text('line two')),
        heading('h2', 'Next section'),
        heading('h3', 'Not in the FAQ?'),
        paragraph(text('Ignored.')),
      ),
    )
    expect(faq).toEqual([
      {
        question: 'Which packages do I need?',
        answer: 'Load amsmath and see the CTAN page. amsmath for equations graphicx for images',
      },
      { question: 'Second?', answer: 'Line one line two' },
    ])
  })

  it('caps long answers on a word boundary', () => {
    const long = 'word '.repeat(400)
    const [item] = extractFaqFromLexical(
      doc(heading('h2', 'FAQ'), heading('h3', 'Long?'), paragraph(text(long))),
    )
    expect(item.answer.length).toBeLessThanOrEqual(MAX_FAQ_ANSWER_LENGTH)
    expect(item.answer.endsWith('word…')).toBe(true)
  })

  it('does not match words that merely contain "faq"', () => {
    expect(
      extractFaqFromLexical(doc(heading('h2', 'Faqir notes'), heading('h3', 'Q?'), paragraph(text('A.')))),
    ).toEqual([])
  })
})
