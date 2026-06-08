import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renderiza su contenido', () => {
    render(<Badge>Nuevo</Badge>)
    expect(screen.getByText('Nuevo')).toBeInTheDocument()
  })

  it('admite className adicional', () => {
    render(<Badge className="text-oro">Destacado</Badge>)
    expect(screen.getByText('Destacado').className).toContain('text-oro')
  })
})
