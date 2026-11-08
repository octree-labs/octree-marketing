/**
 * First-party relay for PostHog.
 *
 * posthog-js used to post straight to us.i.posthog.com, a host every common
 * ad/tracking blocklist (uBlock Origin, Brave Shields, AdGuard, EasyPrivacy)
 * blocks, so a blocked browser sent no pageviews, CTA clicks or exceptions at
 * all (about a quarter of app sign-ups had no browser events before the app
 * moved to the same relay, octree-labs/octree#435). Sending through a path on
 * www.useoctree.com keeps the requests first-party; next.config.js rewrites
 * them to PostHog.
 *
 * Plain JS (not TS) because next.config.js imports it directly; the PostHog
 * provider imports it too, so it must stay free of server-only and
 * client-only imports.
 */

/** Path prefix on this site's own origin that forwards to PostHog. */
export const POSTHOG_RELAY_PATH = '/relay-o7'

const DEFAULT_INGEST_HOST = 'https://us.i.posthog.com'

/**
 * The PostHog ingestion host the relay forwards to. A NEXT_PUBLIC_POSTHOG_HOST
 * that already points at the relay (or any relative path) falls back to the
 * default so the rewrite can never point at itself.
 * @param {string | null | undefined} configured
 * @returns {string}
 */
export function resolveIngestHost(configured) {
  const value = configured?.trim().replace(/\/+$/, '')
  if (!value || !/^https?:\/\//.test(value)) return DEFAULT_INGEST_HOST
  return value
}

/**
 * us.i.posthog.com -> us-assets.i.posthog.com (static bundles, remote config).
 * @param {string} ingestHost
 * @returns {string}
 */
export function assetsHostFor(ingestHost) {
  return ingestHost.replace(/^(https?:\/\/)(us|eu)\.i\.posthog\.com$/, '$1$2-assets.i.posthog.com')
}

/**
 * The PostHog web app (links in the toolbar), for `ui_host`.
 * @param {string} ingestHost
 * @returns {string}
 */
export function uiHostFor(ingestHost) {
  const match = ingestHost.match(/^https?:\/\/(us|eu)\.i\.posthog\.com$/)
  return match ? `https://${match[1]}.posthog.com` : ingestHost
}

/**
 * Order matters: the asset paths must come before the catch-all so the
 * recorder/surveys bundles and remote config are fetched from the assets host.
 * @param {string | null | undefined} configuredHost
 * @returns {{ source: string, destination: string }[]}
 */
export function posthogRelayRewrites(configuredHost) {
  const ingest = resolveIngestHost(configuredHost)
  const assets = assetsHostFor(ingest)
  return [
    { source: `${POSTHOG_RELAY_PATH}/static/:path*`, destination: `${assets}/static/:path*` },
    { source: `${POSTHOG_RELAY_PATH}/array/:path*`, destination: `${assets}/array/:path*` },
    { source: `${POSTHOG_RELAY_PATH}/:path*`, destination: `${ingest}/:path*` },
  ]
}
