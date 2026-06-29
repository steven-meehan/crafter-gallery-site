import type ParagraphData from '../ParagraphData';

interface ImageData {
  fileName: string;
  htmlTitle: string;
  htmlAltText: string;
  landscape: boolean;
  description?: ParagraphData[];
  externalUrl?: string;
  htmlLinkTitle?: string;
  imageUrl?: string;
  isLink?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

export default ImageData;
