/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";
import updatedPassword from "../fixtures/updatedPassword.json";
import validation from "../../validationMessages.json";

let faker = require("faker");

let passwords = {
    invalidCurrentPassword: "random123",
    invalidShortPassword: "1",
    validPassword: "pass1234"
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Changing password", () => {
    beforeEach(() => {
        cy.visit("/login");
        if(updatedPassword.updatedPassword){
            return login.loginClick(data.user.email, updatedPassword.updatedPassword);
        }
        cy.url().should("contain", "my-organizations");
    })
    it.only("Changing password with valid credentials", () => {
        cy.intercept("POST", "/api/v2/update-password").as("updatedPassword");
        account.changeAccountSettings();
        account.changePassword(updatedPassword.updatedPassword, passwords.validPassword);
        cy.wait("@updatedPassword").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            cy.get(".el-message__group").should("be.visible")
                .and("contain", "Done! Profile info successfully updated.");
        })
    })
    it("Changing password with invalid current password", () => {
        cy.intercept("POST", "/api/v2/update-password").as("updatedPassword");
        account.changeAccountSettings();
        account.changePassword(passwords.invalidCurrentPassword, passwords.validPassword);
        cy.wait("@updatedPassword").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(400);
            cy.get(".el-message").should("be.visible")
                .and("contain", "Error updating the password. Please check all the fields again.")
        })
    })
    it("Changing password with short passwords", () => {
        account.changeAccountSettings();
        account.changePassword(passwords.invalidShortPassword, passwords.invalidShortPassword);
        account.validationError(validation.passwordCharacters, 2, 0, {force: true});
        account.validationError(validation.passwordCharacters, 2, 1);
        account.validationError(validation.passwordCharacters, 2, 2);
    })

})