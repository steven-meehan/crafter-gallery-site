import { ReactNode } from "react";

import BackgroundColor from "../../Routing/BackgroundColor";
import LinkConfig from "../../Routing/Models/LinkConfig";

class NavbarProps {
    navbarClasses?: string = "";
    logoAltText: string = "My Crafts";
    navlinks: LinkConfig[] = [];
    socialNavLinks: LinkConfig[] = [];
    backgroundColor?: BackgroundColor = BackgroundColor.Primary;
    headerCssClasses?: string = "";
    togglerUsesPrimaryColor?: boolean = false;
    children?: ReactNode;
}

export default NavbarProps;