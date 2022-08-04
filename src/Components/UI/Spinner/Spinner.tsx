import React from 'react';

import classes from './Spinner.module.css';
import SpinnerProps from './SpinnerProps';

const Spinner: React.FC<SpinnerProps> = (props) => {
    return (
        <div className={`row justify-content-center`}>
            <div className={`col-xs-4`}>
                <div className={`${classes.loader} ${classes.centered}`}>
                    <div className={`${classes.innerGlow}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;