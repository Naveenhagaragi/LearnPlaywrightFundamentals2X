import { chromium } from "playwright";
async function saveSession() {
    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto('https://www.idrive360.com/enterprise/login');
    await page.waitForTimeout(2000);
    await page.fill('#username', "qatest@yopmail.com");
    await page.fill('#password', "Password@1234");
    await page.waitForTimeout(1500);
    await page.click('#frm-btn');

    // Wait for login to actually complete before snapshotting storage - 
    // otherwise the Auth cookie isnt set yetand the saved state is empty.

    await page.waitForURL('https://www.idrive360.com/enterprise/devices');
    await page.waitForTimeout(3000);
    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json ");
    await page.waitForTimeout(2000);
    await browser.close();

}
saveSession();
