import { ReactNode } from "react";

import LinkConfig from "../../Routing/Models/LinkConfig";

class NavigationLinkProps {
    navLinkClasses?: string = "";
    item: LinkConfig = new LinkConfig();
    id: number = 0;
    children?: ReactNode;
}

export default NavigationLinkProps;