import { ReactNode } from "react";
import NavigationConfig from "../../../models/configs/NavigationConfigs/NavigationConfig";

class DropDownLinkProps {
    dropDownLinkClasses?: string = "";
    childLinks: NavigationConfig[] = [];
    bindingKey: string = ""
    children?: ReactNode;
}

export default DropDownLinkProps;