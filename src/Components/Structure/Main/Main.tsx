import React, { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import classes from './Main.module.css';
import Card from '../../UI/Card/Card';
import Spinner from '../../UI/Spinner/Spinner';

import ComponentType from '../../../models/configs/ComponentType';
import ComponentOptions from '../../../models/configs/NavigationConfigs/ComponentOptions';
import RedirectOptions from '../../../models/configs/NavigationConfigs/RedirectOptions';

import data from '../../../Configs/TopLevelRoutes.json';

const Home = React.lazy(() => import('../../Content/Home'));
const Gallery = React.lazy(() => import('../../Content/Gallery'));
const NotFound = React.lazy(() => import('../../Content/NotFound'));

const topLevelRoutes: {
    path: string,
    sectionRoot: boolean,
    component: string,
    componentOptions: ComponentOptions | null,
    status: number,
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