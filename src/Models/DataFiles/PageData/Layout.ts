import Row from "./Row";

class Layout {
    rows: Row[] = [];

    constructor(layout?: {
        rows: Row[]
    }){
        if(layout){
            this.rows = layout.rows ? layout.rows.map(item => new Row(item)) : [];
        } else {
            this.rows = [];
        }
    }
}

export default Layout;