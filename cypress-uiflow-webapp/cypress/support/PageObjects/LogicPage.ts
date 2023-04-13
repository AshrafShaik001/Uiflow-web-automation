/// <reference types="Cypress" />
/// <reference types="../../support" />
/// <reference types="cypress-xpath" />
export class LogicPage { 
  
  ReloadBtn: string = 'div[aria-label="Reload"]'
  DropPanel: string = '[data-test-id="flow-panel"]'
  ToolTipValue: string = 'div[role="tooltip"] .show-value'
  ToolTipJsonValue: string = 'div[role="tooltip"] .show-value .view-line'
  LogicBtn: string = 'button[data-test-id="Logic"]'
  FindComponentSearchBx: string = '[placeholder="Find a component..."]'
  publishBtn: string = '[data-test-id="publish-popup-button"]'
  DevelopmentOrMainCheckBox: string = '[data-test-id="publish-option-checkbox-publish-dev"]'
  PublishToSelecedEnvironmentsBtn: string = '[data-test-id="publish-button-publish-to"]'


  verifyCheckBoxIsCheckedInResponse(nameOfTheCheckBox: string, index: number = -1){
    var dataPath = "";
    if(index>=0){
      dataPath = index+"."+nameOfTheCheckBox
    }
    else{
      dataPath = nameOfTheCheckBox
    }
    cy.get('input[data-path="'+dataPath+'"]').should('be.checked');
  }

  clickOnResponseObjectOfComponent(componentName: string){
    this.clickOnLogicBtn();
    cy.get('[data-test-id="node-'+componentName+'-response-value"]').should('exist').click({force: true});
  }

  clickOnIdObjectOfComponent(componentName: string){
    this.clickOnLogicBtn();
    cy.get('[data-test-id="node-'+componentName+'-id-value"]').should('exist').click({force: true});
  }

  clickOnTitleObjectOfComponent(componentName: string){
    this.clickOnLogicBtn();
    cy.get('[data-test-id="node-'+componentName+'-title-value"]').should('exist').click({force: true});
  }

  connectTwoComponentsNodes(firstComponentName: string, firstNode: string, secondComponent: string, secondNode: string){
    const flowCanvasContainer = cy.get('.flow-panel-component .viewport-container');
    cy.get('[data-test-id="node-'+firstComponentName+'-'+firstNode+'"]').then((el) => {
      const pos = el.position();
      flowCanvasContainer.trigger('mousedown', {
        bubbles: true,
        clientX: pos.left,
        clientY: pos.top,
        force: true
      });
    });

    cy.get('[data-test-id="node-'+secondComponent+'-'+secondNode+'"]').then((el) => {
      const pos = el.position();
      flowCanvasContainer.trigger('mousemove', {
        bubbles: true,
        clientX: pos.left,
        clientY: pos.top,
        force: true
      });
      flowCanvasContainer.trigger('mouseup', {
        bubbles: true,
        clientX: pos.left,
        clientY: pos.top,
        force: true
      });
    });

    // verify the edge was created
    //cy.get('[data-test-id="edge-'+secondComponent+'-'+secondNode+'-'+firstComponentName+'-'+firstNode+'"]').should('exist');
    cy.xpath('//div[@data-test-id="edge-'+secondComponent+'-'+secondNode+'-'+firstComponentName+'-'+firstNode+'"] | //div[@data-test-id="edge-'+firstComponentName+'-'+firstNode+'-'+secondComponent+'-'+secondNode+'"]').should('exist');
    //div[@data-test-id="edge-Text-onClick-Alert-call"] | //div[@data-test-id="edge-ext-onClick-Alert-call"]
  }

  clickOnPreviewReload(){
    cy.ClickOnObject(this.ReloadBtn);
    cy.ClickOnObject(this.ReloadBtn);
    cy.VerifyObjectIsVisible('svg[stroke="currentColor"]');
    cy.WaitForObjectToDisappear('svg[stroke="currentColor"]');
  }

  dragTheComponent(componnentName: string){
    cy.get('[data-test-id="component-card-'+componnentName+'"]').first().trigger('dragstart');
    cy.get(this.DropPanel).trigger('drop');
  }

  addHomeLayer(){
    cy.get('div[aria-label="Home"] button').click();
  }

  verifyToolTipValue(value: string){
    cy.get(this.ToolTipValue).should('have.text', value);
  }

  verifyLineInToolTipValue(line: string){
    cy.get(this.ToolTipJsonValue).should('contain.text', line);
  }

  waitForSpinnerDisspear(){
    cy.WaitForObjectToDisappear('svg[stroke="currentColor"]');
  }

  clickOnLogicBtn(){
    cy.ClickOnObject(this.LogicBtn);
  }

  addTextBox(){
    cy.get('div[aria-label="Text"] button').click();
  }

  searchWith(componentName: string){
    cy.TypeInObject(this.FindComponentSearchBx, componentName);
  }

  addNewActionToComponent(actionName: string){
   // cy.get('[data-test-id="component-Text"]').click();
    cy.get('[data-test-id="sm-blocks"]').click();
    cy.get('[placeholder="Find an action..."]').type(actionName);
    cy.xpath("//span[text()='"+actionName+"']/ancestor::button").click();
    cy.xpath("//span[text()='Selected Element']/parent::div/button").click();
    cy.get('[data-test-id="node-Text-onClick"]').should('exist');
  }

  setValueOfComponent(componentName: string, value: string){
    cy.get('[data-test-id="component-'+componentName+'"]').click({force: true});
    cy.get('[data-test-id="sm-blocks"]').click();

    cy.get('[data-prop-path="val"] input').type(value).should('have.value', value);
    cy.xpath("//span[text()='Selected Element']/parent::div/button").click();
    cy.get('[data-test-id="node-'+componentName+'-val-value"]').click({force: true});
    this.verifyToolTipValue(value);
  }

  clickOnPublishBtn(){
    cy.ClickOnObject(this.publishBtn);
  }

  checkTheDevelopmentOrMainCheckBox(){
    cy.get(this.DevelopmentOrMainCheckBox).check({force: true});
    cy.get(this.DevelopmentOrMainCheckBox).should('be.checked');
  }

  clickOnPublishToSelecedEnvironmentsBtn(){
    cy.ClickOnObject(this.PublishToSelecedEnvironmentsBtn);
  }

  publishToDevopmentEnvironment(){
    this.clickOnPublishBtn();
    cy.get('div').contains('Not Published').should('exist');
    this.checkTheDevelopmentOrMainCheckBox();
    this.clickOnPublishToSelecedEnvironmentsBtn();
  }


}