import React from 'react';

import classes from './Spinner.module.css';

const Spinner = (props) => {
    return (
        <div class={`row justify-content-center`}>
            <div class={`col-xs-4`}>
                <div class={`${classes.loader} ${classes.centered}`}>
                    <div class={`${classes.innerGlow}`}></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;