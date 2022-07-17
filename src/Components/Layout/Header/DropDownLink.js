import React from 'react';
import Card from '../../UI/Card';

import classes from './DropDownLink.module.css';
import NavigationLink from './NavigationLink';

const DropDownLink = (props) => {
    const dropDownLinkClasses = `${props.dropDownLinkClasses ? props.dropDownLinkClasses : ''} `;
    const dropdownListLinks = props.children.map((item, index) => {
        if(!item.active){
            return null;
        }
        
        return (
            <li
                key={`${props.bindingKey}-${item.id}-${index}`} >
                <Card 
                    cardRounded={true} 
                    cardHover={true} >
                    <NavigationLink 
                        navLinkClasses={`col dropdown-item ${classes.dropdownNavigationLinks} ${dropDownLinkClasses}`} 
                        item={item} 
                        index={index} />
                </Card>
            </li>
        );
    });
  
    return (
        <ul
            className={`dropdown-menu ${classes.dropdownWrapper}` }
            aria-labelledby={`${props.bindingKey}`} >

            {dropdownListLinks}
        </ul>
    );
}

export default DropDownLink;