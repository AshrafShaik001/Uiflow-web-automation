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

describe("Create new app and delete the app" + Date().toLocaleString(), () => {
  const loginpage = new LoginPage();
  const myAppspage = new MyAppsPage();
  const appPage = new AppPage();

  it("UF001: Create the app and delete the app", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App" + new Date().getTime();
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
});