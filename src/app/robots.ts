/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://tudominio.com/sitemap.xml',
  }
}
