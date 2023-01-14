import { Actor, Cast } from '@serenity-js/core';
import {
  BrowseTheWebWithPlaywright,
  PlaywrightOptions,
} from '@serenity-js/playwright';
import * as playwright from 'playwright';

export class Actors extends Cast {
  constructor(browser, options) {
    super(browser, options);
    this.browser = browser;
    this.options = options;    
  }

  prepare(actor) {
    return actor.whoCan(
      BrowseTheWebWithPlaywright.using(this.browser, this.options)
    );
  }
}
