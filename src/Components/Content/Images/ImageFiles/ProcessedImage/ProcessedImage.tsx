import React from 'react';
import { Link } from 'react-router-dom';

import HtmlImage from '../HtmlImage/HtmlImage';
import ProcessedImageProps from './ProcessedImageProps';

import classes from './ProcessedImage.module.css';

const ProcessedImage: React.FC<ProcessedImageProps> = (props) => {
    const linkImageToContent = props.linkImageToContent ? props.linkImageToContent : false;
    const isContentInternal = props.isContentInternal ? props.isContentInternal : false;
    const urlForLinkedContent = props.urlForLinkedContent ? props.urlForLinkedContent : "";

    const imageCssClasses = props.imageCssClasses ? props.imageCssClasses : "";
    const imageUrl = props.imageUrl ? props.imageUrl : "";
    const htmlAltText = props.htmlAltText ? props.htmlAltText : "";
    const linkTitle = props.linkTitle ? props.linkTitle : "";
    const externalUrl = props.externalUrl ? props.externalUrl : "";
    const htmlTitle = props.htmlTitle ? props.htmlTitle : "";
    const landscape = props.landscape ? props.landscape : false;
    const imageWidth = props.imageWidth ? props.imageWidth : "";

    const htmlImage = (
        <HtmlImage
            imageCssClasses= {imageCssClasses} 
            imageUrl= {imageUrl} 
            htmlAltText= {htmlAltText} 
            isLink= {linkImageToContent}
            linkTitle= {linkTitle} 
            externalUrl= {externalUrl} 
            htmlTitle= {htmlTitle} 
            landscape= {landscape} 
            imageWidth= {imageWidth} />
    );

    return (
        linkImageToContent ? 
        isContentInternal ? (
            <Link 
                to={`${urlForLinkedContent}`} >
                {htmlImage}
            </Link>
        ) : (
            <a 
                href={`${urlForLinkedContent}`}
                target={`_blank`} >
                {htmlImage}
            </a>
        ) : (
            <div>
                {htmlImage}
            </div>
        )
    )
}

export default ProcessedImage;
