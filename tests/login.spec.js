import {test, expect} from "@playwright/test"

test("User should be able to login", async({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator("form input[name='name']").fill("Daniel John");
    await page.locator("input[name='email']").fill("danielJohn@gmail.com");
    await page.getByPlaceholder("Password").fill("3422rrwrw");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Employed").check();
    // await page.locator("[name='bday']").fill("12.12.2012");
    await page.getByRole("button", {name: 'Submit'}).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole('button').click();

});