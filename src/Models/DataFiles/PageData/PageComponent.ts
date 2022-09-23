import ColumnPosition from "./ColumnPosition";

class PageComponent {
    jsxElement: JSX.Element | undefined = undefined;
    componentRow: number = 0;
    componentPosition: ColumnPosition = ColumnPosition.Left;

    constructor(pageComponent?: {
        jsxElement: JSX.Element,
        componentRow:number,
        componentPosition: ColumnPosition
    }){
        if(pageComponent){
            this.jsxElement = pageComponent.jsxElement ? pageComponent.jsxElement : undefined;
            this.componentRow = pageComponent.componentRow ? pageComponent.componentRow : 0;
            this.componentPosition = pageComponent.componentPosition ? pageComponent.componentPosition : ColumnPosition.Left;
        } else {
            this.jsxElement = undefined;
            this.componentRow = 0;
            this.componentPosition = ColumnPosition.Left;
        }
    }
}

export default PageComponent