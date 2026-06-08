// Extiende `expect` de Vitest con los matchers de jest-dom (toBeInTheDocument, etc.)
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Desmonta el árbol React tras cada test para evitar fugas entre casos.
afterEach(() => {
  cleanup()
})
