import React from 'react';

import classes from './Info.module.css';

const Info = (props) => {
    const infoClasses = `${classes.info} ${props.infoClasses ? props.infoClasses : ''}`

    return (
        <div 
            className={infoClasses} >
            {props.children}
        </div>
    );
}

export default Info;