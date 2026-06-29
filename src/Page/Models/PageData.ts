import type Component from './Component';
import type Layout from './Layout';

interface PageData {
  name: string;
  header: string;
  layout: Layout;
  components: Component[];
}

export default PageData;
