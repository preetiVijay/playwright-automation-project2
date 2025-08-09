export class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator('label.ng-star-inserted');
        this.orderHistoryButton = page.locator("button[routerlink*='myorders']");
        this.orderList = page.locator("tbody tr");
    }

    async returnExpectedOrderId() {
        return await this.orderId.textContent();
    }

    async clickOnViewButton(orderId) {
        await this.page.locator("tbody").waitFor();
        // Count the number of orders available 
        const orderListCount = await this.orderList.count();
        for (let i = 0; i < orderListCount; i++) {
            const currentOrderId = await this.orderList.nth(i).locator("th").textContent();
            // If order list contains the actual order id then click on view button
            if (orderId.includes(currentOrderId)) {
                await this.orderList.nth(i).locator("td button").first().click();
                break;
            }
        }
    }
}