import LinkConfig from "./LinkConfig";
import BackgroundColor from "./BackgroundColor";

class NavigationConfigFile {
    logoAltText: string = "";
    backgroundColor: BackgroundColor = BackgroundColor.Primary;
    togglerUsesPrimaryColor: boolean = false;
    links: LinkConfig[] = [];

    constructor(navigationConfigFile?: {
        logoAltText: string,
        backgroundColor: BackgroundColor,
        togglerUsesPrimaryColor: boolean,
        navigation: LinkConfig[]
    }){
        if(navigationConfigFile){
            this.links = navigationConfigFile.navigation ? navigationConfigFile.navigation.map(item => new LinkConfig(item)) : [];
            this.backgroundColor = navigationConfigFile.backgroundColor ? navigationConfigFile.backgroundColor : BackgroundColor.Primary;
            this.togglerUsesPrimaryColor = navigationConfigFile.togglerUsesPrimaryColor ? true : false;
            this.logoAltText = navigationConfigFile.logoAltText ? navigationConfigFile.logoAltText : "";
        } else {
            this.logoAltText = "";
            this.backgroundColor = BackgroundColor.Primary;
            this.togglerUsesPrimaryColor = false;
            this.links = [];
        }
    }
}

export default NavigationConfigFile;