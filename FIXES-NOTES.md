# Fixes de seguridad — fase 1

Rama: `fix/seguridad-fase-1` (creada desde `main` local, commit `24dc33f`).

## Hallazgos cerrados

| Severidad | ID | Archivo | Línea aprox. | Fix aplicado |
|---|---|---|---|---|
| **CRÍTICO** | 1 | `src/app/api/presupuesto/route.ts` | 108 | Reemplazado `getPublicUrl()` por `createSignedUrl(storagePath, 3600)` usando `supabaseAdmin` (service-role). El signed URL se guarda en `presupuestos.archivo_url` y se envía por email. |
| **ALTO** | 2 | `src/lib/resend.ts` | 41 | Añadida función `escapeHtml` que escapa `&`, `<`, `>`, `"`, `'`. Se aplica a todas las variables interpoladas en la tabla HTML y en los cuerpos de email (`datos.email`, `datos.nombre`). |
| **ALTO** | 3 | `src/app/api/presupuesto/route.ts` | 82 | Validación de archivo en servidor: lista blanca de extensiones (`pdf`, `ai`, `eps`, `zip`), verificación de `archivo.type`, saneamiento del nombre con `path.basename` y regexp, y path forzado a `presupuestos/${uuid}/${safeName}`. |
| **ALTO** | 4 | `.github/workflows/ci.yml` | 16 | Acciones pinadas a SHA, bloque `permissions` mínimo (`contents: read`; `actions: write` solo en job `e2e` para `upload-artifact`), `persist-credentials: false` en todos los checkouts. |
| **ALTO** | 5 | `.github/workflows/deploy.yml` | 4 | `workflow_run` se conserva; se añade validación de `github.event.workflow_run.head_repository.full_name` y `github.event.workflow_run.actor.login`. Acciones pinadas a SHA, `permissions: contents: read`, `persist-credentials: false`. |
| **ALTO** | 6 | `pnpm-workspace.yaml` | 13 | Añadidos overrides para forzar versiones seguras: `postcss >=8.5.10`, `ws >=8.21.0`, `undici >=7.28.0`, `esbuild >=0.28.1`. `pnpm-lock.yaml` regenerado. |
| **MEDIO** | 7 | `next.config.ts` | 35 | Documentado como riesgo aceptado: `'unsafe-inline'` se mantiene porque el sitio usa JSON-LD inline (`src/app/(marketing)/tienda/[slug]/page.tsx`) y estilos inline; Stripe solo requiere el origen `https://js.stripe.com`. |
| **BAJO** | 8 | `.env.local.example` | 6 | Reemplazados placeholders con forma JWT por `YOUR_SUPABASE_ANON_KEY` y `YOUR_SUPABASE_SERVICE_ROLE_KEY`. |
| **BAJO** | 9 | `eslint.config.mjs` | 9 | Añadido `.claude/**` a `globalIgnores`. |
| **BAJO** | 10 | `.nvmrc` | 1 | Añadido archivo `.nvmrc` con `22`. |

## Verificaciones

| Comando | Resultado | Notas |
|---|---|---|
| `pnpm install` | OK | Se regeneró `pnpm-lock.yaml`. |
| `pnpm audit` | **0 vulnerabilidades** | Antes del fix: 4 altas, 3 moderadas, 3 bajas. |
| `pnpm lint` | OK | Sin errores. |
| `pnpm typecheck` | OK | `tsc --noEmit` sin errores. |
| `pnpm test` | OK | 54/54 tests unitarios. |
| `pnpm build` | OK | Build de producción correcto. |

## Decisiones importantes

- **Ubicación de `pnpm.overrides`**: pnpm `11.5.2` ya no lee el campo `pnpm` de `package.json` (muestra warning de "keys ignored"). Por eso los overrides se añadieron a `pnpm-workspace.yaml`, que es el fichero de settings que pnpm 11 sí respeta. Esto cumple el objetivo de forzar las versiones seguras y hace que `pnpm audit` reporte 0 vulnerabilidades.
- **Validación de archivos**: se rechaza la petición con `422` si el archivo adjunto no cumple la extensión o el tipo MIME. Si no hay archivo o falla la subida, el presupuesto sigue pudiendo enviarse sin adjunto (mismo comportamiento anterior).
- **Signed URL**: se usa TTL de 3600 s (1 h). El path saneado se almacena en Supabase Storage; el signed URL se guarda en `archivo_url` y se incluye en el email de NASVE como enlace de descarga.
- **CSP**: se optó por documentar el riesgo aceptado en lugar de eliminar `'unsafe-inline'`, para no romper el JSON-LD inline ni estilos inline existentes. La eliminación definitiva requiere nonces o migración a scripts/estilos externos.
- **Validación de `workflow_run`**: se verifica que el run provenga del mismo repositorio y que el actor esté identificado. No se hardcodeó una lista de usuarios porque el repositorio puede recibir pushes de varios mantenedores; se recomienda reforzar con reglas de protección de rama y ambientes en GitHub.

## Advertencias no bloqueantes

- `pnpm` y `next` muestran warning de `Unsupported engine: wanted node 22.x` porque el runtime actual es Node 26.3.1. Esto se resuelve en CI usando `.nvmrc`/`node-version: 22`.
- `next build` muestra un warning sobre detección de workspace root porque hay varios lockfiles en rutas superiores (`/home/alexendros/package-lock.json`). No afecta al build ni a la seguridad de este repositorio.
- `@react-email/components@1.0.12` está marcado como deprecated. No es una vulnerabilidad conocida, pero se puede considerar migrar a una versión mantenida en una fase posterior.

## Pendiente

- No se ha hecho `push` de la rama, conforme a la instrucción.
- MEDIO-2 (`dangerouslySetInnerHTML` en JSON-LD) y otros hallazgos no incluidos en este ticket permanecen abiertos para fases posteriores.
