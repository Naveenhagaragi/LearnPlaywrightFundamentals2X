import { test, expect } from '@playwright/test';

test('XPath- https://katalon-demo-cura.herokuapp.com/ ', async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    let make_appointment_btn = page.locator('//a[@id="btn-make-appointment"]');
    await make_appointment_btn.click();

    let username = await page.locator('//input[@aria-describedby="demo_username_label"]').inputValue();
    let password = await page.locator('//input[@aria-describedby="demo_password_label"]').inputValue();

    await page.locator('//input[@id="txt-username"]').fill(username);
    await page.locator('//input[@id="txt-password"]').fill(password);

    await page.locator('//button[@id="btn-login"]').click();

    await page.locator('//select[@id="combo_facility"]').selectOption('Hongkong CURA Healthcare Center');
    await page.locator('//input[@id="chk_hospotal_readmission"]').check();
    await page.locator('//input[@id="radio_program_medicaid"]').click();

    await page.locator('//input[@id="txt_visit_date"]').pressSequentially('10/07/2026', { delay: 200 });
    await page.locator('//textarea[@id="txt_comment"]').pressSequentially('This is a XPATH Locator Automation test by Naveen', { delay: 200 });

    await page.locator('//button[@id="btn-book-appointment"]').click();

    let Appointment_Conf = await page.locator('//p[@class="lead"]').textContent();
    expect(Appointment_Conf).toContain('Please be informed that your appointment has been booked as following:');

    await page.locator('//a[@class = "btn btn-default"]').click();

});