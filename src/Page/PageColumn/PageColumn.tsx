import React, { Fragment } from "react";

import PageColumnProps from "./PageColumnProps";

const PageColumn: React.FC<PageColumnProps> = (props) => {
    const columns = props.rowColumns;
    const components = props.pageComponents;

    return (
        <Fragment>
            <div className={`col-xs-12 col-xl-${12/columns}`}>
                {
                    components
                        .map(item=>{
                            return item.jsxElement;
                        })
                }
            </div>
        </Fragment>
    );
}

export default PageColumn;
