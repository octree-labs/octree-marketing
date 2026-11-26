/**
 * Tiny inline markup for hand-written page copy: `backtick` spans are code,
 * everything else is plain text. No HTML is ever parsed, so the result is
 * safe to render as React text nodes.
 */

export interface InlineSegment {
  text: string
  code: boolean
}

const CODE_SPAN = /`([^`]+)`/g

/** Split text into plain and code segments. An unpaired backtick stays as text. */
export const splitInlineCode = (text: string): InlineSegment[] => {
  const segments: InlineSegment[] = []
  let last = 0
  for (const match of text.matchAll(CODE_SPAN)) {
    const start = match.index ?? 0
    if (start > last) segments.push({ text: text.slice(last, start), code: false })
    segments.push({ text: match[1] ?? '', code: true })
    last = start + match[0].length
  }
  if (last < text.length) segments.push({ text: text.slice(last), code: false })
  return segments
}

/** The same text with the code-span backticks removed, e.g. for JSON-LD. */
export const stripInlineCode = (text: string): string =>
  splitInlineCode(text)
    .map((s) => s.text)
    .join('')
