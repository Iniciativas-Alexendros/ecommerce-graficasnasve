/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
} from 'lucide-react'
import { catalogoServicios } from '@/lib/catalogoServicios'

export const metadata: Metadata = {
  title: 'Servicios de Impresión y Acabado — Gráficas NASVE',
  description:
    'Impresión offset, digital, encuadernación artesanal, acabados premium, personalización con dato variable e impresión sobre madera. Todo en un mismo taller en Torrent.',
}

const ICONOS_SERVICIO: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
}

export default function PaginaServicios() {
  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
            Qué hacemos
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-negro mb-6">
            Servicios de impresión y acabado
          </h1>
          <p className="font-sans text-base text-gris leading-relaxed">
            Desde la plancha offset hasta el barniz UV selectivo, pasando por la
            encuadernación artesanal y la impresión directa sobre madera. Un taller
            completo para proyectos completos.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {catalogoServicios.map((servicio) => {
            const Icono = ICONOS_SERVICIO[servicio.icono]
            return (
              <Link
                key={servicio.slug}
                href={`/servicios/${servicio.slug}`}
                className="group flex flex-col gap-5 p-8 bg-blanco border border-borde hover:border-l-4 hover:border-l-oro hover:border-t-borde hover:border-r-borde hover:border-b-borde hover:-translate-y-0.5 transition-all duration-200"
              >
                {Icono && (
                  <Icono size={32} className="text-oro" />
                )}
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold text-negro mb-3 group-hover:text-oro transition-colors duration-150">
                    {servicio.titulo}
                  </h2>
                  <p className="font-sans text-sm text-gris leading-relaxed">
                    {servicio.descripcionCorta}
                  </p>
                </div>
                <ul className="space-y-1.5 border-t border-borde pt-4">
                  {servicio.beneficios.slice(0, 3).map((b) => (
                    <li key={b} className="font-sans text-xs text-gris flex items-start gap-2">
                      <span className="text-oro mt-0.5 shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <span className="font-mono text-xs text-oro uppercase tracking-wide">
                  Ver detalles →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
