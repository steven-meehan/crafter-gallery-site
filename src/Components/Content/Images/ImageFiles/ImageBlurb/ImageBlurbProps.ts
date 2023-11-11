import ParagraphData from "../../../../../Models/ParagraphData";

class ImageBlurbProps {
    description: ParagraphData[] = [];
    imageFileName: string = "";
    blurbCssClasses: string = "";

    constructor(imageBlurbProps?: {
        description: ParagraphData[],
        imageFileName: string,
        blurbCssClasses: string
    }){
        if(imageBlurbProps){
            this.description = imageBlurbProps.description ? imageBlurbProps.description.map(item=> new ParagraphData(item)) : [];
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
