import { GnavPage } from '../../page-objects/gnav.page';
/**
 * Base page class for creative cloud
 */
export class CcBasePage extends GnavPage {

  /**
   * @type {object}
   * @description Get the query parameters to be added to the url
   */
  get urlQuery() {
    let q = super.urlQuery;
    let keys = ['countryCode'];
    for (let key of keys) {
      switch (browser.config.profile[key]) {
        case undefined:
          break;
        case 'auto':
          q[key] = browser.config.profile.locale.split('/')[0];
          break;
        default:
          q[key] = browser.config.profile[key];
      }
    }
    return Object.assign(q, {
      mboxDisable: 1
    });
  }

  /**
   * @type {object}
   * @description Get the adobe logo on the beagle page
   */
  get marqueeAdobeLogo() {
    return $('.marquee-adobe-logo');
  }

  /**
   * @type {object}
   * @description Get the gnav header
   */
  get gnavHeader() {
    return $('#AdobePrimaryNav');
  }

  /**
   * @type {object}
   * @description Get the gnav footer
   */
  get gnavFooter() {
    return $('#AdobeFooterNav');
  }

  /**
   * @type {object}
   * @description Get the overlay links on geo overlay pop up
   */
  get overlayLinks() {
    return $$('#localeModal .locale-modal_button');
  }

  /**
   * @type {object}
   * @description Get the first overlay link on the geo routing pop up
   */
  get firstOverlayLink() {
    let elements = this.overlayLinks;
    return elements.length > 0 ? elements[0] : undefined;
  }

  /**
   * @type {object}
   * @description Get the second overlay link on the geo routing pop up
   */
  get secondOverlayLink() {
    let elements = this.overlayLinks;
    return elements.length > 1 ? elements[1] : undefined;
  }

  /**
   * @type {object}
   * @description Get the last overlay link on the geo routing pop up
   */
  get lastOverlayLink() {
    let elements = this.overlayLinks;
    return elements.length > 0 ? elements[elements.length - 1] : undefined;
  }

  /**
   * @type {object}
   * @description Get the geo overlay pop up on beagle page
   */
  get geoOverlay() {
    return $('.geo-overlay-modal');
  }

  /**
   * @type {object}
   * @description Get the dexter geo overlay pop up
   */
  get dexterGeoOverlay() {
    return $('div#localeModal');
  }

  /**
   * @type {object}
   * @description Get the ok button on login dialog in AEM crx/de
   */
  get dexterGeoOverlayClose() {
    return $('div#localeModal .dexter-CloseButton');
  }

  /**
   * @type {object}
   * @description Get the ok button on login dialog in AEM crx/de
   */
  get nthAccordianSection() {
    return $(
      `(//*/main/section//div[contains(concat('', normalize-space(@class), ''), 'grid-cols-12')]/div/div[contains(concat('', normalize-space(@class), ''), 'dc-collapse')])[1]`
    );
  }

  /**
   * @type {object}
   * @description Get the video player pop up
   */
  get videoPlayerFrame() {
    return $('iframe');
  }

  /**
   * @type {object}
   * @description Get the player button on the video
   */
  get videoPlayer() {
    return $('.mpc-player');
  }

  /**
   * @type {object[]}
   * @description Get all waiting and loading elements
   */
  get loading() {
    return $('coral-wait,.loading');
  }
  
  /**
   * @type {object}
   * @description Get the ecommerce iframe
   */
  get ecommPreload() {
    return $('#ecommPreload');
  }

  /**
   * 
   */
  waitForLoading() {
    this.waitForExist('loading', 60000, true);
  }

}
