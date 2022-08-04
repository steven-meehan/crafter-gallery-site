import NavigationConfig from "./NavigationConfig";

class NavigationConfigFile {
    navigation: NavigationConfig[] = []
    logoAltText: string = "";

    constructor(navigationConfigFile?: {
        navigation: NavigationConfig[],
        logoAltText: string
    }){
        if(navigationConfigFile){
            this.navigation = navigationConfigFile.navigation ? navigationConfigFile.navigation.map(item => new NavigationConfig(item)) : [];
            this.logoAltText = navigationConfigFile.logoAltText ? navigationConfigFile.logoAltText : "";
        } else {
            this.navigation = [];
            this.logoAltText = "";
        }
    }
}

export default NavigationConfigFile;