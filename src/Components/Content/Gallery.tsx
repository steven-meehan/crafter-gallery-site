import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Carousel from './Images/Carousel/Carousel';
import ComponentOptions from '../../Models/DataFiles/Navigation/ComponentOptions';
import RedirectOptions from '../../Models/DataFiles/Navigation//RedirectOptions';

import data from '../../ConfigurationFiles/routes-gallery.json';

const galleryRoutes: {
    path: string,
    page: string,
    sectionRoot: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    redirect: RedirectOptions | null }[] = data;

const Gallery = () => {
    return (
        <Routes>
            {
                galleryRoutes.map((route, index: number) => {
                    return ((route.redirect && route.redirect.enabled) ? 
                    <Route 
                        key={`gallery-route-${index}`} 
                        path={route.path}
                        element={<Navigate replace to={route.redirect.path} />} /> : (route.sectionRoot && route.componentOptions) ?
                    <Route 
                        key={`gallery-route-${index}`} 
                        path={route.path}
                        element={<Carousel
                            configSettingFile={route.componentOptions.configSettingFile}
                            defaultPage={route.componentOptions.defaultPage}
                            fontAwesomeArrowIcons={route.componentOptions.fontAwesomeArrowIcons} />} /> : 
                    <Route 
                        key={`gallery-route-${index}`} 
                        path={route.path}
                        element={<Carousel
                            configSettingFile={route.componentOptions!.configSettingFile}
                            defaultPage={route.componentOptions!.defaultPage}
                            routeToNotFoundPage={route.componentOptions!.routeToNotFoundPage}
                            fontAwesomeArrowIcons={route.componentOptions!.fontAwesomeArrowIcons} />} />);
                })
            }
        </Routes>
    );
};

export default Gallery;