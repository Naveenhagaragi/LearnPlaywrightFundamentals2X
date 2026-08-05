import { test, expect } from "@playwright/test";

// Load saved session — already logged in
test.use({
    storageState: "./user-session.json"
});

test("go directly to dashboard — no login", async ({ page }) => {
    await page.goto("https://www.idrive360.com/enterprise/account");
    await expect(page).toHaveURL(/account/);
    console.log("Dashboard loaded — no login needed ✅");
    await page.waitForTimeout(3000);
});

test("go directly to settings — no login", async ({ page }) => {
    await page.goto("https://www.idrive360.com/enterprise/bc-settings");
    await expect(page).toHaveURL(/settings/);
    console.log("Settings loaded — still logged in ✅");
    await page.waitForTimeout(3000);
});