import { ReactNode } from "react";

import BackgroundColor from "../../../../Models/DataFiles/Navigation/BackgroundColor";
import LinkConfig from "../../../../Models/DataFiles/Navigation/LinkConfig";

class NavbarProps {
    navbarClasses?: string = "";
    logoAltText: string = "My Crafts";
    navlinks: LinkConfig[] = [];
    socialNavLinks: LinkConfig[] = [];
    backgroundColor?: BackgroundColor = BackgroundColor.Primary;
    headerCssClasses?: string = "";
    children?: ReactNode;
}

export default NavbarProps;