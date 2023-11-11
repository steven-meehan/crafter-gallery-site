import NumberOfColumns from "./NumberOfColumns";

class Row {
    order: number = 0;
    numberOfColumns: NumberOfColumns = NumberOfColumns.One;

    constructor(row?: {
        order: number,
        numberOfColumns: number
    }){
        if(row){
            this.order = row.order ? row.order : 0;
            this.numberOfColumns = row.numberOfColumns ? row.numberOfColumns : NumberOfColumns.One;
        } else {
            this.order = 0;
            this.numberOfColumns = NumberOfColumns.One;
        }
    }
}

export default Row;