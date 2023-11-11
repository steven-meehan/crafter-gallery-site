import ImageData from "../../../../../Models/ImageData";

class SliderImagesProps {
    classes?: string = "";
    images: ImageData[] = [];
    isThumbnailBar: boolean = false;
    setHelmetInfo: boolean = false;
    defaultPage: string = "";
    currentImageIndex: number = 0;
    imageSize: string = "";
    disableTitle: boolean = false;
    linkToLargerVersion: boolean = false;

    constructor(sliderImagesProps?: {
        classes: string,
        images: ImageData[],
        isThumbnailBar: boolean,
        setHelmetInfo: boolean,
        defaultPage: string,
        currentImageIndex: number,
        imageSize: string,
        disableTitle: boolean,
        linkToLargerVersion: boolean
    }){
        if(sliderImagesProps){
            this.classes = sliderImagesProps.classes ? sliderImagesProps.classes : "";
            this.images = sliderImagesProps.images ? sliderImagesProps.images.map(item => new ImageData(item)) : [];
            this.isThumbnailBar = sliderImagesProps.isThumbnailBar ? true : false;
            this.setHelmetInfo = sliderImagesProps.setHelmetInfo ? true : false;
            this.defaultPage = sliderImagesProps.defaultPage ? sliderImagesProps.defaultPage : "";
            this.currentImageIndex = sliderImagesProps.currentImageIndex ? sliderImagesProps.currentImageIndex : 0;
            this.imageSize = sliderImagesProps.imageSize ? sliderImagesProps.imageSize: "";
            this.disableTitle = sliderImagesProps.disableTitle ? true : false;
            this.linkToLargerVersion = sliderImagesProps.linkToLargerVersion ? true : false;
        } else {
            this.classes =  "";
            this.images =  [];
            this.isThumbnailBar =  false;
            this.setHelmetInfo = false;
            this.defaultPage = "";
            this.currentImageIndex = 0;
            this.imageSize = "";
            this.disableTitle = false;
            this.linkToLargerVersion = false;
        }
    }
}

export default SliderImagesProps;
