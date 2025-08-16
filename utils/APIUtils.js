export class APIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: this.loginPayload
            }     
        );
        // expect((loginResponse).ok()).toBeTruthy(); // Check for successful status code in the range of 200 (200,201)
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(createOrderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderCreatedResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
                {
                    data: createOrderPayload,
                    headers:{
                       "Authorization": response.token,
                       "Content-Type": "application/json"
                    }
                }     
            );
        // expect((orderCreatedResponse).ok()).toBeTruthy(); // Check for successful status code in the range of 200 (200,201)
        const orderCreatedResponseJson = await orderCreatedResponse.json();
        response.orderId = orderCreatedResponseJson.orders[0];
        return response;
    }

}