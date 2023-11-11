import SliderButtonDirection from "./SliderButtonDirection";

class SliderButtonsProps {
    classes?: string = "";
    arrowIcon: string = "fas fa-angle";
    arrowDirection: SliderButtonDirection = SliderButtonDirection.None;
    columnSize: string = "col";
    scroll: boolean = false;
    mainImage?: boolean = false;
    largerMainButtonSpacer?: boolean = false
    handleClick: (scroll: boolean) => void = (scroll: boolean) => {};

    constructor(sliderButtonsProps?: {
        classes?: string,
        arrowIcon: string,
        arrowDirection: SliderButtonDirection,
        columnSize: string,
        scroll: boolean,
        largerMainButtonSpacer?: boolean
    }){
        if(sliderButtonsProps){
            this.classes = sliderButtonsProps.classes ? sliderButtonsProps.classes : "";
            this.arrowIcon = sliderButtonsProps.arrowIcon ? sliderButtonsProps.arrowIcon : "fas fa-angle";
            this.arrowDirection = sliderButtonsProps.arrowDirection ? sliderButtonsProps.arrowDirection : SliderButtonDirection.Right;
            this.columnSize = sliderButtonsProps.columnSize ? sliderButtonsProps.columnSize : "col";
            this.scroll = sliderButtonsProps.scroll ? true : false;
            this.largerMainButtonSpacer = sliderButtonsProps.largerMainButtonSpacer ? true : false;
        } else {
            this.classes =  "";
            this.arrowIcon =  "fas fa-angle";
            this.arrowDirection = SliderButtonDirection.Right;
            this.columnSize = "col";
            this.scroll = false;
            this.largerMainButtonSpacer = false;
        }

        this.handleClick = (scroll: boolean) => {};
    }
}

export default SliderButtonsProps;