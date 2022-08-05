import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Carousel from '../Components/ImageViewer/Carousel/Carousel';
import ComponentOptions from '../models/configs/NavigationConfigs/ComponentOptions';
import RedirectOptions from '../models/configs/NavigationConfigs/RedirectOptions';
import data from '../Configs/GalleryRoutes.json';

const galleryRoutes: {
    path: string,
    exact: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    status: number,
    redirect: RedirectOptions | null }[] = data;

const Gallery = () => {
    return (
        <Switch>
            {galleryRoutes.map((route, index: number) => {
                return (route.redirect && route.redirect.behavior) ? 
                    <Route key={`gallery-route-${index}`} path={route.path}>
                        <Redirect to={route.redirect.path} />
                    </Route> : (route.exact && route.componentOptions) ?
                    <Route key={`gallery-route-${index}`} path={route.path} exact >
                        <Carousel
                            configSettingFile={route.componentOptions.configSettingFile}
                            defaultPage={route.componentOptions.defaultPage}
                            fontAwesomeArrowIcons={route.componentOptions.fontAwesomeArrowIcons} />
                    </Route> : 
                    <Route key={`gallery-route-${index}`} path={route.path}>
                        <Carousel
                            configSettingFile={route.componentOptions!.configSettingFile}
                            defaultPage={route.componentOptions!.defaultPage}
                            routeToNotFoundPage={route.componentOptions!.routeToNotFoundPage}
                            fontAwesomeArrowIcons={route.componentOptions!.fontAwesomeArrowIcons} />
                    </Route>;
                })
            }
        </Switch>
    );
};

export default Gallery;