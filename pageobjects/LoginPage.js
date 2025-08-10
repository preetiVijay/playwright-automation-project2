// This class represents the login page of the application.
export class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async gotoLoginPage(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(userName, password){
        await this.username.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}