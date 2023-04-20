/// <reference types="Cypress" />

import {
  AppPage
} from "../support/PageObjects/AppPage";
import { DesignPage } from "../support/PageObjects/DesignPage";
import { LogicPage } from "../support/PageObjects/LogicPage";
import {
  LoginPage
} from "../support/PageObjects/LoginPage";
import {
  MyAppsPage
} from "../support/PageObjects/MyAppsPage";

describe("UF-003: Create new app and deploy the app" + Date().toLocaleString(), () => {
  const loginpage = new LoginPage();
  const myAppspage = new MyAppsPage();
  const appPage = new AppPage();
  const logicPage = new LogicPage();
  const designPage = new DesignPage();

  it("UF003: Part1: Publish to development environment", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "App"+new Date().getTime();

    // Create the app
    myAppspage.createTheApp(appName);
    appPage.verifyPublishBtn();

    cy.switchToTestMode();
    appPage.clickOnDesignBtn();
    designPage.waitForSpinnerDisspear();
    designPage.DragAndDropTextComponent();

    appPage.clickOnLogicBtn();
    logicPage.searchWith('Alert');
    logicPage.dragTheComponent('Alert');
    logicPage.addTextBox();

    logicPage.addNewActionToComponent('onClick');

    logicPage.connectTwoComponentsNodes('Text', 'onClick', 'Alert', 'call');
    logicPage.setValueOfComponent('Alert', 'Hello World');

    logicPage.publishToDevopmentEnvironment();
    logicPage.waitUntilItPublished();

    logicPage.clickOnPublishBtn();
    logicPage.getDevelopmentHostedUrl().then((url)=>{
      cy.writeFile("cypress/fixtures/devUrl.json", { url: 'https://'+url });
    })
  })

  it.skip('UF003: Part 2: Verify the published url', ()=>{
    cy.fixture("devUrl")
    .then((data) => {
      Cypress.config('baseUrl', null)
      expect(Cypress.config('baseUrl')).to.be.null
      cy.visit(data.url)
      cy.wait(5000);
      cy.on('window:alert',(t)=>{
        expect(t).to.contains('Hello World');
     })
    })
  })
});