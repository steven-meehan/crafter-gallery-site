import React from 'react';

import MobileSliderProps from './MobileSliderProps';
import SliderButtonDirection from '../SliderButton/SliderButtonDirection';
import SliderButton from '../SliderButton/SliderButton';

import classes from './MobileSlider.module.css';

const MobileSlider: React.FC<MobileSliderProps> = (props) => {
    const isThumbnailBar = props.isThumbnailBar ? true : false;
    const arrowIcon = props.arrowIcon;
    const scroll = props.scroll ? true : false;
    const handleLeftClick = props.handleLeftClick;
    const handleRightClick = props.handleRightClick;
    
    return (
        <div className={`row d-md-none ${props.classes ? props.classes : ""}`}>
            {!isThumbnailBar && (
                <SliderButton
                    arrowIcon={arrowIcon} 
                    arrowDirection={SliderButtonDirection.Left} 
                    columnSize={`col`}
                    scroll={scroll} 
                    handleClick={handleLeftClick} />
            )}
            {!isThumbnailBar && (
                <SliderButton
                    arrowIcon={arrowIcon} 
                    arrowDirection={SliderButtonDirection.Right} 
                    columnSize={`col`}
                    scroll={scroll} 
                    handleClick={handleRightClick} />
            )}
        </div>
    );
}

export default MobileSlider;