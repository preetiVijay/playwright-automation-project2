Feature: Ecommerce validation

Scenario: Placing the order with valid credentials
    Given a login to Ecommerce application with "vijaypreeti@gmail.com" and "Qwerty@24"
    When Add "IPHONE 13 PRO" to the cart
    Then verify "IPHONE 13 PRO" is displayed in the cart
    When enter valid details and place the order
    Then verify "Thankyou for the order. " message is displayed
    And verify order is present in the order history