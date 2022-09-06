import parse from 'html-react-parser';

import Info from "../../UI/Info/Info";
import Image from "../../ImageViewer/Image/Image";
import Component from '../../../Models/DataFiles/PageData/Component';
import ImageSlider from '../../ImageViewer/ImageSlider/ImageSlider';
import PageData from "../../../Models/DataFiles/PageData/PageData";
import ComponentType from "../../../Models/DataFiles/PageData/ComponentType";
import ImageFile from '../../../Models/ImageFile';
import PageComponent from '../../../Models/DataFiles/PageData/PageComponent';

import classes from './Page.module.css';

class PageProcessor {
    static PrepareDataFile(pageData: PageData): PageComponent[]{
        const components: PageComponent[] = [];

        for (const item in pageData.components) {
            const component = pageData.components[item];

            if(component.componentType === ComponentType.Info && component.active){

                const infoComponent = PrepareInfoComponent(
                    component, 
                    pageData.name);
                
                components.push({
                    jsxElement: infoComponent,
                    componentPosition: component.columnPosition
                });

            } else if(component.componentType === ComponentType.Image && component.active) {
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
                            landscape: image.landscape ? true : false,
                            description: image.description ? image.description : undefined
                        });
                    }

                    const imageComponent = PrepareImageComponent(
                        component,
                        images, 
                        pageData.name);

                    if(imageComponent){
                        components.push({
                            jsxElement: imageComponent,
                            componentPosition: component.columnPosition
                        });
                    }
                } 

            } 
        } 

        return components;
    }
}

export default PageProcessor;

const PrepareInfoComponent = (
    component: Component,
    pageName: string): JSX.Element =>{
    return (
        <Info
            key={`${pageName}-component-${component.order}`} 
            infoClasses={`${classes.centeredParagraphs}`} >
            {
                component.paragraphs!.map((item, index) => {
                    return (
                        <p
                            key={index} 
                            className={`${item.emphasis ? classes.emphasis : ''}`}
                            style={{
                                textAlign: item.alignment
                            }} >
                            {parse(`
                                ${item.text}
                            `)}
                        </p>
                    );
                })
            }
        </Info>
    );
}

const PrepareImageComponent = (
    component: Component,
    images: ImageFile[],
    pageName: string): JSX.Element | null => {
    return (
        images.length > 1 ? (
            <div
                key={`${pageName}-component-${component.order}`} 
                className={`${classes.centeredParagraphs}`}>
                {images.length > 0 && <ImageSlider 
                images={images}
                disableTitle={true}
                setHelmetInfo={false}
                autoTransition={component.imageSlider!.auto}
                autoTransitionTimer={component.imageSlider!.timer}
                imageSize={component.imageSlider!.size}
                arrowIcon={component.imageSlider!.arrowIcons} />}
            </div> 
        ) : images.length === 1 ? (
            <div
                key={`${pageName}-component-${component.order}`} 
                className={`${classes.centeredParagraphs}`}>
                {images.length === 1 && <Image 
                    image={images[0]}
                    setHelmetInfo={false}
                    linkImageToContent={true}
                    isContentInternal={false}
                    urlForLinkedContent={images[0].externalUrl && images[0].externalUrl !== '' ? images[0].externalUrl : images[0].imageUrl} 
                    imageWidth={component.imageSlider!.size}
                    displayBlurb={false}
                    displayTitle={false}
                    title={images[0].htmlTitle}
                    isThumbnail={false} 
                    isStandAlone={true} />}
            </div> 
        ) : null
    );
}
