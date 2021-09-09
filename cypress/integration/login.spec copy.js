// /// <reference types="Cypress" />

// import { login } from "../page_object/login.js";
// import { account } from "../page_object/account.js";
// let faker = require("faker");

// let accountData = {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName()
// }

// let changePassword = {
//     oldpassword: "11111111",
//     newpassword: "12345678"
// }

// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false
//   })

// describe("Login", () => {
//     beforeEach(() => {
//         cy.visit("/login");
//         login.loginClick(changePassword.oldpassword);
//         cy.url().should("contain", "my-organizations");
//     })
//     it("Account settings", () => {
//         account.changeAccountSettings(accountData.firstName, accountData.lastName, changePassword.oldpassword, changePassword.newpassword);
//     })

// })