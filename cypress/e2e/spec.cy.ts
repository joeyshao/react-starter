/* globals cy */

/// <reference types="cypress" />
      
describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

});