
// capture snapshot
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { skyHomePage } from '../../pageobjects/skyHomePage'
import { cookieManage } from '../../pageobjects/cookieManagePage'
import { loginPanel } from '../../pageobjects/loginPanel'
import { editorialPanel } from '../../pageobjects/editorialPanel'
import { dealsPage } from '../../pageobjects/dealsPage'


Given('I am on the home page', () => {
  // Cypress.Cookies.debug(true);
  cy.clearCookies()
  cy.visit("https://www.sky.com")
  cookieManage.acceptCookies();
  cy.title().should('eq','Sky Glass - The New 4k TV From Sky | Sky Broadband, TV & Mobile | Sky.com');
})

When('I navigate to {string}', (subUrl) => {
  cy.visit("https://www.sky.com"+subUrl);
  cy.title().should('eq','Latest Sky TV deals for new customers | Sky.com');
  cookieManage.acceptCookies();
})

Then('the user should be on the {string} page', (url) => {
  cy.url().should('eq',url);
})

When('I try to sign in with invalid credentials', () => {
  cookieManage.acceptCookies();
  skyHomePage.waitSignInToBeVisible();
  skyHomePage.clickSignIn();
  cy.title().should('eq','Sign in to your Sky account');
  loginPanel.loginWithInvalidEmail();
  
})

Given('I am on the {string} page', (url) => {
  // Cypress.Cookies.debug(true);
  cy.clearCookies()
  cy.visit(url);
  cookieManage.acceptCookies();
  cy.title().should('eq','Latest Sky TV deals for new customers | Sky.com');
})

Given('I see a list of deals with a price to it', (dataTable) => {
  // Cypress.Cookies.debug(true);
  cookieManage.acceptCookies();
  cy.title().should('eq','Latest Sky TV deals for new customers | Sky.com');

  
  dataTable.hashes().forEach(elem => {
    cy.log("Adding "+elem.Bundle+"::Price"+elem.Text);
    if(elem.Bundle === 'Ultimate TV')
      dealsPage.verifyUltimateTVDeal(elem.Text);
     else if(elem.Bundle === 'Sky TV & Sky Sports')
      dealsPage.verifyskyTVAndSkySportsDeal(elem.Text);
     else if(elem.Bundle === 'Sky TV, Netflix & Cinema')
      dealsPage.verifySkyTVNetflixAndCinemaDeal(elem.Text);
    // cy.get('.inventory_item_name').contains(elem.ProductName).parent().parent().next().find('.btn_primary').click();
    });
})

Given('I search {string} in the search bar', (searchText) => {
  // Cypress.Cookies.debug(true);
  cookieManage.acceptCookies();
  cy.log(searchText); 
  skyHomePage.searchInSkySite(searchText);

})

Given('I should see an editorial section', (searchText) => {
  cy.log(searchText); 
  editorialPanel.verifyEditorialText();
})
