import ImageData from "../../ImageData";

class SiteImageProps {
    image: ImageData = new ImageData();
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

    constructor(siteImageProps?: {
        image: ImageData
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
        if(siteImageProps){
            this.image = siteImageProps.image ? new ImageData(siteImageProps.image) : new ImageData();
            this.title = siteImageProps.title ? siteImageProps.title : "";
            this.isThumbnail = siteImageProps.isThumbnail ? siteImageProps.isThumbnail : false;
            this.isStandAlone = siteImageProps.isStandAlone ? siteImageProps.isStandAlone : false;
            this.blurbCssClasses = siteImageProps.blurbCssClasses ? siteImageProps.blurbCssClasses : "";
            this.classes = siteImageProps.classes ? siteImageProps.classes : "";
            this.displayBlurb = siteImageProps.displayBlurb ? siteImageProps.displayBlurb : false;
            this.displayTitle = siteImageProps.displayTitle ? siteImageProps.displayTitle : false;
            this.imageWidth = siteImageProps.imageWidth ? siteImageProps.imageWidth : "";
            this.isContentInternal = siteImageProps.isContentInternal ? siteImageProps.isContentInternal : false;
            this.linkImageToContent = siteImageProps.linkImageToContent ? siteImageProps.linkImageToContent : false;
            this.linkTitle = siteImageProps.linkTitle ? siteImageProps.linkTitle : "";
            this.linkToLargerVersion = siteImageProps.linkToLargerVersion ? siteImageProps.linkToLargerVersion : false;
            this.marginTop = siteImageProps.marginTop ? siteImageProps.marginTop : false;
            this.setHelmetInfo = siteImageProps.setHelmetInfo ? siteImageProps.setHelmetInfo : false;
            this.titleBlurbCssClasses = siteImageProps.titleBlurbCssClasses ? siteImageProps.titleBlurbCssClasses : "";
            this.urlForLinkedContent = siteImageProps.urlForLinkedContent ? siteImageProps.urlForLinkedContent : "";
        } else {
            this.image = new ImageData();
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

export default SiteImageProps;
