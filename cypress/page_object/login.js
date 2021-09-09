/// <reference types="Cypress" />

import data from "../fixtures/data.json";

class Login{
       
    loginInput(){
        return cy.get("[type='email']");
    }
    passwordInput(){
        return cy.get("[type='password']");
    }
    loginBtn(){
        return cy.get("[type='submit']");
    }
    loginClick(){ 
        this.loginInput().type(data.user.email);
        this.passwordInput().type(data.user.password);
        this.loginBtn().click();
    }
}

export const login = new Login();

