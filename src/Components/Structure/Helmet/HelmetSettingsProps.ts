import HelmetConfiguration from "../../../Models/ConfigurationFiles/HelmetConfiguration";

class HelmetSettingsProps {
    seoSiteUrl: string = "";
    helmetConfiguration: HelmetConfiguration = new HelmetConfiguration ();

    constructor(helmetSettingsProps?: {
        seoSiteUrl: string,
        helmetConfiguration: HelmetConfiguration 
    }){
        if(helmetSettingsProps){
            this.seoSiteUrl = helmetSettingsProps.seoSiteUrl ? helmetSettingsProps.seoSiteUrl : "";
            this.helmetConfiguration = helmetSettingsProps.helmetConfiguration ? helmetSettingsProps.helmetConfiguration : new HelmetConfiguration();
        } else {
            this.seoSiteUrl = "";
            this.helmetConfiguration = new HelmetConfiguration();
        }
    }
}

export default HelmetSettingsProps;