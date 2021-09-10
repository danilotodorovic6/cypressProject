/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import validation from "../../validationMessages.json";
import data from "../fixtures/data.json";

let faker = require("faker");

let accountData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Changing personal info", () => {
    beforeEach(() => {
        cy.visit("/login");
        login.loginClick(data.user.email, data.user.password);
        cy.url().should("contain", "my-organizations");
    })
    it("Change personal info with valid values", () => {
        cy.intercept("PUT", "https://cypress-api.vivifyscrum-stage.com/api/v2/users").as("updateProfileInfo");
        account.changeAccountSettings();
        account.changePersonalInfo(accountData.firstName, accountData.lastName);
        cy.wait("@updateProfileInfo").then((intercept) => {
            console.log(intercept);
            expect(intercept.response.body.first_name).to.equal(accountData.firstName);
            expect(intercept.response.body.last_name).to.equal(accountData.lastName);
            expect(intercept.response.statusCode).to.equal(200);
            cy.get(".el-message__group").should("be.visible").and("contain", validation.profileUpdate);            
        })
    })

})