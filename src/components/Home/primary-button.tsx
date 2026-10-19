import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export function PrimaryButton({
  children,
  className,
  href = 'https://app.useoctree.com/',
  location,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  href?: string
  /** Where on the site this CTA lives; recorded as the `location` of the cta_clicked event. */
  location?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <Link href={href} data-cta-location={location} onClick={onClick}>
      <Button
        className={cn(
          'group w-fit',
          className,
        )}
      >
        <span className="flex items-center">
          {children}
          <span className="max-w-0 overflow-hidden transition-all duration-200 group-hover:max-w-6 group-hover:ml-1">
            <ArrowRight className="size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </span>
        </span>
      </Button>
    </Link>
  )
}
