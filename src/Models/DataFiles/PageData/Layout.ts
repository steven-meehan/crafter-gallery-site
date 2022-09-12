import Column from "./Column";

class Layout {
    columns: Column = new Column();

    constructor(layout?: {
        columns: Column
    }){
        if(layout){
            this.columns = layout.columns ? new Column(layout.columns) : new Column();
        } else {
            this.columns = new Column();
        }
    }
}

export default Layout;