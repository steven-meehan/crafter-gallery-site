import Alignment from "./DataFiles/PageData/Alignment";

class Paragraph {
    display: boolean = false;
    header: boolean = false;
    emphasis: boolean = false;
    text: string = "";
    alignment: Alignment = Alignment.Left;
    
    constructor(paragraph?: {
        display: boolean,
        header: boolean,
        emphasis: boolean,
        text: string,
        alignment: Alignment
    }){
        if(paragraph){
            this.display = paragraph.display ? paragraph.display : false;
            this.header = paragraph.header ? paragraph.header : false;
            this.emphasis = paragraph.emphasis ? paragraph.emphasis : false;
            this.text = paragraph.text ? paragraph.text : "";
            this.alignment = paragraph.alignment ?  paragraph.alignment : Alignment.Left;
        } else {
            this.display = false;
            this.header = false;
            this.emphasis = false;
            this.text = "";
            this.alignment = Alignment.Left;
        }
    }
}

export default Paragraph;