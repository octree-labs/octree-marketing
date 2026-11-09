'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/utilities/ui'

const useCopy = () => {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); nothing else to do.
    }
  }

  return { copied, copy }
}

const CopyButton: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

const CodeBody: React.FC<{ code: string }> = ({ code }) => (
  <pre className="m-0 overflow-x-auto bg-transparent p-4 text-[13px] leading-relaxed text-foreground">
    <code className="font-mono">{code}</code>
  </pre>
)

interface CodeBlockProps {
  code: string
  /** Small label in the header bar, e.g. "bash" or "Response". */
  title?: string
}

/** A code sample with a copy button. Render outside `prose` (it sets not-prose itself). */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => (
  <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/30">
    <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
      <span className="font-mono text-xs text-muted-foreground">{title ?? ''}</span>
      <CopyButton text={code} />
    </div>
    <CodeBody code={code} />
  </div>
)

export interface CodeTab {
  label: string
  code: string
  /** Optional sentence shown above the code for this tab. */
  note?: React.ReactNode
}

/** Several code samples behind tabs, one copy button for the visible one. */
export const CodeTabs: React.FC<{ tabs: CodeTab[]; ariaLabel?: string }> = ({
  tabs,
  ariaLabel,
}) => {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  if (!tab) return null

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/30">
      <div className="flex items-center justify-between gap-2 border-b border-border px-2 py-1.5">
        <div role="tablist" aria-label={ariaLabel} className="flex gap-1 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-colors',
                i === active
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={tab.code} />
      </div>
      {tab.note && (
        <p className="border-b border-border px-4 py-2 text-sm text-muted-foreground">{tab.note}</p>
      )}
      <CodeBody code={tab.code} />
    </div>
  )
}
