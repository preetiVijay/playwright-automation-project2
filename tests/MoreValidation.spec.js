import { test, expect } from '@playwright/test'

test('Check whether the element is displayed or not', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    // expect(await page.locator('#displayed-text').isVisible()).toBeFalsy();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Automation of Java/Javascript alert popups", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.accept());
})

test("Validation of Mouse hover", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#mousehover").hover();
})

test.describe.configure({ mode: 'parallel' });
test("Frame Validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe");

    // Wait for the target element to be visible before clicking
    await expect(framesPage.locator("a.new-navbar-highlighter").first()).toBeVisible();
    await framesPage.locator("a.new-navbar-highlighter").first().click();

    // Await the textContent and log the result
    const headingText = await framesPage.locator('.text h2').textContent();
    console.log(headingText);
})

test("Screenshot & Visual comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await expect(page).toHaveScreenshot("sampleScreenshot.png", {
        maxDiffPixelRatio: 0.05, // Adjust this value based on your tolerance for visual differences
    });
    // expect(await page.screenshot()).toMatchSnapshot('sampleScreenshot.png');
})


