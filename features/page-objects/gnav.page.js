import { classes } from 'polytype';
import { Footer } from "./footer.section";
import { Header } from "./header.section";
import { LocalNav } from "./localnav.section";
import { AdobePage } from "./page";
import { RegionSwitch } from "./region_switch.section";

export class GnavPage extends classes(
    AdobePage,
    Header,
    LocalNav,
    Footer,
    RegionSwitch
  ) {

  }