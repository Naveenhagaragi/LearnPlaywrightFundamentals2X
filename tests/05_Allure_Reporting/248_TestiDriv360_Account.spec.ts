import { test, expect } from "@playwright/test";

// Load saved session — already logged in
test.use({
    storageState: "./user-session.json"
});

test.describe("iDrive360 — session reuse", () => {

    test("go directly to dashboard — no login @P0 @smoke", async ({ page }, testInfo) => {

        await test.step("Open iDrive360 myAccount using saved session", async () => {
            await page.goto("https://www.idrive360.com/enterprise/account");
            console.log("Open iDrive360 myAccount using saved session — storageState applied, no login form hit");
            await testInfo.attach("step-0-myAccount-loaded", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify myAccount URL loaded", async () => {
            await expect(page).toHaveURL(/account/);
            console.log(`Verify myAccount URL loaded — ${page.url()}`);
            await testInfo.attach("step-1-myAccount-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });

    test("go directly to settings — no login @P1 @regression", async ({ page }, testInfo) => {

        await test.step("Open iDrive360 settings using saved session", async () => {
            await page.goto("https://www.idrive360.com/enterprise/bc-settings");
            console.log("Open iDrive360 settings using saved session — still authenticated");
            await testInfo.attach("step-0-settings-loaded", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify settings URL loaded", async () => {
            await expect(page).toHaveURL(/settings/);
            console.log(`Verify settings URL loaded — ${page.url()}`);
            await testInfo.attach("step-1-settings-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });
});