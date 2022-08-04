import React, { ReactNode, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './Content.module.css';
import Card from '../../UI/Card/Card';
import Spinner from '../../UI/Spinner/Spinner';

import data from '../../../Configs/TopLevelRoutes.json';
import RouteDefinition from '../../../models/configs/NavigationConfigs/RouteDefinition';
import CardProps from '../../UI/Card/CardProps';
import ComponentType from '../../../models/configs/ComponentType';
import ComponentOptions from '../../../models/configs/NavigationConfigs/ComponentOptions';
import RedirectOptions from '../../../models/configs/NavigationConfigs/RedirectOptions';

const Home = React.lazy(() => import('../../../Pages/Home'));
const Gallery = React.lazy(() => import('../../../Pages/Gallery'));
const NotFound = React.lazy(() => import('../../../Pages/NotFound'));

const topLevelRoutes: {
    path: string,
    exact: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    status: number,
    redirect: RedirectOptions | null }[] = data;

const Content: React.FC<{
        contentClasses?: string,
        children?: ReactNode
    }> = (props) => {
        
    const cardProps: CardProps ={
        cardRounded: false,
        cardRoundedModerate: false,
        cardRoundedHeavy: false,
        cardHover: false,
        cardColor: '',
        cardClasses: ''
    };
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
                        {topLevelRoutes.map((route, index) => {
                            return route.redirect?.behavior && route.exact ? 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} 
                                    exact >
                                    <Redirect to={route.redirect.path} />
                                </Route> : route.redirect?.behavior && !route.exact ? 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} >
                                    <Redirect to={route.redirect?.path} />
                                </Route> : route.component === ComponentType.Home ?
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} 
                                    exact >
                                    <Home />
                                </Route> : route.component === ComponentType.Gallery ?
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} >
                                    <Gallery />
                                </Route> : 
                                <Route 
                                    key={`main-route-${index}`} 
                                    path={route.path} >
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