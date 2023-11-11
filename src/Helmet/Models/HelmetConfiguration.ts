import HelmetHttpStatusCode from "./HelmetHttpStatusCode";

class HelmetConfiguration {
    page: string = "";
    title: string = "";
    description: string = "";
    imageUrl: string = "";
    imageAltText: string = "";
    errorPage: boolean = false;
    httpStatusCode?: HelmetHttpStatusCode = HelmetHttpStatusCode.Okay;

    constructor(helmetConfiguration?: {
        page: string,
        title: string,
        description: string,
        imageUrl: string,
        imageAltText: string,
        errorPage: boolean,
        httpStatusCode: HelmetHttpStatusCode
    }){
        if(helmetConfiguration){
            this.page = helmetConfiguration.page ? helmetConfiguration.page : "";
            this.title = helmetConfiguration.title ? helmetConfiguration.title : "";
            this.description = helmetConfiguration.description ? helmetConfiguration.description : "";
            this.imageUrl = helmetConfiguration.imageUrl ? helmetConfiguration.imageUrl : "";
            this.imageAltText = helmetConfiguration.imageAltText ? helmetConfiguration.imageAltText : "";
            this.errorPage = helmetConfiguration.errorPage ? helmetConfiguration.errorPage : false;
            this.httpStatusCode = helmetConfiguration.httpStatusCode ? helmetConfiguration.httpStatusCode : HelmetHttpStatusCode.Okay;
        } else {
            this.page = "";
            this.title = "";
            this.description = "";
            this.imageUrl = "";
            this.imageAltText = "";
            this.errorPage = false;
            this.httpStatusCode = HelmetHttpStatusCode.Okay;
        }
    }
}

export default HelmetConfiguration;