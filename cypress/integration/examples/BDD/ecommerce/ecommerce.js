import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../support/pageObjects/homePage";
import ProductsPage from "../../../../support/pageObjects/ProductsPage";
const homepage = new HomePage();
const productsPage = new ProductsPage();
Given("I open ecommerce page", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

When("I add items to Kart", function () {
  homepage.getShopTab().click();
  Cypress.config("defaultCommandTimeout", 8000);
  this.data.ProductName.forEach(function (el) {
    cy.selectProduct(el);
  });
});

And("Validate the total prices", () => {
  productsPage.checkOutButton().click();
  var sum = 0;
  cy.get("tr td:nth-child(4) strong")
    .each(($el, index, list) => {
      const amount = $el.text();
      var res = amount.split(" ");
      res = res[1].trim();
      sum = Number(sum) + Number(res);
    })
    .then(function () {
      cy.log(sum);
    });
  cy.get("h3 strong").then(function (el) {
    const amount = el.text();
    var res = amount.split(" ");
    var total = res[1].trim();
    expect(Number(total)).to.equal(sum);
  });
});

Then("Select the country submit and verify thank you", () => {
  cy.contains("Checkout").click();
  cy.get("#country").type("India");
  cy.get(".suggestions > ul > li > a").click();
  cy.get("#checkbox2").click({ force: true });
  cy.get('input[type="submit"]').click();
  cy.get(".alert").then(function (el) {
    const actualText = el.text();
    expect(actualText.includes("Success")).to.be.true;
  });
});
