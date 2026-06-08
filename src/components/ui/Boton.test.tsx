import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Boton } from './Boton'

describe('Boton', () => {
  it('renderiza su texto como botón', () => {
    render(<Boton>Enviar</Boton>)
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument()
  })

  it('dispara onClick al pulsar', async () => {
    const onClick = vi.fn()
    render(<Boton onClick={onClick}>Pulsar</Boton>)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('respeta el estado disabled', async () => {
    const onClick = vi.fn()
    render(
      <Boton disabled onClick={onClick}>
        Inactivo
      </Boton>,
    )
    const btn = screen.getByRole('button', { name: 'Inactivo' })
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('con asChild aplica las clases al hijo en lugar de renderizar un button', () => {
    render(
      <Boton asChild>
        <a href="/destino">Enlace</a>
      </Boton>,
    )
    const link = screen.getByRole('link', { name: 'Enlace' })
    expect(link).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(link.className).toContain('inline-flex')
  })
})
