/// <reference types="Cypress" />
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";


class Account{
    accountBtn(){
        return cy.get("a[href='/account']");
    }
    profileBtn(){
        return cy.get("a[href='/account/settings']");
    }
    uploadImageBtn(){
        return cy.get('[class="vs-u-img--round"]');
    }
    changeFirstName(){
        return cy.get("input[name='first_name']");
    }
    changeLastName(){
        return cy.get("input[name='last_name']");
    }
    updateBtn(){
        return cy.get('button[type="submit"]').eq(0);
    }
    currentPassword(){
        return cy.get('[name="currentpassword"]').first();
    }
    newPassword(){
        return cy.get('[name="newpassword"]').first();
    }
    repeatNewPassword(){
        return cy.get('[name="repeatnewpassword"]').first();
    }

    changeAccountSettings(){
        this.accountBtn().click();
        cy.url().should("contain", "account/my-assignments");
        this.profileBtn().click();
        cy.url().should("contain", "account/settings");
    }

    changePersonalInfo(firstName, lastName){
        this.changeFirstName().clear();
        cy.get('.vs-c-settings-section__info > .vs-c-settings-section-form > .el-form > :nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error')
            .should("be.visible")
            .and("have.text", validation.firstNameError);
        this.changeFirstName().type(firstName);
        this.changeLastName().clear();
        cy.get('.vs-c-settings-section__info > .vs-c-settings-section-form > .el-form > :nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error')
            .should("be.visible")
            .and("have.text", validation.lastNameError);
        this.changeLastName().type(lastName);
        this.updateBtn().click();
    }

    changePassword(oldpassword, newpassword){
        
        this.currentPassword().type(oldpassword).then(() => {
            oldpassword = newpassword;
        });
        this.newPassword().type(newpassword);
        this.repeatNewPassword().type(newpassword);
    }
}


export const account = new Account();