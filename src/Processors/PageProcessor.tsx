import PageData from "../Models/DataFiles/PageData/PageData";
import ComponentType from "../Models/DataFiles/PageData/ComponentType";
import ImageData from '../Models/ImageData';
import PageComponent from '../Models/DataFiles/PageData/PageComponent';
import InfoProcessor from './InfoProcessor';
import ImageProcessor from "./ImageProcessor";

class PageProcessor {
    static PrepareDataFile(pageData: PageData): PageComponent[]{
        const components: PageComponent[] = [];

        for (const item in pageData.components) {
            const component = pageData.components[item];

            if(component.active){
                switch (component.componentType) {
                    case ComponentType.Info:
                        const infoComponent = InfoProcessor.PrepareInfoComponent(
                            component, 
                            pageData.name);
                        
                        components.push({
                            jsxElement: infoComponent,
                            componentRow: component.row,
                            componentPosition: component.columnPosition
                        });

                        break;

                    case ComponentType.Image:

                        const images: ImageData[] = [];
            
                        if(component.imageFiles!.length >= 1) {
                            for (const imageFile in component.imageFiles!) {
                                const image = component.imageFiles[imageFile];
            
                                images.push({
                                    fileName: image.fileName,
                                    htmlTitle: image.htmlTitle,
                                    htmlAltText: image.htmlAltText,
                                    landscape: image.landscape ? true : false,
                                    description: image.description ? image.description : undefined,
                                    externalUrl: image.externalUrl,
                                    htmlLinkTitle: image.htmlLinkTitle ? image.htmlLinkTitle : "",
                                    imageUrl: image.imageUrl,
                                    isLink: image.isLink ? true : false
                                });
                            }
            
                            const imageComponent = ImageProcessor.PrepareImageComponent(
                                component,
                                images, 
                                pageData.name);
            
                            if(imageComponent){
                                components.push({
                                    jsxElement: imageComponent,
                                    componentRow: component.row,
                                    componentPosition: component.columnPosition
                                });
                            }
                        }

                        break;

                    default:
                        break;
                }
            }
        } 

        return components;
    }
}

export default PageProcessor;
