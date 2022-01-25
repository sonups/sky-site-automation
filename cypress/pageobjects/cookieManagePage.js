import 'cypress-iframe';
const acceptButton = "button[title='Agree']";

    export const cookieManage = {
        acceptCookies(item){
           // cy.iframe('#sp_message_iframe_474555').find(acceptButton).click({ force: true });
            cy.get('body').then((body) => {
                if (body.find('#sp_message_iframe_474555').length > 0) {
                    cy.iframe('#sp_message_iframe_474555').find(acceptButton).click({ force: true });
                }
            })
        }
    };

