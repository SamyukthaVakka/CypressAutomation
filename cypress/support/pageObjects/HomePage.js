class HomePage {
  getEditBox() {
    return cy.get('input[name="name"]:nth-child(1)');
  }
  getShopTab() {
    return cy.get(":nth-child(2) >.nav-link");
  }
}

export default HomePage;
