/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { Boton } from '@/components/ui/Boton'

export const metadata: Metadata = {
  title: 'Contacto — Gráficas NASVE',
  description:
    'Contacta con Gráficas NASVE en Torrent (Valencia). Teléfono: 961 55 34 09. Email: nasve@nasve.com. Lunes a viernes de 8:00 a 18:00.',
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
  taxID: 'B46261210',
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
  hasMap: 'https://maps.google.com/?q=Ctra.+Mas+del+Jutge+53+Torrent+Valencia',
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
              <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
                Contacto
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-negro mb-6">
                Estamos en Torrent
              </h1>
              <p className="font-sans text-base text-gris leading-relaxed mb-12">
                Visítanos en el Polígono Industrial Masía del Juez, llámanos o
                escríbenos. Estaremos encantados de asesorarte sin compromiso.
              </p>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <MapPin size={22} className="text-oro shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-negro mb-1">Dirección</p>
                    <address className="not-italic font-sans text-sm text-gris leading-relaxed">
                      Ctra. Mas del Jutge, 53
                      <br />
                      46900 Torrent (Valencia)
                      <br />
                      Polígono Industrial Masía del Juez
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Phone size={22} className="text-oro shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-negro mb-1">Teléfono</p>
                    <a
                      href="tel:+34961553409"
                      className="font-sans text-sm text-gris hover:text-negro transition-colors"
                    >
                      961 55 34 09
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Mail size={22} className="text-oro shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-negro mb-1">Email</p>
                    <a
                      href="mailto:nasve@nasve.com"
                      className="font-sans text-sm text-gris hover:text-negro transition-colors"
                    >
                      nasve@nasve.com
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Clock size={22} className="text-oro shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-medium text-negro mb-1">Horario</p>
                    <p className="font-sans text-sm text-gris">
                      Lunes a jueves: 8:00 – 18:00
                      <br />
                      Viernes: 8:00 – 19:00
                    </p>
                  </div>
                </li>
              </ul>

              {/* Enlace a Google Maps */}
              <div className="mt-10">
                <Boton variant="secondary" size="md" asChild>
                  <a
                    href="https://maps.google.com/?q=Ctra.+Mas+del+Jutge+53+Torrent+Valencia+España"
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

            {/* Bloque CTA */}
            <div className="flex flex-col justify-center">
              <div className="bg-fondo-alt border border-borde p-10">
                <h2 className="font-display text-2xl font-bold text-negro mb-4">
                  ¿Tienes un proyecto?
                </h2>
                <p className="font-sans text-sm text-gris leading-relaxed mb-8">
                  La forma más rápida de obtener un presupuesto es a través de nuestro
                  formulario online. Cuéntanos qué necesitas y te respondemos en menos
                  de 24 horas laborables.
                </p>
                <Boton variant="primary" size="md" asChild>
                  <Link href="/presupuesto">Solicitar presupuesto</Link>
                </Boton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
