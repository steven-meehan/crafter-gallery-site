import Description from "./Description";

class ImageFile {
    title: string = "";
    altText: string = "";
    fileName: string = "";
    order: number = 0;
    url: string = "";
    externalLink: string = "";
    landscape: boolean = false;
    description: Description = new Description();

    constructor(imageFile?: {
        title: string,
        altText: string,
        fileName: string,
        order: number,
        url: string;
        externalLink: string,
        landscape: boolean,
        description: Description
    }){
        if(imageFile){
            this.title = imageFile.title ? imageFile.title : "";
            this.altText = imageFile.altText ? imageFile.altText : "";
            this.fileName = imageFile.fileName ? imageFile.fileName : "";
            this.order = imageFile.order ? imageFile.order : 0;
            this.url = imageFile.url ? imageFile.url : "";
            this.externalLink = imageFile.externalLink ? imageFile.externalLink : "";
            this.landscape = imageFile.landscape ? imageFile.landscape : false;
            this.description = imageFile.description ? imageFile.description : new Description();
        } else {
            this.title = "";
            this.altText = "";
            this.fileName = "";
            this.order = 0;
            this.url = "";
            this.externalLink = "";
            this.landscape = false;
            this.description = new Description();
        }
    }
}

export default ImageFile;