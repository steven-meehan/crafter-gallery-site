import { ReactNode, CSSProperties } from "react";

class CardProps {
    cardRounded?: boolean = false;
    cardRoundedModerate?: boolean = false;
    cardRoundedHeavy?: boolean = false;
    cardHover?: boolean = false;
    cardColor?: string = "primary";
    cardClasses?: string = "";
    /** Inline style overrides — takes priority over cardColor since it's applied directly on the element. */
    style?: CSSProperties;
    children?: ReactNode;
}

export default CardProps;