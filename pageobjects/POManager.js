import { LoginPage } from '../pageobjects/LoginPage';
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage';
import { CheckOutPage } from '../pageobjects/CheckOutPage';
import { OrderHistoryPage } from '../pageobjects/OrderHistoryPage';
import { OrderReviewPage } from '../pageobjects/OrderReviewPage';

export class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckOutPage(){
        return this.checkOutPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }

    async closeBrowser(){
        await this.page.close();
    }
}