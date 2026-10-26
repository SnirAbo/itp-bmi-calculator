import { useLocalStorage } from './useLocalStorage'

export interface HistoryEntry {
  heightM: number
  weightKg: number
  bmi: number
  at: number
}

export function useHistory() {
  const { value, set } = useLocalStorage<HistoryEntry[]>('bmi-history', [])

  function addEntry(e: HistoryEntry) {
    set([...value, e])
  }
  function deleteEntry(at: number) {
    set(value.filter((e) => e.at !== at))
  }
  function clearAll() {
    set([])
  }
  function exportJson(): string {
    return JSON.stringify(value, null, 2)
  }
  function importFromJson(json: string) {
    try {
      const parsed = JSON.parse(json)
      if (!Array.isArray(parsed)) throw new Error('Invalid')
      set(parsed)
    } catch (e) {
      alert('Invalid JSON')
    }
  }

  return { entries: value, addEntry, deleteEntry, clearAll, exportJson, importFromJson }
}
