import { Helmet } from "react-helmet";

import HelmetSettingsProps from "./HelmetSettingsProps";

const HelmetSettings: React.FC<HelmetSettingsProps> = (props) => {
    
    return (
        <Helmet>
            <title>{props.helmetConfiguration.title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content={props.helmetConfiguration.description} />
            <meta property="og:title" content={props.helmetConfiguration.title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={props.helmetConfiguration.description} />
            <meta name="image" property="og:image" content={props.helmetConfiguration.imageUrl} />
            <meta property="og:image:url" content={props.helmetConfiguration.imageUrl} />
            <meta property="og:image:secure_url" content={props.helmetConfiguration.imageUrl} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content={props.seoSiteUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={props.helmetConfiguration.imageUrl} />
            <meta name="twitter:image:alt" content={props.helmetConfiguration.imageAltText} />
            { props.helmetConfiguration.errorPage && <meta name='errorpage' content='true' /> }
            { props.helmetConfiguration.errorPage && <meta name='errortype' content='404 - Not Found' /> }
            { props.helmetConfiguration.errorPage && <meta name='prerender-status-code' content='404' /> }
        </Helmet>
    );
}

export default HelmetSettings;