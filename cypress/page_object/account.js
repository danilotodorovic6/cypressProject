/// <reference types="Cypress" />
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";


class Account{

    updatedPassword = false;

    get uploadImageBtn(){
        return cy.get('[class="vs-u-img--round"]');
    }

    get updateBtn(){
        return cy.get('button[type="submit"]').eq(0);
    }

    findByName(name) {
        return cy.get(`[name=${name}]`)
    }

    findByHref(href) {
        return cy.get(`a[href="${href}"]`)
    }

    validationError(error){
        cy.get('form.el-form')
            .first()
            .get("span.el-form-item__error")
            .should("be.visible")
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
        this.validationError(validation.firstNameError);
        this.findByName("first_name").type(firstName);
        this.findByName("last_name").clear();
        this.validationError(validation.lastNameError);
        this.findByName("last_name").type(lastName);
        this.updateBtn.click();
    }

    changePassword(oldPassword, newPassword){
        this.findByName("currentpassword").first().type(oldPassword);
        this.findByName("newpassword").first().type(newPassword);
        this.findByName("repeatnewpassword").first().type(newPassword).then(() => {
            this.updatedPassword = newPassword;
        });
    }

    changeTheme(){
        cy.get(".vs-c-dropdown-underline > button").click();
        cy.get("ul.el-dropdown-menu > li")
            .should("have.length", 7)
            .each((element) =>{})
            .click({ multiple: true, force: true})
    }
}


export const account = new Account();