import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../../../Pages/Home';
import Gallery from '../../../Pages/Gallery';
import NotFound from '../../../Pages/NotFound';

import classes from './Content.module.css';
import Card from '../../UI/Card';

import data from '../../../Configs/TopLevelRoutes.json';

const Content = (props) => {
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    return (
        <main>
            <Card 
                cardClasses={contentClasses}
                cardRounded={true}
                cardColor={`light`} >
                <Switch>
                    {data.map((route, index) => {
                        return route.redirect.behavior && route.exact ? 
                            <Route key={`main-route-${index}`} path={route.path} exact >
                                <Redirect to={route.redirect.path} />
                            </Route> : route.redirect.behavior && !route.exact ? 
                            <Route key={`main-route-${index}`} path={route.path} >
                                <Redirect to={route.redirect.path} />
                            </Route> : route.component === "Home" ?
                            <Route key={`main-route-${index}`} path={route.path} exact >
                                <Home />
                            </Route> : route.component === "Gallery" ?
                            <Route key={`main-route-${index}`} path={route.path} >
                                <Gallery />
                            </Route> : 
                            <Route key={`main-route-${index}`} path={route.path} status={route.status}>
                                <NotFound />
                            </Route>;
                        })
                    }
                </Switch>
            </Card>
        </main>
    );
};

export default Content;