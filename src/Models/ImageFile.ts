import Paragraph from "./Paragraph";

class ImageFile {
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
    
    constructor(imageFile?: {
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
        if(imageFile){
            this.fileName = imageFile.fileName ? imageFile.fileName : "";
            this.htmlTitle = imageFile.htmlTitle ? imageFile.htmlTitle : "";
            this.htmlAltText = imageFile.htmlAltText ? imageFile.htmlAltText : "";
            this.landscape = imageFile.landscape ? true : false;
            this.description = imageFile.description ? imageFile.description.map(item => new Paragraph(item)) : [];
            this.externalUrl = imageFile.externalUrl ? imageFile.externalUrl : "";
            this.fullDescription = imageFile.description ? imageFile.description.map(item => `${item.text} `).join('') : "";
            this.htmlLinkTitle = imageFile.htmlLinkTitle ? imageFile.htmlLinkTitle : "";
            this.imageUrl = imageFile.imageUrl ? imageFile.imageUrl : "";
            this.isLink = imageFile.isLink ? true : false;
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

export default ImageFile;
