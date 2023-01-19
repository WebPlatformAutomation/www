import { By, PageElement } from "@serenity-js/web";
import { Section } from "./section";

export class LocalNav extends Section {
    static localnav = PageElement.located(By.id('feds-header'));
}