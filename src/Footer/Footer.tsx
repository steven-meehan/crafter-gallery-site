import React, { ReactNode } from 'react';

import classes from './Footer.module.css';

import data from '../ConfigFiles/footer.json';

const copyrightInfo = data.copyrightInfo;
const siteDesignInfo = data.siteDesignInfo;

const Footer: React.FC<{
    fontColor: string,
    footerClasses?: string,
    children?: ReactNode;
}> = (props) => {
    const footerClasses =  `${props.footerClasses ? props.footerClasses : ''}`;

    const fontColor = `${props.fontColor === 'primary' ? classes.primaryColor :
        props.fontColor === 'secondary' ? classes.secondaryColor : classes.primaryColor}`;
    
    const copyrightNotice = copyrightInfo.url ? 
        (<a href={`${copyrightInfo.url}`} title={`${copyrightInfo.title}`} target={`_blank`}>{copyrightInfo.name}</a>) :
        copyrightInfo.name;
    
    const siteDesigner = siteDesignInfo.url ? 
        (<a href={`${siteDesignInfo.url}`} title={`${siteDesignInfo.title}`} target={`_blank`}>{siteDesignInfo.name}</a>) :
        siteDesignInfo.name;

    return (
        <div className={`container`}>
            <div className={`${footerClasses} ${fontColor} row`}>
                <footer className={`${classes.footerWrapper} col`}>
                    <p>Site content is © {copyrightNotice}</p>
                    {siteDesignInfo.display && 
                        <p className={`${classes.siteDesignerSection}`}>
                            Site designed by {siteDesigner}.
                        </p>
                    }
                </footer>
            </div>
        </div>
    )
}

export default Footer;