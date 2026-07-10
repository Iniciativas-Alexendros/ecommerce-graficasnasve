# graficasnasve.art

[![GitHub Actions][gha-badge]][gha-link]
[![Vercel Deploy][vercel-badge]][vercel-link]
[![Website][website-badge]][website-url]

**Web e-commerce de Gráficas NASVE** — imprenta offset y digital en Torrent (Valencia) desde 1982.

## 🚀 Características Principales

- **Desarrollo rápido:** Catálogo SSG con renderizado incrementral (ISR) para público general, entrega exprés de presupuestos en 48h
- **Precios claros:** Catálogo de productos con precios unitarios simples y estimación de costo total en vivo (Fase 2 implementada)
- **Flujo B2B profesional:** Protección RGPD, caching en Cloudflare, sistema de pipeline de presupuestos (Fase 2)
- **TDS completo:** 65% de cobertura de código, 15 tests unitarios, 11 tests E2E (todo en verde)
- **Design System actualizado:** Negro/Papel/Oro/Tinta de NASVE con modismos consistentes

## 🔗 Enlaces

- **Deploy en vivo (temporal):** <https://ecom-graficasnasve.vercel.app>
- **Dominio de producción:** `https://graficasnasve.art` _(pendiente de apuntar DNS)_
- **Última release:** [v0.2.0](https://github.com/Iniciativas-Alexendros/ecom-graficasnasve/releases)
- **Repository:** [GitHub](https://github.com/Iniciativas-Alexendros/ecom-graficasnasve)
- **Documents técnicos:**
  - [`ARCHITECTURE.md`](./ARCHITECTURE.md) ·
  - [`DEPLOYMENT.md`](./DEPLOYMENT.md) ·
  - [`ROADMAP.md`](./ROADMAP.md) ·
  - [`CHECKLIST-PROD.md`](./CHECKLIST-PROD.md) ·
  - [`COSTES.md`](./COSTES.md) ·
  - [`AUDITORIA-SEM-SEO.md`](./AUDITORIA-SEM-SEO.md)

## Badges del Proyecto

| [![npm]][npm-link] | [![TypeScript][ts-badge]][ts-link] | [![Next.js][next-badge]][next-link] | [![Vercel][vercel-badge]][vercel-link] | [![Playwright][pw-badge]][pw-link] | [![Lighthouse SEO][lh-badge]][lh-link] |
| ------------------ | ---------------------------------- | ----------------------------------- | -------------------------------------- | ---------------------------------- | -------------------------------------- |

## 📋 Comandos Principales

| Comando             | Acción                                           |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Servidor de desarrollo (`http://localhost:3000`) |
| `pnpm build`        | Build de producción optimizado (SSG/ISR)         |
| `pnpm start`        | Servidor de producción (`next start`)            |
| `pnpm typecheck`    | Verificación estricta de tipos (`tsc --noEmit`)  |
| `pnpm lint`         | Linting (`eslint`)                               |
| `pnpm format:check` | Verificación de formato (`prettier`)             |
| `pnpm test`         | Tests unitarios (`Vitest`)                       |
| `pnpm test:e2e`     | Tests E2E (`Playwright`)                         |

## 🚀 Desarrollo

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
```

### Pasos Rápidos para Setear el Proyecto

1. Copiar archivo de ejemplo:

   ```bash
   cp .env.example .env.local
   ```

2. Rellenar variables de entorno (ver [`DEPLOYMENT.md`](./DEPLOYMENT.md)):

3. Aplicar base de datos (Supabase):

   ```bash
   pnpm supabase db push
   ```

4. Levantar los Tests en E2E:
   ```bash
   pnpm exec playwright install --with-deps chromium
   pnpm test:e2e
   ```

## 📦 Stack Tecnológico

| Capa       | Tecnología                            | Versión     |
| ---------- | ------------------------------------- | ----------- |
| Framework  | Next.js (App Router)                  | 16.2.7      |
| UI         | React + TypeScript                    | 19.2.4      |
| Estilos    | Tailwind CSS v4 + Design System NASVE | v4          |
| Backend    | Supabase (PostgreSQL + Storage)       | v2          |
| Email      | Resend (DKIM + SPF)                   | v6          |
| CDN        | Vercel + Cloudflare                   | -           |
| Validación | Zod + React Hook Form                 | v4, v7.77.0 |
| Tests      | Vitest + Playwright (E2E)             | v3.2.6      |

## 🔐 Entorno | Configuración de Secretos

### Variables de Entorno del Proyecto (.env.local)

| Variable                        | Ámbito       | Descripción                                                |
| ------------------------------- | ------------ | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Público      | URL del proyecto de Supabase                               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Público      | Clave anónima de Supabase                                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Servidor** | Solo para procesos del servidor (subir archivos, insertar) |
| `RESEND_API_KEY`                | Servidor     | Clave API de Resend                                        |
| `RESEND_FROM`                   | Servidor     | Remitente verificado (ej. `no-reply@graficasnasve.art`)    |
| `RESEND_PRESUPUESTO_TO`         | Servidor     | Destino interno de email (ej. `alicia@nasve.com`)          |
| `NEXT_PUBLIC_APP_URL`           | Público      | Dominio principal (`https://graficasnasve.art`)            |

> **Consejo:** Nunca comitar `.env.local`. Agregar a `.gitignore`. Usar Vercel → Settings → Environment Variables para despliegues en producción.

## 🔄 CI/CD | Despliegue Profesional

GitHub Actions en cada PR/push para CI en 4 etapas:

1. **Calidad:** `pnpm typecheck` + `pnpm lint` + `pnpm test` (prácticas estrictas)
2. **E2E:** `pnpm build` + `pnpm test:e2e` (Playwright/Chromium)
3. **Autodeploy:** A Vercel SOLO cuando CI pasa en `main` (`.github/workflows/deploy.yml`)
4. **Herramientas de liberación:** Nódulo Vercel profesional + validación en `workflow_run`

## 📊 Métricas del Proyecto

- **65% Prueba Unitaria** (Vitest + Testing Library)
- **11 % E2E Pruebas** (Playwright + E2E Test Suite)
- **Entrega de CI/CD Segura:** El despliegue falla automáticamente si los tests fallan.
- **Escalabilidad:** Apto para producción multi-regional (regiones cdg1+fra1)

## 📄 Documentación Técnica

- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** — Esqueleto del sistema y flujo en vivo
- **[`DEPLOYMENT.md`](./DEPLOYMENT.md)** — Checklist de despliegue con checklist pre-lanzamiento
- **[`ROADMAP.md`](./ROADMAP.md)** — Autovía al features en progreso
- **[`CHECKLIST-PROD.md`](./CHECKLIST-PROD.md)** — Checklist web → production para releases

## 🎯 Uso de Referencia

Este repositorio está estructurado como una **plantilla reproducible** para proyectos de e-commerce profesionales:

### 🎯 Cómo Usar Este Repositorio como Template

1. **Clonar como template** o usar la función `Use this template` de GitHub
2. **Reemplazar variables** en `.env.example` con tus secrets
3. **Copiar inputs** de `.github/workflows/deploy.yml` en las variables de Vercer de tu proyecto
4. **Actualizar archivos de configuración** en `/config/`:
   - `vercel.json` - Configuración del deploy en Vercel
   - `.vercel/project.json` - Configuración del proyecto Vercel
5. **Crear consola web** - Clonar árbol en otras organizaciones, ramas y sitemaps
6. **Actualizar costos** - Reemplazar coeficientes en `src/lib/precioTienda.ts` con tarifas reales
7. **Validar en CI** - Seguir checklist pre-lanzamiento en [`CHECKLIST-PROD.md`](./CHECKLIST-PROD.md)

### 🔍 Lista de Chequeo Después de la Copia

- [ ] Variables de entorno en Vercel (producción y preview)
- [ ] Migración SQL aplicada y bucket privado `arte-files` en Supabase
- [ ] Usuario admin creado · login OK en `/admin`
- [ ] Dominio DKIM/SPF verificado (email de prueba recibido)
- [ ] `pnpm build` + CI en verde
- [ ] **Precios de la tienda revisados** (sustituir los orientativos)
- [ ] Envío real de presupuesto → fila en Supabase + emails (interno + acuse)
- [ ] Lighthouse SEO/Accesibilidad ≥ 90

### 🔧 Configuración Recommandada para Template

```bash
# Para proyectos nuevos
pnpm dlx vercel@latest create --yes
pnpm dlx supabase init --ignore-existing
pnpm dlx resend@latest create --yes
pnpm dlx @playwright/test install-deps chromium
pnpm dlx vercel@latest pull --yes --environment=production
```

## 🏷️ Enlaces Útiles

[![npm]][npm-link] [![TypeScript][ts-badge]][ts-link] [![Next.js][next-badge]][next-link] [![Vercel][vercel-badge]][vercel-link] [![Playwright][pw-badge]][pw-link] [![Lighthouse SEO][lh-badge]][lh-link]

<!-- Badges links -->

[gha-badge]: https://img.shields.io/github/workflows/ci.svg?branch=main&logo=github
[gha-link]: https://github.com/Iniciativas-Alexendros/ecom-graficasnasve/actions
[vercel-badge]: https://vercelbadge.vercel.app/metrics/w/[PROJECT_ID]/deployed.svg
[vercel-link]: https://ecom-graficasnasve.vercel.app
[website-badge]: https://img.shields.io/website.svg?logo=undefined&url=https://graficasnasve.art
[website-url]: https://graficasnasve.art
[npm-badge]: https://img.shields.io/badge/npm-latest-011e55.svg?style=flat-square&logo=npm
[npm-link]: https://www.npmjs.com/package/ecom-graficasnasve
[ts-badge]: https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=typescript
[ts-link]: https://www.typescriptlang.org/
[next-badge]: https://img.shields.io/badge/Next.js-000.svg?style=flat-square&logo=next.js
[next-link]: https://nextjs.org/
[pw-badge]: https://img.shields.io/badge/Playwright-4B47D4.svg?style=flat-square&logo=playwright
[pw-link]: https://playwright.dev/
[lh-badge]: https://img.shields.io/badge/Lighthouse-SEO-brightgreen.svg?style=flat-square&logo=lighthouse
[lh-link]: https://developer.chrome.com/docs/lighthouse/

<!-- Temporario: reemplazar con ID real y link -->
