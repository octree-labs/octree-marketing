import React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/utilities/ui'

import { renderInline } from './inline-text'

export interface RefItem {
  /** The name: a field, a status code, a tool. Strings may use `backticks`. */
  term: React.ReactNode
  /** Short secondary label under the term, e.g. a type. */
  meta?: React.ReactNode
  description: React.ReactNode
}

/**
 * A compact reference list: two columns from sm up, stacked on phones, so it
 * never needs horizontal scrolling the way a table does.
 */
export const RefList: React.FC<{ items: RefItem[]; label?: string; className?: string }> = ({
  items,
  label,
  className,
}) => (
  <dl
    aria-label={label}
    className={cn(
      'not-prose my-5 min-w-0 divide-y divide-border rounded-lg border border-border text-[15px] leading-relaxed',
      className,
    )}
  >
    {items.map((item, i) => (
      <div
        key={i}
        className="grid min-w-0 gap-1 px-4 py-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6"
      >
        <dt className="min-w-0 font-medium text-foreground [overflow-wrap:anywhere]">
          {renderInline(item.term)}
          {item.meta && (
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
              {renderInline(item.meta)}
            </span>
          )}
        </dt>
        <dd className="m-0 min-w-0 text-muted-foreground [overflow-wrap:anywhere]">
          {renderInline(item.description)}
        </dd>
      </div>
    ))}
  </dl>
)

/** FAQ as native accordions: answers stay in the HTML, no JavaScript needed. */
export const FaqList: React.FC<{ items: { question: string; answer: string }[] }> = ({ items }) => (
  <div className="not-prose my-5 min-w-0 divide-y divide-border rounded-lg border border-border">
    {items.map((item) => (
      <details key={item.question} className="group">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          <h3 className="m-0 text-base font-medium text-foreground">{item.question}</h3>
          <ChevronDown
            aria-hidden
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          />
        </summary>
        <p className="m-0 px-4 pb-4 text-[15px] leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
          {renderInline(item.answer)}
        </p>
      </details>
    ))}
  </div>
)
