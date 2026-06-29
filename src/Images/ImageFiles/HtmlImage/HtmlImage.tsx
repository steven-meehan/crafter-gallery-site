import React from 'react';

import HtmlImageProps from './HtmlImageProps';

import classes from './HtmlImage.module.css';

const HtmlImage: React.FC<HtmlImageProps> = (props) => {
    const imageCssClasses = props.imageCssClasses ? props.imageCssClasses : "";
    const imageUrl = props.imageUrl ? props.imageUrl : "";
    const htmlAltText = props.htmlAltText ? props.htmlAltText : "";
    const isLink = props.isLink ? true : false;
    const linkTitle = props.linkTitle ? props.linkTitle : "";
    const htmlTitle = props.htmlTitle ? props.htmlTitle : "";
    const landscape = props.landscape ? true : false;
    const imageWidth = props.imageWidth ? props.imageWidth : "";

    return (
        <img
            src={imageUrl}
            alt={htmlAltText}
            loading="eager"
            title={isLink ? (linkTitle || `View ${htmlTitle}`) : (linkTitle || htmlTitle)}
            className={`${imageCssClasses} ${landscape ? classes.landscapeImage : classes.portraitImage}`}
            style={imageWidth ? { width: imageWidth } : {}}
        />
    );
}

export default HtmlImage;
