import Alignment from "./Alignment";

class ParagraphData {
    display: boolean = false;
    header: boolean = false;
    emphasis: boolean = false;
    text: string = "";
    alignment: Alignment = Alignment.Left;
    
    constructor(paragraphData?: {
        display: boolean,
        header: boolean,
        emphasis: boolean,
        text: string,
        alignment: Alignment
    }){
        if(paragraphData){
            this.display = paragraphData.display ? paragraphData.display : false;
            this.header = paragraphData.header ? paragraphData.header : false;
            this.emphasis = paragraphData.emphasis ? paragraphData.emphasis : false;
            this.text = paragraphData.text ? paragraphData.text : "";
            this.alignment = paragraphData.alignment ?  paragraphData.alignment : Alignment.Left;
        } else {
            this.display = false;
            this.header = false;
            this.emphasis = false;
            this.text = "";
            this.alignment = Alignment.Left;
        }
    }
}

export default ParagraphData;