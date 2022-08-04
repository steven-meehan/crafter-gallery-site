class Paragraph {
    order: number = 0;
    display: boolean = false;
    empahsis: boolean = false;
    text: string = "";
    alignment: string = "";

    constructor(item?: {
        order: number,
        display: boolean,
        empahsis: boolean,
        text: string,
        alignment: string
    }){
        if(item){
            this.order = item.order ? item.order : 0;
            this.display = item.display ? item.display : false;
            this.empahsis = item.empahsis ? item.empahsis : false;
            this.text = item.text ? item.text : "";
            this.alignment = item.alignment ? item.alignment : "left";
        } else {
            this.order = 0;
            this.display = false;
            this.empahsis = false;
            this.text = "left";
        }
    }
}

export default Paragraph;