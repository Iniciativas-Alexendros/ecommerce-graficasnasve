/**
 * tudominio.com
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
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { Stat } from '@/components/ui/Stat'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { BarraCMYK } from '@/components/ui/BarraCMYK'
import { CropMarks } from '@/components/ui/CropMarks'
import { catalogoServicios } from '@/lib/catalogoServicios'
import { empresa, SITIO_URL, ciudadProvincia } from '@/config/empresa'

export const metadata: Metadata = {
  title: `${empresa.nombre} — Imprenta en ${empresa.direccion.ciudad} desde ${empresa.anioFundacion}`,
  description:
    `Imprenta offset y digital en ${ciudadProvincia}. Encuadernación artesanal, acabados premium (stamping, UVI, relieves), personalización y impresión sobre madera. Décadas de experiencia.`,
}

const ICONOS_SERVICIO: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
}

/** Color de la mini-baldosa de cada servicio (cuatricromía cíclica). */
const COLORES_SERVICIO: ColorBaldosa[] = ['ambar', 'cyan', 'coral', 'lavender', 'spot-blue', 'sky']

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITIO_URL}/#empresa`,
  name: empresa.nombreLegal,
  alternateName: 'Ejemplo',
  description:
    `${empresa.descripcion} Fundada en ${empresa.anioFundacion}.`,
  url: SITIO_URL,
  telephone: empresa.telefono.e164,
  email: empresa.email,
  foundingDate: empresa.anioFundacion,
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Transferencia, tarjeta',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: empresa.direccion.calle,
    addressLocality: empresa.direccion.ciudad,
    addressRegion: empresa.direccion.provincia,
    postalCode: empresa.direccion.cp,
    addressCountry: empresa.direccion.pais,
  },
  geo: { '@type': 'GeoCoordinates', latitude: empresa.direccion.geo.lat, longitude: empresa.direccion.geo.lng },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: empresa.horario.laborable.abre,
      closes: empresa.horario.laborable.cierra,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: empresa.horario.viernes.abre,
      closes: empresa.horario.viernes.cierra,
    },
  ],
}

export default function PaginaInicio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* 1. HERO */}
      <section aria-label="Inicio" className="bg-paper-100">
        <div className="contenedor py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionLabel>Imprenta familiar · {empresa.direccion.ciudad} · desde {empresa.anioFundacion}</SectionLabel>
            <h1 className="mt-6 font-display font-extrabold text-key text-4xl md:text-5xl leading-[1.02]">
              Impreso preciso<br />desde <span className="text-coral">{empresa.anioFundacion}</span>.
            </h1>
            <p className="relato mt-6 text-key/80 text-lg md:text-xl max-w-md leading-snug">
              Servicio integral offset y digital, con gestión de color de verdad. Tú nos cuentas
              la idea; nosotros la dejamos lista para máquina.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Boton variant="primary" size="md" asChild>
                <Link href="/encargo">Configurar mi encargo</Link>
              </Boton>
              <Boton variant="secondary" size="md" asChild>
                <Link href="/tienda">Ver la tienda</Link>
              </Boton>
            </div>
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              <Stat valor="CMYK" caption="Color gestionado" />
              <Stat valor="48 h" caption="Entrega exprés" />
              <Stat valor={empresa.aniosExperiencia} caption="Años de oficio" />
            </dl>
          </div>

          {/* Grid 2×2 de baldosas (cuatricromía) con marcas de corte */}
          <CropMarks className="max-w-md mx-auto w-full p-3">
            <div className="grid grid-cols-2 gap-4">
              <Baldosa color="ambar" icono="barras" iconSize={64} />
              <Baldosa color="key" icono="cuarto" iconSize={64} />
              <Baldosa color="lavender" icono="estrella" iconSize={64} />
              <Baldosa color="cyan" icono="anillo" iconSize={64} />
            </div>
          </CropMarks>
        </div>
        <BarraCMYK height={6} />
      </section>

      {/* 2. TIRA DE CREDENCIALES */}
      <section aria-label="Credenciales" className="bg-paper-50 border-b border-taupe">
        <div className="contenedor py-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat valor="Décadas" caption="de experiencia" />
            <Stat valor="Offset" caption="y digital" />
            <Stat valor={empresa.direccion.ciudad} caption={`${empresa.direccion.provincia}, España`} />
            <Stat valor="Acabados" caption="premium" />
          </dl>
        </div>
      </section>

      {/* 3. GRID DE SERVICIOS */}
      <section aria-labelledby="titulo-servicios" className="py-24">
        <div className="contenedor">
          <div className="mb-14 max-w-2xl">
            <SectionLabel numero="01">Lo que hacemos</SectionLabel>
            <h2 id="titulo-servicios" className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-key">
              Servicios de impresión y acabado
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {catalogoServicios.map((servicio, i) => {
              const Icono = ICONOS_SERVICIO[servicio.icono]
              const color = COLORES_SERVICIO[i % COLORES_SERVICIO.length]
              return (
                <Link key={servicio.slug} href={`/servicios/${servicio.slug}`} className="group">
                  <Tarjeta className="h-full p-7 flex flex-col gap-4 transition-transform duration-200 group-hover:-translate-y-1">
                    {Icono && (
                      <Baldosa color={color} cuadrada={false} className="w-12 h-12">
                        <Icono size={24} />
                      </Baldosa>
                    )}
                    <h3 className="font-display font-bold text-xl text-key">{servicio.titulo}</h3>
                    <p className="font-sans text-sm text-gris leading-relaxed flex-1">
                      {servicio.descripcionCorta}
                    </p>
                    <span className="font-mono text-xs text-ambar-700 uppercase tracking-wide">
                      Ver más →
                    </span>
                  </Tarjeta>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. HERENCIA 20XX */}
      <section aria-label={`Sobre ${empresa.nombre}`} className="bg-key py-24">
        <div className="contenedor max-w-3xl">
          <SectionLabel numero="02" tono="dark">
            Nuestra historia
          </SectionLabel>
          <blockquote className="relato mt-6 text-2xl md:text-3xl text-paper-100 leading-snug">
            «Empezamos como un pequeño taller de barrio con una sola prensa. Hoy,
            generaciones después, seguimos fabricando impresos con el mismo rigor
            artesanal y las tecnologías más avanzadas.»
          </blockquote>
          <div className="mt-10">
            <Boton variant="ghost" size="md" asChild>
              <Link href="/historia">Conoce nuestra historia</Link>
            </Boton>
          </div>
        </div>
      </section>

      {/* 5. DIFERENCIADORES */}
      <section aria-labelledby="titulo-diferenciadores" className="py-24 bg-paper-100">
        <div className="contenedor">
          <div className="mb-14 max-w-2xl">
            <SectionLabel numero="03">Por qué Ejemplo</SectionLabel>
            <h2 id="titulo-diferenciadores" className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-key">
              Más que una imprenta
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger">
            {[
              { icono: Sparkles, color: 'ambar' as ColorBaldosa, titulo: 'Acabados que marcan la diferencia', texto: 'Stamping, UVI selectivo, relieves y glasofonado. Transformamos impresos en objetos de deseo.' },
              { icono: Headphones, color: 'cyan' as ColorBaldosa, titulo: 'Asesoramiento real', texto: 'Nuestro equipo habla con cada cliente para encontrar la solución más adecuada a su proyecto y presupuesto.' },
              { icono: Clock, color: 'coral' as ColorBaldosa, titulo: 'Cumplimiento de plazos', texto: 'Planificamos con rigor. Si acordamos una fecha de entrega, la cumplimos. Sin sorpresas.' },
              { icono: Leaf, color: 'lavender' as ColorBaldosa, titulo: 'Sostenibilidad', texto: 'Papeles certificados FSC/PEFC, tintas vegetales y gestión responsable de residuos.' },
            ].map(({ icono: Icono, color, titulo, texto }) => (
              <div key={titulo} className="flex flex-col gap-4">
                <Baldosa color={color} cuadrada={false} className="w-14 h-14">
                  <Icono size={28} />
                </Baldosa>
                <h3 className="font-display font-bold text-xl text-key">{titulo}</h3>
                <p className="font-sans text-sm text-gris leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BLOQUE CTA PRESUPUESTO */}
      <section aria-label="Solicitar presupuesto" className="bg-ambar py-24">
        <div className="contenedor text-center max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-key mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="font-sans text-base text-key/70 mb-10">
            Cuéntanos qué necesitas. Te respondemos en menos de 24 horas laborables con un
            presupuesto sin compromiso.
          </p>
          <Boton variant="dark" size="lg" asChild>
            <Link href="/encargo">Configurar mi encargo</Link>
          </Boton>
        </div>
      </section>
    </>
  )
}
