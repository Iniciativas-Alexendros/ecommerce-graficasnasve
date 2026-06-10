# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/)
y [Versionado Semántico](https://semver.org/lang/es/).

## [0.2.0] — 2026-06-10

### Añadido

- **Visita guiada de bienvenida** (`driver.js`): onboarding de primera visita
  (recordado en `localStorage`) que recorre Logo → Tienda → Encargo → CTA →
  Asistente. Accesible (respeta `prefers-reduced-motion`, navegable por teclado),
  popovers tematizados con el Design System NASVE y botón flotante para relanzarlo.
- **`e2e/tour.spec.ts`**: cobertura E2E del tour (autolanzado, no-repetición, relanzar).
- **`e2e/fixtures.ts`**: fixture que neutraliza el tour en el resto de la suite.
- **`CHECKLIST-PROD.md`**: checklist reutilizable web→producción (11 bloques).
- **`COSTES.md`**: coste interno real + propuesta de venta (precios verificados jun-2026).

### Cambiado

- `ROADMAP.md`: registra la visita guiada como UX transversal.
- `DEPLOYMENT.md`: corrige desfase — pagos son Fase 5 (Fase 4 = chatbot).
- `main` protegida: PR obligatorio, 2 status checks CI (strict), historia lineal,
  sin force-push/deletes, resolución de conversaciones obligatoria.

### Tests

- Unit (Vitest): 54/54 · E2E (Playwright): 11/11 · CI en verde.

[0.2.0]: https://github.com/Iniciativas-Alexendros/ecom-graficasnasve/releases/tag/v0.2.0
