import ImageFile from "../../../../../Models/ImageFile";

class ImageProps {
    image: ImageFile = new ImageFile();
    title: string = "";
    isThumbnail: boolean = false;
    isStandAlone: boolean = false;
    blurbCssClasses?: string = "";
    classes?: string = "";
    displayBlurb?: boolean = false;
    displayTitle?: boolean = false;
    imageWidth?: string = "";
    isContentInternal?: boolean = false;
    linkImageToContent?: boolean = false;
    linkTitle?: string = "";
    linkToLargerVersion?: boolean = false;
    marginTop?: boolean = false;
    setHelmetInfo?: boolean = false;
    titleBlurbCssClasses?: string = "";
    urlForLinkedContent?: string = "";

    constructor(imageProps?: {
        image: ImageFile
        title: string,
        isThumbnail: boolean,
        isStandAlone: boolean,
        blurbCssClasses?: string,
        classes?: string,
        displayBlurb?: boolean,
        displayTitle?: boolean,
        imageWidth?: string,
        isContentInternal?: boolean,
        linkImageToContent?: boolean,
        linkTitle?: string,
        linkToLargerVersion?: boolean,
        marginTop?: boolean,
        setHelmetInfo?: boolean,
        titleBlurbCssClasses?: string,
        urlForLinkedContent?: string
    }){
        if(imageProps){
            this.image = imageProps.image ? new ImageFile(imageProps.image) : new ImageFile();
            this.title = imageProps.title ? imageProps.title : "";
            this.isThumbnail = imageProps.isThumbnail ? imageProps.isThumbnail : false;
            this.isStandAlone = imageProps.isStandAlone ? imageProps.isStandAlone : false;
            this.blurbCssClasses = imageProps.blurbCssClasses ? imageProps.blurbCssClasses : "";
            this.classes = imageProps.classes ? imageProps.classes : "";
            this.displayBlurb = imageProps.displayBlurb ? imageProps.displayBlurb : false;
            this.displayTitle = imageProps.displayTitle ? imageProps.displayTitle : false;
            this.imageWidth = imageProps.imageWidth ? imageProps.imageWidth : "";
            this.isContentInternal = imageProps.isContentInternal ? imageProps.isContentInternal : false;
            this.linkImageToContent = imageProps.linkImageToContent ? imageProps.linkImageToContent : false;
            this.linkTitle = imageProps.linkTitle ? imageProps.linkTitle : "";
            this.linkToLargerVersion = imageProps.linkToLargerVersion ? imageProps.linkToLargerVersion : false;
            this.marginTop = imageProps.marginTop ? imageProps.marginTop : false;
            this.setHelmetInfo = imageProps.setHelmetInfo ? imageProps.setHelmetInfo : false;
            this.titleBlurbCssClasses = imageProps.titleBlurbCssClasses ? imageProps.titleBlurbCssClasses : "";
            this.urlForLinkedContent = imageProps.urlForLinkedContent ? imageProps.urlForLinkedContent : "";
        } else {
            this.image = new ImageFile();
            this.title = "";
            this.isThumbnail = false;
            this.isStandAlone = false;
            this.blurbCssClasses = "";
            this.classes = "";
            this.displayBlurb = false;
            this.displayTitle = false;
            this.imageWidth = "";
            this.isContentInternal = false;
            this.linkImageToContent = false;
            this.linkTitle = "";
            this.linkToLargerVersion = false;
            this.marginTop = false;
            this.setHelmetInfo = false;
            this.titleBlurbCssClasses = "";
            this.urlForLinkedContent = "";
        }
    }
}

export default ImageProps;
