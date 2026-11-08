'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { normalizePathname } from '@/utilities/normalizePathname'
import { Logo } from '@/components/Logo/Logo'
import { Cross, hatchStyle } from '@/components/grid'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  githubStars: number | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, githubStars }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Normalized: the ISR-regenerated home page renders on the server with
  // pathname `/index`, which dropped the rails there but not on the client (#418).
  const railsPath = normalizePathname(pathname)
  const hasRails = railsPath === '/' || railsPath === '/about'

  return (
    <header
      className="relative z-20 border-b border-neutral-200 dark:border-neutral-800"
      style={hasRails ? hatchStyle : undefined}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={cn(
          'relative mx-auto max-w-[var(--grid-max-width)] bg-background px-6',
          hasRails && 'border-x border-neutral-200 dark:border-neutral-800',
        )}
      >
        {hasRails && (
          <>
            <Cross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
            <Cross className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
          </>
        )}
        <div className="py-4 lg:py-6 flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
            <HeaderNav data={data} githubStars={githubStars} />
        </div>
      </div>
    </header>
  )
}
