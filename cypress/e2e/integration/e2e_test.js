describe("renders the home page", () => {
  it("renders correctly", () => {
    cy.visit("/auth");
    cy.get(".form").should("exist");
  });
});

describe("check if sign-up form work correctly", () => {
  it("sign-up sucsses", () => {
    cy.visit("/auth");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".sign-in_button").click();
    cy.get("#email").type("test@gmail.com");
    cy.get("#username").type("Test");
    cy.get("#password").type("12345678");
    cy.get(".form_actions > button").click();
    cy.get("#my-account").click();

    /* ==== End Cypress Studio ==== */
  });
});

describe("check if login form work correctly", () => {
  it("login sucsses", () => {
    cy.visit("/auth");
    cy.get(".form").should("exist");
    cy.get("#email").type("test@gmail.com");
    cy.get("#password").type("12345678");
    cy.get(".form_actions > button").click();
    cy.get("#logout").click();
  });
});

describe("adding quote", () => {
  it(" quotes adding feature work correctly", () => {
    cy.visit("/");
    cy.get(".quote-list").should("exist");
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/");
    cy.get("#auth").click();
    cy.get("#email").type("test@gmail.com");
    cy.get("#password").type("Test");
    cy.get(".form_actions > button").click();
    cy.get("#new-quote").click();
    cy.get(".author_input > .form-control").click();
    cy.get("#author").type("Test");
    cy.get("#quote").type("Test");
    cy.get(".form_actions > button").click();
    cy.wait(2000);
    cy.get(".delete").click();
    cy.get(".modal_btn").click();
    cy.get("#my-account").click();
    cy.get(".btn-warning").click();
    cy.get(".quote-list");
    /* ==== End Cypress Studio ==== */
  });
});
