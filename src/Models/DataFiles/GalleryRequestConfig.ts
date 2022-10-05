import ImageFile from '../ImageFile';
import SliderButtonLocations from './SliderButtonLocations';

class GalleryRequestConfig {
    baseUrl: string = "";
    folderName: string = "";
    pageHeader: string = "";
    sliderButtonLocations: SliderButtonLocations = SliderButtonLocations.Bottom;
    linkToLargerVersion: boolean = false;
    items: ImageFile[];

    constructor(galleryRequestConfig: {
        baseUrl: string,
        folderName: string,
        pageHeader: string,
        sliderButtonLocations: SliderButtonLocations,
        linkToLargerVersion: boolean,
        items: ImageFile[]
    }){
        if(galleryRequestConfig){
            this.baseUrl = galleryRequestConfig.baseUrl ? galleryRequestConfig.baseUrl : "";
            this.folderName = galleryRequestConfig.folderName ? galleryRequestConfig.folderName : "";
            this.pageHeader = galleryRequestConfig.pageHeader ? galleryRequestConfig.pageHeader : "";
            this.sliderButtonLocations = galleryRequestConfig.sliderButtonLocations ? galleryRequestConfig.sliderButtonLocations :SliderButtonLocations.Bottom;
            this.linkToLargerVersion = galleryRequestConfig.linkToLargerVersion ? galleryRequestConfig.linkToLargerVersion : false;
            this.items = galleryRequestConfig.items ? galleryRequestConfig.items.map(item => new ImageFile(item)) : [];
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