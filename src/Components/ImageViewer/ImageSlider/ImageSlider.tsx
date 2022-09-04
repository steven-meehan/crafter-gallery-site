import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../Image/Image';
import ImageFile from '../../../Models/ImageFile';
import ImageSliderProps from './ImageSliderProps'

import classes from './ImageSlider.module.css';

const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const [ images, setImages ] = useState<ImageFile[]>([]);
    const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
    const navigate = useNavigate();

    const imageSliderClasses = `${props.classes ? props.classes : ''}`;
    const imagesCount = props.images && props.images.length > 0 ? props.images.length : 0;
    const localImages = imagesCount > 0 ? props.images : null;

    const renderImageUrls = props.renderImageUrls && !props.autoTransition ? true : false;
    const autoTransition = props.autoTransition ? true : false;
    const autoTransitionTimer = props.autoTransitionTimer ? props.autoTransitionTimer : 60000;
    
    const startWithImage = props.startWithImage ? true : false;
    const initialImage = `${props.initialImage ? props.initialImage : ''}`;
    const startingImageIndex = props.images.findIndex((image) => {
        return image.fileName === initialImage;
    }) ;

    const arrowIcon = `${props.arrowIcon ? props.arrowIcon : 'fas fa-angle'}`
    const defaultPage = `${props.defaultPage ? props.defaultPage : ''}`;

    const isThumbnailBar = props.isThumbnailBar ? true : false;
    const disableTitle = props.disableTitle ? true : false;
    const setHelmetInfo = props.setHelmetInfo ? true : false;
    const imageSize = `${props.imageSize ? props.imageSize : '65%'}`
    
    useEffect(() => {
        
        if(localImages){
            setImages(localImages);
        }

        if(startWithImage){
            if(startingImageIndex < 0){
                setCurrentImageIndex(0);
            } else {
                setCurrentImageIndex(startingImageIndex);
            }
        }

        if(autoTransition){
            const interval = setInterval(() => {
                nextSlideHandler();
            }, autoTransitionTimer);
        
            return () => clearInterval(interval);
        }
    }, [startWithImage, startingImageIndex, autoTransition, autoTransitionTimer, currentImageIndex, localImages]);

    const prevSlideHandler = () =>{
        let newImageIndex = currentImageIndex === 0 ? imagesCount-1 : currentImageIndex - 1;
        if(renderImageUrls) {
            const redirectUrl = `${defaultPage}${images[newImageIndex].fileName}`; 
            navigate(redirectUrl);
        } else {
            setCurrentImageIndex(newImageIndex);
        }
    }

    const nextSlideHandler = () =>{
        let newImageIndex = currentImageIndex === imagesCount-1 ? 0 : currentImageIndex + 1;
        if(renderImageUrls) {
            const redirectUrl = `${defaultPage}${images[newImageIndex].fileName}`; 
            navigate(redirectUrl);
        } else {
            setCurrentImageIndex(newImageIndex);
        }
    }

    const htmlImages = isThumbnailBar ? (
        <div
            className={`${classes.thumbnailBar}`}>
            {
                images.map((slide, index) => {
                    return (
                        <Image 
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
                    <Image 
                        classes={classes.image}
                        image={slide}
                        setHelmetInfo={setHelmetInfo}
                        linkImageToContent={true}
                        isContentInternal={false}
                        urlForLinkedContent={`${slide.externalLink && slide.externalLink !== '' ? slide.externalLink : slide.url}`}
                        imageWidth={imageSize}
                        displayBlurb={true}
                        displayTitle={!disableTitle}
                        title={``}
                        isThumbnail={false}
                        isStandAlone={false} />
                )}
            </div>
        )
    });

    return (
        <div className={`${imageSliderClasses}`}>
            <div className={`row ${classes.imageSlider}`}>
                {!isThumbnailBar && (
                    <div className={`col-1 ${classes.leftArrow}`} onClick={prevSlideHandler}>
                        <i className={`${arrowIcon}-left`}></i>
                    </div>
                )}
                <div className={`col`}>
                    {htmlImages}
                </div>
                {!isThumbnailBar && (
                    <div className={`col-1 ${classes.rightArrow}`} onClick={nextSlideHandler}>
                        <i className={`${arrowIcon}-right`}></i>
                    </div>)
                }
            </div>
        </div>
    );
}

export default ImageSlider;