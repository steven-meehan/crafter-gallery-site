import React, { Fragment, useEffect, useState } from 'react';
import HelmetSettings from '../../Structure/Helmet/HelmetSettings';

import PageProps from './PageProps';
import PageProcessor from '../../../Processors/PageProcessor';
import PageData from '../../../Models/DataFiles/PageData/PageData';
import useHttp from '../../../Hooks/useHttp';
import Spinner from '../../Display/Spinner/Spinner';
import PageRow from './PageRow/PageRow';

import config from '../../../ConfigurationFiles/data-file-locations.json';
import seoConfig from '../../../ConfigurationFiles/seo-config.json';

import classes from './Page.module.css';

const Page: React.FC<PageProps> = (props) => {
    const dataFile = config.find(item=>item.url===props.dataFileUrl)!;
    const seoInfo = seoConfig.pageSettings.find(item=>item.page===props.seoPageConfig)!;
    const pathname = window.location.pathname;

    const { sendRequest: fetchParagraphs, isLoading } = useHttp();
    const [ pageRows, setPageRows ] = useState<JSX.Element[]>([]);
    const [ header, setHeader ] = useState<string>("");

    useEffect(() => {
        setPageRows([]);
        setHeader("");
        const transformData = (data: PageData) =>{
            setHeader(data.header);
            const pageComponents = PageProcessor.PrepareDataFile(data);
            const contentRows = data.layout.rows.map((row, index) :JSX.Element => {
                return (
                    <PageRow 
                        key={`${data.name}-page-row-${row.order}`}
                        pageRow={row} 
                        pageComponents={pageComponents.filter(item=>item.componentRow === index)} />
                )
            });

            setPageRows(contentRows);
        }

        fetchParagraphs(
            { 
                url: dataFile.url,
                cacheAge: dataFile.cacheAge
            },
            transformData
        );
    }, [fetchParagraphs, pathname, dataFile.cacheAge, dataFile.url]);

    return (
        <Fragment>
            <HelmetSettings 
                helmetConfiguration={seoInfo} 
                seoSiteUrl={seoConfig.site} />
            {isLoading && <Spinner />}
            {(pageRows && !isLoading) && (
                <div className={`row`} >
                    <div className={`col`}>
                        <div className={`row`}>
                            <div className={`col`}>
                                <h1>{header}</h1>
                            </div>
                        </div>
                        {pageRows}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Page;