import parse from 'html-react-parser';

import Info from './Info';
import type Component from '../Page/Models/Component';
import classes from '../Info/Info.module.css';

function prepareInfoComponent(component: Component, pageName: string): JSX.Element {
  return (
    <Info key={`${pageName}-component-${component.order}`} infoClasses={classes.centeredParagraphs}>
      {(component.paragraphs ?? []).map((item, index) => (
        <div
          key={`${pageName}-info-block-${index}`}
          className={item.emphasis ? classes.emphasis : ''}
          style={{ textAlign: item.alignment }}>
          {parse(item.text)}
        </div>
      ))}
    </Info>
  );
}

export default prepareInfoComponent;
