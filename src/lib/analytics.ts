import posthog from 'posthog-js'

/**
 * Product analytics event names for the marketing site.
 * Event properties must never contain PII — slugs, hrefs and locations only.
 */
export const EVENTS = {
  CTA_CLICKED: 'cta_clicked',
  BLOG_POST_VIEWED: 'blog_post_viewed',
  LEARN_GUIDE_VIEWED: 'learn_guide_viewed',
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]
export type EventProps = Record<string, string | number | boolean | null | undefined>

/** True once posthog.init() has run in the browser (false on the server or without a key). */
export function isPostHogLoaded(): boolean {
  return typeof window !== 'undefined' && Boolean(posthog.__loaded)
}

/** Capture a product event; a silent no-op when PostHog is not loaded. */
export function track(event: EventName, props?: EventProps) {
  if (!isPostHogLoaded()) return
  try {
    posthog.capture(event, props)
  } catch {
    // Analytics must never break the UI.
  }
}
