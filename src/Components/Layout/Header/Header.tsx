import React, { useState, useEffect, ReactNode } from 'react';

import Card from '../../UI/Card/Card';
import Navbar from './Navbar';

import useHttp from '../../../Hooks/useHttp';
import classes from './Header.module.css';

import data from '../../../Configs/ConfigFileLocations.json';
import NavigationConfigFile from '../../../models/configs/NavigationConfigs/NavigationConfigFile';
import NavigationConfig from '../../../models/configs/NavigationConfigs/NavigationConfig';

const configUrl = data.find(item=>item.configuration==='navigation')!.url;

const Header: React.FC<{
    headerClasses?: string,
    children?: ReactNode
}> = (props) => {
    const headerClasses = `${props.headerClasses ? props.headerClasses : ''} ${classes.header}`;

    const [navigationLinks, setNavigationLinks] = useState<NavigationConfig[]>([]);
    const [socialLinks, setSocialLinks] = useState<NavigationConfig[]>([]);
    const [logoAltText, setLogoAltText] = useState("");

    const { sendRequest: fetchConfigs } = useHttp();

    useEffect(() => {
        const transformData = (data: NavigationConfigFile) =>{
            const loadedNavigationLinks: NavigationConfig[] = [];
            const loadedSocialLinks: NavigationConfig[] = [];

            for (const item in data.navigation) {
                if(data.navigation[item].social && data.navigation[item].active){
                    loadedSocialLinks.push({ 
                        url: data.navigation[item].url,
                        id: data.navigation[item].url,
                        name: data.navigation[item].name,
                        title: data.navigation[item].title,
                        active: data.navigation[item].active,
                        order: data.navigation[item].order,
                        social: data.navigation[item].social,
                        icon: data.navigation[item].icon,
                        internalLink: data.navigation[item].internalLink,
                        childLinks: data.navigation[item].childLinks
                    });
                } else {
                    if(data.navigation[item].active){
                        loadedNavigationLinks.push({ 
                            url: data.navigation[item].url,
                            id: data.navigation[item].url.substring(1),
                            name: data.navigation[item].name,
                            title: data.navigation[item].title,
                            active: data.navigation[item].active,
                            order: data.navigation[item].order,
                            social: data.navigation[item].social,
                            icon: data.navigation[item].icon,
                            internalLink: data.navigation[item].internalLink,
                            childLinks: data.navigation[item].childLinks
                        });
                    }
                }
            }

            const sortedNavigationList = loadedNavigationLinks.sort((a, b) => {
                return a.order - b.order;
            });
            const sortedSocialList = loadedSocialLinks.sort((a, b) => {
                return a.order - b.order;
            });
           
            setNavigationLinks(sortedNavigationList);
            setSocialLinks(sortedSocialList.sort());
            setLogoAltText(data.logoAltText);
        }

        fetchConfigs(
            {
                url: configUrl,
                method: '',
                headers: {},
                body: undefined
            },
            transformData
        );
    }, [fetchConfigs]);
    
    return (    
        <header>
            <Card
                cardClasses={`${headerClasses}`}
                cardColor={`light`} >
                <Navbar 
                    logoAltText={logoAltText}
                    navlinks={navigationLinks}
                    socialNavLinks={socialLinks} />
            </Card>
        </header>
    );
};

export default Header;