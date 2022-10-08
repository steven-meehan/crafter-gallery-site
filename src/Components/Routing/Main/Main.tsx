import React, { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Card from '../../Display/Card/Card';
import Spinner from '../../Display/Spinner/Spinner';
import ComponentType from '../../../Models/DataFiles/Home/ComponentType';
import RouteDefinition from '../../../Models/DataFiles/Navigation/RouteDefinition';

import routes from '../../../ConfigurationFiles/routes-top-level.json';
import config from '../../../ConfigurationFiles/data-file-locations.json';

import classes from './Main.module.css';

const Page = React.lazy(() => import('../../Content/Pages/Page/Page'));
const Gallery = React.lazy(() => import('../Gallery/Gallery'));

const Main: React.FC<{
    contentClasses?: string,
    children?: ReactNode
}> = (props) => {
    
    const topLevelRoutes = routes.map(item => new RouteDefinition(item));
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    return (
        <main>
            <Card 
                cardClasses={contentClasses}
                cardRounded={true}
                cardColor={`primary`} >
                <Suspense
                    fallback={<Spinner />}>
                    <Routes>
                        {
                            topLevelRoutes.map((route, index) => {
                                return route.redirect?.enabled && route.sectionRoot ? 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={
                                            <Navigate 
                                                replace 
                                                to={route.redirect.path} />
                                        } /> : route.redirect?.enabled && !route.sectionRoot ? 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={
                                            <Navigate 
                                                replace 
                                                to={route.redirect.path} />
                                        } /> : route.component === ComponentType.Page && route.sectionRoot ?
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={
                                            <Page 
                                                seoPageConfig={route.page} 
                                                dataFileUrl={config.find(item=>item.contentType === route.page)!.url} />
                                        } /> : route.component === ComponentType.Gallery ?
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path}
                                        element={<Gallery />} /> : 
                                    <Route 
                                        key={`main-route-${index}`} 
                                        path={route.path} 
                                        element={
                                            <Page 
                                                seoPageConfig={route.page} 
                                                dataFileUrl={config.find(item=>item.contentType === route.page)!.url}  />
                                        } />;
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
