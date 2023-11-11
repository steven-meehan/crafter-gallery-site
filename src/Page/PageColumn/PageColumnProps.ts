import { ReactNode } from "react";

import PageComponent from "../../Page/Models/PageComponent";

class PageColumnProps {
    rowColumns: number = 0;
    pageComponents: PageComponent[] = [];
    children?: ReactNode;

    constructor(columnProps?: {
        rowColumns: number,
        pageComponents: PageComponent[],
        children?: ReactNode
    }) {
        if(columnProps){
            this.rowColumns = columnProps.rowColumns ? columnProps.rowColumns : 0;
            this.pageComponents = columnProps.pageComponents ? columnProps.pageComponents.map(item => 
                new PageComponent({
                    jsxElement: item.jsxElement!,
                    componentRow: item.componentRow,
                    componentPosition: item.componentPosition
                })
            ) : [];
            this.children = columnProps.rowColumns ? columnProps.rowColumns : null;
        } else {
            this.rowColumns = 0;
            this.pageComponents = [];
            this.children = null;
        }

    }
}

export default PageColumnProps;
