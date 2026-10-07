import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const sessionPath = path.resolve(process.cwd(), "user-session.json");
const hasSavedSession = fs.existsSync(sessionPath);

if (!hasSavedSession) {
    console.warn(`Saved VWO session not found at ${sessionPath}. Run the session-generation test first.`);
}

// Load saved session — already logged in when the file exists.
if (hasSavedSession) {
    test.use({
        storageState: sessionPath
    });
}

test.describe("VWO — session reuse", () => {
    test.skip(!hasSavedSession, "Saved VWO session not found. Run 247_1SessionStorage.spec.ts first to generate user-session.json.");

    test("go directly to dashboard — no login @P0 @smoke", async ({ page }, testInfo) => {
        test.setTimeout(180000);
        test.slow();

        await test.step("Open VWO dashboard with saved session", async () => {
            await page.goto("https://app.wingify.com/#/dashboard", { waitUntil: "domcontentloaded" });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForURL(/\/dashboard(?:\/|$)/, { timeout: 90000 });
            console.log("VWO dashboard opened using storageState — no login form should appear");
            await testInfo.attach("step-0-dashboard-opened", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify VWO dashboard URL and authentication state", async () => {
            await expect(page).toHaveURL(/\/dashboard(?:\/|$)/, { timeout: 90000 });
            console.log(`VWO dashboard verified — current URL: ${page.url()}`);
            await testInfo.attach("step-1-dashboard-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });

    test("go directly to settings — no login @P1 @regression", async ({ page }, testInfo) => {
        test.setTimeout(180000);
        test.slow();

        await test.step("Open VWO account settings with saved session", async () => {
            await page.goto("https://app.wingify.com/#/settings/accounts/general", { waitUntil: "domcontentloaded" });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForURL(/\/settings(?:\/|$)/, { timeout: 90000 });
            console.log("VWO settings page opened using stored authenticated session");
            await testInfo.attach("step-0-settings-opened", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify VWO settings page loads successfully", async () => {
            await expect(page).toHaveURL(/\/settings(?:\/|$)/, { timeout: 90000 });
            console.log(`VWO settings verified — current URL: ${page.url()}`);
            await testInfo.attach("step-1-settings-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });
});