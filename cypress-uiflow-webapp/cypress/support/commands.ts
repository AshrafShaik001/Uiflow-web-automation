/// <reference types="Cypress" />
/// <reference types="../support" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe';
import '@4tw/cypress-drag-drop'
Cypress.Commands.add('getIframeBody', (iFrameLocator: string): any => {
  return cy.get(iFrameLocator)
  .its('0.contentDocument.body').should('not.be.empty')
  .then(cy.wrap)
})

Cypress.Commands.add('switchToTestMode', () =>{
  cy.url().then((url)=>{
    cy.visit(url+'?testmode');
  })
})

Cypress.Commands.add('waitForLoadProgressDissapear', () =>{
  cy.WaitForObjectToDisappear('#studio-load-progress');
})

