// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()
/// <reference types="cypress-wait-until" />



declare namespace Cypress {
    interface Chainable {

      //Commands from "commands-object-actions.ts"
      VerifyObjectExists(pageObject: string): Chainable<Element>;
      VerifyObjectWithTextExists(pageObject: string, text: string): Chainable<Element>;
      VerifyObjectWithTextDoesNotExists(pageObject: string, text: string): Chainable<Element>;
      VerifyObjectDoesNotExists(pageObject: string): Chainable<Element>;
      VerifyObjectIsVisible(pageObject: string): Chainable<Element>;
      VerifyObjectWithTextIsVisible(pageObject: string, text:string): Chainable<Element>;
      VerifyObjectIsNotVisible(pageObject: string): Chainable<Element>;
      VerifyObjectDoesNotHaveText(pageObject: string): Chainable<Element>;
      VerifyTextInObject(pageObject: string, text: string): Chainable<Element>;
      VerifyTheValueAttrOfAnObject(pageObject: string, val: string): Chainable<Element>;
      VerifyTextNotPresentInObject(pageObject: string, text: string): Chainable<Element>;
      ClickOnHiddenObject(pageObject: string): Chainable<Element>;
      ClickOnHiddenObjectWithText(pageObject: string, text: string): Chainable<Element>;
      TypeInObject(pageObject: string, text: string): Chainable<Element>;
      TypeInObjectWithoutClearing(pageObject: string, text: string): Chainable<Element>;
      ClearAndTypeInObject(pageObject: string, text: string): Chainable<Element>;
      TypeInObjectAndPressEnter(pageObject: string, text: string): Chainable<Element>;
      ClearAndTypeInObjectAndPressEnter(pageObject: string, text: string): Chainable<Element>;
      ClickOnObject(pageObject: string): Chainable<Element>;
      ClickOnLastObject(pageObject: string): Chainable<Element>;
      ClickOnNextObject(pageObject: string): Chainable<Element>;
      RightClickOnObject(pageObject: string): Chainable<Element>;
      CheckObject(pageObject: string): Chainable<Element>;
      UncheckObject(pageObject: string): Chainable<Element>;
      RightClickOnObjectWithText(pageObject: string, text: string): Chainable<Element>;
      ClickOnObjectWithText(pageObject: string, text: string): Chainable<Element>;
      ClearInputBox(pageObject: string): Chainable<Element>;
      WaitForObjectToDisappear(locator: string): Chainable<Element>;
      WaitForToastMessageToDisappear(locator: string): Chainable<Element>;
      WaitForObjectWithTextToDisappear(locator: string, text: string): Chainable<Element>;
      WaitForObjectWithTextAndClickOnItToDisappear(locator: string, text: string): Chainable<Element>;
      PickDropdownOption(pageObject: string, text: string): Chainable<Element>;
      AddDropdownOption(pageObject: string, text: string): Chainable<Element>;
      PickDropdownOptionWithoutInput(pageObject: string, text: string): Chainable<Element>;
      PickDropdownOptionWithCheckBox(pageObject: string, text: string): Chainable<Element>;
      ClickOnButtonInTableRow(searchString:string, objectString: string): Chainable<Element>;
      WaitForAnObjectWithTextToBecomeVisisble(object: string, text: string): Chainable<Element>;
      VerifyValueInTableExists(text: string): Chainable<Element>;
      VerifyValueInTableDoesNotExists(text: string): Chainable<Element>;
      VerifyObjectEnabled(pageObject: string): Chainable<Element>;
      VerifyObjectDisabled(pageObject: string): Chainable<Element>;
      VerifyTheValueAttrOfAnObject(pageObject: string, value:string): Chainable<Element>;
      TypeInLastObject(pageObject: string, text: string): Chainable<Element>;
      WaitForAnObjectToBecomeVisisble(pageObject: string): Chainable<Element>;
      waitForObjectToGetEnabled(pageObject: string): Chainable<Element>;
      verifyNumOfTimesElementWithTextIsOnTheScreen(object: string, text: string, numner: number): Chainable<Element>;
      verifyObjectIncludesText(object: string, text: string): Chainable<Element>;
      getIframeBody(iFrameLocator: string): Chainable<Element>;
      switchToTestMode():Chainable<Element>;
      waitForLoadProgressDissapear():Chainable<Element>;
    }
  }  
  
  declare module 'cypress-downloadfile/lib/addPlugin';
