import Paragraph from "./Paragraph";

class ImageFile {
    htmlTitle: string = "";
    htmlAltText: string = "";
    fileName: string = "";
    externalUrl?: string = "";
    htmlLinkTitle?: string = "";
    landscape: boolean = false;
    imageUrl?: string = "";
    description?: Paragraph[];
    fullDescription?: string = "";
    
    constructor(imageFile?: {
        htmlTitle: string,
        htmlAltText: string,
        fileName: string,
        externalUrl?: string,
        htmlLinkTitle?: string,
        landscape: boolean,
        imageUrl?: string,
        description?: Paragraph[]
    }){
        if(imageFile){
            this.htmlTitle = imageFile.htmlTitle ? imageFile.htmlTitle : "";
            this.htmlAltText = imageFile.htmlAltText ? imageFile.htmlAltText : "";
            this.fileName = imageFile.fileName ? imageFile.fileName : "";
            this.externalUrl = imageFile.externalUrl ? imageFile.externalUrl : "";
            this.htmlLinkTitle = imageFile.htmlLinkTitle ? imageFile.htmlLinkTitle : "";
            this.landscape = imageFile.landscape ? imageFile.landscape : false;
            this.imageUrl = imageFile.imageUrl ? imageFile.imageUrl : "";
            this.description = imageFile.description ? imageFile.description.map(item => new Paragraph(item)) : [];
            this.fullDescription = imageFile.description ? imageFile.description.map(item => `${item.text} `).join('') : "";
        } else {
            this.htmlTitle = "";
            this.htmlAltText = "";
            this.fileName = "";
            this.externalUrl = "";
            this.htmlLinkTitle = "";
            this.landscape = false;
            this.imageUrl = "";
            this.description = [];
            this.fullDescription = "";
        }
    }
}

export default ImageFile;