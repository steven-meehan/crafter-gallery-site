import ColumnPosition from './ColumnPosition';
import ComponentType from './ComponentType';
import ParagraphData from '../../ParagraphData';
import ImageData from '../../Images/ImageData';
import type ImageSlider from './ImageSlider';

interface Component {
  active: boolean;
  row: number;
  order: number;
  columnPosition: ColumnPosition;
  componentType: ComponentType;
  paragraphs?: ParagraphData[];
  imageFiles?: ImageData[];
  imageSlider?: ImageSlider;
}

export default Component;
