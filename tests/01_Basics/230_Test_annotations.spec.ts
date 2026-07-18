import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

// Skip Test
test.skip('skipped test', async ({ page }) => {
    // This test is skipped.
});

// ONLY RUN this test
test.only('focused test', async ({ page }) => {
    // only this test runs
});

// mark as Fail
test.fail('expected to fail', async ({ page }) => {
    //This is expected to Fail
});

// slow test (3x timeout)
test('slow test', async ({ page }) => {
    test.slow();
    // Has extended timeout
});

// Conditional Skip
test('conditional', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Not supported in firefox');
});