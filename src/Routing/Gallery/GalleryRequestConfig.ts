import ImageData from '../../Images/ImageData';
import SliderButtonLocations from '../../Images/ImageSlider/SliderButton/SliderButtonLocations';

class GalleryRequestConfig {
    baseUrl: string = "";
    folderName: string = "";
    pageHeader: string = "";
    sliderButtonLocations: SliderButtonLocations = SliderButtonLocations.Bottom;
    linkToLargerVersion: boolean = false;
    items: ImageData[];

    constructor(galleryRequestConfig: {
        baseUrl: string,
        folderName: string,
        pageHeader: string,
        sliderButtonLocations: SliderButtonLocations,
        linkToLargerVersion: boolean,
        items: ImageData[]
    }){
        if(galleryRequestConfig){
            this.baseUrl = galleryRequestConfig.baseUrl ? galleryRequestConfig.baseUrl : "";
            this.folderName = galleryRequestConfig.folderName ? galleryRequestConfig.folderName : "";
            this.pageHeader = galleryRequestConfig.pageHeader ? galleryRequestConfig.pageHeader : "";
            this.sliderButtonLocations = galleryRequestConfig.sliderButtonLocations ? galleryRequestConfig.sliderButtonLocations :SliderButtonLocations.Bottom;
            this.linkToLargerVersion = galleryRequestConfig.linkToLargerVersion ? galleryRequestConfig.linkToLargerVersion : false;
            this.items = galleryRequestConfig.items ? galleryRequestConfig.items.map(item => new ImageData(item)) : [];
        } else {
            this.baseUrl = "";
            this.folderName = "";
            this.pageHeader = "";
            this.sliderButtonLocations = SliderButtonLocations.Bottom;
            this.linkToLargerVersion = false;
            this.items = [];
        }
    }
}

export default GalleryRequestConfig;