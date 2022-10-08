import parse from 'html-react-parser';

import Info from "../Components/Display/Info/Info";
import Component from '../Models/DataFiles/PageData/Component';

import classes from '../Components/Display/Info/Info.module.css';

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