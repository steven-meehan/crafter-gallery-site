import React from 'react';

import SliderButtonsProps from './SliderButtonProps'

import classes from './SliderButton.module.css';
import SliderButtonDirection from './SliderButtonDirection';

const SliderButtons: React.FC<SliderButtonsProps> = (props) => {
    const arrowIcon = props.arrowIcon;
    const arrowDirection = props.arrowDirection;
    const columnSize = props.columnSize;
    const scroll = props.scroll ? true : false;
    const largerMainButtonSpacer = props.largerMainButtonSpacer ? true : false;
    const handleClick = props.handleClick;
    
    return (
        <div
            className={`
                ${columnSize} 
                ${arrowDirection === SliderButtonDirection.Right ? classes.rightArrow : classes.leftArrow} 
                ${props.classes ? props.classes : ""} 
                ${largerMainButtonSpacer ? classes.largerMainImageSliderButtonSpacer : classes.defaultMainImageSliderButtonSpacer }
            `} 
            onClick={() => handleClick(scroll)} >
            <i className={`${arrowIcon}-${arrowDirection}`}></i>
        </div>
    );
}

export default SliderButtons;