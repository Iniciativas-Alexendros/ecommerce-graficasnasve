/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { Boton } from '@/components/ui/Boton'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FormularioPresupuesto } from '@/components/formularios/FormularioPresupuesto'
import { empresa, SITIO_URL, ciudadProvincia } from '@/config/empresa'

const mapaUrl = `https://maps.google.com/?q=${empresa.direccion.ciudad.replace(/ /g, '+')}`

export const metadata: Metadata = {
  title: `Contacto — ${empresa.nombre}`,
  description:
    `Contacta con ${empresa.nombre} en ${ciudadProvincia}. Teléfono: ${empresa.telefono.display}. Email: ${empresa.email}. Lunes a viernes de 8:00 a 18:00.`,
}

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
  taxID: empresa.cif,
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: empresa.direccion.geo.lat,
    longitude: empresa.direccion.geo.lng,
  },
  hasMap: mapaUrl,
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

export default function PaginaContacto() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="py-24">
        <div className="contenedor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info de contacto */}
            <div>
              <SectionLabel>Hablemos de tu impreso</SectionLabel>
              <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
                Cuéntanos tu proyecto
              </h1>
              <p className="relato text-lg md:text-xl text-key/80 leading-snug mb-12">
                Rellena el formulario y respondemos con presupuesto y prueba de color en menos
                de 24 h. Visítanos en el {empresa.direccion.detalle} o llámanos sin compromiso.
              </p>

              <ul className="space-y-6">
                {([
                  { icono: MapPin, color: 'ambar', titulo: 'Taller', cuerpo: <address className="not-italic">{empresa.direccion.calle}<br />{empresa.direccion.cp} {ciudadProvincia}<br />{empresa.direccion.detalle}</address> },
                  { icono: Phone, color: 'cyan', titulo: 'Teléfono', cuerpo: <a href={`tel:${empresa.telefono.e164}`} className="hover:text-key transition-colors">{empresa.telefono.display}</a> },
                  { icono: Mail, color: 'coral', titulo: 'Email', cuerpo: <a href={`mailto:${empresa.email}`} className="hover:text-key transition-colors">{empresa.email}</a> },
                  { icono: Clock, color: 'lavender', titulo: 'Horario', cuerpo: <>Lun–Jue 8:00–18:00<br />Vie 8:00–19:00</> },
                ] as { icono: typeof MapPin; color: ColorBaldosa; titulo: string; cuerpo: React.ReactNode }[]).map(({ icono: Icono, color, titulo, cuerpo }) => (
                  <li key={titulo} className="flex gap-4 items-start">
                    <Baldosa color={color} cuadrada={false} className="w-11 h-11 shrink-0">
                      <Icono size={20} />
                    </Baldosa>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-gris mb-1">{titulo}</p>
                      <div className="font-sans text-sm text-key/80 leading-relaxed">{cuerpo}</div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Enlace a Google Maps */}
              <div className="mt-10">
                <Boton variant="secondary" size="md" asChild>
                  <a
                    href={mapaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Ver en Google Maps
                  </a>
                </Boton>
              </div>
            </div>

            {/* Formulario de presupuesto */}
            <Tarjeta barraCMYK className="p-8 md:p-10 self-start">
              <h2 className="font-display font-extrabold text-2xl text-key mb-6">
                Formulario de presupuesto
              </h2>
              <FormularioPresupuesto />
            </Tarjeta>
          </div>
        </div>
      </div>
    </>
  )
}
