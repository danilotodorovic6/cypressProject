/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import validation from "../../validationMessages.json";
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Changing theme", () => {
    beforeEach(() => {
        cy.visit("/login");
        login.loginClick(data.user.email, data.user.password);
        cy.url().should("contain", "my-organizations");
    })
    it("Change theme", () => {
        account.changeAccountSettings();
        account.changeTheme();
    })
    
})

//ul.el-dropdown-menu