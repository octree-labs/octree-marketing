import React from 'react'

import { LearnOpenInOctree } from '@/components/Learn/open-in-octree'

/** Adds the "Open in Octree" boxes to every guide without touching the static pages. */
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LearnOpenInOctree />
    </>
  )
}
