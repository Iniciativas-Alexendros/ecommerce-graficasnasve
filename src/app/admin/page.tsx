/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { createServidorSupabase } from '@/lib/supabase/servidor'
import type { Presupuesto } from '@/types/supabase'

export const metadata: Metadata = {
  title: 'Dashboard — Admin NASVE',
  robots: { index: false, follow: false },
}

const ETIQUETAS_ESTADO: Record<Presupuesto['estado'], string> = {
  nuevo: 'Nuevo',
  en_revision: 'En revisión',
  presupuestado: 'Presupuestado',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
  completado: 'Completado',
}

const COLORES_ESTADO: Record<Presupuesto['estado'], string> = {
  nuevo: 'bg-oro/20 text-oro-oscuro',
  en_revision: 'bg-fondo-alt text-gris',
  presupuestado: 'bg-verde/10 text-verde',
  aceptado: 'bg-verde/20 text-verde',
  rechazado: 'bg-rojo/10 text-rojo',
  completado: 'bg-negro/10 text-negro',
}

const ETIQUETAS_PRODUCTO: Record<Presupuesto['producto'], string> = {
  papeleria: 'Papelería',
  catalogo: 'Catálogos',
  libro: 'Libros',
  carpeteria: 'Carpetería',
  otro: 'Otro',
}

async function obtenerPresupuestos(): Promise<Presupuesto[]> {
  const supabase = await createServidorSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('presupuestos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('[admin] Error fetching presupuestos:', error.message)
    return []
  }

  return data ?? []
}

export default async function PaginaAdminDashboard() {
  const presupuestos = await obtenerPresupuestos()

  const stats = {
    total: presupuestos.length,
    nuevos: presupuestos.filter((p) => p.estado === 'nuevo').length,
    enRevision: presupuestos.filter((p) => p.estado === 'en_revision').length,
    completados: presupuestos.filter((p) => p.estado === 'completado').length,
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-negro mb-2">
          Presupuestos
        </h1>
        <p className="font-sans text-sm text-gris">
          Gestión de solicitudes recibidas a través de graficasnasve.art
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total', valor: stats.total },
          { label: 'Nuevos', valor: stats.nuevos },
          { label: 'En revisión', valor: stats.enRevision },
          { label: 'Completados', valor: stats.completados },
        ].map(({ label, valor }) => (
          <div key={label} className="bg-blanco border border-borde p-5">
            <p className="font-mono text-xs text-gris uppercase tracking-wide mb-2">
              {label}
            </p>
            <p className="font-display text-3xl font-bold text-negro">{valor}</p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      {presupuestos.length === 0 ? (
        <div className="bg-blanco border border-borde p-12 text-center">
          <p className="font-sans text-gris">
            No hay solicitudes de presupuesto todavía.
          </p>
        </div>
      ) : (
        <div className="bg-blanco border border-borde overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-borde">
                {['Fecha', 'Nombre', 'Empresa', 'Email', 'Producto', 'Estado'].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left font-mono text-xs text-gris uppercase tracking-wide px-5 py-4"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {presupuestos.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-borde last:border-0 hover:bg-fondo-alt transition-colors ${
                    i % 2 === 0 ? '' : 'bg-fondo-alt/30'
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-xs text-gris whitespace-nowrap">
                    <Link href={`/admin/presupuestos/${p.id}`} className="hover:text-negro transition-colors">
                      {new Date(p.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </Link>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-negro font-medium">
                    <Link
                      href={`/admin/presupuestos/${p.id}`}
                      className="hover:text-oro transition-colors"
                    >
                      {p.nombre}
                    </Link>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-gris">
                    {p.empresa ?? '—'}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-gris">
                    <a
                      href={`mailto:${p.email}`}
                      className="hover:text-negro transition-colors"
                    >
                      {p.email}
                    </a>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-gris">
                    {ETIQUETAS_PRODUCTO[p.producto]}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block font-mono text-xs uppercase tracking-wide px-2.5 py-1 ${COLORES_ESTADO[p.estado]}`}
                    >
                      {ETIQUETAS_ESTADO[p.estado]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
