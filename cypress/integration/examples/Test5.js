describe("My fourth Test Suite", function () {
  it("My third test", function () {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#opentab").then(function (el) {
      const url = el.prop("href");
      cy.visit(url);
    });
  });
});
