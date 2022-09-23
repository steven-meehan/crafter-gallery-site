import { Fragment } from "react";

import ColumnPosition from "../../../Models/DataFiles/PageData/ColumnPosition";
import NumberOfColumns from "../../../Models/DataFiles/PageData/NumberOfColumns";
import PageRowProps from "./PageRowProps";

const PageRow: React.FC<PageRowProps> = (props) => {
    const columns = props.pageRow.numberOfColumns;
    const components = props.pageComponents;

    let row: JSX.Element = (<></>);

    switch (columns) {
        case NumberOfColumns.Two:
            row = (
                <div className={`row`}>
                    <div className={`col-xs-12 col-xl-${12/columns}`}>
                        {
                            components
                                .map(item=>{
                                    if(item.componentPosition === ColumnPosition.Left){
                                        return item.jsxElement;
                                    }

                                    return null;
                                })
                        }
                    </div>
                    <div className={`col-xs-12 col-xl-${12/columns}`}>
                        {
                            components
                                .map(item=>{
                                    if(item.componentPosition === ColumnPosition.Right){
                                        return item.jsxElement
                                    }

                                    return null;
                                }
                            )
                        }
                    </div>
                </div>);

            break;
            
        case NumberOfColumns.One:
            row = (
                <div className={`row`}>
                    <div className={`col-xs-12 col-xl-${12/columns}`}>
                        {components.map(item=>item.jsxElement)}
                    </div>
                </div>);

            break;
    
        default:
            break;
    }

    return (
        <Fragment>
            {row}
        </Fragment>
    );
}

export default PageRow;