import { describe, it, expect } from 'vitest'
import {
  catalogoTienda,
  CATEGORIAS_TIENDA,
  precioDesdeUnidad,
  obtenerProductoTienda,
  etiquetaCategoria,
  tipoPresupuestoDe,
} from './catalogoTienda'

const CATEGORIAS_VALIDAS = CATEGORIAS_TIENDA.map((c) => c.valor)
const TIPOS_PRESUPUESTO = ['papeleria', 'catalogo', 'libro', 'carpeteria', 'otro']

describe('catalogoTienda', () => {
  it('tiene al menos un producto por cada categoría', () => {
    for (const cat of CATEGORIAS_VALIDAS) {
      expect(catalogoTienda.some((p) => p.categoria === cat)).toBe(true)
    }
  })

  it('tiene slugs únicos con formato válido', () => {
    const slugs = catalogoTienda.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('cada producto está bien formado', () => {
    for (const p of catalogoTienda) {
      expect(CATEGORIAS_VALIDAS).toContain(p.categoria)
      expect(p.nombre.length).toBeGreaterThan(0)
      expect(p.descripcion.length).toBeGreaterThan(20)
      expect(p.descripcionCorta.length).toBeGreaterThan(0)
      expect(p.formato.length).toBeGreaterThan(0)
      expect(p.material.length).toBeGreaterThan(0)
      expect(p.precioBase).toBeGreaterThan(0)
      expect(p.gramajes.length).toBeGreaterThanOrEqual(1)
      expect(p.acabados.length).toBeGreaterThanOrEqual(1)
      expect(p.cantidades.length).toBeGreaterThanOrEqual(2)
      // existe una opción de referencia (factor 1) y el acabado base es factor 1
      expect(p.gramajes.some((g) => g.factor === 1)).toBe(true)
      expect(p.acabados[0].factor).toBe(1)
      // todos los factores son positivos
      for (const g of p.gramajes) expect(g.factor).toBeGreaterThan(0)
      for (const a of p.acabados) expect(a.factor).toBeGreaterThan(0)
      // cantidades ascendentes
      const ordenadas = [...p.cantidades].sort((x, y) => x - y)
      expect(p.cantidades).toEqual(ordenadas)
    }
  })

  it('precioDesdeUnidad es positivo y no supera el precio base', () => {
    for (const p of catalogoTienda) {
      const desde = precioDesdeUnidad(p)
      expect(desde).toBeGreaterThan(0)
      expect(desde).toBeLessThanOrEqual(p.precioBase)
    }
  })

  it('obtenerProductoTienda localiza por slug', () => {
    const primero = catalogoTienda[0]
    expect(obtenerProductoTienda(primero.slug)?.slug).toBe(primero.slug)
    expect(obtenerProductoTienda('no-existe')).toBeUndefined()
  })

  it('etiquetaCategoria devuelve una etiqueta legible', () => {
    expect(etiquetaCategoria('gran-formato')).toBe('Gran formato')
  })

  it('tipoPresupuestoDe devuelve un tipo válido del formulario', () => {
    for (const p of catalogoTienda) {
      expect(TIPOS_PRESUPUESTO).toContain(tipoPresupuestoDe(p))
    }
  })
})
