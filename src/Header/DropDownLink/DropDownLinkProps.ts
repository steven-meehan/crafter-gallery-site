import { ReactNode } from "react";

import LinkConfig from "../../Routing/LinkConfig";

class DropDownLinkProps {
    dropDownLinkClasses?: string = "";
    childLinks: LinkConfig[] = [];
    bindingKey: string = ""
    children?: ReactNode;
}

export default DropDownLinkProps;