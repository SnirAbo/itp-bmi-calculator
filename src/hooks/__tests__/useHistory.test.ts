import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useHistory, type HistoryEntry } from '../useHistory'

const entry = (overrides: Partial<HistoryEntry> = {}): HistoryEntry => ({
  heightM: 1.75,
  weightKg: 70,
  bmi: 22.86,
  at: 1,
  ...overrides
})

describe('useHistory', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with an empty list of entries', () => {
    const { result } = renderHook(() => useHistory())
    expect(result.current.entries).toEqual([])
  })

  it('adds entries to the history', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 1 }))
    })
    act(() => {
      result.current.addEntry(entry({ at: 2, bmi: 25.1 }))
    })

    expect(result.current.entries).toHaveLength(2)
    expect(result.current.entries.map((e) => e.at)).toEqual([1, 2])
  })

  it('deletes an entry by its "at" timestamp', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 1 }))
      result.current.addEntry(entry({ at: 2 }))
    })

    act(() => {
      result.current.deleteEntry(1)
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].at).toBe(2)
  })

  it('clears all entries', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 1 }))
      result.current.addEntry(entry({ at: 2 }))
    })

    act(() => {
      result.current.clearAll()
    })

    expect(result.current.entries).toEqual([])
  })

  it('exports entries as formatted JSON', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 42 }))
    })

    const json = result.current.exportJson()
    expect(JSON.parse(json)).toEqual([entry({ at: 42 })])
  })

  it('imports entries from valid JSON, replacing the current list', () => {
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 1 }))
    })

    const incoming = [entry({ at: 99, bmi: 30 })]
    act(() => {
      result.current.importFromJson(JSON.stringify(incoming))
    })

    expect(result.current.entries).toEqual(incoming)
  })

  it('shows an alert and keeps existing entries when importing invalid JSON', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.addEntry(entry({ at: 1 }))
    })

    act(() => {
      result.current.importFromJson('{not valid json')
    })

    expect(alertSpy).toHaveBeenCalledWith('Invalid JSON')
    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].at).toBe(1)
  })

  it('shows an alert when importing valid JSON that is not an array', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const { result } = renderHook(() => useHistory())

    act(() => {
      result.current.importFromJson(JSON.stringify({ foo: 'bar' }))
    })

    expect(alertSpy).toHaveBeenCalledWith('Invalid JSON')
    expect(result.current.entries).toEqual([])
  })
})
