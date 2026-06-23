import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioPresupuesto } from './FormularioPresupuesto'

describe('FormularioPresupuesto', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra errores de validación al enviar el formulario vacío', async () => {
    render(<FormularioPresupuesto />)
    await userEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }))

    expect(await screen.findByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument()
    expect(screen.getByText('Introduce un email válido')).toBeInTheDocument()
    expect(screen.getByText('Debes aceptar la política de privacidad para continuar')).toBeInTheDocument()
  })

  it('envía los datos a /api/presupuesto y muestra la confirmación', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<FormularioPresupuesto />)
    await userEvent.type(screen.getByLabelText('Nombre *'), 'María García')
    await userEvent.type(screen.getByLabelText('Email *'), 'maria@empresa.com')
    await userEvent.selectOptions(screen.getByLabelText('Tipo de producto *'), 'catalogo')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: /enviar solicitud/i }))

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/api/presupuesto', expect.objectContaining({ method: 'POST' })),
    )
    expect(await screen.findByText('¡Solicitud enviada!')).toBeInTheDocument()
  })
})
