export class DashboardPage {

    constructor(page){
        this.page = page;
        this.products = page.locator('div.card-body');
        this.cartButton = page.locator("[routerLink*='cart']");
    }

    async clickOnCartButton(){
        await this.cartButton.click();
    }

    async searchProduct(productName){
        const count = await this.products.count();
        for(let i = 0; i < count; i++) {
            if(await this.products.nth(i).locator('b').textContent() == productName) {
                await this.products.nth(i).locator("[class*='w-10']").click();
                break;
            }
        }
    }
}