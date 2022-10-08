import React from 'react';

import Card from '../../../Display/Card/Card';
import DropDownLinkProps from './DropDownLinkProps';
import NavigationLink from '../NavigationLink/NavigationLink';

import classes from './DropDownLink.module.css';

const DropDownLink: React.FC<DropDownLinkProps> = (props) => {
    const dropDownLinkClasses = `${props.dropDownLinkClasses ? props.dropDownLinkClasses : ''} `;
    const dropdownListLinks = props.childLinks.map((item, index) => {
        if(!item.active){
            return null;
        }
        
        return (
            <li
                key={`${props.bindingKey}-${item.id}-${index}`}
                style={{
                    textAlign:'center',
                    marginLeft:'.1em'
                }} >
                <Card 
                    cardRounded={true} 
                    cardHover={true} >
                    <NavigationLink 
                        navLinkClasses={`col dropdown-item ${classes.dropdownNavigationLinks} ${dropDownLinkClasses}`} 
                        item={item} 
                        id={index} />
                </Card>
            </li>
        );
    });
  
    return (
        <ul
            className={`dropdown-menu ${classes.dropdownWrapper}` }
            style={{
                backgroundColor:'transparent'
            }}
            aria-labelledby={`${props.bindingKey}`} >

            {dropdownListLinks}
        </ul>
    );
}

export default DropDownLink;