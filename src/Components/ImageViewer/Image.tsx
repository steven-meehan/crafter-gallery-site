import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import classes from './Image.module.css';

const Image = (props) => {
    const imageCssClasses = `${props.classes ? props.classes : ''}`;
    const blurbCssClasses = `${props.blurbCssClasses ? props.blurbCssClasses : ''}`;
    const titleblurbCssClasses = `${props.titleblurbCssClasses ? props.titleblurbCssClasses : ''}`;

    const linkImageToContent = props.linkImageToContent ? true : false;
    const isContentInternal = props.isContentInternal ? true : false;
    const linkTitle = `${props.linkTitle ? props.linkTitle : ''}`;
    const urlForLinkedContent = `${props.urlForLinkedContent ? props.urlForLinkedContent : ''}`;

    const displayBlurb = props.displayBlurb ? true : false;
    const imageWidth = `${props.imageWidth ? `${props.imageWidth}` : ''}`;

    const displayTitle = props.displayTitle ? true : false;
    const title = `${props.title ? `${props.title}: ` : ''}`;

    const isThumbnail = props.isThumbnail ? true: false;
    const isStandAlone = props.isStandAlone ? true: false;

    const image = props.image;

    const htmlImage = (
        <img
            src={image.url}
            alt={image.altText}
            title={linkTitle ? 
                linkTitle : 
                image.externalLink && image.externalLink.includes('www.etsy.com') ? 
                    'Purchase ' + image.title + ' from my shop.' : image.externalLink && image.externalLink.includes('forms.gle') ?
                    'Request a custom order' :
                    'Click for a better look at ' + image.title }
            className={`${imageCssClasses} ${image.landscape ? classes.landscapeImage : classes.portraitImage}`} 
            style={imageWidth ? { width:imageWidth } : {}} />
    )
    const processedTitle = (
        <h1
            className={`${titleblurbCssClasses} row justify-content-center`} >
            <div className={`col ${classes.titleSection}`}>
                {title}<b><i>{image.title}</i></b>
            </div>
        </h1>
    )

    const blurb = image.description && 
        image.description.paragraphs && 
        image.description.paragraphs.filter((item) => {
        return item.active;
    }).sort((a, b) => {
        return a.order - b.order;
    }).map((item, index) => {
        return (
            <p
                key={`image-blurb-paragraph-${index}`}
                className={`${blurbCssClasses} ${classes.blurbParagraph} col-8`} >
                {parse(`
                    ${item.text}
                `)}
            </p>
        )
    });

    const processedImage = linkImageToContent ? 
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
            {htmlImage}
    );

    return (
        <Fragment>
            {displayTitle && !isThumbnail && processedTitle}
            {isThumbnail && processedImage}
            {!isThumbnail && (
                <div
                    className={`row justify-content-center ${isThumbnail || isStandAlone ? '' : 'mt-5'}`}>
                    {isThumbnail && processedImage}
                    {!isThumbnail && (
                        <div className={`col`}>
                            {processedImage}
                        </div>
                    )}
                </div>
            )}
            {displayBlurb && !isThumbnail && (
                <div
                    className={`${classes.blurbSection} row justify-content-center ${isThumbnail ? '' : 'mt-5'}`}>
                    {blurb}
                </div>
            )}
        </Fragment>
    );
}

export default Image;