import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Carousel from '../Components/ImageViewer/Carousel';
import data from '../Configs/GalleryRoutes.json';

const Gallery = () => {
    return (
        <Switch>
            {data.map((route, index) => {
                return route.redirect.behavior ? 
                    <Route key={`gallery-route-${index}`} path={route.path}>
                        <Redirect to={route.redirect.path} />
                    </Route> : route.exact ?
                    <Route key={`gallery-route-${index}`} path={route.path} exact >
                        <Carousel
                            configSettingFile={route.componentOptions.configSettingFile}
                            imagesObject={route.componentOptions.imagesObject}
                            defaultPage={route.componentOptions.defaultPage}
                            fontAwesomeArrowIcons={route.componentOptions.fontAwesomeArrowIcons} />
                    </Route> : 
                    <Route key={`gallery-route-${index}`} path={route.path}>
                        <Carousel
                            configSettingFile={route.componentOptions.configSettingFile}
                            imagesObject={route.componentOptions.imagesObject}
                            defaultPage={route.componentOptions.defaultPage}
                            fontAwesomeArrowIcons={route.componentOptions.fontAwesomeArrowIcons} />
                    </Route>;
                })
            }
        </Switch>
    );
};

export default Gallery;