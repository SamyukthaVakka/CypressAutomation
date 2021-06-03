/// <reference types="Cypress"/>
import HomePage from "../../support/pageObjects/homePage";
import ProductsPage from "../../support/pageObjects/ProductsPage";
describe("My seventh Test Suite", function () {
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("My seventh test", function () {
    const homepage = new HomePage();
    const productsPage = new ProductsPage();
    cy.visit(Cypress.env("url") + "/angularpractice/");
    homepage.getEditBox().type(this.data.name);
    cy.get("select").select(this.data.gender);
    homepage.getShopTab().click();
    Cypress.config("defaultCommandTimeout", 8000);
    this.data.ProductName.forEach(function (el) {
      cy.selectProduct(el);
    });
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
});
