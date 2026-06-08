# Plantilla white-label — Imprenta / Artes gráficas

Esta rama (`plantilla-base`) es una **copia despersonalizada** del sitio de
Gráficas NASVE: conserva **íntegro** el Design System «Cuatricromía + papel»
(tokens, fuentes, componentes, motivos de imprenta, páginas, tienda, `/encargo`,
panel admin, legales, SEO…) pero **sin ningún dato real de empresa**. Todos los
datos están sustituidos por *placeholders* evidentes para que puedas reutilizar
el sitio como base de un nuevo proyecto.

> La web real de NASVE vive en `main` y **no se ha tocado**.

## Cómo personalizarla (buscar y reemplazar)

| Dato | Placeholder en la plantilla | Sustituye por |
|---|---|---|
| Nombre comercial | `Gráficas Ejemplo` | tu marca |
| Razón social | `Gráficas Ejemplo, S.L.` / `GRÁFICAS EJEMPLO, S.L.` | tu razón social |
| Marca corta / wordmark | `Ejemplo` / `ejemplo.` | tu marca |
| Dominio | `tudominio.com` | tu dominio |
| Dominio antiguo (redirect 301) | `tudominioantiguo.com` | el tuyo (o elimina el redirect en `next.config.ts`) |
| Email general | `hola@tudominio.com` | tu email |
| Email privacidad / DPO | `privacidad@tudominio.com` | tu email de RGPD |
| Email remitente | `noreply@tudominio.com` | tu remitente |
| Teléfono | `+34600000000` / `600 00 00 00` | tu teléfono |
| Dirección | `Calle de Ejemplo, 1` · `Polígono Industrial` | tu dirección |
| Ciudad | `Tu Ciudad` | tu ciudad |
| Provincia | `Tu Provincia` | tu provincia |
| Código postal | `00000` | tu CP |
| CIF | `B00000000` | tu CIF |
| Año de fundación / trayectoria | `20XX` / `+XX` | tu año / tus años |
| Coordenadas del mapa | `latitude: 0, longitude: 0` | tus coordenadas |
| Datos registrales | `Tomo 0000 · Folio 000 · Hoja 00000` | los tuyos |

## Dónde viven los datos (ficheros a editar)

Los datos están **hardcodeados** (no hay aún un config central). Tras la
búsqueda y reemplazo de arriba, revisa especialmente:

- `src/app/layout.tsx` y `src/app/(marketing)/layout.tsx` — metadatos globales, `siteName`, keywords.
- `src/app/(marketing)/page.tsx` — home: schema `LocalBusiness`, hero, stats, cita de «Nuestra historia».
- `src/app/(marketing)/contacto/page.tsx` — schema, dirección, teléfono, email, enlace a Maps.
- `src/app/(marketing)/historia/page.tsx` — relato y *timeline* (hitos genéricos).
- `src/app/aviso-legal/`, `privacidad/`, `cookies/` — legales: razón social, CIF, registro, DPO.
- `src/components/marketing/Footer.tsx` y `Logo.tsx` — pie (dirección/contacto/CIF) y *wordmark*.
- `src/lib/resend.ts` — plantillas de email (pie con dirección y contacto).
- `src/lib/catalogoTienda.ts` y `src/lib/catalogoServicios.ts` — catálogo de productos y servicios.
- `src/app/manifest.ts`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts` — marca de sitio.
- `next.config.ts` — redirects de dominio antiguo y CSP. `package.json` — `name`.

## Qué se ha **retirado** (no se envía dato falso)

- **Reseñas/valoraciones** (`aggregateRating`, «4,8★», «Google Reviews»): eliminadas.
- **Coordenadas reales** del taller → `0, 0`.
- **Datos registrales** reales → ceros.
- **Historia con nombres propios** (fundador, barrio, ciudad) → narrativa genérica.
- **Marca de maquinaria concreta** (Duplo) → término genérico.

## Notas

- Las cabeceras de fichero mantienen `© Iniciativas Alexendros S.L.U.` (la agencia
  desarrolladora); cámbialo si procede para cada cliente.
- El catálogo conserva productos/servicios **de ejemplo** representativos de una
  imprenta; ajústalos a tu oferta real.
- Mejora futura sugerida: centralizar todos estos datos en un único
  `src/config/empresa.ts` para que personalizar sea editar **un solo fichero**.
