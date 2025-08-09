export class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator('label.ng-star-inserted');
        this.orderHistoryButton = page.locator("button[routerlink*='myorders']");
    }

    async returnExpectedOrderId() {
        return await this.orderId.textContent();
    }

    async clickOnOrderHistoryButton() {
        await this.orderHistoryButton.click();
    }
}