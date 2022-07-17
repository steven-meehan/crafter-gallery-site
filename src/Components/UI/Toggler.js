import React from 'react';

import classes from './Toggler.module.css';

const Toggler = (props) => {
    const navbarTogglerClasses = `${props.classes ? props.classes : ''} ${classes.navbarToggler} navbar-toggler`;
    const navbarTogglerTarget = `${props.navbarTogglerTarget ? props.navbarTogglerTarget : ''}`;

    return (
        <button 
            className={navbarTogglerClasses} 
            type={`button`}
            data-bs-toggle={`collapse`} 
            data-bs-target={`#${navbarTogglerTarget}`} 
            aria-controls={navbarTogglerTarget} 
            aria-expanded={false} 
            aria-label={`Toggle navigation`}>
            <span className={`navbar-toggler-icon`}></span>
        </button>
    );
};

export default Toggler;