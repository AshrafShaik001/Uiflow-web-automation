/// <reference types="Cypress" />
/// <reference types="../support" />

//Verify if an object with locator "pageObject" exists on the page.
Cypress.Commands.add("VerifyObjectExists", (pageObject: string): any => {
  cy.log("Verifying object [" + pageObject + "] exists.");
  return  cy.get("body").find(pageObject).should("exist");
});

//Verify if an object with locator "pageObject" is enabled on the page.
Cypress.Commands.add("VerifyObjectEnabled", (pageObject: string): any => {
  cy.log("Verifying object [" + pageObject + "] is enabled.");
  return  cy.get("body").find(pageObject).should("be.enabled");
});

//Verify if an object with locator "pageObject" is disabled on the page.
Cypress.Commands.add("VerifyObjectDisabled", (pageObject: string): any => {
  cy.log("Verifying object [" + pageObject + "] is disabled.");
  return  cy.get("body").find(pageObject).should("be.disabled");
});

//Verify if an object with locator "pageObject" does not contain text.
Cypress.Commands.add("VerifyObjectDoesNotHaveText", (pageObject: string): any => {
  cy.log("Verifying object [" + pageObject + "] does not have value.");
  return cy.get(pageObject).should("not.have.text");
});

//Verify if an object that contains string "txt" with locator "pageObject" exists on the page.
Cypress.Commands.add("VerifyObjectWithTextExists", (pageObject: string, text: string): any => {
    cy.log("Verifying object [" + pageObject + "] with text [" + text + "] exists.");
    return cy.contains(pageObject, text).should("exist");
  }
);

//Verify if an object with locator "pageObject" does not exists on the page.
Cypress.Commands.add("VerifyObjectWithTextDoesNotExists", (pageObject: string, text: string): any => {
    cy.log("Verifying object [" + pageObject + "] with text " + text + " does not exists." );
    return cy.get(pageObject).contains(text).should("not.exist");
  }
);

//Verify if an object in the table exists.
Cypress.Commands.add("VerifyValueInTableExists", (text: string): any => {
  cy.log("Verifying object with text [" + text + "] exists.");
  //return cy.get(pageObject).contains(text).should("exist");
  return cy.contains('td', text).should('exist')
}
);

//Verify if an object with text does not exists in table.
Cypress.Commands.add("VerifyValueInTableDoesNotExists", (text: string): any => {
  cy.log("Verifying object with text " + text + " does not exists." );
  //return cy.get(pageObject).contains(text).should("not.exist");
  return cy.get('table').contains('tr td', text).should('not.exist')
}
);

//Verify if an object that contains string "text" with locator "pageObject" does not exists on the page.
Cypress.Commands.add("VerifyObjectDoesNotExists", (pageObject: string): any => {
  cy.log("Verifying object [" + pageObject + "] does not exists.");
  return cy.get(pageObject).should("not.exist");
});

//Verify an Object with locator "pageObject" is visible
Cypress.Commands.add("VerifyObjectIsVisible", (pageObject: string): any => {
  cy.log("Verifying object: [" + pageObject + "] is visible. ");
  return cy.get(pageObject).should("be.visible");
});

Cypress.Commands.add("VerifyObjectWithTextIsVisible", (pageObject: string, text:string): any => {
  cy.log("Verifying object: [" + pageObject + "] is visible. ");
  return cy.get(pageObject).contains(text).should("be.visible");
});

//Verify an Object with locator "pageObject" is not visible
Cypress.Commands.add("VerifyObjectIsNotVisible", (pageObject: string): any => {
  cy.log("Verifying object is not visible. ");
  return cy.get(pageObject).should("not.be.visible");
});

//Verify a given Object with locator "pageObject" contains certains string "text"
Cypress.Commands.add(
  "VerifyTextInObject",
  (pageObject: string, text: string): any => {
    cy.log("Verifying the text '" + text + "' in object [" + pageObject + "].");
    return cy.get(pageObject).contains(text).should("exist");
  }
);

//Verify the value attribute's valueof a "pageObject"
Cypress.Commands.add(
  "VerifyTheValueAttrOfAnObject",
  (pageObject: string, val: string): any => {
    cy.log("Verifying the value attribute is: '" + val + "' in object [" + pageObject + "].");
    return cy.get(pageObject).invoke('attr', 'value').should('eq', val)
  }
);


Cypress.Commands.add(
  "VerifyTextNotPresentInObject",
  (pageObject: string, text: string): any => {
    cy.log("Verifying the text '" + text + "' should not present in object [" + pageObject + "].");
    return cy.get(pageObject).contains(text).should("not.exist");
  }
);

Cypress.Commands.add("VerifyTheValueAttrOfAnObject",(pageObject: string, value:string): any => {
  cy.log("Verify the value attribute's value of object " + pageObject + "is = [" + value + "]." )
  return cy.get(pageObject).should('have.value', value)
});


Cypress.Commands.add("TypeInLastObject", (pageObject: string, text: string): any => {
  cy.log("Type '" + text + "'");
  return cy.get(pageObject).last().should("exist").last().clear({force: true}).last().type(text, {force: true});
});

//Type string "text" in and object with locator "pageObject"
Cypress.Commands.add("TypeInObject", (pageObject: string, text: string): any => {
  cy.log("Type '" + text + "'");
  return cy.get(pageObject).should("exist").first().clear({force: true}).first().type(text, {force: true}).should('have.value', text);
});

Cypress.Commands.add("TypeInObjectWithoutClearing", (pageObject: string, text: string): any => {
  cy.log("Type '" + text + "'");
  return cy.get(pageObject).should("exist").first().type(text, {force: true});
});

//Clear existing text in object and type new string "text" in the object with locator "pageObject"
Cypress.Commands.add("ClearAndTypeInObject", (pageObject: string, text: string): any => {
    cy.log("Type '" + text + "'");
    return cy.get(pageObject).should("exist").clear({force: true}).type(text);
  }
);

//Type string "text" in and object with locator "pageObject" and press ENTER
Cypress.Commands.add("TypeInObjectAndPressEnter",(pageObject: string, text: string): any => {
    cy.log("Type '" + text + "'");
    return cy.get(pageObject).should("exist").clear({force: true}).type(text).type("{enter}");
  }
);

//Clear existing text in object and type string "text" in and object with locator "pageObject" and press ENTER
Cypress.Commands.add("ClearAndTypeInObjectAndPressEnter",
  (pageObject: string, text: string): any => {
    cy.log("Type '" + text + "'");
    return cy.get(pageObject).should("exist").clear({force: true}).type(text).type("{enter}");
  }
);

//Click on Object with locator "pageObject"
Cypress.Commands.add("ClickOnObject", (pageObject: string): any => {
  cy.log("Clicking on object [" + pageObject + "].");
  return cy.get(pageObject).first().should("exist").click({ force: true,  multiple: true });
});

Cypress.Commands.add("ClickOnLastObject", (pageObject: string): any => {
  cy.log("Clicking on object [" + pageObject + "].");
  return cy.get(pageObject).last().should("exist").click({ force: true,  multiple: true });
});

Cypress.Commands.add("ClickOnNextObject", (pageObject: string): any => {
  cy.log("Clicking on object [" + pageObject + "].");
  return cy.get(pageObject).should("exist").next().click({ force: true,  multiple: true });
});

//Click on Object with locator "pageObject" and text "text"
Cypress.Commands.add("ClickOnObjectWithText",
  (pageObject: string, text: string): any => {
    cy.log("Clicking on object [" + pageObject + "] with text [" + text + "].");
    cy.wait(500);
    cy.get(pageObject).contains(text).should("exist");
    return cy.get(pageObject).contains(text).should("exist").click({ force: true,  multiple: true });
  }
);

//Click on a hidden Object with locator "pageObject"
Cypress.Commands.add("ClickOnHiddenObject", (pageObject: string): any => {
  cy.log("Clicking on object [" + pageObject + "].");
  return cy.get(pageObject).should("exist").click({ force: true,  multiple: true });
});

//Click on a hidden Object with locator "pageObject" and text
Cypress.Commands.add("ClickOnHiddenObjectWithText", (pageObject: string, text: string): any => {
  cy.log("Clicking on object [" + pageObject + "] with text [" + text + "].");
  return cy.get(pageObject).contains(text).should("exist").click({ force: true,  multiple: true });
});

//Right Click on Object with locator "pageObject"
Cypress.Commands.add("RightClickOnObject", (pageObject: string): any => {
  cy.log("Clicking on object [" + pageObject + "].");
  return cy.get(pageObject).first().should("exist").rightclick({ force: true});
});

//Check the checkbox with locator "pageObject"
Cypress.Commands.add("CheckObject", (pageObject: string): any => {
  cy.log("Checking the object [" + pageObject + "].");
  return cy.get(pageObject).should("exist").check({ force: true});
});

//Uncheck the checkbox with locator "pageObject"
Cypress.Commands.add("UncheckObject", (pageObject: string): any => {
  cy.log("Unchecking the object [" + pageObject + "].");
  return cy.get(pageObject).should("exist").uncheck();
});

//Right Click on Object with locator "pageObject" that contains Text
Cypress.Commands.add(
  "RightClickOnObjectWithText",
  (pageObject: string, text: string): any => {
    cy.log("Right click on object [" + pageObject + "].");
    return cy.get(pageObject).contains(text).first().should("exist").rightclick();
  }
);

//Clear input box
Cypress.Commands.add("ClearInputBox", (pageObject: string): any => {
  cy.log("Clear the input box content.");
  return cy.get(pageObject).should("exist").clear({force: true});
});

//Wait for an object to show and then disappear. This is being used for the progress messages. 
Cypress.Commands.add('WaitForToastMessageToDisappear', (pageObject: string): any => {
  cy.log('Wait for the object [' + pageObject + '] to show up.')
  cy.get(pageObject).should('exist')
  cy.log('Wait for the object [' + pageObject + '] to close.')
  cy.get(pageObject).click();
  cy.wait(2000)
})

//Wait for an object to show and then disappear. This is being used for the progress messages. 
Cypress.Commands.add('WaitForObjectToDisappear', (pageObject: string): any => {
  cy.log('Wait for the object [' + pageObject + '] to show up.')
  cy.get(pageObject).should('exist')
  cy.log('Wait for the object [' + pageObject + '] to close.')
  cy.get(pageObject).should('not.exist');
  cy.wait(2000)
})

//Wait for an object to show and then click on it to disappear. This is being used for the progress messages. 
Cypress.Commands.add('WaitForObjectWithTextAndClickOnItToDisappear', (pageObject: string, text: string): any => {
  cy.log('Wait for the object [' + pageObject + 'with text' + text + ' to show up.')
  cy.get(pageObject).contains(text).should('exist')
  cy.log('Wait for the object [' + pageObject + '] to close.')
  //cy.get(pageObject).contains(text).should('not.exist')
  cy.get(pageObject).contains(text).click()
  cy.wait(2000)
})

//Wait for an object to show and then click on it to disappear. This is being used for the progress messages. 
Cypress.Commands.add('WaitForObjectWithTextToDisappear', (pageObject: string, text: string): any => {
  cy.log('Wait for the object [' + pageObject + 'with text' + text + ' to show up.')
  cy.get(pageObject).contains(text).should('exist')
  cy.log('Wait for the object [' + pageObject + '] to close.')
  cy.contains(pageObject, text).should('not.exist')
  cy.wait(2000)
})

//Pick an option from a dopdown list that has input option. 
Cypress.Commands.add('PickDropdownOption', (pageObject: string, text:string): any => {
  cy.log("Selecting from dropdown: " + text )
  cy.get(pageObject)
    .should('exist')
    .first()
    .clear({force: true})
    .type(text)
    .wait(2000)
  cy.WaitForAnObjectToBecomeVisisble("li[data-option-index='0']").contains(text).should("be.visible").wait(500).click()
  // cy.get(pageObject)
  //   .type('{downArrow}')
  //   .wait(1000)
  //   .type('{enter}')
});

//Pick an option from a dopdown list that has input option with checkboxes. 
Cypress.Commands.add('PickDropdownOptionWithCheckBox', (pageObject: string, text:string): any => {
  cy.log("Selecting from dropdown: " + text )
  cy.get(pageObject)
    .should('exist')
    .first()
    .clear({force: true})
    .type(text)
    .WaitForAnObjectToBecomeVisisble("li[data-option-index='0']").contains(text).click()
  cy.wait(500)
})

Cypress.Commands.add('AddDropdownOption', (pageObject: string, text:string): any => {
  cy.log("Selecting from dropdown: " + text )
  cy.get(pageObject)
    .should('exist')
    .first()
    .type(text)
    .WaitForAnObjectToBecomeVisisble("li[data-option-index='0']").contains(text).click()
})

//Pick an option from a dopdown list that does not have input option. Since the options are not recognizable in the DOM, we are using keyboard navigation. 
Cypress.Commands.add('PickDropdownOptionWithoutInput', (pageObject: string, text:string): any => {
  cy.log("Selecting from dropdown: " + text )
  cy.get(pageObject).click();
  cy.contains(text)
  cy.wait(500)
})

//Find a button on a table row and click on it.  
  Cypress.Commands.add('ClickOnButtonInTableRow', (searchString:string, objectString: string): any => {    
    cy.contains('td', searchString)
      .should('exist')
      .siblings()
      .contains('button span', objectString)
      .click({force: true,  multiple: true})                      
  })

  //Wait for an objet to become visible
  Cypress.Commands.add('WaitForAnObjectWithTextToBecomeVisisble', (object: string, text:string): any => {    
    cy.get(object).contains(text).should('be.visible')                   
  })

  //Wait for an object to become visible
  Cypress.Commands.add('WaitForAnObjectToBecomeVisisble', (object: string): any => {    
    cy.get(object).should('be.visible')                   
  })

  //Wait for an object to get enabled
  Cypress.Commands.add('waitForObjectToGetEnabled',(object: string): any => {
    cy.get(object).should('be.enabled');
  });

  Cypress.Commands.add('verifyNumOfTimesElementWithTextIsOnTheScreen',(object: string, text: string, number: number) : any => {
    cy.get(object + ':visible:contains("'+text+'")').should('have.length', number)
  });


  Cypress.Commands.add('verifyObjectIncludesText',(object: string, text: string) : any => {
    cy.get(object).then((el)=> {
      assert.include(el.text(), (text)); 
     });
  });
