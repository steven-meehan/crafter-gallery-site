import { ReactNode } from "react";

import LinkConfig from "../../../../Models/DataFiles/Navigation/LinkConfig";

class DropDownLinkProps {
    dropDownLinkClasses?: string = "";
    childLinks: LinkConfig[] = [];
    bindingKey: string = ""
    children?: ReactNode;
}

export default DropDownLinkProps;