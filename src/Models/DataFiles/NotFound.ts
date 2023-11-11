import Paragraph from "../Paragraph";
import ImageData from "../ImageData";

class NotFound {
    paragraphs: Paragraph[] = [];
    image: ImageData = new ImageData();

    constructor(notFoundConfig?: {
        paragraphs: Paragraph[],
        image: ImageData
    }){
        if(notFoundConfig){
            this.paragraphs = notFoundConfig.paragraphs ? notFoundConfig.paragraphs.map(item => new Paragraph(item)) : [];
            this.image = notFoundConfig.image ? new ImageData(notFoundConfig.image) : new ImageData();
        } else {
            this.paragraphs = [];
            this.image = new ImageData();
        }
    }
}

export default NotFound;