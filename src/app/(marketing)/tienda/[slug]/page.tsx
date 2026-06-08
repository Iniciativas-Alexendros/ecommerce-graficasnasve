/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  catalogoTienda,
  obtenerProductoTienda,
  etiquetaCategoria,
  precioDesdeUnidad,
} from '@/lib/catalogoTienda'
import { formatearPrecioUnidad } from '@/lib/precioTienda'
import { ConfiguradorPrecio } from './ConfiguradorPrecio'

const BASE_URL = 'https://graficasnasve.art'

interface PropiedadesSlug {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return catalogoTienda.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PropiedadesSlug): Promise<Metadata> {
  const { slug } = await params
  const producto = obtenerProductoTienda(slug)

  if (!producto) {
    return { title: 'Producto no encontrado' }
  }

  return {
    title: `${producto.nombre} — Tienda Gráficas NASVE`,
    description: producto.descripcionCorta,
  }
}

export default async function PaginaProducto({ params }: PropiedadesSlug) {
  const { slug } = await params
  const producto = obtenerProductoTienda(slug)

  if (!producto) {
    notFound()
  }

  const desde = precioDesdeUnidad(producto)

  const productoLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    category: etiquetaCategoria(producto.categoria),
    brand: { '@type': 'Brand', name: 'Gráficas NASVE' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: desde,
      offerCount: producto.cantidades.length,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Gráficas NASVE, S.L.' },
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${BASE_URL}/tienda` },
      {
        '@type': 'ListItem',
        position: 3,
        name: producto.nombre,
        item: `${BASE_URL}/tienda/${producto.slug}`,
      },
    ],
  }

  return (
    <div className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productoLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />

      <div className="contenedor max-w-5xl">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-xs text-gris">
            <li>
              <Link href="/tienda" className="hover:text-negro transition-colors">
                Tienda
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-tinta">{producto.nombre}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen + especificaciones */}
          <div>
            <div className="relative w-full aspect-[4/3] bg-fondo-alt border border-borde flex items-center justify-center">
              <span className="font-mono text-xs text-gris uppercase tracking-widest">
                {etiquetaCategoria(producto.categoria)}
              </span>
            </div>
            <dl className="mt-6 border-t border-b border-borde divide-y divide-borde">
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-xs text-gris uppercase tracking-wide">Formato</dt>
                <dd className="font-sans text-sm text-tinta text-right">{producto.formato}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-xs text-gris uppercase tracking-wide">Material</dt>
                <dd className="font-sans text-sm text-tinta text-right">{producto.material}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-xs text-gris uppercase tracking-wide">Desde</dt>
                <dd className="font-sans text-sm text-tinta text-right">
                  {formatearPrecioUnidad(desde)} /ud
                </dd>
              </div>
            </dl>
          </div>

          {/* Descripción + configurador */}
          <div>
            <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
              {etiquetaCategoria(producto.categoria)}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-negro mb-4">
              {producto.nombre}
            </h1>
            <p className="font-sans text-base text-gris leading-relaxed mb-8">
              {producto.descripcion}
            </p>

            <ConfiguradorPrecio producto={producto} />
          </div>
        </div>
      </div>
    </div>
  )
}
