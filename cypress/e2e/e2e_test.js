/// <reference types="Cypress" />

describe("auth and quotes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "http://localhost:5000/api/quotes");
  });
  it("sign-in and logout succesfully", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#auth").click();
    cy.get("#flip-mode-button").click();
    cy.get("input.false").type("test@gmail.com");
    cy.get('[name="username"]').type("Test");
    cy.get('[name="password"]').type("123456789", { force: true });
    cy.get("#sign-up-submit").click({ force: true });
    cy.get("#logout").click();
    /* ==== End Cypress Studio ==== */
  });
  it("login succesfully", () => {
    cy.get("#auth").click();
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("12345678");
    cy.get("#login-submit").click();
  });

  it("adding quotes and delete succesfully", () => {
    cy.get("#auth").click();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("123456789");
    cy.get("#login-submit").click();
    cy.get("#new-quote").click();
    cy.get("#author-input").type("Test");
    cy.get("#content-textarea").type("Testings");
    cy.get("#add-quote-submit").click();
    cy.get("#quote_1").each(($el, index, list) => {
      cy.log("Index: " + index + " : " + $el.text());
      cy.log(index);
    });
    cy.findAllByText("-Test").should("exist");
    cy.get("#new-quote").click();
    cy.get("#author-input").type("Test2");
    cy.get("#content-textarea").type("Testings2");
    cy.get("#add-quote-submit").click();
    cy.wait(2000);
  });

  it.only("adding quotes and delete succesfully", () => {
    cy.get("#auth").click();
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("123456789");
    cy.get("#login-submit").click();
    cy.wait(3000);
    cy.get(".btn-warning").each(($el, index, list) => {
      cy.log("Index: " + index + " : " + $el.text());
      cy.wait(2000);
      if ($el.text() === "DELETE") {
        cy.wrap($el).click();
        cy.get(".modal_btn").click();
      }
    });
  });
  it("edit quotes succesfully", () => {
    cy.get("#edit-quote").first().click({ force: true });
    cy.get("#author-input").type("Test edited");
    cy.get("#content-textarea").type("Testings edited");
    cy.get("#edit-quote-submit").click();
    cy.wait(2000);
    cy.wait(3000);
  });

  it("delete user and its quotes succesfully", () => {
    cy.wait(2000);
    cy.get("#my-account").click();
    cy.get("#delete-user").click();
  });
});
