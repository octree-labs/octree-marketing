import { describe, expect, it } from 'vitest'

import { normalizePathname } from '@/utilities/normalizePathname'

describe('normalizePathname', () => {
  it('maps the ISR-regenerated home pathname back to /', () => {
    expect(normalizePathname('/index')).toBe('/')
    expect(normalizePathname('/index/')).toBe('/')
  })

  it('treats a missing pathname as /', () => {
    expect(normalizePathname(null)).toBe('/')
    expect(normalizePathname(undefined)).toBe('/')
    expect(normalizePathname('')).toBe('/')
  })

  it('leaves every other pathname alone', () => {
    expect(normalizePathname('/')).toBe('/')
    expect(normalizePathname('/about')).toBe('/about')
    expect(normalizePathname('/blog/index-of-symbols')).toBe('/blog/index-of-symbols')
    expect(normalizePathname('/learn/index')).toBe('/learn/index')
  })
})
