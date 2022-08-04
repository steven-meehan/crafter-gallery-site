import ImageFile from "../../../models/ImageFile";

class ImageSliderProps {
    classes?: string = "";
    images: ImageFile[] = [];
    renderImageUrls?: boolean = false;
    autoTransition?: boolean = false;
    autoTransitionTimer?: number = 60000;
    startWithImage?: boolean = false;
    initialImage?: string = "";
    galleryTitle?: string = "";
    arrowIcon?: string = "fas fa-angle";
    defaultPage?: string = "";
    isThumbnailBar?: boolean = false;
    disableTitle?: boolean = false;
    imageSize?: string = "";

    constructor(imageSliderProps?: {
        classes: string,
        images: ImageFile[],
        renderImageUrls: boolean,
        autoTransition: boolean,
        autoTransitionTimer: number,
        startWithImage: boolean,
        initialImage: string,
        galleryTitle: string,
        arrowIcon: string,
        defaultPage: string,
        isThumbnailBar: boolean,
        disableTitle: boolean,
        imageSize: string
    }){
        if(imageSliderProps){
            this.classes = imageSliderProps.classes ? imageSliderProps.classes : "";
            this.images = imageSliderProps.images ? imageSliderProps.images.map(item => new ImageFile(item)) : [];
            this.renderImageUrls = imageSliderProps.renderImageUrls ? imageSliderProps.renderImageUrls : false;
            this.autoTransition = imageSliderProps.autoTransition ? imageSliderProps.autoTransition : false;
            this.autoTransitionTimer = imageSliderProps.autoTransitionTimer ? imageSliderProps.autoTransitionTimer : 60000;
            this.startWithImage = imageSliderProps.startWithImage ? imageSliderProps.startWithImage : false;
            this.initialImage = imageSliderProps.initialImage ? imageSliderProps.initialImage : "";
            this.galleryTitle = imageSliderProps.galleryTitle ? imageSliderProps.galleryTitle : "";
            this.arrowIcon = imageSliderProps.arrowIcon ? imageSliderProps.arrowIcon : "fas fa-angle";
            this.defaultPage = imageSliderProps.defaultPage ? imageSliderProps.defaultPage : "";
            this.isThumbnailBar = imageSliderProps.isThumbnailBar ? imageSliderProps.isThumbnailBar : false;
            this.disableTitle = imageSliderProps.disableTitle ? imageSliderProps.disableTitle : false;
            this.imageSize = imageSliderProps.imageSize ? imageSliderProps.imageSize : "65%";
        } else {
            this.classes =  "";
            this.images =  [];
            this.renderImageUrls =  false;
            this.autoTransition =  false;
            this.autoTransitionTimer =  60000;
            this.startWithImage =  false;
            this.initialImage =  "";
            this.galleryTitle =  "";
            this.arrowIcon = "fas fa-angle";
            this.defaultPage =  "";
            this.isThumbnailBar =  false;
            this.disableTitle =  false;
            this.imageSize = "65%";
        }
    }
}

export default ImageSliderProps;