import { Section } from './section';
import { By, PageElement, PageElements, isVisible } from "@serenity-js/web";

/** Class representing a header of global navigation */
export class Header extends Section {

  /**
   * @type {object}
   * @description GNAV Header container
   */
  get GnavHeader() { return PageElement.located(By.css('#feds-topnav')); }

  /**
   * @type {object}
   * @description Sign in button
   */
  get signInButton() {
    return PageElement.located(By.css('.feds-login'));
  }

  /**
   * @type {object}
   * @description Sign out button
   */  
  get signOutButton() {
    return PageElement.located(By.css('.Profile-dropdown > .Profile-menu:last-of-type .Profile-menu-link'));
  }

  /**
   * @type {object}
   * @description Profile icon
   */   
  get profileIcon() {
    return PageElement.located(By.css('.feds-profile'));
  }

  /**
   * @type {object[]}
   * @description Menu items
   */ 
  get menuItems() {
    return PageElements.located(By.css('.feds-navList-wrapper--main .feds-popup-trigger > a'));
  }

  /**
   * @type {object[]}
   * @description Menu items
   */   
  get navListItems() {
    return PageElements.located(By.css('.feds-navList-item > a'));
  }

  /**
   * @type {object[]}
   * @description Menu items
   */   
  get popup() {
    return PageElement.located(By.css('.feds-navList-wrapper--main .feds-popup--open'));
  }

  /**
   * @type {object}
   * @description Search icon
   */   
  get searchIcon() {
    return PageElement.located(By.css('.feds-search-trigger'));
  }

  /**
   * @type {object}
   * @description Search V.1 close icon
   */   
  get searchCloseIcon() {
    return PageElement.located(By.css('[name="search-term-clear"]'));
  }

  /**
   * @type {object}
   * @description Search V.2 close icon
   */   
  get searchCloseIconV2() {
    return PageElement.located(By.css('.feds-search-close'));
  }

  /**
   * @type {object}
   * @description Search V.1 input
   */   
  get searchInput() {
    return PageElement.located(By.css('.feds-searchInput'));
  }

  /**
   * @type {object}
   * @description Search V.2 input
   */   
  get searchInputV2() {
    return PageElement.located(By.css('[type="search"]'));
  }

  /**
   * @type {object}
   * @description Search V.1 results
   */   
  get searchResults() {
    return PageElement.located(By.css('#search-results results'));
  }

  /**
   * @type {object}
   * @description Search V.2 results
   */   
  get searchResultsV2() {
    return PageElement.located(By.css('.feds-searchResults .feds-searchResult'));
  }
 
//   /**
//    * Click sign in button
//    */
//   signIn() {
//     // if (browser.capabilities.browserName === 'Safari' || browser.capabilities.browserName === 'internet explorer') {
//     //   browser.execute(
//     //     'arguments[0].click();',
//     //     this.signInButton
//     //   );
//     // }else
//     // {
//     this.signInButton.click();
//     //}
//   }

  /**
   * @type {object}
   * @description Search V.2 results
   */    
  get profileDropdown() {
    return PageElement.located(By.css('.Profile-dropdown'));
  }

  /**
   * @type {object}
   * @description AppLauch icon
   */    
  get appLaunchIcon() {
    return PageElement.located(By.css('.feds-appLauncher'));
  }

  /**
   * @type {object}
   * @description Applaunch pop
   */    
  get appLaunchPopover() {
    return PageElement.located(By.css('.app-launcher-popover'));
  }

  /**
   * Get the index of the displayed popup menu
   * @returns {Number} Index of the displayed popup menu. -1 if no displayed popup menu
   */
  indexOfPopupMenu() {
    let popups = PageElements.located(By.css('#feds-header .feds-popup'));
    for (let i=0; i<popups.length; i++) {
      let elemClass = popups[i];
      if (elemClass.isVisible) {
        return i;
      }
    }
    return -1;
  }
}
