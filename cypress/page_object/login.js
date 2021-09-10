/// <reference types="Cypress" />

class Login{

    findByType(type) {
        return cy.get(`[type=${type}]`)
    }
    loginClick(email, password){ 
        this.findByType('email').type(email);
        this.findByType('password').type(password);
        this.findByType('submit').click();
    }
}

export const login = new Login();

