import ColumnInfo from "./ColumnInfo";

class LayoutInfo {
    columns: ColumnInfo = new ColumnInfo();

    constructor(layoutInfo?: {
        columns: ColumnInfo
    }){
        if(layoutInfo){
            this.columns = layoutInfo.columns ? new ColumnInfo(layoutInfo.columns) : new ColumnInfo();
        } else {
            this.columns = new ColumnInfo();
        }
    }
}

export default LayoutInfo;