class HtmlTitleProps {
    titleClasses: string = "";
    title: string = "";
    htmlTitle: string = "";

    constructor(htmlTitleProps?: {
        titleClasses: string,
        title: string,
        htmlTitle: string
    }){
        if(htmlTitleProps){
            this.titleClasses = htmlTitleProps.titleClasses ? htmlTitleProps.titleClasses : "";
            this.title = htmlTitleProps.title ? htmlTitleProps.title : "";
            this.htmlTitle = htmlTitleProps.htmlTitle ? htmlTitleProps.htmlTitle : "";
        } else {
            this.titleClasses = "";
            this.title = "";
            this.htmlTitle = "";
        }
    }
}

export default HtmlTitleProps;
