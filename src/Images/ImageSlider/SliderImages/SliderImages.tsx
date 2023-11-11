import React, { Fragment } from "react";

import SliderImagesProps from "./SliderImagesProps"
import SiteImage from '../../ImageFiles/SiteImage/SiteImage';

import classes from './SliderImages.module.css';

const SliderImages: React.FC<SliderImagesProps> = (props) => {
    const isThumbnailBar = props.isThumbnailBar ? true : false;
    const images = props.images ? props.images : [];
    const setHelmetInfo = props.setHelmetInfo ? true : false;
    const defaultPage = props.defaultPage ? props.defaultPage : "";
    const currentImageIndex = props.currentImageIndex ? props.currentImageIndex : 0;
    const imageSize = props.imageSize ? props.imageSize : "";
    const disableTitle = props.disableTitle ? true : false;
    const linkToLargerVersion = props.linkToLargerVersion ? true : false;

    const sliderImages = isThumbnailBar ? (
        <div
            className={`${classes.thumbnailBar}`}>
            {
                images.map((slide, index) => {
                    return (
                        <SiteImage 
                            key={`thumbnail-${index}`}
                            classes={classes.thumbnail}
                            image={slide}
                            setHelmetInfo={setHelmetInfo}
                            linkImageToContent={true}
                            isContentInternal={true}
                            urlForLinkedContent={`${defaultPage}${slide.fileName}`}
                            imageWidth={`80px`}
                            isThumbnail={true}
                            title={''}
                            isStandAlone={false} />
                        )
                    }
                )
            }
        </div>
    ) : images.map((slide, index) => {        
        return (
            <div 
                className={`${index === currentImageIndex ? 'slide active' : 'slide'}`}
                key={`main-image-${index}`} >
                {index === currentImageIndex && (
                    <SiteImage 
                        classes={classes.image}
                        image={slide}
                        setHelmetInfo={setHelmetInfo}
                        linkImageToContent={slide.isLink ? true : false}
                        isContentInternal={false}
                        linkTitle={slide.htmlLinkTitle}
                        urlForLinkedContent={`${slide.externalUrl && slide.externalUrl !== '' ? slide.externalUrl : slide.imageUrl}`}
                        imageWidth={imageSize}
                        displayBlurb={true}
                        displayTitle={!disableTitle}
                        title={``}
                        isThumbnail={false}
                        isStandAlone={false}
                        linkToLargerVersion={linkToLargerVersion} />
                )}
            </div>
    )});

    return (
        <Fragment>
            {sliderImages}
        </Fragment>
    )
}

export default SliderImages;