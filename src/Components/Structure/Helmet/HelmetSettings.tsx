import { Helmet } from "react-helmet";
import HelmetHttpStatusCode from "../../../Models/ConfigurationFiles/HelmetHttpStatusCode";

import HelmetSettingsProps from "./HelmetSettingsProps";

const HelmetSettings: React.FC<HelmetSettingsProps> = (props) => {
    const helmetConfig = props.helmetConfiguration;
    
    return (
        <Helmet>
            <title>{helmetConfig.title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content={helmetConfig.description} />
            <meta property="og:title" content={helmetConfig.title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={helmetConfig.description} />
            <meta name="image" property="og:image" content={helmetConfig.imageUrl} />
            <meta property="og:image:url" content={helmetConfig.imageUrl} />
            <meta property="og:image:secure_url" content={helmetConfig.imageUrl} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content={props.seoSiteUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={helmetConfig.imageUrl} />
            <meta name="twitter:image:alt" content={helmetConfig.imageAltText} />
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.NotFound && <meta name='errorpage' content='true' /> }
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.NotFound && <meta name='errortype' content='404 - Not Found' /> }
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.NotFound && <meta name='prerender-status-code' content='404' /> }
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.Error && <meta name='errorpage' content='true' /> }
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.Error && <meta name='errortype' content='500 - Internal Error' /> }
            { helmetConfig.errorPage && helmetConfig.httpStatusCode === HelmetHttpStatusCode.Error && <meta name='prerender-status-code' content='500' /> }
        </Helmet>
    );
}

export default HelmetSettings;