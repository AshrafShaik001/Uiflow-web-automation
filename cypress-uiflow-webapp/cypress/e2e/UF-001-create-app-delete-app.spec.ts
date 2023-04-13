/// <reference types="Cypress" />

import {
  AppPage
} from "../support/PageObjects/AppPage";
import {
  ConnectPage
} from "../support/PageObjects/ConectPage";
import { DesignPage } from "../support/PageObjects/DesignPage";
import { LogicPage } from "../support/PageObjects/LogicPage";
import {
  LoginPage
} from "../support/PageObjects/LoginPage";
import {
  MyAppsPage
} from "../support/PageObjects/MyAppsPage";

describe("Create new app and delete the app" + Date().toLocaleString(), () => {
  const loginpage = new LoginPage();
  const myAppspage = new MyAppsPage();
  const appPage = new AppPage();
  const connectPage = new ConnectPage();
  const logicPage = new LogicPage();
  const designPage = new DesignPage();

  it("UF001: Create the app and delete the app", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App123";
    // Create the app
    myAppspage.selectBlankTemplate();
    myAppspage.enterNameinNameTxtBx(appName);
    myAppspage.clickOnCreateAppBtn();

    // Verif the app
    appPage.verifyTitleOfTheApp(appName);
    appPage.verifyPublishBtn();

    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName(appName);

    myAppspage.openTheExistingApp(appName);
    appPage.verifyTitleOfTheApp(appName);

    // Delete the app
    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName(appName);

    myAppspage.delteTheApp(appName);

    // Verify the app
    cy.reload();
    myAppspage.searchWithAppName(appName);
    myAppspage.verifyAppNotExistInApps(appName);
  })

  it("UF002: Create and validate a collection.", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App"+new Date().getTime();
    var firstComponentName: string = "Get First Product";

    // Create the app
    myAppspage.createTheApp(appName);
    appPage.verifyPublishBtn();

    // Create Rest API Connection
    cy.switchToTestMode();
    appPage.clickOnConnectBtn();
    connectPage.clickOnAddNewDataConnectionBtn();
    connectPage.clickOnRestAPIAddConnectionBtn();

    // Add an action 
    connectPage.typeInConnectionNameTxtBx('Products');
    connectPage.typeInConnectionUrlTxtBx("https://fakestoreapi.com");
    connectPage.typeInActionNameTxtBx(firstComponentName);
    connectPage.typeInActionPathTxtBx('/products/1');

    connectPage.verifyActionInExistingActions(firstComponentName);

    connectPage.clickOnSendBtn();
    cy.wait(2000);
    // connectPage.waitForSpinnerDisspear();
    connectPage.clickOnSendBtn();
    cy.wait(2000);
    connectPage.selectTheCheckBox('id');
    connectPage.selectTheCheckBox('title');

    // Add another action
    connectPage.clickOnAddNewActionBtn();
    connectPage.typeInActionNameTxtBx("Get All Product");
    connectPage.typeInActionPathTxtBx('/products');

    connectPage.verifyActionInExistingActions("Get All Product");

    connectPage.clickOnSendBtn();
    cy.wait(2000);

    connectPage.selectTheCheckBox('id', 0);
    connectPage.selectTheCheckBox('id', 1);

    connectPage.clickOnPublishToLogicBtn();

    // Connect components in logic screen 
    logicPage.dragTheComponent(firstComponentName);
    logicPage.addHomeLayer();

    logicPage.connectTwoComponentsNodes(firstComponentName, 'call', 'Home', 'onPageLoad');

    logicPage.clickOnPreviewReload();

    logicPage.clickOnIdObjectOfComponent(firstComponentName);
    logicPage.verifyToolTipValue('1');
    logicPage.clickOnTitleObjectOfComponent(firstComponentName);
    logicPage.verifyToolTipValue('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    logicPage.clickOnResponseObjectOfComponent(firstComponentName);
    logicPage.verifyLineInToolTipValue('"id": 1,');
    //logicPage.verifyLineInToolTipValue('"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",');
    // logicPage.verifyCheckBoxIsCheckedInResponse('id');
    // logicPage.verifyCheckBoxIsCheckedInResponse('title');
    
    // Delete the app
    cy.reload();
    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName(appName);

    myAppspage.delteTheApp(appName);
  })

  it("UF003: Publish to development environment", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App"+new Date().getTime();

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
  })
});