import parse from 'html-react-parser';

import Info from "./Info";
import Component from '../Page/Models/Component';

import classes from '../Info/Info.module.css';

class InfoProcessor {
    
    static PrepareInfoComponent = (
        component: Component,
        pageName: string): JSX.Element =>{
        return (
            <Info
                key={`${pageName}-component-${component.order}`} 
                infoClasses={`${classes.centeredParagraphs}`} >
                {
                    component.paragraphs!.map((item, index) => {
                        return (
                            <p
                                key={`${pageName}-info-block-${index}`} 
                                className={`${item.emphasis ? classes.emphasis : ''}`}
                                style={{
                                    textAlign: item.alignment
                                }} >
                                {parse(`
                                    ${item.text}
                                `)}
                            </p>
                        );
                    })
                }
            </Info>
        );
    }

}

export default InfoProcessor;