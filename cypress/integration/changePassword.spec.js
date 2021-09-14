/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";
import updatedPassword from "../fixtures/updatedPassword.json"
let faker = require("faker");

let pass = faker.internet.password();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
        if(updatedPassword.updatedPassword){
            return login.loginClick(data.user.email, updatedPassword.updatedPassword);
        }
        cy.url().should("contain", "my-organizations");
    })
    it("Account settings", () => {
        cy.intercept("POST", "/api/v2/update-password").as("updatedPassword");
        account.changeAccountSettings();
        account.changePassword(updatedPassword.updatedPassword, pass);
        cy.wait("@updatedPassword").then((intercept) => {
            console.log(intercept);
            expect(intercept.response.statusCode).to.eq(200);
            cy.get(".el-message__group").should("be.visible")
                .and("contain", "Done! Profile info successfully updated.");
        })
    })

})