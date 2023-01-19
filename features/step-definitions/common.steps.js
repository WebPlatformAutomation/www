import { Given, Then, When } from '@cucumber/cucumber';
import {
  actorCalled,
  Wait,
  Duration,
} from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';
import { Ensure, not } from '@serenity-js/assertions';
import {
  isVisible,
  Click,
} from '@serenity-js/web';
import SeeHeaderAndFooter, { SignIn } from '../tasks/gnav.tasks';
import { GnavPage } from '../page-objects/gnav.page';

Given(/^I go to this page(.*)$/, async function (path) {
  path = path.trim();
  if (path) {
    await actorCalled('I').attemptsTo(Navigate.to(path));
  } else {
    await actorCalled('I').attemptsTo(Navigate.to(this.parameters.pageUrl));
  }
});

let username = 'myusername' // Will use credentials from Vault
let password = 'mypassword'

Then('I should see the header and footer', async function () {
  await actorCalled('I').attemptsTo(
    SeeHeaderAndFooter(),
  );
});

When('I sign in', async function () {
  await actorCalled('I').attemptsTo(
    SignIn(username, password),
  );
  console.log('Signed in');
});

Then('I should see the app launcher', async function () {
  let page = new GnavPage();

  await actorCalled('I').attemptsTo(
    Wait.upTo(Duration.ofSeconds(10)).until(page.appLaunchIcon, isVisible()),
    Ensure.that(page.appLaunchIcon, isVisible()),
    Click.on(page.appLaunchIcon),
    Wait.until(page.appLaunchPopover, isVisible())
  );
  await actorCalled('I').attemptsTo(
    Click.on(page.appLaunchIcon),
    Wait.until(page.appLaunchPopover, not(isVisible())),
    Ensure.that(page.appLaunchPopover, not(isVisible()))
  );
});
