/// <reference types="Cypress" />
import data from "../fixtures/data.json";
import validation from "../../validationMessages.json";


class Account{
    findByName(name) {
        return cy.get(`[name=${name}]`)
    }
    findByHref(href) {
        return cy.get(`a[href="${href}"]`)
    }
    uploadImageBtn(){
        return cy.get('[class="vs-u-img--round"]');
    }
    updateBtn(){
        return cy.get('button[type="submit"]').eq(0);
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
        this.updateBtn().click();
    }

    changePassword(oldpassword, newpassword){
        this.findByName("currentpassword").first().type(oldpassword).then(() => {
            oldpassword = newpassword;
        });
        this.findByName("newpassword").first().type(newpassword);
        this.findByName("repeatnewpassword").first().type(newpassword);
    }

    changeTheme(){
        cy.get(".vs-c-dropdown-underline > button").click();
        cy.get("ul.el-dropdown-menu > li")
            .should("have.length", 7)
            .then(($li) => {
                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                  }
                const items = $li.toArray();
                return items[getRandomInt(0,6)];
            })
            .click();
    }

}


export const account = new Account();