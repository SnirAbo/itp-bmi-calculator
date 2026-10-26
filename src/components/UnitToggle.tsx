export function UnitToggle({
  unit,
  onChange
}: {
  unit: 'metric' | 'imperial'
  onChange: (u: 'metric' | 'imperial') => void
}) {
  return (
    <fieldset aria-label="Unit system" className="flex gap-2">
      <legend className="sr-only">Choose unit system</legend>
      <label className="inline-flex items-center gap-2 rounded-md border px-3 py-1">
        <input
          type="radio"
          name="unit"
          value="metric"
          checked={unit === 'metric'}
          onChange={() => onChange('metric')}
        />
        Metric (cm, kg)
      </label>
      <label className="inline-flex items-center gap-2 rounded-md border px-3 py-1">
        <input
          type="radio"
          name="unit"
          value="imperial"
          checked={unit === 'imperial'}
          onChange={() => onChange('imperial')}
        />
        Imperial (ft/in, lb)
      </label>
    </fieldset>
  )
}
