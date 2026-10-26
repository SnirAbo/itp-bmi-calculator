import { Category } from '@/lib/bmi'
import { CategoryBadge } from './CategoryBadge'

export function ResultPanel({
  bmi,
  raw,
  category
}: {
  bmi: number | null
  raw: { heightM: number; weightKg: number } | null
  category: Category | null
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {bmi != null && `BMI is ${bmi.toFixed(1)}, ${category ?? ''}`}
      </div>
      {bmi == null ? (
        <p className="text-slate-600">Enter your height and weight to see your BMI.</p>
      ) : (
        <div className="space-y-2">
          <p className="text-4xl font-bold">
            {bmi.toFixed(1)} <span className="text-base font-normal text-slate-500">(raw: {bmi})</span>
          </p>
          {category && <CategoryBadge category={category} />}
          {raw && (
            <p className="text-sm text-slate-600">Based on height {raw.heightM.toFixed(2)} m and weight {raw.weightKg.toFixed(1)} kg.</p>
          )}
          <a className="text-sm text-brand-700 underline" href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noreferrer">Learn more about BMI categories</a>
        </div>
      )}
    </div>
  )
}
