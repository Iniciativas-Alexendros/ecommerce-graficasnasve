import { test, expect } from '@playwright/test'

test('la home carga con título y encabezado principal', async ({ page }) => {
  const res = await page.goto('/')
  expect(res?.ok()).toBeTruthy()
  await expect(page).toHaveTitle(/Ejemplo/i)
  await expect(page.locator('h1').first()).toBeVisible()
})

test('la cabecera enlaza a Servicios y al Encargo', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href="/servicios"]').first()).toBeVisible()
  await expect(page.locator('a[href="/encargo"]').first()).toBeVisible()
})
