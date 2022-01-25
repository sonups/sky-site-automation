

const searchButton = 'button.search-toggle';
const signInLink = 'a.sign-in-link';
const searchTextField = 'input.main-input';

export const skyHomePage = {
    waitSignInToBeVisible(){
        cy.get(signInLink).should('be.visible');
    },
    clickSignIn(){
        cy.get(signInLink).click();
    },
    searchInSkySite(searchKey){
        cy.log("before")
        cy.get(searchButton).click();
        cy.get(searchTextField).should('be.visible');
        cy.get(searchTextField).type(searchKey);
        cy.log("after")
    }
};

