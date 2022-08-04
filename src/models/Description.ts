import Paragraph from "./Paragraph";

class Description {
    paragraphs: Paragraph[] = [];

    constructor(paragraphs?: Paragraph[]){
        if(paragraphs){
            this.paragraphs = paragraphs.map(item => new Paragraph(item));
        } else {
            this.paragraphs = [];
        }
    }
}

export default Description;