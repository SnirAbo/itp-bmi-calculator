import { useMemo, useState } from 'react'
import { BmiForm } from '@/components/BmiForm'
import { ResultPanel } from '@/components/ResultPanel'
import { HistoryPanel } from '@/components/HistoryPanel'
import { computeBMI, categoryFor } from '@/lib/bmi'
import { useHistory } from '@/hooks/useHistory'

function App() {
  const [bmi, setBmi] = useState<number | null>(null)
  const [raw, setRaw] = useState<{ heightM: number; weightKg: number } | null>(
    null
  )
  const { entries, addEntry, deleteEntry, clearAll, importFromJson, exportJson } =
    useHistory()

  const category = useMemo(() => (bmi == null ? null : categoryFor(bmi)), [bmi])

  return (
    <div className="mx-auto max-w-3xl p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">ITP BMI Calculator</h1>
        <p className="text-slate-600">Metric/Imperial, accessible, with history.</p>
      </header>

      <main className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="calculator">
          <h2 id="calculator" className="sr-only">
            Calculator
          </h2>
          <BmiForm
            onCalculate={(h, w) => {
              const value = computeBMI(h, w)
              setBmi(value)
              setRaw({ heightM: h, weightKg: w })
              addEntry({ heightM: h, weightKg: w, bmi: value, at: Date.now() })
            }}
          />
        </section>

        <section aria-labelledby="result">
          <h2 id="result" className="sr-only">
            Result
          </h2>
          <ResultPanel bmi={bmi} raw={raw} category={category} />
        </section>

        <section className="md:col-span-2" aria-labelledby="history">
          <h2 id="history" className="text-lg font-semibold">History</h2>
          <HistoryPanel
            entries={entries}
            onDelete={deleteEntry}
            onClear={clearAll}
            onExport={exportJson}
            onImport={importFromJson}
          />
        </section>
      </main>
    </div>
  )
}

export default App
