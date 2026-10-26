import { describe, it, expect } from 'vitest'
import { computeBMI, categoryFor, cmToM, ftInToM, lbToKg, kgToKg } from '../bmi'

describe('BMI utils - edge cases', () => {
  describe('categoryFor boundaries', () => {
    it('treats 18.5 as Normal (lower bound inclusive)', () => {
      expect(categoryFor(18.5)).toBe('Normal')
    })

    it('treats the value just below 18.5 as Underweight', () => {
      expect(categoryFor(18.49)).toBe('Underweight')
    })

    it('treats 25 as Overweight (lower bound inclusive)', () => {
      expect(categoryFor(25)).toBe('Overweight')
    })

    it('treats the value just below 25 as Normal', () => {
      expect(categoryFor(24.99)).toBe('Normal')
    })

    it('treats 30 as Obesity (lower bound inclusive)', () => {
      expect(categoryFor(30)).toBe('Obesity')
    })

    it('treats the value just below 30 as Overweight', () => {
      expect(categoryFor(29.99)).toBe('Overweight')
    })

    it('handles very low and very high BMI values', () => {
      expect(categoryFor(0)).toBe('Underweight')
      expect(categoryFor(100)).toBe('Obesity')
    })
  })

  describe('computeBMI', () => {
    it('rounds the result to 2 decimal places', () => {
      const bmi = computeBMI(1.73, 70)
      expect(bmi).toBe(Number((70 / (1.73 * 1.73)).toFixed(2)))
    })

    it('computes a known reference value (70kg, 1.75m => ~22.86)', () => {
      expect(computeBMI(1.75, 70)).toBeCloseTo(22.86, 2)
    })

    it('throws when height is negative', () => {
      expect(() => computeBMI(-1.7, 70)).toThrow('Invalid inputs')
    })

    it('throws when weight is negative', () => {
      expect(() => computeBMI(1.7, -70)).toThrow('Invalid inputs')
    })

    it('throws when both height and weight are zero', () => {
      expect(() => computeBMI(0, 0)).toThrow('Invalid inputs')
    })
  })

  describe('unit conversions', () => {
    it('converts centimeters to meters', () => {
      expect(cmToM(0)).toBe(0)
      expect(cmToM(100)).toBe(1)
      expect(cmToM(165)).toBeCloseTo(1.65, 5)
    })

    it('converts feet/inches to meters', () => {
      expect(ftInToM(0, 0)).toBe(0)
      expect(ftInToM(6, 0)).toBeCloseTo(1.8288, 4)
      expect(ftInToM(0, 12)).toBeCloseTo(0.3048, 4)
    })

    it('converts pounds to kilograms', () => {
      expect(lbToKg(0)).toBe(0)
      expect(lbToKg(1)).toBeCloseTo(0.45359237, 6)
      expect(lbToKg(150)).toBeCloseTo(68.0389, 3)
    })

    it('kgToKg is an identity function', () => {
      expect(kgToKg(0)).toBe(0)
      expect(kgToKg(72.4)).toBe(72.4)
      expect(kgToKg(-5)).toBe(-5)
    })
  })

  describe('computeBMI + categoryFor integration', () => {
    it('combines conversions and classification for an imperial input', () => {
      const heightM = ftInToM(5, 9)
      const weightKg = lbToKg(160)
      const bmi = computeBMI(heightM, weightKg)
      expect(categoryFor(bmi)).toBe('Normal')
    })
  })
})
