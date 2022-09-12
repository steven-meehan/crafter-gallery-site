import LinkConfig from "./LinkConfig";
import BackgroundColor from "./BackgroundColor";

class NavigationConfigFile {
    logoAltText: string = "";
    backgroundColor: BackgroundColor = BackgroundColor.Primary;
    links: LinkConfig[] = [];

    constructor(navigationConfigFile?: {
        logoAltText: string,
        backgroundColor: BackgroundColor,
        navigation: LinkConfig[]
    }){
        if(navigationConfigFile){
            this.links = navigationConfigFile.navigation ? navigationConfigFile.navigation.map(item => new LinkConfig(item)) : [];
            this.backgroundColor = navigationConfigFile.backgroundColor ? navigationConfigFile.backgroundColor : BackgroundColor.Primary;
            this.logoAltText = navigationConfigFile.logoAltText ? navigationConfigFile.logoAltText : "";
        } else {
            this.logoAltText = "";
            this.backgroundColor = BackgroundColor.Primary;
            this.links = [];
        }
    }
}

export default NavigationConfigFile;