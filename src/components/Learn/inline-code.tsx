import React from 'react'

/** Renders «text» segments as <code>; everything else is plain text. */
export function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(«[^»]*»)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('«') && part.endsWith('»') ? (
          <code key={i}>{part.slice(1, -1)}</code>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}
