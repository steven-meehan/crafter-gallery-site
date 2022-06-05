import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Carousel from '../Components/ImageViewer/Carousel';

const Gallery = () => {
    return (
        <Switch>
            <Route path="/gallery/pens" exact >
                <Carousel
                    configSettingFile="config-gallery-pens.json"
                    imagesObject="pens"
                    defaultPage="/gallery/pens/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/pens/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-pens.json"
                    imagesObject="pens"
                    defaultPage="/gallery/pens/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/glitter-tumblers" exact >
                <Carousel
                    configSettingFile="config-gallery-tumbler.json"
                    imagesObject="tumblers"
                    defaultPage="/gallery/glitter-tumblers/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/glitter-tumblers/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-tumbler.json"
                    imagesObject="tumblers"
                    defaultPage="/gallery/glitter-tumblers/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/sublimation" exact >
                <Carousel
                    configSettingFile="config-gallery-sublimation.json"
                    imagesObject="sublimations"
                    defaultPage="/gallery/sublimation/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/sublimation/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-sublimation.json"
                    imagesObject="sublimations"
                    defaultPage="/gallery/sublimation/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/kitchenware" exact >
                <Carousel
                    configSettingFile="config-gallery-kitchenware.json"
                    imagesObject="kitchenware"
                    defaultPage="/gallery/kitchenware/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/kitchenware/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-kitchenware.json"
                    imagesObject="kitchenware"
                    defaultPage="/gallery/kitchenware/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/etchings" exact >
                <Carousel
                    configSettingFile="config-gallery-etchings.json"
                    imagesObject="etchings"
                    defaultPage="/gallery/etchings/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/etchings/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-etchings.json"
                    imagesObject="etchings"
                    defaultPage="/gallery/etchings/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/decals" exact >
                <Carousel
                    configSettingFile="config-gallery-decals.json"
                    imagesObject="decals"
                    defaultPage="/gallery/decals/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/decals/:imageName" >
                <Carousel
                    configSettingFile="config-gallery-decals.json"
                    imagesObject="decals"
                    defaultPage="/gallery/decals/"
                    fontAwesomeArrowIcons={`fas fa-arrow-circle`} />
            </Route>
            <Route path="/gallery/:galleryName" >
                <Redirect to={"/gallery/glitter-tumblers"} />
            </Route>
        </Switch>
    );
};

export default Gallery;