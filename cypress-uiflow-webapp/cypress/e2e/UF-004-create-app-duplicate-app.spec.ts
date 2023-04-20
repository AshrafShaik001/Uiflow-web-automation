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

describe("UF-004: Create new app and duplicate the app" + Date().toLocaleString(), () => {
  const loginpage = new LoginPage();
  const myAppspage = new MyAppsPage();
  const appPage = new AppPage();

  it("UF004: Duplicate the app", () => {
    cy.visit("/login");
    loginpage.login();

    var appName: string = "New App" + new Date().getTime();

    // Create the app
    myAppspage.createTheApp(appName);
    appPage.verifyPublishBtn();

    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName(appName);

    // Duplicate the app
    myAppspage.duplicateTheApp(appName);
    appPage.verifyPublishBtn();
    appPage.verifyTitleOfTheApp('Duplicate '+appName);

    // Verif the duplicate app
    appPage.verifyTitleOfTheApp('Duplicate '+appName);
    appPage.verifyPublishBtn();

    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName('Duplicate '+appName);

    myAppspage.openTheExistingApp('Duplicate '+appName);
    appPage.verifyTitleOfTheApp('Duplicate '+appName);

    // Delete the app
    appPage.navigateToMyWorkSpace();
    myAppspage.searchWithAppName('Duplicate '+appName);

    myAppspage.delteTheApp('Duplicate '+appName);
    cy.reload();
    myAppspage.searchWithAppName(appName);
    myAppspage.delteTheApp(appName);
  })

});