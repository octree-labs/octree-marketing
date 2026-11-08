type ExceptionFrame = { filename?: string }
type ExceptionEntry = {
  type?: string
  value?: string
  stacktrace?: { frames?: ExceptionFrame[] } | null
}

/**
 * True for the "Maximum call stack size exceeded" bursts that the Google
 * Search app (UA token `GSA/`) on iOS throws from a script it injects into the
 * page, e.g. its page translator for non-English users. Those frames report the
 * page URL itself as their file (WKWebView-injected code), never one of our
 * `/_next/` chunks, so nothing in this codebase can fix them. Dropping only
 * that exact combination keeps every other exception, including a real stack
 * overflow in our own bundles, flowing to PostHog.
 */
export function isGoogleAppStackOverflow(
  userAgent: string | undefined,
  exceptions: ExceptionEntry[] | undefined,
): boolean {
  if (!userAgent || !/\bGSA\/\d/.test(userAgent)) return false
  if (!exceptions || exceptions.length === 0) return false

  return exceptions.every((exception) => {
    if (!/Maximum call stack size exceeded/i.test(exception.value ?? '')) return false
    const frames = exception.stacktrace?.frames ?? []
    return frames.every((frame) => !frame.filename?.includes('/_next/'))
  })
}
