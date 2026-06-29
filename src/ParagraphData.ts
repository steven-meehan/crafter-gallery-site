import type Alignment from './Alignment';

interface ParagraphData {
  display: boolean;
  header: boolean;
  emphasis: boolean;
  text: string;
  alignment: Alignment;
}

export default ParagraphData;
