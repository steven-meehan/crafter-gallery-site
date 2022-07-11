import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../../../Pages/Home';
import Gallery from '../../../Pages/Gallery';
import NotFound from '../../../Pages/NotFound';

import classes from './Content.module.css';
import Card from '../../UI/Card';

const Content = (props) => {
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    return (
        <main>
            <Card 
                cardClasses={contentClasses}
                cardRounded={true}
                cardColor={`light`} >
                <Switch>
                    <Route
                        path="/" 
                        exact >
                        <Home />
                    </Route>
                    <Route
                        path="/gallery" 
                        exact >
                        <Redirect to={"/gallery/pens"} />
                    </Route>
                    <Route
                        path="/gallery/:galleryName" >
                        <Gallery />
                    </Route>
                    <Route
                        path="*" 
                        status={404} >
                        <NotFound />
                    </Route>
                </Switch>
            </Card>
        </main>
    );
};

export default Content;