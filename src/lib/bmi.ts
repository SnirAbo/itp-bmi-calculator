export type Category = 'Underweight' | 'Normal' | 'Overweight' | 'Obesity'

export function computeBMI(heightMeters: number, weightKg: number): number {
  if (heightMeters <= 0 || weightKg <= 0) throw new Error('Invalid inputs')
  const bmi = weightKg / (heightMeters * heightMeters)
  return Number(bmi.toFixed(2))
}

export function categoryFor(bmi: number): Category {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obesity'
}

// Conversions
export const cmToM = (cm: number) => cm / 100
export const ftInToM = (ft: number, inch: number) => (ft * 12 + inch) * 0.0254
export const lbToKg = (lb: number) => lb * 0.45359237
export const kgToKg = (kg: number) => kg
