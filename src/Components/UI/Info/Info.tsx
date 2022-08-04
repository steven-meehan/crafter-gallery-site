import React from 'react';

import classes from './Info.module.css';
import InfoProps from './InfoProps';

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