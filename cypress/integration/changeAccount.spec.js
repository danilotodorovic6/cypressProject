/// <reference types="Cypress" />

import { login } from "../page_object/login.js";
import { account } from "../page_object/account.js";
import validation from "../../validationMessages.json";
import data from "../fixtures/data.json";
import updatedPassword from "../fixtures/updatedPassword.json"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Changing account settings", () => {
    beforeEach(() => {
        cy.visit("/login");
        if(updatedPassword.updatedPassword){
            return login.loginClick(data.user.email, updatedPassword.updatedPassword);
        }        
        cy.url().should("contain", "my-organizations");
    })
    it("Change personal info with valid values", () => {
        cy.intercept("PUT", "api/v2/users").as("updateProfileInfo");
        account.changeAccountSettings();
        account.changePersonalInfo(account.accountData.firstName, account.accountData.lastName);
        cy.wait("@updateProfileInfo").then((intercept) => {
            expect(intercept.response.body.first_name).to.equal(account.accountData.firstName);
            expect(intercept.response.body.last_name).to.equal(account.accountData.lastName);
            expect(intercept.response.statusCode).to.equal(200);
            cy.get(".el-message__group").should("be.visible").and("contain", validation.profileUpdate);            
        })
    })
    it("Change personal info without credentials", () => {
        account.changeAccountSettings();
        account.changePersonalInfo("{selectall}{backspace}", "{selectall}{backspace}");
        account.validationError(validation.firstNameError, 0, 0);
        account.validationError(validation.lastNameError, 0, 1);
    })
    it("Change personal info without first name", () => {
        account.changeAccountSettings();
        account.changePersonalInfo("{selectall}{backspace}", account.accountData.lastName);
        account.validationError(validation.firstNameError, 0, 0);
    })
    it("Change personal info without last name", () => {
        account.changeAccountSettings();
        account.changePersonalInfo(account.accountData.firstName, "{selectall}{backspace}");
        account.validationError(validation.lastNameError, 0, 1);
    })


    it("Changing password with valid credentials", () => {
        cy.intercept("POST", "/api/v2/update-password").as("updatedPassword");
        account.changeAccountSettings();
        account.changePassword(updatedPassword.updatedPassword, account.passwords.validPassword, account.passwords.validPassword);
        cy.wait("@updatedPassword").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            cy.get(".el-message__group").should("be.visible")
                .and("contain", "Done! Profile info successfully updated.");
        })
        cy.writeFile("cypress/fixtures/updatedPassword.json", { updatedPassword: account.passwords.validPassword });
    })

    it("Changing password without credentials", () => {
        account.changeAccountSettings();
        account.changePassword("{selectall}{backspace}", "{selectall}{backspace}", "{selectall}{backspace}");
        account.validationError(validation.currentPasswordError, 2, 0);
        account.validationError(validation.passwordError, 2, 1);
        account.validationError(validation.newPasswordError, 2, 2);
    })

    it("Changing password without current password", () => {
        account.changeAccountSettings();
        account.changePassword("{selectall}{backspace}", account.passwords.validPassword, account.passwords.validPassword);
        account.validationError(validation.currentPasswordError, 2, 0);
    })
    it("Changing password without new password", () => {
        account.changeAccountSettings();
        account.changePassword(account.passwords.validPassword, "{selectall}{backspace}", account.passwords.validPassword);
        account.validationError(validation.passwordsNotMatching, 2, 2);
    })
    it("Changing password without repeat new password", () => {
        account.changeAccountSettings();
        account.changePassword(account.passwords.validPassword, account.passwords.validPassword, "{selectall}{backspace}");
        account.validationError(validation.newPasswordError, 2, 2);
    })

    it("Changing password with invalid current password", () => {
        cy.intercept("POST", "/api/v2/update-password").as("updatedPassword");
        account.changeAccountSettings();
        account.changePassword(account.passwords.invalidCurrentPassword, account.passwords.validPassword, account.passwords.validPassword);
        cy.wait("@updatedPassword").then((intercept) => {
            expect(intercept.response.statusCode).to.eq(400);
            cy.get(".el-message").should("be.visible")
                .and("contain", validation.unsuccessfullUpdatedPassword)
        })
    })
    it("Changing password with short passwords", () => {
        account.changeAccountSettings();
        account.changePassword(account.passwords.invalidShortPassword, account.passwords.invalidShortPassword, account.passwords.invalidShortPassword);
        account.validationError(validation.currentPasswordCharacters, 2, 0);
        account.validationError(validation.passwordCharacters, 2, 1);
        account.validationError(validation.newPasswordCharacters, 2, 2);
    })

    it("New password and repeated new password not matching", () => {
        account.changeAccountSettings();
        account.changePassword(account.passwords.validPassword, account.passwords.validPassword, account.passwords.invalidCurrentPassword);
        account.validationError(validation.passwordsNotMatching, 2, 2);
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
            })
        
    })

})