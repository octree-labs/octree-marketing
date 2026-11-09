import { describe, expect, it } from 'vitest'

import { isGoogleAppStackOverflow } from '@/utilities/isGoogleAppStackOverflow'

const GSA_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 26_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/443.5.997327796 Mobile/15E148 Safari/604.1'
const SAFARI_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
const PAGE = 'https://www.useoctree.com/blog/alpha-symbol-uses-meaning-complete-guide'

const overflow = (filenames: string[]) => [
  {
    type: 'RangeError',
    value: 'Maximum call stack size exceeded.',
    stacktrace: { frames: filenames.map((filename) => ({ filename })) },
  },
]

describe('isGoogleAppStackOverflow', () => {
  it('matches the Google app overflow thrown from injected (page-URL) frames', () => {
    expect(isGoogleAppStackOverflow(GSA_UA, overflow([PAGE, PAGE, PAGE]))).toBe(true)
    expect(isGoogleAppStackOverflow(GSA_UA, overflow([]))).toBe(true)
  })

  it('keeps an overflow that runs through our own bundles', () => {
    const frames = [PAGE, 'https://www.useoctree.com/_next/static/chunks/2527-abc.js']
    expect(isGoogleAppStackOverflow(GSA_UA, overflow(frames))).toBe(false)
  })

  it('keeps the same overflow in other browsers', () => {
    expect(isGoogleAppStackOverflow(SAFARI_UA, overflow([PAGE]))).toBe(false)
    expect(isGoogleAppStackOverflow(undefined, overflow([PAGE]))).toBe(false)
  })

  it('keeps other exceptions from the Google app', () => {
    const hydration = [{ type: 'Error', value: 'Minified React error #418', stacktrace: null }]
    expect(isGoogleAppStackOverflow(GSA_UA, hydration)).toBe(false)
    expect(isGoogleAppStackOverflow(GSA_UA, [])).toBe(false)
  })
})
