import { describe, it, expect } from 'vitest'
import {
  factorVolumen,
  estimarPrecioUnitario,
  estimarTotal,
  formatearEuros,
  formatearPrecioUnidad,
  TRAMOS_VOLUMEN,
} from './precioTienda'

describe('factorVolumen', () => {
  it('aplica el tramo correcto según la cantidad', () => {
    expect(factorVolumen(1)).toBe(1)
    expect(factorVolumen(49)).toBe(1)
    expect(factorVolumen(50)).toBe(0.92)
    expect(factorVolumen(100)).toBe(0.82)
    expect(factorVolumen(250)).toBe(0.72)
    expect(factorVolumen(500)).toBe(0.64)
    expect(factorVolumen(1000)).toBe(0.55)
    expect(factorVolumen(99999)).toBe(0.55)
  })

  it('a mayor cantidad, factor menor o igual (monótono decreciente)', () => {
    const cantidades = [1, 50, 100, 250, 500, 1000, 5000]
    for (let i = 1; i < cantidades.length; i++) {
      expect(factorVolumen(cantidades[i])).toBeLessThanOrEqual(factorVolumen(cantidades[i - 1]))
    }
  })

  it('devuelve 0 para cantidades no válidas', () => {
    expect(factorVolumen(0)).toBe(0)
    expect(factorVolumen(-10)).toBe(0)
    expect(factorVolumen(Number.NaN)).toBe(0)
  })

  it('los tramos están ordenados de mayor a menor mínimo', () => {
    for (let i = 1; i < TRAMOS_VOLUMEN.length; i++) {
      expect(TRAMOS_VOLUMEN[i].min).toBeLessThan(TRAMOS_VOLUMEN[i - 1].min)
    }
  })
})

describe('estimarPrecioUnitario', () => {
  it('precio base sin recargos ni descuento (cantidad < 50)', () => {
    expect(estimarPrecioUnitario({ precioBase: 1, cantidad: 10 })).toBe(1)
  })

  it('aplica el descuento por volumen', () => {
    expect(estimarPrecioUnitario({ precioBase: 1, cantidad: 1000 })).toBe(0.55)
  })

  it('aplica factores de gramaje y acabado', () => {
    // 2 × 1.5 (gramaje) × 1.2 (acabado) × 1 (vol) = 3.6
    expect(
      estimarPrecioUnitario({ precioBase: 2, cantidad: 10, factorGramaje: 1.5, factorAcabado: 1.2 }),
    ).toBe(3.6)
  })

  it('redondea a céntimos', () => {
    // 0.18 × 0.82 = 0.1476 → 0.15
    expect(estimarPrecioUnitario({ precioBase: 0.18, cantidad: 100 })).toBe(0.15)
  })

  it('devuelve 0 con entradas no válidas', () => {
    expect(estimarPrecioUnitario({ precioBase: 0, cantidad: 100 })).toBe(0)
    expect(estimarPrecioUnitario({ precioBase: 1, cantidad: 0 })).toBe(0)
    expect(estimarPrecioUnitario({ precioBase: -1, cantidad: 100 })).toBe(0)
  })
})

describe('estimarTotal', () => {
  it('multiplica precio unitario por cantidad', () => {
    // unitario @1000 = 0.55 ; total = 550
    expect(estimarTotal({ precioBase: 1, cantidad: 1000 })).toBe(550)
  })

  it('devuelve 0 con entradas no válidas', () => {
    expect(estimarTotal({ precioBase: 1, cantidad: 0 })).toBe(0)
    expect(estimarTotal({ precioBase: 0, cantidad: 100 })).toBe(0)
  })
})

describe('formato de importes', () => {
  it('formatea importes en euros', () => {
    expect(formatearEuros(1234.5)).toContain('€')
    expect(formatearPrecioUnidad(0.155)).toContain('€')
  })
})
