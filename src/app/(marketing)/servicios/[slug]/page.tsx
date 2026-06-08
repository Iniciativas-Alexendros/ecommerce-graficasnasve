/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { catalogoServicios } from '@/lib/catalogoServicios'
import { Boton } from '@/components/ui/Boton'

interface PropiedadesSlug {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return catalogoServicios.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PropiedadesSlug): Promise<Metadata> {
  const { slug } = await params
  const servicio = catalogoServicios.find((s) => s.slug === slug)

  if (!servicio) {
    return { title: 'Servicio no encontrado' }
  }

  return {
    title: `${servicio.titulo} — Gráficas NASVE`,
    description: servicio.descripcionCorta,
  }
}

export default async function PaginaFichaServicio({ params }: PropiedadesSlug) {
  const { slug } = await params
  const servicio = catalogoServicios.find((s) => s.slug === slug)

  if (!servicio) {
    notFound()
  }

  return (
    <div className="py-24">
      <div className="contenedor max-w-4xl">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-xs text-gris">
            <li>
              <Link href="/servicios" className="hover:text-negro transition-colors">
                Servicios
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-tinta">{servicio.titulo}</li>
          </ol>
        </nav>

        {/* Cabecera */}
        <div className="mb-12">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
            Servicio
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-negro mb-6">
            {servicio.titulo}
          </h1>
          <p className="font-sans text-base md:text-md text-gris leading-relaxed max-w-2xl">
            {servicio.descripcion}
          </p>
        </div>

        {/* Beneficios */}
        <div className="mb-16 p-8 bg-fondo-alt border border-borde">
          <h2 className="font-display text-xl font-bold text-negro mb-6">
            ¿Qué incluye?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicio.beneficios.map((beneficio) => (
              <li key={beneficio} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-oro shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-tinta leading-relaxed">
                  {beneficio}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="border-t border-borde pt-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Boton variant="primary" size="lg" asChild>
              <Link href="/presupuesto">{servicio.ctaTexto}</Link>
            </Boton>
            <p className="font-sans text-sm text-gris">
              Respondemos en menos de 24 horas laborables.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
