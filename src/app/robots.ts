/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'
import { SITIO_URL } from '@/config/empresa'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${SITIO_URL}/sitemap.xml`,
  }
}
