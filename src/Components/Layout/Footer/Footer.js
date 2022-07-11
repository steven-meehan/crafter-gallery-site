import React from 'react';

import classes from './Footer.module.css';

const Footer = (props) => {
    const footerClasses =  `${props.footerClasses ? props.footerClasses : ''}`;

    return (
        <div className={`container`}>
            <div className={`${footerClasses} row`}>
                <footer className={`${classes.footerWrapper} col`}>
                    <p>Site content is © <a href='https://www.facebook.com/HandmadeHighjinks'>Amanda Keller-Meehan</a></p>
                    <p style={{
                            fontSize:'.75em'
                        } }>
                        Site designed by SM Designs.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default Footer;