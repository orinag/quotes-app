describe("renders the home page", () => {
  it("renders correctly", () => {
    cy.visit("/auth");
    cy.get(".form").should("exist");
  });
});

describe("check if sign-up form work correctly", () => {
  it("sign-up sucsses", () => {
    cy.visit("/auth");

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#flip-mode-button").click();
    cy.get("#email").type("test@gmail.com", { force: true });
    cy.get("#username").type("Test", { force: true });
    cy.get("#password").type("12345678", { force: true });
    cy.get("#sign-up-button").click({ force: true });
    cy.get("#my-account").click();

    /* ==== End Cypress Studio ==== */
  });
});

describe("check if login form work correctly", () => {
  it("login sucsses", () => {
    cy.visit("/auth");
    cy.get(".form").should("exist");
    cy.get("#login_email").type("test@gmail.com");
    cy.get("#login_password").type("12345678");
    cy.get("#login-button").click();
    cy.wait(2000);
  });
});

describe("adding quote", () => {
  it(" quotes adding feature work correctly", () => {
    cy.get(".quote-list").should("exist");

    cy.get("#new-quote").click();
    cy.get("#author").type("Test");
    cy.get("#quote").type("Test");
    cy.get("#add-quote").click();
    cy.wait(1000);
    cy.get("#my-account").click();
    cy.get("#delete-user").click();
    cy.get(".quote-list");
    /* ==== End Cypress Studio ==== */
  });
});
