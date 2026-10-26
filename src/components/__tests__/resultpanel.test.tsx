import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ResultPanel } from '@/components/ResultPanel'
import React from 'react'

describe('ResultPanel', () => {
  it('announces results via aria-live', async () => {
    const { rerender } = render(
      <ResultPanel bmi={null} raw={null} category={null} />
    )

    rerender(
      <ResultPanel bmi={23.12} raw={{ heightM: 1.8, weightKg: 75 }} category={'Normal'} />
    )

    expect(await screen.findByText(/BMI 23.1/)).toBeInTheDocument()
  })
})
