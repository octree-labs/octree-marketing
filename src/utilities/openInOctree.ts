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

/**
 * Drafts endpoint with utm params. PostHog campaign properties live in
 * per-origin storage, so they must travel in the URL; the app copies utm_* from
 * this action onto its redirect into the editor.
 */
export function draftsActionUrl(source?: string): string {
  const url = new URL(OCTREE_DRAFTS_URL)
  url.searchParams.set('utm_source', 'www')
  url.searchParams.set('utm_medium', 'draft')
  if (source) url.searchParams.set('utm_campaign', source)
  return url.toString()
}

export function openInOctree({ latex, title, source }: OpenInOctreeOptions): void {
  if (typeof document === 'undefined') return

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = draftsActionUrl(source)
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
