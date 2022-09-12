import NumberOfColumns from "./NumberOfColumns";

class Column {
    numberOfColumns: NumberOfColumns = NumberOfColumns.One;

    constructor(column?: {
        numberOfColumns: number
    }){
        if(column){
            this.numberOfColumns = column.numberOfColumns ? column.numberOfColumns : NumberOfColumns.One;
        } else {
            this.numberOfColumns = NumberOfColumns.One;
        }
    }
}

export default Column;