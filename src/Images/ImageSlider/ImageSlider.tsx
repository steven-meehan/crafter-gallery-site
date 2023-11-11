import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import ImageData from '../ImageData';
import ImageSliderProps from './ImageSliderProps'

import classes from './ImageSlider.module.css';
import SliderButtonLocations from './SliderButton/SliderButtonLocations';
import MobileSliderButtons from '../../Images/ImageSlider/MobileSlider/MobileSlider';

import HtmlImages from '../../Images/ImageSlider/SliderImages/SliderImages';
import SliderButtons from '../../Images/ImageSlider/SliderButton/SliderButton';
import SliderButtonDirection from '../../Images/ImageSlider/SliderButton/SliderButtonDirection';

const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const [ images, setImages ] = useState<ImageData[]>([]);
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
    const imageSize = `${props.imageSize ? props.imageSize : '100%'}`
    const marginTop = props.marginTop ? true : false;
    const sliderButtonLocations = props.sliderButtonLocations ? props.sliderButtonLocations : SliderButtonLocations.Bottom;
    const scrollToTopOnClick = props.scrollToTopOnClick ? true : false;
    const linkToLargerVersion = props.linkToLargerVersion ? true : false;
    
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
                nextSlideHandler(scrollToTopOnClick);
            }, autoTransitionTimer);
        
            return () => clearInterval(interval);
        }
    }, [startWithImage, startingImageIndex, autoTransition, autoTransitionTimer, currentImageIndex, localImages]);

    const prevSlideHandler = (scroll: boolean) =>{
        let newImageIndex = currentImageIndex === 0 ? imagesCount-1 : currentImageIndex - 1;
        changeSlide(newImageIndex, scroll);
    }

    const nextSlideHandler = (scroll: boolean) =>{
        let newImageIndex = currentImageIndex === imagesCount-1 ? 0 : currentImageIndex + 1;
        changeSlide(newImageIndex, scroll);
    }

    const changeSlide = (newImageIndex: number, scroll: boolean) => {
        if(scrollToTopOnClick && scroll){
            window.scrollTo(0,150);
        }

        if(renderImageUrls) {
            const redirectUrl = `${defaultPage}${images[newImageIndex].fileName}`; 
            navigate(redirectUrl);
        } else {
            setCurrentImageIndex(newImageIndex);
        }
    }

    return (
        <div className={`${imageSliderClasses}`}>
            {(sliderButtonLocations === SliderButtonLocations.Top || sliderButtonLocations === SliderButtonLocations.Both) &&
                <MobileSliderButtons 
                    isThumbnailBar={isThumbnailBar} 
                    arrowIcon={`${arrowIcon}`} 
                    scroll={true} 
                    handleLeftClick={prevSlideHandler} 
                    handleRightClick={nextSlideHandler} />
            }
            <div className={`row ${classes.imageSlider}`}>
                {!isThumbnailBar && (
                    <SliderButtons
                        arrowIcon={`${arrowIcon}`}
                        arrowDirection={SliderButtonDirection.Left}
                        classes={`d-none d-md-block`}
                        columnSize={`col-1`}
                        scroll={false}
                        handleClick={prevSlideHandler} />
                )}
                <div className={`col ${marginTop ? 'mt-5' : ''}`}>
                    <HtmlImages
                        images={images}
                        isThumbnailBar={isThumbnailBar}
                        setHelmetInfo={setHelmetInfo}
                        defaultPage={defaultPage}
                        currentImageIndex={currentImageIndex}
                        imageSize={imageSize}
                        disableTitle={disableTitle}
                        linkToLargerVersion={linkToLargerVersion} />
                </div>
                {!isThumbnailBar && (
                    <SliderButtons
                        arrowIcon={`${arrowIcon}`}
                        arrowDirection={SliderButtonDirection.Right}
                        classes={`d-none d-md-block`}
                        columnSize={`col-1`}
                        scroll={false}
                        handleClick={nextSlideHandler} />
                )}
            </div>
            {(sliderButtonLocations === SliderButtonLocations.Bottom || sliderButtonLocations === SliderButtonLocations.Both) &&
                <MobileSliderButtons 
                    isThumbnailBar={isThumbnailBar} 
                    arrowIcon={`${arrowIcon}`} 
                    scroll={true} 
                    handleLeftClick={prevSlideHandler} 
                    handleRightClick={nextSlideHandler} />
            }
        </div>
    );
}

export default ImageSlider;