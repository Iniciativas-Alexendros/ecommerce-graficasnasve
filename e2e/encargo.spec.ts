import { test, expect } from './fixtures'

test('el encargo asistido arranca y avanza de producto a especificaciones', async ({ page }) => {
  await page.goto('/encargo')
  await expect(page.getByRole('heading', { level: 1, name: /configura tu encargo/i })).toBeVisible()

  // Paso «Producto»: elegir uno del selector.
  await page.getByRole('button', { name: /flyers a5/i }).click()

  // Paso «Especificaciones»: aparece el configurador y el aside con la estimación.
  await expect(page.getByRole('heading', { name: /configura tu flyers/i })).toBeVisible()
  await expect(page.getByText(/estimado/i).first()).toBeVisible()
  await expect(page.getByText('/ud').first()).toBeVisible()
})
