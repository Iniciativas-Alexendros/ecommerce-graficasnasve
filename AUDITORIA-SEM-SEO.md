# AUDITORÍA SEM/SEO — graficasnasve.art

> Breve auditoría sobre el **deploy en vivo**: <https://ecom-graficasnasve.vercel.app>
> (URL temporal de Vercel; el dominio `graficasnasve.art` aún no resuelve — DNS sin apuntar).
> Fecha: 2026-06-11. Método: inspección de HTML servido, cabeceras, `robots.txt`, `sitemap.xml` y JSON-LD.

## Resumen

**SEO on-page: sólido (8,5/10).** Base técnica muy por encima de la media para una PyME local.
**SEM: 0 — no hay nada montado** (esperado, pre-lanzamiento). Lo cubre la Fase 6.

---

## SEO técnico — estado real (verificado en vivo)

| Señal                                    | Estado | Evidencia                                                              |
| ---------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `<html lang="es">`                       | ✅     | servido                                                                |
| `<title>` único y descriptivo            | 🟡     | **duplica marca**: `Gráficas NASVE — … \| Gráficas NASVE`              |
| `meta description` (≤ 160)               | ✅     | presente, con keywords locales                                         |
| `meta keywords`                          | ⚪     | presente (Google la ignora; inofensiva)                                |
| `meta robots` index/follow + googlebot   | ✅     | `max-image-preview:large`, snippets sin límite                         |
| Open Graph (title/desc/url/locale/type)  | ✅     | completo, `og:locale=es_ES`                                            |
| **`og:image`**                           | ❌     | **no aparece en el HTML servido** pese a existir `opengraph-image.tsx` |
| Twitter Card                             | ✅     | `summary_large_image`                                                  |
| `canonical`                              | ❌     | **no se sirve `<link rel="canonical">`** en la home                    |
| `robots.txt`                             | ✅     | `Allow: /`, bloquea `/admin` y `/api`, enlaza sitemap                  |
| `sitemap.xml`                            | ✅     | 30 URLs, `lastmod`/`changefreq`/`priority` correctos                   |
| **Sitemap apunta a `graficasnasve.art`** | ⚠️     | dominio aún no resuelve → reenviar tras DNS                            |
| JSON-LD `LocalBusiness`                  | ✅     | + `PostalAddress`, `GeoCoordinates`, `OpeningHours`, `AggregateRating` |
| Un solo `<h1>` por página                | ✅     | `Impreso preciso desde 1982.`                                          |
| HTTPS + HSTS preload                     | ✅     | `max-age=63072000; includeSubDomains; preload`                         |
| CSP / X-Frame-Options / nosniff          | ✅     | CSP estricta, `X-Frame-Options: DENY`                                  |
| Cacheo CDN                               | ✅     | `x-vercel-cache: HIT`, región `cdg1`                                   |

## Hallazgos accionables (prioridad alta → baja)

1. **[Alta] Falta `canonical`.** Añadir `alternates.canonical` en el `metadata` raíz
   (apuntando al dominio final). Sin canonical, riesgo de contenido duplicado entre
   `*.vercel.app`, `.art` y `.com`.
2. **[Alta] `og:image` no se sirve.** Existe `src/app/opengraph-image.tsx` pero el
   `<meta og:image>` no sale en el HTML — verificar que Next lo enlaza (nombre de
   fichero / export). Sin imagen, las cards sociales pierden CTR.
3. **[Media] `<title>` duplica la marca.** Quitar el `| Gráficas NASVE` final del
   `template` cuando el título ya contiene la marca (o usar `template: "%s | Gráficas NASVE"`
   solo en hijas, no en la home).
4. **[Media] Sitemap/OG con dominio que no resuelve.** Hasta apuntar DNS de
   `graficasnasve.art`, Google rastreará URLs muertas. Prioridad de go-live:
   DNS → Search Console → reenviar sitemap.
5. **[Baja] `AggregateRating` en JSON-LD.** Asegurar que las reseñas declaradas
   (10·4,8★ según ROADMAP) son **reales y verificables**; Google penaliza ratings
   inventados. Cuando haya reseñas Google reales, enlazar.

## SEM — punto de partida (nada activo)

No hay píxeles, conversiones ni campañas. Para lanzar (Fase 6):

| Acción                                       | Por qué                                                             | Coste orientativo        |
| -------------------------------------------- | ------------------------------------------------------------------- | ------------------------ |
| **Google Business Profile**                  | El mayor ROI para imprenta local: Maps + «imprenta Torrent»         | 0 €                      |
| **Search Console + Bing Webmaster**          | Indexación, rendimiento de búsqueda, enviar sitemap                 | 0 €                      |
| **GA4 + Consent Mode v2** (ya en ROADMAP F6) | Medir conversiones de presupuesto/encargo                           | 0 €                      |
| **Google Ads — Search local**                | Pujar por «imprenta Torrent», «imprenta Valencia», «encuadernación» | ~5–15 €/día para empezar |
| **Conversiones offline**                     | Importar presupuestos cerrados → optimizar pujas por valor real     | 0 € (config)             |

**Keywords semilla** (alta intención local, baja competencia): `imprenta Torrent`,
`imprenta Valencia barata`, `encuadernación artesanal Valencia`, `tarjetas de visita Torrent`,
`impresión gran formato Valencia`, `imprenta 48 horas Valencia`.

## Prioridad recomendada

1. Arreglar `canonical` + `og:image` + `<title>` (1–2 h, antes de indexar).
2. DNS `.art` → Search Console → enviar sitemap.
3. Google Business Profile (impacto local inmediato).
4. GA4 + Consent Mode (medición antes de gastar en Ads).
5. Campaña Search local con presupuesto contenido + conversiones offline.
