import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './Content.module.css';
import Card from '../../UI/Card';
import Spinner from '../../UI/Spinner';

import data from '../../../Configs/TopLevelRoutes.json';

const Home = React.lazy(() => import('../../../Pages/Home'));
const Gallery = React.lazy(() => import('../../../Pages/Gallery'));
const NotFound = React.lazy(() => import('../../../Pages/NotFound'));

const Content = (props) => {
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    return (
        <main>
            <Card 
                cardClasses={contentClasses}
                cardRounded={true}
                cardColor={`light`} >
                <Suspense
                    fallback={<Spinner />}>
                    <Switch>
                        {data.map((route, index) => {
                            return route.redirect.behavior && route.exact ? 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} 
                                    exact >
                                    <Redirect to={route.redirect.path} />
                                </Route> : route.redirect.behavior && !route.exact ? 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} >
                                    <Redirect to={route.redirect.path} />
                                </Route> : route.component === "Home" ?
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} 
                                    exact >
                                    <Home />
                                </Route> : route.component === "Gallery" ?
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} >
                                    <Gallery />
                                </Route> : 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} status={route.status}>
                                    <NotFound />
                                </Route>;
                            })
                        }
                    </Switch>
                </Suspense>
            </Card>
        </main>
    );
};

export default Content;