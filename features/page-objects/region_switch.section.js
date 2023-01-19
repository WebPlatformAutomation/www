import { By, PageElement } from "@serenity-js/web";
import { Section } from "./section";

export class RegionSwitch extends Section {
    static regionswitch = PageElement.located(By.id('feds-header'));
}