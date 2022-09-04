import { ReactNode } from "react";

import LinkConfig from "../../../../Models/DataFiles/Navigation/LinkConfig";

class NavbarProps {
    navbarClasses?: string = "";
    logoAltText: string = "My Crafts";
    navlinks: LinkConfig[] = [];
    socialNavLinks: LinkConfig[] = [];
    children?: ReactNode;
}

export default NavbarProps;