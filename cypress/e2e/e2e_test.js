import "../support/commands";
const data = require("../fixtures/navbar.json");
/// <reference types="Cypress" />

describe("auth and quotes", () => {
  /*
  before(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#auth").click();
    cy.get('[name="login_email"]').type("test@gmail.com");
    cy.get('[name="login_password"]').type("123456789");
    cy.get("#login-submit").click();
    cy.get("#my-account").click();
    cy.get("#delete-user").click();
    cy.wait(3000);
    cy.get("#auth").click();
    cy.get("#flip-mode-button").click();
    cy.get("input.false").type("test@gmail.com");
    cy.get('[name="username"]').type("Test");
    cy.get('[name="password"]').type("123456789", { force: true });
    cy.get("#sign-up-submit").click({ force: true });
    cy.get("#logout").click();
  });
  */
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.login("test@gmail.com", "123456789");
    cy.wait(2000);
  });
  it.only("Checking the Navbar", () => {
    cy.get("h3").contains("Test");
    cy.get(".btn").its("length").should("equal", 4);
    cy.get(".btn").each(($el, index, list) => {
      cy.get($el).invoke("text").should("contain", data.nav[index]);
      cy.wrap($el).should("be.visible");
    });
  });

  it("Adding quotes and editting them succesfully", () => {
    cy.get("#new-quote").click();
    cy.addQuote("Test", "Testing");
    cy.get(".btn").its("length").should("equal", 4);
    cy.findAllByText("-Test").should("exist");
    cy.get("#new-quote").click();
    cy.addQuote("Test2", "Testing2");
    cy.get("#all-quotes");
    cy.wait(2000);
    cy.get("#edit-quote").each(($el, index, list) => {
      cy.wait(2000);
      if ($el.text() === "EDIT") {
        cy.wrap($el).click();
        cy.get("#content-textarea").type(" Editted");
        cy.get("#edit-quote-submit").click();
        cy.wait(3000);
      }
    });
    cy.get("#quotes-list").should("contain", "Testing");
    cy.get("#quotes-list").should("contain", "-Test");
  });

  it("Checking the quotes", () => {
    cy.get(".singleQuote").each(($el, index, list) => {
      cy.wrap($el).scrollIntoView();
      cy.wrap($el).should("be.visible");
    });
  });

  it("Deleting quotes succesfully", () => {
    let numberOfButtons;
    cy.get(".btn-warning")
      .its("length")
      .then((length) => {
        for (let i = 0; i < length; i++) {
          cy.get(".btn-warning").eq(0).click();

          cy.get(".modal_btn").click();
          cy.wait(3000);
          cy.reload();
          cy.wait(3000);
        }
      });

    cy.get("#logout").click();
  });
});
