'use client'

import React, { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

import { EVENTS, track } from '@/lib/analytics'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const APP_ORIGIN = 'https://app.useoctree.com'

// Initialise once, synchronously, when this client module is first evaluated in
// the browser so the very first pageview (captured in an effect below) is not
// lost. Without a key (local dev) this is a no-op and every `track()` call is too.
if (typeof window !== 'undefined' && POSTHOG_KEY && !posthog.__loaded) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    // App Router navigations do not reload the page; PostHogPageView captures them.
    capture_pageview: false,
    capture_pageleave: true,
    capture_exceptions: true,
    cross_subdomain_cookie: true,
    persistence: 'localStorage+cookie',
  })
}

/** "/learn/tables" -> "learn:tables", "/blog/foo" -> "blog:foo", "/" -> "home". */
function locationFromPathname(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '')
  return trimmed ? trimmed.replace(/\//g, ':') : 'home'
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return
    let url = window.origin + pathname
    const query = searchParams.toString()
    if (query) url += `?${query}`
    posthog.capture('$pageview', { $current_url: url })

    // Content views, derived from the route so pages need no per-file edits.
    const blog = pathname.match(/^\/blog\/(?!page\/)([^/]+)\/?$/)
    if (blog) track(EVENTS.BLOG_POST_VIEWED, { slug: blog[1] })
    const learn = pathname.match(/^\/learn\/([^/]+)\/?$/)
    if (learn) track(EVENTS.LEARN_GUIDE_VIEWED, { slug: learn[1] })
  }, [pathname, searchParams])

  return null
}

/**
 * One capture-phase listener for every link into the app, so server-rendered
 * CTAs stay server components. The location comes from the nearest
 * `data-cta-location` attribute, falling back to the current route.
 */
function PostHogCtaClicks() {
  const pathname = usePathname()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || !anchor.href.startsWith(APP_ORIGIN)) return
      const location =
        anchor.closest('[data-cta-location]')?.getAttribute('data-cta-location') ||
        locationFromPathname(pathname || '/')
      track(EVENTS.CTA_CLICKED, { location, href: anchor.href })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PostHogCtaClicks />
      {/* useSearchParams needs a Suspense boundary so static pages keep prerendering. */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
    </>
  )
}
