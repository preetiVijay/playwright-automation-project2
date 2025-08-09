export class CheckOutPage{

    constructor(page){
        this.page = page;
        this.creditCardExpiryDate = page.locator('select.ddl');
        this.cvvInput = page.locator('.small input.txt');
        this.nameOnCard = page.locator('form > div > div:nth-child(3) > div > input');
        this.coupounCode = page.locator("[name='coupon']");
        this.applyCouponButton = page.locator("[type='submit']");
        this.country = page.locator("[placeholder='Select Country']");
        this.countryList = page.locator('section.ta-results');
        this.placeOrderButton = page.locator(".action__submit");
    }

    async enterCardDetails(expDate, cvv, nameOnCard, couponCode){
        await this.creditCardExpiryDate.last().selectOption({'value':expDate});
        await this.cvvInput.first().fill(cvv);
        await this.nameOnCard.fill(nameOnCard);
        await this.coupounCode.fill(couponCode);
        await this.applyCouponButton.click();
    }

    async setCountry(countryStartChars){
        // Enter the starting chars of country sequentially
        await this.country.click();
        await this.country.pressSequentially(countryStartChars);
        //await this.country..pressSequentially(countryStartChars, { delay: 150 });

        // Store the appeared dropdown list in a variable
        await this.countryList.waitFor();

        // Count the number of countries available in the drop down list
        const countryListCount = await this.countryList.locator("button").count();

        // Iterate the list until the expected country is found and then click on it
        for (let i = 0; i < countryListCount; i++) {
            if (await this.countryList.locator("button").nth(i).textContent() === ' India') {
                await this.countryList.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }

}