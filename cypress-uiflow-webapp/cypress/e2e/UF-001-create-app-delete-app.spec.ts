/// <reference types="Cypress" />

import { AppPage } from "../support/PageObjects/AppPage";
import { ConnectPage } from "../support/PageObjects/ConectPage";
import { LoginPage } from "../support/PageObjects/LoginPage";
import { MyAppsPage } from "../support/PageObjects/MyAppsPage";


  describe("Create new app and delete the app" + Date().toLocaleString(), () => {
    const loginpage = new LoginPage();
    const myAppspage = new MyAppsPage();
    const appPage = new AppPage();
    const connectPage = new ConnectPage();

  //   it("Create app and delete the app", ()=>{
  //     cy.intercept('GET', '/api/component-libraries**').as('componentCatalog');
  //     cy.intercept('GET', '/apps/**/studio/main/inspect/**').as('inspectFrame');
  //     cy.visit("/login");
  //     loginpage.login();

  //     cy.wait(5000);
  //     cy.visit('https://www.uiflow-stage.com/apps/new_app_xb19xtjf/studio/main?testmode');

  //   cy.wait('@componentCatalog');
  //   cy.wait('@inspectFrame');    
  //   cy.get('.app-container iframe').its('0.contentDocument.body').should('not.be.empty');

  //   // Drag and Drop Button
  //  // cy.get('[data-test-id=component-card-Button]').first().trigger('dragstart');
  //  // cy.iframe('[data-test-id="view-panel"] iframe[src]').find('[data-uiflow-component-id="e403dc3a-98f3-4679-87bc-0026098b5b8b"] div').trigger('drop');
  // //cy.get('[data-test-id=view-panel]').trigger('drop');

  //   // cy.iframe('[data-test-id="view-panel"] iframe[src]').find('button').trigger('dragstart');
  //   // cy.iframe('[data-test-id="view-panel"] iframe[src]').find('div.css-x7nnz2').trigger('drop');

  //   // Verify Button is Shown in Design Preview
  //   cy.get('.app-container iframe').then(($iframe) => {
  //     const $body = $iframe.contents().find('body');
  //    // cy.wrap($body).find('button').should('be.visible');
  //    cy.wrap($body).find('button').trigger('dragstart');
  //     cy.wrap($body).find('[data-uiflow-component-id="e403dc3a-98f3-4679-87bc-0026098b5b8b"] div').trigger('drop')
  //    // cy.wrap($body).find('button').trigger('dragstart',{force: true});
  //   //  cy.wrap($body).find('div.css-x7nnz2').trigger('drop');
  //     cy.wait(5000);
  //   });

  //     // cy.get('[data-test-id="component-card-Text"]').first().trigger('dragstart');
  //     // cy.get('h3.dragHandle [aria-label="Collection"]').trigger('drop');
  //     // cy.get('[data-test-id="component-card-Text"]').first().drag('h3.dragHandle [aria-label="Collection"]');
  //     // cy.wait(5000);
  //     // Click on the iframe element
  //   //   cy.frameLoaded('[data-test-id="view-panel"] iframe[src]');
  //   //   cy.iframe('[data-test-id="view-panel"] iframe[src]').find('div[data-uiflow-component-id="fe30560d-00ae-45d4-af8c-11ea24ba1ec6-placeholder"]').should('be.visible');
  //   //  cy.iframe('[data-test-id="view-panel"] iframe[src]').find('div[data-uiflow-component-id="1f3cc89b-f00d-4b64-b1c9-29c55777d3e7-placeholder"]').click({force: true});
  //   //   cy.iframe('[data-test-id="view-panel"] iframe[src]').find('div[data-uiflow-component-id="1f3cc89b-f00d-4b64-b1c9-29c55777d3e7-placeholder"]').click({force: true});
  //   //   cy.get('[data-test-id="component-card-Text"]').trigger('mousedown')
  //   //   .trigger('mousemove', {
  //   //       pageX: 300,
  //   //       pageY: 200,
  //   //       force: true
  //   //   })
  //   //   cy.wait(5000);
  //   //   cy.get('[data-test-id="component-card-Text"]')
  //   //   .trigger('mouseup');

  //   // cy.get('[data-test-id="component-card-Text"]').drag('[data-test-id="view-panel"] iframe[src]');
  //   //  cy.get('[data-test-id="component-card-Text"]').trigger('mousedown').trigger('dragstart', {clientX: 500, clientY: -200}).trigger('mouseup');
  //     //cy.get('[data-test-id="component-card-Text"]').move({deltaX: 500, deltaY: 200});
  // //     cy.get('[data-test-id="component-card-Text"]').trigger('mousedown')
  // //     for(var i=1;i<10;i++){
  // //       cy.get('[data-test-id="component-card-Text"]').trigger('mousemove', { clientX: i*200, clientY: i*300 })
  // //       cy.wait(2000);
  // //     }
  // //     cy.get('[data-test-id="component-card-Text"]').trigger('mousemove', { clientX: 200, clientY: 300 })
  // // .trigger('mouseup')
  //   })

    // it("Another sample code", ()=>{
    //   cy.visit("https://www.w3schools.com/html/html5_draganddrop.asp");
    //   cy.wait(3000);
    //   cy.get('#drag1').first().drag('div#div2');
    //   cy.wait(3000);
    //   // cy.pause();
    // })

    it("Create the app and delete the app", ()=>{
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

    it.only("Work on the Connection ", ()=>{
      cy.visit("/login");
      loginpage.login();

      cy.wait(5000);
      cy.visit('https://www.uiflow-stage.com/apps/new_app_xb19xtjf/studio/main?testmode');
      cy.wait(5000);

      appPage.clickOnConnectBtn();
      connectPage.clickOnAddNewDataConnectionBtn();
      connectPage.clickOnRestAPIAddConnectionBtn();

      // Add an action 
      connectPage.typeInConnectionNameTxtBx('Products');
      connectPage.typeInConnectionUrlTxtBx("https://fakestoreapi.com");
      connectPage.typeInActionNameTxtBx("Get First Product");
      connectPage.typeInActionPathTxtBx('/products/1');

      connectPage.verifyActionInExistingActions("Get First Product");

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
      connectPage.clickOnBackBtn();

      connectPage.clickOnPublishToLogicBtn();
      appPage.clickOnLogicBtn();
      cy.wait(5000);
      
      // cy.get('[data-test-id="component-card-Get First Product"]').first().trigger('dragstart');
      // cy.get('[data-test-id="flow-panel"]').trigger('drop', {clientX: 825, clientY: 420});

      // cy.get('div[aria-label="Home"] button').click();

      cy.get('[data-test-id="node-Home-onPageLoad"]').trigger('dragstart', {force: true})
     cy.get('[data-test-id="node-Get First Product-call"]').trigger('drop', {force: true});


     // cy.get('[data-test-id="component-Get First Product"]').move({deltaX: 825, deltaY: 400});
      // cy.get('[data-test-id="component-card-Get First Product"]').first().trigger('dragstart');
      // cy.get('[data-test-id="flow-panel"]').trigger('drop');
      // cy.get('[data-test-id="component-card-Get First Product"]').trigger('pointerdown',{deltaX: 1400, deltaY: -200}).trigger('mousedown', {deltaX: 1400, deltaY: -200}).trigger('dragstart', {deltaX: 1400, deltaY: -200})
      // cy.xpath("//p[text()='Get First Product']/parent::div").first().trigger('dragover', {deltaX: 1400, deltaY: -200})
      //[data-test-id="component-card-Get First Product"]
      // cy.get('div[aria-label="Home"]').trigger('mousedown').trigger('dragstart', {clientX: 500, clientY: -200})
      // cy.xpath("//p[text()='Home']/parent::div").trigger('mouseup');
      //connectPage.deleteTheConnection("Products");

      //connectPage.verifyResponseData('"id": 1');
      //connectPage.verifyResponseData('{  "id": 1,  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",  "price": 109.95,  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",  "category": "men'+'s clothing",  "image": "https://fakestoreapi.com/img/81fPKd-2AYL.AC_SL1500.jpg",  "rating": {    "rate": 3.9,    "count": 120  }}');
    })
    
  });