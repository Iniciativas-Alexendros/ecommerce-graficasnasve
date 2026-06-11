# COSTES — tudominio.com

> Doble lectura: **coste interno real** (lo que cuesta operar el sitio) y
> **propuesta de venta** (lo que se factura al cliente). Cifras verificadas en
> junio 2026 con las webs de pricing oficiales (ver §Fuentes). Fiabilidad de
> precios: **9/10** — el consumo real depende del tráfico; aquí se asume un
> sitio de imprenta local con tráfico bajo-medio.
> IVA **no** incluido salvo donde se indique.

---

## 1. Coste interno real

### 1.1 Fase de arranque (tier gratuito aguanta)

Para una imprenta local con pocos cientos de visitas/mes y < 100 presupuestos/mes,
el plan gratuito de cada servicio es suficiente al principio:

| Servicio           | Plan           | Límite relevante                                        | Coste/mes                       |
| ------------------ | -------------- | ------------------------------------------------------- | ------------------------------- |
| **Vercel**         | Hobby (free)   | Uso personal/no comercial¹                              | 0 €                             |
| **Supabase**       | Free           | 500 MB DB, 50K MAU, 1 GB storage, pausa por inactividad | 0 €                             |
| **Resend**         | Free           | 3.000 emails/mes · 100/día · 1 dominio                  | 0 €                             |
| **Dominio `.art`** | registro anual | —                                                       | ~15 €/año (≈ 1,25 €/mes)        |
| **Cloudflare DNS** | Free           | DNS + proxy                                             | 0 €                             |
| **GitHub**         | Free           | repo privado + Actions                                  | 0 €                             |
| **TOTAL arranque** |                |                                                         | **≈ 1,25 €/mes** (solo dominio) |

> ¹ **Aviso**: el plan **Hobby de Vercel es para proyectos no comerciales**. Una web
> de empresa que vende debe ir en **Pro** (cumplimiento de licencia). Por eso el
> escenario realista de producción es el siguiente.

### 1.2 Producción realista (recomendado)

| Servicio                                    | Plan     | Coste/mes           | Notas                                                                                                      |
| ------------------------------------------- | -------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Vercel Pro**                              | Pro      | **20 $** (~18,5 €)  | Incluye 20 $ de crédito (1 TB transfer, 10 M edge req). Tráfico bajo → no hay overage.                     |
| **Supabase**                                | Free→Pro | **0–25 $** (0–23 €) | Free sirve al inicio; pasar a **Pro (25 $)** cuando moleste la pausa por inactividad o se superen límites. |
| **Resend**                                  | Free     | **0 €**             | 3.000 emails/mes sobran para acuses + avisos internos.                                                     |
| **Dominio `.art`**                          | anual    | ~1,25 €/mes         | Renovación anual.                                                                                          |
| **Cloudflare / GitHub**                     | Free     | 0 €                 |                                                                                                            |
| **TOTAL infra (sólo Vercel Pro)**           |          | **≈ 18,5 €/mes**    | Supabase aún en free.                                                                                      |
| **TOTAL infra (Vercel Pro + Supabase Pro)** |          | **≈ 41,5 €/mes**    | Escenario maduro.                                                                                          |

### 1.3 Horas de mantenimiento (tu coste-tiempo)

No es caja, es tiempo. A tarifa interna de referencia **40 €/h**:

| Actividad                                                  | Frecuencia | Horas/mes          | Coste/mes       |
| ---------------------------------------------------------- | ---------- | ------------------ | --------------- |
| Actualización de dependencias + CI verde (Renovate/manual) | mensual    | 1,0 h              | 40 €            |
| Parcheo de seguridad / Next.js minor                       | trimestral | ~0,5 h prorrateado | 20 €            |
| Monitorización, incidencias, soporte básico                | continuo   | 1,0 h              | 40 €            |
| Cambios de contenido menores (precios, portfolio)          | mensual    | 0,5 h              | 20 €            |
| **TOTAL tiempo mantenimiento**                             |            | **~3 h/mes**       | **≈ 120 €/mes** |

### 1.4 Resumen coste interno

| Concepto                                               | Mensual         |
| ------------------------------------------------------ | --------------- |
| Infra (Vercel Pro, Supabase free)                      | ~18,5 €         |
| Mantenimiento (3 h)                                    | ~120 €          |
| **Coste interno total (arranque)**                     | **≈ 140 €/mes** |
| **Coste interno total (infra madura: + Supabase Pro)** | **≈ 162 €/mes** |

**Setup inicial (one-off):** el Design System Ejemplo + las 6 fases ya construidas
representan, a 40 €/h, del orden de **80–120 h** de desarrollo ≈ **3.200–4.800 €**
de coste hundido (ya invertido; relevante para amortización, no recurrente).

---

## 2. Propuesta de venta (al cliente)

Modelo recomendado: **setup + cuota mensual de mantenimiento**. Margen aplicado
sobre coste interno (~2× en cuota, estándar en mantenimiento web para PyME).

### 2.1 Setup (pago único)

| Concepto                                                                  | Precio            |
| ------------------------------------------------------------------------- | ----------------- |
| Diseño + desarrollo web (DS Ejemplo, tienda, presupuesto, admin, SEO, tour) | **2.500–3.500 €** |
| _(Alternativa "amortizado")_: 0 € setup a cambio de permanencia 12 meses  | —                 |

> El setup se posiciona como inversión cerrada; si la clienta prefiere CAPEX bajo,
> se amortiza en la cuota con contrato anual.

### 2.2 Cuota mensual (mantenimiento + alojamiento)

| Plan                       | Incluye                                                                                                                      | Precio/mes    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Esencial**               | Alojamiento (Vercel Pro), dominio, SSL, backups gestionados, hasta 1 h/mes de cambios, parches de seguridad, CI              | **49 €/mes**  |
| **Estándar** (recomendado) | Lo anterior + Supabase Pro, hasta 3 h/mes de cambios, soporte por email 48 h, actualización de dependencias, informe mensual | **99 €/mes**  |
| **Avanzado**               | Lo anterior + analítica/observabilidad, hasta 6 h/mes, soporte prioritario, evolutivos menores                               | **179 €/mes** |

### 2.3 Extras facturables aparte

| Concepto                                      | Precio                                    |
| --------------------------------------------- | ----------------------------------------- |
| Hora de desarrollo evolutivo (fuera de cuota) | 45–55 €/h                                 |
| Integración de pasarela de pago (Fase 5)      | 600–1.200 € (one-off)                     |
| Chatbot con IA (Fase 4, si LLM)               | presupuesto + coste de tokens repercutido |
| Sesión de fotos reales del taller             | según proveedor                           |

### 2.4 Margen estimado (plan Estándar)

|                                                            | Mensual  |
| ---------------------------------------------------------- | -------- |
| Ingreso cuota Estándar                                     | 99 €     |
| – Coste interno (infra madura ~41,5 € + 3 h manten. 120 €) | −161,5 € |

> ⚠️ A 3 h/mes reales, el plan Estándar **no cubre** el coste-tiempo a 40 €/h.
> El margen sale de que el mantenimiento real de un sitio estable es **< 1 h/mes**
> la mayoría de los meses. Recalculado a coste-tiempo real (~1 h/mes = 40 €):

|                        | Mensual           |
| ---------------------- | ----------------- |
| Ingreso cuota Estándar | 99 €              |
| – Infra (~41,5 €)      | −41,5 €           |
| – Tiempo real (~1 h)   | −40 €             |
| **Margen neto**        | **≈ +17,5 €/mes** |

El beneficio del modelo está en el **setup** y en los **evolutivos por hora**,
no en la cuota: la cuota cubre infra + disponibilidad y fideliza.

---

## 3. Design System como activo

El **DS Ejemplo v2.0** («Cuatricromía + papel») ya está construido y versionado en
`src/app/globals.css` + `src/components/ui/`. Implicaciones de coste:

- **No se re-cobra** en cada cambio: reduce el coste-hora de evolutivos (componentes
  reutilizables → menos horas por feature).
- **Reutilizable**: si Ejemplo quiere materiales coherentes (mailings, fichas), el DS
  ya define tokens, tipografía y color — base para venderle más (extensible a otros
  soportes).
- **Mantenimiento del DS**: prácticamente nulo mientras no cambie marca; cualquier
  retoque entra en las horas de cuota.

---

## 4. Recomendación

1. **Arrancar** en free (Vercel Hobby solo para preview/pre-prod; **producción en
   Vercel Pro** por licencia comercial).
2. **Vender** plan **Estándar (99 €/mes)** + setup 2.500–3.500 € (o setup amortizado
   con permanencia 12 meses).
3. **Subir a Supabase Pro** solo cuando la pausa por inactividad o los límites
   molesten — repercutir en la cuota, no absorber.
4. El **beneficio real** vive en setup + evolutivos por hora; la cuota es colchón de
   infra + retención.

---

## Fuentes (verificadas junio 2026)

- [Vercel Pricing](https://vercel.com/pricing) · [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan) — Pro 20 $/mes, 20 $ crédito incluido, 1 TB transfer, 10 M edge req.
- [Supabase Pricing](https://supabase.com/pricing) — Pro 25 $/mes (8 GB DB, 100K MAU, 100 GB storage, 10 $ crédito compute).
- [Resend Pricing](https://resend.com/pricing) · [New Free Tier](https://resend.com/blog/new-free-tier) — Free 3.000 emails/mes, 100/día, 1 dominio.
