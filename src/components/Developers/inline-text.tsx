import React from 'react'

import { splitInlineCode } from '@/utilities/inlineCode'
import { cn } from '@/utilities/ui'

/** Inline code style for /developers: wraps anywhere so long URLs never widen the page. */
export const INLINE_CODE_CLASS =
  'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-normal text-foreground [overflow-wrap:anywhere]'

export const Code: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <code className={cn(INLINE_CODE_CLASS, className)}>{children}</code>

/** Renders a string with `backtick` spans as inline code. Plain text only, no HTML. */
export const InlineText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {splitInlineCode(text).map((segment, i) =>
      segment.code ? (
        <Code key={i}>{segment.text}</Code>
      ) : (
        <React.Fragment key={i}>{segment.text}</React.Fragment>
      ),
    )}
  </>
)

/** A string is rendered with InlineText; any other node as is. */
export const renderInline = (content: React.ReactNode): React.ReactNode =>
  typeof content === 'string' ? <InlineText text={content} /> : content
