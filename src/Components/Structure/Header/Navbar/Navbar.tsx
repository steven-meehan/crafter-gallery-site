import React from 'react';
import { Link } from 'react-router-dom';

import NavigationLink from '../NavigationLink/NavigationLink';
import Toggler from '../../../UI/Toggler/Toggler';
import Card from '../../../UI/Card/Card';
import logo from '../../../../assets/Logo.png';
import logoAlt from '../../../../assets/LogoAlt.png';
import NavbarProps from './NavbarProps';

import classes from './Navbar.module.css';

const Navbar: React.FC<NavbarProps> = (props) => {
    const navbarClasses = `${props.navbarClasses ? props.navbarClasses : ''}`;
    const logoAltText = `${props.logoAltText ? props.logoAltText : 'My Crafts'}`;

    const navigationLinks = props.navlinks.map((item, index) => {
        return (
            <li 
                key={`${item.id}-${index}`} 
                className={`nav-item dropdown col col-lg-2 ${navbarClasses} ${classes.navigationLinks}`}>
                <Card
                    cardRounded={true} 
                    cardHover={true} >
                    <NavigationLink 
                        item={item} 
                        id={index} /> 
                </Card>
            </li>
        );
    })

    const socialNavLinks = props.socialNavLinks.map((item, index) => {
        return (
                <Card
                    key={`social-${item.name}-${index}`} 
                    cardClasses={`${classes.socialIconWrapper}`}
                    cardRounded={true} 
                    cardHover={true} >
                    <NavigationLink 
                        item={item} 
                        id={index} /> 
                </Card>
        );
    })
    
    return (
        <Card
            cardClasses={`${props.headerCssClasses}`}
            cardColor={props.backgroundColor} >
            <nav className={`container-fluid navbar navbar-light navbar-expand-md ${navbarClasses}`}>
                <div 
                    className={`row `}
                    style={{
                        width:"100%",
                        maxWidth:"100%"
                    }} >
                    <div className='col-3'>
                        <Link 
                            to={`/`} 
                            title={`Home Page`}
                            style={{display:"inline-block"}} >
                            <img 
                                src={logo} 
                                width={`260`} 
                                height={`105`} 
                                alt={`${logoAltText}`} 
                                className={`${classes.logo} d-none d-xl-block`} 
                                title={`Home`} 
                                loading="eager" />
                            <img 
                                src={logoAlt} 
                                width={`130`} 
                                height={`105`} 
                                alt={`${logoAltText}`} 
                                className={`${classes.logoAlt} d-xl-none`} 
                                title={`Home`} 
                                loading="eager" />
                        </Link>
                    </div>
                    <Toggler 
                        navbarTogglerTarget={`navigationBar`} 
                        togglerClasses={`offset-7 col-2 dmd-none ${classes.navigationBarToggler}`}/>
                    <div 
                        className={`col-9 collapse navbar-collapse`} 
                        id={`navigationBar`}>
                        <ul 
                            className={`navbar-nav ${classes.navigationWrapper}`}
                            style={{
                                width:"100%",
                                maxWidth:"100%"
                            }} >
                            {navigationLinks}
                            <li 
                                className={`offset-md-${8-(props.navlinks.length*2)} offset-lg-${9-(props.navlinks.length*2)} nav-item col col-md-4 col-lg-3`}
                                style={{
                                    paddingTop: '.1em'
                                }} >
                                <div className={`row justify-content-end`}>
                                    {socialNavLinks}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Card>
    );
};

export default Navbar;