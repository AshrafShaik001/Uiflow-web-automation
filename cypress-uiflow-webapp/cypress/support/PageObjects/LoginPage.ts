/// <reference types="Cypress" />
/// <reference types="../../support" />

export class LoginPage {
  //LOCATORS 
  emailAddressTxtBx: string = 'input[type="email"]'
  passwordTxtBx: string = 'input[type="password"]'
  generalBtn: string = 'button span'

  //ACTIONS
  enterEmailIntoEmailTxtBx(email: string) {
    cy.TypeInObject(this.emailAddressTxtBx, email);
  };

  enterPasswordIntoPasswordTxtBx(password: string){
    cy.TypeInObject(this.passwordTxtBx, password);
  }

  clickOnLoginBtn(){
    cy.ClickOnObjectWithText(this.generalBtn, "Login");
  }

  login(email: string = Cypress.env("email"), password: string = Cypress.env("password")){
    this.enterEmailIntoEmailTxtBx(email);
    this.enterPasswordIntoPasswordTxtBx(password);
    this.clickOnLoginBtn();
  }
};