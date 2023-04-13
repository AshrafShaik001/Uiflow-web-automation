/// <reference types="Cypress" />
/// <reference types="../../support" />
/// <reference types="cypress-xpath" />
export class DesignPage { 

  TextComponent: string = '[data-test-id="component-card-Text"]'
  DropArea: string = '[data-test-id="view-panel"]'

  waitForSpinnerDisspear(){
    cy.WaitForObjectToDisappear('svg[stroke="currentColor"]');
  }
  
  DragAndDropTextComponent(){
    cy.get(this.TextComponent).first().trigger('dragstart');
    cy.get(this.DropArea).trigger('drop');
  }

}