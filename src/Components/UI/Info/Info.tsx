import React from 'react';

import InfoProps from './InfoProps';

import classes from './Info.module.css';

const Info: React.FC<InfoProps> = (props) => {
    const infoClasses = `${classes.info} ${props.infoClasses ? props.infoClasses : ''}`

    return (
        <div 
            className={infoClasses} >
            {props.children}
        </div>
    );
}

export default Info;