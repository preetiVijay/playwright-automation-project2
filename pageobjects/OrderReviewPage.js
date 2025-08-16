export class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator('tr.ng-star-inserted');
        this.orderHistoryButton = page.locator("button[routerlink*='myorders']");
    }

    async returnExpectedOrderId() {
        return await this.orderId.first().textContent();
    }

    async clickOnOrderHistoryButton() {
        await this.orderHistoryButton.click();
    }
}