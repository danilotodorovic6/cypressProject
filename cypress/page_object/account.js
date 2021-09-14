/// <reference types="Cypress" />
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";


class Account{

    get uploadImageBtn(){
        return cy.get('[class="vs-u-img--round"]');
    }

    get updateBtn(){
        return cy.get('button[type="submit"]');
    }

    findByName(name) {
        return cy.get(`[name=${name}]`)
    }

    findByHref(href) {
        return cy.get(`a[href="${href}"]`)
    }

    get loadingSpinner(){
        return cy.get(".el-loading-spinner");
    }

    validationError(error, formIndex, spanIndex){
        cy.wait(1000)
        cy.get('form.el-form')
            .eq(formIndex)
            .get("span.el-form-item__error")
            .eq(spanIndex)
            .should("exist")
            .and("have.text", error);
    }

    changeAccountSettings(){
        this.findByHref("/account").click();
        cy.url().should("contain", "account/my-assignments");
        this.findByHref("/account/settings").click();
        cy.url().should("contain", "account/settings");
    }

    changePersonalInfo(firstName, lastName){
        this.findByName("first_name").clear();
        this.validationError(validation.firstNameError, 0, 0);
        this.findByName("first_name").type(firstName);
        this.findByName("last_name").clear();
        this.validationError(validation.lastNameError, 0, 1);
        this.findByName("last_name").type(lastName);
        this.updateBtn.eq(0).click();
    }


    changePassword(oldPassword, newPassword){
            cy.writeFile("cypress/fixtures/updatedPassword.json", { updatedPassword: newPassword }).then(() => {
            this.findByName("currentpassword").first().type(oldPassword);
            this.findByName("newpassword").first().type(newPassword);
            this.findByName("repeatnewpassword").first().type(newPassword);
            this.updateBtn.eq(2).click();
        });
    }

    changeTheme(){
        cy.get(".vs-c-dropdown-underline > button").click();
        cy.get("ul.el-dropdown-menu > li")
            .should("have.length", 7)
            .click({ multiple: true, force: true})
    }
}


export const account = new Account();