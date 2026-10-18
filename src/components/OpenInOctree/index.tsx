'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { BEFORE_NAVIGATION, EVENTS, track } from '@/lib/analytics'
import { openInOctree } from '@/utilities/openInOctree'
import { cn } from '@/utilities/ui'
import { wrapLatexDocument } from '@/utilities/wrapLatexDocument'

export interface OpenInOctreeProps {
  /** The LaTeX sample shown on the page. Fragments are wrapped into a compilable document on click. */
  latex: string
  /** Draft title in the app, normally the page title. */
  title: string
  /** Analytics placement, e.g. `www:blog:<slug>` or `www:learn:<slug>`. Also sent to the app. */
  source: string
  /** Button text. */
  label?: string
  className?: string
}

const COPY = 'Try this in Octree \u2014 free LaTeX editor with AI, compiles in your browser'

/**
 * Compact in-content call to action: one line of copy, "Open in Octree" and a
 * muted "Copy LaTeX". Opening posts the snippet to the app as a draft; nothing
 * is added to the static HTML beyond the box itself, and without PostHog the
 * analytics calls are no-ops.
 */
export function OpenInOctree({ latex, title, source, label = 'Open in Octree', className }: OpenInOctreeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  // One impression per mount, when at least a quarter of the box is visible.
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    let seen = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (seen || !entries.some((entry) => entry.isIntersecting)) return
        seen = true
        observer.disconnect()
        track(EVENTS.CTA_IMPRESSION, { placement: source })
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [source])

  const handleOpen = useCallback(() => {
    // The form POST unloads this page: send the event instantly, never await it.
    track(EVENTS.OPEN_IN_OCTREE_CLICKED, { source, title_length: title.length }, BEFORE_NAVIGATION)
    openInOctree({ latex: wrapLatexDocument(latex, title), title, source })
  }, [latex, source, title])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(latex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the button just stays "Copy".
    }
  }, [latex])

  return (
    <div
      ref={ref}
      data-octree-cta={source}
      className={cn(
        'not-prose my-6 flex flex-col gap-3 rounded-lg border border-primary/15 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="m-0 text-sm leading-snug text-muted-foreground">{COPY}</p>
      <div className="flex shrink-0 items-center gap-2">
        <Button type="button" size="sm" onClick={handleOpen}>
          {label}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="text-muted-foreground"
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? 'Copied' : 'Copy LaTeX'}
        </Button>
      </div>
    </div>
  )
}
