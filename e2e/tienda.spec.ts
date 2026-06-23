import { test, expect } from './fixtures'

test('la tienda lista productos y permite filtrar por categoría', async ({ page }) => {
  await page.goto('/tienda')
  await expect(page.getByRole('heading', { level: 1, name: /encarga tu impresión/i })).toBeVisible()

  // Hay tarjetas de producto (enlaces a /tienda/<slug>).
  const tarjetas = page.locator('a[href^="/tienda/"]')
  expect(await tarjetas.count()).toBeGreaterThan(0)

  // Filtrar por categoría muestra el producto esperado.
  await page.getByRole('button', { name: 'Identidad' }).click()
  await expect(page.locator('a[href="/tienda/tarjetas-de-visita"]')).toBeVisible()
})

test('la ficha de producto estima precio y enlaza al presupuesto', async ({ page }) => {
  await page.goto('/tienda/tarjetas-de-visita')
  await expect(page.getByRole('heading', { level: 1, name: /tarjetas de visita/i })).toBeVisible()

  // La estimación es visible y se recalcula al cambiar la cantidad.
  const total = page.getByTestId('precio-total')
  await expect(total).toBeVisible()
  const totalInicial = (await total.textContent()) ?? ''
  await page.getByLabel('Cantidad').selectOption('1000')
  await expect(total).not.toHaveText(totalInicial)

  // El CTA lleva al presupuesto con el producto preseleccionado.
  const cta = page.getByRole('link', { name: /pedir presupuesto de este producto/i })
  await expect(cta).toHaveAttribute('href', /\/presupuesto\?producto=/)
})

test('la navegación principal incluye la Tienda', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href="/tienda"]').first()).toBeVisible()
})
