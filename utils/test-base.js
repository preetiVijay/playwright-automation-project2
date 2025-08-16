import { test as base } from "@playwright/test";

export const customtest = base.extend({
    testDataForOrder: {
        username: "vijaypreeti@gmail.com",
        password: "Qwerty@24",
        productName: "IPHONE 13 PRO"
    }
});