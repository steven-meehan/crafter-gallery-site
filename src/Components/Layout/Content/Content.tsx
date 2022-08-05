import React, { ReactNode, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import classes from './Content.module.css';
import Card from '../../UI/Card/Card';
import Spinner from '../../UI/Spinner/Spinner';

import data from '../../../Configs/TopLevelRoutes.json';
import CardProps from '../../UI/Card/CardProps';
import ComponentType from '../../../models/configs/ComponentType';
import ComponentOptions from '../../../models/configs/NavigationConfigs/ComponentOptions';
import RedirectOptions from '../../../models/configs/NavigationConfigs/RedirectOptions';

const Home = React.lazy(() => import('../../../Pages/Home'));
const Gallery = React.lazy(() => import('../../../Pages/Gallery'));
const NotFound = React.lazy(() => import('../../../Pages/NotFound'));

const topLevelRoutes: {
    path: string,
    sectionRoot: boolean,
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

export default Content;