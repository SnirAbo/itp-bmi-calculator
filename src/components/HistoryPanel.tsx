import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export interface HistoryEntry {
  heightM: number
  weightKg: number
  bmi: number
  at: number
}

export function HistoryPanel({
  entries,
  onDelete,
  onClear,
  onExport,
  onImport
}: {
  entries: HistoryEntry[]
  onDelete: (at: number) => void
  onClear: () => void
  onExport: () => string
  onImport: (json: string) => void
}) {
  const [fileContent, setFileContent] = useState('')
  const { value: shareId, set: setShareId } = useLocalStorage<string | null>('share-id', null)

  async function shareSnapshot() {
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries })
      })
      const data = await res.json()
      setShareId(data.id)
    } catch (e) {
      console.error(e)
      alert('Share failed')
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Your history</h3>
        <div className="flex gap-2">
          <button className="btn" onClick={() => navigator.clipboard.writeText(onExport())}>Export JSON</button>
          <label className="btn" htmlFor="import">Import JSON
            <input id="import" type="file" accept="application/json" hidden onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              const text = await f.text()
              setFileContent(text)
              onImport(text)
            }} />
          </label>
          <button className="btn" onClick={onClear}>Clear</button>
          <button className="btn btn-primary" onClick={shareSnapshot}>Share</button>
        </div>
      </div>

      {shareId && (
        <p className="mb-2 text-sm">Share link: <a className="text-brand-700 underline" href={`/api/share/${shareId}`} target="_blank">/api/share/{shareId}</a></p>
      )}

      {entries.length === 0 ? (
        <p className="text-slate-600">No entries yet.</p>
      ) : (
        <ul className="divide-y divide-slate-200" aria-live="polite">
          {entries
            .slice()
            .reverse()
            .map((e) => (
              <li key={e.at} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">BMI {e.bmi.toFixed(1)}</p>
                  <p className="text-sm text-slate-600">h {e.heightM.toFixed(2)} m, w {e.weightKg.toFixed(1)} kg — {new Date(e.at).toLocaleString()}</p>
                </div>
                <button className="btn" onClick={() => onDelete(e.at)} aria-label={`Delete entry from ${new Date(e.at).toLocaleString()}`}>Delete</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
