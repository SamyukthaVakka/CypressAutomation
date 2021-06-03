describe("My First Test Suite", function () {
  it("My first test", function () {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    cy.get(".products").as("productLocator");
    cy.get("@productLocator")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          $el.find("button").click();
        }
      });
    cy.get(".cart-icon > img").click();
  });

  it("My second test", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
    cy.get('input[type="checkbox"]').check(["option2", "option3"]);
    cy.get("select").select("option2").should("have.value", "option2");
    cy.get("#autocomplete")
      .find("ui-menu-item div")
      .each(($el, index, $list) => {
        if ($el.text === "India") {
          $el.click();
        }
      });
    cy.get("#openwindow").click();
    cy.contains("Open Window").click();
    cy.get("select")
      .select("option2")
      .then((opt) => {
        expect(opt).to.exist;
        expect(opt.checked).to.be.true;
      });

    //.should("have.value", "option2");
  });
});
