import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import playwright from 'playwright';
import { POManager } from '../../pageobjects/POManager.js';

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.poManager = new POManager(page);
})

After(async function () {
    await this.browser.close();
})

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot.png'});
    }
})