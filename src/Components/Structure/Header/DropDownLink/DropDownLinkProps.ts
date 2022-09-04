import { ReactNode } from "react";

import NavigationConfig from "../../../../Models/DataFiles/Navigation/NavigationConfig";

class DropDownLinkProps {
    dropDownLinkClasses?: string = "";
    childLinks: NavigationConfig[] = [];
    bindingKey: string = ""
    children?: ReactNode;
}

export default DropDownLinkProps;