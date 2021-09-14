/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";
import { account } from "../page_object/account.js";
import updatedPassword from "../fixtures/updatedPassword.json"

let faker = require("faker");

let validUser = {
    email: data.user.email,
    password: updatedPassword.updatedPassword
}

let invalidUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    shortPassword: "1"
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Login test cases", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get("h1").invoke("text").then((text) => {
            expect(text).to.eq("Log in with your existing account");
        })
    })

    it("Login with valid credentials", () => {
        login.loginClick(validUser.email, validUser.password);
        cy.url().should("contain", "my-organizations");
    })

    it("Login with valid email and invalid password", () => {
        login.loginClick(validUser.email, invalidUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation["invalidPassword/Email"], 0, 2);
    })

    it("Login with invalid email and valid password", () => {
        login.loginClick(invalidUser.email, validUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation["invalidPassword/Email"], 0, 2);
    })

    it("Login with invalid email and invalid password", () => {
        login.loginClick(invalidUser.email, invalidUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation["invalidPassword/Email"], 0, 2);
    })

    it("Login without credentials", () => {
        login.findByType('submit').click();
        cy.url().should("contain", "/login");
        account.validationError(validation.emailError, 0, 0);
        account.validationError(validation.passwordError, 0, 1);
    })

    it("Login without email", () => {
        login.loginClick("{selectall}{backspace}", validUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation.emailError, 0, 0);
    })

    it("Login without password", () => {
        login.loginClick(validUser.email, "{selectall}{backspace}");
        cy.url().should("contain", "/login");
        account.validationError(validation.passwordError, 0, 1);        
    })

    it("Check for at least 5 characters error in password", () => {
        login.loginClick(validUser.email, invalidUser.shortPassword);
        cy.url().should("contain", "/login");
        account.validationError(validation.passwordCharacters, 0, 1);        
    })
})