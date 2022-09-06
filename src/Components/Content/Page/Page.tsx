import React, { Fragment, useEffect, useState } from 'react';
import HelmetSettings from '../../Structure/Helmet/HelmetSettings';

import PageProps from './PageProps';
import PageProcessor from './PageProcessor';
import PageData from '../../../Models/DataFiles/PageData/PageData';
import PageComponent from '../../../Models/DataFiles/PageData/PageComponent';
import useHttp from '../../../Hooks/useHttp';
import ColumnPosition from '../../../Models/DataFiles/PageData/ColumnPosition';
import NumberOfColumns from '../../../Models/DataFiles/PageData/NumberOfColumns';
import Spinner from '../../UI/Spinner/Spinner';

import config from '../../../ConfigurationFiles/data-file-locations.json';
import seoConfig from '../../../ConfigurationFiles/seo-config.json';

import classes from './Page.module.css';

const Page: React.FC<PageProps> = (props) => {
    const dataFile = config.find(item=>item.url===props.dataFileUrl)!;
    const seoInfo = seoConfig.pageSettings.find(item=>item.page===props.seoPageConfig)!;
    const pathname = window.location.pathname;

    const { sendRequest: fetchParagraphs, isLoading } = useHttp();
    const [ components, setComponents ] = useState<PageComponent[]>([]);
    const [ columns, setColumns ] = useState<number>(1);
    const [ header, setHeader ] = useState<string>("");

    useEffect(() => {       
        const transformData = (data: PageData) =>{
            setHeader(data.header);
            setColumns(data.layout.columns.numberOfColumns);
            setComponents(PageProcessor.PrepareDataFile(data));
        }

        fetchParagraphs(
            { 
                url: dataFile.url,
                cacheAge: dataFile.cacheAge
            },
            transformData
        );
    }, [fetchParagraphs, pathname]);

    return (
        <Fragment>
            <HelmetSettings 
                helmetConfiguration={seoInfo} 
                seoSiteUrl={seoConfig.site} />
            {isLoading && <Spinner />}
            {components && !isLoading && (
                columns === NumberOfColumns.Two ? (
                    <div className={`row`} >
                        <div className={`col`} >
                            <div className={`row`} >
                                <h1>{header}</h1>
                            </div>
                            <div className={`row`} >
                                <div className={`col-xs-12 col-xl-${12/columns}`}>
                                    {
                                        components
                                            .map(item=> {
                                                if(item.componentPosition===ColumnPosition.Left){
                                                    return item.jsxElement
                                                }
                                            })
                                    }
                                </div>
                                <div className={`col-xs-12 col-xl-${12/columns}`}>
                                    {
                                        components
                                        .map(item=> {
                                            if(item.componentPosition===ColumnPosition.Right){
                                                return item.jsxElement
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : columns === NumberOfColumns.One ? (
                    <div className={`row`} >
                        <div className={`col-xs-12 col-xl-${12/columns}`}>
                            <h1>{header}</h1>
                            {components.map(item=>item.jsxElement)}
                        </div>
                    </div>
                ) : (<></>)
            )}
        </Fragment>
    );
};

export default Page;