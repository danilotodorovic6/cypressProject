/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";


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
        cy.intercept("PUT", "api/v2/user-theme")
            .as("themeChanged")
        account.changeAccountSettings();
        account.changeTheme();
        cy.wait("@themeChanged")
            .then((intercept) => {
                expect(intercept.response.statusCode).to.eq(200);
                cy.get(".el-message").should("be.visible")
                    .and("contain", validation.successfullUpdatedTheme);
                //ovo sledece ne radi samo sam ti ostavio code da vidis sta sam radio
                //kasno sam video da se ta dva zapravo ne poklapaju
                //ali eto, da vidis kako sam se snasao (:
                cy.get(".vs-c-dropdown-underline > button").then((element) => {
                    return element.text();
                }).should("eq", intercept.response.body.theme);
            })
        
    })
    
})