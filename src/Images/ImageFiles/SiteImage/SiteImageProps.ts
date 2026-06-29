import type ImageData from '../../ImageData';

interface SiteImageProps {
  image: ImageData;
  title: string;
  isThumbnail: boolean;
  isStandAlone: boolean;
  blurbCssClasses?: string;
  classes?: string;
  displayBlurb?: boolean;
  displayTitle?: boolean;
  imageWidth?: string;
  isContentInternal?: boolean;
  linkImageToContent?: boolean;
  linkTitle?: string;
  linkToLargerVersion?: boolean;
  marginTop?: boolean;
  setHelmetInfo?: boolean;
  titleBlurbCssClasses?: string;
  urlForLinkedContent?: string;
}

export default SiteImageProps;
