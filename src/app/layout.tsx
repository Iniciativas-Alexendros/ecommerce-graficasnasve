/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */
import type { Metadata } from 'next'
import { empresa, SITIO_URL, ciudadProvincia } from '@/config/empresa'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITIO_URL),
  title: {
    template: `%s | ${empresa.nombre}`,
    default: `${empresa.nombre} — Imprenta en ${empresa.direccion.ciudad} desde ${empresa.anioFundacion}`,
  },
  description:
    `Imprenta offset y digital en ${ciudadProvincia}. Encuadernación artesanal, acabados premium (stamping, UVI, relieves), personalización y impresión sobre madera. Décadas de experiencia. Presupuesto sin compromiso.`,
  keywords: [
    `imprenta ${empresa.direccion.ciudad}`,
    `imprenta ${empresa.direccion.provincia}`,
    'imprenta offset',
    'encuadernación artesanal',
    'acabados stamping',
    'tarjetas de visita',
    'folletos',
    'impresión digital',
    empresa.nombre,
  ],
  authors: [{ name: empresa.nombreLegal }],
  creator: 'Iniciativas Alexendros S.L.U.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITIO_URL,
    siteName: empresa.nombre,
    title: `${empresa.nombre} — Imprenta en ${empresa.direccion.ciudad} desde ${empresa.anioFundacion}`,
    description:
      `Imprenta offset y digital en ${ciudadProvincia}. Acabados premium, encuadernación artesanal, personalización. Décadas. Presupuesto sin compromiso.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${empresa.nombre} — Imprenta en ${empresa.direccion.ciudad} desde ${empresa.anioFundacion}`,
    description: `Imprenta offset y digital en ${ciudadProvincia}. Décadas de experiencia.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-papel text-tinta font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
