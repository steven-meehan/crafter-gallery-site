import React, { Fragment } from 'react';
import parse from 'html-react-parser';

import ImageBlurbProps from './ImageBlurbProps';

import classes from './ImageBlurb.module.css';

const ImageBlurb: React.FC<ImageBlurbProps> = (props) => {
    const description = props.description ? props.description : [];
    const imageFileName = props.imageFileName ? props.imageFileName : "";
    const blurbCssClasses = props.blurbCssClasses ? props.blurbCssClasses : "";

    return (
        <Fragment>
            {
                description && description.filter((item) => {
                    return item.display;
                }).map((item, index) => {
                    return (
                        <p
                            key={`${imageFileName}-blurb-paragraph-${index}`}
                            className={`${blurbCssClasses} ${classes.blurbSection} col-10`}
                            style={{
                                textAlign: item.alignment === "left" ? "left" : item.alignment === "right" ? "right" : "center"
                            }} >
                            {parse(`
                                ${item.text}
                            `)}
                        </p>
                    )
                })
            }            
        </Fragment>
    )
}

export default ImageBlurb;
