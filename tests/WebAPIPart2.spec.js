import { test, expect } from '@playwright/test';

let webContext;
let userEmail = 'vijaypreeti@gmail.com';

test.beforeAll(async({browser})=>{
    // Create a new context for the web API tests
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    // Login with valid username and password
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill('Qwerty@24');
    await page.locator('#login').click();
    // Wait for products to load
    await expect(page.locator('.card-body b').last()).toContainText('IPHONE 13 PRO');
    // Storing the login state of the page to reuse it in other tests
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('Validate user should be successfully able to place the order', async () => {
    
    const email = "";
    const page = await webContext.newPage(); // Create a new page with the web context and reuse the login state
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator("div.card-body");
    const count = await products.count();
    for(let i = 0; i < count; i++){
        if(await products.nth(i).locator('b').textContent() == "IPHONE 13 PRO"){
            await products.nth(i).locator("[class*='w-10']").click();
            break;
        }
    }

    // Click on cart button
    await page.locator("[routerLink*='cart']").click();

    // Validate that whether the added products are available in the page
    // await page.locator('div li').first().waitFor();
    await expect(page.locator('div li').first()).toBeVisible(); 
    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBeTruthy();

    // Click on checkout button
    await page.locator("text=Checkout").click();
    
    // Enter the card details and coupon to make the payment
    await page.locator('select.ddl').last().selectOption({'value':'30'});
    await page.locator('.small input.txt').first().fill('088');
    await page.locator('form > div > div:nth-child(3) > div > input').fill("Preeti Vijaywargiya");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();

    // Validate that the email id is correct
    await expect(page.locator(".mt-5 label")).toHaveText(userEmail);

    // Enter the starting chars of country sequentially
    await page.locator("[placeholder='Select Country']").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    
    // Store the appeared dropdown list in a variable
    const countryList =  page.locator('section.ta-results');
    await countryList.waitFor();

    // Count the number of countries available in the drop down list
    const countryListCount = await countryList.locator("button").count();

    // Iterate the list until the expected country is found and then click on it
    for(let i=0; i < countryListCount; i++){
        if(await countryList.locator("button").nth(i).textContent() === ' India'){
            await countryList.locator("button").nth(i).click();
            break;
        }
    }

    // Click on Place order button
    await page.locator(".action__submit").click();

    // Validate the successful order message
    const expectedSuccessfulMessage = "Thankyou for the order. "
    await expect(page.locator('.hero-primary')).toHaveText(expectedSuccessfulMessage);

    // Get the order id and save it into a variable
    const orderId = await page.locator('tr.ng-star-inserted').first().textContent();
    
    // Go to the Order History Page
    await page.locator("button[routerlink*='myorders']").click();

    // If order id is present in the list then click on view button for the same
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");

    // Count the number of orders available 
    const orderListCount = await orderList.count();
    for(let i=0; i < orderListCount; i++){
        const currentOrderId = await orderList.nth(i).locator("th").textContent();
        
        // If order list contains the actual order id then click on view button
        if(orderId.includes(currentOrderId)){
            await orderList.nth(i).locator("td button").first().click();
            break;
        }
    }
    // Validate the actual order id 
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();

    // Validate the actual product
    await expect(page.locator('div.title')).toHaveText('IPHONE 13 PRO');
    // 
});

test('User login and print the product titles', async () => {
    const email = "";
    const page = await webContext.newPage(); // Create a new page with the web context and reuse the login state
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator(".card-body");
    const titles = await products.locator('b').allTextContents();
    console.log(titles);
});