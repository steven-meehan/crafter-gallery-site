import { ReactNode } from "react";

class TogglerProps {
    navbarTogglerTarget: string = "";
    togglerClasses?: string = "";
    togglerUsesPrimaryColor?: boolean = false;
    children?: ReactNode;
}

export default TogglerProps;