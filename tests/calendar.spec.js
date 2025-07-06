import {test,expect} from '@playwright/test'

test("Calendar Validation", async({page})=>{

    const date = '24';
    const month = '10';
    const year = '2046';
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker--enabled').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__next-button').click();
    await page.locator('.react-calendar__navigation__next-button').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    expect(await page.locator(".react-date-picker__inputGroup [type='date']").getAttribute("value")).toContain(year+"-"+month+"-"+date);
})