import ColumnPosition from "./ColumnPosition";

class PageComponent {
    jsxElement: JSX.Element | undefined = undefined;
    componentPosition: ColumnPosition = ColumnPosition.Left;

    constructor(pageComponent?: {
        jsxElement: JSX.Element,
        componentPosition: ColumnPosition
    }){
        if(pageComponent){
            this.jsxElement = pageComponent.jsxElement ? pageComponent.jsxElement : undefined;
            this.componentPosition = pageComponent.componentPosition ? pageComponent.componentPosition : ColumnPosition.Left;
        } else {
            this.jsxElement = undefined;
            this.componentPosition = ColumnPosition.Left;
        }
    }
}

export default PageComponent