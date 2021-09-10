/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";
import { account } from "../page_object/account.js";
let faker = require("faker");

let validUser = {
    email: data.user.email,
    password: data.user.password
}

let invalidUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    shortPassword: "12"
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
        account.validationError(validation["invalidPassword/Email"]);
    })

    it("Login with invalid email and valid password", () => {
        login.loginClick(invalidUser.email, validUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation["invalidPassword/Email"]);
    })

    it("Login with invalid email and invalid password", () => {
        login.loginClick(invalidUser.email, invalidUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation["invalidPassword/Email"]);;
    })

    it("Login without credentials", () => {
        login.loginClick("{selectall}", "{backspace}");
        cy.url().should("contain", "/login");
        //trenutno nemam drugo resenje za ovaj case :(
        cy.get('form.el-form')
            .first()
            .get("span.el-form-item__error")
            .first()
            .should("be.visible")
            .and("have.text", validation.emailError);
        cy.get('form.el-form')
            .first()
            .get("span.el-form-item__error")
            .last()
            .should("be.visible")
            .and("have.text", validation.passwordError);
    })

    it("Login without email", () => {
        login.loginClick("{selectall}", validUser.password);
        cy.url().should("contain", "/login");
        account.validationError(validation.emailError);
    })

    it("Login without password", () => {
        login.loginClick(validUser.email, "{selectall}");
        cy.url().should("contain", "/login");
        account.validationError(validation.passwordError);        
    })

    it("Check for at least 5 characters error in password", () => {
        login.loginClick(validUser.email, invalidUser.shortPassword);
        cy.url().should("contain", "/login");
        account.validationError(validation.passwordCharacters);        
    })
})