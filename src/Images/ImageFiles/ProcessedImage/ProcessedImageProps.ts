class ProcessedImageProps {
    linkImageToContent: boolean = false;
    isContentInternal: boolean = false;
    urlForLinkedContent: string = "";
    imageCssClasses: string = "";
    imageUrl: string = "";
    htmlAltText: string = "";
    linkTitle: string = "";
    externalUrl: string = "";
    htmlTitle: string = "";
    landscape: boolean = false;
    imageWidth: string = "";

    constructor(processedImageProps?: {
        linkImageToContent: boolean,
        isContentInternal: boolean,
        urlForLinkedContent: string,
        imageCssClasses: string,
        imageUrl: string,
        htmlAltText: string,
        linkTitle: string,
        externalUrl: string,
        htmlTitle: string,
        landscape: boolean,
        imageWidth: string
    }){
        if(processedImageProps){
            this.linkImageToContent = processedImageProps.linkImageToContent ? processedImageProps.linkImageToContent : false;
            this.isContentInternal = processedImageProps.isContentInternal ? processedImageProps.isContentInternal : false;
            this.urlForLinkedContent = processedImageProps.urlForLinkedContent ? processedImageProps.urlForLinkedContent : "";
            this.imageCssClasses = processedImageProps.imageCssClasses ? processedImageProps.imageCssClasses : "";
            this.imageUrl = processedImageProps.imageUrl ? processedImageProps.imageUrl : "";
            this.htmlAltText = processedImageProps.htmlAltText ? processedImageProps.htmlAltText : "";
            this.linkTitle = processedImageProps.linkTitle ? processedImageProps.linkTitle : "";
            this.externalUrl = processedImageProps.externalUrl ? processedImageProps.externalUrl : "";
            this.htmlTitle = processedImageProps.htmlTitle ? processedImageProps.htmlTitle : "";
            this.landscape = processedImageProps.landscape ? processedImageProps.landscape : false;
            this.imageWidth = processedImageProps.imageWidth ? processedImageProps.imageWidth : "";
        } else {
            this.linkImageToContent = false;
            this.isContentInternal = false;
            this.urlForLinkedContent = "";
            this.imageCssClasses = "";
            this.imageUrl = "";
            this.htmlAltText = "";
            this.linkTitle = "";
            this.externalUrl = "";
            this.htmlTitle = "";
            this.landscape = false;
            this.imageWidth = "";
        }
    }
}

export default ProcessedImageProps;
