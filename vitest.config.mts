import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// Configuración de Vitest para Next.js 16 (App Router).
// Sigue la guía oficial: node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md
// - vite-tsconfig-paths resuelve el alias "@/..." desde tsconfig.json
// - entorno jsdom para componentes/lógica de cliente
// Nota: Vitest no soporta async Server Components → esos se cubren con E2E (Playwright).
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**', 'src/components/**', 'src/proxy.ts'],
      exclude: ['**/*.test.{ts,tsx}'],
    },
  },
})
