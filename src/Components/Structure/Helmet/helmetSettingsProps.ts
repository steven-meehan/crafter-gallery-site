import HelmetConfiguration from "../../../Models/ConfigurationFiles/HelmetConfiguration";

class HelmetSettingsProps {
    seoSiteUrl: string = "";
    helmetConfiguration: HelmetConfiguration = {
        page: "",
        title: "",
        description: "",
        imageUrl: "",
        imageAltText: "",
        errorPage: false
    };
}

export default HelmetSettingsProps;