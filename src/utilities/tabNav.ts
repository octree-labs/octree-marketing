/**
 * Keyboard and deep-link helpers for WAI-ARIA tabs (automatic activation).
 */

/**
 * The tab index a key moves to: ArrowRight/ArrowDown next, ArrowLeft/ArrowUp
 * previous (both wrap), Home first, End last. Null for any other key.
 */
export const nextTabIndex = (current: number, key: string, count: number): number | null => {
  if (count <= 0) return null
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (current + 1) % count
    case 'ArrowLeft':
    case 'ArrowUp':
      return (current - 1 + count) % count
    case 'Home':
      return 0
    case 'End':
      return count - 1
    default:
      return null
  }
}

/**
 * The tab id a URL hash points at: "#cursor", "#connect-cursor" (the older
 * card anchors) or an alias such as "#windsurf". Null when it is not a tab.
 */
export const tabIdFromHash = <T extends string>(
  hash: string,
  ids: readonly T[],
  options: { prefix?: string; aliases?: Record<string, T> } = {},
): T | null => {
  let value = hash.replace(/^#/, '')
  try {
    value = decodeURIComponent(value)
  } catch {
    return null
  }
  value = value.trim().toLowerCase()
  if (!value) return null
  if (options.prefix && value.startsWith(options.prefix)) value = value.slice(options.prefix.length)
  if ((ids as readonly string[]).includes(value)) return value as T
  return options.aliases?.[value] ?? null
}
