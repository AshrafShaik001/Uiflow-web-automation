/// <reference types="Cypress" />
/// <reference types="../../support" />
/// <reference types="cypress-xpath" />
export class AppPage {

  // Locators
  PublishBtn: string = '[data-test-id="publish-popup-button"]';
  LogoBtn: string = '#app header div.logo';
  MyWorkSpaceBtn: string = "//button//span[text()='My Workspace']";
  ConnectBtn: string = "button[data-test-id='Connect']"
  LogicBtn: string = 'button[data-test-id="Logic"]'
  DesignBtn: string = 'button[data-test-id="Design"]'

  // Actions
  verifyTitleOfTheApp(name: string){
    cy.get("#app header div[aria-label='"+name+"']").should('exist');
  }

  verifyPublishBtn(){
    cy.get(this.PublishBtn).should('exist');
  }

  clickOnLogo(){
    cy.ClickOnObject(this.LogoBtn);
  }

  clickOnMyWorkSpaceBtn(){
    cy.xpath(this.MyWorkSpaceBtn).should('exist').click();
  }

  navigateToMyWorkSpace(){
    this.clickOnLogo();
    this.clickOnMyWorkSpaceBtn();
  }

  clickOnConnectBtn(){
    cy.ClickOnObject(this.ConnectBtn);
  }

  clickOnLogicBtn(){
    cy.ClickOnObject(this.LogicBtn);
  }

  clickOnDesignBtn(){
    cy.ClickOnObject(this.DesignBtn);
  }

}