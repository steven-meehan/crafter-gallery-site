import { ReactNode } from "react";

class CarouselProps {
    configSettingFile: string = "";
    imagesObject: string = "";
    defaultPage: string = "";
    routeToNotFoundPage?: boolean = false;
    fontAwesomeArrowIcons?: string = "fas fa-angle";
    children?: ReactNode;

    constructor(carouselProps?: {
        configSettingFile: string,
        imagesObject: string,
        defaultPage: string,
        routeToNotFoundPage?: boolean,
        fontAwesomeArrowIcons?: string
    }){
        if(carouselProps){
            this.configSettingFile = carouselProps.configSettingFile ? carouselProps.configSettingFile : "";
            this.imagesObject = carouselProps.imagesObject ? carouselProps.imagesObject : "";
            this.defaultPage = carouselProps.defaultPage ? carouselProps.defaultPage : "";
            this.routeToNotFoundPage = carouselProps.routeToNotFoundPage ? carouselProps.routeToNotFoundPage : false;
            this.fontAwesomeArrowIcons = carouselProps.fontAwesomeArrowIcons ? carouselProps.fontAwesomeArrowIcons : "";
        } else {
            this.configSettingFile = "";
            this.imagesObject = "";
            this.defaultPage = "";
            this.routeToNotFoundPage = false;
            this.fontAwesomeArrowIcons = "";
        }
    }
}

export default CarouselProps;