import HelmetConfiguration from "../../../models/configs/HelmetConfiguration";

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