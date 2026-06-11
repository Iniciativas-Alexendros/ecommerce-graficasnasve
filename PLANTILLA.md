# Plantilla white-label — Imprenta / Artes gráficas

Esta rama (`plantilla-base`) es una **copia despersonalizada** del sitio de
Gráficas NASVE: conserva **íntegro** el Design System «Cuatricromía + papel»
(tokens, fuentes, componentes, motivos de imprenta, páginas, tienda, `/encargo`,
panel admin, legales, SEO…) pero **sin ningún dato real de empresa**. Todos los
datos están sustituidos por *placeholders* evidentes para que puedas reutilizar
el sitio como base de un nuevo proyecto.

> La web real de NASVE vive en `main` y **no se ha tocado**.

## Cómo personalizarla — edita **un solo fichero**

Todos los datos de identidad de la empresa están centralizados en una **fuente
única de verdad**:

### `src/config/empresa.ts` ← **el único fichero a editar**

Cambia ahí el nombre, la razón social, la marca/wordmark, el dominio (y el
dominio antiguo del redirect 301), los correos (general, privacidad/DPO,
remitente), el teléfono, la dirección, las coordenadas del mapa, el CIF, los
datos registrales, el año de fundación, los años de trayectoria y el horario.
Esos valores se propagan automáticamente a **toda la web**: cabeceras y
metadatos globales, `siteName`/keywords, footer, páginas legales
(aviso-legal, privacidad, cookies), schema.org `LocalBusiness`/`Product`,
plantillas de email (`resend`), `manifest`, Open Graph, `sitemap`, `robots`,
canónicas, redirects de `next.config.ts`, panel admin y formularios.

El fichero exporta el objeto `empresa` y tres constantes derivadas listas para
usar: `SITIO_URL` (`https://<dominio>`), `ciudadProvincia`
(`Ciudad (Provincia)`) y `direccionLinea` (dirección postal en una línea).

> Tras editarlo, valida con `pnpm typecheck && pnpm lint && pnpm test`.

> **El catálogo va aparte.** Los productos y servicios **no** están en
> `empresa.ts`: viven en `src/lib/catalogoTienda.ts` y
> `src/lib/catalogoServicios.ts`. Ajústalos a tu oferta real por separado.

## Referencia: dónde se usa cada valor

Ya no hace falta buscar y reemplazar; basta con editar `empresa.ts`. Esta tabla
queda solo como referencia de **qué placeholder corresponde a cada campo** y
**dónde se consume**.

| Dato | Campo en `empresa.ts` | Placeholder | Se usa en |
|---|---|---|---|
| Nombre comercial | `empresa.nombre` | `Gráficas Ejemplo` | títulos, footer, schema, OG, emails |
| Razón social | `empresa.nombreLegal` (en mayúsculas: `.toUpperCase()`) | `Gráficas Ejemplo, S.L.` / `GRÁFICAS EJEMPLO, S.L.` | legales, footer, schema, emails |
| Marca / wordmark | `empresa.marca` | `ejemplo` | `Logo`, cabecera admin, emails, chatbot |
| Dominio | `empresa.dominio` / `SITIO_URL` | `tudominio.com` | URLs, canónicas, schema, sitemap, robots |
| Dominio antiguo (redirect 301) | `empresa.dominioAntiguo` | `tudominioantiguo.com` | `next.config.ts` |
| Email general | `empresa.email` | `hola@tudominio.com` | contacto, footer, schema, emails |
| Email privacidad / DPO | `empresa.emailPrivacidad` | `privacidad@tudominio.com` | privacidad, cookies, remitente interno |
| Email remitente | `empresa.emailRemitente` | `noreply@tudominio.com` | `src/lib/resend.ts` (`from`) |
| Teléfono | `empresa.telefono.{e164,display}` | `+34600000000` / `600 00 00 00` | contacto, footer, schema, emails |
| Dirección | `empresa.direccion.{calle,detalle}` / `direccionLinea` | `Calle de Ejemplo, 1` · `Polígono Industrial` | contacto, footer, legales, emails |
| Ciudad / Provincia | `empresa.direccion.{ciudad,provincia}` / `ciudadProvincia` | `Tu Ciudad` / `Tu Provincia` | títulos, schema, OG, legales |
| Código postal | `empresa.direccion.cp` | `00000` | dirección postal |
| País | `empresa.direccion.pais` | `ES` | schema `addressCountry` |
| Coordenadas del mapa | `empresa.direccion.geo.{lat,lng}` | `0, 0` | schema `geo` |
| CIF | `empresa.cif` | `B00000000` | footer, legales, schema `taxID`, emails |
| Datos registrales | `empresa.registroMercantil` | `Tomo 0000 · Folio 000 · Hoja 00000` | aviso legal |
| Año de fundación / trayectoria | `empresa.anioFundacion` / `empresa.aniosExperiencia` | `20XX` / `+XX` | hero, títulos, schema, footer |
| Horario | `empresa.horario.{laborable,viernes}` | `08:00`–`18:00` / `19:00` | schema `openingHours` |
| Descripción | `empresa.descripcion` | (texto de ejemplo) | metadatos, manifest, schema |

Ficheros que **consumen** `empresa.ts` (no necesitas editarlos para rebrandear):
`layout.tsx`, `(marketing)/{page,contacto,historia,servicios,servicios/[slug],tienda,tienda/[slug],presupuesto,portfolio,sostenibilidad,encargo}`,
`aviso-legal/`, `privacidad/`, `cookies/`, `Footer.tsx`, `Logo.tsx`, `Navbar.tsx`, `Chatbot.tsx`,
`resend.ts`, `manifest.ts`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, `not-found.tsx`,
`next.config.ts`, `admin/**` y los formularios. Aún tendrás que ajustar a mano el
catálogo (`catalogoTienda.ts`, `catalogoServicios.ts`) y `package.json` (`name`).

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
  imprenta; ajústalos a tu oferta real (`catalogoTienda.ts` / `catalogoServicios.ts`).
- Los datos de empresa ya están centralizados en `src/config/empresa.ts`:
  personalizar la plantilla es editar **un solo fichero**.
