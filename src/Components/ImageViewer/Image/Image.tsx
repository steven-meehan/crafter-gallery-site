import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import ImageProps from './ImageProps';
import HelmetSettings from '../../Structure/Helmet/HelmetSettings';
import HelmetConfiguration from '../../../Models/ConfigurationFiles/HelmetConfiguration';

import seoData from '../../../ConfigurationFiles/seo-config.json';

import classes from './Image.module.css';

const seoSiteInfo = seoData.site;

const Image: React.FC<ImageProps>  = (props) => {
    const imageCssClasses = `${props.classes ? props.classes : ''}`;
    const blurbCssClasses = `${props.blurbCssClasses ? props.blurbCssClasses : ''}`;
    const titleBlurbCssClasses = `${props.titleBlurbCssClasses ? props.titleBlurbCssClasses : ''}`;

    const renderHelmetInfo = props.setHelmetInfo ? true : false;

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
            src={image.imageUrl}
            alt={image.htmlAltText}
            loading="eager"
            title={linkTitle ? 
                linkTitle : 
                image.externalUrl && image.externalUrl.includes('www.etsy.com') ? 
                    'Purchase ' + image.htmlTitle + ' from my shop.' : image.externalUrl && image.externalUrl.includes('forms.gle') ?
                    'Request a custom order' :
                    'Click for a better look at ' + image.htmlTitle }
            className={`${imageCssClasses} ${image.landscape ? classes.landscapeImage : classes.portraitImage}`} 
            style={imageWidth ? { width:imageWidth } : {}} />
    )

    const processedTitle = (
        <h1
            className={`${titleBlurbCssClasses} row justify-content-center`} >
            <div className={`col ${classes.titleSection}`}>
                {title}<b><i>{image.htmlTitle}</i></b>
            </div>
        </h1>
    )

    const blurb = image.description && 
        image.description && 
        image.description.filter((item) => {
        return item.display;
    }).map((item, index) => {
        return (
            <p
                key={`image-blurb-paragraph-${index}`}
                className={`${blurbCssClasses} ${classes.blurbParagraph} col-8`}
                style={{
                    textAlign: item.alignment === "left" ? "left" : item.alignment === "right" ? "right" : "center"
                }} >
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
            <div>
                {htmlImage}
            </div>
    );

    const helmetConfiguration: HelmetConfiguration = {
        page: window.location.href,
        title: image.htmlTitle,
        description: image.fullDescription ? image.fullDescription : "",
        imageUrl: image.imageUrl!,
        imageAltText: image.htmlAltText,
        errorPage: false
    }

    return (
        <Fragment>
            {renderHelmetInfo && (
                <HelmetSettings 
                    helmetConfiguration={helmetConfiguration} 
                    seoSiteUrl={seoSiteInfo} />
            )}

            <>{displayTitle && !isThumbnail && processedTitle}</>
            <>{isThumbnail && processedImage}</>
            <>{!isThumbnail && (
                <div
                    className={`row justify-content-center ${isThumbnail || isStandAlone ? '' : 'mt-5'}`}>
                    {isThumbnail && processedImage}
                    {!isThumbnail && (
                        <div className={`col`}>
                            {processedImage}
                        </div>
                    )}
                </div>
            )}</>
            <>{displayBlurb && !isThumbnail && (
                <div
                    className={`${classes.blurbSection} row justify-content-center ${isThumbnail ? '' : 'mt-5'}`}>
                    {blurb}
                </div>
            )}</>
        </Fragment>
    );
}

export default Image;