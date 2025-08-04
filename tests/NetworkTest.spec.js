import { test, expect, request } from '@playwright/test';
import { APIUtils } from './utils/APIUtils';

const loginPayload = {userEmail:"vijaypreeti@gmail.com",userPassword:"Qwerty@24"} //javascript object
const createOrderPayload = {orders:[{country:"India",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let fakePayload = {data:[],message:"No Orders"};
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

    // Route the actual response with fake response
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", // For any id, using * to accept anything
        async route=>{
            //intercepting response - Hijack the API response with fake response and send it to browser
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayload); // Converting JavaScript object to JSON string
            route.fulfill({
                response,
                body, // Faked response
            });
        }
    )
    
    // Go to the Order History Page
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/688f955e6f585eb60d59c46e");
    // await page.pause();
    expect(await page.locator(".mt-4").textContent()).toContain("You have No Orders to show at this time. Please Visit Back Us");
});