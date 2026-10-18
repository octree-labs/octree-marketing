'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

import { OpenInOctree } from '@/components/OpenInOctree'
import { isLatexSnippet, defaultLatexDocument } from '@/utilities/wrapLatexDocument'

type Placement = {
  container: HTMLElement
  latex: string
}

type Plan = {
  source: string
  title: string
  placements: Placement[]
}

const MARKER = 'data-octree-cta-root'

/** Direct `<pre>` children of the article (every guide renders `<pre><code>` at the top level). */
function findLatexPre(article: HTMLElement): HTMLPreElement | null {
  for (const pre of Array.from(article.querySelectorAll<HTMLPreElement>(':scope > pre'))) {
    if (isLatexSnippet(pre.textContent ?? '')) return pre
  }
  return null
}

/**
 * The tail of a guide is "Related Articles" plus the existing closing CTA, both
 * `.not-prose` blocks after the last sample. The closing box goes in front of
 * the first of those so it closes the article body rather than the page.
 */
function findTailStart(article: HTMLElement): Element | null {
  const children = Array.from(article.children)
  let lastContent = -1
  children.forEach((child, i) => {
    if (!child.classList.contains('not-prose')) lastContent = i
  })
  return children[lastContent + 1] ?? null
}

function buildPlan(article: HTMLElement, slug: string): Plan {
  const title = article.querySelector('h1')?.textContent?.trim() || document.title
  const pre = findLatexPre(article)
  const latex = pre?.textContent ?? defaultLatexDocument(title)
  const placements: Placement[] = []

  if (pre) {
    const container = document.createElement('div')
    container.setAttribute(MARKER, 'first')
    pre.insertAdjacentElement('afterend', container)
    placements.push({ container, latex })
  }

  const tailStart = findTailStart(article)
  // Skip the closing box when it would sit right under the first one.
  const previous = tailStart ? tailStart.previousElementSibling : article.lastElementChild
  if (!previous || !previous.hasAttribute(MARKER)) {
    const container = document.createElement('div')
    container.setAttribute(MARKER, 'closing')
    if (tailStart) tailStart.insertAdjacentElement('beforebegin', container)
    else article.appendChild(container)
    placements.push({ container, latex })
  }

  return { source: `www:learn:${slug}`, title, placements }
}

/**
 * Mounted once from the /learn layout. For each guide it finds the first LaTeX
 * `<pre><code>` in `article.prose`, appends an "Open in Octree" box after it and
 * another at the end of the article body. The pages stay static and
 * server-rendered; without JavaScript nothing is added. StrictMode's double
 * effect is handled by the cleanup removing what the effect inserted.
 */
export function LearnOpenInOctree() {
  const pathname = usePathname()
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const match = pathname?.match(/^\/learn\/([^/]+)\/?$/)
    if (!match) return
    const article = document.querySelector<HTMLElement>('article.prose')
    if (!article || article.querySelector(`[${MARKER}]`)) return

    const next = buildPlan(article, match[1])
    setPlan(next)
    return () => {
      next.placements.forEach(({ container }) => container.remove())
      setPlan(null)
    }
  }, [pathname])

  if (!plan) return null
  return (
    <>
      {plan.placements.map(({ container, latex }, i) =>
        createPortal(
          <OpenInOctree latex={latex} title={plan.title} source={plan.source} />,
          container,
          `${plan.source}:${i}`,
        ),
      )}
    </>
  )
}
