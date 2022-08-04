class NavigationConfig {
    url: string = "";
    id: string = "";
    order: number = 0;
    name: string = "";
    title: string = "";
    active: boolean = false;
    internalLink: boolean = false;
    social: boolean = false;
    icon: string = "";
    childLinks: NavigationConfig[] = [];

    constructor(navigationConfig?: {
        url: string,
        id: string,
        order: number,
        name: string,
        title: string,
        active: boolean,
        internalLink: boolean,
        social: boolean,
        icon: string,
        childLinks: NavigationConfig[]
    }){
        if(navigationConfig){
            this.url = navigationConfig.url ? navigationConfig.url : "";
            this.id = navigationConfig.id ? navigationConfig.id : "";
            this.order = navigationConfig.order ? navigationConfig.order : 0;
            this.name = navigationConfig.name ? navigationConfig.name : "";
            this.title = navigationConfig.title ? navigationConfig.title : "";
            this.active = navigationConfig.active ? navigationConfig.active : false;
            this.internalLink = navigationConfig.internalLink ? navigationConfig.internalLink : false;
            this.social = navigationConfig.social ? navigationConfig.social : false;
            this.icon = navigationConfig.icon ? navigationConfig.icon : "";
            this.childLinks = navigationConfig.childLinks ? navigationConfig.childLinks.map(item => new NavigationConfig(item)) : [];
        } else {
            this.url = "";
            this.id = "";
            this.order = 0;
            this.name = "";
            this.title = "";
            this.active = false;
            this.internalLink = false;
            this.social = false;
            this.icon = "";
            this.childLinks = [];
        }
    }
}

export default NavigationConfig;