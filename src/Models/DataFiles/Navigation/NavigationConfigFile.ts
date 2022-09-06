import LinkConfig from "./LinkConfig";

class NavigationConfigFile {
    links: LinkConfig[] = []
    logoAltText: string = "";

    constructor(navigationConfigFile?: {
        navigation: LinkConfig[],
        logoAltText: string
    }){
        if(navigationConfigFile){
            this.links = navigationConfigFile.navigation ? navigationConfigFile.navigation.map(item => new LinkConfig(item)) : [];
            this.logoAltText = navigationConfigFile.logoAltText ? navigationConfigFile.logoAltText : "";
        } else {
            this.links = [];
            this.logoAltText = "";
        }
    }
}

export default NavigationConfigFile;