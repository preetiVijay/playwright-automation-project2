import { expect } from '@playwright/test';
export class CartPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('div li');
        this.checkoutButton = page.locator("text=Checkout")
    }

    async waitForProductToBeAvailable(productName) {
        await this.products.first().waitFor();
        await expect(this.getProductLocator(productName)).toBeVisible();
    }

    getProductLocator(productName){
    return this.page.locator("h3:has-text('" + productName + "')");
    }

    async clickOnCheckoutButton(){
    await this.checkoutButton.click();
    }
}