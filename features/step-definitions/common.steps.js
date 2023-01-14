import { Given, Then, When } from '@cucumber/cucumber';
import {
  Actor,
  actorInTheSpotlight,
  actorCalled,
  Wait,
  Duration,
} from '@serenity-js/core';
import { isClickable, Navigate } from '@serenity-js/web';
import { Ensure, equals, includes, not } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import {
  By,
  isVisible,
  PageElement,
  Text,
  Scroll,
  Click,
  Enter,
  Press,
  Value,
} from '@serenity-js/web';
import { setEmitFlags } from 'typescript';

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
  let header = PageElement.located(By.id('feds-header'));
  let footer = PageElement.located(By.id('feds-footer'));
  await actorCalled('I').attemptsTo(
    Wait.until(header, isVisible()),
    Ensure.that(header, isVisible()),
    Scroll.to(footer),
    Wait.until(footer, isVisible()),    
    Ensure.that(footer, isVisible())
  );
});

When('I sign in', async function () {
  let signin = PageElement.located(By.css('.feds-login'));
  let emailInput = PageElement.located(By.id('EmailPage-EmailField'));
  let emailContinue = PageElement.located(
    By.css('button[data-id="EmailPage-ContinueButton"]')
  );
  let passwordInput = PageElement.located(By.id('PasswordPage-PasswordField'));
  let passwordContinue = PageElement.located(
    By.css('button[data-id="PasswordPage-ContinueButton"]')
  );
  let appLauncher = PageElement.located(By.css('.feds-appLauncher'));
  await actorCalled('I').attemptsTo(
    Wait.until(signin, isVisible()),
    Click.on(signin),
    Wait.until(emailInput, isClickable())
  );
  await actorCalled('I').attemptsTo(
    Click.on(emailInput),
    Press.the([...username]).in(emailInput),
    Wait.for(Duration.ofSeconds(1)),
    Ensure.that(Value.of(emailInput), equals(username)),
    Wait.until(emailContinue, isVisible()),
    Click.on(emailContinue),
    Wait.upTo(Duration.ofSeconds(10)).until(passwordInput, isClickable())
  );
  await actorCalled('I').attemptsTo(
    Click.on(passwordInput),
    Press.the([...password]).in(passwordInput),
    Wait.for(Duration.ofSeconds(1)),
    Wait.upTo(Duration.ofSeconds(10)).until(passwordContinue, isClickable()),
    Click.on(passwordContinue)
  );
  console.log('Signed in');
});

Then('I should see the app launcher', async function () {
  let appLauncher = PageElement.located(By.css('.feds-appLauncher'));
  let appLauncherPopover = PageElement.located(By.css('.app-launcher-popover'));

  await actorCalled('I').attemptsTo(
    Wait.upTo(Duration.ofSeconds(10)).until(appLauncher, isVisible()),
    Ensure.that(appLauncher, isVisible()),
    Click.on(appLauncher),
    Wait.until(appLauncherPopover, isVisible())
  );
  await actorCalled('I').attemptsTo(
    Click.on(appLauncher),
    Wait.until(appLauncherPopover, not(isVisible())),
    Ensure.that(appLauncherPopover, not(isVisible()))
  );
});
