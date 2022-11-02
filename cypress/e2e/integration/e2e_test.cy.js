describe("auth and quotes", () => {
  it("sign-in and logout succesfully", () => {
    cy.visit("/auth");
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/auth");
    cy.get("#flip-mode-button").click();
    cy.get("input.false").type("test@gmail.com");
    cy.get('[name="username"]').type("Test");
    cy.get('[name="password"]').type("123456789");
    cy.get("#sign-up-submit").click({ force: true });
    cy.get("#logout").click();
    /* ==== End Cypress Studio ==== */
  });
  it("login succesfully", () => {
    cy.visit("/auth");
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("12345678");
    cy.get("#login-submit").click();
  });

  it("adding quotes and delete succesfully", () => {
    cy.visit("/auth");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("12345678");
    cy.get("#login-submit").click();
    cy.get("#new-quote").click();
    cy.get("#author-input").type("Test");
    cy.get("#content-textarea").type("Testings");
    cy.get("#add-quote-submit").click();
    cy.findByText("-Test").should("exist");
    cy.get("#new-quote").click();
    cy.get("#author-input").type("Test2");
    cy.get("#content-textarea").type("Testings2");
    cy.get("#add-quote-submit").click();
  });

  it("delete user and its quotes succesfully", () => {
    cy.get("#my-account").click();
    cy.get("#delete-user").click();
  });
});
