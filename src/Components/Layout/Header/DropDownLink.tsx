import React from 'react';
import Card from '../../UI/Card/Card';

import classes from './DropDownLink.module.css';
import DropDownLinkProps from './DropDownLinkProps';
import NavigationLink from './NavigationLink';

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
                    textAlign:'center'
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