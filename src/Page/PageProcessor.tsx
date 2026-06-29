import type PageData from './Models/PageData';
import type PageComponent from './Models/PageComponent';
import ComponentType from './Models/ComponentType';
import prepareInfoComponent from '../Info/InfoProcessor';
import prepareImageComponent from '../Images/ImageProcessor';

function preparePageComponents(pageData: PageData): PageComponent[] {
  return pageData.components
    .filter(c => c.active)
    .flatMap(component => {
      switch (component.componentType) {
        case ComponentType.Info:
          return [{
            jsxElement: prepareInfoComponent(component, pageData.name),
            componentRow: component.row,
            componentPosition: component.columnPosition,
          }];

        case ComponentType.Image: {
          const images = component.imageFiles ?? [];
          if (images.length === 0) return [];
          const el = prepareImageComponent(component, images, pageData.name);
          if (!el) return [];
          return [{
            jsxElement: el,
            componentRow: component.row,
            componentPosition: component.columnPosition,
          }];
        }

        default:
          return [];
      }
    });
}

export default preparePageComponents;
