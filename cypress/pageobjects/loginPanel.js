
const usernameTextField = 'input#username';
const contineButton = 'button.Buttonstyles__ButtonRoot-sc-1baq2ha-0';

export const loginPanel = {
    loginWithInvalidEmail(){
        cy.iframe('.visible').find(usernameTextField).type("invalidusername@example.com");
        cy.iframe('.visible').find(contineButton).should('be.visible');
        cy.iframe('.visible').find(contineButton).click(({ force: true }));
        
    }
};

