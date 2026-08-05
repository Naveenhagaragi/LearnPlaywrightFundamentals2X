import { test, expect } from '@playwright/test';

test('verify how to handle multiple elements ', async ({ page }) => {

    // Navigate to the page.
    // Find the locator which gives all the elements and text
    // loop through it and find the one which we want to click

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    const rightpanellinktexts: string[] = await page.locator('a.list-group-item').allInnerTexts();

    console.log(rightpanellinktexts.length);

    for (const links of rightpanellinktexts) {
        console.log(links);
    }

    console.log();

    for (let i = 0; i < rightpanellinktexts.length; i++) {
        console.log(rightpanellinktexts[i]);
    }

    console.log();

    for (const linktext of rightpanellinktexts) {
        if (linktext === 'Forgotten Password') {
            await page.getByText(linktext).first().click();
        }
    }

    const rightpanellinks = await page.locator('a.list-group-item').all();
    for (const link of rightpanellinks) {
        console.log(await link.getAttribute('href'));
    }
});