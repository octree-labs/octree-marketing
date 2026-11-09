import type { FaqItem } from './learnMetadata'

/** The subset of a Lexical node the FAQ extraction reads. */
type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[] | null
  [k: string]: unknown
}

type LexicalState = { root?: { children?: LexicalNode[] | null } | null } | null | undefined

/** Answers longer than this are cut on a word boundary. */
export const MAX_FAQ_ANSWER_LENGTH = 600

const FAQ_HEADING = /\bFAQ\b|frequently asked/i
/**
 * The closing call-to-action paragraph the posts end with, e.g. "Write your next
 * document in Octree, the AI LaTeX editor ...: https://www.useoctree.com". It
 * mentions Octree and ends with the bare site URL (not a tools.useoctree.com
 * link or a URL inside a sentence), so a real answer is never mistaken for it.
 */
const CLOSING_CTA = /\bOctree\b.*:\s*https?:\/\/(?:www\.)?useoctree\.com\/?$/i

const isHeading = (node: LexicalNode, tag: string) => node.type === 'heading' && node.tag === tag

/** Plain text of a node: text and inline code as-is, links as their text, line breaks as spaces. */
const plainText = (node: LexicalNode): string => {
  if (node.type === 'linebreak' || node.type === 'tab') return ' '
  if (typeof node.text === 'string') return node.text
  const children = node.children ?? []
  if (node.type === 'list') return children.map(plainText).map(collapse).filter(Boolean).join(' ')
  // A nested list sits inside a list item next to the item's own text.
  return children
    .map((child) => (child.type === 'list' ? ` ${plainText(child)} ` : plainText(child)))
    .join('')
}

const collapse = (text: string) => text.replace(/\s+/g, ' ').trim()

const truncate = (text: string, max: number) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut
  return `${base.replace(/[\s,;:.\-–—]+$/, '')}…`
}

/**
 * Questions and answers from a blog post's FAQ section, for FAQPage JSON-LD.
 *
 * The section is the first H2 whose text contains "FAQ" or "Frequently Asked"
 * (e.g. "Frequently Asked Questions", "Delta Symbol FAQ"). Each H3 after it is
 * a question; the paragraphs and lists up to the next H3 are its answer. The
 * section ends at the next H2 (or H1 / horizontal rule). The closing
 * call-to-action paragraph (see CLOSING_CTA) is never part of an answer.
 * Questions without answer text are skipped.
 */
export function extractFaqFromLexical(content: LexicalState): FaqItem[] {
  const nodes = content?.root?.children ?? []
  const start = nodes.findIndex((n) => isHeading(n, 'h2') && FAQ_HEADING.test(plainText(n)))
  if (start === -1) return []

  const items: FaqItem[] = []
  let question: string | null = null
  let parts: string[] = []

  const flush = () => {
    if (question) {
      const answer = collapse(parts.join(' '))
      if (answer) items.push({ question, answer: truncate(answer, MAX_FAQ_ANSWER_LENGTH) })
    }
    question = null
    parts = []
  }

  for (const node of nodes.slice(start + 1)) {
    if (isHeading(node, 'h2') || isHeading(node, 'h1') || node.type === 'horizontalrule') break
    if (isHeading(node, 'h3')) {
      flush()
      question = collapse(plainText(node)) || null
      continue
    }
    if (!question || (node.type !== 'paragraph' && node.type !== 'list')) continue
    const text = collapse(plainText(node))
    if (!text) continue
    if (node.type === 'paragraph' && CLOSING_CTA.test(text)) continue
    parts.push(text)
  }
  flush()

  return items
}
