/**
 * proxy.ts usa las extensiones web de Next (NextRequest/NextResponse), que
 * requieren los globals nativos de Node (Headers/Request reales), no los de
 * jsdom. Ejecutamos este archivo en entorno node.
 *
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from './proxy'

// Verifica el guard de /admin cuando NO hay configuración de Supabase
// (entorno de CI sin secretos). Cubre el arreglo del bucle de redirección
// sobre /admin/login.
describe('proxy (sin configuración de Supabase)', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '')
  })

  it('redirige /admin a /admin/login', async () => {
    const res = await proxy(new NextRequest('https://graficasnasve.art/admin'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/admin/login')
  })

  it('NO redirige /admin/login (evita el bucle de redirección)', async () => {
    const res = await proxy(new NextRequest('https://graficasnasve.art/admin/login'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('deja pasar las rutas públicas', async () => {
    const res = await proxy(new NextRequest('https://graficasnasve.art/'))
    expect(res.headers.get('location')).toBeNull()
  })
})
