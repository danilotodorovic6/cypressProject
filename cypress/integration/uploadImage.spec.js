// /// <reference types="Cypress" />

// import { login } from "../page_object/login.js";
// import { account } from "../page_object/account.js";
// import data from "../fixtures/data.json";


// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false
//   })

// describe("Uploading image to your profile", () => {
//     beforeEach(() => {
//         cy.visit("/login");
//         login.loginClick(data.user.email, data.user.password);
//         cy.url().should("contain", "my-organizations");
//     })
//     it("Upload image", () => {
//         const img = "slika.jpg"
//         account.changeAccountSettings();  
//         cy.get('[class="vs-u-img--round"]').click();
//         cy.get(".el-upload-dragger").attachFile(img);
//     })
    
// })