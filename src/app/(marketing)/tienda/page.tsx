/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { catalogoTienda } from '@/lib/catalogoTienda'
import { TiendaGrid } from './TiendaGrid'

export const metadata: Metadata = {
  title: 'Tienda — Gráficas NASVE',
  description:
    'Productos de imprenta listos para encargar: flyers, catálogos, tarjetas de visita, cartas de menú, gran formato y más. Estimación de precio por unidad al instante.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Tienda — Gráficas NASVE',
  description: 'Catálogo de productos de imprenta listos para configurar y encargar.',
  url: 'https://graficasnasve.art/tienda',
}

export default function PaginaTienda() {
  return (
    <div className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
            Listos para encargar
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-negro mb-6">
            Tienda
          </h1>
          <p className="font-sans text-base text-gris leading-relaxed">
            Productos preconfigurados con estimación de precio por unidad al instante. Elige
            formato, gramaje y acabado, ajusta la cantidad y pide presupuesto sin compromiso —
            <span className="text-tinta"> ni tarde, ni caro, ni incompatible</span>.
          </p>
        </div>

        {/* Grid con filtros (client component) */}
        <TiendaGrid productos={catalogoTienda} />
      </div>
    </div>
  )
}
