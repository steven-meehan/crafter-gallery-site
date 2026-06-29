import SliderButtonLocations from './SliderButton/SliderButtonLocations';
import ImageData from '../ImageData';

interface ImageSliderProps {
  images: ImageData[];
  classes?: string;
  autoTransition?: boolean;
  autoTransitionTimer?: number;
  startWithImage?: boolean;
  initialImage?: string;
  defaultPage?: string;
  isThumbnailBar?: boolean;
  disableTitle?: boolean;
  imageSize?: string;
  marginTop?: boolean;
  sliderButtonLocations?: SliderButtonLocations;
  scrollToTopOnClick?: boolean;
  linkToLargerVersion?: boolean;
  setHelmetInfo?: boolean;
  renderImageUrls?: boolean;
}

export default ImageSliderProps;
