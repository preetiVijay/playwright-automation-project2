import {test, expect, request} from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

const loginPayload = {userEmail:"vijaypreeti@gmail.com",userPassword:"Qwerty@24"} //javascript object
const createOrderPayload = {orders:[{country:"India",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let fakeOrderId = "67a8df1ac0d3e6622a297ddd";
let response;

test.beforeAll(async() =>{

    const apiContext = await request.newContext();   
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test("Security test request intercept", async({page})=>{

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);


    await page.goto('https://rahulshettyacademy.com/client');
    
    // Go to the Order History Page
    await page.locator("button[routerlink*='myorders']").click();

    // If order id is present in the list then click on view button for the same
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");

    // Route the actual request with fake request
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", // For any id, using * to accept anything
        async route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id="+ fakeOrderId})
    );

    const orderListCount = await orderList.count();

    for(let i=0; i < orderListCount; i++){
        const currentOrderId = await orderList.nth(i).locator("th").textContent();
        
        // If order list contains the actual order id then click on view button
        if(response.orderId.includes(currentOrderId)){
            await orderList.nth(i).locator("td button").first().click();
            // await orderList.nth(i).locator("button:has-text('View')").first().click();
            break;
        }
    }
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    
})

test("Abort the Network calls", async({page})=>{

    // page.route('**//*.css', route=>route.abort()); // Blocking all the CSS calls
    page.route('**//*.{jpg,png,jpeg}', route=>route.abort()); // Blocking all the images calls with different extensions
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.title());
})