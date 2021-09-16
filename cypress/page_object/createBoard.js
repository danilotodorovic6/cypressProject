/// <reference types="Cypress" />

import { account } from "../page_object/account.js";

class Board{

    newBoard = {
        title: "New Board",
        boardID: ""
    }

    get boardsBtn(){
        return cy.get(".vs-c-my-organization__board");
    }
    
    get deleteBoardBtn(){
        return cy.get(".vs-c-btn--warning");
    }
    
    createBoard(){
        this.boardsBtn.last().click();
        account.findByName("name").type(this.newBoard.title);
        account.findByName("next_btn").click();
        account.findByName("type_scrum").click();
        account.findByName("next_btn").click();
        account.findByName("next_btn").click();
        account.findByName("next_btn").click();
    }
    deleteBoard(){
        account.findByHref(`/boards/${this.newBoard.boardID}/settings`).click();
        this.deleteBoardBtn.click();
        account.findByName("save-btn").click();
    }
}

export const board = new Board();