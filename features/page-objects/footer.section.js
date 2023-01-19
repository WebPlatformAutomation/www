import { By, PageElement } from "@serenity-js/web";
import localize from "../support/localize";
import { Section } from "./section";

export class Footer extends Section {
    constructor() {
        super();
        this.buildProps({
          adobeLogo: '//img[contains(@src, "adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg")]',
          regionPicker: '.feds-regionPicker',
          copyright: '//*[contains(text(),"©")]',
          adChoices: '//*[contains(@daa-ll,"AdChoices-")] | //*[contains(@daa-ll,"ChoixdePub-")]',
          privacy: '//a[contains(@href,"privacy.html") and contains(@class,"feds-navLink")]',
          termOfUse: '//*[contains(@daa-ll,"Terms of Use-") or contains(@daa-ll,"Terms_of_Use-")]',
          facebookLogo: 'a.feds-navLink[href="https://www.facebook.com/adobe"]',
          twitterLogo: 'a.feds-navLink[href="https://twitter.com/Adobe"]',
          instagramLogo: 'a.feds-navLink[href="https://www.instagram.com/adobe/"]',
          linkedinLogo: 'a.feds-navLink[href="https://www.linkedin.com/company/adobe"]',
          adChoicesIframe: '#_evidon-consent-frame',
          iframeClose: '//button[contains(text(), "✖")]',
          menuList: '$$.feds-navList a[role=heading]',
          footerMenuItems: '$$#global-footer .feds-navLink[data-feds-action="none"]'
        });
      }
    
      /**
       * @type {object}
       * @description GNAV Footer container
       */
      get GnavFooter() { return PageElement.located(By.css('#feds-footernav')); }
    
      /**
       * @type {object}
       * @description Cookies
       */   
      get cookies() {
        let text = localize("Cookie preferences");
        return PageElement.located(By.css(`//*[text()="${text}"] | //*[@data-feds-action="open-adchoices-modal"]`));
      }
}