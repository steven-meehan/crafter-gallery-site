import React from 'react';

import HtmlTitleProps from './HtmlTitleProps';

import classes from './HtmlTitle.module.css';

const HtmlTitle: React.FC<HtmlTitleProps> = (props) => {
    const titleClasses = props.titleClasses ? props.titleClasses : "";
    const title = props.title ? props.title : "";
    const htmlTitle = props.htmlTitle ? props.htmlTitle : "";

    return (
        <h1
            className={`${titleClasses} row justify-content-center`} >
            <div className={`col ${classes.titleSection}`}>
                {title}<b><i>{htmlTitle}</i></b>
            </div>
        </h1>
    )
}

export default HtmlTitle;
