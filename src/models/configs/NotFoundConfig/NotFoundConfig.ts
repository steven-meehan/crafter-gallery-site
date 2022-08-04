import ImageFile from "../../ImageFile";
import Paragraph from "../../Paragraph";

class NotFoundConfig {
    paragraphs: Paragraph[] = [];
    image: ImageFile = new ImageFile();

    constructor(notFoundConfig?: {
        paragraphs: Paragraph[],
        image: ImageFile
    }){
        if(notFoundConfig){
            this.paragraphs = notFoundConfig.paragraphs ? notFoundConfig.paragraphs.map(item => new Paragraph(item)) : [];
            this.image = notFoundConfig.image ? new ImageFile(notFoundConfig.image) : new ImageFile();
        } else {
            this.paragraphs = [];
            this.image = new ImageFile();
        }
    }
}

export default NotFoundConfig;