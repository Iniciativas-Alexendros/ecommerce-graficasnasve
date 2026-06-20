# CHECKLIST PRE-PRODUCCIÓN — web a producción

> Lista reutilizable para sacar **cualquier** web a producción. La columna **Estado**
> refleja `graficasnasve.art` a fecha de este PR. Leyenda: ✅ hecho · 🟡 parcial/manual · ⬜ pendiente.
> Hermanos: [`DEPLOYMENT.md`](./DEPLOYMENT.md) · [`ROADMAP.md`](./ROADMAP.md) · [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## 1. Calidad de código

| Ítem                                                      | Estado                      |
| --------------------------------------------------------- | --------------------------- |
| `typecheck` sin errores                                   | ✅                          |
| `lint` sin errores                                        | ✅                          |
| Tests unitarios verdes (Vitest, 54)                       | ✅                          |
| E2E verdes (Playwright, 11)                               | ✅                          |
| `build` de producción correcto (SSG/ISR)                  | ✅                          |
| Sin `console.log`/`debugger`/TODO bloqueantes             | ✅                          |
| Dependencias sin vulnerabilidades críticas (`pnpm audit`) | 🟡 revisar antes de go-live |

## 2. Git / repositorio

| Ítem                                                   | Estado       |
| ------------------------------------------------------ | ------------ |
| Rama `main` protegida (PR obligatorio + checks)        | ✅ (este PR) |
| CI en cada PR/push (typecheck·lint·test·e2e)           | ✅           |
| `.gitignore` cubre `.env*`, `node_modules`, artefactos | ✅           |
| Sin secretos en el historial                           | ✅           |
| `LICENSE` presente                                     | ✅           |
| README/AGENTS con arranque y convenciones              | ✅           |

## 3. Configuración y secretos

| Ítem                                                      | Estado          |
| --------------------------------------------------------- | --------------- |
| `.env.example` con todas las variables                    | ✅              |
| Variables definidas en el host (Vercel prod + preview)    | ⬜ al desplegar |
| Secretos solo server-side (no `NEXT_PUBLIC_` lo sensible) | ✅              |
| Claves de pago como stub hasta elegir proveedor (Fase 5)  | ✅              |

## 4. Seguridad

| Ítem                                                 | Estado                               |
| ---------------------------------------------------- | ------------------------------------ |
| Cabeceras de seguridad (CSP, HSTS, X-Frame-Options…) | 🟡 verificar en Vercel/`next.config` |
| RLS activa en Supabase + bucket `arte-files` privado | ✅ (migración) · ⬜ aplicar          |
| Rutas admin tras guard de auth                       | ✅                                   |
| Rate-limit / antispam en formularios públicos        | ⬜ recomendable                      |
| HTTPS forzado + redirect 301 dominio viejo→nuevo     | ✅ (`next.config.ts`)                |

## 5. SEO e indexación

| Ítem                                                    | Estado     |
| ------------------------------------------------------- | ---------- |
| `metadata`, Open Graph, Twitter cards                   | ✅         |
| Schema.org (`LocalBusiness`/`Product`/`BreadcrumbList`) | ✅         |
| `sitemap.xml` + `robots.txt`                            | ✅         |
| Canonical URLs correctas                                | ✅         |
| Search Console: verificar + enviar sitemap              | ⬜ go-live |
| `manifest` + favicon/iconos                             | ✅         |

## 6. Accesibilidad

| Ítem                                            | Estado              |
| ----------------------------------------------- | ------------------- |
| Navegación por teclado + focus visible          | ✅                  |
| `aria-label`/roles en controles e iconos        | ✅                  |
| Contraste AA del Design System                  | ✅                  |
| `prefers-reduced-motion` respetado (incl. tour) | ✅                  |
| Lighthouse Accesibilidad ≥ 90                   | ⬜ medir en go-live |

## 7. Rendimiento (Core Web Vitals)

| Ítem                                                   | Estado                     |
| ------------------------------------------------------ | -------------------------- |
| LCP < 2,5 s · CLS < 0,1 · INP < 200 ms                 | ⬜ medir                   |
| Imágenes optimizadas (`next/image`, formatos modernos) | 🟡 placeholders pendientes |
| Fuentes self-hosted sin FOUT                           | ✅                         |
| SSG/ISR donde aplica                                   | ✅                         |
| Lighthouse Performance ≥ 90                            | ⬜ medir                   |

## 8. UX / contenido

| Ítem                                              | Estado                    |
| ------------------------------------------------- | ------------------------- |
| Onboarding / visita guiada para nuevos visitantes | ✅ (driver.js)            |
| Páginas de error (404 / 500)                      | ✅ (`not-found`, `error`) |
| Estados de carga y vacío                          | ✅                        |
| Textos legales (aviso legal, privacidad, cookies) | ✅                        |
| Banner de cookies + Consent Mode (si analítica)   | ⬜ Fase 6                 |
| Contenido/imágenes reales (no placeholders)       | 🟡 pendiente del cliente  |

## 9. Datos y email

| Ítem                                           | Estado                   |
| ---------------------------------------------- | ------------------------ |
| Migración SQL aplicada en el proyecto real     | ⬜ al desplegar          |
| Dominio de email verificado (DKIM/SPF)         | ⬜ al desplegar          |
| Envío real de formulario → fila en BD + email  | ⬜ smoke en prod         |
| Backups / point-in-time recovery del proveedor | ✅ (Supabase gestionado) |

## 10. Observabilidad y operación

| Ítem                                         | Estado               |
| -------------------------------------------- | -------------------- |
| Monitor de errores (Sentry o equiv.)         | ⬜ deuda técnica     |
| Analítica de producto (GA4/Plausible)        | ⬜ Fase 6            |
| Uptime/alertas                               | ⬜ recomendable      |
| Runbook de despliegue y rollback documentado | ✅ (`DEPLOYMENT.md`) |

## 11. Go-live final

- [ ] Smoke manual de los flujos críticos en producción
- [ ] DNS apuntando + propagado + redirect viejo dominio
- [ ] Variables de entorno verificadas en prod
- [ ] Lighthouse en verde (SEO/A11y/Perf ≥ 90)
- [ ] UAT con el cliente final
- [ ] Anuncio (redes / reseñas)
