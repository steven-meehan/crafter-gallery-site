import React, { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Card from '../../Card/Card';
import Spinner from '../../Spinner/Spinner';
import ComponentType from '../ComponentType';
import RouteDefinition from '../RouteDefinition';

import routes from '../../ConfigFiles/routes-top-level.json';
import config from '../../ConfigFiles/data-file-locations.json';

import classes from './Main.module.css';

const Page = React.lazy(() => import('../../Page/Page'));
const Gallery = React.lazy(() => import('../Gallery/Gallery'));

const Main: React.FC<{
    contentClasses?: string,
    children?: ReactNode
}> = (props) => {
    
    const topLevelRoutes: RouteDefinition[] = [];
    const contentClasses = `${props.contentClasses ? props.contentClasses : ''} ${classes.content}`;

    try {
        routes.map(item => topLevelRoutes.push(new RouteDefinition(item)));
    } catch (error) {
        console.log(`There was a problem retrieving the the informational routes for the application`);
    }

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
