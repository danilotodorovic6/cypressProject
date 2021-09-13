/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";
let faker = require("faker");

let pass = "password123";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
        if(account.updatedPassword === false){
            return login.loginClick(data.user.email, data.user.password);
        }
        login.loginClick(data.user.email, account.updatedPassword);
        cy.url().should("contain", "my-organizations");
    })
    it("Account settings", () => {
        account.changeAccountSettings();
        if(account.updatedPassword === false){
            return account.changePassword(data.user.password, pass);
        }
        account.changePassword(account.updatedPassword, pass);
        cy.log(account.updatedPassword)
    })

})