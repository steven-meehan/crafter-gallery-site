import type ImageData from '../../ImageData';

interface SliderImagesProps {
  images: ImageData[];
  classes?: string;
  isThumbnailBar?: boolean;
  setHelmetInfo?: boolean;
  defaultPage?: string;
  currentImageIndex?: number;
  imageSize?: string;
  disableTitle?: boolean;
  linkToLargerVersion?: boolean;
}

export default SliderImagesProps;
