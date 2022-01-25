// import { forEach,sortBy } from "cypress/types/lodash"
const _ = require('lodash');

export const getArrayRandomelement = (arr) => {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};

export const selectDropdownValue = (dropdownelement, text) => {
  cy.log(`${dropdownelement}:${text}`);
  cy.get(dropdownelement).select(text)
      .should('contain', text);
};




