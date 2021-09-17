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

    get addNewBoard(){
        return cy.get(".vs-c-organization-boards__item--add-new")
    }

    get existingBoard(){
        return cy.get(".vs-c-organization-boards__item");
    }

    createBoard(){
        account.findByHref("/organizations/820/boards").click();
        account.findByName("close-new-board-modal-btn").click();
        this.addNewBoard.click();
        account.findByName("name").type(this.newBoard.title);
        for(let i = 0; i < 4; i++){
            if(i === 1){
                account.findByName("type_scrum").click();
            }
            account.findByName("next_btn").click();
        }
    }
    deleteBoard(){
        account.findByHref(`/boards/${this.newBoard.boardID}/settings`).click();
        this.deleteBoardBtn.click();
        account.findByName("save-btn").click();
        account.findByName("close-new-board-modal-btn").click();
    }
}

export const board = new Board();