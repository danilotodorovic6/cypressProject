/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";
let faker = require("faker");

// let password = '';
// if(password === ''){
//     password = 11111111;
// }


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
        login.loginClick(data.user.email, data.user.password)
        cy.url().should("contain", "my-organizations");
    })
    it("Account settings", () => {
        account.changeAccountSettings();
        account.changePassword("11111111", "22222");
    })

})