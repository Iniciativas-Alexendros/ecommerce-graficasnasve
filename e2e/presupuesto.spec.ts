import { test, expect } from './fixtures'

test('el formulario de presupuesto valida los campos requeridos', async ({ page }) => {
  await page.goto('/presupuesto')
  await page.getByRole('button', { name: /enviar solicitud/i }).click()
  // La validación de cliente (Zod + RHF) muestra el error sin llamar a la API.
  await expect(page.getByText('El nombre debe tener al menos 2 caracteres')).toBeVisible()
})
