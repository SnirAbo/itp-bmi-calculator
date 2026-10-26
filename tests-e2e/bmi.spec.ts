import { test, expect } from '@playwright/test'

test('computes BMI end-to-end', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Height (cm)').fill('180')
  await page.getByLabel('Weight (kg)').fill('75')
  await page.getByRole('button', { name: 'Calculate BMI' }).click()
  await expect(page.getByText('BMI 23.1')).toBeVisible()
  await expect(page.getByLabel('BMI Category: Normal')).toBeVisible()
})
