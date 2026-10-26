import { describe, it, expect } from 'vitest'
import { computeBMI, categoryFor, cmToM, ftInToM, lbToKg } from '../bmi'

describe('BMI utils', () => {
  it('computes BMI correctly', () => {
    const h = cmToM(180)
    const w = 81.65
    expect(computeBMI(h, w)).toBeCloseTo(25.2, 1)
  })

  it('classifies categories', () => {
    expect(categoryFor(17.9)).toBe('Underweight')
    expect(categoryFor(22.1)).toBe('Normal')
    expect(categoryFor(27.3)).toBe('Overweight')
    expect(categoryFor(31.2)).toBe('Obesity')
  })

  it('converts units', () => {
    expect(ftInToM(5, 7)).toBeCloseTo(1.7018, 3)
    expect(lbToKg(220)).toBeCloseTo(99.79, 2)
  })

  it('throws on invalid inputs', () => {
    expect(() => computeBMI(0, 70)).toThrow()
    expect(() => computeBMI(1.7, 0)).toThrow()
  })
})
