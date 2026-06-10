/**
 * tudominio.com — Web App Manifest (marca Ejemplo)
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'
import { empresa } from '@/config/empresa'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${empresa.nombre} — Imprenta en ${empresa.direccion.ciudad} desde ${empresa.anioFundacion}`,
    short_name: 'Ejemplo',
    description: empresa.descripcion,
    start_url: '/',
    display: 'standalone',
    background_color: '#EFE7D7',
    theme_color: '#16140F',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
