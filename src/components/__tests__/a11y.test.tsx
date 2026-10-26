import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BmiForm } from '@/components/BmiForm'
import React from 'react'
import axeCore from 'axe-core'

async function runAxe(container: HTMLElement) {
  const results = await axeCore.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  })
  return results
}

describe('Accessibility', () => {
  it('BmiForm has no critical a11y violations', async () => {
    const { container } = render(<BmiForm onCalculate={() => {}} />)
    const results = await runAxe(container)
    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0)
  })
})
