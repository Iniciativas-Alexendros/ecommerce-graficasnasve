/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tudominio.com'),
  title: {
    template: '%s | Gráficas Ejemplo',
    default: 'Gráficas Ejemplo — Imprenta en Tu Ciudad desde 20XX',
  },
  description:
    'Imprenta offset y digital en Tu Ciudad (Tu Provincia). Encuadernación artesanal, acabados premium (stamping, UVI, relieves), personalización e impresión sobre madera. Décadas de experiencia. Presupuesto sin compromiso.',
  keywords: [
    'imprenta Tu Ciudad',
    'imprenta Tu Provincia',
    'imprenta offset',
    'encuadernación artesanal',
    'acabados stamping',
    'tarjetas de visita',
    'folletos',
    'impresión digital',
    'Gráficas Ejemplo',
  ],
  authors: [{ name: 'Gráficas Ejemplo, S.L.' }],
  creator: 'Iniciativas Alexendros S.L.U.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tudominio.com',
    siteName: 'Gráficas Ejemplo',
    title: 'Gráficas Ejemplo — Imprenta en Tu Ciudad desde 20XX',
    description:
      'Imprenta offset y digital en Tu Ciudad (Tu Provincia). Acabados premium, encuadernación artesanal, personalización. Décadas. Presupuesto sin compromiso.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gráficas Ejemplo — Imprenta en Tu Ciudad desde 20XX',
    description: 'Imprenta offset y digital en Tu Ciudad (Tu Provincia). Décadas de experiencia.',
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
