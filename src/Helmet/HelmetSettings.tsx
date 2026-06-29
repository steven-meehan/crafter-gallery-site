import { Helmet } from "react-helmet-async";
import HelmetHttpStatusCode from "./HelmetHttpStatusCode";
import HelmetSettingsProps from "./HelmetSettingsProps";

const HelmetSettings: React.FC<HelmetSettingsProps> = ({ helmetConfiguration: c, seoSiteName }) => {
    return (
        <Helmet>
            <title>{c.title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content={c.description} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={seoSiteName} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={c.title} />
            <meta property="og:description" content={c.description} />
            <meta property="og:image" content={c.imageUrl} />
            <meta property="og:image:alt" content={c.imageAltText} />
            {c.imageWidth  && <meta property="og:image:width"  content={String(c.imageWidth)} />}
            {c.imageHeight && <meta property="og:image:height" content={String(c.imageHeight)} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={c.title} />
            <meta name="twitter:description" content={c.description} />
            <meta name="twitter:image" content={c.imageUrl} />
            <meta name="twitter:image:alt" content={c.imageAltText} />

            {c.errorPage && c.httpStatusCode === HelmetHttpStatusCode.NotFound && <meta name="prerender-status-code" content="404" />}
            {c.errorPage && c.httpStatusCode === HelmetHttpStatusCode.Error && <meta name="prerender-status-code" content="500" />}
        </Helmet>
    );
}

export default HelmetSettings;
