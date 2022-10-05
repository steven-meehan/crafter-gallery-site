import SliderButtonLocations from "../../../../Models/DataFiles/SliderButtonLocations";
import ImageFile from "../../../../Models/ImageFile";

class ImageSliderProps {
    classes?: string = "";
    images: ImageFile[] = [];
    setHelmetInfo?: boolean = false;
    renderImageUrls?: boolean = false;
    autoTransition?: boolean = false;
    autoTransitionTimer?: number = 60000;
    startWithImage?: boolean = false;
    initialImage?: string = "";
    arrowIcon?: string = "fas fa-angle";
    defaultPage?: string = "";
    isThumbnailBar?: boolean = false;
    disableTitle?: boolean = false;
    imageSize?: string = "";
    marginTop?: boolean = false;
    sliderButtonLocations?: SliderButtonLocations = SliderButtonLocations.Bottom;
    scrollToTopOnClick?: boolean = false;
    linkToLargerVersion?: boolean = false;

    constructor(imageSliderProps?: {
        classes: string,
        images: ImageFile[],
        setHelmetInfo: boolean
        renderImageUrls: boolean,
        autoTransition: boolean,
        autoTransitionTimer: number,
        startWithImage: boolean,
        initialImage: string,
        arrowIcon: string,
        defaultPage: string,
        isThumbnailBar: boolean,
        disableTitle: boolean,
        imageSize: string,
        marginTop?: boolean,
        sliderButtonLocations?: SliderButtonLocations,
        scrollToTopOnClick?: boolean,
        linkToLargerVersion?: boolean
    }){
        if(imageSliderProps){
            this.classes = imageSliderProps.classes ? imageSliderProps.classes : "";
            this.images = imageSliderProps.images ? imageSliderProps.images.map(item => new ImageFile(item)) : [];
            this.setHelmetInfo = imageSliderProps.setHelmetInfo ? imageSliderProps.setHelmetInfo : false;
            this.renderImageUrls = imageSliderProps.renderImageUrls ? imageSliderProps.renderImageUrls : false;
            this.autoTransition = imageSliderProps.autoTransition ? imageSliderProps.autoTransition : false;
            this.autoTransitionTimer = imageSliderProps.autoTransitionTimer ? imageSliderProps.autoTransitionTimer : 60000;
            this.startWithImage = imageSliderProps.startWithImage ? imageSliderProps.startWithImage : false;
            this.initialImage = imageSliderProps.initialImage ? imageSliderProps.initialImage : "";
            this.arrowIcon = imageSliderProps.arrowIcon ? imageSliderProps.arrowIcon : "fas fa-angle";
            this.defaultPage = imageSliderProps.defaultPage ? imageSliderProps.defaultPage : "";
            this.isThumbnailBar = imageSliderProps.isThumbnailBar ? imageSliderProps.isThumbnailBar : false;
            this.disableTitle = imageSliderProps.disableTitle ? imageSliderProps.disableTitle : false;
            this.imageSize = imageSliderProps.imageSize ? imageSliderProps.imageSize : "65%";
            this.marginTop = imageSliderProps.marginTop ? imageSliderProps.marginTop : false;
            this.sliderButtonLocations = imageSliderProps.sliderButtonLocations ? imageSliderProps.sliderButtonLocations : SliderButtonLocations.Bottom;
            this.scrollToTopOnClick = imageSliderProps.scrollToTopOnClick ? imageSliderProps.scrollToTopOnClick : false;
            this.linkToLargerVersion = imageSliderProps.linkToLargerVersion ? imageSliderProps.linkToLargerVersion : false;
        } else {
            this.classes =  "";
            this.images =  [];
            this.setHelmetInfo = false;
            this.renderImageUrls =  false;
            this.autoTransition =  false;
            this.autoTransitionTimer =  60000;
            this.startWithImage =  false;
            this.initialImage =  "";
            this.arrowIcon = "fas fa-angle";
            this.defaultPage =  "";
            this.isThumbnailBar =  false;
            this.disableTitle =  false;
            this.imageSize = "65%";
            this.marginTop = false;
            this.sliderButtonLocations = SliderButtonLocations.Bottom;
            this.scrollToTopOnClick = false;
            this.linkToLargerVersion = false;
        }
    }
}

export default ImageSliderProps;