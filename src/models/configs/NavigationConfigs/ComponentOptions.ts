class ComponentOptions {
    configSettingFile: string = "";
    imagesObject: string = "";
    defaultPage: string = "";
    routeToNotFoundPage: boolean = false;
    fontAwesomeArrowIcons: string = "";

    constructor(componentOptions?: {
        configSettingFile: string,
        imagesObject: string,
        defaultPage: string,
        routeToNotFoundPage: boolean,
        fontAwesomeArrowIcons: string
    }){
        if(componentOptions){
            this.configSettingFile = componentOptions.configSettingFile ? componentOptions.configSettingFile : "";
            this.imagesObject = componentOptions.imagesObject ? componentOptions.imagesObject : "";
            this.defaultPage = componentOptions.defaultPage ? componentOptions.defaultPage : "";
            this.routeToNotFoundPage = componentOptions.routeToNotFoundPage ? componentOptions.routeToNotFoundPage : false;
            this.fontAwesomeArrowIcons = componentOptions.fontAwesomeArrowIcons ? componentOptions.fontAwesomeArrowIcons : "";
        } else {
            this.configSettingFile = "";
            this.imagesObject = "";
            this.defaultPage = "";
            this.routeToNotFoundPage = false;
            this.fontAwesomeArrowIcons = "";
        }
    }
}

export default ComponentOptions;