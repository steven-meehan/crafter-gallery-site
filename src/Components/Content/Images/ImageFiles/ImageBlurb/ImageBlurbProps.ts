import Paragraph from "../../../../../Models/Paragraph";

class ImageBlurbProps {
    description: Paragraph[] = [];
    imageFileName: string = "";
    blurbCssClasses: string = "";

    constructor(imageBlurbProps?: {
        description: Paragraph[],
        imageFileName: string,
        blurbCssClasses: string
    }){
        if(imageBlurbProps){
            this.description = imageBlurbProps.description ? imageBlurbProps.description.map(item=> new Paragraph(item)) : [];
            this.imageFileName = imageBlurbProps.imageFileName ? imageBlurbProps.imageFileName : "";
            this.blurbCssClasses = imageBlurbProps.blurbCssClasses ? imageBlurbProps.blurbCssClasses : "";
        } else {
            this.description = [];
            this.imageFileName = "";
            this.blurbCssClasses = "";
        }
    }
}

export default ImageBlurbProps;
