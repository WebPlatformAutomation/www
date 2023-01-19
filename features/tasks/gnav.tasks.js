import { Ensure, equals } from "@serenity-js/assertions";
import { Duration, Task, Wait } from "@serenity-js/core";
import { Click, isVisible, Press, Scroll, isClickable, Value } from "@serenity-js/web";
import { AdobeSignInPage } from "../page-objects/adobe_signin.page";
import { GnavPage } from "../page-objects/gnav.page";

let page = new GnavPage();
let adobeSigninPage = new AdobeSignInPage();

const SeeHeaderAndFooter = () => 
    Task.where(`#actor see header and footer`,
        Wait.until(page.GnavHeader, isVisible()),
        Ensure.that(page.GnavHeader, isVisible()),
        Scroll.to(page.GnavFooter),
        Wait.until(page.GnavFooter, isVisible()),
        Ensure.that(page.GnavFooter, isVisible()) 
    )

const SignIn = (username, password) =>
    Task.where(`#actor sign in`,
        Wait.until(page.signInButton, isVisible()),
        Click.on(page.signInButton),
        Wait.until(adobeSigninPage.emailField, isClickable()),
        Click.on(adobeSigninPage.emailField),
        Press.the([...username]).in(adobeSigninPage.emailField),
        Wait.for(Duration.ofSeconds(1)),
        //Ensure.that(Value.of(adobeSigninPage.emailField), equals(username)),
        Wait.until(adobeSigninPage.emailContinue, isVisible()),
        Click.on(adobeSigninPage.emailContinue),
        Wait.upTo(Duration.ofSeconds(10)).until(adobeSigninPage.passwordField, isClickable()),
        Click.on(adobeSigninPage.passwordField),
        Press.the([...password]).in(adobeSigninPage.passwordField),
        Wait.for(Duration.ofSeconds(1)),
        Wait.upTo(Duration.ofSeconds(10)).until(adobeSigninPage.passwordContinue, isClickable()),
        Click.on(adobeSigninPage.passwordContinue)
    )    

export {SeeHeaderAndFooter as default, SignIn};