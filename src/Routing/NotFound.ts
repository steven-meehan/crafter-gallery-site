import ImageData from "../Images/ImageData";
import ParagraphData from "../ParagraphData/ParagraphData";

class NotFound {
    paragraphs: ParagraphData[] = [];
    image: ImageData = new ImageData();

    constructor(notFoundConfig?: {
        paragraphs: ParagraphData[],
        image: ImageData
    }){
        if(notFoundConfig){
            this.paragraphs = notFoundConfig.paragraphs ? notFoundConfig.paragraphs.map(item => new ParagraphData(item)) : [];
            this.image = notFoundConfig.image ? new ImageData(notFoundConfig.image) : new ImageData();
        } else {
            this.paragraphs = [];
            this.image = new ImageData();
        }
    }
}

export default NotFound;