import { By, PageElement } from '@serenity-js/web';
import { AdobePage } from './page';

/** Class representing Adobe account sign in page */
export class AdobeSignInPage extends AdobePage {
  /**
   * @type {object}
   * @description Username field in the sign in page
   */ 
  get emailField() {
    return PageElement.located(By.css('#EmailPage-EmailField'));
  }
  /**
   * @type {object}
   * @description Continue button after filling username/email field
   */   
  get emailContinue() {
    return PageElement.located(By.css('.EmailPage__submit button'));
  }
  /**
   * @type {object}
   * @description Password field in the sign in page
   */   
  get passwordField() {
    return PageElement.located(By.css('#PasswordPage-PasswordField'));
  }
  /**
   * @type {object}
   * @description Continue button after filling password field
   */   
  get passwordContinue() {
    return PageElement.located(By.css('.PasswordPage__action-buttons-wrapper button'));
  }
  /**
   * @type {object}
   * @description Get the account email id
   */   
  get accountProfileEmail() {
    return PageElement.located(By.css('.account-profile-email'));
  }
  /**
   * @type {object}
   * @description Button for using Adobe sign-in
   */
  get adobeSignIn() {
    return PageElement.located(By.css('//button[contains(@class, "SocialCta__adobe")]'));
  }
  /**
   * @type {object}
   * @description Button for using Facebook sign-in
   */ 
  get fackbookSignIn() {
    return PageElement.located(By.css('//button[contains(@class, "SocialCta__facebook")]'));
  }
  /**
   * @type {object}
   * @description Button for using Google sign-in
   */ 
  get googleSignIn() {
    return PageElement.located(By.css('//button[contains(@class, "SocialCta__google")]'));
  }
  /**
   * @type {object}
   * @description Button for using Apple sign-in
   */ 
  get appleSignIn() {
    return PageElement.located(By.css('//button[contains(@class, "SocialCta__apple")]'));
  }
  /**
   * @type {object}
   * @description Button for passwordless opt-in 
   */   
  get passwordlessOptInButton() {
    return PageElement.located(By.css('[data-id="PasswordlessOptInPP-continue-button"]'));
  }
  /**
   * @type {object}
   * @description Button for accepting terms-of-use
   */ 
  get acceptUpdatedTerms() {
    return PageElement.located(By.css('[data-id="PP-TermsOfUse-ContinueBtn"]'));
  }

  /**
   * @type {object}
   * @description Link to open Adobe sign up page
   */
  get createAccount() {
    return PageElement.located(By.css('.EmailPage__create-account-link'));
  }

  /**
   * @type {object}
   * @description Adobe APP Email form
   */
  get appEmailForm() {
    return PageElement.located(By.css('form#EmailForm'));
  }

  /**
   * @type {object}
   * @description Adobe APP Login form
   */
  get appLoginForm() {
    return PageElement.located(By.css('#App'));
  }

  /**
   * @type {object}
   * @description Adobe SUSI Login form
   */
  get susiLoginForm() {
    return PageElement.located(By.css('#adobesusi'));
  }

//   /**
//    * Load the page
//    */
//   open() {
//     super.open('/');
//   }

//   /**
//    * Wait until the page to be loaded. Timeout in 60 seconds.
//    */
//   wait() {
//     this.emailField.waitForDisplayed(60000);
//   }

//   /**
//    * Do logging in action
//    * @param {string} email username or email
//    * @param {string} password password for the account
//    */
//   login(email, password) {
//     this.emailField.waitForEnabled({timeout: 30000});
//     browser.actionAndWait(
//       () => {
//         this.emailField.clearValue();
//         this.emailField.addValue(email);
//         this.emailContinue.click();
//       },
//       () => {
//         this.waitForDisplayed('passwordField', 10000);
//       }
//     );
//     browser.actionAndWait(
//       () => {
//         this.passwordField.setValue(password);
//         //this.passwordContinue.click();
//         browser.execute('arguments[0].click()', this.passwordContinue);
//       },
//       () => {
//         this.passwordContinue.waitForExist({ timeout: 20000, reverse: true });
//       }
//     );
//   }//
}
