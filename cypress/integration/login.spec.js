/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";
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
        cy.get('.vs-c-custom-errors > .el-form-item__error').should("be.visible").and("contain", validation["invalidPassword/Email"]);
    })

    it("Login with invalid email and valid password", () => {
        login.loginClick(invalidUser.email, validUser.password);
        cy.url().should("contain", "/login");
        cy.get('.vs-c-custom-errors > .el-form-item__error').should("be.visible").and("contain", validation["invalidPassword/Email"]);
    })

    it("Login with invalid email and invalid password", () => {
        login.loginClick(invalidUser.email, invalidUser.password);
        cy.url().should("contain", "/login");
        cy.get('.vs-c-custom-errors > .el-form-item__error').should("be.visible").and("contain", validation["invalidPassword/Email"]);
    })

    it("Login without credentials", () => {
        login.loginClick("{selectall}", "{backspace}");
        cy.url().should("contain", "/login");
        cy.get(".el-form-item__error.el-form-item-error--top").first().should("be.visible").and("contain", validation.emailError);
        cy.get(".el-form-item__error.el-form-item-error--top").last().should("be.visible").and("contain", validation.passwordError);
        
    })

    it("Login without email", () => {
        login.loginClick("{selectall}", validUser.password);
        cy.url().should("contain", "/login");
        cy.get(".el-form-item__error.el-form-item-error--top").first().should("be.visible").and("contain", validation.emailError);
    })

    it("Login without password", () => {
        login.loginClick(validUser.email, "{selectall}");
        cy.url().should("contain", "/login");
        cy.get(".el-form-item__error.el-form-item-error--top").last().should("be.visible").and("contain", validation.passwordError);
    })

    it("Check for at least 5 characters error in password", () => {
        login.loginClick(validUser.email, invalidUser.shortPassword);
        cy.url().should("contain", "/login");
        cy.get(".el-form-item__error.el-form-item-error--top").last().should("be.visible").and("contain", validation.passwordCharacters);
    })
})