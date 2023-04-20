/// <reference types="Cypress" />

import {
  AppPage
} from "../support/PageObjects/AppPage";
import {
  ConnectPage
} from "../support/PageObjects/ConectPage";
import {
  DesignPage
} from "../support/PageObjects/DesignPage";
import {
  LogicPage
} from "../support/PageObjects/LogicPage";
import {
  LoginPage
} from "../support/PageObjects/LoginPage";
import {
  MyAppsPage
} from "../support/PageObjects/MyAppsPage";

describe("UF002: Create and validate a collection." + Date().toLocaleString(), () => {
  const loginpage = new LoginPage();
  const myAppspage = new MyAppsPage();
  const appPage = new AppPage();
  const connectPage = new ConnectPage();
  const logicPage = new LogicPage();
  const designPage = new DesignPage();

  it("UF002: Create and validate a collection.", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App" + new Date().getTime();
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
    connectPage.selectTheCheckBox('id');
    connectPage.selectTheCheckBox('title');

    // Add another action
    cy.wait(4000);
    connectPage.clickOnAddNewActionBtn();
    connectPage.typeInActionNameTxtBx("Get All Product");
    connectPage.typeInActionPathTxtBx('/products');

    connectPage.verifyActionInExistingActions("Get All Product");

    connectPage.clickOnSendBtn();
    connectPage.selectTheCheckBox('id', 0);
    connectPage.selectTheCheckBox('id', 1);

    cy.wait(2000);
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

});