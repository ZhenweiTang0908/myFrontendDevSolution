import { expect, test } from "@playwright/test";
import { patternIds, type PatternId } from "../src/patterns/patternRegistry";

const dataPatterns = new Set<PatternId>([
  "search-list",
  "data-table",
  "detail",
  "master-detail",
  "comparison",
  "task-progress",
  "inbox-queue",
  "review-approval",
  "reports-analytics",
  "calendar-timeline",
]);

function configurationFor(patternId: PatternId) {
  const profile = dataPatterns.has(patternId) ? "data-workbench" : "product-custom";
  const theme = patternId === "help-docs" ? "green" : profile === "data-workbench" ? "graphite" : "violet";
  const density = profile === "data-workbench" ? "compact" : "comfortable";
  return `profile=${profile}&theme=${theme}&density=${density}&motion=calm&state=populated`;
}

for (const patternId of patternIds) {
  test(`${patternId} desktop baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/patterns/${patternId}?${configurationFor(patternId)}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".example-window")).toHaveScreenshot(`${patternId}-desktop.png`, { animations: "disabled" });
  });

  test(`${patternId} narrow baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/patterns/${patternId}?${configurationFor(patternId)}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".example-window")).toHaveScreenshot(`${patternId}-narrow.png`, { animations: "disabled" });
  });
}

test("admin Ant data table baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/patterns/data-table?profile=admin-ant&theme=blue&density=dense&motion=calm&state=populated");
  await expect(page.locator(".example-window")).toHaveScreenshot("data-table-admin-ant-desktop.png", { animations: "disabled" });
});

for (const theme of ["blue", "graphite", "green"] as const) {
  test(`home launcher ${theme} theme baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 1180, height: 820 });
    await page.goto(`/patterns/home-launcher?profile=product-custom&theme=${theme}&density=comfortable&motion=calm&state=populated`);
    await expect(page.locator(".example-window")).toHaveScreenshot(`home-launcher-${theme}.png`, { animations: "disabled" });
  });
}

test("large platform keeps stable module navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/?scale=large-platform&profile=admin-ant&theme=blue&density=dense&motion=calm&navigation=topbar");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: /Dashboard/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Data table/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Reports & analytics/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Settings/i })).toBeVisible();
  await expect(page.locator(".app-shell")).toHaveScreenshot("large-platform-modules.png", { animations: "disabled" });
});

test("Control switches Page Pattern without losing configuration", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?theme=green&density=compact&motion=calm");
  await page.getByLabel("Page Pattern", { exact: true }).selectOption("workflow");
  await expect(page).toHaveURL(/\/patterns\/workflow\?.*theme=green/);
  await expect(page.getByRole("heading", { level: 1, name: "Workflow" })).toBeVisible();
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "narrow", width: 390, height: 844 },
] as const) {
  test(`semantic icon library ${viewport.name} baseline`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/resources/icons?profile=product-custom&theme=violet&density=comfortable&motion=calm");
    await expect(page.getByRole("heading", { level: 1, name: /Choose icons by meaning/i })).toBeVisible();
    await expect(page.locator(".resource-header")).toHaveScreenshot(`icon-library-${viewport.name}.png`, { animations: "disabled" });
  });
}

test("semantic icon library filters by intent and fits at 320 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/resources/icons?theme=green&motion=calm");
  await page.getByRole("textbox", { name: "Search icons" }).fill("destroy");
  await expect(page.getByRole("heading", { level: 3, name: "Delete" })).toBeVisible();
  await expect(page.getByText("1 semantic icon")).toBeVisible();
  expect(await page.locator(".icon-library-page").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("the shell remains operable at 320 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/patterns/settings?profile=product-custom&theme=violet&density=comfortable&motion=calm&state=populated");
  await expect(page.getByRole("heading", { level: 1, name: "Settings" })).toBeVisible();
  await expect(page.getByLabel("Page Pattern", { exact: true })).toBeVisible();
  await expect(page.getByRole("slider", { name: "Exploration balance" })).toBeVisible();
  expect(await page.locator(".example-window").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
