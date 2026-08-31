import { chromium } from "playwright";
import dotenv from "dotenv";
import fs from "fs/promises";

// Credentials live in .env (gitignored) — never hardcode them in a public repo.
// Copy .env.example -> .env and fill in your own VWO login before running this.
dotenv.config();

const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;

async function saveAdminSession() {



}

async function saveSession() {

    if (!VWO_USER || !VWO_PASS) {
        throw new Error("Missing VWO_USER / VWO_PASS. Copy .env.example to .env and fill them in.");
    }

    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://app.wingify.com/#/login");
    await page.waitForTimeout(2000);

    await page.fill("#login-username", VWO_USER);
    await page.fill("#login-password", VWO_PASS);
    await page.waitForTimeout(5000);

    await page.click("#js-login-btn");

    // Wait for login to actually complete before snapshotting storage —
    // otherwise the auth cookie isn't set yet and the saved state is empty.
    console.log('Clicked login button, waiting for redirect...');
    const expected = /#\/(dashboard|home)/;
    const maxMs = 60000;
    const interval = 1000;
    let elapsed = 0;
    // poll the URL so we can log progress and capture a screenshot on failure
    while (!expected.test(page.url()) && elapsed < maxMs) {
        await page.waitForTimeout(interval);
        elapsed += interval;
        console.log(`Waiting for redirect... ${elapsed}/${maxMs}ms, url=${page.url()}`);
    }
    if (!expected.test(page.url())) {
        console.error('Redirect did not happen within timeout; saving debug artifacts.');
        try {
            await page.screenshot({ path: 'login-failure.png', fullPage: true });
            const html = await page.content();
            await fs.writeFile('login-failure.html', html, 'utf8');
            console.error('Saved login-failure.png and login-failure.html');
        } catch (e) {
            console.error('Failed saving debug artifacts:', e);
        }
        throw new Error(`Login redirect did not happen within ${maxMs}ms.`);
    }
    console.log('Redirect detected:', page.url());
    await page.waitForTimeout(1000);

    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json ✅");

    await page.waitForTimeout(2000);
    await browser.close();

}

saveSession();
saveAdminSession();