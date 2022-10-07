import PageData from "../Models/DataFiles/PageData/PageData";
import ComponentType from "../Models/DataFiles/PageData/ComponentType";
import ImageFile from '../Models/ImageFile';
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

                        const images: ImageFile[] = [];
            
                        if(component.imageFiles!.length >= 1) {
                            for (const imageFile in component.imageFiles!) {
                                const image = component.imageFiles[imageFile];
            
                                images.push({
                                    htmlTitle: image.htmlTitle,
                                    htmlAltText: image.htmlAltText,
                                    imageUrl: image.imageUrl,
                                    fileName: image.fileName,
                                    externalUrl: image.externalUrl,
                                    htmlLinkTitle: image.htmlLinkTitle ? image.htmlLinkTitle : "",
                                    landscape: image.landscape ? true : false,
                                    description: image.description ? image.description : undefined
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
