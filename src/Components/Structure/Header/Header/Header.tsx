import React, { useState, useEffect, ReactNode } from 'react';

import Card from '../../../UI/Card/Card';
import Navbar from '../Navbar/Navbar';

import useHttp from '../../../../Hooks/useHttp';
import LinkConfig from '../../../../Models/DataFiles/Navigation/LinkConfig';
import NavigationConfigFile from '../../../../Models/DataFiles/Navigation/NavigationConfigFile';

import data from '../../../../ConfigurationFiles/data-file-locations.json';

import classes from './Header.module.css';

const config = data.find(item=>item.contentType==='navigation')!;

const Header: React.FC<{
    headerClasses?: string,
    children?: ReactNode
}> = (props) => {
    const headerClasses = `${props.headerClasses ? props.headerClasses : ''} ${classes.header}`;

    const [navigationLinks, setNavigationLinks] = useState<LinkConfig[]>([]);
    const [socialLinks, setSocialLinks] = useState<LinkConfig[]>([]);
    const [logoAltText, setLogoAltText] = useState("");

    const { sendRequest: fetchConfigs } = useHttp();

    useEffect(() => {
        const transformData = (data: NavigationConfigFile) =>{
            const loadedNavigationLinks: LinkConfig[] = [];
            const loadedSocialLinks: LinkConfig[] = [];

            for (const item in data.links) {
                if(data.links[item].social && data.links[item].active){
                    loadedSocialLinks.push({ 
                        url: data.links[item].url,
                        id: data.links[item].url,
                        name: data.links[item].name,
                        title: data.links[item].title,
                        active: data.links[item].active,
                        order: data.links[item].order,
                        social: data.links[item].social,
                        icon: data.links[item].icon,
                        internalLink: data.links[item].internalLink,
                        childLinks: data.links[item].childLinks
                    });
                } else {
                    if(data.links[item].active){
                        loadedNavigationLinks.push({ 
                            url: data.links[item].url,
                            id: data.links[item].url.substring(1),
                            name: data.links[item].name,
                            title: data.links[item].title,
                            active: data.links[item].active,
                            order: data.links[item].order,
                            social: data.links[item].social,
                            icon: data.links[item].icon,
                            internalLink: data.links[item].internalLink,
                            childLinks: data.links[item].childLinks
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
                url: config.url,
                cacheAge: config.cacheAge
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