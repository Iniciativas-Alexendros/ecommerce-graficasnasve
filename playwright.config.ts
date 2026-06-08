import { defineConfig, devices } from '@playwright/test'

// Configuración de Playwright para Next.js 16.
// Guía: node_modules/next/dist/docs/01-app/02-guides/testing/playwright.md
// Los E2E se ejecutan contra el build de producción (`pnpm start`) y no
// requieren secretos: cubren home, validación del formulario y el guard de
// /admin (que sin Supabase redirige a /admin/login).
const PORT = 3000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // En CI el build se hace en un paso previo; en local se construye al vuelo.
    command: process.env.CI ? 'pnpm start' : 'pnpm build && pnpm start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
