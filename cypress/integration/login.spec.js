/// <reference types="Cypress" />

import { login } from "../page_object/login.js";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
        login.loginClick();
        cy.url().should("contain", "my-organizations");
    })
    

})