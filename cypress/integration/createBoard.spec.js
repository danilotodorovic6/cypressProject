/// <reference types="Cypress" />

import { board } from "../page_object/createBoard.js";
import updatedPassword from "../fixtures/updatedPassword.json"
import { login } from "../page_object/login.js";
import data from "../fixtures/data.json";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("New board flow", () => {
    before(() => {
        cy.visit("/login");
        if(updatedPassword.updatedPassword){
            return login.loginClick(data.user.email, updatedPassword.updatedPassword);
        }        
        cy.url().should("contain", "my-organizations");
    })
    it("Creating new board", () => {
        cy.intercept("POST", "/api/v2/boards").as("boardCreated");
        board.createBoard();
        cy.wait("@boardCreated").then((intercept) => {
            board.newBoard.boardID = intercept.response.body.id;
            expect(intercept.response.statusCode).to.eq(201);
            expect(intercept.response.body.name).to.eq(board.newBoard.title);           
        })
    })
    it("Delete new board", () => {
        board.deleteBoard();
    })
})