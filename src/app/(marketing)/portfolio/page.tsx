/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { createServidorSupabase } from '@/lib/supabase/servidor'
import type { PortfolioItem } from '@/types/supabase'
import { PortfolioGrid } from './PortfolioGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Portfolio — Gráficas NASVE',
  description:
    'Trabajos de impresión offset, digital, encuadernación artesanal, acabados premium e impresión sobre madera. Más de 40 años de proyectos realizados en Torrent.',
}

async function obtenerItems(): Promise<PortfolioItem[]> {
  const supabase = await createServidorSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('publicado', true)
    .order('orden', { ascending: true })

  if (error) {
    console.error('[portfolio] Error fetching items:', error.message)
    return []
  }

  return data ?? []
}

export default async function PaginaPortfolio() {
  const items = await obtenerItems()

  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
            Nuestros trabajos
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-negro mb-6">
            Portfolio
          </h1>
          <p className="font-sans text-base text-gris leading-relaxed">
            Una selección de proyectos realizados. Cada pieza es el resultado de la
            colaboración con el cliente, del rigor técnico y de cuatro décadas de oficio.
          </p>
        </div>

        {/* Grid con filtros (client component) */}
        <PortfolioGrid items={items} />
      </div>
    </div>
  )
}
