import React, { Fragment } from "react";

import ColumnPosition from "../../../../Models/DataFiles/PageData/ColumnPosition";
import NumberOfColumns from "../../../../Models/DataFiles/PageData/NumberOfColumns";
import PageColumn from "../PageColumn/PageColumn";
import PageRowProps from "./PageRowProps";

const PageRow: React.FC<PageRowProps> = (props) => {
    const columns = props.pageRow.numberOfColumns;
    const components = props.pageComponents;
    
    let row: JSX.Element = (<></>);
    
    switch (columns) {
        case NumberOfColumns.Two:
            const leftComponents = components.filter(item=>item.componentPosition === ColumnPosition.Left);
            const rightComponents = components.filter(item=>item.componentPosition === ColumnPosition.Right);

            row = (
                <div className={`row`}>
                    <PageColumn 
                        rowColumns={columns}
                        pageComponents={leftComponents} />
                    <PageColumn 
                        rowColumns={columns}
                        pageComponents={rightComponents} />
                </div>
            );

            break;
            
        case NumberOfColumns.One:
            row = (
                <PageColumn 
                    rowColumns={columns}
                    pageComponents={components} />
            );

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
