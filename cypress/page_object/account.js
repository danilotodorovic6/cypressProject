/// <reference types="Cypress" />

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

    changeAccountSettings(firstName, lastName, password){
        this.accountBtn().click();
        cy.url().should("contain", "account/my-assignments");
        this.profileBtn().click();
        cy.url().should("contain", "account/settings");
        this.changeFirstName().clear();
        this.changeFirstName().type(firstName).then((element) => {
            cy.wrap(element).invoke("val").should("equal", firstName);
        });
        this.changeLastName().clear();
        this.changeLastName().type(lastName).then((element) => {
            cy.wrap(element).invoke("val").should("equal", lastName);
        });
        this.updateBtn().click();
        this.currentPassword().type(password);
    }
}

export const account = new Account();