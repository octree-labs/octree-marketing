import posthog, { type CaptureOptions } from 'posthog-js'

/**
 * Product analytics event names for the marketing site.
 * Event properties must never contain PII — slugs, hrefs and locations only.
 */
export const EVENTS = {
  CTA_CLICKED: 'cta_clicked',
  BLOG_POST_VIEWED: 'blog_post_viewed',
  LEARN_GUIDE_VIEWED: 'learn_guide_viewed',
  /** The in-content "Open in Octree" box scrolled into view. Props: placement. */
  CTA_IMPRESSION: 'cta_impression',
  /** "Open in Octree" pressed on a blog post or learn guide. Props: source, title_length. */
  OPEN_IN_OCTREE_CLICKED: 'open_in_octree_clicked',
  /** A pricing section was at least half in the viewport, once per page load. Props: section. */
  PRICING_VIEWED: 'pricing_viewed',
  /** A plan button or link in a pricing section was pressed. Props: plan, cta, href (path only). */
  PRICING_PLAN_CLICKED: 'pricing_plan_clicked',
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]
export type EventProps = Record<string, string | number | boolean | null | undefined>

/** True once posthog.init() has run in the browser (false on the server or without a key). */
export function isPostHogLoaded(): boolean {
  return typeof window !== 'undefined' && Boolean(posthog.__loaded)
}

/** Capture a product event; a silent no-op when PostHog is not loaded. */
export function track(event: EventName, props?: EventProps, options?: CaptureOptions) {
  if (!isPostHogLoaded()) return
  try {
    posthog.capture(event, props, options)
  } catch {
    // Analytics must never break the UI.
  }
}

/**
 * For events fired right before a full-page navigation (CTA into the app):
 * skip the batch queue and use sendBeacon so the request outlives the page.
 */
export const BEFORE_NAVIGATION: CaptureOptions = { send_instantly: true, transport: 'sendBeacon' }
