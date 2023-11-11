import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Carousel from '../../Images/Carousel/Carousel';
import RouteDefinition from '../Models/RouteDefinition';

import routes from '../../ConfigFiles/routes-gallery.json';

const Gallery = () => {
    const galleryRoutes: RouteDefinition[] = [];

    try {
        routes.map(item => galleryRoutes.push(new RouteDefinition(item)));
    } catch (error) {
        console.log(`There was a problem retrieving the the routes for the galleries`);
    }

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