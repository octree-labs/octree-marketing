import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { XIcon } from '@/components/icons/x'
import { LinkedInIcon } from '@/components/icons/linkedin'
import { GitHubIcon } from '@/components/icons/github'
import { DiscordIcon } from '@/components/icons/discord'
import { RedditIcon } from '@/components/icons/reddit'
import { InstagramIcon } from '@/components/icons/instagram'
import { TikTokIcon } from '@/components/icons/tiktok'
import { Wordmark } from './Wordmark'

type FooterLink = {
  title: string
  href: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  highlight?: boolean
}

const productLinks: FooterLink[] = [
  { title: 'Octree Editor', href: 'https://app.useoctree.com' },
  { title: 'Compile API', href: '/docs/compile-api' },
  { title: 'Templates', href: 'https://tools.useoctree.com/templates' },
  { title: 'Symbols', href: 'https://tools.useoctree.com/symbols' },
]

const learnLinks: FooterLink[] = [
  { title: 'Learn LaTeX', href: '/learn/latex' },
  { title: 'Learn TikZ', href: '/learn/tikz' },
  { title: 'Learn PGFPlots', href: '/learn/pgfplots' },
  { title: 'Math Expressions', href: '/learn/mathematical-expressions' },
  { title: 'LaTeX Tables', href: '/learn/tables' },
  { title: 'All tutorials', href: '/learn', highlight: true },
]

const toolLinks: FooterLink[] = [
  { title: 'Math to LaTeX', href: 'https://tools.useoctree.com/tools/math-to-latex' },
  { title: 'PDF to LaTeX', href: 'https://tools.useoctree.com/tools/pdf-to-latex' },
  { title: 'Image to TikZ', href: 'https://tools.useoctree.com/tools/image-to-tikz' },
  { title: 'TikZ Generator', href: 'https://tools.useoctree.com/tools/tikz-generator' },
  { title: 'Citation Generator', href: 'https://tools.useoctree.com/tools/citation-generator' },
  { title: 'All tools', href: 'https://tools.useoctree.com', highlight: true },
]

const companyLinks: FooterLink[] = [
  { title: 'About', href: '/about' },
  { title: 'Open source', href: 'https://github.com/octree-labs' },
]

const socialLinks: FooterLink[] = [
  { title: 'X', href: 'https://x.com/useoctree', icon: XIcon },
  { title: 'LinkedIn', href: 'https://linkedin.com/company/useoctree', icon: LinkedInIcon },
  { title: 'GitHub', href: 'https://github.com/octree-labs', icon: GitHubIcon },
  { title: 'Discord', href: 'https://discord.gg/H6X7rMzBak', icon: DiscordIcon },
  { title: 'Reddit', href: 'https://www.reddit.com/r/Octree/', icon: RedditIcon },
  { title: 'Instagram', href: 'https://instagram.com/useoctree', icon: InstagramIcon },
  { title: 'TikTok', href: 'https://tiktok.com/@useoctree', icon: TikTokIcon },
]

const linkClassName =
  'inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900'

const highlightLinkClassName =
  'inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700'

const isExternal = (href: string) => href.startsWith('http')

const FooterLinkItem = ({ link, showExternalArrow = true }: { link: FooterLink; showExternalArrow?: boolean }) => {
  const external = isExternal(link.href)
  const Icon = link.icon

  return (
    <Link
      href={link.href}
      className={link.highlight ? highlightLinkClassName : linkClassName}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {link.title}
      {external && showExternalArrow && <ArrowUpRight className={cn('h-3 w-3', link.highlight ? 'text-blue-600' : 'text-neutral-400')} />}
    </Link>
  )
}

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
    <nav className="flex flex-col items-start gap-3">{children}</nav>
  </div>
)

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto overflow-hidden border-t border-neutral-200 bg-white text-neutral-900">
      <div className="container pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.6fr_repeat(5,1fr)]">
          <div className="col-span-2 space-y-4 md:col-span-3 lg:col-span-1">
            <Link className="inline-flex" href="/">
              <Logo />
            </Link>
            <p className="max-w-[16rem] text-sm leading-relaxed text-neutral-600">
              The open-source AI LaTeX editor for research writing.
            </p>
          </div>

          <FooterColumn title="Product">
            {productLinks.map((link) => (
              <FooterLinkItem key={link.href} link={link} />
            ))}
          </FooterColumn>

          <FooterColumn title="Learn">
            {learnLinks.map((link) => (
              <FooterLinkItem key={link.href} link={link} />
            ))}
          </FooterColumn>

          <FooterColumn title="Tools">
            {toolLinks.map((link) => (
              <FooterLinkItem key={link.href} link={link} />
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((link) => (
              <FooterLinkItem key={link.href} link={link} />
            ))}
            {navItems.map(({ link }, i) => (
              <CMSLink className={linkClassName} key={i} {...link} />
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            {socialLinks.map((link) => (
              <FooterLinkItem key={link.href} link={link} showExternalArrow={false} />
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 md:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Octree. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className={linkClassName}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClassName}>
              Terms & Conditions
            </Link>
          </div>
        </div>

        <Wordmark className="mt-12 -mb-[2%] text-neutral-100" />
      </div>
    </footer>
  )
}
