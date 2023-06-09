/// <reference types="Cypress" />
/// <reference types="../../support" />
/// <reference types="cypress-xpath" />
export class MyAppsPage {

  // Locators
  GeneralBtn: string = 'button span';
  NameTxtBx: string = "(//input[@placeholder='Name'])[2]";
  CreatAppBtn: string = "(//span[text()='Create App'])[2]";
  AppWithTxt: string = "//span[text()='All']//ancestor::div[3]/div[2]//span"
  SearchAppTxt: string = '[placeholder="Search apps"]'
  DeleteAppOption: string = '//button//span[text()="Delete App"]'
  DeleteAppPopUpBtn: string = '//button//span[text()="Delete App"]'
  DuplicateAppOption: string = '//button//span[text()="Duplicate App"]'
  DuplicateAppPopUpBtn: string = "//span[text()='Duplicate App']"

  // Actions
  selectBlankTemplate(){
    cy.ClickOnObjectWithText(this.GeneralBtn, "Blank Starter");
  }

  enterNameinNameTxtBx(name: string){
    cy.xpath(this.NameTxtBx).should('exist').clear().type(name);
  }

  clickOnCreateAppBtn(){
    cy.xpath(this.CreatAppBtn).contains("Create App").should('exist').click({force:true});
  }

  searchWithAppName(name: string){
    cy.TypeInObject(this.SearchAppTxt, name);
    cy.wait(2000);
  }

  verifyAppExistInApps(name: string){
    cy.xpath(this.AppWithTxt).contains(name).should('exist');
  }

  openTheExistingApp(name: string){
    cy.xpath("//span[text()='All']//ancestor::div[3]/div[2]//span[text()='"+name+"']").should('exist').click();
  }

  clickOnMenuBtn(name: string){
    cy.xpath("//span[text()='All']//ancestor::div[3]/div[2]//span[text()='"+name+"']/ancestor::button/following-sibling::div[1]/div").click();
  }

  clickOnDeleteAppOption(){
    cy.xpath(this.DeleteAppOption).first().should('exist').click();
  }

  clickOnDeleteAppPopUpBtn(){
    cy.xpath(this.DeleteAppPopUpBtn).should('exist').click();
  }

  delteTheApp(name: string){
    this.clickOnMenuBtn(name);
    this.clickOnDeleteAppOption();
    this.clickOnDeleteAppPopUpBtn();
  }

  verifyAppNotExistInApps(name: string){
    cy.xpath("//span[text()='All']//ancestor::div[3]/div[2]//span[text()='"+name+"']").should('not.exist');
  }

  createTheApp(appName: string){
    this.selectBlankTemplate();
    this.enterNameinNameTxtBx(appName);
    this.clickOnCreateAppBtn();
    cy.waitForLoadProgressDissapear();
  }

  clickOnDuplicateAppOption(){
    cy.xpath(this.DuplicateAppOption).first().should('exist').click();
  }

  duplicateTheApp(appName: string){
    this.clickOnMenuBtn(appName);
    this.clickOnDuplicateAppOption();
    cy.get('input[placeholder="Name"]').last().should('have.value', 'Duplicate '+appName);
    this.clickOnDuplicateAppPopUpBtn();
    cy.waitForLoadProgressDissapear();
  }

  clickOnDuplicateAppPopUpBtn(){
    cy.xpath(this.DuplicateAppPopUpBtn).should('exist').click();
  }

}