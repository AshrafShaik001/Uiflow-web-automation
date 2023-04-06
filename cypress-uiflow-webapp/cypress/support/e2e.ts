// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()
/// <reference types="cypress-wait-until" />
/// <reference types="cypress-xpath" />

// Import commands.js using ES2015 syntax:
import './commands'
import './commands-object-actions'
import '@4tw/cypress-drag-drop'

require('cypress-xpath');
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  cy.log(err.message)
  return false
});