class HtmlImageProps {
    imageCssClasses: string = "";
    imageUrl: string = "";
    htmlAltText: string = "";
    isLink: boolean = false;
    linkTitle: string = "";
    externalUrl: string = "";
    htmlTitle: string = "";
    landscape: boolean = false;
    imageWidth: string = "";

    constructor(htmlImageProps?: {
        imageCssClasses: string,
        imageUrl: string,
        htmlAltText: string,
        isLink: boolean,
        linkTitle: string,
        externalUrl: string,
        htmlTitle: string,
        landscape: boolean,
        imageWidth: string
    }){
        if(htmlImageProps){
            this.imageCssClasses = htmlImageProps.imageCssClasses ? htmlImageProps.imageCssClasses : "";
            this.imageUrl = htmlImageProps.imageUrl ? htmlImageProps.imageUrl : "";
            this.htmlAltText = htmlImageProps.htmlAltText ? htmlImageProps.htmlAltText : "";
            this.isLink = htmlImageProps.isLink ? true : false;
            this.linkTitle = htmlImageProps.linkTitle ? htmlImageProps.linkTitle : "";
            this.externalUrl = htmlImageProps.externalUrl ? htmlImageProps.externalUrl : "";
            this.htmlTitle = htmlImageProps.htmlTitle ? htmlImageProps.htmlTitle : "";
            this.landscape = htmlImageProps.landscape ? true : false;
            this.imageWidth = htmlImageProps.imageWidth ? htmlImageProps.imageWidth : "";
        } else {
            this.imageCssClasses = "";
            this.imageUrl = "";
            this.htmlAltText = "";
            this.isLink = false;
            this.linkTitle = "";
            this.externalUrl = "";
            this.htmlTitle = "";
            this.landscape = false;
            this.imageWidth = "";
        }
    }
}

export default HtmlImageProps;
