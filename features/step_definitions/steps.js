import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(username, password);
    
});


When('Add {string} to the cart', async function (productName) {
    await expect(this.page.locator('.card-body b').last()).toContainText("IPHONE 13 PRO");
    const dashboardPage = this.poManager.getDashboardPage();
     // Search for the product and add it to the cart
    await dashboardPage.searchProduct(productName);
    // Click on cart button
    await dashboardPage.clickOnCartButton();
});


Then('verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    // Validate that whether the added products are available in the page
    await cartPage.waitForProductToBeAvailable(productName);
    // Click on checkout button
    await cartPage.clickOnCheckoutButton();
});


When('enter valid details and place the order', async function () {
    // Enter the card details and coupon to make the payment
    const checkOutPage = this.poManager.getCheckOutPage();
    await checkOutPage.enterCardDetails('30', '088', 'Preeti Vijay', 'rahulshettyacademy');
    // Set the country
    await checkOutPage.setCountry('Ind');
    // Place the order
    await checkOutPage.placeOrder();
});


Then('verify {string} message is displayed', async function (expectedSuccessfulMessage) {
    // Validate the successful order message
    await expect(this.page.locator('.hero-primary')).toHaveText(expectedSuccessfulMessage);
});


Then('verify order is present in the order history', async function () {
    // Get the order id and save it into a variable
    const orderReviewPage = this.poManager.getOrderReviewPage();
    const expectedOrderId = await orderReviewPage.returnExpectedOrderId();

    // Go to the Order History Page
    await orderReviewPage.clickOnOrderHistoryButton();

    // If order id is present in the list then click on view button for the same
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.clickOnViewButton(expectedOrderId);

    // Validate the actual order id 
    const actualOrderId = await this.page.locator(".col-text").textContent();
    expect(expectedOrderId.includes(actualOrderId)).toBeTruthy();

    // // Validate the actual product
    // await expect(page.locator('div.title')).toHaveText(dataSet.productName);
});