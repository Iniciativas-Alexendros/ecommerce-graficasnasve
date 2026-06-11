import { test as base, expect } from "@playwright/test";

// Fixture por defecto para los E2E que NO prueban la visita guiada:
// siembra `tour-visto` antes de cargar la página para que el tour
// (driver.js) no se autolance y su overlay no intercepte clics.
export const test = base.extend({
  page: async ({ page }, run) => {
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("tour-visto:v1", "1");
      } catch {
        /* almacenamiento no disponible en este contexto */
      }
    });
    await run(page);
  },
});

export { expect };
