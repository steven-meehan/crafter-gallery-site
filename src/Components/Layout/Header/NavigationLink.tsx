import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import DropDownLink from './DropDownLink';

import classes from './NavigationLink.module.css';
import NavigationLinkProps from './NavigationLinkProps';

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
    const navLinkClasses = `${props.navLinkClasses ? props.navLinkClasses : ''} ${classes.navigationLinks}`;
    const childLinks = props.item.childLinks.sort((a, b) => {
        return a.order - b.order;
    });

    const link = childLinks && childLinks.length > 0 && props.item.active ? (
            <Fragment>
                <Link 
                    to={`#`} 
                    title={props.item.title} 
                    className={`${navLinkClasses} btn nav-link dropdown-toggle`}
                    itemID={`${props.id}`}
                    role={`button`}
                    data-bs-toggle={`dropdown`} 
                    aria-expanded={false}>
                    {props.item.name}
                </Link>
                <DropDownLink
                    childLinks={childLinks}
                    bindingKey={`${props.id}`} />
            </Fragment>
        ) : props.item.social && props.item.internalLink && props.item.active ? (
            <Link
                to={props.item.url} 
                title={props.item.title} 
                className={`${navLinkClasses} ${classes.socialIcons} btn nav-link`}
                itemID={`${props.id}`}>
                <span className={props.item.icon}></span>
            </Link>
        ) : props.item.social && !props.item.internalLink && props.item.active ? (
            <a
                href={props.item.url} 
                title={props.item.title} 
                target={'_blank'}
                rel={'noreferrer'}
                className={`${navLinkClasses} ${classes.socialIcons} btn nav-link`}
                itemID={`${props.id}`}>
                <span className={props.item.icon}></span>
            </a>
        ) : props.item.internalLink && props.item.active ? (
            <Link 
                to={props.item.url} 
                title={props.item.title} 
                className={`${navLinkClasses} btn nav-link`}
                itemID={`${props.id}`}>
                {props.item.name}
            </Link>
        ) :  props.item.active ? (
            <a
                href={props.item.url} 
                title={props.item.title} 
                target={'_blank'} 
                rel={'noreferrer'}
                className={`${navLinkClasses} btn nav-link`}
                itemID={`${props.id}`}>
                {props.item.name}
            </a>
        ) : (
            ''
        );
  
    return (
        <Fragment>
            {link}
        </Fragment>
    );
}

export default NavigationLink;