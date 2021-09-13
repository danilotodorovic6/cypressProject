/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

let password = data.user.password;
let updatedPassword = false;
let newPassword = "password123"

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
        if(updatedPassword === false){
            login.loginClick(data.user.email, password);
        }
        else{
            login.loginClick(data.user.email, updatedPassword);
        }
        cy.url().should("contain", "my-organizations");
    })
    it("Account settings", () => {
        account.changeAccountSettings();
        if(updatedPassword === false){
            cy.get(`[name="currentpassword"]`).first().type(password);
            cy.get(`[name="newpassword"]`).first().type(newPassword);
            cy.get(`[name="repeatnewpassword"]`).first().type(newPassword);
            updatedPassword = newPassword;
        }
        else{
            cy.get(`[name="currentpassword"]`).first().type(updatedPassword);
            cy.get(`[name="newpassword"]`).first().type(newPassword);
            cy.get(`[name="repeatnewpassword"]`).first().type(newPassword);
            updatedPassword = newPassword;
        }
    })
    it("AFdfa", () => {
        cy.log(updatedPassword);
    })

})