import { describe, it, expect } from 'vitest'
import { schemaPresupuesto } from './presupuesto'

const base = {
  nombre: 'María García',
  email: 'maria@empresa.com',
  producto: 'catalogo',
  rgpd: true,
}

describe('schemaPresupuesto', () => {
  it('acepta un presupuesto mínimo válido', () => {
    expect(schemaPresupuesto.safeParse(base).success).toBe(true)
  })

  it('acepta los campos opcionales como cadena vacía', () => {
    const datos = {
      ...base,
      empresa: '',
      telefono: '',
      tirada: '',
      detalles: '',
      acabados: '',
      entrega: '',
    }
    expect(schemaPresupuesto.safeParse(datos).success).toBe(true)
  })

  it('rechaza un email inválido', () => {
    const r = schemaPresupuesto.safeParse({ ...base, email: 'no-es-email' })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'email')).toBe(true)
    }
  })

  it('rechaza un nombre demasiado corto', () => {
    expect(schemaPresupuesto.safeParse({ ...base, nombre: 'A' }).success).toBe(false)
  })

  it('exige aceptar el RGPD (rgpd === true)', () => {
    expect(schemaPresupuesto.safeParse({ ...base, rgpd: false }).success).toBe(false)
    expect(schemaPresupuesto.safeParse({ ...base, rgpd: undefined }).success).toBe(false)
  })

  it('rechaza un producto fuera del enum', () => {
    expect(schemaPresupuesto.safeParse({ ...base, producto: 'desconocido' }).success).toBe(false)
  })

  it('rechaza una fecha de entrega con formato incorrecto', () => {
    expect(schemaPresupuesto.safeParse({ ...base, entrega: '01/02/2026' }).success).toBe(false)
  })

  it('acepta una fecha de entrega ISO (AAAA-MM-DD)', () => {
    expect(schemaPresupuesto.safeParse({ ...base, entrega: '2026-07-01' }).success).toBe(true)
  })

  it('acepta los cinco productos del catálogo', () => {
    const productos = ['papeleria', 'catalogo', 'libro', 'carpeteria', 'otro'] as const
    for (const producto of productos) {
      expect(schemaPresupuesto.safeParse({ ...base, producto }).success).toBe(true)
    }
  })
})
