import Image from "../Components/ImageViewer/Image/Image";
import Component from '../Models/DataFiles/PageData/Component';
import ImageSlider from '../Components/ImageViewer/ImageSlider/ImageSlider';
import ImageFile from '../Models/ImageFile';

import classes from '../Components/ImageViewer/Image/Image.module.css';

class ImageProcessor {

    static PrepareImageComponent = (
        component: Component,
        images: ImageFile[],
        pageName: string): JSX.Element | null => {
        return (
            images.length > 1 ? (
                <div
                    key={`${pageName}-image-component-${component.order}`} 
                    className={`${classes.centered}`}>
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
                    key={`${pageName}-image-component-${component.order}`} 
                    className={`${classes.centered}`}>
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

}

export default ImageProcessor;
