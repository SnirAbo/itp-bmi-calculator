import { useState } from 'react'
import { z } from 'zod'
import { cmToM, ftInToM, kgToKg, lbToKg } from '@/lib/bmi'
import { UnitToggle } from './UnitToggle'

export type UnitSystem = 'metric' | 'imperial'

const MetricSchema = z.object({
  cm: z
    .number({ invalid_type_error: 'Enter a number' })
    .positive('Height must be > 0')
    .max(300, 'Unrealistic height'),
  kg: z
    .number({ invalid_type_error: 'Enter a number' })
    .positive('Weight must be > 0')
    .max(500, 'Unrealistic weight')
})

const ImperialSchema = z.object({
  ft: z
    .number({ invalid_type_error: 'Enter a number' })
    .int('Feet must be whole number')
    .min(1, 'Too short')
    .max(8, 'Too tall'),
  inch: z
    .number({ invalid_type_error: 'Enter a number' })
    .min(0)
    .max(11.99, 'Inches < 12'),
  lb: z
    .number({ invalid_type_error: 'Enter a number' })
    .positive('Weight must be > 0')
    .max(1100, 'Unrealistic weight')
})

export function BmiForm({
  onCalculate
}: {
  onCalculate: (heightMeters: number, weightKg: number) => void
}) {
  const [unit, setUnit] = useState<UnitSystem>('metric')
  const [metric, setMetric] = useState({ cm: 170, kg: 65 })
  const [imperial, setImperial] = useState({ ft: 5, inch: 7, lb: 160 })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function parseAndSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    if (unit === 'metric') {
      const res = MetricSchema.safeParse({
        cm: Number(metric.cm),
        kg: Number(metric.kg)
      })
      if (!res.success) {
        const errs: Record<string, string> = {}
        res.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message))
        setErrors(errs)
        return
      }
      const h = cmToM(res.data.cm)
      const w = kgToKg(res.data.kg)
      onCalculate(h, w)
    } else {
      const res = ImperialSchema.safeParse({
        ft: Number(imperial.ft),
        inch: Number(imperial.inch),
        lb: Number(imperial.lb)
      })
      if (!res.success) {
        const errs: Record<string, string> = {}
        res.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message))
        setErrors(errs)
        return
      }
      const h = ftInToM(res.data.ft, res.data.inch)
      const w = lbToKg(res.data.lb)
      onCalculate(h, w)
    }
  }

  return (
    <form onSubmit={parseAndSubmit} className="space-y-4" aria-describedby="unit-desc">
      <UnitToggle unit={unit} onChange={setUnit} />
      <p id="unit-desc" className="sr-only">
        Choose between metric and imperial units.
      </p>

      {unit === 'metric' ? (
        <div className="grid grid-cols-2 gap-4" role="group" aria-label="Metric inputs">
          <div>
            <label className="label" htmlFor="cm">Height (cm)</label>
            <input
              id="cm"
              className="input"
              type="number"
              inputMode="decimal"
              value={metric.cm}
              onChange={(e) => setMetric({ ...metric, cm: Number(e.target.value) })}
              aria-invalid={!!errors.cm}
              aria-describedby={errors.cm ? 'cm-error' : undefined}
            />
            {errors.cm && (
              <p id="cm-error" className="error-text">{errors.cm}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="kg">Weight (kg)</label>
            <input
              id="kg"
              className="input"
              type="number"
              inputMode="decimal"
              value={metric.kg}
              onChange={(e) => setMetric({ ...metric, kg: Number(e.target.value) })}
              aria-invalid={!!errors.kg}
              aria-describedby={errors.kg ? 'kg-error' : undefined}
            />
            {errors.kg && (
              <p id="kg-error" className="error-text">{errors.kg}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4" role="group" aria-label="Imperial inputs">
          <div>
            <label className="label" htmlFor="ft">Height (ft)</label>
            <input
              id="ft"
              className="input"
              type="number"
              inputMode="numeric"
              value={imperial.ft}
              onChange={(e) => setImperial({ ...imperial, ft: Number(e.target.value) })}
              aria-invalid={!!errors.ft}
              aria-describedby={errors.ft ? 'ft-error' : undefined}
            />
            {errors.ft && (
              <p id="ft-error" className="error-text">{errors.ft}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="inch">Inches</label>
            <input
              id="inch"
              className="input"
              type="number"
              inputMode="decimal"
              value={imperial.inch}
              onChange={(e) => setImperial({ ...imperial, inch: Number(e.target.value) })}
              aria-invalid={!!errors.inch}
              aria-describedby={errors.inch ? 'inch-error' : undefined}
            />
            {errors.inch && (
              <p id="inch-error" className="error-text">{errors.inch}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="lb">Weight (lb)</label>
            <input
              id="lb"
              className="input"
              type="number"
              inputMode="decimal"
              value={imperial.lb}
              onChange={(e) => setImperial({ ...imperial, lb: Number(e.target.value) })}
              aria-invalid={!!errors.lb}
              aria-describedby={errors.lb ? 'lb-error' : undefined}
            />
            {errors.lb && (
              <p id="lb-error" className="error-text">{errors.lb}</p>
            )}
          </div>
        </div>
      )}

      <button className="btn btn-primary" type="submit">Calculate BMI</button>
    </form>
  )
}
