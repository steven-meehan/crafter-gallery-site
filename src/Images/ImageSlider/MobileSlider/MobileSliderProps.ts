import SliderButtonDirection from "../SliderButton/SliderButtonDirection";

class MobileSliderProps {
    classes?: string = "";
    isThumbnailBar: boolean = false;
    arrowIcon: string = "fas fa-angle";
    scroll: boolean = false;
    handleLeftClick: (scroll: boolean) => void = (scroll: boolean) => {};
    handleRightClick: (scroll: boolean) => void = (scroll: boolean) => {};

    constructor(mobileSliderProps?: {
        classes?: string,
        isThumbnailBar: boolean,
        arrowIcon: string,
        arrowDirection: SliderButtonDirection,
        scroll: boolean,
    }){
        if(mobileSliderProps){
            this.classes = mobileSliderProps.classes ? mobileSliderProps.classes : "";
            this.isThumbnailBar = mobileSliderProps.isThumbnailBar ? true : false;
            this.arrowIcon = mobileSliderProps.arrowIcon ? mobileSliderProps.arrowIcon : "fas fa-angle";
            this.scroll = mobileSliderProps.scroll ? true : false;
        } else {
            this.classes =  "";
            this.isThumbnailBar = false;
            this.arrowIcon =  "fas fa-angle";
            this.scroll = false;
        }

        this.handleLeftClick = (scroll: boolean) => {};
        this.handleRightClick = (scroll: boolean) => {};
    }
}

export default MobileSliderProps;