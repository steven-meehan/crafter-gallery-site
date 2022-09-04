import React, { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Card from '../../UI/Card/Card';
import Spinner from '../../UI/Spinner/Spinner';

import ComponentType from '../../../Models/DataFiles/Home/ComponentType';
import ComponentOptions from '../../../Models/DataFiles/Navigation/ComponentOptions';
import RedirectOptions from '../../../Models/DataFiles/Navigation/RedirectOptions';

import data from '../../../ConfigurationFiles/routes-top-level.json';

import classes from './Main.module.css';

const Home = React.lazy(() => import('../../Content/Home'));
const Gallery = React.lazy(() => import('../../Content/Gallery'));
const NotFound = React.lazy(() => import('../../Content/NotFound'));

const topLevelRoutes: {
    path: string,
    sectionRoot: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    redirect: RedirectOptions | null }[] = data;

const Main: React.FC<{
        contentClasses?: string,
        children?: ReactNode
    }> = (props) => {
        
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    return (
        <main>
            <Card 
                cardClasses={contentClasses}
                cardRounded={true}
                cardColor={`light`} >
                <Suspense
                    fallback={<Spinner />}>
                    <Routes>
                        {
                            topLevelRoutes.map((route, index) => {
                                return route.redirect?.behavior && route.sectionRoot ? 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={<Navigate replace to={route.redirect.path} />} /> : route.redirect?.behavior && !route.sectionRoot ? 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={<Navigate replace to={route.redirect.path} />} /> : route.component === ComponentType.Home ?
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={<Home />} /> : route.component === ComponentType.Gallery ?
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path}
                                        element={<Gallery />} /> : 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={<NotFound />} />;
                                }
                            )
                        }
                    </Routes>
                </Suspense>
            </Card>
        </main>
    );
};

export default Main;