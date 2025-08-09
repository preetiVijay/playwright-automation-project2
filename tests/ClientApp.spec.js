import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';

test('Validate user should be successfully able to place the order', async ({ page }) => {
    
    const username = 'vijaypreeti@gmail.com';
    // Login with valid username and password
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(username, 'Qwerty@24');

    // Select the products and add them into the cart
    await expect(page.locator('.card-body b').last()).toContainText('IPHONE 13 PRO');
    // const itemsList = await page.locator('.card-body b').allTextContents();
    // for(let i = 0; i < itemsList.length; i++){
    //     if(itemsList[i] == "IPHONE 13 PRO"){
    //         await page.locator("[class*='w-10']").nth(i).click();
    //         break;
    //     }
    // }

    const dashboardPage = poManager.getDashboardPage();
    const productName = 'IPHONE 13 PRO';
    // Search for the product and add it to the cart
    await dashboardPage.searchProduct(productName);
    // Click on cart button
    await dashboardPage.clickOnCartButton();

    const cartPage = poManager.getCartPage();
    // Validate that whether the added products are available in the page
    await cartPage.waitForProductToBeAvailable(productName);

    // Click on checkout button
    await cartPage.clickOnCheckoutButton();
    
    // Enter the card details and coupon to make the payment
    const checkOutPage = poManager.getCheckOutPage();
    await checkOutPage.enterCardDetails('30', '088', 'Preeti Vijay', 'rahulshettyacademy');
    // Validate that the email id is correct
    await expect(page.locator(".mt-5 label")).toHaveText(username);

    // Set the country
    await checkOutPage.setCountry('Ind');
    // Place the order
    await checkOutPage.placeOrder();

    // Validate the successful order message
    const expectedSuccessfulMessage = "Thankyou for the order. "
    await expect(page.locator('.hero-primary')).toHaveText(expectedSuccessfulMessage);

    // Get the order id and save it into a variable
    const orderReviewPage = poManager.getOrderReviewPage();
    const expectedOrderId = await orderReviewPage.returnExpectedOrderId();
    
    // Go to the Order History Page
    await orderReviewPage.clickOnOrderHistoryButton();

    // If order id is present in the list then click on view button for the same
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.clickOnViewButton(expectedOrderId);
    
    // Validate the actual order id 
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(expectedOrderId.includes(actualOrderId)).toBeTruthy();

    // Validate the actual product
    await expect(page.locator('div.title')).toHaveText(productName);
    // 
});