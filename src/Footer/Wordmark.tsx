import React from 'react'
import { cn } from '@/utilities/ui'

// "octree" drawn with the same 45° chamfered geometry as the octagon ring in the logo mark.
// Glyphs sit on a 120-unit-tall grid with a 24-unit stroke; outer corners are cut by 30, inner by 16.
const glyphs = [
  // o
  'M30 0H74L104 30V90L74 120H30L0 90V30Z M40 24L24 40V80L40 96H64L80 80V40L64 24Z',
  // c
  'M150 0H216V24H160L144 40V80L160 96H216V120H150L120 90V30Z',
  // t
  'M250 0H274V24H316V48H274V80L290 96H316V120H280L250 90V48H232V24H250Z',
  // r
  'M332 30L362 0H416V24H372L356 40V120H332Z',
  // e
  'M462 0H506L536 30V72H456V80L472 96H536V120H462L432 90V30Z M472 24L456 40V48H512V40L496 24Z',
  // e
  'M582 0H626L656 30V72H576V80L592 96H656V120H582L552 90V30Z M592 24L576 40V48H632V40L616 24Z',
]

export const Wordmark = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 656 120"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={cn('block h-auto w-full', className)}
    >
      {glyphs.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
