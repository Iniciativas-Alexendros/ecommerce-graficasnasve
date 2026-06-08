import { test, expect } from '@playwright/test'

test('una visita a /admin sin sesión redirige al login', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/login/)
})

test('/admin/login es accesible y no entra en bucle de redirección', async ({ page }) => {
  const res = await page.goto('/admin/login')
  expect(res?.ok()).toBeTruthy()
  await expect(page).toHaveURL(/\/admin\/login$/)
  await expect(page.getByRole('button', { name: /acceder/i })).toBeVisible()
})
