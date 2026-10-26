import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('my-key', 'default'))
    expect(result.current.value).toBe('default')
  })

  it('reads an existing value from localStorage on mount', () => {
    localStorage.setItem('my-key', JSON.stringify({ a: 1 }))
    const { result } = renderHook(() => useLocalStorage('my-key', { a: 0 }))
    expect(result.current.value).toEqual({ a: 1 })
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('nums', []))

    act(() => {
      result.current.set([1, 2, 3])
    })

    expect(result.current.value).toEqual([1, 2, 3])
    expect(JSON.parse(localStorage.getItem('nums') as string)).toEqual([1, 2, 3])
  })

  it('falls back to the initial value when stored JSON is corrupted', () => {
    localStorage.setItem('broken', '{not valid json')
    const { result } = renderHook(() => useLocalStorage('broken', 'fallback'))
    expect(result.current.value).toBe('fallback')
  })

  it('keeps distinct keys independent from one another', () => {
    const { result: a } = renderHook(() => useLocalStorage('key-a', 'A'))
    const { result: b } = renderHook(() => useLocalStorage('key-b', 'B'))

    act(() => {
      a.current.set('A-updated')
    })

    expect(a.current.value).toBe('A-updated')
    expect(b.current.value).toBe('B')
  })
})
