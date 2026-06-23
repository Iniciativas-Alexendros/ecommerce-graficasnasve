import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfiguradorPrecio } from './ConfiguradorPrecio'
import { obtenerProductoTienda } from '@/lib/catalogoTienda'

const producto = obtenerProductoTienda('flyers-a5')!

function parseImporte(texto: string | null): number {
  // «0,15 €» → 0.15
  return Number((texto ?? '').replace(/[^\d,]/g, '').replace(',', '.'))
}

describe('ConfiguradorPrecio', () => {
  it('muestra una estimación inicial con precio por unidad y total', () => {
    render(<ConfiguradorPrecio producto={producto} />)
    expect(screen.getByTestId('precio-unidad').textContent).toContain('€')
    expect(screen.getByTestId('precio-total').textContent).toContain('€')
  })

  it('al aumentar la cantidad baja el precio por unidad (descuento por volumen)', async () => {
    render(<ConfiguradorPrecio producto={producto} />)
    const unidadInicial = parseImporte(screen.getByTestId('precio-unidad').textContent)

    await userEvent.selectOptions(screen.getByLabelText('Cantidad'), String(Math.max(...producto.cantidades)))

    const unidadFinal = parseImporte(screen.getByTestId('precio-unidad').textContent)
    expect(unidadFinal).toBeLessThan(unidadInicial)
  })

  it('el CTA enlaza al presupuesto con el producto preseleccionado', () => {
    render(<ConfiguradorPrecio producto={producto} />)
    const cta = screen.getByRole('link', { name: /pedir presupuesto/i })
    expect(cta.getAttribute('href')).toContain('/presupuesto?producto=')
  })
})
