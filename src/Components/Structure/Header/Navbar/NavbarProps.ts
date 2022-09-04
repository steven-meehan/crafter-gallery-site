import { ReactNode } from "react";

import NavigationConfig from "../../../../Models/DataFiles/Navigation/NavigationConfig";

class NavbarProps {
    navbarClasses?: string = "";
    logoAltText: string = "My Crafts";
    navlinks: NavigationConfig[] = [];
    socialNavLinks: NavigationConfig[] = [];
    children?: ReactNode;
}

export default NavbarProps;