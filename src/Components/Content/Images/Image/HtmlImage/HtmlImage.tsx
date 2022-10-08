import React from 'react';

import HtmlImageProps from './HtmlImageProps';
import ImageExternalLinkConstants from '../../../../../Models/ConfigurationFiles/ImageExternalLinkConstants';

import data from '../../../../../ConfigurationFiles/imageExternalLinks.json';
import classes from './HtmlImage.module.css';

const HtmlImage: React.FC<HtmlImageProps> = (props) => {
    const imageExternalLinkConstants = data as ImageExternalLinkConstants;
    const store = imageExternalLinkConstants.store;
    const form = imageExternalLinkConstants.form;

    const imageCssClasses = props.imageCssClasses ? props.imageCssClasses : "";
    const imageUrl = props.imageUrl ? props.imageUrl : "";
    const htmlAltText = props.htmlAltText ? props.htmlAltText : "";
    const isLink = props.isLink ? true : false;
    const linkTitle = props.linkTitle ? props.linkTitle : "";
    const externalUrl = props.externalUrl ? props.externalUrl : "";
    const htmlTitle = props.htmlTitle ? props.htmlTitle : "";
    const landscape = props.landscape ? true : false;
    const imageWidth = props.imageWidth ? props.imageWidth : "";

    return (
        <img
            src={imageUrl}
            alt={htmlAltText}
            loading="eager"
            title={
                isLink ? (
                    linkTitle ? linkTitle :
                    (externalUrl && externalUrl.includes(`${store.key}`)) ? `${store.linkText1} ${htmlTitle} ${store.linkText2}` : 
                    (externalUrl && externalUrl.includes(`${form.key}`)) ? `${form.linkText1} ${htmlTitle} ${form.linkText2}` : 
                    'Click for a better look at ' + htmlTitle
                ) : (
                    htmlTitle
                )
            }
            className={`${imageCssClasses} ${landscape ? classes.landscapeImage : classes.portraitImage}`} 
            style={imageWidth ? { width:imageWidth } : {}} />
    )
}

export default HtmlImage;
