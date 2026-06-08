import { describe, it, expect } from 'vitest'
import { catalogoServicios } from './catalogoServicios'

const SLUGS_ESPERADOS = [
  'impresion-offset',
  'impresion-digital',
  'encuadernacion',
  'acabados-premium',
  'personalizacion',
  'madera',
]

describe('catalogoServicios', () => {
  it('contiene exactamente 6 servicios', () => {
    expect(catalogoServicios).toHaveLength(6)
  })

  it('tiene slugs únicos', () => {
    const slugs = catalogoServicios.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('incluye los slugs esperados', () => {
    const slugs = catalogoServicios.map((s) => s.slug)
    expect(slugs).toEqual(expect.arrayContaining(SLUGS_ESPERADOS))
  })

  it('cada servicio tiene los campos requeridos y no vacíos', () => {
    for (const s of catalogoServicios) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/)
      expect(s.titulo.length).toBeGreaterThan(0)
      expect(s.descripcion.length).toBeGreaterThan(20)
      expect(s.descripcionCorta.length).toBeGreaterThan(0)
      expect(s.beneficios.length).toBeGreaterThanOrEqual(3)
      expect(s.icono.length).toBeGreaterThan(0)
      expect(s.ctaTexto.length).toBeGreaterThan(0)
    }
  })
})
