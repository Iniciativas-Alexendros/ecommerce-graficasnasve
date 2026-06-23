# graficasnasve.art

Web e-commerce de **Gráficas NASVE** — imprenta offset y digital en Torrent (Valencia) desde 1982.
Next.js 16 · React 19 · Supabase · Resend · Tailwind v4 · Design System NASVE.

## 🔗 Enlaces

- **Deploy en vivo (temporal):** <https://ecom-graficasnasve.vercel.app>
- **Dominio de producción:** `https://graficasnasve.art` _(pendiente de apuntar DNS)_
- **Última release:** [v0.2.0](https://github.com/Iniciativas-Alexendros/ecom-graficasnasve/releases)
- Docs: [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`DEPLOYMENT.md`](./DEPLOYMENT.md) · [`ROADMAP.md`](./ROADMAP.md) · [`CHECKLIST-PROD.md`](./CHECKLIST-PROD.md) · [`COSTES.md`](./COSTES.md) · [`AUDITORIA-SEM-SEO.md`](./AUDITORIA-SEM-SEO.md)

## Desarrollo

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
```

Copiar `.env.example` → `.env.local` y rellenar (ver [`DEPLOYMENT.md`](./DEPLOYMENT.md)).

## Scripts

| Comando          | Acción                        |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Servidor de desarrollo        |
| `pnpm build`     | Build de producción (SSG/ISR) |
| `pnpm typecheck` | `tsc --noEmit`                |
| `pnpm lint`      | ESLint                        |
| `pnpm test`      | Tests unitarios (Vitest)      |
| `pnpm test:e2e`  | E2E (Playwright)              |

## CI/CD

GitHub Actions en cada PR/push: `typecheck · lint · test` + `e2e`. **Autodeploy a producción
(Vercel) solo cuando CI pasa en `main`** (ver `.github/workflows/deploy.yml`). `main` está
protegida (PR obligatorio + checks).
