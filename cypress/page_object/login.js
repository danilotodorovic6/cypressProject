/// <reference types="Cypress" />

import data from "../fixtures/data.json";
import updatedPassword from "../fixtures/updatedPassword.json"
let faker = require("faker");

class Login{

    validUser = {
        email: data.user.email,
        password: updatedPassword.updatedPassword
    }

    invalidUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        shortPassword: "1"
    }

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

