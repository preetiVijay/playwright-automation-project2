import {test, expect} from '@playwright/test'

test('Check whether the element is displayed or not', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    // expect(await page.locator('#displayed-text').isVisible()).toBeFalsy();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Automation of Java/Javascript alert popups", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.accept());
})

test("Validation of Mouse hover", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#mousehover").hover();
})

test("Frame Validation", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage =  page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visibile").click();
    console.log(framesPage.locator('.text h2').textContent());
})
 