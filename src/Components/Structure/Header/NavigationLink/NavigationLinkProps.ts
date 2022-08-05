import { ReactNode } from "react";
import NavigationConfig from "../../../../models/configs/NavigationConfigs/NavigationConfig";

class NavigationLinkProps {
    navLinkClasses?: string = "";
    item: NavigationConfig = new NavigationConfig();
    id: number = 0;
    children?: ReactNode;
}

export default NavigationLinkProps;