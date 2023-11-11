import Paragraph from "./ParagraphData";

class ImageData {
    fileName: string = "";
    htmlTitle: string = "";
    htmlAltText: string = "";
    landscape: boolean = false;
    description?: Paragraph[];
    externalUrl?: string = "";
    fullDescription?: string = "";
    htmlLinkTitle?: string = "";
    imageUrl?: string = "";
    isLink?: boolean = false;
    
    constructor(imageData?: {
        fileName: string,
        htmlTitle: string,
        htmlAltText: string,
        landscape: boolean,
        description?: Paragraph[],
        externalUrl?: string,
        htmlLinkTitle?: string,
        imageUrl?: string,
        isLink?: boolean
    }){
        if(imageData){
            this.fileName = imageData.fileName ? imageData.fileName : "";
            this.htmlTitle = imageData.htmlTitle ? imageData.htmlTitle : "";
            this.htmlAltText = imageData.htmlAltText ? imageData.htmlAltText : "";
            this.landscape = imageData.landscape ? true : false;
            this.description = imageData.description ? imageData.description.map(item => new Paragraph(item)) : [];
            this.externalUrl = imageData.externalUrl ? imageData.externalUrl : "";
            this.fullDescription = imageData.description ? imageData.description.map(item => `${item.text} `).join('') : "";
            this.htmlLinkTitle = imageData.htmlLinkTitle ? imageData.htmlLinkTitle : "";
            this.imageUrl = imageData.imageUrl ? imageData.imageUrl : "";
            this.isLink = imageData.isLink ? true : false;
        } else {
            this.fileName = "";
            this.htmlTitle = "";
            this.htmlAltText = "";
            this.landscape = false;
            this.description = [];
            this.externalUrl = "";
            this.fullDescription = "";
            this.htmlLinkTitle = "";
            this.imageUrl = "";
            this.isLink = false;
        }
    }
}

export default ImageData;
