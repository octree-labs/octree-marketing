import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Media } from '@/payload-types'
import { getImageURL } from '@/utilities/generateMeta'

afterEach(() => vi.unstubAllEnvs())

describe('getImageURL', () => {
  it('uses the Octree image when no populated media is available', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://www.useoctree.com')
    for (const image of [undefined, null, 12]) {
      expect(getImageURL(image)).toBe('https://www.useoctree.com/images/homepage-og.png')
    }
  })

  it('preserves an absolute media URL', () => {
    const image = { url: 'https://example.com/image.png' } as Media
    expect(getImageURL(image)).toBe(image.url)
  })

  it('resolves the preferred social image against the site origin', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://www.useoctree.com/')
    const image = { url: '/original.png', sizes: { og: { url: '/social.png' } } } as Media
    expect(getImageURL(image)).toBe('https://www.useoctree.com/social.png')
  })
})
