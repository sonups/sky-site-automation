
const editorialText = 'div.section-editorial-text';

export const editorialPanel = {
    verifyEditorialText(){
        cy.get(editorialText).then((theElement) => {
            cy.get(theElement).should('contain.text',"Sky offers Unlock the UK’s widest range of Ultra HD entertainment with Sky Q and multiscreen. Take a look at our best broadband deals and discover our range of Mobile phones and data plans.") 
        })
        
    }
};

