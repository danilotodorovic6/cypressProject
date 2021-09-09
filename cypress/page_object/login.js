/// <reference types="Cypress" />

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
    loginClick(email, password){ 
        this.loginInput().type(email);
        this.passwordInput().type(password);
        this.loginBtn().click();
    }
}

export const login = new Login();

