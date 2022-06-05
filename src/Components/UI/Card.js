import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
    const cardRounded = `${props.cardRounded ? classes.cardRounded : 
                            props.cardRoundedModerate ? classes.cardRoundedModerate :
                            props.cardRoundedHeavy ? classes.cardRoundedHeavy : ''}`;

    const cardHover = `${props.cardHover ? classes.cardHover : ''}`;

    const cardColoring = `${props.cardColor === 'light' ? classes.light : 
                            props.cardColor === 'medium' ? classes.medium : 
                            props.cardColor === 'dark' ? classes.dark : ''}`;

    const cardClasses = `${props.cardClasses ? props.cardClasses : ''} ${classes.card} ${cardColoring} ${cardHover} ${cardRounded}`;
    
    return (
        <div className={`${cardClasses}`}>{props.children}</div>
    );
};

export default Card;