/**
 * Sends LaTeX to the app as a draft. Mirrors tools.useoctree.com: a top-level
 * form POST (no CORS, carries large payloads) that the app answers with a
 * redirect into the new project, keeping the draft through sign-up when needed.
 * The form exists only for the click, so there is nothing in the static HTML.
 */

export const OCTREE_DRAFTS_URL = 'https://app.useoctree.com/api/drafts'

export interface OpenInOctreeOptions {
  latex: string
  title?: string
  source?: string
}

export function openInOctree({ latex, title, source }: OpenInOctreeOptions): void {
  if (typeof document === 'undefined') return

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = OCTREE_DRAFTS_URL
  form.style.display = 'none'

  const content = document.createElement('textarea')
  content.name = 'content'
  content.value = latex
  form.appendChild(content)

  const titleInput = document.createElement('input')
  titleInput.type = 'hidden'
  titleInput.name = 'title'
  titleInput.value = title || 'Imported from Octree'
  form.appendChild(titleInput)

  const sourceInput = document.createElement('input')
  sourceInput.type = 'hidden'
  sourceInput.name = 'source'
  sourceInput.value = source || ''
  form.appendChild(sourceInput)

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
