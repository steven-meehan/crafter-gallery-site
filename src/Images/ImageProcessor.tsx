import Image from "./ImageFiles/SiteImage/SiteImage";
import Component from '../Page/Models//Component';
import ImageSlider from './ImageSlider/ImageSlider';
import ImageData from './ImageData';

import classes from '../Images/ImageFiles/SiteImage/SiteImage.module.css';

class ImageProcessor {

    static PrepareImageComponent = (
        component: Component,
        images: ImageData[],
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
                    marginTop={component.imageSlider!.marginTop}
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
                        linkImageToContent={images[0].isLink ? true : false}
                        isContentInternal={false}
                        urlForLinkedContent={images[0].externalUrl && images[0].externalUrl !== '' ? images[0].externalUrl : images[0].imageUrl} 
                        imageWidth={component.imageSlider!.size}
                        marginTop={component.imageSlider!.marginTop}
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
