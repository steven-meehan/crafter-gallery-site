import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Carousel from '../Components/ImageViewer/Carousel/Carousel';
import ComponentOptions from '../models/configs/NavigationConfigs/ComponentOptions';
import RedirectOptions from '../models/configs/NavigationConfigs/RedirectOptions';
import data from '../Configs/GalleryRoutes.json';

const galleryRoutes: {
    path: string,
    sectionRoot: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    status: number,
    redirect: RedirectOptions | null }[] = data;

const Gallery = () => {
    return (
        <Routes>
            {
                galleryRoutes.map((route, index: number) => {
                    return ((route.redirect && route.redirect.behavior) ? 
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