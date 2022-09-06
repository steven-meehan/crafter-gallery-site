class Paragraph {
    order: number = 0;
    display: boolean = false;
    emphasis: boolean = false;
    text: string = "";
    alignment: string = "";

    constructor(item?: {
        order: number,
        display: boolean,
        emphasis: boolean,
        text: string,
        alignment: string
    }){
        if(item){
            this.order = item.order ? item.order : 0;
            this.display = item.display ? item.display : false;
            this.emphasis = item.emphasis ? item.emphasis : false;
            this.text = item.text ? item.text : "";
            this.alignment = item.alignment ? item.alignment : "left";
        } else {
            this.order = 0;
            this.display = false;
            this.emphasis = false;
            this.text = "left";
        }
    }
}

export default Paragraph;