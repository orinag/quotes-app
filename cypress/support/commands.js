import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (email, password) => {
  cy.get("#auth").click();
  cy.get('[name="login_email"]').type(email);
  cy.get('[name="login_password"]').type(password);
  cy.get("#login-submit").click();
});

Cypress.Commands.add("addQuote", (author, contect) => {
  cy.get("#author-input").type(author);
  cy.get("#content-textarea").type(contect);
  cy.get("#add-quote-submit").click();
});
