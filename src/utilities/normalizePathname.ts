/**
 * Normalizes a pathname from `usePathname()` so the server and client agree.
 *
 * When Next.js regenerates the ISR home page in the background, it renders `/`
 * with the pathname `/index` (the RSC payload carries `"c":["","index"]`), while
 * the browser hydrates with `/`. Any branch on `pathname === '/'` then renders
 * different markup on each side and React throws hydration error #418. Mapping
 * `/index` back to `/` keeps both renders identical. No real route is `/index`.
 */
export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) return '/'
  if (pathname === '/index' || pathname === '/index/') return '/'
  return pathname
}
