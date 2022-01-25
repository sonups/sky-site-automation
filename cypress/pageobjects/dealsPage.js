
const ultimateTVDeal = 'div#deal-ultimate-tv';
const skyTVAndSkySportsDeal = 'div#deal-sky-tv-and-sky-sports';
const SkyTVNetflixAndCinemaDeal = 'div#deal-sky-tv-netflix-and-cinema';

export const dealsPage = {
    verifyUltimateTVDeal(text){
        cy.get(ultimateTVDeal).then((theElement) => {
            cy.get(theElement).should('contain.text',text) 
        })
    },
    verifyskyTVAndSkySportsDeal(text){
        cy.get(skyTVAndSkySportsDeal).then((theElement) => {
            cy.get(theElement).should('contain.text',text) 
        })
    },
    verifySkyTVNetflixAndCinemaDeal(text){
        cy.get(SkyTVNetflixAndCinemaDeal).then((theElement) => {
            cy.get(theElement).should('contain.text',text) 
        })
    }
};

