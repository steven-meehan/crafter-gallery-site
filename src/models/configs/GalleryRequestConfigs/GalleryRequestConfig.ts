import ImageFile from "../../ImageFile";

class GalleryRequestConfig {
    baseUrl: string = "";
    folderName: string = "";
    pageHeader: string = "";
    items: ImageFile[];

    constructor(galleryRequestConfig: {
        baseUrl: string,
        folderName: string,
        pageHeader: string,
        items: ImageFile[]
    }){
        if(galleryRequestConfig){
            this.baseUrl = galleryRequestConfig.baseUrl ? galleryRequestConfig.baseUrl : "";
            this.folderName = galleryRequestConfig.folderName ? galleryRequestConfig.folderName : "";
            this.pageHeader = galleryRequestConfig.pageHeader ? galleryRequestConfig.pageHeader : "";
            this.items = galleryRequestConfig.items ? galleryRequestConfig.items.map(item => new ImageFile(item)) : [];
        } else {
            this.baseUrl = "";
            this.folderName = "";
            this.pageHeader = "";
            this.items = [];
        }
    }
}

export default GalleryRequestConfig;