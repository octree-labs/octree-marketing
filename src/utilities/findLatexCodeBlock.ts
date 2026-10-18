import { isLatexSnippet } from './wrapLatexDocument'

/** The subset of a Lexical editor state the CTA placement needs. */
export type LexicalNodeLike = {
  type?: string
  fields?: unknown
  children?: LexicalNodeLike[] | null
  text?: string
  [k: string]: unknown
}

type CodeBlockFields = { blockType: 'code'; code: string; language?: string | null }

export type LexicalStateLike = { root?: { children?: LexicalNodeLike[] | null } | null } | null | undefined

export type LatexCodeBlock = {
  /** The exact node object from the editor state, for identity checks in converters. */
  node: LexicalNodeLike
  code: string
}

export function isLatexCodeBlockNode(
  node: LexicalNodeLike | null | undefined,
): node is LexicalNodeLike & { fields: CodeBlockFields } {
  if (!node || node.type !== 'block') return false
  const fields = node.fields as Partial<CodeBlockFields> | null | undefined
  if (!fields || fields.blockType !== 'code' || typeof fields.code !== 'string') return false
  return isLatexSnippet(fields.code, fields.language)
}

/** Depth-first search for the first `code` block whose contents are LaTeX. */
export function findFirstLatexCodeBlock(data: LexicalStateLike): LatexCodeBlock | null {
  const walk = (nodes: LexicalNodeLike[] | null | undefined): LatexCodeBlock | null => {
    if (!nodes) return null
    for (const node of nodes) {
      if (isLatexCodeBlockNode(node)) return { node, code: node.fields.code }
      const found = walk(node.children)
      if (found) return found
    }
    return null
  }
  return walk(data?.root?.children)
}

function isEmptyNode(node: LexicalNodeLike): boolean {
  if (node.type === 'linebreak') return true
  if (node.type === 'paragraph') {
    return !node.children || node.children.every((child) => isEmptyNode(child))
  }
  if (node.type === 'text') return !(node.text && node.text.trim())
  return false
}

/**
 * True when `node` is the last piece of real content at the top level of the
 * editor state (empty trailing paragraphs are ignored). Used so the closing
 * CTA is not rendered right under the in-content one.
 */
export function isLastContentNode(data: LexicalStateLike, node: LexicalNodeLike): boolean {
  const children = data?.root?.children
  if (!children) return false
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i]
    if (isEmptyNode(child)) continue
    return child === node
  }
  return false
}
