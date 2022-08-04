import ImageFile from "../../../models/ImageFile";

class ImageProps {
    classes?: string = "";
    blurbCssClasses?: string = "";
    titleblurbCssClasses?: string = "";
    linkImageToContent?: boolean = false;
    isContentInternal?: boolean = false;
    linkTitle?: string = "";
    urlForLinkedContent?: string = "";
    displayBlurb?: boolean = false;
    imageWidth?: string = "";
    displayTitle?: boolean = false;
    title: string = "";
    isThumbnail: boolean = false;
    isStandAlone: boolean = false;
    image: ImageFile = new ImageFile();

    constructor(imageProps?: {
        classes?: string,
        blurbCssClasses?: string,
        titleblurbCssClasses?: string,
        linkImageToContent?: boolean,
        isContentInternal?: boolean,
        linkTitle?: string,
        urlForLinkedContent?: string,
        displayBlurb?: boolean,
        imageWidth?: string,
        displayTitle?: boolean,
        title: string,
        isThumbnail: boolean,
        isStandAlone: boolean,
        image: ImageFile,
    }){
        if(imageProps){
            this.classes = imageProps.classes ? imageProps.classes : "";
            this.blurbCssClasses = imageProps.blurbCssClasses ? imageProps.blurbCssClasses : "";
            this.titleblurbCssClasses = imageProps.titleblurbCssClasses ? imageProps.titleblurbCssClasses : "";
            this.linkImageToContent = imageProps.linkImageToContent ? imageProps.linkImageToContent : false;
            this.isContentInternal = imageProps.isContentInternal ? imageProps.isContentInternal : false;
            this.linkTitle = imageProps.linkTitle ? imageProps.linkTitle : "";
            this.urlForLinkedContent = imageProps.urlForLinkedContent ? imageProps.urlForLinkedContent : "";
            this.displayBlurb = imageProps.displayBlurb ? imageProps.displayBlurb : false;
            this.imageWidth = imageProps.imageWidth ? imageProps.imageWidth : "";
            this.displayTitle = imageProps.displayTitle ? imageProps.displayTitle : false;
            this.title = imageProps.title ? imageProps.title : "";
            this.isThumbnail = imageProps.isThumbnail ? imageProps.isThumbnail : false;
            this.isStandAlone = imageProps.isStandAlone ? imageProps.isStandAlone : false;
            this.image = imageProps.image ? new ImageFile(imageProps.image) : new ImageFile();
        } else {
            this.classes = "";
            this.blurbCssClasses = "";
            this.titleblurbCssClasses = "";
            this.linkImageToContent = false;
            this.isContentInternal = false;
            this.linkTitle = "";
            this.urlForLinkedContent = "";
            this.displayBlurb = false;
            this.imageWidth = "";
            this.displayTitle = false;
            this.title = "";
            this.isThumbnail = false;
            this.isStandAlone = false;
            this.image = new ImageFile();
        }
    }
}

export default ImageProps;