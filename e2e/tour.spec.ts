import { test, expect } from "@playwright/test";

// La visita guiada (driver.js) arranca sola en la primera visita y puede
// relanzarse con el botón flotante. localStorage marca que ya se vio.

test("el tour arranca solo en la primera visita y avanza de paso", async ({
  page,
}) => {
  await page.goto("/");

  // El popover de driver.js aparece sin interacción (timeout interno ~600ms).
  const popover = page.locator(".driver-popover");
  await expect(popover).toBeVisible({ timeout: 5000 });
  await expect(popover.locator(".driver-popover-title")).toContainText(
    /Bienvenida/i,
  );

  // Avanza al siguiente paso.
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(popover.locator(".driver-popover-title")).toContainText(
    /Tienda/i,
  );
});

test("el tour no se repite en la segunda visita y se puede relanzar", async ({
  page,
}) => {
  // Primera visita: lo vemos y lo cerramos.
  await page.goto("/");
  await expect(page.locator(".driver-popover")).toBeVisible({ timeout: 5000 });
  await page.keyboard.press("Escape");
  await expect(page.locator(".driver-popover")).toBeHidden();

  // Recargar: ya no arranca solo.
  await page.reload();
  await page.waitForTimeout(1200);
  await expect(page.locator(".driver-popover")).toBeHidden();

  // El botón flotante lo relanza.
  await page.getByRole("button", { name: /visita guiada/i }).click();
  await expect(page.locator(".driver-popover")).toBeVisible();
});
