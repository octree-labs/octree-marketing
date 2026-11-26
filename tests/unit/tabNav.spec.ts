import { describe, expect, it } from 'vitest'

import { nextTabIndex, tabIdFromHash } from '@/utilities/tabNav'

describe('nextTabIndex', () => {
  it('moves right and wraps', () => {
    expect(nextTabIndex(0, 'ArrowRight', 3)).toBe(1)
    expect(nextTabIndex(2, 'ArrowRight', 3)).toBe(0)
    expect(nextTabIndex(2, 'ArrowDown', 3)).toBe(0)
  })

  it('moves left and wraps', () => {
    expect(nextTabIndex(1, 'ArrowLeft', 3)).toBe(0)
    expect(nextTabIndex(0, 'ArrowLeft', 3)).toBe(2)
    expect(nextTabIndex(0, 'ArrowUp', 3)).toBe(2)
  })

  it('jumps with Home and End', () => {
    expect(nextTabIndex(2, 'Home', 5)).toBe(0)
    expect(nextTabIndex(0, 'End', 5)).toBe(4)
  })

  it('ignores other keys and empty tab lists', () => {
    expect(nextTabIndex(0, 'Enter', 3)).toBeNull()
    expect(nextTabIndex(0, 'a', 3)).toBeNull()
    expect(nextTabIndex(0, 'ArrowRight', 0)).toBeNull()
  })
})

describe('tabIdFromHash', () => {
  const ids = ['claude-code', 'cursor', 'vscode', 'other'] as const
  const options = { prefix: 'connect-', aliases: { windsurf: 'other', 'vs-code': 'vscode' } as const }

  it('matches a bare tab id', () => {
    expect(tabIdFromHash('#cursor', ids, options)).toBe('cursor')
    expect(tabIdFromHash('cursor', ids, options)).toBe('cursor')
  })

  it('matches the old prefixed card anchors', () => {
    expect(tabIdFromHash('#connect-claude-code', ids, options)).toBe('claude-code')
    expect(tabIdFromHash('#connect-vscode', ids, options)).toBe('vscode')
  })

  it('is case-insensitive and resolves aliases', () => {
    expect(tabIdFromHash('#Cursor', ids, options)).toBe('cursor')
    expect(tabIdFromHash('#windsurf', ids, options)).toBe('other')
    expect(tabIdFromHash('#VS-Code', ids, options)).toBe('vscode')
  })

  it('returns null for other anchors and bad input', () => {
    expect(tabIdFromHash('', ids, options)).toBeNull()
    expect(tabIdFromHash('#', ids, options)).toBeNull()
    expect(tabIdFromHash('#faq', ids, options)).toBeNull()
    expect(tabIdFromHash('#connect', ids, options)).toBeNull()
    expect(tabIdFromHash('#%E0%A4%A', ids, options)).toBeNull()
  })
})
