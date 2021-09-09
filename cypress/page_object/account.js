/// <reference types="Cypress" />
import data from "../fixtures/data.json";

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

    changePersonalInfo(firstName, lastName){
        this.accountBtn().click();
        cy.url().should("contain", "account/my-assignments");
        this.profileBtn().click();
        cy.url().should("contain", "account/settings");
        this.changeFirstName().clear();
        this.changeFirstName().type(firstName);
        this.changeLastName().clear();
        this.changeLastName().type(lastName);
        this.updateBtn().click();
    }
}

// this.currentPassword().type(oldpassword);
// this.newPassword().type(newpassword);
// this.repeatNewPassword().type(newpassword);


export const account = new Account();