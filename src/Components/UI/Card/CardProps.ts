import { ReactNode } from "react";

class CardProps {
    cardRounded?: boolean = false;
    cardRoundedModerate?: boolean = false;
    cardRoundedHeavy?: boolean = false;
    cardHover?: boolean = false;
    cardColor?: string = "light";
    cardClasses?: string = "";
    children?: ReactNode;
}

export default CardProps;