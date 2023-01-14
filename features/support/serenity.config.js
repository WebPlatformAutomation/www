import { AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure, Duration } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import {
  Photographer,
  TakePhotosOfInteractions /* TakePhotosOfFailures */,
} from '@serenity-js/web';
import * as playwright from 'playwright';

import { Actors } from '../actors/Actors.js';

const timeouts = {
  cucumber: { step: Duration.ofSeconds(30) },
  playwright: {
    defaultNavigationTimeout: Duration.ofSeconds(10),
    defaultTimeout: Duration.ofSeconds(10),
  },
  serenity: { cueTimeout: Duration.ofSeconds(10) },
};

let browser = null;

// Configure Cucumber
setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

BeforeAll(async () => {
  browser = await playwright[global.config.profile.browser].launch({ headless: global.config.profile.headless });

  // Configure Serenity/JS
  configure({
    actors: new Actors(browser, {
      baseURL: global.config.profile.baseUrl,
      defaultNavigationTimeout:
        timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
      defaultTimeout: timeouts.playwright.defaultTimeout.inMilliseconds(),
    }),

    // Configure Serenity/JS reporting services
    crew: [
      ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
      new SerenityBDDReporter(),
      ConsoleReporter.forDarkTerminals(),
      Photographer.whoWill(TakePhotosOfInteractions),
      // Photographer.whoWill(TakePhotosOfFailures),
    ],

    cueTimeout: timeouts.serenity.cueTimeout,
  });
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

Before(async function(options) {
  if (global.features) {
    let testPage = global.features[options.gherkinDocument.uri];
    this.parameters.pageUrl = testPage.url;
  }
});
