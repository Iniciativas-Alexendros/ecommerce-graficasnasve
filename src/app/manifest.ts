/**
 * tudominio.com — Web App Manifest (marca Ejemplo)
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gráficas Ejemplo — Imprenta en Tu Ciudad desde 20XX',
    short_name: 'Ejemplo',
    description:
      'Imprenta offset y digital en Tu Ciudad (Tu Provincia). Encuadernación artesanal, acabados premium, personalización e impresión sobre madera.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFE7D7',
    theme_color: '#16140F',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
