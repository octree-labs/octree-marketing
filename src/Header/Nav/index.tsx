'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { GitHubStars } from '@/components/GitHubStars'
import { RedditIcon } from '@/components/icons/reddit'
import { DiscordIcon } from '@/components/icons/discord'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const HeaderNav: React.FC<{ data: HeaderType; githubStars: number | null }> = ({
  data,
  githubStars,
}) => {
  const navItems = data?.navItems || []
  const contactItems = navItems.filter(({ link }) => link.label === 'Contact')
  const otherItems = navItems.filter(({ link }) => link.label !== 'Contact')

  return (
    <nav className="flex gap-3 items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex gap-6 xl:gap-8 items-center">
        {otherItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="text-base" />
        })}
        <Button asChild variant="link" size="clear" className="text-base">
          <Link href="/learn">Learn</Link>
        </Button>
        <Button asChild variant="link" size="clear" className="text-base">
          <Link href="https://tools.useoctree.com" target="_blank" rel="noopener noreferrer">
            Tools
          </Link>
        </Button>
        <Button asChild variant="link" size="clear" className="text-base">
          <Link href="/docs/compile-api">Docs</Link>
        </Button>
        {contactItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="text-base" />
        })}
      </div>

      <div className="flex items-center gap-1 text-neutral-800">
        <GitHubStars repo="Octree-AI-Latex-Editor/octree" stars={githubStars} />
        <Link
          href="https://www.reddit.com/r/Octree/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-neutral-100"
        >
          <span className="sr-only">Reddit</span>
          <RedditIcon className="w-5 h-5" />
        </Link>
        <Link
          href="https://discord.gg/H6X7rMzBak"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-neutral-100"
        >
          <span className="sr-only">Discord</span>
          <DiscordIcon className="w-5 h-5" />
        </Link>
      </div>

      <Link
        href="https://app.useoctree.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block"
        data-cta-location="header"
      >
        <Button variant="default" size="sm" className="h-8">
          Login
        </Button>
      </Link>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6">
          <div className="flex flex-col gap-4 mt-8">
            {otherItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="link" className="text-lg" />
            })}
            <Button asChild variant="link" size="clear" className="text-lg">
              <Link href="/learn">Learn</Link>
            </Button>
            <Button asChild variant="link" size="clear" className="text-lg">
              <Link href="https://tools.useoctree.com" target="_blank" rel="noopener noreferrer">
                Tools
              </Link>
            </Button>
            <Button asChild variant="link" size="clear" className="text-lg">
              <Link href="/docs/compile-api">Docs</Link>
            </Button>
            {contactItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="link" className="text-lg" />
            })}
            <Link
              href="https://app.useoctree.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="header_mobile"
            >
              <Button variant="default" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
