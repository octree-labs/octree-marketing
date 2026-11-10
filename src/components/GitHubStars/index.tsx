import React from 'react'
import Link from 'next/link'
import { GitHubIcon } from '@/components/icons/github'
import { Star } from 'lucide-react'

interface GitHubStarsProps {
  repo: string
  /** Star count, fetched and cached server-side. Null falls back to a placeholder. */
  stars: number | null
  className?: string
}

export const GitHubStars: React.FC<GitHubStarsProps> = ({ repo, stars, className = '' }) => {
  return (
    <Link
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 transition-colors bg-white hover:bg-neutral-50 text-sm font-medium ${className}`}
    >
      <GitHubIcon className="w-4 h-4" />

      <div className="flex items-center gap-1">
        <Star className="w-3 h-3 fill-current" />
        <span className="font-mono text-xs whitespace-nowrap">
          {/* Fixed locale: this renders on the server (en-US) and hydrates in the
              visitor's locale, so a default toLocaleString() turns 301 into ٣٠١
              for Arabic/Persian visitors (and 1,301 into 1.301 for German ones)
              and React throws hydration error #418. */}
          {stars !== null ? stars.toLocaleString('en-US') : '280'}
        </span>
      </div>
    </Link>
  )
}
