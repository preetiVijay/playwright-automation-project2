import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

const loginPayload = {userEmail:"vijaypreeti@gmail.com",userPassword:"Qwerty@24"} //javascript object
const createOrderPayload = {orders:[{country:"India",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let response;

test.beforeAll(async() =>{

    const apiContext = await request.newContext();   
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test('Validate user should be successfully able to place the order', async ({ page }) => {
    
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);


    await page.goto('https://rahulshettyacademy.com/client');
    
    // Go to the Order History Page
    await page.locator("button[routerlink*='myorders']").click();

    // If order id is present in the list then click on view button for the same
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");

    // Count the number of orders available 
    const orderListCount = await orderList.count();
    for(let i=0; i < orderListCount; i++){
        const currentOrderId = await orderList.nth(i).locator("th").textContent();
        
        // If order list contains the actual order id then click on view button
        if(response.orderId.includes(currentOrderId)){
            await orderList.nth(i).locator("td button").first().click();
            break;
        }
    }
    // Validate the actual order id 
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(actualOrderId)).toBeTruthy();

    // Validate the actual product
    await expect(page.locator('div.title')).toHaveText(' ADIDAS ORIGINAL ');
    // 
});