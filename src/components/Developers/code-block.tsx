'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { EVENTS, track } from '@/lib/analytics'
import { nextTabIndex } from '@/utilities/tabNav'
import { cn } from '@/utilities/ui'

const useCopy = () => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); nothing else to do.
    }
  }

  return { copied, copy }
}

/** A 40 px copy button; tracks `cta_clicked` with action "copy" when given a location. */
export const CopyButton: React.FC<{
  text: string
  className?: string
  trackLocation?: string
  label?: string
}> = ({ text, className, trackLocation, label = 'Copy code' }) => {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => {
        if (trackLocation) track(EVENTS.CTA_CLICKED, { location: trackLocation, action: 'copy' })
        void copy(text)
      }}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

/** Scrolls on its own in both directions, so a long line or a long file never widens the page. */
const CodeBody: React.FC<{ code: string; label?: string }> = ({ code, label }) => (
  <pre
    tabIndex={0}
    aria-label={label}
    className="m-0 max-h-[26rem] w-full max-w-full overflow-auto bg-transparent p-4 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
  >
    <code className="font-mono">{code}</code>
  </pre>
)

const FRAME_CLASS =
  'not-prose my-5 w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-border bg-muted/30'

interface CodeBlockProps {
  code: string
  /** Small label in the header bar, e.g. "bash" or "~/.cursor/mcp.json". */
  title?: string
  /** Analytics location for copy clicks, e.g. "developers:cursor". */
  trackLocation?: string
  className?: string
}

/** A code sample with a header (file name or language) and a copy button. */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title, trackLocation, className }) => (
  <div className={cn(FRAME_CLASS, className)}>
    <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border py-0.5 pl-4 pr-1">
      <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
        {title ?? ''}
      </span>
      <CopyButton text={code} trackLocation={trackLocation} />
    </div>
    <CodeBody code={code} label={title} />
  </div>
)

export interface CodeTab {
  label: string
  code: string
  /** Optional sentence shown above the code for this tab. */
  note?: React.ReactNode
  /** Analytics location for copy clicks on this tab. */
  trackLocation?: string
}

/**
 * Several code samples behind WAI-ARIA tabs (arrow keys, Home, End). Every
 * panel stays in the HTML; inactive ones are hidden.
 */
export const CodeTabs: React.FC<{ tabs: CodeTab[]; ariaLabel?: string; className?: string }> = ({
  tabs,
  ariaLabel,
  className,
}) => {
  const baseId = useId()
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tab = tabs[active]
  if (!tab) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = nextTabIndex(active, e.key, tabs.length)
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={cn(FRAME_CLASS, className)}>
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border py-0.5 pl-1.5 pr-1">
        <div
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto py-1"
        >
          {tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'h-8 whitespace-nowrap rounded-md px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                i === active
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={tab.code} trackLocation={tab.trackLocation} />
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
        >
          {t.note && (
            <p className="border-b border-border px-4 py-2 text-sm text-muted-foreground">
              {t.note}
            </p>
          )}
          <CodeBody code={t.code} />
        </div>
      ))}
    </div>
  )
}

/** A labelled one-line value (URL, endpoint) with a copy button, e.g. in the hero. */
export const CopyChip: React.FC<{
  label: string
  value: string
  copyText?: string
  trackLocation?: string
}> = ({ label, value, copyText, trackLocation }) => (
  <div className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-border bg-muted/30 py-0.5 pl-3 pr-0.5 sm:w-auto sm:max-w-full">
    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <code className="min-w-0 flex-1 font-mono text-[13px] text-foreground [overflow-wrap:anywhere]">
      {value}
    </code>
    <CopyButton
      text={copyText ?? value}
      trackLocation={trackLocation}
      label={`Copy ${label} URL`}
    />
  </div>
)
