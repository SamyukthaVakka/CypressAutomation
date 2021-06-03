Feature: End to end ecommerce validation

    application regression

Scenario: Ecommerce product delivery

Given I open ecommerce page
When I add items to Kart
And Validate the total prices
Then Select the country submit and verify thank you