import React, { Fragment } from 'react';
import parse from 'html-react-parser';

import ErrorProps from './ErrorProps';
import HelmetSettings from '../../Helmet/HelmetSettings';
import HelmetHttpStatusCode from '../../Helmet/HelmetHttpStatusCode';

import classes from './Error.module.css';

import seoConfig from '../../ConfigFiles/seo-config.json';
import data from '../../ConfigFiles/errorPage.json';

const Error: React.FC<ErrorProps> = (props) => {
    const errors = props.errorMessages ? props.errorMessages : [];
    const seoInfo = seoConfig.pageSettings.find(item=>item.page==="error")!;

    return (
        <Fragment>
            <HelmetSettings 
                helmetConfiguration={{
                    page: window.location.href,
                    title: seoInfo.title,
                    description: seoInfo.description,
                    imageUrl: seoInfo.imageUrl!,
                    imageAltText: seoInfo.imageAltText,
                    errorPage: true,
                    httpStatusCode: HelmetHttpStatusCode.Error
                }} 
                seoSiteUrl={seoConfig.site} />
            <div className={`row`}>
                <div className={`col`}>
                    <h1 
                        className={`row justify-content-center`}>
                        {data.mainHeader}
                    </h1>
                    <h2 
                        className={`row justify-content-center`}>
                        {`${data.secondaryHeader} ${window.location.href}`}
                    </h2>
                    <div className={`row`}>
                        {errors.map(item =>{
                            return (
                                <p 
                                    key={`${new Date().getTime()}-${Math.random()}`}
                                    className={`col-12 ${classes.errorMessage}`}>{item}</p>
                            );
                        })}
                    </div>
                    <div className={`row`}>
                        <p className={`col-12 ${classes.errorMessage}`}>
                            {parse(`
                                ${data.message}
                            `)}
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Error;
