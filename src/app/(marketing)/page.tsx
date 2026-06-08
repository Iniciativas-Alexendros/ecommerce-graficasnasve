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
  Clock,
  Leaf,
  Headphones,
} from 'lucide-react'
import { Boton } from '@/components/ui/Boton'
import { catalogoServicios } from '@/lib/catalogoServicios'

export const metadata: Metadata = {
  title: 'Gráficas NASVE — Imprenta en Torrent desde 1982',
  description:
    'Imprenta offset y digital en Torrent (Valencia). Encuadernación artesanal, acabados premium (stamping, UVI, relieves), personalización y impresión sobre madera. Más de 40 años de experiencia.',
}

const ICONOS_SERVICIO: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://graficasnasve.art/#empresa',
  name: 'Gráficas NASVE, S.L.',
  alternateName: 'NASVE',
  description:
    'Imprenta offset y digital en Torrent (Valencia). Encuadernación artesanal, acabados premium, personalización e impresión sobre madera. Fundada en 1982.',
  url: 'https://graficasnasve.art',
  telephone: '+34961553409',
  email: 'nasve@nasve.com',
  foundingDate: '1982',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Transferencia, tarjeta',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ctra. Mas del Jutge, 53',
    addressLocality: 'Torrent',
    addressRegion: 'Valencia',
    postalCode: '46900',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.4333,
    longitude: -0.4667,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47',
    bestRating: '5',
  },
  sameAs: ['https://www.google.com/maps?cid=NASVE'],
}

export default function PaginaInicio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* 1. HERO */}
      <section aria-label="Inicio" className="min-h-[90vh] grid md:grid-cols-2">
        {/* Lado izquierdo — negro */}
        <div className="bg-negro flex flex-col justify-center px-8 py-24 md:px-16 lg:px-20">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-6">
            Imprenta · Torrent · Valencia
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-[3.5rem] text-papel font-bold leading-tight">
            Artes Gráficas
            <br />
            desde 1982.
            <br />
            <span className="text-oro">Calidad que se toca.</span>
          </h1>
          <p className="mt-6 text-gris font-sans text-base md:text-md max-w-md leading-relaxed">
            Impresión offset y digital, encuadernación artesanal, acabados premium
            y personalización a medida. Cuatro décadas fabricando impresos que
            marcan la diferencia.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Boton variant="ghost" size="md" asChild>
              <Link href="/presupuesto">Pide presupuesto</Link>
            </Boton>
            <Boton variant="secondary" size="md" asChild>
              <Link href="/portfolio">Ver trabajos</Link>
            </Boton>
          </div>
        </div>

        {/* Lado derecho — papel con placeholder imagen */}
        <div className="bg-fondo-alt relative flex items-center justify-center min-h-64 md:min-h-auto overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-oro/30" />
            <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-oro/20" />
          </div>
          <div className="relative z-10 bg-fondo-alt border border-borde w-48 h-64 md:w-64 md:h-80 flex items-center justify-center">
            <span className="text-gris font-mono text-xs text-center px-4">
              Fotografía del taller
              <br />
              [próximamente]
            </span>
          </div>
        </div>
      </section>

      {/* 2. TIRA DE CREDENCIALES */}
      <section aria-label="Credenciales" className="bg-fondo-alt border-y border-borde">
        <div className="contenedor py-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { valor: '+40 años', desc: 'de experiencia' },
              { valor: '4,8 ★', desc: 'Google Reviews' },
              { valor: 'Torrent', desc: 'Valencia, España' },
              { valor: 'Duplo', desc: 'Bookletmaker' },
            ].map(({ valor, desc }) => (
              <div key={valor} className="flex flex-col items-center gap-1">
                <dt className="font-display text-2xl md:text-3xl font-bold text-negro">
                  {valor}
                </dt>
                <dd className="font-mono text-xs text-gris uppercase tracking-wide">
                  {desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. GRID DE SERVICIOS */}
      <section aria-labelledby="titulo-servicios" className="py-24">
        <div className="contenedor">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
              Lo que hacemos
            </p>
            <h2
              id="titulo-servicios"
              className="font-display text-3xl md:text-4xl font-bold text-negro"
            >
              Servicios de impresión y acabado
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {catalogoServicios.map((servicio) => {
              const Icono = ICONOS_SERVICIO[servicio.icono]
              return (
                <Link
                  key={servicio.slug}
                  href={`/servicios/${servicio.slug}`}
                  className="group relative flex flex-col gap-4 p-8 bg-blanco border border-borde hover:border-l-4 hover:border-l-oro hover:border-t-borde hover:border-r-borde hover:border-b-borde hover:-translate-y-0.5 transition-all duration-200"
                >
                  {Icono && (
                    <Icono size={28} className="text-oro" />
                  )}
                  <h3 className="font-display text-xl font-bold text-negro group-hover:text-oro transition-colors duration-150">
                    {servicio.titulo}
                  </h3>
                  <p className="font-sans text-sm text-gris leading-relaxed flex-1">
                    {servicio.descripcionCorta}
                  </p>
                  <span className="font-mono text-xs text-oro uppercase tracking-wide">
                    Ver más →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. SOBRE NASVE SNIPPET */}
      <section aria-label="Sobre Gráficas NASVE" className="bg-negro py-24">
        <div className="contenedor max-w-3xl">
          <p className="font-mono text-xs text-gris uppercase tracking-widest mb-6">
            Nuestra historia
          </p>
          <blockquote className="font-display text-2xl md:text-3xl text-papel font-medium leading-snug">
            &ldquo;En 1982, Antonio Arnás abrió un pequeño taller en el barrio de Serrería.
            Hoy, cuarenta años después, la segunda generación sigue fabricando impresos
            con el mismo rigor artesanal y las tecnologías más avanzadas.&rdquo;
          </blockquote>
          <div className="mt-10">
            <Boton variant="ghost" size="md" asChild>
              <Link href="/historia">Conoce nuestra historia</Link>
            </Boton>
          </div>
        </div>
      </section>

      {/* 5. DIFERENCIADORES */}
      <section aria-labelledby="titulo-diferenciadores" className="py-24 bg-papel">
        <div className="contenedor">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
              Por qué NASVE
            </p>
            <h2
              id="titulo-diferenciadores"
              className="font-display text-3xl md:text-4xl font-bold text-negro"
            >
              Más que una imprenta
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger">
            {[
              {
                icono: Sparkles,
                titulo: 'Acabados que marcan la diferencia',
                texto:
                  'Stamping, UVI selectivo, relieves y glasofonado. Transformamos impresos en objetos de deseo.',
              },
              {
                icono: Headphones,
                titulo: 'Asesoramiento real',
                texto:
                  'Nuestro equipo habla con cada cliente para encontrar la solución más adecuada a su proyecto y presupuesto.',
              },
              {
                icono: Clock,
                titulo: 'Cumplimiento de plazos',
                texto:
                  'Planificamos con rigor. Si acordamos una fecha de entrega, la cumplimos. Sin sorpresas.',
              },
              {
                icono: Leaf,
                titulo: 'Sostenibilidad',
                texto:
                  'Papeles certificados FSC/PEFC, tintas vegetales y gestión responsable de residuos.',
              },
            ].map(({ icono: Icono, titulo, texto }) => (
              <div key={titulo} className="flex flex-col gap-4">
                <Icono size={32} className="text-oro" />
                <h3 className="font-display text-xl font-bold text-negro">{titulo}</h3>
                <p className="font-sans text-sm text-gris leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BLOQUE CTA PRESUPUESTO */}
      <section aria-label="Solicitar presupuesto" className="bg-oro py-24">
        <div className="contenedor text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-negro mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="font-sans text-base text-negro/70 mb-10">
            Cuéntanos qué necesitas. Te respondemos en menos de 24 horas laborables con
            un presupuesto sin compromiso.
          </p>
          <Boton variant="primary" size="lg" asChild>
            <Link href="/presupuesto">Solicitar presupuesto</Link>
          </Boton>
        </div>
      </section>
    </>
  )
}
