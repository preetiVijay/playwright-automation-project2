import { test, expect, request } from '@playwright/test';
import { assert } from 'console';

const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"} //javascript object
const createOrderPayload = {orders:[{country:"India",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let token;
let orderId;

test.beforeAll(async() =>{

    // Login
    const apiContext = await request.newContext();   
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: loginPayload
        }     
    )
    expect((loginResponse).ok()).toBeTruthy(); // Check for successful status code in the range of 200 (200,201)
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    // Create order
    const orderCreatedResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: createOrderPayload,
            headers:{
               "Authorization": token,
               "Content-Type": "application/json"
            }
        }     
    )
    expect((orderCreatedResponse).ok()).toBeTruthy(); // Check for successful status code in the range of 200 (200,201)
    const orderCreatedResponseJson = await orderCreatedResponse.json();
    orderId = orderCreatedResponseJson.orders[0];
    console.log(orderId);
});

test.beforeEach(()=>{


});

test('Validate user should be successfully able to place the order', async ({ page }) => {
    
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

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
        if(orderId.includes(currentOrderId)){
            await orderList.nth(i).locator("td button").first().click();
            break;
        }
    }
    // Validate the actual order id 
    const actualOrderId = await page.locator(".col-text").textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();

    // Validate the actual product
    await expect(page.locator('div.title')).toHaveText(' ADIDAS ORIGINAL ');
    // 
});