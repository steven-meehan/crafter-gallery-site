import HelmetHttpStatusCode from "./HelmetHttpStatusCode";

interface HelmetConfiguration {
  title: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
  imageWidth?: number;
  imageHeight?: number;
  errorPage: boolean;
  httpStatusCode?: HelmetHttpStatusCode;
}

export default HelmetConfiguration;
