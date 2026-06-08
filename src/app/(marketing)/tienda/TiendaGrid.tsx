/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CATEGORIAS_TIENDA,
  precioDesdeUnidad,
  etiquetaCategoria,
  type ProductoTienda,
  type CategoriaTienda,
} from '@/lib/catalogoTienda'
import { formatearPrecioUnidad } from '@/lib/precioTienda'

type FiltroTienda = 'todos' | CategoriaTienda

const FILTROS: { valor: FiltroTienda; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todos' },
  ...CATEGORIAS_TIENDA.map((c) => ({ valor: c.valor, etiqueta: c.etiqueta })),
]

interface PropiedadesTiendaGrid {
  productos: ProductoTienda[]
}

export function TiendaGrid({ productos }: PropiedadesTiendaGrid) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroTienda>('todos')

  const productosFiltrados =
    filtroActivo === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === filtroActivo)

  return (
    <>
      {/* Filtros */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filtrar por categoría"
      >
        {FILTROS.map((filtro) => (
          <button
            key={filtro.valor}
            onClick={() => setFiltroActivo(filtro.valor)}
            className={[
              'font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-150',
              filtroActivo === filtro.valor
                ? 'bg-negro text-papel border-negro'
                : 'bg-transparent text-gris border-borde hover:border-negro hover:text-negro',
            ].join(' ')}
            aria-pressed={filtroActivo === filtro.valor}
          >
            {filtro.etiqueta}
          </button>
        ))}
      </div>

      {/* Grid */}
      {productosFiltrados.length === 0 ? (
        <p className="font-sans text-gris text-center py-20">
          No hay productos en esta categoría aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {productosFiltrados.map((producto) => (
            <Link
              key={producto.slug}
              href={`/tienda/${producto.slug}`}
              className="group flex flex-col border border-borde bg-blanco hover:border-negro transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-oro focus-visible:outline-offset-2"
            >
              {/* Imagen (placeholder) */}
              <div className="relative w-full aspect-[4/3] bg-fondo-alt flex items-center justify-center overflow-hidden">
                <span className="font-mono text-xs text-gris uppercase tracking-widest">
                  {etiquetaCategoria(producto.categoria)}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5">
                <p className="font-mono text-xs text-gris uppercase tracking-wide mb-1">
                  {etiquetaCategoria(producto.categoria)}
                </p>
                <h3 className="font-display text-lg font-bold text-negro group-hover:text-oro transition-colors duration-150">
                  {producto.nombre}
                </h3>
                <p className="font-sans text-sm text-gris mt-1 line-clamp-2">
                  {producto.descripcionCorta}
                </p>
                <div className="mt-4 pt-3 flex items-baseline justify-between border-t border-borde">
                  <span className="font-sans text-sm text-tinta">
                    <span className="text-gris text-xs">desde </span>
                    <span className="font-semibold">
                      {formatearPrecioUnidad(precioDesdeUnidad(producto))}
                    </span>
                    <span className="text-gris text-xs"> /ud</span>
                  </span>
                  <span className="font-mono text-xs text-negro group-hover:text-oro transition-colors duration-150">
                    Configurar →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
