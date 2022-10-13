import React, { Fragment } from 'react';

import HelmetSettings from '../../../../Structure/Helmet/HelmetSettings';
import HtmlTitle from '../HtmlTitle/HtmlTitle';
import ProcessedImage from '../ProcessedImage/ProcessedImage';
import ImageBlurb from '../ImageBlurb/ImageBlurb';
import ImageProps from './ImageProps';

import seoData from '../../../../../ConfigurationFiles/seo-config.json';
import classes from './Image.module.css';

const Image: React.FC<ImageProps> = (props) => {
    const seoSiteInfo = seoData.site;
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
    const marginTop = props.marginTop ? true : false;
    const linkToLargerVersion = props.linkToLargerVersion ? true : false;

    const image = props.image;

    const processedImage = (
        <ProcessedImage
            linkImageToContent={linkImageToContent}
            isContentInternal={isContentInternal}
            urlForLinkedContent={urlForLinkedContent}
            imageCssClasses={imageCssClasses}
            imageUrl={image.imageUrl ? image.imageUrl : ""}
            htmlAltText={image.htmlAltText}
            linkTitle={linkTitle}
            externalUrl={image.externalUrl ? image.externalUrl : ""}
            htmlTitle={image.htmlTitle}
            landscape={image.landscape}
            imageWidth={imageWidth} />
    );

    return (
        <Fragment>
            <Fragment>
                {!isThumbnail && (
                    <Fragment>
                        {displayTitle && 
                            <HtmlTitle
                                titleClasses={`${titleBlurbCssClasses} row justify-content-center`}
                                title={title}
                                htmlTitle={image.htmlTitle} />
                        }
                        <div
                            className={`row justify-content-center ${isStandAlone ? '' : 'mt-5'}`}>
                            <div className={`col ${marginTop ? 'mt-5' : ''}`}>
                                {processedImage}
                            </div>
                        </div>
                        {linkToLargerVersion && (
                            <div className={`row d-lg-none mt-3`}>
                                <a 
                                    href={`${image.imageUrl}`}
                                    target={`_blank`} >
                                    Full Size Image
                                </a>
                            </div>
                        )}
                        {displayBlurb && (
                            <div
                                className={`row justify-content-center mt-3`}>
                                <ImageBlurb 
                                    description={image.description ? image.description : []} 
                                    imageFileName={image.fileName} 
                                    blurbCssClasses={blurbCssClasses} />
                            </div>
                        )}
                    </Fragment>
                )}
                {isThumbnail && processedImage}
            </Fragment>
            {renderHelmetInfo && (
                <HelmetSettings 
                    helmetConfiguration={{
                        page: window.location.href,
                        title: image.htmlTitle,
                        description: image.fullDescription ? image.fullDescription : "",
                        imageUrl: image.imageUrl!,
                        imageAltText: image.htmlAltText,
                        errorPage: false
                    }} 
                    seoSiteUrl={seoSiteInfo} />
            )}
        </Fragment>
    );
}

export default Image;
