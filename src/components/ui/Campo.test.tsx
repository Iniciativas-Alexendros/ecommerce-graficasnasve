import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Campo } from './Campo'

describe('Campo', () => {
  it('asocia label e input mediante el id derivado del label', () => {
    render(<Campo label="Nombre" />)
    const input = screen.getByLabelText('Nombre')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('muestra el mensaje de error con role="alert"', () => {
    render(<Campo label="Email" error="Email inválido" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Email inválido')
  })

  it('renderiza un textarea cuando as="textarea"', () => {
    render(<Campo as="textarea" label="Detalles" />)
    expect(screen.getByLabelText('Detalles').tagName).toBe('TEXTAREA')
  })

  it('respeta un id explícito', () => {
    render(<Campo label="Correo" id="email" />)
    expect(screen.getByLabelText('Correo').id).toBe('email')
  })
})
