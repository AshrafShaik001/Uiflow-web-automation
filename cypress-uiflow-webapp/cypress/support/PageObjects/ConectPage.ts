/// <reference types="Cypress" />
/// <reference types="../../support" />
/// <reference types="cypress-xpath" />
export class ConnectPage {
  // Locators
  AddNewDataConnectionBtn: string = '[data-test-id="add-new-connection-button"]'
  RestAPIAddConnectionBtn: string = "//h5[text()='REST API']//parent::div/following-sibling::button"
  ConnectionNameTxtBx: string = "//label[text()='Connection Name']/following-sibling::input"
  ConnectionUrlTxtBx: string = "//label[text()='URL']/parent::div/parent::div//input"
  ActionNameTxtBx: string = "//label[text()='Action Name']/following-sibling::input"
  ActionMethodDropDown: string = '[data-prop-path="method"] select'
  ActionPathTxtBx: string = '//div[@data-prop-path="path"]//input[@placeholder]'
  ExistingActions: string = "//h5[text()='Existing Actions']/following-sibling::div/button//div[text()='actionName']"
  ActionResponseData: string = 'div.view-line'
  SendBtn: string = 'button[data-test-id="send-connection-button"]'
  AddNewActionBtn: string = "//h5[text()='Add Action']/following-sibling::div/button//div[text()='request']"
  BackBtn: string = "//h5[text()='Configuration']/preceding-sibling::button"
  MenuBtnOfConnectCard: string = '[data-test-id="connect-card-Name"] button'
  GeneralBtn: string = 'button span'
  PublishToLogicBtn: string = 'button[data-test-id="publish-connection-button"]'

  // Actions
  clickOnAddNewDataConnectionBtn(){
    cy.ClickOnObject(this.AddNewDataConnectionBtn);
  }

  clickOnRestAPIAddConnectionBtn(){
    cy.xpath(this.RestAPIAddConnectionBtn).click();
  }

  typeInConnectionNameTxtBx(name: string){
    cy.xpath(this.ConnectionNameTxtBx).clear().type(name).should('have.value', name);
  }

  typeInConnectionUrlTxtBx(url: string){
    cy.xpath(this.ConnectionUrlTxtBx).type('h').clear().type(url).should('have.value', url);
  }

  typeInActionNameTxtBx(name: string){
    cy.xpath(this.ActionNameTxtBx).clear().type(name).should('have.value', name);
  }

  typeInActionPathTxtBx(path: string){
    cy.xpath(this.ActionPathTxtBx).clear().type(path).should('have.value', path);
  }

  verifyActionInExistingActions(actionName: string){
    cy.xpath(this.ExistingActions.replace('actionName', actionName)).should('exist');
  }

  verifyResponseData(data: string){
    cy.get(this.ActionResponseData).should('contain.text', data);
  }

  clickOnSendBtn(){
    cy.get('svg[stroke="currentColor"]').should('not.exist');
    cy.get('div').contains('Loading...').should('not.exist');
    cy.wait(1000);
    cy.get(this.SendBtn).click();
  }

  selectTheCheckBox(nameOfTheCheckBox: string, index: number = -1){
    var dataPath = "";
    if(index>=0){
      dataPath = index+"."+nameOfTheCheckBox
    }
    else{
      dataPath = nameOfTheCheckBox
    }
    cy.get('input[data-path="'+dataPath+'"]').should('exist').check({force: true});
    cy.get('input[data-path="'+dataPath+'"]').should('be.checked')
  }

  clickOnAddNewActionBtn(){
    cy.xpath(this.AddNewActionBtn).click();
  }

  clickOnBackBtn(){
    cy.xpath(this.BackBtn).click();
  }

  clickOnMenuBtnOfConnectCard(name: string){
    cy.get(this.MenuBtnOfConnectCard.replace('Name', name)).click();
  }

  clickOnDeleteBtn(){
    cy.ClickOnObjectWithText(this.GeneralBtn, 'Delete');
  }

  clickOnConfirmBtn(){
    cy.get('div[role="dialog"] button').contains('Confirm').click();
  }

  deleteTheConnection(name: string){
    this.clickOnMenuBtnOfConnectCard(name);
    this.clickOnDeleteBtn();
    this.clickOnConfirmBtn();

    cy.get(this.MenuBtnOfConnectCard.replace('name', name)).should('not.exist');
  }

  clickOnPublishToLogicBtn(){
    cy.get(this.PublishToLogicBtn).click();
    //cy.ClickOnObject(this.PublishToLogicBtn);
  }

  waitForSpinnerDisspear(){
    cy.WaitForObjectToDisappear('svg[stroke="currentColor"]');
  }

}