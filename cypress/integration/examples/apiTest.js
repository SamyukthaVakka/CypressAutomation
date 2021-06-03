/// <reference types="Cypress" />
describe("My First fakeTest Suite", function () {
  it("My first faketest", function () {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium",
      isbn: "bcggdsss",
      aisle: "22s7",
      author: "John foe",
    }).then(function (response) {
      expect(response.body).to.have.property("Msg", "successfully added");
      expect(response.status).to.equals(200);
    });
  });
});
