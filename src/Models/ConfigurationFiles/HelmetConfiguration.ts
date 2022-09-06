class HelmetConfiguration {
    page: string = "";
    title: string = "";
    description: string = "";
    imageUrl: string = "";
    imageAltText: string = "";
    errorPage: boolean = false;

    constructor(helmetConfiguration?: {
        page: string,
        title: string,
        description: string,
        imageUrl: string,
        imageAltText: string,
        errorPage: boolean
    }){
        if(helmetConfiguration){
            this.page = helmetConfiguration.page ? helmetConfiguration.page : "";
            this.title = helmetConfiguration.title ? helmetConfiguration.title : "";
            this.description = helmetConfiguration.description ? helmetConfiguration.description : "";
            this.imageUrl = helmetConfiguration.imageUrl ? helmetConfiguration.imageUrl : "";
            this.imageAltText = helmetConfiguration.imageAltText ? helmetConfiguration.imageAltText : "";
            this.errorPage = helmetConfiguration.errorPage ? helmetConfiguration.errorPage : false;
        } else {
            this.page = "";
            this.title = "";
            this.description = "";
            this.imageUrl = "";
            this.imageAltText = "";
            this.errorPage = false;
        }
    }
}

export default HelmetConfiguration;